import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Youtube, Instagram, ArrowRight } from 'lucide-react';
import {
  SiOpenai, SiGooglecloud, SiMeta, SiTwilio, SiRazorpay, SiMake,
  SiAnthropic, SiWhatsapp, SiHubspot, SiLangchain,
} from 'react-icons/si';
import BrandLogo from './BrandLogo.jsx';

const PARTNERS_BASE = [
  { name: 'OpenAI', color: '#10A37F' },
  { name: 'Google Cloud', color: '#4285F4' },
  { name: 'AWS',  color: '#FF9900' },
  { name: 'Meta AI',       color: '#1877F2' },
  { name: 'Twilio',        color: '#F22F46' },
  { name: 'Razorpay',     color: '#3395FF' },
  { name: 'n8n',         color: '#EA4B71' },
  { name: 'Make',            color: '#6D00CC' },
  { name: 'Anthropic',  color: '#C96442' },
  { name: 'WhatsApp',      color: '#25D366' },
  { name: 'HubSpot',      color: '#FF7A59' },
  { name: 'LangChain',    color: '#F0A500' },
];
const PARTNERS = [...PARTNERS_BASE, ...PARTNERS_BASE];

const SOCIALS = [
  { icon: <Linkedin size={16} />, href: 'https://linkedin.com/company/aiagentex', label: 'LinkedIn' },
  { icon: <Youtube size={16} />, href: 'https://youtube.com/@aiagentex', label: 'YouTube' },
  { icon: <Instagram size={16} />, href: 'https://instagram.com/aiagentex', label: 'Instagram' },
];

export default function SiteFooter() {
  return (
    <footer className="ax-footer">
      {/* Partner marquee */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingTop: 48, paddingBottom: 40, marginBottom: 64 }}>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 28, marginTop: 0 }}>
          Powered by the world's most powerful AI platforms
        </p>
        <div className="ax-mq-wrap">
          <div className="ax-mq-track" style={{ animation: 'ax-scroll-left 40s linear infinite' }}>
            {PARTNERS.map((p, i) => (
              <div key={i} className="ax-mq-pill">
                
                <span className="ax-mq-label">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ax-container">
        <div className="ax-footer-grid">
          {/* Col 1 — Brand */}
          <div>
            <BrandLogo variant="original" height={44} style={{ marginBottom: 16 }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 280, margin: '0 0 24px' }}>
              India's #1 end-to-end AI automation partner. Powering intelligent businesses across 15+ industries.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, borderColor: 'var(--or)', color: 'var(--or)' }}
                  transition={{ duration: 0.15 }}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Solutions */}
          <div>
            <p className="ax-footer-title">Solutions</p>
            <ul className="ax-footer-links">
              {['Sales Automation', 'Marketing Automation', 'HRMS & Hiring', 'Operations', 'Supply Chain', 'Finance & Accounts', 'Voice & Chat Agents', 'Manufacturing'].map((s) => (
                <li key={s}><Link to="/solutions">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Industries */}
          <div>
            <p className="ax-footer-title">Industries</p>
            <ul className="ax-footer-links">
              {['Healthcare', 'Education', 'Hospitality', 'Real Estate', 'Retail & E-commerce', 'Manufacturing', 'Logistics'].map((i) => (
                <li key={i}><Link to="/industries">{i}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <p className="ax-footer-title">Company</p>
            <ul className="ax-footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/technology">Technology</Link></li>
              <li><Link to="/ai-studio">AI Studio</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/contact#careers">Careers</Link></li>
              <li><Link to="/contact#partnerships">Partner With Us</Link></li>
            </ul>
          </div>

          {/* Col 5 — Newsletter */}
          <div>
            <p className="ax-footer-title">Stay Updated</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 16, marginTop: 0, lineHeight: 1.6 }}>
              Weekly insights on AI automation for Indian businesses.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="email"
                placeholder="Your email"
                className="ax-input"
                style={{ fontSize: 14, padding: '12px 16px' }}
              />
              <button type="submit" className="ax-btn ax-btn-primary" style={{ justifyContent: 'center', padding: '12px 20px', fontSize: 14 }}>
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
            <div style={{ marginTop: 24 }}>
              <p className="ax-footer-title">Contact</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.8 }}>
                hello@aiagentex.in<br />
                +91-XXXXXXXXXX<br />
                India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ax-footer-bottom">
          <div>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} AGENTiX. All rights reserved. Powering India's Automation Revolution.</p>
            <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
              A product of <strong style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>SANTURE AI PRIVATE LIMITED</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy',   to: '/privacy' },
              { label: 'Terms of Service', to: '/terms' },
              { label: 'Refund Policy',    to: '/contact' },
              { label: 'Sitemap',          to: '/sitemap.xml' },
            ].map((l) => (
              <Link key={l.label} to={l.to} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--or)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
              >{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
