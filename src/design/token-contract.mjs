import { validateMotionSettings, motionFields } from './motion-settings.mjs';

export function validateTokens(t) {
  const errors = [];
  errors.push(
    ...validateMotionSettings(
      Object.fromEntries(motionFields.map((key) => [key, t.motion?.[key]])),
    ),
  );
  for (const name of ['editorial', 'portfolio', 'experimental'])
    errors.push(
      ...validateMotionSettings(t.motionProfiles?.[name]).map((error) => `${name}: ${error}`),
    );
  const integer = (v, key, min = 0) => {
    if (!Number.isInteger(v) || v < min) errors.push(`${key}: expected integer >= ${min}`);
  };
  for (const group of ['space', 'radius', 'size', 'border', 'weight', 'z', 'breakpoints']) {
    if (!t[group] || !Object.keys(t[group]).length) errors.push(`Missing group ${group}`);
    for (const [k, v] of Object.entries(t[group] || {})) integer(v, `${group}.${k}`);
  }
  for (const k of ['body', 'small', 'label', 'lead']) integer(t.font?.[k], `font.${k}`, 12);
  for (const k of ['family', 'mono'])
    if (typeof t.font?.[k] !== 'string' || !t.font[k]) errors.push(`font.${k}: required string`);
  for (const mode of ['mobile', 'tablet', 'desktop']) {
    let previous = Infinity;
    for (const h of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
      const v = t.headings?.[mode]?.[h];
      integer(v, `headings.${mode}.${h}`, 16);
      if (v > previous) errors.push(`headings.${mode}: scale must descend`);
      previous = v;
    }
  }
  for (const mode of ['mobile', 'tablet', 'desktop'])
    for (const k of [
      'page-gutter',
      'section-padding',
      'content-gap',
      'heading-gap',
      'card-padding',
      'hero-padding',
    ])
      integer(t.layout?.[mode]?.[k], `layout.${mode}.${k}`);
  if (!(t.breakpoints?.tablet < t.breakpoints?.desktop)) errors.push('Breakpoints must ascend');
  for (const k of ['fast', 'normal', 'enter', 'stagger', 'delay'])
    integer(t.motion?.[k], `motion.${k}`);
  integer(t.motion?.distance, 'motion.distance');
  if (
    !['power2.out', 'power3.out', 'power4.out', 'sine.inOut'].includes(t.motion?.['library-ease'])
  )
    errors.push('motion.library-ease: expected a registered GSAP easing');
  if (!(t.motion?.press >= 0.95 && t.motion.press <= 1))
    errors.push('motion.press: expected 0.95–1');
  if (!/^cubic-bezier\([-\d.,\s]+\)$/.test(t.motion?.ease))
    errors.push('motion.ease: expected cubic-bezier');
  for (const k of ['heading', 'body'])
    if (!(t.line?.[k] >= 1 && t.line[k] <= 2)) errors.push(`line.${k}: expected 1–2`);
  if (!(t.opacity?.disabled >= 0 && t.opacity.disabled <= 1))
    errors.push('opacity.disabled: expected 0–1');
  const colors = [
    'bg',
    'surface',
    'text',
    'muted',
    'border',
    'accent',
    'accent-hover',
    'on-accent',
    'soft',
    'focus',
    'danger',
  ];
  for (const mode of ['light', 'dark'])
    for (const k of colors)
      if (!/^#[\da-f]{6}$/i.test(t.themes?.[mode]?.[k]))
        errors.push(`themes.${mode}.${k}: expected six-digit hex`);
  for (const mode of ['mobile', 'tablet', 'desktop'])
    for (const [k, v] of Object.entries(t.layout?.[mode] || {}))
      if (!Object.values(t.space || {}).includes(v))
        errors.push(`layout.${mode}.${k}: must use a value from the spacing scale`);
  return errors;
}

export function generateCSS(t) {
  const lines = ['/* GENERATED from src/design/tokens.json. Run npm run tokens. */', ':root {'];
  const put = (k, v) => lines.push(`  --${k}: ${v};`);
  for (const group of ['space', 'radius', 'size', 'border'])
    for (const [k, v] of Object.entries(t[group])) put(`${group}-${k}`, `calc(${v} * 1rem / 16)`);
  for (const [k, v] of Object.entries(t.font))
    put(`font-${k}`, typeof v === 'number' ? `calc(${v} * 1rem / 16)` : v);
  for (const group of ['weight', 'line', 'z', 'opacity'])
    for (const [k, v] of Object.entries(t[group])) put(`${group}-${k}`, v);
  for (const [k, v] of Object.entries(t.motion))
    put(`motion-${k}`, ['fast', 'normal', 'enter', 'stagger', 'delay'].includes(k) ? `${v}ms` : v);
  for (const [k, v] of Object.entries(t.headings.mobile))
    put(`font-${k}`, `calc(${v} * 1rem / 16)`);
  for (const [k, v] of Object.entries(t.layout.mobile))
    put(`layout-${k}`, `calc(${v} * 1rem / 16)`);
  lines.push('}');
  for (const mode of ['light', 'dark']) {
    lines.push(`${mode === 'light' ? ':root, ' : ''}[data-theme="${mode}"] {`);
    for (const [k, v] of Object.entries(t.themes[mode])) put(`color-${k}`, v);
    lines.push(`  color-scheme: ${mode};`, '}');
  }
  for (const mode of ['tablet', 'desktop']) {
    lines.push(`@media (min-width: ${t.breakpoints[mode]}px) {`, '  :root {');
    for (const [k, v] of Object.entries(t.headings[mode]))
      put(`font-${k}`, `calc(${v} * 1rem / 16)`);
    for (const [k, v] of Object.entries(t.layout[mode]))
      put(`layout-${k}`, `calc(${v} * 1rem / 16)`);
    lines.push('  }', '}');
  }
  for (const key of Object.keys(t.themes.light))
    lines.push(`.swatch[data-token="${key}"] { background: var(--color-${key}); }`);
  for (const key of Object.keys(t.space))
    lines.push(`.space-bar[data-token="${key}"] { inline-size: var(--space-${key}); }`);
  return lines.join('\n') + '\n';
}
