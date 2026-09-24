import { copyFile, lstat, mkdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

export const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

// An installed skill must not redirect a repair outside its own directory.
async function plainPath(base, relative) {
  let current = base;
  for (const part of ['', ...relative.split('/')]) {
    current = path.join(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink()) throw new Error(`Skill path is a symlink: ${current}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return current;
}

export async function verifySkills(base, manifest) {
  for (const skill of manifest.skills) {
    for (const file of skill.files) {
      const location = await plainPath(base, `${skill.name}/${file.path}`);
      if (hash(await readFile(location)) !== file.sha256) {
        throw new Error(`Skill integrity mismatch: ${skill.name}/${file.path}`);
      }
    }
    const text = await readFile(path.join(base, skill.name, 'SKILL.md'), 'utf8');
    const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatter || !frontmatter[1].split(/\r?\n/).some((line) => line.trim() === `name: ${skill.name}`)) {
      throw new Error(`Invalid skill: ${skill.name}`);
    }
  }
}

export async function installSkills(bundles, destination, manifest, log = console.log) {
  await verifySkills(bundles, manifest);
  const copies = [];
  // Preflight every installed file before changing any skill. Preserve unknown edits.
  for (const skill of manifest.skills) {
    for (const file of skill.files) {
      const relative = `${skill.name}/${file.path}`;
      const target = await plainPath(destination, relative);
      let actual;
      try { actual = hash(await readFile(target)); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (actual === file.sha256) continue;
      const knownPrevious = skill.previousVersions?.some((version) =>
        version.files.some((old) => old.path === file.path && old.sha256 === actual));
      if (actual && !knownPrevious) {
        throw new Error(`Modified installed skill: ${relative}. Your edits were preserved; resolve this conflict before setup.`);
      }
      copies.push({ target, source: path.join(bundles, relative) });
    }
  }
  for (const file of copies) {
    await mkdir(path.dirname(file.target), { recursive: true });
    await copyFile(file.source, file.target);
  }
  await verifySkills(destination, manifest);
  for (const skill of manifest.skills) log(`Verified required skill: ${skill.name}`);
  return { skills: manifest.skills.length, copiedFiles: copies.length };
}
