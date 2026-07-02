import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Calendar, 
  FileCheck, 
  Star,
  MapPin,
  Briefcase
} from 'lucide-react';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface AboutPageProps {
  onOpenLeadModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenLeadModal }) => {
  const keahlianList = [
    { title: 'Konsultan Properti & KPR', desc: 'Analisis kelayakan kredit, BI Checking, negosiasi bunga bank, serta simulasi angsuran yang pas dengan penghasilan.' },
    { title: 'Investasi Aset & Capital Gain', desc: 'Pemitraan pembukaan ruko komersial, villa sewaan staycation, dan kost eksekutif berpenghasilan pasif tinggi di Bandung.' },
    { title: 'Digital Marketing Property', desc: 'Penguasaan ekosistem iklan Meta Ads, TikTok Ads, dan Google Search Ads khusus sektor perumahan baru & secondary.' },
    { title: 'Due Diligence & Legalitas', desc: 'Pendampingan pemeriksaan keaslian SHM, AJB, IMB/PBG, dan PBB di hadapan Pejabat Pembuat Akta Tanah (PPAT).' },
    { title: 'Branding & Naming Developer', desc: 'Bantuan konsultasi konsep produk cluster, logo, brosur e-catalog, serta event grand launching bagi developer baru.' },
    { title: 'Foto & Video Liputan Drone', desc: 'Kemampuan dokumentasi udara resolusi 4K dan host presenter video review rumah yang viral di sosial media.' },
  ];

  const timelineKarir = [
    { year: '2025 - Sekarang', role: 'Principal & Founder RR Property Bandung', desc: 'Mendirikan dan memimpin jaringan pemasaran properti digital berfokus pada perumahan elite dan villa resort di Bandung Raya.' },
    { year: '2023 - 2025', role: 'Senior Sales Executive Agung Podomoro Land', desc: 'Mencatatkan prestasi penjualan Top Achiever di kawasan resort megah Podomoro Park Bandung dengan nilai transaksi puluhan milyar.' },
    { year: '2021 - 2023', role: 'Property Consultant Kota Baru Parahyangan', desc: 'Melayani pendampingan pembelian rumah dan ruko bagi ratusan keluarga dan eksekutif di Kota Baru Parahyangan Padalarang.' },
    { year: '2018 - 2021', role: 'Digital Marketing Specialist Property & Developer', desc: 'Mengelola periklanan digital bersponsor (Facebook Ads & Google Ads) untuk berbagai proyek perumahan syariah dan modern di Bandung Timur.' },
  ];

  const sertifikatDanPrestasi = [
    { title: 'Top Achiever Sales Executive 2024 & 2025', org: 'Agung Podomoro Land Bandung', year: '2025', icon: Award },
    { title: 'Sertifikasi Konsultan Properti Resmi (AREBI)', org: 'Asosiasi Real Estate Broker Indonesia', year: '2024', icon: ShieldCheck },
    { title: 'Digital Marketing Specialist Property Award', org: 'Indonesia Real Estate Digital Forum', year: '2023', icon: Star },
    { title: 'Lisensi PPAT Partner & Due Diligence Hukum Tanah', org: 'Ikatan Notaris & PPAT Jawa Barat', year: '2022', icon: FileCheck },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* Top Profile Intro Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl border border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="w-64 sm:w-80 h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30">
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
                <div className="font-heading font-extrabold text-xl">Dena Permana</div>
                <div className="text-[11px] font-medium text-orange-100">Consultant & Sales Exec</div>
              </div>
            </div>
          </div>

          {/* Intro Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Profil Resmi
            </div>
            
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
              Dena Permana
            </h1>
            <p className="text-emerald-400 font-semibold text-lg">
              Property Consultant • Digital Marketing Property • Sales Executive Bandung Raya
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Berkarier selama lebih dari 8 tahun di industri properti, saya berdedikasi menjadi konsultan yang tidak hanya memasarkan properti, melainkan memberikan edukasi finansial dan analisis objektif bagi setiap calon pembeli dan investor di Bandung Raya.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Bagi saya, kepuasan terbesar adalah melihat senyum bahagia sebuah keluarga saat menerima serah terima kunci rumah baru mereka, atau membantu investor meraih penghasilan pasif dari properti yang tepat.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openWhatsAppGeneral()}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Chat WhatsApp Langsung</span>
              </button>
              <button
                onClick={onOpenLeadModal}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition border border-white/20"
              >
                Jadwalkan Konsultasi Gratis
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Visi & Misi Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">Visi Profesional</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
            Menjadi konsultan properti dan digital marketer nomor satu yang paling dipercaya dan menjadi tolok ukur transparansi serta inovasi pemasaran di wilayah Bandung Raya dan sekitarnya.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">Misi Utama</h3>
          <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Memberikan bimbingan pembelian properti dengan legalitas dijamin 100% aman dan sah.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Mempermudah akses kepemilikan rumah melalui solusi simulasi KPR dan relasi bank terluas.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Membantu developer meningkatkan penjualan proyek melalui pemasaran digital yang modern dan efektif.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Keahlian Utama (6 Cards) */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-2">
            Kompetensi Profesional
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white">
            Keahlian & Bidang Spesialisasi
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            Perpaduan pengalaman eksekutif di lapangan dengan penguasaan teknologi pemasaran digital masa kini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keahlianList.map((skill, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold mb-4">
                0{idx + 1}
              </div>
              <h4 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-2">
                {skill.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Karir */}
      <div className="bg-gray-50 dark:bg-gray-900/50 p-8 sm:p-12 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-2">
            Perjalanan Karir
          </span>
          <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white">
            Timeline Pengalaman Profesional
          </h2>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-emerald-500/30">
          {timelineKarir.map((time, idx) => (
            <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${idx % 2 === 0 ? '' : ''}`}>
              
              {/* Dot */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white shadow font-bold text-xs shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                ✓
              </div>

              {/* Card content */}
              <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-md block w-fit mb-2">
                  {time.year}
                </span>
                <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white mb-1">
                  {time.role}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {time.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sertifikat & Prestasi */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-2">
            Bukti Kredibilitas
          </span>
          <h2 className="font-heading font-bold text-3xl text-gray-900 dark:text-white">
            Sertifikasi & Penghargaan Prestasi
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sertifikatDanPrestasi.map((cert, idx) => {
            const Icon = cert.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between text-center items-center transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-700 text-white flex items-center justify-center shadow-md mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-gray-900 dark:text-white mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cert.org}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 w-full text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Tahun {cert.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Box */}
      <div className="bg-emerald-600 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl flex flex-col items-center justify-center space-y-4">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl">
          Ingin Berdiskusi Langsung dengan Dena Permana?
        </h3>
        <p className="text-emerald-100 max-w-xl text-sm sm:text-base">
          Jadwalkan pertemuan survei lokasi atau konsultasi via Zoom/WhatsApp sekarang. Layanan kami tanpa dipungut biaya sedikit pun bagi pembeli!
        </p>
        <button
          onClick={() => openWhatsAppGeneral()}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2 mt-2"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Hubungi WhatsApp Sekarang</span>
        </button>
      </div>

    </div>
  );
};
