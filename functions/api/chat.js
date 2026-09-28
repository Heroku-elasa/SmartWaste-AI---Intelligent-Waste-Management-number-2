// Cloudflare Pages Function: POST /api/chat — RAG + Hugging Face router. Secret: HF_TOKEN. Optional: AI_MODEL, AI_BASE_URL
import chunks from '../../kb/chunks.json';
import { makeRetriever, buildMessages } from '../../kb/rag.mjs';
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type', 'access-control-allow-methods': 'POST, OPTIONS' };
export const onRequestOptions = () => new Response(null, { headers: CORS });
const retrieve = makeRetriever(chunks);
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json', ...CORS } });
export async function onRequestPost({ request, env }) {
  const key = env.HF_TOKEN || env.AI_API_KEY;
  if (!key) return json({ error: 'AI not configured' }, 503);
  const { messages = [], lang = 'fa' } = await request.json().catch(() => ({}));
  const { msgs, sources } = buildMessages(retrieve, messages, lang);
  const model = env.AI_MODEL || 'Qwen/Qwen2.5-72B-Instruct';
  const r = await fetch(`${env.AI_BASE_URL || 'https://router.huggingface.co/v1'}/chat/completions`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` }, body: JSON.stringify({ model, temperature: 0.3, max_tokens: 700, messages: msgs }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return json({ error: j?.error?.message || j?.error || `upstream ${r.status}` }, 502);
  return json({ reply: j.choices?.[0]?.message?.content ?? '', model, sources });
}
