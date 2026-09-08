import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  FileSpreadsheet,
  Clock,
  Droplet,
  Info,
  X,
  MessageCircle,
  Phone,
  CheckCircle2,
  ChevronDown,
  ArrowUpDown,
} from 'lucide-react';
import { Link } from '../router/RouterContext';
import { useCms } from '../context/CmsContext';
import { LabTest } from '../types';

export const TestsPage: React.FC = () => {
  const { tests, businessConfig } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSampleType, setSelectedSampleType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'turnaround'>('name');

  // Filter only active tests
  const activeTests = useMemo(() => {
    return tests.filter((t) => t.isActive !== false);
  }, [tests]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    activeTests.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set).sort();
  }, [activeTests]);

  // Extract unique sample types
  const sampleTypes = useMemo(() => {
    const set = new Set<string>();
    activeTests.forEach((t) => {
      if (t.sampleType) set.add(t.sampleType);
    });
    return Array.from(set).sort();
  }, [activeTests]);

  // Filter and sort tests
  const filteredTests = useMemo(() => {
    return activeTests
      .filter((test) => {
        // Search matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = test.name.toLowerCase().includes(q);
          const matchCode = test.code?.toLowerCase().includes(q) || false;
          const matchCat = test.category.toLowerCase().includes(q);
          const matchSample = test.sampleType.toLowerCase().includes(q);
          const matchDesc = test.evaluates?.toLowerCase().includes(q) || false;
          if (!matchName && !matchCode && !matchCat && !matchSample && !matchDesc) {
            return false;
          }
        }

        // Category matching
        if (selectedCategory !== 'all' && test.category !== selectedCategory) {
          return false;
        }

        // Sample type matching
        if (selectedSampleType !== 'all' && test.sampleType !== selectedSampleType) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'category') {
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        }
        if (sortBy === 'turnaround') {
          return a.turnaroundTime.localeCompare(b.turnaroundTime) || a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [activeTests, searchQuery, selectedCategory, selectedSampleType, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSampleType('all');
    setSortBy('name');
  };

  return (
    <div className="py-10 sm:py-16 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-700" />
            <span>Complete Investigation Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Tests & Prices
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Search our comprehensive clinical laboratory investigations with transparent pricing in Tanzanian Shillings (TZS), sample requirements, and expected turnaround times.
          </p>
        </div>

        {/* Filter & Search Bar Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tests by name (e.g. CBC, Glucose, Lipid, Malaria)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label="Clear search text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="md:col-span-3">
              <label htmlFor="category-select" className="sr-only">
                Filter by Category
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Categories ({activeTests.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Select */}
            <div className="md:col-span-3 flex gap-2">
              <select
                aria-label="Sort tests by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                <option value="name">Sort: Name (A – Z)</option>
                <option value="category">Sort: Category</option>
                <option value="turnaround">Sort: Turnaround Time</option>
              </select>

              {(searchQuery || selectedCategory !== 'all' || selectedSampleType !== 'all') && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  title="Reset Filters"
                  className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Quick Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium mr-1">Quick Filters:</span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {categories.slice(0, 7).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Legend */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>
            Showing <strong className="text-slate-800 font-semibold">{filteredTests.length}</strong> of{' '}
            {activeTests.length} active investigations
          </span>
          <span className="hidden sm:inline">
            All investigations conducted in Msamvu, Morogoro
          </span>
        </div>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              const whatsappMessage = `Hello TNOC Diagnostics, I would like to inquire about the ${test.name} (${test.price || 'test'}).`;
              const whatsappUrl = `https://wa.me/${businessConfig.whatsappRaw}?text=${encodeURIComponent(
                whatsappMessage
              )}`;

              return (
                <div
                  key={test.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Category and Code badges */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100">
                        {test.category}
                      </span>

                      {test.code && (
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                          {test.code}
                        </span>
                      )}
                    </div>

                    {/* Test Name */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {test.name}
                    </h3>

                    {/* What it evaluates */}
                    <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3">
                      {test.evaluates || test.description}
                    </p>

                    {/* Preparation requirement if present */}
                    {test.preparation && (
                      <div className="mb-4 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-1.5">
                        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Prep:</strong> {test.preparation}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Meta & Price */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span className="truncate">Sample: {test.sampleType}</span>
                      </div>

                      <div className="flex items-center gap-1.5 justify-end">
                        <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{test.turnaroundTime}</span>
                      </div>
                    </div>

                    {/* Price and Inquire CTA */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
                          Fee
                        </span>
                        <span className="text-base font-extrabold text-blue-900">
                          {test.price || 'Price on Inquiry'}
                        </span>
                      </div>

                      {businessConfig.whatsappRaw ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Inquire</span>
                        </a>
                      ) : (
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-colors"
                        >
                          <span>Inquire</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <FileSpreadsheet className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No matching tests found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find any test matching &ldquo;{searchQuery}&rdquo;. Try using another keyword or reset the filter.
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Clear Search & Show All Tests
            </button>
          </div>
        )}

        {/* Patient Guidance Bottom Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">Need a test not listed in this catalogue?</strong>
              <span>
                Our laboratory continuously coordinates with clinicians for specialized panels and send-away referral tests. Contact our Msamvu diagnostic desk for immediate confirmation.
              </span>
            </div>
          </div>

          <Link
            to="/contact"
            className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Contact Lab Desk
          </Link>
        </div>
      </div>
    </div>
  );
};
