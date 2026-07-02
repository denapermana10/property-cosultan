-- ==============================================================================
-- DATABASE SCHEMA & SEED DATA FOR DENA PERMANA PROPERTY PORTFOLIO
-- Compatible with MySQL, PostgreSQL, MariaDB, Supabase, and cPanel phpMyAdmin
-- ==============================================================================

-- 1. PROPERTIES (Listing Properti & Perumahan)
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    price_numeric DECIMAL(15, 2) NOT NULL DEFAULT 0,
    location VARCHAR(255) NOT NULL,
    cluster VARCHAR(255),
    developer VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Tersedia',
    type VARCHAR(100) DEFAULT 'Rumah Baru',
    lt INT DEFAULT 0,
    lb INT DEFAULT 0,
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    carport INT DEFAULT 1,
    description TEXT,
    features TEXT, -- JSON array string or comma separated
    images TEXT,   -- JSON array string of image URLs
    is_featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. LEADS (Calon Konsumen & Prospek Konsultasi)
CREATE TABLE IF NOT EXISTS leads (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    location VARCHAR(255),
    budget VARCHAR(100),
    message TEXT,
    source VARCHAR(100) DEFAULT 'Website Form',
    status VARCHAR(50) DEFAULT 'Baru',
    date VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PORTFOLIO (Rekam Jejak Penjualan & Serah Terima Unit)
CREATE TABLE IF NOT EXISTS portfolio (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Residensial',
    location VARCHAR(255),
    year VARCHAR(20),
    client VARCHAR(255),
    image TEXT,
    impact TEXT,
    project_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TESTIMONIALS (Ulasan & Rating Konsumen)
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    property VARCHAR(255),
    rating INT DEFAULT 5,
    comment TEXT,
    photo TEXT,
    date VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. SERVICES (Layanan Konsultasi KPR & Legalitas)
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    desc_text TEXT,
    icon VARCHAR(100) DEFAULT 'home',
    features TEXT, -- JSON array string
    cta_text VARCHAR(100),
    price_start VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. GALLERY (Galeri Foto & Dokumentasi Proyek)
CREATE TABLE IF NOT EXISTS gallery (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Eksterior',
    image TEXT,
    description TEXT,
    date VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. VIDEOS (Video Marketing YouTube/TikTok/Instagram)
CREATE TABLE IF NOT EXISTS videos (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    platform VARCHAR(50) DEFAULT 'YouTube',
    video_id VARCHAR(100),
    thumbnail TEXT,
    views VARCHAR(50),
    date VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. FAQS (Tanya Jawab Seputar KPR & Properti)
CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(50) PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'KPR & Keuangan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. BLOGS (Artikel Edukasi & Berita Properti)
CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Property',
    date VARCHAR(50),
    read_time VARCHAR(50),
    author_name VARCHAR(255) DEFAULT 'Dena Permana',
    author_role VARCHAR(255) DEFAULT 'Senior Property Consultant',
    author_avatar TEXT,
    image TEXT,
    summary TEXT,
    content TEXT,
    tags TEXT, -- JSON array string
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- SAMPLE SEED DATA INSERTION
-- ==============================================================================

-- Seed Properties
INSERT INTO properties (id, title, price, price_numeric, location, cluster, developer, status, type, lt, lb, bedrooms, bathrooms, carport, description, features, is_featured)
VALUES 
('prop-1', 'Podomoro Park Buahbatu - Cluster Brahmapuri', 'Rp 2,8 Milyar', 2800000000, 'Buahbatu, Bandung Selatan', 'Cluster Brahmapuri (Lake View)', 'Agung Podomoro Land', 'Tersedia', 'Rumah Baru', 144, 160, 4, 3, 2, 'Hunian resort mewah dengan pemandangan danau privat sepanjang 1 kilometer di pusat Bandung Selatan. Dilengkapi keamanan 24 jam dan fasilitas club house terlengkap.', '["One Gate System", "Lake View Private", "Club House Terlengkap", "Keamanan 24 Jam & CCTV", "Smart Home System", "Underground Utilities"]', true),
('prop-2', 'Summarecon Bandung - Cluster Emily', 'Rp 3,2 Milyar', 3200000000, 'Gedebage, Bandung Timur', 'Cluster Emily', 'PT Summarecon Agung Tbk', 'Tersedia', 'Rumah Baru', 160, 185, 4, 4, 2, 'Cluster hunian premium di kawasan kota mandiri Summarecon Bandung. Akses langsung ke Stasiun Kereta Cepat Whoosh Tegalluar dan Tol Gedebage.', '["Lokasi Dekat Whoosh", "Akses Tol Gedebage", "Club House & Pool", "Danau & Taman Tematik", "Keamanan 24/7", "Row Jalan Lebar 12m"]', true),
('prop-3', 'Kota Baru Parahyangan - Cluster Tatar Simbar Kancana', 'Rp 4,5 Milyar', 4500000000, 'Padalarang, Bandung Barat', 'Tatar Simbar Kancana', 'Lyman Group', 'Tersedia', 'Rumah Baru', 250, 220, 4, 4, 2, 'Hunian bernuansa alam pedesaan berpadu arsitektur tropis modern di Kota Baru Parahyangan. Udara sejuk, lingkungan tenang, dekat lapangan Golf.', '["Golf Course Community", "Udara Pegunungan Sejuk", "Akses Tol Padalarang", "Sekolah Internasional", "IKEA & Wahoo Waterworld", "Security 24 Jam"]', true);

-- Seed Services
INSERT INTO services (id, title, desc_text, icon, features, cta_text, price_start)
VALUES 
('srv-1', 'Konsultasi Pembelian & Survei Properti', 'Pendampingan dari tahap awal pemilihan unit, analisa spesifikasi bangunan, perbandingan komparatif harga pasar, hingga jadwal kunjungan survei lokasi eksklusif.', 'home', '["Analisis kebutuhan & budget properti", "Rekomendasi unit terbaik se-Bandung Raya", "Pendampingan survei lokasi VIP", "Negosiasi harga langsung dengan Developer / Owner"]', 'Jadwalkan Survei VIP', 'Gratis Konsultasi'),
('srv-2', 'Simulasi & Pengajuan KPR Multi-Bank', 'Membantu proses pengajuan KPR/KPA ke berbagai bank mitra terkemuka dengan suku bunga promo terbaik, asistensi kelengkapan berkas, hingga approval gol.', 'calculator', '["Perhitungan estimasi angsuran & DSR", "Koneksi prioritas ke Bank BCA, Mandiri, BNI, BRI, BSI", "Bantuan pemberkasan & lolos BI Checking / SLIK", "Kawalan proses hingga akad kredit"]', 'Hitung Simulasi KPR', 'Bunga Mulai 2.75%'),
('srv-3', 'Asistensi Legalitas & Sertifikasi Properti', 'Memastikan keamanan transaksi dengan verifikasi dokumen keabsahan properti (SHM, HGB, IMB/PBG, PBB) bekerja sama dengan Notaris & PPAT terpercaya.', 'file-text', '["Pengecekan keabsahan sertifikat (SHM/HGB)", "Perhitungan pajak pembeli & penjual (BPHTB & PPH)", "Penyusunan Akta Jual Beli (AJB) & PPJB", "Bantun balik nama sertifikat di BPN"]', 'Konsultasi Legalitas', 'Transparan & Aman');

-- Seed FAQs
INSERT INTO faqs (id, question, answer, category)
VALUES 
('faq-1', 'Bagaimana prosedur membeli rumah baru melalui Dena Permana?', 'Prosedurnya sangat mudah: 1) Konsultasikan kebutuhan & budget Anda, 2) Survei lokasi bersama Pak Dena, 3) Pemilihan unit & pembayaran booking fee, 4) Pengajuan KPR (jika tidak cash keras), 5) Penandatanganan PPJB/AJB dan Serah Terima kunci.', 'Pembelian'),
('faq-2', 'Apakah konsultasi dan survei properti bersama Pak Dena dikenakan biaya?', 'Tidak ada biaya sama sekali (GRATIS). Sebagai konsultan properti resmi, seluruh layanan konsultasi, pendampingan survei, hingga pengurusan KPR diberikan free untuk membantu Anda mendapatkan hunian impian.', 'Umum'),
('faq-3', 'Berapa penghasilan minimal untuk pengajuan KPR rumah seharga Rp 1 Milyar?', 'Untuk rumah seharga Rp 1 Milyar dengan asumsi DP 10% (cicilan pokok KPR Rp 900 Juta selama 20 tahun pada bunga promo ~4.5%), cicilan bulanan berkisar Rp 5,7 Juta. Bank menerapkan aturan DSR (Debt Service Ratio) maksimal 40-50%, sehingga minimal total penghasilan gabungan suami & istri adalah sekitar Rp 12.000.000 - Rp 14.000.000 per bulan.', 'KPR & Keuangan');

-- End of Schema & Seed Data
