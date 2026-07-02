import React from 'react';
import { 
  Instagram, 
  Facebook, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Award,
  Video
} from 'lucide-react';
import { StorageAPI } from '../lib/storage';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const socialLinks = StorageAPI.getSocialLinks();

  const quickLinks = [
    { label: 'Tentang Saya', tab: 'about' },
    { label: 'Listing Properti', tab: 'properties' },
    { label: 'Layanan Konsultan', tab: 'services' },
    { label: 'Portofolio Digital', tab: 'portfolio' },
    { label: 'Galeri & Drone', tab: 'gallery' },
    { label: 'Video Marketing', tab: 'video' },
    { label: 'Artikel & SEO Blog', tab: 'blog' },
    { label: 'FAQ Properti', tab: 'faq' },
    { label: 'Kontak & Survei', tab: 'contact' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Top Pre-Footer Call to Action */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl tracking-tight mb-2">
              Siap Memiliki Rumah Impian di Bandung Raya?
            </h3>
            <p className="text-emerald-100 text-sm sm:text-base">
              Konsultasikan kebutuhan properti, estimasi KPR, atau rencana investasi Anda langsung bersama Dena Permana.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openWhatsAppGeneral()}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/30 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Hubungi WhatsApp Sekarang</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('properties');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition border border-white/20"
            >
              Lihat 8 Featured Properti
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-heading font-bold text-xl overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/d/1zPxQDf1D7WzPh3T9Pu0-lKzr-Xdt8fTU=s1000?authuser=0"
                  alt="Logo Dena Permana"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=1zPxQDf1D7WzPh3T9Pu0-lKzr-Xdt8fTU&sz=w1000';
                  }}
                />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Dena Permana
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Property Consultant & Digital Marketing Property resmi di wilayah Bandung Raya. Membantu pembelian rumah, investasi aset, dan strategi pemasaran developer.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Legalitas Terjamin SHM & AJB</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
              Menu Cepat
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setActiveTab(link.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-emerald-400 flex items-center gap-1.5 transition text-left"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2 border-l-4 border-orange-500 pl-3">
              Informasi Kontak
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  RR Property Bandung Office, Bandung Raya, Jawa Barat, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-white font-semibold">0813-2442-1411</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-gray-400">dena.permana@rrproperty.id</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="text-xs bg-gray-800 text-orange-400 px-2 py-1 rounded font-medium">
                  Sertifikasi AREBI & Konsultan Properti
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media RR Property Bandung */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
              Ikuti Sosial Media
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              Dapatkan update listing rumah promo, tips investasi, dan liputan video drone terbaru di akun resmi RR Property Bandung.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-gray-800/80 hover:bg-emerald-600 text-gray-300 hover:text-white transition group border border-gray-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-pink-400 group-hover:text-white" />
                  <span className="text-xs font-semibold">Instagram @rrpropertybandung</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition group border border-gray-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Video className="w-4 h-4 text-cyan-400 group-hover:text-white" />
                  <span className="text-xs font-semibold">TikTok @rrproperty_bandung</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>

              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-gray-800/80 hover:bg-blue-600 text-gray-300 hover:text-white transition group border border-gray-700/50"
              >
                <div className="flex items-center gap-2.5">
                  <Facebook className="w-4 h-4 text-blue-400 group-hover:text-white" />
                  <span className="text-xs font-semibold">Facebook RR Property</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <div>
            © {new Date().getFullYear()} Dena Permana – Property Consultant & Digital Portfolio. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">Sitemap XML</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
