import test from 'node:test';
import assert from 'node:assert/strict';
import { checkMotionFrames } from './motion-evidence.mjs';
test('motion evidence rejects frozen, endpoint-only and unfinished effects', () => {
  for (const frames of [[0, 0, 0], [32, 32, 0], [32, 15, 4], [0, 0.001, 0], [32, NaN, 0], []])
    assert.equal(checkMotionFrames(frames).passed, false, JSON.stringify(frames));
});
test('motion evidence accepts actual progression and reversible fill with appropriate units', () => {
  assert.equal(checkMotionFrames([32, 18, 7, 0]).passed, true);
  assert.equal(
    checkMotionFrames([0, 0.3, 0.8, 1], { minimumTravel: 0.5, settled: 1 }).passed,
    true,
  );
  assert.equal(checkMotionFrames([1, 0.8, 0.2, 0], { minimumTravel: 0.5 }).passed, true);
});
