import fs from 'node:fs';
import path from 'node:path';
import { generateCSS } from './token-contract.mjs';
import { getToken, mergePatch } from './token-editor.mjs';

export function saveTokenPatch(root, patch, base, io = fs) {
  const source = path.join(root, 'src/design/tokens.json');
  const css = path.join(root, 'src/styles/tokens.css');
  const oldSource = io.readFileSync(source, 'utf8');
  const oldCSS = io.readFileSync(css, 'utf8');
  const current = JSON.parse(oldSource);
  const next = mergePatch(current, patch);
  if (
    !base ||
    Object.keys(patch).some(
      (key) => !Object.hasOwn(base, key) || base[key] !== getToken(current, key),
    )
  ) {
    const error = new Error('Source changed. Reload saved values and reapply your draft.');
    error.status = 409;
    throw error;
  }
  // Synchronous writes serialize local requests. Roll back both files on write failure.
  // This is a local development transaction, not a multi-process database.
  try {
    io.writeFileSync(source, JSON.stringify(next, null, 2) + '\n');
    io.writeFileSync(css, generateCSS(next));
  } catch (error) {
    let restored = true;
    try {
      io.writeFileSync(source, oldSource);
    } catch {
      restored = false;
    }
    try {
      io.writeFileSync(css, oldCSS);
    } catch {
      restored = false;
    }
    throw new Error(
      restored
        ? 'Save failed; original source and CSS restored.'
        : 'Save failed; inspect source and CSS before retrying.',
      { cause: error },
    );
  }
  return next;
}
