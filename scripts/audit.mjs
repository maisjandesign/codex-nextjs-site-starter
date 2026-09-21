import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import postcss from 'postcss';
import values from 'postcss-value-parser';
import ts from 'typescript';
import { generateCSS, validateTokens } from './tokens.mjs';

export function auditCSS(css, file, names, breakpoints = [768, 1024]) {
  const errors = [];
  const fail = (node, message) =>
    errors.push(`${file}:${node.source?.start?.line || 1} ${message}`);
  let root;
  try {
    root = postcss.parse(css, { from: file });
  } catch (e) {
    return [String(e)];
  }
  root.walkAtRules((rule) => {
    if (rule.name === 'media')
      for (const m of rule.params.matchAll(/(?:min|max)-width\s*:\s*([\d.]+)px/g))
        if (!breakpoints.includes(Number(m[1]))) fail(rule, 'Unregistered breakpoint');
  });
  root.walkRules((rule) => {
    if (file !== 'base.css' && /(^|[^\w-])h[1-6](?![\w-])/.test(rule.selector))
      fail(rule, 'Heading selectors belong only in base.css');
    if (!['base.css', 'components.css'].includes(file) && /\.button\b/.test(rule.selector))
      fail(rule, 'Button styles belong in components.css');
  });
  root.walkDecls((d) => {
    if (d.important) fail(d, '!important hides consistency errors');
    if (d.prop.startsWith('--')) fail(d, 'Declare tokens only in tokens.json');
    if (d.prop === 'font-size') {
      const allowed = new Map([
        ['html', '100%'],
        ['body', 'var(--font-body)'],
        ...Array.from({ length: 6 }, (_, i) => [`h${i + 1}`, `var(--font-h${i + 1})`]),
        ['.small', 'var(--font-small)'],
        ['.label', 'var(--font-label)'],
        ['.lead', 'var(--font-lead)'],
      ]);
      if (file !== 'base.css' || allowed.get(d.parent.selector) !== d.value)
        fail(d, 'Use the central typography roles; no local font-size');
    }
    if (d.prop === 'font' && d.value !== 'inherit')
      fail(d, 'Font shorthand can override heading sizes');
    if (/^(transition|transition-property)$/.test(d.prop) && /\ball\b/.test(d.value))
      fail(d, 'Name transition properties explicitly');
    if (d.prop === 'outline' && /^(none|0)$/.test(d.value))
      fail(d, 'Do not remove focus indication');
    const parsed = values(d.value);
    parsed.walk((n) => {
      if (n.type === 'function' && n.value === 'var') {
        const ref = n.nodes[0]?.value;
        if (!names.has(ref)) fail(d, `Unknown token ${ref}`);
        return false;
      }
      if (n.type === 'function' && /^(rgb|rgba|hsl|hsla|oklch|lab|color)$/i.test(n.value))
        fail(d, 'Raw color: use a semantic token');
      if (n.type !== 'word') return;
      if (/^#/.test(n.value)) fail(d, 'Raw color: use a semantic token');
      const number = values.unit(n.value);
      if (!number) return;
      const v = Number(number.number),
        unit = number.unit.toLowerCase();
      if (unit && !Number.isInteger(v)) fail(d, `Fractional dimension ${n.value}`);
      if (unit && !['%', 'fr', 'ch'].includes(unit))
        fail(d, `Raw dimension ${n.value}: use a token`);
      if (
        !unit &&
        v !== 0 &&
        !(d.prop === 'opacity' && v === 1) &&
        /^(z-index|font-weight|line-height|opacity|gap|padding|margin)/.test(d.prop)
      )
        fail(d, 'Use the named token for this value');
    });
    if (
      /^(color|background|background-color|border-color|outline-color|fill|stroke)$/.test(d.prop) &&
      !/var\(/.test(d.value) &&
      !['transparent', 'inherit', 'currentColor', 'Highlight', 'ButtonText', 'none'].includes(
        d.value,
      )
    )
      fail(d, 'Unregistered color keyword');
  });
  return errors;
}

export function auditTSX(source, file) {
  const errors = [];
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const visit = (node) => {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(tree);
      const line = tree.getLineAndCharacterOfPosition(node.getStart()).line + 1;
      const fail = (text) => errors.push(`${file}:${line} ${text}`);
      if (tag === 'button' && !file.endsWith('/components/Button.tsx'))
        fail('Use the shared Button component');
      if (tag === 'input' && !file.endsWith('/components/Field.tsx'))
        fail('Use the shared Field component');
      if (tag === 'style') fail('Keep styles in the shared CSS system');
      for (const attr of node.attributes.properties)
        if (ts.isJsxAttribute(attr)) {
          if (attr.name.getText(tree) === 'style') fail('Inline styles bypass the token audit');
          if (
            attr.name.getText(tree) === 'className' &&
            attr.initializer &&
            /\[[^\]]+\]/.test(attr.initializer.getText(tree))
          )
            fail('Arbitrary utility values are not part of this CSS system');
        }
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  return errors;
}

const files = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? files(path.join(dir, e.name)) : [path.join(dir, e.name)]));
export function runAudit() {
  const t = JSON.parse(fs.readFileSync('src/design/tokens.json', 'utf8'));
  const errors = validateTokens(t);
  if (errors.length) return errors;
  const generated = generateCSS(t);
  if (
    !fs.existsSync('src/styles/tokens.css') ||
    fs.readFileSync('src/styles/tokens.css', 'utf8') !== generated
  )
    errors.push('tokens.css is stale or edited manually. Run npm run tokens.');
  const names = new Set([...generated.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  for (const file of files('src')) {
    if (file.endsWith('.css') && file !== 'src/styles/tokens.css')
      errors.push(
        ...auditCSS(
          fs.readFileSync(file, 'utf8'),
          path.basename(file),
          names,
          Object.values(t.breakpoints),
        ),
      );
    if (file.endsWith('.tsx')) errors.push(...auditTSX(fs.readFileSync(file, 'utf8'), file));
  }
  return errors;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const errors = runAudit();
  console.log(errors.length ? errors.join('\n') : 'PASS: tokens, CSS and shared primitives');
  process.exitCode = errors.length ? 1 : 0;
}
