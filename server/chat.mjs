// Local/VPS chat API with RAG. OpenAI-compatible upstream (default: Hugging Face router).
// Env: HF_TOKEN  or  AI_API_KEY + AI_BASE_URL ; AI_MODEL ; PORT
import http from 'node:http';
import fs from 'node:fs';
import { makeRetriever, buildMessages } from '../kb/rag.mjs';
try { for (const l of fs.readFileSync('.env', 'utf8').split('\n')) { const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ''); } } catch {}
const KEY = process.env.AI_API_KEY || process.env.HF_TOKEN || '';
const BASE = (process.env.AI_BASE_URL || 'https://router.huggingface.co/v1').replace(/\/$/, '');
const MODEL = process.env.AI_MODEL || 'Qwen/Qwen2.5-72B-Instruct';
const PORT = +(process.env.PORT || 3001);
const isLocal = /localhost|127\.0\.0\.1/.test(BASE);
const retrieve = makeRetriever(JSON.parse(fs.readFileSync(new URL('../kb/chunks.json', import.meta.url))));
const send = (res, code, obj) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(obj)); };
http.createServer((req, res) => {
  if (req.url === '/api/health') return send(res, 200, { ai: !!(KEY || isLocal), model: MODEL, rag: true });
  if (req.url !== '/api/chat' || req.method !== 'POST') return send(res, 404, { error: 'not found' });
  if (!KEY && !isLocal) return send(res, 503, { error: 'AI not configured' });
  let body = '';
  req.on('data', (c) => { body += c; if (body.length > 50_000) req.destroy(); });
  req.on('end', async () => {
    try {
      const { messages = [], lang = 'fa' } = JSON.parse(body || '{}');
      const { msgs, sources } = buildMessages(retrieve, messages, lang);
      const r = await fetch(`${BASE}/chat/completions`, { method: 'POST', headers: { 'content-type': 'application/json', ...(KEY ? { authorization: `Bearer ${KEY}` } : {}) }, body: JSON.stringify({ model: MODEL, temperature: 0.3, max_tokens: 700, messages: msgs }), signal: AbortSignal.timeout(60_000) });
      const j = await r.json();
      if (!r.ok) return send(res, 502, { error: j?.error?.message || j?.error || `upstream ${r.status}` });
      send(res, 200, { reply: j.choices?.[0]?.message?.content ?? '', model: MODEL, sources });
    } catch (e) { send(res, 500, { error: String(e?.message || e) }); }
  });
}).listen(PORT, '0.0.0.0', () => console.log(`GreenPars RAG API :${PORT} → ${BASE} (${MODEL}) ai=${!!(KEY || isLocal)}`));
