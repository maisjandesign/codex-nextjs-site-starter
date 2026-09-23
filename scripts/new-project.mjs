import { cp, mkdir, readFile, rename, rm, lstat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argument = process.argv[2];
if (!argument) throw new Error('Usage: npm run new-project -- /absolute/path/to/new-site');
const destination = path.resolve(argument);
if (destination === source || destination.startsWith(source + path.sep)) {
  throw new Error('Choose a destination outside the template directory.');
}
try { await lstat(destination); throw new Error('Destination already exists; no files were changed.'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const temporary = `${destination}.creating-${process.pid}`;
const excluded = new Set(['node_modules', '.next', 'out', 'dist', 'storybook-static', '.git', '.template', 'work', 'verification', '.DS_Store']);
const requiredSkills = new Set(JSON.parse(await readFile(path.join(source, 'tooling/required-skills.json'), 'utf8')).skills.map((skill) => skill.name));
await mkdir(temporary, { recursive: false });
try {
  await cp(source, temporary, { recursive: true, filter: async (entry) => {
    const name = path.basename(entry);
    if (entry === path.join(source, 'graft')) return false;
    if (path.dirname(entry) === path.join(source, '.agents/skills') && requiredSkills.has(name)) return false;
    return !excluded.has(name) && !name.endsWith('.tsbuildinfo') && !name.endsWith('.zip') && !name.endsWith('.log') &&
      (!name.startsWith('.env') || name === '.env.example') && !(await lstat(entry)).isSymbolicLink();
  } });
  const packagePath = path.join(temporary, 'package.json');
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
  packageJson.name = path.basename(destination).toLowerCase().replace(/[^a-z0-9-]/g, '-') || 'reference-site';
  await writeFile(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  const lockPath = path.join(temporary, 'package-lock.json');
  const lock = JSON.parse(await readFile(lockPath, 'utf8'));
  lock.name = packageJson.name;
  lock.packages[''].name = packageJson.name;
  await writeFile(lockPath, JSON.stringify(lock, null, 2) + '\n');
  // Recheck immediately before rename; never knowingly replace an existing project.
  try { await lstat(destination); throw new Error('Destination appeared while copying.'); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await rename(temporary, destination);
  console.log(`Created ${destination}\nOpen it in Codex and attach Figma or a screenshot.\nCodex must run npm run setup before starting layout work.`);
} catch (error) {
  await rm(temporary, { recursive: true, force: true });
  throw error;
}
