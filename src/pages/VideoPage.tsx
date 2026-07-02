import React, { useState } from 'react';
import { VideoItem } from '../types';
import { Play, Video, ExternalLink, Instagram, Facebook, Tv, Eye } from 'lucide-react';
import { StorageAPI } from '../lib/storage';

interface VideoPageProps {
  videos: VideoItem[];
}

export const VideoPage: React.FC<VideoPageProps> = ({ videos }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);
  const socialLinks = StorageAPI.getSocialLinks();

  const platforms = ['All', 'YouTube', 'TikTok', 'Instagram', 'Facebook'];

  const filteredVideos = selectedPlatform === 'All'
    ? videos
    : videos.filter(v => v.platform.toLowerCase() === selectedPlatform.toLowerCase());

  const getPlatformBadge = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return { bg: 'bg-red-600', text: 'YouTube', icon: Tv };
      case 'tiktok':
        return { bg: 'bg-black text-cyan-400 border border-cyan-500/30', text: 'TikTok', icon: Video };
      case 'instagram':
        return { bg: 'bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600', text: 'Instagram', icon: Instagram };
      case 'facebook':
        return { bg: 'bg-blue-600', text: 'Facebook', icon: Facebook };
      default:
        return { bg: 'bg-emerald-600', text: platform, icon: Video };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Visual Review & Home Tour
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Liputan Video & Property Review
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Tonton review lengkap rumah contoh, analisis spesifikasi bangunan, liputan drone lingkungan cluster, serta video edukasi properti Bandung yang viral di TikTok dan Instagram.
        </p>
      </div>

      {/* Platform Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        {platforms.map((plat) => (
          <button
            key={plat}
            onClick={() => setSelectedPlatform(plat)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              selectedPlatform === plat
                ? 'bg-emerald-600 text-white shadow-md scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            {plat === 'All' ? 'Semua Platform' : plat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((item) => {
          const badge = getPlatformBadge(item.platform);
          const BadgeIcon = badge.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveVideoModal(item)}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-video w-full bg-gray-900 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className={`${badge.bg} text-white text-xs px-3 py-1 rounded-full font-bold shadow-md flex items-center gap-1.5`}>
                    <BadgeIcon className="w-3.5 h-3.5" />
                    <span>{badge.text}</span>
                  </span>
                </div>

                {item.views && (
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.views}</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>Putar Video Liputan</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal Player / Embed */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col">
            <div className="p-4 bg-gray-900 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-1 rounded-md uppercase">
                  {activeVideoModal.platform}
                </span>
                <h3 className="font-heading font-bold text-base text-white line-clamp-1">
                  {activeVideoModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-2 rounded-full bg-gray-800 hover:bg-red-500 text-white transition"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {activeVideoModal.videoUrl.includes('youtube.com') || activeVideoModal.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={activeVideoModal.videoUrl}
                  title={activeVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <Video className="w-10 h-10" />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-white">
                    Tonton Langsung di Aplikasi {activeVideoModal.platform}
                  </h4>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Karena kebijakan keamanan dari {activeVideoModal.platform}, video vertikal ini dapat diputar dengan kualitas terbaik di aplikasi resmi.
                  </p>
                  <a
                    href={
                      activeVideoModal.platform.toLowerCase() === 'tiktok' ? socialLinks.tiktok :
                      activeVideoModal.platform.toLowerCase() === 'instagram' ? socialLinks.instagram :
                      activeVideoModal.platform.toLowerCase() === 'facebook' ? socialLinks.facebook : '#'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition"
                  >
                    <span>Buka Video di {activeVideoModal.platform}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            <div className="p-5 bg-gray-900 border-t border-gray-800 space-y-2">
              <h4 className="font-bold text-white text-base">{activeVideoModal.title}</h4>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{activeVideoModal.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Social Account Quick Links Banner */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 sm:p-12 border border-gray-800 shadow-xl text-white text-center space-y-6">
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block">
          Official Media Channels
        </span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl max-w-xl mx-auto">
          Jangan Lewatkan Live Home Tour & Review Perumahan Terbaru!
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow Instagram</span>
          </a>
          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm border border-gray-700"
          >
            <Video className="w-5 h-5 text-cyan-400" />
            <span>Follow TikTok (@rrproperty)</span>
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-sm"
          >
            <Facebook className="w-5 h-5" />
            <span>Like Facebook Page</span>
          </a>
        </div>
      </div>

    </div>
  );
};
