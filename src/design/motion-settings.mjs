export const motionFields = ['enter', 'delay', 'smooth', 'distance', 'library-ease'];
export const motionEases = ['power2.out', 'power3.out', 'power4.out', 'sine.inOut'];
export const motionLimits = {
  enter: [0, 2000],
  delay: [0, 500],
  smooth: [0, 2000],
  distance: [0, 96],
};

/** Validate the complete editable subset before previewing or writing source files. */
export function validateMotionSettings(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    return ['Expected motion settings.'];
  const errors = [];
  for (const key of Object.keys(value))
    if (!motionFields.includes(key)) errors.push(`Unknown motion setting: ${key}`);
  for (const [key, [min, max]] of Object.entries(motionLimits)) {
    if (!Number.isInteger(value[key]) || value[key] < min || value[key] > max)
      errors.push(`${key}: use a whole number from ${min} to ${max}.`);
  }
  if (!motionEases.includes(value['library-ease'])) errors.push('Select a supported easing.');
  return errors;
}
