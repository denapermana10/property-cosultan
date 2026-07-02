import React, { useState } from 'react';
import { GalleryItem, GalleryCategory } from '../types';
import { Camera, MapPin, Calendar, X, Eye } from 'lucide-react';

interface GalleryPageProps {
  gallery: GalleryItem[];
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Foto', 'Drone', 'Interior', 'Exterior', 'Event'];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Dokumentasi Udara & Interior
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Galeri Foto Proyek & Liputan Drone
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Menampilkan keindahan sudut pandang udara kawasan perumahan Bandung Raya, kemewahan desain interior rumah contoh, dan kegiatan gathering bersama investor.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            {cat === 'All' ? 'Semua Foto' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative h-72 rounded-3xl overflow-hidden shadow-md cursor-pointer bg-gray-900 border border-gray-100 dark:border-gray-800 transform hover:-translate-y-1 transition duration-300"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                {item.category}
              </span>
            </div>

            {/* Hover icon */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-md">
              <Eye className="w-5 h-5" />
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              {item.location && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
              )}
              <h3 className="font-heading font-bold text-base sm:text-lg leading-tight text-white group-hover:text-emerald-300 transition">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <Calendar className="w-3 h-3 text-emerald-500" />
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-gray-900/90 flex items-center justify-between border-b border-gray-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase">{lightboxItem.category}</span>
                <h3 className="font-heading font-bold text-lg text-white">{lightboxItem.title}</h3>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="p-2 rounded-full bg-gray-800 hover:bg-red-500 text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex items-center justify-center bg-black p-2 sm:p-4">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-xl"
              />
            </div>

            {lightboxItem.description && (
              <div className="p-5 bg-gray-900 border-t border-gray-800 text-sm text-gray-300">
                <p className="leading-relaxed">{lightboxItem.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
