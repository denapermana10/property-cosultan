import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Video, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';
import { StorageAPI } from '../lib/storage';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface ContactPageProps {
  onOpenLeadModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenLeadModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Konsultasi Beli Rumah');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const socialLinks = StorageAPI.getSocialLinks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    StorageAPI.addLead({
      name,
      phone,
      email: email || '-',
      message: `${subject} - ${message}`,
      budget: 'Konsultasi Form Kontak',
      location: 'Bandung Raya',
      source: 'Halaman Kontak'
    });

    setSubmitted(true);
    setTimeout(() => {
      openWhatsAppGeneral(name, "Bandung Raya", "Konsultasi", `${subject} - ${message}`);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }, 1500);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Terhubung Selama 24/7
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Hubungi Dena Permana
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Silakan hubungi kami untuk menjadwalkan survei ke lokasi perumahan, konsultasi analisis KPR, atau mendiskusikan kerja sama pemasaran digital bagi developer.
        </p>
      </div>

      {/* Main Grid: Info Cards (Left) & Form (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-2">
                Informasi Kontak Resmi
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Respon cepat di bawah 15 menit setiap jam kerja melalui WhatsApp & telepon.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">WhatsApp & Telepon</span>
                  <a href="https://wa.me/6281324421411" target="_blank" rel="noopener noreferrer" className="font-heading font-extrabold text-lg sm:text-xl text-gray-900 dark:text-white hover:text-emerald-600 transition">
                    0813-2442-1411
                  </a>
                  <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">🟢 Online Siap Melayani</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">Email Profesional</span>
                  <a href="mailto:denapermana.property@gmail.com" className="font-heading font-bold text-base text-gray-900 dark:text-white hover:text-orange-500 transition">
                    denapermana.property@gmail.com
                  </a>
                  <span className="text-[11px] text-gray-400 block mt-0.5">Untuk brosur PDF & proposal developer</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">Alamat Kantor Pemasaran</span>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    Podomoro Park / KBP Marketing Gallery, Kawasan Bandung Raya, Jawa Barat 40287
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase font-bold block">Jam Operasional Layanan</span>
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    Senin – Minggu (Setiap Hari)<br />
                    <span className="text-emerald-600 font-bold">08:00 – 21:00 WIB</span>
                  </p>
                  <span className="text-[11px] text-gray-400 italic block mt-0.5">*Survei Sabtu-Minggu disarankan booking H-1</span>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 block mb-3">Ikuti Social Media Kami:</span>
              <div className="flex items-center gap-3">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-black hover:text-white transition">
                  <Video className="w-5 h-5 text-cyan-400" />
                </a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-6 rounded-3xl shadow-lg flex items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-base">Butuh Respons Darurat?</h4>
              <p className="text-xs text-emerald-100 mt-0.5">Langsung klik tombol telepon atau WhatsApp pribadi Pak Dena sekarang.</p>
            </div>
            <button
              onClick={() => openWhatsAppGeneral()}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-3.5 rounded-2xl shadow-md shrink-0"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white">
                Pesan Berhasil Terkirim!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Sistem kami sedang mengarahkan pesan Anda ke WhatsApp pribadi Pak Dena Permana untuk mendapatkan balasan prioritas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                  Kirim Pesan Langsung
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-white">
                  Formulir Konsultasi & Survei
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Isi data Anda di bawah ini dan dapatkan analisis KPR serta katalog perumahan terbaru.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Bapak Budi Santoso"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="cth: 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    Email Anda (Opsional)
                  </label>
                  <input
                    type="email"
                    placeholder="cth: budi@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                    Topik / Kebutuhan
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
                  >
                    <option value="Konsultasi Beli Rumah">Konsultasi Beli Rumah</option>
                    <option value="Booking Survei Lokasi">Booking Survei Lokasi</option>
                    <option value="Jual Properti / Titip Listing">Jual Properti / Titip Listing</option>
                    <option value="Kerja Sama Digital Marketing">Kerja Sama Digital Marketing</option>
                    <option value="Simulasi & Analisis KPR">Simulasi & Analisis KPR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
                  Pesan & Catatan Spesifikasi Properti *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan detail properti yang Anda cari, misalnya rentang budget, lokasi favorit (Dago, Gedebage, Padalarang), atau rencana waktu survei..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition duration-200 flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/30 transform hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5" />
                <span>Kirim Pesan & Hubungkan ke WhatsApp</span>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Privasi Anda terjaga. Data langsung terkirim ke WhatsApp pribadi Dena Permana.</span>
              </div>
            </form>
          )}
        </div>

      </div>

      {/* Interactive Map Embed Simulation / Address View */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Lokasi Kawasan Pemasaran Bandung Raya</h4>
              <span className="text-xs text-gray-500">Melayani Kota Bandung, Kabupaten Bandung, Bandung Barat, dan Cimahi</span>
            </div>
          </div>
          <a
            href="https://maps.google.com/?q=Bandung"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-600 hover:underline"
          >
            Buka di Google Maps ↗
          </a>
        </div>

        <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-700 relative border border-gray-100 dark:border-gray-700">
          <img
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
            alt="Bandung Map Simulation"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent flex flex-col items-center justify-center text-center p-6">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl animate-bounce mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-2xl text-white drop-shadow-md">
              Marketing Gallery & Sales Office
            </h4>
            <p className="text-sm text-gray-200 max-w-md mt-1">
              Siap menyambut kedatangan Anda untuk survei rumah contoh dan pemaparan maket cluster setiap hari dari jam 08:00 sampai 21:00 WIB.
            </p>
            <button
              onClick={() => openWhatsAppGeneral("", "", "", "Halo Pak Dena, saya minta share location (Google Maps) akurat untuk kantor pemasaran.")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg transition"
            >
              Minta Share Location via WhatsApp
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
