import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  ExternalLink,
  Info,
  Calendar,
} from 'lucide-react';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';
import { LabTest, ImagingService } from '../types';

interface ContactSectionProps {
  preselectedTest?: LabTest | ImagingService | null;
  onClearPreselectedTest?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedTest,
  onClearPreselectedTest,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedTest) {
      setSelectedService(preselectedTest.name);
    }
  }, [preselectedTest]);

  const hasVerifiedPhone = Boolean(TNOC_BUSINESS_CONFIG.phoneRaw);
  const hasVerifiedWhatsApp = Boolean(TNOC_BUSINESS_CONFIG.whatsappRaw);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If WhatsApp is configured, prepare direct WhatsApp inquiry message
    if (hasVerifiedWhatsApp) {
      const text = `Hello TNOC Medical Diagnostic Facility (Maabara ya Msamvu),\n\nPatient Name: ${patientName}\nPhone: ${patientPhone}\nRequested Test / Investigation: ${selectedService}\nNotes: ${patientNotes || 'None'}`;
      window.open(
        `https://wa.me/${TNOC_BUSINESS_CONFIG.whatsappRaw}?text=${encodeURIComponent(text)}`,
        '_blank'
      );
    }

    setSubmitted(true);
  };

  const handleResetForm = () => {
    setPatientName('');
    setPatientPhone('');
    setSelectedService('');
    setPatientNotes('');
    setSubmitted(false);
    if (onClearPreselectedTest) {
      onClearPreselectedTest();
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5 text-red-600" />
            <span>Contact & Inquiries</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight font-display">
            Contact TNOC Diagnostics
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
            Reach out to our laboratory and imaging reception in Msamvu, Morogoro for test availability, patient preparation inquiries, or directions.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. Phone Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-1">
                Telephone Call
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Speak directly with laboratory staff.
              </p>
              <div className="text-xs font-mono text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 break-all mb-4">
                {TNOC_BUSINESS_CONFIG.phone}
              </div>
            </div>

            {hasVerifiedPhone ? (
              <a
                href={`tel:${TNOC_BUSINESS_CONFIG.phoneRaw}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-md shadow-red-600/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed"
                title="Phone number pending official verification"
              >
                <span>Phone Pending Verification</span>
              </button>
            )}
          </div>

          {/* 2. WhatsApp Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-1">
                WhatsApp Messaging
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Quick inquiries and electronic communication.
              </p>
              <div className="text-xs font-mono text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 break-all mb-4">
                {TNOC_BUSINESS_CONFIG.whatsapp}
              </div>
            </div>

            {hasVerifiedWhatsApp ? (
              <a
                href={`https://wa.me/${TNOC_BUSINESS_CONFIG.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed"
                title="WhatsApp pending official verification"
              >
                <span>WhatsApp Pending Verification</span>
              </button>
            )}
          </div>

          {/* 3. Physical Address & Google Maps */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-1">
                Physical Facility
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Located in Msamvu, Morogoro, Tanzania.
              </p>
              <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mb-4">
                <strong>{TNOC_BUSINESS_CONFIG.address}</strong>
                <span className="block text-[11px] text-slate-500 mt-1">
                  Query: {TNOC_BUSINESS_CONFIG.googleMapsQuery}
                </span>
              </div>
            </div>

            <a
              href={TNOC_BUSINESS_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-blue-950 hover:bg-red-600 rounded-xl transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* 4. Operating Schedule */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-1">
                Operating Schedule
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Laboratory and ultrasound hours.
              </p>
              <div className="text-xs text-slate-700 space-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mb-4">
                <div>{TNOC_BUSINESS_CONFIG.openingHours.weekdays}</div>
                <div>{TNOC_BUSINESS_CONFIG.openingHours.saturdays}</div>
                <div>{TNOC_BUSINESS_CONFIG.openingHours.sundays}</div>
              </div>
            </div>

            <a
              href={TNOC_BUSINESS_CONFIG.googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-800" />
              <span>Google Maps Listing</span>
            </a>
          </div>
        </div>

        {/* Patient Inquiry & Test Booking Request Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-blue-950">
              Diagnostic Inquiry & Test Pre-Booking
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Have questions about sample collection instructions, pricing, or turnaround times? Fill in the details below and our Msamvu team will assist you.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-blue-50/80 border border-blue-200 rounded-2xl animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-900" />
              </div>
              <h4 className="text-lg font-bold text-blue-950 font-display mb-1">
                Inquiry Received Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-blue-900 max-w-md mx-auto mb-6 leading-relaxed">
                Thank you, <strong>{patientName}</strong>. Your inquiry regarding{' '}
                <strong>{selectedService || 'diagnostic services'}</strong> has been registered. Our diagnostic desk in Msamvu looks forward to assisting you.
              </p>
              <button
                type="button"
                onClick={handleResetForm}
                className="px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="patientName"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="patientName"
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. John Doe / Maria Juma"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="patientPhone"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Your Phone / WhatsApp Number *
                  </label>
                  <input
                    id="patientPhone"
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="e.g. 07XX XXX XXX / +255..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="selectedService"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Specific Investigation or Service Requested
                </label>
                <input
                  id="selectedService"
                  type="text"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  placeholder="e.g. FBP / Complete Blood Count, Urine Culture, Obstetric Ultrasound..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="patientNotes"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Notes, Questions, or Doctor Referral Details (Optional)
                </label>
                <textarea
                  id="patientNotes"
                  rows={3}
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                  placeholder="Mention any doctor referral notes, requested appointment time, or preparation questions..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/25 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Submit Diagnostic Inquiry</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Your health inquiry and personal details are handled under strict healthcare privacy standards.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
