import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, Phone, Mail, MapPin, Shield, Clock, ArrowRight,
  ChevronDown, MessageSquare, Calendar, Handshake, Zap, Users,
  Star, Building2,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const left = (d = 0) => ({ initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const CONTACT_TYPES = [
  { id: 'audit', label: 'Free AI Audit', icon: <Zap size={16} />, desc: 'Get a free analysis of your top 3 automation opportunities', color: '#E8631A' },
  { id: 'demo', label: 'Book a Demo', icon: <Calendar size={16} />, desc: 'See a live demo of our AI agents in action', color: '#6366F1' },
  { id: 'partner', label: 'Partnership', icon: <Handshake size={16} />, desc: 'Agencies, consultants, and tech partners', color: '#10B981' },
];

const FAQS = [
  { q: 'How long does implementation take?', a: 'Most clients are live within 6""10 weeks from signing. A single AI voice agent is 2""3 weeks; a full multi-system integration is 8""10 weeks. We give you a precise timeline after the discovery audit "" no surprises.' },
  { q: 'Do we need to change our existing tools?', a: 'No. We integrate with your existing stack. AI Agentix connects with 200+ tools including Zoho, HubSpot, Salesforce, Tally, Google Workspace, and WhatsApp Business. We work around your systems.' },
  { q: 'What if the automation breaks or has errors?', a: 'Every automation has fallback logic that routes to a human when needed. You get real-time monitoring dashboards, instant alerts, and our support team responds within 4 business hours. Most issues are caught proactively.' },
  { q: 'Do we need technical staff to manage this?', a: 'No. Dashboards are built for business owners and managers, not developers. We train your team in 2 hours. Most clients manage their automations with no coding knowledge at all.' },
  { q: 'How is pricing structured?', a: 'Starter (₹25,000/mo), Growth (₹49,000/mo), and Enterprise (₹89,000/mo+). Each includes automation workflows plus ongoing support. Custom pricing for large-scale deployments. No setup fees in most cases.' },
  { q: 'Is our data safe?', a: 'Yes. SOC 2 compliant, ISO 27001 aligned. Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). Hosted on AWS Mumbai "" data never leaves India without written consent. We sign NDAs for sensitive industries.' },
  { q: 'Can we start with one automation and scale later?', a: 'Absolutely. We recommend starting with your highest-impact workflow "" usually lead follow-up or appointment management. Once you see ROI, expanding is fast because the infrastructure is already in place.' },
];

const TRUST_POINTS = [
  { icon: <Shield size={18} />, label: 'SOC 2 Compliant', color: '#10B981' },
  { icon: <Clock size={18} />, label: '4-hour SLA', color: '#6366F1' },
  { icon: <Star size={18} />, label: '97% Satisfaction', color: '#F59E0B' },
  { icon: <Building2 size={18} />, label: '200+ Clients', color: '#E8631A' },
];

export default function ContactPage() {
  const [contactType, setContactType] = useState('audit');
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', industry: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setApiError('');
    try {
      const res = await fetch(`${API_BASE}/api/v1/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: CONTACT_TYPES.find(t => t.id === contactType)?.label }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || 'Something went wrong. Please try again.');
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message || 'Failed to send. Please WhatsApp us instead.');
    } finally { setLoading(false); }
  };

  const iStyle = { width: '100%', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#111827', outline: 'none', boxSizing: 'border-box' };

  return (
    <>
      <Helmet>
        <title>Contact "" AI Agentix</title>
        <meta name="description" content="Book a free AI audit, demo, or strategy call. Talk to our team about automating your business." />
      </Helmet>
      <SiteNav />

      {/* ⓀⓀ 1. HERO "" Dark ⓀⓀ */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '46vh', display: 'flex', alignItems: 'center', paddingTop: 100, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <MessageSquare size={13} color="#E8631A" />
            <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Free 30-Min Strategy Call</span>
          </motion.div>
          <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4vw,58px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            Let's Talk About Your<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Biggest Workflow Problem</span>
          </motion.h1>
          <motion.p {...up(0.14)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto', fontFamily: 'var(--font-body)' }}>
            No pitch decks. No pressure. Just an honest conversation about what you're dealing with "" and whether we can automate it.
          </motion.p>
        </div>
      </section>

      {/* ⓀⓀ 2. CONTACT FORM + INFO "" WHITE, 2-col ⓀⓀ */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'start' }}>
          {/* Left: form */}
          <div>
            {/* Contact type selector */}
            <motion.div {...left(0)} style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
              {CONTACT_TYPES.map(ct => (
                <button key={ct.id} onClick={() => setContactType(ct.id)}
                  style={{ flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', gap: 10, padding: '16px 18px', borderRadius: 14, border: `2px solid ${contactType === ct.id ? ct.color : '#E5E7EB'}`, background: contactType === ct.id ? `${ct.color}08` : '#F9FAFB', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
                  <span style={{ color: contactType === ct.id ? ct.color : '#9CA3AF' }}>{ct.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: contactType === ct.id ? '#0D1B2E' : '#374151' }}>{ct.label}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginTop: 2 }}>{ct.desc}</div>
                  </div>
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '60px 40px', background: '#F0FDF4', borderRadius: 20, border: '1px solid #BBF7D0' }}>
                  <CheckCircle size={56} color="#16A34A" style={{ margin: '0 auto 20px' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#0D1B2E', marginBottom: 12 }}>Message Received!</h3>
                  <p style={{ fontSize: 15, color: '#4B5563', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>We'll reach out within 4 business hours. In the meantime, feel free to WhatsApp us directly for a faster response.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} {...left(0.08)}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    {[
                      { name: 'name', label: 'Full Name', placeholder: 'Rajesh Kumar', required: true },
                      { name: 'phone', label: 'Phone / WhatsApp', placeholder: '+91 98765 43210', required: true },
                    ].map(f => (
                      <div key={f.name}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, fontFamily: 'var(--font-body)' }}>{f.label}</label>
                        <input name={f.name} value={formData[f.name]} onChange={handleChange} placeholder={f.placeholder} required={f.required} style={iStyle} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    {[
                      { name: 'email', label: 'Email Address', placeholder: 'rajesh@company.com', type: 'email', required: true },
                      { name: 'company', label: 'Company Name', placeholder: 'Acme Solutions Pvt Ltd' },
                    ].map(f => (
                      <div key={f.name}>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, fontFamily: 'var(--font-body)' }}>{f.label}</label>
                        <input name={f.name} type={f.type || 'text'} value={formData[f.name]} onChange={handleChange} placeholder={f.placeholder} required={f.required} style={iStyle} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, fontFamily: 'var(--font-body)' }}>Industry</label>
                    <select name="industry" value={formData.industry} onChange={handleChange} style={{ ...iStyle, appearance: 'none' }}>
                      <option value="">Select your industry</option>
                      {['Real Estate', 'Healthcare', 'Education', 'Retail & E-commerce', 'Logistics', 'Hospitality', 'Manufacturing', 'Other'].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6, fontFamily: 'var(--font-body)' }}>What's the workflow problem you want to automate?</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="E.g. We get 500+ leads a month but our team can't follow up fast enough. We lose 60% of leads to competitors who respond faster..." rows={4} style={{ ...iStyle, resize: 'vertical', minHeight: 100 }} />
                  </div>
                  {apiError && <div style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#DC2626', fontFamily: 'var(--font-body)' }}>{apiError}</div>}
                  <button type="submit" disabled={loading}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: loading ? '#9CA3AF' : 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '15px 28px', borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 6px 24px rgba(232,99,26,0.3)' }}>
                    {loading ? 'Sending...' : 'Send Message'} {!loading && <ArrowRight size={17} />}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right: contact info + trust */}
          <motion.div {...up(0.1)}>
            {/* Trust points */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
              {TRUST_POINTS.map(tp => (
                <div key={tp.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
                  <span style={{ color: tp.color }}>{tp.icon}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: '#0D1B2E' }}>{tp.label}</span>
                </div>
              ))}
            </div>

            {/* Contact methods */}
            <div style={{ background: '#0D1B2E', borderRadius: 20, padding: 32, marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 20 }}>Reach Us Directly</div>
              {[
                { icon: <Phone size={16} />, label: 'Call / WhatsApp', value: '+91 98765 43210', color: '#10B981' },
                { icon: <Mail size={16} />, label: 'Email', value: 'hello@aiagentix.in', color: '#6366F1' },
                { icon: <MapPin size={16} />, label: 'Office', value: 'Pune Â· Mumbai Â· Bangalore', color: '#E8631A' },
              ].map(cm => (
                <div key={cm.label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${cm.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cm.color, flexShrink: 0 }}>{cm.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{cm.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{cm.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response promise */}
            <div style={{ background: '#F9FAFB', borderRadius: 16, padding: 24, border: '1px solid #E5E7EB' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#0D1B2E', marginBottom: 12 }}>What Happens Next?</div>
              {[
                'We review your message within 4 business hours',
                'A senior consultant calls to understand your workflow',
                'You get a custom automation proposal in 48 hours',
                'Free "" no commitment required',
              ].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#E8631A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontFamily: 'var(--font-number)', fontSize: 10, fontWeight: 700, color: '#fff' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.55, fontFamily: 'var(--font-body)' }}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 3. FAQ "" LIGHT ICE, accordion ⓀⓀ */}
      <section style={{ background: '#F0F4F8', padding: '100px 0' }}>
        <div className="ax-container" style={{ maxWidth: 820, margin: '0 auto', padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>FAQ</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>Questions We Get Every Day</h2>
          </motion.div>
          {FAQS.map((faq, i) => (
            <motion.div key={faq.q} {...up(i * 0.05)} style={{ marginBottom: 12 }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: openFaq === i ? '#fff' : '#fff', borderRadius: openFaq === i ? '14px 14px 0 0' : 14, border: `1px solid ${openFaq === i ? '#E8631A30' : '#E5E7EB'}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', borderBottom: openFaq === i ? '1px solid #F3F4F6' : undefined }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: openFaq === i ? '#E8631A' : '#0D1B2E' }}>{faq.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} color={openFaq === i ? '#E8631A' : '#9CA3AF'} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden', background: '#fff', borderRadius: '0 0 14px 14px', border: '1px solid #E8631A30', borderTop: 'none' }}>
                    <div style={{ padding: '20px 24px', fontSize: 14, color: '#4B5563', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ⓀⓀ 4. FINAL CTA "" Dark ⓀⓀ */}
      <section style={{ background: '#060E1A', padding: '80px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,48px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            Still Have Questions?
          </motion.h2>
          <motion.p {...up(0.06)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            WhatsApp us directly. Our team responds within 30 minutes during business hours.
          </motion.p>
          <motion.a {...up(0.12)} href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(37,211,102,0.3)' }}>
            <MessageSquare size={18} /> WhatsApp Us Now
          </motion.a>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}

