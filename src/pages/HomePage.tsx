import React from 'react';
import { 
  Property, 
  Testimonial, 
  ServiceItem 
} from '../types';
import { 
  MessageCircle, 
  Search, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Star, 
  Clock, 
  MapPin, 
  UserCheck, 
  Video, 
  Instagram, 
  Facebook, 
  Sparkles,
  Building,
  Play
} from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { openWhatsAppGeneral } from '../lib/whatsapp';
import { StorageAPI } from '../lib/storage';

interface HomePageProps {
  properties: Property[];
  services: ServiceItem[];
  testimonials: Testimonial[];
  onSelectProperty: (prop: Property) => void;
  setActiveTab: (tab: string) => void;
  onOpenLeadModal: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  properties,
  services,
  testimonials,
  onSelectProperty,
  setActiveTab,
  onOpenLeadModal
}) => {
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 8);
  const socialLinks = StorageAPI.getSocialLinks();

  const keunggulanList = [
    {
      title: 'Profesional & Berpengalaman',
      desc: 'Lebih dari 8 tahun berkecimpung dalam pemasaran perumahan eksklusif di Bandung Raya.',
      icon: Award,
      color: 'bg-emerald-500'
    },
    {
      title: 'Respon Super Cepat 15 Menit',
      desc: 'Siap melayani konsultasi KPR dan pertanyaan spesifikasi melalui WhatsApp setiap hari.',
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      title: 'Harga & Promo Terbaik',
      desc: 'Akses langsung ke diskon developer, free biaya-biaya, serta suku bunga KPR promo.',
      icon: TrendingUp,
      color: 'bg-orange-500'
    },
    {
      title: 'Legalitas Dijamin Aman',
      desc: 'Setiap listing telah melalui due diligence sertifikat SHM, AJB, IMB, dan PBB.',
      icon: ShieldCheck,
      color: 'bg-emerald-600'
    },
    {
      title: 'Gratis Konsultasi KPR',
      desc: 'Bantuan analisis BI Checking dan perhitungan angsuran ke 10+ bank rekanan resmi.',
      icon: UserCheck,
      color: 'bg-indigo-500'
    },
    {
      title: 'Gratis Survei Lokasi',
      desc: 'Fasilitas antar-jemput survei unit rumah contoh di Podomoro, KBP, Summarecon, dll.',
      icon: MapPin,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-950 text-white pt-8 pb-16">
        
        {/* Drone Video Simulation Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
            alt="Bandung Real Estate Drone View"
            className="w-full h-full object-cover opacity-35 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Konsultasi Properti & Investasi Bandung Raya</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none text-white drop-shadow-lg">
                Membantu Anda Menemukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Properti Impian</span> di Bandung Raya
              </h1>

              <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Konsultan Properti • Investasi • Jual Beli Rumah • Digital Marketing Property • Sales Executive. Dibimbing langsung oleh <strong className="text-white font-semibold">Dena Permana</strong> dengan garansi legalitas SHM & promo KPR terbaik.
              </p>

              {/* Action Button Group */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => openWhatsAppGeneral()}
                  className="flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-heading font-bold text-base px-7 py-4 rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  <span>Hubungi WhatsApp Sekarang</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('properties');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-base px-6 py-4 rounded-2xl backdrop-blur-md transition shadow-lg border border-emerald-500/30"
                >
                  <Search className="w-5 h-5" />
                  <span>Lihat Listing Properti</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('portfolio');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-4 rounded-2xl backdrop-blur-md transition border border-white/20"
                >
                  <span>Portofolio Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-400">120+</div>
                  <div className="text-xs text-gray-400 font-medium">Properti Terjual</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-orange-400">450+</div>
                  <div className="text-xs text-gray-400 font-medium">Customer Puas</div>
                </div>
                <div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">8+ Thn</div>
                  <div className="text-xs text-gray-400 font-medium">Pengalaman Ahli</div>
                </div>
              </div>

            </div>

            {/* Right Hero: Dena Permana Photo Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                {/* Glowing border frame */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-orange-500 to-emerald-600 rounded-3xl blur-xl opacity-50 animate-pulse" />
                
                <div className="relative bg-gradient-to-b from-gray-900 to-gray-950 p-3 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
                  <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden bg-gray-800">
                    <img
                      src="https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0"
                      alt="Dena Permana - Property Consultant"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P&sz=w1000';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-90" />
                    
                    {/* Floating Info Overlay on Photo */}
                    <div className="absolute bottom-6 left-6 right-6 text-center sm:text-left">
                      <div className="inline-block bg-orange-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 shadow-sm">
                        Verified Sales Executive
                      </div>
                      <h3 className="font-heading font-extrabold text-2xl text-white">
                        Dena Permana
                      </h3>
                      <p className="text-xs text-emerald-300 font-medium mb-3">
                        Konsultan Properti & Investasi Bandung Raya
                      </p>
                      
                      <button
                        onClick={() => onOpenLeadModal()}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Jadwalkan Konsultasi Pribadi</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating badge 1: Real Estate AREBI */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-2.5 animate-bounce duration-[4000ms]">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-bold">Sertifikasi Resmi</div>
                    <div className="text-[10px] text-gray-500">AREBI & PPAT Partner</div>
                  </div>
                </div>

                {/* Floating badge 2: WhatsApp Super Fast */}
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-3.5 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-bold">WhatsApp 24/7</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">0813-2442-1411</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATISTIK ANIMATED COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 dark:border-gray-700 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center sm:text-left flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-heading font-extrabold text-2xl shrink-0">
              🏡
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">120+</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold">Property Terjual</div>
            </div>
          </div>

          <div className="text-center sm:text-left flex items-center gap-4 border-l-0 lg:border-l border-gray-100 dark:border-gray-700 lg:pl-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950 text-orange-600 flex items-center justify-center font-heading font-extrabold text-2xl shrink-0">
              🤝
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">450+</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold">Customer & Investor</div>
            </div>
          </div>

          <div className="text-center sm:text-left flex items-center gap-4 border-l-0 lg:border-l border-gray-100 dark:border-gray-700 lg:pl-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-heading font-extrabold text-2xl shrink-0">
              🏆
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">18+</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold">Project Cluster</div>
            </div>
          </div>

          <div className="text-center sm:text-left flex items-center gap-4 border-l-0 lg:border-l border-gray-100 dark:border-gray-700 lg:pl-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-heading font-extrabold text-2xl shrink-0">
              ⭐
            </div>
            <div>
              <div className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">8+ Thn</div>
              <div className="text-xs sm:text-sm text-gray-500 font-semibold">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEUNGGULAN (ICON CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-2">
            Mengapa Memilih Dena Permana?
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Keunggulan Layanan Konsultan Properti
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-3">
            Komitmen memberikan pengalaman pembelian dan penjualan properti paling mudah, transparan, dan menguntungkan di Bandung Raya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keunggulanList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <span>✓ {item.title}</span>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span>Pelayanan Prioritas</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED PROPERTY (GRID 8 PROPERTY TERBARU) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-2">
              Pilihan Utama Investor & Keluarga
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Featured Listing Properti Bandung
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              8 Properti terbaru di cluster terfavorit: Podomoro Park, Kota Baru Parahyangan, Summarecon, dan Dago.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold px-5 py-3 rounded-2xl transition w-fit"
          >
            <span>Lihat Semua Listing ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* 5. TENTANG SINGKAT DENA PERMANA */}
      <section className="bg-gradient-to-br from-emerald-900 via-gray-900 to-gray-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-3xl max-w-7xl mx-auto shadow-2xl border border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-72 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30">
                <img
                  src="https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0"
                  alt="Dena Permana Profile"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P&sz=w1000';
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-2xl shadow-xl border border-orange-400">
                <div className="font-heading font-extrabold text-2xl">8+ Tahun</div>
                <div className="text-xs font-medium">Dedikasi Properti</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 block">
              Mengenal Lebih Dekat
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight">
              Dena Permana: Mitra Terpercaya Investasi Properti Anda
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Hai, saya <strong>Dena Permana</strong>. Sebagai konsultan properti yang fokus di wilayah Bandung Raya, saya memahami bahwa membeli rumah bukan sekadar transaksi keuangan, melainkan langkah penting dalam membangun masa depan keluarga.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Dengan pemahaman mendalam tentang tata ruang Kota Bandung, tren capital gain, serta koneksi erat dengan developer bonafit dan notaris senior, saya memastikan setiap klien mendapatkan kepastian hukum SHM/AJB, negosiasi harga terbaik, dan persetujuan KPR yang cepat.
            </p>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">Anggota Resmi AREBI</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">Partner Resmi 15+ Bank</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">Ahli Negosiasi Harga</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-semibold">Spesialis Properti Bandung</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>Selengkapnya Tentang Dena</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenLeadModal()}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition border border-white/20"
              >
                Jadwalkan Konsultasi
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONI (SLIDER & GOOGLE REVIEW & VIDEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-2">
            Kata Mereka Yang Sudah Membeli
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Testimoni & Google Review Pembeli Rumah
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-2">
            Kepuasan dan kenyamanan investasi Anda adalah tolok ukur kesuksesan tertinggi bagi tim Dena Permana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.slice(0, 4).map((testi) => (
            <div
              key={testi.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between transition relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6">
                  "{testi.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={testi.photo}
                    alt={testi.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{testi.name}</h4>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">{testi.role}</span>
                  </div>
                </div>
                <span className="text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-bold text-gray-500">
                  {testi.platform}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SOCIAL MEDIA FEEDS (INSTAGRAM, TIKTOK, FACEBOOK) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 inline-block">
              Ikuti Perkembangan Terbaru
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 dark:text-white">
              RR Property Bandung di Sosial Media
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Dapatkan liputan video home tour, inspirasi desain rumah, dan pengumuman promo diskon eksklusif dari developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Instagram Feed Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Instagram Feed</h4>
                      <span className="text-xs text-gray-400">@rrpropertybandung</span>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative mb-4 flex items-center justify-center group">
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="IG Post" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-10 h-10 text-white fill-current opacity-80 group-hover:scale-110 transition" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                  🏡 Review rumah 2 lantai bergaya Scandinavian di Summarecon Bandung. View taman asri, siap KPR! #PropertyBandung
                </p>
              </div>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Buka Akun Instagram</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* TikTok Feed Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-black text-white">
                      <Video className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">TikTok Video</h4>
                      <span className="text-xs text-gray-400">@rrproperty_bandung</span>
                    </div>
                  </div>
                  <span className="text-xs bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded">Viral</span>
                </div>
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative mb-4 flex items-center justify-center group">
                  <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" alt="TikTok Post" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-10 h-10 text-cyan-400 fill-current opacity-80 group-hover:scale-110 transition" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                  ✨ 5 Alasan kenapa hunian tepi danau Podomoro Park Bandung jadi rebutan sultan! Tonton sampai habis ya guys!
                </p>
              </div>
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Tonton TikTok RR Property</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Facebook Feed Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">Facebook Page</h4>
                      <span className="text-xs text-gray-400">RR Property Bandung</span>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Community</span>
                </div>
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden relative mb-4 flex items-center justify-center group">
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" alt="FB Post" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="w-10 h-10 text-white fill-current opacity-80 group-hover:scale-110 transition" />
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                  📢 OPEN HOUSE & SURVEI SERENTAK Minggu ini di Kota Baru Parahyangan Padalarang. Dapatkan promo diskon ratusan juta!
                </p>
              </div>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Ikuti Halaman Facebook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CTA BESAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 rounded-3xl p-8 sm:p-16 text-white text-center shadow-2xl relative overflow-hidden border border-emerald-500">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="bg-orange-500 text-white text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider inline-block shadow-md">
              Ambil Langkah Pertama Hari Ini
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
              Siap Memiliki Rumah Impian di Bandung Raya?
            </h2>

            <p className="text-emerald-100 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Jangan tunda rencanamu sampai harga properti naik lagi. Jadwalkan konsultasi gratis dan survei lokasi langsung bersama Dena Permana minggu ini!
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openWhatsAppGeneral()}
                className="flex items-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-heading font-extrabold text-lg px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-105 transition transform"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span>Hubungi Sekarang via WhatsApp</span>
              </button>

              <button
                onClick={() => onOpenLeadModal()}
                className="bg-white hover:bg-gray-100 text-gray-900 font-bold text-base px-7 py-4 rounded-2xl shadow-lg transition"
              >
                Jadwalkan Survei Gratis
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
