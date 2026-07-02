import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { openWhatsAppGeneral } from '../lib/whatsapp';

export const FloatingActions: React.FC = () => {
  const [showTop, setShowTop] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const callPhone = () => {
    window.location.href = "tel:081324421411";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* WhatsApp Tooltip prompt */}
      {showTooltip && (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 rounded-2xl shadow-xl border border-emerald-500/30 max-w-xs animate-in fade-in slide-in-from-bottom duration-300 flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-gray-900 dark:text-white">Butuh Konsultasi Rumah?</p>
            <p className="text-gray-500 dark:text-gray-400">Chat langsung dengan Dena Permana di WhatsApp sekarang!</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-bold ml-1"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 items-end">
        {/* Back To Top Button */}
        {showTop && (
          <button
            onClick={scrollToTop}
            title="Kembali ke Atas"
            className="w-11 h-11 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300 transform hover:scale-110"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Telepon Button */}
        <button
          onClick={callPhone}
          title="Telepon Langsung (081324421411)"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 transition duration-300 transform hover:scale-110 group relative"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 bg-gray-900 text-white text-xs px-2.5 py-1 rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            Telepon 0813-2442-1411
          </span>
        </button>

        {/* WhatsApp Button with Ping effect */}
        <div className="relative">
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
          <button
            onClick={() => openWhatsAppGeneral()}
            title="Chat WhatsApp Resmi Dena Permana"
            className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/40 transition duration-300 transform hover:scale-110 group relative"
          >
            <MessageCircle className="w-7 h-7 fill-current" />
            <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Chat WhatsApp Dena Permana</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
