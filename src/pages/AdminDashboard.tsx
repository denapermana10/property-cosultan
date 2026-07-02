import React, { useState, useEffect } from 'react';
import { 
  Property, 
  LeadItem, 
  PortfolioItem, 
  Testimonial, 
  ServiceItem, 
  GalleryItem, 
  VideoItem, 
  FAQItem, 
  BlogPost 
} from '../types';
import { StorageAPI } from '../lib/storage';
import { AdminImageUploader } from '../components/AdminImageUploader';
import { 
  Users, 
  Home, 
  Briefcase, 
  Star, 
  Image, 
  Video, 
  HelpCircle, 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  ExternalLink,
  MessageCircle,
  Database
} from 'lucide-react';

interface AdminDashboardProps {
  properties: Property[];
  onRefresh: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  properties,
  onRefresh,
  onExitAdmin
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'leads' | 'properties' | 'portfolio' | 'testimonials' | 'services' | 'gallery' | 'videos' | 'faqs' | 'blogs'>('leads');

  // Local data states
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Search in admin
  const [searchQuery, setSearchQuery] = useState('');

  // Add Property Form State
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [newPropTitle, setNewPropTitle] = useState('');
  const [newPropPrice, setNewPropPrice] = useState('Rp 1.8 Milyar');
  const [newPropNumeric, setNewPropNumeric] = useState(1800000000);
  const [newPropLocation, setNewPropLocation] = useState('Podomoro Park, Bandung');
  const [newPropCluster, setNewPropCluster] = useState('Podomoro Park');
  const [newPropDeveloper, setNewPropDeveloper] = useState('Agung Podomoro Land');
  const [newPropStatus, setNewPropStatus] = useState<'Diperjualbelikan' | 'Hot Offer' | 'Booking' | 'Sold Out'>('Diperjualbelikan');
  const [newPropType, setNewPropType] = useState('Rumah 2 Lantai');
  const [newPropLt, setNewPropLt] = useState(120);
  const [newPropLb, setNewPropLb] = useState(100);
  const [newPropBed, setNewPropBed] = useState(3);
  const [newPropBath, setNewPropBath] = useState(3);
  const [newPropCarport, setNewPropCarport] = useState(2);
  const [newPropDesc, setNewPropDesc] = useState('');
  const [newPropImage, setNewPropImage] = useState('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80');

  // Gallery Form State
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState('Foto');
  const [galImage, setGalImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80');
  const [galDesc, setGalDesc] = useState('');

  // Portfolio Form State
  const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
  const [portTitle, setPortTitle] = useState('');
  const [portCategory, setPortCategory] = useState('Property');
  const [portLocation, setPortLocation] = useState('Bandung');
  const [portImage, setPortImage] = useState('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80');
  const [portDesc, setPortDesc] = useState('');

  // Testimonial Form State
  const [showAddTestiModal, setShowAddTestiModal] = useState(false);
  const [testiName, setTestiName] = useState('');
  const [testiRole, setTestiRole] = useState('Pembeli Properti');
  const [testiReview, setTestiReview] = useState('');
  const [testiRating, setTestiRating] = useState(5);
  const [testiPhoto, setTestiPhoto] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');
  const [testiPlatform, setTestiPlatform] = useState<'Google Review' | 'WhatsApp' | 'Instagram'>('Google Review');

  // Blog Form State
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Property');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80');

  const loadAllData = () => {
    setLeads(StorageAPI.getLeads());
    setPortfolio(StorageAPI.getPortfolio());
    setTestimonials(StorageAPI.getTestimonials());
    setServices(StorageAPI.getServices());
    setGallery(StorageAPI.getGallery());
    setVideos(StorageAPI.getVideos());
    setFaqs(StorageAPI.getFaqs());
    setBlogs(StorageAPI.getBlogs());
  };

  useEffect(() => {
    loadAllData();
    const unsub = StorageAPI.subscribe(() => {
      loadAllData();
    });
    return () => unsub();
  }, []);

  // Handle Lead Status Change
  const handleUpdateLeadStatus = (id: string, newStatus: 'Baru' | 'Dihubungi' | 'Deal' | 'Batal') => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    StorageAPI.saveLeads(updated);
  };

  // Handle Delete Lead
  const handleDeleteLead = (id: string) => {
    if (window.confirm("Hapus data lead ini?")) {
      StorageAPI.deleteLead(id);
    }
  };

  // Handle Export Leads CSV
  const handleExportCSV = () => {
    const headers = ["Nama", "WhatsApp", "Email", "Lokasi", "Budget", "Pesan", "Sumber", "Status", "Tanggal"];
    const rows = leads.map(l => [
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.location}"`,
      `"${l.budget}"`,
      `"${l.message.replace(/"/g, '""')}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${l.date}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Leads_DenaPermana_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Export SQL Database
  const handleExportSQL = () => {
    const esc = (str: any) => str ? `'${String(str).replace(/'/g, "''").replace(/\\/g, "\\\\")}'` : 'NULL';
    
    let sql = `-- ==============================================================================\n`;
    sql += `-- DATABASE DUMP FOR DENA PERMANA PROPERTY PORTFOLIO\n`;
    sql += `-- Generated at: ${new Date().toISOString()}\n`;
    sql += `-- Compatible with MySQL, PostgreSQL, MariaDB, Supabase, and cPanel phpMyAdmin\n`;
    sql += `-- ==============================================================================\n\n`;

    // 1. PROPERTIES
    sql += `CREATE TABLE IF NOT EXISTS properties (id VARCHAR(50) PRIMARY KEY, title VARCHAR(255), price VARCHAR(100), price_numeric DECIMAL(15,2), location VARCHAR(255), cluster VARCHAR(255), developer VARCHAR(255), status VARCHAR(50), type VARCHAR(100), lt INT, lb INT, bedrooms INT, bathrooms INT, carport INT, description TEXT, features TEXT, images TEXT, is_featured BOOLEAN, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    properties.forEach(p => {
      sql += `INSERT INTO properties (id, title, price, price_numeric, location, cluster, developer, status, type, lt, lb, bedrooms, bathrooms, carport, description, features, images, is_featured) VALUES (${esc(p.id)}, ${esc(p.title)}, ${esc(p.price)}, ${p.priceNumeric || 0}, ${esc(p.location)}, ${esc(p.cluster || '')}, ${esc(p.developer || '')}, ${esc(p.status)}, ${esc(p.type)}, ${p.lt || 0}, ${p.lb || 0}, ${p.bedrooms || 0}, ${p.bathrooms || 0}, ${p.carport || 1}, ${esc(p.description)}, ${esc(JSON.stringify(p.features || []))}, ${esc(JSON.stringify(p.images || []))}, ${p.isFeatured ? 'true' : 'false'});\n`;
    });
    sql += `\n`;

    // 2. LEADS
    sql += `CREATE TABLE IF NOT EXISTS leads (id VARCHAR(50) PRIMARY KEY, name VARCHAR(255), phone VARCHAR(50), email VARCHAR(255), location VARCHAR(255), budget VARCHAR(100), message TEXT, source VARCHAR(100), status VARCHAR(50), date VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    leads.forEach(l => {
      sql += `INSERT INTO leads (id, name, phone, email, location, budget, message, source, status, date) VALUES (${esc(l.id)}, ${esc(l.name)}, ${esc(l.phone)}, ${esc(l.email)}, ${esc(l.location)}, ${esc(l.budget)}, ${esc(l.message)}, ${esc(l.source)}, ${esc(l.status)}, ${esc(l.date)});\n`;
    });
    sql += `\n`;

    // 3. PORTFOLIO
    sql += `CREATE TABLE IF NOT EXISTS portfolio (id VARCHAR(50) PRIMARY KEY, title VARCHAR(255), category VARCHAR(100), location VARCHAR(255), year VARCHAR(20), client VARCHAR(255), image TEXT, impact TEXT, project_url TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    portfolio.forEach(p => {
      sql += `INSERT INTO portfolio (id, title, category, location, year, client, image, impact, project_url) VALUES (${esc(p.id)}, ${esc(p.title)}, ${esc(p.category)}, ${esc(p.location)}, ${esc(p.year)}, ${esc(p.client)}, ${esc(p.image || p.imageUrl)}, ${esc(p.impact || '')}, ${esc(p.projectUrl || '')});\n`;
    });
    sql += `\n`;

    // 4. TESTIMONIALS
    sql += `CREATE TABLE IF NOT EXISTS testimonials (id VARCHAR(50) PRIMARY KEY, name VARCHAR(255), role VARCHAR(255), property VARCHAR(255), rating INT, comment TEXT, photo TEXT, date VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    testimonials.forEach(t => {
      sql += `INSERT INTO testimonials (id, name, role, property, rating, comment, photo, date) VALUES (${esc(t.id)}, ${esc(t.name)}, ${esc(t.role)}, ${esc(t.property || '')}, ${t.rating || 5}, ${esc(t.comment)}, ${esc(t.photo)}, ${esc(t.date)});\n`;
    });
    sql += `\n`;

    // 5. SERVICES
    sql += `CREATE TABLE IF NOT EXISTS services (id VARCHAR(50) PRIMARY KEY, title VARCHAR(255), desc_text TEXT, icon VARCHAR(100), features TEXT, cta_text VARCHAR(100), price_start VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    services.forEach(s => {
      sql += `INSERT INTO services (id, title, desc_text, icon, features, cta_text, price_start) VALUES (${esc(s.id)}, ${esc(s.title)}, ${esc(s.desc || s.shortDesc)}, ${esc(s.icon || 'home')}, ${esc(JSON.stringify(s.features || []))}, ${esc(s.ctaText)}, ${esc(s.priceStart || '')});\n`;
    });
    sql += `\n`;

    // 6. GALLERY
    sql += `CREATE TABLE IF NOT EXISTS gallery (id VARCHAR(50) PRIMARY KEY, title VARCHAR(255), category VARCHAR(100), image TEXT, description TEXT, date VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    gallery.forEach(g => {
      sql += `INSERT INTO gallery (id, title, category, image, description, date) VALUES (${esc(g.id)}, ${esc(g.title)}, ${esc(g.category)}, ${esc(g.image || g.imageUrl)}, ${esc(g.description || '')}, ${esc(g.date || '')});\n`;
    });
    sql += `\n`;

    // 7. VIDEOS
    sql += `CREATE TABLE IF NOT EXISTS videos (id VARCHAR(50) PRIMARY KEY, title VARCHAR(255), platform VARCHAR(50), video_id VARCHAR(100), thumbnail TEXT, views VARCHAR(50), date VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    videos.forEach(v => {
      sql += `INSERT INTO videos (id, title, platform, video_id, thumbnail, views, date) VALUES (${esc(v.id)}, ${esc(v.title)}, ${esc(v.platform || 'YouTube')}, ${esc(v.videoId || '')}, ${esc(v.thumbnail || '')}, ${esc(v.views || '')}, ${esc(v.date || '')});\n`;
    });
    sql += `\n`;

    // 8. FAQS
    sql += `CREATE TABLE IF NOT EXISTS faqs (id VARCHAR(50) PRIMARY KEY, question TEXT, answer TEXT, category VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    faqs.forEach(f => {
      sql += `INSERT INTO faqs (id, question, answer, category) VALUES (${esc(f.id)}, ${esc(f.q || f.question)}, ${esc(f.a || f.answer)}, ${esc(f.category || 'Umum')});\n`;
    });
    sql += `\n`;

    // 9. BLOGS
    sql += `CREATE TABLE IF NOT EXISTS blogs (id VARCHAR(50) PRIMARY KEY, title VARCHAR(255), category VARCHAR(100), date VARCHAR(50), read_time VARCHAR(50), author_name VARCHAR(255), image TEXT, summary TEXT, content TEXT, tags TEXT, views INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);\n`;
    blogs.forEach(b => {
      const authorName = typeof b.author === 'string' ? b.author : b.author?.name || 'Dena Permana';
      sql += `INSERT INTO blogs (id, title, category, date, read_time, author_name, image, summary, content, tags, views) VALUES (${esc(b.id)}, ${esc(b.title)}, ${esc(b.category)}, ${esc(b.date)}, ${esc(b.readTime)}, ${esc(authorName)}, ${esc(b.image)}, ${esc(b.summary || b.excerpt)}, ${esc(b.content)}, ${esc(JSON.stringify(b.tags || []))}, ${b.views || 0});\n`;
    });

    const blob = new Blob([sql], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Database_DenaPermana_${new Date().toISOString().slice(0, 10)}.sql`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Add Property Submit
  const handleAddPropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropTitle) return;

    StorageAPI.addProperty({
      title: newPropTitle,
      price: newPropPrice,
      priceNumeric: newPropNumeric,
      location: newPropLocation,
      cluster: newPropCluster,
      developer: newPropDeveloper,
      status: newPropStatus,
      type: newPropType,
      lt: newPropLt,
      lb: newPropLb,
      bedrooms: newPropBed,
      bathrooms: newPropBath,
      carport: newPropCarport,
      description: newPropDesc || `Hunian mewah ${newPropTitle} berlokasi strategis di ${newPropLocation}. Dilengkapi keamanan 24 jam dan fasilitas club house lengkap.`,
      features: ['One Gate System', 'Keamanan 24 Jam', 'Club House & Kolam Renang', 'Underground Utilities', 'Smart Home System'],
      images: [
        newPropImage,
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
      ],
      isFeatured: true
    });

    onRefresh();
    setShowAddPropertyModal(false);
    setNewPropTitle('');
    alert("Property berhasil ditambahkan ke listing!");
  };

  // Handle Delete Property
  const handleDeleteProperty = (id: string) => {
    if (window.confirm("Hapus properti ini dari database?")) {
      StorageAPI.deleteProperty(id);
      onRefresh();
    }
  };

  // Handle Reset Demo Data
  const handleResetData = () => {
    if (window.confirm("⚠️ PERHATIAN: Apakah Anda yakin ingin me-reset seluruh database ke data bawaan (demo initial data)? Semua perubahan manual akan hilang.")) {
      StorageAPI.resetToDefault();
      onRefresh();
      alert("Database telah dikembalikan ke kondisi standar!");
    }
  };

  // Handle Add Gallery Submit
  const handleAddGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle) return;
    StorageAPI.addGalleryItem({
      title: galTitle,
      category: galCategory as any,
      image: galImage,
      description: galDesc || `Dokumentasi ${galTitle}`
    });
    onRefresh();
    setShowAddGalleryModal(false);
    setGalTitle('');
    alert("Foto galeri berhasil ditambahkan!");
  };

  // Handle Add Portfolio Submit
  const handleAddPortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle) return;
    StorageAPI.addPortfolio({
      title: portTitle,
      category: portCategory as any,
      location: portLocation,
      image: portImage,
      description: portDesc || `Proyek sukses ${portTitle} di ${portLocation}`,
      client: "Klien RR Property",
      year: "2026",
      impact: "100% Sold Out / Completed"
    });
    onRefresh();
    setShowAddPortfolioModal(false);
    setPortTitle('');
    alert("Portofolio berhasil ditambahkan!");
  };

  // Handle Add Testimonial Submit
  const handleAddTestiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testiName || !testiReview) return;
    StorageAPI.addTestimonial({
      name: testiName,
      role: testiRole,
      review: testiReview,
      rating: testiRating,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      photo: testiPhoto,
      platform: testiPlatform,
      isFeatured: true
    });
    onRefresh();
    setShowAddTestiModal(false);
    setTestiName('');
    setTestiReview('');
    alert("Testimoni berhasil ditambahkan!");
  };

  // Handle Add Blog Submit
  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle) return;
    StorageAPI.addBlog({
      title: blogTitle,
      slug: blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: blogCategory as any,
      summary: blogSummary || `Panduan lengkap mengenai ${blogTitle} untuk pembeli dan investor properti.`,
      content: blogSummary || `Artikel selengkapnya mengenai ${blogTitle}. Dena Permana siap membantu konsultasi properti terbaik di Bandung Raya.`,
      image: blogImage,
      readTime: "4 min read",
      author: {
        name: "Dena Permana",
        role: "Senior Property Consultant Bandung",
        avatar: "https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0"
      }
    });
    onRefresh();
    setShowAddBlogModal(false);
    setBlogTitle('');
    alert("Artikel blog berhasil diterbitkan!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-white text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Admin Mode Active
            </span>
            <span className="text-xs text-emerald-400 font-medium">Dashboard Pengelola</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            RR Property Bandung Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Kelola prospek WhatsApp (Leads), listing perumahan, portofolio proyek, ulasan konsumen, dan konten blog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            <Download className="w-4 h-4" />
            <span>Export Leads (.CSV)</span>
          </button>

          <button
            onClick={handleExportSQL}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
            title="Download seluruh data website (Properti, Leads, Blog, dll) dalam format SQL siap impor ke MySQL/PostgreSQL"
          >
            <Database className="w-4 h-4" />
            <span>Export SQL Database (.SQL)</span>
          </button>

          <button
            onClick={handleResetData}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-bold text-xs px-4 py-2.5 rounded-xl transition border border-red-500/30"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={onExitAdmin}
            className="flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-200 font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            <span>Keluar ke Mode Publik ↗</span>
          </button>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 scrollbar-none">
        {[
          { id: 'leads', label: `Leads WhatsApp (${leads.length})`, icon: Users },
          { id: 'properties', label: `Property Listing (${properties.length})`, icon: Home },
          { id: 'portfolio', label: `Portofolio (${portfolio.length})`, icon: Briefcase },
          { id: 'testimonials', label: `Testimoni (${testimonials.length})`, icon: Star },
          { id: 'services', label: `Layanan (${services.length})`, icon: Briefcase },
          { id: 'gallery', label: `Galeri (${gallery.length})`, icon: Image },
          { id: 'videos', label: `Video (${videos.length})`, icon: Video },
          { id: 'faqs', label: `FAQ (${faqs.length})`, icon: HelpCircle },
          { id: 'blogs', label: `Blog Artikel (${blogs.length})`, icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shrink-0 transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: LEADS WHATSAPP */}
      {activeAdminTab === 'leads' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                <span>Daftar Calon Konsumen & Prospek (Leads)</span>
              </h3>
              <p className="text-xs text-gray-500">Data ini masuk secara otomatis setiap kali pengunjung mengisi form konsultasi, KPR calculator, atau klik WhatsApp.</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama atau nomor HP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 pl-10 pr-4 py-2 rounded-xl text-xs border border-gray-200 dark:border-gray-700 focus:outline-none text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 uppercase font-bold text-[11px]">
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Nama Prospek</th>
                  <th className="py-3 px-4">WhatsApp / HP</th>
                  <th className="py-3 px-4">Area & Budget</th>
                  <th className="py-3 px-4">Pesan & Sumber</th>
                  <th className="py-3 px-4">Status Prospek</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.phone.includes(searchQuery)).map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition">
                    <td className="py-4 px-4 text-gray-500 whitespace-nowrap">{lead.date}</td>
                    <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                      <div>{lead.name}</div>
                      <div className="text-[10px] text-gray-400 font-normal">{lead.email}</div>
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '').replace(/^0/, '62')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded"
                      >
                        <MessageCircle className="w-3 h-3 fill-current" />
                        <span>{lead.phone}</span>
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">{lead.location}</div>
                      <div className="text-[10px] text-emerald-600 font-bold">{lead.budget}</div>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="text-gray-700 dark:text-gray-300 line-clamp-2 italic">"{lead.message}"</div>
                      <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded mt-1 inline-block">Sumber: {lead.source}</span>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e: any) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-xs border-0 focus:outline-none cursor-pointer ${
                          lead.status === 'Baru' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                          lead.status === 'Dihubungi' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                          lead.status === 'Deal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                          'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        <option value="Baru">🔴 Baru</option>
                        <option value="Dihubungi">🔵 Dihubungi</option>
                        <option value="Deal">🟢 Deal (Closed)</option>
                        <option value="Batal">⚫ Batal / Archive</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition"
                        title="Hapus Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {leads.length === 0 && (
              <div className="text-center py-12 text-gray-400 text-sm">Belum ada data prospek masuk.</div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROPERTY LISTING */}
      {activeAdminTab === 'properties' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <Home className="w-6 h-6 text-emerald-600" />
                <span>Manajemen Listing Properti ({properties.length} Unit)</span>
              </h3>
              <p className="text-xs text-gray-500">Tambahkan listing perumahan baru, ubah harga promo, atau update status ketersediaan unit.</p>
            </div>
            <button
              onClick={() => setShowAddPropertyModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Listing Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {properties.map((prop) => (
              <div key={prop.id} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-3">
                <div className="relative h-40 rounded-xl overflow-hidden bg-gray-800">
                  <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {prop.status}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{prop.title}</h4>
                  <div className="text-xs font-extrabold text-orange-500">{prop.price}</div>
                  <div className="text-[11px] text-gray-500 line-clamp-1">{prop.location} • {prop.cluster}</div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                    <span>🛏️ {prop.bedrooms} KT</span>
                    <span>🛁 {prop.bathrooms} KM</span>
                    <span>📐 {prop.lt} m²</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                    {prop.developer}
                  </span>
                  <button
                    onClick={() => handleDeleteProperty(prop.id)}
                    className="p-1.5 rounded bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition"
                    title="Hapus Property"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: GALERI FOTO & DRONE */}
      {activeAdminTab === 'gallery' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <Image className="w-6 h-6 text-emerald-600" />
                <span>Manajemen Galeri Foto & Drone ({gallery.length} Foto)</span>
              </h3>
              <p className="text-xs text-gray-500">Kelola foto dokumentasi proyek, drone view, dan interior rumah.</p>
            </div>
            <button
              onClick={() => setShowAddGalleryModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Foto Galeri</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-gray-800">
                  <img src={item.image || item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                </div>
                <div className="pt-2 flex items-center justify-end border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={() => {
                      if (window.confirm("Hapus foto ini dari galeri?")) {
                        StorageAPI.deleteGalleryItem(item.id);
                        onRefresh();
                      }
                    }}
                    className="p-1.5 rounded bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition flex items-center gap-1 text-xs font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PORTOFOLIO PROYEK */}
      {activeAdminTab === 'portfolio' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-emerald-600" />
                <span>Manajemen Portofolio Proyek ({portfolio.length} Proyek)</span>
              </h3>
              <p className="text-xs text-gray-500">Daftar rekam jejak penjualan dan proyek properti sukses Dena Permana.</p>
            </div>
            <button
              onClick={() => setShowAddPortfolioModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Portofolio</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-gray-800">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.title}</h4>
                  <div className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-2 mt-2">{item.description}</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-400 font-semibold">{item.year} • {item.impact}</span>
                  <button
                    onClick={() => {
                      if (window.confirm("Hapus portofolio ini?")) {
                        StorageAPI.deletePortfolio(item.id);
                        onRefresh();
                      }
                    }}
                    className="p-1.5 rounded bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TESTIMONI KONSUMEN */}
      {activeAdminTab === 'testimonials' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <Star className="w-6 h-6 text-emerald-600" />
                <span>Manajemen Testimoni Klien ({testimonials.length} Review)</span>
              </h3>
              <p className="text-xs text-gray-500">Ulasan dan kepuasan pembeli rumah serta investor properti.</p>
            </div>
            <button
              onClick={() => setShowAddTestiModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Testimoni</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-4">
                <div className="flex items-center gap-3">
                  <img src={item.photo} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{item.name}</h4>
                    <div className="text-[11px] text-emerald-600 font-semibold">{item.role}</div>
                    <div className="flex text-amber-400 mt-0.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 italic">"{item.review}"</p>
                <div className="pt-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 text-[10px] text-gray-400">
                  <span>Via: {item.platform}</span>
                  <button
                    onClick={() => {
                      if (window.confirm("Hapus testimoni ini?")) {
                        StorageAPI.deleteTestimonial(item.id);
                        onRefresh();
                      }
                    }}
                    className="p-1.5 rounded bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: BLOG ARTIKEL */}
      {activeAdminTab === 'blogs' && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-emerald-600" />
                <span>Manajemen Artikel Blog ({blogs.length} Artikel)</span>
              </h3>
              <p className="text-xs text-gray-500">Publikasi tips properti, info pasar, dan edukasi investasi.</p>
            </div>
            <button
              onClick={() => setShowAddBlogModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Terbitkan Artikel Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((item) => (
              <div key={item.id} className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col justify-between space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden bg-gray-800">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">{item.date} • {item.readTime}</div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mt-1 line-clamp-2">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">{item.summary || item.excerpt}</p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                    <img src={typeof item.author === 'string' ? 'https://lh3.googleusercontent.com/d/1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P=s1000?authuser=0' : item.author?.avatar} alt={typeof item.author === 'string' ? item.author : item.author?.name} className="w-5 h-5 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://drive.google.com/thumbnail?id=1VHoJt9mUv5rhUfd1h-P0ZOLL0hEjRL4P&sz=w1000'; }} />
                    <span>{typeof item.author === 'string' ? item.author : item.author?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm("Hapus artikel ini?")) {
                        StorageAPI.deleteBlog(item.id);
                        onRefresh();
                      }
                    }}
                    className="p-1.5 rounded bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5, 7, 8: SERVICES, VIDEOS, FAQS (CLEAN SUMMARY TABLE) */}
      {(activeAdminTab === 'services' || activeAdminTab === 'videos' || activeAdminTab === 'faqs') && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white uppercase">
                Manajemen {activeAdminTab}
              </h3>
              <p className="text-xs text-gray-500">Daftar item aktif pada modul {activeAdminTab}.</p>
            </div>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {activeAdminTab === 'services' && services.map(s => (
              <div key={s.id} className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">{s.title}</div>
                  <div className="text-xs text-gray-500">{s.desc || s.shortDesc}</div>
                </div>
              </div>
            ))}
            {activeAdminTab === 'videos' && videos.map(v => (
              <div key={v.id} className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">{v.title}</div>
                  <div className="text-xs text-emerald-600">{v.platform} • {v.views}</div>
                </div>
                <button onClick={() => { StorageAPI.deleteVideo(v.id); onRefresh(); }} className="p-1.5 bg-red-100 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            {activeAdminTab === 'faqs' && faqs.map(f => (
              <div key={f.id} className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-white">{f.q || f.question}</div>
                  <div className="text-xs text-gray-500">{f.a || f.answer}</div>
                </div>
                <button onClick={() => { StorageAPI.deleteFAQ(f.id); onRefresh(); }} className="p-1.5 bg-red-100 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD PROPERTY MODAL */}
      {showAddPropertyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl">+ Tambah Listing Properti Baru</h3>
              <button onClick={() => setShowAddPropertyModal(false)} className="text-white hover:text-gray-200">✕</button>
            </div>

            <form onSubmit={handleAddPropertySubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Nama Tipe / Cluster *</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Tipe Amagriya - Podomoro Park"
                    value={newPropTitle}
                    onChange={(e) => setNewPropTitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Harga Display *</label>
                  <input
                    type="text"
                    required
                    placeholder="cth: Rp 1.85 Milyar"
                    value={newPropPrice}
                    onChange={(e) => setNewPropPrice(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Cluster / Kawasan</label>
                  <input
                    type="text"
                    value={newPropCluster}
                    onChange={(e) => setNewPropCluster(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Developer</label>
                  <input
                    type="text"
                    value={newPropDeveloper}
                    onChange={(e) => setNewPropDeveloper(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Status Unit</label>
                  <select
                    value={newPropStatus}
                    onChange={(e: any) => setNewPropStatus(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Diperjualbelikan">Diperjualbelikan</option>
                    <option value="Hot Offer">Hot Offer</option>
                    <option value="Booking">Booking</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Luas Tanah</label>
                  <input type="number" value={newPropLt} onChange={(e) => setNewPropLt(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Luas Bangunan</label>
                  <input type="number" value={newPropLb} onChange={(e) => setNewPropLb(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Kamar Tidur</label>
                  <input type="number" value={newPropBed} onChange={(e) => setNewPropBed(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Kamar Mandi</label>
                  <input type="number" value={newPropBath} onChange={(e) => setNewPropBath(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Carport</label>
                  <input type="number" value={newPropCarport} onChange={(e) => setNewPropCarport(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border" />
                </div>
              </div>

              <div>
                <AdminImageUploader
                  label="Foto Utama Properti *"
                  value={newPropImage}
                  onChange={(url) => setNewPropImage(url)}
                  helpText="Pilih foto rumah/cluster dari galeri HP atau file komputer Anda."
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Deskripsi & Keunggulan</label>
                <textarea
                  rows={3}
                  placeholder="Deskripsikan keunggulan tipe ini..."
                  value={newPropDesc}
                  onChange={(e) => setNewPropDesc(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddPropertyModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg"
                >
                  Simpan Properti ke Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD GALLERY MODAL */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-5 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">+ Tambah Foto Galeri & Drone</h3>
              <button onClick={() => setShowAddGalleryModal(false)} className="text-white hover:text-gray-200">✕</button>
            </div>
            <form onSubmit={handleAddGallerySubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Judul Foto *</label>
                <input type="text" required placeholder="cth: Drone View Kawasan Podomoro Park" value={galTitle} onChange={(e) => setGalTitle(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Kategori</label>
                <select value={galCategory} onChange={(e) => setGalCategory(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  <option value="Foto">Foto Proyek</option>
                  <option value="Drone">Drone View</option>
                  <option value="Interior">Interior Show unit</option>
                  <option value="Exterior">Exterior Fasad</option>
                  <option value="Event">Event & Booking</option>
                </select>
              </div>
              <div>
                <AdminImageUploader label="Upload File Foto (Desktop / HP) *" value={galImage} onChange={(url) => setGalImage(url)} helpText="Pilih foto dokumentasi atau drone dari galeri HP / folder komputer Anda." />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Keterangan Singkat</label>
                <textarea rows={2} placeholder="Keterangan lokasi atau fasilitas foto ini..." value={galDesc} onChange={(e) => setGalDesc(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setShowAddGalleryModal(false)} className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg">Simpan ke Galeri</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PORTFOLIO MODAL */}
      {showAddPortfolioModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-5 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">+ Tambah Portofolio Penjualan</h3>
              <button onClick={() => setShowAddPortfolioModal(false)} className="text-white hover:text-gray-200">✕</button>
            </div>
            <form onSubmit={handleAddPortfolioSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Nama Proyek / Unit Sold *</label>
                <input type="text" required placeholder="cth: Sold 3 Unit Cluster Padmagriya" value={portTitle} onChange={(e) => setPortTitle(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Kategori</label>
                  <select value={portCategory} onChange={(e) => setPortCategory(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white">
                    <option value="Property">Property</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Website">Website</option>
                    <option value="Branding">Branding</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Lokasi</label>
                  <input type="text" placeholder="Bandung, KBP, dll" value={portLocation} onChange={(e) => setPortLocation(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white" />
                </div>
              </div>
              <div>
                <AdminImageUploader label="Upload Foto Portofolio / Serah Terima *" value={portImage} onChange={(url) => setPortImage(url)} helpText="Foto momen serah terima kunci atau dokumentasi kesepakatan dari kamera HP." />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Dampak & Deskripsi</label>
                <textarea rows={2} placeholder="Dampak pencapaian proyek..." value={portDesc} onChange={(e) => setPortDesc(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setShowAddPortfolioModal(false)} className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg">Simpan Portofolio</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD TESTIMONIAL MODAL */}
      {showAddTestiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-5 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">+ Tambah Testimoni Konsumen</h3>
              <button onClick={() => setShowAddTestiModal(false)} className="text-white hover:text-gray-200">✕</button>
            </div>
            <form onSubmit={handleAddTestiSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Nama Klien *</label>
                  <input type="text" required placeholder="cth: Bapak Hendra & Keluarga" value={testiName} onChange={(e) => setTestiName(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Role / Peran</label>
                  <input type="text" placeholder="Pembeli Rumah di KBP" value={testiRole} onChange={(e) => setTestiRole(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Rating Bintang</label>
                  <select value={testiRating} onChange={(e) => setTestiRating(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white">
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Sumber Ulasan</label>
                  <select value={testiPlatform} onChange={(e: any) => setTestiPlatform(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white">
                    <option value="Google Review">Google Review</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>
              </div>
              <div>
                <AdminImageUploader label="Upload Foto Profil Klien (Desktop / HP) *" value={testiPhoto} onChange={(url) => setTestiPhoto(url)} helpText="Ambil foto profil atau momen bersama konsumen dari galeri HP Anda." />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Isi Testimoni *</label>
                <textarea rows={3} required placeholder="Pelayanan Kang Dena sangat jujur dan cepat..." value={testiReview} onChange={(e) => setTestiReview(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setShowAddTestiModal(false)} className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg">Simpan Testimoni</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD BLOG MODAL */}
      {showAddBlogModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 my-8 max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-5 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">+ Terbitkan Artikel Blog</h3>
              <button onClick={() => setShowAddBlogModal(false)} className="text-white hover:text-gray-200">✕</button>
            </div>
            <form onSubmit={handleAddBlogSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Judul Artikel *</label>
                <input type="text" required placeholder="cth: Prediksi Harga Rumah Bandung 2026" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Kategori Artikel</label>
                <select value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white">
                  <option value="Property">Property</option>
                  <option value="Tips">Tips & Panduan</option>
                  <option value="Investasi">Investasi Properti</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div>
                <AdminImageUploader label="Upload Banner Artikel (Desktop / HP) *" value={blogImage} onChange={(url) => setBlogImage(url)} helpText="Upload foto ilustrasi atau banner artikel blog dari HP/PC Anda." />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">Ringkasan / Isi Artikel</label>
                <textarea rows={4} placeholder="Tuliskan rangkuman dan poin-poin penting artikel..." value={blogSummary} onChange={(e) => setBlogSummary(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 px-3 py-2.5 rounded-xl border text-gray-900 dark:text-white" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setShowAddBlogModal(false)} className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold">Batal</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg">Terbitkan Artikel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
