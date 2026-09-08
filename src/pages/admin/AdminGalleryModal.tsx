import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { GalleryPhoto } from '../../types';

interface AdminGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (photoData: any) => void;
  initialPhoto?: GalleryPhoto | null;
}

export const AdminGalleryModal: React.FC<AdminGalleryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPhoto,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Facility Exterior');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('/assets/tnoc_facility_day.jpg');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialPhoto) {
      setTitle(initialPhoto.title || '');
      setCategory(initialPhoto.category || 'Facility Exterior');
      setDescription(initialPhoto.description || '');
      setImageSrc(initialPhoto.imageSrc || '');
      setIsFeatured(Boolean(initialPhoto.isFeatured));
      setIsActive(initialPhoto.isActive !== false);
    } else {
      setTitle('');
      setCategory('Facility Exterior');
      setDescription('');
      setImageSrc('/assets/tnoc_facility_day.jpg');
      setIsFeatured(false);
      setIsActive(true);
    }
  }, [initialPhoto, isOpen]);

  if (!isOpen) return null;

  // Handle local file upload via FileReader to Base64 data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      imageSrc: imageSrc.trim(),
      isFeatured,
      isActive,
      order: 99,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">
              {initialPhoto ? 'Edit Facility Photograph' : 'Add Facility Photograph'}
            </h3>
            <p className="text-xs text-slate-400">
              Manage facility pictures, categories, descriptions, and hero feature status
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Photograph Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Clinical Laboratory Diagnostic Workstation"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="Facility Exterior">Facility Exterior</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Reception & Entrance">Reception & Entrance</option>
                <option value="Night View">Night View</option>
                <option value="Equipment & Diagnostics">Equipment & Diagnostics</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Upload Photo File
              </label>
              <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-400 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold cursor-pointer text-xs">
                <Upload className="w-4 h-4 text-blue-600" />
                <span>Choose Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Or Image URL / Path *
            </label>
            <input
              type="text"
              required
              value={imageSrc}
              onChange={(e) => setImageSrc(e.target.value)}
              placeholder="/assets/tnoc_facility_day.jpg or https://..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-mono text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          {/* Image Preview */}
          {imageSrc && (
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-44 flex items-center justify-center">
              <img
                src={imageSrc}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Description / Caption *
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Clear caption describing the facility space or medical equipment..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">Active (Visible in Gallery)</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500"
              />
              <span className="font-semibold text-slate-800">Featured (Homepage Hero Landmark)</span>
            </label>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-md transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{initialPhoto ? 'Save Photograph' : 'Add to Gallery'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
