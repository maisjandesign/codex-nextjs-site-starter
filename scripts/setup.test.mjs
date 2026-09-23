import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { restoreSkills, setup } from './setup.mjs';

const source = '---\nname: example\ndescription: A test skill.\n---\nOriginal\n';
const hash = (value) => createHash('sha256').update(value).digest('hex');
const manifest = {
  repository: 'example/repo',
  revision: 'a'.repeat(40),
  skills: [{ name: 'example', files: [{ path: 'SKILL.md', sha256: hash(source) }] }],
};
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'starter-setup-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const put = (path, content) => {
    const file = join(root, path);
    mkdirSync(join(file, '..'), { recursive: true });
    writeFileSync(file, content);
  };
  return { root, put };
}
const quiet = () => {};
const noNetwork = async () => {
  throw new Error('Unexpected network access');
};

test('installed customized skills skip restore and remain byte-identical', async (t) => {
  const { root, put } = fixture(t);
  const custom = source.replace('Original', 'Project customization');
  put('.agents/skills/example/SKILL.md', custom);
  const count = await restoreSkills(root, manifest, {
    log: quiet,
    fetchFile: noNetwork,
    run: () => {
      throw new Error('Unexpected git access');
    },
  });
  assert.equal(count, 0);
  assert.equal(readFileSync(join(root, '.agents/skills/example/SKILL.md'), 'utf8'), custom);
});

test('missing skill restores from pinned source and a repeat is a no-op', async (t) => {
  const { root } = fixture(t);
  let downloads = 0;
  const options = {
    log: quiet,
    run: () => ({ status: 1 }),
    fetchFile: async (url) => {
      assert.ok(url.includes(`/${manifest.revision}/.agents/skills/example/SKILL.md`));
      downloads++;
      return new Response(source);
    },
  };
  assert.equal(await restoreSkills(root, manifest, options), 1);
  assert.equal(await restoreSkills(root, manifest, options), 0);
  assert.equal(downloads, 1);
});

test('missing supporting file restores offline without overwriting customized entrypoint', async (t) => {
  const { root, put } = fixture(t);
  const local = structuredClone(manifest);
  local.skills[0].files.push({ path: 'reference.md', sha256: hash('Reference') });
  put('.agents/skills/example/SKILL.md', source + 'Local note\n');
  await restoreSkills(root, local, {
    log: quiet,
    fetchFile: noNetwork,
    run: () => ({ status: 0, stdout: 'Reference' }),
  });
  assert.equal(
    readFileSync(join(root, '.agents/skills/example/reference.md'), 'utf8'),
    'Reference',
  );
  assert.ok(
    readFileSync(join(root, '.agents/skills/example/SKILL.md'), 'utf8').includes('Local note'),
  );
});

test('network failure and hash mismatch never create a fake installed entrypoint', async (t) => {
  const { root } = fixture(t);
  const opts = { log: quiet, run: () => ({ status: 1 }) };
  await assert.rejects(
    restoreSkills(root, manifest, {
      ...opts,
      fetchFile: async () => {
        throw new Error('Network denied');
      },
    }),
    /Network denied/,
  );
  await assert.rejects(
    restoreSkills(root, manifest, { ...opts, fetchFile: async () => new Response('wrong file') }),
    /hash mismatch/,
  );
  assert.equal(existsSync(join(root, '.agents/skills/example/SKILL.md')), false);
});

function project(t) {
  const f = fixture(t);
  f.put('scripts/required-skills.json', JSON.stringify(manifest));
  f.put('.agents/skills/example/SKILL.md', source);
  f.put('package.json', JSON.stringify({ devDependencies: { '@nanonets/graft': '0.19.0' } }));
  f.put(
    'package-lock.json',
    JSON.stringify({ packages: { 'node_modules/@nanonets/graft': { version: '0.19.0' } } }),
  );
  f.put('node_modules/.bin/next', 'fixture');
  f.put('node_modules/.bin/storybook', 'fixture');
  return f;
}

test('missing Graft dependency installs with devDependencies, then second setup skips npm ci', async (t) => {
  const { root, put } = project(t);
  let installs = 0;
  const run = (_cmd, args) => {
    if (args[0] === 'ci') {
      assert.ok(args.includes('--include=dev'));
      installs++;
      put('node_modules/@nanonets/graft/package.json', JSON.stringify({ version: '0.19.0' }));
    }
    return { status: 0 };
  };
  await setup(root, { run, log: quiet, fetchFile: noNetwork });
  await setup(root, { run, log: quiet, fetchFile: noNetwork });
  assert.equal(installs, 1);
});

test('blocked installation cannot report READY', async (t) => {
  const { root } = project(t);
  const messages = [];
  await assert.rejects(
    setup(root, {
      run: () => ({ status: 1 }),
      log: (message) => messages.push(message),
      fetchFile: noNetwork,
    }),
    /installation failed/,
  );
  assert.ok(!messages.some((message) => message.includes('READY')));
});

test('a broken Graft executable is not mistaken for an installed runtime', async (t) => {
  const { root, put } = project(t);
  put('node_modules/@nanonets/graft/package.json', JSON.stringify({ version: '0.19.0' }));
  let installs = 0;
  await assert.rejects(
    setup(root, {
      log: quiet,
      fetchFile: noNetwork,
      run: (_cmd, args) => {
        if (args[0] === 'ci') installs++;
        return { status: args.at(-1) === 'version' ? 1 : 0 };
      },
    }),
    /Graft executable cannot start/,
  );
  assert.equal(installs, 1);
});
