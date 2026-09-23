import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validateMotionSettings, motionFields } from '../src/design/motion-settings.mjs';
import { validateTokens, generateCSS } from './tokens.mjs';
const tokens = JSON.parse(fs.readFileSync('src/design/tokens.json', 'utf8'));
const valid = Object.fromEntries(motionFields.map((key) => [key, tokens.motion[key]]));
test('source GSAP settings satisfy the editor contract', () => {
  assert.deepEqual(validateMotionSettings(valid), []);
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
    { ...valid, smooth: 2001 },
    { ...valid, stagger: 90 },
    { ...valid, enter: 2001 },
    { ...valid, 'library-ease': 'made-up' },
  ])
    assert.ok(validateMotionSettings(invalid).length);
});
test('token pipeline rejects invalid smoothing and generates integer millisecond delay', () => {
  const broken = structuredClone(tokens);
  broken.motion.smooth = 0.5;
  assert.ok(validateTokens(broken).some((error) => error.includes('smooth')));
  const updated = structuredClone(tokens);
  updated.motion.delay = 120;
  assert.deepEqual(validateTokens(updated), []);
  assert.match(generateCSS(updated), /--motion-delay: 120ms;/);
});

test('legacy profiles and timing recipes cannot re-enter the token pipeline', () => {
  const profiles = structuredClone(tokens);
  profiles.motionProfiles = { editorial: valid };
  assert.ok(validateTokens(profiles).some((error) => error.includes('motionProfiles')));
  const stagger = structuredClone(tokens);
  stagger.motion.stagger = 90;
  assert.ok(validateTokens(stagger).some((error) => error.includes('stagger')));
});
