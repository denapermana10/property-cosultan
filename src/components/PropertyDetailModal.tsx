import React, { useState } from 'react';
import { Property } from '../types';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  MessageCircle, 
  Download, 
  Share2, 
  CheckCircle2, 
  Video, 
  Image as ImageIcon, 
  Calculator, 
  Building2, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { openWhatsAppProperty } from '../lib/whatsapp';
import { KPRCalculator } from './KPRCalculator';
import { PropertyCard } from './PropertyCard';

interface PropertyDetailModalProps {
  property: Property | null;
  allProperties: Property[];
  onClose: () => void;
  onSelectProperty: (prop: Property) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({ 
  property, 
  allProperties, 
  onClose, 
  onSelectProperty 
}) => {
  if (!property) return null;

  const [activeTab, setActiveTab] = useState<'gallery' | 'video' | 'kpr' | 'map'>('gallery');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const similarProperties = allProperties
    .filter(p => p.id !== property.id && (p.cluster === property.cluster || Math.abs(p.priceNumeric - property.priceNumeric) < 1500000000))
    .slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadBrosur = () => {
    const text = `Halo Pak Dena Permana, mohon kirimkan e-Brosur lengkap dan Pricelist promo untuk properti *${property.title}*. Terima kasih.`;
    window.open(`https://wa.me/6281324421411?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              {property.cluster} • {property.developer}
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-gray-900 dark:text-white line-clamp-1">
              {property.title}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share Properti"
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition relative"
            >
              <Share2 className="w-5 h-5" />
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-gray-900 text-white text-[10px] px-2 py-1 rounded font-bold whitespace-nowrap shadow-md">
                  Link tersalin!
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-300 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          
          {/* Tab Selection */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'gallery'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Foto Galeri ({property.images.length})</span>
            </button>

            {property.videoUrl && (
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  activeTab === 'video'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>Video Tour 4K</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('kpr')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'kpr'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <Calculator className="w-4 h-4 text-orange-500" />
              <span>Simulasi KPR Unit Ini</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === 'map'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Peta Lokasi</span>
            </button>
          </div>

          {/* Tab Display: Gallery */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-gray-900 group">
                <img
                  src={property.images[currentImageIndex] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"}
                  alt={`${property.title} - Foto ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full font-bold backdrop-blur-md">
                      {currentImageIndex + 1} / {property.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {property.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        currentImageIndex === idx ? 'border-emerald-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab Display: Video */}
          {activeTab === 'video' && property.videoUrl && (
            <div className="aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-xl border border-gray-800">
              <iframe
                src={property.videoUrl}
                title={property.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Tab Display: Simulasi KPR */}
          {activeTab === 'kpr' && (
            <div className="animate-in fade-in duration-200">
              <KPRCalculator initialPrice={property.priceNumeric} initialTitle={property.title} />
            </div>
          )}

          {/* Tab Display: Peta Lokasi */}
          {activeTab === 'map' && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-6 text-center border border-gray-200 dark:border-gray-700 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                Lokasi Kawasan: {property.location}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                Kawasan {property.cluster} terintegrasi dengan akses gerbang tol, pusat perbelanjaan, sekolah internasional, serta fasilitas olahraga lengkap di Bandung Raya.
              </p>
              <div className="aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative flex items-center justify-center border border-gray-300 dark:border-gray-600">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80" 
                  alt="Map Placeholder" 
                  className="w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                  <span className="text-white font-bold text-lg mb-2">📍 {property.cluster} - Bandung Raya</span>
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(property.location + ' ' + property.cluster)}`, '_blank')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 transition"
                  >
                    <span>Buka Lokasi di Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Info Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Details & Description */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-emerald-50 dark:bg-gray-800/80 rounded-2xl border border-emerald-100 dark:border-gray-700">
                <div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold block uppercase">Harga Penawaran</span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                    {property.price}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadBrosur}
                    className="flex items-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-100 text-gray-800 dark:text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 transition"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Download e-Brosur</span>
                  </button>
                </div>
              </div>

              {/* Specs Grid */}
              <div>
                <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-3">
                  Spesifikasi Properti
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block">Luas Tanah</span>
                      <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{property.lt} m²</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block">Luas Bangunan</span>
                      <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{property.lb} m²</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                      <Bed className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block">Kamar Tidur</span>
                      <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{property.bedrooms} Kamar</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                      <Bath className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase block">Kamar Mandi</span>
                      <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{property.bathrooms} Kamar</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-2">
                  Deskripsi Lengkap
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-800">
                  {property.description}
                </p>
              </div>

              {/* Features & Facilities */}
              <div>
                <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-3">
                  Fasilitas & Keunggulan Cluster
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 text-xs font-semibold border border-emerald-100 dark:border-emerald-900/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Consultant Direct Contact Box */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6 rounded-3xl shadow-xl border border-gray-800 sticky top-24">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-800">
                  <img
                    src="https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0"
                    alt="Dena Permana"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg shadow-emerald-600/30 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P&sz=w1000';
                    }}
                  />
                  <div>
                    <h4 className="font-heading font-bold text-base text-white">
                      Dena Permana
                    </h4>
                    <p className="text-xs text-emerald-400 font-medium">
                      Official Property Consultant
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Respon Super Cepat</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  Tertarik dengan unit <strong>{property.title}</strong> ini? Segera jadwalkan survei lokasi atau dapatkan simulasi KPR dengan suku bunga terendah.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => openWhatsAppProperty(property.title, property.price, property.location)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition duration-200 transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>WhatsApp Dena Sekarang</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('kpr')}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition border border-gray-700 text-xs"
                  >
                    <Calculator className="w-4 h-4 text-orange-400" />
                    <span>Hitung Simulasi Cicilan KPR</span>
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800/80 text-center">
                  <span className="text-[11px] text-gray-400 block">
                    📞 Butuh telepon langsung? Hubungi:
                  </span>
                  <a href="tel:081324421411" className="text-sm font-bold text-white hover:text-emerald-400 transition">
                    0813-2442-1411
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Similar Properties Section */}
          {similarProperties.length > 0 && (
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>Properti Serupa di Bandung Raya</span>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-semibold">
                  Rekomendasi Dena
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((simProp) => (
                  <PropertyCard
                    key={simProp.id}
                    property={simProp}
                    onSelectProperty={(prop) => {
                      onSelectProperty(prop);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Fixed Action Footer for Mobile */}
        <div className="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-gray-400 block">Harga Promo</span>
            <div className="font-bold text-base text-emerald-600 dark:text-emerald-400">{property.price}</div>
          </div>
          <button
            onClick={() => openWhatsAppProperty(property.title, property.price, property.location)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-1.5 text-xs shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
