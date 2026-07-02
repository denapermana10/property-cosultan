import React, { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, MessageCircle, Search, CheckCircle2 } from 'lucide-react';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface FAQPageProps {
  faqs: FAQItem[];
  onOpenLeadModal: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ faqs, onOpenLeadModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Umum', 'Pembelian', 'Penjualan', 'Investasi', 'KPR', 'Legalitas'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Pusat Informasi & Solusi
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Temukan jawaban cepat mengenai proses pembelian rumah, persyaratan pengajuan KPR, biaya legalitas SHM/AJB, hingga keuntungan investasi properti bersama Dena Permana.
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Cari pertanyaan... (cth: KPR, BI Checking, SHM, biaya komisi)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-gray-800 pl-12 pr-4 py-4 rounded-2xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white shadow-md transition"
        />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
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
            {cat === 'All' ? 'Semua Kategori' : cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white dark:bg-gray-800 border-emerald-500/50 shadow-xl'
                    : 'bg-white dark:bg-gray-800/80 border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-lg uppercase shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-emerald-500 text-white' : 'text-gray-500'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-gray-100 dark:border-gray-700/50 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 animate-in slide-in-from-top-2 duration-200">
                    <p>{faq.answer}</p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Informasi terverifikasi oleh Dena Permana (Property Consultant).</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-12 text-center space-y-3 border border-gray-200 dark:border-gray-700">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto" />
            <h4 className="font-bold text-lg text-gray-800 dark:text-white">Pertanyaan Tidak Ditemukan</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Silakan coba kata kunci lain atau tanyakan langsung kepada Pak Dena via WhatsApp.</p>
          </div>
        )}
      </div>

      {/* Need More Help Box */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-4 max-w-4xl mx-auto border border-emerald-500">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl">
          Belum Menemukan Jawaban atas Pertanyaan Anda?
        </h3>
        <p className="text-emerald-100 max-w-xl mx-auto text-sm sm:text-base">
          Tim RR Property siap memberikan konsultasi secara privat terkait kendala BI checking, hitungan pajak pembeli/penjual, atau negosiasi harga ke developer.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => openWhatsAppGeneral()}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl transition transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Chat Tanya Jawab via WhatsApp</span>
          </button>
          <button
            onClick={onOpenLeadModal}
            className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-7 py-3.5 rounded-2xl shadow-lg transition"
          >
            Jadwalkan Telepon Konsultasi
          </button>
        </div>
      </div>

    </div>
  );
};
