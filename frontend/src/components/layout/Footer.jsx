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

      {/* ── MAIN GRID — 4 columns ── */}
      <div className="max-w-[1240px] mx-auto px-12 py-10 grid grid-cols-1 md:grid-cols-[20%_1fr_13%_20%] gap-10 items-start border-b border-[#E8EDF3]">

        {/* Col 1 — Logo + tagline + social */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <img
              src="/assets/clients/logo.png"
              alt="AI Agentix"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <p className="text-[13px] text-[#6B7280] leading-relaxed mb-5">
            End-to-end AI solutions — from strategy and proof-of-concept to production deployment.
          </p>
          <div className="flex gap-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:border-[#F26522] hover:text-[#F26522] hover:bg-[#FFF5F0] transition-all duration-200"
            >
              <FaLinkedinIn size={13} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X / Twitter"
              className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:border-[#F26522] hover:text-[#F26522] hover:bg-[#FFF5F0] transition-all duration-200"
            >
              <FaXTwitter size={13} />
            </a>
          </div>
        </div>

        {/* Col 2 — Services (3 sub-cols) */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#F26522] mb-5">
            Services
          </p>
          <div className="grid grid-cols-3 gap-4">
            {SERVICES.map((group) => (
              <div key={group.label}>
                <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-[#9CA3AF] mb-3">
                  {group.label}
                </p>
                <ul className="space-y-2">
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

        {/* Col 3 — Company links */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#F26522] mb-5">
            Company
          </p>
          <ul className="space-y-2">
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

        {/* Col 4 — Get in touch */}
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#F26522] mb-5">
            Get in touch
          </p>
          <div className="rounded-xl p-4 bg-[#FFF8F5] border border-[#FFE0CC]">
            <p className="text-[13px] font-semibold text-[#0D1E3A] mb-0.5">AI Agentix Ltd.</p>
            <p className="text-[11px] text-[#6B7280] mb-2">HQ — Global Remote</p>
            <a
              href="mailto:hello@ai-agentix.com"
              className="text-[13px] text-[#F26522] hover:text-[#C93D00] transition-colors duration-150 block mb-3"
            >
              hello@ai-agentix.com
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-white bg-[#F26522] rounded-lg hover:bg-[#C93D00] transition-colors duration-200"
            >
              Let's talk <FaArrowRight size={9} />
            </Link>
          </div>

          {/* Products */}
          <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#9CA3AF] mt-6 mb-3">
            Products
          </p>
          <div className="flex flex-col gap-1.5">
            {PRODUCTS.map(([name, href]) => (
              <Link
                key={name}
                to={href}
                className="text-[13px] text-[#4B5563] hover:text-[#F26522] transition-colors duration-150"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="max-w-[1240px] mx-auto px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-[#9CA3AF]">
          © 2026 AI Agentix Ltd. All rights reserved.
        </p>
        <div className="flex gap-5">
          {['Terms', 'Privacy Policy', 'Cookies'].map((t) => (
            <Link
              key={t}
              to={`/${t.toLowerCase().replace(' ', '-')}`}
              className="text-[11px] text-[#9CA3AF] hover:text-[#F26522] transition-colors duration-150"
            >
              {t}
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"
            className="text-[#9CA3AF] hover:text-[#F26522] transition-colors">
            <FaLinkedinIn size={13} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X / Twitter"
            className="text-[#9CA3AF] hover:text-[#F26522] transition-colors">
            <FaXTwitter size={13} />
          </a>
        </div>
      </div>

    </footer>
  );
}
