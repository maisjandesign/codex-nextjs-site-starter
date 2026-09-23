import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import ts from 'typescript';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const lists = await Promise.all(entries.map((entry) => entry.isDirectory()
    ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return lists.flat();
}
const sources = await files(path.join(root, 'src'));
for (const file of sources.filter((name) => name.endsWith('.css'))) {
  const css = postcss.parse(await readFile(file, 'utf8'), { from: file });
  css.walkDecls((declaration) => {
    const prop = declaration.prop;
    // Fine technical strokes do not define design spacing.
    if (/^(border|outline)(-|$)/.test(prop) && !/offset|radius/.test(prop)) return;
    const spatial = prop.startsWith('--') || /^(font-size|line-height|letter-spacing|margin|padding|gap|row-gap|column-gap|width|height|min-width|max-width|min-height|max-height|top|right|bottom|left|inset|border-radius|outline-offset|scroll-margin|scroll-padding)/.test(prop);
    if (!spatial || prop === '--stroke' || prop === '--focus-stroke') return;
    for (const match of declaration.value.matchAll(/(-?\d*\.?\d+)px\b/g)) {
      const value = Number(match[1]);
      if (!Number.isInteger(value) || value % 8 !== 0) {
        problems.push(`${path.relative(root, file)}:${declaration.source.start.line}: ${prop}: ${value}px is outside the 8px scale`);
      }
    }
    if (/^(font-size|line-height)$/.test(prop) && /clamp\(|\d(?:\.\d+)?(?:rem|em|vw|vh)/.test(declaration.value)) {
      problems.push(`${path.relative(root, file)}: ${prop} must use the shared integer px typography tokens`);
    }
  });
}

const importedComponents = new Set();
for (const file of sources.filter((name) => name.endsWith('.stories.tsx'))) {
  const source = ts.createSourceFile(file, await readFile(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const moduleName = statement.moduleSpecifier.text;
    const modulePath = moduleName.startsWith('@/') ? path.join(root, 'src', moduleName.slice(2))
      : moduleName.startsWith('.') ? path.resolve(path.dirname(file), moduleName) : null;
    if (!modulePath) continue;
    const bindings = statement.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) for (const binding of bindings.elements) {
      importedComponents.add(`${modulePath}:${binding.propertyName?.text ?? binding.name.text}`);
    }
    if (statement.importClause?.name) importedComponents.add(`${modulePath}:default`);
  }
}
let count = 0;
for (const file of sources.filter((name) => name.includes(`${path.sep}components${path.sep}`) && name.endsWith('.tsx') && !name.includes('.stories.'))) {
  const source = ts.createSourceFile(file, await readFile(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  for (const statement of source.statements) {
    if (!statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
    const isDefault = statement.modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword);
    const names = ts.isFunctionDeclaration(statement) && statement.name ? [statement.name.text]
      : ts.isVariableStatement(statement) ? statement.declarationList.declarations.filter((d) => ts.isIdentifier(d.name)).map((d) => d.name.text) : [];
    for (const name of names.filter((name) => /^[A-Z]/.test(name))) {
      count++;
      const key = `${file.replace(/\.tsx$/, '')}:${isDefault ? 'default' : name}`;
      if (!importedComponents.has(key)) problems.push(`${path.relative(root, file)}: exported ${name} has no story import`);
    }
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else console.log(`Design checks passed: authored CSS grid values and story imports for ${count} exported components.`);
console.log('Scope: CSS px declarations + direct component exports/imports. Runtime geometry, story quality, assets, inline styles and utility classes still need review.');
