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
  { id: 0, label: 'Route Optimization AI', detail: 'Dynamic routing engine processes real-time traffic, delivery windows, vehicle capacity, and driver schedules to generate optimal routes "" reducing fuel costs by 18% and delivery time by 24%.' },
  { id: 1, label: 'Shipment Tracking Automation', detail: 'Proactive customer notifications at every milestone "" dispatch, in-transit, out-for-delivery, delivered. Reduces "where is my order" calls by 65% with zero manual effort.' },
  { id: 2, label: 'Warehouse Intelligence', detail: 'AI-driven pick path optimization, slotting recommendations, and labor scheduling cut warehouse operating costs by 22% while improving order accuracy to 99.8%.' },
  { id: 3, label: 'Demand Forecasting', detail: 'Machine learning analyzes historical shipment data, seasonal patterns, and market signals to forecast demand with 94% accuracy "" enabling optimal fleet and inventory positioning.' },
  { id: 4, label: 'Freight Rate Automation', detail: 'AI compares carrier rates in real-time, negotiates spot rates, and auto-selects the optimal carrier per shipment based on cost, transit time, and reliability scores.' },
  { id: 5, label: 'Customer Communication Hub', detail: 'Automated updates across WhatsApp, SMS, and email. Handles delivery exceptions, rescheduling requests, and POD confirmations without dispatcher involvement.' },
];

const FAQS = [
  { q: 'How does route optimization AI handle last-minute changes?', a: 'The AI recalculates routes in real-time when new orders arrive, deliveries fail, or traffic conditions change "" dispatchers see updated routes on their dashboard instantly.' },
  { q: 'Which TMS and fleet management systems do you integrate with?', a: 'We integrate with SAP TM, Oracle TMS, Manhattan Associates, BluJay, Trimble, and most telematics platforms via APIs. Custom integrations available for proprietary systems.' },
  { q: 'Can it handle both B2B and B2C delivery models?', a: 'Yes. The platform handles express B2C last-mile, bulk B2B freight, and mixed fleets with different SLA rules, documentation requirements, and notification flows.' },
  { q: 'How does the freight rate AI avoid choosing unreliable carriers?', a: 'Carrier reliability scoring uses historical on-time performance, damage rates, and customer feedback alongside rate comparisons. Reliability weights are configurable per lane.' },
  { q: 'What visibility do customers and shippers get?', a: 'A branded tracking portal provides real-time GPS visibility, ETA updates, and proof of delivery photos. Embeddable on your website or accessible via direct link.' },
];

export default function LogisticsPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [fuel, fuelRef] = useCountUp(18);
  const [calls, callsRef] = useCountUp(65);
  const [accuracy, accuracyRef] = useCountUp(99);
  const [cost, costRef] = useCountUp(22);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--nvd)', color: 'var(--ow)', overflowX: 'hidden' }}>
      <SiteNav scrolled={scrolled} logoFilter={scrolled ? 'none' : 'brightness(0) invert(1)'} />

      {/* HERO "" dark, fleet tracker widget */}
      <section style={{ background: 'var(--nvd)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.15)', border: '1px solid rgba(232,99,26,0.4)', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ color: 'var(--or)', fontSize: 13, fontWeight: 600 }}>AI FOR LOGISTICS</span>
            </motion.div>
            <motion.h1 {...up(0.2)} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, fontFamily: 'var(--font-display)' }}>
              Move Smarter with <span style={{ color: 'var(--or)' }}>Logistics AI</span>
            </motion.h1>
            <motion.p {...up(0.3)} style={{ fontSize: '1.1rem', color: 'rgba(248,246,242,0.7)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              Route optimization, automated customer updates, and warehouse intelligence that cut costs, improve delivery performance, and delight customers.
            </motion.p>
            <motion.div {...up(0.4)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Book a Demo</a>
              <a href="/solutions/supply-chain" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>Supply Chain Solutions</a>
            </motion.div>
          </div>

          {/* Fleet Tracker Widget */}
          <motion.div {...up(0.3)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 13, color: 'rgba(248,246,242,0.5)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>FLEET OPERATIONS LIVE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Active Vehicles', value: '248', color: '#22c55e' },
                { label: 'On-Time Rate', value: '96.2%', color: 'var(--or)' },
                { label: 'Deliveries Today', value: '1,847', color: '#60a5fa' },
              ].map((m, i) => (
                <div key={i} style={{ padding: '12px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'rgba(248,246,242,0.4)', marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: m.color, fontFamily: 'var(--font-number)' }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(248,246,242,0.4)', marginBottom: 10 }}>LIVE SHIPMENT UPDATES</div>
            {[
              { id: 'SH-4821', status: 'Out for Delivery', location: 'Andheri West', eta: 'ETA 2:45 PM', color: 'var(--or)' },
              { id: 'SH-4820', status: 'Delivered', location: 'Bandra', eta: 'POD captured', color: '#22c55e' },
              { id: 'SH-4819', status: 'Route Optimized', location: 'Kurla Hub', eta: 'Saved 34 min', color: '#60a5fa' },
              { id: 'SH-4818', status: 'Exception Alert', location: 'Thane', eta: 'Customer notified', color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span style={{ fontSize: 10, color: 'rgba(248,246,242,0.4)', fontFamily: 'var(--font-number)', flexShrink: 0 }}>{s.id}</span>
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: `${s.color}22`, color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.status}</span>
                <div style={{ flex: 1, fontSize: 11, color: 'rgba(248,246,242,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.location} "" {s.eta}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS "" white */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Logistics Performance Impact</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { label: 'Fuel Cost Reduction', value: fuel, ref: fuelRef, suffix: '%', sub: 'Via route optimization' },
              { label: 'WISMO Calls Reduced', value: calls, ref: callsRef, suffix: '%', sub: '"Where is my order" volume' },
              { label: 'Order Accuracy', value: accuracy, ref: accuracyRef, suffix: '.8%', sub: 'Warehouse pick accuracy' },
              { label: 'Warehouse Cost Savings', value: cost, ref: costRef, suffix: '%', sub: 'Operating cost reduction' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 16, background: 'var(--ice)', border: '1px solid rgba(13,27,46,0.06)' }}>
                <div ref={s.ref} style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', lineHeight: 1 }}>
                  {s.suffix === '.8%' ? '99' : s.value}{s.suffix}
                </div>
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
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Complete Logistics AI Platform</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>Six integrated modules that cover every dimension of logistics operations.</p>
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

      {/* LOGISTICS TYPES "" cream */}
      <section style={{ background: 'var(--ow)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Built for Every Logistics Model</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { icon: '📦', title: 'Last-Mile Delivery', desc: 'Route optimization and customer communication for B2C home delivery operations.' },
              { icon: '🚚', title: '3PL Operators', desc: 'Multi-client warehouse and distribution management with client-specific dashboards.' },
              { icon: '✈️', title: 'Express Freight', desc: 'Time-critical shipment management with real-time visibility and exception handling.' },
              { icon: '🏭', title: 'In-Plant Logistics', desc: 'Material movement, internal transfer, and dock scheduling automation.' },
              { icon: '🌐', title: 'Cross-Border', desc: 'Customs documentation automation and international freight coordination.' },
            ].map((t, i) => (
              <motion.div key={i} {...up(i * 0.08)} style={{ padding: '28px 22px', borderRadius: 16, background: '#fff', border: '1px solid rgba(13,27,46,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{t.icon}</div>
                <h4 style={{ fontWeight: 700, color: 'var(--nvd)', marginBottom: 8, fontSize: '1rem' }}>{t.title}</h4>
                <p style={{ color: 'var(--gr)', fontSize: '0.88rem', lineHeight: 1.65 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS "" dark */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>AI-Driven Delivery Lifecycle</h2>
            <p style={{ color: 'rgba(248,246,242,0.6)', maxWidth: 520, margin: '0 auto' }}>Automation at every step from order intake to proof of delivery.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { step: '01', label: 'Order Intake', desc: 'AI ingests orders from ERP, portal, or EDI "" validates, classifies, and priorities automatically' },
              { step: '02', label: 'Load Planning', desc: 'Optimal vehicle loading sequences generated considering weight, volume, and delivery sequence' },
              { step: '03', label: 'Route Generation', desc: 'Dynamic routes calculated with real-time traffic, delivery windows, and fuel cost optimization' },
              { step: '04', label: 'In-Transit Updates', desc: 'Customer notifications triggered at dispatch, transit, and pre-delivery milestones automatically' },
              { step: '05', label: 'Exception Handling', desc: 'Failed deliveries, traffic delays, and customer changes handled automatically with rerouting' },
              { step: '06', label: 'POD & Settlement', desc: 'Digital proof of delivery captured, invoices generated, and carrier payments processed automatically' },
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
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Logistics Success Stories</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { company: 'Swiftway Express', result: '18% fuel cost reduction', detail: 'Route optimization AI cut average delivery distance by 24% for a fleet of 380 vehicles "" saving ₹6.2Cr annually in fuel alone.', stat: '18%' },
              { company: 'StoreMart 3PL', result: '65% fewer WISMO calls', detail: 'Proactive WhatsApp notifications reduced inbound customer tracking calls from 800/day to under 280, saving 12 support FTEs.', stat: '65%' },
              { company: 'FastFreight India', result: '99.8% order accuracy', detail: 'AI-guided pick paths and real-time barcode verification eliminated ₹1.8Cr in annual mis-ship costs and customer returns.', stat: '99.8%' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', marginBottom: 12 }}>{r.stat}</div>
                <div style={{ fontWeight: 700, color: 'var(--ow)', fontSize: '1.05rem', marginBottom: 10 }}>{r.result}</div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(248,246,242,0.55)', lineHeight: 1.65 }}>{r.detail}</div>
                <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--or)', fontWeight: 600 }}>"" {r.company}</div>
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
            Optimize Your <span style={{ color: 'var(--or)' }}>Logistics Operations</span>
          </motion.h2>
          <motion.p {...up(0.1)} style={{ color: 'rgba(248,246,242,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>
            Join 250+ logistics companies using AI Agentix to cut costs and improve delivery performance.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '16px 40px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Get Started Today</a>
            <a href="/contact" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '16px 40px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>Talk to Sales</a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </div>
  );
}

