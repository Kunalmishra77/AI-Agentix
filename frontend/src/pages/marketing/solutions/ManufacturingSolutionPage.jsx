import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Factory, CheckCircle, ArrowRight, ChevronRight, Clock, Settings, BarChart3, AlertTriangle, Package, Cpu } from 'lucide-react';
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
  { title: 'Production Planning AI', desc: 'AI-driven production schedules that balance orders, capacity, and material availability. Automatically adjust plans when conditions change "" no manual replanning.', points: ['Demand-driven scheduling', 'Capacity constraint optimization', 'Material availability checks', 'Auto-replanning on changes'] },
  { title: 'Quality Control Automation', desc: 'AI vision systems and statistical process control identify defects before they reach customers. Automated inspection reports and root cause analysis.', points: ['Defect detection & classification', 'Statistical process control', 'Root cause analysis engine', 'Automated inspection reports'] },
  { title: 'Predictive Maintenance', desc: 'Monitor machine health with IoT sensors and AI analytics. Predict failures 7""14 days ahead, schedule maintenance proactively, and eliminate unplanned downtime.', points: ['IoT sensor integration', 'Failure prediction models', 'Proactive maintenance scheduling', 'Equipment health dashboards'] },
  { title: 'Inventory & BOM Management', desc: 'Real-time raw material tracking, automated BOM explosions, and reorder point management. Never halt production due to missing materials.', points: ['BOM explosion automation', 'Real-time material tracking', 'Automated reorder triggers', 'Waste tracking & reduction'] },
  { title: 'OEE & Efficiency Analytics', desc: 'Real-time Overall Equipment Effectiveness tracking across all production lines. Identify availability, performance, and quality losses before they impact output.', points: ['Real-time OEE dashboard', 'Line efficiency benchmarking', 'Shift performance comparison', 'Improvement recommendations'] },
  { title: 'ERP & MES Integration', desc: 'Connect AI capabilities to your existing manufacturing systems. Works with SAP, Oracle, Microsoft Dynamics, and any MES with API access.', points: ['SAP/Oracle integration', 'MES data synchronization', 'Shopfloor data collection', 'Custom API connectors'] },
];

const FAQS = [
  ['Does it work with our existing machines and sensors?', 'Yes. We integrate with any IoT-enabled machinery through MQTT, OPC-UA, or standard APIs. Older machines can be retrofitted with our IoT gateway.'],
  ['How long before we see predictive maintenance results?', 'The ML models need 4""8 weeks of sensor data to establish baselines. First predictions typically surface after 6""8 weeks of operation.'],
  ['Can it handle multi-shift and multi-plant operations?', 'Yes. Consolidated dashboards across plants and shifts, with granular drill-down to individual lines, machines, and operators.'],
  ['What about data security on the factory floor?', 'Edge computing options available for air-gapped environments. All data encrypted at rest and in transit. Compliant with ISO 27001.'],
  ['How does it integrate with our ERP?', 'Direct connectors for SAP S/4HANA, SAP Business One, Oracle, and Microsoft Dynamics. Setup takes 2""3 weeks including testing.'],
];

export default function ManufacturingSolutionPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(35); const [n2, r2] = useCountUp(60); const [n3, r3] = useCountUp(28); const [n4, r4] = useCountUp(92);

  return (
    <>
      <Helmet><title>Manufacturing AI Automation | AI Agentix</title></Helmet>
      <SiteNav /><VoiceAgentWidget />

      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '40px clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 55% 25%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Factory size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Manufacturing AI</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Smart Factory. Zero Unplanned Downtime. <span style={{ color: 'var(--or)' }}>Industry 4.0 AI.</span>
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              AI-powered production planning, predictive maintenance, quality control, and OEE optimization. Transform your factory floor with intelligent automation.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Audit My Factory <ArrowRight size={16} />
              </Link>
              <Link to="/technology" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                View Technology
              </Link>
            </motion.div>
          </div>
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Factory Floor Monitor</div>
            {[
              { line: 'Line A "" Assembly', oee: 89, status: 'Running', alert: null, color: '#10B981' },
              { line: 'Line B "" Packaging', oee: 74, status: 'Maintenance Due', alert: '3 days', color: '#F59E0B' },
              { line: 'Line C "" Finishing', oee: 91, status: 'Running', alert: null, color: '#10B981' },
              { line: 'CNC Machine #7', oee: 45, status: 'Alert: Vibration', alert: 'Predict failure 6d', color: '#EF4444' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#fff' }}>{item.line}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: item.color, marginTop: 2 }}>{item.status}{item.alert ? ` Â· ${item.alert}` : ''}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-number)', fontSize: 16, color: item.color }}>{item.oee}%</div>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.oee}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }} style={{ height: '100%', background: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              1 maintenance alert Â· 2 quality flags resolved today
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[{ r: r1, n: n1, s: '%', l: 'Reduction in Unplanned Downtime', sub: 'via predictive maintenance' }, { r: r2, n: n2, s: '%', l: 'Faster Defect Detection', sub: 'vs. manual inspection' }, { r: r3, n: n3, s: '%', l: 'Improvement in OEE', sub: 'within 6 months' }, { r: r4, n: n4, s: '%', l: 'On-Time Production Rate', sub: 'with AI scheduling' }].map((stat, i) => (
            <motion.div key={i} {...up(i * 0.1)} ref={stat.r} style={{ textAlign: 'center', padding: '32px 20px', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16 }}>
              <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(48px,4vw,72px)', fontWeight: 700, color: 'var(--or)', lineHeight: 1 }}>{stat.n}{stat.s}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--nvd)', marginTop: 10 }}>{stat.l}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--ice)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Industry 4.0 Platform</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Smart manufacturing "" every layer covered</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FEATURES.map((f, i) => <button key={i} onClick={() => setActiveFeature(i)} style={{ textAlign: 'left', padding: '13px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: activeFeature === i ? 700 : 500, fontSize: 14, background: activeFeature === i ? 'var(--nvd)' : 'rgba(0,0,0,0.04)', color: activeFeature === i ? '#fff' : 'var(--nvd)', transition: 'all 0.2s', borderLeft: activeFeature === i ? '3px solid var(--or)' : '3px solid transparent' }}>{f.title}</button>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} style={{ background: '#fff', borderRadius: 20, padding: 36, border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--nvd)', marginBottom: 14 }}>{FEATURES[activeFeature].title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#4B5563', lineHeight: 1.7, marginBottom: 24 }}>{FEATURES[activeFeature].desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {FEATURES[activeFeature].points.map((pt, i) => <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(232,99,26,0.05)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.1)' }}><CheckCircle size={15} color="var(--or)" style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--nvd)' }}>{pt}</span></div>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--nvd)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>From raw material to finished product "" AI everywhere</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[{ n: '01', t: 'Demand Planning', d: 'AI forecasts production requirements from sales and market data' }, { n: '02', t: 'Material Procurement', d: 'Automated POs triggered by inventory levels and lead times' }, { n: '03', t: 'Production Scheduling', d: 'Optimal schedules balancing capacity, priority, and efficiency' }, { n: '04', t: 'Quality Monitoring', d: 'Continuous inspection with AI-powered defect detection' }, { n: '05', t: 'Equipment Management', d: 'Predictive maintenance prevents failures before they occur' }, { n: '06', t: 'Dispatch & Reporting', d: 'Automated dispatch planning and OEE reports generated daily' }].map((step, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 44, color: 'rgba(232,99,26,0.25)', lineHeight: 1, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{step.t}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#060E1A', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Manufacturing results that move the bottom line</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Auto Components Manufacturer', result: '35% reduction in unplanned downtime', detail: 'Predictive maintenance on 12 CNC machines eliminated ₹42L in emergency repair costs in Year 1', time: '6 months' },
              { name: 'FMCG Packaging Plant', result: '28% improvement in OEE', detail: 'AI scheduling and real-time line monitoring increased output by 28% with the same equipment and headcount', time: '8 months' },
              { name: 'Pharmaceutical Manufacturer', result: 'Zero batch failures in 9 months', detail: 'AI quality control and process parameter monitoring eliminated out-of-spec batches completely', time: '9 months' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ padding: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>{r.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, color: 'var(--or)', lineHeight: 1.2, marginBottom: 10 }}>{r.result}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 14 }}>{r.detail}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={12} color="rgba(255,255,255,0.3)" /><span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Achieved in {r.time}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ice)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Manufacturing AI "" Questions Answered</h2>
          </motion.div>
          {FAQS.map(([q, a], i) => (
            <motion.div key={i} {...up(i * 0.06)} style={{ background: '#fff', borderRadius: 14, marginBottom: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--nvd)' }}>{q}</span>
                <ChevronRight size={17} color="var(--or)" style={{ transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              <AnimatePresence>{openFaq === i && <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}><p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, padding: '0 22px 18px' }}>{a}</p></motion.div>}</AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--nvd)', padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,99,26,0.15), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 20 }}>Ready to Build Your Smart Factory?</motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>Get a free manufacturing AI audit with a custom roadmap for your plant and production challenges.</motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>Get Factory AI Audit <ArrowRight size={18} /></Link>
            <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>See Case Studies</Link>
          </motion.div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

