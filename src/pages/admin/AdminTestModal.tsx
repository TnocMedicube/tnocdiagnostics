import React, { useState, useEffect } from 'react';
import { X, Save, Plus, AlertCircle } from 'lucide-react';
import { LabTest } from '../../types';

interface AdminTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (testData: any) => void;
  initialTest?: LabTest | null;
}

export const AdminTestModal: React.FC<AdminTestModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialTest,
}) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Hematology');
  const [price, setPrice] = useState('TZS 15,000');
  const [sampleType, setSampleType] = useState('Whole Blood (EDTA)');
  const [turnaroundTime, setTurnaroundTime] = useState('30 – 60 Minutes');
  const [evaluates, setEvaluates] = useState('');
  const [preparation, setPreparation] = useState('');
  const [isCommon, setIsCommon] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialTest) {
      setName(initialTest.name || '');
      setCode(initialTest.code || '');
      setCategory(initialTest.category || 'Hematology');
      setPrice(initialTest.price || 'TZS 15,000');
      setSampleType(initialTest.sampleType || 'Whole Blood (EDTA)');
      setTurnaroundTime(initialTest.turnaroundTime || '30 – 60 Minutes');
      setEvaluates(initialTest.evaluates || initialTest.description || '');
      setPreparation(initialTest.preparation || '');
      setIsCommon(Boolean(initialTest.isCommon));
      setIsActive(initialTest.isActive !== false);
    } else {
      setName('');
      setCode('');
      setCategory('Hematology');
      setPrice('TZS 15,000');
      setSampleType('Whole Blood (EDTA)');
      setTurnaroundTime('30 – 60 Minutes');
      setEvaluates('');
      setPreparation('');
      setIsCommon(false);
      setIsActive(true);
    }
  }, [initialTest, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: name.trim(),
      code: code.trim(),
      category: category.trim(),
      price: price.trim(),
      sampleType: sampleType.trim(),
      turnaroundTime: turnaroundTime.trim(),
      evaluates: evaluates.trim(),
      description: evaluates.trim(),
      preparation: preparation.trim(),
      isCommon,
      isActive,
      department: 'Clinical Pathology',
      methodology: 'Automated Analyzer',
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
              {initialTest ? 'Edit Laboratory Test' : 'Add New Laboratory Test'}
            </h3>
            <p className="text-xs text-slate-400">
              Manage test details, pricing in TZS, sample requirements, and turnaround time
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Test Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Full Blood Picture (CBC / FBP)"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Test Code (Optional)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CBC-01"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="Hematology">Hematology</option>
                <option value="Clinical Biochemistry">Clinical Biochemistry</option>
                <option value="Medical Parasitology">Medical Parasitology</option>
                <option value="Urinalysis">Urinalysis</option>
                <option value="Microbiology">Microbiology</option>
                <option value="Serology & Immunology">Serology & Immunology</option>
                <option value="Endocrinology & Hormones">Endocrinology & Hormones</option>
                <option value="Tumor Markers">Tumor Markers</option>
                <option value="General Diagnostics">General Diagnostics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Price (TZS) *
              </label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. TZS 15,000"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Sample Type *
              </label>
              <input
                type="text"
                required
                value={sampleType}
                onChange={(e) => setSampleType(e.target.value)}
                placeholder="e.g. Whole Blood, Serum, Urine"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Turnaround Time *
              </label>
              <input
                type="text"
                required
                value={turnaroundTime}
                onChange={(e) => setTurnaroundTime(e.target.value)}
                placeholder="e.g. 30 – 60 Minutes"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Clinical Significance / What It Evaluates *
            </label>
            <textarea
              rows={3}
              required
              value={evaluates}
              onChange={(e) => setEvaluates(e.target.value)}
              placeholder="e.g. Evaluates red blood cells, white blood cells, platelets, and hemoglobin..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Patient Preparation Instructions (Optional)
            </label>
            <input
              type="text"
              value={preparation}
              onChange={(e) => setPreparation(e.target.value)}
              placeholder="e.g. 8-12 hours fasting required. Drink plenty of water."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">Active (Visible on Website)</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isCommon}
                onChange={(e) => setIsCommon(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">Featured Test</span>
            </label>
          </div>

          {/* Footer Buttons */}
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
              <span>{initialTest ? 'Save Changes' : 'Create Test'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
