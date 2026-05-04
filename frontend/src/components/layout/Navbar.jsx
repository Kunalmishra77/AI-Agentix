import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaChevronDown,
  FaBars,
  FaXmark,
  FaWandMagicSparkles,
  FaCalendarDays,
  FaImage,
  FaDiagramProject,
  FaMagnifyingGlassDollar,
  FaWhatsapp,
  FaPhone,
  FaArrowsRotate,
  FaChartLine,
  FaTag,
  FaMap,
  FaDatabase,
  FaBoxesStacked,
  FaGraduationCap,
  FaGlobe,
  FaCartShopping,
} from 'react-icons/fa6';

/* ── DATA ───────────────────────────────────────────────── */

const TOOLS_CATEGORIES = [
  {
    label: 'Content AI',
    slug: 'content',
    color: '#7C3AED',
    bg: '#F5F3FF',
    tools: [
      { name: 'AI Content Generator',   slug: 'ai-content-generator',   Icon: FaWandMagicSparkles },
      { name: 'Social Media Scheduler', slug: 'social-media-scheduler',  Icon: FaCalendarDays },
      { name: 'AI Photo Editor',        slug: 'ai-photo-editor',         Icon: FaImage },
      { name: 'Workflow Generator',     slug: 'workflow-generator',      Icon: FaDiagramProject },
    ],
  },
  {
    label: 'Sales AI',
    slug: 'sales',
    color: '#F26522',
    bg: '#FFF7ED',
    tools: [
      { name: 'Lead Scraper',         slug: 'lead-scraper',         Icon: FaMagnifyingGlassDollar },
      { name: 'WhatsApp Automation',  slug: 'whatsapp-automation',  Icon: FaWhatsapp },
      { name: 'Cold Calling Bot',     slug: 'cold-calling-bot',     Icon: FaPhone },
      { name: 'CRM Sync',             slug: 'crm-sync',             Icon: FaArrowsRotate },
    ],
  },
  {
    label: 'Research AI',
    slug: 'market-research',
    color: '#0EA5E9',
    bg: '#F0F9FF',
    tools: [
      { name: 'Competitor Analyzer',        slug: 'competitor-analyzer',        Icon: FaChartLine },
      { name: 'Pricing Intelligence',       slug: 'pricing-intelligence',       Icon: FaTag },
      { name: 'Market Strategy Generator',  slug: 'market-strategy-generator',  Icon: FaMap },
    ],
  },
  {
    label: 'Business AI',
    slug: 'business',
    color: '#059669',
    bg: '#ECFDF5',
    tools: [
      { name: 'CRM System',       slug: 'crm-system',       Icon: FaDatabase },
      { name: 'ERP Modules',      slug: 'erp-modules',      Icon: FaBoxesStacked },
      { name: 'LMS System',       slug: 'lms-system',       Icon: FaGraduationCap },
      { name: 'Website Builder',  slug: 'website-builder',  Icon: FaGlobe },
      { name: 'E-Commerce Sites', slug: 'ecommerce-sites',  Icon: FaCartShopping },
    ],
  },
];

/* ── TOOLS MEGA-MENU ────────────────────────────────────── */
function ToolsMegaMenu({ onClose }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
                 bg-white border border-[#E8EDF3] rounded-2xl shadow-xl
                 min-w-[720px] max-w-[860px] w-[90vw] p-6"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-4 gap-6">
        {TOOLS_CATEGORIES.map((cat) => (
          <div key={cat.slug}>
            {/* Category header */}
            <Link
              to={`/category/${cat.slug}`}
              onClick={onClose}
              className="block mb-3 text-[13px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
              style={{ color: cat.color }}
            >
              {cat.label}
            </Link>
            {/* Tool links */}
            <ul className="space-y-0.5">
              {cat.tools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2 py-1.5 px-2 rounded-lg group
                               hover:bg-[#F8F9FB] transition-colors"
                  >
                    <tool.Icon
                      size={13}
                      className="flex-shrink-0 transition-colors"
                      style={{ color: cat.color }}
                    />
                    <span
                      className="text-[13px] font-medium text-[#4B5563]
                                 group-hover:text-[#0D1E3A] transition-colors leading-snug"
                    >
                      {tool.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── NAVBAR ─────────────────────────────────────────────── */
export default function Navbar({ bannerVisible }) {
  const [toolsOpen, setToolsOpen]     = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const toolsRef = useRef(null);
  const leaveTimer = useRef(null);

  /* Close everything on route change */
  useEffect(() => {
    setToolsOpen(false);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location]);

  /* Click-outside to close desktop dropdown */
  useEffect(() => {
    function handleClickOutside(e) {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleToolsMouseEnter = () => {
    clearTimeout(leaveTimer.current);
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setToolsOpen(false), 80);
  };

  const topClass = bannerVisible ? 'top-[40px]' : 'top-0';

  return (
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <nav
        className={`sticky ${topClass} z-50 h-16 bg-white border-b border-[#E8EDF3]
                    flex items-center transition-all duration-200`}
      >
        <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">

          {/* LOGO */}
          <Link to="/" className="flex items-center shrink-0" aria-label="Agentix home">
            <img
              src="/assets/clients/logo.png"
              alt="Agentix"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden lg:flex items-center gap-1">

            {/* Tools — hover-triggered mega menu */}
            <li
              ref={toolsRef}
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <button
                onClick={() => setToolsOpen((v) => !v)}
                aria-expanded={toolsOpen}
                className="flex items-center gap-1.5 px-3.5 py-2 text-[14px] font-medium
                           text-[#4B5563] hover:text-[#0D1E3A] transition-colors rounded-lg
                           hover:bg-[#F8F9FB]"
              >
                Tools
                <FaChevronDown
                  size={11}
                  className={`transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {toolsOpen && (
                <ToolsMegaMenu onClose={() => setToolsOpen(false)} />
              )}
            </li>

            {/* About */}
            <li>
              <Link
                to="/about"
                className="block px-3.5 py-2 text-[14px] font-medium text-[#4B5563]
                           hover:text-[#0D1E3A] hover:bg-[#F8F9FB] rounded-lg transition-colors"
              >
                About
              </Link>
            </li>

            {/* Blog */}
            <li>
              <Link
                to="/blog"
                className="block px-3.5 py-2 text-[14px] font-medium text-[#4B5563]
                           hover:text-[#0D1E3A] hover:bg-[#F8F9FB] rounded-lg transition-colors"
              >
                Blog
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className="block px-3.5 py-2 text-[14px] font-medium text-[#4B5563]
                           hover:text-[#0D1E3A] hover:bg-[#F8F9FB] rounded-lg transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* RIGHT BUTTONS */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-4 py-2 text-[14px] font-semibold text-[#0D1E3A]
                         border border-[#D1D5DB] rounded-lg hover:border-[#0D1E3A]
                         hover:bg-[#F8F9FB] transition-colors"
            >
              Talk to Agentix
            </Link>
            <Link
              to="/get-started"
              className="px-4 py-2 text-[14px] font-semibold text-white
                         bg-[#F26522] rounded-lg hover:bg-[#E05510]
                         transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* HAMBURGER (mobile) */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-[#0D1E3A] rounded-lg hover:bg-[#F8F9FB] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULL-SCREEN MENU ── */}
      {mobileOpen && (
        <div
          className={`fixed inset-0 z-40 bg-white overflow-y-auto`}
          style={{ top: bannerVisible ? '40px' : '0' }}
        >
          {/* Top bar with logo + close */}
          <div className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-[#E8EDF3]">
            <Link to="/" onClick={() => setMobileOpen(false)} aria-label="Agentix home">
              <img src="/assets/clients/logo.png" alt="Agentix" className="h-8 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-[#0D1E3A] rounded-lg hover:bg-[#F8F9FB] transition-colors"
              aria-label="Close menu"
            >
              <FaXmark size={20} />
            </button>
          </div>

          {/* Menu body */}
          <div className="px-4 sm:px-6 py-4 pb-12">

            {/* Tools — expandable categories */}
            <div className="border-b border-[#E8EDF3]">
              <button
                onClick={() => setMobileExpanded((v) => v === 'tools' ? null : 'tools')}
                className="w-full flex items-center justify-between py-4 text-[16px]
                           font-semibold text-[#0D1E3A]"
                aria-expanded={mobileExpanded === 'tools'}
              >
                Tools
                <FaChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-[#6B7280]
                              ${mobileExpanded === 'tools' ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileExpanded === 'tools' && (
                <div className="pb-4 space-y-5">
                  {TOOLS_CATEGORIES.map((cat) => (
                    <div key={cat.slug}>
                      {/* Category header */}
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block mb-2 text-[12px] font-bold uppercase tracking-wider"
                        style={{ color: cat.color }}
                      >
                        {cat.label}
                      </Link>
                      {/* Tools */}
                      <ul className="space-y-0.5 pl-1">
                        {cat.tools.map((tool) => (
                          <li key={tool.slug}>
                            <Link
                              to={`/tools/${tool.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 py-2 text-[14px]
                                         font-medium text-[#4B5563] hover:text-[#0D1E3A]
                                         transition-colors"
                            >
                              <tool.Icon size={13} style={{ color: cat.color }} className="flex-shrink-0" />
                              {tool.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Simple links */}
            {[
              { label: 'About',   to: '/about' },
              { label: 'Blog',    to: '/blog' },
              { label: 'Contact', to: '/contact' },
            ].map((item) => (
              <div key={item.label} className="border-b border-[#E8EDF3]">
                <Link
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-[16px] font-semibold text-[#0D1E3A]
                             hover:text-[#F26522] transition-colors"
                >
                  {item.label}
                </Link>
              </div>
            ))}

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 text-[15px] font-semibold
                           text-[#0D1E3A] border border-[#D1D5DB] rounded-xl
                           hover:border-[#0D1E3A] hover:bg-[#F8F9FB] transition-colors"
              >
                Talk to Agentix
              </Link>
              <Link
                to="/get-started"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center py-3 text-[15px] font-semibold
                           text-white bg-[#F26522] rounded-xl hover:bg-[#E05510]
                           transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
