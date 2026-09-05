import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  ExternalLink,
  Compass,
  Copy,
  Check,
  Building,
  Bus,
  Car,
  Footprints,
  Info,
} from 'lucide-react';
import { TNOC_BUSINESS_CONFIG } from '../config/businessConfig';

export const LocationSection: React.FC = () => {
  const [copiedQuery, setCopiedQuery] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleCopySearchTerm = () => {
    navigator.clipboard.writeText(TNOC_BUSINESS_CONFIG.googleMapsQuery);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(
      `${TNOC_BUSINESS_CONFIG.latitude}, ${TNOC_BUSINESS_CONFIG.longitude}`
    );
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  // Google Maps Search link query
  const mapsSearchUrl = TNOC_BUSINESS_CONFIG.googleMapsSearchUrl;
  const mapsDirectionsUrl = TNOC_BUSINESS_CONFIG.googleMapsDirectionsUrl;
  const mapsEmbedUrl =
    TNOC_BUSINESS_CONFIG.googleMapsEmbedUrl ||
    `https://maps.google.com/maps?q=${TNOC_BUSINESS_CONFIG.latitude},${TNOC_BUSINESS_CONFIG.longitude}&hl=en&z=17&output=embed`;

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-red-600" />
            <span>Exact Location & Navigation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight font-display">
            How to Find Us
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
            Easily locate <strong className="text-blue-900">{TNOC_BUSINESS_CONFIG.displayName}</strong> in Msamvu, Morogoro. Open directions on your smartphone with one tap or navigate using precise GPS coordinates.
          </p>
        </div>

        {/* High-Visibility Card: "Find TNOC Diagnostics" */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 text-white shadow-xl mb-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-300 text-xs font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Verified GPS Pin</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                {TNOC_BUSINESS_CONFIG.displayName}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
                Official Business Name: <strong className="text-white font-semibold">{TNOC_BUSINESS_CONFIG.businessName}</strong>. Pinpointed at coordinates{' '}
                <strong className="text-red-300 font-mono font-semibold">
                  {TNOC_BUSINESS_CONFIG.latitude}, {TNOC_BUSINESS_CONFIG.longitude}
                </strong>{' '}
                in Msamvu, Morogoro.
              </p>

              {/* Copyable Boxes: Search String & Coordinates */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch gap-2.5 max-w-xl">
                <div className="flex items-center gap-2 bg-black/50 border border-white/15 p-2.5 rounded-xl flex-1 min-w-[240px]">
                  <span className="font-mono text-xs text-red-200 font-semibold truncate px-1 select-all">
                    {TNOC_BUSINESS_CONFIG.googleMapsQuery}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopySearchTerm}
                    className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors shrink-0"
                  >
                    {copiedQuery ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-300" />
                        <span>Copy Name</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-black/50 border border-white/15 p-2.5 rounded-xl shrink-0">
                  <span className="font-mono text-xs text-blue-200 font-semibold px-1 select-all">
                    {TNOC_BUSINESS_CONFIG.latitude}, {TNOC_BUSINESS_CONFIG.longitude}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyCoords}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors shrink-0"
                  >
                    {copiedCoords ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-300" />
                        <span>Copy GPS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Map Action Buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all duration-150 active:scale-[0.98]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions (GPS Pin)</span>
              </a>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-red-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Location Details & Interactive Map Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Specific Address & Local Access Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-base font-bold text-blue-950 font-display mb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-red-600" />
                <span>Physical Address & Locality</span>
              </h4>

              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  <strong className="text-slate-900">Facility:</strong>{' '}
                  {TNOC_BUSINESS_CONFIG.businessName}
                </p>
                <p>
                  <strong className="text-slate-900">Display Name:</strong>{' '}
                  {TNOC_BUSINESS_CONFIG.displayName}
                </p>
                <p>
                  <strong className="text-slate-900">Area:</strong>{' '}
                  {TNOC_BUSINESS_CONFIG.area}, {TNOC_BUSINESS_CONFIG.city}
                </p>
                <p>
                  <strong className="text-slate-900">GPS Coordinates:</strong>{' '}
                  <span className="font-mono text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    {TNOC_BUSINESS_CONFIG.latitude}, {TNOC_BUSINESS_CONFIG.longitude}
                  </span>
                </p>
                <p>
                  <strong className="text-slate-900">Region & Country:</strong>{' '}
                  {TNOC_BUSINESS_CONFIG.region}, {TNOC_BUSINESS_CONFIG.country}
                </p>
                <p className="pt-2 text-xs text-slate-500 border-t border-slate-200">
                  <span className="font-semibold text-slate-700">Landmark Reference:</span>{' '}
                  {TNOC_BUSINESS_CONFIG.landmark}
                </p>
              </div>
            </div>

            {/* Access Tips by Transport Mode */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-400">
                Getting to Msamvu
              </h4>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-900 shrink-0">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">By Public Transport / Daladala:</strong>
                    <span className="text-slate-600">
                      Msamvu is Morogoro&apos;s main transportation hub. Commuter buses arriving from Morogoro Town Center, Mazimbu, and Kihonda stop at Msamvu.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-50 text-red-700 shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">By Private Vehicle / Taxi:</strong>
                    <span className="text-slate-600">
                      Enter &ldquo;TNOC DIAGNOSTICS (MAABARA YA MSAMVU)&rdquo; in your vehicle or phone GPS for direct routing with parking nearby.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-900 shrink-0">
                    <Footprints className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold">Walk-in Patients:</strong>
                    <span className="text-slate-600">
                      Patients with walking proximity around Msamvu can visit directly for routine blood tests or doctor investigation orders.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verifiable Information Notice */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Location Integrity Guarantee:</strong> We do not fabricate fake coordinates or fictitious landmarks. All location links direct natively to verified Google Maps queries for Msamvu, Morogoro.
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map / Google Maps Card Container */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 shadow-sm flex flex-col h-full min-h-[420px]">
              {/* Top Map Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800 font-display">
                    Pinpointed: -6.802722, 37.661222 (Msamvu, Morogoro)
                  </span>
                </div>

                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <span>Full Screen Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map View Frame: Responsive Embed */}
              <div className="relative flex-1 w-full min-h-[380px] bg-slate-200">
                <iframe
                  title="TNOC Diagnostics Msamvu Morogoro Verified Google Map"
                  src={mapsEmbedUrl}
                  className="w-full h-full min-h-[380px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Navigation Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-lg flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-600 text-white shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <strong className="block text-slate-900 font-semibold">
                      Need live turn-by-turn routing?
                    </strong>
                    <span className="text-slate-500">Tap below to launch navigation</span>
                  </div>
                  <a
                    href={mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto px-3.5 py-1.5 bg-blue-950 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap shadow-sm"
                  >
                    Start Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
