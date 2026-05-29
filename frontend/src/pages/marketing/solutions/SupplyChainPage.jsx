import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Globe, CheckCircle, ArrowRight, ChevronRight, Clock, Package, Truck, BarChart3, AlertTriangle, RefreshCw } from 'lucide-react';
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
  { title: 'Demand Forecasting AI', desc: 'Predict demand 4""12 weeks ahead using historical data, market signals, and seasonality patterns. Reduce stockouts by 60% and overstock by 40%.', points: ['ML-driven demand prediction', 'Seasonal pattern recognition', 'Supplier lead time integration', 'Auto reorder point calculation'] },
  { title: 'Inventory Intelligence', desc: 'Real-time inventory tracking across all warehouses with automated reorder triggers and vendor notifications. Know exactly what you have, where, and when to replenish.', points: ['Multi-warehouse tracking', 'Automated reorder triggers', 'FIFO/LIFO management', 'Expiry & shelf-life alerts'] },
  { title: 'Vendor Management', desc: 'Automate PO creation, vendor communication, and performance tracking. Compare vendor quotes, track delivery SLAs, and trigger escalations automatically.', points: ['PO automation & approval', 'Vendor performance scoring', 'Delivery SLA tracking', 'Multi-vendor quote comparison'] },
  { title: 'Logistics Optimization', desc: 'Route optimization, carrier selection, and shipment tracking "" all automated. Reduce last-mile costs by 25% through AI-powered delivery planning.', points: ['Route optimization engine', 'Carrier rate comparison', 'Real-time shipment tracking', 'Delivery exception management'] },
  { title: 'Supply Chain Analytics', desc: 'End-to-end supply chain visibility with cost analytics, OTIF rates, and bottleneck identification. Weekly supply chain health digest delivered automatically.', points: ['OTIF performance tracking', 'Cost per unit analytics', 'Bottleneck detection', 'Automated health reports'] },
  { title: 'Risk & Disruption Alerts', desc: 'AI monitors supplier news, weather, geopolitical events, and port conditions to flag supply chain risks 2""4 weeks before they impact your operations.', points: ['Supplier risk monitoring', 'Weather & logistics alerts', 'Alternative supplier routing', 'Disruption impact scoring'] },
];

const FAQS = [
  ['Which ERPs does it integrate with?', 'SAP, Oracle, Tally, Zoho Inventory, QuickBooks, and any system with API access. Custom integrations are available.'],
  ['How accurate is the demand forecasting?', 'Average MAPE (Mean Absolute Percentage Error) of 12""18% across industries, compared to 35""45% for manual forecasting methods.'],
  ['Can it handle multi-warehouse operations?', 'Yes. Multi-location inventory management with transfer recommendations and zone-specific reorder rules is fully supported.'],
  ['How does it handle seasonal businesses?', 'Seasonal decomposition models built-in. The AI learns your historical seasonal patterns and adjusts forecasts automatically for peak periods.'],
  ['What about supplier communication?', 'Automated PO emails, delivery reminders, and escalations are all sent by the AI. Suppliers respond via their usual channels "" no new portal required.'],
];

export default function SupplyChainPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(60); const [n2, r2] = useCountUp(25); const [n3, r3] = useCountUp(40); const [n4, r4] = useCountUp(98);

  return (
    <>
      <Helmet><title>Supply Chain Automation | AI Agentix</title></Helmet>
      <SiteNav /><VoiceAgentWidget />
      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '40px clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 55% 25%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Globe size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Supply Chain</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Predict Demand. Eliminate Stockouts. <span style={{ color: 'var(--or)' }}>Supply Chain AI.</span>
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              AI-powered demand forecasting, inventory management, vendor automation, and logistics optimization. Stop firefighting and start anticipating.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Audit My Supply Chain <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                See Results
              </Link>
            </motion.div>
          </div>
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Inventory Health Monitor</div>
            {[
              { sku: 'Raw Material A', stock: 'Healthy', days: 34, pct: 80, color: '#10B981' },
              { sku: 'Component XB-7', stock: 'Reorder Soon', days: 12, pct: 30, color: '#F59E0B' },
              { sku: 'Finished Product C', stock: 'Stockout Risk', days: 4, pct: 10, color: '#EF4444' },
              { sku: 'Packaging Material', stock: 'Healthy', days: 45, pct: 95, color: '#10B981' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{item.sku}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: item.color }}>{item.stock} Â· {item.days}d</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.7 }} style={{ height: '100%', background: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              2 POs auto-generated Â· 1 supplier alert sent today
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[{ r: r1, n: n1, s: '%', l: 'Reduction in Stockouts', sub: 'vs. manual forecasting' }, { r: r2, n: n2, s: '%', l: 'Lower Logistics Costs', sub: 'through route optimization' }, { r: r3, n: n3, s: '%', l: 'Less Dead Inventory', sub: 'via demand intelligence' }, { r: r4, n: n4, s: '%', l: 'On-Time Delivery Rate', sub: 'across all shipments' }].map((stat, i) => (
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>AI Supply Chain Platform</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Every supply chain challenge "" solved</h2>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>End-to-end supply chain intelligence</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[{ n: '01', t: 'Demand Signal Capture', d: 'Sales data, market trends, and seasonality ingested automatically' }, { n: '02', t: 'Inventory Optimization', d: 'AI calculates optimal stock levels for every SKU and location' }, { n: '03', t: 'Vendor Coordination', d: 'Purchase orders raised and tracked without manual intervention' }, { n: '04', t: 'Logistics Planning', d: 'Routes and carriers selected for lowest cost and fastest delivery' }, { n: '05', t: 'Delivery Monitoring', d: 'Real-time tracking with automatic exception handling' }, { n: '06', t: 'Analytics & Insights', d: 'OTIF, cost per unit, and fill rate reported weekly' }].map((step, i) => (
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Supply chain results you can measure</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[{ name: 'FMCG Manufacturer', result: '60% fewer stockouts in 90 days', detail: 'Demand forecasting accuracy improved from 58% to 87%; eliminated emergency purchase premiums', time: '90 days' }, { name: 'E-commerce Retailer', result: '₹1.4Cr saved in dead inventory', detail: 'AI identified 240 slow-moving SKUs and automated clearance pricing strategy', time: '4 months' }, { name: 'Auto Parts Distributor', result: '25% reduction in logistics costs', detail: 'Route optimization and carrier consolidation cut last-mile costs significantly', time: '6 months' }].map((r, i) => (
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Supply Chain Automation "" Questions Answered</h2>
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
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 20 }}>Ready to Optimise Your Supply Chain?</motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>Get a free supply chain audit with a custom AI roadmap for your industry and business size.</motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>Get Free Audit <ArrowRight size={18} /></Link>
            <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>See Case Studies</Link>
          </motion.div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

