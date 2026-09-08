import React, { useState } from 'react';
import { Save, RotateCcw, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminHomepageTab: React.FC = () => {
  const { homepage, updateHomepage, resetHomepage, gallery, showToast } = useCms();

  const [heroTitle, setHeroTitle] = useState(homepage.heroTitle || 'TNOC MEDICAL DIAGNOSTICS');
  const [heroSubtitle, setHeroSubtitle] = useState(
    homepage.heroSubtitle || 'Reliable Medical Diagnostics You Can Trust'
  );
  const [heroDescription, setHeroDescription] = useState(
    homepage.heroDescription ||
      'Professional clinical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro.'
  );
  const [heroImage, setHeroImage] = useState(
    homepage.heroImage || '/assets/tnoc_facility_day.jpg'
  );
  const [primaryCtaText, setPrimaryCtaText] = useState(homepage.primaryCtaText || 'View Tests & Prices');
  const [secondaryCtaText, setSecondaryCtaText] = useState(
    homepage.secondaryCtaText || 'Find Us on Google Maps'
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepage({
      heroTitle: heroTitle.trim(),
      heroSubtitle: heroSubtitle.trim(),
      heroDescription: heroDescription.trim(),
      heroImage: heroImage.trim(),
      primaryCtaText: primaryCtaText.trim(),
      secondaryCtaText: secondaryCtaText.trim(),
    });
    showToast('Homepage hero content updated successfully.');
  };

  const handleReset = () => {
    if (window.confirm('Reset homepage content to default verified text?')) {
      resetHomepage();
      setHeroTitle('TNOC MEDICAL DIAGNOSTICS');
      setHeroSubtitle('Reliable Medical Diagnostics You Can Trust');
      setHeroDescription(
        'Professional clinical laboratory investigations and diagnostic ultrasound services in Msamvu, Morogoro.'
      );
      setHeroImage('/assets/tnoc_facility_day.jpg');
      setPrimaryCtaText('View Tests & Prices');
      setSecondaryCtaText('Find Us on Google Maps');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Homepage Content & Hero Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Edit the public headline, clinical tagline, facility hero photo, and call-to-action buttons
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        {/* Hero Headline & Subtitle */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Hero Header Text</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Facility Header Title *
              </label>
              <input
                type="text"
                required
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Hero Tagline *
              </label>
              <input
                type="text"
                required
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Supporting Facility Description *
            </label>
            <textarea
              rows={3}
              required
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Hero Photograph Selection */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-purple-600" />
            <span>Facility Hero Image</span>
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Image URL or Asset Path *
            </label>
            <input
              type="text"
              required
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          {/* Quick picker from gallery photos */}
          <div>
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              Select from Facility Gallery:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gallery.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setHeroImage(photo.imageSrc)}
                  className={`rounded-xl overflow-hidden border-2 p-1 cursor-pointer transition-all ${
                    heroImage === photo.imageSrc
                      ? 'border-blue-600 shadow-sm ring-2 ring-blue-100'
                      : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={photo.imageSrc}
                    alt={photo.title}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <div className="text-[11px] font-semibold text-slate-800 truncate mt-1">
                    {photo.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Buttons */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Action Buttons
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Primary Button Label
              </label>
              <input
                type="text"
                value={primaryCtaText}
                onChange={(e) => setPrimaryCtaText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Secondary Button Label
              </label>
              <input
                type="text"
                value={secondaryCtaText}
                onChange={(e) => setSecondaryCtaText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
