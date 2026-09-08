import React, { useState } from 'react';
import {
  Shield,
  X,
  Beaker,
  Radio,
  Camera,
  Settings,
  Lock,
  Plus,
  Edit2,
  Trash2,
  Search,
  Check,
  AlertCircle,
  RotateCcw,
  SlidersHorizontal,
  ExternalLink,
  Save,
  Download,
  Key,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { LabTest, ImagingService, GalleryPhoto } from '../types';
import { EditServiceModal } from './EditServiceModal';

export const AdminDashboardModal: React.FC = () => {
  const {
    isAdmin,
    isDashboardOpen,
    closeDashboard,
    activeTab,
    setActiveTab,
    labTests,
    deleteLabTest,
    resetLabTests,
    imagingServices,
    deleteImagingService,
    resetImagingServices,
    galleryPhotos,
    deleteGalleryPhoto,
    resetGalleryPhotos,
    setFrontHeroPhoto,
    activeFrontPhotoId,
    businessConfig,
    updateBusinessConfig,
    resetBusinessConfig,
    changePin,
    showToast,
    logout,
  } = useAdmin();

  // Service Edit/Add modal state
  const [editingModalType, setEditingModalType] = useState<'test' | 'imaging'>('test');
  const [selectedTestToEdit, setSelectedTestToEdit] = useState<LabTest | null>(null);
  const [selectedImagingToEdit, setSelectedImagingToEdit] = useState<ImagingService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Search queries within tabs
  const [testSearch, setTestSearch] = useState('');
  const [imagingSearch, setImagingSearch] = useState('');

  // Business settings local form
  const [bizForm, setBizForm] = useState(businessConfig);

  // Change PIN state
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinMessage, setPinMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isAdmin || !isDashboardOpen) return null;

  // Filtered lab tests for management
  const filteredTests = labTests.filter((t) => {
    const q = testSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.code && t.code.toLowerCase().includes(q)) ||
      t.sampleType.toLowerCase().includes(q)
    );
  });

  // Filtered imaging for management
  const filteredImaging = imagingServices.filter((s) => {
    const q = imagingSearch.toLowerCase().trim();
    if (!q) return true;
    return s.name.toLowerCase().includes(q) || s.modality.toLowerCase().includes(q);
  });

  const handleOpenAddTest = () => {
    setEditingModalType('test');
    setSelectedTestToEdit(null);
    setIsServiceModalOpen(true);
  };

  const handleOpenEditTest = (test: LabTest) => {
    setEditingModalType('test');
    setSelectedTestToEdit(test);
    setIsServiceModalOpen(true);
  };

  const handleOpenAddImaging = () => {
    setEditingModalType('imaging');
    setSelectedImagingToEdit(null);
    setIsServiceModalOpen(true);
  };

  const handleOpenEditImaging = (service: ImagingService) => {
    setEditingModalType('imaging');
    setSelectedImagingToEdit(service);
    setIsServiceModalOpen(true);
  };

  const handleSaveBusinessConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessConfig(bizForm);
  };

  const handleChangePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinMessage(null);
    if (!currentPin.trim() || !newPin.trim()) {
      setPinMessage({ type: 'error', text: 'Please fill in all passcode fields.' });
      return;
    }
    if (newPin !== confirmPin) {
      setPinMessage({ type: 'error', text: 'New passcodes do not match.' });
      return;
    }
    const result = await changePin(currentPin, newPin);
    if (result.success) {
      setPinMessage({ type: 'success', text: result.message });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
    } else {
      setPinMessage({ type: 'error', text: result.message });
    }
  };

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      business: businessConfig,
      labTestsCount: labTests.length,
      labTests,
      imagingServicesCount: imagingServices.length,
      imagingServices,
      galleryPhotosCount: galleryPhotos.length,
      galleryPhotos,
    };
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tnoc-diagnostics-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully as JSON file.');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-5xl h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-900">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 px-6 py-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold font-display text-white">
                    TNOC Administrator Control Center
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wide">
                    Live Admin
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Full control over tests, imaging services, gallery photos, and clinic configuration
                </p>
              </div>
            </div>

            <button
              onClick={closeDashboard}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation Navigation Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
            <button
              onClick={() => setActiveTab('tests')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'tests'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Beaker className="w-4 h-4" />
              <span>Lab Tests ({labTests.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('imaging')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'imaging'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Imaging Services ({imagingServices.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Gallery & Photos ({galleryPhotos.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('business')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'business'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Clinic Information</span>
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'security'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Security & Passcode</span>
            </button>
          </div>

          {/* Active Tab Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* ========================================================================= */}
            {/* TAB 1: LAB TESTS MANAGEMENT                                               */}
            {/* ========================================================================= */}
            {activeTab === 'tests' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="text-sm font-bold text-blue-950 font-display">
                      Laboratory Tests Catalog
                    </h3>
                    <p className="text-xs text-slate-600">
                      Add new diagnostic investigations, update turnaround times, edit descriptions, or remove obsolete tests.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleOpenAddTest}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Test</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Reset all lab tests to default catalog? Custom additions will be replaced.')) {
                          resetLabTests();
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors"
                      title="Reset tests to original defaults"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={testSearch}
                    onChange={(e) => setTestSearch(e.target.value)}
                    placeholder="Search tests by name, abbreviation, sample type, or category..."
                    className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                {/* Tests List */}
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                  {filteredTests.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No laboratory tests matched your search.
                    </div>
                  ) : (
                    filteredTests.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 max-w-2xl">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-blue-950 font-display">
                              {test.name}
                            </span>
                            {test.code && (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                                {test.code}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold uppercase">
                              {test.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-semibold">
                              {test.sampleType}
                            </span>
                            {test.isCommon && (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                                Routine
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1">
                            {test.description}
                          </p>
                          <div className="text-[11px] text-slate-500 flex items-center gap-3">
                            <span>Turnaround: <strong className="text-slate-700">{test.turnaroundTime}</strong></span>
                            <span>•</span>
                            <span>Status: <strong className="text-slate-700">{test.availability}</strong></span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenEditTest(test)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-900 border border-slate-200 text-xs font-semibold transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete test "${test.name}"?`)) {
                                deleteLabTest(test.id);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 text-xs font-semibold transition-colors"
                            title="Delete test"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: IMAGING SERVICES MANAGEMENT                                        */}
            {/* ========================================================================= */}
            {activeTab === 'imaging' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="text-sm font-bold text-blue-950 font-display">
                      Diagnostic Imaging Services
                    </h3>
                    <p className="text-xs text-slate-600">
                      Manage diagnostic ultrasound investigations, durations, and patient preparation guidelines.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleOpenAddImaging}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Imaging Service</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Reset all imaging services to default catalog?')) {
                          resetImagingServices();
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                {/* Imaging search */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={imagingSearch}
                    onChange={(e) => setImagingSearch(e.target.value)}
                    placeholder="Search imaging services..."
                    className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                {/* Imaging list */}
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
                  {filteredImaging.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-950 font-display">
                            {service.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold uppercase">
                            {service.modality}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                            {service.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {service.description}
                        </p>
                        <div className="text-[11px] text-slate-500">
                          Duration: <strong className="text-slate-700">{service.typicalDuration}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditImaging(service)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-900 border border-slate-200 text-xs font-semibold transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete imaging service "${service.name}"?`)) {
                              deleteImagingService(service.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 text-xs font-semibold transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: GALLERY & HERO PHOTOS MANAGEMENT                                   */}
            {/* ========================================================================= */}
            {activeTab === 'gallery' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="text-sm font-bold text-blue-950 font-display">
                      Facility Gallery & Live Video Photography
                    </h3>
                    <p className="text-xs text-slate-600">
                      Solely administrators can manage and upload facility photographs, set the primary front hero scene, or delete photos.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="#gallery"
                      onClick={closeDashboard}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Upload in Gallery Section</span>
                    </a>

                    <button
                      onClick={() => {
                        if (window.confirm('Reset gallery to official default facility photos?')) {
                          resetGalleryPhotos();
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                {/* Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryPhotos.map((photo) => {
                    const isFront = photo.id === activeFrontPhotoId;

                    return (
                      <div
                        key={photo.id}
                        className={`rounded-xl border p-3 flex flex-col justify-between transition-all ${
                          isFront ? 'border-red-500 bg-red-50/30 ring-2 ring-red-500/20' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="relative h-40 rounded-lg overflow-hidden bg-slate-900 mb-2.5">
                          <img
                            src={photo.imageSrc}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-bold">
                            {photo.category}
                          </div>
                          {isFront && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
                              <Check className="w-3 h-3" />
                              <span>Hero Front Scene</span>
                            </div>
                          )}
                        </div>

                        <div className="mb-3">
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{photo.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{photo.description}</p>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                          {isFront ? (
                            <span className="flex-1 py-1.5 rounded-lg bg-red-100 text-red-800 text-[11px] font-bold text-center">
                              Active Hero Scene
                            </span>
                          ) : (
                            <button
                              onClick={() => setFrontHeroPhoto(photo)}
                              className="flex-1 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                            >
                              <SlidersHorizontal className="w-3 h-3 text-red-400" />
                              <span>Set as Front</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete photo "${photo.title}" from facility gallery?`)) {
                                deleteGalleryPhoto(photo.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 transition-colors"
                            title="Delete photograph"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: CLINIC INFORMATION & CONTACT SETTINGS                              */}
            {/* ========================================================================= */}
            {activeTab === 'business' && (
              <form onSubmit={handleSaveBusinessConfig} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div>
                    <h3 className="text-sm font-bold text-blue-950 font-display">
                      Clinic Details & Contact Information
                    </h3>
                    <p className="text-xs text-slate-600">
                      Configure official clinic phone lines, WhatsApp channels, physical location description, and operating hours.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all hover:scale-105"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save All Changes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Reset clinic contact details to official default configuration?')) {
                          resetBusinessConfig();
                          setBizForm(businessConfig);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-semibold transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Reset</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={bizForm.businessName}
                      onChange={(e) => setBizForm({ ...bizForm, businessName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Swahili Name / Location
                    </label>
                    <input
                      type="text"
                      value={bizForm.swahiliName}
                      onChange={(e) => setBizForm({ ...bizForm, swahiliName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (Display)
                    </label>
                    <input
                      type="text"
                      value={bizForm.phone}
                      onChange={(e) => setBizForm({ ...bizForm, phone: e.target.value })}
                      placeholder="e.g. +255 7XX XXX XXX"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (Dialable Raw)
                    </label>
                    <input
                      type="text"
                      value={bizForm.phoneRaw}
                      onChange={(e) => setBizForm({ ...bizForm, phoneRaw: e.target.value })}
                      placeholder="e.g. +2557XXXXXXXX"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      WhatsApp Number (Display)
                    </label>
                    <input
                      type="text"
                      value={bizForm.whatsapp}
                      onChange={(e) => setBizForm({ ...bizForm, whatsapp: e.target.value })}
                      placeholder="e.g. +255 7XX XXX XXX"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      WhatsApp Raw (for chat link)
                    </label>
                    <input
                      type="text"
                      value={bizForm.whatsappRaw}
                      onChange={(e) => setBizForm({ ...bizForm, whatsappRaw: e.target.value })}
                      placeholder="e.g. 2557XXXXXXXX"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Physical Address & Landmark
                  </label>
                  <input
                    type="text"
                    value={bizForm.landmark}
                    onChange={(e) => setBizForm({ ...bizForm, landmark: e.target.value })}
                    placeholder="Opposite Msamvu Bus Terminal, Morogoro–Dodoma Highway"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Opening Hours (Weekdays)
                    </label>
                    <input
                      type="text"
                      value={bizForm.openingHours.weekdays}
                      onChange={(e) =>
                        setBizForm({
                          ...bizForm,
                          openingHours: { ...bizForm.openingHours, weekdays: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Opening Hours (Sundays / Weekends)
                    </label>
                    <input
                      type="text"
                      value={bizForm.openingHours.sundays}
                      onChange={(e) =>
                        setBizForm({
                          ...bizForm,
                          openingHours: { ...bizForm.openingHours, sundays: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* ========================================================================= */}
            {/* TAB 5: SECURITY & PASSCODE MANAGEMENT                                     */}
            {/* ========================================================================= */}
            {activeTab === 'security' && (
              <div className="max-w-xl space-y-6">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <h3 className="text-sm font-bold text-blue-950 font-display">
                    Administrator Security & Credentials
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Update the security passcode required to access administrative controls, or export data backups.
                  </p>
                </div>

                {pinMessage && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      pinMessage.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    {pinMessage.type === 'success' ? (
                      <Check className="w-4 h-4 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    )}
                    <span>{pinMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePinSubmit} className="space-y-4 border border-slate-200 p-5 rounded-xl bg-white shadow-xs">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-red-500" />
                    <span>Change Admin Passcode</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current Passcode
                    </label>
                    <input
                      type="password"
                      value={currentPin}
                      onChange={(e) => setCurrentPin(e.target.value)}
                      placeholder="Enter current passcode (Default: tnoc2025)"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      New Passcode (Min 4 characters)
                    </label>
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Enter new passcode"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm New Passcode
                    </label>
                    <input
                      type="password"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      placeholder="Re-type new passcode"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Update Administrator Passcode</span>
                  </button>
                </form>

                {/* System & Data Backup Box */}
                <div className="border border-slate-200 p-5 rounded-xl bg-slate-50 space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Data Backup & Export</span>
                  </h4>
                  <p className="text-xs text-slate-600">
                    Download a full JSON backup snapshot of all diagnostic tests, imaging services, gallery photos, and settings.
                  </p>
                  <button
                    type="button"
                    onClick={handleExportData}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between shrink-0">
            <div className="text-xs text-slate-500">
              Session: <strong className="text-slate-800">Admin Mode Active</strong> (PIN Protected)
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={logout}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-slate-700 text-xs font-semibold transition-colors"
              >
                Log Out
              </button>

              <button
                type="button"
                onClick={closeDashboard}
                className="px-4 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold transition-colors"
              >
                Close Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Child Modal for Adding / Editing Test or Imaging Service */}
      <EditServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        type={editingModalType}
        initialTest={selectedTestToEdit}
        initialImaging={selectedImagingToEdit}
      />
    </>
  );
};
