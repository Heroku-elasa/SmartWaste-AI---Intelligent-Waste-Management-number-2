// Offline fallback assistant: answers common questions from the model when no AI key is configured.
import { Lang } from './i18n';
import { PLANTS, RATE, payback, year } from './model';

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));
const f = (v: number, d = 1) => v.toFixed(d);

export function localAnswer(qRaw: string, lang: Lang): string {
  const q = qRaw.toLowerCase();
  const nums = (qRaw.replace(/[۰-۹]/g, (c) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).match(/\d[\d,]*/g) || []).map((x) => +x.replace(/,/g, '')).filter((x) => x >= 1000);
  const L = (fa: string, en: string, tr: string) => (lang === 'fa' ? fa : lang === 'tr' ? tr : en);

  if (nums.length >= 1 && has(q, ['گرانول', 'granule', 'granül', 'قیمت', 'price', 'fiyat'])) {
    const g = nums[0], w = nums[1] ?? 45000, pb = payback(PLANTS.small, g, w), y = year(PLANTS.small, 0.7, g, w);
    return L(`با گرانول ${g.toLocaleString()} و ضایعات ${w.toLocaleString()} تومان: سود خالص سال پایدار ${f(y.net)} میلیارد تومان، بازگشت ${pb ? f(pb) + ' سال' : 'ندارد'}.`,
      `Granule ${g.toLocaleString()} / waste ${w.toLocaleString()} Toman: steady-year net profit ${f(y.net)} bn Toman, payback ${pb ? f(pb) + ' yrs' : 'never'}.`,
      `Granül ${g.toLocaleString()} / atık ${w.toLocaleString()} Tomen: istikrarlı yıl net kâr ${f(y.net)} milyar Tomen, geri dönüş ${pb ? f(pb) + ' yıl' : 'yok'}.`);
  }
  if (has(q, ['انرژی', 'نیروگاه', 'اسپانسر', 'wte', 'energy', 'sponsor', 'enerji', 'rdf'])) return L(
    'تعرفه ساتبا ۵۵٬۵۰۰ ریال/kWh (≈۰٫۰۲۴ دلار) است؛ نیروگاه مستقل بدون حق پذیرش پسماند ۳۰ تا ۵۵ سال بازگشت دارد. پیشنهاد: دو شرکت جدا + قرارداد خوراک، اسپانسر ۱۵–۲۵٪ بدون کنترل در شرکت بازیافت، و اول خط RDF برای سیمان.',
    'SATBA tariff is 55,500 rial/kWh (~$0.024); a stand-alone plant pays back in 30–55 yrs without a gate fee. Recommended: two SPVs + feedstock contract, sponsor 15–25% non-controlling in the recycling SPV, RDF for cement first.',
    'SATBA tarifesi 55.500 riyal/kWh (~0,024 $); kabul ücreti olmadan bağımsız tesis 30–55 yılda geri döner. Öneri: iki ayrı SPV + hammadde sözleşmesi, sponsor geri dönüşüm SPV\'de %15–25 kontrolsüz pay, önce çimento için RDF.');
  if (has(q, ['تامین', 'تأمین', 'وام', 'fund', 'loan', 'finans', 'kredi'])) return L(
    'پایلوت ۳۱ میلیارد: مؤسسان ۳۱٪، اقساط پندار ۲۱٪، صندوق ملی محیط زیست ۳۲٪ (ماده ۱۷ آیین‌نامه)، تأمین جمعی ۱۶٪.',
    'Pilot 31 bn Toman: founders 31%, Pendar instalments 21%, National Environment Fund 32%, crowdfunding 16%.',
    'Pilot 31 milyar Tomen: kurucular %31, Pendar taksitleri %21, Ulusal Çevre Fonu %32, kitle fonlaması %16.');
  if (has(q, ['شهر', 'city', 'şehir', 'scope', 'دامنه'])) return L(
    '۱۰ شهر: سرمایه ۷۱۵ میلیارد (۳ میلیون دلار)، بازگشت ۴٫۷ سال (هدف ۲٫۳)، ۲۱۱ شغل. همه شهرها فعلاً واقع‌بینانه نیست.',
    '10 cities: capex 715 bn Toman ($3.0M), payback 4.7 yrs (target 2.3), 211 jobs. All cities is not realistic yet.',
    '10 şehir: yatırım 715 milyar Tomen (3,0 M$), geri dönüş 4,7 yıl (hedef 2,3), 211 iş. Tüm şehirler şimdilik gerçekçi değil.');
  if (has(q, ['ریسک', 'risk', 'خطر'])) return L(
    'ریسک‌های اصلی: نبود پیش‌فاکتور کتبی و تعهد خرید، قیمت ضایعات، نوسان ارز، تحریم بانکی ترکیه. اقدام ۹۰ روزه: پیش‌فاکتور پندار، ۱۰ تأمین‌کننده، ۳ نامه تعهد خرید.',
    'Main risks: no written quote or buyer LOIs, feedstock price, FX, Turkish banking sanctions. 90-day actions: Pendar quote, 10 suppliers, 3 buyer LOIs.',
    'Ana riskler: yazılı teklif ve alıcı niyet mektubu yok, hammadde fiyatı, kur, Türk bankacılık yaptırımları. 90 günlük adımlar: Pendar teklifi, 10 tedarikçi, 3 alıcı niyet mektubu.');
  const pb = payback(PLANTS.small, 100000, 45000)!;
  return L(`(حالت آفلاین) پایلوت ۴۰۰ کیلوگرم/ساعت، سرمایه ۳۱ میلیارد تومان (${f(31e9 / RATE / 1000, 0)} هزار دلار)، بازگشت پایه ${f(pb)} سال. بپرسید: «قیمت گرانول ۱۱۰۰۰۰ ضایعات ۳۵۰۰۰»، تأمین مالی، ۱۰ شهر، ریسک یا نیروگاه پسماند.`,
    `(offline mode) 400 kg/h pilot, capex 31 bn Toman ($${f(31e9 / RATE / 1000, 0)}k), base payback ${f(pb)} yrs. Try: "granule 110000 waste 35000", funding, 10 cities, risks or WtE.`,
    `(çevrimdışı mod) 400 kg/saat pilot, yatırım 31 milyar Tomen (${f(31e9 / RATE / 1000, 0)} bin $), baz geri dönüş ${f(pb)} yıl. Deneyin: "granül 110000 atık 35000", finansman, 10 şehir, riskler veya atıktan enerji.`);
}
