import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const SERVICES_MENU = [
  {
    label: 'Discover',
    links: [
      { name: 'AI Consulting', href: '/services/ai-consulting' },
      { name: 'AI Proof of Concept', href: '/services/ai-poc' },
      { name: 'AI Strategy & Roadmap', href: '/services/ai-strategy' },
      { name: 'Automation Audit', href: '/services/automation-audit' },
    ],
  },
  {
    label: 'Organize Data',
    links: [
      { name: 'n8n Workflow Automation', href: '/services/n8n-automation' },
      { name: 'Data Engineering', href: '/services/data-engineering' },
      { name: 'Data Governance', href: '/services/data-governance' },
      { name: 'Data Platform Building', href: '/services/data-platform' },
    ],
  },
  {
    label: 'Develop',
    links: [
      { name: 'AI Agents Development', href: '/services/ai-agents' },
      { name: 'LLM Integration Services', href: '/services/llm-integration' },
      { name: 'Generative AI Development', href: '/services/generative-ai' },
      { name: 'Custom AI Chatbots', href: '/services/chatbots' },
      { name: 'Machine Learning', href: '/services/machine-learning' },
    ],
  },
  {
    label: 'Deploy',
    links: [
      { name: 'AI Advisory Services', href: '/services/ai-advisory' },
      { name: 'AI Integration Services', href: '/services/ai-integration' },
      { name: 'MLOps Consulting', href: '/services/mlops' },
      { name: 'AI Test Automation', href: '/services/ai-testing' },
    ],
  },
];

const SOLUTIONS_MENU = [
  {
    label: 'Technologies',
    links: [
      { name: 'AI Document Processing', href: '/solutions/document-processing' },
      { name: 'AI-powered Knowledge Base', href: '/solutions/knowledge-base' },
      { name: 'Agentic AI Platform', href: '/solutions/agentic-platform' },
      { name: 'LLM-Based Solutions', href: '/solutions/llm-solutions' },
    ],
  },
  {
    label: 'Industries',
    links: [
      { name: 'E-Commerce', href: '/industries/ecommerce' },
      { name: 'SaaS & Technology', href: '/industries/saas' },
      { name: 'Marketing Agencies', href: '/industries/marketing' },
      { name: 'Finance & Insurance', href: '/industries/finance' },
      { name: 'Healthcare', href: '/industries/healthcare' },
      { name: 'Logistics', href: '/industries/logistics' },
    ],
  },
];

const RESOURCES_MENU = [
  { name: 'Blog', href: '/blog' },
  { name: 'Whitepapers', href: '/resources' },
  { name: 'Use Cases', href: '/use-cases' },
];

const dropdownAnim = {
  hidden:  { opacity: 0, y: 8, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto',
    transition: { duration: 0.18, ease: [0.4,0,0.2,1] } },
};

function MegaMenu({ cols }) {
  return (
    <motion.div
      variants={dropdownAnim} initial="hidden" animate="visible" exit="hidden"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50
                 bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                 p-8 grid gap-8 min-w-max"
      style={{ gridTemplateColumns: `repeat(${cols.length}, 1fr)` }}
    >
      {cols.map((col) => (
        <div key={col.label}>
          <p className="text-[11px] uppercase tracking-widest text-[#e84d1c] font-semibold mb-4">
            {col.label}
          </p>
          <ul className="space-y-1">
            {col.links.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className="block text-[13px] text-[#777] hover:text-white py-1.5
                             px-2 hover:px-3.5 rounded transition-all duration-150"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}

function SimpleDropdown({ items }) {
  return (
    <motion.div
      variants={dropdownAnim} initial="hidden" animate="visible" exit="hidden"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50
                 bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.7)]
                 py-3 min-w-[200px]"
    >
      {items.map((item) => (
        <Link
          key={item.name} to={item.href}
          className="block text-[13px] text-[#777] hover:text-white
                     px-5 py-2.5 hover:px-7 transition-all duration-150"
        >
          {item.name}
        </Link>
      ))}
    </motion.div>
  );
}

export default function Navbar({ bannerVisible }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location]);

  const topOffset = bannerVisible ? '44px' : '0px';

  return (
    <>
      <nav
        ref={navRef}
        style={{ top: topOffset }}
        className={`fixed left-0 right-0 z-[100] h-[72px]
          bg-black/95 backdrop-blur-[20px] border-b border-[#1e1e1e]
          flex items-center px-12 justify-between
          transition-shadow duration-300
          ${scrolled ? 'shadow-[0_4px_32px_rgba(0,0,0,0.5)]' : ''}`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-[#e84d1c] flex items-center justify-center
                          font-display font-black text-white text-sm">
            AI
          </div>
          <span className="font-display font-extrabold text-xl text-white tracking-tight">
            Agentix
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="hidden lg:flex items-center gap-1 text-sm">
          {/* Services */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu('services')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[#999]
                               hover:text-white transition-colors font-medium">
              Services
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${openMenu==='services' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openMenu === 'services' && <MegaMenu cols={SERVICES_MENU} />}
            </AnimatePresence>
          </li>

          {/* Solutions */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu('solutions')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[#999]
                               hover:text-white transition-colors font-medium">
              Solutions
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${openMenu==='solutions' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openMenu === 'solutions' && <MegaMenu cols={SOLUTIONS_MENU} />}
            </AnimatePresence>
          </li>

          {/* Case Studies */}
          <li>
            <Link to="/case-studies"
              className="px-3.5 py-2 text-[#999] hover:text-white transition-colors font-medium">
              Case Studies
            </Link>
          </li>

          {/* About */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu('about')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[#999]
                               hover:text-white transition-colors font-medium">
              About
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${openMenu==='about' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openMenu === 'about' && (
                <SimpleDropdown items={[
                  { name: 'About Us', href: '/about' },
                  { name: 'Our Team', href: '/about#team' },
                  { name: 'Press & Awards', href: '/press' },
                ]} />
              )}
            </AnimatePresence>
          </li>

          {/* Resources */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu('resources')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1.5 px-3.5 py-2 text-[#999]
                               hover:text-white transition-colors font-medium">
              Resources
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${openMenu==='resources' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openMenu === 'resources' && <SimpleDropdown items={RESOURCES_MENU} />}
            </AnimatePresence>
          </li>

          {/* Career */}
          <li>
            <Link to="/career"
              className="px-3.5 py-2 text-[#999] hover:text-white transition-colors font-medium">
              Career
            </Link>
          </li>

          {/* CTA */}
          <li className="ml-3">
            <Link
              to="/contact"
              className="btn-accent text-sm px-5 py-2.5 font-display font-bold tracking-wide"
            >
              Let's talk
            </Link>
          </li>
        </ul>

        {/* HAMBURGER */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="lg:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.4,0,0.2,1] }}
            className="fixed inset-0 z-[90] bg-black overflow-y-auto pt-24 pb-12 px-6"
          >
            {[
              { label: 'Services',    children: SERVICES_MENU.flatMap(g => g.links) },
              { label: 'Solutions',   children: SOLUTIONS_MENU.flatMap(g => g.links) },
              { label: 'Case Studies',href: '/case-studies' },
              { label: 'About',       href: '/about' },
              { label: 'Resources',   children: RESOURCES_MENU },
              { label: 'Career',      href: '/career' },
            ].map((item) => (
              <div key={item.label} className="border-b border-[#1e1e1e]">
                {item.href ? (
                  <Link to={item.href} className="block py-4 text-lg font-display font-semibold text-[#ccc]">
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => setMobileExpanded(v => v === item.label ? null : item.label)}
                      className="w-full flex justify-between items-center py-4 text-lg font-display font-semibold text-[#ccc]"
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform ${mobileExpanded===item.label?'rotate-180':''}`} />
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
                              className="block py-2.5 pl-4 text-sm text-[#666] hover:text-[#e84d1c]">
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
            <Link to="/contact" className="btn-accent w-full justify-center mt-8 text-base py-4">
              Let's talk →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
