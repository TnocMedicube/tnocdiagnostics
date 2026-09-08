import React from 'react';
import {
  FileSpreadsheet,
  Activity,
  Image as ImageIcon,
  Video,
  Clock,
  HelpCircle,
  ShieldCheck,
  Plus,
  ArrowRight,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { Link } from '../../router/RouterContext';

interface AdminOverviewTabProps {
  onNavigateTab: (tab: string) => void;
  onOpenAddTest: () => void;
  onOpenAddService: () => void;
  onOpenAddPhoto: () => void;
  onOpenAddVideo: () => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  onNavigateTab,
  onOpenAddTest,
  onOpenAddService,
  onOpenAddPhoto,
  onOpenAddVideo,
}) => {
  const { tests, services, gallery, videos, openingHours, faqs, activityLogs, businessConfig } = useCms();

  const activeTestsCount = tests.filter((t) => t.isActive).length;
  const activeServicesCount = services.filter((s) => s.isActive).length;
  const activePhotosCount = gallery.filter((p) => p.isActive).length;
  const publishedVideosCount = videos.filter((v) => v.isPublished !== false).length;
  const publishedFaqsCount = faqs.filter((f) => f.isPublished).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>TNOC Medical Diagnostics CMS Console</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Facility Content Management System
            </h1>
            <p className="text-blue-200 text-sm mt-1 max-w-2xl">
              Manage clinical tests, TZS pricing, diagnostic ultrasound services, photo & video gallery, opening hours, patient guidance, and SEO metadata.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors"
            >
              <span>Preview Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1: Tests */}
        <div
          onClick={() => onNavigateTab('tests')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Lab Tests
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {activeTestsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>{tests.length} total tests</span>
            <span className="text-blue-700 font-semibold">Manage →</span>
          </div>
        </div>

        {/* Metric 2: Services */}
        <div
          onClick={() => onNavigateTab('services')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-red-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Services
            </span>
            <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {activeServicesCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Ultrasound & Clinic</span>
            <span className="text-red-600 font-semibold">Manage →</span>
          </div>
        </div>

        {/* Metric 3: Gallery */}
        <div
          onClick={() => onNavigateTab('gallery')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Photos
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {activePhotosCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Facility views</span>
            <span className="text-purple-700 font-semibold">Manage →</span>
          </div>
        </div>

        {/* Metric 4: Videos */}
        <div
          onClick={() => onNavigateTab('videos')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-rose-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Videos
            </span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Video className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {publishedVideosCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Clinical tours</span>
            <span className="text-rose-600 font-semibold">Manage →</span>
          </div>
        </div>

        {/* Metric 5: FAQs */}
        <div
          onClick={() => onNavigateTab('patient-info')}
          className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              FAQs
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {publishedFaqsCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>Patient guides</span>
            <span className="text-amber-700 font-semibold">Manage →</span>
          </div>
        </div>
      </div>

      {/* Quick Actions & Facility Snapshot Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Fast Content Tasks */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">
              Quick Content Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onOpenAddTest}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-800">
                    Add Lab Test
                  </div>
                  <div className="text-[11px] text-slate-500">Add test with TZS pricing</div>
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenAddService}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-red-50/50 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-red-700">
                    Add Diagnostic Service
                  </div>
                  <div className="text-[11px] text-slate-500">Ultrasound & modalities</div>
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenAddPhoto}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-purple-800">
                    Upload Photograph
                  </div>
                  <div className="text-[11px] text-slate-500">Add clinic photo</div>
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenAddVideo}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-rose-400 hover:bg-rose-50/50 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-rose-700">
                    Add Video Tour
                  </div>
                  <div className="text-[11px] text-slate-500">YouTube or MP4 tour</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('contact-hours')}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">
                    Update Hours
                  </div>
                  <div className="text-[11px] text-slate-500">Operating schedule</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('seo')}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-left group sm:col-span-2"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-800">
                    SEO & Social Sharing
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Meta tags, Google search previews, and Open Graph cards
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Facility Location Details Snapshot */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Facility & Contact Snapshot
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab('contact-hours')}
                className="text-xs font-bold text-blue-700 hover:underline"
              >
                Edit Details →
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Display Name:</span>
                <span>{businessConfig.displayName}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Address:</span>
                <span>{businessConfig.address}, {businessConfig.city}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Director:</span>
                <span className="font-bold text-slate-900">Dr. Monasser (Director of TNOC Diagnostics)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Director Contact:</span>
                <span className="font-mono text-blue-700 font-bold">0741 405 988 (Call & WhatsApp)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Director Emails:</span>
                <span className="text-slate-800">drmonasser04@gmail.com | tnocmedicube@gmail.com</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-semibold text-slate-700">GPS Coordinates:</span>
                <span className="font-mono">{businessConfig.latitude}, {businessConfig.longitude}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Audit Log */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">
                  Recent CMS Audit Log
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigateTab('settings')}
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  View All ({activityLogs.length}) →
                </button>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {activityLogs.slice(0, 6).map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{log.action}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {new Date(log.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="text-slate-600 mt-0.5">{log.affectedItem}</div>
                    {log.details && (
                      <div className="text-[11px] text-slate-500 mt-1 italic">
                        {log.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Local storage storage state active</span>
              </span>
              <span>Audited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
