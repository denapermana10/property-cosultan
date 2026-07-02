import React, { useState, useMemo } from 'react';
import { Property, PropertyStatus } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, X, Building2, MapPin, DollarSign, Bed, RefreshCw } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';

interface PropertiesPageProps {
  properties: Property[];
  onSelectProperty: (prop: Property) => void;
  onOpenLeadModal: () => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ properties, onSelectProperty, onOpenLeadModal }) => {
  // Search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'lt-desc'>('default');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Clusters list derived
  const clusters = useMemo(() => {
    const list = properties.map(p => p.cluster);
    return ['All', ...Array.from(new Set(list))];
  }, [properties]);

  const statuses: ('All' | PropertyStatus)[] = ['All', 'Diperjualbelikan', 'Hot Offer', 'Booking', 'Sold Out'];

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Search
      const matchesSearch = searchQuery === '' || 
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.developer.toLowerCase().includes(searchQuery.toLowerCase());

      // Cluster
      const matchesCluster = selectedCluster === 'All' || prop.cluster === selectedCluster;

      // Status
      const matchesStatus = selectedStatus === 'All' || prop.status === selectedStatus;

      // Price Range
      let matchesPrice = true;
      if (selectedPriceRange === '< 1M') matchesPrice = prop.priceNumeric < 1000000000;
      else if (selectedPriceRange === '1M - 2.5M') matchesPrice = prop.priceNumeric >= 1000000000 && prop.priceNumeric <= 2500000000;
      else if (selectedPriceRange === '2.5M - 4M') matchesPrice = prop.priceNumeric > 2500000000 && prop.priceNumeric <= 4000000000;
      else if (selectedPriceRange === '> 4M') matchesPrice = prop.priceNumeric > 4000000000;

      // Bedrooms
      const matchesBedrooms = minBedrooms === 0 || prop.bedrooms >= minBedrooms;

      return matchesSearch && matchesCluster && matchesStatus && matchesPrice && matchesBedrooms;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceNumeric - b.priceNumeric;
      if (sortBy === 'price-desc') return b.priceNumeric - a.priceNumeric;
      if (sortBy === 'lt-desc') return b.lt - a.lt;
      return 0;
    });
  }, [properties, searchQuery, selectedCluster, selectedStatus, selectedPriceRange, minBedrooms, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCluster('All');
    setSelectedStatus('All');
    setSelectedPriceRange('All');
    setMinBedrooms(0);
    setSortBy('default');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block">
          Pilihan Eksklusif Bandung Raya
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-gray-900 dark:text-white">
          Listing Properti & Rumah Impian
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Temukan rumah baru dari developer ternama maupun rumah second strategis dengan harga promo terbaik. Gunakan fitur filter untuk menemukan spesifikasi yang tepat.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
        
        {/* Main Search Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama cluster, lokasi (Padalarang, Gedebage), atau developer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 pl-12 pr-4 py-3.5 rounded-2xl text-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-sm transition w-full sm:w-auto border ${
              showAdvancedFilters
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-emerald-500'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter Properti ({showAdvancedFilters ? 'Tutup' : 'Buka'})</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full sm:w-48 bg-gray-100 dark:bg-gray-700 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <option value="default">Urutkan: Rekomendasi</option>
              <option value="price-asc">Harga: Terendah ke Tertinggi</option>
              <option value="price-desc">Harga: Tertinggi ke Terendah</option>
              <option value="lt-desc">Luas Tanah: Terluas</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters Grid */}
        {showAdvancedFilters && (
          <div className="pt-6 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in slide-in-from-top duration-200">
            
            {/* Filter by Cluster */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cluster / Kawasan</span>
              </label>
              <select
                value={selectedCluster}
                onChange={(e) => setSelectedCluster(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                {clusters.map((c, i) => (
                  <option key={i} value={c}>{c === 'All' ? 'Semua Kawasan' : c}</option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Status Properti</span>
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                {statuses.map((s, i) => (
                  <option key={i} value={s}>{s === 'All' ? 'Semua Status' : s}</option>
                ))}
              </select>
            </div>

            {/* Filter by Price Range */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Rentang Harga</span>
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="All">Semua Harga</option>
                <option value="< 1M">Di bawah Rp 1 Milyar</option>
                <option value="1M - 2.5M">Rp 1 Milyar - 2.5 Milyar</option>
                <option value="2.5M - 4M">Rp 2.5 Milyar - 4 Milyar</option>
                <option value="> 4M">Di atas Rp 4 Milyar</option>
              </select>
            </div>

            {/* Filter by Kamar Tidur */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-emerald-600" />
                <span>Minimal Kamar Tidur</span>
              </label>
              <select
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-gray-900 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value={0}>Semua Kamar</option>
                <option value={2}>Minimal 2 Kamar</option>
                <option value={3}>Minimal 3 Kamar</option>
                <option value={4}>Minimal 4 Kamar</option>
                <option value={5}>Minimal 5+ Kamar</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Semua Filter</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Results Count Summary */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-semibold px-2">
        <div>
          Menampilkan <span className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredProperties.length}</span> dari total {properties.length} properti
        </div>
        {(searchQuery || selectedCluster !== 'All' || selectedStatus !== 'All' || selectedPriceRange !== 'All' || minBedrooms > 0) && (
          <button
            onClick={handleResetFilters}
            className="text-emerald-600 hover:underline"
          >
            Hapus Filter Aktif
          </button>
        )}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onSelectProperty={onSelectProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto text-gray-400 text-2xl">
            🏡
          </div>
          <h3 className="font-heading font-bold text-xl text-gray-800 dark:text-white">
            Properti Tidak Ditemukan
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Kami tidak menemukan unit yang cocok dengan kriteria filter Anda. Coba kurangi filter atau hubungi Pak Dena untuk mencarikan unit khusus secara offline.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleResetFilters}
              className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl text-xs"
            >
              Reset Filter
            </button>
            <button
              onClick={onOpenLeadModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md"
            >
              Minta Rekomendasi Khusus
            </button>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl flex flex-col items-center justify-center space-y-4">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl">
          Ingin Survei Langsung ke Cluster Pilihan Anda?
        </h3>
        <p className="text-emerald-100 max-w-xl text-sm">
          Kami menyediakan layanan antar-jemput survei lokasi gratis setiap hari Sabtu & Minggu untuk seluruh kawasan Bandung Raya.
        </p>
        <button
          onClick={onOpenLeadModal}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
        >
          Booking Jadwal Survei Gratis
        </button>
      </div>

    </div>
  );
};
