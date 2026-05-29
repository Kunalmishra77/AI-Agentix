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

const CHALLENGES = [
  { id: 0, label: 'Student Engagement', desc: 'Keeping students engaged in hybrid and online learning environments remains a persistent challenge for educators worldwide.' },
  { id: 1, label: 'Administrative Burden', desc: 'Faculty spend 40% of their time on administrative tasks "" grading, scheduling, reporting "" leaving less time for actual teaching.' },
  { id: 2, label: 'Enrollment & Retention', desc: 'Institutions struggle to convert leads to enrollments and retain students through graduation amid growing competition.' },
  { id: 3, label: 'Personalized Learning', desc: 'One-size-fits-all curricula fail diverse learners. Adapting content to individual pace and style at scale is nearly impossible manually.' },
];

const SOLUTIONS = [
  { id: 0, label: 'AI Admissions Automation', detail: 'Automate inquiry responses, application follow-ups, document collection, and enrollment workflows. AI agents handle thousands of prospective student conversations simultaneously.' },
  { id: 1, label: 'Student Support Chatbot', detail: '24/7 AI assistant answers FAQs about courses, deadlines, financial aid, and campus resources. Escalates complex cases to human counselors with full context.' },
  { id: 2, label: 'Learning Path Personalization', detail: 'AI analyzes student performance data to recommend tailored content, flag at-risk learners early, and suggest interventions before students drop out.' },
  { id: 3, label: 'Faculty Productivity Tools', detail: 'Automate grading rubrics, generate quiz questions from lecture content, summarize student feedback, and produce progress reports in seconds.' },
  { id: 4, label: 'Alumni Engagement Engine', detail: 'Re-engage alumni through automated donation campaigns, event invitations, and mentorship matching "" powered by AI personalization at scale.' },
];

const FAQS = [
  { q: 'Is student data kept secure and FERPA-compliant?', a: 'Yes. AI Agentix is FERPA-compliant with role-based access, data encryption, audit logs, and zero-retention policies for sensitive student information.' },
  { q: 'Can AI replace teachers or counselors?', a: 'No. AI handles repetitive administrative tasks so educators can focus on high-value interactions. Human oversight is always maintained for critical decisions.' },
  { q: 'How long does implementation take for a university?', a: 'Most institutions go live within 4""8 weeks with phased rollout starting from admissions workflows, then expanding to student services.' },
  { q: 'Does it integrate with our existing LMS?', a: 'Yes "" we integrate with Canvas, Blackboard, Moodle, Salesforce Education Cloud, Banner, Ellucian, and 50+ other platforms.' },
  { q: 'How do you measure ROI for education institutions?', a: 'We track enrollment conversion rates, student retention, staff time saved, support ticket volume, and alumni engagement metrics with monthly reporting.' },
];

export default function EducationPage() {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [activeSolution, setActiveSolution] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [enrolled, enrolledRef] = useCountUp(94);
  const [retention, retentionRef] = useCountUp(89);
  const [timeSaved, timeSavedRef] = useCountUp(38);
  const [satisfaction, satisfactionRef] = useCountUp(4.8);

  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--nvd)', color: 'var(--ow)', overflowX: 'hidden' }}>
      <SiteNav scrolled={scrolled} logoFilter={scrolled ? 'none' : 'brightness(0) invert(1)'} />

      {/* HERO "" dark, student activity widget */}
      <section style={{ background: 'var(--nvd)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 40, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.15)', border: '1px solid rgba(232,99,26,0.4)', borderRadius: 24, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ color: 'var(--or)', fontSize: 13, fontWeight: 600 }}>AI FOR EDUCATION</span>
            </motion.div>
            <motion.h1 {...up(0.2)} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, fontFamily: 'var(--font-display)' }}>
              Transform Learning with <span style={{ color: 'var(--or)' }}>Intelligent Automation</span>
            </motion.h1>
            <motion.p {...up(0.3)} style={{ fontSize: '1.1rem', color: 'rgba(248,246,242,0.7)', lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              From admissions to alumni engagement, AI Agentix automates every touchpoint so educators can focus on what matters "" inspiring students.
            </motion.p>
            <motion.div {...up(0.4)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem' }}>Book a Demo</a>
              <a href="/case-studies" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '14px 32px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>View Case Studies</a>
            </motion.div>
          </div>

          {/* Student Activity Widget */}
          <motion.div {...up(0.3)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28, backdropFilter: 'blur(12px)' }}>
            <div style={{ fontSize: 13, color: 'rgba(248,246,242,0.5)', marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>LIVE CAMPUS ACTIVITY</div>
            {[
              { student: 'Priya S.', action: 'Application submitted', dept: 'Computer Science', time: '2m ago', status: 'New', color: '#22c55e' },
              { student: 'Arjun M.', action: 'Financial aid query resolved', dept: 'MBA Program', time: '5m ago', status: 'Done', color: 'var(--or)' },
              { student: 'Sofia R.', action: 'Course enrollment confirmed', dept: 'Data Analytics', time: '9m ago', status: 'Done', color: 'var(--or)' },
              { student: 'James K.', action: 'At-risk flag detected', dept: 'Engineering', time: '12m ago', status: 'Alert', color: '#f59e0b' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: item.color, flexShrink: 0 }}>{item.student[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ow)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.student} "" {item.action}</div>
                  <div style={{ fontSize: 11, color: 'rgba(248,246,242,0.4)' }}>{item.dept} Â· {item.time}</div>
                </div>
                <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: `${item.color}22`, color: item.color, fontWeight: 700, flexShrink: 0 }}>{item.status}</span>
              </motion.div>
            ))}
            <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(232,99,26,0.1)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'rgba(248,246,242,0.6)' }}>Today's AI interactions</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--or)', fontFamily: 'var(--font-number)' }}>1,247</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS "" white */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Results That Speak for Themselves</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>Institutions using AI Agentix consistently report stronger outcomes across every metric.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { label: 'Enrollment Conversion', value: enrolled, ref: enrolledRef, suffix: '%', sub: 'Lead to enrollment rate' },
              { label: 'Student Retention', value: retention, ref: retentionRef, suffix: '%', sub: 'Year-over-year improvement' },
              { label: 'Admin Time Saved', value: timeSaved, ref: timeSavedRef, suffix: 'hrs/wk', sub: 'Per faculty member' },
              { label: 'Student Satisfaction', value: satisfaction, ref: satisfactionRef, suffix: '/5', sub: 'Average CSAT score', decimals: 1 },
            ].map((s, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ textAlign: 'center', padding: '32px 24px', borderRadius: 16, background: 'var(--ice)', border: '1px solid rgba(13,27,46,0.06)' }}>
                <div ref={s.ref} style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', lineHeight: 1 }}>
                  {s.decimals ? (s.value / 10).toFixed(1) : s.value}{s.suffix}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--nvd)', marginTop: 8 }}>{s.label}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gr)', marginTop: 4 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGES "" light ice */}
      <section style={{ background: 'var(--ice)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Challenges We Solve</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>Educational institutions face unique pressures. We've built solutions for each one.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CHALLENGES.map((c) => (
                <motion.button key={c.id} {...up(c.id * 0.08)} onClick={() => setActiveChallenge(c.id)}
                  style={{ textAlign: 'left', padding: '18px 22px', borderRadius: 12, border: activeChallenge === c.id ? '2px solid var(--or)' : '2px solid transparent', background: activeChallenge === c.id ? 'rgba(232,99,26,0.08)' : '#fff', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <div style={{ fontWeight: 700, color: activeChallenge === c.id ? 'var(--or)' : 'var(--nvd)', marginBottom: 4 }}>{c.label}</div>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeChallenge} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid rgba(13,27,46,0.08)', minHeight: 200 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--or)', marginBottom: 12, letterSpacing: 1 }}>CHALLENGE {activeChallenge + 1}</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--nvd)', marginBottom: 16 }}>{CHALLENGES[activeChallenge].label}</h3>
                <p style={{ color: 'var(--gr)', lineHeight: 1.75, fontSize: '1rem' }}>{CHALLENGES[activeChallenge].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* AI SOLUTIONS "" dark */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Our AI Solutions for Education</h2>
            <p style={{ color: 'rgba(248,246,242,0.6)', maxWidth: 520, margin: '0 auto' }}>Purpose-built modules that integrate with your existing systems and scale with your institution.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOLUTIONS.map((s) => (
                <motion.button key={s.id} {...up(s.id * 0.08)} onClick={() => setActiveSolution(s.id)}
                  style={{ textAlign: 'left', padding: '16px 20px', borderRadius: 10, border: activeSolution === s.id ? '2px solid var(--or)' : '2px solid rgba(255,255,255,0.1)', background: activeSolution === s.id ? 'rgba(232,99,26,0.1)' : 'rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.3s' }}>
                  <div style={{ fontWeight: 700, color: activeSolution === s.id ? 'var(--or)' : 'var(--ow)', fontSize: '0.95rem' }}>{s.label}</div>
                </motion.button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeSolution} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}
                style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 36, border: '1px solid rgba(255,255,255,0.1)', minHeight: 200 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--or)', marginBottom: 12, letterSpacing: 1 }}>SOLUTION</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ow)', marginBottom: 16 }}>{SOLUTIONS[activeSolution].label}</h3>
                <p style={{ color: 'rgba(248,246,242,0.7)', lineHeight: 1.75 }}>{SOLUTIONS[activeSolution].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* USE CASES "" cream */}
      <section style={{ background: 'var(--ow)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Built for Every Type of Institution</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 520, margin: '0 auto' }}>From K-12 to universities, vocational schools to online academies.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: '🏫', title: 'K-12 Schools', desc: 'Parent communication automation, student progress alerts, and attendance management.' },
              { icon: 'ðŸŽ"', title: 'Universities', desc: 'End-to-end admissions automation, student services, and alumni engagement.' },
              { icon: '💻', title: 'EdTech Platforms', desc: 'AI-powered student success tools, churn prediction, and personalized learning paths.' },
              { icon: '📧', title: 'Vocational Training', desc: 'Industry placement automation, skills tracking, and employer partnership management.' },
            ].map((u, i) => (
              <motion.div key={i} {...up(i * 0.1)} style={{ padding: '28px 24px', borderRadius: 16, background: '#fff', border: '1px solid rgba(13,27,46,0.08)' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{u.icon}</div>
                <h4 style={{ fontWeight: 700, color: 'var(--nvd)', marginBottom: 8, fontSize: '1.05rem' }}>{u.title}</h4>
                <p style={{ color: 'var(--gr)', lineHeight: 1.65, fontSize: '0.9rem' }}>{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION "" white */}
      <section style={{ background: '#fff', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--nvd)', marginBottom: 12 }}>Integrates with Your Education Stack</h2>
            <p style={{ color: 'var(--gr)', maxWidth: 480, margin: '0 auto' }}>Pre-built connectors for the platforms your institution already uses.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
            {['Canvas LMS', 'Blackboard', 'Moodle', 'Salesforce Edu', 'Banner ERP', 'Ellucian', 'Google Workspace', 'Microsoft Teams', 'Zoom', 'Slate CRM'].map((t, i) => (
              <motion.div key={i} {...up(i * 0.06)} style={{ padding: '14px 16px', borderRadius: 10, border: '1.5px solid rgba(13,27,46,0.1)', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--nvd)', background: 'var(--ice)' }}>{t}</motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS "" deep dark */}
      <section style={{ background: '#060E1A', padding: '80px 24px', backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 12 }}>Real Results from Real Institutions</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[
              { school: 'Horizon University', result: '62% increase in enrollment conversions', detail: 'Automated admissions follow-ups and AI chat reduced drop-off from inquiry to application.', stat: '+62%' },
              { school: 'Global EdTech Academy', result: '89% student retention rate', detail: 'AI early-warning system flagged at-risk students 6 weeks before withdrawal, enabling timely intervention.', stat: '89%' },
              { school: 'TechSkills Institute', result: '38 hours saved per faculty/week', detail: 'Automated grading, feedback generation, and reporting freed instructors for mentorship.', stat: '38hrs' },
            ].map((r, i) => (
              <motion.div key={i} {...up(i * 0.12)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32 }}>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--or)', fontFamily: 'var(--font-number)', marginBottom: 12 }}>{r.stat}</div>
                <div style={{ fontWeight: 700, color: 'var(--ow)', fontSize: '1.05rem', marginBottom: 10 }}>{r.result}</div>
                <div style={{ fontSize: '0.88rem', color: 'rgba(248,246,242,0.55)', lineHeight: 1.65 }}>{r.detail}</div>
                <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--or)', fontWeight: 600 }}>"" {r.school}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ "" light ice */}
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

      {/* CTA "" dark */}
      <section style={{ background: 'var(--nvd)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <motion.h2 {...up(0)} style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--ow)', marginBottom: 16 }}>
            Ready to Transform Your <span style={{ color: 'var(--or)' }}>Institution?</span>
          </motion.h2>
          <motion.p {...up(0.1)} style={{ color: 'rgba(248,246,242,0.65)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>
            Join 200+ educational institutions already using AI Agentix to improve enrollment, retention, and student outcomes.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ background: 'var(--or)', color: '#fff', padding: '16px 40px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>Get Started Today</a>
            <a href="/case-studies" style={{ border: '2px solid rgba(248,246,242,0.3)', color: 'var(--ow)', padding: '16px 40px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: '1rem' }}>See Case Studies</a>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </div>
  );
}

