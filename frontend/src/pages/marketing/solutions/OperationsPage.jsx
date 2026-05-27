import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Workflow, CheckCircle, ArrowRight, ChevronRight, Clock, Settings, BarChart3, AlertTriangle, Layers, RefreshCw } from 'lucide-react';
import SiteNav from '../../../components/layout/SiteNav.jsx';
import SiteFooter from '../../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../../voice-agent/VoiceAgentWidget.jsx';
import '../../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

function useCountUp(target, dur = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      let s = null;
      const tick = (ts) => { if (!s) s = ts; const p = Math.min((ts - s) / dur, 1); setCount(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, [target, dur]);
  return [count, ref];
}

const WORKFLOWS = [
  { name: 'Invoice Processing', dept: 'Finance', auto: 94, status: 'Running', color: '#10B981' },
  { name: 'Employee Onboarding', dept: 'HR', auto: 88, status: 'Running', color: 'var(--or)' },
  { name: 'Vendor Approval Flow', dept: 'Procurement', auto: 76, status: 'Pending Review', color: '#F59E0B' },
  { name: 'Customer Escalation', dept: 'Support', auto: 91, status: 'Running', color: '#6366F1' },
];

const FEATURES = [
  { title: 'Workflow Orchestration', desc: 'Map, automate, and monitor every business process from one command center. No-code workflow builder with 200+ pre-built templates across departments.', points: ['No-code workflow builder', '200+ workflow templates', 'Cross-department automation', 'Real-time process monitoring'] },
  { title: 'Document Intelligence', desc: 'AI reads, classifies, and extracts data from any document "" invoices, contracts, forms, emails. Data flows directly into your systems without manual entry.', points: ['Invoice data extraction', 'Contract clause detection', 'Form digitization', 'Auto-routing by content type'] },
  { title: 'Approval Engine', desc: 'Multi-level approval workflows with SLA enforcement, escalation rules, and audit trails. No more approvals stuck in someone\'s inbox.', points: ['Multi-level approval chains', 'SLA countdown & alerts', 'Escalation on breach', 'Complete audit trail'] },
  { title: 'Ops Analytics', desc: 'Real-time visibility into every process: completion rates, bottlenecks, cycle times, and team performance. Weekly ops digest generated automatically.', points: ['Process completion dashboards', 'Bottleneck detection AI', 'Cycle time benchmarking', 'Automated ops reports'] },
  { title: 'Exception Management', desc: 'AI detects process anomalies, flags exceptions, and routes them to the right person with full context. Problems surface before they become crises.', points: ['Anomaly detection engine', 'Smart exception routing', 'Context-rich alerts', 'Resolution tracking'] },
  { title: 'Integration Fabric', desc: 'Connect 300+ tools "" ERP, CRM, HRMS, communication tools "" into unified automated workflows. No more data silos or manual handoffs.', points: ['300+ tool connectors', 'Bidirectional data sync', 'Webhook & API support', 'No-code integration builder'] },
];

const FAQS = [
  ['How quickly can we deploy first workflows?', 'First workflows live in 48""72 hours using our pre-built templates. Full operational suite deployment takes 3""4 weeks.'],
  ['Do we need to map existing processes first?', 'Our team does a process discovery session in week 1. For complex operations, we provide a detailed mapping before automation.'],
  ['Can it handle approval chains with 5+ levels?', 'Yes. Multi-level approvals with conditional logic, delegation rules, and auto-escalation at any level are fully supported.'],
  ['What happens when an automation fails?', 'Immediate alert to the process owner with full context. The workflow pauses at the failure point, not lost "" resumes after resolution.'],
  ['How does it integrate with our existing ERP?', 'Direct connectors for SAP, Oracle, Zoho, and Tally. For custom ERPs, we use API/webhook integration with your IT team.'],
];

export default function OperationsPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(70);
  const [n2, r2] = useCountUp(90);
  const [n3, r3] = useCountUp(48);
  const [n4, r4] = useCountUp(35);

  return (
    <>
      <Helmet><title>Operations Automation | AI Agentix</title></Helmet>
      <SiteNav />
      <VoiceAgentWidget />

      {/* 1. HERO */}
      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,160px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 55% 25%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Workflow size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Operations Automation</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Eliminate 70% of Manual <span style={{ color: 'var(--or)' }}>Operations Work</span> With AI
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              Workflow automation, document processing, approvals, and real-time ops visibility "" all connected. Your operations team focuses on decisions, not manual tasks.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Map My Operations <ArrowRight size={16} />
              </Link>
              <Link to="/technology" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                View Technology
              </Link>
            </motion.div>
          </div>
          {/* Workflow status widget */}
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Active Workflows</div>
            {WORKFLOWS.map((wf, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: wf.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{wf.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{wf.dept} Â· {wf.status}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 14, color: wf.color }}>{wf.auto}%</div>
              </motion.div>
            ))}
            <div style={{ marginTop: 16, padding: '10px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              24 workflows active Â· 847 tasks automated today
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[
            { r: r1, n: n1, s: '%', l: 'Manual Tasks Eliminated', sub: 'on average after 90 days' },
            { r: r2, n: n2, s: '%', l: 'Faster Document Processing', sub: 'vs. manual handling' },
            { r: r3, n: n3, s: 'hr', l: 'Process Launch Time', sub: 'from workflow to live' },
            { r: r4, n: n4, s: '%', l: 'Reduction in Operational Errors', sub: 'through automation rules' },
          ].map((stat, i) => (
            <motion.div key={i} {...up(i * 0.1)} ref={stat.r} style={{ textAlign: 'center', padding: '32px 20px', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16 }}>
              <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(48px,4vw,72px)', fontWeight: 700, color: 'var(--or)', lineHeight: 1 }}>{stat.n}{stat.s}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--nvd)', marginTop: 10 }}>{stat.l}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4, fontFamily: 'var(--font-body)' }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURES */}
      <section style={{ background: 'var(--ice)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Operations Platform</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Every operational bottleneck "" solved</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FEATURES.map((f, i) => (
                <button key={i} onClick={() => setActiveFeature(i)} style={{ textAlign: 'left', padding: '13px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: activeFeature === i ? 700 : 500, fontSize: 14, background: activeFeature === i ? 'var(--nvd)' : 'rgba(0,0,0,0.04)', color: activeFeature === i ? '#fff' : 'var(--nvd)', transition: 'all 0.2s', borderLeft: activeFeature === i ? '3px solid var(--or)' : '3px solid transparent' }}>
                  {f.title}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }}
                style={{ background: '#fff', borderRadius: 20, padding: 36, border: '1px solid rgba(0,0,0,0.06)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'var(--nvd)', marginBottom: 14 }}>{FEATURES[activeFeature].title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#4B5563', lineHeight: 1.7, marginBottom: 24 }}>{FEATURES[activeFeature].desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {FEATURES[activeFeature].points.map((pt, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(232,99,26,0.05)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.1)' }}>
                      <CheckCircle size={15} color="var(--or)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--nvd)' }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section style={{ background: 'var(--nvd)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>How We Deploy</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>From process mapping to fully automated ops</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { n: '01', t: 'Process Discovery', d: 'Workshop to map all manual workflows and identify automation opportunities' },
              { n: '02', t: 'Priority Assessment', d: 'Rank workflows by time saved, error rate, and business impact' },
              { n: '03', t: 'Workflow Design', d: 'No-code builder creates automated flows with approval logic' },
              { n: '04', t: 'Integration Setup', d: 'Connect to ERP, CRM, email, and existing tools' },
              { n: '05', t: 'Pilot & Refine', d: '2-week pilot with 2""3 workflows, measure and adjust' },
              { n: '06', t: 'Full Rollout', d: 'All approved workflows go live with ongoing monitoring' },
            ].map((step, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 44, color: 'rgba(232,99,26,0.25)', lineHeight: 1, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{step.t}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DEPARTMENTS */}
      <section style={{ background: 'var(--ow)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Department Coverage</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Automation across every department</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { dept: 'Finance & Accounts', items: ['Invoice processing', 'Expense approval', 'Reconciliation'], icon: '💰' },
              { dept: 'Human Resources', items: ['Onboarding', 'Leave management', 'Payroll prep'], icon: '💥' },
              { dept: 'Procurement', items: ['PO approval', 'Vendor comparison', 'Contract review'], icon: '📦' },
              { dept: 'Customer Support', items: ['Ticket routing', 'Escalation flows', 'SLA monitoring'], icon: '🎧' },
              { dept: 'Sales Operations', items: ['Deal stage moves', 'Quote generation', 'CRM hygiene'], icon: '📊' },
              { dept: 'IT & Admin', items: ['Access requests', 'Asset tracking', 'Incident routing'], icon: '⚙ï¸' },
            ].map((item, i) => (
              <motion.div key={i} {...up(i * 0.07)} style={{ padding: '22px 20px', background: '#fff', borderRadius: 14, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--nvd)', marginBottom: 10 }}>{item.dept}</div>
                {item.items.map((it, j) => (
                  <div key={j} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6B7280', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--or)', flexShrink: 0 }} /> {it}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RESULTS */}
      <section style={{ background: '#060E1A', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Operations transformed, team hours reclaimed</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Logistics Co. "" 500 employees', result: '2,400 hours/month saved', detail: '70% of manual data entry and approvals eliminated across finance, HR, and operations', time: '4 months' },
              { name: 'FMCG Distributor', result: '90% faster invoice processing', detail: 'AI extracts invoice data and routes for approval "" from 2 days to 4 hours per invoice', time: '6 weeks' },
              { name: 'Professional Services', result: '35% operational error reduction', detail: 'Automated compliance checks and approval gates catch errors before they reach clients', time: '3 months' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ padding: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>{r.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 800, color: 'var(--or)', lineHeight: 1.2, marginBottom: 10 }}>{r.result}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 14 }}>{r.detail}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={12} color="rgba(255,255,255,0.3)" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Achieved in {r.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section style={{ background: 'var(--ice)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Operations Automation "" Questions Answered</h2>
          </motion.div>
          {FAQS.map(([q, a], i) => (
            <motion.div key={i} {...up(i * 0.06)} style={{ background: '#fff', borderRadius: 14, marginBottom: 10, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', padding: '18px 22px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--nvd)' }}>{q}</span>
                <ChevronRight size={17} color="var(--or)" style={{ transform: openFaq === i ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#6B7280', lineHeight: 1.7, padding: '0 22px 18px' }}>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. CTA */}
      <section style={{ background: 'var(--nvd)', padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,99,26,0.15), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 20 }}>
            Ready to Automate Your Operations?
          </motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>
            Get a free process audit. We'll map your top 5 automation opportunities and estimate time saved within 30 minutes.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Get Process Audit <ArrowRight size={18} />
            </Link>
            <Link to="/technology" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              Explore Technology
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

