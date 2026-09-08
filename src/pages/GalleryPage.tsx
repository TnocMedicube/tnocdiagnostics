import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Video,
  Play,
  Youtube,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { GalleryPhoto, GalleryVideo } from '../types';

export const GalleryPage: React.FC = () => {
  const { gallery, videos } = useCms();

  const [mediaType, setMediaType] = useState<'photos' | 'videos'>('photos');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPhoto, setActiveModalPhoto] = useState<GalleryPhoto | null>(null);
  const [activePlayingVideo, setActivePlayingVideo] = useState<GalleryVideo | null>(null);

  const activePhotos = gallery.filter((p) => p.isActive !== false);
  const publishedVideos = [...videos]
    .filter((v) => v.isPublished !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const categories = [
    'all',
    ...Array.from(new Set(activePhotos.map((p) => p.category))).filter(Boolean),
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? activePhotos
      : activePhotos.filter((p) => p.category === selectedCategory);

  // Helper to extract YouTube ID
  const extractYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Keyboard navigation for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalPhoto) return;

      if (e.key === 'Escape') {
        setActiveModalPhoto(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === activeModalPhoto.id);
        if (currentIndex < filteredPhotos.length - 1) {
          setActiveModalPhoto(filteredPhotos[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredPhotos.findIndex((p) => p.id === activeModalPhoto.id);
        if (currentIndex > 0) {
          setActiveModalPhoto(filteredPhotos[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalPhoto, filteredPhotos]);

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-purple-700" />
            <span>Visual Tour & Infrastructure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Facility Media Gallery
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a visual and video tour of TNOC Medical Diagnostic Facility (Maabara ya Msamvu). Experience our modern diagnostic rooms, sterile phlebotomy stations, automated laboratory systems, and exterior landmarks in Morogoro.
          </p>

          {/* Media Type Switcher: Photos vs Videos */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs mt-8">
            <button
              type="button"
              onClick={() => setMediaType('photos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mediaType === 'photos'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photographs ({activePhotos.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setMediaType('videos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mediaType === 'videos'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Tours ({publishedVideos.length})</span>
            </button>
          </div>

          {/* Photo Category Filter Pills (Only shown when mediaType === 'photos') */}
          {mediaType === 'photos' && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'all' ? 'All Photographs' : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 1. Photo Gallery Grid */}
        {mediaType === 'photos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActiveModalPhoto(photo)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                  <img
                    src={photo.imageSrc}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-blue-700" />
                      <span>Enlarge Image</span>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                    {photo.category}
                  </div>

                  {photo.isFeatured && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Hero Landmark
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-base mb-1.5">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {photo.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3 h-3 text-red-500" />
                      Msamvu, Morogoro
                    </span>
                    <span className="text-blue-700 font-semibold group-hover:underline">
                      View Photo →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Video Gallery Grid */}
        {mediaType === 'videos' && (
          <div className="space-y-6">
            {publishedVideos.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Video className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Videos Currently Published</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our clinical walkthrough videos are currently being updated. Please browse our high-resolution facility photographs.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {publishedVideos.map((video) => {
                  const ytId =
                    video.videoType === 'youtube'
                      ? extractYouTubeId(video.youtubeUrl || video.videoUrl)
                      : null;
                  const isPlaying = activePlayingVideo?.id === video.id;

                  return (
                    <div
                      key={video.id}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all"
                    >
                      {/* Video Player or Thumbnail */}
                      <div className="relative aspect-video bg-black w-full overflow-hidden">
                        {isPlaying ? (
                          video.videoType === 'youtube' && ytId ? (
                            <iframe
                              className="w-full h-full"
                              src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video
                              controls
                              autoPlay
                              src={video.videoUrl}
                              className="w-full h-full object-contain"
                            />
                          )
                        ) : (
                          <>
                            <img
                              src={video.thumbnailUrl || '/assets/tnoc_facility_day.jpg'}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setActivePlayingVideo(video)}
                                className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer"
                                aria-label={`Play ${video.title}`}
                              >
                                <Play className="w-7 h-7 ml-1 fill-white" />
                              </button>
                            </div>

                            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                              {video.videoType === 'youtube' ? (
                                <>
                                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                                  <span>YouTube Clinical Video</span>
                                </>
                              ) : (
                                <>
                                  <Video className="w-3.5 h-3.5 text-blue-400" />
                                  <span>Direct Video Tour</span>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Video Info */}
                      <div className="p-6">
                        <h3 className="font-bold text-slate-900 text-lg mb-2">
                          {video.title}
                        </h3>
                        {video.description && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                            {video.description}
                          </p>
                        )}

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            TNOC Msamvu Facility
                          </span>
                          {!isPlaying && (
                            <button
                              type="button"
                              onClick={() => setActivePlayingVideo(video)}
                              className="text-red-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <span>Watch Video</span>
                              <Play className="w-3 h-3 fill-red-600" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Locality Verification Notice */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 text-center">
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            All photographs and videos represent authentic facilities, automated analyzers, and staff environments of the TNOC Medical Diagnostic Facility in Msamvu, Morogoro. Visitors and walk-in patients are welcome during operating hours.
          </p>
        </div>
      </div>

      {/* Lightbox Modal for Photos */}
      {activeModalPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <div className="relative max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={activeModalPhoto.imageSrc}
                alt={activeModalPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Modal Details Bar */}
            <div className="p-6 bg-slate-900 text-white border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-1">
                  {activeModalPhoto.category}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {activeModalPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  {activeModalPhoto.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const idx = filteredPhotos.findIndex((p) => p.id === activeModalPhoto.id);
                    if (idx > 0) setActiveModalPhoto(filteredPhotos[idx - 1]);
                  }}
                  disabled={filteredPhotos.findIndex((p) => p.id === activeModalPhoto.id) === 0}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer"
                  title="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const idx = filteredPhotos.findIndex((p) => p.id === activeModalPhoto.id);
                    if (idx < filteredPhotos.length - 1) {
                      setActiveModalPhoto(filteredPhotos[idx + 1]);
                    }
                  }}
                  disabled={
                    filteredPhotos.findIndex((p) => p.id === activeModalPhoto.id) ===
                    filteredPhotos.length - 1
                  }
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer"
                  title="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
