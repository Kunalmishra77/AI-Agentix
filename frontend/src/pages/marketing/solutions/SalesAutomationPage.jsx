import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, Target, CheckCircle, ArrowRight, ChevronRight, Clock, Bot, BarChart3, Users, Zap, Mail, Phone, Database } from 'lucide-react';
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

const FEATURES = [
  { title: 'Lead Qualification AI', desc: 'Every inbound lead scored within 90 seconds using intent signals, firmographics, and behavioral data. High-intent leads instantly routed to top reps.', points: ['ICP matching & scoring', 'Behavioral intent analysis', 'Instant CRM sync', 'Priority routing rules'] },
  { title: 'Multi-Channel Outreach', desc: 'Automated sequences across WhatsApp, email, and phone. Personalized messaging based on lead data, industry, and previous interactions.', points: ['WhatsApp + email + phone', 'Hyper-personalized templates', 'Follow-up cadence engine', 'Reply detection & routing'] },
  { title: 'Pipeline Intelligence', desc: 'Real-time deal tracking, forecasting, and bottleneck detection. Know exactly where deals stall and why, before it costs you the quarter.', points: ['Deal stage automation', 'Bottleneck alerts', 'Win probability scoring', 'Forecast accuracy +40%'] },
  { title: 'CRM Auto-Enrichment', desc: 'Contacts auto-enriched with LinkedIn data, company info, and interaction history. Your reps always enter calls with full context and talking points.', points: ['LinkedIn enrichment', 'Company intelligence', 'Interaction timeline', 'Auto-note writing'] },
  { title: 'Meeting Booking', desc: 'AI books meetings autonomously "" qualifying, scheduling, and sending confirmation plus prep materials automatically without rep involvement.', points: ['Calendar sync & availability', 'Pre-meeting prep packs', 'No-show follow-up', 'Video link generation'] },
  { title: 'Revenue Analytics', desc: 'Live dashboards showing pipeline health, rep performance, conversion rates, and revenue forecasts. Board-ready reports in one click.', points: ['Rep performance tracking', 'Conversion funnel views', 'Revenue forecasting', 'Custom report builder'] },
];

const STEPS = [
  { n: '01', t: 'Lead Captured', d: 'Inbound lead arrives via form, ad, or referral' },
  { n: '02', t: 'AI Scores & Routes', d: 'Scored in 90 seconds, routed to best rep' },
  { n: '03', t: 'Outreach Triggered', d: 'Personalized multi-channel sequence starts' },
  { n: '04', t: 'Meeting Booked', d: 'AI schedules and prepares both sides' },
  { n: '05', t: 'Deal Progresses', d: 'Pipeline tracked and updated automatically' },
  { n: '06', t: 'Revenue Closes', d: 'Won deal logged, playbook refined by AI' },
];

const FAQS = [
  ['How long does deployment take?', 'Most clients are live within 2""3 weeks. Setup includes CRM integration, workflow configuration, and team onboarding.'],
  ['Which CRMs does it connect to?', 'Salesforce, HubSpot, Zoho CRM, Pipedrive, and any CRM with API access. Custom integrations available on enterprise plans.'],
  ['How is lead scoring configured?', 'You define your ICP criteria, deal size thresholds, and qualification rules. The AI learns and improves scoring accuracy over time.'],
  ['Can reps still control their pipeline?', 'Yes. Reps see everything AI does, can override any decision, and receive priority alerts for high-value actions.'],
  ['What about GDPR / data privacy?', 'All data is encrypted, stored in your region, and fully compliant. We sign DPA agreements for all enterprise clients.'],
];

export default function SalesAutomationPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [n1, r1] = useCountUp(340);
  const [n2, r2] = useCountUp(80);
  const [n3, r3] = useCountUp(12);
  const [n4, r4] = useCountUp(90);

  return (
    <>
      <Helmet><title>Sales Automation | AI Agentix</title></Helmet>
      <SiteNav />
      <VoiceAgentWidget />

      {/* 1. HERO */}
      <section style={{ background: 'var(--nvd)', minHeight: '90vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px,12vw,160px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 60% 30%, rgba(232,99,26,0.12), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <TrendingUp size={14} color="var(--or)" />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sales Automation</span>
            </motion.div>
            <motion.h1 {...up(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px,5vw,62px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Close 3x More Deals With <span style={{ color: 'var(--or)' }}>AI-Powered</span> Sales Automation
            </motion.h1>
            <motion.p {...up(0.2)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36 }}>
              Qualify every lead in 90 seconds, automate multi-channel outreach, and give your reps the intelligence to close faster. From first touch to signed deal "" fully automated.
            </motion.p>
            <motion.div {...up(0.3)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none' }}>
                Get Free Sales Audit <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                View Case Studies
              </Link>
            </motion.div>
          </div>
          <motion.div {...up(0.2)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 28, backdropFilter: 'blur(10px)' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Live Pipeline Activity</div>
            {[
              { name: 'Alex M. "" TechCorp', stage: 'Qualified', score: 94, color: '#10B981' },
              { name: 'Sarah K. "" RetailX', stage: 'Meeting Set', score: 87, color: 'var(--or)' },
              { name: 'Raj P. "" FinanceHub', stage: 'Proposal Sent', score: 76, color: '#6366F1' },
              { name: 'Priya S. "" HealthTech', stage: 'Follow-Up', score: 62, color: '#F59E0B' },
            ].map((lead, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.12 }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: `${lead.color}20`, border: `1.5px solid ${lead.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: lead.color, flexShrink: 0 }}>
                  {lead.name.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{lead.stage}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div style={{ width: 36, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${lead.score}%`, height: '100%', background: lead.color, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 13, color: lead.color }}>{lead.score}</span>
                </div>
              </motion.div>
            ))}
            <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(232,99,26,0.08)', borderRadius: 10, border: '1px solid rgba(232,99,26,0.2)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--or)' }}>
              4 leads scored Â· 2 meetings booked today
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS */}
      <section style={{ background: '#fff', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,80px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
          {[
            { r: r1, n: n1, s: '%', l: 'More Qualified Meetings', sub: 'vs. manual process' },
            { r: r2, n: n2, s: '%', l: 'Lead Response Rate', sub: 'within 5 minutes' },
            { r: r3, n: n3, s: 'x', l: 'ROI in Year One', sub: 'average across clients' },
            { r: r4, n: n4, s: 's', l: 'Lead Score Time', sub: 'from capture to score' },
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'var(--nvd)' }}>Every stage of your sales process "" automated</h2>
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
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--or)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>The Process</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>From first touch to closed deal "" end to end</h2>
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Connects to your existing stack</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#6B7280', marginTop: 14, maxWidth: 520, margin: '14px auto 0' }}>Works with every major CRM, email, and communication tool. No rip-and-replace required.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14 }}>
            {['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive', 'Gmail', 'Outlook', 'LinkedIn', 'WhatsApp', 'Slack', 'Zapier', 'Calendly', 'Zoom'].map((tool, i) => (
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>AI-Powered Sales vs. Traditional</h2>
          </motion.div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
              <thead>
                <tr>
                  <th style={{ padding: '14px 20px', textAlign: 'left', color: '#9CA3AF', fontSize: 13, fontWeight: 600, borderBottom: '2px solid #F0F4F8' }}>Capability</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--or)', fontSize: 13, fontWeight: 700, borderBottom: '2px solid var(--or)', background: 'rgba(232,99,26,0.04)' }}>AI Agentix</th>
                  <th style={{ padding: '14px 20px', textAlign: 'center', color: '#9CA3AF', fontSize: 13, fontWeight: 600, borderBottom: '2px solid #F0F4F8' }}>Traditional Team</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Lead Response Time', '< 90 seconds', '2""4 hours'],
                  ['Lead Scoring', 'AI-powered, real-time', 'Manual, subjective'],
                  ['Outreach Personalization', 'Dynamic, data-driven', 'Template-based'],
                  ['Working Hours', '24/7/365', 'Business hours only'],
                  ['Cost per Lead Touched', '~₹6', '~₹900""1400'],
                  ['Meeting Booking', 'Fully automated', 'Back-and-forth emails'],
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: '#fff' }}>Numbers that change the conversation</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'B2B SaaS "" 45 employees', result: '340% more qualified meetings', detail: 'Closed 12 enterprise deals in Q1 post-deployment', time: '3 months' },
              { name: 'E-commerce "" 120 SKUs', result: '₹2.8Cr recovered in abandoned carts', detail: 'AI reactivated 38% of abandoned leads via WhatsApp', time: '6 weeks' },
              { name: 'Financial Services', result: '12x ROI on sales AI investment', detail: 'Outreach cost dropped from ₹900 to ₹65 per lead', time: '4 months' },
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
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, color: 'var(--nvd)' }}>Sales Automation "" Questions Answered</h2>
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
            Ready to 3x Your Sales Pipeline?
          </motion.h2>
          <motion.p {...up(0.1)} style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 40 }}>
            Join 200+ companies using AI Agentix to automate their sales process. Start with a free AI audit.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--or)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '16px 32px', borderRadius: 12, textDecoration: 'none' }}>
              Get Free Sales Audit <ArrowRight size={18} />
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

