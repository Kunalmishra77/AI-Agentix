import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Users, CheckCircle, ArrowRight, ChevronRight, Clock, Star, UserCheck, Briefcase, FileText, Bell } from 'lucide-react';
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

const FEATURES = [
  { title: 'AI Candidate Screening', desc: 'Resume parsing, JD matching, and intelligent shortlisting in minutes. AI screens hundreds of applications and ranks candidates by fit score, saving 85% of recruiter time.', points: ['JD-to-resume matching AI', 'Skills gap analysis', 'Automated ranking & scoring', 'Bias-reduced screening'] },
  { title: 'Interview Automation', desc: 'Automated scheduling, pre-screening video interviews, and question generation tailored to each role. Candidates complete async interviews on their own schedule.', points: ['Async video interviews', 'AI question generation', 'Calendar auto-scheduling', 'Evaluation rubric builder'] },
  { title: 'Onboarding Workflows', desc: 'Digital onboarding from offer acceptance to first day. Document collection, policy acknowledgements, access provisioning "" all automated with zero HR overhead.', points: ['Digital document collection', 'Policy acknowledgement tracking', 'Access & tool provisioning', 'First-30-day checklist engine'] },
  { title: 'Performance Management', desc: 'Continuous feedback loops, goal tracking, and 360Â° reviews managed by AI. Quarterly reviews auto-generated from actual performance data, not vague impressions.', points: ['OKR & goal tracking', '360Â° feedback automation', 'Performance trend analytics', 'Review document generation'] },
  { title: 'Payroll & Compliance', desc: 'Automated payroll processing with tax calculations, compliance checks, and audit trails. Statutory compliance for PF, ESI, TDS, and more "" always up to date.', points: ['Auto payroll calculation', 'Statutory compliance (PF/ESI)', 'Salary slip generation', 'Audit trail & reporting'] },
  { title: 'Employee Engagement', desc: 'Pulse surveys, recognition programs, and sentiment analysis. Know how your team feels before it shows up in attrition data.', points: ['Automated pulse surveys', 'AI sentiment analysis', 'Recognition & rewards engine', 'Attrition risk prediction'] },
];

const FAQS = [
  ['How does AI screening reduce bias?', 'The AI evaluates skills and experience against job requirements, not photos, names, or other personal attributes. You can configure blind screening modes for complete anonymity.'],
  ['Does it integrate with job boards?', 'Yes "" LinkedIn, Naukri, Indeed, and Shine. Applications flow directly into the ATS and get scored automatically without manual import.'],
  ['Can employees self-serve on HR queries?', 'The HR AI bot handles leave requests, payslip queries, policy questions, and more. 80% of HR queries resolved without HR team involvement.'],
  ['Is payroll data secure?', 'All payroll data is encrypted, role-gated, and audit-logged. SOC 2 Type II compliant infrastructure with Indian data residency options.'],
  ['How long to implement?', '4""6 weeks for full HRMS setup including payroll, compliance, and ATS. Core recruitment module live in 2 weeks.'],
];

export default function HRMSHiringPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(85);
  const [n2, r2] = useCountUp(60);
  const [n3, r3] = useCountUp(3);
  const [n4, r4] = useCountUp(40);

  return (
    <>
      <Helmet><title>HRMS & Hiring Automation | AI Agentix</title></Helmet>
      <SiteNav />
      <VoiceAgentWidget />

      {/* 1. HERO */}
      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '40px clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 55% 25%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Users size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>HRMS & Hiring</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Hire Faster. Manage Better. <span style={{ color: 'var(--or)' }}>HR on Autopilot.</span>
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              AI-powered recruitment, onboarding, payroll, and performance management. Reduce time-to-hire by 60% and handle 80% of HR queries automatically.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Get HR Audit <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                See Case Studies
              </Link>
            </motion.div>
          </div>
          {/* Hiring funnel widget */}
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Hiring Funnel "" Live</div>
            {[
              { stage: 'Applications Received', count: 247, pct: 100, color: 'rgba(255,255,255,0.3)' },
              { stage: 'AI Screened & Shortlisted', count: 48, pct: 19, color: '#6366F1' },
              { stage: 'Interviews Scheduled', count: 22, pct: 9, color: 'var(--or)' },
              { stage: 'Final Round', count: 8, pct: 3, color: '#10B981' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{item.stage}</span>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 14, color: item.color }}>{item.count}</span>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                    style={{ height: '100%', background: item.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 18, padding: '10px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              3 offers sent today Â· 1 accepted Â· 14 days avg. time-to-hire
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[
            { r: r1, n: n1, s: '%', l: 'Recruiter Time Saved', sub: 'on screening & scheduling' },
            { r: r2, n: n2, s: '%', l: 'Faster Time-to-Hire', sub: 'vs. manual process' },
            { r: r3, n: n3, s: 'x', l: 'More Candidate Pipeline', sub: 'same team size' },
            { r: r4, n: n4, s: '%', l: 'Lower Attrition', sub: 'within 12 months' },
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Full HRMS Suite</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Every HR function "" AI-powered</h2>
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Employee Lifecycle</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>From job post to offboarding "" fully managed</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { n: '01', t: 'Job Post & Sourcing', d: 'AI writes JDs, posts to job boards, and sources passive candidates' },
              { n: '02', t: 'Screen & Shortlist', d: 'Hundreds of CVs screened and ranked in minutes' },
              { n: '03', t: 'Interview & Select', d: 'Automated scheduling, async video, AI evaluation' },
              { n: '04', t: 'Offer & Onboard', d: 'Digital offer, document collection, tool access provisioned' },
              { n: '05', t: 'Grow & Retain', d: 'Continuous feedback, goals, training, and recognition' },
              { n: '06', t: 'Payroll & Compliance', d: 'Automated salary, taxes, statutory filings, and reports' },
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

      {/* 5. KEY BENEFITS */}
      <section style={{ background: 'var(--ow)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Why HR Teams Love It</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Built for Indian businesses. Compliant out of the box.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {[
              { icon: <UserCheck size={22} color="var(--or)" />, title: 'Bias-Reduced Hiring', desc: 'AI screens on skills and experience, removing unconscious bias from shortlisting.' },
              { icon: <FileText size={22} color="var(--or)" />, title: 'Indian Compliance Ready', desc: 'PF, ESI, PT, TDS "" statutory compliance built-in and always updated.' },
              { icon: <Bell size={22} color="var(--or)" />, title: 'Employee Self-Service', desc: 'Leave requests, payslips, and policy queries handled without HR team input.' },
              { icon: <Star size={22} color="var(--or)" />, title: 'Attrition Prediction', desc: 'AI flags at-risk employees 30""60 days before they resign, with recommended interventions.' },
            ].map((item, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: 28, background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--nvd)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>{item.desc}</p>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>HR results that change how you operate</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Fintech Startup "" 200 employees', result: '60% faster time-to-hire', detail: 'Reduced average hiring cycle from 45 days to 18 days across all roles using AI screening', time: '2 months' },
              { name: 'Manufacturing Co. "" 800 staff', result: '40% drop in attrition rate', detail: 'AI pulse surveys and early warning system flagged at-risk employees; targeted interventions retained 340 employees', time: '6 months' },
              { name: 'IT Services "" 350 employees', result: '₹18L saved in HR ops costs', detail: 'Self-service bot handles 80% of HR queries, freeing the team for strategic work', time: 'Year 1' },
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>HRMS & Hiring "" Questions Answered</h2>
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
            Ready to Modernise Your HR?
          </motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>
            Get a free HR audit and a custom implementation roadmap for your team size and industry.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Get Free HR Audit <ArrowRight size={18} />
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

