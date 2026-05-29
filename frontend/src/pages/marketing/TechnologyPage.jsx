import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Workflow, Database, Shield, Zap, CheckCircle, ArrowRight,
  Globe, Lock, Cpu, Network, Layers, GitBranch, Eye, RefreshCw,
  MessageSquare, Phone, Mail, BarChart3, Package, Code2, ChevronRight,
  Server, CloudLightning, Bot, Sparkles,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const left = (d = 0) => ({ initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const right = (d = 0) => ({ initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const AGENT_TYPES = [
  {
    id: 'sales', label: 'Sales Agent', icon: <Zap size={18} />, color: '#E8631A',
    headline: 'Lead Qualification & Follow-Up',
    desc: 'Ingests leads from every source, scores by intent, routes to the right rep, and executes multi-step follow-up sequences "" all without human intervention.',
    flow: ['Lead captured from portal/form/WhatsApp', 'NLP intent classification model runs', 'Scored & enriched with company data', 'Routed to rep or automated sequence', 'CRM updated in real-time'],
    tech: ['GPT-4 fine-tuned on sales data', 'Proprietary intent scoring model', 'WhatsApp Business API + webhook', 'HubSpot / Zoho / Salesforce sync'],
  },
  {
    id: 'support', label: 'Support Agent', icon: <MessageSquare size={18} />, color: '#6366F1',
    headline: 'Ticket Resolution & Escalation',
    desc: 'Reads every support ticket, classifies by category and urgency, resolves common issues automatically, and escalates complex cases with full context to your human team.',
    flow: ['Ticket ingested from any channel', 'Classification & urgency scoring', 'Knowledge base retrieval (RAG)', 'Auto-resolution or escalation', 'Learning loop from agent feedback'],
    tech: ['RAG pipeline with vector search', 'Multi-turn conversation memory', 'Freshdesk / Zendesk API integration', 'Sentiment analysis for escalation'],
  },
  {
    id: 'analytics', label: 'Analytics Agent', icon: <BarChart3 size={18} />, color: '#0EA5E9',
    headline: 'Anomaly Detection & Forecasting',
    desc: 'Continuously monitors business KPIs across all data sources, surfaces anomalies within minutes, forecasts trends, and delivers insights via WhatsApp or email.',
    flow: ['Data pulled from all connected tools', 'Baseline models trained on your data', 'Anomaly detection runs every 15 min', 'Insight narratives auto-generated', 'WhatsApp/email alert delivered'],
    tech: ['Time-series anomaly models', 'LLM-powered insight narrative', 'Google Analytics / GA4 + Sheets sync', 'Custom KPI definition engine'],
  },
  {
    id: 'content', label: 'Content Agent', icon: <Sparkles size={18} />, color: '#EC4899',
    headline: 'Research, Write & Publish',
    desc: 'Takes a keyword or brief, researches competitors, writes a full SEO-optimized post with images, generates metadata, and auto-publishes to your CMS and social accounts.',
    flow: ['Keyword/brief input received', 'SERP research & competitor analysis', 'Outline + draft generated with brand voice', 'Image generation & embedding', 'Auto-publish to CMS + social scheduling'],
    tech: ['Claude/GPT-4 with brand fine-tuning', 'DALL-E 3 / Stable Diffusion images', 'WordPress / Webflow CMS API', 'Buffer / Hootsuite social scheduling'],
  },
  {
    id: 'voice', label: 'Voice Agent', icon: <Phone size={18} />, color: '#10B981',
    headline: 'Inbound Calls & Outbound Outreach',
    desc: 'Handles inbound phone calls in English and Hindi "" booking appointments, answering FAQs, qualifying leads, and escalating to humans when needed.',
    flow: ['Inbound call received (Twilio/Exotel)', 'Speech-to-text transcription', 'Intent classification & routing logic', 'TTS response in caller\'s language', 'Call summary logged to CRM'],
    tech: ['Whisper ASR for STT', 'ElevenLabs / Polly for TTS', 'Exotel / Twilio for telephony', 'Real-time latency < 800ms'],
  },
];

const INTEGRATIONS = [
  { cat: 'CRM', items: ['HubSpot', 'Salesforce', 'Zoho CRM', 'Freshsales', 'Pipedrive'] },
  { cat: 'Communication', items: ['WhatsApp Business', 'Slack', 'Gmail', 'Outlook', 'Twilio'] },
  { cat: 'E-commerce', items: ['Shopify', 'WooCommerce', 'Razorpay', 'PayU', 'Instamojo'] },
  { cat: 'Productivity', items: ['Google Workspace', 'Notion', 'Airtable', 'ClickUp', 'Jira'] },
  { cat: 'Support', items: ['Freshdesk', 'Zendesk', 'Intercom', 'Crisp', 'Tidio'] },
  { cat: 'Analytics', items: ['Google Analytics', 'Mixpanel', 'Metabase', 'Looker', 'Tableau'] },
];

const SECURITY = [
  { icon: <Lock size={20} />, title: 'End-to-End Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256). Keys rotated quarterly.', color: '#10B981' },
  { icon: <Shield size={20} />, title: 'SOC 2 Type II Compliant', desc: 'Annual third-party audits across Security, Availability, and Confidentiality trust services.', color: '#6366F1' },
  { icon: <Server size={20} />, title: 'Indian Data Residency', desc: 'All client data stored on AWS Mumbai (ap-south-1). Data never leaves Indian borders without written consent.', color: '#E8631A' },
  { icon: <Eye size={20} />, title: 'Zero Data Sharing', desc: 'Your data is never used to train models for other clients. Isolated fine-tuning environments per client.', color: '#F59E0B' },
];

const STACK_LAYERS = [
  { layer: 'AI Models', items: ['Claude 3.5 Sonnet', 'GPT-4 Turbo', 'Whisper STT', 'ElevenLabs TTS'], color: '#E8631A' },
  { layer: 'Agent Runtime', items: ['LangChain / LangGraph', 'Custom RAG Pipeline', 'Tool-calling Framework', 'Memory Management'], color: '#6366F1' },
  { layer: 'Data Layer', items: ['Pinecone Vector DB', 'PostgreSQL', 'Redis Cache', 'S3 Storage'], color: '#10B981' },
  { layer: 'Integration Layer', items: ['REST / Webhook APIs', 'n8n / Zapier Flows', 'WhatsApp Business API', 'Telephony (Exotel/Twilio)'], color: '#F59E0B' },
  { layer: 'Infrastructure', items: ['AWS Mumbai (ap-south-1)', 'Docker / Kubernetes', 'CI/CD via GitHub Actions', 'SOC 2 Compliant'], color: '#0EA5E9' },
];

export default function TechnologyPage() {
  const [activeAgent, setActiveAgent] = useState(AGENT_TYPES[0]);
  const [activeCat, setActiveCat] = useState('CRM');

  return (
    <>
      <Helmet>
        <title>Technology — AI Agentix</title>
        <meta name="description" content="The AI stack behind AI Agentix — agentic AI, RAG pipelines, voice agents, and 200+ integrations. SOC 2 compliant, hosted in India." />
      </Helmet>
      <SiteNav />

      {/* ⓀⓀ 1. HERO "" Dark ⓀⓀ */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0A1525 100%)', minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Cpu size={13} color="#6366F1" />
              <span style={{ fontSize: 12, color: '#6366F1', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Enterprise-Grade AI Stack</span>
            </motion.div>
            <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4vw,58px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
              The Technology Behind<br />
              <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Every Automation</span>
            </motion.h1>
            <motion.p {...up(0.14)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 480, marginBottom: 36, fontFamily: 'var(--font-body)' }}>
              Purpose-built agentic AI. Not off-the-shelf tools wrapped in a dashboard. Every system we deploy is custom-engineered on a battle-tested stack "" hosted in India, compliant with Indian data laws.
            </motion.p>
            <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16 }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, padding: '13px 26px', borderRadius: 12, textDecoration: 'none' }}>
                Talk to an Engineer <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          {/* Right: tech stack visual */}
          <motion.div {...right(0.25)}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginBottom: 16, letterSpacing: 2, textTransform: 'uppercase' }}>Live Agent Status</div>
              {[
                { name: 'Sales Agent', status: 'Processing 47 leads', color: '#E8631A', dot: '#10B981' },
                { name: 'Support Agent', status: 'Resolved 12 tickets', color: '#6366F1', dot: '#10B981' },
                { name: 'Voice Agent', status: 'On 3 simultaneous calls', color: '#10B981', dot: '#10B981' },
                { name: 'Content Agent', status: 'Drafting 2 articles', color: '#EC4899', dot: '#F59E0B' },
              ].map(a => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, marginBottom: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.dot, boxShadow: `0 0 6px ${a.dot}` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: '#fff' }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>{a.status}</div>
                  </div>
                  <div style={{ fontSize: 10, color: a.color, fontFamily: 'var(--font-body)', fontWeight: 600 }}>RUNNING</div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(16,185,129,0.08)', borderRadius: 10, border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                <span style={{ fontSize: 12, color: '#10B981', fontFamily: 'var(--font-body)' }}>All systems operational "" 99.97% uptime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 2. AGENT TYPES "" WHITE, tabbed ⓀⓀ */}
      <section style={{ background: '#fff', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Agent Types</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>Five Agents. One Unified Platform.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>
            {/* Tab list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {AGENT_TYPES.map(a => (
                <button key={a.id} onClick={() => setActiveAgent(a)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left', background: activeAgent.id === a.id ? `${a.color}10` : '#F9FAFB', borderLeft: `3px solid ${activeAgent.id === a.id ? a.color : 'transparent'}`, transition: 'all 0.2s' }}>
                  <span style={{ color: activeAgent.id === a.id ? a.color : '#9CA3AF' }}>{a.icon}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: activeAgent.id === a.id ? '#0D1B2E' : '#6B7280' }}>{a.label}</span>
                </button>
              ))}
            </div>
            {/* Tab panel */}
            <AnimatePresence mode="wait">
              <motion.div key={activeAgent.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                style={{ background: `${activeAgent.color}06`, border: `1px solid ${activeAgent.color}20`, borderRadius: 20, padding: 40 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#0D1B2E', marginBottom: 12 }}>{activeAgent.headline}</h3>
                <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, marginBottom: 32, fontFamily: 'var(--font-body)' }}>{activeAgent.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: activeAgent.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-body)' }}>Process Flow</div>
                    {activeAgent.flow.map((step, i) => (
                      <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${activeAgent.color}15`, border: `1px solid ${activeAgent.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontFamily: 'var(--font-number)', fontSize: 10, fontWeight: 700, color: activeAgent.color }}>{i + 1}</span>
                        </div>
                        <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16, fontFamily: 'var(--font-body)' }}>Tech Used</div>
                    {activeAgent.tech.map(t => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, padding: '8px 12px', background: '#F9FAFB', borderRadius: 8 }}>
                        <Code2 size={13} color="#9CA3AF" />
                        <span style={{ fontSize: 13, color: '#374151', fontFamily: 'var(--font-body)' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ⓀⓀ 3. TECH STACK "" DARK, layered diagram ⓀⓀ */}
      <section style={{ background: '#0D1B2E', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The Stack</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>Built on Best-in-Class Infrastructure</h2>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {STACK_LAYERS.map((layer, i) => (
              <motion.div key={layer.layer} {...up(i * 0.08)} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 0, background: 'rgba(255,255,255,0.04)', border: `1px solid ${layer.color}20`, borderLeft: `4px solid ${layer.color}`, borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', background: `${layer.color}10`, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: layer.color }}>{layer.layer}</span>
                </div>
                <div style={{ padding: '20px 24px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  {layer.items.map(item => (
                    <span key={item} style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-body)', background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: '4px 12px' }}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 4. INTEGRATIONS "" CREAM, category filter ⓀⓀ */}
      <section style={{ background: '#F8F6F2', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Integrations</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>200+ Tools We Connect With</h2>
          </motion.div>
          {/* Category tabs */}
          <motion.div {...up(0.06)} style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            {INTEGRATIONS.map(c => (
              <button key={c.cat} onClick={() => setActiveCat(c.cat)}
                style={{ padding: '8px 20px', borderRadius: 100, border: `1px solid ${activeCat === c.cat ? '#E8631A' : '#E5E7EB'}`, background: activeCat === c.cat ? '#E8631A' : '#fff', color: activeCat === c.cat ? '#fff' : '#374151', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
                {c.cat}
              </button>
            ))}
          </motion.div>
          {/* Integration chips */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {INTEGRATIONS.find(c => c.cat === activeCat)?.items.map(item => (
                <div key={item} style={{ padding: '12px 20px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: '#0D1B2E', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>{item}</div>
              ))}
              <div style={{ padding: '12px 20px', background: '#E8631A08', border: '1px dashed #E8631A60', borderRadius: 10, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: '#E8631A' }}>+ More on request</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ⓀⓀ 5. SECURITY "" White, 2x2 grid ⓀⓀ */}
      <section style={{ background: '#fff', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Security & Compliance</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>Enterprise Security by Default</h2>
            <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 540, marginTop: 12, fontFamily: 'var(--font-body)' }}>Every AI Agentix deployment meets enterprise security requirements. Your data is never used to train shared models.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {SECURITY.map((s, i) => (
              <motion.div key={s.title} {...up(i * 0.08)} style={{ display: 'flex', gap: 20, padding: '28px', background: '#F9FAFB', borderRadius: 16, border: `1px solid ${s.color}20`, borderLeft: `4px solid ${s.color}` }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${s.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#0D1B2E', marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 6. CTA "" Dark ⓀⓀ */}
      <section style={{ background: '#060E1A', padding: '96px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '0 40px', position: 'relative' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
            Want a Technical Deep-Dive?
          </motion.h2>
          <motion.p {...up(0.08)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Book a call with one of our ML engineers. We'll walk through the exact architecture we'd build for your use case.
          </motion.p>
          <motion.div {...up(0.14)} style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.35)' }}>
              Book Tech Discovery Call <ArrowRight size={17} />
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}

