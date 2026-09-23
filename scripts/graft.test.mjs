import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = fileURLToPath(new URL('../', import.meta.url));
const wrapper = fileURLToPath(new URL('./graft.mjs', import.meta.url));
function run(args) {
  return spawnSync(process.execPath, [wrapper, ...args], {
    cwd: root,
    encoding: 'utf8',
    timeout: 60_000,
    maxBuffer: 2 * 1024 * 1024,
  });
}
function query(args) {
  const result = run([...args, '--json']);
  assert.equal(result.status, 0, result.error?.message || result.stderr || result.stdout);
  return JSON.parse(result.stdout);
}

test('structural parsing finds the real shared button declarations', () => {
  const result = query(['skeleton', 'src/components/Button.tsx']);
  for (const name of ['Button', 'ButtonLink']) {
    assert.ok(result.entries.some((entry) => entry.name === name && entry.kind === 'function'));
  }
});

test('the graph resolves a real cross-file motion hook call', () => {
  const result = query(['callers', 'useMotion', '--depth', '2']);
  const provider = result.matches.find(
    (match) => match.symbol.path === 'src/components/motion/MotionProvider.tsx',
  );
  assert.ok(provider, 'Expected the actual useMotion provider symbol');
  assert.ok(
    provider.hits.some(
      (hit) => hit.relation === 'calls' && hit.path === 'src/components/motion/ButtonMotion.tsx',
    ),
    'Expected ButtonMotion to call useMotion across module boundaries',
  );
});

test('the local workflow rejects global setup and deep processing', () => {
  for (const args of [['init'], ['build', '--deep'], ['build', '--provider=openai']]) {
    const result = run(args);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /local structural Graft commands/);
  }
});
