import React, { useState } from 'react';
import {
  Save,
  Key,
  Shield,
  Download,
  RotateCcw,
  Globe,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminSettingsTab: React.FC = () => {
  const {
    seo,
    updateSeo,
    resetSeo,
    changeAdminPin,
    activityLogs,
    resetAllToDefaults,
    showToast,
    tests,
    services,
    gallery,
    about,
    businessConfig,
    openingHours,
    faqs,
  } = useCms();

  // SEO Form
  const [metaTitle, setMetaTitle] = useState(seo.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(seo.metaDescription || '');
  const [keywords, setKeywords] = useState(seo.keywords || '');
  const [ogImage, setOgImage] = useState(seo.ogImage || '');

  // Password / PIN form
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSuccess, setPinSuccess] = useState(false);

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeo({
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      keywords: keywords.trim(),
      ogImage: ogImage.trim(),
    });
    showToast('SEO metadata updated successfully.');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    setPinSuccess(false);

    if (newPin.length < 4) {
      setPinError('New PIN or password must be at least 4 characters.');
      return;
    }

    if (newPin !== confirmPin) {
      setPinError('New PIN and confirmation PIN do not match.');
      return;
    }

    const success = changeAdminPin(currentPin, newPin);
    if (success) {
      setPinSuccess(true);
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      showToast('Admin access PIN changed successfully.');
      setTimeout(() => setPinSuccess(false), 4000);
    } else {
      setPinError('Current PIN is incorrect. Please verify and try again.');
    }
  };

  // Full backup JSON export
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      facility: 'TNOC Medical Diagnostics (Maabara ya Msamvu)',
      tests,
      services,
      gallery,
      about,
      businessConfig,
      openingHours,
      faqs,
      seo,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnoc-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CMS backup file generated and downloaded.');
  };

  const handleFactoryReset = () => {
    const confirmed = window.prompt(
      'WARNING: This will reset ALL CMS content (tests, services, gallery, hours, SEO) to the verified clinical facility defaults.\nType "RESET" to confirm:'
    );
    if (confirmed === 'RESET') {
      resetAllToDefaults();
      showToast('All facility data restored to verified initial state.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. SEO & Metadata */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              SEO & Social Sharing Metadata
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset SEO settings to defaults?')) resetSeo();
            }}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            Reset SEO
          </button>
        </div>

        <form onSubmit={handleSaveSeo} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Page Meta Title *
            </label>
            <input
              type="text"
              required
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Recommended format: Brand Name – Subtitle | City, Country
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Meta Description *
            </label>
            <textarea
              rows={3}
              required
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Search Keywords
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="medical laboratory, msamvu, morogoro, ultrasound..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Open Graph / Social Sharing Image
              </label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="/assets/tnoc_facility_day.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-xs font-mono focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save SEO Settings</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Admin Security & PIN Management */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Lock className="w-5 h-5 text-red-600" />
          <h3 className="text-base font-bold text-slate-900">
            Admin Security & Password / PIN
          </h3>
        </div>

        <p className="text-xs text-slate-500">
          Update the confidential administrator PIN or password used to authenticate into this CMS console.
        </p>

        {pinError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
            {pinError}
          </div>
        )}

        {pinSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Administrator PIN successfully updated.</span>
          </div>
        )}

        <form onSubmit={handleChangePin} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Current PIN / Password *
            </label>
            <input
              type="password"
              required
              value={currentPin}
              onChange={(e) => setCurrentPin(e.target.value)}
              placeholder="Enter current PIN"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              New PIN / Password *
            </label>
            <input
              type="password"
              required
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              placeholder="At least 4 characters"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Confirm New PIN *
            </label>
            <input
              type="password"
              required
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="Repeat new PIN"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Key className="w-3.5 h-3.5" />
            <span>Update Admin PIN</span>
          </button>
        </form>
      </div>

      {/* 3. System Data Backup & Factory Reset */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Download className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-bold text-slate-900">
            Data Backup & System Maintenance
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">
              Export Complete CMS Backup
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Download a JSON file containing all laboratory tests, diagnostic services, photo links, opening hours schedule, and patient FAQs.
            </p>
            <button
              type="button"
              onClick={handleExportBackup}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON Backup</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Restore Factory Defaults</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Revert all modifications made across the CMS and restore original verified clinical facility defaults for Msamvu, Morogoro.
            </p>
            <button
              type="button"
              onClick={handleFactoryReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Data to Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Activity Logs & Security Audit Trail */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Administrative Audit & Security Logs
              </h3>
              <p className="text-xs text-slate-500">
                Timestamped audit log of all administrative actions, logins, and content updates
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {activityLogs.length} Events Logged
          </span>
        </div>

        {activityLogs.length === 0 ? (
          <p className="text-xs text-slate-500 italic py-4">No activity logged yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Date & Time</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Target Item</th>
                  <th className="py-2.5 px-3">Administrator</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activityLogs.slice(0, 25).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-slate-500 font-mono whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900 whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium">
                      {log.affectedItem}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-mono">
                      {log.adminUser}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 max-w-xs truncate">
                      {log.details || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
