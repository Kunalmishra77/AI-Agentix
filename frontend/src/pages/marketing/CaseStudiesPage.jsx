import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, GraduationCap, Building2, ShoppingCart, Truck, Factory, Hotel,
  Star, ArrowRight, ChevronRight, CheckCircle, Quote, Zap, TrendingUp,
  Clock, X, MapPin, Users, BarChart3, BookOpen, ChevronLeft,
} from 'lucide-react';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import '../../styles/ax-brand.css';

const VP = { once: true, margin: '-80px' };
const up = (d = 0) => ({ initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: VP, transition: { duration: 0.65, delay: d, ease: [0.25, 0.1, 0.25, 1] } });

const INDUSTRIES = ['All', 'Healthcare', 'Education', 'Real Estate', 'E-commerce', 'Logistics', 'Hospitality', 'Manufacturing'];

const CASES = [
  {
    id: 'healthcare', industry: 'Healthcare', icon: <Heart size={20} />, color: '#EC4899',
    client: 'Multi-Specialty Clinic Chain', location: 'New Delhi',
    tagline: 'From 35% No-Show Rate to Full Appointment Books',
    readTime: '5 min read',
    excerpt: 'A 12-doctor clinic was losing ₹8L every month to no-shows and overwhelmed front desk staff. Here\'s how AI automation recovered it all in 8 weeks.',
    challenge: 'A 12-doctor clinic losing ₹8L/month to no-shows. Front desk of 4 overwhelmed with 300+ daily calls — reminders and rescheduling consumed 80% of working hours.',
    background: 'The clinic had tried SMS reminders manually, but inconsistent follow-up meant patients simply forgot. Staff morale was low from repetitive calling work. Revenue leakage was consistent and growing.',
    solution: [
      'AI voice agent handling all inbound calls 24/7 with natural Hindi/English conversations',
      'Automated 3-touch reminder sequence (48h, 24h, 2h before appointment)',
      'Smart rescheduling with real-time slot availability from clinic calendar',
      'Post-consultation follow-up flows for prescription reminders and review requests',
      'Google Reviews automation triggered post each successful visit',
    ],
    process: [
      { step: '01', title: 'Audit & Mapping', desc: 'Week 1–2: mapped all patient touchpoints, call scripts, and appointment flows.' },
      { step: '02', title: 'AI Voice Build', desc: 'Week 2–4: built voice agent trained on clinic protocols, specialties, and doctor schedules.' },
      { step: '03', title: 'Integration', desc: 'Week 4–6: connected to clinic management software, Google Calendar, and WhatsApp.' },
      { step: '04', title: 'Launch & Tune', desc: 'Week 6–8: went live, monitored calls daily, refined scripts based on patient responses.' },
    ],
    stats: [
      { v: '65%', l: 'Reduction in no-shows', s: 'From 35% to 12%' },
      { v: '₹8L', l: 'Monthly revenue recovered', s: 'Previously lost to empty slots' },
      { v: '4→1', l: 'Front desk reduction', s: 'One person now handles 4 people\'s work' },
      { v: '4.2★', l: 'Google rating increase', s: 'From 3.1 stars in 4 months' },
    ],
    timeline: '8 weeks',
    quote: 'We went from dreading Mondays to looking forward to them. The AI handles everything our front desk used to dread.',
    quoteBy: 'Dr. Priya Sharma — Medical Director',
    tags: ['Voice AI', 'Appointment Automation', 'WhatsApp', 'Google Reviews'],
  },
  {
    id: 'education', industry: 'Education', icon: <GraduationCap size={20} />, color: '#6366F1',
    client: 'CA & CMA Coaching Institute', location: 'Hyderabad, Telangana',
    tagline: 'Enrollment Conversion Tripled in 90 Days',
    readTime: '6 min read',
    excerpt: '1,200+ monthly enquiries and only 18% converting. Counsellors burning out on repetitive calls. AI transformed this into a lean, high-converting admissions machine.',
    challenge: '1,200+ monthly enquiries. Only 18% converting. Counsellors spending 6hrs/day on repetitive qualification calls, leaving no time for actual counselling.',
    background: 'The institute was running aggressive social media ads but the lead-to-enrollment funnel was leaking badly. Students enquired, got a generic response, and chose a competitor who responded faster or more personally.',
    solution: [
      'Instant lead response (<90 seconds) across WhatsApp, website, and Instagram DMs',
      'AI chat agent with counsellor-quality responses for CA/CMA/CFA track queries',
      'Automated lead scoring and qualification — counsellors only called "hot" leads',
      'Personalized 21-day drip campaign tailored to each exam track',
      'Fee collection via WhatsApp payment links with automated receipt + welcome sequence',
    ],
    process: [
      { step: '01', title: 'Funnel Analysis', desc: 'Week 1: identified exact drop-off points across channels and time-to-respond gaps.' },
      { step: '02', title: 'Knowledge Base Build', desc: 'Week 2–3: trained AI on every course, fee, exam date, and counsellor FAQ.' },
      { step: '03', title: 'Multi-Channel Deploy', desc: 'Week 3–5: deployed across WhatsApp Business, website chat widget, and DM auto-responders.' },
      { step: '04', title: 'Drip Activation', desc: 'Week 5–6: launched segmented nurture sequences for unconverted leads by exam track.' },
    ],
    stats: [
      { v: '55%', l: 'Enrollment conversion', s: 'Up from 18% — 3x improvement' },
      { v: '70%', l: 'Counsellor time saved', s: 'From 6hrs to 1.8hrs/day' },
      { v: '< 90s', l: 'Lead response time', s: 'All 1,200+ enquiries per month' },
      { v: '₹32L', l: 'Additional monthly revenue', s: 'Same marketing spend' },
    ],
    timeline: '6 weeks',
    quote: 'Our counsellors now only talk to students who are genuinely ready to enrol. Conversion went through the roof.',
    quoteBy: 'Rajesh Mehta — Founder & Director',
    tags: ['Lead Automation', 'WhatsApp AI', 'Drip Campaigns', 'EdTech'],
  },
  {
    id: 'real-estate', industry: 'Real Estate', icon: <Building2 size={20} />, color: '#E8631A',
    client: 'Residential Developer — 500-unit Project', location: 'Mumbai, Maharashtra',
    tagline: 'Lead-to-Site-Visit Time Cut from 5 Days to 4 Hours',
    readTime: '7 min read',
    excerpt: '3,000 leads per month across 6 portals, a sales team drowning in manual follow-up, and site visits taking 5 days to book. AI compressed 5 days into 4 hours.',
    challenge: '3,000+ leads/month from 6 portals. Sales team of 12 drowning — each managing 250+ leads with no systematic follow-up. Site visit bookings taking 5+ days.',
    background: 'The developer was spending ₹12L/month on marketing across 99acres, MagicBricks, Housing.com, and Facebook. But ROI was poor because the sales team couldn\'t respond fast enough. Hot leads went cold in hours.',
    solution: [
      'Unified lead capture with automatic deduplication across all 6 portals',
      'AI voice qualification call placed within 5 minutes of any new lead',
      'Automated site visit booking with Google Calendar integration for each salesperson',
      'Long-cycle nurture with project progress updates, EMI calculators, and floor plan shares',
      'Broker onboarding automation + full CRM pipeline management via WhatsApp',
    ],
    process: [
      { step: '01', title: 'Portal Integration', desc: 'Week 1–2: connected all 6 portals to a single unified lead inbox with de-dup logic.' },
      { step: '02', title: 'Voice AI Build', desc: 'Week 2–5: built qualification voice agent trained on project specs, pricing, and FAQs.' },
      { step: '03', title: 'Calendar Sync', desc: 'Week 5–7: integrated salesperson calendars for real-time site visit auto-booking.' },
      { step: '04', title: 'Broker Module', desc: 'Week 7–10: launched broker onboarding automation and broker-specific update flows.' },
    ],
    stats: [
      { v: '4 hrs', l: 'Lead-to-site-visit time', s: 'Down from 5 days (30x faster)' },
      { v: '22%', l: 'Site visit conversion', s: 'Up from 8% — 2.75x improvement' },
      { v: '3x', l: 'Sales productivity', s: 'Same team, 3x more deals' },
      { v: '₹4.2Cr', l: 'Additional quarterly sales', s: 'Attributed to automation' },
    ],
    timeline: '10 weeks',
    quote: 'The AI qualifies leads better than some of our senior salespeople. It asks the right questions and never gets tired.',
    quoteBy: 'Vikram Shah — VP Sales',
    tags: ['Sales AI', 'Lead Qualification', 'Real Estate CRM', 'Site Visit Automation'],
  },
  {
    id: 'ecom', industry: 'E-commerce', icon: <ShoppingCart size={20} />, color: '#F59E0B',
    client: 'D2C Fashion Brand', location: 'Bengaluru, Karnataka',
    tagline: 'Support Costs Cut 68% While Ticket Volume Doubled',
    readTime: '5 min read',
    excerpt: '500+ daily support tickets, 6-hour resolution times, and a team burning out every sale season. AI flipped the script — resolving 82% of tickets without any human.',
    challenge: '500+ daily support tickets. 6-hour average resolution time. Support team burning out during sale seasons. Customer satisfaction falling despite more headcount.',
    background: 'The brand was scaling fast but support wasn\'t keeping up. During sale events, response times hit 12+ hours. Social media complaints were hurting the brand. Hiring more agents was not solving the problem.',
    solution: [
      'AI support agent trained on full product catalog, size guides, and return policy',
      'Order status, returns, size queries, and COD queries automated end-to-end',
      'Seamless escalation with full conversation context handed to human agent',
      'Post-purchase review request automation via WhatsApp 5 days after delivery',
      'Abandoned cart recovery sequence via WhatsApp with personalized product images',
    ],
    process: [
      { step: '01', title: 'Ticket Analysis', desc: 'Week 1: categorized 30 days of tickets — 82% fell into 6 query types.' },
      { step: '02', title: 'AI Training', desc: 'Week 1–2: trained AI on catalog, policies, Shopify order data, and escalation rules.' },
      { step: '03', title: 'WhatsApp Deploy', desc: 'Week 2–3: deployed on WhatsApp Business + website chat with live agent handoff.' },
      { step: '04', title: 'Abandoned Cart', desc: 'Week 3–4: launched 3-step abandoned cart recovery sequence with product previews.' },
    ],
    stats: [
      { v: '82%', l: 'Tickets auto-resolved', s: 'Without human intervention' },
      { v: '4 min', l: 'Avg. resolution time', s: 'Down from 6 hours' },
      { v: '₹8L', l: 'Support cost saved/month', s: 'While handling 2x volume' },
      { v: '+18%', l: 'Customer satisfaction', s: 'CSAT score improvement' },
    ],
    timeline: '4 weeks',
    quote: 'Abandoned cart recovery alone recovered ₹12L in the first month. That\'s our entire AI Agentix investment for a year.',
    quoteBy: 'Pooja Malhotra — Founder, StyleCraft',
    tags: ['Customer Support AI', 'Shopify Automation', 'Abandoned Cart', 'WhatsApp Commerce'],
  },
  {
    id: 'logistics', industry: 'Logistics', icon: <Truck size={20} />, color: '#0EA5E9',
    client: 'Last-Mile Delivery Company', location: 'Delhi NCR',
    tagline: 'Operations Fully Automated — Manager Reviews Exceptions Only',
    readTime: '6 min read',
    excerpt: 'Operations managers wasting 4 hours every morning on manual dispatch, client calls, and invoice reconciliation. Now fully automated before 7 AM.',
    challenge: 'Ops managers spending 4 hours every morning on manual dispatch coordination, client update calls, and invoice reconciliation. No visibility on delays until customers complained.',
    background: 'The company was growing from 500 to 1,000+ daily shipments but headcount wasn\'t scaling. The ops team was stretched thin, errors were rising, and client satisfaction was dropping. They needed to 2x capacity without 2x cost.',
    solution: [
      'AI-driven dispatch with route optimization using real-time traffic data',
      'Automated client shipment status updates via WhatsApp at key milestones',
      'Invoice auto-generation from delivery confirmation data into Tally',
      'Exception alert system — proactive delay notifications before customers ask',
      'Driver performance analytics dashboard updated daily',
    ],
    process: [
      { step: '01', title: 'Ops Audit', desc: 'Week 1: shadowed ops team for a week, mapped every manual step and decision.' },
      { step: '02', title: 'Route AI Build', desc: 'Week 2–4: built dispatch and route optimizer integrated with Google Maps API.' },
      { step: '03', title: 'Client Comms', desc: 'Week 4–5: automated status update flows via WhatsApp at pickup, transit, and delivery.' },
      { step: '04', title: 'Finance Automation', desc: 'Week 5–6: built Tally integration for zero-touch invoice generation and reconciliation.' },
    ],
    stats: [
      { v: '50%', l: 'Faster operations', s: 'Daily ops completed by 7 AM' },
      { v: '35%', l: 'Fewer coordination calls', s: 'Clients get automated updates' },
      { v: '₹6L', l: 'Monthly ops overhead saved', s: 'Equivalent to 3 coordinator roles' },
      { v: '99.2%', l: 'On-time delivery rate', s: 'Up from 91% with proactive alerts' },
    ],
    timeline: '6 weeks',
    quote: 'What took my ops team 4 hours every morning now runs automatically by 7 AM. I just review the exception report.',
    quoteBy: 'Aditya Kumar — CEO, SwiftShip Logistics',
    tags: ['Operations Automation', 'Route Optimization', 'Tally Integration', 'WhatsApp Updates'],
  },
  {
    id: 'hospitality', industry: 'Hospitality', icon: <Hotel size={20} />, color: '#10B981',
    client: 'Boutique Hotel Chain (12 Properties)', location: 'Rajasthan',
    tagline: 'Direct Booking Revenue Up 41% After AI Concierge Launch',
    readTime: '5 min read',
    excerpt: 'A heritage hotel chain losing direct bookings to OTAs and struggling with pre-arrival guest communication. AI concierge changed the game — 41% more direct revenue.',
    challenge: 'Over 60% of bookings via OTAs costing 18–22% commission. Pre-arrival guest communication was inconsistent. Review management across 12 properties was manual and slow.',
    background: 'The chain had strong repeat customers but couldn\'t convert them to direct bookings. Guest experience post-booking was minimal — no pre-arrival excitement, no upsell, no connection before check-in.',
    solution: [
      'WhatsApp AI concierge activated on every booking confirmation',
      'Pre-arrival personalization: dining preferences, room customisation, local experiences',
      'Upsell automation for spa, airport transfers, and heritage tours',
      'Post-checkout review requests timed for peak sentiment moments',
      'Centralized review monitoring across all 12 properties with AI-drafted responses',
    ],
    process: [
      { step: '01', title: 'Guest Journey Map', desc: 'Week 1–2: documented every guest touchpoint from booking to checkout across all 12 properties.' },
      { step: '02', title: 'WhatsApp Concierge Build', desc: 'Week 2–4: built multilingual concierge (Hindi/English) trained on each property\'s offerings.' },
      { step: '03', title: 'Upsell Logic', desc: 'Week 4–5: configured upsell triggers based on booking type, duration, and guest profile.' },
      { step: '04', title: 'Review System', desc: 'Week 5–6: deployed review automation and AI response system across Google and TripAdvisor.' },
    ],
    stats: [
      { v: '41%', l: 'Direct booking revenue up', s: 'OTA dependency reduced to 38%' },
      { v: '₹3.2L', l: 'Monthly upsell revenue', s: 'From spa, tours, and transfers' },
      { v: '4.7★', l: 'Avg. Google rating', s: 'Across all 12 properties' },
      { v: '2.4x', l: 'Review volume increase', s: 'With automated post-stay requests' },
    ],
    timeline: '6 weeks',
    quote: 'Guests now feel connected before they even arrive. The upsell revenue alone pays for the automation 3x over.',
    quoteBy: 'Sunita Rathore — Group GM',
    tags: ['Hospitality AI', 'WhatsApp Concierge', 'OTA Reduction', 'Review Automation'],
  },
  {
    id: 'manufacturing', industry: 'Manufacturing', icon: <Factory size={20} />, color: '#8B5CF6',
    client: 'Auto Components Manufacturer', location: 'Pune, Maharashtra',
    tagline: 'Procurement Automation Saved ₹18L/Month in 3 Months',
    readTime: '6 min read',
    excerpt: 'Manual procurement, vendor follow-ups eating hours daily, and no real-time visibility into inventory. AI automated the entire procurement-to-payment cycle.',
    challenge: 'Purchase team of 6 spending 60% of time on vendor follow-ups, PO generation, and invoice reconciliation. No real-time inventory visibility led to frequent stockouts and over-ordering.',
    background: 'The company supplied components to 4 large OEMs with tight JIT schedules. Manual procurement meant delays, penalties, and expensive emergency orders. The team was reactive, not proactive.',
    solution: [
      'AI procurement agent auto-generating POs based on inventory triggers and reorder points',
      'Automated vendor follow-up via WhatsApp and email with escalation logic',
      'Three-way matching (PO, GRN, invoice) automation integrated with Tally ERP',
      'Real-time inventory dashboard with predicted stockout alerts 7 days in advance',
      'Supplier performance scoring updated automatically after each transaction',
    ],
    process: [
      { step: '01', title: 'Inventory Audit', desc: 'Week 1–2: mapped all 340 SKUs, reorder points, and vendor lead times.' },
      { step: '02', title: 'PO Automation', desc: 'Week 2–4: built PO generation engine with approval workflow and Tally sync.' },
      { step: '03', title: 'Vendor Comms', desc: 'Week 4–6: deployed WhatsApp/email follow-up sequences for all active POs.' },
      { step: '04', title: 'Dashboard Build', desc: 'Week 6–8: launched real-time inventory and supplier performance dashboards.' },
    ],
    stats: [
      { v: '₹18L', l: 'Monthly savings', s: 'Procurement + emergency order costs' },
      { v: '0', l: 'Stockouts in 3 months', s: 'Down from avg. 8/month' },
      { v: '75%', l: 'Team time saved', s: 'On manual procurement tasks' },
      { v: '12%', l: 'Better negotiated pricing', s: 'With data-driven vendor reviews' },
    ],
    timeline: '8 weeks',
    quote: 'We used to find out about stockouts when the line stopped. Now the AI tells me 7 days in advance.',
    quoteBy: 'Ramesh Patil — Head of Procurement',
    tags: ['Procurement AI', 'ERP Integration', 'Vendor Management', 'Inventory Automation'],
  },
];

function CaseCard({ cs, onClick, delay }) {
  return (
    <motion.div {...up(delay)}
      onClick={() => onClick(cs)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        border: '1px solid #F3F4F6', cursor: 'pointer',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'all 0.25s',
        display: 'flex', flexDirection: 'column',
      }}
      whileHover={{ y: -4, boxShadow: `0 16px 40px rgba(0,0,0,0.10)` }}>
      {/* Color band */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${cs.color}, ${cs.color}88)` }} />
      <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${cs.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cs.color }}>
              {cs.icon}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: cs.color, fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cs.industry}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={9} /> {cs.location}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)' }}>
            <BookOpen size={11} /> {cs.readTime}
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#0D1B2E', lineHeight: 1.3, marginBottom: 12 }}>{cs.tagline}</h3>
        <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, fontFamily: 'var(--font-body)', flex: 1, marginBottom: 20 }}>{cs.excerpt}</p>

        {/* Stats mini */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {cs.stats.slice(0, 2).map(s => (
            <div key={s.l} style={{ padding: '10px 12px', background: `${cs.color}08`, borderRadius: 10, border: `1px solid ${cs.color}18` }}>
              <div style={{ fontFamily: 'var(--font-number)', fontSize: 18, fontWeight: 700, color: cs.color, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 10, color: '#6B7280', fontFamily: 'var(--font-body)', marginTop: 3, lineHeight: 1.3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          {cs.tags.slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 10, color: '#6B7280', background: '#F3F4F6', borderRadius: 100, padding: '3px 9px', fontFamily: 'var(--font-body)' }}>{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: cs.color, fontFamily: 'var(--font-display)' }}>
          Read Case Study <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

function ArticleModal({ cs, onClose }) {
  if (!cs) return null;
  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '40px 20px', overflowY: 'auto',
      }}>
      <motion.div
        key="modal-panel"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 24, overflow: 'hidden',
          maxWidth: 860, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        }}>

        {/* Article hero */}
        <div style={{ background: `linear-gradient(135deg, #0D1B2E 0%, ${cs.color}22 100%)`, padding: '44px 48px 40px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cs.color}20`, border: `1px solid ${cs.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cs.color }}>{cs.icon}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: cs.color, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>{cs.industry}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <MapPin size={10} /> {cs.location} · <Clock size={10} /> {cs.readTime} · Deployed in {cs.timeline}
              </div>
            </div>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.8vw,34px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>{cs.tagline}</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontFamily: 'var(--font-body)', maxWidth: 640 }}>{cs.excerpt}</p>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
            {cs.tags.map(t => (
              <span key={t} style={{ fontSize: 11, color: cs.color, background: `${cs.color}15`, border: `1px solid ${cs.color}30`, borderRadius: 100, padding: '4px 12px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Stat bar */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.stats.length}, 1fr)`, background: cs.color }}>
          {cs.stats.map((s, i) => (
            <div key={s.l} style={{ textAlign: 'center', padding: '18px 12px', borderRight: i < cs.stats.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-number)', fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>{s.l}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2, fontFamily: 'var(--font-body)' }}>{s.s}</div>
            </div>
          ))}
        </div>

        {/* Article body */}
        <div style={{ padding: '40px 48px' }}>

          {/* Background / Context */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 12 }}>The Context</h2>
          <div style={{ padding: 24, background: '#FEF9F0', borderRadius: 14, border: '1px solid #FED7AA', marginBottom: 32 }}>
            <p style={{ fontSize: 14, color: '#92400E', lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>{cs.background}</p>
          </div>

          {/* Challenge */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 12 }}>The Challenge</h2>
          <div style={{ padding: 24, background: '#FEF2F2', borderRadius: 14, border: '1px solid #FEE2E2', marginBottom: 32 }}>
            <p style={{ fontSize: 14, color: '#991B1B', lineHeight: 1.75, fontFamily: 'var(--font-body)', margin: 0 }}>{cs.challenge}</p>
          </div>

          {/* Solution */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 16 }}>The Solution</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {cs.solution.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 18px', background: '#F0FDF4', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <CheckCircle size={13} color="#fff" />
                </div>
                <span style={{ fontSize: 14, color: '#166534', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Process */}
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#0D1B2E', marginBottom: 16 }}>Implementation Timeline</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 36 }}>
            {cs.process.map((p, i) => (
              <div key={i} style={{ padding: '18px 20px', background: `${cs.color}06`, borderRadius: 14, border: `1px solid ${cs.color}18` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: cs.color, letterSpacing: '0.1em', fontFamily: 'var(--font-body)', marginBottom: 6 }}>PHASE {p.step}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#0D1B2E', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, fontFamily: 'var(--font-body)' }}>{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div style={{ background: '#0D1B2E', borderRadius: 18, padding: '28px 32px', display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 36 }}>
            <Quote size={36} color={`${cs.color}55`} style={{ flexShrink: 0, marginTop: 4 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, marginBottom: 14 }}>"{cs.quote}"</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: cs.color, fontFamily: 'var(--font-body)' }}>— {cs.quoteBy}</div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', paddingTop: 8 }}>
            <p style={{ fontSize: 14, color: '#6B7280', fontFamily: 'var(--font-body)', marginBottom: 20 }}>Want results like this for your business?</p>
            <Link to="/contact" onClick={onClose}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `linear-gradient(90deg, ${cs.color}, #F59E0B)`, color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: `0 6px 24px ${cs.color}40` }}>
              Book a Free Strategy Call <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudiesPage() {
  const [filter, setFilter] = useState('All');
  const [openCase, setOpenCase] = useState(null);

  const filtered = filter === 'All' ? CASES : CASES.filter(c => c.industry === filter);

  return (
    <>
      <Helmet>
        <title>Case Studies — AI Agentix</title>
        <meta name="description" content="Real results from real businesses. See how AI Agentix automated operations across healthcare, education, real estate, e-commerce, logistics, hospitality, and manufacturing." />
      </Helmet>
      <SiteNav />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg,#0D1B2E 0%,#0F2240 100%)', minHeight: '52vh', display: 'flex', alignItems: 'center', paddingTop: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ padding: '60px 40px', textAlign: 'center' }}>
          <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
            <TrendingUp size={13} color="#E8631A" />
            <span style={{ fontSize: 12, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>7 Case Studies · Real Numbers</span>
          </motion.div>
          <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,60px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
            Real Businesses.<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Measurable Results.</span>
          </motion.h1>
          <motion.p {...up(0.14)} style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520, margin: '0 auto 36px', fontFamily: 'var(--font-body)' }}>
            No stock photos of happy people in offices. Just documented results from AI deployments across India.
          </motion.p>
          {/* Filter pills */}
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {INDUSTRIES.map(ind => (
              <button key={ind} onClick={() => setFilter(ind)}
                style={{ padding: '7px 18px', borderRadius: 100, border: `1px solid ${filter === ind ? '#E8631A' : 'rgba(255,255,255,0.15)'}`, background: filter === ind ? '#E8631A' : 'transparent', color: filter === ind ? '#fff' : 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s' }}>
                {ind}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section style={{ background: '#F9FAFB', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
            <div>
              <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,26px)', fontWeight: 800, color: '#0D1B2E', margin: 0 }}>
                {filter === 'All' ? `All Case Studies (${CASES.length})` : `${filter} (${filtered.length})`}
              </motion.h2>
              <motion.p {...up(0.05)} style={{ fontSize: 13, color: '#9CA3AF', fontFamily: 'var(--font-body)', margin: '4px 0 0' }}>Click any card to read the full article</motion.p>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
              {filtered.map((cs, i) => (
                <CaseCard key={cs.id} cs={cs} onClick={setOpenCase} delay={i * 0.06} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* AGGREGATE STATS */}
      <section style={{ background: '#060E1A', padding: '80px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Across All Deployments</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.8vw,38px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>The Numbers Add Up</h2>
          </motion.div>
          <motion.div {...up(0.1)} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              { v: '200+', l: 'Automations Deployed', s: 'Across 7+ industries' },
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

      {/* INDUSTRIES STRIP */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6366F1', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Industry Coverage</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 800, color: '#0D1B2E', marginTop: 12 }}>We've Automated Across</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {CASES.map((cs, i) => (
              <motion.div key={cs.id} {...up(i * 0.04)}
                onClick={() => { setFilter(cs.industry); window.scrollTo({ top: 480, behavior: 'smooth' }); }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 14, background: '#F9FAFB', border: `1px solid ${cs.color}22`, cursor: 'pointer', transition: 'all 0.2s' }}
                whileHover={{ background: `${cs.color}08`, borderColor: `${cs.color}40` }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${cs.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cs.color, flexShrink: 0 }}>{cs.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#0D1B2E' }}>{cs.industry}</div>
                  <div style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginTop: 2 }}>{cs.stats[0].v} {cs.stats[0].l}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#F9FAFB', padding: '96px 0', textAlign: 'center' }}>
        <div className="ax-container" style={{ padding: '0 40px' }}>
          <motion.h2 {...up(0)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, marginBottom: 20 }}>
            Your Business Could Be<br />
            <span style={{ background: 'linear-gradient(90deg,#E8631A,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>The Next Case Study</span>
          </motion.h2>
          <motion.p {...up(0.08)} style={{ fontSize: 17, color: '#6B7280', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
            Book a free discovery call. We'll identify the highest-impact automation for your workflow and show you the expected ROI before you commit.
          </motion.p>
          <motion.div {...up(0.14)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg,#E8631A,#F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '14px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 6px 24px rgba(232,99,26,0.3)' }}>
              Book Free Strategy Call <ArrowRight size={17} />
            </Link>
            <Link to="/solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #E5E7EB', color: '#0D1B2E', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
              See Solutions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {openCase && <ArticleModal cs={openCase} onClose={() => setOpenCase(null)} />}
      </AnimatePresence>

      <SiteFooter />
      <VoiceAgentWidget />

      <style>{`
        @media (max-width: 640px) {
          .ax-container { padding: 0 20px !important; }
        }
      `}</style>
    </>
  );
}
