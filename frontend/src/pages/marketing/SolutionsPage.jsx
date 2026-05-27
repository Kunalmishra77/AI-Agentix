import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, MessageSquare, Sparkles, BarChart3, Users, ShoppingCart,
  Workflow, Bot, CheckCircle, ArrowRight, ChevronRight, Zap,
  Clock, DollarSign, TrendingUp, Shield, X, Check, Rocket,
  Brain, Package, Globe, Building2,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const left = (d = 0) => ({ initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const right = (d = 0) => ({ initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const CATEGORIES = ['All', 'Sales & Revenue', 'Customer Support', 'Marketing', 'Operations', 'Analytics'];

const SOLUTIONS = [
  {
    id: 'sales-agent', cat: 'Sales & Revenue', color: '#E8631A',
    icon: <Target size={22} />,
    title: 'AI Sales Agent',
    tagline: 'Never Miss a Lead Again',
    desc: 'Deploy an AI agent that qualifies every inbound lead within 90 seconds, scores them by purchase intent, routes to the right rep, and follows up automatically across WhatsApp, email, and phone.',
    features: ['Lead qualification in < 90 seconds', 'Intent scoring & CRM auto-update', 'Multi-channel follow-up sequences', 'Real-time sales pipeline visibility'],
    stat: '340%', statLabel: 'more qualified meetings',
    time: '2""3 weeks', roi: '8""12x',
  },
  {
    id: 'support', cat: 'Customer Support', color: '#6366F1',
    icon: <MessageSquare size={22} />,
    title: 'AI Support Agent',
    tagline: 'Support at Scale, Zero Burnout',
    desc: '24/7 AI support that resolves 80% of tickets instantly, understands context from previous conversations, escalates complex cases with full history, and learns from every interaction.',
    features: ['80% auto-resolution rate', 'Seamless human escalation', 'Multi-language (EN, HI, and more)', 'Integrates with Zendesk, Freshdesk'],
    stat: '80%', statLabel: 'tickets resolved without human',
    time: '2""3 weeks', roi: '6""10x',
  },
  {
    id: 'content', cat: 'Marketing', color: '#EC4899',
    icon: <Sparkles size={22} />,
    title: 'AI Content Engine',
    tagline: 'Content Factory on Autopilot',
    desc: 'From keyword brief to published post "" fully automated. AI researches topics, writes SEO-optimized content, generates images, and schedules across your CMS and social channels.',
    features: ['Full blog automation pipeline', 'Brand voice training', 'Auto-publish to CMS & social', 'SEO metadata + internal linking'],
    stat: '10x', statLabel: 'content output, same team',
    time: '1""2 weeks', roi: '5""8x',
  },
  {
    id: 'analytics', cat: 'Analytics', color: '#0EA5E9',
    icon: <BarChart3 size={22} />,
    title: 'Business Intelligence',
    tagline: 'Real-Time Decisions, Not Gut Feels',
    desc: 'Pull data from every tool into one live dashboard. AI detects anomalies, forecasts revenue, surfaces insights, and sends WhatsApp alerts before small problems become big ones.',
    features: ['All data sources unified', 'Anomaly detection & alerts', 'Revenue & churn forecasting', 'Custom KPI dashboards'],
    stat: '2.4x', statLabel: 'faster business decisions',
    time: '3""4 weeks', roi: '4""7x',
  },
  {
    id: 'hr', cat: 'Operations', color: '#10B981',
    icon: <Users size={22} />,
    title: 'HR & Ops Automation',
    tagline: 'Ops That Run Without You',
    desc: 'Automate your entire HR workflow "" resume screening, interview scheduling, offer letters, onboarding, leave approvals, and payroll triggers. HR focuses on people, not paperwork.',
    features: ['Resume screening automation', 'Interview scheduling flows', 'Automated onboarding checklists', 'Leave & payroll integrations'],
    stat: '60%', statLabel: 'reduction in HR admin time',
    time: '3""4 weeks', roi: '5""9x',
  },
  {
    id: 'ecom', cat: 'Sales & Revenue', color: '#F59E0B',
    icon: <ShoppingCart size={22} />,
    title: 'E-commerce Automation',
    tagline: 'Scale Orders, Not Overheads',
    desc: 'Real-time inventory sync, automated order processing, abandoned cart recovery, and personalised customer win-back campaigns. Works with Shopify, WooCommerce, and custom stores.',
    features: ['Real-time inventory sync', 'Abandoned cart recovery', 'Order status automation', 'Review request sequences'],
    stat: '28%', statLabel: 'increase in repeat purchases',
    time: '2""3 weeks', roi: '6""10x',
  },
  {
    id: 'workflow', cat: 'Operations', color: '#8B5CF6',
    icon: <Workflow size={22} />,
    title: 'Workflow Automation',
    tagline: 'Connect Every Tool. Eliminate Every Bottleneck.',
    desc: 'Map and automate your entire business workflow "" data entry, approvals, reporting, invoice generation, and cross-platform sync. Zero manual work, zero errors.',
    features: ['200+ tool integrations', 'Auto-generated reports', 'Approval & escalation flows', 'Error-free billing automation'],
    stat: '12x', statLabel: 'faster task completion',
    time: '3""5 weeks', roi: '7""12x',
  },
  {
    id: 'voice', cat: 'Customer Support', color: '#F43F5E',
    icon: <Bot size={22} />,
    title: 'AI Voice Agent',
    tagline: 'Your 24/7 Phone Receptionist',
    desc: 'Handle inbound calls, book appointments, answer FAQs, and qualify leads "" all via a natural-sounding AI voice agent that works in English and Hindi, 24 hours a day.',
    features: ['Natural voice in EN & HI', 'Appointment booking & reminders', 'FAQ handling & escalation', 'Call recordings & transcripts'],
    stat: '65%', statLabel: 'reduction in missed calls',
    time: '2""3 weeks', roi: '5""8x',
  },
];

const PROCESS = [
  { num: '01', title: 'Discovery Call', desc: 'We audit your workflows, identify the highest-ROI automation, and give you a precise timeline and cost estimate.', duration: '30 min' },
  { num: '02', title: 'Architecture Design', desc: 'Our engineers map the exact automation stack, integrations, and AI models for your specific use case.', duration: '3""5 days' },
  { num: '03', title: 'Build & Test', desc: 'We build, integrate, and stress-test every automation against real business scenarios before you see it.', duration: '2""4 weeks' },
  { num: '04', title: 'Go Live & Optimize', desc: 'Launch with confidence. We monitor performance and iterate until every KPI is hit.', duration: 'Ongoing' },
];

export default function SolutionsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSol, setActiveSol] = useState(SOLUTIONS[0]);

  const filtered = activeFilter === 'All' ? SOLUTIONS : SOLUTIONS.filter(s => s.cat === activeFilter);

  return (
    <>
      <Helmet>
        <title>AI Solutions "" AI Agentix</title>
        <meta name="description" content="AI agents and automation for sales, support, marketing, HR, and operations. Built for Indian businesses." />
      </Helmet>
      <SiteNav />

      {/* ⓀⓀ 1. HERO "" Dark ⓀⓀ */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: 100, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <Zap size={13} color="#E8631A" />
            <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>8 Production-Ready Solutions</span>
          </motion.div>
          <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            AI Built for Every<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Business Function</span>
          </motion.h1>
          <motion.p {...up(0.14)} style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 580, margin: '0 auto 40px', fontFamily: 'var(--font-body)' }}>
            From lead generation to HR automation "" every solution is custom-built for your workflows and deployed in 2""4 weeks.
          </motion.p>
          {/* Category filter pills */}
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                style={{ padding: '8px 20px', borderRadius: 100, border: `1px solid ${activeFilter === cat ? '#E8631A' : 'rgba(255,255,255,0.15)'}`, background: activeFilter === cat ? '#E8631A' : 'transparent', color: activeFilter === cat ? '#fff' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 2. SOLUTIONS EXPLORER "" WHITE, left list + right panel ⓀⓀ */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, alignItems: 'start' }}>
          {/* Left: filtered solution list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <AnimatePresence>
              {filtered.map(sol => (
                <motion.button key={sol.id} layout initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}
                  onClick={() => setActiveSol(sol)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left', background: activeSol.id === sol.id ? `${sol.color}10` : '#F9FAFB', borderLeft: `3px solid ${activeSol.id === sol.id ? sol.color : 'transparent'}`, transition: 'all 0.2s' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${sol.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: sol.color, flexShrink: 0 }}>{sol.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: activeSol.id === sol.id ? '#0D1B2E' : '#374151' }}>{sol.title}</div>
                    <div style={{ fontSize: 11, color: sol.color, fontFamily: 'var(--font-body)', fontWeight: 500 }}>{sol.cat}</div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: detail panel */}
          <AnimatePresence mode="wait">
            <motion.div key={activeSol.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}
              style={{ background: `${activeSol.color}06`, border: `1px solid ${activeSol.color}25`, borderRadius: 24, padding: 44 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeSol.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeSol.color }}>{activeSol.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: activeSol.color, fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 }}>{activeSol.cat}</div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#0D1B2E', margin: 0 }}>{activeSol.title}</h2>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-number)', fontSize: 32, fontWeight: 700, color: activeSol.color, lineHeight: 1 }}>{activeSol.stat}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginTop: 4 }}>{activeSol.statLabel}</div>
                </div>
              </div>
              <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.75, marginBottom: 28, fontFamily: 'var(--font-body)' }}>{activeSol.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 32 }}>
                {activeSol.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={14} color={activeSol.color} />
                    <span style={{ fontSize: 14, color: '#374151', fontFamily: 'var(--font-body)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '20px 24px', background: '#F9FAFB', borderRadius: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginBottom: 4 }}>DEPLOYMENT TIME</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#0D1B2E', fontSize: 15 }}>{activeSol.time}</div>
                </div>
                <div style={{ width: 1, height: 36, background: '#E5E7EB' }} />
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginBottom: 4 }}>TYPICAL ROI</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: activeSol.color, fontSize: 15 }}>{activeSol.roi} return</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: activeSol.color, color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, padding: '12px 22px', borderRadius: 10, textDecoration: 'none' }}>
                    Get Started <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ⓀⓀ 3. PROCESS "" LIGHT ICE, timeline ⓀⓀ */}
      <section style={{ background: '#F0F4F8', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>How It Works</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>From Discovery to Deployment</h2>
            <p style={{ fontSize: 16, color: '#6B7280', marginTop: 12, fontFamily: 'var(--font-body)', maxWidth: 520, margin: '12px auto 0' }}>Four clear steps. No surprises. You know exactly what happens at every stage.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, position: 'relative' }}>
            {/* Connector line */}
            <div style={{ position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(to right,#E8631A,#6366F1,#10B981,#F59E0B)' }} />
            {PROCESS.map((step, i) => (
              <motion.div key={step.num} {...up(i * 0.1)} style={{ padding: '0 20px', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: '#fff', border: '2px solid #E8631A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 4px 16px rgba(232,99,26,0.15)', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 18, fontWeight: 700, color: '#E8631A' }}>{step.num}</span>
                </div>
                <div style={{ display: 'inline-block', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 100, padding: '3px 12px', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, color: '#6B7280', fontFamily: 'var(--font-body)' }}>{step.duration}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#0D1B2E', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 4. COMPARISON "" Dark, table ⓀⓀ */}
      <section style={{ background: '#0D1B2E', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The Difference</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>Manual vs Automated Business</h2>
          </motion.div>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(255,255,255,0.05)' }}>
              {['Metric', 'Manual Operations', 'With AI Agentix'].map((h, i) => (
                <div key={h} style={{ padding: '18px 28px', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: i === 2 ? '#E8631A' : 'rgba(255,255,255,0.5)' }}>{h}</div>
              ))}
            </div>
            {[
              { m: 'Lead Response Time', bad: '4""8 hours average', good: '< 90 seconds' },
              { m: 'Support Resolution', bad: '24""48 hours', good: '< 4 minutes (80% auto)' },
              { m: 'Report Generation', bad: 'Weekly, manual', good: 'Real-time, automated' },
              { m: 'Content Output', bad: '4 posts/month per person', good: '40+ pieces/month, same team' },
              { m: 'Error Rate', bad: '3""8% in data entry', good: 'Near zero with validation' },
              { m: 'Operating Cost', bad: 'Grows linearly with volume', good: 'Fixed cost, unlimited scale' },
            ].map((row, i) => (
              <motion.div key={row.m} {...up(i * 0.05)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                <div style={{ padding: '18px 28px', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#fff' }}>{row.m}</div>
                <div style={{ padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <X size={13} color="#ef4444" /><span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{row.bad}</span>
                </div>
                <div style={{ padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Check size={13} color="#E8631A" /><span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)' }}>{row.good}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 5. CTA "" White ⓀⓀ */}
      <section style={{ background: '#fff', padding: '96px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Start Today</span>
          </motion.div>
          <motion.h2 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, margin: '16px 0 20px' }}>
            Which Solution Does<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Your Business Need?</span>
          </motion.h2>
          <motion.p {...up(0.12)} style={{ fontSize: 17, color: '#6B7280', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Book a free discovery call. We'll identify the highest-ROI automation for your workflows and show you exactly what we'd build.
          </motion.p>
          <motion.div {...up(0.18)} style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.3)' }}>
              Book Free Discovery Call <ArrowRight size={17} />
            </Link>
            <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #E5E7EB', color: '#0D1B2E', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              See Results
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}

