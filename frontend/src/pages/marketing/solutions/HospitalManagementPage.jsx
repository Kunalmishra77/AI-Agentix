import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Heart, CheckCircle, ArrowRight, ChevronRight, Clock,
  Calendar, FileText, Users, Bell, BarChart3, Stethoscope, Activity,
} from 'lucide-react';
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
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let s = null;
      const tick = (ts) => {
        if (!s) s = ts;
        const p = Math.min((ts - s) / dur, 1);
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, dur]);
  return [count, ref];
}

const FEATURES = [
  {
    title: 'Patient Scheduling & OPD Automation',
    desc: 'AI-powered appointment booking that eliminates manual scheduling. Patients self-book via WhatsApp, web, or phone. Smart slot allocation reduces no-shows by 40% with automated reminders.',
    points: ['WhatsApp & web self-booking', 'Smart slot optimization', 'Automated reminders & recalls', 'Doctor availability management'],
  },
  {
    title: 'EMR / EHR Integration & Auto-Filing',
    desc: 'Automatically sync patient records, test results, and prescriptions across all departments. Eliminate manual data entry and paper files with AI-driven digital record management.',
    points: ['Auto-sync across departments', 'Digital prescription management', 'Lab report auto-attachment', 'Patient history at a glance'],
  },
  {
    title: 'Billing & Insurance Claims AI',
    desc: 'Automate invoice generation, insurance pre-authorization, claim submission, and follow-ups. Reduce billing errors by 90% and cut claim rejection rates with AI-validated submissions.',
    points: ['Auto invoice generation', 'Insurance pre-auth automation', 'Claim submission & tracking', 'TPA / cashless processing'],
  },
  {
    title: 'Lab & Pharmacy Management',
    desc: 'Streamline test ordering, result delivery, and pharmacy inventory. Patients receive lab reports via WhatsApp instantly. Auto-reorder pharmacy stock before it runs out.',
    points: ['Digital lab report delivery', 'Test-order to result automation', 'Pharmacy inventory alerts', 'Prescription-to-dispensing flow'],
  },
  {
    title: 'Staff Scheduling & HR Automation',
    desc: 'AI-optimized duty rosters that ensure no department is understaffed. Auto-handle leave requests, shift swaps, and overtime alerts. Payroll triggers run automatically at month end.',
    points: ['AI-generated duty rosters', 'Leave & shift management', 'Overtime & compliance alerts', 'Payroll integration triggers'],
  },
  {
    title: 'Patient Communication & Follow-Up',
    desc: 'Keep patients engaged post-discharge with automated follow-up messages, medication reminders, and health tips. Build loyalty and improve outcomes with proactive AI communication.',
    points: ['Post-discharge follow-up flows', 'Medication & diet reminders', 'Health camp & scheme alerts', 'Patient satisfaction surveys'],
  },
];

const STEPS = [
  { n: '01', t: 'Patient Arrives / Books', d: 'Walk-in or online booking auto-creates patient record' },
  { n: '02', t: 'OPD Queue Managed', d: 'AI assigns tokens, estimates wait times, alerts patients' },
  { n: '03', t: 'Consultation Recorded', d: 'Diagnosis, prescription & tests auto-filed to EMR' },
  { n: '04', t: 'Lab & Pharmacy Triggered', d: 'Orders auto-sent; reports delivered via WhatsApp' },
  { n: '05', t: 'Billing Auto-Generated', d: 'Invoice created, insurance claim submitted instantly' },
  { n: '06', t: 'Discharge & Follow-Up', d: 'Discharge summary sent; post-care automation begins' },
];

const FAQS = [
  ['How long does deployment take?', 'Most hospitals go live within 3–4 weeks. We handle data migration, staff training, and integration with your existing HMIS/EMR without disrupting ongoing operations.'],
  ['Does it work with existing HMIS software?', 'Yes. We integrate with all major Indian HMIS platforms — Practo, eVital, HIS, Marg, and custom systems. API-based integration means no rip-and-replace.'],
  ['Is patient data secure and HIPAA/DPDPA compliant?', 'Absolutely. All data is encrypted at rest and in transit, stored in India, and fully compliant with DPDPA 2023 and healthcare data protection standards.'],
  ['Can it handle multi-speciality or multi-location hospitals?', 'Yes. The system is built for multi-department and multi-branch environments with centralized dashboards and department-level access controls.'],
  ['What happens if the internet goes down?', 'Critical functions have offline fallback modes. Data syncs automatically once connectivity is restored. Zero patient data is lost.'],
];

export default function HospitalManagementPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(70);
  const [n2, r2] = useCountUp(45);
  const [n3, r3] = useCountUp(90);
  const [n4, r4] = useCountUp(3);

  return (
    <>
      <Helmet><title>Hospital Management System | AI Agentix</title></Helmet>
      <SiteNav />
      <VoiceAgentWidget />

      {/* 1. HERO */}
      <section style={{ background: 'var(--nvd)', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '40px clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 60% 30%, rgba(232,99,26,0.12), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Heart size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Hospital Management System</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Run Your Hospital on <span style={{ color: 'var(--or)' }}>AI-Powered</span> Automation
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              From patient booking to discharge — fully automated. Reduce admin overhead by 70%, eliminate billing errors, and give your clinical staff more time for patient care.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Book Free Demo <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                View Case Studies
              </Link>
            </motion.div>
          </div>

          {/* Hero mock — live hospital dashboard */}
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, backdropFilter: 'blur(10px)' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Today's Hospital Dashboard</div>
            {[
              { label: 'OPD Patients Today',    value: '184',    change: '+12 vs yesterday', color: '#E8631A' },
              { label: 'Appointments Confirmed', value: '96%',    change: 'Auto-reminded',    color: '#10B981' },
              { label: 'Billing Claims Sent',    value: '47',     change: '0 errors today',   color: '#6366F1' },
              { label: 'Lab Reports Delivered',  value: '2 min',  change: 'Avg. turnaround',  color: '#F59E0B' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.12 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0, boxShadow: `0 0 8px ${item.color}80` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{item.label}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-number)', fontSize: 18, fontWeight: 700, color: item.color, lineHeight: 1 }}>{item.value}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{item.change}</div>
                </div>
              </motion.div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              All systems live · 3 departments automated
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[
            { r: r1, n: n1, s: '%', l: 'Admin Work Reduced',     sub: 'Across billing & scheduling' },
            { r: r2, n: n2, s: '%', l: 'Faster Claim Processing', sub: 'Insurance & TPA claims' },
            { r: r3, n: n3, s: '%', l: 'Billing Error Reduction', sub: 'AI-validated invoices' },
            { r: r4, n: n4, s: 'x', l: 'Patient Throughput',      sub: 'More patients, same staff' },
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Core Capabilities</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Every hospital workflow — automated end to end</h2>
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>The Patient Journey</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>From arrival to discharge — fully automated</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {STEPS.map((step, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: 28, background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 44, color: 'rgba(232,99,26,0.25)', lineHeight: 1, marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{step.t}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{step.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTEGRATIONS */}
      <section style={{ background: 'var(--ow)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Integrations</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Works with your existing hospital stack</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#6B7280', marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>Plug into your current HMIS, lab, pharmacy, and billing systems without any disruption.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
            {['Practo', 'eVital HMS', 'Marg ERP', 'Tally', 'WhatsApp', 'Razorpay', 'Zoho CRM', 'Gmail', 'ICICI Pay', 'Cashfree', 'IndiaMART', 'Twilio'].map((tool, i) => (
              <motion.div key={i} {...up(i * 0.04)} style={{ padding: '16px 12px', background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.08)', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--nvd)' }}>{tool}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPARISON */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Why AI Agentix</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>AI-Powered HMS vs. Traditional System</h2>
          </motion.div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#9CA3AF', fontSize: 13, fontWeight: 600, borderBottom: '2px solid #F0F4F8' }}>Capability</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--or)', fontSize: 13, fontWeight: 700, borderBottom: '2px solid var(--or)', background: 'rgba(232,99,26,0.04)' }}>AI Agentix HMS</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', color: '#9CA3AF', fontSize: 13, fontWeight: 600, borderBottom: '2px solid #F0F4F8' }}>Traditional HMS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Appointment Booking',     'WhatsApp / Web / Phone 24/7',  'Manual phone calls only'],
                  ['Billing Errors',          'Near-zero with AI validation', '15–20% human error rate'],
                  ['Insurance Claims',        'Auto-submitted in minutes',    'Manual, 3–5 day turnaround'],
                  ['Lab Report Delivery',     'WhatsApp in 2 minutes',        'Manual counter / phone call'],
                  ['Patient Communication',   'Automated, personalized',      'Ad-hoc staff messaging'],
                  ['Operational Insights',    'Live dashboard & alerts',      'Monthly Excel reports'],
                ].map(([cap, ai, trad], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F0F4F8' }}>
                    <td style={{ padding: '13px 20px', fontSize: 14, color: 'var(--nvd)', fontWeight: 500 }}>{cap}</td>
                    <td style={{ padding: '13px 20px', fontSize: 14, fontWeight: 700, color: 'var(--or)', textAlign: 'center', background: 'rgba(232,99,26,0.03)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><CheckCircle size={13} color="var(--or)" /> {ai}</span>
                    </td>
                    <td style={{ padding: '13px 20px', fontSize: 14, color: '#9CA3AF', textAlign: 'center' }}>{trad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. RESULTS */}
      <section style={{ background: '#060E1A', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Real Results</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Hospitals that transformed with AI Agentix</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: '80-bed Multi-Speciality, New Delhi',   result: '70% reduction in front-desk staff work', detail: 'OPD queue, billing & lab reports fully automated. Staff redirected to patient care.', time: '6 weeks' },
              { name: 'Diagnostic Centre Chain, Delhi',   result: '₹18L/year saved on billing errors',     detail: 'AI-validated claims cut rejection rate from 22% to under 2% across 4 branches.',  time: '3 months' },
              { name: 'Super-Speciality Hospital, Hyderabad', result: '3x patient throughput in OPD',     detail: 'Smart scheduling and auto-reminders increased confirmed appointments by 85%.', time: '2 months' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ padding: 32, background: 'rgba(255,255,255,0.04)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>{r.name}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--or)', lineHeight: 1.2, marginBottom: 10 }}>{r.result}</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 14 }}>{r.detail}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Clock size={12} color="rgba(255,255,255,0.3)" />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Result in {r.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section style={{ background: 'var(--ice)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Hospital Management — Questions Answered</h2>
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

      {/* 9. CTA */}
      <section style={{ background: 'var(--nvd)', padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,99,26,0.15), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 20 }}>
            Ready to Modernise Your Hospital Operations?
          </motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>
            Book a free 30-minute demo. We'll map your biggest workflow bottlenecks and show you exactly how AI can fix them — no commitment required.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Book Free Demo <ArrowRight size={18} />
            </Link>
            <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              See Case Studies
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
