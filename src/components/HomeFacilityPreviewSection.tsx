import React from 'react';
import { Image as ImageIcon, ArrowRight, MapPin } from 'lucide-react';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const HomeFacilityPreviewSection: React.FC = () => {
  const { gallery } = useCms();

  const previewPhotos = gallery.filter((p) => p.isActive).slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
              <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
              <span>Modern Clinical Facility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Facility & Environment Preview
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Clean, hygienic specimen collection stations and comfortable patient consultation spaces in Msamvu, Morogoro.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-900 hover:underline text-sm group"
            >
              <span>Explore Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3 Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewPhotos.map((photo) => (
            <Link
              key={photo.id}
              to="/gallery"
              className="group block rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                  {photo.category}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-base mb-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Locality Callout */}
        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-500">
            <MapPin className="w-4 h-4 text-red-600" />
            <span>Located at Msamvu Area, Morogoro, Tanzania • Easy access along major corridors</span>
          </span>
        </div>
      </div>
    </section>
  );
};
