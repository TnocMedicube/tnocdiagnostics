import React, { useState, useMemo } from 'react';
import {
  Search,
  Activity,
  Beaker,
  Microscope,
  Bug,
  Droplet,
  ShieldCheck,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
  Clock,
  CheckCircle2,
  X,
  Filter,
  Plus,
  Edit2,
  Trash2,
  Shield,
  Lock,
} from 'lucide-react';
import { LAB_CATEGORIES } from '../data/testsData';
import { LabTest, TestCategoryType } from '../types';
import { TestDetailModal } from './TestDetailModal';
import { EditServiceModal } from './EditServiceModal';
import { useAdmin } from '../context/AdminContext';

interface LabTestsSectionProps {
  onSelectTestForInquiry?: (test: LabTest) => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Activity,
  Beaker,
  Microscope,
  Bug,
  Droplet,
  ShieldCheck,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  FileText,
};

export const LabTestsSection: React.FC<LabTestsSectionProps> = ({
  onSelectTestForInquiry,
}) => {
  const { isAdmin, labTests, deleteLabTest, openLoginModal, openDashboard } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSampleType, setSelectedSampleType] = useState<string>('all');
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>('hematology');
  const [activeModalTest, setActiveModalTest] = useState<LabTest | null>(null);
  const [editingTest, setEditingTest] = useState<LabTest | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter tests dynamically based on search, category, and sample type
  const filteredTests = useMemo(() => {
    return labTests.filter((test) => {
      const q = searchQuery.toLowerCase().trim();
      let matchesSearch = true;

      if (q) {
        // Special search synonyms
        const searchMatchesPregnancy =
          (q === 'pregnancy' || q === 'ujauzito' || q === 'mimba') &&
          (test.id.includes('pregnancy') ||
            test.id.includes('hcg') ||
            test.name.toLowerCase().includes('pregnancy') ||
            test.name.toLowerCase().includes('hcg'));

        const searchMatchesBlood =
          (q === 'blood' || q === 'damu') &&
          (test.sampleType === 'Blood' || test.name.toLowerCase().includes('blood'));

        const searchMatchesUrine =
          (q === 'urine' || q === 'mkojo') &&
          (test.sampleType === 'Urine' || test.name.toLowerCase().includes('urine'));

        const searchMatchesSugar =
          (q === 'sugar' || q === 'glucose' || q === 'sukari') &&
          (test.name.toLowerCase().includes('glucose') || test.name.toLowerCase().includes('hba1c'));

        const searchMatchesMalaria =
          q === 'malaria' &&
          (test.name.toLowerCase().includes('malaria') || test.id.includes('malaria'));

        matchesSearch =
          searchMatchesPregnancy ||
          searchMatchesBlood ||
          searchMatchesUrine ||
          searchMatchesSugar ||
          searchMatchesMalaria ||
          test.name.toLowerCase().includes(q) ||
          test.description.toLowerCase().includes(q) ||
          test.evaluates.toLowerCase().includes(q) ||
          (test.code && test.code.toLowerCase().includes(q));
      }

      const matchesCategory =
        selectedCategory === 'all' || test.category === selectedCategory;

      const matchesSample =
        selectedSampleType === 'all' || test.sampleType === selectedSampleType;

      return matchesSearch && matchesCategory && matchesSample;
    });
  }, [labTests, searchQuery, selectedCategory, selectedSampleType]);

  // Group tests by category for category view
  const testsByCategory = useMemo(() => {
    const map: Record<TestCategoryType, LabTest[]> = {
      hematology: [],
      chemistry: [],
      microbiology: [],
      parasitology: [],
      urinalysis: [],
      hormones: [],
      fertility: [],
      infectious: [],
      serology: [],
      specialized: [],
      imaging: [],
    };

    filteredTests.forEach((test) => {
      if (map[test.category]) {
        map[test.category].push(test);
      }
    });

    return map;
  }, [filteredTests]);

  const sampleTypes = ['all', 'Blood', 'Urine', 'Stool', 'Swab', 'Semen'];

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSampleType('all');
  };

  const isFiltered =
    searchQuery.trim() !== '' || selectedCategory !== 'all' || selectedSampleType !== 'all';

  return (
    <section id="laboratory" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-red-600" />
            <span>Pathology & Clinical Laboratory Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight font-display">
            Laboratory Investigations
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
            Organized across 10 specialized laboratory disciplines. Search tests, review sample guidelines, or explore clinical parameter details.
          </p>

          {/* Admin Management Action Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {isAdmin ? (
              <>
                <button
                  type="button"
                  id="admin-add-lab-test-btn"
                  onClick={() => {
                    setEditingTest(null);
                    setIsAddModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Laboratory Test</span>
                </button>
                <button
                  type="button"
                  onClick={() => openDashboard('tests')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  <span>Open Lab Catalog Manager</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() =>
                  openLoginModal('Log in as administrator to add, edit, or customize laboratory investigations.')
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium border border-slate-200 transition-colors"
              >
                <Lock className="w-3 h-3 text-red-600" />
                <span>Admin: Manage Lab Tests</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Search & Filter Box */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-10">
          {/* Main Search Input */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-red-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests: e.g., 'urine', 'blood', 'pregnancy', 'sugar', 'FBP', 'malaria', 'culture'..."
              className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Discipline Filter:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-950 text-white shadow-sm ring-1 ring-red-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Categories ({labTests.length})
              </button>
              {LAB_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-900 text-white shadow-sm ring-1 ring-red-500'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Sample Type Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="font-semibold text-slate-500 mr-1">Sample:</span>
              {sampleTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedSampleType(type)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                    selectedSampleType === type
                      ? 'bg-red-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {type === 'all' ? 'All Samples' : type}
                </button>
              ))}

              {isFiltered && (
                <button
                  onClick={handleClearFilters}
                  className="ml-auto text-xs text-red-600 hover:text-red-800 font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter & Search Status */}
        {isFiltered && (
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-slate-600 bg-red-50/60 border border-red-200 px-4 py-2.5 rounded-xl">
            <span>
              Showing <strong className="text-red-700">{filteredTests.length}</strong> matching investigation{filteredTests.length === 1 ? '' : 's'}.
            </span>
            {searchQuery && (
              <span className="text-slate-500">
                Keyword: &ldquo;<strong className="text-blue-950">{searchQuery}</strong>&rdquo;
              </span>
            )}
          </div>
        )}

        {/* If no search results found */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No matching laboratory investigations found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
              We may still provide this investigation or specialized panels upon request. Contact our laboratory reception in Msamvu.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-sky-600"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* Categories Display */}
        <div className="space-y-6">
          {LAB_CATEGORIES.map((category) => {
            const categoryTests = testsByCategory[category.id] || [];
            if (categoryTests.length === 0 && isFiltered) {
              return null; // hide empty categories during active search
            }

            const IconComponent = CATEGORY_ICONS[category.iconName] || Activity;
            const isExpanded =
              isFiltered || expandedCategoryId === category.id;

            return (
              <div
                key={category.id}
                id={`cat-${category.id}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-200"
              >
                {/* Category Header (Collapsible Accordion Trigger) */}
                <button
                  type="button"
                  onClick={() =>
                    setExpandedCategoryId(isExpanded && !isFiltered ? null : category.id)
                  }
                  className="w-full p-4 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-900 border border-blue-100 flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                          {category.title}
                        </h3>
                        {category.swahiliTitle && (
                          <span className="text-xs font-medium text-slate-400">
                            ({category.swahiliTitle})
                          </span>
                        )}
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {categoryTests.length} tests
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Tests Grid (Expanded Content) */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                    {/* Microbiology Specific Clarification Note */}
                    {category.id === 'microbiology' && (
                      <div className="mb-4 p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <strong>Microbiology Workflow Clarification:</strong> We distinguish between direct routine microscopy, bacteriological culture isolation, and targeted antimicrobial susceptibility testing (AST). Antibiotic sensitivities are reported systematically to guide physician therapy.
                        </div>
                      </div>
                    )}

                    {/* Infectious Disease Screening Disclaimer Note */}
                    {category.id === 'infectious' && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50/80 border border-red-200 text-red-950 text-xs flex items-start gap-2">
                        <Info className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                        <div>
                          <strong>Clinical Screening Note:</strong> Rapid infectious disease screenings are performed with confidential counseling. A reactive screening test requires clinical correlation and confirmatory algorithm testing per medical guidelines.
                        </div>
                      </div>
                    )}

                    {/* Specialized Category Notice */}
                    {category.id === 'specialized' && (
                      <div className="mb-4 p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <strong>Availability Note:</strong> Specialized biomarkers (such as PSA, Ferritin, Vitamins, and Cardiac Troponin) are available daily or upon schedule coordination. Inquire with reception for specialized batch timing.
                        </div>
                      </div>
                    )}

                    {/* Grid of Individual Tests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {categoryTests.map((test) => (
                        <div
                          key={test.id}
                          className="bg-white rounded-xl border border-slate-200 hover:border-red-300 p-4 flex flex-col justify-between transition-all duration-150 hover:shadow-sm"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              {test.code && (
                                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                  {test.code}
                                </span>
                              )}
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                  test.sampleType === 'Blood'
                                    ? 'bg-rose-50 text-rose-700 border border-rose-100'
                                    : test.sampleType === 'Urine'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                    : test.sampleType === 'Stool'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'bg-blue-50 text-blue-700 border border-blue-100'
                                }`}
                              >
                                {test.sampleType}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1.5 font-display">
                              {test.name}
                            </h4>

                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                              {test.description}
                            </p>
                          </div>

                          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{test.turnaroundTime.split('(')[0]}</span>
                            </span>

                            <div className="flex items-center gap-1.5">
                              {isAdmin && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => setEditingTest(test)}
                                    title={`Admin: Edit ${test.name}`}
                                    className="p-1 rounded-md bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-900 transition-colors"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`Delete laboratory test "${test.name}"?`)) {
                                        deleteLabTest(test.id);
                                      }
                                    }}
                                    title={`Admin: Delete ${test.name}`}
                                    className="p-1 rounded-md bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </>
                              )}

                              <button
                                type="button"
                                onClick={() => setActiveModalTest(test)}
                                className="text-xs font-bold text-blue-700 hover:text-red-600 hover:underline flex items-center gap-1 transition-colors"
                              >
                                <span>Details</span>
                                <Info className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Educational / Clinical Callout */}
        <div className="mt-12 p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold">
                Can&apos;t find a specific laboratory investigation on the list?
              </strong>
              <span>
                Our laboratory catalog is continually updated. Contact our Msamvu team to verify availability for specialized clinical requests.
              </span>
            </div>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors whitespace-nowrap shadow-md shadow-red-600/20"
          >
            Inquire with Reception
          </a>
        </div>
      </div>

      {/* Test Detail Modal */}
      {activeModalTest && (
        <TestDetailModal
          test={activeModalTest}
          onClose={() => setActiveModalTest(null)}
          onSelectForInquiry={onSelectTestForInquiry}
        />
      )}

      {/* Admin Add / Edit Test Modal */}
      {(isAddModalOpen || editingTest !== null) && (
        <EditServiceModal
          isOpen={isAddModalOpen || editingTest !== null}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingTest(null);
          }}
          type="test"
          initialTest={editingTest}
        />
      )}
    </section>
  );
};
