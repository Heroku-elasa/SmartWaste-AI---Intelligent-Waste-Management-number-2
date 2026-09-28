import { useEffect, useRef, useState } from 'react';
import { Lang } from './i18n';
import { localAnswer } from './localbot';

const API = (import.meta as unknown as { env: Record<string, string> }).env.VITE_API_BASE || '';
type Msg = { role: 'user' | 'assistant'; content: string };
const HELLO: Record<Lang, string> = { fa: 'سلام! دستیار پارس گرانول سبز هستم. درباره سود، تأمین مالی، شهرها یا نیروگاه پسماند بپرسید.', en: 'Hi! I am the GreenPars assistant. Ask about profit, funding, cities or waste-to-energy.', tr: 'Merhaba! GreenPars asistanıyım. Kâr, finansman, şehirler veya atıktan enerji hakkında sorun.' };
const PH: Record<Lang, string> = { fa: 'سؤال خود را بنویسید…', en: 'Type your question…', tr: 'Sorunuzu yazın…' };

export default function Chat({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<'ai' | 'offline'>('offline');
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { fetch(`${API}/api/health`).then((r) => r.json()).then((j) => setMode(j.ai ? 'ai' : 'offline')).catch(() => setMode('offline')); }, []);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, busy]);

  async function send() {
    const q = input.trim(); if (!q || busy) return;
    const next: Msg[] = [...msgs, { role: 'user', content: q }];
    setMsgs(next); setInput(''); setBusy(true);
    let reply = '';
    if (mode === 'ai') {
      try {
        const r = await fetch(`${API}/api/chat`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ messages: next, lang }) });
        const j = await r.json(); if (r.ok && j.reply) reply = j.reply + (j.sources?.length ? `\n\n📚 ${j.sources.join(' · ')}` : '');
      } catch { /* fall back */ }
    }
    if (!reply) reply = localAnswer(q, lang);
    setMsgs([...next, { role: 'assistant', content: reply }]); setBusy(false);
  }

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen(!open)} aria-label="chat">{open ? '×' : '💬'}</button>
      {open && (
        <div className="chat">
          <div className="chat-h">GreenPars AI <small>{mode === 'ai' ? '● online' : '○ offline'}</small></div>
          <div className="chat-b">
            <div className="m a">{HELLO[lang]}</div>
            {msgs.map((m, i) => <div key={i} className={`m ${m.role === 'user' ? 'u' : 'a'}`}>{m.content}</div>)}
            {busy && <div className="m a">…</div>}
            <div ref={end} />
          </div>
          <div className="chat-i">
            <input value={input} placeholder={PH[lang]} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
            <button onClick={send} disabled={busy}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
