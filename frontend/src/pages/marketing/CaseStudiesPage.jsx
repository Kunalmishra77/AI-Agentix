import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, GraduationCap, Building2, ShoppingCart, Truck, Factory, Hotel,
  Star, ArrowRight, ChevronRight, CheckCircle, Quote, Zap, TrendingUp, Clock,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const INDUSTRIES = ['All', 'Healthcare', 'Education', 'Real Estate', 'E-commerce', 'Logistics'];

const CASES = [
  {
    id: 'healthcare', industry: 'Healthcare', icon: <Heart size={20} />, color: '#EC4899',
    client: 'Multi-Specialty Clinic Chain', location: 'Pune, Maharashtra',
    tagline: 'From 35% No-Show Rate to Full Appointment Books',
    challenge: 'A 12-doctor clinic losing ₹8L/month to no-shows. Front desk of 4 overwhelmed with 300+ daily calls "" reminders and rescheduling consumed 80% of working hours.',
    solution: ['AI voice agent handling all inbound calls 24/7', 'Automated 3-touch reminder sequence (48h, 24h, 2h)', 'Smart rescheduling with real-time slot availability', 'Post-consultation follow-up flows', 'Google Reviews automation post each visit'],
    stats: [
      { v: '65%', l: 'Reduction in no-shows', s: 'From 35% to 12%' },
      { v: '₹8L', l: 'Monthly revenue recovered', s: 'Previously lost to empty slots' },
      { v: '4→1', l: 'Front desk reduction', s: 'One person now handles 4 people\'s work' },
      { v: '4.2★', l: 'Google rating increase', s: 'From 3.1 stars in 4 months' },
    ],
    timeline: '8 weeks',
    quote: 'We went from dreading Mondays to looking forward to them. The AI handles everything our front desk used to dread.',
    quoteBy: 'Dr. Priya Sharma "" Medical Director',
  },
  {
    id: 'education', industry: 'Education', icon: <GraduationCap size={20} />, color: '#6366F1',
    client: 'CA & CMA Coaching Institute', location: 'Hyderabad, Telangana',
    tagline: 'Enrollment Conversion Tripled in 90 Days',
    challenge: '1,200+ monthly enquiries. Only 18% converting. Counsellors spending 6hrs/day on repetitive qualification calls, leaving no time for actual counselling.',
    solution: ['Instant lead response across all channels', 'AI chat agent with counsellor-quality responses', 'Automated lead scoring and qualification', 'Personalized drip for CA/CMA/CFA exam tracks', 'Fee collection via WhatsApp payment links'],
    stats: [
      { v: '55%', l: 'Enrollment conversion', s: 'Up from 18% "" 3x improvement' },
      { v: '70%', l: 'Counsellor time saved', s: 'From 6hrs to 1.8hrs/day' },
      { v: '< 90s', l: 'Lead response time', s: 'All 1,200+ enquiries per month' },
      { v: '₹32L', l: 'Additional monthly revenue', s: 'Same marketing spend' },
    ],
    timeline: '6 weeks',
    quote: 'Our counsellors now only talk to students who are genuinely ready to enrol. Conversion went through the roof.',
    quoteBy: 'Rajesh Mehta "" Founder & Director',
  },
  {
    id: 'real-estate', industry: 'Real Estate', icon: <Building2 size={20} />, color: '#E8631A',
    client: 'Residential Developer "" 500-unit Project', location: 'Mumbai, Maharashtra',
    tagline: 'Lead-to-Site-Visit Time Cut from 5 Days to 4 Hours',
    challenge: '3,000+ leads/month from 6 portals. Sales team of 12 drowning "" each managing 250+ leads with no systematic follow-up. Site visit bookings taking 5+ days.',
    solution: ['Unified lead capture with deduplication across 6 portals', 'AI voice qualification within 5 minutes of enquiry', 'Automated site visit booking with calendar integration', 'Long-cycle nurture with project updates and EMI calculators', 'Broker onboarding automation + CRM pipeline management'],
    stats: [
      { v: '4 hrs', l: 'Lead-to-site-visit time', s: 'Down from 5 days (30x faster)' },
      { v: '22%', l: 'Site visit conversion', s: 'Up from 8% "" 2.75x improvement' },
      { v: '3x', l: 'Sales productivity', s: 'Same team, 3x more deals' },
      { v: '₹4.2Cr', l: 'Additional quarterly sales', s: 'Attributed to automation' },
    ],
    timeline: '10 weeks',
    quote: 'The AI qualifies leads better than some of our senior salespeople. Seriously "" it asks the right questions and never gets tired.',
    quoteBy: 'Vikram Shah "" VP Sales',
  },
  {
    id: 'ecom', industry: 'E-commerce', icon: <ShoppingCart size={20} />, color: '#F59E0B',
    client: 'D2C Fashion Brand', location: 'Bengaluru, Karnataka',
    tagline: 'Support Costs Cut 68% While Volume Doubled',
    challenge: '500+ daily support tickets. 6-hour average resolution time. Support team burning out during sale seasons. Customer satisfaction falling despite more headcount.',
    solution: ['AI support agent trained on product catalog', 'Order status, returns, and size queries automated', 'Seamless escalation with full conversation context', 'Post-purchase review request automation', 'Abandoned cart recovery via WhatsApp'],
    stats: [
      { v: '82%', l: 'Tickets auto-resolved', s: 'Without human intervention' },
      { v: '4 min', l: 'Avg. resolution time', s: 'Down from 6 hours' },
      { v: '₹8L', l: 'Support cost saved/month', s: 'While handling 2x volume' },
      { v: '+18%', l: 'Customer satisfaction', s: 'CSAT score improvement' },
    ],
    timeline: '4 weeks',
    quote: 'Abandoned cart recovery alone recovered ₹12L in the first month. That\'s our entire AI Agentix investment for a year.',
    quoteBy: 'Pooja Malhotra "" Founder, StyleCraft',
  },
  {
    id: 'logistics', industry: 'Logistics', icon: <Truck size={20} />, color: '#0EA5E9',
    client: 'Last-Mile Delivery Company', location: 'Delhi NCR',
    tagline: 'Operations Fully Automated "" Manager Reviews Exceptions Only',
    challenge: 'Ops managers spending 4 hours every morning on manual dispatch coordination, client update calls, and invoice reconciliation. No visibility on delays until customers complained.',
    solution: ['AI-driven dispatch and route optimization', 'Automated client shipment status updates', 'Invoice auto-generation from delivery data', 'Exception alert system for delays and failures', 'Driver performance analytics dashboard'],
    stats: [
      { v: '50%', l: 'Faster operations', s: 'Daily ops completed by 7 AM' },
      { v: '35%', l: 'Fewer coordination calls', s: 'Clients get automated updates' },
      { v: '₹6L', l: 'Monthly ops overhead saved', s: 'Equivalent to 3 coordinator roles' },
      { v: '99.2%', l: 'On-time delivery rate', s: 'Up from 91% with proactive alerts' },
    ],
    timeline: '6 weeks',
    quote: 'What took my ops team 4 hours every morning now runs automatically by 7 AM. I just review the exception report.',
    quoteBy: 'Aditya Kumar "" CEO, SwiftShip Logistics',
  },
];

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(CASES[0]);

  const filtered = filter === 'All' ? CASES : CASES.filter(c => c.industry === filter);

  return (
    <>
      <Helmet>
        <title>Case Studies "" AI Agentix</title>
        <meta name="description" content="Real results from real businesses. See how AI Agentix automated operations across healthcare, education, real estate, e-commerce, and logistics." />
      </Helmet>
      <SiteNav />

      {/* ⓀⓀ 1. HERO "" Dark ⓀⓀ */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '52vh', display: 'flex', alignItems: 'center', paddingTop: 100, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <TrendingUp size={13} color="#E8631A" />
            <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>5 Case Studies. Real Numbers.</span>
          </motion.div>
          <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,60px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Real Businesses.<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Measurable Results.</span>
          </motion.h1>
          <motion.p {...up(0.14)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px', fontFamily: 'var(--font-body)' }}>
            No stock photos of happy people in offices. Just documented results from deployments across India.
          </motion.p>
          {/* Filter pills */}
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {INDUSTRIES.map(ind => (
              <button key={ind} onClick={() => setFilter(ind)}
                style={{ padding: '8px 20px', borderRadius: 100, border: `1px solid ${filter === ind ? '#E8631A' : 'rgba(255,255,255,0.15)'}`, background: filter === ind ? '#E8631A' : 'transparent', color: filter === ind ? '#fff' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
                {ind}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 2. CASE STUDIES GRID "" WHITE, left list + right panel ⓀⓀ */}
      <section style={{ background: '#fff', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 40, alignItems: 'start' }}>
          {/* Left: study list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AnimatePresence>
              {filtered.map(cs => (
                <motion.button key={cs.id} layout initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}
                  onClick={() => setActive(cs)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 18px', borderRadius: 14, border: 'none', cursor: 'pointer', textAlign: 'left', background: active.id === cs.id ? `${cs.color}10` : '#F9FAFB', borderLeft: `3px solid ${active.id === cs.id ? cs.color : 'transparent'}`, transition: 'all 0.2s' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${cs.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cs.color, flexShrink: 0, marginTop: 2 }}>{cs.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: active.id === cs.id ? '#0D1B2E' : '#374151' }}>{cs.client}</div>
                    <div style={{ fontSize: 11, color: cs.color, fontFamily: 'var(--font-body)', fontWeight: 500, marginTop: 3 }}>{cs.industry} Â· {cs.location}</div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Right: full case study panel */}
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
              {/* Header */}
              <div style={{ background: `${active.color}08`, border: `1px solid ${active.color}20`, borderRadius: 20, padding: 36, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${active.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: active.color }}>{active.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: active.color, fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>{active.industry} Â· {active.location}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, color: '#4B5563', marginTop: 2 }}>{active.client}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 100, padding: '6px 14px' }}>
                    <Clock size={12} color="#9CA3AF" />
                    <span style={{ fontSize: 12, color: '#6B7280', fontFamily: 'var(--font-body)' }}>Deployed in {active.timeline}</span>
                  </div>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#0D1B2E', marginBottom: 0 }}>{active.tagline}</h2>
              </div>

              {/* Challenge + Solution grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                <div style={{ padding: 28, background: '#FEF2F2', borderRadius: 16, border: '1px solid #FEE2E2' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-body)' }}>The Challenge</div>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>{active.challenge}</p>
                </div>
                <div style={{ padding: 28, background: '#F0FDF4', borderRadius: 16, border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'var(--font-body)' }}>The Solution</div>
                  {active.solution.map(s => (
                    <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <CheckCircle size={13} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
                {active.stats.map(stat => (
                  <div key={stat.l} style={{ textAlign: 'center', padding: '20px 12px', background: `${active.color}08`, border: `1px solid ${active.color}20`, borderRadius: 14 }}>
                    <div style={{ fontFamily: 'var(--font-number)', fontSize: 28, fontWeight: 700, color: active.color, lineHeight: 1 }}>{stat.v}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#0D1B2E', margin: '8px 0 4px' }}>{stat.l}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)' }}>{stat.s}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{ background: '#0D1B2E', borderRadius: 16, padding: '28px 32px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <Quote size={32} color="rgba(232,99,26,0.3)" style={{ flexShrink: 0, marginTop: 4 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: 12 }}>"{active.quote}"</p>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', fontFamily: 'var(--font-body)' }}>"" {active.quoteBy}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ⓀⓀ 3. AGGREGATE STATS "" Dark ⓀⓀ */}
      <section style={{ background: '#060E1A', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Across All Deployments</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>The Numbers Add Up</h2>
          </motion.div>
          <motion.div {...up(0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { v: '200+', l: 'Automations Deployed', s: 'Across 7 industries' },
              { v: '₹50Cr+', l: 'Revenue Generated', s: 'For our clients combined' },
              { v: '8x', l: 'Average ROI', s: 'Measured at 6 months' },
              { v: '97%', l: 'Client Satisfaction', s: 'Post-deployment score' },
            ].map((s, i) => (
              <div key={s.l} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 700, color: '#E8631A', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', marginTop: 10 }}>{s.l}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontFamily: 'var(--font-body)' }}>{s.s}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⓀⓀ 4. CTA "" White ⓀⓀ */}
      <section style={{ background: '#fff', padding: '96px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, marginBottom: 20 }}>
            Your Business Could Be<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Next Case Study</span>
          </motion.h2>
          <motion.p {...up(0.08)} style={{ fontSize: 17, color: '#6B7280', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Book a free discovery call. We'll identify the highest-impact automation for your workflows and show you the expected ROI before you commit.
          </motion.p>
          <motion.div {...up(0.14)} style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.3)' }}>
              Book Free Strategy Call <ArrowRight size={17} />
            </Link>
            <Link to="/solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #E5E7EB', color: '#0D1B2E', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              See Solutions
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <VoiceAgentWidget />
    </>
  );
}

