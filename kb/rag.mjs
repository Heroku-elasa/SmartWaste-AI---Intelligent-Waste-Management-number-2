// Tiny dependency-free retriever (token overlap with IDF) — runs in Node, Cloudflare Workers and browsers.
const norm = (s) => s.toLowerCase().replace(/[۰-۹]/g, (c) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/[يك]/g, (c) => (c === 'ي' ? 'ی' : 'ک')).replace(/\u200c/g, ' ');
const tok = (s) => norm(s).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1);
export function makeRetriever(chunks) {
  const docs = chunks.map((c) => new Set(tok(c.title + ' ' + c.text)));
  const df = new Map();
  for (const d of docs) for (const w of d) df.set(w, (df.get(w) || 0) + 1);
  const N = docs.length;
  return (query, lang, k = 4) => {
    const q = [...new Set(tok(query))];
    return chunks
      .map((c, i) => {
        let s = 0;
        for (const w of q) if (docs[i].has(w)) s += Math.log(1 + N / df.get(w));
        if (c.lang === lang) s *= 1.3;
        return { c, s };
      })
      .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, k).map((x) => x.c);
  };
}
export const SYSTEM = `You are "GreenPars Assistant", advisor for GreenPars (Pars Granule Sabz): plastic-waste-to-recycled-granule plants in Iran plus a waste-to-energy/RDF extension.
Answer in the user's language (Persian, English or Turkish), concise and honest about risks. Show money in Toman AND USD (1 USD = 235,000 Toman, 28 Sep 2026).
Core facts: pilot 400 kg/h line by Pendar Polymer (Iranian maker), capex 31 bn Toman (~$132k); payback pessimistic never, base 5.3 yrs, target 2.1, optimistic 2.5; year-4 net ~5.9 bn. Funding: founders 31%, Pendar instalments 21%, Environment Fund 32%, crowdfunding 16%. 10 cities: 715 bn Toman ($3.0M), 211 jobs. WtE tariff 55,500 rial/kWh (~$0.024) → stand-alone plant not bankable; recommend two SPVs + feedstock contract, sponsor 15-25% non-controlling in recycling SPV, RDF for cement first.
Use the CONTEXT excerpts from project reports when relevant and cite them like [report name]. Never invent contacts, prices or legal guarantees.`;
export function buildMessages(retrieve, messages, lang = 'fa') {
  const clean = messages.slice(-10).filter((m) => m.role === 'user' || m.role === 'assistant').map((m) => ({ role: m.role, content: String(m.content).slice(0, 3000) }));
  const last = [...clean].reverse().find((m) => m.role === 'user')?.content || '';
  const hits = retrieve(last, lang);
  const ctx = hits.map((h) => `[${h.title}] ${h.text}`).join('\n---\n').slice(0, 5000);
  return { msgs: [{ role: 'system', content: SYSTEM + (ctx ? `\n\nCONTEXT:\n${ctx}` : '') }, ...clean], sources: [...new Set(hits.map((h) => h.title))] };
}
