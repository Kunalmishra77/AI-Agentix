import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SiteNav from '../../../components/layout/SiteNav.jsx';
import SiteFooter from '../../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../../voice-agent/VoiceAgentWidget.jsx';
import '../../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

function useCountUp(target, dur = 1800) {
  const [count, setCount] = useState(0); const ref = useRef(null);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; obs.disconnect(); let s = null; const tick = (ts) => { if (!s) s = ts; const p = Math.min((ts - s) / dur, 1); setCount(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, { threshold: 0.3 }); obs.observe(el); return () => obs.disconnect(); }, [target, dur]);
  return [count, ref];
}

const FEATURES = [
  { id: 0, label: 'Reservation Automation', detail: 'AI handles booking inquiries, modifications, and cancellations 24/7 via web, WhatsApp, and phone. Reduces front-desk call volume by 70% while improving response time to seconds.' },
  { id: 1, label: 'Guest Experience Personalization', detail: 'Analyze guest history, preferences, and feedback to create personalized room setups, dining recommendations, and activity suggestions automatically on each visit.' },
  { id: 2, label: 'Concierge AI Assistant', detail: 'Virtual concierge answers questions about amenities, local attractions, dining, and transportation. Available in 40+ languages for international guests.' },
  { id: 3, label: 'Housekeeping Optimization', detail: 'AI-driven scheduling optimizes room turnover, predicts demand patterns, and routes housekeeping staff efficiently "" reducing labor costs by 22%.' },
  { id: 4, label: 'Revenue Management', detail: 'Dynamic pricing engine adjusts room rates in real-time based on demand, competitor pricing, events, and seasonality to maximize RevPAR automatically.' },
  { id: 5, label: 'Review & Reputation Management', detail: 'Monitor and respond to reviews across TripAdvisor, Google, and Booking.com with AI-crafted personalized responses. Alert management to negative trends instantly.' },
];

const FAQS = [
  { q: 'Does the AI work with our existing PMS (Property Management System)?', a: 'Yes. We integrate with Opera, Cloudbeds, Mews, RMS, and 30+ other PMS platforms via API. No replacement needed.' },
  { q: 'Can the concierge AI handle special requests and complaints?', a: 'Yes. The AI handles routine requests autonomously and escalates complex issues to human staff with full context, guest history, and suggested resolutions.' },
  { q: 'How does revenue management AI compare to manual pricing?', a: 'Hotels using our dynamic pricing see 18-35% RevPAR improvement vs. manual rate setting, based on competitor analysis and demand forecasting across 200+ signals.' },
  { q: 'Is guest data handled securely and GDPR-compliant?', a: 'Absolutely. All guest data is encrypted, access-controlled, and compliant with GDPR, CCPA, and PCI-DSS. Guests can request data deletion at any time.' },
  { q: 'What languages does the guest-facing AI support?', a: 'The guest AI supports 40+ languages including Arabic, Mandarin, Hindi, French, German, Spanish, Japanese, and all major European languages.' },
];

export default function HospitalityPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [satisfaction, satisfactionRef] = useCountUp(96);
  const [revpar, revparRef] = useCountUp(32);
  const [callReduction, callReductionRef] = useCountUp(70);
  const [occupancy, occupancyRef] = useCountUp(88);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--nvd)', color: 'var(--ow)', overflowX: 'hidden' }}>
      <SiteNav scrolled={scrolled} logoFilter={scrolled ? 'none' : 'brightness(0) invert(1)'} />

      {/* HERO "" dark, live booking widget */}
      <section style={{ background: 'var(--nvd)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.15)', border: '1px solid rgba(232,99,26,0.4)', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ color: 'var(--or)', fontSize: 13, fontWeight: 600 }}>AI FOR HOSPITALITY</span>
            </motion.div>
            <motion.h1 {...up(0.2)} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, fontFamily: 'var(--font-display)' }}>
              Delight Every Guest with <span style={{ color: 'var(--or)' }}>AI-Powered Hospitality</span>
            </motion.h1>
            <motion.p {...up(0.3)} style={{ fontSize: '1.1rem', color: 'rgba(248,246,242,0.7)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              Automate reservations, personalize guest experiences, and optimize revenue "" so your team can focus on delivering exceptional service.
            </motion.p>
            <motion.div {...up(0.4)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Book a Demo</a>
              <a href="/case-studies" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>View Results</a>
            </motion.div>
          </div>

          {/* Hotel Live Dashboard Widget */}
          <motion.div {...up(0.3)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 13, color: 'rgba(248,246,242,0.5)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>LIVE HOTEL DASHBOARD</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Occupancy', value: '87%', color: '#22c55e' },
                { label: 'RevPAR', value: '₹4,280', color: 'var(--or)' },
                { label: 'AI Chats Today', value: '342', color: '#60a5fa' },
                { label: 'Avg Response', value: '2.1s', color: '#a78bfa' },
              ].map((m, i) => (
                <div key={i} style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, border: `1px solid ${m.color}22` }}>
                  <div style={{ fontSize: 11, color: 'rgba(248,246,242,0.45)', marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: m.color, fontFamily: 'var(--font-number)' }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(248,246,242,0.4)', marginBottom: 10 }}>RECENT GUEST INTERACTIONS</div>
            {[
              { guest: 'Room 412', msg: 'Late checkout request approved', time: '1m ago' },
              { guest: 'Website', msg: 'Booking confirmed: Deluxe Suite', time: '4m ago' },
              { guest: 'WhatsApp', msg: 'Spa appointment scheduled', time: '7m ago' },
            ].map((g, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', fontSize: 12 }}>
                <span style={{ color: 'var(--ow)', fontWeight: 600 }}>{g.guest}</span>
                <span style={{ color: 'rgba(248,246,242,0.5)' }}>{g.msg}</span>
                <span style={{ color: 'rgba(248,246,242,0.3)' }}>{g.time}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS "" white */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Proven Hospitality Outcomes</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>Hotels and resorts using AI Agentix consistently outperform industry benchmarks.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { label: 'Guest Satisfaction', value: satisfaction, ref: satisfactionRef, suffix: '%', sub: 'Average CSAT score' },
              { label: 'RevPAR Improvement', value: revpar, ref: revparRef, suffix: '%', sub: 'Year-over-year increase' },
              { label: 'Call Volume Reduction', value: callReduction, ref: callReductionRef, suffix: '%', sub: 'Via AI automation' },
              { label: 'Average Occupancy', value: occupancy, ref: occupancyRef, suffix: '%', sub: 'Peak season rate' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 16, background: 'var(--ice)', border: '1px solid rgba(13,27,46,0.06)' }}>
                <div ref={s.ref} style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', lineHeight: 1 }}>{s.value}{s.suffix}</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--nvd)', marginTop: 8 }}>{s.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gr)', marginTop: 4 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES "" light ice */}
      <section style={{ background: 'var(--ice)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Complete Hospitality AI Suite</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>Six integrated modules that cover every aspect of hotel operations and guest experience.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FEATURES.map((f) => (
                <motion.button key={f.id} {...up(f.id * 0.08)} onClick={() => setActiveFeature(f.id)}
                  style={{ textAlign: 'left', padding: '16px 20px', borderRadius: 10, border: activeFeature === f.id ? '2px solid var(--or)' : '2px solid transparent', background: activeFeature === f.id ? 'rgba(232,99,26,0.08)' : '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <div style={{ fontWeight: 700, color: activeFeature === f.id ? 'var(--or)' : 'var(--nvd)', fontSize: '0.95rem' }}>{f.label}</div>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid rgba(13,27,46,0.08)', minHeight: 220 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--or)', marginBottom: 12, letterSpacing: 1 }}>FEATURE</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nvd)', marginBottom: 16 }}>{FEATURES[activeFeature].label}</h3>
                <p style={{ color: 'var(--gr)', lineHeight: 1.75 }}>{FEATURES[activeFeature].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PROPERTY TYPES "" cream */}
      <section style={{ background: 'var(--ow)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Designed for Every Property Type</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { icon: '🏨', title: 'Luxury Hotels', desc: 'White-glove AI that matches the premium experience guests expect.' },
              { icon: '🏖️', title: 'Beach Resorts', desc: 'Activity booking, spa scheduling, and F&B automation for resort guests.' },
              { icon: '🏢', title: 'Business Hotels', desc: 'Corporate booking tools, conference room automation, and billing workflows.' },
              { icon: '🏡', title: 'Boutique Properties', desc: 'Personalized automation that preserves the intimate boutique feel.' },
              { icon: '🌐', title: 'Hotel Chains', desc: 'Centralized AI management across all properties with local customization.' },
            ].map((p, i) => (
              <motion.div key={i} {...up(i * 0.08)} style={{ padding: '28px 22px', borderRadius: 16, background: '#fff', border: '1px solid rgba(13,27,46,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{p.icon}</div>
                <h4 style={{ fontWeight: 700, color: 'var(--nvd)', marginBottom: 8, fontSize: '1rem' }}>{p.title}</h4>
                <p style={{ color: 'var(--gr)', fontSize: '0.88rem', lineHeight: 1.65 }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS "" dark */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Guest Journey Automation</h2>
            <p style={{ color: 'rgba(248,246,242,0.6)', maxWidth: 520, margin: '0 auto' }}>AI touches every stage of the guest lifecycle automatically.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { step: '01', label: 'Discovery', desc: 'AI responds to inquiries across website, OTAs, and social 24/7' },
              { step: '02', label: 'Booking', desc: 'Seamless reservation automation with instant confirmation' },
              { step: '03', label: 'Pre-Arrival', desc: 'Personalized welcome messages, upsells, and preference capture' },
              { step: '04', label: 'In-Stay', desc: 'Concierge AI handles requests, recommendations, and issues' },
              { step: '05', label: 'Checkout', desc: 'Smooth check-out, invoice delivery, and feedback collection' },
              { step: '06', label: 'Post-Stay', desc: 'Review requests, loyalty offers, and re-booking automation' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.08)} style={{ padding: '28px 22px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: '2rem', color: 'var(--or)', marginBottom: 12 }}>{s.step}</div>
                <div style={{ fontWeight: 700, color: 'var(--ow)', marginBottom: 8 }}>{s.label}</div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(248,246,242,0.55)', lineHeight: 1.6 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS "" deep dark */}
      <section style={{ background: '#060E1A', padding: '80px 24px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Hotel Success Stories</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { property: 'Grand Palace Resort', result: '32% RevPAR increase', detail: 'Dynamic pricing AI optimized 640 room rates in real-time, capturing peak demand events automatically.', stat: '+32%' },
              { property: 'Coastline Boutique Hotel', result: '96% guest satisfaction', detail: 'AI concierge resolved 89% of guest requests without human intervention while maintaining personal touch.', stat: '96%' },
              { property: 'CitiStay Hotel Chain', result: '₹2.4M saved annually', detail: 'Automated housekeeping scheduling and reservation management across 12 properties reduced labor costs by 22%.', stat: '₹2.4M' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', marginBottom: 12 }}>{r.stat}</div>
                <div style={{ fontWeight: 700, color: 'var(--ow)', fontSize: '1.05rem', marginBottom: 10 }}>{r.result}</div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(248,246,242,0.55)', lineHeight: 1.65 }}>{r.detail}</div>
                <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--or)', fontWeight: 600 }}>"" {r.property}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--ice)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Frequently Asked Questions</h2>
          </motion.div>
          {FAQS.map((f, i) => (
            <motion.div key={i} {...up(i * 0.08)} style={{ background: '#fff', borderRadius: 12, marginBottom: 12, overflow: 'hidden', border: '1px solid rgba(13,27,46,0.08)' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 700, color: 'var(--nvd)', fontSize: '0.95rem', lineHeight: 1.5 }}>{f.q}</span>
                <span style={{ color: 'var(--or)', fontWeight: 700, fontSize: 20, flexShrink: 0, transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div style={{ padding: '0 24px 20px', color: 'var(--gr)', lineHeight: 1.75, fontSize: '0.92rem' }}>{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <motion.h2 {...up(0)} style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 16 }}>
            Elevate Your <span style={{ color: 'var(--or)' }}>Guest Experience</span>
          </motion.h2>
          <motion.p {...up(0.1)} style={{ color: 'rgba(248,246,242,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>
            Join 300+ hotels and resorts already using AI Agentix to deliver exceptional hospitality at scale.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '16px 40px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Start Free Trial</a>
            <a href="/contact" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '16px 40px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>Talk to Sales</a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </div>
  );
}

