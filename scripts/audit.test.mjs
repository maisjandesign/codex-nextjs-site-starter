import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { auditCSS, auditTSX } from './audit.mjs';
import { validateTokens } from './tokens.mjs';
const names = new Set(['--space-4', '--font-h1', '--color-text']);
test('rejects fractional dimensions including leading-dot syntax', () => {
  for (const v of ['12.5px', '.5px', '1.25rem', '2.5%'])
    assert.ok(
      auditCSS(`.x { padding: ${v}; }`, 'layout.css', names).some((x) => x.includes('Fractional')),
    );
});
test('rejects raw integer spacing, unknown tokens and color bypasses', () => {
  for (const css of [
    '.x { gap: 24px; }',
    '.x { gap: var(--unknown); }',
    '.x { color: red; }',
    '.x { background: rgb(0 0 0); }',
  ])
    assert.ok(auditCSS(css, 'layout.css', names).length);
});
test('accepts token references and structural grid math', () =>
  assert.deepEqual(
    auditCSS(
      '.x { padding: var(--space-4); grid-template-columns: repeat(2, minmax(0, 1fr)); inline-size: 100%; }',
      'layout.css',
      names,
    ),
    [],
  ));
test('rejects local heading and button overrides', () => {
  for (const css of [
    '.hero h1 { color: var(--color-text); }',
    '.x { font-size: var(--font-h1); }',
    '.button { padding: 0; }',
  ])
    assert.ok(auditCSS(css, 'layout.css', names).length);
});
test('rejects transition all and hidden focus', () => {
  assert.ok(
    auditCSS('.x { transition: all 200ms; outline: none; }', 'components.css', names).length >= 2,
  );
});
test('JSX audit catches bypasses without matching comments', () => {
  assert.ok(
    auditTSX('const X=()=> <button style={{padding: 12}}>Go</button>', 'src/X.tsx').length === 2,
  );
  assert.deepEqual(
    auditTSX('// <button style={{}}>\nconst X=()=> <Button>Go</Button>', 'src/X.tsx'),
    [],
  );
});
test('integer token policy covers responsive spacing and headings', () => {
  const t = JSON.parse(fs.readFileSync('src/design/tokens.json', 'utf8'));
  assert.deepEqual(validateTokens(t), []);
  t.headings.mobile.h1 = 40.5;
  t.layout.desktop['section-padding'] = 63.5;
  assert.ok(validateTokens(t).length >= 2);
});

test('library motion rejects fractional timing, distance and unregistered easing', () => {
  const baseline = JSON.parse(fs.readFileSync('src/design/tokens.json', 'utf8'));
  for (const [key, value] of [
    ['stagger', 70.5],
    ['distance', -1],
    ['distance', 24.5],
    ['library-ease', 'invented'],
  ]) {
    const changed = structuredClone(baseline);
    changed.motion[key] = value;
    assert.ok(validateTokens(changed).some((error) => error.includes(`motion.${key}`)));
  }
});
