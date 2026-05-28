import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Zap, Brain, Target, HeartHandshake, Shield, Award,
  TrendingUp, Users, Globe, CheckCircle, Star, Quote,
  Lightbulb, Rocket, Clock, BarChart3, ChevronRight,
  Code2, Sparkles, Heart, Building2,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const left = (d = 0) => ({ initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const right = (d = 0) => ({ initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

function useCountUp(target, dur = 1800) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; obs.disconnect();
      const s = performance.now();
      const tick = (n) => { const p = Math.min((n - s) / dur, 1); setV(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); else setV(target); };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, [target, dur]);
  return [v, ref];
}

const STATS = [
  { num: 200, suffix: '+', label: 'Businesses Automated' },
  { num: 97, suffix: '%', label: 'Client Satisfaction' },
  { num: 50, suffix: 'Cr+', label: 'Revenue Generated' },
  { num: 4, suffix: '+', label: 'Years of Experience' },
];

const TIMELINE = [
  { year: '2020', title: 'Founded in Pune', desc: 'Started as a 3-person team building chatbots for local businesses. First client: a real estate firm that needed automated lead follow-up.', color: '#E8631A' },
  { year: '2021', title: 'First 10 Clients', desc: 'Expanded to healthcare and education sectors. Built our first AI voice agent for a hospital chain, reducing no-shows by 65%.', color: '#6366F1' },
  { year: '2022', title: 'Scaling Up', desc: 'Grew to 25 team members. Launched our proprietary automation framework. Revenue generated for clients crossed ₹10 Crore.', color: '#10B981' },
  { year: '2023', title: 'Pan-India Expansion', desc: 'Offices in Mumbai, Bangalore, Delhi. 100+ active deployments. Featured in Economic Times as a top AI startup to watch.', color: '#F59E0B' },
  { year: '2024', title: 'AI-First Platform', desc: 'Launched the AI Agentix platform "" a unified dashboard for deploying, managing, and optimizing all automations in one place.', color: '#EC4899' },
  { year: '2025', title: 'Market Leader', desc: '200+ businesses, ₹50Cr+ revenue generated, 97% client satisfaction. Building the next generation of agentic AI for Indian businesses.', color: '#E8631A' },
];

const VALUES = [
  { icon: <Target size={24} />, title: 'Results First',
    desc: 'Every engagement starts with a measurable ROI target. We don\'t ship unless the numbers move.',
    items: ['Defined KPIs before project kickoff', 'Live ROI dashboard from day one', 'Monthly performance reviews', 'Results-tied milestone payments'],
    stat: '8x', statLabel: 'average client ROI', color: '#E8631A' },
  { icon: <HeartHandshake size={24} />, title: 'Partnership Mindset',
    desc: 'We\'re not vendors. We\'re embedded in your team until the system works — and well after.',
    items: ['Dedicated account manager per client', 'Weekly sync calls included', 'Slack access to engineering team', 'No ghosting after go-live'],
    stat: '97%', statLabel: 'client retention rate', color: '#6366F1' },
  { icon: <Lightbulb size={24} />, title: 'Radical Simplicity',
    desc: 'Complex AI, simple interfaces. If your team can\'t use it in 2 hours, we rebuild it.',
    items: ['No-code dashboards for non-tech teams', 'Training sessions for all users', '2-hour onboarding guarantee', 'Plain-language documentation'],
    stat: '2 hrs', statLabel: 'avg. team onboarding time', color: '#10B981' },
  { icon: <Shield size={24} />, title: 'Enterprise Grade Security',
    desc: 'ISO 27001 aligned. Your data never leaves Indian servers without explicit consent.',
    items: ['Data hosted on Indian cloud servers', 'End-to-end encryption at rest & transit', 'Role-based access controls', 'DPDP Act 2023 compliant'],
    stat: '0', statLabel: 'data breaches since founding', color: '#F59E0B' },
  { icon: <TrendingUp size={24} />, title: 'Continuous Improvement',
    desc: 'We monitor every automation post-launch and retrain models on your data every quarter.',
    items: ['Automated performance monitoring', 'Quarterly model retraining included', 'Proactive alert on anomalies', 'Free minor updates for 12 months'],
    stat: '99.6%', statLabel: 'average system uptime', color: '#EC4899' },
  { icon: <Globe size={24} />, title: 'Indian Context Expertise',
    desc: 'Built for India — multilingual, WhatsApp-first, Razorpay-integrated, GST-aware automation.',
    items: ['Hindi, Tamil, Marathi, Bengali AI', 'WhatsApp Business API certified', 'Tally, Zoho, Razorpay integrations', 'GST & Indian compliance baked in'],
    stat: '15+', statLabel: 'Indian languages supported', color: '#0EA5E9' },
];

const TEAM = [
  { name: 'Anant Sanadhya', role: 'Founder & CEO', bg: '#E8631A', initial: 'A', desc: 'Visionary entrepreneur and AI strategist. Founded AGENTiX to make cutting-edge AI automation accessible to every Indian business, from startups to enterprises.', linkedin: '#' },
  { name: 'Priya Nair', role: 'Head of Technology', bg: '#6366F1', initial: 'P', desc: 'ML Engineer with deep expertise in LLMs and agentic systems. Builds the AI models and automation pipelines that power our client deployments.', linkedin: '#' },
  { name: 'Rahul Singh', role: 'Head of Delivery', bg: '#10B981', initial: 'R', desc: '8 years in automation consulting. Manages every client engagement from discovery to go-live, ensuring on-time delivery every time.', linkedin: '#' },
  { name: 'Sneha Kapoor', role: 'Head of Growth', bg: '#F59E0B', initial: 'S', desc: 'Growth marketer turned AI advocate. Runs partnerships, events, and the India-wide expansion strategy.', linkedin: '#' },
];

const WHY_US = [
  { label: 'Team', us: '15+ ML engineers + domain consultants', them: 'Freelancers or generalist agencies' },
  { label: 'Focus', us: 'India-specific: WhatsApp, GST, multilingual', them: 'Western tools retrofitted for India' },
  { label: 'Approach', us: 'Custom-built for your workflows', them: 'Off-the-shelf templates' },
  { label: 'Support', us: 'Dedicated account manager + 4hr SLA', them: 'Ticket queue, no dedicated contact' },
  { label: 'Pricing', us: 'Transparent, value-based', them: 'Hidden fees, per-seat charges' },
];

function StatBlock({ num, suffix, label }) {
  const [v, ref] = useCountUp(num);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(40px,4vw,60px)', fontWeight: 700, color: '#E8631A', lineHeight: 1 }}>{v}{suffix}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#0D1B2E', marginTop: 8 }}>{label}</div>
    </div>
  );
}

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <>
      <Helmet>
        <title>About AI Agentix "" India's AI Automation Experts</title>
        <meta name="description" content="Meet the team behind India's leading AI automation agency. 200+ businesses automated, ₹50Cr+ revenue generated." />
      </Helmet>
      <SiteNav />

      {/* ⓀⓀ 1. HERO "" Dark, left-copy + right orbital ⓀⓀ */}
      <section style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #0F2240 100%)', minHeight: '72vh', display: 'flex', alignItems: 'center', paddingTop: 100, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '0', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Sparkles size={13} color="#E8631A" />
              <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Our Story</span>
            </motion.div>
            <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              We Exist to Make AI<br />
              <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Work for Every Business</span>
            </motion.h1>
            <motion.p {...up(0.14)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36, maxWidth: 500, fontFamily: 'var(--font-body)' }}>
              AI Agentix was built on one belief: automation shouldn't be reserved for enterprises with million-dollar budgets. Every business in India "" from a 5-person startup to a 500-person company "" deserves AI that works for them.
            </motion.p>
            <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16 }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, padding: '13px 26px', borderRadius: 12, textDecoration: 'none' }}>
                Work With Us <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, padding: '13px 26px', borderRadius: 12, textDecoration: 'none' }}>
                Our Work <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
          {/* Right: orbital rings with stat nodes */}
          <motion.div {...right(0.25)} style={{ position: 'relative', width: 400, height: 400, flexShrink: 0, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Ambient glow */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.18) 0%, transparent 68%)', pointerEvents: 'none' }} />
            {/* Rotating rings */}
            {[{ r: 110, speed: 14 }, { r: 155, speed: 22 }, { r: 190, speed: 32 }].map(({ r, speed }, i) => (
              <motion.div key={r}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', width: r * 2, height: r * 2, borderRadius: '50%', border: `1.5px solid rgba(232,99,26,${0.28 - i * 0.06})` }}>
                {/* Orbiting dot */}
                <div style={{ position: 'absolute', top: -4, left: '50%', marginLeft: -4, width: 8, height: 8, borderRadius: '50%', background: `rgba(232,99,26,${0.7 - i * 0.2})`, boxShadow: `0 0 10px rgba(232,99,26,0.7)` }} />
              </motion.div>
            ))}
            {/* Center brain */}
            <div style={{ position: 'relative', zIndex: 2, width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg, #E8631A, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 10px rgba(232,99,26,0.12), 0 0 40px rgba(232,99,26,0.45)' }}>
              <Brain size={34} color="#fff" />
            </div>
            {/* Stat nodes at cardinal positions */}
            {[
              { label: '200+', sub: 'Clients',      color: '#E8631A', style: { top: 0,    left: '50%', transform: 'translateX(-50%)' } },
              { label: '97%',  sub: 'Satisfaction', color: '#6366F1', style: { top: '50%',left: 0,     transform: 'translateY(-50%)' } },
              { label: '₹50Cr',sub: 'Generated',    color: '#10B981', style: { bottom: 0, left: '50%', transform: 'translateX(-50%)' } },
              { label: '4+ Yrs',sub: 'Experience',  color: '#F59E0B', style: { top: '50%',right: 0,    transform: 'translateY(-50%)' } },
            ].map(({ label, sub, color, style }) => (
              <div key={label} style={{ position: 'absolute', ...style, background: '#0D1B2E', border: `1px solid ${color}55`, borderRadius: 10, padding: '8px 14px', textAlign: 'center', zIndex: 3, boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${color}22` }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 18, fontWeight: 700, color, lineHeight: 1 }}>{label}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginTop: 3 }}>{sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 2. STATS "" WHITE background ⓀⓀ */}
      <section style={{ background: '#fff', padding: '72px 0', borderBottom: '1px solid #F3F4F6' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ padding: '0 24px', borderRight: i < 3 ? '1px solid #E5E7EB' : 'none' }}>
                <StatBlock num={s.num} suffix={s.suffix} label={s.label} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 3. MISSION "" LIGHT ICE, 2-col ⓀⓀ */}
      <section style={{ background: '#F0F4F8', padding: '100px 0' }}>
        <div className="ax-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', padding: '0 40px' }}>
          <motion.div {...left(0)}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Our Mission</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.2, margin: '12px 0 20px' }}>
              Democratize AI for India's 63 Million Businesses
            </h2>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 24, fontFamily: 'var(--font-body)' }}>
              India has 63 million MSMEs. Less than 2% have adopted any form of AI automation. We're here to change that "" building systems that are affordable, practical, and built for how Indian businesses actually operate.
            </p>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 32, fontFamily: 'var(--font-body)' }}>
              Not Silicon Valley templates. Not English-only chatbots. AI that speaks Hindi, handles WhatsApp, integrates with Tally, and understands GST workflows.
            </p>
            {['WhatsApp-first approach', 'Hindi & regional language AI', 'Tally, Razorpay, Zoho integrations', 'India-specific compliance (GST, PDPA)'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <CheckCircle size={16} color="#E8631A" />
                <span style={{ fontSize: 14, color: '#374151', fontFamily: 'var(--font-body)' }}>{f}</span>
              </div>
            ))}
          </motion.div>
          <motion.div {...right(0.1)} style={{ background: '#fff', borderRadius: 20, padding: 40, boxShadow: '0 4px 32px rgba(0,0,0,0.06)', border: '1px solid #E5E7EB' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 28 }}>Our Vision for 2030</div>
            {[
              { num: '1M+', label: 'Businesses automated across India', color: '#E8631A' },
              { num: '₹500Cr', label: 'Revenue generated for clients', color: '#6366F1' },
              { num: '10', label: 'Cities with dedicated AI Agentix offices', color: '#10B981' },
              { num: '#1', label: 'AI automation agency in South Asia', color: '#F59E0B' },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 0', borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 28, fontWeight: 700, color: item.color, minWidth: 80 }}>{item.num}</div>
                <div style={{ fontSize: 14, color: '#4B5563', fontFamily: 'var(--font-body)' }}>{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 4. TIMELINE "" Dark, vertical journey ⓀⓀ */}
      <section style={{ background: '#0D1B2E', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Our Journey</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>5 Years of Building in Public</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 80px', position: 'relative' }}>
            {TIMELINE.map((item, i) => (
              <motion.div key={item.year} {...up(i * 0.08)} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 60, height: 60, borderRadius: 16, background: `${item.color}18`, border: `2px solid ${item.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 13, fontWeight: 700, color: item.color }}>{item.year}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 5. VALUES "" WHITE, interactive grid ⓀⓀ */}
      <section style={{ background: '#fff', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Our Values</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>Principles We Never Compromise On</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            {/* Left: clickable list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {VALUES.map((v, i) => (
                <motion.button key={v.title} {...up(i * 0.06)} onClick={() => setActiveValue(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 14, border: 'none', cursor: 'pointer', textAlign: 'left', background: activeValue === i ? `${v.color}08` : '#F9FAFB', borderLeft: `3px solid ${activeValue === i ? v.color : 'transparent'}`, transition: 'all 0.2s' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${v.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color, flexShrink: 0 }}>{v.icon}</div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: activeValue === i ? '#0D1B2E' : '#374151' }}>{v.title}</span>
                </motion.button>
              ))}
            </div>
            {/* Right: detail panel */}
            <AnimatePresence mode="wait">
              <motion.div key={activeValue} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
                style={{ background: `${VALUES[activeValue].color}08`, border: `1px solid ${VALUES[activeValue].color}25`, borderRadius: 20, padding: '36px 40px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: `${VALUES[activeValue].color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: VALUES[activeValue].color, flexShrink: 0 }}>
                    {VALUES[activeValue].icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#0D1B2E', margin: 0 }}>{VALUES[activeValue].title}</h3>
                </div>
                <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: 24 }}>{VALUES[activeValue].desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {VALUES[activeValue].items.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle size={15} color={VALUES[activeValue].color} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: '#374151', fontFamily: 'var(--font-body)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${VALUES[activeValue].color}12`, border: `1px solid ${VALUES[activeValue].color}28`, borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 30, fontWeight: 700, color: VALUES[activeValue].color, lineHeight: 1 }}>{VALUES[activeValue].stat}</span>
                  <span style={{ fontSize: 13, color: '#6B7280', fontFamily: 'var(--font-body)' }}>{VALUES[activeValue].statLabel}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ⓀⓀ 6. TEAM "" CREAM background ⓀⓀ */}
      <section style={{ background: '#F8F6F2', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The Team</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>Built by Engineers, Guided by Operators</h2>
            <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 560, marginTop: 12, fontFamily: 'var(--font-body)' }}>Every person at AI Agentix has either built software or run a business "" often both. That's why our solutions work in the real world.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {TEAM.map((t, i) => (
              <motion.div key={t.name} {...up(i * 0.08)} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
                style={{ background: '#fff', borderRadius: 20, padding: 28, boxShadow: '0 2px 20px rgba(0,0,0,0.06)', cursor: 'pointer' }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: `linear-gradient(135deg, ${t.bg}, ${t.bg}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 16 }}>{t.initial}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#0D1B2E', marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: t.bg, fontFamily: 'var(--font-body)', marginBottom: 12 }}>{t.role}</div>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 7. WHY US vs OTHERS "" Dark, comparison table ⓀⓀ */}
      <section style={{ background: '#0D1B2E', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Why Choose Us</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>AI Agentix vs The Alternatives</h2>
          </motion.div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(255,255,255,0.06)' }}>
              {['Category', 'Typical Agencies', 'AI Agentix'].map((h, i) => (
                <div key={h} style={{ padding: '18px 28px', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: i === 2 ? '#E8631A' : 'rgba(255,255,255,0.5)' }}>{h}</div>
              ))}
            </div>
            {WHY_US.map((row, i) => (
              <motion.div key={row.label} {...up(i * 0.06)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.06)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                <div style={{ padding: '18px 28px', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#fff' }}>{row.label}</div>
                <div style={{ padding: '18px 28px', fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0, display: 'inline-block' }} />{row.them}
                </div>
                <div style={{ padding: '18px 28px', fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E8631A', flexShrink: 0, display: 'inline-block' }} />{row.us}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 8. CTA "" Orange accent ⓀⓀ */}
      <section style={{ background: '#fff', padding: '96px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.08)', border: '1px solid rgba(232,99,26,0.2)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <Rocket size={14} color="#E8631A" />
            <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Ready to Start?</span>
          </motion.div>
          <motion.h2 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, marginBottom: 20 }}>
            Let's Build Something<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>That Actually Works</span>
          </motion.h2>
          <motion.p {...up(0.12)} style={{ fontSize: 17, color: '#6B7280', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Book a free 30-minute strategy call. No pitch decks. Just an honest conversation about your biggest workflow problems and what we can automate.
          </motion.p>
          <motion.div {...up(0.18)} style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.35)' }}>
              Book Free Strategy Call <ArrowRight size={17} />
            </Link>
            <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #E5E7EB', color: '#0D1B2E', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              See Case Studies
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}

