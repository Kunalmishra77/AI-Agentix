import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, ChevronRight } from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const up = (d = 0) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const SECTIONS = [
  {
    icon: <Database size={22} />, color: '#E8631A', title: '1. Information We Collect',
    paras: [
      'We collect information you provide directly — name, email, phone number, company name, and any details you share via our contact forms, booking flows, or voice agent interactions.',
      'We automatically collect technical data including IP address, browser type, device information, pages visited, and session duration via cookies and analytics tools (Google Analytics, Hotjar).',
      'If you interact with our AI Voice Agent, voice data is processed in real-time by our speech-to-text providers and is not stored beyond the session unless you explicitly consent.',
    ],
  },
  {
    icon: <Eye size={22} />, color: '#6366F1', title: '2. How We Use Your Information',
    paras: [
      'To respond to inquiries, book demos, and deliver the services you requested — including sending you updates, proposals, and automation reports.',
      'To personalise your experience on our platform and improve our AI agent workflows based on usage patterns.',
      'To send transactional emails (booking confirmations, audit reports) and occasional marketing communications. You can unsubscribe at any time.',
      'To comply with Indian laws and regulations, including the Digital Personal Data Protection Act, 2023 (DPDPA).',
    ],
  },
  {
    icon: <Lock size={22} />, color: '#10B981', title: '3. Data Security',
    paras: [
      'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Our infrastructure is hosted on AWS (Mumbai region) — your data stays within India.',
      'We implement role-based access controls, audit logs, and regular security reviews. No third party has access to your personal data without your explicit consent or legal obligation.',
      'In the event of a data breach that poses risk to you, we will notify you and relevant authorities within 72 hours as required under DPDPA.',
    ],
  },
  {
    icon: <Shield size={22} />, color: '#F59E0B', title: '4. Your Rights',
    paras: [
      'Under the DPDPA 2023 and general data protection principles, you have the right to access, correct, or request deletion of your personal data at any time.',
      'You can withdraw consent for marketing communications by clicking "Unsubscribe" in any email or by writing to us at myai@ai-agentix.com.',
      'We will respond to data access or deletion requests within 30 days. Verification of identity may be required before processing such requests.',
    ],
  },
  {
    icon: <ChevronRight size={22} />, color: '#EC4899', title: '5. Third-Party Services',
    paras: [
      'We use trusted third-party services including Google Analytics (analytics), Razorpay (payments), Twilio (SMS/WhatsApp), and OpenAI / Anthropic (AI processing). Each operates under their own privacy policies.',
      'We do not sell, rent, or trade your personal information to third parties for marketing purposes under any circumstances.',
    ],
  },
  {
    icon: <Mail size={22} />, color: '#0EA5E9', title: '6. Contact & Updates',
    paras: [
      'This policy was last updated on 1 January 2025. We may update it periodically — significant changes will be communicated via email or a notice on our website.',
      'For any privacy-related queries, please contact our Data Protection Officer at: myai@ai-agentix.com or write to Santure AI Private Limited, New Delhi, India.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — AI Agentix</title>
        <meta name="description" content="How AI Agentix collects, uses, and protects your personal data. Compliant with DPDPA 2023." />
      </Helmet>
      <SiteNav />

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '38vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <Shield size={13} color="#10B981" />
            <span style={{ fontSize: 12, color: '#10B981', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.06em' }}>DPDPA 2023 Compliant</span>
          </motion.div>
          <motion.h1 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,54px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            Privacy Policy
          </motion.h1>
          <motion.p {...up(0.12)} style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', maxWidth: 520, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.75 }}>
            We believe your data is yours. Here's exactly what we collect, why, and how we protect it — in plain English.
          </motion.p>
          <motion.p {...up(0.16)} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16, fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}>
            Last updated: 1 January 2025 · Applies to: AI Agentix (Santure AI Private Limited)
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: '#fff', padding: '80px 0 100px' }}>
        <div className="ax-container" style={{ maxWidth: 860, margin: '0 auto', padding: '0 40px' }}>
          {SECTIONS.map((sec, i) => (
            <motion.div key={sec.title} {...up(i * 0.04)} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < SECTIONS.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${sec.color}12`, border: `1px solid ${sec.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sec.color, flexShrink: 0 }}>
                  {sec.icon}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#0D1B2E', margin: 0 }}>{sec.title}</h2>
              </div>
              {sec.paras.map((p, j) => (
                <p key={j} style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.8, marginBottom: 12, fontFamily: 'var(--font-body)' }}>{p}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#060E1A', padding: '60px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.h3 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Questions about your data?</motion.h3>
          <motion.p {...up(0.06)} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 24, fontFamily: 'var(--font-body)' }}>
            Email our Data Protection Officer directly.
          </motion.p>
          <motion.a {...up(0.1)} href="mailto:myai@ai-agentix.com"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', color: '#E8631A', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, padding: '12px 28px', borderRadius: 10, textDecoration: 'none' }}>
            <Mail size={15} /> myai@ai-agentix.com
          </motion.a>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}
