import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Video, Youtube, AlertCircle, Play, Check } from 'lucide-react';
import { GalleryVideo } from '../../types';
import { api } from '../../services/api';

interface AdminVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (videoData: any) => void;
  initialVideo?: GalleryVideo | null;
}

export const AdminVideoModal: React.FC<AdminVideoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialVideo,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoType, setVideoType] = useState<'upload' | 'youtube'>('youtube');
  const [videoUrl, setVideoUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [order, setOrder] = useState(1);

  useEffect(() => {
    if (initialVideo) {
      setTitle(initialVideo.title || '');
      setDescription(initialVideo.description || '');
      setVideoType(initialVideo.videoType || 'youtube');
      setVideoUrl(initialVideo.videoUrl || '');
      setYoutubeUrl(initialVideo.youtubeUrl || initialVideo.videoUrl || '');
      setThumbnailUrl(initialVideo.thumbnailUrl || '');
      setIsPublished(initialVideo.isPublished !== false);
      setOrder(initialVideo.order || 1);
    } else {
      setTitle('');
      setDescription('');
      setVideoType('youtube');
      setVideoUrl('');
      setYoutubeUrl('');
      setThumbnailUrl('/assets/tnoc_facility_day.jpg');
      setIsPublished(true);
      setOrder(1);
    }
  }, [initialVideo, isOpen]);

  if (!isOpen) return null;

  // Helper to extract YouTube video ID
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleYouTubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    setVideoUrl(url);

    // Auto-detect thumbnail from YouTube if not set
    const yId = extractYouTubeId(url);
    if (yId && (!thumbnailUrl || thumbnailUrl.includes('facility_day'))) {
      setThumbnailUrl(`https://img.youtube.com/vi/${yId}/hqdefault.jpg`);
    }
  };

  // Direct video file upload
  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgressText(`Uploading ${file.name}...`);

    try {
      const result = await api.uploadFile(file);
      setVideoUrl(result.url);
      setUploadProgressText('Upload complete!');
      setTimeout(() => setUploadProgressText(''), 3000);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}. Falling back to local preview.`);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setVideoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  // Thumbnail upload
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await api.uploadFile(file);
      setThumbnailUrl(result.url);
    } catch {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setThumbnailUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a video title.');
      return;
    }

    const effectiveUrl = videoType === 'youtube' ? youtubeUrl.trim() : videoUrl.trim();
    if (!effectiveUrl) {
      alert(videoType === 'youtube' ? 'Please enter a valid YouTube URL.' : 'Please upload or provide a video file URL.');
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      videoType,
      videoUrl: effectiveUrl,
      youtubeUrl: videoType === 'youtube' ? effectiveUrl : undefined,
      thumbnailUrl: thumbnailUrl.trim() || '/assets/tnoc_facility_day.jpg',
      isPublished,
      order: Number(order) || 1,
    });
    onClose();
  };

  const activeYtId = videoType === 'youtube' ? extractYouTubeId(youtubeUrl) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {initialVideo ? 'Edit Media Video' : 'Add Facility Video'}
              </h3>
              <p className="text-xs text-slate-400">
                Support for direct video storage files and embedded YouTube videos
              </p>
            </div>
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
          {/* Method Selection */}
          <div>
            <label className="block font-semibold text-slate-700 mb-2">Video Source Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVideoType('youtube')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                  videoType === 'youtube'
                    ? 'border-red-600 bg-red-50 text-red-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Youtube className="w-4 h-4 text-red-600" />
                <span>YouTube Video URL</span>
              </button>

              <button
                type="button"
                onClick={() => setVideoType('upload')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                  videoType === 'upload'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Upload className="w-4 h-4 text-blue-600" />
                <span>Upload Video File (MP4/WebM)</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Facility Tour & Modern Diagnostics at Msamvu"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Video URL or Upload */}
          {videoType === 'youtube' ? (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                YouTube URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={youtubeUrl}
                  onChange={handleYouTubeUrlChange}
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Enter any standard YouTube watch link or share link. The video player will format automatically.
              </p>

              {/* YouTube Preview */}
              {activeYtId && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">Embedded Preview:</span>
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${activeYtId}`}
                      title="YouTube preview"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Video File Upload <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-2">
                <input
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  onChange={handleVideoFileUpload}
                  disabled={isUploading}
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {uploadProgressText && (
                  <p className="text-xs font-medium text-blue-600">{uploadProgressText}</p>
                )}
                <div className="text-[11px] text-slate-500">
                  Or provide an existing video URL directly:
                </div>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="/uploads/sample-video.mp4 or https://..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono text-xs"
                />
              </div>

              {/* HTML5 Video Preview */}
              {videoUrl && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">Video Preview:</span>
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <video
                      controls
                      src={videoUrl}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the clinical video, walkthrough, or diagnostic procedure..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Cover / Thumbnail Image</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="/assets/... or image URL"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Status and Order */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
              <input
                type="number"
                min="1"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="font-semibold text-slate-800 text-xs">
                  Published on Public Media Gallery
                </span>
              </label>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold shadow-xs transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{initialVideo ? 'Update Video' : 'Save Video'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
