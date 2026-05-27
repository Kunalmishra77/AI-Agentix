import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, ArrowRight,
  Users, TrendingUp, Bot, Workflow, Globe, BarChart3, Zap, Factory,
  Heart, GraduationCap, Hotel, Building2, ShoppingCart, Truck,
} from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';

const SOLUTIONS_MEGA = [
  { label: 'Sales Automation',      to: '/solutions/sales-automation',      icon: <TrendingUp size={18} />,  desc: 'AI-powered lead scoring, follow-ups & CRM sync' },
  { label: 'Marketing Automation',  to: '/solutions/marketing-automation',  icon: <Zap size={18} />,         desc: 'Multi-channel campaigns on autopilot' },
  { label: 'HRMS & Hiring',         to: '/solutions/hrms-hiring',           icon: <Users size={18} />,       desc: 'Screen, schedule & onboard candidates with AI' },
  { label: 'Operations',            to: '/solutions/operations',            icon: <Workflow size={18} />,    desc: 'Eliminate bottlenecks across every workflow' },
  { label: 'Supply Chain',          to: '/solutions/supply-chain',          icon: <Globe size={18} />,       desc: 'Real-time tracking, alerts & procurement AI' },
  { label: 'Finance & Accounts',    to: '/solutions/finance-accounts',      icon: <BarChart3 size={18} />,   desc: 'Auto-reconciliation, invoicing & GST filing' },
  { label: 'AI Voice & Chat',       to: '/solutions/ai-voice-chat',         icon: <Bot size={18} />,         desc: '24/7 voice agents & WhatsApp bots' },
  { label: 'Manufacturing',         to: '/solutions/manufacturing',         icon: <Factory size={18} />,     desc: 'Predictive maintenance & quality inspection' },
];

const INDUSTRIES_MEGA = [
  { label: 'Healthcare',          to: '/industries/healthcare',        icon: <Heart size={18} />,        desc: 'Appointment bots, patient follow-up & billing AI' },
  { label: 'Education',           to: '/industries/education',         icon: <GraduationCap size={18} />, desc: 'Admissions automation & student engagement' },
  { label: 'Hospitality',         to: '/industries/hospitality',       icon: <Hotel size={18} />,        desc: 'Booking management & guest experience AI' },
  { label: 'Real Estate',         to: '/industries/real-estate',       icon: <Building2 size={18} />,    desc: 'Lead nurturing & property recommendation AI' },
  { label: 'Retail & E-commerce', to: '/industries/retail-ecommerce',  icon: <ShoppingCart size={18} />, desc: 'Personalisation, returns & inventory automation' },
  { label: 'Manufacturing',       to: '/industries/manufacturing',     icon: <Factory size={18} />,      desc: 'Shop-floor AI, defect detection & OEE tracking' },
  { label: 'Logistics',           to: '/industries/logistics',         icon: <Truck size={18} />,        desc: 'Route optimisation & delivery status automation' },
];

const MEGA_META = {
  Solutions: {
    title: 'AI Solutions',
    tagline: 'End-to-end automation for every business function',
    cta: { label: 'All Solutions', to: '/solutions' },
    accent: '#E8631A',
    stat: { value: '200+', label: 'automations deployed' },
  },
  Industries: {
    title: 'Industries We Serve',
    tagline: 'Deep domain expertise across 15+ sectors',
    cta: { label: 'All Industries', to: '/industries' },
    accent: '#6366F1',
    stat: { value: '15+', label: 'industries covered' },
  },
};

const NAV_LINKS = [
  { label: 'Home',         to: '/' },
  { label: 'About',        to: '/about' },
  { label: 'Solutions',    to: '/solutions',   mega: SOLUTIONS_MEGA },
  { label: 'Industries',   to: '/industries',  mega: INDUSTRIES_MEGA },
  { label: 'AI Studio',    to: '/ai-studio' },
  { label: 'Technology',   to: '/technology' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Contact',      to: '/contact' },
];

export default function SiteNav() {
  const [scrolled,    setScrolled]   = useState(false);
  const [mobileOpen,  setMobileOpen] = useState(false);
  const [megaOpen,    setMegaOpen]   = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setMegaOpen(null); }, [location.pathname]);

  const isActive = (to) => location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <>
      <nav className={`ax-nav${scrolled ? ' scrolled' : ''}`}
        style={{ padding: '0 clamp(20px,5vw,80px)', position: 'relative' }}
        onMouseLeave={() => setMegaOpen(null)}>

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 32 }}>

          {/* Logo */}
          <BrandLogo variant="original" height={48} />

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }} className="ax-nav-desktop">
            {NAV_LINKS.map((link) => (
              <div key={link.to}
                style={{ position: 'relative' }}
                onMouseEnter={() => link.mega ? setMegaOpen(link.label) : setMegaOpen(null)}>
                <Link to={link.to}
                  className="ax-nav-link"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 3, padding: '8px 11px',
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                    color: isActive(link.to) ? 'var(--or)' : 'rgba(255,255,255,0.85)',
                    textDecoration: 'none', borderRadius: 8, transition: 'color 0.15s',
                    background: isActive(link.to) ? 'rgba(232,99,26,0.1)' : 'transparent',
                    whiteSpace: 'nowrap',
                  }}>
                  {link.label}
                  {link.mega && (
                    <ChevronDown size={13}
                      style={{ opacity: 0.55, transition: 'transform 0.2s',
                        transform: megaOpen === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                  )}
                </Link>

                {/* ── Per-item mega dropdown — anchored right below trigger ── */}
                <AnimatePresence>
                  {link.mega && megaOpen === link.label && (() => {
                    const meta = MEGA_META[link.label];
                    if (!meta) return null;
                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          width: 'min(660px, calc(100vw - 32px))',
                          maxHeight: 'calc(100vh - 80px)',
                          background: 'rgba(9,20,38,0.99)',
                          backdropFilter: 'blur(24px)',
                          borderRadius: 14,
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                          zIndex: 1001,
                          overflow: 'hidden',
                          display: 'flex', flexDirection: 'column',
                        }}>
                        {/* Header */}
                        <div style={{
                          padding: '13px 18px 11px',
                          borderBottom: '1px solid rgba(255,255,255,0.07)',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          background: `linear-gradient(90deg, ${meta.accent}12, transparent)`,
                          flexShrink: 0,
                        }}>
                          <div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                              {meta.title}
                            </div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', fontFamily: 'var(--font-body)', marginTop: 1 }}>
                              {meta.tagline}
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: 'var(--font-number)', fontSize: 17, fontWeight: 700, color: meta.accent, lineHeight: 1 }}>
                                {meta.stat.value}
                              </div>
                              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginTop: 1 }}>
                                {meta.stat.label}
                              </div>
                            </div>
                            <Link to={meta.cta.to}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 4,
                                padding: '5px 11px', borderRadius: 7,
                                background: meta.accent, color: '#fff',
                                fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600,
                                textDecoration: 'none', whiteSpace: 'nowrap',
                              }}>
                              {meta.cta.label} <ArrowRight size={10} />
                            </Link>
                          </div>
                        </div>

                        {/* Items */}
                        <div style={{
                          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: 1, padding: '8px', overflowY: 'auto', flex: 1,
                        }}>
                          {link.mega.map((item) => (
                            <Link key={item.to} to={item.to}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '9px 11px', borderRadius: 9,
                                textDecoration: 'none', transition: 'background 0.13s',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = `${meta.accent}14`}
                              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                              <div style={{
                                width: 30, height: 30, flexShrink: 0, borderRadius: 8,
                                background: `${meta.accent}14`, border: `1px solid ${meta.accent}28`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: meta.accent,
                              }}>
                                {item.icon}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                                  color: '#fff', lineHeight: 1.2,
                                }}>
                                  {item.label}
                                </div>
                                <div style={{
                                  fontSize: 11, color: 'rgba(255,255,255,0.38)',
                                  fontFamily: 'var(--font-body)', marginTop: 1,
                                  overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                                }}>
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ flexShrink: 0 }} className="ax-nav-desktop">
            <Link to="/contact"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
                color: 'var(--or)', textDecoration: 'none',
                padding: '8px 16px', border: '1.5px solid var(--or)',
                borderRadius: 8, transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--or)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--or)'; }}>
              Get a Free AI Audit <ArrowRight size={13} />
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 8 }}
            className="ax-nav-mobile">
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
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#06101E', overflow: 'auto', paddingTop: 80 }}>
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to}
                  style={{
                    display: 'block', padding: '16px', borderRadius: 10,
                    fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20,
                    color: isActive(link.to) ? 'var(--or)' : '#fff',
                    textDecoration: 'none',
                    background: isActive(link.to) ? 'rgba(232,99,26,0.1)' : 'transparent',
                    transition: 'all 0.2s',
                  }}>
                  {link.label}
                </Link>
              ))}
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <Link to="/contact" className="ax-btn ax-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: 16 }}>
                  Get a Free AI Audit <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ax-nav-link:hover { color: #fff !important; }

        /* ── Shrink at tight widths ── */
        @media (max-width: 1280px) {
          .ax-nav-desktop a.ax-nav-link { font-size: 13px !important; padding: 6px 8px !important; }
          .ax-nav-desktop > div { gap: 0 !important; }
        }
        @media (max-width: 1100px) {
          .ax-nav-desktop a.ax-nav-link { font-size: 12px !important; padding: 5px 6px !important; }
        }

        /* ── Hamburger below 960px ── */
        @media (max-width: 960px) {
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
