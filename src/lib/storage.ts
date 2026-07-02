import { 
  Property, 
  PortfolioItem, 
  ServiceItem, 
  BlogPost, 
  Testimonial, 
  GalleryItem, 
  VideoItem, 
  FAQItem, 
  ContactLead, 
  ActivityLog, 
  SocialLinks, 
  SEOSettings 
} from '../types';
import { 
  INITIAL_PROPERTIES, 
  INITIAL_PORTFOLIO, 
  INITIAL_SERVICES, 
  INITIAL_BLOGS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_GALLERY, 
  INITIAL_VIDEOS, 
  INITIAL_FAQS, 
  INITIAL_LEADS, 
  INITIAL_SOCIAL_LINKS, 
  INITIAL_SEO_SETTINGS 
} from '../data/initialData';

const STORAGE_KEYS = {
  PROPERTIES: 'dena_properties_v1',
  PORTFOLIO: 'dena_portfolio_v1',
  SERVICES: 'dena_services_v1',
  BLOGS: 'dena_blogs_v1',
  TESTIMONIALS: 'dena_testimonials_v1',
  GALLERY: 'dena_gallery_v1',
  VIDEOS: 'dena_videos_v1',
  FAQS: 'dena_faqs_v1',
  LEADS: 'dena_leads_v1',
  LOGS: 'dena_logs_v1',
  SOCIAL_LINKS: 'dena_social_v1',
  SEO: 'dena_seo_v1',
  ADMIN_AUTH: 'dena_admin_auth_v1',
  DARK_MODE: 'dena_theme_v1'
};

// Event listener mechanism for instant re-render across tabs/components
type Listener = () => void;
const listeners: Set<Listener> = new Set();

export function subscribeStorage(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach(l => l());
}

// Generic Getter & Setter with LocalStorage and memory fallback
function getItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item);
  } catch (e) {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    notifyListeners();
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// API Methods
export const StorageAPI = {
  // Properties
  getProperties: (): Property[] => getItem<Property[]>(STORAGE_KEYS.PROPERTIES, INITIAL_PROPERTIES),
  saveProperties: (props: Property[]) => setItem(STORAGE_KEYS.PROPERTIES, props),
  addProperty: (propData: Omit<Property, 'id' | 'slug' | 'dateAdded'> & Partial<Pick<Property, 'id' | 'slug' | 'dateAdded'>>) => {
    const prop: Property = {
      id: propData.id || `prop-${Date.now()}`,
      slug: propData.slug || propData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      dateAdded: propData.dateAdded || new Date().toISOString().slice(0, 10),
      ...propData
    } as Property;
    const props = StorageAPI.getProperties();
    StorageAPI.saveProperties([prop, ...props]);
    StorageAPI.addLog(`Menambahkan listing properti baru: "${prop.title}"`, "Admin Dena");
  },
  updateProperty: (prop: Property) => {
    const props = StorageAPI.getProperties().map(p => p.id === prop.id ? prop : p);
    StorageAPI.saveProperties(props);
    StorageAPI.addLog(`Memperbarui listing properti: "${prop.title}"`, "Admin Dena");
  },
  deleteProperty: (id: string) => {
    const props = StorageAPI.getProperties().filter(p => p.id !== id);
    StorageAPI.saveProperties(props);
    StorageAPI.addLog(`Menghapus listing properti ID: ${id}`, "Admin Dena");
  },

  // Portfolio
  getPortfolio: (): PortfolioItem[] => getItem<PortfolioItem[]>(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO),
  savePortfolio: (items: PortfolioItem[]) => setItem(STORAGE_KEYS.PORTFOLIO, items),
  addPortfolio: (itemData: Omit<PortfolioItem, 'id'> & Partial<Pick<PortfolioItem, 'id'>>) => {
    const item: PortfolioItem = {
      id: itemData.id || `port-${Date.now()}`,
      ...itemData
    } as PortfolioItem;
    const items = StorageAPI.getPortfolio();
    StorageAPI.savePortfolio([item, ...items]);
    StorageAPI.addLog(`Menambahkan portofolio baru: "${item.title}"`, "Admin Dena");
  },
  deletePortfolio: (id: string) => {
    const items = StorageAPI.getPortfolio().filter(p => p.id !== id);
    StorageAPI.savePortfolio(items);
  },

  // Services
  getServices: (): ServiceItem[] => getItem<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES),
  saveServices: (items: ServiceItem[]) => setItem(STORAGE_KEYS.SERVICES, items),

  // Blogs
  getBlogs: (): BlogPost[] => getItem<BlogPost[]>(STORAGE_KEYS.BLOGS, INITIAL_BLOGS),
  saveBlogs: (posts: BlogPost[]) => setItem(STORAGE_KEYS.BLOGS, posts),
  addBlog: (postData: Omit<BlogPost, 'id' | 'date'> & Partial<Pick<BlogPost, 'id' | 'date'>>) => {
    const post: BlogPost = {
      id: postData.id || `blog-${Date.now()}`,
      date: postData.date || new Date().toISOString().slice(0, 10),
      ...postData
    } as BlogPost;
    const posts = StorageAPI.getBlogs();
    StorageAPI.saveBlogs([post, ...posts]);
    StorageAPI.addLog(`Menerbitkan artikel blog baru: "${post.title}"`, "Admin Dena");
  },
  deleteBlog: (id: string) => {
    const posts = StorageAPI.getBlogs().filter(b => b.id !== id);
    StorageAPI.saveBlogs(posts);
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => getItem<Testimonial[]>(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS),
  saveTestimonials: (items: Testimonial[]) => setItem(STORAGE_KEYS.TESTIMONIALS, items),
  addTestimonial: (itemData: Omit<Testimonial, 'id'> & Partial<Pick<Testimonial, 'id'>>) => {
    const item: Testimonial = {
      id: itemData.id || `testi-${Date.now()}`,
      ...itemData
    } as Testimonial;
    const items = StorageAPI.getTestimonials();
    StorageAPI.saveTestimonials([item, ...items]);
    StorageAPI.addLog(`Menambahkan testimoni baru dari: "${item.name}"`, "Admin Dena");
  },
  deleteTestimonial: (id: string) => {
    const items = StorageAPI.getTestimonials().filter(t => t.id !== id);
    StorageAPI.saveTestimonials(items);
  },

  // Gallery
  getGallery: (): GalleryItem[] => getItem<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY),
  saveGallery: (items: GalleryItem[]) => setItem(STORAGE_KEYS.GALLERY, items),
  addGalleryItem: (itemData: Omit<GalleryItem, 'id'> & Partial<Pick<GalleryItem, 'id'>>) => {
    const item: GalleryItem = {
      id: itemData.id || `gal-${Date.now()}`,
      ...itemData
    } as GalleryItem;
    const items = StorageAPI.getGallery();
    StorageAPI.saveGallery([item, ...items]);
    StorageAPI.addLog(`Mengunggah foto galeri: "${item.title}"`, "Admin Dena");
  },
  deleteGalleryItem: (id: string) => {
    const items = StorageAPI.getGallery().filter(g => g.id !== id);
    StorageAPI.saveGallery(items);
  },

  // Videos
  getVideos: (): VideoItem[] => getItem<VideoItem[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS),
  saveVideos: (items: VideoItem[]) => setItem(STORAGE_KEYS.VIDEOS, items),
  addVideo: (itemData: Omit<VideoItem, 'id'> & Partial<Pick<VideoItem, 'id'>>) => {
    const item: VideoItem = {
      id: itemData.id || `vid-${Date.now()}`,
      ...itemData
    } as VideoItem;
    const items = StorageAPI.getVideos();
    StorageAPI.saveVideos([item, ...items]);
    StorageAPI.addLog(`Menambahkan video pemasaran: "${item.title}"`, "Admin Dena");
  },
  deleteVideo: (id: string) => {
    const items = StorageAPI.getVideos().filter(v => v.id !== id);
    StorageAPI.saveVideos(items);
  },

  // FAQs
  getFAQs: (): FAQItem[] => getItem<FAQItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS),
  getFaqs: (): FAQItem[] => StorageAPI.getFAQs(), // alias
  saveFAQs: (items: FAQItem[]) => setItem(STORAGE_KEYS.FAQS, items),
  addFAQ: (itemData: Omit<FAQItem, 'id'> & Partial<Pick<FAQItem, 'id'>>) => {
    const item: FAQItem = {
      id: itemData.id || `faq-${Date.now()}`,
      ...itemData
    } as FAQItem;
    const items = StorageAPI.getFAQs();
    StorageAPI.saveFAQs([...items, item]);
  },
  deleteFAQ: (id: string) => {
    const items = StorageAPI.getFAQs().filter(f => f.id !== id);
    StorageAPI.saveFAQs(items);
  },

  // Leads & Contacts
  getLeads: (): ContactLead[] => getItem<ContactLead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS),
  saveLeads: (leads: ContactLead[]) => setItem(STORAGE_KEYS.LEADS, leads),
  addLead: (leadData: Omit<ContactLead, 'id' | 'date' | 'status'>): ContactLead => {
    const leads = StorageAPI.getLeads();
    const newLead: ContactLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Baru'
    };
    StorageAPI.saveLeads([newLead, ...leads]);
    StorageAPI.addLog(`Lead baru masuk dari ${newLead.source}: "${newLead.name}" (${newLead.phone})`, "Sistem Prospek");
    return newLead;
  },
  updateLeadStatus: (id: string, status: ContactLead['status']) => {
    const leads = StorageAPI.getLeads().map(l => l.id === id ? { ...l, status } : l);
    StorageAPI.saveLeads(leads);
    StorageAPI.addLog(`Mengubah status prospek ID ${id} menjadi: ${status}`, "Admin Dena");
  },
  deleteLead: (id: string) => {
    const leads = StorageAPI.getLeads().filter(l => l.id !== id);
    StorageAPI.saveLeads(leads);
  },

  // Activity Logs
  getLogs: (): ActivityLog[] => getItem<ActivityLog[]>(STORAGE_KEYS.LOGS, [
    {
      id: "log-1",
      action: "Sistem inisialisasi database properti Bandung Raya",
      user: "System",
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      details: "Database siap dengan listing Podomoro Park, KBP, Summarecon, Dago, Cinunuk."
    }
  ]),
  addLog: (action: string, user: string = "Admin Dena", details: string = "") => {
    const logs = StorageAPI.getLogs();
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      action,
      user,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      details
    };
    try {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify([newLog, ...logs].slice(0, 50)));
    } catch(e) {}
  },

  // Social & SEO
  getSocialLinks: (): SocialLinks => getItem<SocialLinks>(STORAGE_KEYS.SOCIAL_LINKS, INITIAL_SOCIAL_LINKS),
  saveSocialLinks: (links: SocialLinks) => setItem(STORAGE_KEYS.SOCIAL_LINKS, links),

  getSEOSettings: (): SEOSettings => getItem<SEOSettings>(STORAGE_KEYS.SEO, INITIAL_SEO_SETTINGS),
  saveSEOSettings: (seo: SEOSettings) => setItem(STORAGE_KEYS.SEO, seo),

  // Theme & Auth
  getDarkMode: (): boolean => getItem<boolean>(STORAGE_KEYS.DARK_MODE, false),
  setDarkMode: (dark: boolean) => {
    setItem(STORAGE_KEYS.DARK_MODE, dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  isAdminLoggedIn: (): boolean => getItem<boolean>(STORAGE_KEYS.ADMIN_AUTH, false),
  setAdminLoggedIn: (logged: boolean) => setItem(STORAGE_KEYS.ADMIN_AUTH, logged),

  // Subscription alias
  subscribe: subscribeStorage,

  // Reset database to initial
  resetDatabase: () => {
    localStorage.clear();
    notifyListeners();
    StorageAPI.addLog("Database di-reset ke data default Dena Permana", "Admin");
  },
  resetToDefault: () => StorageAPI.resetDatabase()
};

// Initialize dark mode on load
if (typeof window !== 'undefined') {
  if (StorageAPI.getDarkMode()) {
    document.documentElement.classList.add('dark');
  }
}
