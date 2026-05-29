import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, GraduationCap, Hotel, Building2, ShoppingCart, Factory, Truck,
  CheckCircle, ArrowRight, ChevronRight, TrendingUp, Zap, Clock,
  Users, DollarSign, BarChart3, Phone, MessageSquare, Bot,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const left = (d = 0) => ({ initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });
const right = (d = 0) => ({ initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const INDUSTRIES = [
  {
    id: 'real-estate', label: 'Real Estate', icon: <Building2 size={22} />, color: '#E8631A',
    headline: 'Turn Every Lead Into a Conversation',
    desc: 'Real estate moves fast. AI Agentix deploys agents that respond to every portal inquiry within 90 seconds, qualify buyers vs browsers, schedule site visits, and follow up until they close "" or opt out.',
    challenges: ['70% of leads go cold because response takes hours', 'Sales team wastes time on unqualified leads', 'Manual follow-up sequences break down', 'No visibility on which channels drive closures'],
    automations: ['Instant lead response across 6 portals', 'AI-driven buyer intent scoring', 'Automated site visit scheduling', 'WhatsApp follow-up sequences', 'CRM auto-update on every touchpoint'],
    stats: [{ v: '340%', l: 'More qualified meetings' }, { v: '< 90s', l: 'First response time' }, { v: '₹22L', l: 'Avg. monthly revenue added' }],
    quote: 'We went from losing 60% of inbound leads to responding within 90 seconds to every single one.',
    quoteBy: 'Rajiv Mehta, Founder "" RealEdge Properties',
  },
  {
    id: 'healthcare', label: 'Healthcare', icon: <Heart size={22} />, color: '#EC4899',
    headline: 'Full Appointment Books. Zero Admin Burnout.',
    desc: 'From appointment scheduling to post-consultation follow-ups, AI Agentix handles the entire patient communication lifecycle "" in Hindi and English, on WhatsApp and phone.',
    challenges: ['35% no-show rate draining revenue', 'Front desk overwhelmed with 300+ calls/day', 'No automated prescription or follow-up reminders', 'Low Google ratings due to poor follow-up'],
    automations: ['AI voice agent for inbound calls 24/7', '3-touch reminder sequence (48h, 24h, 2h)', 'Smart rescheduling with slot availability', 'Post-consultation follow-up flows', 'Google Review automation after each visit'],
    stats: [{ v: '65%', l: 'Reduction in no-shows' }, { v: '₹8L', l: 'Monthly revenue recovered' }, { v: '4.2★', l: 'Average Google rating' }],
    quote: 'We went from dreading Mondays to looking forward to them. The AI handles everything our front desk used to dread.',
    quoteBy: 'Dr. Priya Sharma "" Medical Director, Apollo Specialty',
  },
  {
    id: 'education', label: 'Education', icon: <GraduationCap size={22} />, color: '#6366F1',
    headline: 'From Enquiry to Enrollment "" Automated',
    desc: 'EdTech and institutes lose 40% of leads because follow-up is manual and slow. AI Agentix deploys enrollment agents that nurture every enquiry, send demo invites, and handle admission Q&A round the clock.',
    challenges: ['40% of enquiries never get a timely follow-up', 'Counsellors spend 3hrs/day on repetitive Q&A', 'No automated nurture for long consideration cycles', 'Manual fee payment reminders and remittances'],
    automations: ['Instant enquiry response & course matching', 'Demo/trial class scheduling automation', 'Fee reminder & payment link automation', 'Progress report delivery automation', 'Re-enrollment campaign flows'],
    stats: [{ v: '3x', l: 'Enrollment conversion rate' }, { v: '60%', l: 'Less counsellor admin time' }, { v: '₹15L', l: 'Additional enrollments/month' }],
    quote: 'Our counsellors now spend 90% of their time actually counselling "" not answering the same questions over and over.',
    quoteBy: 'Sneha Kapoor "" Director, BrightPath Academy',
  },
  {
    id: 'hospitality', label: 'Hospitality', icon: <Hotel size={22} />, color: '#10B981',
    headline: 'Delight Every Guest from Booking to Checkout',
    desc: 'Hotels, resorts, and restaurants that run AI Agentix see dramatically higher review scores and repeat bookings "" because every guest touchpoint is personalised and never missed.',
    challenges: ['Manual reservation handling causes errors', 'No automated pre-arrival communication', 'Review requests go unsent after checkout', 'Repetitive WhatsApp FAQs drain staff time'],
    automations: ['AI reservation management & upselling', 'Pre-arrival personalised welcome flow', 'In-stay request handling via WhatsApp', 'Checkout satisfaction survey automation', 'Post-stay Google Review request sequence'],
    stats: [{ v: '92%', l: 'Guest satisfaction score' }, { v: '2.1x', l: 'Review volume increase' }, { v: '28%', l: 'Upsell revenue uplift' }],
    quote: 'Our 5-star reviews doubled in 3 months. Guests feel like we know them personally "" and we do now, thanks to the AI.',
    quoteBy: 'Arjun Singh "" GM, Heritage Boutique Resort',
  },
  {
    id: 'retail', label: 'Retail & E-com', icon: <ShoppingCart size={22} />, color: '#F59E0B',
    headline: 'Scale Orders Without Scaling Overhead',
    desc: 'From abandoned cart recovery to post-purchase loyalty flows, AI Agentix automates every step of the retail customer lifecycle "" for Shopify, WooCommerce, and custom stores.',
    challenges: ['70% cart abandonment rate going unaddressed', 'Manual inventory updates cause stockout overselling', 'No automated review or reorder campaigns', 'Support tickets pile up during sale seasons'],
    automations: ['Abandoned cart recovery sequences', 'Real-time inventory sync across channels', 'Order status & delivery update automation', 'Post-purchase review request flows', 'Win-back campaign for lapsed customers'],
    stats: [{ v: '28%', l: 'Increase in repeat purchases' }, { v: '18%', l: 'Cart recovery rate' }, { v: '₹12L', l: 'Monthly revenue from automation' }],
    quote: 'Abandoned cart recovery alone pays for the entire AI Agentix engagement "" 3x over every month.',
    quoteBy: 'Pooja Malhotra "" Founder, StyleCraft Apparel',
  },
  {
    id: 'logistics', label: 'Logistics', icon: <Truck size={22} />, color: '#0EA5E9',
    headline: 'Ops That Run Without Spreadsheets',
    desc: 'Logistics operations are drowning in coordination "" driver dispatch, shipment status, invoice generation, and client updates. AI Agentix automates all of it and surfaces exceptions in real time.',
    challenges: ['Manual driver coordination takes 2hrs/day per manager', 'Client shipment updates are delayed or missed', 'Invoice generation and reconciliation is error-prone', 'No predictive delay or exception alerts'],
    automations: ['AI-driven dispatch and route optimization', 'Automated client shipment status updates', 'Invoice auto-generation from delivery data', 'Exception alert system (delays, failures)', 'Driver performance analytics dashboard'],
    stats: [{ v: '50%', l: 'Faster operations' }, { v: '35%', l: 'Reduction in coordination calls' }, { v: '₹6L', l: 'Saved per month in ops overhead' }],
    quote: 'What took my ops team 4 hours every morning now runs automatically by 7 AM. I just review the exception report.',
    quoteBy: 'Aditya Kumar "" CEO, SwiftShip Logistics',
  },
  {
    id: 'manufacturing', label: 'Manufacturing', icon: <Factory size={22} />, color: '#8B5CF6',
    headline: 'Smart Factory Without the IT Budget',
    desc: 'Manufacturing businesses waste millions on manual quality tracking, order processing, and vendor communication. AI Agentix connects the shop floor to the boardroom with automated reporting and alerts.',
    challenges: ['Manual production reports take 2 days to compile', 'Vendor communication and POs are fully manual', 'Quality defects caught late "" after production, not during', 'No real-time visibility on machine downtime or yield'],
    automations: ['Real-time production reporting automation', 'Automated vendor PO and reorder flows', 'Quality checkpoint alert system', 'Machine downtime notification & logging', 'ERP data sync and reconciliation'],
    stats: [{ v: '35%', l: 'Cost reduction in operations' }, { v: '80%', l: 'Less manual reporting time' }, { v: '2x', l: 'Faster defect detection' }],
    quote: 'Our quality defect rate dropped by half after implementing the AI checkpoint alerts. That alone saved ₹40L in rework costs.',
    quoteBy: 'Rahul Mehta "" VP Operations, PrecisionParts Ltd',
  },
];

const COMMON_PROBLEMS = [
  { icon: <Clock size={20} />, title: 'Slow Follow-Ups', desc: 'Every business loses leads and customers to slow manual response times.', color: '#E8631A' },
  { icon: <DollarSign size={20} />, title: 'Admin Cost Overload', desc: 'Staff spending 40%+ of their day on tasks a system should handle.', color: '#6366F1' },
  { icon: <BarChart3 size={20} />, title: 'No Real-Time Visibility', desc: 'Making decisions on week-old data from spreadsheets nobody trusts.', color: '#10B981' },
  { icon: <Users size={20} />, title: 'Inconsistent Customer Experience', desc: 'Quality varies by person, shift, and day "" customers notice.', color: '#F59E0B' },
];

export default function IndustriesPage() {
  const [active, setActive] = useState(INDUSTRIES[0]);

  return (
    <>
      <Helmet>
        <title>Industries "" AI Agentix</title>
        <meta name="description" content="AI automation tailored for Real Estate, Healthcare, Education, Hospitality, Retail, Logistics, and Manufacturing." />
      </Helmet>
      <SiteNav />

      {/* ⓀⓀ 1. HERO "" Dark ⓀⓀ */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '55vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <Zap size={13} color="#E8631A" />
            <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>7 Industries. Proven Results.</span>
          </motion.div>
          <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            We Speak Your<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Industry's Language</span>
          </motion.h1>
          <motion.p {...up(0.14)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto', fontFamily: 'var(--font-body)' }}>
            Every industry has unique workflows, regulations, and challenges. We don't use templates "" we build AI specifically for how your industry operates.
          </motion.p>
        </div>
      </section>

      {/* ⓀⓀ 2. COMMON PROBLEMS "" WHITE, 4-row layout ⓀⓀ */}
      <section style={{ background: '#fff', padding: '80px 0', borderBottom: '1px solid #F3F4F6' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#DC2626', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The Common Problem</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, color: '#0D1B2E', marginTop: 10 }}>Every Industry Has the Same Root Issue</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {COMMON_PROBLEMS.map((p, i) => (
              <motion.div key={p.title} {...up(i * 0.08)} style={{ padding: '28px 24px', background: '#F9FAFB', borderRadius: 16, borderTop: `3px solid ${p.color}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, marginBottom: 16 }}>{p.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#0D1B2E', marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{p.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⓀⓀ 3. INDUSTRY DEEP-DIVE "" LIGHT ICE, sidebar + panel ⓀⓀ */}
      <section style={{ background: '#F0F4F8', padding: '100px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>By Industry</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,2.8vw,40px)', fontWeight: 800, color: '#0D1B2E', marginTop: 10 }}>Select Your Industry</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32 }}>
            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {INDUSTRIES.map(ind => (
                <button key={ind.id} onClick={() => setActive(ind)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left', background: active.id === ind.id ? '#fff' : 'transparent', boxShadow: active.id === ind.id ? '0 2px 12px rgba(0,0,0,0.08)' : 'none', borderLeft: `3px solid ${active.id === ind.id ? ind.color : 'transparent'}`, transition: 'all 0.2s' }}>
                  <span style={{ color: active.id === ind.id ? ind.color : '#9CA3AF' }}>{ind.icon}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, color: active.id === ind.id ? '#0D1B2E' : '#6B7280' }}>{ind.label}</span>
                </button>
              ))}
            </div>

            {/* Panel */}
            <AnimatePresence mode="wait">
              <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
                style={{ background: '#fff', borderRadius: 24, padding: 44, boxShadow: '0 4px 32px rgba(0,0,0,0.06)', border: `1px solid ${active.color}20` }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${active.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: active.color }}>{active.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: active.color, fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>{active.label}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#0D1B2E', margin: '4px 0 0' }}>{active.headline}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, marginBottom: 32, fontFamily: 'var(--font-body)' }}>{active.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-body)' }}>Common Challenges</div>
                    {active.challenges.map(c => (
                      <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#DC2626', flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{c}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: active.color, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-body)' }}>What We Automate</div>
                    {active.automations.map(a => (
                      <div key={a} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                        <CheckCircle size={13} color={active.color} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 0, background: `${active.color}08`, border: `1px solid ${active.color}20`, borderRadius: 16, padding: '20px 0', marginBottom: 28 }}>
                  {active.stats.map((s, i) => (
                    <div key={s.l} style={{ flex: 1, textAlign: 'center', borderRight: i < active.stats.length - 1 ? `1px solid ${active.color}25` : 'none', padding: '0 24px' }}>
                      <div style={{ fontFamily: 'var(--font-number)', fontSize: 28, fontWeight: 700, color: active.color, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6, fontFamily: 'var(--font-body)' }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div style={{ background: '#F9FAFB', borderRadius: 12, padding: '20px 24px', borderLeft: `4px solid ${active.color}` }}>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, fontFamily: 'var(--font-body)', fontStyle: 'italic', marginBottom: 8 }}>"{active.quote}"</p>
                  <div style={{ fontSize: 12, fontWeight: 600, color: active.color, fontFamily: 'var(--font-body)' }}>"" {active.quoteBy}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ⓀⓀ 4. RESULTS STRIP "" Dark, horizontal stats ⓀⓀ */}
      <section style={{ background: '#0D1B2E', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Across All Industries</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>The Numbers Don't Change by Industry</h2>
          </motion.div>
          <motion.div {...up(0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {[
              { v: '200+', l: 'Deployments', sub: 'Across all 7 industries' },
              { v: '< 8 wk', l: 'Avg. go-live time', sub: 'From first call to production' },
              { v: '97%', l: 'Satisfaction rate', sub: 'Measured post-deployment' },
              { v: '8x', l: 'Average ROI', sub: 'Across all client types' },
            ].map((s, i) => (
              <div key={s.l} style={{ textAlign: 'center', padding: '0 24px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(36px,4vw,56px)', fontWeight: 700, color: '#E8631A', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff', marginTop: 10 }}>{s.l}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'var(--font-body)' }}>{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 5. CTA "" White ⓀⓀ */}
      <section style={{ background: '#fff', padding: '96px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, marginBottom: 20 }}>
            Ready to Automate Your Industry?
          </motion.h2>
          <motion.p {...up(0.08)} style={{ fontSize: 17, color: '#6B7280', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Book a free strategy call. We'll show you exactly what we'd automate in your business and the ROI you can expect.
          </motion.p>
          <motion.div {...up(0.14)} style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.3)' }}>
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

