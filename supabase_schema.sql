-- ==============================================================================
-- SUPABASE / POSTGRESQL RELATIONAL DATABASE SCHEMA
-- Application: Dena Permana - Property Consultant & Digital Portfolio
-- Architecture: Supabase (PostgreSQL 15+) with Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PROFILES (Admin / User Profile linked to Supabase auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL DEFAULT 'Dena Permana',
    role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'consultant', 'staff')),
    avatar_url TEXT DEFAULT 'https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0',
    phone VARCHAR(50) DEFAULT '081324421411',
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 2. PROPERTIES (Listing Properti & Perumahan)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE,
    title VARCHAR(255) NOT NULL,
    price_display VARCHAR(100) NOT NULL,
    price_numeric NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (price_numeric >= 0),
    location VARCHAR(255) NOT NULL,
    cluster VARCHAR(255),
    developer VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Tersedia' CHECK (status IN ('Tersedia', 'Hot Offer', 'Booking', 'Sold Out', 'Diperjualbelikan')),
    property_type VARCHAR(100) DEFAULT 'Rumah Baru',
    land_area INT DEFAULT 0 CHECK (land_area >= 0), -- Luas Tanah (LT) m2
    building_area INT DEFAULT 0 CHECK (building_area >= 0), -- Luas Bangunan (LB) m2
    bedrooms INT DEFAULT 0 CHECK (bedrooms >= 0),
    bathrooms INT DEFAULT 0 CHECK (bathrooms >= 0),
    carport INT DEFAULT 1 CHECK (carport >= 0),
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb, -- Array of strings e.g. ["One Gate System", "Lake View"]
    is_featured BOOLEAN DEFAULT true,
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 3. PROPERTY_IMAGES (Relational Table for Property Photos)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Index for fast lookups by property
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON public.property_images(property_id);

-- ==============================================================================
-- 4. PORTFOLIO (Rekam Jejak Proyek & Serah Terima Unit)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Residensial',
    location VARCHAR(255),
    project_year VARCHAR(20),
    client_name VARCHAR(255),
    image_url TEXT,
    impact_summary TEXT,
    description TEXT,
    project_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 5. SERVICES (Layanan Konsultasi KPR, Survei & Legalitas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    short_desc TEXT NOT NULL,
    full_desc TEXT,
    icon_name VARCHAR(100) DEFAULT 'home',
    features JSONB DEFAULT '[]'::jsonb,
    cta_text VARCHAR(100) DEFAULT 'Konsultasi Sekarang',
    price_start VARCHAR(100) DEFAULT 'Gratis Konsultasi',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 6. GALLERY (Galeri Foto & Dokumentasi Event/Proyek)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Eksterior',
    image_url TEXT NOT NULL,
    description TEXT,
    event_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 7. VIDEOS (Video Marketing YouTube / TikTok / Instagram)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    platform VARCHAR(50) DEFAULT 'YouTube' CHECK (platform IN ('YouTube', 'TikTok', 'Instagram', 'Facebook')),
    video_id VARCHAR(100),
    video_url TEXT,
    thumbnail_url TEXT,
    views_count VARCHAR(50) DEFAULT '0',
    published_date VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 8. BLOG_POSTS (Artikel Edukasi, Berita Properti & Tips KPR)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'Property',
    published_date DATE DEFAULT CURRENT_DATE,
    read_time VARCHAR(50) DEFAULT '3 min read',
    author_name VARCHAR(255) DEFAULT 'Dena Permana',
    author_role VARCHAR(255) DEFAULT 'Senior Property Consultant',
    author_avatar TEXT DEFAULT 'https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0',
    image_url TEXT,
    summary TEXT,
    content TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    views_count INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 9. TESTIMONIALS (Ulasan & Rating dari Konsumen / Klien)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(255) NOT NULL,
    client_role VARCHAR(255) DEFAULT 'Pembeli Rumah',
    property_purchased VARCHAR(255),
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    photo_url TEXT,
    testimonial_date VARCHAR(50),
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- 10. CONTACTS & LEADS (Pesan Masuk, Janji Temu Survei & Pengajuan KPR)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    location_interest VARCHAR(255),
    budget_range VARCHAR(100),
    message TEXT,
    inquiry_type VARCHAR(100) DEFAULT 'Konsultasi Umum' CHECK (inquiry_type IN ('Konsultasi Umum', 'Survei Lokasi', 'Simulasi KPR', 'Titip Jual')),
    source VARCHAR(100) DEFAULT 'Website Contact Form',
    status VARCHAR(50) DEFAULT 'Baru' CHECK (status IN ('Baru', 'Dihubungi', 'Survei', 'Closing', 'Batal')),
    contacted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Alias view for Leads if querying by leads name
CREATE OR REPLACE VIEW public.leads AS SELECT * FROM public.contacts;

-- ==============================================================================
-- 11. FAQS (Tanya Jawab Seputar Properti, KPR & Legalitas)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'KPR & Keuangan',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ ACCESS POLICIES (Anyone can view active/published data)
CREATE POLICY "Public can view available properties" ON public.properties FOR SELECT USING (true);
CREATE POLICY "Public can view property images" ON public.property_images FOR SELECT USING (true);
CREATE POLICY "Public can view portfolio" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Public can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public can view published blogs" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view active faqs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view consultant profiles" ON public.profiles FOR SELECT USING (true);

-- 2. PUBLIC INSERT ACCESS (Anyone can submit lead / contact forms)
CREATE POLICY "Public can submit contact inquiries" ON public.contacts FOR INSERT WITH CHECK (true);

-- 3. AUTHENTICATED ADMIN ACCESS (Only logged-in admin can insert, update, delete)
CREATE POLICY "Admin full access on properties" ON public.properties FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on property_images" ON public.property_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on portfolio" ON public.portfolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on videos" ON public.videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on blog_posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on contacts" ON public.contacts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on faqs" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- ==============================================================================
-- AUTOMATIC TIMESTAMP UPDATE TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_portfolio_updated_at BEFORE UPDATE ON public.portfolio FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ==============================================================================
-- SAMPLE SEED DATA
-- ==============================================================================
INSERT INTO public.properties (id, slug, title, price_display, price_numeric, location, cluster, developer, status, property_type, land_area, building_area, bedrooms, bathrooms, carport, description, features, is_featured)
VALUES 
('a1111111-1111-1111-1111-111111111111', 'podomoro-park-buahbatu-brahmapuri', 'Podomoro Park Buahbatu - Cluster Brahmapuri', 'Rp 2,8 Milyar', 2800000000, 'Buahbatu, Bandung Selatan', 'Cluster Brahmapuri (Lake View)', 'Agung Podomoro Land', 'Tersedia', 'Rumah Baru', 144, 160, 4, 3, 2, 'Hunian resort mewah dengan pemandangan danau privat sepanjang 1 kilometer di pusat Bandung Selatan. Dilengkapi keamanan 24 jam dan fasilitas club house terlengkap.', '["One Gate System", "Lake View Private", "Club House Terlengkap", "Keamanan 24 Jam & CCTV", "Smart Home System", "Underground Utilities"]'::jsonb, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.property_images (property_id, image_url, caption, display_order, is_primary)
VALUES 
('a1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', 'Tampak Depan Cluster Brahmapuri', 1, true),
('a1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Ruang Keluarga Luas', 2, false)
ON CONFLICT DO NOTHING;

-- End of Supabase Schema
