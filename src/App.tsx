import React, { useState, useEffect } from 'react';
import { StorageAPI } from './lib/storage';
import { Property } from './types';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AIChatAssistant } from './components/AIChatAssistant';
import { KPRCalculator } from './components/KPRCalculator';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { LeadModal } from './components/LeadModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ServicesPage } from './pages/ServicesPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { VideoPage } from './pages/VideoPage';
import { TestimonialPage } from './pages/TestimonialPage';
import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Modal States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [leadModalService, setLeadModalService] = useState<string>('');

  // App Data State (synced from local storage / initial data)
  const [properties, setProperties] = useState(StorageAPI.getProperties());
  const [services, setServices] = useState(StorageAPI.getServices());
  const [portfolio, setPortfolio] = useState(StorageAPI.getPortfolio());
  const [testimonials, setTestimonials] = useState(StorageAPI.getTestimonials());
  const [gallery, setGallery] = useState(StorageAPI.getGallery());
  const [videos, setVideos] = useState(StorageAPI.getVideos());
  const [faqs, setFaqs] = useState(StorageAPI.getFaqs());
  const [blogs, setBlogs] = useState(StorageAPI.getBlogs());

  // Initialize and subscribe to Storage
  const refreshData = () => {
    setProperties(StorageAPI.getProperties());
    setServices(StorageAPI.getServices());
    setPortfolio(StorageAPI.getPortfolio());
    setTestimonials(StorageAPI.getTestimonials());
    setGallery(StorageAPI.getGallery());
    setVideos(StorageAPI.getVideos());
    setFaqs(StorageAPI.getFaqs());
    setBlogs(StorageAPI.getBlogs());
  };

  useEffect(() => {
    refreshData();
    const unsub = StorageAPI.subscribe(() => {
      refreshData();
    });
    return () => unsub();
  }, []);

  // Sync Dark Mode with HTML tag
  useEffect(() => {
    const storedTheme = localStorage.getItem('rr_theme');
    const darkMode = storedTheme ? storedTheme === 'dark' : true;
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('rr_theme', nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleAdmin = () => {
    const nextAdmin = !isAdmin;
    setIsAdmin(nextAdmin);
    if (nextAdmin) {
      setActiveTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('home');
    }
  };

  const handleOpenLeadModal = (serviceName: string = '') => {
    setLeadModalService(serviceName);
    setIsLeadModalOpen(true);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'admin') {
      setIsAdmin(true);
    } else if (isAdmin && tab !== 'admin') {
      setIsAdmin(false);
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200 font-sans">
      
      {/* 1. TOP NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isDark={isDark}
        toggleDark={toggleDark}
        isAdmin={isAdmin}
        toggleAdmin={toggleAdmin}
      />

      {/* 2. MAIN CONTENT VIEW RENDERER */}
      <main className="flex-1 pt-4 pb-16">
        {activeTab === 'home' && (
          <HomePage
            properties={properties}
            services={services}
            testimonials={testimonials}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            setActiveTab={handleTabChange}
            onOpenLeadModal={handleOpenLeadModal}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenLeadModal={() => handleOpenLeadModal('Konsultasi Profil Dena Permana')}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioPage
            portfolio={portfolio}
            onOpenLeadModal={() => handleOpenLeadModal('Konsultasi Proyek Portofolio')}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            services={services}
            onOpenLeadModal={handleOpenLeadModal}
          />
        )}

        {activeTab === 'properties' && (
          <PropertiesPage
            properties={properties}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onOpenLeadModal={() => handleOpenLeadModal('Pencarian Properti Khusus')}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage
            gallery={gallery}
          />
        )}

        {activeTab === 'videos' && (
          <VideoPage
            videos={videos}
          />
        )}

        {activeTab === 'testimonials' && (
          <TestimonialPage
            testimonials={testimonials}
            onOpenLeadModal={() => handleOpenLeadModal('Konsultasi Setelah Ulasan')}
          />
        )}

        {activeTab === 'blogs' && (
          <BlogPage
            posts={blogs}
            onOpenLeadModal={() => handleOpenLeadModal('Diskusi Topik Artikel')}
          />
        )}

        {activeTab === 'faq' && (
          <FAQPage
            faqs={faqs}
            onOpenLeadModal={() => handleOpenLeadModal('Pertanyaan FAQ Khusus')}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            onOpenLeadModal={() => handleOpenLeadModal('Konsultasi Kontak Darurat')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            properties={properties}
            onRefresh={refreshData}
            onExitAdmin={() => {
              setIsAdmin(false);
              setActiveTab('home');
            }}
          />
        )}
      </main>

      {/* 3. FOOTER */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenLeadModal={() => handleOpenLeadModal('Konsultasi dari Footer')}
      />

      {/* 4. FLOATING ACTIONS (WA, PHONE, SCROLL TOP) */}
      <FloatingActions
        onOpenLeadModal={() => handleOpenLeadModal('Konsultasi Tombol Cepat')}
      />

      {/* 5. AI CHAT ASSISTANT (GEMINI REAL-TIME PROPERTY ADVISOR) */}
      <AIChatAssistant
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onOpenLeadModal={() => handleOpenLeadModal('Rekomendasi AI Assistant')}
      />

      {/* 6. MODALS */}
      {/* Property Detail & KPR Simulation Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onOpenLeadModal={() => handleOpenLeadModal(`Unit ${selectedProperty.title}`)}
        />
      )}

      {/* Quick Consultation & Survey Booking Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultService={leadModalService}
      />

    </div>
  );
}
