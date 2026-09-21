import fs from 'node:fs';
import path from 'node:path';
import { saveTokenPatch } from '../../../design/token-store.mjs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
function local(request: Request, requireOrigin: boolean) {
  if (process.env.NODE_ENV !== 'development') return false;
  const host = request.headers.get('host') || '';
  try {
    const url = new URL(`http://${host}`);
    if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) return false;
    if (requireOrigin) {
      const origin = new URL(request.headers.get('origin') || '');
      if (origin.protocol !== 'http:' || origin.host !== host) return false;
    }
    return true;
  } catch {
    return false;
  }
}
export async function GET(request: Request) {
  if (!local(request, false)) return new Response(null, { status: 404 });
  try {
    return Response.json(
      JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/design/tokens.json'), 'utf8')),
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return Response.json({ errors: ['Could not read source tokens.'] }, { status: 500 });
  }
}
export async function POST(request: Request) {
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 });
  if (!local(request, true)) return new Response(null, { status: 403 });
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return new Response(null, { status: 415 });
  const text = await request.text();
  if (text.length > 32768) return new Response(null, { status: 413 });
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!body || typeof body !== 'object' || !body.patch || !body.base)
    return new Response(null, { status: 400 });
  try {
    const tokens = saveTokenPatch(process.cwd(), body.patch, body.base);
    return Response.json({ saved: true, tokens });
  } catch (error) {
    const e = error as Error & { status?: number };
    return Response.json(
      { errors: [e.message] },
      { status: e.status ?? (e.message.startsWith('Save failed') ? 500 : 400) },
    );
  }
}
