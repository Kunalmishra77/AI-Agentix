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

const SOLUTIONS = [
  { id: 0, label: 'Predictive Maintenance', detail: 'IoT sensor data analyzed by AI detects equipment anomalies before failure. Reduces unplanned downtime by 67% and extends asset life "" maintenance scheduled when actually needed, not on fixed intervals.' },
  { id: 1, label: 'Quality Defect Detection', detail: 'Computer vision AI inspects products at line speed "" detecting surface defects, dimensional errors, and assembly faults with 99.4% accuracy, far exceeding human inspection rates.' },
  { id: 2, label: 'Production Scheduling AI', detail: 'Dynamic scheduling AI balances orders, machine capacity, workforce availability, and material supply in real-time "" maximizing OEE while meeting delivery commitments.' },
  { id: 3, label: 'Supply Chain Automation', detail: 'AI-driven procurement automation handles vendor communication, purchase orders, goods receipt verification, and supplier performance scoring without manual intervention.' },
  { id: 4, label: 'Energy Optimization', detail: 'AI monitors energy consumption patterns and automatically adjusts HVAC, lighting, compressor, and machine scheduling to reduce energy costs by up to 20%.' },
  { id: 5, label: 'Worker Safety Monitoring', detail: 'Computer vision monitors PPE compliance, proximity to hazardous zones, and ergonomic risks in real-time "" alerting supervisors before incidents occur.' },
];

const FAQS = [
  { q: 'Does this require replacing our existing equipment?', a: 'No. AI Agentix connects to your existing PLCs, SCADA systems, and ERP via IoT gateways and APIs. Most manufacturers go live without any capital equipment replacement.' },
  { q: 'How quickly can we see ROI from predictive maintenance?', a: 'Most manufacturers see positive ROI within 3-4 months. The first prevented breakdown event often pays for an entire year of the platform.' },
  { q: 'What ERPs and manufacturing systems do you support?', a: 'We integrate with SAP, Oracle Manufacturing, Microsoft Dynamics, Epicor, Infor, and all major ERP platforms via standard APIs and custom connectors.' },
  { q: 'Is the AI reliable enough for safety-critical applications?', a: 'Yes. Our safety monitoring AI has 99.2% detection accuracy and operates in real-time with under 200ms latency. All safety alerts are logged, audited, and never suppressed.' },
  { q: 'Can this work in multi-plant or multi-country environments?', a: 'Absolutely. AI Agentix supports multi-plant deployments with centralized dashboards, plant-specific configurations, and aggregated reporting across locations.' },
];

export default function ManufacturingIndustryPage() {
  const [activeSolution, setActiveSolution] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [uptime, uptimeRef] = useCountUp(67);
  const [quality, qualityRef] = useCountUp(99);
  const [energy, energyRef] = useCountUp(20);
  const [oee, oeeRef] = useCountUp(31);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--nvd)', color: 'var(--ow)', overflowX: 'hidden' }}>
      <SiteNav scrolled={scrolled} logoFilter={scrolled ? 'none' : 'brightness(0) invert(1)'} />

      {/* HERO "" dark, factory floor monitor */}
      <section style={{ background: 'var(--nvd)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.15)', border: '1px solid rgba(232,99,26,0.4)', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ color: 'var(--or)', fontSize: 13, fontWeight: 600 }}>AI FOR MANUFACTURING</span>
            </motion.div>
            <motion.h1 {...up(0.2)} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, fontFamily: 'var(--font-display)' }}>
              Intelligent Manufacturing with <span style={{ color: 'var(--or)' }}>Industrial AI</span>
            </motion.h1>
            <motion.p {...up(0.3)} style={{ fontSize: '1.1rem', color: 'rgba(248,246,242,0.7)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              Predictive maintenance, quality vision systems, and production AI that reduce downtime, improve quality, and cut operational costs across your factory floor.
            </motion.p>
            <motion.div {...up(0.4)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Book a Demo</a>
              <a href="/solutions/manufacturing" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>Manufacturing Solutions</a>
            </motion.div>
          </div>

          {/* Factory Floor Monitor Widget */}
          <motion.div {...up(0.3)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 13, color: 'rgba(248,246,242,0.5)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>FACTORY FLOOR STATUS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Overall OEE', value: '87.4%', color: '#22c55e', trend: '▲ 3.2%' },
                { label: 'Lines Running', value: '14 / 16', color: 'var(--or)', trend: '2 in maint.' },
                { label: 'Defect Rate', value: '0.06%', color: '#60a5fa', trend: '▼ Best ever' },
                { label: 'Energy kWh', value: '4,820', color: '#a78bfa', trend: '▼ 18% vs avg' },
              ].map((m, i) => (
                <div key={i} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'rgba(248,246,242,0.4)', marginBottom: 3 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: m.color, fontFamily: 'var(--font-number)' }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: m.color, marginTop: 2 }}>{m.trend}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(248,246,242,0.4)', marginBottom: 10 }}>AI ALERTS (LIVE)</div>
            {[
              { machine: 'Press Line 3', alert: 'Bearing temp rising "" predictive flag', urgency: 'Plan', color: '#f59e0b' },
              { machine: 'QC Station 7', alert: 'Defect pattern detected "" batch hold', urgency: 'Act', color: '#ef4444' },
              { machine: 'Compressor C2', alert: 'Energy spike "" throttle adjusted', urgency: 'Auto', color: '#22c55e' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none', fontSize: 11 }}>
                <span style={{ padding: '2px 8px', borderRadius: 20, background: `${a.color}22`, color: a.color, fontWeight: 700, flexShrink: 0 }}>{a.urgency}</span>
                <div style={{ flex: 1 }}><div style={{ color: 'var(--ow)', fontWeight: 600 }}>{a.machine}</div><div style={{ color: 'rgba(248,246,242,0.45)' }}>{a.alert}</div></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS "" white */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Factory Floor Impact</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { label: 'Downtime Reduction', value: uptime, ref: uptimeRef, suffix: '%', sub: 'Unplanned downtime eliminated' },
              { label: 'Defect Detection', value: quality, ref: qualityRef, suffix: '.4%', sub: 'Accuracy rate (computer vision)', isQuality: true },
              { label: 'Energy Cost Savings', value: energy, ref: energyRef, suffix: '%', sub: 'Average reduction' },
              { label: 'OEE Improvement', value: oee, ref: oeeRef, suffix: '%', sub: 'Overall Equipment Effectiveness' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 16, background: 'var(--ice)', border: '1px solid rgba(13,27,46,0.06)' }}>
                <div ref={s.ref} style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', lineHeight: 1 }}>
                  {s.isQuality ? '99' : s.value}{s.suffix}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--nvd)', marginTop: 8 }}>{s.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gr)', marginTop: 4 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS "" light ice */}
      <section style={{ background: 'var(--ice)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Industrial AI Solutions Suite</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>Six integrated AI modules designed for the unique demands of manufacturing operations.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOLUTIONS.map((s) => (
                <motion.button key={s.id} {...up(s.id * 0.08)} onClick={() => setActiveSolution(s.id)}
                  style={{ textAlign: 'left', padding: '16px 20px', borderRadius: 10, border: activeSolution === s.id ? '2px solid var(--or)' : '2px solid transparent', background: activeSolution === s.id ? 'rgba(232,99,26,0.08)' : '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <div style={{ fontWeight: 700, color: activeSolution === s.id ? 'var(--or)' : 'var(--nvd)', fontSize: '0.95rem' }}>{s.label}</div>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeSolution} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid rgba(13,27,46,0.08)', minHeight: 220 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--or)', marginBottom: 12, letterSpacing: 1 }}>SOLUTION</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nvd)', marginBottom: 16 }}>{SOLUTIONS[activeSolution].label}</h3>
                <p style={{ color: 'var(--gr)', lineHeight: 1.75 }}>{SOLUTIONS[activeSolution].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTORS "" cream */}
      <section style={{ background: 'var(--ow)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Manufacturing Sectors We Serve</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { icon: '🚗', label: 'Automotive' },
              { icon: '💊', label: 'Pharma & Life Sciences' },
              { icon: '🍫', label: 'Food & Beverage' },
              { icon: '📌', label: 'Electronics' },
              { icon: '🧵', label: 'Textiles & Apparel' },
              { icon: '🏗️', label: 'Heavy Industry' },
              { icon: '🧪', label: 'Chemicals' },
              { icon: '📦', label: 'Consumer Goods' },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.07)} style={{ padding: '20px 16px', borderRadius: 12, background: '#fff', border: '1px solid rgba(13,27,46,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{s.icon}</div>
                <div style={{ fontWeight: 600, color: 'var(--nvd)', fontSize: '0.9rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS "" dark */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>How We Deploy Industrial AI</h2>
            <p style={{ color: 'rgba(248,246,242,0.6)', maxWidth: 520, margin: '0 auto' }}>A phased approach that delivers value from week one without disrupting production.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { step: '01', label: 'Assessment', desc: 'Plant walk-through, data audit, and AI opportunity mapping across your lines' },
              { step: '02', label: 'Connectivity', desc: 'IoT gateways installed, PLC/SCADA integrated, historical data ingested' },
              { step: '03', label: 'Model Training', desc: 'AI trained on your specific equipment, defect types, and production patterns' },
              { step: '04', label: 'Pilot Line', desc: 'Deploy on one line, validate accuracy and ROI before full rollout' },
              { step: '05', label: 'Plant Rollout', desc: 'Scale to all lines with tuned models and trained operators' },
              { step: '06', label: 'Continuous Learning', desc: 'AI improves with every cycle "" accuracy and recommendations compound over time' },
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
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Manufacturing Success Stories</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { company: 'Bharat Auto Components', result: '67% downtime reduction', detail: 'Predictive maintenance AI monitored 340 assets and prevented 23 major breakdowns in year one, saving ₹8.4Cr in emergency repairs.', stat: '67%' },
              { company: 'PharmaLine Industries', result: '99.4% defect detection', detail: 'Vision AI at 3 inspection stations reduced customer returns by 94% and eliminated a manual QC team of 12 inspectors.', stat: '99.4%' },
              { company: 'GreenTex Mills', result: '20% energy cost reduction', detail: 'AI optimized compressor scheduling and HVAC based on production load, saving ₹1.2Cr annually in energy costs.', stat: '20%' },
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
            Modernize Your <span style={{ color: 'var(--or)' }}>Factory Floor</span>
          </motion.h2>
          <motion.p {...up(0.1)} style={{ color: 'rgba(248,246,242,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>
            Join 150+ manufacturers using AI Agentix to reduce downtime, improve quality, and cut costs.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '16px 40px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Schedule Assessment</a>
            <a href="/solutions/manufacturing" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '16px 40px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>View All Features</a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </div>
  );
}

