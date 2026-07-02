import React, { useState } from 'react';
import { PortfolioItem, PortfolioCategory } from '../types';
import { MapPin, Calendar, User, ExternalLink, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface PortfolioPageProps {
  portfolio: PortfolioItem[];
  onOpenLeadModal: () => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ portfolio, onOpenLeadModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Marketing', 'Branding', 'Landing Page', 'Property', 'Website'];

  const filteredPortfolio = selectedCategory === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Rekam Jejak Keberhasilan
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Portofolio Digital & Project Properti
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Karya digital marketing, branding developer, website landing page, dan liputan udara yang telah membantu mendongkrak omset pemasaran properti Bandung Raya.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat === 'All' ? 'Semua Kategori' : cat}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPortfolio.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedProject(item)}
            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1"
          >
            <div className="relative h-60 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                  {item.category}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white line-clamp-1 group-hover:text-emerald-300 transition">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{item.client}</span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md font-bold">
                  <Calendar className="w-3 h-3 text-emerald-600" />
                  <span>{item.year}</span>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 group-hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 group-hover:text-white font-bold text-xs transition flex items-center justify-center gap-1.5">
                <span>Lihat Studi Kasus Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">Portofolio Project</span>
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 text-center text-xs">
                <div>
                  <span className="text-gray-400 uppercase block">Kategori</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-sm mt-0.5">{selectedProject.category}</span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase block">Klien Resmi</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-sm mt-0.5">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase block">Lokasi Proyek</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-sm mt-0.5">{selectedProject.location}</span>
                </div>
                <div>
                  <span className="text-gray-400 uppercase block">Tahun Selesai</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">{selectedProject.year}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white">
                  Ringkasan & Hasil Pencapaian
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
                  {selectedProject.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    openWhatsAppGeneral("", "", "", `Saya tertarik untuk menggunakan jasa serupa dengan studi kasus proyek "${title}".`);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>Konsultasikan Kebutuhan Proyek Serupa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-gray-800 flex flex-col items-center justify-center space-y-4">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl">
          Butuh Solusi Pemasaran Digital atau Branding Developer?
        </h3>
        <p className="text-gray-400 max-w-xl text-sm">
          Kami siap membantu proyek perumahan atau brand Anda mencapai target penjualan tertinggi dengan strategi terukur.
        </p>
        <button
          onClick={onOpenLeadModal}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
        >
          Jadwalkan Diskusi Proyek
        </button>
      </div>

    </div>
  );
};
