import { 
  Property, 
  PortfolioItem, 
  ServiceItem, 
  BlogPost, 
  Testimonial, 
  GalleryItem, 
  VideoItem, 
  FAQItem, 
  SocialLinks, 
  SEOSettings 
} from '../types';

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  instagram: "https://www.instagram.com/rrpropertybandung?igsh=MWdvOWphZHN1djZxcw%3D%3D&utm_source=chatgpt.com",
  facebook: "https://www.facebook.com/share/1PdRBjApEW/?utm_source=chatgpt.com",
  tiktok: "https://www.tiktok.com/@rrproperty_bandung?_r=1&_t=ZS-97gMJVwgNIf&utm_source=chatgpt.com",
  whatsapp: "081324421411",
  youtube: "https://www.youtube.com/@denapermanaproperty"
};

export const INITIAL_SEO_SETTINGS: SEOSettings = {
  metaTitle: "Dena Permana – Property Consultant & Digital Portfolio Bandung Raya",
  metaDescription: "Konsultan Properti Terpercaya di Bandung Raya. Melayani Jual Beli Rumah, Investasi Properti, Digital Marketing Developer, Survei Lokasi, dan Simulasi KPR.",
  openGraphImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
  keywords: ["Property Bandung", "Jual Rumah Bandung", "Investasi Properti Bandung", "Konsultan Properti Bandung", "Dena Permana", "KPR Bandung"]
};

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "Cluster Brahmapuri - Podomoro Park Bandung Resort Luxury",
    slug: "cluster-brahmapuri-podomoro-park-bandung",
    price: "Rp 3.850.000.000",
    priceNumeric: 3850000000,
    location: "Bojongsoang, Bandung Selatan",
    cluster: "Podomoro Park Bandung",
    status: "Hot Offer",
    developer: "Agung Podomoro Land",
    lt: 160,
    lb: 185,
    bedrooms: 4,
    bathrooms: 4,
    carport: 2,
    description: "Hunian kelas resort bergaya modern tropis di tepi danau megah sepanjang 1 kilometer. Dilengkapi fasilitas clubhouse bintang 5, keamanan 24 jam dengan CCTV, sistem smart home, serta akses sangat dekat ke gerbang Tol Buah Batu dan Stasiun Kereta Cepat Whoosh.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    features: ["Lake View Resort", "Smart Home System", "Clubhouse Bintang 5", "Jogging Track Tepi Danau", "Underground Utilities", "Keamanan 24 Jam"],
    isFeatured: true,
    dateAdded: "2026-06-28"
  },
  {
    id: "prop-2",
    title: "Tatar Nayapatala - Kota Baru Parahyangan Padalarang",
    slug: "tatar-nayapatala-kota-baru-parahyangan",
    price: "Rp 2.950.000.000",
    priceNumeric: 2950000000,
    location: "Padalarang, Bandung Barat",
    cluster: "Kota Baru Parahyangan",
    status: "Diperjualbelikan",
    developer: "PT Lyman Property",
    lt: 144,
    lb: 160,
    bedrooms: 4,
    bathrooms: 3,
    carport: 2,
    description: "Rumah elegan dengan arsitektur berwawasan lingkungan di Kota Baru Parahyangan. Lingkungan asri, jalan boulevard lebar, dekat sekolah internasional, IKEA Padalarang, dan akses langsung Tol Padalarang serta stasiun Kereta Cepat.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Akses Langsung Tol Padalarang", "Dekat IKEA & Mall", "Solar Panel Ready", "Clubhouse & Olympic Pool", "Sekolah Internasional"],
    isFeatured: true,
    dateAdded: "2026-06-25"
  },
  {
    id: "prop-3",
    title: "Cluster Emily - Summarecon Bandung Gedebage",
    slug: "cluster-emily-summarecon-bandung",
    price: "Rp 2.450.000.000",
    priceNumeric: 2450000000,
    location: "Gedebage, Bandung Timur",
    cluster: "Summarecon Bandung",
    status: "Diperjualbelikan",
    developer: "PT Summarecon Agung Tbk",
    lt: 120,
    lb: 140,
    bedrooms: 3,
    bathrooms: 3,
    carport: 2,
    description: "Rumah 2 lantai modern tropis di jantung Bandung Timur. Hanya 5 menit dari Summarecon Mall Bandung (Summabarecon) dan stasiun Whoosh Tegalluar. Kawasan sangat berkembang untuk capital gain investasi tinggi.",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Dekat Summarecon Mall Bandung", "Akses Stasiun Whoosh", "Taman Tematik Cluster", "Keamanan CCTV 24 Jam", "Bebas Banjir"],
    isFeatured: true,
    dateAdded: "2026-06-22"
  },
  {
    id: "prop-4",
    title: "Dago Upper Resort - Luxury Mountain View Residence",
    slug: "dago-upper-resort-luxury-mountain-view",
    price: "Rp 5.200.000.000",
    priceNumeric: 5200000000,
    location: "Dago Atas, Bandung Utara",
    cluster: "Dago Resort",
    status: "Booking",
    developer: "Dago Valley Development",
    lt: 250,
    lb: 300,
    bedrooms: 5,
    bathrooms: 5,
    carport: 3,
    description: "Villa eksklusif dengan panorama spektakuler 180 derajat menghadap kota Bandung (City View) dan perbukitan hijau. Udara pegunungan sejuk 19-22 derajat Celcius setiap hari. Cocok untuk hunian istirahat maupun passive income villa sewaan.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["180 Degree City View", "Private Infinity Pool", "Udara Sejuk Pegunungan", "Interior Full Furnished", "SHM & IMB Lengkap"],
    isFeatured: true,
    dateAdded: "2026-06-20"
  },
  {
    id: "prop-5",
    title: "Sharia Green Valley - Hunian Syariah Tanpa Riba Cinunuk",
    slug: "sharia-green-valley-cinunuk",
    price: "Rp 680.000.000",
    priceNumeric: 6800000000,
    location: "Cinunuk, Cileunyi Bandung Timur",
    cluster: "Sharia Green Valley",
    status: "Diperjualbelikan",
    developer: "Sharia Land Bandung",
    lt: 72,
    lb: 55,
    bedrooms: 2,
    bathrooms: 1,
    carport: 1,
    description: "Hunian berkonsep syariah murni 100% tanpa riba, tanpa denda, tanpa sita, tanpa BI Checking. Lingkungan islami dengan masjid besar di dalam cluster, tahfidz center, serta taman bermain anak.",
    images: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["100% Syariah Tanpa Riba", "Masjid Besar Di Dalam Cluster", "Lingkungan Islami", "Cicilan Langsung Developer", "Dekat Kampus UIN & UNPAD"],
    isFeatured: true,
    dateAdded: "2026-06-18"
  },
  {
    id: "prop-6",
    title: "Ciumbuleuit Luxury Residence - Dekat Kampus UNPAR",
    slug: "ciumbuleuit-luxury-residence-unpar",
    price: "Rp 3.100.000.000",
    priceNumeric: 3100000000,
    location: "Ciumbuleuit, Bandung Utara",
    cluster: "Ciumbuleuit Residence",
    status: "Diperjualbelikan",
    developer: "Bandung Premier Estate",
    lt: 135,
    lb: 170,
    bedrooms: 4,
    bathrooms: 3,
    carport: 2,
    description: "Rumah mewah bergaya kontemporer sangat dekat dengan kampus UNPAR, ITB, dan Ciwalk. Potensi sewa tinggi untuk mahasiswa eksekutif atau ekspatriat. Legalitas SHM sudah pecah.",
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["5 Menit ke Kampus UNPAR", "High Rental Yield", "Desain Scandinavian", "Security One Gate System", "Rooftop Garden"],
    isFeatured: true,
    dateAdded: "2026-06-15"
  },
  {
    id: "prop-7",
    title: "Arcamanik Modern Elite - Rumah Minimalis 2 Lantai",
    slug: "arcamanik-modern-elite-bandung",
    price: "Rp 1.150.000.000",
    priceNumeric: 1150000000,
    location: "Arcamanik, Kota Bandung",
    cluster: "Arcamanik Elite",
    status: "Hot Offer",
    developer: "Karya Mandiri Pratama",
    lt: 90,
    lb: 100,
    bedrooms: 3,
    bathrooms: 2,
    carport: 1,
    description: "Hunian nyaman di tengah Kota Bandung dengan harga sangat terjangkau di kelasnya. Jalan depan rumah masuk 2 mobil, bebas banjir, dekat Sport Center Arcamanik dan pusat kuliner Antapani.",
    images: [
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Lokasi Pusat Kota Bandung", "Bebas Banjir", "Dekat Sport Center Arcamanik", "KPR Dibeberkan Free Biaya AJB", "Bisa KPR Bank Syariah"],
    isFeatured: true,
    dateAdded: "2026-06-10"
  },
  {
    id: "prop-8",
    title: "Setra Duta Luxury Villa - Classic Modern Mansion",
    slug: "setra-duta-luxury-mansion",
    price: "Rp 6.800.000.000",
    priceNumeric: 6800000000,
    location: "Setra Duta, Bandung Utara/Cimahi",
    cluster: "Setra Duta Luxury",
    status: "Sold Out",
    developer: "Setra Duta Group",
    lt: 320,
    lb: 450,
    bedrooms: 6,
    bathrooms: 6,
    carport: 4,
    description: "Mansion mewah eksklusif di kawasan elit Setra Duta dengan sistem keamanan ketat 24 jam. Dilengkapi kolam renang pribadi, lantai marmer Italia, garasi kapasitas 4 mobil besar.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Kawasan Elit Terkenal", "Private Pool & Garden", "Lantai Marmer Italia", "Garasi 4 Mobil", "Lingkungan Nyaman & Tenang"],
    isFeatured: true,
    dateAdded: "2026-06-05"
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "srv-1",
    title: "Konsultasi Properti",
    iconName: "Home",
    shortDesc: "Bimbingan pemilihan properti terbaik untuk hunian impian atau investasi berkeuntungan tinggi di Bandung Raya.",
    fullDesc: "Membantu Anda menganalisis spesifikasi, lokasi, riwayat developer, legalitas (SHM/AJB/IMB), hingga potensi capital gain dan rental yield dari properti yang diincar agar bebas dari risiko investasi.",
    features: ["Analisis Potensi Kenaikan Harga (Capital Gain)", "Pemeriksaan Legalitas Dokumen SHM & AJB", "Rekomendasi Cluster Sesuai Kebutuhan & Budget", "Pendampingan Hingga Serah Terima Kunci (BAST)"],
    ctaText: "Konsultasi Gratis Sekarang",
    priceStart: "Gratis"
  },
  {
    id: "srv-2",
    title: "Jual Rumah",
    iconName: "Tag",
    shortDesc: "Strategi marketing komprehensif untuk menjual properti Anda lebih cepat dengan harga pasar terbaik.",
    fullDesc: "Kami memasarkan properti Anda melalui jaringan ribuan agen properti, iklan digital bersponsor (Facebook Ads, Instagram Ads, Google Ads), serta database pembeli prioritas yang siap survei.",
    features: ["Foto & Video Liputan Profesional", "Iklan Bersponsor Meta Ads & Google Ads", "Penapisan Calon Pembeli Potensial (Qualified Leads)", "Bantuan Negosiasi Harga & Pengurusan Notaris"],
    ctaText: "Titip Jual Properti Anda",
    priceStart: "Komisi Standar AREBI"
  },
  {
    id: "srv-3",
    title: "Beli Rumah",
    iconName: "Search",
    shortDesc: "Pendampingan pencarian rumah baru dari developer ternama maupun secondary dengan harga nego terbaik.",
    fullDesc: "Menemani Anda dari tahap pencarian, survei lokasi langsung di Bandung Raya, hitungan simulasi KPR ke berbagai bank, hingga penandatanganan Akta Jual Beli di hadapan PPAT.",
    features: ["Akses Promo Diskon Khusus Developer", "Bantuan Pengajuan KPR ke 10+ Bank Rekanan", "Negosiasi Harga Terbaik untuk Properti Second", "Gratis Antar-Jemput Survei Lokasi"],
    ctaText: "Cari Rumah Bersama Dena",
    priceStart: "Tanpa Biaya Tambahan bagi Pembeli"
  },
  {
    id: "srv-4",
    title: "Investasi Properti",
    iconName: "TrendingUp",
    shortDesc: "Konsultasi penempatan modal pada instrumen properti (Ruko, Kost, Villa, Tanah) bernilai tinggi di Bandung.",
    fullDesc: "Bandung adalah tujuan utama wisata dan pendidikan di Indonesia. Kami bantu Anda mengidentifikasi aset properti berpenghasilan pasif tinggi (passive income) seperti kost mahasiswa dekat kampus atau villa sewaan di Dago/Lembang.",
    features: ["Perhitungan ROI (Return on Investment) Akurat", "Rekomendasi Kawasan Wisata & Kampus Pertumbuhan Cepat", "Manajemen Properti Sewaan & Mitra Airbnb", "Analisis Pajak Jual Beli Properti"],
    ctaText: "Mulai Investasi Properti",
    priceStart: "Konsultasi Investasi"
  },
  {
    id: "srv-5",
    title: "Digital Marketing Property",
    iconName: "Share2",
    shortDesc: "Solusi pemasaran digital tertarget untuk developer dan agen yang ingin mendongkrak penjualan proyek properti.",
    fullDesc: "Kami merancang funneling marketing modern menggunakan Meta Ads (FB & IG), TikTok Ads, dan Google Search Ads khusus industri properti untuk menghasilkan ratusan prospek (leads) yang terverifikasi.",
    features: ["Setup Kampanye Meta Ads & Google Ads Properti", "Pembuatan Copywriting Persuasif & Killer Headline", "Optimasi Landing Page Konversi Tinggi", "CRM & Otomatisasi Lead Follow-up WhatsApp"],
    ctaText: "Jasa Marketing Developer",
    priceStart: "Mulai Rp 3.500.000 / bulan"
  },
  {
    id: "srv-6",
    title: "Branding Developer",
    iconName: "Award",
    shortDesc: "Membangun identitas brand yang kuat dan terpercaya untuk proyek perumahan atau cluster baru Anda.",
    fullDesc: "Mulai dari pembuatan nama cluster, desain logo eksekutif, pembuatan buku profil (corporate profile & brosur pameran), hingga strategi grand launching agar proyek langsung viral dan diminati pembeli.",
    features: ["Desain Identitas Visual & Logo Cluster", "Pembuatan Brosur E-catalog & Print Eksklusif", "Strategi Grand Launching & Event Pameran", "Pelatihan Sales Team & Product Knowledge"],
    ctaText: "Bangun Branding Proyek Anda",
    priceStart: "Custom Project"
  },
  {
    id: "srv-7",
    title: "Landing Page Property",
    iconName: "Layout",
    shortDesc: "Jasa pembuatan website landing page khusus properti yang loading cepat, elegan, dan siap panen leads WhatsApp.",
    fullDesc: "Desain website berkonsep mobile-first dengan tombol Call-To-Action WhatsApp yang jelas, integrasi Facebook Pixel / Google Tag Manager, serta galeri spesifikasi yang memukau mata pembeli.",
    features: ["Desain Responsif Mobile-First & Loading Super Cepat", "Tombol Direct WhatsApp & Form Prospek Otomatis", "Integrasi Pixel Ads & Google Analytics 4", "Gratis Domain & Hosting SSD 1 Tahun"],
    ctaText: "Buat Website Properti Anda",
    priceStart: "Mulai Rp 1.850.000"
  },
  {
    id: "srv-8",
    title: "Foto & Video Drone",
    iconName: "Camera",
    shortDesc: "Pengambilan gambar udara (drone) profesional resolusi 4K untuk memperlihatkan keunggulan lokasi proyek Anda.",
    fullDesc: "Menampilkan panorama kawasan sekitar, akses jalan, kedekatan dengan fasilitas umum (gerbang tol, sekolah, mall), serta progres pembangunan secara dramatis dengan drone profesional.",
    features: ["Video Udara Resolusi 4K Cinematic", "Highlight Kedekatan Fasilitas & Akses Jalan Tol", "Editing Color Grading & Musik Komersial Bebas Hak Cipta", "Format Reel IG, TikTok, & YouTube Landscape"],
    ctaText: "Jadwalkan Liputan Drone",
    priceStart: "Mulai Rp 1.500.000 / sesi"
  },
  {
    id: "srv-9",
    title: "Video Marketing & Content Creator",
    iconName: "Video",
    shortDesc: "Pembuatan konten video review rumah (home tour) ala influencer yang menarik di Reels Instagram, TikTok, dan YouTube.",
    fullDesc: "Dena Permana bertindak sebagai host presenter yang mengulas keunggulan rumah Anda dengan storytelling menarik, menyajikan angle estetis, sehingga mendapat jangkauan organik ribuan penonton.",
    features: ["Host Presenter Profesional oleh Dena Permana", "Skrip Storytelling Persuasif & Edutainment", "Upload & Promosi di Sosial Media Resmi RR Property", "Analisis Engagement & Rekap Views"],
    ctaText: "Buat Video Tour Rumah",
    priceStart: "Mulai Rp 2.000.000 / video"
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    title: "Mega Digital Campaign Podomoro Park Bandung",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Kampanye pemasaran digital terintegrasi menghasilkan lebih dari 450 prospek terverifikasi (qualified leads) dan 18 closing unit mewah dalam waktu 3 bulan peluncuran cluster terbaru.",
    location: "Bojongsoang, Bandung",
    year: "2025",
    client: "Agung Podomoro Land",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
    ],
    projectUrl: "https://www.instagram.com/rrpropertybandung"
  },
  {
    id: "port-2",
    title: "Branding & Naming Cluster Tatar Nayapatala",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Perancangan konsep positioning, pembuatan e-catalog eksklusif, serta produksi video teaser cinematic untuk perumahan elite berwawasan lingkungan di Padalarang.",
    location: "Padalarang, Bandung Barat",
    year: "2025",
    client: "Kota Baru Parahyangan",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "port-3",
    title: "High-Converting Landing Page & Funneling Summarecon",
    category: "Landing Page",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description: "Pembuatan website landing page berkecepatan tinggi dengan integrasi otomatis ke WhatsApp CRM Sales team, meningkatkan conversion rate hingga 42%.",
    location: "Gedebage, Bandung Timur",
    year: "2026",
    client: "Summarecon Bandung Partner",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "port-4",
    title: "Aerial 4K Drone Tour & Cinematic Review Dago Resort",
    category: "Property",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
    description: "Produksi video liputan udara memperlihatkan kemegahan view kota Bandung dari ketinggian Dago Atas, menghasilkan 150.000+ views di TikTok dan Reels.",
    location: "Dago Atas, Bandung",
    year: "2025",
    client: "Dago Valley Owner",
    gallery: [
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "port-5",
    title: "Official Portal Web Sharia Green Valley Cinunuk",
    category: "Website",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    description: "Pengembangan portal resmi listing perumahan syariah tanpa riba dengan kalkulator cicilan syariah interaktif dan sistem booking survey online.",
    location: "Cinunuk, Bandung Timur",
    year: "2026",
    client: "Sharia Land Group",
    gallery: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Hendra Gunawan",
    role: "Dokter Spesialis & Investor Properti",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    review: "Pelayanan Pak Dena Permana sungguh luar biasa profesional! Saya dibimbing dari awal analisis ROI, survei ke Podomoro Park dan Summarecon, sampai proses KPR disetujui bank dengan bunga terendah. Sangat recommended bagi yang cari investasi aman di Bandung!",
    rating: 5,
    propertyBought: "Podomoro Park Bandung Cluster Brahmapuri",
    date: "14 Juni 2026",
    platform: "Google Review"
  },
  {
    id: "test-2",
    name: "Ibu Rina Kusuma Wardani",
    role: "Pengusaha Fashion & Ibu Rumah Tangga",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    review: "Alhamdulillah impian punya rumah di Kota Baru Parahyangan terwujud berkat Pak Dena. Negosiasi harganya sangat transparan, pengurusan legalitas SHM cepat, dan sabar banget melayani semua pertanyaan saya lewat WhatsApp bahkan di malam hari.",
    rating: 5,
    propertyBought: "Tatar Nayapatala KBP Padalarang",
    date: "28 Mei 2026",
    platform: "WhatsApp"
  },
  {
    id: "test-3",
    name: "Bapak Faisal Akbar",
    role: "Eksekutif IT Jakarta",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    review: "Saya domisili di Jakarta dan mau cari rumah masa pensiun di Bandung yang sejuk. Pak Dena buatkan liputan video drone dan review detail via Zoom, jadi saya tidak perlu bulak-balik survei. Ketika cocok dan ke Bandung, langsung deal!",
    rating: 5,
    propertyBought: "Dago Upper Resort Luxury",
    date: "10 April 2026",
    platform: "Google Review"
  },
  {
    id: "test-4",
    name: "Hj. Nurul Aini",
    role: "Dosen Kampus Negeri Bandung",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    review: "Cari rumah syariah tanpa riba yang aman legalitasnya sempat buat saya ragu. Pak Dena menjelaskan dengan sangat jujur kelebihan dan kekurangan setiap cluster di Cinunuk dan Arcamanik. Sukses selalu untuk Pak Dena & RR Property!",
    rating: 5,
    propertyBought: "Sharia Green Valley Cinunuk",
    date: "20 Maret 2026",
    platform: "Instagram"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Aerial View Danau Podomoro Park Bandung",
    category: "Drone",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
    date: "Juni 2026",
    location: "Podomoro Park Bojongsoang",
    description: "Pemandangan udara menakjubkan danau sepanjang 1 km dengan latar belakang pegunungan Bandung Selatan."
  },
  {
    id: "gal-2",
    title: "Interior Ruang Tamu Modern Scandinavian",
    category: "Interior",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    date: "Mei 2026",
    location: "Summarecon Bandung",
    description: "Desain interior open-space dengan sirkulasi udara alami dan pencahayaan hangat."
  },
  {
    id: "gal-3",
    title: "Fasad Eksterior Mewah Dago Upper Resort",
    category: "Exterior",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    date: "Mei 2026",
    location: "Dago Atas, Bandung",
    description: "Arsitektur tropis kontemporer dengan balkon luas menghadap city view Bandung."
  },
  {
    id: "gal-4",
    title: "Grand Launching & Investor Gathering RR Property",
    category: "Event",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    date: "April 2026",
    location: "Hotel Trans Luxury Bandung",
    description: "Acara konsultasi investasi properti eksklusif bersama 100 investor potensial Bandung Raya."
  },
  {
    id: "gal-5",
    title: "Survei Lokasi Langsung Bersama Klien Eksklusif",
    category: "Foto",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    date: "Maret 2026",
    location: "Kota Baru Parahyangan",
    description: "Pendampingan survei unit contoh bersama keluarga Ibu Rina Kusuma."
  },
  {
    id: "gal-6",
    title: "Drone Shoot Progress Stasiun Kereta Cepat Whoosh",
    category: "Drone",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    date: "Februari 2026",
    location: "Tegalluar, Bandung Timur",
    description: "Menampilkan kedekatan cluster perumahan Bandung Timur dengan akses transportasi masa depan."
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "Review Jujur Rumah Sultan 3 Milyar di Podomoro Park Bandung - View Danau!",
    platform: "YouTube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "12:45",
    views: "48.5K Views",
    date: "15 Juni 2026"
  },
  {
    id: "vid-2",
    title: "5 Alasan Kenapa Sekarang Waktu Terbaik Beli Rumah di Gedebage",
    platform: "TikTok",
    embedUrl: "https://www.tiktok.com/@rrproperty_bandung",
    externalUrl: "https://www.tiktok.com/@rrproperty_bandung?_r=1&_t=ZS-97gMJVwgNIf&utm_source=chatgpt.com",
    duration: "01:30",
    views: "125K Views",
    date: "10 Juni 2026"
  },
  {
    id: "vid-3",
    title: "Home Tour Villa Pegunungan Dago Atas - Udara 19 Derajat Celcius!",
    platform: "Instagram",
    embedUrl: "https://www.instagram.com/rrpropertybandung",
    externalUrl: "https://www.instagram.com/rrpropertybandung?igsh=MWdvOWphZHN1djZxcw%3D%3D&utm_source=chatgpt.com",
    duration: "01:00",
    views: "89.2K Views",
    date: "25 Mei 2026"
  },
  {
    id: "vid-4",
    title: "Liputan Drone Kawasan Asri Kota Baru Parahyangan Padalarang",
    platform: "Facebook",
    embedUrl: "https://www.facebook.com/share/1PdRBjApEW/?utm_source=chatgpt.com",
    externalUrl: "https://www.facebook.com/share/1PdRBjApEW/?utm_source=chatgpt.com",
    duration: "03:15",
    views: "34.1K Views",
    date: "18 Mei 2026"
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "5 Daerah Properti Paling Cepat Naik Harga (Capital Gain) di Bandung Raya 2026",
    slug: "5-daerah-properti-paling-cepat-naik-harga-bandung-raya-2026",
    category: "Investasi",
    date: "25 Juni 2026",
    readTime: "5 menit baca",
    author: "Dena Permana",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Pertumbuhan infrastruktur seperti Kereta Cepat Whoosh dan jalan tol baru mengubah peta nilai properti di Bandung. Simak 5 kawasan dengan lonjakan harga tertinggi tahun ini.",
    content: `
# Peta Investasi Properti Bandung Raya 2026

Kota Bandung dan sekitarnya terus menjadi primadona bagi para pencari rumah maupun investor skala nasional. Alasan utamanya adalah iklim yang nyaman, pusat pendidikan perguruan tinggi negeri maupun swasta terbaik, serta perkembangan infrastruktur transportasi yang masif.

Sebagai konsultan properti di Bandung Raya, saya merangkum **5 kawasan strategis yang mencatatkan pertumbuhan harga (Capital Gain) tertinggi** pada tahun 2026:

### 1. Kawasan Gedebage & Tegalluar (Bandung Timur)
Kehadiran Stasiun Kereta Cepat Whoosh di Tegalluar serta dibukanya Summarecon Mall Bandung menjadikan Bandung Timur sebagai pusat gravitasi ekonomi baru. Harga tanah di kawasan ini mengalami kenaikan hingga **15-20% per tahun**.

### 2. Bojongsoang & Tol Buah Batu (Bandung Selatan)
Didorong oleh mahakarya Agung Podomoro Land (Podomoro Park Bandung), kawasan Bojongsoang kini bertransformasi menjadi area hunian kelas resort eksekutif dengan fasilitas danau mega dan rumah sakit internasional.

### 3. Padalarang (Kota Baru Parahyangan - Bandung Barat)
Akses Tol langsung dan kedekatan dengan Stasiun Padalarang membuat KBP menjadi pilihan utama keluarga mapan yang menginginkan lingkungan asri dan sistem zonasi pendidikan internasional.

### 4. Dago & Ciumbuleuit (Bandung Utara)
Kawasan abadi yang tidak pernah kehilangan pesonanya. Keterbatasan lahan di Bandung Utara membuat harga villa dan rumah mewah terus meroket, didukung oleh tingginya permintaan sewa harian (staycation) berkeuntungan tinggi.

### 5. Arcamanik & Antapani (Kota Bandung)
Pilihan terfavorit bagi keluarga muda (millennial & Gen Z) yang bekerja di pusat Kota Bandung. Aksesibilitas mudah, fasilitas umum lengkap, dan harga yang masih rasional.

---
**Ingin berdiskusi mengenai prospek investasi properti yang sesuai dengan profil keuangan Anda?**
Langsung hubungi saya via WhatsApp di **081324421411** untuk konsultasi privat gratis!
    `,
    tags: ["Investasi Properti", "Bandung Timur", "Whoosh", "Podomoro Park", "Summarecon Bandung"],
    views: 1420,
    comments: [
      {
        id: "com-1",
        name: "Bapak Gunadi",
        date: "26 Juni 2026",
        comment: "Artikel yang sangat informatif Pak Dena! Menurut Pak Dena untuk budget 1.5M lebih baik pilih di Gedebage atau Bojongsoang untuk jangka panjang 5 tahun ke depan?"
      }
    ]
  },
  {
    id: "blog-2",
    title: "Panduan Lengkap Syarat dan Cara Pengajuan KPR Rumah Agar Cepat Disetujui Bank",
    slug: "panduan-lengkap-syarat-cara-pengajuan-kpr-rumah-disetujui",
    category: "Tips",
    date: "18 Juni 2026",
    readTime: "6 menit baca",
    author: "Dena Permana",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Banyak calon pembeli rumah gagal di tahap persetujuan bank (BI Checking / SLIK OJK). Pelajari trik rahasia agar pengajuan KPR Anda lolos dengan bunga promo terendah.",
    content: `
# Sukses Pengajuan KPR Tanpa Penolakan

Membeli rumah melalui fasilitas Kredit Pemilikan Rumah (KPR) adalah solusi paling populer bagi 80% masyarakat Indonesia. Namun, proses verifikasi bank seringkali menjadi momok menakutkan jika kita tidak mempersiapkan dokumen dengan benar.

Berikut adalah kriteria utama yang dinilai analis kredit bank (Prinsip 5C):

### 1. Bersihkan Riwayat SLIK OJK (BI Checking)
Pastikan tidak ada tunggakan paylater, kartu kredit, atau pinjaman online (pinjol) sekecil apapun minimal 3-6 bulan sebelum pengajuan KPR.

### 2. Hitung Debt Service Ratio (DSR)
Bank umumnya memberi limit cicilan maksimal **40% hingga 50% dari total penghasilan bersih bulanan** (digabung dengan pasangan jika sudah menikah). Gunakan **Kalkulator Simulasi KPR** di website ini untuk menghitung estimasi cicilan Anda.

### 3. Dokumen Wajib Persyaratan
- KTP Suami & Istri, Kartu Keluarga, NPWP, Surat Nikah.
- Slip Gaji 3 bulan terakhir & Surat Keterangan Kerja (bagi karyawan).
- Rekening Koran 6 bulan terakhir & SIUP/NIB/TDP (bagi pengusaha/wiraswasta).

Sebagai konsultan properti, saya dan tim **RR Property Bandung** siap membantu mengawal berkas KPR Anda ke 10+ bank rekanan kami hingga akad kredit sukses!
    `,
    tags: ["KPR", "Tips Beli Rumah", "BI Checking", "Bank Syariah", "Cicilan Rumah"],
    views: 980,
    comments: []
  },
  {
    id: "blog-3",
    title: "Perbedaan SHM, AJB, SHGB, dan IMB: Mengenal Legalitas Tanah di Indonesia",
    slug: "perbedaan-shm-ajb-shgb-imb-mengenal-legalitas-tanah",
    category: "Property",
    date: "10 Juni 2026",
    readTime: "4 menit baca",
    author: "Dena Permana",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Jangan sampai tertipu saat membeli rumah! Kenali kekuatan hukum sertifikat hak milik (SHM) dibandingkan akta jual beli (AJB) biasa atau HGB developer.",
    content: `
# Legalitas Properti: Benteng Keamanan Investasi Anda

Dalam dunia transaksi properti, kalimat "lokasi adalah raja, namun legalitas adalah dewa" sangatlah tepat. Sebelum memutuskan membayar booking fee atau DP rumah, Anda wajib memahami jenis sertifikat yang melandasi properti tersebut:

### 1. Sertifikat Hak Milik (SHM)
SHM adalah kepemilikan tertinggi dan terkuat secara hukum di Indonesia. Berlaku selamanya tanpa batas waktu dan dapat diwariskan secara turun temurun.

### 2. Sertifikat Hak Guna Bangunan (SHGB)
Biasanya diterbitkan untuk perumahan baru yang dikembangkan oleh PT (Developer). SHGB memiliki jangka waktu (misal 20-30 tahun) dan **dapat ditingkatkan menjadi SHM** saat pembeli melunasi rumah.

### 3. Akta Jual Beli (AJB)
AJB **bukanlah sertifikat kepemilikan**, melainkan bukti bahwa telah terjadi transaksi jual beli yang sah di hadapan Pejabat Pembuat Akta Tanah (PPAT/Notaris). AJB adalah dasar untuk membuat SHM.

Di bawah pendampingan saya, semua listing properti yang ditawarkan telah melalui proses verifikasi legalitas yang ketat agar Anda tidur nyenyak!
    `,
    tags: ["Legalitas", "SHM", "AJB", "Notaris", "Properti Aman"],
    views: 1150,
    comments: []
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Booking & Survey",
    question: "Bagaimana cara mengatur jadwal survei lokasi perumahan bersama Pak Dena?",
    answer: "Sangat mudah! Anda cukup menghubungi WhatsApp Pak Dena di nomor 081324421411 atau mengisi formulir Kalender Booking di halaman Kontak. Layanan survei lokasi kami 100% GRATIS tanpa dipungut biaya apapun, bahkan kami menyediakan fasilitas antar-jemput bagi Anda yang berdomisili atau baru tiba di stasiun/bandara Bandung."
  },
  {
    id: "faq-2",
    category: "Booking & Survey",
    question: "Apa itu Booking Fee (Tanda Jadi) dan apakah uangnya bisa kembali (Refundable)?",
    answer: "Booking Fee adalah uang tanda jadi untuk mengunci unit rumah dan harga promo agar tidak terjual ke orang lain (biasanya berkisar Rp 5.000.000 - Rp 25.000.000 tergantung cluster). Kebijakan refund tergantung ketentuan developer: untuk penolakan KPR oleh pihak bank, sebagian besar developer rekanan kami memberikan garansi uang kembali 100% (dilengkapi surat keterangan penolakan resmi bank)."
  },
  {
    id: "faq-3",
    category: "KPR & Keuangan",
    question: "Berapa minimal gaji/penghasilan agar bisa mengajukan KPR rumah Rp 1 Milyar?",
    answer: "Untuk rumah seharga Rp 1 Milyar dengan asumsi DP 10% (cicilan pokok KPR Rp 900 Juta selama 20 tahun pada bunga promo ~4.5%), cicilan bulanan berkisar Rp 5,7 Juta. Bank menerapkan aturan DSR (Debt Service Ratio) maksimal 40-50%, sehingga minimal total penghasilan gabungan suami & istri adalah sekitar Rp 12.000.000 - Rp 14.000.000 per bulan."
  },
  {
    id: "faq-4",
    category: "KPR & Keuangan",
    question: "Apakah Pak Dena bisa membantu pengajuan KPR Bank Syariah maupun Bank Konvensional?",
    answer: "Tentu! Kami bekerja sama secara resmi dengan puluhan bank terkemuka baik Konvensional (BCA, Mandiri, BNI, BTN, OCBC, CIMB Niaga) maupun Syariah (BSI, BTN Syariah, Muamalat, BCA Syariah). Kami akan merekomendasikan bank dengan promo suku bunga dan biaya KPR termurah sesuai profil pekerjaan Anda."
  },
  {
    id: "faq-5",
    category: "Legalitas & Sertifikat",
    question: "Apa perbedaan beli rumah baru di Developer vs beli rumah Second (Bekas)?",
    answer: "Rumah baru dari Developer umumnya menawarkan promo bebas biaya-biaya (Free BPHTB, AJB, BN, dan biaya KPR), desain modern terbaru, serta kemudahan mencicil DP. Sementara rumah Second memiliki keunggulan lingkungan yang sudah terbentuk ramai dan bisa langsung ditempati/disewakan. Pak Dena melayani konsultasi dan transaksi untuk kedua tipe properti tersebut."
  },
  {
    id: "faq-6",
    category: "Legalitas & Sertifikat",
    question: "Apakah legalitas properti yang dijual oleh Pak Dena dijamin aman?",
    answer: "Ya, 100% aman! Sebelum kami menayangkan dan memasarkan listing properti di website maupun sosial media RR Property Bandung, tim kami melakukan pengecekan legalitas (due diligence) terhadap kelengkapan SHM/SHGB, IMB/PBG, dan PBB di hadapan Notaris & PPAT rekanan resmi."
  },
  {
    id: "faq-7",
    category: "Investasi Properti",
    question: "Apakah Pak Dena menerima titip jual properti dari pemilik rumah atau tanah di Bandung?",
    answer: "Sangat menerima! Jika Anda memiliki rumah, ruko, tanah, atau villa di kawasan Bandung Raya yang ingin dijual cepat, Anda bisa titip jual kepada kami. Kami akan bantu dokumentasi foto & video profesional, promosi iklan berbayar (Meta Ads), dan mencarikan pembeli potensial dengan komisi transparan sesuai standar asosiasi AREBI."
  }
];

export const INITIAL_LEADS: any[] = [
  {
    id: "lead-1",
    name: "Bapak Hendri Setiawan",
    phone: "081234567890",
    email: "hendri.setiawan@gmail.com",
    message: "Tertarik survei unit 4 kamar di Podomoro Park Bandung untuk akhir pekan ini.",
    budget: "Rp 3 - 4 Milyar",
    location: "Bandung Selatan",
    date: "2026-07-01 10:30",
    status: "Baru",
    source: "Form Kontak"
  },
  {
    id: "lead-2",
    name: "Ibu Melinda Putri",
    phone: "081987654321",
    email: "melinda.putri@yahoo.com",
    message: "Mau tanyakan estimasi cicilan KPR Syariah untuk Cluster Emily Summarecon Bandung.",
    budget: "Rp 2 - 2.5 Milyar",
    location: "Bandung Timur",
    date: "2026-06-30 15:15",
    status: "Dihubungi",
    source: "Simulasi KPR"
  }
];
