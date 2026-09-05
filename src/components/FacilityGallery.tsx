import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Building2,
  Upload,
  Trash2,
  Plus,
  RotateCcw,
  AlertTriangle,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import { FACILITY_GALLERY } from '../data/testsData';
import { GalleryPhoto } from '../types';

const STORAGE_KEY = 'tnoc_facility_gallery_photos_v2';

// Helper to compress images so local storage doesn't exceed quota
const compressImage = (file: File, maxWidth = 1400, maxHeight = 1000, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const FacilityGallery: React.FC = () => {
  // Load photos from localStorage or fallback to default
  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load gallery photos from localStorage', e);
    }
    return FACILITY_GALLERY;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Facility Exterior');
  const [customCategory, setCustomCategory] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadImageSrc, setUploadImageSrc] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Photo removal confirmation state
  const [photoToDelete, setPhotoToDelete] = useState<GalleryPhoto | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to persist gallery photos to localStorage', e);
    }
  }, [photos]);

  const uniqueCategories = Array.from(new Set(photos.map((p) => p.category)));
  const categories = ['all', ...uniqueCategories];

  // If the active filter category no longer exists, reset to 'all'
  useEffect(() => {
    if (selectedCategory !== 'all' && !uniqueCategories.includes(selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [uniqueCategories, selectedCategory]);

  const filteredPhotos = photos.filter((photo) =>
    selectedCategory === 'all' ? true : photo.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Handle file selection (click or drop)
  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }
    setUploadError(null);
    setIsCompressing(true);
    try {
      const compressedDataUrl = await compressImage(file);
      setUploadImageSrc(compressedDataUrl);
      if (!uploadTitle) {
        // Derive clean title from filename if title is empty
        const cleanName = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]/g, ' ')
          .replace(/^(img|image|whatsapp image)\s*/i, 'Facility View ');
        setUploadTitle(cleanName);
      }
    } catch (err) {
      console.error(err);
      setUploadError('Failed to process the image. Please try another file.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadImageSrc) {
      setUploadError('Please select or drop an image first.');
      return;
    }
    const finalTitle = uploadTitle.trim() || 'TNOC Facility Photo';
    const finalCategory =
      uploadCategory === 'custom'
        ? customCategory.trim() || 'General Facility'
        : uploadCategory;

    const newPhoto: GalleryPhoto = {
      id: `gal-custom-${Date.now()}`,
      title: finalTitle,
      category: finalCategory,
      description:
        uploadDescription.trim() ||
        `Facility photograph of TNOC Medical Diagnostic Facility, ${finalCategory}.`,
      imageSrc: uploadImageSrc,
      fallbackGradient: 'from-blue-900 to-slate-950',
    };

    setPhotos((prev) => [newPhoto, ...prev]);
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadOpen(false);
      setUploadTitle('');
      setUploadDescription('');
      setUploadImageSrc(null);
      setCustomCategory('');
      setUploadCategory('Facility Exterior');
    }, 700);
  };

  // Delete photo logic
  const confirmDeletePhoto = (photo: GalleryPhoto, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setPhotoToDelete(photo);
  };

  const executeDeletePhoto = () => {
    if (!photoToDelete) return;
    setPhotos((prev) => prev.filter((p) => p.id !== photoToDelete.id));
    if (lightboxIndex !== null) {
      setLightboxIndex(null);
    }
    setPhotoToDelete(null);
  };

  // Reset to default factory photos
  const handleResetDefaults = () => {
    if (window.confirm('Reset gallery to the original default facility photographs?')) {
      setPhotos(FACILITY_GALLERY);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
      setSelectedCategory('all');
      setLightboxIndex(null);
    }
  };

  const activePhoto: GalleryPhoto | null =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-red-600" />
            <span>Facility Tour & Photographs</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight font-display">
            Our Facility in Msamvu
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-2 leading-relaxed">
            Authentic exterior, diagnostic laboratories, and patient entrance photography of TNOC Medical Diagnostic Facility in Msamvu, Morogoro.
          </p>

          {/* Action Bar: Upload Button & Reset */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              id="upload-facility-photo-btn"
              onClick={() => {
                setUploadError(null);
                setIsUploadOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm shadow-sm hover:shadow transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photo to Gallery</span>
            </button>

            <button
              id="reset-gallery-btn"
              onClick={handleResetDefaults}
              title="Reset to default facility photographs"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const count =
              cat === 'all'
                ? photos.length
                : photos.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-sm ring-2 ring-red-500/50'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{cat === 'all' ? 'All Photographs' : cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => {
              const isBroken = brokenImages[photo.id];

              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[260px] sm:min-h-[300px]"
                >
                  {/* Image or Clinical Preview Background */}
                  {!isBroken ? (
                    <img
                      src={photo.imageSrc}
                      alt={photo.title}
                      loading="lazy"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [photo.id]: true }))
                      }
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Fallback card */
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        photo.fallbackGradient || 'from-slate-800 to-slate-950'
                      } flex flex-col items-center justify-center p-6 text-center z-0`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 text-red-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <span className="text-xs uppercase tracking-wider text-red-300 font-semibold mb-1">
                        {photo.category}
                      </span>
                      <h3 className="text-base font-bold text-white font-display">
                        {photo.title}
                      </h3>
                    </div>
                  )}

                  {/* Dark gradient overlay for readable caption text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent z-10" />

                  {/* Top Action Controls: Remove Button & Maximize Icon */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                    {/* Delete / Remove Button */}
                    <button
                      type="button"
                      onClick={(e) => confirmDeletePhoto(photo, e)}
                      title="Remove this photo from gallery"
                      className="pointer-events-auto w-8 h-8 rounded-full bg-slate-900/80 hover:bg-red-600 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
                      aria-label={`Delete ${photo.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Maximize Icon */}
                    <div className="w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Caption Bar */}
                  <div className="relative z-20 p-5 text-left text-white">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white shadow-xs">
                        {photo.category}
                      </span>
                      <span className="text-[10px] font-bold text-blue-200 bg-blue-900/80 px-2 py-0.5 rounded">
                        Msamvu, Morogoro
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-display text-white group-hover:text-red-300 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                      {photo.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs max-w-lg mx-auto my-8">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No photos in this category</h3>
            <p className="text-sm text-slate-500 mt-1 mb-6">
              You can upload new photos or reset to the original default collection.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium text-xs hover:bg-red-700"
              >
                Upload Photo
              </button>
              <button
                onClick={handleResetDefaults}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200"
              >
                Restore Defaults
              </button>
            </div>
          </div>
        )}

        {/* Verification Note */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3 text-xs text-slate-600 max-w-2xl mx-auto shadow-xs">
          <Info className="w-4 h-4 text-red-600 shrink-0" />
          <span>
            <strong>Gallery Management:</strong> You can upload new photos or remove existing ones. All updates are preserved in your browser and will remain active across visits.
          </span>
        </div>
      </div>

      {/* Upload Photo Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 my-8 text-left">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-950 font-display">
                    Upload Facility Photo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add new exterior, laboratory, or office imagery to the gallery
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close upload modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {uploadError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* Success Message */}
            {uploadSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 flex items-center gap-2 text-xs text-green-700 font-semibold">
                <Check className="w-4 h-4 shrink-0" />
                <span>Photo added to gallery successfully!</span>
              </div>
            )}

            <form onSubmit={handleAddPhoto} className="space-y-4">
              {/* Drag-and-drop & Click Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Image File *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-red-500 bg-red-50/50'
                      : uploadImageSrc
                      ? 'border-green-500/50 bg-slate-50'
                      : 'border-slate-300 hover:border-red-400 hover:bg-slate-50'
                  }`}
                >
                  {isCompressing ? (
                    <div className="py-4 text-center">
                      <div className="w-8 h-8 border-3 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-xs text-slate-600 font-medium">
                        Optimizing image for gallery...
                      </p>
                    </div>
                  ) : uploadImageSrc ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-h-48 rounded-lg overflow-hidden border border-slate-200 mb-3 bg-slate-900">
                        <img
                          src={uploadImageSrc}
                          alt="Preview"
                          className="w-full h-48 object-contain"
                        />
                      </div>
                      <span className="text-xs text-red-600 font-semibold hover:underline">
                        Click or drag to change image
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-2">
                      <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                        <Camera className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        Drag and drop your image here, or{' '}
                        <span className="text-red-600 underline">browse files</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Supports JPEG, PNG, WebP
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Title */}
              <div>
                <label
                  htmlFor="upload-photo-title"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Photo Title *
                </label>
                <input
                  id="upload-photo-title"
                  type="text"
                  required
                  placeholder="e.g., Reception Waiting Area or Lab Analyzer"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-600"
                />
              </div>

              {/* Category Selection */}
              <div>
                <label
                  htmlFor="upload-photo-category"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Category
                </label>
                <select
                  id="upload-photo-category"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-600"
                >
                  <option value="Facility Exterior">Facility Exterior</option>
                  <option value="Daytime Exterior">Daytime Exterior</option>
                  <option value="Night & Illuminated">Night & Illuminated</option>
                  <option value="Entrance & Totem Sign">Entrance & Totem Sign</option>
                  <option value="3D Rooftop Billboard">3D Rooftop Billboard</option>
                  <option value="Laboratory & Equipment">Laboratory & Equipment</option>
                  <option value="Sample Collection">Sample Collection</option>
                  <option value="Reception & Waiting">Reception & Waiting</option>
                  <option value="custom">+ Create Custom Category...</option>
                </select>
              </div>

              {uploadCategory === 'custom' && (
                <div>
                  <label
                    htmlFor="custom-category-input"
                    className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                  >
                    Custom Category Name *
                  </label>
                  <input
                    id="custom-category-input"
                    type="text"
                    required
                    placeholder="e.g., Diagnostic Imaging"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-600"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label
                  htmlFor="upload-photo-desc"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="upload-photo-desc"
                  rows={2}
                  placeholder="Brief context or description of this facility area..."
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500/30 focus:border-red-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadImageSrc || isCompressing || uploadSuccess}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition-all ${
                    !uploadImageSrc || isCompressing || uploadSuccess
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Gallery</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {photoToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-left">
            <div className="w-11 h-11 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 font-display">
              Remove Photo from Gallery?
            </h3>

            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Are you sure you want to remove <strong>"{photoToDelete.title}"</strong> from the facility gallery? You can restore default photographs anytime using "Reset Defaults".
            </p>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setPhotoToDelete(null)}
                className="px-4 py-2 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDeletePhoto}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-xs transition-colors"
              >
                Yes, Remove Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click-to-Enlarge Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            {/* Top Lightbox Bar: Delete & Close Controls */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <button
                onClick={() => confirmDeletePhoto(activePhoto)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
                title="Remove this photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Photo</span>
              </button>

              <button
                onClick={closeLightbox}
                className="p-2 text-white hover:text-red-400 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Visual Area */}
            <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden bg-slate-900 border border-white/20 flex items-center justify-center">
              {!brokenImages[activePhoto.id] ? (
                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.title}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              ) : (
                <div className="p-12 text-center text-white">
                  <Building2 className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-display">{activePhoto.title}</h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">{activePhoto.description}</p>
                </div>
              )}

              {/* Prev / Next Controls */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevLightbox();
                    }}
                    className="absolute left-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-red-600 border border-white/20 text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextLightbox();
                    }}
                    className="absolute right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-red-600 border border-white/20 text-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption Under Lightbox */}
            <div className="w-full text-left text-white mt-4 p-4 rounded-xl bg-slate-900/80 border border-white/10">
              <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">
                {activePhoto.category}
              </span>
              <h4 className="text-lg font-bold font-display mt-0.5">{activePhoto.title}</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

