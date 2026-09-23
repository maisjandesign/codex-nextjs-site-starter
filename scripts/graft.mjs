import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
const command = args[0] || 'map';
const allowed = new Set(['build', 'check', 'map', 'ask', 'grep', 'skeleton', 'callers', 'version']);
const unsupported = args.some((arg) =>
  ['--deep', '--lsp', '--provider', '--model', '--api-key', '--base-url', '--dir'].includes(
    arg.split('=')[0],
  ),
);
if (!allowed.has(command) || unsupported) {
  console.error('Use the local structural Graft commands listed in docs/GRAFT.md.');
  process.exit(2);
}
const require = createRequire(import.meta.url);
let cli;
try {
  cli = join(dirname(require.resolve('@nanonets/graft/package.json')), 'dist/cli.js');
} catch {
  console.error('Graft is not installed. Run npm run setup in the project root, then retry.');
  process.exit(1);
}
const result = spawnSync(process.execPath, [cli, ...(args.length ? args : [command])], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    DO_NOT_TRACK: '1',
    GRAFT_DIR: join(root, 'graft'),
    GRAFT_NO_GITIGNORE: '1',
    GRAFT_NO_IGNORE: '1',
  },
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
