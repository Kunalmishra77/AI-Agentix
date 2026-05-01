import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

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
    <footer style={{ backgroundColor: '#0A1628' }}>

      {/* ── TOP BAND — brand strip ── */}
      <div
        className="border-b"
        style={{ borderColor: '#1A3050' }}
      >
        <div
          className="max-w-[1240px] mx-auto px-12 py-14 grid gap-16"
          style={{ gridTemplateColumns: '28% 1fr 22%' }}
        >

          {/* Col 1 — Logo + tagline + social */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/assets/clients/logo.png"
                alt="AI Agentix"
                className="h-10 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>
            <p className="text-[14px] leading-relaxed mb-8" style={{ color: '#7A8FA6' }}>
              End-to-end AI solutions — from strategy and proof-of-concept to
              production deployment. Trusted by enterprises across 30+ industries.
            </p>
            <div className="flex gap-3 mt-auto">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: '#1A3050', color: '#7A8FA6' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F26522'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1A3050'; e.currentTarget.style.color = '#7A8FA6'; }}
              >
                <FaLinkedinIn size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: '#1A3050', color: '#7A8FA6' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#F26522'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1A3050'; e.currentTarget.style.color = '#7A8FA6'; }}
              >
                <FaXTwitter size={15} />
              </a>
            </div>
          </div>

          {/* Col 2 — Services (3 sub-cols) */}
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.12em] font-bold mb-7"
              style={{ color: '#F26522' }}
            >
              Services
            </p>
            <div className="grid grid-cols-3 gap-6">
              {SERVICES.map((group) => (
                <div key={group.label}>
                  <p
                    className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-4"
                    style={{ color: '#4A6080' }}
                  >
                    {group.label}
                  </p>
                  <ul className="space-y-2.5">
                    {group.links.map(([name, href]) => (
                      <li key={name}>
                        <Link
                          to={href}
                          className="text-[13px] transition-colors duration-150"
                          style={{ color: '#7A8FA6' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#F26522'}
                          onMouseLeave={e => e.currentTarget.style.color = '#7A8FA6'}
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

          {/* Col 3 — Company + Contact + Products */}
          <div className="grid grid-cols-1 gap-8">

            {/* Company links */}
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.12em] font-bold mb-5"
                style={{ color: '#F26522' }}
              >
                Company
              </p>
              <ul className="space-y-2.5">
                {COMPANY.map(([name, href]) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="text-[13px] transition-colors duration-150"
                      style={{ color: '#7A8FA6' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F26522'}
                      onMouseLeave={e => e.currentTarget.style.color = '#7A8FA6'}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div
              className="rounded-xl p-5"
              style={{ background: '#0D1E3A', border: '1px solid #1A3050' }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-3"
                style={{ color: '#4A6080' }}
              >
                Get in touch
              </p>
              <p className="text-[13px] font-semibold text-white mb-1">AI Agentix Ltd.</p>
              <p className="text-[12px] mb-3" style={{ color: '#7A8FA6' }}>HQ — Global Remote</p>
              <a
                href="mailto:hello@ai-agentix.com"
                className="text-[13px] transition-colors duration-150 block mb-4"
                style={{ color: '#F26522' }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF7A3D'}
                onMouseLeave={e => e.currentTarget.style.color = '#F26522'}
              >
                hello@ai-agentix.com
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 text-[12px] font-bold text-white rounded-lg transition-colors duration-200"
                style={{ background: '#F26522' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FF7A3D'}
                onMouseLeave={e => e.currentTarget.style.background = '#F26522'}
              >
                Let's talk →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── PRODUCTS BAND ── */}
      <div
        className="border-b"
        style={{ borderColor: '#1A3050' }}
      >
        <div className="max-w-[1240px] mx-auto px-12 py-6 flex items-center gap-8 flex-wrap">
          <p
            className="text-[11px] uppercase tracking-[0.12em] font-bold shrink-0"
            style={{ color: '#4A6080' }}
          >
            Products
          </p>
          <div className="flex gap-4 flex-wrap">
            {PRODUCTS.map(([name, href]) => (
              <Link
                key={name}
                to={href}
                className="text-[13px] px-4 py-1.5 rounded-full transition-all duration-200"
                style={{ color: '#7A8FA6', border: '1px solid #1A3050' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F26522'; e.currentTarget.style.borderColor = '#F26522'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#7A8FA6'; e.currentTarget.style.borderColor = '#1A3050'; }}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="max-w-[1240px] mx-auto px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[12px]" style={{ color: '#3D546B' }}>
          © 2026 AI Agentix Ltd. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Terms', 'Privacy Policy', 'Cookies'].map((t) => (
            <a
              key={t}
              href="#"
              className="text-[12px] transition-colors duration-150"
              style={{ color: '#3D546B' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F26522'}
              onMouseLeave={e => e.currentTarget.style.color = '#3D546B'}
            >
              {t}
            </a>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-7 h-7 rounded flex items-center justify-center transition-all duration-200"
            style={{ color: '#3D546B' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F26522'}
            onMouseLeave={e => e.currentTarget.style.color = '#3D546B'}
          >
            <FaLinkedinIn size={13} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X / Twitter"
            className="w-7 h-7 rounded flex items-center justify-center transition-all duration-200"
            style={{ color: '#3D546B' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F26522'}
            onMouseLeave={e => e.currentTarget.style.color = '#3D546B'}
          >
            <FaXTwitter size={13} />
          </a>
        </div>
      </div>

    </footer>
  );
}
