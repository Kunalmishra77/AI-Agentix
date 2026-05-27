import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BarChart3, CheckCircle, ArrowRight, ChevronRight, Clock, Shield, FileText, DollarSign, TrendingUp, Lock } from 'lucide-react';
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
  { title: 'Invoice Automation', desc: 'AI extracts data from any invoice format "" PDF, email, scan "" matches to POs, flags discrepancies, and routes for approval automatically. Zero manual data entry.', points: ['3-way PO matching', 'Discrepancy detection', 'Auto-approval for under-threshold', 'ERP sync on approval'] },
  { title: 'Expense Management', desc: 'Employees submit receipts via WhatsApp or mobile. AI categorizes, checks policy compliance, and routes for approval. Month-end close in hours, not days.', points: ['WhatsApp receipt capture', 'Policy compliance check', 'Auto-categorization', 'Real-time expense dashboards'] },
  { title: 'Accounts Receivable AI', desc: 'Automated invoicing, payment reminders, and collections workflows. AI predicts late payments and triggers escalation before they become bad debts.', points: ['Auto invoice generation', 'Smart payment reminders', 'Late payment prediction', 'Collections workflow engine'] },
  { title: 'Statutory Compliance', desc: 'Automated GST filing, TDS calculations, PF/ESI contributions, and statutory reports. Always up to date with regulatory changes "" zero compliance anxiety.', points: ['GST return automation', 'TDS deduction & filing', 'PF/ESI computation', 'Audit-ready reports'] },
  { title: 'Cash Flow Intelligence', desc: 'Real-time cash flow forecasting with 30/60/90-day projections. AI identifies cash gaps before they happen and recommends treasury actions.', points: ['Cash flow forecasting', 'Payment timing optimization', 'Bank reconciliation AI', 'Treasury action alerts'] },
  { title: 'Financial Reporting', desc: 'P&L, balance sheet, and MIS reports generated automatically with variance analysis and trend commentary. Board-ready reports in one click.', points: ['Automated P&L generation', 'Variance analysis narratives', 'MIS report builder', 'One-click board reports'] },
];

const FAQS = [
  ['Which accounting software does it connect to?', 'Tally, QuickBooks, Zoho Books, SAP, and Oracle. Direct integration maintains a live sync without manual data import.'],
  ['Is financial data secure?', 'Bank-grade encryption, role-based access, and full audit logs. SOC 2 Type II certified with Indian data residency. Only authorized users see financial data.'],
  ['How does GST automation work?', 'AI matches invoices, calculates liability, and prepares GSTR-1, GSTR-3B, and annual returns. You review and file "" no manual preparation required.'],
  ['Can it handle multi-entity companies?', 'Yes. Consolidated reporting across multiple entities, intercompany elimination, and entity-level drill-down all supported.'],
  ['How long until we see time savings?', 'Finance teams typically save 40""60 hours per month in the first 30 days through invoice automation and expense management alone.'],
];

export default function FinanceAccountsPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(85); const [n2, r2] = useCountUp(60); const [n3, r3] = useCountUp(99); const [n4, r4] = useCountUp(40);

  return (
    <>
      <Helmet><title>Finance & Accounts Automation | AI Agentix</title></Helmet>
      <SiteNav /><VoiceAgentWidget />

      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,160px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 55% 25%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <BarChart3 size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Finance & Accounts</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Close Books Faster. Stay Compliant. <span style={{ color: 'var(--or)' }}>Finance AI.</span>
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              Automate invoicing, expense management, GST compliance, and financial reporting. Eliminate 85% of manual finance work while staying audit-ready.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Get Finance Audit <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                See Results
              </Link>
            </motion.div>
          </div>
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Finance Automation Dashboard</div>
            {[
              { label: 'Invoices Processed Today', value: '47', sub: 'Zero manual entry', color: '#10B981' },
              { label: 'Pending Approvals', value: '8', sub: 'Avg. approval: 2.3 hrs', color: 'var(--or)' },
              { label: 'GST Filing Status', value: '✓ Filed', sub: 'GSTR-3B for May 2025', color: '#6366F1' },
              { label: 'Cash Flow Forecast', value: '+₹8.2L', sub: 'Next 30 days', color: '#10B981' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-number)', fontSize: 18, color: item.color, fontWeight: 700 }}>{item.value}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>{item.sub}</div>
              </motion.div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              Month-end close: 2.1 days faster this month
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[{ r: r1, n: n1, s: '%', l: 'Reduction in Manual Finance Work', sub: 'within 60 days' }, { r: r2, n: n2, s: '%', l: 'Faster Month-End Close', sub: 'vs. manual process' }, { r: r3, n: n3, s: '%', l: 'Invoice Processing Accuracy', sub: '3-way matching AI' }, { r: r4, n: n4, s: 'hr', l: 'Saved Per Month Per Finance FTE', sub: 'on average' }].map((stat, i) => (
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Finance AI Platform</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Every finance function "" AI-powered</h2>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Built for Indian compliance. Trusted by CFOs.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { icon: <Shield size={24} color="var(--or)" />, title: 'SOC 2 Certified', desc: 'Enterprise-grade security for all financial data' },
              { icon: <Lock size={24} color="var(--or)" />, title: 'Indian Data Residency', desc: 'All data stored in India, compliant with data laws' },
              { icon: <FileText size={24} color="var(--or)" />, title: 'GST & TDS Ready', desc: 'Pre-built templates for all Indian statutory requirements' },
              { icon: <BarChart3 size={24} color="var(--or)" />, title: 'Audit Trail', desc: 'Every transaction logged, timestamped, and retrievable' },
            ].map((item, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#060E1A', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Finance teams love the numbers</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Mid-size IT Company', result: '₹24L saved in Year 1 finance ops', detail: '85% of invoice processing automated, month-end close reduced from 7 days to 2.5 days', time: '1 year' },
              { name: 'FMCG Distributor', result: 'Zero GST penalty in 18 months', detail: 'Automated GST filing and reconciliation eliminated all late filings and associated penalties', time: '18 months' },
              { name: 'Healthcare Chain "" 8 units', result: '40 hours/month reclaimed per accountant', detail: 'Invoice automation and automated expense reports freed finance team for higher-value analysis', time: '90 days' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ padding: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>{r.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, color: 'var(--or)', lineHeight: 1.2, marginBottom: 10 }}>{r.result}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 14 }}>{r.detail}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={12} color="rgba(255,255,255,0.3)" /><span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Result in {r.time}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ice)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Finance Automation "" Questions Answered</h2>
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
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 20 }}>Ready to Transform Your Finance Function?</motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>Get a free finance audit with a custom automation roadmap for your team.</motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>Get Free Finance Audit <ArrowRight size={18} /></Link>
            <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>See Case Studies</Link>
          </motion.div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

