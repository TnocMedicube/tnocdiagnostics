import { FACILITY_GALLERY } from '../data/testsData';
import { GalleryPhoto } from '../types';

export const FRONT_PHOTO_ID_KEY = 'tnoc_front_page_photo_id_v1';
export const GALLERY_STORAGE_KEY = 'tnoc_facility_gallery_photos_v2';
export const FRONT_PHOTO_EVENT = 'tnoc_front_photo_changed';

/**
 * Retrieves all currently available gallery photos (localStorage or default).
 */
export function getAllGalleryPhotos(): GalleryPhoto[] {
  try {
    const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse gallery photos from localStorage', e);
  }
  return FACILITY_GALLERY;
}

/**
 * Retrieves the currently active front page photo.
 */
export function getActiveFrontPhoto(): GalleryPhoto {
  const allPhotos = getAllGalleryPhotos();
  try {
    const savedId = localStorage.getItem(FRONT_PHOTO_ID_KEY);
    if (savedId) {
      const found = allPhotos.find((p) => p.id === savedId);
      if (found) {
        return found;
      }
    }
  } catch (e) {
    console.error('Failed to get active front photo ID', e);
  }
  // Default to the original facility photo or the first photo
  return allPhotos[0] || FACILITY_GALLERY[0];
}

/**
 * Sets the active front page photo and broadcasts the change.
 */
export function setActiveFrontPhoto(photo: GalleryPhoto): void {
  try {
    localStorage.setItem(FRONT_PHOTO_ID_KEY, photo.id);
  } catch (e) {
    console.error('Failed to set active front photo ID', e);
  }

  // Dispatch custom event for real-time reactivity across components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(FRONT_PHOTO_EVENT, {
        detail: photo,
      })
    );
  }
}
