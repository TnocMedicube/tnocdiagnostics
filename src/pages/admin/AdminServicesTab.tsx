import React, { useState } from 'react';
import { Plus, Edit2, Trash2, RotateCcw, Activity, Check, X, Clock } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { ImagingService } from '../../types';
import { AdminServiceModal } from './AdminServiceModal';

export const AdminServicesTab: React.FC = () => {
  const {
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceActive,
    resetServices,
  } = useCms();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ImagingService | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<ImagingService | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (svc: ImagingService) => {
    setEditingService(svc);
    setModalOpen(true);
  };

  const handleSave = (serviceData: any) => {
    if (editingService) {
      updateService(editingService.id, serviceData);
    } else {
      addService(serviceData);
    }
  };

  const confirmDeleteService = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete.id);
      setServiceToDelete(null);
    }
  };

  const confirmResetServices = () => {
    resetServices();
    setConfirmResetOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Diagnostic Services Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Add, update, or toggle diagnostic ultrasound and clinical pathology modalities
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className={`bg-white rounded-2xl p-6 border transition-all ${
              svc.isActive !== false
                ? 'border-slate-200 shadow-2xs'
                : 'border-slate-200 bg-slate-50/70 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
                  {svc.modality}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {svc.name}
                </h3>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => toggleServiceActive(svc.id)}
                  title={svc.isActive ? 'Deactivate' : 'Activate'}
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    svc.isActive !== false
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {svc.isActive !== false ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
              {svc.description}
            </p>

            <div className="space-y-1.5 text-xs text-slate-500 mb-4">
              <div className="flex items-center justify-between">
                <span>Estimated Fee:</span>
                <strong className="text-slate-900">{svc.price || 'Contact for Price'}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Duration:</span>
                <span>{svc.typicalDuration || '15-30 Mins'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(svc)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => setServiceToDelete(svc)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-semibold transition-colors"
                aria-label={`Delete ${svc.name}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Service Confirmation Modal */}
      {serviceToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 text-center mb-1">
                Delete Diagnostic Service?
              </h3>
              <p className="text-xs text-slate-500 text-center mb-4">
                Are you sure you want to remove this diagnostic imaging service from the public website?
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-6 space-y-1 text-xs">
                <div className="font-bold text-slate-900">{serviceToDelete.name}</div>
                <div className="text-slate-500 line-clamp-2">{serviceToDelete.shortDescription}</div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setServiceToDelete(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteService}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Yes, Delete Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Services Confirmation Modal */}
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
                Reset Diagnostic Services?
              </h3>
              <p className="text-xs text-slate-500 text-center mb-6">
                This will restore the diagnostic imaging services catalog to standard verified clinical modalities.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmResetServices}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Yes, Restore Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <AdminServiceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialService={editingService}
      />
    </div>
  );
};
