import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  HelpCircle,
  Clock,
  ClipboardList,
  Check,
  X,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { FaqItem } from '../../types';
import { AdminFaqModal } from './AdminFaqModal';

export const AdminPatientInfoTab: React.FC = () => {
  const {
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    toggleFaqPublished,
    resetFaqs,
    patientInfo,
    resetPatientInfo,
  } = useCms();

  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  const handleOpenAddFaq = () => {
    setEditingFaq(null);
    setFaqModalOpen(true);
  };

  const handleOpenEditFaq = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFaqModalOpen(true);
  };

  const handleSaveFaq = (data: any) => {
    if (editingFaq) {
      updateFaq(editingFaq.id, data);
    } else {
      addFaq(data);
    }
  };

  const handleDeleteFaq = (id: string, q: string) => {
    if (window.confirm(`Delete FAQ: "${q}"?`)) {
      deleteFaq(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section 1: FAQs Management */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Create, revise, categorize, or hide patient questions and clinical guidance
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset FAQs to verified defaults?')) resetFaqs();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset FAQs</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddFaq}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                faq.isPublished === false ? 'opacity-50 bg-slate-50' : ''
              }`}
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800">
                    {faq.category}
                  </span>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                <button
                  type="button"
                  onClick={() => toggleFaqPublished(faq.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    faq.isPublished !== false
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {faq.isPublished !== false ? 'Published' : 'Hidden'}
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenEditFaq(faq)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  title="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteFaq(faq.id, faq.question)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  title="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Preparation Guidelines Snapshot */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Active Patient Preparation Guides
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {patientInfo.preparationGuidelines.length} guidelines active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patientInfo.preparationGuidelines.map((g) => (
            <div key={g.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="font-bold text-slate-900 mb-1">{g.title}</div>
              <div className="text-slate-500 mb-2">Category: {g.category}</div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                {g.instructions.map((inst, i) => (
                  <li key={i} className="truncate">{inst}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Turnaround Standards Snapshot */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              Standard Turnaround Metrics
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {patientInfo.turnaroundStandards.length} benchmarks active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {patientInfo.turnaroundStandards.map((tat) => (
            <div key={tat.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="font-bold text-slate-900">{tat.category}</div>
              <div className="text-base font-extrabold text-blue-900 my-1">{tat.timeframe}</div>
              <div className="text-slate-500">{tat.notes}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AdminFaqModal
        isOpen={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        onSave={handleSaveFaq}
        initialFaq={editingFaq}
      />
    </div>
  );
};
