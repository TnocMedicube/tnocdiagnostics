import React, { useState } from 'react';
import { Save, RotateCcw, Building2, Target, Eye, ShieldCheck } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminAboutTab: React.FC = () => {
  const { about, updateAbout, resetAbout, showToast } = useCms();

  const [aboutTitle, setAboutTitle] = useState(about.aboutTitle || 'About TNOC Medical Diagnostics');
  const [tagline, setTagline] = useState(about.tagline || '');
  const [mission, setMission] = useState(about.mission || '');
  const [vision, setVision] = useState(about.vision || '');
  const [facilityOverview, setFacilityOverview] = useState(about.facilityOverview || '');
  const [valuesText, setValuesText] = useState(
    Array.isArray(about.coreValues) ? about.coreValues.join('\n') : ''
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const values = valuesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    updateAbout({
      aboutTitle: aboutTitle.trim(),
      tagline: tagline.trim(),
      mission: mission.trim(),
      vision: vision.trim(),
      facilityOverview: facilityOverview.trim(),
      coreValues: values,
    });
    showToast('About & facility narrative updated successfully.');
  };

  const handleReset = () => {
    if (window.confirm('Reset About page text to verified defaults?')) {
      resetAbout();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            About & Facility Overview Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Edit facility background, clinical mission, institutional vision, and core clinical ethics
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Page Heading Title *
            </label>
            <input
              type="text"
              required
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tagline *
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Facility Overview & Background Story *
          </label>
          <textarea
            rows={4}
            required
            value={facilityOverview}
            onChange={(e) => setFacilityOverview(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-700" />
              <span>Facility Mission *</span>
            </label>
            <textarea
              rows={4}
              required
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-red-600" />
              <span>Facility Vision *</span>
            </label>
            <textarea
              rows={4}
              required
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Core Clinical Values (One value per line)</span>
          </label>
          <textarea
            rows={5}
            value={valuesText}
            onChange={(e) => setValuesText(e.target.value)}
            placeholder="Clinical Precision & Quality Control&#10;Strict Medical Confidentiality..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save About Content</span>
          </button>
        </div>
      </form>
    </div>
  );
};
