import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const digest = (data) => createHash('sha256').update(data).digest('hex');
const readJSON = (path) => JSON.parse(readFileSync(path, 'utf8'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

export function execute(command, args, root, stdio = 'pipe') {
  return spawnSync(command, args, {
    cwd: root,
    encoding: 'utf8',
    stdio,
    env: { ...process.env, DO_NOT_TRACK: '1' },
    timeout: 180_000,
    maxBuffer: 8 * 1024 * 1024,
  });
}

function localPath(root, relative) {
  const path = resolve(root, relative);
  if (!path.startsWith(resolve(root) + sep)) throw new Error(`Unsafe setup path: ${relative}`);
  return path;
}

export async function restoreSkills(
  root,
  manifest,
  { run = execute, fetchFile = fetch, log = console.log } = {},
) {
  if (!/^[a-f0-9]{40}$/.test(manifest.revision))
    throw new Error('Skill source must be commit-pinned.');
  let restored = 0;
  for (const skill of manifest.skills) {
    if (!/^[a-z0-9-]+$/.test(skill.name)) throw new Error('Invalid skill name.');
    let added = 0;
    for (const file of skill.files) {
      const relative = `.agents/skills/${skill.name}/${file.path}`;
      const target = localPath(root, relative);
      const skillRoot = localPath(root, `.agents/skills/${skill.name}`);
      if (!target.startsWith(skillRoot + sep)) throw new Error('Unsafe skill resource path.');
      if (existsSync(target)) {
        if (!lstatSync(target).isFile() || readFileSync(target).length === 0) {
          throw new Error(
            `Invalid existing skill resource: ${relative}. Review it before repair; it was not overwritten.`,
          );
        }
        continue;
      }
      // Restore from the exact source commit offline when it is available in this checkout.
      const local = run('git', ['show', `${manifest.revision}:${relative}`], root);
      let bytes = local.status === 0 ? Buffer.from(local.stdout) : null;
      if (!bytes || digest(bytes) !== file.sha256) {
        const url = `https://raw.githubusercontent.com/${manifest.repository}/${manifest.revision}/${relative}`;
        const response = await fetchFile(url, { signal: AbortSignal.timeout(20_000) });
        if (!response.ok)
          throw new Error(`Skill restore failed (${response.status}): ${skill.name}/${file.path}`);
        bytes = Buffer.from(await response.arrayBuffer());
      }
      if (digest(bytes) !== file.sha256) throw new Error(`Skill source hash mismatch: ${relative}`);
      // Never follow a directory symlink while writing a missing resource.
      for (let current = dirname(target); current !== resolve(root); current = dirname(current)) {
        if (existsSync(current) && lstatSync(current).isSymbolicLink()) {
          throw new Error(`Refusing to restore through symlink: ${current}`);
        }
      }
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, bytes, { flag: 'wx' });
      added++;
      restored++;
    }
    const entry = readFileSync(join(root, '.agents/skills', skill.name, 'SKILL.md'), 'utf8');
    if (
      !entry.startsWith('---\n') ||
      !new RegExp(`^name: ${skill.name}\\s*$`, 'm').test(entry) ||
      !/^description:\s*\S/m.test(entry)
    ) {
      throw new Error(`Invalid SKILL.md for ${skill.name}; existing content was preserved.`);
    }
    log(`[skills] ${added ? `RESTORED ${added} file(s)` : 'SKIP installed'}: ${skill.name}`);
  }
  return restored;
}

export function dependencyProblems(root, run = execute) {
  const pkg = readJSON(join(root, 'package.json'));
  const lock = readJSON(join(root, 'package-lock.json'));
  const problems = [];
  for (const name of Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })) {
    const expected = lock.packages[`node_modules/${name}`]?.version;
    try {
      const actual = readJSON(join(root, 'node_modules', name, 'package.json')).version;
      if (!expected || actual !== expected)
        problems.push(`${name}: expected ${expected}, found ${actual}`);
    } catch {
      problems.push(`${name}: missing`);
    }
  }
  if (problems.length) return problems;
  const tree = run(npm, ['ls', '--all', '--include=dev', '--json'], root);
  if (tree.status !== 0) problems.push('npm dependency tree is incomplete or invalid');
  const graft = run(process.execPath, [join(root, 'scripts/graft.mjs'), 'version'], root);
  if (graft.status !== 0) problems.push('Graft executable cannot start');
  for (const bin of ['next', 'storybook']) {
    if (
      !existsSync(
        join(root, 'node_modules/.bin', bin + (process.platform === 'win32' ? '.cmd' : '')),
      )
    ) {
      problems.push(`${bin} executable is missing`);
    }
  }
  return problems;
}

export async function setup(root, { run = execute, log = console.log, fetchFile = fetch } = {}) {
  const manifest = readJSON(join(root, 'scripts/required-skills.json'));
  await restoreSkills(root, manifest, { run, fetchFile, log });
  const problems = dependencyProblems(root, run);
  if (problems.length) {
    log(`[dependencies] INSTALL required:\n${problems.join('\n')}`);
    const install = run(npm, ['ci', '--include=dev', '--no-fund', '--no-audit'], root, 'inherit');
    if (install.status !== 0)
      throw new Error(
        `Dependency installation failed (${install.error?.message || install.status}). Setup is incomplete.`,
      );
    const remaining = dependencyProblems(root, run);
    if (remaining.length)
      throw new Error(`Installed dependencies are not ready:\n${remaining.join('\n')}`);
  } else {
    log('[dependencies] SKIP installed: locked packages and Graft executable verified');
  }
  log(
    `[setup] READY: ${manifest.skills.length} local skills and project dependencies. Next: npm run graft:build && npm run graft:map`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const lockPath = join(projectRoot, '.starter-setup.lock');
  let acquired = false;
  try {
    const [major, minor] = process.versions.node.split('.').map(Number);
    if (major < 22 || (major === 22 && minor < 12))
      throw new Error('Setup requires Node.js 22.12 or newer.');
    // npm run dev and npm run storybook may be launched at the same time.
    for (let attempt = 0; attempt < 180; attempt++) {
      try {
        mkdirSync(lockPath);
        acquired = true;
        break;
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
        if (attempt === 0) console.log('[setup] Another setup is running; waiting for its lock.');
        await new Promise((done) => setTimeout(done, 1000));
      }
    }
    if (!acquired)
      throw new Error(
        'Setup lock remains. Check the other setup process before removing .starter-setup.lock and retrying.',
      );
    await setup(projectRoot);
  } catch (error) {
    console.error(
      `[setup] BLOCKED: ${error.message}\nResolve the reported installation/network/permission issue using docs/STARTUP.md, then rerun npm run setup. The project was not marked ready.`,
    );
    process.exitCode = 1;
  } finally {
    if (acquired) rmSync(lockPath, { recursive: true, force: true });
  }
}
