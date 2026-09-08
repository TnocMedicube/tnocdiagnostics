import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  UserCheck,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const ContactPage: React.FC = () => {
  const { businessConfig, openingHours, showToast } = useCms();

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Laboratory Test');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const directorPhone = businessConfig.directorPhone || '0741 405 988';
  const directorPhoneRaw = businessConfig.directorPhoneRaw || '+255741405988';
  const directorWhatsapp = businessConfig.directorWhatsapp || '0741 405 988';
  const directorWhatsappRaw = businessConfig.directorWhatsappRaw || '255741405988';
  const directorEmail = businessConfig.directorEmail || 'drmonasser04@gmail.com';
  const secondaryEmail = businessConfig.secondaryEmail || 'tnocmedicube@gmail.com';
  const hasPhone = Boolean(businessConfig.phoneRaw || businessConfig.phone || directorPhoneRaw);
  const hasWhatsApp = Boolean(businessConfig.whatsappRaw || businessConfig.whatsapp || directorWhatsappRaw);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied ${text} to clipboard.`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetWhatsapp = directorWhatsappRaw || businessConfig.whatsappRaw || '255741405988';
    const text = `Hello TNOC Medical Diagnostics (Maabara ya Msamvu),\n\nPatient Name: ${patientName}\nPhone: ${patientPhone}\nInquiry Type: ${inquiryType}\nMessage: ${message || 'I would like to inquire about diagnostic services.'}`;
    window.open(
      `https://wa.me/${targetWhatsapp}?text=${encodeURIComponent(text)}`,
      '_blank'
    );

    setSubmitted(true);
    showToast('Inquiry submitted. Our laboratory desk will attend to you shortly.');
  };

  const handleResetForm = () => {
    setPatientName('');
    setPatientPhone('');
    setInquiryType('Laboratory Test');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5 text-blue-700" />
            <span>Patient Support & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact TNOC Diagnostics
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Reach out for test inquiries, sonography appointments, report collections, or direct clinical consultations at our Msamvu diagnostic facility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Channels & Operating Schedule */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Action Channels */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
                Direct Communication
              </h2>

              <div className="space-y-4">
                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Telephone Inquiries</div>
                    <div className="text-base font-bold text-slate-900">
                      {businessConfig.phone || 'Available on Site'}
                    </div>
                    {hasPhone && (
                      <a
                        href={`tel:${businessConfig.phoneRaw}`}
                        className="text-xs font-bold text-blue-700 hover:text-blue-900 mt-1 inline-block"
                      >
                        Call Now →
                      </a>
                    )}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">WhatsApp Support</div>
                    <div className="text-base font-bold text-slate-900">
                      {businessConfig.whatsapp || 'Available via WhatsApp'}
                    </div>
                    {hasWhatsApp && (
                      <a
                        href={`https://wa.me/${businessConfig.whatsappRaw}?text=${encodeURIComponent('Hello TNOC Diagnostics, I would like to inquire about tests.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-1 inline-block"
                      >
                        Start WhatsApp Chat →
                      </a>
                    )}
                  </div>
                </div>

                {/* Physical Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Diagnostic Facility Location</div>
                    <div className="text-sm font-bold text-slate-900">
                      {businessConfig.address}, {businessConfig.city}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Morogoro, Tanzania
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Operating Hours Schedule
                </h3>
              </div>

              <div className="divide-y divide-slate-200/80 text-xs sm:text-sm">
                {openingHours.map((h) => (
                  <div key={h.day} className="py-2.5 flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{h.day}</span>
                    <span className="text-slate-600">
                      {h.isOpen ? (
                        h.is24Hours ? (
                          <span className="text-emerald-700 font-bold">Open 24 Hours</span>
                        ) : (
                          `${h.openTime} – ${h.closeTime}`
                        )
                      ) : (
                        <span className="text-slate-400">Closed</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Patient Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Send an Inquiry or Appointment Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fill in the details below to request test availability, appointment coordination, or general diagnostic information.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {patientName}. Our team at TNOC Diagnostics has received your inquiry and will connect with you via {patientPhone}.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold hover:bg-blue-800 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="patient-name" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Patient Full Name *
                    </label>
                    <input
                      id="patient-name"
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Juma Rashid"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="patient-phone" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Phone Number (Call or WhatsApp) *
                    </label>
                    <input
                      id="patient-phone"
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="e.g. 0754 XXX XXX or +255..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-type" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Type of Inquiry / Modality
                    </label>
                    <select
                      id="inquiry-type"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm text-slate-900"
                    >
                      <option value="Laboratory Test">Laboratory Test (Blood / Urine / Stool)</option>
                      <option value="Diagnostic Ultrasound">Diagnostic Ultrasound Sonography</option>
                      <option value="Antenatal Wellness">Antenatal / Pregnancy Wellness Scan</option>
                      <option value="Results Inquiry">Test Results Status Inquiry</option>
                      <option value="Pricing & General">Price Inquiry or General Question</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="patient-notes" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                      Message / Specific Test Requested
                    </label>
                    <textarea
                      id="patient-notes"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify requested tests or physician recommendations..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 text-sm text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
                  >
                    <Send className="w-5 h-5" />
                    <span>Submit Diagnostic Inquiry</span>
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Confidentiality notice: All personal and medical data submitted remains strictly protected under professional medical ethics.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
