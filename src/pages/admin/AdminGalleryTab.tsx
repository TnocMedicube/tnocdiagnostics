import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Image as ImageIcon,
  Star,
  Check,
  X,
  Maximize2,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { GalleryPhoto } from '../../types';
import { AdminGalleryModal } from './AdminGalleryModal';

export const AdminGalleryTab: React.FC = () => {
  const {
    gallery,
    addGalleryPhoto,
    updateGalleryPhoto,
    deleteGalleryPhoto,
    setHeroPhoto,
    togglePhotoActive,
    resetGallery,
  } = useCms();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<GalleryPhoto | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingPhoto(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (p: GalleryPhoto) => {
    setEditingPhoto(p);
    setModalOpen(true);
  };

  const handleSave = (photoData: any) => {
    if (editingPhoto) {
      updateGalleryPhoto(editingPhoto.id, photoData);
    } else {
      addGalleryPhoto(photoData);
    }
  };

  const executeDelete = () => {
    if (photoToDelete) {
      deleteGalleryPhoto(photoToDelete.id);
      setPhotoToDelete(null);
    }
  };

  const executeReset = () => {
    resetGallery();
    setConfirmResetOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Facility Gallery Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Upload new photos, categorize spaces, select hero landmarks, and manage visibility
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
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((photo) => (
          <div
            key={photo.id}
            className={`bg-white rounded-2xl overflow-hidden border transition-all ${
              photo.isActive !== false
                ? 'border-slate-200 shadow-2xs'
                : 'border-slate-200 bg-slate-50 opacity-60'
            }`}
          >
            {/* Image Preview Container */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={photo.imageSrc}
                alt={photo.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                {photo.category}
              </div>

              {photo.isFeatured && (
                <div className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 fill-white" />
                  <span>Featured Hero</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                  {photo.title}
                </h3>
                <button
                  type="button"
                  onClick={() => togglePhotoActive(photo.id)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                    photo.isActive !== false
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {photo.isActive !== false ? 'Active' : 'Inactive'}
                </button>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2">
                {photo.description}
              </p>

              {/* Actions Toolbar */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setHeroPhoto(photo.id)}
                  className={`inline-flex items-center gap-1 font-semibold ${
                    photo.isFeatured
                      ? 'text-amber-600'
                      : 'text-slate-500 hover:text-amber-600'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${photo.isFeatured ? 'fill-amber-500' : ''}`} />
                  <span>{photo.isFeatured ? 'Hero Active' : 'Set as Hero'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(photo)}
                    className="p-1 rounded-md text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                    title="Edit Photo"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setPhotoToDelete(photo)}
                    className="p-1 rounded-md text-slate-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    title="Delete Photo"
                    aria-label={`Delete photo ${photo.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {photoToDelete && (
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
                Delete Facility Photograph?
              </h3>
              <p className="text-xs text-slate-500 text-center mb-4">
                Are you sure you want to remove this photograph from the public gallery and website?
              </p>

              {/* Photo summary card */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                <div className="w-16 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0">
                  <img
                    src={photoToDelete.imageSrc}
                    alt={photoToDelete.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {photoToDelete.title}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {photoToDelete.category}
                  </div>
                  {photoToDelete.isFeatured && (
                    <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500" />
                      Current Featured Hero Landmark
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPhotoToDelete(null)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeDelete}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Photo</span>
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
                Reset Gallery to Defaults?
              </h3>
              <p className="text-xs text-slate-500 text-center mb-6">
                This will restore the standard verified TNOC facility photographs and remove custom added items.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmResetOpen(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeReset}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Gallery</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Modal */}
      <AdminGalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialPhoto={editingPhoto}
      />
    </div>
  );
};
