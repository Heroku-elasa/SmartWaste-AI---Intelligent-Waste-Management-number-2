// Builds kb/chunks.json from knowledge/*.md for RAG (used by server, Cloudflare function and HF Space)
import fs from 'node:fs';
const dir = 'knowledge', out = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
  const lang = /_fa\.md$|lessons_fa/.test(f) ? 'fa' : /_tr\.md$/.test(f) ? 'tr' : /_en\.md$/.test(f) ? 'en' : 'mix';
  const lines = fs.readFileSync(`${dir}/${f}`, 'utf8').split('\n').filter((l) => l.trim());
  const title = lines[0].replace(/^#\s*/, '');
  let buf = '';
  for (const l of lines.slice(1)) {
    buf += (l.length < 40 ? ' | ' : '\n') + l;
    if (buf.length > 700) { out.push({ src: f, lang, title, text: buf.trim() }); buf = ''; }
  }
  if (buf.trim()) out.push({ src: f, lang, title, text: buf.trim() });
}
fs.writeFileSync('kb/chunks.json', JSON.stringify(out));
console.log('chunks', out.length);
