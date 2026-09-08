import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { FaqItem } from '../../types';

interface AdminFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (faqData: any) => void;
  initialFaq?: FaqItem | null;
}

export const AdminFaqModal: React.FC<AdminFaqModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialFaq,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('General');
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    if (initialFaq) {
      setQuestion(initialFaq.question || '');
      setAnswer(initialFaq.answer || '');
      setCategory(initialFaq.category || 'General');
      setIsPublished(initialFaq.isPublished !== false);
    } else {
      setQuestion('');
      setAnswer('');
      setCategory('General');
      setIsPublished(true);
    }
  }, [initialFaq, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim(),
      isPublished,
      order: 99,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {initialFaq ? 'Edit FAQ Item' : 'Add FAQ Item'}
            </h3>
            <p className="text-xs text-slate-400">
              Manage patient questions, clinical instructions, and answers
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Question *
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Do I need an appointment for routine blood tests?"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="General">General</option>
              <option value="Preparation">Preparation</option>
              <option value="Results">Results</option>
              <option value="Ultrasound">Ultrasound</option>
              <option value="Location">Location</option>
              <option value="Pricing">Pricing</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Answer *
            </label>
            <textarea
              rows={4}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Clear, compassionate explanation for patients..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">Published (Visible in Patient Info FAQ)</span>
            </label>
          </div>

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
              <span>{initialFaq ? 'Save FAQ' : 'Add FAQ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
