import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, CheckCircle, ArrowRight, ChevronRight, Clock, Shield, Users, Calendar, FileText, Activity } from 'lucide-react';
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

const CHALLENGES = [
  { icon: '📅', title: 'Appointment No-Shows', desc: 'Average no-show rate of 20""30% costs hospitals crores in lost revenue and idle staff time annually.' },
  { icon: '📝', title: 'Administrative Overload', desc: 'Doctors spend 35""40% of their time on documentation instead of patient care "" burning out staff and reducing capacity.' },
  { icon: '📞', title: 'Patient Engagement Gaps', desc: 'Poor follow-up, missed medication reminders, and delayed test results lead to poor outcomes and patient dissatisfaction.' },
  { icon: '💳', title: 'Revenue Leakage', desc: 'Missed billing codes, delayed insurance claims, and uncollected payments drain 15""20% of potential revenue.' },
];

const SOLUTIONS = [
  { title: 'AI Appointment Management', desc: 'Automated booking, reminders, and rescheduling via WhatsApp, SMS, and voice. Reduce no-shows by 60% with intelligent reminder sequences.', points: ['Multi-channel appointment reminders', 'Smart rescheduling on cancellation', 'Waitlist management automation', 'Doctor availability optimization'] },
  { title: 'Patient Communication AI', desc: 'Post-visit follow-ups, medication reminders, test result notifications, and health tips "" all automated and personalized to each patient.', points: ['Post-discharge follow-up sequences', 'Medication adherence reminders', 'Lab result notifications', 'Preventive care reminders'] },
  { title: 'Medical Documentation AI', desc: 'Voice-to-EMR transcription, clinical note generation, and discharge summary automation. Doctors speak, AI writes.', points: ['Voice transcription to EMR', 'Clinical note generation', 'Discharge summary automation', 'ICD code suggestion'] },
  { title: 'Revenue Cycle Automation', desc: 'Insurance pre-authorization, claims submission, follow-up, and denial management "" all automated. Faster reimbursements, fewer write-offs.', points: ['Pre-authorization automation', 'Claims batch submission', 'Denial management workflow', 'Patient payment collection'] },
  { title: 'Inventory & Pharmacy AI', desc: 'Automated drug inventory management, expiry tracking, reorder automation, and pharmacy dispensing workflows.', points: ['Drug inventory optimization', 'Expiry date tracking', 'Automated reorder triggers', 'Dispensing workflow automation'] },
  { title: 'Staff & Scheduling', desc: 'AI-optimized staff scheduling based on patient load, speciality demand, and leave calendar. No more overstaffing or understaffing shifts.', points: ['Demand-based staff scheduling', 'Leave management integration', 'Shift handover automation', 'Overtime prevention rules'] },
];

const FAQS = [
  ['Is patient data HIPAA / data privacy compliant?', 'Yes. All patient data is encrypted, access-controlled, and stored with full audit trails. We sign Business Associate Agreements with all healthcare clients.'],
  ['Does it integrate with our HMS/EMR system?', 'We integrate with major Indian HMS systems including Practo, Doctify, eSanjeevani, and any system with API access. Custom integrations available.'],
  ['How does the appointment AI handle different specialities?', 'Appointment slots, durations, and routing rules are configured per speciality. Each department can have its own booking workflows and reminder sequences.'],
  ['Can it handle multi-location hospital networks?', 'Yes. Centralized dashboards across all locations with location-specific workflows, staff assignments, and reporting.'],
  ['How quickly can we deploy?', 'Core appointment and patient communication modules: 2""3 weeks. Full HMS integration with revenue cycle: 6""8 weeks.'],
];

export default function HealthcarePage() {
  const [activeSolution, setActiveSolution] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(60); const [n2, r2] = useCountUp(35); const [n3, r3] = useCountUp(20); const [n4, r4] = useCountUp(40);

  return (
    <>
      <Helmet><title>AI for Healthcare | AI Agentix</title></Helmet>
      <SiteNav /><VoiceAgentWidget />

      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '40px clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 55% 25%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Heart size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Healthcare AI</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Better Patient Care. <span style={{ color: 'var(--or)' }}>Less Administrative Work.</span>
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              AI-powered appointment management, patient communication, clinical documentation, and revenue cycle automation "" built specifically for hospitals, clinics, and healthcare networks.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Get Healthcare AI Audit <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                See Case Studies
              </Link>
            </motion.div>
          </div>
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Today at City Multispeciality Hospital</div>
            {[
              { label: 'Appointments Today', value: '247', trend: '18% fewer no-shows', color: '#10B981' },
              { label: 'Reminders Sent', value: '312', trend: 'via WhatsApp & SMS', color: 'var(--or)' },
              { label: 'Claims Submitted', value: '89', trend: '₹12.4L in claims', color: '#6366F1' },
              { label: 'Notes Auto-Generated', value: '64', trend: 'Saved 3.2 hrs doctor time', color: '#10B981' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: item.color, marginTop: 2 }}>{item.trend}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 20, color: item.color, fontWeight: 700 }}>{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[{ r: r1, n: n1, s: '%', l: 'Reduction in No-Shows', sub: 'with AI reminders' }, { r: r2, n: n2, s: '%', l: 'Less Admin Work', sub: 'per doctor per day' }, { r: r3, n: n3, s: '%', l: 'Revenue Increase', sub: 'from better billing' }, { r: r4, n: n4, s: '%', l: 'Patient Satisfaction Improvement', sub: 'post-implementation' }].map((stat, i) => (
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
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Industry Challenges</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>The problems every healthcare provider faces</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {CHALLENGES.map((ch, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: '24px 20px', background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{ch.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--nvd)', marginBottom: 8 }}>{ch.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{ch.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--nvd)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>AI Solutions for Healthcare</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Built for every layer of your healthcare operation</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {SOLUTIONS.map((s, i) => <button key={i} onClick={() => setActiveSolution(i)} style={{ textAlign: 'left', padding: '13px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: activeSolution === i ? 700 : 500, fontSize: 14, background: activeSolution === i ? 'rgba(232,99,26,0.2)' : 'rgba(255,255,255,0.05)', color: activeSolution === i ? 'var(--or)' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s', borderLeft: activeSolution === i ? '3px solid var(--or)' : '3px solid transparent' }}>{s.title}</button>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeSolution} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 36, border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 14 }}>{SOLUTIONS[activeSolution].title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 24 }}>{SOLUTIONS[activeSolution].desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {SOLUTIONS[activeSolution].points.map((pt, i) => <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(232,99,26,0.1)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)' }}><CheckCircle size={15} color="var(--or)" style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{pt}</span></div>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ow)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Designed for Indian healthcare compliance</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[{ icon: <Shield size={22} color="var(--or)" />, t: 'NABH Alignment', d: 'Workflows aligned with NABH accreditation requirements' }, { icon: <FileText size={22} color="var(--or)" />, t: 'Insurance Integration', d: 'CGHS, Ayushman Bharat, and TPA claim support' }, { icon: <Activity size={22} color="var(--or)" />, t: 'EMR Compatible', d: 'Integrates with all major Indian HMS platforms' }, { icon: <Users size={22} color="var(--or)" />, t: 'Multi-Language', d: 'Patient communication in 10+ Indian languages' }].map((item, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: '22px 18px', background: '#fff', borderRadius: 14, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--nvd)', marginBottom: 6 }}>{item.t}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#9CA3AF', lineHeight: 1.5 }}>{item.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#060E1A', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Healthcare outcomes that speak for themselves</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Multispeciality Hospital "" 200 beds', result: '60% fewer no-shows in 60 days', detail: 'WhatsApp reminder sequences reduced no-show rate from 28% to 11%, recovering ₹18L monthly in lost appointments', time: '60 days' },
              { name: 'Diagnostic Chain "" 12 centres', result: '₹42L additional revenue per year', detail: 'Better billing code capture and automated insurance claim follow-up recovered previously lost revenue', time: 'Year 1' },
              { name: 'Oncology Centre', result: '40% improvement in patient satisfaction', detail: 'Automated post-treatment follow-up, medication reminders, and care instructions improved patient experience scores significantly', time: '4 months' },
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Healthcare AI "" Questions Answered</h2>
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
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 20 }}>Ready to Transform Patient Care?</motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>Get a free healthcare AI audit with a custom implementation plan for your facility type and patient volume.</motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>Get Healthcare Audit <ArrowRight size={18} /></Link>
            <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>See Case Studies</Link>
          </motion.div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

