import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, ArrowRight,
  Users, TrendingUp, Bot, Workflow, Globe, BarChart3, Zap, Factory,
  Heart, GraduationCap, Hotel, Building2, ShoppingCart, Truck,
  Phone, Cpu, BookOpen
} from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';

const SOLUTIONS_MEGA = [
  { label: 'Sales Automation', to: '/solutions/sales-automation', icon: <TrendingUp size={16} /> },
  { label: 'Marketing Automation', to: '/solutions/marketing-automation', icon: <Zap size={16} /> },
  { label: 'HRMS & Hiring', to: '/solutions/hrms-hiring', icon: <Users size={16} /> },
  { label: 'Operations', to: '/solutions/operations', icon: <Workflow size={16} /> },
  { label: 'Supply Chain', to: '/solutions/supply-chain', icon: <Globe size={16} /> },
  { label: 'Finance & Accounts', to: '/solutions/finance-accounts', icon: <BarChart3 size={16} /> },
  { label: 'AI Voice & Chat', to: '/solutions/ai-voice-chat', icon: <Bot size={16} /> },
  { label: 'Manufacturing', to: '/solutions/manufacturing', icon: <Factory size={16} /> },
];

const INDUSTRIES_MEGA = [
  { label: 'Healthcare', to: '/industries/healthcare', icon: <Heart size={16} /> },
  { label: 'Education', to: '/industries/education', icon: <GraduationCap size={16} /> },
  { label: 'Hospitality', to: '/industries/hospitality', icon: <Hotel size={16} /> },
  { label: 'Real Estate', to: '/industries/real-estate', icon: <Building2 size={16} /> },
  { label: 'Retail & E-commerce', to: '/industries/retail-ecommerce', icon: <ShoppingCart size={16} /> },
  { label: 'Manufacturing', to: '/industries/manufacturing', icon: <Factory size={16} /> },
  { label: 'Logistics', to: '/industries/logistics', icon: <Truck size={16} /> },
];

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Solutions', to: '/solutions', mega: SOLUTIONS_MEGA },
  { label: 'Industries', to: '/industries', mega: INDUSTRIES_MEGA },
  { label: 'AI Studio', to: '/ai-studio' },
  { label: 'Technology', to: '/technology' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Contact', to: '/contact' },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
  }, [location.pathname]);

  const isActive = (to) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <>
      <nav className={`ax-nav${scrolled ? ' scrolled' : ''}`} style={{ padding: '0 clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 40 }}>
          {/* Logo */}
          <BrandLogo variant="original" height={52} />

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }} className="ax-nav-desktop">
            {NAV_LINKS.map((link) => (
              <div key={link.to} style={{ position: 'relative' }}
                onMouseEnter={() => link.mega && setMegaOpen(link.label)}
                onMouseLeave={() => setMegaOpen(null)}>
                <Link to={link.to} style={{
                  display: 'flex', alignItems: 'center', gap: 4, padding: '8px 14px',
                  fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500,
                  color: isActive(link.to) ? 'var(--or)' : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none', borderRadius: 8, transition: 'all 0.2s ease',
                  background: isActive(link.to) ? 'rgba(232,99,26,0.1)' : 'transparent',
                }}
                  onMouseEnter={e => !isActive(link.to) && (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => !isActive(link.to) && (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}>
                  {link.label}
                  {link.mega && <ChevronDown size={15} style={{ opacity: 0.6, transition: 'transform 0.2s', transform: megaOpen === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
                </Link>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {link.mega && megaOpen === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      style={{ position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)', width: 340, background: 'rgba(13,27,46,0.98)', backdropFilter: 'blur(20px)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)', padding: 16, boxShadow: '0 24px 64px rgba(0,0,0,0.5)', zIndex: 1001 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                        {link.mega.map((item) => (
                          <Link key={item.to} to={item.to} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,99,26,0.12)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <div style={{ width: 28, height: 28, background: 'rgba(232,99,26,0.1)', border: '1px solid rgba(232,99,26,0.2)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--or)', flexShrink: 0 }}>
                              {item.icon}
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right CTA */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }} className="ax-nav-desktop">
            <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--or)', textDecoration: 'none', padding: '10px 20px', border: '1.5px solid var(--or)', borderRadius: 8, transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--or)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--or)'; }}>
              Get a Free AI Audit <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 8 }} className="ax-nav-mobile">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4,0,0.2,1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--nvd)', overflow: 'auto', paddingTop: 80 }}>
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} style={{ display: 'block', padding: '16px 16px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, color: isActive(link.to) ? 'var(--or)' : '#fff', textDecoration: 'none', borderRadius: 10, background: isActive(link.to) ? 'rgba(232,99,26,0.1)' : 'transparent', transition: 'all 0.2s' }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <Link to="/contact" className="ax-btn ax-btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
                  Get a Free AI Audit <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .ax-nav-desktop { display: none !important; }
          .ax-nav-mobile  { display: flex !important; margin-left: auto; }
          .ax-nav > div   { justify-content: space-between; }
        }
        @media (max-width: 480px) {
          .ax-nav { padding: 0 16px !important; }
        }
      `}</style>
    </>
  );
}
