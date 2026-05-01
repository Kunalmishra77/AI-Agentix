import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronDown, FaBars, FaXmark,
  FaBrain, FaLightbulb, FaDatabase, FaWandMagicSparkles,
  FaChartBar, FaCodeBranch, FaShield, FaLayerGroup,
  FaRobot, FaBolt, FaMicrochip, FaArrowTrendUp,
  FaCompass, FaMessage, FaPlug, FaRocket,
  FaFileLines, FaBookOpen, FaBuilding, FaCode, FaEye,
  FaHeart, FaLandmark, FaBagShopping, FaIndustry, FaGraduationCap,
  FaArrowRight,
} from 'react-icons/fa6';

/* ── DATA ───────────────────────────────────────────────── */

const SERVICES_COLS = [
  {
    label: 'Discover',
    color: '#3B82F6',
    bg: '#EFF6FF',
    icon: FaBrain,
    links: [
      { name: 'AI Consulting',             href: '/services/ai-consulting',            Icon: FaBrain },
      { name: 'AI Proof of Concept',        href: '/services/ai-poc',                   Icon: FaLightbulb },
      { name: 'Big Data Consulting',         href: '/services/big-data',                 Icon: FaDatabase },
      { name: 'Generative AI Consulting',    href: '/services/generative-ai-consulting', Icon: FaWandMagicSparkles },
    ],
  },
  {
    label: 'Organize Data',
    color: '#22C55E',
    bg: '#F0FDF4',
    icon: FaChartBar,
    links: [
      { name: 'Business Intelligence',       href: '/services/business-intelligence',    Icon: FaChartBar },
      { name: 'Data Engineering',            href: '/services/data-engineering',         Icon: FaCodeBranch },
      { name: 'Data Governance',             href: '/services/data-governance',          Icon: FaShield },
      { name: 'Databricks Consulting',       href: '/services/databricks',               Icon: FaLayerGroup },
    ],
  },
  {
    label: 'Develop',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    icon: FaRobot,
    links: [
      { name: 'AI Agents Development',       href: '/services/ai-agents',               Icon: FaRobot },
      { name: 'Generative AI Development',   href: '/services/generative-ai',           Icon: FaBolt },
      { name: 'LLMs Development',            href: '/services/llm-development',         Icon: FaMicrochip },
      { name: 'Machine Learning',            href: '/services/machine-learning',        Icon: FaArrowTrendUp },
    ],
  },
  {
    label: 'Deploy',
    color: '#F26522',
    bg: '#FFF7ED',
    icon: FaRocket,
    links: [
      { name: 'AI Advisory Services',        href: '/services/ai-advisory',             Icon: FaCompass },
      { name: 'AI Chatbot Development',      href: '/services/chatbots',                Icon: FaMessage },
      { name: 'AI Integration Services',     href: '/services/ai-integration',          Icon: FaPlug },
      { name: 'MLOps Consulting',            href: '/services/mlops',                   Icon: FaRocket },
    ],
  },
];

const SOLUTIONS_TECH = [
  { name: 'AI Document Processing',      href: '/solutions/document-processing', Icon: FaFileLines },
  { name: 'AI-powered Knowledge Base',   href: '/solutions/knowledge-base',      Icon: FaBookOpen },
  { name: 'Enterprise GenAI Platform',   href: '/solutions/enterprise-genai',    Icon: FaBuilding },
  { name: 'LLM-Based Solutions',         href: '/solutions/llm-solutions',       Icon: FaCode },
  { name: 'Computer Vision Solutions',   href: '/solutions/computer-vision',     Icon: FaEye },
];

const SOLUTIONS_INDUSTRIES = [
  { name: 'Healthcare',        href: '/industries/healthcare',    Icon: FaHeart },
  { name: 'Finance & Banking', href: '/industries/finance',       Icon: FaLandmark },
  { name: 'Retail',            href: '/industries/retail',        Icon: FaBagShopping },
  { name: 'Manufacturing',     href: '/industries/manufacturing', Icon: FaIndustry },
  { name: 'Education',         href: '/industries/education',     Icon: FaGraduationCap },
];

const PRODUCTS_LIST = [
  {
    slug: 'ai-sales-buddy',
    name: 'AI Sales Buddy',
    desc: 'Automate lead generation and boost conversions',
    gradient: 'linear-gradient(135deg,#FFF3ED 0%,#FFD4B8 100%)',
    iconBg: '#F26522',
    Icon: FaArrowTrendUp,
  },
  {
    slug: 'ai-business-buddy',
    name: 'AI Business Buddy',
    desc: 'Streamline operations & data-driven insights',
    gradient: 'linear-gradient(135deg,#EEF2FF 0%,#C7D2FE 100%)',
    iconBg: '#6366F1',
    Icon: FaChartBar,
  },
  {
    slug: 'ai-content-buddy',
    name: 'AI Content Buddy',
    desc: 'Create engaging content at scale',
    gradient: 'linear-gradient(135deg,#ECFDF5 0%,#A7F3D0 100%)',
    iconBg: '#10B981',
    Icon: FaMessage,
  },
];

const RESOURCES_MENU = [
  { name: 'Blog',         href: '/blog' },
  { name: 'Whitepapers',  href: '/resources' },
  { name: 'Use Cases',    href: '/use-cases' },
  { name: 'Case Studies', href: '/case-studies' },
];

/* ── ANIMATIONS ─────────────────────────────────────────── */
const dropAnim = {
  hidden:  { opacity: 0, y: -8, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0,  pointerEvents: 'auto',
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -8, pointerEvents: 'none',
    transition: { duration: 0.14 } },
};

/* ── SERVICES MEGA PANEL ────────────────────────────────── */
function ServicesDropdown({ navbarH }) {
  return (
    <motion.div
      variants={dropAnim} initial="hidden" animate="visible" exit="exit"
      style={{ top: navbarH }}
      className="fixed left-0 right-0 z-[99] bg-white border-b border-[#E5E5E5] shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-[1240px] mx-auto px-12 pt-6 pb-0">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-[20px] font-display font-black text-[#0D1E3A]">
            Our <span className="text-[#F26522]">Services</span>
          </h3>
          <p className="text-[13px] text-[#777] mt-0.5">End-to-end AI solutions from strategy to deployment</p>
        </div>
        <div className="w-full h-px bg-[#F0F0F0] mb-5" />

        {/* 4 columns */}
        <div className="grid grid-cols-4 gap-6 pb-5">
          {SERVICES_COLS.map((col) => (
            <div key={col.label}>
              {/* Column header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: col.color }}
                >
                  <col.icon size={18} color="#fff" />
                </div>
                <span className="font-display font-bold text-[15px] text-[#0D1E3A]">{col.label}</span>
              </div>
              {/* Links */}
              <ul className="space-y-0.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg group hover:bg-[#FFF5F0] transition-colors"
                    >
                      <link.Icon size={14} className="text-[#F26522] flex-shrink-0" />
                      <span className="text-[13px] font-medium text-[#444] group-hover:text-[#F26522] transition-colors leading-snug">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="bg-[#FFF5F0] border-t border-[#FFE0CC] mx-[-48px] px-12 py-3 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-[#0D1E3A]">Need a custom solution?</p>
            <p className="text-[12px] text-[#777]">Let's discuss your unique requirements</p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2 bg-[#F26522] text-white text-[13px] font-bold rounded-lg hover:bg-[#FF7A3D] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── SOLUTIONS MEGA PANEL ───────────────────────────────── */
function SolutionsDropdown({ navbarH }) {
  return (
    <motion.div
      variants={dropAnim} initial="hidden" animate="visible" exit="exit"
      style={{ top: navbarH }}
      className="fixed left-0 right-0 z-[99] bg-white border-b border-[#E5E5E5] shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-[1240px] mx-auto px-12 pt-6 pb-0">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-[20px] font-display font-black text-[#0D1E3A]">
            Our <span className="text-[#F26522]">Solutions</span>
          </h3>
          <p className="text-[13px] text-[#777] mt-0.5">Industry-specific AI solutions and cutting-edge technologies</p>
        </div>
        <div className="w-full h-px bg-[#F0F0F0] mb-5" />

        {/* 2 columns */}
        <div className="grid grid-cols-2 gap-12 pb-5">
          {/* Technologies */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#F26522] flex items-center justify-center">
                <FaBuilding size={18} color="#fff" />
              </div>
              <span className="font-display font-bold text-[15px] text-[#0D1E3A]">Technologies</span>
            </div>
            <ul className="space-y-0.5">
              {SOLUTIONS_TECH.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg group hover:bg-[#FFF5F0] transition-colors"
                  >
                    <item.Icon size={14} className="text-[#F26522] flex-shrink-0" />
                    <span className="text-[13px] font-medium text-[#444] group-hover:text-[#F26522] transition-colors">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6] flex items-center justify-center">
                <FaIndustry size={18} color="#fff" />
              </div>
              <span className="font-display font-bold text-[15px] text-[#0D1E3A]">Industries</span>
            </div>
            <ul className="space-y-0.5 mb-4">
              {SOLUTIONS_INDUSTRIES.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg group hover:bg-[#EFF6FF] transition-colors"
                  >
                    <item.Icon size={14} className="text-[#3B82F6] flex-shrink-0" />
                    <span className="text-[13px] font-medium text-[#444] group-hover:text-[#3B82F6] transition-colors">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/industries/healthcare"
              className="flex items-center justify-center gap-2 w-full py-2 bg-[#F26522] text-white text-[13px] font-bold rounded-lg hover:bg-[#FF7A3D] transition-colors"
            >
              Explore Industries <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── PRODUCTS MEGA PANEL ────────────────────────────────── */
function ProductsDropdown({ navbarH }) {
  return (
    <motion.div
      variants={dropAnim} initial="hidden" animate="visible" exit="exit"
      style={{ top: navbarH }}
      className="fixed left-0 right-0 z-[99] bg-white border-b border-[#E5E5E5] shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-[1240px] mx-auto px-12 pt-6 pb-0">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-[20px] font-display font-black text-[#0D1E3A]">
            AI <span className="text-[#F26522]">Buddy</span> Products
          </h3>
          <p className="text-[13px] text-[#777] mt-0.5">Intelligent AI assistants for your business needs</p>
        </div>
        <div className="w-full h-px bg-[#F0F0F0] mb-5" />

        {/* 3 product cards */}
        <div className="grid grid-cols-3 gap-4 pb-5">
          {PRODUCTS_LIST.map((p) => (
            <Link
              key={p.slug}
              to={`/products/${p.slug}`}
              className="rounded-xl p-4 group hover:shadow-md transition-shadow"
              style={{ background: p.gradient }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: p.iconBg }}
              >
                <p.Icon size={20} color="#fff" />
              </div>
              <p
                className="font-display font-bold text-[15px] mb-1 group-hover:opacity-80 transition-opacity"
                style={{ color: p.iconBg }}
              >
                {p.name}
              </p>
              <p className="text-[12px] text-[#555] leading-relaxed">{p.desc}</p>
            </Link>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="bg-[#FFF5F0] border-t border-[#FFE0CC] mx-[-48px] px-12 py-3 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-[#0D1E3A]">Need a custom AI assistant?</p>
            <p className="text-[12px] text-[#777]">Let's build the perfect solution for you</p>
          </div>
          <Link
            to="/contact"
            className="px-5 py-2 bg-[#F26522] text-white text-[13px] font-bold rounded-lg hover:bg-[#FF7A3D] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── SIMPLE DROPDOWN ────────────────────────────────────── */
function SimpleDropdown({ items }) {
  return (
    <motion.div
      variants={dropAnim} initial="hidden" animate="visible" exit="exit"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-50
                 bg-white border border-[#E5E5E5] shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                 rounded-xl py-2 min-w-[200px]"
    >
      {items.map((item) => (
        <Link
          key={item.name} to={item.href}
          className="flex items-center gap-2 text-[13px] font-medium text-[#444] hover:text-[#F26522]
                     hover:bg-[#FFF5F0] px-4 py-2 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] flex-shrink-0" />
          {item.name}
        </Link>
      ))}
    </motion.div>
  );
}

/* ── NAVBAR ─────────────────────────────────────────────── */
export default function Navbar({ bannerVisible }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location]);

  const topOffset  = scrolled ? '0px' : (bannerVisible ? '44px' : '0px');
  const navbarH    = scrolled ? '72px' : (bannerVisible ? '116px' : '72px');
  const isHero     = location.pathname === '/';
  const transparent = isHero && !scrolled;

  const navBg     = transparent ? 'bg-transparent border-transparent' : 'bg-white border-b border-[#E5E5E5]';
  const navShadow = scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : '';
  const linkColor = transparent ? 'text-white/90 hover:text-white' : 'text-[#333] hover:text-[#F26522]';

  return (
    <>
      <nav
        style={{ top: topOffset }}
        className={`fixed left-0 right-0 z-[100] h-[72px] flex items-center
          transition-all duration-300 ${navBg} ${navShadow}`}
      >
        <div className="max-w-[1240px] mx-auto w-full px-12 h-full flex items-center gap-4">

          {/* LOGO */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/assets/clients/logo.png"
              alt="AI Agentix"
              className="h-10 w-auto object-contain transition-all duration-300"
              style={{ filter: transparent ? 'brightness(0) invert(1)' : 'none' }}
            />
          </Link>

          {/* DESKTOP NAV — fills space between logo and CTA */}
          <ul className="hidden lg:flex flex-1 items-center justify-between text-sm pl-10">

            {/* Services */}
            <NavItem label="Services" active={openMenu === 'services'} linkColor={linkColor}
              onEnter={() => setOpenMenu('services')} onLeave={() => setOpenMenu(null)}>
              <AnimatePresence>
                {openMenu === 'services' && <ServicesDropdown navbarH={navbarH} />}
              </AnimatePresence>
            </NavItem>

            {/* Solutions */}
            <NavItem label="Solutions" active={openMenu === 'solutions'} linkColor={linkColor}
              onEnter={() => setOpenMenu('solutions')} onLeave={() => setOpenMenu(null)}>
              <AnimatePresence>
                {openMenu === 'solutions' && <SolutionsDropdown navbarH={navbarH} />}
              </AnimatePresence>
            </NavItem>

            {/* Products */}
            <NavItem label="Products" active={openMenu === 'products'} linkColor={linkColor}
              onEnter={() => setOpenMenu('products')} onLeave={() => setOpenMenu(null)}>
              <AnimatePresence>
                {openMenu === 'products' && <ProductsDropdown navbarH={navbarH} />}
              </AnimatePresence>
            </NavItem>

            {/* About */}
            <NavItem label="About" active={openMenu === 'about'} linkColor={linkColor}
              onEnter={() => setOpenMenu('about')} onLeave={() => setOpenMenu(null)}>
              <AnimatePresence>
                {openMenu === 'about' && (
                  <SimpleDropdown items={[
                    { name: 'About Us',    href: '/about' },
                    { name: 'Our Team',    href: '/about#team' },
                    { name: 'Press',       href: '/press' },
                  ]} />
                )}
              </AnimatePresence>
            </NavItem>

            {/* Resources */}
            <NavItem label="Resources" active={openMenu === 'resources'} linkColor={linkColor}
              onEnter={() => setOpenMenu('resources')} onLeave={() => setOpenMenu(null)}>
              <AnimatePresence>
                {openMenu === 'resources' && <SimpleDropdown items={RESOURCES_MENU} />}
              </AnimatePresence>
            </NavItem>

            <li>
              <Link to="/case-studies" className={`px-3.5 py-2 font-semibold uppercase tracking-wide text-[12px] transition-colors ${linkColor}`}>
                Case Studies
              </Link>
            </li>

            <li>
              <Link to="/careers" className={`px-3.5 py-2 font-semibold uppercase tracking-wide text-[12px] transition-colors ${linkColor}`}>
                Career
              </Link>
            </li>
          </ul>

          {/* CTA BUTTON — far right */}
          <Link to="/contact"
            className="hidden lg:inline-flex items-center shrink-0 px-5 py-2.5 bg-[#F26522] text-white font-display font-bold text-sm rounded-lg hover:bg-[#FF7A3D] transition-colors">
            Let's talk
          </Link>

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className={`lg:hidden p-2 transition-colors ${transparent ? 'text-white' : 'text-[#0D1E3A]'}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaXmark size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[90] bg-white overflow-y-auto pt-24 pb-12 px-6"
          >
            {[
              { label: 'Services',     children: SERVICES_COLS.flatMap(g => g.links) },
              { label: 'Solutions',    children: [...SOLUTIONS_TECH, ...SOLUTIONS_INDUSTRIES] },
              { label: 'Products',     children: PRODUCTS_LIST.map(p => ({ name: p.name, href: `/products/${p.slug}` })) },
              { label: 'Case Studies', href: '/case-studies' },
              { label: 'About',        href: '/about' },
              { label: 'Resources',    children: RESOURCES_MENU },
              { label: 'Career',       href: '/careers' },
            ].map((item) => (
              <div key={item.label} className="border-b border-[#E5E5E5]">
                {item.href ? (
                  <Link to={item.href} className="block py-4 text-lg font-display font-semibold text-[#0D1E3A]">
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileExpanded(v => v === item.label ? null : item.label)}
                      className="w-full flex justify-between items-center py-4 text-lg font-display font-semibold text-[#0D1E3A]"
                    >
                      {item.label}
                      <FaChevronDown size={16} className={`transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {item.children?.map(link => (
                            <Link key={link.name} to={link.href}
                              className="block py-2.5 pl-4 text-sm font-medium text-[#555] hover:text-[#F26522]">
                              {link.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
            <Link to="/contact"
              className="block w-full text-center mt-8 py-4 bg-[#F26522] text-white font-display font-bold text-base rounded-xl hover:bg-[#FF7A3D] transition-colors">
              Let's talk →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── NAV ITEM ───────────────────────────────────────────── */
function NavItem({ label, active, onEnter, onLeave, linkColor, children }) {
  return (
    <li className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className={`relative flex items-center gap-1.5 px-3.5 py-2 font-semibold uppercase tracking-wide text-[12px] transition-colors ${linkColor}`}>
        {label}
        <FaChevronDown size={12} className={`transition-transform duration-200 ${active ? 'rotate-180' : ''}`} />
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-[#F26522] transition-opacity duration-200"
          style={{ opacity: active ? 1 : 0 }}
        />
      </button>
      {children}
    </li>
  );
}
