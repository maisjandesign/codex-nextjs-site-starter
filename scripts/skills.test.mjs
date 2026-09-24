import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hash, installSkills, verifySkills } from './skills.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestText = await readFile(path.join(root, 'tooling/required-skills.json'), 'utf8');
const manifest = JSON.parse(manifestText);
const bundles = path.join(root, 'tooling/skills');
const quiet = () => {};

async function temporary(t) {
  const directory = await realpath(await mkdtemp(path.join(tmpdir(), 'starter-skill-test-')));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

test('clean installation includes both complete upstream collections and Graft', async (t) => {
  const destination = await temporary(t);
  assert.equal(manifest.skills.filter((s) => s.source === 'https://github.com/jakubkrehel/skills').length, 11);
  assert.equal(manifest.skills.filter((s) => s.source === 'https://github.com/greensock/gsap-skills').length, 8);
  assert.ok(manifest.skills.some((s) => s.name === 'graft'));
  const result = await installSkills(bundles, destination, manifest, quiet);
  assert.equal(result.skills, 20);
  await verifySkills(destination, manifest);
  assert.equal((await installSkills(bundles, destination, manifest, quiet)).copiedFiles, 0);
  const explicit = await readFile(path.join(destination, 'variant/agents/openai.yaml'), 'utf8');
  assert.match(explicit, /allow_implicit_invocation: false/);
});

test('missing reference files fail verification and are restored by installation', async (t) => {
  const destination = await temporary(t);
  await installSkills(bundles, destination, manifest, quiet);
  const reference = path.join(destination, 'better-ui/animations.md');
  await rm(reference);
  await assert.rejects(verifySkills(destination, manifest), /ENOENT/);
  await installSkills(bundles, destination, manifest, quiet);
  assert.deepEqual(await readFile(reference), await readFile(path.join(bundles, 'better-ui/animations.md')));
});

test('unknown local edits block installation without being overwritten', async (t) => {
  const destination = await temporary(t);
  await installSkills(bundles, destination, manifest, quiet);
  const modified = path.join(destination, 'better-ui/SKILL.md');
  const missing = path.join(destination, 'better-accessibility/SKILL.md');
  await writeFile(modified, 'My deliberate local customization.');
  await rm(missing);
  await assert.rejects(installSkills(bundles, destination, manifest, quiet), /Modified installed skill/);
  assert.equal(await readFile(modified, 'utf8'), 'My deliberate local customization.');
  await assert.rejects(readFile(missing), /ENOENT/);
});

test('an unchanged known previous snapshot upgrades automatically', async (t) => {
  const directory = await temporary(t);
  const source = path.join(directory, 'bundles');
  const destination = path.join(directory, 'installed');
  const before = '---\nname: example\n---\nPrevious upstream instructions.\n';
  const after = '---\nname: example\n---\nUpdated upstream instructions.\n';
  for (const base of [source, destination]) await mkdir(path.join(base, 'example'), { recursive: true });
  await writeFile(path.join(source, 'example/SKILL.md'), after);
  await writeFile(path.join(destination, 'example/SKILL.md'), before);
  const versions = { skills: [{ name: 'example', files: [{ path: 'SKILL.md', sha256: hash(after) }],
    previousVersions: [{ files: [{ path: 'SKILL.md', sha256: hash(before) }] }] }] };
  await installSkills(source, destination, versions, quiet);
  assert.equal(await readFile(path.join(destination, 'example/SKILL.md'), 'utf8'), after);
});

test('setup readiness cannot survive a missing skill or a failed repair', async (t) => {
  const project = await temporary(t);
  await cp(path.join(root, 'scripts'), path.join(project, 'scripts'), { recursive: true });
  await cp(path.join(root, 'tooling'), path.join(project, 'tooling'), { recursive: true });
  await cp(path.join(root, 'package-lock.json'), path.join(project, 'package-lock.json'));
  const installed = path.join(project, '.agents/skills');
  await installSkills(bundles, installed, manifest, quiet);
  await mkdir(path.join(project, 'node_modules/@nanonets/graft'), { recursive: true });
  await writeFile(path.join(project, 'node_modules/@nanonets/graft/package.json'), JSON.stringify({ version: 'fixture' }));
  await mkdir(path.join(project, 'graft'));
  await writeFile(path.join(project, 'graft/INDEX.md'), '# Fixture index');
  await mkdir(path.join(project, '.template'));
  const stamp = path.join(project, '.template/setup-ready.json');
  await writeFile(stamp, JSON.stringify({ projectRoot: project, manifestHash: hash(manifestText),
    lockHash: hash(await readFile(path.join(project, 'package-lock.json'))), graftVersion: 'fixture' }));
  const run = (...args) => spawnSync(process.execPath, [path.join(project, 'scripts/setup-project.mjs'), ...args], { encoding: 'utf8' });
  const ready = run('--check');
  assert.equal(ready.status, 0, ready.stderr);
  await rm(path.join(installed, 'gsap-frameworks/SKILL.md'));
  const check = run('--check');
  assert.notEqual(check.status, 0);
  assert.match(check.stderr, /gsap-frameworks/);
  await writeFile(path.join(installed, 'better-ui/SKILL.md'), 'Custom edit');
  assert.notEqual(run().status, 0);
  await assert.rejects(readFile(stamp), /ENOENT/);
});

test('corrupt bundled bytes cannot be installed', async (t) => {
  const directory = await temporary(t);
  const corrupt = path.join(directory, 'bundles');
  await cp(bundles, corrupt, { recursive: true });
  await writeFile(path.join(corrupt, 'gsap-react/SKILL.md'), 'Corrupt download');
  const destination = path.join(directory, 'installed');
  await assert.rejects(installSkills(corrupt, destination, manifest, quiet), /Skill integrity mismatch/);
  await assert.rejects(readFile(path.join(destination, 'gsap-react/SKILL.md')), /ENOENT/);
});
