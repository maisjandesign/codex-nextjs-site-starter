import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { validateTokens, generateCSS } from '../src/design/token-contract.mjs';
export { validateTokens, generateCSS };

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const t = JSON.parse(fs.readFileSync('src/design/tokens.json', 'utf8'));
  const errors = validateTokens(t);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  fs.mkdirSync('src/styles', { recursive: true });
  fs.writeFileSync('src/styles/tokens.css', generateCSS(t));
  console.log('Generated tokens.css');
}
