import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { 
  Home, 
  Tag, 
  Search, 
  TrendingUp, 
  Share2, 
  Award, 
  Layout, 
  Camera, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { openWhatsAppService } from '../lib/whatsapp';

interface ServicesPageProps {
  services: ServiceItem[];
  onOpenLeadModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ services, onOpenLeadModal }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'Tag': return Tag;
      case 'Search': return Search;
      case 'TrendingUp': return TrendingUp;
      case 'Share2': return Share2;
      case 'Award': return Award;
      case 'Layout': return Layout;
      case 'Camera': return Camera;
      case 'Video': return Video;
      default: return Home;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Solusi Terpadu & Terpercaya
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Layanan Konsultan Properti & Digital
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Menyediakan 9 layanan komprehensif mulai dari jual beli rumah, hitungan investasi anti-rugi, hingga pemasaran digital untuk developer Bandung Raya.
        </p>
      </div>

      {/* Services Grid (9 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv, idx) => {
          const IconComponent = getIcon(srv.iconName);
          return (
            <div
              key={srv.id}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-gray-400 dark:text-gray-500">
                    #0{idx + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {srv.shortDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {srv.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {srv.priceStart && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <span>Estimasi Biaya:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{srv.priceStart}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedService(srv)}
                    className="py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-semibold text-xs transition"
                  >
                    Pelajari Detail
                  </button>
                  <button
                    onClick={() => openWhatsAppService(srv.title)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Konsultasi</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 text-white relative">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                ✕
              </button>
              <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-2 inline-block">
                Detail Layanan
              </span>
              <h3 className="font-heading font-bold text-2xl">
                {selectedService.title}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                {selectedService.shortDesc}
              </p>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-2">
                  Deskripsi Lengkap Layanan
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                  {selectedService.fullDesc}
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-3">
                  Cakupan Manfaat & Fasilitas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-xs font-semibold border border-emerald-100 dark:border-emerald-800/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    onOpenLeadModal(title);
                  }}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-800 dark:text-white font-bold py-3.5 rounded-xl transition text-xs text-center"
                >
                  Isi Form Jadwal Konsultasi
                </button>

                <button
                  onClick={() => openWhatsAppService(selectedService.title)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{selectedService.ctaText} via WA</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Trust Guarantee Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>GARANSI KEPUASAN & LEGALITAS</span>
          </div>
          <h3 className="font-heading font-bold text-2xl">
            Bingung Memilih Layanan yang Tepat?
          </h3>
          <p className="text-gray-400 text-sm">
            Dena Permana memberikan sesi konsultasi awal gratis selama 30 menit melalui telepon atau Zoom Meeting.
          </p>
        </div>
        <button
          onClick={() => onOpenLeadModal('Konsultasi Awal Gratis')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 shrink-0"
        >
          Booking Sesi Gratis Sekarang
        </button>
      </div>

    </div>
  );
};
