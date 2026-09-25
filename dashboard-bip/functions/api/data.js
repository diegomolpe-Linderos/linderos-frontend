// Cloudflare Pages Function: /api/data
// GET  -> devuelve el blob cifrado guardado en KV (público: el contenido va cifrado igual)
// POST -> reemplaza el blob en KV, requiere Authorization: Bearer <PUBLISH_TOKEN>
//
// Requiere en el proyecto de Cloudflare Pages:
//  - Un KV namespace enlazado con el binding "BIP_KV"
//  - Una variable de entorno secreta "PUBLISH_TOKEN"

const KV_KEY = 'modelo';

function cors(resp) {
  resp.headers.set('Cache-Control', 'no-store');
  return resp;
}

export async function onRequestGet({ env }) {
  const raw = await env.BIP_KV.get(KV_KEY);
  if (!raw) {
    return cors(new Response(JSON.stringify({ error: 'Sin datos publicados todavía.' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    }));
  }
  return cors(new Response(raw, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  }));
}

export async function onRequestPost({ request, env }) {
  const auth = request.headers.get('Authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

  if (!env.PUBLISH_TOKEN || token !== env.PUBLISH_TOKEN) {
    return cors(new Response(JSON.stringify({ error: 'No autorizado.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return cors(new Response(JSON.stringify({ error: 'JSON inválido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  if (!payload || payload.enc !== 1 || !payload.salt || !payload.iv || !payload.data) {
    return cors(new Response(JSON.stringify({ error: 'Formato de payload inesperado.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    }));
  }

  await env.BIP_KV.put(KV_KEY, JSON.stringify(payload));

  return cors(new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  }));
}
