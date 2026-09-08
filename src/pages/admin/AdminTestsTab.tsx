import React, { useState, useMemo } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  RotateCcw,
  FileSpreadsheet,
  Droplet,
  Clock,
  Check,
  X,
  Tag,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { LabTest } from '../../types';
import { AdminTestModal } from './AdminTestModal';

export const AdminTestsTab: React.FC = () => {
  const { tests, addTest, updateTest, deleteTest, toggleTestActive, resetTests } = useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<LabTest | null>(null);
  const [testToDelete, setTestToDelete] = useState<LabTest | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    tests.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set).sort();
  }, [tests]);

  // Filter tests
  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = test.name.toLowerCase().includes(q);
        const matchCode = test.code?.toLowerCase().includes(q) || false;
        const matchCat = test.category.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchCat) return false;
      }
      if (selectedCategory !== 'all' && test.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [tests, searchQuery, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingTest(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (t: LabTest) => {
    setEditingTest(t);
    setModalOpen(true);
  };

  const handleSave = (testData: any) => {
    if (editingTest) {
      updateTest(editingTest.id, testData);
    } else {
      addTest(testData);
    }
  };

  const confirmDeleteTest = () => {
    if (testToDelete) {
      deleteTest(testToDelete.id);
      setTestToDelete(null);
    }
  };

  const confirmResetTests = () => {
    resetTests();
    setConfirmResetOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Laboratory Tests & Pricing Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Add, edit, adjust prices in TZS, update turnaround times, and toggle visibility for all clinical tests
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Test</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by test name or code..."
            className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Categories ({tests.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400 shrink-0">
            {filteredTests.length} items
          </span>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider font-bold text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Test Name & Code</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Price (TZS)</th>
                <th className="px-4 py-3.5">Sample Type</th>
                <th className="px-4 py-3.5">Turnaround</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTests.map((test) => (
                <tr
                  key={test.id}
                  className={`hover:bg-slate-50/70 transition-colors ${
                    test.isActive === false ? 'opacity-50 bg-slate-50/40' : ''
                  }`}
                >
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900">{test.name}</div>
                    {test.code && (
                      <span className="text-[11px] font-mono text-slate-500">
                        {test.code}
                      </span>
                    )}
                    {test.isCommon && (
                      <span className="ml-2 text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-sm">
                        Featured
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {test.category}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 font-bold text-blue-900 whitespace-nowrap">
                    {test.price || 'Price on Inquiry'}
                  </td>

                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{test.sampleType}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{test.turnaroundTime}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => toggleTestActive(test.id)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        test.isActive !== false
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {test.isActive !== false ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(test)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        title="Edit Test"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setTestToDelete(test)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete Test"
                        aria-label={`Delete ${test.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Test Confirmation Modal */}
      {testToDelete && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 text-center mb-1">
                Remove Laboratory Test?
              </h3>
              <p className="text-xs text-slate-500 text-center mb-4">
                Are you sure you want to remove this investigation from the public test catalog and pricing list?
              </p>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-6 space-y-1 text-xs">
                <div className="font-bold text-slate-900">{testToDelete.name}</div>
                <div className="text-slate-500 flex items-center justify-between">
                  <span>Category: {testToDelete.category}</span>
                  <span className="font-semibold text-blue-700">{testToDelete.price}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTestToDelete(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteTest}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Yes, Remove Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Defaults Confirmation Modal */}
      {confirmResetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 mx-auto">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 text-center mb-1">
                Reset Test Catalogue?
              </h3>
              <p className="text-xs text-slate-500 text-center mb-6">
                This will restore the laboratory tests catalog to original verified clinical defaults with standard TZS prices.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmResetTests}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Yes, Restore Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <AdminTestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialTest={editingTest}
      />
    </div>
  );
};
