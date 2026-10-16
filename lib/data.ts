import type { Locale } from '@/lib/i18n/config'

/** A string translated into every locale. */
export type LS = Record<Locale, string>

/** Resolve a localized string, falling back to English. */
export function t(value: LS, locale: Locale): string {
  return value[locale] ?? value.en
}

/* ------------------------------------------------------------------ */
/* Investigations                                                      */
/* ------------------------------------------------------------------ */

export type Investigation = {
  id: string
  number: string
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  author: string
  readingTime: string
  location: string
  image: string
  featured?: boolean
}

type InvestigationRaw = {
  id: string
  number: string
  slug: string
  category: LS
  title: LS
  excerpt: LS
  date: LS
  author: LS
  readingTime: LS
  location: LS
  image: string
  featured?: boolean
}

const investigationsRaw: InvestigationRaw[] = [
  {
    id: '1',
    number: 'INV. 024',
    slug: 'the-silent-ledger',
    image: '/images/feature.png',
    featured: true,
    category: {
      en: 'Finance',
      ku: 'دارایی',
      ckb: 'دارایی',
      ar: 'المالية',
    },
    title: {
      en: 'The Silent Ledger',
      ku: 'دەفتەرا بێدەنگ',
      ckb: 'دەفتەری بێدەنگ',
      ar: 'الدفتر الصامت',
    },
    excerpt: {
      en: 'A twelve-month trace of shell companies moving public funds across three jurisdictions, and the officials who signed for them.',
      ku: 'شوپاندنەکا دوازدە مەهی بۆ کۆمپانیێن قاڵب کو دراوێن گشتی د ناڤبەرا سێ دەسەڵاتان دگوهەزینن، و ئەو بەرپرسێن کو ئیمزا کرین.',
      ckb: 'بەدواداچوونێکی دوازدە مانگە بۆ کۆمپانیا قاڵبەکان کە پارەی گشتی بەناو سێ دەسەڵاتدا دەگوازنەوە، و ئەو بەرپرسانەی واژۆیان کردووە.',
      ar: 'تتبّع استمر اثني عشر شهراً لشركات وهمية تنقل أموالاً عامة عبر ثلاث ولايات قضائية، والمسؤولون الذين وقّعوا عليها.',
    },
    date: { en: '12 Aug 2026', ku: '١٢ ئاب ٢٠٢٦', ckb: '١٢ ئاب ٢٠٢٦', ar: '١٢ آب ٢٠٢٦' },
    author: { en: 'Lina Haddad', ku: 'لینا حەداد', ckb: 'لینا حەداد', ar: 'لينا حداد' },
    readingTime: {
      en: '18 min read',
      ku: '١٨ خولەک خواندن',
      ckb: '١٨ خولەک خوێندنەوە',
      ar: '١٨ دقيقة قراءة',
    },
    location: {
      en: 'Beirut / Nicosia',
      ku: 'بەیروت / نیکۆسیا',
      ckb: 'بەیروت / نیکۆسیا',
      ar: 'بيروت / نيقوسيا',
    },
  },
  {
    id: '2',
    number: 'INV. 023',
    slug: 'containers-of-nowhere',
    image: '/images/inv-2.png',
    category: { en: 'Trade', ku: 'بازرگانی', ckb: 'بازرگانی', ar: 'التجارة' },
    title: {
      en: 'Containers of Nowhere',
      ku: 'کۆنتەینەرێن بێ جهـ',
      ckb: 'کۆنتەینەرەکانی هیچ شوێنێک',
      ar: 'حاويات إلى لا مكان',
    },
    excerpt: {
      en: 'Thousands of tonnes of undeclared cargo vanish between two ports. We followed the manifests that were never meant to be read.',
      ku: 'هەزارەها تۆن بارێ نەراگەهاندی د ناڤبەرا دوو بەندەران دا وندا دبن. ئەم دویڤ وان لیستێن بارکرنێ کەتین کو نەدهاتنە خواندن.',
      ckb: 'هەزاران تۆن باری ڕانەگەیەنراو لەنێوان دوو بەندەردا ون دەبن. ئێمە بەدوای ئەو لیستانەی بارکردن کەوتین کە هەرگیز بۆ خوێندنەوە نەبوون.',
      ar: 'آلاف الأطنان من الشحنات غير المُعلَنة تختفي بين مينائين. تتبّعنا بيانات الشحن التي لم يكن يُراد لها أن تُقرأ.',
    },
    date: { en: '29 Jul 2026', ku: '٢٩ تەمووز ٢٠٢٦', ckb: '٢٩ تەمووز ٢٠٢٦', ar: '٢٩ تموز ٢٠٢٦' },
    author: { en: 'Omar Nasr', ku: 'عومەر نەسر', ckb: 'عومەر نەسر', ar: 'عمر نصر' },
    readingTime: {
      en: '14 min read',
      ku: '١٤ خولەک خواندن',
      ckb: '١٤ خولەک خوێندنەوە',
      ar: '١٤ دقيقة قراءة',
    },
    location: {
      en: 'Port of Tripoli',
      ku: 'بەندەرا تەرابلوس',
      ckb: 'بەندەری تەرابلوس',
      ar: 'ميناء طرابلس',
    },
  },
  {
    id: '3',
    number: 'INV. 022',
    slug: 'the-watchers-room',
    image: '/images/inv-3.png',
    category: { en: 'Surveillance', ku: 'چاودێری', ckb: 'چاودێری', ar: 'المراقبة' },
    title: {
      en: 'The Watchers Room',
      ku: 'ژوورا چاودێران',
      ckb: 'ژووری چاودێران',
      ar: 'غرفة المراقِبين',
    },
    excerpt: {
      en: 'Leaked procurement records reveal a quiet expansion of monitoring infrastructure across civilian networks.',
      ku: 'تۆمارێن کڕینێ یێن دزیبوویی فرەبوونەکا بێدەنگ یا ژێرخانا چاودێریێ ل سەر تۆرێن شارستانی ئاشکرا دکەن.',
      ckb: 'تۆمارە دزراوەکانی کڕین فراوانبوونێکی بێدەنگی ژێرخانی چاودێری بەسەر تۆڕە مەدەنییەکاندا ئاشکرا دەکەن.',
      ar: 'سجلّات مشتريات مسرَّبة تكشف توسّعاً صامتاً لبنية المراقبة عبر الشبكات المدنية.',
    },
    date: { en: '11 Jul 2026', ku: '١١ تەمووز ٢٠٢٦', ckb: '١١ تەمووز ٢٠٢٦', ar: '١١ تموز ٢٠٢٦' },
    author: { en: 'Yara Khalil', ku: 'یارا خەلیل', ckb: 'یارا خەلیل', ar: 'يارا خليل' },
    readingTime: {
      en: '21 min read',
      ku: '٢١ خولەک خواندن',
      ckb: '٢١ خولەک خوێندنەوە',
      ar: '٢١ دقيقة قراءة',
    },
    location: { en: 'Amman', ku: 'ئەمان', ckb: 'ئەمان', ar: 'عمّان' },
  },
  {
    id: '4',
    number: 'INV. 021',
    slug: 'concrete-promises',
    image: '/images/inv-4.png',
    category: { en: 'Governance', ku: 'رێڤەبرین', ckb: 'فەرمانڕەوایی', ar: 'الحوكمة' },
    title: {
      en: 'Concrete Promises',
      ku: 'سۆزێن بەتۆن',
      ckb: 'بەڵێنە بەتۆنییەکان',
      ar: 'وعودٌ من إسمنت',
    },
    excerpt: {
      en: 'A public housing program that built almost nothing, documented through five years of budget filings and site visits.',
      ku: 'پرۆگرامەکا خانووبەرەیا گشتی کو نێزیکی هیچ ئاڤا نەکر، ب رێکا پێنج سالان یێن تۆمارێن بودجەیێ و سەردانێن جهی بەلگەکری.',
      ckb: 'پرۆگرامێکی نیشتەجێبوونی گشتی کە نزیکەی هیچی دروست نەکرد، بە پێنج ساڵ تۆماری بودجە و سەردانی شوێنەکان بەڵگەنامە کرا.',
      ar: 'برنامج إسكان عام لم يَبْنِ شيئاً تقريباً، موثَّق عبر خمس سنوات من ملفات الميزانية والزيارات الميدانية.',
    },
    date: { en: '24 Jun 2026', ku: '٢٤ حوزەیران ٢٠٢٦', ckb: '٢٤ حوزەیران ٢٠٢٦', ar: '٢٤ حزيران ٢٠٢٦' },
    author: { en: 'Tarek Aoun', ku: 'تارق عەون', ckb: 'تارق عەون', ar: 'طارق عون' },
    readingTime: {
      en: '16 min read',
      ku: '١٦ خولەک خواندن',
      ckb: '١٦ خولەک خوێندنەوە',
      ar: '١٦ دقيقة قراءة',
    },
    location: { en: 'Cairo', ku: 'قاهیرە', ckb: 'قاهیرە', ar: 'القاهرة' },
  },
  {
    id: '5',
    number: 'INV. 020',
    slug: 'off-the-books',
    image: '/images/inv-5.png',
    category: { en: 'Finance', ku: 'دارایی', ckb: 'دارایی', ar: 'المالية' },
    title: {
      en: 'Off the Books',
      ku: 'دەرڤەیی دەفتەران',
      ckb: 'دەرەوەی دەفتەرەکان',
      ar: 'خارج الدفاتر',
    },
    excerpt: {
      en: 'How a network of subcontractors absorbed disaster relief money that never reached a single household.',
      ku: 'چاوا تۆرەکا ژێر-گرێبەستان پارێن هاریکاریا کارەساتێ هەلمژینن کو نەگەهشتنە چ مالەکێ.',
      ckb: 'چۆن تۆڕێک لە ژێر-گرێبەستکاران پارەی یارمەتی کارەسات هەڵمژی کە هەرگیز نەگەیشتە هیچ ماڵێک.',
      ar: 'كيف امتصّت شبكةٌ من المقاولين الفرعيين أموال إغاثة الكوارث التي لم تصل إلى أي أسرة.',
    },
    date: { en: '02 Jun 2026', ku: '٠٢ حوزەیران ٢٠٢٦', ckb: '٠٢ حوزەیران ٢٠٢٦', ar: '٠٢ حزيران ٢٠٢٦' },
    author: { en: 'Lina Haddad', ku: 'لینا حەداد', ckb: 'لینا حەداد', ar: 'لينا حداد' },
    readingTime: {
      en: '19 min read',
      ku: '١٩ خولەک خواندن',
      ckb: '١٩ خولەک خوێندنەوە',
      ar: '١٩ دقيقة قراءة',
    },
    location: { en: 'Antakya', ku: 'ئانتاکیا', ckb: 'ئانتاکیا', ar: 'أنطاكيا' },
  },
  {
    id: '6',
    number: 'INV. 019',
    slug: 'the-fog-index',
    image: '/images/inv-6.png',
    category: { en: 'Environment', ku: 'ژینگە', ckb: 'ژینگە', ar: 'البيئة' },
    title: {
      en: 'The Fog Index',
      ku: 'پێوەرا مژێ',
      ckb: 'پێوەری تەم',
      ar: 'مؤشّر الضباب',
    },
    excerpt: {
      en: 'Air-quality sensors were switched off for months. We reconstructed the missing data and asked who benefited from the silence.',
      ku: 'هەستیارێن جۆرێ هەوایێ چەند مەهان هاتنە گرتن. ئەم داتایێن ونداکری ئاڤا کرن و پرسیار کر کێ ژ بێدەنگیێ سوود وەرگرت.',
      ckb: 'هەستەوەرەکانی جۆری هەوا بۆ چەند مانگێک کوژێنرانەوە. ئێمە داتا ونبووەکانمان دووبارە دروستکردەوە و پرسیارمان کرد کێ سوودی لە بێدەنگییەکە بینی.',
      ar: 'أُوقِفت أجهزة استشعار جودة الهواء أشهراً. أعدنا بناء البيانات المفقودة وسألنا: مَن استفاد من الصمت؟',
    },
    date: { en: '18 May 2026', ku: '١٨ ئایار ٢٠٢٦', ckb: '١٨ ئایار ٢٠٢٦', ar: '١٨ أيار ٢٠٢٦' },
    author: { en: 'Yara Khalil', ku: 'یارا خەلیل', ckb: 'یارا خەلیل', ar: 'يارا خليل' },
    readingTime: {
      en: '13 min read',
      ku: '١٣ خولەک خواندن',
      ckb: '١٣ خولەک خوێندنەوە',
      ar: '١٣ دقيقة قراءة',
    },
    location: { en: 'Baghdad', ku: 'بەغدا', ckb: 'بەغدا', ar: 'بغداد' },
  },
  {
    id: '7',
    number: 'INV. 018',
    slug: 'redacted-by-design',
    image: '/images/inv-1.png',
    category: { en: 'Justice', ku: 'دادپەروەری', ckb: 'دادپەروەری', ar: 'العدالة' },
    title: {
      en: 'Redacted by Design',
      ku: 'ب مەبەست ژێبرین',
      ckb: 'بە مەبەست سڕاوەتەوە',
      ar: 'تعتيمٌ مقصود',
    },
    excerpt: {
      en: 'Court records systematically sealed to obscure a pattern of settlements paid from public accounts.',
      ku: 'تۆمارێن دادگەهێ ب رێکخستی هاتنە گرتن دا کو شێوازەکێ رێکەفتنان کو ژ هەژمارێن گشتی هاتینە دان ونیاکەن.',
      ckb: 'تۆمارەکانی دادگا بە شێوەیەکی سیستەماتیک مۆرکران بۆ شاردنەوەی نەخشەیەکی ڕێکەوتنەکان کە لە هەژمارە گشتییەکانەوە دراون.',
      ar: 'سجلّات محاكم خُتِمت بشكل منهجي لإخفاء نمط من التسويات دُفِعت من حسابات عامة.',
    },
    date: { en: '30 Apr 2026', ku: '٣٠ نیسان ٢٠٢٦', ckb: '٣٠ نیسان ٢٠٢٦', ar: '٣٠ نيسان ٢٠٢٦' },
    author: { en: 'Omar Nasr', ku: 'عومەر نەسر', ckb: 'عومەر نەسر', ar: 'عمر نصر' },
    readingTime: {
      en: '17 min read',
      ku: '١٧ خولەک خواندن',
      ckb: '١٧ خولەک خوێندنەوە',
      ar: '١٧ دقيقة قراءة',
    },
    location: { en: 'Tunis', ku: 'تونس', ckb: 'تونس', ar: 'تونس' },
  },
]

export type WorkPost = {
  id: string
  title: string
  explanation: string
  imageUrl: string
  imageUrls: string[]
  publishedAt: string | null
}

export async function getPublishedWorkPosts(locale: Locale): Promise<WorkPost[]> {
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const { data } = await supabase
    .from('work_posts')
    .select('id, title, explanation, image_url, image_urls, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (data ?? []).map((post) => ({
    id: post.id,
    title: t(post.title as LS, locale),
    explanation: t(post.explanation as LS, locale),
    imageUrl: post.image_url,
    imageUrls: Array.isArray(post.image_urls) && post.image_urls.length > 0 ? post.image_urls : [post.image_url],
    publishedAt: post.published_at,
  }))
}

export function getInvestigations(locale: Locale): Investigation[] {
  return investigationsRaw.map((i) => ({
    id: i.id,
    number: i.number,
    slug: i.slug,
    image: i.image,
    featured: i.featured,
    category: t(i.category, locale),
    title: t(i.title, locale),
    excerpt: t(i.excerpt, locale),
    date: t(i.date, locale),
    author: t(i.author, locale),
    readingTime: t(i.readingTime, locale),
    location: t(i.location, locale),
  }))
}

export function getInvestigationSlugs(): string[] {
  return investigationsRaw.map((i) => i.slug)
}

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

const categoriesRaw: LS[] = [
  { en: 'Finance', ku: 'دارایی', ckb: 'دارایی', ar: 'المالية' },
  { en: 'Trade', ku: 'بازرگانی', ckb: 'بازرگانی', ar: 'التجارة' },
  { en: 'Surveillance', ku: 'چاودێری', ckb: 'چاودێری', ar: 'المراقبة' },
  { en: 'Governance', ku: 'رێڤەبرین', ckb: 'فەرمانڕەوایی', ar: 'الحوكمة' },
  { en: 'Environment', ku: 'ژینگە', ckb: 'ژینگە', ar: 'البيئة' },
  { en: 'Justice', ku: 'دادپەروەری', ckb: 'دادپەروەری', ar: 'العدالة' },
]

export function getCategories(locale: Locale): string[] {
  return categoriesRaw.map((c) => t(c, locale))
}

/* ------------------------------------------------------------------ */
/* Team                                                                */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string
  role: string
  expertise: string
  bio: string
  contact: string
}

type TeamMemberRaw = {
  name: LS
  role: LS
  expertise: LS
  bio: LS
  contact: string
}

const teamRaw: TeamMemberRaw[] = [
  {
    contact: 'lina@cardu.org',
    name: { en: 'Lina Haddad', ku: 'لینا حەداد', ckb: 'لینا حەداد', ar: 'لينا حداد' },
    role: {
      en: 'Editor-in-Chief',
      ku: 'سەرنڤیسەر',
      ckb: 'سەرنووسەر',
      ar: 'رئيسة التحرير',
    },
    expertise: {
      en: 'Financial forensics',
      ku: 'شیکارییا دارایی',
      ckb: 'شیکاری دارایی',
      ar: 'التحليل المالي الجنائي',
    },
    bio: {
      en: 'Fifteen years tracing money across borders. Former data editor with a background in forensic accounting.',
      ku: 'پازدە سال شوپاندنا پارەیان د ناڤبەرا سنووران. ب������رێ ئەدیتۆرا داتایان بوو ب پاشخانەکا ژمێریاریا دادوەری.',
      ckb: 'پازدە ساڵ بەدواداچوونی پارە بەناو سنوورەکاندا. پێشتر ئەدیتۆری داتا بووە بە پاشخانی ژمێریاری دادوەری.',
      ar: 'خ��سة عشر عاماً في تتبّع الأموال عبر الحدود. محرِّرة بيانات سابقة بخلفية في المحاسبة الجنائية.',
    },
  },
  {
    contact: 'omar@cardu.org',
    name: { en: 'Omar Nasr', ku: 'عومەر نەسر', ckb: 'عومەر نەسر', ar: 'عمر نصر' },
    role: {
      en: 'Lead Investigator',
      ku: 'لێکۆلەرێ سەرەکی',
      ckb: 'لێکۆڵەری سەرەکی',
      ar: 'كبير المحقّقين',
    },
    expertise: {
      en: 'Trade & logistics',
      ku: 'بازرگانی و لۆجستیک',
      ckb: 'بازرگانی و لۆجستیک',
      ar: 'التجارة واللوجستيات',
    },
    bio: {
      en: 'Specialises in supply chains and customs records. Built CARDU’s document verification desk.',
      ku: 'پسپۆرە د زنجیرێن دابینکرنێ و تۆمارێن گومرکێ دا. مێزا پشتراستکرنا بەلگەنامان یا کاردو ئاڤاکر.',
      ckb: 'پسپۆرە لە زنجیرەکانی دابینکردن و تۆماری گومرگ. مێزی پشتڕاستکردنەوەی بەڵگەنامەی کاردووی دروستکرد.',
      ar: 'متخصّص في سلاسل التوريد وسجلّات الجمارك. أسّس مكتب التحقّق من الوثائق في كاردو.',
    },
  },
  {
    contact: 'yara@cardu.org',
    name: { en: 'Yara Khalil', ku: 'یارا خەلیل', ckb: 'یارا خەلیل', ar: 'يارا خليل' },
    role: {
      en: 'Data & Research',
      ku: 'داتا و لێکۆلین',
      ckb: 'داتا و توێژینەوە',
      ar: 'البيانات والأبحاث',
    },
    expertise: {
      en: 'Open-source intelligence',
      ku: 'زانیارییا سەرچاوەیا ڤەکری',
      ckb: 'زانیاری سەرچاوە کراوە',
      ar: 'الاستخبارات مفتوحة المصدر',
    },
    bio: {
      en: 'Reconstructs deleted datasets and satellite records. Trains newsrooms in verification.',
      ku: 'کۆمەڵە داتایێن ژێبری و تۆمارێن مانگەهەوایان ژنوڤە ئاڤا دکەت. نڤیسینگەهێن هەوالان ل سەر پشتراستکرنێ راهێنان دکەت.',
      ckb: 'کۆمەڵە داتا سڕاوەکان و تۆماری مانگی دەستکرد دووبارە دروست دەکاتەوە. نووسینگەکانی هەواڵ لە پشتڕاستکردنەوە ڕادەهێنێت.',
      ar: 'تعيد بناء مجموعات البيانات المحذوفة وسجلّات الأقمار الصناعية. تدرّب غرف الأخبار على التحقّق.',
    },
  },
  {
    contact: 'tarek@cardu.org',
    name: { en: 'Tarek Aoun', ku: 'تارق عەون', ckb: 'تارق عەون', ar: 'طارق عون' },
    role: {
      en: 'Investigations Editor',
      ku: 'ئەدیتۆرێ لێکۆلینان',
      ckb: 'ئەدیتۆری لێکۆڵینەوەکان',
      ar: 'محرّر التحقيقات',
    },
    expertise: {
      en: 'Governance & policy',
      ku: 'رێڤەبرین و سیاسەت',
      ckb: 'فەرمانڕەوایی و سیاسەت',
      ar: 'الحوكمة والسياسات',
    },
    bio: {
      en: 'Focuses on public spending and procurement. Twenty years across print and broadcast.',
      ku: 'گرنگیێ ددەتە خەرجییا گشتی و کڕینێ. بیست سالان د چاپ و راگەهاندنێ دا.',
      ckb: 'گرنگی بە خەرجی گشتی و کڕین دەدات. بیست ساڵ لە چاپ و پەخشدا.',
      ar: 'يركّز على الإنفاق العام والمشتريات. عشرون عاماً بين الصحافة المطبوعة والبثّ.',
    },
  },
  {
    contact: 'nour@cardu.org',
    name: { en: 'Nour Salameh', ku: 'نوور سەلامە', ckb: 'نوور سەلامە', ar: 'نور سلامة' },
    role: {
      en: 'Legal & Ethics',
      ku: 'یاسایی و ئەخلاقی',
      ckb: 'یاسایی و ئەخلاقی',
      ar: 'الشؤون القانونية والأخلاقية',
    },
    expertise: {
      en: 'Media law',
      ku: 'یاسایا راگەهاندنێ',
      ckb: 'یاسای ڕاگەیاندن',
      ar: 'قانون الإعلام',
    },
    bio: {
      en: 'Advises on source protection and pre-publication review. Practising media lawyer.',
      ku: 'شیرەتان دکەت ل سەر پاراستنا سەرچاوان و پێداچوونا بەری بەلاڤکرنێ. پارێزەرا راگەهاندنێ یا کارگێری.',
      ckb: 'ڕاوێژ دەکات لەسەر پاراستنی سەرچاوە و پێداچوونەوەی پێش بڵاوکردنەوە. پارێزەری ڕاگەیاندنی کارا.',
      ar: 'تقدّم المشورة في حماية المصادر والمراجعة قبل النشر. محامية إعلام ممارِسة.',
    },
  },
  {
    contact: 'sami@cardu.org',
    name: { en: 'Sami Rahal', ku: 'سامی رەحال', ckb: 'سامی رەحال', ar: 'سامي رحال' },
    role: {
      en: 'Visual Investigations',
      ku: 'لێکۆلینێن دیمەنی',
      ckb: 'لێکۆڵینەوەی بینراو',
      ar: 'التحقيقات ال��صرية',
    },
    expertise: {
      en: 'Geolocation & imagery',
      ku: 'جهـدیارکرن و وێنە',
      ckb: 'شوێندۆزی و وێنە',
      ar: 'تحديد المواقع والصور',
    },
    bio: {
      en: 'Verifies imagery and reconstructs events from open sources and field footage.',
      ku: 'وێنان پشتراست دکەت و رووداوان ژ سەرچاوێن ڤەکری و ڤیدیۆیێن جهی ژنوڤە ئاڤا دکەت.',
      ckb: 'وێنە پشتڕاست دەکاتەوە و ڕووداوەکان لە سەرچاوە کراوەکان و ڤیدیۆی مەیدانییەوە دووبارە دروست دەکاتەوە.',
      ar: 'يتحقّق من الصور ويعيد بناء الأحداث من مصادر مفتوحة ولقطات ميدانية.',
    },
  },
]

export function getTeam(locale: Locale): TeamMember[] {
  return teamRaw.map((m) => ({
    contact: m.contact,
    name: t(m.name, locale),
    role: t(m.role, locale),
    expertise: t(m.expertise, locale),
    bio: t(m.bio, locale),
  }))
}

/* ------------------------------------------------------------------ */
/* Approach                                                            */
/* ------------------------------------------------------------------ */

export type ApproachStep = { number: string; title: string; text: string }

type ApproachRaw = { number: string; title: LS; text: LS }

const approachRaw: ApproachRaw[] = [
  {
    number: '01',
    title: { en: 'Document', ku: 'بەلگەکرن', ckb: 'بەڵگەنامەکردن', ar: 'التوثيق' },
    text: {
      en: 'We begin with the record. Every investigation is built on primary sources — filings, contracts, datasets, and testimony we can hold to account.',
      ku: 'ئەم ب بەلگەیان دەستپێدکەین، هەر ڤەکولینەک ل سەر ژێدەرێة سەرەکی هاتییە ئاڤاکرن - تۆمار، گرێبەست، داتا و شاهدییا کو ئەم دشێین بەردەستبکەین.',
      ckb: 'ئێمە بە تۆمارەکەوە دەست پێ دەکەین. هەر لێکۆڵینەوەیەک لەسەر سەرچاوە سەرەکییەکان بنیاتنراوە — تۆمار، گرێبەست، داتا و شایەتی کە دەتوانین بەرپرسیاریان بکەین.',
      ar: 'نبدأ من الوثيقة. كل تحقيق مبنيّ على مصادر أوّلية — ملفّات وعقود وبيانات وشهادات يمكننا محاسبتها.',
    },
  },
  {
    number: '02',
    title: { en: 'Verify', ku: 'پشتراستکرن', ckb: 'پشتڕاستکردنەوە', ar: 'التحقّق' },
    text: {
      en: 'Nothing is published on a single source. We corroborate, cross-reference, and stress-test each claim against independent evidence.',
      ku: 'چ  تشت ل سەر ئێک ژێدەر بتنێ ناهێتە بەلاڤکرن، ئەم هەر رویدان و هەلویستەکێ ب بەلگەیێن سەربەخۆ پشتراست، بەراورد و تاقی دکەین.',
      ckb: 'هیچ شتێک لەسەر تەنها یەک سەرچاوە بڵاو ناکرێتەوە. ئێمە هەر بانگەشەیەک بە بەڵگەی سەربەخۆ پشتڕاست، بەراورد و تاقی دەکەینەوە.',
      ar: 'لا يُنشَر شيء استناداً إلى مصدر واحد. نُثبِت ونقارن ونختبر كل ادّعاء في مواجهة أدلّة مستقلّة.',
    },
  },
  {
    number: '03',
    title: { en: 'Investigate', ku: 'ڤەکۆلین', ckb: 'لێکۆڵینەوە', ar: 'التحقيق' },
    text: {
      en: 'We follow the structure, not the noise — tracing relationships, money, and decisions to the people responsible for them.',
      ku: 'ئەم دویڤ تومار و ئاشکرنا یا پتر نێزیکی راستیێ دکەڤین، نەک لدویڤ دەنگە دەنگێ، زالبونا هەست و بەرژەوەندیێن تاکەکەسی.',
      ckb: 'ئێمە بەدوای پێکهاتەکە دەکەوین، نەک ژاوەژاو — پەیوەندی، پارە و بڕیارەکان بۆ ئەو کەسانەی بەرپرسیارن بەدوایاندا دەگەڕێین.',
      ar: 'نتتبّع البنية لا الضجيج — نقتفي العلاقات والأموال والقرارات وصولاً إلى المسؤولين عنها.',
    },
  },
  {
    number: '04',
    title: { en: 'Publish', ku: 'بەلاڤکرن', ckb: 'بڵاوکردنەوە', ar: 'النشر' },
    text: {
      en: 'We write with precision and restraint, showing our evidence and our reasoning so readers can judge the work themselves.',
      ku: 'ئەم ب هویری و لسەرخو دنڤیسین، بەلگە و ئەقلمەندییا خۆ نیشان ددەین دا کو خواندەڤان ب خۆ کارێ حوکدانێ بکەن.',
      ckb: 'ئێمە بە وردی و خۆگرتنەوە دەنووسین، بەڵگە و لۆژیکمان پیشان دەدەین تاوەکو خوێنەرەکان خۆیان حوکم بەسەر کارەکەدا بدەن.',
      ar: 'نكتب بدقّة وتحفّظ، ونعرض أدلّتنا ومنطقنا كي يحكم القرّاء على العمل بأنفسهم.',
    },
  },
  {
    number: '05',
    title: { en: 'Account', ku: 'بەرپرسیاری', ckb: 'بەرپرسیاریێتی', ar: 'المساءلة' },
    text: {
      en: 'We give every subject the right of reply, correct the record when we are wrong, and stand behind what we publish.',
      ku: 'ئەم مافێ بەرسڤدانێ ددەینە هەر لایەنەکێ، دەمێ ئەم شاش بین بێ دوو دلی تۆمارێ راستڤەدکەین، و ل پشت ئەوا ئەم بەلاڤ دکەین بهێز دراوەستین.',
      ckb: 'ئێمە مافی وەڵامدانەوە دەدەین بە هەر لایەنێک، کاتێک هەڵە دەکەین تۆمارەکە ڕاست دەکەینەوە، و لە پشت ئەوەی بڵاوی دەکەینەوە دەوەستین.',
      ar: 'نمنح كل طرف حقّ الردّ، ونصحّح السجلّ حين نُخطئ، ونقف خلف ما ننشره.',
    },
  },
]

export function getApproach(locale: Locale): ApproachStep[] {
  return approachRaw.map((s) => ({
    number: s.number,
    title: t(s.title, locale),
    text: t(s.text, locale),
  }))
}

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

export type TimelineEntry = { year: string; title: string; text: string }

type TimelineRaw = { year: string; title: LS; text: LS }

const timelineRaw: TimelineRaw[] = [
  {
    year: '2019',
    title: {
      en: 'A working group',
      ku: 'کۆمەڵەکا کارکرنێ',
      ckb: 'گروپێکی کارکردن',
      ar: 'مجموعة عمل',
    },
    text: {
      en: 'Four journalists and a researcher begin pooling documents on public spending that no outlet would run.',
      ku: 'چار روژنامەڤان و لێکۆلەرەک دەست ب کۆمکرنا بەلگەنامان دکەن ل سەر خەرجییا گشتی کو چ دەزگەهەکێ بەلاڤ نەدکرن.',
      ckb: 'چوار ڕۆژنامەنووس و توێژەرێک دەست بە کۆکردنەوەی بەڵگەنامە دەکەن لەسەر خەرجی گشتی کە هیچ دەزگایەک بڵاوی ناکردەوە.',
      ar: 'أربعة صحفيين وباحث يبدؤون بجمع وثائق عن الإنفاق العام لم تكن أي وسيلة لتنشرها.',
    },
  },
  {
    year: '2021',
    title: {
      en: 'CARDU is founded',
      ku: 'کاردو دهێتە دامەزراندن',
      ckb: 'کاردوو دامەزرێنرا',
      ar: 'تأسيس كاردو',
    },
    text: {
      en: 'The collective is formalised as an independent, non-partisan investigative platform.',
      ku: 'کۆمەڵ وەک پلاتفۆرمەکا لێکۆلینا سەربەخۆ و نەلایەنگر هاتە فەرمیکرن.',
      ckb: 'کۆمەڵەکە وەک پلاتفۆرمێکی لێکۆڵینەوەی سەربەخۆ و نالایەنگر فەرمی کرا.',
      ar: 'جرت رسمنة التجمّع كمنصّة تحقيق مستقلّة غير حزبية.',
    },
  },
  {
    year: '2022',
    title: {
      en: 'The verification desk',
      ku: 'مێزا پشتراستکرنێ',
      ckb: 'مێزی پشتڕاستکردنەوە',
      ar: 'مكتب التحقّق',
    },
    text: {
      en: 'We build an in-house document and imagery verification unit to underpin every story.',
      ku: 'ئەم یەکینەکا ناڤخۆیی یا پشتراستکرنا بەلگە و وێنان ئاڤا دکەین دا کو پشتەڤانییا هەر چیرۆکەکێ بکەت.',
      ckb: 'ئێمە یەکەیەکی ناوخۆیی پشتڕاستکردنەوەی بەڵگە و وێنە دروست دەکەین بۆ پاڵپشتی هەر چیرۆکێک.',
      ar: 'نبني وحدة داخلية للتحقّق من الوثائق والصور تدعم كل قصّة.',
    },
  },
  {
    year: '2024',
    title: {
      en: 'The Academy opens',
      ku: 'ئەکادیمی ڤەدبیت',
      ckb: 'ئەکادیمیا دەکرێتەوە',
      ar: 'افتتاح الأكاديمية',
    },
    text: {
      en: 'CARDU begins training a new generation of investigative journalists across the region.',
      ku: 'کاردو دەست ب راهێنانا نەوەکا نۆ یا روژنامەڤانێن لێکۆلەر ل سەرانسەرێ هەرێمێ دکەت.',
      ckb: 'کارد��و دەست بە ڕاهێنانی نەوەیەکی نوێی ڕۆژنامەنووسی لێکۆڵەر لە سەرانسەری هەرێم دەکات.',
      ar: 'تبدأ كاردو تدريب جيل جديد من الصحفيين الاستقصائيين في أنحاء المنطقة.',
    },
  },
  {
    year: '2026',
    title: {
      en: 'Twenty-four investigations',
      ku: 'بیست و چار لێکۆلین',
      ckb: 'بیست و چوار لێکۆڵینەوە',
      ar: 'أربعة وعشرون تحقيقاً',
    },
    text: {
      en: 'Our reporting has prompted audits, resignations, and public inquiries.',
      ku: 'راپۆرتێن مە بوونە ئەگەرێ پشکنین، دەستلێبەرکرن و لێپرسینێن گشتی.',
      ckb: 'ڕاپۆرتەکانمان بوونەتە هۆی پشکنین، دەس��لەکارکێشانەوە و لێکۆڵینەوەی گشتی.',
      ar: 'دفعت تقاريرنا إلى عمليات تدقيق واستقالات وتحقيقات عامة.',
    },
  },
]

export function getTimeline(locale: Locale): TimelineEntry[] {
  return timelineRaw.map((e) => ({
    year: e.year,
    title: t(e.title, locale),
    text: t(e.text, locale),
  }))
}

/* ------------------------------------------------------------------ */
/* Forum topics                                                        */
/* ------------------------------------------------------------------ */

export type ForumTopic = {
  title: string
  category: string
  author: string
  replies: number
  lastActivity: string
}

type ForumTopicRaw = {
  title: LS
  category: LS
  author: string
  replies: number
  lastActivity: LS
}

const forumCategoriesRaw: LS[] = [
  { en: 'General', ku: 'گشتی', ckb: 'گشتی', ar: 'عام' },
  { en: 'Methods', ku: 'رێبازان', ckb: 'ڕێبازەکان', ar: 'المنهجيات' },
  { en: 'Security', ku: 'ئاسایش', ckb: 'ئاسایش', ar: 'الأمان' },
  { en: 'Data', ku: 'داتا', ckb: 'داتا', ar: 'البيانات' },
  { en: 'Ethics', ku: 'ئەخلاق', ckb: 'ئەخلاق', ar: 'الأخلاقيات' },
]

export function getForumCategories(locale: Locale): string[] {
  return forumCategoriesRaw.map((c) => t(c, locale))
}

const forumTopicsRaw: ForumTopicRaw[] = [
  {
    author: 'archive_mole',
    replies: 42,
    category: { en: 'Methods', ku: 'رێبازان', ckb: 'ڕێبازەکان', ar: 'المنهجيات' },
    title: {
      en: 'How do you verify leaked financial spreadsheets at scale?',
      ku: 'چاوا هوین شیتێن دارایی یێن دزیبوویی ب شێوەیەکێ بەرفرەه پشتراست دکەن؟',
      ckb: 'چۆن شیتە دارایی دزراوەکان بە شێوەیەکی بەرفراوان پشتڕاست دەکەنەوە؟',
      ar: 'كيف تتحقّقون من جداول البيانات المالية المسرَّبة على نطاق واسع؟',
    },
    lastActivity: { en: '2h ago', ku: 'بەری ٢ کاتژمێران', ckb: 'بەری ٢ کاتژمێر', ar: 'قبل ساعتين' },
  },
  {
    author: 'signal_first',
    replies: 88,
    category: { en: 'Security', ku: 'ئاسایش', ckb: 'ئاسایش', ar: 'الأمان' },
    title: {
      en: 'Best practices for protecting sources on encrypted channels',
      ku: 'باشترین شێواز بۆ پاراستنا سەرچاوان ل سەر کەناڵێن شیفرەکری',
      ckb: 'باشترین شێوازەکان بۆ پاراستنی سەرچاوەکان لەسەر کەناڵە شیفرەکراوەکان',
      ar: 'أفضل الممارسات لحماية المصادر عبر القنوات المشفَّرة',
    },
    lastActivity: { en: '5h ago', ku: 'بەری ٥ کاتژمێران', ckb: 'بەری ٥ کاتژمێر', ar: 'قبل ٥ ساعات' },
  },
  {
    author: 'yara.k',
    replies: 17,
    category: { en: 'Data', ku: 'داتا', ckb: 'داتا', ar: 'البيانات' },
    title: {
      en: 'Open dataset: regional procurement contracts 2020–2025',
      ku: 'کۆمەڵە داتایا ڤەکری: گرێبەستێن کڕینا هەرێمی ٢٠٢٠–٢٠٢٥',
      ckb: 'کۆمەڵە داتای کراوە: گرێبەستەکانی کڕینی هەرێمی ٢٠٢٠–٢٠٢٥',
      ar: 'مجموعة بيانات مفتوحة: عقود المشتريات الإقليمية ٢٠٢٠–٢٠٢٥',
    },
    lastActivity: { en: '1d ago', ku: 'بەری ١ روژێ', ckb: 'بەری ١ ڕۆژ', ar: 'قبل يوم' },
  },
  {
    author: 'n_salameh',
    replies: 63,
    category: { en: 'Ethics', ku: 'ئەخلاق', ckb: 'ئەخلاق', ar: 'الأخلاقيات' },
    title: {
      en: 'Discussion: the ethics of publishing partial evidence',
      ku: 'گفتوگۆ: ئەخلاقێن بەلاڤکرنا بەلگەیێن نەتەمام',
      ckb: 'گفتوگۆ: ئەخلاقی بڵاوکردنەوەی بەڵگەی ناتەواو',
      ar: 'نقاش: أخلاقيات نشر الأدلّة الجزئية',
    },
    lastActivity: { en: '1d ago', ku: 'بەری ١ روژێ', ckb: 'بەری ١ ڕۆژ', ar: 'قبل يوم' },
  },
  {
    author: 'sami.visual',
    replies: 29,
    category: { en: 'Methods', ku: 'رێبازان', ckb: 'ڕێبازەکان', ar: 'المنهجيات' },
    title: {
      en: 'Tools for geolocating imagery with no metadata',
      ku: 'ئامرازان بۆ دیارکرنا جهێ وێنان بێ مێتاداتا',
      ckb: 'ئامرازەکان بۆ شوێندۆزی وێنە بەبێ مێتاداتا',
      ar: 'أدوات لتحديد موقع الصور دون بيانات وصفية',
    },
    lastActivity: { en: '2d ago', ku: 'بەری ٢ روژان', ckb: 'بەری ٢ ڕۆژ', ar: 'قبل يومين' },
  },
  {
    author: 'quiet_reader',
    replies: 51,
    category: { en: 'General', ku: 'گشتی', ckb: 'گشتی', ar: 'عام' },
    title: {
      en: 'Reader question: how does CARDU decide what to investigate?',
      ku: 'پرسیارا خواندەڤانی: کاردو چاوا بریارێ ددەت کا چ لێکۆلین بکەت؟',
      ckb: 'پرسیاری خوێنەر: کاردوو چۆن بڕیار دەدات چی لێکۆڵینەوە بکات؟',
      ar: 'سؤال قارئ: كيف تقرّر كاردو ما الذي ستحقّق فيه؟',
    },
    lastActivity: { en: '3d ago', ku: 'بەری ٣ روژان', ckb: 'بەری ٣ ڕۆژ', ar: 'قبل ٣ أيام' },
  },
]

export function getForumTopics(locale: Locale): ForumTopic[] {
  return forumTopicsRaw.map((topic) => ({
    author: topic.author,
    replies: topic.replies,
    category: t(topic.category, locale),
    title: t(topic.title, locale),
    lastActivity: t(topic.lastActivity, locale),
  }))
}

/* ------------------------------------------------------------------ */
/* Courses                                                             */
/* ------------------------------------------------------------------ */

export type Course = {
  title: string
  difficulty: string
  duration: string
  instructor: string
  progress: number
  category: string
  description: string
}

type CourseRaw = {
  title: LS
  difficulty: LS
  duration: LS
  instructor: LS
  progress: number
  category: LS
  description: LS
}

const coursesRaw: CourseRaw[] = [
  {
    progress: 0,
    title: {
      en: 'Investigative Research',
      ku: 'لێکۆلینا وردبینی',
      ckb: 'توێژینەوەی لێکۆڵینەوەیی',
      ar: 'البحث الاستقصائي',
    },
    difficulty: { en: 'Foundational', ku: 'بنەڕەتی', ckb: 'بنەڕەتی', ar: 'تأسيسي' },
    duration: { en: '6 hours', ku: '٦ کاتژمێر', ckb: '٦ کاتژمێر', ar: '٦ ساعات' },
    instructor: { en: 'Yara Khalil', ku: 'یارا خەلیل', ckb: 'یارا خەلیل', ar: 'يارا خليل' },
    category: { en: 'Research', ku: 'لێکۆلین', ckb: 'توێژینەوە', ar: 'بحث' },
    description: {
      en: 'Learn how to find, verify, document, and analyse information from public and leaked sources.',
      ku: 'فێربە چاوا زانیاریان ژ سەرچاوێن گشتی و دزیبوویی بدۆزی، پشتراست بکەی، بەلگە بکەی و شیکار بکەی.',
      ckb: 'فێربە چۆن زانیاری لە سەرچاوە گشتی و دزراوەکان بدۆزیتەوە، پشتڕاست بکەیتەوە، بەڵگەنامە بکەیت و شیکار بکەیت.',
      ar: 'تعلّم كيف تجد المعلومات من مصادر عامة ومسرَّبة وتتحقّق منها وتوثّقها وتحلّلها.',
    },
  },
  {
    progress: 35,
    title: {
      en: 'Following the Money',
      ku: 'شوپاندنا پارەی',
      ckb: 'بەدواداچوونی پارە',
      ar: 'تتبّع المال',
    },
    difficulty: { en: 'Intermediate', ku: 'ناڤیندی', ckb: 'ناوەندی', ar: 'متوسّط' },
    duration: { en: '8 hours', ku: '٨ کاتژمێر', ckb: '٨ کاتژمێر', ar: '٨ ساعات' },
    instructor: { en: 'Lina Haddad', ku: 'لینا حەداد', ckb: 'لینا حەداد', ar: 'لينا حداد' },
    category: { en: 'Finance', ku: 'دارایی', ckb: 'دارایی', ar: 'المالية' },
    description: {
      en: 'Read corporate filings, map ownership structures, and trace transactions across jurisdictions.',
      ku: 'تۆمارێن کۆمپانیان بخوینە، پێکهاتێن خاوەندارییێ نەخشە بکە، و مامەلان د ناڤبەرا دەسەڵاتان دا شوپا بکە.',
      ckb: 'تۆماری کۆمپانیاکان بخوێنەوە، پێکهاتەکانی خاوەندارێتی نەخشە بکە، و مامەڵەکان بەناو دەسەڵاتەکاندا بەدوایاندا بگەڕێ.',
      ar: 'اقرأ ملفّات الشركات، وارسم هياكل الملكية، ��تتبّع المعاملات عبر الولايات القضائية.',
    },
  },
  {
    progress: 100,
    title: {
      en: 'Source Protection & Security',
      ku: 'پاراستنا سەرچاوان و ئاسایش',
      ckb: 'پاراستنی سەرچاوە و ئاسایش',
      ar: 'حماية المصادر والأمان',
    },
    difficulty: { en: 'Essential', ku: 'پێویست', ckb: 'پێویست', ar: 'أساسي' },
    duration: { en: '4 hours', ku: '٤ کاتژمێر', ckb: '٤ کاتژمێر', ar: '٤ ساعات' },
    instructor: { en: 'Nour Salameh', ku: 'نوور سەلامە', ckb: 'نوور سەلامە', ar: 'نور سلامة' },
    category: { en: 'Security', ku: 'ئاسایش', ckb: 'ئاسایش', ar: 'الأمان' },
    description: {
      en: 'Protect yourself and your sources with operational security and secure communication.',
      ku: 'خۆ و سەرچاوێن خۆ ب ئاسایشا کاری و پەیوەندییا پارستی بپارێزە.',
      ckb: 'خۆت و سەرچاوەکانت بپارێزە بە ئاسایشی کاری و پەیوەندی پارێزراو.',
      ar: 'احمِ نفسك ومصادرك بالأمان التشغيلي والتواصل الآمن.',
    },
  },
  {
    progress: 60,
    title: {
      en: 'Visual Verification',
      ku: 'پشتراستکرنا دیمەنی',
      ckb: 'پشتڕاستکردنەوەی بینراو',
      ar: 'التحقّق البصري',
    },
    difficulty: { en: 'Intermediate', ku: 'ناڤیندی', ckb: 'ناوەندی', ar: 'متوسّط' },
    duration: { en: '7 hours', ku: '٧ کاتژمێر', ckb: '٧ کاتژمێر', ar: '٧ ساعات' },
    instructor: { en: 'Sami Rahal', ku: 'سامی رەحال', ckb: 'سامی رەحال', ar: 'سامي رحال' },
    category: { en: 'Verification', ku: 'پشتراستکرن', ckb: 'پشتڕاستکردنەوە', ar: 'التحقّق' },
    description: {
      en: 'Geolocate, chronolocate, and authenticate images and video from open sources.',
      ku: 'جهـ و دەمێ وێنە و ڤیدیۆیان دیار بکە و ژ سەرچاوێن ڤەکری راستییا وان پشتراست بکە.',
      ckb: 'شوێن و کاتی وێنە و ڤیدیۆکان دیاری بکە و لە سەرچاوە کراوەکانەوە ڕاستییان پشتڕاست بکەرەوە.',
      ar: 'حدّد موقع وزمن الصور والفيديو من مصادر مفتوحة وتحقّق من صحّتها.',
    },
  },
  {
    progress: 10,
    title: {
      en: 'Data for Journalists',
      ku: 'داتا بۆ روژنامەڤانان',
      ckb: 'داتا بۆ ڕۆژنامەنووسان',
      ar: 'البيانات للصحفيين',
    },
    difficulty: { en: 'Foundational', ku: 'بنەڕەتی', ckb: 'بنەڕەتی', ar: 'تأسيسي' },
    duration: { en: '9 hours', ku: '٩ کاتژمێر', ckb: '٩ کاتژمێر', ar: '٩ ساعات' },
    instructor: { en: 'Yara Khalil', ku: 'یارا خەلیل', ckb: 'یارا خەلیل', ar: 'يارا خليل' },
    category: { en: 'Data', ku: 'داتا', ckb: 'داتا', ar: 'البيانات' },
    description: {
      en: 'Clean, analyse, and interrogate datasets to find the story hidden in the numbers.',
      ku: 'کۆمەڵە داتایان پاق بکە، شیکار بکە و لێکۆلینێ بکە دا کو ئەو چیرۆکا د ژمارەیان دا ڤەشارتی بدۆزی.',
      ckb: 'کۆمەڵە داتاکان پاک بکەرەوە، شیکار بکە و لێیان بکۆڵەرەوە بۆ دۆزینەوەی ئەو چیرۆکەی لە ژمارەکاندا شاردراوەتەوە.',
      ar: 'نظّف مجموعات البيانات وحلّلها واستجوبها لتجد القصة المخبّأة في الأرقام.',
    },
  },
  {
    progress: 0,
    title: {
      en: 'Writing the Investigation',
      ku: 'نڤیسینا لێکۆلینێ',
      ckb: 'نووسینی لێکۆڵینەوە',
      ar: 'كتابة التحقيق',
    },
    difficulty: { en: 'Advanced', ku: 'پێشکەفتی', ckb: 'پێشکەوتوو', ar: 'متقدّم' },
    duration: { en: '5 hours', ku: '٥ کاتژمێر', ckb: '٥ کاتژمێر', ar: '٥ ساعات' },
    instructor: { en: 'Tarek Aoun', ku: 'تارق عەون', ckb: 'تارق عەون', ar: 'طارق عون' },
    category: { en: 'Craft', ku: 'هونەر', ckb: 'پیشە', ar: 'الحرفة' },
    description: {
      en: 'Structure complex findings into clear, defensible, and compelling published work.',
      ku: 'دۆزینێن ئاڵۆز ب شێوەیەکێ ئاشکرا، پاراستنبار و بکێرهاتی وەکو کارەکێ بەلاڤکری رێکبخە.',
      ckb: 'دۆزینەوە ئاڵۆزەکان بکە بە کارێکی بڵاوکراوەی ڕوون، بەرگریکراو و سەرنجڕاکێش.',
      ar: 'صُغ النتائج المعقّدة في عمل منشور واضح وقابل للدفاع ومقنِع.',
    },
  },
]

export function getCourses(locale: Locale): Course[] {
  return coursesRaw.map((c) => ({
    progress: c.progress,
    title: t(c.title, locale),
    difficulty: t(c.difficulty, locale),
    duration: t(c.duration, locale),
    instructor: t(c.instructor, locale),
    category: t(c.category, locale),
    description: t(c.description, locale),
  }))
}

/* ------------------------------------------------------------------ */
/* Resources                                                           */
/* ------------------------------------------------------------------ */

export type Resource = {
  title: string
  type: string
  description: string
  format: string
}

type ResourceRaw = {
  title: LS
  type: LS
  description: LS
  format: string
}

const resourcesRaw: ResourceRaw[] = [
  {
    format: 'PDF',
    type: { en: 'Guide', ku: 'رێبەر', ckb: 'ڕێنمایی', ar: 'دليل' },
    title: {
      en: 'Document Verification Checklist',
      ku: 'لیستا پشتراستکرنا بەلگەنامان',
      ckb: 'لیستی پشتڕاستکردنەوەی بەڵگەنامە',
      ar: 'قائمة التحقّق من الوثائق',
    },
    description: {
      en: 'A step-by-step framework for authenticating leaked and public documents.',
      ku: 'چوارچووەیەکێ گاڤ-ب-گاڤ بۆ پشتراستکرنا بەلگەنامێن دزیبوویی و گشتی.',
      ckb: 'چوارچێوەیەکی هەنگاو بە هەنگاو بۆ ڕاستکردنەوەی بەڵگەنامە دزراو و گشتییەکان.',
      ar: 'إطار عمل خطوة بخطوة للتأكّد من صحّة الوثائق المسرَّبة والعامة.',
    },
  },
  {
    format: 'PDF',
    type: { en: 'Guide', ku: 'رێبەر', ckb: 'ڕێنمایی', ar: 'دليل' },
    title: {
      en: 'Source Protection Handbook',
      ku: 'رێبەرا پاراستنا سەرچاوان',
      ckb: 'ڕێبەری پ��راستنی سەرچاوە',
      ar: 'دليل حماية المصادر',
    },
    description: {
      en: 'Operational security practices for protecting confidential sources.',
      ku: 'شێوازێن ئاسایشا کاری بۆ پاراستنا سەرچاوێن نهێنی.',
      ckb: 'شێوازەکانی ئاسایشی کاری بۆ پاراستنی سەرچاوە نهێنییەکان.',
      ar: 'ممارسات الأمان التشغيلي لحماية المصادر السرّية.',
    },
  },
  {
    format: 'DOCX',
    type: { en: 'Template', ku: 'قاڵب', ckb: 'قاڵب', ar: 'قالب' },
    title: {
      en: 'FOIA & Records Request Templates',
      ku: 'قاڵبێن داخوازا زانیاری و تۆماران',
      ckb: 'قاڵبەکانی داواکاری زانیاری و تۆمار',
      ar: 'قوالب طلب المعلومات والسجلّات',
    },
    description: {
      en: 'Reusable request letters for public records across jurisdictions.',
      ku: 'نامەیێن داخوازا دوو��ارە-بکارئینانی بۆ تۆمارێن گشتی د دەسەڵاتان دا.',
      ckb: 'نامەکانی داواکاری دووبارە بەکارهێنراو بۆ تۆمارە گشتییەکان بەناو دەسەڵاتەکاندا.',
      ar: 'رسائل طلب قابلة لإعادة الاستخدام للسجلّات العامة عبر الولايات القضائية.',
    },
  },
  {
    format: 'PDF',
    type: { en: 'Report', ku: 'راپۆرت', ckb: 'ڕاپۆرت', ar: 'تقرير' },
    title: {
      en: 'Annual Impact Report 2025',
      ku: 'راپۆرتا کاریگەرییا سالانە ٢٠٢٥',
      ckb: 'ڕاپۆرتی کاریگەری ساڵانەی ٢٠٢٥',
      ar: 'تقرير الأثر السنوي ٢٠٢٥',
    },
    description: {
      en: 'A full account of CARDU investigations and their measurable outcomes.',
      ku: 'راپۆرتەکا تەمام یا لێکۆلینێن کاردو و ئەنجامێن وان یێن پێواندی.',
      ckb: 'ئاماژەیەکی تەواو بۆ لێکۆڵینەوەکانی کاردوو و دەرئەنجامە پێوانەکراوەکانیان.',
      ar: 'سرد كامل لتحقيقات كاردو ونتائجها القابلة للقياس.',
    },
  },
  {
    format: 'XLSX',
    type: { en: 'Tool', ku: 'ئامراز', ckb: 'ئامراز', ar: 'أداة' },
    title: {
      en: 'Ownership Mapping Toolkit',
      ku: 'کۆمەڵە ئامرازێن نەخشەکرنا خاوەندارییێ',
      ckb: 'کۆمەڵە ئامرازی نەخشەکردنی خاوەندارێتی',
      ar: 'عُدّة رسم خرائط الملكية',
    },
    description: {
      en: 'Spreadsheet and methodology for mapping corporate beneficial ownership.',
      ku: 'شیت و رێباز بۆ نەخشەکرنا خاوەندارییا سوودمەندا کۆمپانیان.',
      ckb: 'شیت و ڕێباز بۆ نەخشەکردنی خاوەندارێتی سوودمەندی کۆمپانیاکان.',
      ar: 'جدول بيانات ومنهجية لرسم خرائط الملكية المنتفعة للشركات.',
    },
  },
  {
    format: 'PDF',
    type: { en: 'Report', ku: 'راپۆرت', ckb: 'ڕاپۆرت', ar: 'تقرير' },
    title: {
      en: 'Ethics & Standards Policy',
      ku: 'سیاسەتا ئەخلاق و ستانداردان',
      ckb: 'سیاسەتی ئەخلاق و ستانداردەکان',
      ar: 'سياسة الأخلاقيات والمعايير',
    },
    description: {
      en: 'The editorial standards every CARDU investigation is held to.',
      ku: 'ئەو ستانداردێن ئەدیتۆری کو هەر لێکۆلینەکا کاردو پێ دهێتە پێوان.',
      ckb: 'ئەو ستانداردانەی ئەدیتۆری کە هەر لێکۆڵینەوەیەکی کاردوو پێی هەڵدەسەنگێنرێت.',
      ar: 'المعايير التحريرية التي يخضع لها كل تحقيق في كاردو.',
    },
  },
]

export function getResources(locale: Locale): Resource[] {
  return resourcesRaw.map((r) => ({
    format: r.format,
    type: t(r.type, locale),
    title: t(r.title, locale),
    description: t(r.description, locale),
  }))
}
