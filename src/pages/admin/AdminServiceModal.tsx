import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { ImagingService } from '../../types';

interface AdminServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (serviceData: any) => void;
  initialService?: ImagingService | null;
}

export const AdminServiceModal: React.FC<AdminServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialService,
}) => {
  const [name, setName] = useState('');
  const [modality, setModality] = useState('Diagnostic Ultrasound');
  const [price, setPrice] = useState('TZS 30,000 - 45,000');
  const [typicalDuration, setTypicalDuration] = useState('15 – 25 Minutes');
  const [status, setStatus] = useState('Available Daily');
  const [description, setDescription] = useState('');
  const [patientPreparation, setPatientPreparation] = useState('');
  const [indicationsText, setIndicationsText] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialService) {
      setName(initialService.name || '');
      setModality(initialService.modality || 'Diagnostic Ultrasound');
      setPrice(initialService.price || 'TZS 30,000 - 45,000');
      setTypicalDuration(initialService.typicalDuration || '15 – 25 Minutes');
      setStatus(initialService.status || 'Available Daily');
      setDescription(initialService.description || '');
      setPatientPreparation(initialService.patientPreparation || '');
      setIndicationsText(
        Array.isArray(initialService.commonIndications)
          ? initialService.commonIndications.join('\n')
          : ''
      );
      setIsActive(initialService.isActive !== false);
    } else {
      setName('');
      setModality('Diagnostic Ultrasound');
      setPrice('TZS 30,000 - 45,000');
      setTypicalDuration('15 – 25 Minutes');
      setStatus('Available Daily');
      setDescription('');
      setPatientPreparation('');
      setIndicationsText('');
      setIsActive(true);
    }
  }, [initialService, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const indications = indicationsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      name: name.trim(),
      modality: modality.trim(),
      price: price.trim(),
      typicalDuration: typicalDuration.trim(),
      status: status.trim(),
      description: description.trim(),
      patientPreparation: patientPreparation.trim(),
      commonIndications: indications,
      isActive,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {initialService ? 'Edit Diagnostic Service' : 'Add Diagnostic Service'}
            </h3>
            <p className="text-xs text-slate-400">
              Configure modality, clinical indications, preparation guidelines, and fee
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Service Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Abdominal & Pelvic Ultrasound"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Modality / Category *
              </label>
              <input
                type="text"
                required
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                placeholder="e.g. Diagnostic Ultrasound"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Fee / Price Range (TZS) *
              </label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. TZS 30,000 - 40,000"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Typical Duration
              </label>
              <input
                type="text"
                value={typicalDuration}
                onChange={(e) => setTypicalDuration(e.target.value)}
                placeholder="e.g. 15 – 25 Minutes"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Availability Status
              </label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="e.g. Available Daily"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-resolution ultrasound imaging of abdominal and pelvic organs..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Patient Preparation Instructions
            </label>
            <input
              type="text"
              value={patientPreparation}
              onChange={(e) => setPatientPreparation(e.target.value)}
              placeholder="e.g. Full urinary bladder required; drink 3-4 glasses of water 1 hour prior."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Clinical Indications (One per line)
            </label>
            <textarea
              rows={3}
              value={indicationsText}
              onChange={(e) => setIndicationsText(e.target.value)}
              placeholder="Persistent abdominal or pelvic pain&#10;Kidney stones or urinary tract evaluations&#10;Liver and gallbladder assessments"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">Active (Visible on Website)</span>
            </label>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{initialService ? 'Save Service' : 'Add Service'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
