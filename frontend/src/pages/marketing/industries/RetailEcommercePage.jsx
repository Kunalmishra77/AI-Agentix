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

const CAPABILITIES = [
  { id: 0, label: 'Conversational Commerce', detail: 'AI shopping assistants on WhatsApp, website, and Instagram help customers discover products, compare options, and complete purchases "" 24/7 without human intervention.' },
  { id: 1, label: 'Personalized Recommendations', detail: 'Machine learning analyzes browse history, purchase patterns, and real-time behavior to serve hyper-relevant product suggestions that increase average order value by 28%.' },
  { id: 2, label: 'Cart Abandonment Recovery', detail: 'Automated multi-channel sequences (email, SMS, WhatsApp) with personalized incentives recover 22% of abandoned carts "" timed intelligently to avoid discount dependency.' },
  { id: 3, label: 'Customer Support Automation', detail: 'AI handles 85% of support queries "" order tracking, returns, refunds, size guides, and product questions "" resolving most in under 60 seconds without human escalation.' },
  { id: 4, label: 'Inventory Intelligence', detail: 'Demand forecasting AI predicts stockouts before they happen, automates reorder triggers, and optimizes stock levels across warehouses and store locations.' },
  { id: 5, label: 'Loyalty & Retention Engine', detail: 'Behavioral AI identifies at-risk customers before churn, triggers win-back campaigns, and optimizes loyalty program rewards based on individual purchase drivers.' },
];

const FAQS = [
  { q: 'Which e-commerce platforms do you integrate with?', a: 'We integrate with Shopify, WooCommerce, Magento, BigCommerce, Amazon, Flipkart, and all major e-commerce platforms via native connectors and APIs.' },
  { q: 'How does the AI product recommendation engine work?', a: 'It uses collaborative filtering, real-time behavioral signals, and purchase history to serve relevant recommendations across product pages, emails, and chat "" without requiring manual curation.' },
  { q: 'Can it handle seasonal traffic spikes like Diwali sales?', a: 'Yes. The AI infrastructure auto-scales to handle 100x traffic. Campaign workflows can be pre-configured for peak events and launched instantly.' },
  { q: 'How does cart abandonment AI avoid being annoying?', a: 'AI monitors engagement signals to determine optimal timing and frequency. It suppresses messages for active shoppers and learns individual preferences over time.' },
  { q: 'What languages does the shopping assistant support?', a: 'It supports 40+ languages including Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and all major regional Indian languages alongside global languages.' },
];

export default function RetailEcommercePage() {
  const [activeCapability, setActiveCapability] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [aov, aovRef] = useCountUp(28);
  const [recovery, recoveryRef] = useCountUp(22);
  const [support, supportRef] = useCountUp(85);
  const [retention, retentionRef] = useCountUp(34);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--nvd)', color: 'var(--ow)', overflowX: 'hidden' }}>
      <SiteNav scrolled={scrolled} logoFilter={scrolled ? 'none' : 'brightness(0) invert(1)'} />

      {/* HERO "" dark, live orders widget */}
      <section style={{ background: 'var(--nvd)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 100, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.15)', border: '1px solid rgba(232,99,26,0.4)', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ color: 'var(--or)', fontSize: 13, fontWeight: 600 }}>AI FOR RETAIL & E-COMMERCE</span>
            </motion.div>
            <motion.h1 {...up(0.2)} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, fontFamily: 'var(--font-display)' }}>
              Sell Smarter with <span style={{ color: 'var(--or)' }}>Retail AI Automation</span>
            </motion.h1>
            <motion.p {...up(0.3)} style={{ fontSize: '1.1rem', color: 'rgba(248,246,242,0.7)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              AI-powered shopping assistants, recovery campaigns, and inventory intelligence that drive revenue while you sleep.
            </motion.p>
            <motion.div {...up(0.4)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Book a Demo</a>
              <a href="/case-studies" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>View Results</a>
            </motion.div>
          </div>

          {/* Live Orders Widget */}
          <motion.div {...up(0.3)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 13, color: 'rgba(248,246,242,0.5)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>LIVE STORE ACTIVITY</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Active Sessions', value: '2,847', color: '#22c55e' },
                { label: 'Orders Today', value: '1,234', color: 'var(--or)' },
                { label: 'AI Chats', value: '483', color: '#60a5fa' },
              ].map((m, i) => (
                <div key={i} style={{ padding: '12px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'rgba(248,246,242,0.4)', marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: m.color, fontFamily: 'var(--font-number)' }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(248,246,242,0.4)', marginBottom: 10 }}>RECENT AI INTERVENTIONS</div>
            {[
              { event: 'Cart Recovery', customer: 'Sneha R. "" Summer Dress', result: '₹3,200 recovered', color: '#22c55e' },
              { event: 'Recommendation', customer: 'Amit K. browsing footwear', result: 'Upsell +₹1,800', color: 'var(--or)' },
              { event: 'Support Query', customer: 'Order #84231 "" tracking', result: 'Resolved in 8s', color: '#60a5fa' },
              { event: 'Restock Alert', customer: 'SKU-447 "" Blue Kurta S', result: 'Reorder triggered', color: '#a78bfa' },
            ].map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: `${e.color}22`, color: e.color, fontWeight: 700, flexShrink: 0 }}>{e.event}</span>
                <span style={{ fontSize: 11, color: 'rgba(248,246,242,0.5)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.customer}</span>
                <span style={{ fontSize: 11, color: e.color, fontWeight: 600, flexShrink: 0 }}>{e.result}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS "" white */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Measurable Revenue Impact</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { label: 'Higher AOV', value: aov, ref: aovRef, suffix: '%', sub: 'Average order value lift' },
              { label: 'Cart Recovery Rate', value: recovery, ref: recoveryRef, suffix: '%', sub: 'Of abandoned carts recovered' },
              { label: 'Support Automation', value: support, ref: supportRef, suffix: '%', sub: 'Queries resolved by AI' },
              { label: 'Customer Retention', value: retention, ref: retentionRef, suffix: '%', sub: 'Repeat purchase rate increase' },
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

      {/* CAPABILITIES "" light ice */}
      <section style={{ background: 'var(--ice)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Complete Retail AI Platform</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>Six integrated capabilities that drive revenue at every stage of the customer journey.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CAPABILITIES.map((c) => (
                <motion.button key={c.id} {...up(c.id * 0.08)} onClick={() => setActiveCapability(c.id)}
                  style={{ textAlign: 'left', padding: '16px 20px', borderRadius: 10, border: activeCapability === c.id ? '2px solid var(--or)' : '2px solid transparent', background: activeCapability === c.id ? 'rgba(232,99,26,0.08)' : '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <div style={{ fontWeight: 700, color: activeCapability === c.id ? 'var(--or)' : 'var(--nvd)', fontSize: '0.95rem' }}>{c.label}</div>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeCapability} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid rgba(13,27,46,0.08)', minHeight: 220 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--or)', marginBottom: 12, letterSpacing: 1 }}>CAPABILITY</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nvd)', marginBottom: 16 }}>{CAPABILITIES[activeCapability].label}</h3>
                <p style={{ color: 'var(--gr)', lineHeight: 1.75 }}>{CAPABILITIES[activeCapability].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CHANNELS "" cream */}
      <section style={{ background: 'var(--ow)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Sell Everywhere, Manage From One Place</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 480, margin: '0 auto' }}>AI Agentix unifies your customer experience across all channels.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            {['Your Website', 'WhatsApp Business', 'Instagram Shop', 'Amazon', 'Flipkart', 'Physical Store', 'Mobile App', 'Google Shopping'].map((c, i) => (
              <motion.div key={i} {...up(i * 0.07)} style={{ padding: '20px 16px', borderRadius: 12, background: '#fff', border: '1.5px solid rgba(13,27,46,0.1)', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: 'var(--nvd)' }}>{c}</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS "" deep dark */}
      <section style={{ background: '#060E1A', padding: '80px 24px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Retail Success Stories</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { brand: 'StyleHub Fashion', result: '28% higher average order value', detail: 'AI recommendation engine surfaced complementary products at the right moments, increasing basket size across 400K monthly shoppers.', stat: '+28%' },
              { brand: 'QuickCart Grocery', result: '22% cart recovery rate', detail: 'Intelligent WhatsApp and email sequences with personalized incentives recovered ₹3.2M in abandoned cart revenue monthly.', stat: '22%' },
              { brand: 'TechGadgets India', result: '85% support automated', detail: 'AI handles 85% of all customer queries "" order tracking, returns, specs "" freeing the support team for complex escalations only.', stat: '85%' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', marginBottom: 12 }}>{r.stat}</div>
                <div style={{ fontWeight: 700, color: 'var(--ow)', fontSize: '1.05rem', marginBottom: 10 }}>{r.result}</div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(248,246,242,0.55)', lineHeight: 1.65 }}>{r.detail}</div>
                <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--or)', fontWeight: 600 }}>"" {r.brand}</div>
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
            Ready to Grow Your <span style={{ color: 'var(--or)' }}>Retail Revenue?</span>
          </motion.h2>
          <motion.p {...up(0.1)} style={{ color: 'rgba(248,246,242,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>
            Join 1,000+ retail and e-commerce brands using AI Agentix to automate growth.
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

