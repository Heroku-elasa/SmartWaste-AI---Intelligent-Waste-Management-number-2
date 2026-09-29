// Telegram bot webhook (Cloudflare Pages Function): POST /api/telegram
// Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_SECRET (webhook secret_token), HF_TOKEN
import chunks from '../../kb/chunks.json';
import { makeRetriever, buildMessages } from '../../kb/rag.mjs';
import { PLANTS, payback, year } from '../../src/model.ts';

const SITE = 'https://greenpars-smartwaste.pages.dev';
const retrieve = makeRetriever(chunks);
const detect = (s = '') => (/[\u0600-\u06FF]/.test(s) ? 'fa' : /[çğışöüÇĞİŞÖÜ]|merhaba|nedir|yatırım/i.test(s) ? 'tr' : 'en');
const L = (l, fa, en, tr) => (l === 'fa' ? fa : l === 'tr' ? tr : en);

const DOCS = {
  fa: [['پیچ دک نسخه ۶', 'fa/Pitch_Deck_v6_FA.pdf'], ['طرح جامع', 'fa/Master_Plan_FA.pdf'], ['گزارش ۱۷: مدل‌های کسب‌وکار', 'fa/17_New_Business_Models_FA.pdf'], ['گزارش ۱۸: خلاصه سرمایه‌گذار', 'fa/18_Investor_Cover_Email_One_Pager_FA.pdf']],
  en: [['Pitch deck v6', 'en/Pitch_Deck_v6_EN.pdf'], ['Report 17: business models', 'en/17_New_Business_Models_EN.pdf'], ['Report 18: investor one-pager', 'en/18_Investor_Cover_Email_One_Pager_EN.pdf']],
  tr: [['Yatırımcı sunumu v6', 'tr/Pitch_Deck_v6_TR.pdf'], ['Kapsamlı plan', 'tr/GreenPars_Kapsamli_Plan_TR.pdf'], ['İstanbul işbirliği sunumu', 'tr/Istanbul_Isbirligi_Sunumu_TR.pdf'], ['Rapor 18: yatırımcı özeti', 'tr/18_Investor_Cover_Email_One_Pager_TR.pdf']],
};

const menu = (l) => ({
  inline_keyboard: [
    [{ text: L(l, '💰 سرمایه‌گذاری', '💰 Invest', '💰 Yatırım'), callback_data: `invest:${l}` }, { text: L(l, '🧮 ماشین‌حساب', '🧮 Calculator', '🧮 Hesaplayıcı'), callback_data: `calc:${l}` }],
    [{ text: L(l, '📄 گزارش‌ها و پیچ دک', '📄 Reports & deck', '📄 Raporlar & sunum'), callback_data: `docs:${l}` }, { text: L(l, '🎬 ویدیو', '🎬 Video', '🎬 Video'), callback_data: `video:${l}` }],
    [{ text: L(l, '⚡ نیروگاه پسماند', '⚡ Waste-to-energy', '⚡ Atıktan enerji'), callback_data: `wte:${l}` }, { text: '🌐 ' + L(l, 'سایت', 'Website', 'Web sitesi'), url: `${SITE}/?lang=${l}#invest` }],
    [{ text: '🇮🇷 فارسی', callback_data: 'lang:fa' }, { text: '🇬🇧 English', callback_data: 'lang:en' }, { text: '🇹🇷 Türkçe', callback_data: 'lang:tr' }],
  ],
});

const TXT = {
  start: (l) => L(l,
    '♻️ به دستیار «پارس گرانول سبز» خوش آمدید!\nبازیافت ضایعات پلاستیک به گرانول و تبدیل پسماند به انرژی.\n\nهر سؤالی دارید بنویسید (هوش مصنوعی از روی گزارش‌های طرح جواب می‌دهد) یا از منو انتخاب کنید.\nمحاسبه سریع: /calc 110000 35000',
    '♻️ Welcome to the GreenPars assistant!\nPlastic waste → recycled granule, rejects → energy.\n\nAsk anything (the AI answers from the project reports) or use the menu.\nQuick calc: /calc 110000 35000',
    '♻️ GreenPars asistanına hoş geldiniz!\nPlastik atık → geri dönüştürülmüş granül, ıskarta → enerji.\n\nİstediğinizi sorun (yapay zekâ proje raporlarından yanıtlar) veya menüyü kullanın.\nHızlı hesap: /calc 110000 35000'),
  invest: (l) => L(l,
    '💰 فرصت سرمایه‌گذاری\n• پایلوت ۴۰۰ کیلوگرم در ساعت: ۳۱ میلیارد تومان (≈ ۱۳۲ هزار دلار)\n• بازگشت سرمایه: ۲٫۱ سال (هدف) تا ۵٫۳ سال (پایه)\n• درخواست: ۵ تا ۸ میلیارد تومان برای ۱۵ تا ۲۰٪ سهام، بدون کنترل و با حق تقدم\n• ۱۰ شهر: ۷۱۵ میلیارد تومان، ۲۱۱ شغل\n⚠ در بدترین سناریو (گرانول ۸۵ هزار تومان) زیان‌ده است؛ رشد فقط پس از عبور از دروازه رشد.',
    '💰 Investment opportunity\n• 400 kg/h pilot: 31 bn Toman (≈ $132k)\n• Payback: 2.1 yrs (target) to 5.3 yrs (base)\n• Ask: 5–8 bn Toman for 15–20% equity, non-controlling, with ROFR\n• 10 cities: 715 bn Toman, 211 jobs\n⚠ The worst case (granule 85k) loses money; growth only after the growth gate.',
    '💰 Yatırım fırsatı\n• 400 kg/saat pilot: 31 milyar Tomen (≈ 132 bin $)\n• Geri dönüş: 2,1 yıl (hedef) – 5,3 yıl (baz)\n• Talep: %15–20 pay için 5–8 milyar Tomen, kontrolsüz, önalım hakkıyla\n• 10 şehir: 715 milyar Tomen, 211 iş\n⚠ En kötü senaryo (granül 85 bin) zarar eder; büyüme ancak büyüme kapısından sonra.'),
  wte: (l) => L(l,
    '⚡ نیروگاه پسماند: تعرفه ساتبا ۵۵٬۵۰۰ ریال بر کیلووات‌ساعت (≈ ۰٫۰۲۴ دلار). نیروگاه مستقل بدون حق پذیرش پسماند ۳۰ تا ۵۵ سال بازگشت دارد.\nپیشنهاد: دو شرکت جدا + قرارداد خوراک، اسپانسر ۱۵ تا ۲۵٪ بدون کنترل در شرکت بازیافت، و اول خط RDF برای کارخانه سیمان.',
    '⚡ WtE: SATBA tariff 55,500 rial/kWh (≈ $0.024). A stand-alone plant pays back in 30–55 yrs without a gate fee.\nRecommendation: two SPVs + feedstock contract, sponsor 15–25% non-controlling in the recycling SPV, RDF for cement kilns first.',
    '⚡ Atıktan enerji: SATBA tarifesi 55.500 riyal/kWh (≈ 0,024 $). Kabul ücreti olmadan bağımsız tesis 30–55 yılda geri döner.\nÖneri: iki ayrı SPV + hammadde sözleşmesi, sponsor geri dönüşüm SPV’de %15–25 kontrolsüz pay, önce çimento için RDF.'),
  calcHelp: (l) => L(l, '🧮 بنویسید: /calc قیمت‌گرانول قیمت‌ضایعات\nمثال: /calc 110000 35000', '🧮 Send: /calc granulePrice wastePrice\nExample: /calc 110000 35000', '🧮 Yazın: /calc granülFiyatı atıkFiyatı\nÖrnek: /calc 110000 35000'),
};

export function calc(l, g, w) {
  const pb = payback(PLANTS.small, g, w), y = year(PLANTS.small, 0.7, g, w);
  const usd = (bn) => Math.round((bn * 1e9) / 235000).toLocaleString('en-US');
  return L(l,
    `🧮 گرانول ${g.toLocaleString()} / ضایعات ${w.toLocaleString()} تومان\nدرآمد سالانه: ${y.rev.toFixed(1)} میلیارد تومان\nسود خالص سال پایدار: ${y.net.toFixed(1)} میلیارد تومان (≈ $${usd(y.net)})\nبازگشت سرمایه: ${pb ? pb.toFixed(1) + ' سال' : 'ندارد ❌'}`,
    `🧮 Granule ${g.toLocaleString()} / waste ${w.toLocaleString()} Toman\nRevenue: ${y.rev.toFixed(1)} bn Toman\nSteady-year net profit: ${y.net.toFixed(1)} bn Toman (≈ $${usd(y.net)})\nPayback: ${pb ? pb.toFixed(1) + ' yrs' : 'never ❌'}`,
    `🧮 Granül ${g.toLocaleString()} / atık ${w.toLocaleString()} Tomen\nGelir: ${y.rev.toFixed(1)} milyar Tomen\nİstikrarlı yıl net kâr: ${y.net.toFixed(1)} milyar Tomen (≈ $${usd(y.net)})\nGeri dönüş: ${pb ? pb.toFixed(1) + ' yıl' : 'yok ❌'}`);
}

async function tg(env, method, body) {
  const r = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  return r.json();
}

async function ai(env, text, l) {
  const key = env.HF_TOKEN || env.AI_API_KEY;
  if (!key) return null;
  const { msgs, sources } = buildMessages(retrieve, [{ role: 'user', content: text }], l);
  const r = await fetch(`${env.AI_BASE_URL || 'https://router.huggingface.co/v1'}/chat/completions`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` }, body: JSON.stringify({ model: env.AI_MODEL || 'Qwen/Qwen2.5-72B-Instruct', temperature: 0.3, max_tokens: 700, messages: msgs }) });
  if (!r.ok) return null;
  const j = await r.json();
  const reply = j.choices?.[0]?.message?.content;
  return reply ? reply + (sources.length ? `\n\n📚 ${sources.join(' · ')}` : '') : null;
}

async function handle(env, chat, action, l) {
  if (action === 'start' || action === 'lang') return tg(env, 'sendMessage', { chat_id: chat, text: TXT.start(l), reply_markup: menu(l) });
  if (action === 'invest') return tg(env, 'sendMessage', { chat_id: chat, text: TXT.invest(l), reply_markup: menu(l) });
  if (action === 'wte') return tg(env, 'sendMessage', { chat_id: chat, text: TXT.wte(l), reply_markup: menu(l) });
  if (action === 'calc') return tg(env, 'sendMessage', { chat_id: chat, text: TXT.calcHelp(l) });
  if (action === 'docs') {
    for (const [title, f] of DOCS[l]) await tg(env, 'sendDocument', { chat_id: chat, document: `${SITE}/docs/${f}`, caption: title });
    return tg(env, 'sendMessage', { chat_id: chat, text: `🌐 ${SITE}/?lang=${l}#docs`, reply_markup: menu(l) });
  }
  if (action === 'video') return tg(env, 'sendVideo', { chat_id: chat, video: `${SITE}/video/GreenPars_Promo_${l.toUpperCase()}.mp4`, caption: 'GreenPars — 30s', supports_streaming: true });
}

export async function onRequestPost({ request, env }) {
  if (env.TELEGRAM_SECRET && request.headers.get('x-telegram-bot-api-secret-token') !== env.TELEGRAM_SECRET) return new Response('forbidden', { status: 403 });
  const u = await request.json().catch(() => ({}));
  try {
    if (u.callback_query) {
      const [action, l] = u.callback_query.data.split(':');
      await tg(env, 'answerCallbackQuery', { callback_query_id: u.callback_query.id });
      await handle(env, u.callback_query.message.chat.id, action, l || 'fa');
    } else if (u.message?.text) {
      const chat = u.message.chat.id, text = u.message.text.trim();
      const l = text.startsWith('/') ? ({ fa: 'fa', en: 'en', tr: 'tr' }[(u.message.from?.language_code || '').slice(0, 2)] || 'fa') : detect(text);
      const m = text.match(/^\/calc(?:@\w+)?\s+([\d,]+)\s+([\d,]+)/);
      if (m) await tg(env, 'sendMessage', { chat_id: chat, text: calc(l, +m[1].replace(/,/g, ''), +m[2].replace(/,/g, '')) });
      else if (/^\/(start|menu|help)/.test(text)) await handle(env, chat, 'start', l);
      else if (/^\/(invest|docs|video|wte|calc)/.test(text)) await handle(env, chat, text.slice(1).split(/[\s@]/)[0], l);
      else {
        await tg(env, 'sendChatAction', { chat_id: chat, action: 'typing' });
        const reply = (await ai(env, text, l)) || L(l, 'فعلاً هوش مصنوعی در دسترس نیست. از منو استفاده کنید.', 'AI is unavailable right now. Please use the menu.', 'Yapay zekâ şu an kullanılamıyor. Lütfen menüyü kullanın.');
        await tg(env, 'sendMessage', { chat_id: chat, text: reply.slice(0, 4000), reply_markup: menu(l) });
      }
    }
  } catch (e) { console.log('tg error', e); }
  return new Response('ok');
}

// GET /api/telegram?setup=<TELEGRAM_SECRET> → registers webhook + bot commands
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.TELEGRAM_BOT_TOKEN) return new Response('TELEGRAM_BOT_TOKEN not set', { status: 503 });
  if (url.searchParams.get('setup') !== env.TELEGRAM_SECRET) return new Response('forbidden', { status: 403 });
  const hook = await tg(env, 'setWebhook', { url: `${url.origin}/api/telegram`, secret_token: env.TELEGRAM_SECRET, allowed_updates: ['message', 'callback_query'] });
  const cmds = await tg(env, 'setMyCommands', { commands: [
    { command: 'start', description: 'Menu / منو / Menü' }, { command: 'invest', description: 'Investment / سرمایه‌گذاری / Yatırım' },
    { command: 'calc', description: 'Profit calculator: /calc 110000 35000' }, { command: 'docs', description: 'Reports & pitch deck' },
    { command: 'video', description: '30s promo video' }, { command: 'wte', description: 'Waste-to-energy' } ] });
  return new Response(JSON.stringify({ hook, cmds }), { headers: { 'content-type': 'application/json' } });
}
