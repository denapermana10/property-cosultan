import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, MessageCircle, CheckCircle2, ThumbsUp, Send, User, Building, Quote } from 'lucide-react';
import { StorageAPI } from '../lib/storage';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface TestimonialPageProps {
  testimonials: Testimonial[];
  onOpenLeadModal: () => void;
}

export const TestimonialPage: React.FC<TestimonialPageProps> = ({ testimonials, onOpenLeadModal }) => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) return;

    StorageAPI.addTestimonial({
      name,
      role: role || 'Pembeli Properti',
      review,
      rating,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      platform: 'Website Verified',
      isFeatured: true
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmitForm(false);
      setName('');
      setRole('');
      setReview('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Kepercayaan & Bukti Nyata
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Testimoni & Google Review
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Lebih dari 450 keluarga bahagia dan investor properti telah mempercayakan transaksi kepemilikan hunian mereka kepada tim profesional Dena Permana.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => setShowSubmitForm(!showSubmitForm)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md transition"
          >
            {showSubmitForm ? 'Tutup Formulir Review' : '✍️ Tulis Pengalaman / Testimoni Anda'}
          </button>
        </div>
      </div>

      {/* Google Review Badge Summary Box */}
      <div className="bg-gradient-to-r from-emerald-900 via-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white text-gray-900 flex flex-col items-center justify-center font-heading font-extrabold shadow-lg shrink-0">
            <span className="text-2xl text-emerald-600">4.9</span>
            <div className="flex items-center text-amber-400 text-[10px]">
              ★★★★★
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
              <span>Google Business Profile</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">Verified 100%</span>
            </div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl">
              RR Property Bandung – Dena Permana
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Berdasarkan 320+ ulasan positif pembeli perumahan dan ruko komersial di Bandung Raya.
            </p>
          </div>
        </div>
        <button
          onClick={() => openWhatsAppGeneral("", "", "", "Halo Pak Dena, saya ingin berkonsultasi setelah melihat ulasan positif di Google Review.")}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 text-xs sm:text-sm shrink-0 flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Konsultasi Sekarang via WhatsApp</span>
        </button>
      </div>

      {/* Submit Testimonial Form */}
      {showSubmitForm && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-emerald-500/40 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white">Terima Kasih Atas Review Anda!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Testimoni Anda telah tersimpan dan akan segera dipublish setelah verifikasi admin.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3 mb-4">
                <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Quote className="w-5 h-5 text-emerald-600" />
                  <span>Formulir Pengalaman Konsumen</span>
                </h3>
                <button type="button" onClick={() => setShowSubmitForm(false)} className="text-gray-400 hover:text-red-500">✕</button>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">Nama Anda *</label>
                <input
                  type="text"
                  required
                  placeholder="cth: Bapak Gunawan & Keluarga"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">Profesi / Status Pembelian</label>
                <input
                  type="text"
                  placeholder="cth: Pembeli Rumah Podomoro Park / Investor Ruko"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">Rating Bintang</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`p-2 rounded-xl transition ${
                        rating >= num ? 'bg-amber-100 text-amber-500 scale-110' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                  <span className="text-xs font-bold ml-2 text-emerald-600">({rating} dari 5 Bintang)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5">Ulasan & Pengalaman Pelayanan *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ceritakan bagaimana Pak Dena membantu proses pengajuan KPR, negosiasi harga, atau pelayanan survei lokasi..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Ulasan Sekarang</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testi) => (
          <div
            key={testi.id}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between transition relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-1 rounded-md border border-emerald-500/20">
                  {testi.platform}
                </span>
              </div>

              <Quote className="w-8 h-8 text-emerald-500/20 mb-2" />

              <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6">
                "{testi.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={testi.photo}
                  alt={testi.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-gray-900 dark:text-white">{testi.name}</h4>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">{testi.role}</span>
                </div>
              </div>
              <span className="text-[11px] text-gray-400 font-medium">
                {testi.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-gray-800 space-y-4">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl">
          Jadilah Bagian dari Ratusan Klien Bahagia Kami Berikutnya
        </h3>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Nikmati kemudahan beli rumah dengan bunga KPR terendah, bebas biaya SHM/AJB, dan pelayanan VIP dari Dena Permana.
        </p>
        <button
          onClick={onOpenLeadModal}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 inline-block"
        >
          Jadwalkan Konsultasi Sekarang
        </button>
      </div>

    </div>
  );
};
