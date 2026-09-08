import React, { useState } from 'react';
import {
  Radio,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Activity,
  Heart,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Shield,
  Lock,
} from 'lucide-react';
import { ImagingService } from '../types';
import { useAdmin } from '../context/AdminContext';
import { EditServiceModal } from './EditServiceModal';

interface ImagingSectionProps {
  onSelectImagingForInquiry?: (service: ImagingService) => void;
}

export const ImagingSection: React.FC<ImagingSectionProps> = ({
  onSelectImagingForInquiry,
}) => {
  const {
    isAdmin,
    imagingServices,
    deleteImagingService,
    openLoginModal,
    openDashboard,
  } = useAdmin();

  const [selectedService, setSelectedService] = useState<ImagingService | null>(null);
  const [editingImaging, setEditingImaging] = useState<ImagingService | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <section
      id="imaging"
      className="py-16 sm:py-24 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white relative overflow-hidden"
    >
      {/* Sonographic / Acoustic Wave Background Accents */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Distinctive Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-inner">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Dedicated Diagnostic Modality</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-display">
            Imaging & Diagnostic Investigations
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
            Non-invasive ultrasound sonography and physiological diagnostic investigations. Utilizing high-frequency sound waves to provide safe, real-time anatomical visualization without ionizing radiation.
          </p>

          {/* Admin Management Action Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {isAdmin ? (
              <>
                <button
                  type="button"
                  id="admin-add-imaging-service-btn"
                  onClick={() => {
                    setEditingImaging(null);
                    setIsAddModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Imaging Service</span>
                </button>
                <button
                  type="button"
                  onClick={() => openDashboard('imaging')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900/90 hover:bg-blue-800 border border-blue-400/40 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  <span>Open Imaging Manager</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() =>
                  openLoginModal('Log in as administrator to manage or add ultrasound and imaging services.')
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
              >
                <Lock className="w-3 h-3 text-red-400" />
                <span>Admin: Manage Imaging</span>
              </button>
            )}
          </div>
        </div>

        {/* Ultrasound Modalities Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {imagingServices.map((item) => {
            const isSelected = selectedService?.id === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-red-500 shadow-xl shadow-red-950/40 ring-1 ring-red-500/50'
                    : 'bg-slate-800/50 border-white/10 hover:border-red-500/40 hover:bg-slate-800/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-950 border border-blue-400/40 text-blue-200 font-semibold">
                      {item.modality}
                    </span>
                    <div className="flex items-center gap-2">
                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setEditingImaging(item)}
                            title={`Admin: Edit ${item.name}`}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete imaging service "${item.name}"?`)) {
                                deleteImagingService(item.id);
                              }
                            }}
                            title={`Admin: Delete ${item.name}`}
                            className="p-1 rounded bg-white/10 hover:bg-red-600/80 text-slate-300 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                          item.status === 'Available'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                            : 'bg-amber-950 text-amber-300 border border-amber-800/50'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Common Indications */}
                  <div className="mb-4">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-blue-300 block mb-1.5">
                      Common Clinical Reasons:
                    </span>
                    <ul className="space-y-1">
                      {item.commonIndications.map((ind, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Patient Preparation Highlight */}
                  {item.patientPreparation && (
                    <div className="p-3 rounded-xl bg-slate-900/90 border border-blue-900/60 text-xs text-blue-200 mb-4 flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white">Preparation:</strong>
                        <span>{item.patientPreparation}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: ~{item.typicalDuration}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedService(item);
                      if (onSelectImagingForInquiry) {
                        onSelectImagingForInquiry(item);
                      }
                    }}
                    className="inline-flex items-center gap-1 font-bold text-red-400 hover:text-red-300 hover:underline"
                  >
                    <span>Inquire / Book</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Modalities & Equipment Transparency Callout */}
        <div className="p-6 rounded-2xl bg-slate-800/70 border border-white/10 backdrop-blur-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div className="text-left text-xs sm:text-sm">
              <h4 className="font-bold text-white text-base font-display mb-1">
                Imaging Scope & Diagnostic Integrity
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Diagnostic ultrasound scans and 12-lead ECG are performed in our private clinical examination suites. Other advanced modalities (such as Digital X-Ray, CT, or MRI) can be coordinated with partner diagnostic referral networks upon clinical inquiry. We never make unsupported equipment claims.
              </p>
            </div>

            <a
              href="#contact"
              className="mt-2 sm:mt-0 px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs sm:text-sm whitespace-nowrap hover:bg-red-700 shadow-md shadow-red-600/30 transition-colors shrink-0"
            >
              Inquire About Imaging
            </a>
          </div>
        </div>
      </div>

      {/* Admin Add / Edit Imaging Modal */}
      {(isAddModalOpen || editingImaging !== null) && (
        <EditServiceModal
          isOpen={isAddModalOpen || editingImaging !== null}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingImaging(null);
          }}
          type="imaging"
          initialImaging={editingImaging}
        />
      )}
    </section>
  );
};
