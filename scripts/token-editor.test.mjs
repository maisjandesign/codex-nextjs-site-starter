import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { validatePatch, mergePatch, fontChoices } from '../src/design/token-editor.mjs';
import { saveTokenPatch } from '../src/design/token-store.mjs';
import { generateCSS } from '../src/design/token-contract.mjs';
const source = JSON.parse(fs.readFileSync('src/design/tokens.json', 'utf8'));
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'token-store-'));
  fs.mkdirSync(path.join(root, 'src/design'), { recursive: true });
  fs.mkdirSync(path.join(root, 'src/styles'));
  fs.writeFileSync(path.join(root, 'src/design/tokens.json'), JSON.stringify(source));
  fs.writeFileSync(path.join(root, 'src/styles/tokens.css'), generateCSS(source));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
test('editor rejects fractional, unknown, unsafe, coerced and wrong-scale values', () => {
  for (const patch of [
    null,
    [],
    { 'size.control': 48.5 },
    { 'size.control': '56' },
    { 'size.control': NaN },
    { 'themes.light.accent': 'red' },
    { 'font.family': 'x; background:url(https://example.com)' },
    { 'layout.desktop.section-padding': 63 },
    { 'headings.desktop.h2': 96 },
    { 'headings.mobile.h1': 80 },
    JSON.parse('{"__proto__":{}}'),
  ])
    assert.ok(validatePatch(source, patch).length, JSON.stringify(patch));
});
test('valid desktop changes preserve mobile, motion and original source', () => {
  const before = structuredClone(source);
  const next = mergePatch(source, {
    'size.control': 56,
    'themes.light.accent': '#123456',
    'layout.desktop.section-padding': 80,
    'font.family': fontChoices.editorial.value,
  });
  assert.equal(next.size.control, 56);
  assert.deepEqual(next.headings.mobile, source.headings.mobile);
  assert.deepEqual(next.layout.mobile, source.layout.mobile);
  assert.deepEqual(next.motion, source.motion);
  assert.deepEqual(source, before);
  assert.ok(generateCSS(next).includes('--size-control: calc(56 * 1rem / 16)'));
});
test('save updates both files and preserves unrelated motion edits', (t) => {
  const root = fixture(t);
  const changed = structuredClone(source);
  changed.motion.delay = 100;
  fs.writeFileSync(path.join(root, 'src/design/tokens.json'), JSON.stringify(changed));
  const next = saveTokenPatch(
    root,
    { 'size.control': 56 },
    { 'size.control': source.size.control },
  );
  assert.equal(next.motion.delay, 100);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'src/design/tokens.json'))), next);
  assert.equal(
    fs.readFileSync(path.join(root, 'src/styles/tokens.css'), 'utf8'),
    generateCSS(next),
  );
});
test('stale edits fail without overwriting source', (t) => {
  const root = fixture(t);
  saveTokenPatch(root, { 'size.control': 56 }, { 'size.control': source.size.control });
  assert.throws(
    () => saveTokenPatch(root, { 'size.control': 64 }, { 'size.control': source.size.control }),
    (e) => e.status === 409,
  );
  assert.equal(
    JSON.parse(fs.readFileSync(path.join(root, 'src/design/tokens.json'))).size.control,
    56,
  );
});
test('CSS write failure rolls source and CSS back', (t) => {
  const root = fixture(t);
  let writes = 0;
  const io = {
    ...fs,
    writeFileSync(...args) {
      writes++;
      if (writes === 2) throw new Error('Simulated disk error');
      return fs.writeFileSync(...args);
    },
  };
  assert.throws(
    () => saveTokenPatch(root, { 'size.control': 56 }, { 'size.control': source.size.control }, io),
    /original source and CSS restored/,
  );
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'src/design/tokens.json'))), source);
  assert.equal(
    fs.readFileSync(path.join(root, 'src/styles/tokens.css'), 'utf8'),
    generateCSS(source),
  );
});
