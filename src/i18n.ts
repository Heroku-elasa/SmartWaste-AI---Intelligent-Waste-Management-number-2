export type Lang = 'fa' | 'en' | 'tr';
type Dict = Record<string, string>;

const fa: Dict = {
  brand: 'پارس گرانول سبز', tagline: 'بازیافت ضایعات پلاستیک به گرانول + تبدیل پسماند به انرژی',
  nav_home: 'خانه', nav_calc: 'ماشین‌حساب سود', nav_scopes: 'سه دامنه اجرا', nav_funding: 'تأمین مالی', nav_wte: 'پسماند به انرژی و اسپانسر', nav_docs: 'گزارش‌ها و پادکست',
  rate_note: 'نرخ دلار آزاد: ۲۳۵٬۰۰۰ تومان (۶ مهر ۱۴۰۵)', bn: 'میلیارد تومان',
  hero_p: 'پایلوت ۴۰۰ کیلوگرم/ساعت با ماشین‌آلات ایرانی (پندار پلیمر)، سپس رشد مرحله‌ای به ۱۰ شهر. همه اعداد با مدل واقعی و استهلاک محاسبه شده‌اند.',
  k_capex: 'سرمایه پایلوت', k_profit: 'سود خالص سال ۴', k_pb: 'بازگشت (سناریوی پایه)', k_jobs: 'اشتغال ۱۰ شهر', yr: 'سال',
  calc_title: 'ماشین‌حساب سود پایلوت', granule: 'قیمت گرانول (تومان/کیلو)', waste: 'قیمت ضایعات (تومان/کیلو)', plant: 'اندازه کارخانه', small: 'کوچک ۴۰۰ kg/h (۳۱ میلیارد)', big: 'بزرگ ۱۰۰۰ kg/h (۸۴ میلیارد)',
  year: 'سال', output: 'تولید (تن)', revenue: 'درآمد', net: 'سود خالص', cf: 'جریان نقد', payback: 'دوره بازگشت', never: 'بازگشت ندارد', years: 'سال',
  scen: 'سناریوها', pess: 'بدبینانه', base: 'پایه', target: 'هدف', opt: 'خوش‌بینانه', apply: 'اعمال',
  gate: 'دروازه رشد: ضایعات ≤ ۳۵–۴۰ هزار، گرانول ≥ ۱۰۵ هزار تومان و ۶ ماه سودده پیاپی',
  ten: '۱۰ شهر', half: 'نیمی از شهرها', all: 'همه شهرها', capex: 'سرمایه', profit_now: 'سود (قیمت فعلی)', profit_target: 'سود (هدف)', pb_now: 'بازگشت فعلی', pb_target: 'بازگشت هدف', jobs: 'اشتغال', out: 'تولید سالانه (تن)', plants: 'کارخانه بزرگ/کوچک',
  scopes_note: 'توصیه: فقط دامنه ۱۰ شهر واقع‌بینانه است؛ بقیه پس از عبور از دروازه رشد.',
  fund_title: 'ترکیب تأمین مالی پایلوت (۳۱ میلیارد)', founders: 'آورده مؤسسان', pendar: 'اقساط پندار پلیمر', envfund: 'صندوق ملی محیط زیست', crowd: 'تأمین مالی جمعی', uses: 'مصارف', machinery: 'ماشین‌آلات', building: 'سوله و تأسیسات', wc: 'سرمایه در گردش', permits: 'مجوز و راه‌اندازی',
  wte_title: 'آیا مدل «اسپانسر نیروگاه پسماند + سهم در طرح ما» خوب است؟',
  wte_verdict: 'جمع‌بندی: فقط با ساختار دو شرکت جدا (SPV) و قرارداد خوراک. اسپانسر نباید کنترل طرح بازیافت را بگیرد.',
  wte_calc: 'ماشین‌حساب نیروگاه پسماند', mw: 'ظرفیت (مگاوات)', tech: 'فناوری', capex_mw: 'سرمایه هر مگاوات (دلار)', gatefee: 'حق پذیرش پسماند (تومان/تن)', inc: 'زباله‌سوز/گازی‌سازی', ad: 'هاضم بی‌هوازی', lfg: 'گاز لندفیل',
  energy: 'انرژی سالانه (MWh)', wte_rev: 'درآمد سالانه', simple_pb: 'بازگشت ساده',
  pros: 'مزایا', cons: 'ریسک‌ها', share: 'ساختار سهام پیشنهادی',
  docs_title: 'گزارش‌ها', pod_title: 'پادکست ۳ دقیقه‌ای', ai_note: 'دستیار هوش مصنوعی اختیاری است؛ داشبورد بدون کلید API کار می‌کند.',
};

const en: Dict = {
  brand: 'GreenPars Granule', tagline: 'Plastic waste to recycled granule + waste-to-energy',
  nav_home: 'Home', nav_calc: 'Profit calculator', nav_scopes: 'Three scopes', nav_funding: 'Funding', nav_wte: 'WtE & sponsor', nav_docs: 'Reports & podcast',
  rate_note: 'Free-market rate: 235,000 Toman / USD (28 Sep 2026)', bn: 'bn Toman',
  hero_p: 'A 400 kg/h pilot on Iranian machinery (Pendar Polymer), then gated growth to 10 cities. All figures use the realistic model including depreciation.',
  k_capex: 'Pilot capex', k_profit: 'Net profit, year 4', k_pb: 'Payback (base case)', k_jobs: 'Jobs, 10 cities', yr: 'yr',
  calc_title: 'Pilot profit calculator', granule: 'Granule price (Toman/kg)', waste: 'Waste price (Toman/kg)', plant: 'Plant size', small: 'Small 400 kg/h (31 bn)', big: 'Large 1000 kg/h (84 bn)',
  year: 'Year', output: 'Output (t)', revenue: 'Revenue', net: 'Net profit', cf: 'Cash flow', payback: 'Payback', never: 'never', years: 'yrs',
  scen: 'Scenarios', pess: 'Pessimistic', base: 'Base', target: 'Target', opt: 'Optimistic', apply: 'Apply',
  gate: 'Growth gate: waste ≤ 35–40k, granule ≥ 105k Toman/kg and 6 consecutive profitable months',
  ten: '10 cities', half: 'Half of cities', all: 'All cities', capex: 'Capex', profit_now: 'Profit (current prices)', profit_target: 'Profit (target)', pb_now: 'Payback now', pb_target: 'Payback target', jobs: 'Jobs', out: 'Annual output (t)', plants: 'Large/small plants',
  scopes_note: 'Recommendation: only the 10-city scope is realistic; the others only after passing the growth gate.',
  fund_title: 'Pilot funding mix (31 bn Toman)', founders: 'Founders', pendar: 'Pendar Polymer instalments', envfund: 'National Environment Fund', crowd: 'Crowdfunding', uses: 'Use of funds', machinery: 'Machinery', building: 'Building & utilities', wc: 'Working capital', permits: 'Permits & start-up',
  wte_title: 'Is "sponsor funds a WtE plant + takes a stake in our plan" a good model?',
  wte_verdict: 'Verdict: yes, but only as two separate SPVs linked by a feedstock contract. The sponsor must not control the recycling company.',
  wte_calc: 'WtE plant calculator', mw: 'Capacity (MW)', tech: 'Technology', capex_mw: 'Capex per MW (USD)', gatefee: 'Gate fee (Toman/t)', inc: 'Incineration/gasification', ad: 'Anaerobic digestion', lfg: 'Landfill gas',
  energy: 'Annual energy (MWh)', wte_rev: 'Annual revenue', simple_pb: 'Simple payback',
  pros: 'Advantages', cons: 'Risks', share: 'Proposed share structure',
  docs_title: 'Reports', pod_title: '3-minute podcast', ai_note: 'The AI assistant is optional; the dashboard works without any API key.',
};

const tr: Dict = {
  brand: 'GreenPars Granül', tagline: 'Plastik atıktan geri dönüştürülmüş granül + atıktan enerji',
  nav_home: 'Ana sayfa', nav_calc: 'Kâr hesaplayıcı', nav_scopes: 'Üç kapsam', nav_funding: 'Finansman', nav_wte: 'Atıktan enerji & sponsor', nav_docs: 'Raporlar & podcast',
  rate_note: 'Serbest piyasa kuru: 1 USD = 235.000 Tomen (28 Eylül 2026)', bn: 'milyar Tomen',
  hero_p: 'İran yapımı makinelerle (Pendar Polymer) 400 kg/saat pilot tesis, ardından kademeli olarak 10 şehre büyüme. Tüm rakamlar amortisman dahil gerçekçi modelle hesaplandı.',
  k_capex: 'Pilot yatırım', k_profit: '4. yıl net kâr', k_pb: 'Geri dönüş (baz)', k_jobs: 'İstihdam, 10 şehir', yr: 'yıl',
  calc_title: 'Pilot kâr hesaplayıcı', granule: 'Granül fiyatı (Tomen/kg)', waste: 'Atık fiyatı (Tomen/kg)', plant: 'Tesis boyutu', small: 'Küçük 400 kg/saat (31 milyar)', big: 'Büyük 1000 kg/saat (84 milyar)',
  year: 'Yıl', output: 'Üretim (t)', revenue: 'Gelir', net: 'Net kâr', cf: 'Nakit akışı', payback: 'Geri dönüş', never: 'yok', years: 'yıl',
  scen: 'Senaryolar', pess: 'Kötümser', base: 'Baz', target: 'Hedef', opt: 'İyimser', apply: 'Uygula',
  gate: 'Büyüme kapısı: atık ≤ 35–40 bin, granül ≥ 105 bin Tomen/kg ve art arda 6 kârlı ay',
  ten: '10 şehir', half: 'Şehirlerin yarısı', all: 'Tüm şehirler', capex: 'Yatırım', profit_now: 'Kâr (güncel fiyat)', profit_target: 'Kâr (hedef)', pb_now: 'Güncel geri dönüş', pb_target: 'Hedef geri dönüş', jobs: 'İstihdam', out: 'Yıllık üretim (t)', plants: 'Büyük/küçük tesis',
  scopes_note: 'Öneri: yalnızca 10 şehir kapsamı gerçekçi; diğerleri büyüme kapısı geçildikten sonra.',
  fund_title: 'Pilot finansman yapısı (31 milyar Tomen)', founders: 'Kurucular', pendar: 'Pendar Polymer taksitleri', envfund: 'Ulusal Çevre Fonu', crowd: 'Kitle fonlaması', uses: 'Fon kullanımı', machinery: 'Makine', building: 'Bina & altyapı', wc: 'İşletme sermayesi', permits: 'İzin & devreye alma',
  wte_title: '"Sponsor atıktan enerji tesisini finanse eder + planımızdan pay alır" iyi bir model mi?',
  wte_verdict: 'Sonuç: evet, ama yalnızca hammadde sözleşmesiyle bağlı iki ayrı şirket (SPV) olarak. Sponsor geri dönüşüm şirketinin kontrolünü almamalı.',
  wte_calc: 'Atıktan enerji hesaplayıcı', mw: 'Kapasite (MW)', tech: 'Teknoloji', capex_mw: 'MW başına yatırım (USD)', gatefee: 'Atık kabul ücreti (Tomen/t)', inc: 'Yakma/gazlaştırma', ad: 'Anaerobik çürütme', lfg: 'Çöp gazı',
  energy: 'Yıllık enerji (MWh)', wte_rev: 'Yıllık gelir', simple_pb: 'Basit geri dönüş',
  pros: 'Avantajlar', cons: 'Riskler', share: 'Önerilen pay yapısı',
  docs_title: 'Raporlar', pod_title: '3 dakikalık podcast', ai_note: 'Yapay zekâ asistanı isteğe bağlıdır; panel API anahtarı olmadan çalışır.',
};

export const DICTS: Record<Lang, Dict> = { fa, en, tr };

// Longer WtE assessment content (report 20)
export const WTE_TEXT: Record<Lang, { pros: string[]; cons: string[]; shares: [string, string][]; steps: string[] }> = {
  fa: {
    pros: ['۲۰–۲۵٪ پسماند غیرقابل‌بازیافت ما به‌جای دفن، سوخت RDF می‌شود و هزینه دفن حذف می‌شود.', 'تعرفه تضمینی ساتبا برای زباله‌سوز/گازی‌سازی ۵۵٬۵۰۰ ریال/kWh (زیر ۱۰ مگاوات).', 'اسپانسر قوی اعتبار بانکی و ارتباط با شهرداری را به طرح بازیافت هم می‌آورد.', 'روایت «صفر دفن» برای صندوق محیط زیست و سرمایه‌گذار ترک جذاب است.'],
    cons: ['۵٬۵۵۰ تومان/kWh ≈ ۰٫۰۲۴ دلار؛ در برابر سرمایه ۵–۸ میلیون دلار/مگاوات، بازگشت بدون حق پذیرش پسماند بیش از ۳۰ سال است.', 'زباله ایران مرطوب و پرآلی است (ارزش حرارتی پایین) و زباله‌سوزی مستقیم بازده کمی دارد.', 'تأخیر تاریخی در پرداخت ساتبا و کاهش پله‌ای تعرفه در سال‌های بعد.', 'اگر اسپانسر در شرکت بازیافت کنترل داشته باشد، ممکن است پلاستیک بازیافت‌پذیر را به کوره بفرستد (تعارض منافع).'],
    shares: [['شرکت بازیافت (گرانول)', 'مؤسسان ۶۰–۷۰٪، اسپانسر ۱۵–۲۵٪ (بدون کنترل، با حق تقدم خرید)، سرمایه‌گذار ترک/جمعی ۱۰–۱۵٪'], ['شرکت انرژی/RDF', 'اسپانسر ۷۰–۸۰٪، شرکت بازیافت ۱۰–۲۰٪ سهام آورده‌ای در ازای خوراک، شهرداری ۰–۱۰٪'], ['قرارداد خوراک', '۱۰ ساله؛ فقط پسماند غیرقابل‌بازیافت؛ قیمت شناور؛ حق وتوی کیفیت برای شرکت بازیافت']],
    steps: ['گام ۱: پایلوت گرانول را جدا راه بیندازید (اسپانسر می‌تواند ۵–۸ میلیارد در ازای ۱۵–۲۰٪ بیاورد).', 'گام ۲: به‌جای نیروگاه، خط RDF (خرد و خشک‌کردن) برای فروش به کارخانه سیمان — سرمایه ۱۰ برابر کمتر.', 'گام ۳: پس از ۱۰ شهر و قرارداد حق پذیرش با شهرداری، نیروگاه گازی‌سازی زیر ۱۰ مگاوات.'],
  },
  en: {
    pros: ['Our 20–25% non-recyclable rejects become RDF fuel instead of landfill, removing disposal cost.', 'SATBA guaranteed tariff for incineration/gasification: 55,500 rial/kWh (plants under 10 MW).', 'A strong sponsor brings bank credibility and municipal access to the recycling plan too.', 'A "zero-landfill" story is attractive to the Environment Fund and Turkish investors.'],
    cons: ['5,550 Toman/kWh ≈ $0.024; against $5–8M/MW capex, payback without a gate fee exceeds 30 years.', 'Iranian waste is wet and organic-rich (low calorific value); mass-burn efficiency is poor.', 'Historic SATBA payment delays and step-down of the tariff in later years.', 'A sponsor controlling the recycling company could divert recyclable plastic to the furnace (conflict of interest).'],
    shares: [['Recycling SPV (granule)', 'Founders 60–70%, sponsor 15–25% (non-controlling, ROFR), Turkish/crowd investors 10–15%'], ['Energy/RDF SPV', 'Sponsor 70–80%, recycling SPV 10–20% in-kind for feedstock, municipality 0–10%'], ['Feedstock contract', '10 years; non-recyclables only; indexed price; quality veto for recycling SPV']],
    steps: ['Step 1: launch the granule pilot separately (sponsor may put in 5–8 bn Toman for 15–20%).', 'Step 2: instead of a power plant, an RDF line (shred + dry) selling to cement kilns — ~10× less capex.', 'Step 3: after 10 cities and a municipal gate-fee contract, a sub-10 MW gasification plant.'],
  },
  tr: {
    pros: ['Geri dönüştürülemeyen %20–25 atığımız depolama yerine RDF yakıtı olur, bertaraf maliyeti ortadan kalkar.', 'SATBA garantili tarifesi yakma/gazlaştırma için 55.500 riyal/kWh (10 MW altı tesisler).', 'Güçlü bir sponsor, geri dönüşüm planına da banka itibarı ve belediye erişimi getirir.', '"Sıfır depolama" hikâyesi Çevre Fonu ve Türk yatırımcılar için cazip.'],
    cons: ['5.550 Tomen/kWh ≈ 0,024 $; MW başına 5–8 milyon $ yatırıma karşı, kabul ücreti olmadan geri dönüş 30 yılı aşar.', 'İran atığı ıslak ve organik ağırlıklı (düşük kalorifik değer); doğrudan yakma verimsiz.', 'SATBA ödemelerinde tarihsel gecikmeler ve sonraki yıllarda tarifede kademeli düşüş.', 'Geri dönüşüm şirketini kontrol eden sponsor, geri dönüştürülebilir plastiği fırına yönlendirebilir (çıkar çatışması).'],
    shares: [['Geri dönüşüm SPV (granül)', 'Kurucular %60–70, sponsor %15–25 (kontrolsüz, önalım hakkı), Türk/kitle yatırımcılar %10–15'], ['Enerji/RDF SPV', 'Sponsor %70–80, hammadde karşılığı geri dönüşüm SPV %10–20 ayni pay, belediye %0–10'], ['Hammadde sözleşmesi', '10 yıl; yalnızca geri dönüştürülemeyen atık; endeksli fiyat; geri dönüşüm SPV\'ye kalite vetosu']],
    steps: ['Adım 1: granül pilotunu ayrı başlatın (sponsor %15–20 karşılığı 5–8 milyar Tomen koyabilir).', 'Adım 2: santral yerine çimento fabrikalarına satış için RDF hattı (parçalama + kurutma) — ~10 kat daha az yatırım.', 'Adım 3: 10 şehir ve belediyeyle kabul ücreti sözleşmesinden sonra 10 MW altı gazlaştırma tesisi.'],
  },
};
