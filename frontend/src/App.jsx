import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import AnnouncementBanner from './components/layout/AnnouncementBanner.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/ui/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import CaseStudies from './pages/CaseStudies.jsx';
import CaseStudyDetail from './pages/CaseStudyDetail.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import About from './pages/About.jsx';
import Career from './pages/Career.jsx';
import NotFound from './pages/NotFound.jsx';
import Resources from './pages/Resources.jsx';
import UseCases from './pages/UseCases.jsx';
import Press from './pages/Press.jsx';
import PrivacyPolicy from './pages/Privacy.jsx';
import TermsAndConditions from './pages/Terms.jsx';
import CookiesPolicy from './pages/Cookies.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import ToolPage from './pages/ToolPage.jsx';

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(
    () => localStorage.getItem('banner_dismissed') !== 'true'
  );

  const dismissBanner = () => {
    localStorage.setItem('banner_dismissed', 'true');
    setBannerVisible(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#0D1E3A]">
      <ScrollToTop />
      {bannerVisible && <AnnouncementBanner onDismiss={dismissBanner} />}
      <Navbar bannerVisible={bannerVisible} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/press" element={<Press />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/cookies" element={<CookiesPolicy />} />

          {/* Marketplace routes */}
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/tools/:slug" element={<ToolPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
