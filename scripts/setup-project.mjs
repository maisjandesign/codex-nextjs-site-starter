import { cp, mkdir, readFile, writeFile, lstat, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'tooling/required-skills.json');
const manifestText = await readFile(manifestPath, 'utf8');
const manifest = JSON.parse(manifestText);
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const stampPath = path.join(root, '.template/setup-ready.json');
const verifyOnly = process.argv.includes('--check');

function run(binary, args) {
  const result = spawnSync(binary, args, { cwd: root, stdio: 'inherit', env: { ...process.env, GRAFT_TELEMETRY: '0' } });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${path.basename(binary)} ${args[0]} failed. Setup is incomplete; do not start layout work.`);
}

async function verifySkills(base) {
  for (const skill of manifest.skills) {
    for (const file of skill.files) {
      const actual = await readFile(path.join(base, skill.name, file.path));
      if (hash(actual) !== file.sha256) throw new Error(`Skill integrity mismatch: ${skill.name}/${file.path}`);
    }
    const text = await readFile(path.join(base, skill.name, 'SKILL.md'), 'utf8');
    if (!text.startsWith('---') || !text.includes(`name: ${skill.name}`)) throw new Error(`Invalid skill: ${skill.name}`);
  }
}

const graftPackage = path.join(root, 'node_modules/@nanonets/graft/package.json');
const installedSkills = path.join(root, '.agents/skills');

try {
  if (verifyOnly) {
    const stamp = JSON.parse(await readFile(stampPath, 'utf8'));
    if (stamp.projectRoot !== root || stamp.manifestHash !== hash(manifestText) ||
        stamp.lockHash !== hash(await readFile(path.join(root, 'package-lock.json')))) {
      throw new Error('This project needs its own setup run, or its dependencies changed.');
    }
    await verifySkills(installedSkills);
    const graft = JSON.parse(await readFile(graftPackage, 'utf8'));
    if (graft.version !== stamp.graftVersion) throw new Error('Graft version changed.');
    const graphIndex = await readFile(path.join(root, 'graft/INDEX.md'), 'utf8');
    if (!graphIndex.trim()) throw new Error('Graft index is empty.');
    console.log('Setup verified: official GSAP skills, better-ui, Graft skill + local CLI/index. Layout work may start.');
  } else {
    // Remove any previous success marker before installation; failure must stay closed.
    await rm(stampPath, { force: true });
    const bundles = path.join(root, 'tooling/skills');
    await verifySkills(bundles);
    await mkdir(installedSkills, { recursive: true });
    for (const skill of manifest.skills) {
      const target = path.join(installedSkills, skill.name);
      try {
        await lstat(target);
        for (const file of skill.files) {
          if (hash(await readFile(path.join(target, file.path))) !== file.sha256) {
            throw new Error(`An existing ${skill.name} skill differs from the bundled version. Resolve the difference before setup; it was not overwritten.`);
          }
        }
        console.log(`Verified installed skill: ${skill.name}`);
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        // A partially existing directory must not be silently overwritten.
        try { await lstat(target); throw new Error(`Incomplete existing skill ${skill.name}; repair or remove that project-local copy before setup.`); }
        catch (check) { if (check.code !== 'ENOENT') throw check; }
        await cp(path.join(bundles, skill.name), target, { recursive: true, errorOnExist: true, force: false });
        console.log(`Installed skill: ${skill.name}`);
      }
    }
    const npmCli = process.env.npm_execpath;
    if (npmCli) run(process.execPath, [npmCli, 'ci']);
    else run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['ci']);
    const graft = JSON.parse(await readFile(graftPackage, 'utf8'));
    const graftCli = path.join(path.dirname(graftPackage), graft.bin.graft);
    // Local CLI + AGENTS.md integration only. No account-wide MCP or hook edits.
    run(process.execPath, [graftCli, 'init', '--agents', 'agents', '--no-global', '--no-mcp', '--no-hooks', '--no-build']);
    run(process.execPath, [graftCli, 'build', '--only-dir', 'src', '--only-dir', 'scripts']);
    await verifySkills(installedSkills);
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
