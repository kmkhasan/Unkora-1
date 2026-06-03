'use client';

import { useState } from 'react';
import { FileText, Edit3, Eye, Save, X, Plus, Globe, Shield, HelpCircle, Phone, Info, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

/* ─── static page definitions ─────────────────────────────────── */
type PageKey = 'about' | 'terms' | 'privacy' | 'contact' | 'faq' | 'shipping' | 'returns' | 'careers';

interface StaticPage {
  key: PageKey;
  title: string;
  titleBn: string;
  icon: React.ElementType;
  slug: string;
  color: string;
  description: string;
}

const PAGES: StaticPage[] = [
  { key: 'about',    title: 'About Us',           titleBn: 'আমাদের সম্পর্কে', icon: Info,       slug: '/about',           color: 'blue',   description: 'Company story, mission, and team info' },
  { key: 'terms',    title: 'Terms & Conditions', titleBn: 'শর্তাবলী',          icon: Shield,     slug: '/terms',           color: 'gray',   description: 'Usage terms, purchase conditions' },
  { key: 'privacy',  title: 'Privacy Policy',     titleBn: 'গোপনীয়তা নীতি',   icon: Shield,     slug: '/privacy',         color: 'purple', description: 'Data collection and privacy info' },
  { key: 'contact',  title: 'Contact Us',         titleBn: 'যোগাযোগ',          icon: Phone,      slug: '/contact',         color: 'green',  description: 'Contact details, office address, map' },
  { key: 'faq',      title: 'FAQ',                titleBn: 'সাধারণ প্রশ্ন',    icon: HelpCircle, slug: '/faq',             color: 'yellow', description: 'Frequently asked questions' },
  { key: 'shipping', title: 'Shipping Policy',    titleBn: 'ডেলিভারি নীতি',   icon: Globe,      slug: '/shipping-policy', color: 'orange', description: 'Shipping rates, timelines, zones' },
  { key: 'returns',  title: 'Return Policy',      titleBn: 'রিটার্ন নীতি',     icon: FileText,   slug: '/return-policy',   color: 'red',    description: 'Return, refund, and exchange policy' },
  { key: 'careers',  title: 'Careers',            titleBn: 'চাকরি',            icon: Plus,       slug: '/careers',         color: 'teal',   description: 'Job openings and application info' },
];

const DEFAULT_CONTENT: Record<PageKey, string> = {
  about: `# UNKORA সম্পর্কে

UNKORA বাংলাদেশের একটি আধুনিক অনলাইন বইয়ের দোকান। আমরা ২০২৩ সালে যাত্রা শুরু করেছি এবং বাংলাদেশের পাঠকদের কাছে সেরা বই পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।

## আমাদের লক্ষ্য
- সেরা দামে মানসম্পন্ন বই সরবরাহ করা
- দ্রুত ও নিরাপদ ডেলিভারি নিশ্চিত করা
- পাঠকদের জন্য একটি বিশ্বস্ত প্ল্যাটফর্ম তৈরি করা

## যোগাযোগ করুন
- ইমেইল: support@unkora.com
- ফোন: +880 1700-000000`,

  terms: `# শর্তাবলী (Terms & Conditions)

এই ওয়েবসাইট ব্যবহার করে আপনি নিম্নলিখিত শর্তাবলীতে সম্মত হচ্ছেন।

## অর্ডার ও পেমেন্ট
- অর্ডার সম্পন্ন হলে ইমেইল কনফার্মেশন পাঠানো হবে
- পেমেন্ট বিকাশ, নগদ, কার্ড বা ক্যাশ অন ডেলিভারিতে করা যাবে

## ডেলিভারি
- ঢাকায় ১-২ কার্যদিবস, ঢাকার বাইরে ২-৫ কার্যদিবস

## বাতিলকরণ
- অর্ডার দেওয়ার ২৪ ঘন্টার মধ্যে বাতিল করা যাবে`,

  privacy: `# গোপনীয়তা নীতি (Privacy Policy)

আপনার ব্যক্তিগত তথ্যের সুরক্ষা আমাদের অগ্রাধিকার।

## আমরা কী তথ্য সংগ্রহ করি
- নাম, ইমেইল, ফোন নম্বর
- ডেলিভারি ঠিকানা
- অর্ডার ইতিহাস

## তথ্য ব্যবহার
- অর্ডার প্রক্রিয়াকরণ ও ডেলিভারির জন্য
- গ্রাহক সেবা প্রদানের জন্য
- প্রমোশনাল অফার পাঠানোর জন্য (সম্মতি সহ)

আমরা কখনো তৃতীয় পক্ষের কাছে আপনার তথ্য বিক্রি করি না।`,

  contact: `# যোগাযোগ করুন

**UNKORA**
📍 ঠিকানা: ঢাকা, বাংলাদেশ
📞 ফোন: +880 1700-000000
📧 ইমেইল: support@unkora.com
🕒 সময়: সকাল ৯টা - রাত ৯টা (শনি-বৃহস্পতি)

## সোশ্যাল মিডিয়া
- Facebook: /unkorabd
- Instagram: @unkorabd`,

  faq: `# সাধারণ প্রশ্নোত্তর (FAQ)

## ডেলিভারি কতদিনে হয়?
ঢাকায় ১-২ কার্যদিবস এবং ঢাকার বাইরে ২-৫ কার্যদিবসের মধ্যে।

## কীভাবে পেমেন্ট করব?
বিকাশ, নগদ, ডেবিট/ক্রেডিট কার্ড এবং ক্যাশ অন ডেলিভারিতে পেমেন্ট করা যায়।

## বই ফেরত দেওয়া যাবে কি?
অর্ডার পাওয়ার ৭ দিনের মধ্যে বই নষ্ট বা ভুল হলে ফেরত দেওয়া যাবে।

## কি কি বই পাওয়া যায়?
বাংলা ও ইংরেজি সব ধরনের বই পাওয়া যায় — উপন্যাস, শিক্ষামূলক, ইসলামিক, শিশু সাহিত্য ইত্যাদি।`,

  shipping: `# ডেলিভারি নীতি (Shipping Policy)

## ডেলিভারি চার্জ
- ঢাকার মধ্যে: ৬০ টাকা
- ঢাকার বাইরে: ১২০ টাকা
- ৫০০ টাকার উপরে অর্ডারে ঢাকায় ফ্রি ডেলিভারি

## ডেলিভারি সময়
- ঢাকা: ১-২ কার্যদিবস
- চট্টগ্রাম, সিলেট, রাজশাহী: ২-৩ কার্যদিবস
- অন্যান্য: ৩-৫ কার্যদিবস

## ট্র্যাকিং
অর্ডার শিপমেন্টের পরে ট্র্যাকিং নম্বর SMS ও ইমেইলে পাঠানো হবে।`,

  returns: `# রিটার্ন ও রিফান্ড নীতি

## রিটার্নযোগ্য পণ্য
- ভুল বই পাঠানো হলে
- বই নষ্ট বা ক্ষতিগ্রস্ত হলে
- ৭ দিনের মধ্যে রিটার্ন করতে হবে

## রিটার্ন প্রক্রিয়া
১. support@unkora.com এ ইমেইল করুন
২. অর্ডার নম্বর ও ছবি পাঠান
৩. আমরা পিকআপের ব্যবস্থা করব

## রিফান্ড
রিটার্ন নিশ্চিত হওয়ার ৩-৫ কার্যদিবসের মধ্যে রিফান্ড প্রদান করা হবে।`,

  careers: `# ক্যারিয়ার

UNKORA-তে যোগ দিন এবং বাংলাদেশের বৃহত্তম অনলাইন বইয়ের দোকানের অংশ হন।

## বর্তমান সুযোগ
- কাস্টমার সার্ভিস এক্সিকিউটিভ
- ডেলিভারি পার্টনার
- কন্টেন্ট রাইটার (বাংলা)
- সফটওয়্যার ডেভেলপার

## আবেদন করুন
careers@unkora.com এ আপনার CV পাঠান।`,
};

const DEFAULT_COLOR = { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-100 text-gray-700' };
const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700' },
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-200',   text: 'text-gray-700',   badge: 'bg-gray-100 text-gray-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  text: 'text-green-700',  badge: 'bg-green-100 text-green-700' },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    badge: 'bg-red-100 text-red-700' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   text: 'text-teal-700',   badge: 'bg-teal-100 text-teal-700' },
};

interface FaqItem { q: string; a: string }

function FaqEditor({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  const [expanded, setExpanded] = useState<number | null>(0);

  const add = () => onChange([...items, { q: '', a: '' }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, field: 'q' | 'a', val: string) => {
    const next = [...items];
    const cur = next[i];
    if (cur) next[i] = { ...cur, [field]: val };
    onChange(next);
  };

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors text-left"
          >
            <span className="truncate">{item.q || `প্রশ্ন ${i + 1}`}</span>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <button onClick={e => { e.stopPropagation(); remove(i); }}
                className="p-1 rounded hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
              {expanded === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
          </button>
          {expanded === i && (
            <div className="p-4 space-y-3 bg-white">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">প্রশ্ন (Question)</label>
                <input value={item.q} onChange={e => update(i, 'q', e.target.value)}
                  placeholder="প্রশ্ন লিখুন..."
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">উত্তর (Answer)</label>
                <textarea value={item.a} onChange={e => update(i, 'a', e.target.value)}
                  rows={3} placeholder="উত্তর লিখুন..."
                  className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none" />
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={add}
        className="flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors border border-primary/20 w-full justify-center">
        <Plus className="w-3.5 h-3.5" /> নতুন প্রশ্ন যোগ করুন
      </button>
    </div>
  );
}

export default function AdminContentPage() {
  const [editingKey, setEditingKey] = useState<PageKey | null>(null);
  const [contents, setContents] = useState<Record<PageKey, string>>(DEFAULT_CONTENT as Record<PageKey, string>);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    { q: 'ডেলিভারি কতদিনে হয়?', a: 'ঢাকায় ১-২ কার্যদিবস এবং ঢাকার বাইরে ২-৫ কার্যদিবসের মধ্যে।' },
    { q: 'কীভাবে পেমেন্ট করব?', a: 'বিকাশ, নগদ, ডেবিট/ক্রেডিট কার্ড এবং ক্যাশ অন ডেলিভারিতে পেমেন্ট করা যায়।' },
    { q: 'বই ফেরত দেওয়া যাবে কি?', a: 'অর্ডার পাওয়ার ৭ দিনের মধ্যে বই নষ্ট বা ভুল হলে ফেরত দেওয়া যাবে।' },
  ]);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  const editingPage = PAGES.find(p => p.key === editingKey);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    toast.success(`"${editingPage?.title}" saved successfully`);
    setEditingKey(null);
  };

  if (editingKey && editingPage) {
    const c = COLOR_MAP[editingPage.color] ?? DEFAULT_COLOR;
    return (
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setEditingKey(null)}
              className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <div>
              <h1 className="text-lg font-black text-gray-900">{editingPage.title}</h1>
              <p className="text-xs text-gray-500">{editingPage.titleBn} · {editingPage.slug}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPreview(p => !p)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${preview ? 'bg-gray-100 border-gray-200 text-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              <Eye className="w-3.5 h-3.5" />
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors">
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Editor */}
          <div className="lg:col-span-2 space-y-4">
            {editingKey === 'faq' ? (
              <div className="bg-white rounded-2xl border p-5">
                <h3 className="font-bold text-sm text-gray-800 mb-4">FAQ আইটেমসমূহ</h3>
                <FaqEditor items={faqItems} onChange={setFaqItems} />
              </div>
            ) : preview ? (
              <div className="bg-white rounded-2xl border p-6 prose prose-sm max-w-none min-h-[400px]">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                  {contents[editingKey]}
                </pre>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-600">Content Editor (Markdown supported)</span>
                </div>
                <textarea
                  value={contents[editingKey]}
                  onChange={e => setContents(prev => ({ ...prev, [editingKey]: e.target.value }))}
                  rows={20}
                  className="w-full px-5 py-4 text-sm text-gray-700 font-mono focus:outline-none resize-none leading-relaxed"
                  placeholder="পেজ কন্টেন্ট লিখুন..."
                />
              </div>
            )}
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            <div className={`${c.bg} ${c.border} border rounded-2xl p-4`}>
              <editingPage.icon className={`w-6 h-6 ${c.text} mb-3`} />
              <h3 className="font-bold text-sm text-gray-800 mb-1">{editingPage.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{editingPage.description}</p>
              <div className="text-xs font-semibold text-gray-600">
                URL: <span className="font-mono text-gray-800">{editingPage.slug}</span>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-4">
              <h3 className="font-bold text-xs text-gray-600 uppercase tracking-wider mb-3">Tips</h3>
              <ul className="space-y-1.5 text-xs text-gray-500">
                <li>• <strong># হেডিং 1</strong> দিয়ে বড় শিরোনাম</li>
                <li>• <strong>## হেডিং 2</strong> দিয়ে উপশিরোনাম</li>
                <li>• <strong>**bold**</strong> দিয়ে মোটা লেখা</li>
                <li>• <strong>- item</strong> দিয়ে তালিকা</li>
                <li>• এন্টার দিয়ে নতুন প্যারাগ্রাফ</li>
              </ul>
            </div>

            <button
              onClick={() => window.open(editingPage.slug, '_blank')}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              View Live Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-gray-900">CMS Pages</h1>
        <p className="text-sm text-gray-500 mt-0.5">স্ট্যাটিক পেজ কন্টেন্ট ম্যানেজ করুন</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'মোট পেজ', value: PAGES.length, icon: FileText, color: 'text-blue-600 bg-blue-50' },
          { label: 'সক্রিয়', value: PAGES.length, icon: Globe, color: 'text-green-600 bg-green-50' },
          { label: 'FAQ প্রশ্ন', value: faqItems.length, icon: HelpCircle, color: 'text-yellow-600 bg-yellow-50' },
          { label: 'শেষ আপডেট', value: 'আজ', icon: Edit3, color: 'text-purple-600 bg-purple-50' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-lg leading-none">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pages grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {PAGES.map(page => {
          const c = COLOR_MAP[page.color] ?? DEFAULT_COLOR;
          return (
            <div key={page.key} className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group overflow-hidden">
              <div className={`${c.bg} px-4 py-4 border-b ${c.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                    <page.icon className={`w-4.5 h-4.5 ${c.text}`} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge}`}>
                    Published
                  </span>
                </div>
                <h3 className="font-black text-gray-900 text-sm">{page.title}</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">{page.titleBn}</p>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{page.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400">{page.slug}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => window.open(page.slug, '_blank')}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingKey(page.key)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-white text-[11px] font-bold hover:bg-primary/90 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ quick view */}
      <div className="bg-white rounded-2xl border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-yellow-500" />
            <h2 className="font-black text-gray-900">FAQ Management</h2>
          </div>
          <button onClick={() => setEditingKey('faq')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors">
            <Edit3 className="w-3.5 h-3.5" /> Edit FAQs
          </button>
        </div>
        <div className="space-y-2">
          {faqItems.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-xs font-black text-gray-400 mt-0.5 flex-shrink-0">{i + 1}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-800">{item.q}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.a}</p>
              </div>
            </div>
          ))}
          {faqItems.length > 3 && (
            <p className="text-xs text-gray-400 text-center">+ {faqItems.length - 3} more questions</p>
          )}
        </div>
      </div>
    </div>
  );
}
