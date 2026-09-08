import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Video,
  Youtube,
  Play,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { GalleryVideo } from '../../types';
import { AdminVideoModal } from './AdminVideoModal';

export const AdminVideosTab: React.FC = () => {
  const {
    videos,
    addGalleryVideo,
    updateGalleryVideo,
    deleteGalleryVideo,
    toggleVideoPublished,
    resetVideos,
  } = useCms();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<GalleryVideo | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (v: GalleryVideo) => {
    setEditingVideo(v);
    setModalOpen(true);
  };

  const handleSave = (videoData: any) => {
    if (editingVideo) {
      updateGalleryVideo(editingVideo.id, videoData);
    } else {
      addGalleryVideo(videoData);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete video "${title}" from the facility gallery?`)) {
      deleteGalleryVideo(id);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const sorted = [...videos].sort((a, b) => (a.order || 0) - (b.order || 0));
    const current = sorted[index];
    const prev = sorted[index - 1];

    const currentOrder = current.order || index + 1;
    const prevOrder = prev.order || index;

    updateGalleryVideo(current.id, { order: prevOrder });
    updateGalleryVideo(prev.id, { order: currentOrder });
  };

  const handleMoveDown = (index: number) => {
    const sorted = [...videos].sort((a, b) => (a.order || 0) - (b.order || 0));
    if (index >= sorted.length - 1) return;
    const current = sorted[index];
    const next = sorted[index + 1];

    const currentOrder = current.order || index + 1;
    const nextOrder = next.order || index + 2;

    updateGalleryVideo(current.id, { order: nextOrder });
    updateGalleryVideo(next.id, { order: currentOrder });
  };

  const sortedVideos = [...videos].sort((a, b) => (a.order || 0) - (b.order || 0));

  const extractYouTubeId = (url?: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>Video Gallery Management</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-semibold">
              {videos.length} Videos
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage video walkthroughs, clinical explanations, and YouTube embeds. Videos never autoplay with sound on public pages.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset videos to default clinical walkthroughs?')) {
                resetVideos();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Video</span>
          </button>
        </div>
      </div>

      {/* Videos List / Grid */}
      {sortedVideos.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Videos Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Upload clinical facility videos or embed YouTube links to showcase our modern diagnostic standards to patients.
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Video</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedVideos.map((video, idx) => {
            const ytId = video.videoType === 'youtube' ? extractYouTubeId(video.youtubeUrl || video.videoUrl) : null;
            const isPlaying = playingVideoId === video.id;

            return (
              <div
                key={video.id}
                className={`bg-white rounded-2xl overflow-hidden border transition-all ${
                  video.isPublished ? 'border-slate-200 shadow-2xs' : 'border-dashed border-slate-300 opacity-75'
                }`}
              >
                {/* Media Preview Box */}
                <div className="relative aspect-video bg-slate-950 w-full overflow-hidden">
                  {isPlaying ? (
                    video.videoType === 'youtube' && ytId ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1`}
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
                          onClick={() => setPlayingVideoId(video.id)}
                          className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                          title="Preview Video"
                        >
                          <Play className="w-6 h-6 ml-0.5 fill-white" />
                        </button>
                      </div>

                      {/* Video Type Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold">
                        {video.videoType === 'youtube' ? (
                          <>
                            <Youtube className="w-3.5 h-3.5 text-red-500" />
                            <span>YouTube Embed</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5 text-blue-400" />
                            <span>Direct Video File</span>
                          </>
                        )}
                      </div>

                      {/* Published status badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            video.isPublished
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {video.isPublished ? 'Published' : 'Hidden'}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {video.title}
                    </h3>
                    <span className="text-xs font-mono font-semibold text-slate-400 shrink-0">
                      Order: #{video.order || idx + 1}
                    </span>
                  </div>

                  {video.description && (
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {video.description}
                    </p>
                  )}

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        title="Move Up"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === sortedVideos.length - 1}
                        title="Move Down"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Toggle Publish button */}
                      <button
                        type="button"
                        onClick={() => toggleVideoPublished(video.id)}
                        className={`ml-2 px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                          video.isPublished
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {video.isPublished ? 'Live on Gallery' : 'Click to Publish'}
                      </button>
                    </div>

                    {/* Edit & Delete */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(video)}
                        className="p-1.5 rounded-lg border border-slate-200 text-blue-700 hover:bg-blue-50 transition-colors"
                        title="Edit video details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(video.id, video.title)}
                        className="p-1.5 rounded-lg border border-slate-200 text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Video Modal */}
      <AdminVideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialVideo={editingVideo}
      />
    </div>
  );
};
