import fs from 'node:fs';
import path from 'node:path';
import { validateMotionSettings } from '../../../design/motion-settings.mjs';
import { generateCSS, validateTokens } from '../../../../scripts/tokens.mjs';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  // Never expose source writes in a production deployment.
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 });
  let origin: URL;
  try {
    origin = new URL(request.headers.get('origin') || '');
  } catch {
    return new Response(null, { status: 403 });
  }
  // Next.js may normalize request.url's hostname; compare the actual Host header.
  if (
    origin.protocol !== 'http:' ||
    !['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname) ||
    origin.host !== request.headers.get('host')
  )
    return new Response(null, { status: 403 });
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return new Response(null, { status: 415 });
  const body = await request.text();
  if (body.length > 4096) return new Response(null, { status: 413 });
  let settings;
  try {
    settings = JSON.parse(body);
  } catch {
    return new Response(null, { status: 400 });
  }
  const errors = validateMotionSettings(settings);
  if (errors.length) return Response.json({ errors }, { status: 400 });
  const source = path.join(process.cwd(), 'src/design/tokens.json');
  const css = path.join(process.cwd(), 'src/styles/tokens.css');
  const originalSource = fs.readFileSync(source, 'utf8');
  const originalCSS = fs.readFileSync(css, 'utf8');
  const tokens = JSON.parse(originalSource);
  tokens.motion = { ...tokens.motion, ...settings };
  const tokenErrors = validateTokens(tokens);
  if (tokenErrors.length) return Response.json({ errors: tokenErrors }, { status: 400 });
  try {
    // Synchronous paired writes cannot interleave with another request in this process.
    fs.writeFileSync(source, JSON.stringify(tokens, null, 2) + '\n');
    fs.writeFileSync(css, generateCSS(tokens));
  } catch {
    fs.writeFileSync(source, originalSource);
    fs.writeFileSync(css, originalCSS);
    return new Response(null, { status: 500 });
  }
  return Response.json({ saved: true });
}
