import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Chat from './Chat';
import { DOCS, INVEST, POSTS, pick } from './content';
import { DICTS, Lang, WTE_TEXT } from './i18n';
import { PLANTS, RATE, SCENARIOS, SCOPES, USE_OF_FUNDS, WTE_TARIFF_RIAL, payback, projection, usd, wte } from './model';

type Page = 'home' | 'invest' | 'blog' | 'calc' | 'scopes' | 'funding' | 'wte' | 'docs';
const PAGES: Page[] = ['home', 'invest', 'blog', 'calc', 'scopes', 'funding', 'wte', 'docs'];
const COLORS = ['#16a34a', '#0ea5e9', '#f59e0b', '#8b5cf6', '#ef4444'];

const REPORTS = [
  { n: '16', f: 'Turkish_Trader_Sanctions_Critique' },
  { n: '17', f: 'New_Business_Models' },
  { n: '18', f: 'Investor_Cover_Email_One_Pager' },
];

export default function App() {
  const [lang, setLang] = useState<Lang>(() => { const l = new URLSearchParams(location.search).get('lang'); return (l === 'en' || l === 'tr' ? l : 'fa') as Lang; });
  const [page, setPageRaw] = useState<Page>(() => { const h = location.hash.slice(1) as Page; return PAGES.includes(h) ? h : 'home'; });
  const [menu, setMenu] = useState(false);
  useEffect(() => { const f = () => { const h = location.hash.slice(1) as Page; if (PAGES.includes(h)) setPageRaw(h); const l = new URLSearchParams(location.search).get('lang'); if (l === 'fa' || l === 'en' || l === 'tr') setLang(l); }; window.addEventListener('hashchange', f); window.addEventListener('popstate', f); return () => { window.removeEventListener('hashchange', f); window.removeEventListener('popstate', f); }; }, []);
  const setPage = (p: Page) => { setPageRaw(p); setMenu(false); history.replaceState(null, '', `?lang=${lang}#${p}`); window.scrollTo(0, 0); };
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr'; document.title = `${DICTS[lang].brand} | ${DICTS[lang].tagline}`; }, [lang]);
  const t = (k: string) => DICTS[lang][k] ?? k;
  const loc = lang === 'fa' ? 'fa-IR' : lang === 'tr' ? 'tr-TR' : 'en-US';
  const n = (v: number, d = 0) => v.toLocaleString(loc, { maximumFractionDigits: d, minimumFractionDigits: d });
  const money = (bn: number, d = 1) => `${n(bn, d)} ${t('bn')} ≈ $${n(usd(bn) / 1e6, 2)}M`;
  const navKey: Record<Page, string> = { home: 'nav_home', invest: 'nav_invest', blog: 'nav_blog', calc: 'nav_calc', scopes: 'nav_scopes', funding: 'nav_funding', wte: 'nav_wte', docs: 'nav_docs' };

  return (
    <div dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang} className="app">
      <header>
        <div className="brand" onClick={() => setPage('home')}>♻ {t('brand')}<small>{t('tagline')}</small></div>
        <button className="burger" aria-label="menu" onClick={() => setMenu(!menu)}>{menu ? '✕' : '☰'}</button>
        <nav className={menu ? 'open' : ''}>{PAGES.map((p) => <button key={p} className={p === page ? 'on' : ''} onClick={() => setPage(p)}>{t(navKey[p])}</button>)}</nav>
        <div className="langs">{(['fa', 'en', 'tr'] as Lang[]).map((l) => <button key={l} className={l === lang ? 'on' : ''} onClick={() => { setLang(l); history.replaceState(null, '', `?lang=${l}#${page}`); }}>{l.toUpperCase()}</button>)}</div>
      </header>
      <div className="rate">{t('rate_note')}</div>
      <main>
        {page === 'home' && <Home t={t} n={n} money={money} go={setPage} lang={lang} />}
        {page === 'invest' && <Invest t={t} lang={lang} go={setPage} />}
        {page === 'blog' && <Blog lang={lang} />}
        {page === 'calc' && <Calc t={t} n={n} money={money} />}
        {page === 'scopes' && <Scopes t={t} n={n} money={money} />}
        {page === 'funding' && <Funding t={t} n={n} money={money} />}
        {page === 'wte' && <Wte t={t} n={n} money={money} lang={lang} />}
        {page === 'docs' && <Docs t={t} lang={lang} />}
      </main>
      <Chat lang={lang} />
      <footer>GreenPars SmartWaste · {t('ai_note')} · 1 USD = {n(RATE)} Toman</footer>
    </div>
  );
}

type P = { t: (k: string) => string; n: (v: number, d?: number) => string; money: (bn: number, d?: number) => string };

function Home({ t, n, money, go, lang }: P & { go: (p: Page) => void; lang: Lang }) {
  const s = PLANTS.small;
  const y4 = projection(s, 100_000, 45_000)[3];
  const pb = payback(s, 100_000, 45_000)!;
  return (
    <>
      <section className="hero" style={{ backgroundImage: 'linear-gradient(90deg,#052e16dd,#052e1677),url(/img/hero.jpg)' }}>
        <h1>{t('brand')}</h1><p>{t('hero_p')}</p>
        <div className="row"><button onClick={() => go('calc')}>{t('nav_calc')}</button><button className="ghost" onClick={() => go('wte')}>{t('nav_wte')}</button></div>
      </section>
      <div className="kpis">
        <Kpi label={t('k_capex')} value={money(s.capex, 0)} />
        <Kpi label={t('k_profit')} value={money(y4.net)} />
        <Kpi label={t('k_pb')} value={`${n(pb, 1)} ${t('years')}`} />
        <Kpi label={t('k_jobs')} value={n(SCOPES[0].jobs)} />
      </div>
      <div className="card"><b>⚠ </b>{t('gate')}</div>
      <div className="card"><Video lang={lang} /></div>
    </>
  );
}

const Kpi = ({ label, value }: { label: string; value: string }) => <div className="kpi"><span>{label}</span><b>{value}</b></div>;

function Calc({ t, n, money }: P) {
  const [granule, setG] = useState(100_000);
  const [waste, setW] = useState(45_000);
  const [size, setSize] = useState<'small' | 'big'>('small');
  const plant = PLANTS[size];
  const rows = useMemo(() => projection(plant, granule, waste), [plant, granule, waste]);
  const pb = payback(plant, granule, waste);
  return (
    <>
      <h2>{t('calc_title')}</h2>
      <div className="grid2">
        <div className="card">
          <label>{t('granule')}: <b>{n(granule)}</b><input type="range" min={70000} max={140000} step={1000} value={granule} onChange={(e) => setG(+e.target.value)} /></label>
          <label>{t('waste')}: <b>{n(waste)}</b><input type="range" min={20000} max={70000} step={1000} value={waste} onChange={(e) => setW(+e.target.value)} /></label>
          <label>{t('plant')}<select value={size} onChange={(e) => setSize(e.target.value as 'small' | 'big')}><option value="small">{t('small')}</option><option value="big">{t('big')}</option></select></label>
          <div className="big">{t('payback')}: {pb === null ? t('never') : `${n(pb, 1)} ${t('years')}`}</div>
          <h3>{t('scen')}</h3>
          <table><thead><tr><th></th><th>{t('granule')}</th><th>{t('waste')}</th><th>{t('payback')}</th><th></th></tr></thead><tbody>
            {SCENARIOS.map((s) => { const p = payback(plant, s.granule, s.waste); return (
              <tr key={s.id}><td>{t(s.id)}</td><td>{n(s.granule)}</td><td>{n(s.waste)}</td><td>{p === null ? t('never') : n(p, 1)}</td><td><button onClick={() => { setG(s.granule); setW(s.waste); }}>{t('apply')}</button></td></tr>); })}
          </tbody></table>
        </div>
        <div className="card">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={rows.map((r, i) => ({ y: `${t('year')} ${i + 1}`, [t('revenue')]: +r.rev.toFixed(1), [t('net')]: +r.net.toFixed(1), [t('cf')]: +r.cf.toFixed(1) }))}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="y" /><YAxis /><Tooltip /><Legend />
              <Bar dataKey={t('revenue')} fill="#0ea5e9" /><Bar dataKey={t('net')} fill="#16a34a" /><Bar dataKey={t('cf')} fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
          <table><thead><tr><th>{t('year')}</th><th>{t('output')}</th><th>{t('revenue')}</th><th>{t('net')}</th><th>{t('cf')}</th></tr></thead><tbody>
            {rows.map((r, i) => <tr key={i}><td>{i + 1}</td><td>{n(r.outT)}</td><td>{n(r.rev, 1)}</td><td className={r.net < 0 ? 'neg' : ''}>{n(r.net, 1)}</td><td>{n(r.cf, 1)}</td></tr>)}
          </tbody></table>
          <small>{t('bn')} · {money(rows[rows.length - 1].net)}</small>
        </div>
      </div>
    </>
  );
}

function Scopes({ t, n, money }: P) {
  return (
    <>
      <h2>{t('nav_scopes')}</h2>
      <div className="card"><table><thead><tr><th></th>{SCOPES.map((s) => <th key={s.id}>{t(s.id)}</th>)}</tr></thead><tbody>
        <tr><td>{t('plants')}</td>{SCOPES.map((s) => <td key={s.id}>{s.big}/{s.small}</td>)}</tr>
        <tr><td>{t('capex')}</td>{SCOPES.map((s) => <td key={s.id}>{money(s.capex, 0)}</td>)}</tr>
        <tr><td>{t('profit_now')}</td>{SCOPES.map((s) => <td key={s.id}>{n(s.profitNow)}</td>)}</tr>
        <tr><td>{t('profit_target')}</td>{SCOPES.map((s) => <td key={s.id}>{n(s.profitTarget)}</td>)}</tr>
        <tr><td>{t('pb_now')} / {t('pb_target')}</td>{SCOPES.map((s) => <td key={s.id}>{n(s.pbNow, 1)} / {n(s.pbTarget, 1)}</td>)}</tr>
        <tr><td>{t('out')}</td>{SCOPES.map((s) => <td key={s.id}>{n(s.outT)}</td>)}</tr>
        <tr><td>{t('jobs')}</td>{SCOPES.map((s) => <td key={s.id}>{n(s.jobs)}</td>)}</tr>
      </tbody></table></div>
      <div className="card"><ResponsiveContainer width="100%" height={260}>
        <BarChart data={SCOPES.map((s) => ({ s: t(s.id), [t('profit_now')]: s.profitNow, [t('profit_target')]: s.profitTarget }))}>
          <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="s" /><YAxis /><Tooltip /><Legend />
          <Bar dataKey={t('profit_now')} fill="#f59e0b" /><Bar dataKey={t('profit_target')} fill="#16a34a" />
        </BarChart></ResponsiveContainer></div>
      <div className="card warn">{t('scopes_note')}</div>
    </>
  );
}

function Funding({ t, money }: P) {
  const src = [{ k: 'founders', v: 31 }, { k: 'pendar', v: 21 }, { k: 'envfund', v: 32 }, { k: 'crowd', v: 16 }];
  return (
    <>
      <h2>{t('fund_title')}</h2>
      <div className="grid2">
        <div className="card"><ResponsiveContainer width="100%" height={280}><PieChart>
          <Pie data={src.map((s) => ({ name: t(s.k), value: s.v }))} dataKey="value" outerRadius={100} label={(e) => `${e.value}%`}>
            {src.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer>
          <table><tbody>{src.map((s) => <tr key={s.k}><td>{t(s.k)}</td><td>{s.v}%</td><td>{money((31 * s.v) / 100)}</td></tr>)}</tbody></table>
        </div>
        <div className="card"><h3>{t('uses')}</h3><table><tbody>{USE_OF_FUNDS.map((u) => <tr key={u.id}><td>{t(u.id)}</td><td>{money(u.bn, 0)}</td></tr>)}</tbody></table></div>
      </div>
    </>
  );
}

function Wte({ t, n, money, lang }: P & { lang: Lang }) {
  const [mw, setMw] = useState(5);
  const [tech, setTech] = useState<keyof typeof WTE_TARIFF_RIAL>('incineration');
  const [capexMw, setCapex] = useState(6_000_000);
  const [gate, setGate] = useState(0);
  const r = wte(mw, WTE_TARIFF_RIAL[tech], capexMw, gate);
  const x = WTE_TEXT[lang];
  const techKey = { incineration: 'inc', digestion: 'ad', landfill: 'lfg' } as const;
  return (
    <>
      <h2>{t('wte_title')}</h2>
      <div className="card ok">{t('wte_verdict')}</div>
      <div className="grid2">
        <div className="card"><h3>✅ {t('pros')}</h3><ul>{x.pros.map((p) => <li key={p}>{p}</li>)}</ul></div>
        <div className="card"><h3>⚠ {t('cons')}</h3><ul>{x.cons.map((p) => <li key={p}>{p}</li>)}</ul></div>
      </div>
      <div className="card"><h3>{t('share')}</h3><table><tbody>{x.shares.map(([a, b]) => <tr key={a}><td><b>{a}</b></td><td>{b}</td></tr>)}</tbody></table>
        <ol>{x.steps.map((s) => <li key={s}>{s}</li>)}</ol></div>
      <h3>{t('wte_calc')}</h3>
      <div className="grid2">
        <div className="card">
          <label>{t('tech')}<select value={tech} onChange={(e) => setTech(e.target.value as keyof typeof WTE_TARIFF_RIAL)}>
            {Object.keys(WTE_TARIFF_RIAL).map((k) => <option key={k} value={k}>{t(techKey[k as keyof typeof techKey])} — {n(WTE_TARIFF_RIAL[k as keyof typeof WTE_TARIFF_RIAL])} rial/kWh</option>)}</select></label>
          <label>{t('mw')}: <b>{mw}</b><input type="range" min={1} max={10} value={mw} onChange={(e) => setMw(+e.target.value)} /></label>
          <label>{t('capex_mw')}: <b>${n(capexMw)}</b><input type="range" min={1_500_000} max={9_000_000} step={250_000} value={capexMw} onChange={(e) => setCapex(+e.target.value)} /></label>
          <label>{t('gatefee')}: <b>{n(gate)}</b><input type="range" min={0} max={3_000_000} step={50_000} value={gate} onChange={(e) => setGate(+e.target.value)} /></label>
        </div>
        <div className="card">
          <Kpi label={t('capex')} value={money(r.capexBn, 0)} />
          <Kpi label={t('energy')} value={n(r.mwh)} />
          <Kpi label={t('wte_rev')} value={money(r.revBn)} />
          <Kpi label={t('simple_pb')} value={isFinite(r.simplePayback) ? `${n(r.simplePayback, 1)} ${t('years')}` : t('never')} />
        </div>
      </div>
    </>
  );
}

function Video({ lang }: { lang: Lang }) {
  const L = lang.toUpperCase();
  return (
    <video key={lang} controls playsInline preload="metadata" poster={`/video/poster_${lang}.jpg`} style={{ width: '100%', borderRadius: 10, background: '#000' }}>
      <source src={`/video/GreenPars_Promo_${L}.mp4`} type="video/mp4" />
      <source src={`/video/GreenPars_Promo_${L}.webm`} type="video/webm" />
    </video>
  );
}

function Invest({ t, lang, go }: { t: (k: string) => string; lang: Lang; go: (p: Page) => void }) {
  const d = DOCS[lang];
  return (
    <>
      <section className="hero" style={{ backgroundImage: 'linear-gradient(90deg,#052e16ee,#052e1666),url(/img/invest.jpg)' }}>
        <h1>{pick(lang, INVEST.title)}</h1><p>{pick(lang, INVEST.lead)}</p>
        <div className="row"><a className="btn" href={`/docs/${lang}/${d[0].file}`} download>⬇ {d[0].title}</a><button className="ghost" onClick={() => go('calc')}>{t('nav_calc')}</button></div>
      </section>
      <div className="kpis">{INVEST.facts.map((f, i) => <div className="kpi" key={i}><b>{pick(lang, f.v)}</b><span>{pick(lang, f.s)}</span></div>)}</div>
      {INVEST.sections.map((s, i) => (
        <article className={`feature ${i % 2 ? 'rev' : ''}`} key={i}>
          <img src={s.img} alt={pick(lang, s.h)} loading="lazy" />
          <div><h2>{pick(lang, s.h)}</h2><p>{pick(lang, s.p)}</p></div>
        </article>
      ))}
      <div className="card"><Video lang={lang} /></div>
      <h2>{t('downloads')}</h2>
      <div className="dl">{d.map((x) => <a key={x.file} href={`/docs/${lang}/${x.file}`} download className={`dlc ${x.kind}`}><span>{x.file.endsWith('pptx') ? '📊' : x.file.endsWith('docx') ? '📝' : '📄'}</span>{x.title}</a>)}</div>
      <h2>{t('faq')}</h2>
      {INVEST.faq.map(([q, a], i) => <details className="card" key={i}><summary><b>{pick(lang, q)}</b></summary><p>{pick(lang, a)}</p></details>)}
      <div className="card ok">{t('contact_note')} <a href="mailto:info@greenpars.ir?subject=GreenPars%20investment">info@greenpars.ir</a></div>
    </>
  );
}

function Blog({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="posts">
      {POSTS.map((p) => (
        <article className="card post" key={p.id} id={p.id}>
          <img src={p.img} alt={pick(lang, p.h)} loading="lazy" />
          <small>{p.date}</small>
          <h2>{pick(lang, p.h)}</h2>
          <p className={open === p.id ? '' : 'clamp'}>{pick(lang, p.p)}</p>
          <button onClick={() => setOpen(open === p.id ? null : p.id)}>{open === p.id ? '−' : '+'}</button>
        </article>
      ))}
    </div>
  );
}

function Docs({ t, lang }: { t: (k: string) => string; lang: Lang }) {
  return (
    <>
      <h2>{t('pod_title')}</h2>
      <div className="card"><audio controls preload="none" src={`/audio/podcast_${lang}.mp3`} style={{ width: '100%' }} /></div>
      <h2>{t('docs_title')}</h2>
      <div className="dl">{DOCS[lang].map((x) => <a key={x.file} href={`/docs/${lang}/${x.file}`} target="_blank" className={`dlc ${x.kind}`}><span>{x.file.endsWith('pptx') ? '📊' : x.file.endsWith('docx') ? '📝' : '📄'}</span>{x.title}</a>)}
        <a className="dlc" href="https://github.com/SBZ-EDU/GreenPars-SmartWaste/blob/main/docs/20_WtE_Sponsor_Assessment.md" target="_blank"><span>⚡</span>20 · WtE & Sponsor (FA/EN/TR)</a>
      </div>
    </>
  );
}
