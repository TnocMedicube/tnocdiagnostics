import React from 'react';
import { Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const HomeContactCtaSection: React.FC = () => {
  const { businessConfig } = useCms();

  const hasPhone = Boolean(businessConfig.phoneRaw);
  const hasWhatsApp = Boolean(businessConfig.whatsappRaw);

  return (
    <section className="py-16 sm:py-20 bg-blue-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span>Walk-Ins & Inquiries Welcome</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Ready for Your Diagnostic Investigation?
          </h2>

          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
            Visit our facility in Msamvu, Morogoro for prompt, accurate clinical testing and diagnostic ultrasound sonography. Our staff are dedicated to your comfort and health.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/tests"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-blue-950 bg-white hover:bg-blue-50 rounded-xl shadow-md transition-colors"
            >
              <span>View Tests & Prices</span>
              <ArrowRight className="w-4 h-4 text-blue-900" />
            </Link>

            {hasWhatsApp ? (
              <a
                href={`https://wa.me/${businessConfig.whatsappRaw}?text=${encodeURIComponent('Hello TNOC Diagnostics, I would like to inquire about a test.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            ) : hasPhone ? (
              <a
                href={`tel:${businessConfig.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-xl shadow-md transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call {businessConfig.phone}</span>
              </a>
            ) : (
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-800 hover:bg-blue-700 border border-blue-700 rounded-xl shadow-md transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Contact TNOC Diagnostics</span>
              </Link>
            )}

            <Link
              to="/location"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-blue-200 hover:text-white bg-blue-950/40 hover:bg-blue-950/70 border border-blue-800/80 rounded-xl transition-colors"
            >
              <MapPin className="w-5 h-5 text-red-400" />
              <span>Get Directions</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
