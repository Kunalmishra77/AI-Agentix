import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaXTwitter, FaArrowRight } from 'react-icons/fa6';

const SERVICES = [
  {
    label: 'Discover',
    links: [
      ['AI Consulting',        '/services/ai-consulting'],
      ['AI PoC Services',      '/services/ai-poc'],
      ['Big Data Consulting',  '/services/big-data'],
      ['GenAI Consulting',     '/services/generative-ai-consulting'],
    ],
  },
  {
    label: 'Develop',
    links: [
      ['AI Agents',            '/services/ai-agents'],
      ['Generative AI Dev',    '/services/generative-ai'],
      ['LLM Development',      '/services/llm-development'],
      ['AI Chatbots',          '/services/chatbots'],
      ['ML Consulting',        '/services/machine-learning'],
    ],
  },
  {
    label: 'Deploy',
    links: [
      ['AI Advisory',          '/services/ai-advisory'],
      ['AI Integration',       '/services/ai-integration'],
      ['MLOps',                '/services/mlops'],
    ],
  },
];

const COMPANY = [
  ['About Us',      '/about'],
  ['Blog',          '/blog'],
  ['Case Studies',  '/case-studies'],
  ['Careers',       '/careers'],
  ['Press',         '/press'],
  ['Contact',       '/contact'],
];

const PRODUCTS = [
  ['AI Sales Buddy',    '/products/ai-sales-buddy'],
  ['AI Business Buddy', '/products/ai-business-buddy'],
  ['AI Content Buddy',  '/products/ai-content-buddy'],
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E8EDF3]">

      {/* ── MAIN GRID ── */}
      <div className="max-w-[1240px] mx-auto px-12 py-16 grid grid-cols-1 md:grid-cols-[28%_1fr_22%] gap-12 border-b border-[#E8EDF3]">

        {/* Col 1 — Logo + tagline + social */}
        <div className="flex flex-col">
          <Link to="/" className="inline-block mb-6">
            <img
              src="/assets/clients/logo.png"
              alt="AI Agentix"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-8">
            End-to-end AI solutions — from strategy and proof-of-concept to
            production deployment. Trusted by enterprises across 30+ industries.
          </p>
          <div className="flex gap-3 mt-auto">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] transition-all duration-200 hover:border-[#F26522] hover:text-[#F26522] hover:bg-[#FFF5F0]"
            >
              <FaLinkedinIn size={15} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X / Twitter"
              className="w-9 h-9 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] transition-all duration-200 hover:border-[#F26522] hover:text-[#F26522] hover:bg-[#FFF5F0]"
            >
              <FaXTwitter size={15} />
            </a>
          </div>
        </div>

        {/* Col 2 — Services (3 sub-cols) */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#F26522] mb-7">
            Services
          </p>
          <div className="grid grid-cols-3 gap-6">
            {SERVICES.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#9CA3AF] mb-4">
                  {group.label}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map(([name, href]) => (
                    <li key={name}>
                      <Link
                        to={href}
                        className="text-[13px] text-[#4B5563] hover:text-[#F26522] transition-colors duration-150"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Col 3 — Company + Contact card */}
        <div className="grid grid-cols-1 gap-8">

          {/* Company links */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#F26522] mb-5">
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY.map(([name, href]) => (
                <li key={name}>
                  <Link
                    to={href}
                    className="text-[13px] text-[#4B5563] hover:text-[#F26522] transition-colors duration-150"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact card */}
          <div className="rounded-xl p-5 bg-[#FFF8F5] border border-[#FFE0CC]">
            <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#9CA3AF] mb-3">
              Get in touch
            </p>
            <p className="text-[13px] font-semibold text-[#0D1E3A] mb-1">AI Agentix Ltd.</p>
            <p className="text-[12px] text-[#6B7280] mb-3">HQ — Global Remote</p>
            <a
              href="mailto:hello@ai-agentix.com"
              className="text-[13px] text-[#F26522] hover:text-[#C93D00] transition-colors duration-150 block mb-4"
            >
              hello@ai-agentix.com
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-white bg-[#F26522] rounded-lg hover:bg-[#C93D00] transition-colors duration-200"
            >
              Let's talk <FaArrowRight size={10} />
            </Link>
          </div>
        </div>

      </div>

      {/* ── PRODUCTS BAND ── */}
      <div className="border-b border-[#E8EDF3]">
        <div className="max-w-[1240px] mx-auto px-12 py-5 flex items-center gap-8 flex-wrap">
          <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#9CA3AF] shrink-0">
            Products
          </p>
          <div className="flex gap-3 flex-wrap">
            {PRODUCTS.map(([name, href]) => (
              <Link
                key={name}
                to={href}
                className="text-[13px] px-4 py-1.5 rounded-full border border-[#E5E7EB] text-[#4B5563] hover:text-[#F26522] hover:border-[#F26522] transition-all duration-200"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="max-w-[1240px] mx-auto px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px] text-[#9CA3AF]">
          © 2026 AI Agentix Ltd. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Terms', 'Privacy Policy', 'Cookies'].map((t) => (
            <Link
              key={t}
              to={`/${t.toLowerCase().replace(' ', '-')}`}
              className="text-[12px] text-[#9CA3AF] hover:text-[#F26522] transition-colors duration-150"
            >
              {t}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-7 h-7 flex items-center justify-center text-[#9CA3AF] hover:text-[#F26522] transition-colors duration-200"
          >
            <FaLinkedinIn size={13} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter"
            className="w-7 h-7 flex items-center justify-center text-[#9CA3AF] hover:text-[#F26522] transition-colors duration-200"
          >
            <FaXTwitter size={13} />
          </a>
        </div>
      </div>

    </footer>
  );
}
