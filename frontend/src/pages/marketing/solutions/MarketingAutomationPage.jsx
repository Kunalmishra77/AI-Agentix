import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Zap, BarChart3, CheckCircle, ArrowRight, ChevronRight, Clock, Target, Globe, Megaphone, PenTool, TrendingUp, Mail } from 'lucide-react';
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
      const tick = (ts) => { if (!s) s = ts; const p = Math.min((ts - s) / dur, 1); setCount(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, dur]);
  return [count, ref];
}

const TABS = [
  {
    label: 'Content Engine', icon: <PenTool size={16} />,
    title: 'AI Content Factory "" Zero Effort',
    desc: 'Blog posts, social content, email sequences, ad copy "" all generated, brand-checked, and scheduled automatically. Your content pipeline runs while you sleep.',
    points: ['SEO-optimized blog automation', 'Brand voice enforcement', 'Multi-format repurposing', 'Auto-publish to CMS + social'],
  },
  {
    label: 'Campaign Manager', icon: <Target size={16} />,
    title: 'Campaigns That Run Themselves',
    desc: 'Plan, execute, and optimize campaigns across all channels from one AI-powered command center. A/B testing, budget optimization, and creative refresh "" automated.',
    points: ['Multi-channel campaign orchestration', 'Automatic A/B test selection', 'Budget reallocation engine', 'Creative performance scoring'],
  },
  {
    label: 'Lead Nurturing', icon: <Mail size={16} />,
    title: 'Nurture Sequences That Convert',
    desc: 'Behavioral triggers, lead scoring, and personalized nurture paths. Every lead gets the right message at the right time based on their actions and intent signals.',
    points: ['Behavioral email triggers', 'Dynamic lead scoring', 'Personalized nurture journeys', 'CRM sync on every action'],
  },
  {
    label: 'Analytics & ROI', icon: <BarChart3 size={16} />,
    title: 'Attribution That Actually Works',
    desc: 'First-touch, last-touch, and multi-touch attribution across all channels. Know exactly which campaigns drive revenue "" not just traffic.',
    points: ['Multi-touch attribution', 'Channel ROI comparison', 'Revenue attribution reports', 'Real-time campaign dashboards'],
  },
  {
    label: 'SEO Intelligence', icon: <Globe size={16} />,
    title: 'Dominate Search "" Automatically',
    desc: 'Topic cluster strategy, keyword gap analysis, and content briefs generated weekly. SEO recommendations applied to all content in real time.',
    points: ['Topic cluster automation', 'Keyword opportunity alerts', 'Content brief generation', 'On-page SEO enforcement'],
  },
];

const STEPS = [
  { n: '01', t: 'Strategy Defined', d: 'AI maps goals to channel mix and content plan' },
  { n: '02', t: 'Content Generated', d: 'Blogs, ads, emails, and social posts created' },
  { n: '03', t: 'Campaigns Launched', d: 'Multi-channel execution with A/B testing' },
  { n: '04', t: 'Leads Captured', d: 'Form fills, clicks, and intent tracked' },
  { n: '05', t: 'Leads Nurtured', d: 'Automated sequences convert prospects' },
  { n: '06', t: 'ROI Reported', d: 'Revenue attribution, channel comparison' },
];

const FAQS = [
  ['How does the AI maintain brand voice?', 'You upload brand guidelines, tone samples, and approved copy. The AI learns your voice and enforces it on every output before scheduling.'],
  ['Which platforms does it publish to?', 'WordPress, Webflow, Shopify, LinkedIn, Instagram, Facebook, and any CMS with an API. More integrations added regularly.'],
  ['Can I still review content before it goes live?', 'Absolutely. Every workflow includes approval checkpoints. You decide which content is auto-published vs. human-reviewed.'],
  ['How long until I see results?', 'Most clients see a measurable lift in organic traffic within 60 days and lead volume improvement within 90 days.'],
  ['Does it replace my marketing team?', 'No "" it removes 80% of production work so your team can focus on strategy, brand decisions, and creativity.'],
];

export default function MarketingAutomationPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(6);
  const [n2, r2] = useCountUp(280);
  const [n3, r3] = useCountUp(90);
  const [n4, r4] = useCountUp(4);

  return (
    <>
      <Helmet><title>Marketing Automation | AI Agentix</title></Helmet>
      <SiteNav />
      <VoiceAgentWidget />

      {/* 1. HERO */}
      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: '40px clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Zap size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Marketing Automation</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              6x Your Marketing Output With <span style={{ color: 'var(--or)' }}>AI-Powered</span> Automation
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              Content, campaigns, lead nurturing, and analytics "" all running on autopilot. Your marketing machine works 24/7 while your team focuses on strategy and growth.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Get Marketing Audit <ArrowRight size={16} />
              </Link>
              <Link to="/ai-studio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                See AI Studio
              </Link>
            </motion.div>
          </div>
          {/* Campaign feed widget */}
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Campaign Activity "" Live</div>
            {[
              { label: 'Blog: "AI for SMBs"', status: 'Published', channel: 'SEO', color: '#10B981' },
              { label: 'Email: Nurture Seq #4', status: 'Sent to 2,840', channel: 'Email', color: 'var(--or)' },
              { label: 'LinkedIn Ad: Q2 Push', status: 'Optimizing', channel: 'Paid', color: '#6366F1' },
              { label: 'Instagram Reel', status: 'Scheduled 10am', channel: 'Social', color: '#EC4899' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0, boxShadow: `0 0 8px ${item.color}` }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{item.status}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: item.color, background: `${item.color}15`, padding: '2px 8px', borderRadius: 6 }}>{item.channel}</span>
              </motion.div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              7 pieces created Â· 3 campaigns live Â· 128 leads today
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[
            { r: r1, n: n1, s: 'x', l: 'More Content Output', sub: 'same team size' },
            { r: r2, n: n2, s: '%', l: 'Increase in Organic Traffic', sub: 'within 90 days' },
            { r: r3, n: n3, s: '%', l: 'Email Open Rate Lift', sub: 'vs. generic sequences' },
            { r: r4, n: n4, s: 'x', l: 'Faster Campaign Launch', sub: 'from brief to live' },
          ].map((stat, i) => (
            <motion.div key={i} {...up(i * 0.1)} ref={stat.r} style={{ textAlign: 'center', padding: '32px 20px', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 16 }}>
              <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(48px,4vw,72px)', fontWeight: 700, color: 'var(--or)', lineHeight: 1 }}>{stat.n}{stat.s}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--nvd)', marginTop: 10 }}>{stat.l}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4, fontFamily: 'var(--font-body)' }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CAPABILITIES "" TABS */}
      <section style={{ background: 'var(--ice)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Full-Stack Marketing AI</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Every marketing function "" automated</h2>
          </motion.div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {TABS.map((tab, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, background: activeTab === i ? 'var(--nvd)' : 'rgba(0,0,0,0.06)', color: activeTab === i ? '#fff' : 'var(--nvd)', transition: 'all 0.2s' }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }}
              style={{ background: '#fff', borderRadius: 20, padding: 40, border: '1px solid rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: 'var(--nvd)', marginBottom: 16 }}>{TABS[activeTab].title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#4B5563', lineHeight: 1.7 }}>{TABS[activeTab].desc}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {TABS[activeTab].points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: 'rgba(232,99,26,0.05)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.1)' }}>
                    <CheckCircle size={15} color="var(--or)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'var(--nvd)' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section style={{ background: 'var(--nvd)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>The Marketing Engine</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Strategy to revenue "" fully connected</h2>
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

      {/* 5. CHANNELS */}
      <section style={{ background: 'var(--ow)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Channel Coverage</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Every channel. One AI command center.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { name: 'SEO & Blog', icon: '📍', desc: 'Rank for high-intent keywords' },
              { name: 'Email Marketing', icon: '📧', desc: 'Automated nurture sequences' },
              { name: 'LinkedIn', icon: '💼', desc: 'B2B lead generation & content' },
              { name: 'Instagram & Facebook', icon: '📸', desc: 'Visual content & paid ads' },
              { name: 'Google Ads', icon: '📢', desc: 'Search & display campaigns' },
              { name: 'WhatsApp', icon: '💬', desc: 'Direct conversion channel' },
              { name: 'YouTube', icon: '▶ï¸', desc: 'Video content & SEO' },
              { name: 'Landing Pages', icon: '🎯', desc: 'Conversion-optimized pages' },
            ].map((ch, i) => (
              <motion.div key={i} {...up(i * 0.05)} style={{ padding: '20px 18px', background: '#fff', borderRadius: 14, border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{ch.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--nvd)', marginBottom: 4 }}>{ch.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#9CA3AF' }}>{ch.desc}</div>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Marketing results that move the needle</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'D2C Fashion Brand', result: '6x content output, 40% traffic growth', detail: 'Went from 2 blogs/month to 14 with the same team, driving 280% organic traffic increase in 4 months', time: '4 months' },
              { name: 'B2B HR Tech SaaS', result: '380 MQLs in 60 days from content alone', detail: 'AI topic cluster strategy and content automation filled the top of funnel without ad spend increase', time: '60 days' },
              { name: 'Real Estate Agency', result: '12x WhatsApp campaign ROI', detail: 'Automated lead nurturing via WhatsApp converted 34% of cold leads to site visits', time: '3 months' },
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Marketing Automation "" Questions Answered</h2>
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
            Ready to Automate Your Marketing?
          </motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>
            Get a free marketing audit and discover exactly which parts of your marketing can be automated this month.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Get Free Marketing Audit <ArrowRight size={18} />
            </Link>
            <Link to="/ai-studio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              Explore AI Studio
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

