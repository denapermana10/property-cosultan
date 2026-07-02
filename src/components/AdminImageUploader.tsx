import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, X, Check, Loader2, Smartphone, Monitor } from 'lucide-react';

interface AdminImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helpText?: string;
}

export const AdminImageUploader: React.FC<AdminImageUploaderProps> = ({
  label = "Foto / Gambar",
  value,
  onChange,
  placeholder = "https://images.unsplash.com/...",
  helpText = "Pilih file foto dari galeri HP, kamera smartphone, atau folder desktop komputer Anda."
}) => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Upload from Desktop or Smartphone
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file format gambar (JPG, PNG, WEBP, atau HEIC)');
      return;
    }

    setIsCompressing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress & resize image to prevent localStorage 5MB quota overflow
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          onChange(compressedDataUrl);
          setUrlInput(compressedDataUrl);
        } else {
          const rawUrl = event.target?.result as string;
          onChange(rawUrl);
          setUrlInput(rawUrl);
        }
        setIsCompressing(false);
      };
      img.onerror = () => {
        alert('Gagal memuat file gambar.');
        setIsCompressing(false);
      };
      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      alert('Gagal membaca file dari perangkat.');
      setIsCompressing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3 bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 transition">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-xs uppercase tracking-wider text-gray-700 dark:text-gray-200 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{label}</span>
        </label>
        <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 p-0.5 rounded-lg text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>Upload File HP / PC</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('url');
              setUrlInput(value || '');
            }}
            className={`px-2 py-1 rounded-md transition flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-white dark:bg-gray-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Link URL</span>
          </button>
        </div>
      </div>

      {/* MODE 1: FILE UPLOAD FROM SMARTPHONE / DESKTOP */}
      {mode === 'upload' && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id={`file-upload-${label.replace(/[^a-zA-Z0-9]/g, '-')}`}
          />
          <label
            htmlFor={`file-upload-${label.replace(/[^a-zA-Z0-9]/g, '-')}`}
            className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-emerald-500/50 hover:border-emerald-500 dark:border-emerald-500/40 dark:hover:border-emerald-400 rounded-xl bg-white dark:bg-gray-900 cursor-pointer group transition hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20"
          >
            {isCompressing ? (
              <div className="flex flex-col items-center gap-2 py-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Memproses & mengkompresi foto dari perangkat...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    Klik untuk Pilih Foto dari Desktop / Hanphone
                  </div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 flex items-center justify-center gap-2">
                    <span className="flex items-center gap-0.5"><Smartphone className="w-3 h-3 text-emerald-500" /> Galeri / Kamera HP</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><Monitor className="w-3 h-3 text-emerald-500" /> Folder PC</span>
                  </div>
                </div>
              </>
            )}
          </label>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 italic">
            💡 {helpText} Foto akan dioptimalkan otomatis agar loading website tetap super cepat.
          </p>
        </div>
      )}

      {/* MODE 2: EXTERNAL LINK URL */}
      {mode === 'url' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder={placeholder}
              value={urlInput}
              onChange={(e) => {
                setUrlInput(e.target.value);
                onChange(e.target.value);
              }}
              className="flex-1 bg-white dark:bg-gray-900 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={handleUrlApply}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-sm shrink-0"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Pakai</span>
            </button>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 italic">
            💡 Masukkan link foto langsung dari Unsplash, Google Drive (shared link public), atau hosting gambar lainnya.
          </p>
        </div>
      )}

      {/* PREVIEW IMAGE */}
      {value && (
        <div className="relative mt-2 rounded-xl overflow-hidden bg-gray-900 border border-gray-300 dark:border-gray-700 h-36 flex items-center justify-center group shadow-md">
          <img
            src={value}
            alt="Preview upload"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 backdrop-blur-[2px]">
            <span className="text-white text-xs font-bold bg-black/60 px-2.5 py-1 rounded-lg">
              ✨ Foto Siap Digunakan
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow"
              title="Hapus Foto Ini"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-full transition shadow-md md:opacity-0 md:group-hover:opacity-100"
            title="Hapus / Ganti Foto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
