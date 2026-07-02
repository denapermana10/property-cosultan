import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Calendar, User, Clock, ArrowRight, Tag, Share2, MessageCircle, BookOpen, X } from 'lucide-react';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface BlogPageProps {
  posts: BlogPost[];
  onOpenLeadModal: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts, onOpenLeadModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Tips Membeli Rumah', 'Investasi', 'KPR & Keuangan', 'Legalitas & Hukum', 'Berita Properti'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Edukasi & Wawasan Finansial
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Artikel Properti & Tips Investasi
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Panduan lengkap mengenai tata cara pengajuan KPR, trik memilih lokasi rumah di Bandung, hukum pertanahan SHM, serta analisis pertumbuhan capital gain.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap pb-4">
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
            {cat === 'All' ? 'Semua Artikel' : cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1"
          >
            <div className="relative h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                  {post.category}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2.5">
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition mb-2">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Baca Artikel Selengkapnya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Read Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            
            <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                  {activeArticle.category}
                </span>
                <span className="text-xs text-gray-500">
                  {activeArticle.readTime}
                </span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-gray-900 dark:text-white leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 border-y border-gray-100 dark:border-gray-800 py-3">
                <span className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
                  <User className="w-4 h-4" />
                  {activeArticle.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {activeArticle.date}
                </span>
              </div>

              <div className="h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-gray-900 shadow-lg">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose dark:prose-invert max-w-none space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-normal">
                <p className="font-semibold text-lg text-gray-900 dark:text-white">
                  {activeArticle.excerpt}
                </p>
                <p>
                  Memilih properti di wilayah Bandung Raya memerlukan analisis yang matang dari berbagai aspek: kemudahan akses jalan tol (seperti Tol Buah Batu, Tol Pasteur, maupun exit Tol Gedebage yang terus berkembang), kepastian legalitas tanah, serta reputasi pengembang atau developer.
                </p>
                <p>
                  Banyak calon pembeli rumah pertama yang terjebak pada promo harga murah di awal tanpa memeriksa secara detail riwayat perizinan lahan, apakah tanah sudah berstatus SHM (Sertifikat Hak Milik) atau masih girik/letter C. Sebagai konsultan properti yang berpengalaman, kami selalu melakukan due diligence secara ketat sebelum sebuah unit dipasarkan ke konsumen.
                </p>
                <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white pt-2">
                  Tips Praktis Dari Dena Permana:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Periksa Kapasitas Angsuran KPR:</strong> Pastikan total cicilan bulanan seluruh utang Anda tidak melebihi 35% - 40% dari penghasilan rutin bulanan.</li>
                  <li><strong>Pilih Cluster dengan Sistem Keamanan 24 Jam:</strong> Lingkungan dengan one gate system dan CCTV sangat berdampak pada stabilitas harga jual kembali (capital gain).</li>
                  <li><strong>Manfaatkan Promo Free Biaya-Biaya:</strong> Saat ini banyak developer bonafit seperti Podomoro Park dan Summarecon yang memberikan subsidi BPHTB, AJB, dan biaya KPR.</li>
                </ul>
                <p>
                  Jika Anda masih ragu atau ingin mendiskusikan perhitungan kredit dan pilihan kawasan yang paling cocok dengan anggaran keluarga Anda, silakan hubungi tim kami untuk sesi konsultasi tatap muka atau via WhatsApp.
                </p>
              </div>

              {/* Author box */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-6 rounded-2xl border border-emerald-500/30 flex items-center gap-4">
                <img
                  src="https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0"
                  alt="Dena Permana"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P&sz=w1000';
                  }}
                />
                <div className="space-y-1">
                  <h4 className="font-heading font-bold text-base text-gray-900 dark:text-white">Ditulis oleh Dena Permana</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Property Consultant & Digital Marketing Property Bandung Raya dengan pengalaman lebih dari 8 tahun membantu 450+ konsumen.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                <button
                  onClick={() => {
                    const title = activeArticle.title;
                    setActiveArticle(null);
                    openWhatsAppGeneral("", "", "", `Halo Pak Dena, saya ingin berkonsultasi setelah membaca artikel "${title}".`);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Konsultasikan Topik Ini via WhatsApp</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Bottom Newsletter / Consultation CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl border border-gray-800 space-y-4">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl">
          Punya Pertanyaan Seputar KPR atau Hukum Tanah Properti?
        </h3>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Dapatkan konsultasi gratis 1 on 1 untuk menghitung simulasi cicilan dan analisis kelayakan kredit Anda bersama Dena Permana.
        </p>
        <button
          onClick={onOpenLeadModal}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 inline-block"
        >
          Jadwalkan Konsultasi Gratis
        </button>
      </div>

    </div>
  );
};
