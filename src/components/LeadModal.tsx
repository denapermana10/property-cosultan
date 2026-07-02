import React, { useState } from 'react';
import { X, MessageCircle, ShieldCheck, CheckCircle2, User, Phone, Mail, MapPin, DollarSign, FileText } from 'lucide-react';
import { StorageAPI } from '../lib/storage';
import { openWhatsAppGeneral } from '../lib/whatsapp';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, defaultService = "" }) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Bandung Raya (Umum)');
  const [budget, setBudget] = useState('Rp 800 Juta - 1.5 Milyar');
  const [message, setMessage] = useState(defaultService ? `Konsultasi layanan: ${defaultService}` : '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Save to local storage database for Dena Permana Admin Dashboard
    StorageAPI.addLead({
      name,
      phone,
      email: email || '-',
      message: message || '-',
      budget,
      location,
      source: defaultService ? 'Layanan' : 'Form Kontak'
    });

    setSubmitted(true);

    // Open WhatsApp
    setTimeout(() => {
      openWhatsAppGeneral(name, location, budget, message);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Konsultasi Gratis
            </span>
            <span className="text-xs text-emerald-100 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Respons 15 Menit
            </span>
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl">
            {defaultService ? `Konsultasi ${defaultService}` : 'Jadwalkan Konsultasi & Survei Properti'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Isi formulir singkat ini agar Pak Dena Permana dapat menyiapkan rekomendasi unit terbaik untuk Anda.
          </p>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-xl text-gray-900 dark:text-white">
              Data Berhasil Disimpan!
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Sistem sedang mengarahkan Anda ke WhatsApp pribadi Pak Dena Permana...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nama Lengkap *</span>
              </label>
              <input
                type="text"
                required
                placeholder="cth: Bapak Hendra Gunawan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 px-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
              />
            </div>

            {/* No HP / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nomor WhatsApp / HP *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="cth: 081234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 px-4 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
              />
            </div>

            {/* Grid 2 Cols: Lokasi & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Area Dicari</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white"
                >
                  <option value="Bandung Raya (Umum)">Bandung Raya (Umum)</option>
                  <option value="Bandung Selatan (Bojongsoang)">Bandung Selatan (Bojongsoang)</option>
                  <option value="Bandung Barat (Padalarang/Cimahi)">Bandung Barat (Padalarang)</option>
                  <option value="Bandung Timur (Gedebage/Arcamanik)">Bandung Timur (Gedebage)</option>
                  <option value="Bandung Utara (Dago/Ciumbuleuit)">Bandung Utara (Dago Atas)</option>
                  <option value="Pusat Kota Bandung">Pusat Kota Bandung</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Rentang Budget</span>
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white"
                >
                  <option value="Di bawah Rp 600 Juta">Di bawah Rp 600 Juta</option>
                  <option value="Rp 600 Juta - 1 Milyar">Rp 600 Juta - 1 Milyar</option>
                  <option value="Rp 1 - 2 Milyar">Rp 1 - 2 Milyar</option>
                  <option value="Rp 2 - 4 Milyar font-bold">Rp 2 - 4 Milyar</option>
                  <option value="Di atas Rp 4 Milyar (Luxury)">Di atas Rp 4 Milyar (Luxury)</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Email (Opsional untuk brosur)</span>
              </label>
              <input
                type="email"
                placeholder="cth: hendra@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
              />
            </div>

            {/* Pesan */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                <span>Catatan Kebutuhan Properti</span>
              </label>
              <textarea
                rows={2}
                placeholder="cth: Ingin cari rumah 4 kamar dekat Tol Buah Batu untuk siap huni tahun ini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition duration-200 transform hover:-translate-y-0.5 mt-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Kirim & Hubungkan ke WhatsApp Dena</span>
            </button>
            
            <p className="text-[11px] text-gray-400 text-center">
              🔒 Data Anda dijamin kerahasiaannya dan langsung diterima oleh Pak Dena Permana.
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
