import { validateTokens } from './token-contract.mjs';

export const fontChoices = {
  starter: {
    label: 'Starter stack (Inter if installed)',
    value:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  system: {
    label: 'System sans',
    value: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  editorial: { label: 'System serif', value: 'Georgia, Cambria, "Times New Roman", serif' },
  technical: { label: 'System mono', value: 'ui-monospace, SFMono-Regular, Consolas, monospace' },
};
export function editorFields(tokens) {
  return [
    ...Object.keys(tokens.themes).flatMap((theme) =>
      Object.keys(tokens.themes[theme]).map((name) => ({
        path: `themes.${theme}.${name}`,
        group: `Colors / ${theme}`,
        kind: 'color',
        min: 0,
        max: 0,
      })),
    ),
    ...[
      'size.control',
      'size.control-small',
      'size.container',
      ...Object.keys(tokens.radius).map((k) => `radius.${k}`),
      ...['body', 'small', 'label', 'lead'].map((k) => `font.${k}`),
      ...Object.keys(tokens.headings.desktop).map((k) => `headings.desktop.${k}`),
      ...Object.keys(tokens.layout.desktop).map((k) => `layout.desktop.${k}`),
    ].map((path) => ({
      path,
      group: path.startsWith('layout')
        ? 'Desktop spacing'
        : path.startsWith('font') || path.startsWith('headings')
          ? 'Typography'
          : 'Geometry',
      kind: 'number',
      min:
        path.startsWith('radius') || path.startsWith('layout')
          ? 0
          : path.startsWith('headings')
            ? 16
            : path.startsWith('font')
              ? 12
              : 24,
      max: path === 'size.container' ? 2560 : path.startsWith('radius') ? 999 : 256,
    })),
    { path: 'font.family', group: 'Typography', kind: 'font', min: 0, max: 0 },
  ];
}
export function getToken(tokens, path) {
  return path.split('.').reduce((value, key) => value[key], tokens);
}
export function setToken(tokens, path, value) {
  const keys = path.split('.');
  let target = tokens;
  for (const key of keys.slice(0, -1)) target = target[key];
  target[keys.at(-1)] = value;
}
// The server derives this allowlist from its own source. Clients cannot add token paths.
export function validatePatch(source, patch) {
  if (!patch || typeof patch !== 'object' || Array.isArray(patch))
    return ['Expected a token patch.'];
  const fields = editorFields(source);
  const errors = [];
  for (const [path, value] of Object.entries(patch)) {
    const field = fields.find((f) => f.path === path);
    if (!field) {
      errors.push(`${path}: not editable in the desktop editor.`);
      continue;
    }
    if (
      field.kind === 'number' &&
      (!Number.isInteger(value) || value < field.min || value > field.max)
    )
      errors.push(`${path}: use an integer from ${field.min} to ${field.max}.`);
    if (field.kind === 'color' && (typeof value !== 'string' || !/^#[\da-f]{6}$/i.test(value)))
      errors.push(`${path}: use a six-digit hex color.`);
    if (
      field.kind === 'font' &&
      value !== source.font.family &&
      !Object.values(fontChoices).some((f) => f.value === value)
    )
      errors.push(`${path}: choose a registered font stack.`);
  }
  if (errors.length) return errors;
  const next = structuredClone(source);
  for (const [path, value] of Object.entries(patch)) setToken(next, path, value);
  return validateTokens(next);
}
export function mergePatch(source, patch) {
  const errors = validatePatch(source, patch);
  if (errors.length) throw new Error(errors.join('\n'));
  const next = structuredClone(source);
  for (const [path, value] of Object.entries(patch)) setToken(next, path, value);
  return next;
}
