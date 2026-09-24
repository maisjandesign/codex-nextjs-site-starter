import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { hash, installSkills, verifySkills } from './skills.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'tooling/required-skills.json');
const manifestText = await readFile(manifestPath, 'utf8');
const manifest = JSON.parse(manifestText);
const stampPath = path.join(root, '.template/setup-ready.json');
const verifyOnly = process.argv.includes('--check');

function run(binary, args) {
  const result = spawnSync(binary, args, { cwd: root, stdio: 'inherit', env: { ...process.env, GRAFT_TELEMETRY: '0' } });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${path.basename(binary)} ${args[0]} failed. Setup is incomplete; do not start layout work.`);
}

const graftPackage = path.join(root, 'node_modules/@nanonets/graft/package.json');
const installedSkills = path.join(root, '.agents/skills');
const bundles = path.join(root, 'tooling/skills');

try {
  if (verifyOnly) {
    const stamp = JSON.parse(await readFile(stampPath, 'utf8'));
    if (stamp.projectRoot !== root || stamp.manifestHash !== hash(manifestText) ||
        stamp.lockHash !== hash(await readFile(path.join(root, 'package-lock.json')))) {
      throw new Error('This project needs its own setup run, or its dependencies changed.');
    }
    await verifySkills(bundles, manifest);
    await verifySkills(installedSkills, manifest);
    const graft = JSON.parse(await readFile(graftPackage, 'utf8'));
    if (graft.version !== stamp.graftVersion) throw new Error('Graft version changed.');
    const graphIndex = await readFile(path.join(root, 'graft/INDEX.md'), 'utf8');
    if (!graphIndex.trim()) throw new Error('Graft index is empty.');
    console.log(`Setup verified: all ${manifest.skills.length} required skills, pinned source bundles, and Graft CLI/index. Project work may start.`);
  } else {
    // Remove any previous success marker before installation; failure must stay closed.
    await rm(stampPath, { force: true });
    await installSkills(bundles, installedSkills, manifest);
    const npmCli = process.env.npm_execpath;
    if (npmCli) run(process.execPath, [npmCli, 'ci']);
    else run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['ci']);
    const graft = JSON.parse(await readFile(graftPackage, 'utf8'));
    const graftCli = path.join(path.dirname(graftPackage), graft.bin.graft);
    // Local CLI + AGENTS.md integration only. No account-wide MCP or hook edits.
    run(process.execPath, [graftCli, 'init', '--agents', 'agents', '--no-global', '--no-mcp', '--no-hooks', '--no-build']);
    run(process.execPath, [graftCli, 'build', '--only-dir', 'src', '--only-dir', 'scripts']);
    await verifySkills(installedSkills, manifest);
    const graphIndex = await readFile(path.join(root, 'graft/INDEX.md'), 'utf8');
    if (!graphIndex.trim()) throw new Error('Graft index is empty.');
    await mkdir(path.dirname(stampPath), { recursive: true });
    await writeFile(stampPath, JSON.stringify({
      projectRoot: root, manifestHash: hash(manifestText),
      lockHash: hash(await readFile(path.join(root, 'package-lock.json'))),
      graftVersion: graft.version, skills: manifest.skills.map((skill) => skill.name),
      completedAt: new Date().toISOString(),
    }, null, 2) + '\n');
    console.log('SETUP COMPLETE. Read the installed skills, then begin the supplied design immediately.');
  }
} catch (error) {
  console.error(`Setup gate failed: ${error.message}\nRun: npm run setup\nDo not start layout work until setup succeeds.`);
  process.exitCode = 1;
}
