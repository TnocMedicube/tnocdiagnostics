import React from 'react';
import {
  FileSpreadsheet,
  Clock,
  Droplet,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';

export const HomeFeaturedTestsSection: React.FC = () => {
  const { tests, homepage } = useCms();

  // Get active featured tests or fallback to top common active tests
  const featuredIds = homepage.featuredTests || [];
  let displayTests = tests.filter(
    (t) => t.isActive && featuredIds.includes(t.id)
  );

  if (displayTests.length === 0) {
    displayTests = tests.filter((t) => t.isActive && t.isCommon).slice(0, 6);
  }
  if (displayTests.length === 0) {
    displayTests = tests.filter((t) => t.isActive).slice(0, 6);
  }

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Diagnostic Investigations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Laboratory Tests
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Clear clinical parameters, transparent pricing, and prompt turnaround times for our most frequent investigations.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              to="/tests"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-xs hover:shadow-md transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>View Full Catalogue ({tests.filter((t) => t.isActive).length} Tests)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Featured Test Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTests.slice(0, 6).map((test) => (
            <div
              key={test.id}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100/80 text-blue-800 capitalize">
                    {test.category}
                  </span>

                  {test.code && (
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {test.code}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                  {test.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {test.evaluates || test.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 space-y-3">
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-red-500" />
                    <span>Sample: <strong className="text-slate-800 font-semibold">{test.sampleType}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{test.turnaroundTime}</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
                      Price
                    </span>
                    <span className="text-base font-extrabold text-blue-900">
                      {test.price || 'Price on Inquiry'}
                    </span>
                  </div>

                  <Link
                    to="/tests"
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for full list */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Looking for a specific laboratory or diagnostic investigation?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Search by test name, clinical category, sample type, or physician indication.
            </p>
          </div>

          <Link
            to="/tests"
            className="shrink-0 px-5 py-2.5 bg-white hover:bg-slate-50 text-blue-800 text-sm font-bold rounded-xl border border-blue-200 shadow-2xs hover:shadow-xs transition-colors"
          >
            Open Tests & Prices Catalogue →
          </Link>
        </div>
      </div>
    </section>
  );
};
