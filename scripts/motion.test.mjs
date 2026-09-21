import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateMotionSettings, motionFields } from '../src/design/motion-settings.mjs';
import { validateTokens, generateCSS } from './tokens.mjs';
const tokens = JSON.parse(fs.readFileSync('src/design/tokens.json', 'utf8'));
const valid = Object.fromEntries(motionFields.map((key) => [key, tokens.motion[key]]));
test('source motion and all starting profiles satisfy the editor contract', () => {
  for (const value of [valid, ...Object.values(tokens.motionProfiles)])
    assert.deepEqual(validateMotionSettings(value), []);
});
test('reject incomplete, unknown, coerced, non-finite and out-of-range settings', () => {
  for (const invalid of [
    null,
    [],
    {},
    { ...valid, extra: 1 },
    { ...valid, enter: '600' },
    { ...valid, delay: 0.5 },
    { ...valid, distance: Infinity },
    { ...valid, distance: -1 },
    { ...valid, stagger: 201 },
    { ...valid, enter: 2001 },
    { ...valid, 'library-ease': 'made-up' },
  ])
    assert.ok(validateMotionSettings(invalid).length);
});
test('token pipeline rejects corrupt profiles and generates integer millisecond delay', () => {
  const broken = structuredClone(tokens);
  broken.motionProfiles.editorial.enter = 0.5;
  assert.ok(validateTokens(broken).some((error) => error.includes('editorial')));
  const updated = structuredClone(tokens);
  updated.motion.delay = 120;
  assert.deepEqual(validateTokens(updated), []);
  assert.match(generateCSS(updated), /--motion-delay: 120ms;/);
});
