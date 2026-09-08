import React, { useState } from 'react';
import {
  ClipboardList,
  Clock,
  HelpCircle,
  ChevronDown,
  Droplet,
  Coffee,
  AlertCircle,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const PatientInfoPage: React.FC = () => {
  const { patientInfo, faqs, businessConfig } = useCms();

  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');

  const publishedFaqs = faqs.filter((f) => f.isPublished !== false);
  const faqCategories = [
    'all',
    ...Array.from(new Set(publishedFaqs.map((f) => f.category))).filter(Boolean),
  ];

  const filteredFaqs =
    selectedFaqCategory === 'all'
      ? publishedFaqs
      : publishedFaqs.filter((f) => f.category === selectedFaqCategory);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ClipboardList className="w-3.5 h-3.5 text-blue-700" />
            <span>Patient Care & Instructions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Patient Information & Preparation
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Essential guidelines for sample collection preparation, diagnostic ultrasound requirements, reporting turnaround times, and frequently asked questions.
          </p>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="#preparation"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Test Preparation ↓
            </a>
            <a
              href="#turnaround"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Turnaround Times ↓
            </a>
            <a
              href="#faqs"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Frequently Asked Questions ↓
            </a>
          </div>
        </div>

        {/* Section 1: Test Preparation (#preparation) */}
        <section id="preparation" className="mb-20 scroll-mt-24">
          <div className="max-w-2xl mb-8">
            <span className="text-blue-700 text-xs font-bold uppercase tracking-wider block mb-2">
              Clinical Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Test Preparation Guidelines
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Proper pre-test preparation ensures high diagnostic accuracy and prevents the need for repeated specimen collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patientInfo.preparationGuidelines.map((guide) => (
              <div
                key={guide.id}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 mb-3">
                    {guide.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    {guide.title}
                  </h3>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                    {guide.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/70 text-xs text-slate-500">
                  <span>Questions about instructions? Contact our laboratory technician before coming in.</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Turnaround Times (#turnaround) */}
        <section id="turnaround" className="mb-20 scroll-mt-24">
          <div className="max-w-2xl mb-8">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider block mb-2">
              Service Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Reporting Turnaround Times
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              We understand that timely medical reports are critical for early treatment decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {patientInfo.turnaroundStandards.map((tat) => (
              <div
                key={tat.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {tat.category}
                  </h3>
                  <div className="text-xl font-extrabold text-blue-900 my-2">
                    {tat.timeframe}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {tat.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: FAQs (#faqs) */}
        <section id="faqs" className="scroll-mt-24">
          <div className="max-w-2xl mb-8">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-wider block mb-2">
              Help Center
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Common patient inquiries regarding our tests, appointments, results delivery, and location.
            </p>
          </div>

          {/* Category filter */}
          {faqCategories.length > 2 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFaqCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                    selectedFaqCategory === cat
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* FAQ Accordion List */}
          <div className="space-y-3 max-w-4xl">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-700 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Inquiries Callout */}
          <div className="mt-12 p-6 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                Have a question not covered here?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Our customer desk is available to assist you with specific instructions and clinical guidance.
              </p>
            </div>

            <Link
              to="/contact"
              className="shrink-0 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
