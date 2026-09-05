import React from 'react';
import {
  X,
  Clock,
  Droplet,
  Info,
  CalendarCheck,
  ShieldAlert,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { LabTest } from '../types';

interface TestDetailModalProps {
  test: LabTest | null;
  onClose: () => void;
  onSelectForInquiry?: (test: LabTest) => void;
}

export const TestDetailModal: React.FC<TestDetailModalProps> = ({
  test,
  onClose,
  onSelectForInquiry,
}) => {
  if (!test) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="test-modal-title"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-blue-950 text-white border-b-2 border-red-600 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {test.code && (
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-600/20 text-red-300 border border-red-500/40">
                  {test.code}
                </span>
              )}
              <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">
                {test.category}
              </span>
            </div>
            <h3 id="test-modal-title" className="text-lg sm:text-xl font-bold font-display text-white">
              {test.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm text-slate-700">
          {/* Fast Snapshot Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-red-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Sample Type</span>
                <strong className="text-slate-900">{test.sampleType}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-700 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Turnaround Time</span>
                <strong className="text-slate-900">{test.turnaroundTime}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CalendarCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Availability</span>
                <strong className="text-slate-900">{test.availability}</strong>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-700" />
              <span>What this test is</span>
            </h4>
            <p className="text-slate-800 leading-relaxed bg-white border border-slate-200 p-3 rounded-lg">
              {test.description}
            </p>
          </div>

          {/* What it evaluates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Parameters & Biomarkers Evaluated
            </h4>
            <p className="text-slate-900 leading-relaxed bg-blue-50/60 border border-blue-200 p-3 rounded-lg font-medium text-xs sm:text-sm">
              {test.evaluates}
            </p>
          </div>

          {/* Common Clinical Reasons */}
          {test.clinicalReasons && test.clinicalReasons.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Common Clinical Indications
              </h4>
              <ul className="space-y-1.5">
                {test.clinicalReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Preparation Instructions */}
          {test.preparation && (
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-semibold block text-amber-950">
                    Patient Preparation Guidance:
                  </strong>
                  <span className="text-amber-800">{test.preparation}</span>
                </div>
              </div>
            </div>
          )}

          {/* Clinical Educational Disclaimer */}
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] sm:text-xs text-slate-600 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <p>
              <strong>Educational Notice:</strong> Diagnostic tests are ordered and interpreted in the context of a complete medical evaluation. A single laboratory finding does not constitute a definitive medical diagnosis without clinical correlation by a qualified physician.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `${test.name} - TNOC Diagnostics`,
                    text: `Information about ${test.name} at TNOC Medical Diagnostic Facility, Msamvu, Morogoro.`,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => {
                if (onSelectForInquiry) {
                  onSelectForInquiry(test);
                }
                onClose();
              }}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-md shadow-red-600/20"
            >
              Inquire About This Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
