import React, { useState, useEffect } from 'react';
import {
  Globe,
  Save,
  RotateCcw,
  Share2,
  Image as ImageIcon,
  CheckCircle2,
  Search,
  Smartphone,
  Monitor,
  Copy,
  Check,
  Sparkles,
  Info,
  ExternalLink,
  Star,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

// Verified facility photography presets for social sharing
const IMAGE_PRESETS = [
  {
    label: 'Facility Exterior (Day)',
    path: '/assets/tnoc_facility_day.jpg',
    description: 'Verified daytime exterior facade in Msamvu',
  },
  {
    label: 'Automated Laboratory',
    path: '/assets/tnoc-laboratory.jpg',
    description: 'Internal clinical testing suite & analyzers',
  },
  {
    label: 'Roadside Entrance Totem',
    path: '/assets/tnoc_entrance_pillar.jpg',
    description: 'Msamvu junction directional lightbox pillar',
  },
  {
    label: 'Phlebotomy & Sample Draw',
    path: '/assets/tnoc-phlebotomy.jpg',
    description: 'Sterile specimen collection station',
  },
];

const SUGGESTED_KEYWORDS = [
  'TNOC Diagnostics',
  'Maabara ya Msamvu',
  'Medical Laboratory Morogoro',
  'Ultrasound Msamvu',
  'Full Blood Picture (CBC)',
  'Kipimo cha Damu Morogoro',
  'Dr. Monasser',
  'Diagnostic Ultrasound Tanzania',
  'Kidney Function Test Morogoro',
  'Lipid Profile Test Msamvu',
];

export const AdminSeoTab: React.FC = () => {
  const { seo, updateSeo, resetSeo, showToast, gallery } = useCms();

  // Local form state
  const [siteTitle, setSiteTitle] = useState(seo.siteTitle || '');
  const [metaTitle, setMetaTitle] = useState(seo.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(seo.metaDescription || '');
  const [keywords, setKeywords] = useState(seo.keywords || '');
  const [ogTitle, setOgTitle] = useState(seo.ogTitle || '');
  const [ogDescription, setOgDescription] = useState(seo.ogDescription || '');
  const [ogImage, setOgImage] = useState(seo.ogImage || '/assets/tnoc_facility_day.jpg');
  const [ogImageAlt, setOgImageAlt] = useState(seo.ogImageAlt || '');
  const [twitterCard, setTwitterCard] = useState<'summary_large_image' | 'summary'>(
    seo.twitterCard || 'summary_large_image'
  );
  const [robots, setRobots] = useState(seo.robots || 'index, follow');
  const [canonicalUrl, setCanonicalUrl] = useState(seo.canonicalUrl || 'https://tnocdiagnostics.co.tz');

  // Preview & modal states
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Sync when SEO updates from external changes (such as gallery hero changes)
  useEffect(() => {
    if (seo.ogImage) setOgImage(seo.ogImage);
    if (seo.ogImageAlt) setOgImageAlt(seo.ogImageAlt);
  }, [seo.ogImage, seo.ogImageAlt]);

  // Current featured or primary photo from gallery
  const currentHeroPhoto = gallery.find((p) => p.isFeatured) || gallery[0];

  // Form submission
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeo({
      siteTitle: siteTitle.trim(),
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      keywords: keywords.trim(),
      ogTitle: ogTitle.trim() || metaTitle.trim() || siteTitle.trim(),
      ogDescription: ogDescription.trim() || metaDescription.trim(),
      ogImage: ogImage.trim(),
      ogImageAlt: ogImageAlt.trim(),
      twitterCard,
      robots: robots.trim(),
      canonicalUrl: canonicalUrl.trim(),
    });
    showToast('Global SEO metadata saved and synced to live document head.');
  };

  const executeReset = () => {
    resetSeo();
    setConfirmResetOpen(false);
    showToast('SEO settings restored to verified defaults.');
  };

  const handleAddKeyword = (kw: string) => {
    const list = keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    if (!list.includes(kw)) {
      list.push(kw);
      setKeywords(list.join(', '));
    }
  };

  const handleCopyMetaHtml = () => {
    const activeTitle = metaTitle || siteTitle;
    const htmlSnippet = `<!-- Primary SEO Tags -->
<title>${activeTitle}</title>
<meta name="description" content="${metaDescription}" />
<meta name="keywords" content="${keywords}" />
<meta name="robots" content="${robots}" />
<link rel="canonical" href="${canonicalUrl}" />

<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:title" content="${ogTitle || activeTitle}" />
<meta property="og:description" content="${ogDescription || metaDescription}" />
<meta property="og:image" content="${ogImage}" />

<!-- Twitter -->
<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:title" content="${ogTitle || activeTitle}" />
<meta name="twitter:description" content="${ogDescription || metaDescription}" />
<meta name="twitter:image" content="${ogImage}" />`;

    navigator.clipboard.writeText(htmlSnippet);
    setCopiedHtml(true);
    showToast('SEO HTML snippet copied to clipboard.');
    setTimeout(() => setCopiedHtml(false), 3000);
  };

  // Length calculation indicators
  const titleLength = (metaTitle || siteTitle).length;
  const descLength = metaDescription.length;

  return (
    <div className="space-y-8">
      {/* Top Header & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <Globe className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              SEO & Social Metadata Management
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure global site titles, search engine indexing, Open Graph social previews, and local Morogoro discovery tags.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleCopyMetaHtml}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            title="Copy compiled HTML tags"
          >
            {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedHtml ? 'HTML Copied' : 'Copy HTML'}</span>
          </button>

          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Real-time Head Sync Notice */}
      <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-semibold">
            Active Document & Head Synchronizer Active:
          </span>
          <span className="text-emerald-700 hidden sm:inline">
            Changes saved here update browser title, Open Graph cards, and search tags in real time.
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
          Live Sync
        </span>
      </div>

      {/* Main Grid: Form (Left) & Real-time Live Previews (Right) */}
      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Settings (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Global Title & Meta Tags */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Search className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  1. Search Engine Metadata
                </h3>
              </div>

              {/* Site Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Global Site Title *
                  </label>
                  <span className="text-[11px] text-slate-400">Branding identity prefix</span>
                </div>
                <input
                  type="text"
                  required
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  placeholder="TNOC Medical Diagnostic Facility | TNOC Diagnostics (Maabara ya Msamvu)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              {/* Meta Page Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Search Results Title (&lt;title&gt;) *
                  </label>
                  <span
                    className={`text-[11px] font-bold ${
                      titleLength >= 40 && titleLength <= 65
                        ? 'text-emerald-600'
                        : titleLength > 65
                        ? 'text-amber-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {titleLength} / 60 chars (Recommended: 50–60)
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="TNOC Medical Diagnostic Facility | Maabara ya Msamvu, Morogoro"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Meta Description *
                  </label>
                  <span
                    className={`text-[11px] font-bold ${
                      descLength >= 120 && descLength <= 165
                        ? 'text-emerald-600'
                        : descLength > 165
                        ? 'text-amber-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {descLength} / 160 chars (Ideal: 120–160)
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Reliable medical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro, Tanzania. Accurate results you can trust."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden resize-y"
                />
              </div>

              {/* Search Keywords */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Keywords & Search Phrases (Comma-Separated)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="TNOC Diagnostics, Maabara ya Msamvu, Ultrasound Morogoro, CBC blood test..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />

                {/* Quick Keyword suggestions */}
                <div className="mt-2.5">
                  <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span>Click to add recommended tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_KEYWORDS.map((kw) => {
                      const isIncluded = keywords.toLowerCase().includes(kw.toLowerCase());
                      return (
                        <button
                          key={kw}
                          type="button"
                          disabled={isIncluded}
                          onClick={() => handleAddKeyword(kw)}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                            isIncluded
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default'
                              : 'bg-blue-50/70 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer'
                          }`}
                        >
                          {isIncluded ? '✓' : '+'} {kw}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Social Media & Open Graph Sharing */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Share2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  2. Social Media Sharing & Open Graph (WhatsApp, Facebook, Twitter)
                </h3>
              </div>

              {/* Social Sharing Image Setting (Connected to Uploaded Gallery Photos) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Facility Photography & Social Preview Image (og:image) *
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Dynamically connected to your uploaded facility gallery. Select any photograph below or sync to the active gallery hero landmark.
                    </p>
                  </div>

                  {currentHeroPhoto && (
                    <button
                      type="button"
                      onClick={() => {
                        setOgImage(currentHeroPhoto.imageSrc);
                        setOgImageAlt(currentHeroPhoto.title);
                        showToast(`Synced SEO sharing image to Gallery Hero: "${currentHeroPhoto.title}"`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors shrink-0"
                    >
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>Sync with Gallery Hero Photo</span>
                    </button>
                  )}
                </div>

                {/* Uploaded Gallery Photography Grid */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                      <span>Uploaded Facility Gallery Photos ({gallery.length})</span>
                    </span>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      Click any photo to select it for social links (WhatsApp, Facebook, Twitter)
                    </span>
                  </div>

                  {gallery.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
                      {gallery.map((photo) => {
                        const isSelected = ogImage === photo.imageSrc;
                        return (
                          <button
                            key={photo.id}
                            type="button"
                            onClick={() => {
                              setOgImage(photo.imageSrc);
                              setOgImageAlt(photo.title);
                              showToast(`Selected "${photo.title}" as social sharing photograph.`);
                            }}
                            className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all p-1.5 flex flex-col ${
                              isSelected
                                ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/90 shadow-xs'
                                : 'border-slate-200 hover:border-blue-300 bg-white hover:shadow-2xs'
                            }`}
                          >
                            <div className="w-full h-20 rounded-lg overflow-hidden bg-slate-100 relative mb-1.5">
                              <img
                                src={photo.imageSrc}
                                alt={photo.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                                }}
                              />
                              <div className="absolute top-1 left-1 flex flex-col gap-0.5">
                                <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                                  {photo.category}
                                </span>
                                {photo.isFeatured && (
                                  <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5 shadow-xs">
                                    <Star className="w-2.5 h-2.5 fill-white" />
                                    <span>Hero</span>
                                  </span>
                                )}
                              </div>
                              {isSelected && (
                                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                            <div className="text-[11px] font-bold text-slate-900 truncate">
                              {photo.title}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate mt-0.5">
                              {photo.description || photo.category}
                            </div>
                            {isSelected && (
                              <span className="mt-1 text-[10px] font-bold text-blue-700">
                                ● Active Social Image
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-slate-500 text-xs">
                      No photos uploaded in the gallery yet. Go to Facility Gallery tab to add photos.
                    </div>
                  )}
                </div>

                {/* Direct Image URL & Alt Input */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Active Image URL / Data Path *
                    </label>
                    <input
                      type="text"
                      required
                      value={ogImage}
                      onChange={(e) => setOgImage(e.target.value)}
                      placeholder="/assets/tnoc_facility_day.jpg or full https:// URL"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Recommended aspect ratio: 1.91:1 (1200 × 630 pixels) for crisp display when shared on WhatsApp, Telegram, Facebook, and Twitter.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Social Image Alt Description
                    </label>
                    <input
                      type="text"
                      value={ogImageAlt}
                      onChange={(e) => setOgImageAlt(e.target.value)}
                      placeholder="TNOC Medical Diagnostic Facility exterior in Msamvu, Morogoro"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Social Title & Description (optional overrides) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Social Card Title (og:title)
                  </label>
                  <input
                    type="text"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                    placeholder="Leave empty to use Meta Title"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Twitter Card Format
                  </label>
                  <select
                    value={twitterCard}
                    onChange={(e) => setTwitterCard(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                  >
                    <option value="summary_large_image">Large Banner (summary_large_image) - Recommended</option>
                    <option value="summary">Small Thumbnail (summary)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Social Card Description (og:description)
                </label>
                <textarea
                  rows={2}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Leave empty to use Meta Description"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Section 3: Indexing & Canonical URLs */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Globe className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  3. Indexing & Canonical Directives
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Search Engine Robots Directive
                  </label>
                  <select
                    value={robots}
                    onChange={(e) => setRobots(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                  >
                    <option value="index, follow">Index & Follow (Normal - Recommended)</option>
                    <option value="noindex, follow">No-Index, Follow Links</option>
                    <option value="noindex, nofollow">No-Index, No-Follow (Private / Staging)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Canonical Website URL
                  </label>
                  <input
                    type="url"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://tnocdiagnostics.co.tz"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Info className="w-4 h-4 text-blue-600" />
                <span>Saving updates live metadata across all pages.</span>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save SEO Configuration</span>
              </button>
            </div>
          </div>

          {/* Real-Time Live Previews (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Search Engine Result (SERP) Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Google Search Result (SERP)
                  </h4>
                </div>

                {/* Device switch */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                      previewDevice === 'desktop' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Desktop snippet preview"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                      previewDevice === 'mobile' ? 'bg-white shadow-2xs text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Mobile snippet preview"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SERP mock box */}
              <div
                className={`p-4 rounded-xl border border-slate-200/80 bg-white ${
                  previewDevice === 'mobile' ? 'max-w-sm mx-auto' : ''
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-slate-700 mb-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                    T
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] font-medium text-slate-900">TNOC Diagnostics</span>
                    <span className="text-[10px] text-slate-500 truncate">
                      {canonicalUrl || 'https://tnocdiagnostics.co.tz'}
                    </span>
                  </div>
                </div>

                {/* Blue link title */}
                <h5 className="text-blue-800 hover:underline font-semibold text-base sm:text-lg leading-snug cursor-pointer line-clamp-2 mt-1">
                  {metaTitle || siteTitle || 'TNOC Medical Diagnostic Facility | Maabara ya Msamvu'}
                </h5>

                {/* Snippet text */}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mt-1.5">
                  {metaDescription ||
                    'Reliable medical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro, Tanzania.'}
                </p>
              </div>

              <p className="text-[11px] text-slate-400">
                Preview reflects live Google search desktop and smartphone rendering.
              </p>
            </div>

            {/* Live Social Sharing Card (WhatsApp, Facebook, Twitter) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Social Card Preview (WhatsApp / FB)
                  </h4>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {twitterCard === 'summary_large_image' ? '1200×630 Large Banner' : 'Compact Card'}
                </span>
              </div>

              {/* Social share card mock */}
              <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-slate-50 max-w-sm mx-auto">
                {/* Image Banner */}
                <div className="w-full aspect-[1.91/1] bg-slate-200 relative overflow-hidden">
                  <img
                    src={ogImage || '/assets/tnoc_facility_day.jpg'}
                    alt={ogImageAlt || 'TNOC Diagnostics'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/logo.png';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white uppercase tracking-wider">
                    {canonicalUrl ? new URL(canonicalUrl).hostname : 'tnocdiagnostics.co.tz'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3.5 bg-white border-t border-slate-100 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    TNOCDIAGNOSTICS.CO.TZ
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {ogTitle || metaTitle || siteTitle}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {ogDescription || metaDescription}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                This rich link unfurls automatically when patients and doctors share links on WhatsApp or post on social networks.
              </p>
            </div>

            {/* Quick SEO Checklist & Advice */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Clinical SEO Best Practices
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Include Morogoro & Msamvu:</strong> Local search queries heavily favor explicit district and junction mentions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Highlight Core Capabilities:</strong> Mention ultrasound sonography and automated laboratory tests in your meta description.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verified Facility Photos:</strong> Authentic signage and diagnostic machinery build verified clinical credibility over stock graphics.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>

      {/* Reset SEO Defaults Confirmation Modal */}
      {confirmResetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 text-center mb-1">
                Reset SEO & Metadata to Defaults?
              </h3>
              <p className="text-xs text-slate-500 text-center mb-6">
                This will reset all meta titles, descriptions, Morogoro local search keywords, and Open Graph configurations back to the verified facility defaults.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeReset}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Metadata</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
