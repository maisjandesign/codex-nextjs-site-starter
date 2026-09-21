/** Validate numeric frames captured from one actual moving layer, in temporal order.
 * Callers must drive the interaction and collect frames; markup is not evidence.
 */
export function checkMotionFrames(
  frames,
  { minimumTravel = 1, settled = 0, tolerance = 0.1 } = {},
) {
  if (
    !Array.isArray(frames) ||
    frames.length < 3 ||
    frames.some((value) => !Number.isFinite(value))
  )
    return { passed: false, reason: 'At least three finite observed frames are required.' };
  const travel = Math.max(...frames) - Math.min(...frames);
  if (travel < minimumTravel)
    return { passed: false, reason: 'No meaningful movement was observed.' };
  if (Math.abs(frames.at(-1) - settled) > tolerance)
    return { passed: false, reason: 'The layer did not reach its expected settled state.' };
  const intermediate = frames
    .slice(1, -1)
    .some(
      (value) => Math.abs(value - frames[0]) > tolerance && Math.abs(value - settled) > tolerance,
    );
  if (!intermediate)
    return {
      passed: false,
      reason: 'Only endpoints were observed; capture an intermediate frame.',
    };
  return { passed: true, travel };
}
