import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Layers, 
  Grid, 
  Image, 
  Video, 
  FileText, 
  HelpCircle, 
  PhoneCall, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  MessageCircle, 
  Lock, 
  Unlock,
  ShieldCheck
} from 'lucide-react';
import { StorageAPI } from '../lib/storage';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  onOpenLeadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isAdmin, 
  setIsAdmin,
  onOpenLeadModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(StorageAPI.getDarkMode());

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    StorageAPI.setDarkMode(nextDark);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'Tentang Saya', icon: User },
    { id: 'properties', label: 'Listing Properti', icon: Grid },
    { id: 'services', label: 'Layanan', icon: Briefcase },
    { id: 'portfolio', label: 'Portofolio', icon: Layers },
    { id: 'gallery', label: 'Galeri', icon: Image },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Kontak', icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      {/* Top Banner Alert */}
      <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Promo 2026</span>
        <span>Konsultasi Properti & Survei Lokasi Bandung Raya 100% GRATIS!</span>
        <button 
          onClick={onOpenLeadModal}
          className="underline font-bold hover:text-orange-200 transition"
        >
          Booking Sekarang →
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/d/1zPxQDf1D7WzPh3T9Pu0-lKzr-Xdt8fTU=s1000?authuser=0"
                alt="Logo Dena Permana"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=1zPxQDf1D7WzPh3T9Pu0-lKzr-Xdt8fTU&sz=w1000';
                }}
              />
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-gray-900 dark:text-white flex items-center gap-1.5">
                Dena Permana <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide">
                Property Consultant Bandung
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Dark Mode"
              className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            {/* Admin Toggle */}
            <button
              onClick={() => {
                if (isAdmin) {
                  setIsAdmin(false);
                  handleNavClick('home');
                } else {
                  handleNavClick('admin');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition ${
                activeTab === 'admin' || isAdmin
                  ? 'bg-orange-500 border-orange-500 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-500'
              }`}
            >
              {isAdmin ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              {isAdmin ? 'Admin Mode' : 'Panel Admin'}
            </button>

            {/* WhatsApp CTA */}
            <button
              onClick={() => openWhatsAppGeneral()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 transition duration-200 transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Konsultasi WA</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (isAdmin) {
                  setIsAdmin(false);
                  handleNavClick('home');
                } else {
                  handleNavClick('admin');
                }
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-sm"
            >
              <Lock className="w-4 h-4" />
              {isAdmin ? 'Keluar Mode Admin' : 'Masuk Panel Admin (Dashboard)'}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsAppGeneral();
              }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Hubungi WhatsApp Dena Permana</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
