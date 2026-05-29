import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Smartphone, Mail, Target, PenLine, MessageSquare,
  Instagram, Linkedin, Youtube, Search, Globe, Brain,
  Check, ArrowRight, Zap, CheckCircle, TrendingUp, Clock, Star,
  Monitor, Phone, Package, Film, Bell, FileText, Mic2,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const left = (d = 0) => ({ initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const right = (d = 0) => ({ initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const CONTENT_TYPES = [
  { icon: <Video size={24} />, title: 'AI Videos', color: '#E8631A', desc: 'Explainer videos, reels, product demos — scripted, voiced, and edited by AI.', sample: 'Product launch reel — 30s, branded, auto-published to Instagram.' },
  { icon: <Smartphone size={24} />, title: 'Social Posts', color: '#6366F1', desc: 'Daily posts, carousels, stories across Instagram, LinkedIn, Facebook — planned and published by AI agents.', sample: 'LinkedIn thought-leadership — 800 words, industry-specific, 2.4K impressions.' },
  { icon: <Mail size={24} />, title: 'Email Campaigns', color: '#10B981', desc: 'Full nurture sequences, newsletters, transactional emails — written and sent at the right time.', sample: 'Welcome sequence — 7 emails, behaviour-triggered, 42% open rate.' },
  { icon: <Target size={24} />, title: 'Ad Creatives', color: '#F59E0B', desc: 'Google and Meta ad copy, creative briefs, A/B variants — generated and optimised autonomously.', sample: 'Facebook lead-gen — 5 variants, auto-optimised, ₹85 CPL.' },
  { icon: <PenLine size={24} />, title: 'Blog Articles', color: '#EC4899', desc: 'SEO-optimized blog content targeting buyer-intent keywords — researched, written, and published weekly.', sample: 'Blog: "AI in Indian Real Estate" — 1,200 words, rank on page 1.' },
  { icon: <MessageSquare size={24} />, title: 'WhatsApp Campaigns', color: '#25D366', desc: 'Targeted broadcasts, drip sequences, and personalised follow-ups via WhatsApp Business API.', sample: 'Diwali offer — 2,400 contacts, 98% delivered, 34% opened.' },
  { icon: <Monitor size={24} />, title: 'Landing Pages', color: '#0EA5E9', desc: 'High-converting campaign landing pages — written, designed (Webflow/WordPress), A/B tested, and published automatically.', sample: 'Lead gen page — 38% conversion rate, auto-connected to CRM.' },
  { icon: <Phone size={24} />, title: 'SMS / RCS Campaigns', color: '#8B5CF6', desc: 'Personalised SMS drip campaigns with smart reply triggers — timed to user behaviour and purchase events.', sample: 'Abandoned cart SMS — 3-step sequence, 18% recovery rate.' },
  { icon: <Package size={24} />, title: 'Product Descriptions', color: '#F97316', desc: 'E-commerce product listings — SEO-optimised, benefit-led, auto-updated across Shopify, WooCommerce, and Amazon.', sample: '500 SKUs updated overnight — consistent tone, keyword-rich.' },
  { icon: <Film size={24} />, title: 'YouTube Shorts & Scripts', color: '#EF4444', desc: 'Short-form video scripts, thumbnails, titles, and descriptions — auto-published with scheduling and analytics.', sample: 'Weekly Shorts: "AI tip of the week" — 4.2K average views.' },
  { icon: <Bell size={24} />, title: 'Push Notifications', color: '#14B8A6', desc: 'Browser and app push campaigns — timed to user behaviour, personalised by segment, A/B tested automatically.', sample: 'Re-engagement push — 22% click-through, 11% conversion.' },
  { icon: <Mic2 size={24} />, title: 'Podcast & Audio Content', color: '#F59E0B', desc: 'Podcast show notes, transcriptions, audiograms, and short clips — repurposed from recordings automatically.', sample: 'Episode transcript → blog + 3 social clips in under 5 minutes.' },
  { icon: <FileText size={24} />, title: 'Case Studies & Reports', color: '#6366F1', desc: 'Client success stories, ROI reports, and thought leadership documents — drafted from data and published on schedule.', sample: 'Case study: ₹18L/month saved — formatted, PDF + web version.' },
];

const PLATFORMS = [
  { name: 'Instagram', icon: <Instagram size={18} />, stat: 'Daily Reels + Stories', angle: 0 },
  { name: 'Facebook', icon: <Globe size={18} />, stat: 'Ads + Posts', angle: 51.4 },
  { name: 'LinkedIn', icon: <Linkedin size={18} />, stat: 'Content + Outreach', angle: 102.8 },
  { name: 'YouTube', icon: <Youtube size={18} />, stat: 'Videos + SEO', angle: 154.2 },
  { name: 'Google Ads', icon: <Search size={18} />, stat: 'Campaigns + Bidding', angle: 205.7 },
  { name: 'WhatsApp', icon: <MessageSquare size={18} />, stat: 'Broadcasts + Drips', angle: 257.1 },
  { name: 'Email', icon: <Mail size={18} />, stat: 'Sequences + Newsletters', angle: 308.5 },
];

const PACKAGES = [
  {
    name: 'Starter', price: '₹25,000', period: '/month', popular: false, color: '#6366F1',
    features: ['8 videos per month', '30-day social calendar (3 platforms)', '2 email campaigns per month', 'Basic ad campaign management', 'Monthly performance report'],
  },
  {
    name: 'Growth', price: '₹49,000', period: '/month', popular: true, color: '#E8631A',
    features: ['20 videos per month', 'Daily content across 5 platforms', 'Weekly email sequences', 'Full Google & Meta ad management', 'Lead generation landing pages', 'A/B testing on all ads', 'Weekly analytics report'],
  },
  {
    name: 'Dominator', price: '₹89,000', period: '/month', popular: false, color: '#10B981',
    features: ['30+ videos per month', 'Full omnichannel marketing automation', 'Lead generation system included', 'AI voice agent for lead follow-up', 'Real-time analytics dashboard', 'Dedicated AI marketing manager', 'Unlimited platforms'],
  },
];

const RESULTS = [
  { metric: '10x', label: 'Content output vs agency', sub: 'Same cost, 10x more content' },
  { metric: '60%', label: 'Reduction in marketing cost', sub: 'vs traditional agency retainer' },
  { metric: '3x', label: 'More leads from same budget', sub: 'Due to continuous A/B testing' },
  { metric: '< 24h', label: 'Campaign launch time', sub: 'From brief to live' },
];

const FEED_ITEMS = [
  { type: 'Instagram Reel', content: '"5 Ways AI is Changing Indian Business" "" Published', color: '#E8631A' },
  { type: 'Email Campaign', content: 'Q4 Strategy Newsletter "" Sent to 4,200 subscribers', color: '#6366F1' },
  { type: 'YouTube Video', content: 'Case Study: How AI Saved ₹18L/month "" Uploaded', color: '#F59E0B' },
  { type: 'Facebook Ad', content: 'Lead Gen Campaign "" 47 leads today at ₹85 CPL', color: '#10B981' },
  { type: 'LinkedIn Post', content: 'Agentic AI in Indian SMBs "" 2.4K impressions', color: '#0EA5E9' },
  { type: 'WhatsApp Blast', content: 'Diwali Campaign "" 98% delivered, 34% opened', color: '#25D366' },
];

export default function AIStudioPage() {
  const [activeContent, setActiveContent] = useState(0);

  return (
    <>
      <Helmet>
        <title>AI Content Studio — AI Agentix</title>
        <meta name="description" content="India's AI-powered content and marketing studio. Videos, social posts, email campaigns, and ads — all automated." />
      </Helmet>
      <SiteNav />

      {/* ⓀⓀ 1. HERO "" Dark, 2-col ⓀⓀ */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '85vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(232,99,26,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Zap size={13} color="#E8631A" />
              <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>AI Content Studio</span>
            </motion.div>
            <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4vw,58px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              Your Brand. On Every<br />Platform.{' '}
              <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Every Day.</span>
            </motion.h1>
            <motion.p {...up(0.14)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, maxWidth: 480, marginBottom: 36, fontFamily: 'var(--font-body)' }}>
              AI Agentix runs India's most advanced AI-powered content studio. We create, publish, and optimize your brand's entire digital presence "" delivering the output of a 10-person marketing team at a fraction of the cost.
            </motion.p>
            <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
                Start AI Studio <ArrowRight size={17} />
              </Link>
              <a href="#packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, padding: '14px 24px', borderRadius: 12, textDecoration: 'none' }}>
                View Packages
              </a>
            </motion.div>
            {/* Quick stats */}
            <motion.div {...up(0.26)} style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {[['10x', 'Content output'], ['60%', 'Lower cost vs agency'], ['3x', 'More leads']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-number)', fontSize: 24, fontWeight: 700, color: '#E8631A' }}>{v}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
          {/* Right: live feed */}
          <motion.div {...right(0.25)} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Live Content Feed</div>
            {FEED_ITEMS.map((item, i) => (
              <motion.div key={item.type} initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={VP} transition={{ delay: i * 0.07, duration: 0.5 }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: `3px solid ${item.color}`, borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 6px ${item.color}`, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: item.color, fontWeight: 700, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', minWidth: 120 }}>{item.type}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>{item.content}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 2. RESULTS STRIP "" White, 4 big numbers ⓀⓀ */}
      <section style={{ background: '#fff', padding: '72px 0', borderBottom: '1px solid #F3F4F6' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {RESULTS.map((r, i) => (
              <div key={r.label} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < 3 ? '1px solid #E5E7EB' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(36px,3.5vw,52px)', fontWeight: 700, color: '#E8631A', lineHeight: 1 }}>{r.metric}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#0D1B2E', marginTop: 10 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4, fontFamily: 'var(--font-body)' }}>{r.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 3. CONTENT TYPES "" LIGHT ICE, clickable cards ⓀⓀ */}
      <section style={{ background: '#F0F4F8', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>What We Create</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>Every Format. Every Platform. Every Day.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40 }}>
            {/* Left: type list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CONTENT_TYPES.map((ct, i) => (
                <button key={ct.title} onClick={() => setActiveContent(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left', background: activeContent === i ? '#fff' : 'transparent', boxShadow: activeContent === i ? '0 2px 12px rgba(0,0,0,0.08)' : 'none', borderLeft: `3px solid ${activeContent === i ? ct.color : 'transparent'}`, transition: 'all 0.2s' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${ct.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ct.color, flexShrink: 0 }}>{ct.icon}</div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: activeContent === i ? '#0D1B2E' : '#6B7280' }}>{ct.title}</span>
                </button>
              ))}
            </div>
            {/* Right: detail */}
            <AnimatePresence mode="wait">
              <motion.div key={activeContent} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
                style={{ background: '#fff', borderRadius: 20, padding: 44, boxShadow: '0 4px 32px rgba(0,0,0,0.06)', border: `1px solid ${CONTENT_TYPES[activeContent].color}20` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${CONTENT_TYPES[activeContent].color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: CONTENT_TYPES[activeContent].color }}>{CONTENT_TYPES[activeContent].icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#0D1B2E', margin: 0 }}>{CONTENT_TYPES[activeContent].title}</h3>
                </div>
                <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.75, marginBottom: 28, fontFamily: 'var(--font-body)' }}>{CONTENT_TYPES[activeContent].desc}</p>
                <div style={{ background: `${CONTENT_TYPES[activeContent].color}08`, border: `1px solid ${CONTENT_TYPES[activeContent].color}25`, borderRadius: 12, padding: '16px 20px', marginBottom: 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: CONTENT_TYPES[activeContent].color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'var(--font-body)' }}>Example Output</div>
                  <p style={{ fontSize: 14, color: '#374151', fontFamily: 'var(--font-body)', fontStyle: 'italic', margin: 0 }}>"{CONTENT_TYPES[activeContent].sample}"</p>
                </div>
                <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: CONTENT_TYPES[activeContent].color, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                  Get {CONTENT_TYPES[activeContent].title} Automation <ArrowRight size={14} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ⓀⓀ 4. PLATFORM ORBIT "" Dark, animated ⓀⓀ */}
      <section style={{ background: '#0D1B2E', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <motion.div {...left(0)}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Channels</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#fff', marginTop: 12, marginBottom: 20 }}>7 Platforms. One AI Brain.</h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 28, fontFamily: 'var(--font-body)' }}>Our AI agents don't just schedule posts "" they plan campaigns, write copy, design creatives, run A/B tests, analyze performance, and iterate. A full digital marketing function, running autonomously.</p>
            {['Campaign planning and execution', 'Real-time performance optimization', 'Content creation for each platform', 'Budget management and ROI tracking', 'Weekly reporting and insights'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <CheckCircle size={14} color="#E8631A" />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>{f}</span>
              </div>
            ))}
          </motion.div>
          {/* Orbit visual */}
          <motion.div {...right(0.2)} style={{ position: 'relative', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {[160, 230, 300].map((r, i) => (
              <motion.div key={r} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 18 + i * 6, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', width: r * 2, height: r * 2, borderRadius: '50%', border: `1px solid rgba(232,99,26,${0.15 - i * 0.04})` }} />
            ))}
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}
              style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#E8631A,#F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 0 40px rgba(232,99,26,0.4)' }}>
              <Brain size={32} color="#fff" />
            </motion.div>
            {PLATFORMS.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 150;
              const y = Math.sin(rad) * 150;
              return (
                <motion.div key={p.name} animate={{ y: [0, -5, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
                  style={{ position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%,-50%)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 14px', textAlign: 'center', minWidth: 86 }}>
                  <div style={{ color: '#E8631A', display: 'flex', justifyContent: 'center', marginBottom: 4 }}>{p.icon}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{p.name}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 5. PACKAGES "" WHITE, 3 columns ⓀⓀ */}
      <section id="packages" style={{ background: '#fff', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Pricing</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>Choose Your AI Studio Package</h2>
            <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 520, margin: '12px auto 0', fontFamily: 'var(--font-body)' }}>All packages include custom setup, onboarding, and dedicated AI marketing management.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {PACKAGES.map((pkg, i) => (
              <motion.div key={pkg.name} {...up(i * 0.1)} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
                style={{ borderRadius: 20, padding: 36, position: 'relative', background: pkg.popular ? '#0D1B2E' : '#F9FAFB', border: `${pkg.popular ? 2 : 1}px solid ${pkg.popular ? pkg.color : '#E5E7EB'}`, boxShadow: pkg.popular ? `0 8px 40px ${pkg.color}30` : '0 2px 16px rgba(0,0,0,0.04)' }}>
                {pkg.popular && <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(90deg,#E8631A,#F59E0B)`, borderRadius: 100, padding: '4px 16px', fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>Most Popular</div>}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: pkg.popular ? '#fff' : '#0D1B2E', marginBottom: 4 }}>{pkg.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 24 }}>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 32, fontWeight: 700, color: pkg.color }}>{pkg.price}</span>
                  <span style={{ fontSize: 13, color: pkg.popular ? 'rgba(255,255,255,0.4)' : '#9CA3AF', fontFamily: 'var(--font-body)' }}>{pkg.period}</span>
                </div>
                {pkg.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                    <Check size={14} color={pkg.color} style={{ flexShrink: 0, marginTop: 3 }} />
                    <span style={{ fontSize: 13, color: pkg.popular ? 'rgba(255,255,255,0.75)' : '#4B5563', fontFamily: 'var(--font-body)' }}>{f}</span>
                  </div>
                ))}
                <Link to="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 28, background: pkg.popular ? `linear-gradient(90deg,#E8631A,#F59E0B)` : `${pkg.color}12`, color: pkg.popular ? '#fff' : pkg.color, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, padding: '13px 20px', borderRadius: 10, textDecoration: 'none', border: pkg.popular ? 'none' : `1px solid ${pkg.color}30` }}>
                  Get Started <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 6. CTA "" Dark ⓀⓀ */}
      <section style={{ background: '#060E1A', padding: '96px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '0 40px', position: 'relative' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            Stop Paying Agency Retainers.
          </motion.h2>
          <motion.p {...up(0.06)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Get the output of a 10-person marketing team at a fraction of the cost. Book a demo to see AI Studio in action.
          </motion.p>
          <motion.div {...up(0.12)} style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '15px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.35)' }}>
              See AI Studio in Action <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}

