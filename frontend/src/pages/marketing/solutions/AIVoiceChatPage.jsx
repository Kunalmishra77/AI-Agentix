import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Bot, CheckCircle, ArrowRight, ChevronRight, Clock, Phone, MessageSquare, Mic, Globe, Zap, Shield } from 'lucide-react';
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

const CHANNELS = [
  { name: 'WhatsApp Business', icon: '💬', desc: 'Conversational AI on the world\'s largest messaging platform. Automated lead qualification, support, and follow-ups at scale.', color: '#25D366' },
  { name: 'AI Voice Agent', icon: '🎤', desc: 'Human-like voice calls powered by AI. Qualifies leads, handles inbound queries, and books meetings "" 24/7 without a human agent.', color: '#6366F1' },
  { name: 'Website Chat', icon: '🌐', desc: 'Intelligent chat widget converts visitors into leads. Real-time engagement with personalized responses based on page context.', color: 'var(--or)' },
  { name: 'Instagram DMs', icon: '📸', desc: 'Auto-respond to comments and DMs. Convert social engagement into leads with context-aware automated conversations.', color: '#E1306C' },
  { name: 'SMS Campaigns', icon: '📱', desc: 'High-open-rate SMS automation for promotions, reminders, and transactional messages. Personalized at scale.', color: '#10B981' },
  { name: 'Email AI', icon: '📧', desc: 'Intelligent email sequences that learn from response patterns and adapt timing and content for each recipient.', color: '#F59E0B' },
];

const FEATURES = [
  { title: 'Natural Language Understanding', desc: 'Understands intent, context, and sentiment "" not just keywords. Handles complex queries, follow-up questions, and multi-turn conversations naturally.', points: ['Intent classification', 'Contextual memory (30+ turns)', 'Sentiment detection', 'Ambiguity resolution'] },
  { title: 'Multi-Language Support', desc: 'Deploy in English, Hindi, and 12+ Indian languages. The same AI agent switches language based on customer preference automatically.', points: ['Hindi, Tamil, Telugu, Marathi', 'Code-switching support', 'Regional dialect handling', 'Language auto-detection'] },
  { title: 'Lead Qualification Engine', desc: 'Every conversation scored and classified. Hot leads instantly routed to sales reps with full conversation transcript and qualification notes.', points: ['BANT qualification built-in', 'Intent scoring per message', 'Instant rep handoff', 'Full conversation context'] },
  { title: 'Human Escalation', desc: 'Seamless handoff to human agents when AI detects complex queries, high-value prospects, or emotional escalation. Nothing falls through the cracks.', points: ['Smart escalation triggers', 'Full context transfer', 'Agent notification & briefing', 'Post-handoff follow-up'] },
  { title: 'CRM Integration', desc: 'Every conversation logged, every lead captured, every follow-up scheduled "" automatically in your CRM. Zero manual data entry for your sales team.', points: ['Auto lead creation', 'Conversation transcript log', 'Follow-up task scheduling', 'Deal stage updates'] },
  { title: 'Analytics & Optimization', desc: 'Conversation analytics showing resolution rate, escalation reasons, response quality, and conversion rates. AI improves with every interaction.', points: ['Resolution rate tracking', 'Conversation quality scores', 'A/B test bot scripts', 'Conversion funnel analytics'] },
];

const FAQS = [
  ['How human-like is the voice agent?', 'Our voice AI uses advanced TTS with natural prosody, pausing, and emotional range. 90% of callers cannot distinguish it from a human agent in blind tests.'],
  ['How does it handle questions it doesn\'t know?', 'It says "I\'ll connect you with a specialist" and escalates with full context. It never fabricates answers "" only responds within its defined knowledge base.'],
  ['Can it handle high call/message volume?', 'Yes. The AI handles unlimited concurrent conversations without performance degradation. Scales instantly during campaigns or peak seasons.'],
  ['How long to deploy?', 'WhatsApp chatbot: 5""7 business days. Full voice + chat + CRM integration: 2""3 weeks.'],
  ['What languages does the voice agent support?', 'English, Hindi, and regional Indian languages. Language is auto-detected from the caller\'s first words.'],
];

export default function AIVoiceChatPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(80); const [n2, r2] = useCountUp(24); const [n3, r3] = useCountUp(68); const [n4, r4] = useCountUp(3);

  return (
    <>
      <Helmet><title>AI Voice & Chat Agents | AI Agentix</title></Helmet>
      <SiteNav /><VoiceAgentWidget />

      <section style={{ background: 'var(--nvd)', minHeight: '88vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,160px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 55% 25%, rgba(232,99,26,0.1), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Bot size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Voice & Chat</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Your AI Sales & Support Agent. <span style={{ color: 'var(--or)' }}>Always On.</span>
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              Human-like voice and chat agents that qualify leads, resolve support queries, and book meetings 24/7 "" across WhatsApp, phone, website, and social channels.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Deploy AI Agent <ArrowRight size={16} />
              </Link>
              <Link to="/ai-studio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                Visit AI Studio
              </Link>
            </motion.div>
          </div>
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>AI Agent "" Live Conversation</div>
            {[
              { side: 'user', msg: 'Hi, I\'m looking for a sales automation solution for my team of 15 reps' },
              { side: 'ai', msg: 'Great! We work with teams your size all the time. Quick question "" are you currently using a CRM, or looking for one?' },
              { side: 'user', msg: 'We use HubSpot but it\'s very manual' },
              { side: 'ai', msg: 'Perfect "" we integrate directly with HubSpot. Can I schedule a 20-min demo for this week?' },
            ].map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.2 }}
                style={{ display: 'flex', justifyContent: msg.side === 'user' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                <div style={{ maxWidth: '80%', padding: '10px 14px', borderRadius: msg.side === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: msg.side === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(232,99,26,0.15)', border: msg.side === 'ai' ? '1px solid rgba(232,99,26,0.25)' : '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', lineHeight: 1.5 }}>
                  {msg.side === 'ai' && <div style={{ fontSize: 10, color: 'var(--or)', fontWeight: 700, marginBottom: 4 }}>AI AGENT</div>}
                  {msg.msg}
                </div>
              </motion.div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.2)', fontFamily: 'var(--font-body)', fontSize: 12, color: '#10B981', fontWeight: 600 }}>
              Lead qualified Â· Meeting link sent Â· HubSpot updated
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[{ r: r1, n: n1, s: '%', l: 'Support Queries Resolved', sub: 'without human agent' }, { r: r2, n: n2, s: '/7', l: 'Availability', sub: '365 days a year' }, { r: r3, n: n3, s: '%', l: 'Lead Qualification Rate', sub: 'from inbound conversations' }, { r: r4, n: n4, s: 'x', l: 'Faster Lead Response', sub: 'vs. human team average' }].map((stat, i) => (
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Channel Coverage</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>One AI agent. Every channel.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {CHANNELS.map((ch, i) => (
              <motion.div key={i} {...up(i * 0.08)} style={{ padding: '24px 20px', background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{ch.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--nvd)', marginBottom: 8 }}>{ch.name}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>{ch.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--nvd)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>AI Capabilities</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Intelligence that sounds human</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FEATURES.map((f, i) => <button key={i} onClick={() => setActiveFeature(i)} style={{ textAlign: 'left', padding: '13px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: activeFeature === i ? 700 : 500, fontSize: 14, background: activeFeature === i ? 'rgba(232,99,26,0.2)' : 'rgba(255,255,255,0.05)', color: activeFeature === i ? 'var(--or)' : 'rgba(255,255,255,0.7)', transition: 'all 0.2s', borderLeft: activeFeature === i ? '3px solid var(--or)' : '3px solid transparent' }}>{f.title}</button>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.28 }} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 36, border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 14 }}>{FEATURES[activeFeature].title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 24 }}>{FEATURES[activeFeature].desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {FEATURES[activeFeature].points.map((pt, i) => <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'rgba(232,99,26,0.1)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)' }}><CheckCircle size={15} color="var(--or)" style={{ flexShrink: 0, marginTop: 2 }} /><span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{pt}</span></div>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section style={{ background: '#060E1A', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>AI agents that close and support</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'EdTech Platform "" 50K users', result: '80% support tickets resolved by AI', detail: 'Course queries, fee questions, and technical support handled by AI bot "" human team focuses on complex issues only', time: '45 days' },
              { name: 'Real Estate Agency', result: '4.2x more leads qualified per day', detail: 'AI voice agent called every inbound inquiry within 60 seconds, qualifying and booking site visits automatically', time: '30 days' },
              { name: 'Healthcare Network', result: '₹3.2L/month saved in call center costs', detail: 'Appointment booking, reminder calls, and post-visit follow-ups handled by AI voice agent completely', time: '3 months' },
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>AI Voice & Chat "" Questions Answered</h2>
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
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800, color: '#fff', marginBottom: 20 }}>Deploy Your AI Agent in 7 Days</motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>Start with WhatsApp or voice. Add channels as you grow. Your AI agent is live in days, not months.</motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>Deploy AI Agent Now <ArrowRight size={18} /></Link>
            <Link to="/ai-studio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>Explore AI Studio</Link>
          </motion.div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

