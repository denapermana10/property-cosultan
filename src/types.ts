export type PropertyStatus = 'Diperjualbelikan' | 'Sold Out' | 'Booking' | 'Hot Offer' | 'Sewa' | string;
export type PropertyCluster = 'Podomoro Park Bandung' | 'Kota Baru Parahyangan' | 'Summarecon Bandung' | 'Dago Resort' | 'Sharia Green Valley' | 'Ciumbuleuit Residence' | 'Arcamanik Elite' | 'Setra Duta Luxury' | string;

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: string;
  priceNumeric: number; // in Rupiah for sorting & KPR filtering
  location: string;
  cluster: PropertyCluster;
  status: PropertyStatus;
  developer: string;
  type?: string;
  lt: number; // Luas Tanah m2
  lb: number; // Luas Bangunan m2
  bedrooms: number;
  bathrooms: number;
  carport: number;
  description: string;
  images: string[];
  videoUrl?: string;
  mapEmbedUrl?: string;
  features: string[];
  isFeatured: boolean;
  dateAdded: string;
}

export type PortfolioCategory = 'Website' | 'Property' | 'Marketing' | 'Branding' | 'Landing Page' | string;

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  description: string;
  location: string;
  year: string;
  client: string;
  gallery?: string[];
  projectUrl?: string;
  impact?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  ctaText: string;
  priceStart?: string;
  desc?: string;
}

export type BlogCategory = 'Property' | 'Tips' | 'Investasi' | 'Marketing' | 'SEO' | string;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  author: string | { name: string; role: string; avatar: string; };
  image: string;
  excerpt?: string;
  summary?: string;
  content: string;
  tags?: string[];
  views?: number;
  comments?: BlogComment[];
}

export interface BlogComment {
  id: string;
  name: string;
  date: string;
  comment: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g. "Investor Properti", "Pembeli Rumah Podomoro Park"
  photo: string;
  review: string;
  rating: number; // 1-5
  propertyBought?: string;
  videoUrl?: string; // YouTube or TikTok link
  date: string;
  platform: 'Google Review' | 'WhatsApp' | 'Instagram' | 'Website Verified' | string;
  isFeatured?: boolean;
}

export type GalleryCategory = 'Foto' | 'Drone' | 'Interior' | 'Exterior' | 'Event' | string;

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl?: string;
  image?: string;
  date?: string;
  location?: string;
  description?: string;
}

export type VideoPlatform = 'YouTube' | 'TikTok' | 'Facebook' | 'Instagram' | string;

export interface VideoItem {
  id: string;
  title: string;
  platform: VideoPlatform;
  embedUrl?: string;
  videoUrl?: string; // alias
  thumbnail?: string;
  description?: string;
  externalUrl?: string;
  duration?: string;
  views?: string;
  date?: string;
}

export interface FAQItem {
  id: string;
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
  category: 'KPR & Keuangan' | 'Legalitas & Sertifikat' | 'Booking & Survey' | 'Investasi Properti' | 'Umum' | 'Pembelian' | 'Penjualan' | 'KPR' | 'Legalitas' | 'Investasi' | string;
}

export type LeadStatus = 'Baru' | 'Dihubungi' | 'Survei Jadwal' | 'Closing' | 'Batal' | 'Deal' | string;

export interface ContactLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  budget?: string;
  location?: string;
  date: string;
  status: LeadStatus;
  source: 'Form Kontak' | 'Simulasi KPR' | 'Layanan' | 'AI Assistant' | 'Kalender Booking' | 'Halaman Kontak' | string;
}

export type LeadItem = ContactLead;

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
  youtube?: string;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  openGraphImage: string;
  keywords: string[];
}

