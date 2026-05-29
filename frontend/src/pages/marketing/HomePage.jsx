import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Play, ChevronRight, Star, Check, X,
  Zap, Brain, BarChart3, Users, Clock, TrendingUp, Shield,
  Bot, Globe, Phone, Mail, MessageSquare, ShoppingCart,
  Factory, Truck, GraduationCap, Hotel, Building2, Heart,
  Sparkles, Target, Award, Workflow, Package, CheckCircle,
  AlertCircle, DollarSign, Timer, Cpu, Layers, Rocket, Quote,
  ChevronDown
} from 'lucide-react';
import {
  SiOpenai, SiAnthropic, SiGooglecloud, SiMeta,
  SiHubspot, SiMake, SiWhatsapp, SiTwilio, SiRazorpay, SiLangchain,
  SiZapier, SiSlack,
} from 'react-icons/si';
import SiteNav from '../../components/layout/SiteNav.jsx';
import SiteFooter from '../../components/layout/SiteFooter.jsx';
import PreloaderGate from '../../voice-agent/PreloaderGate.jsx';
import VoiceAgentWidget from '../../voice-agent/VoiceAgentWidget.jsx';
import ScrollProgress from '../../components/ui/ScrollProgress.jsx';
import '../../styles/ax-brand.css';
import '../../styles/ax-premium.css';

/* ── Animation helpers ────────────────────────────── */
const VP = { once: true, margin: '-80px' };
const up = (delay = 0, dur = 0.65) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VP,
  transition: { duration: dur, delay, ease: [0.25, 0.1, 0.25, 1] },
});
const left = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VP,
  transition: { duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] },
});
const right = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VP,
  transition: { duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] },
});
const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: VP,
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
});

/* ── useCountUp hook ───────────────────────────────── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(ease * target));
        if (p < 1) requestAnimationFrame(tick);
        else setCount(target);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ── Data ─────────────────────────────────────────── */
const PAIN_ITEMS = [
  {
    icon: <Timer size={26} />,
    title: '67% of Leads Go Cold Within 1 Hour',
    desc: 'Your sales team is busy. Manual follow-ups get delayed. Competitors who automate respond in seconds — and win.',
    stat: '67%',
    statSub: 'leads never followed up',
    color: '#DC2626',
  },
  {
    icon: <DollarSign size={26} />,
    title: '₹8 Lakh+ Per Month Lost to Admin Errors',
    desc: 'Data entry mistakes, missed invoices, delayed reports — the hidden cost of manual processes drains your margins silently.',
    stat: '₹8L+',
    statSub: 'avg. monthly loss',
    color: '#DC2626',
  },
  {
    icon: <Clock size={26} />,
    title: '3.5 Hours / Day Per Employee on Repetitive Tasks',
    desc: 'Your best people are doing work a machine should handle. That\'s over 40% of their day gone to zero-value activity.',
    stat: '3.5 hrs',
    statSub: 'daily per employee',
    color: '#DC2626',
  },
  {
    icon: <AlertCircle size={26} />,
    title: 'No Real-Time Visibility — Just Gut Feelings',
    desc: 'Decisions made on last month\'s data, in spreadsheets nobody trusts. The business runs blind while competitors run dashboards.',
    stat: '83%',
    statSub: 'businesses lack real-time data',
    color: '#DC2626',
  },
];

const STAT_DATA = [
  { num: 200, suffix: '+', label: 'Businesses Automated', sub: 'Across 15+ industries' },
  { num: 97, suffix: '%', label: 'Client Satisfaction', sub: 'Measured post-deployment' },
  { num: 50, suffix: 'Cr+', label: 'Revenue Generated', sub: 'For our clients combined' },
  { num: 8, suffix: 'x', label: 'Average ROI', sub: 'Within first 6 months' },
];

const BUILD_TABS = [
  {
    label: 'Agentic AI Solutions',
    icon: <Brain size={18} />,
    headline: 'AI Agents That Work While You Sleep',
    desc: 'Deploy intelligent agents that autonomously handle lead qualification, customer follow-ups, and business processes 24/7 — no human intervention needed.',
    features: ['Autonomous lead scoring & routing', 'Multi-step workflow execution', 'Self-learning from outcomes', 'Integrates with your CRM & tools'],
    metric: '98%',
    metricLabel: 'task automation rate',
    color: '#E8631A',
  },
  {
    label: 'End-to-End Automation',
    icon: <Workflow size={18} />,
    headline: 'Connect Every Tool. Eliminate Every Bottleneck.',
    desc: 'We map your entire business flow and automate every repetitive touchpoint — from data entry to reporting — using no-code and AI orchestration.',
    features: ['Cross-platform data sync', 'Auto-generated reports & alerts', 'Error-free invoice & billing flows', 'Slack/Email/WhatsApp integrations'],
    metric: '12x',
    metricLabel: 'faster task completion',
    color: '#6366F1',
  },
  {
    label: 'AI Content Studio',
    icon: <Sparkles size={18} />,
    headline: 'Scale Content Without Scaling Headcount',
    desc: 'Generate brand-aligned blog posts, social media content, product descriptions, and ad copy at scale — personalized for your audience segments.',
    features: ['Brand voice training', '50+ content formats', 'SEO-optimized output', 'Multi-language support'],
    metric: '10x',
    metricLabel: 'content output increase',
    color: '#EC4899',
  },
  {
    label: 'Voice AI Agents',
    icon: <Phone size={18} />,
    headline: '24/7 Voice Agents That Sound Human',
    desc: 'Deploy AI-powered voice agents for inbound calls, appointment booking, and customer queries. Works on phone, WhatsApp voice, and web — in Hindi and English.',
    features: ['Natural language call handling', 'Appointment scheduling & reminders', 'Hindi + English + 12 regional langs', 'CRM sync after every call'],
    metric: '3x',
    metricLabel: 'more calls handled daily',
    color: '#0EA5E9',
  },
  {
    label: 'Finance Automation',
    icon: <BarChart3 size={18} />,
    headline: 'Zero-Error Finance Ops on Autopilot',
    desc: 'Automate invoicing, GST filing, bank reconciliation, and expense management. Integrated with Tally, Zoho Books, and all major Indian accounting platforms.',
    features: ['Auto invoice generation & dispatch', 'GST return preparation', 'Bank reconciliation automation', 'Real-time expense dashboards'],
    metric: '85%',
    metricLabel: 'reduction in manual finance work',
    color: '#10B981',
  },
  {
    label: 'Data Intelligence',
    icon: <Cpu size={18} />,
    headline: 'From Raw Data to Revenue Decisions',
    desc: 'Pull data from every tool you use into unified dashboards. AI surfaces trends, predicts churn, forecasts demand, and delivers insights before problems escalate.',
    features: ['Multi-source data unification', 'Predictive churn & demand models', 'Anomaly detection & auto-alerts', 'Custom executive KPI dashboards'],
    metric: '2.4x',
    metricLabel: 'faster strategic decisions',
    color: '#F59E0B',
  },
];

const HOW_STEPS = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: 'We map your current workflows, identify bottlenecks, and quantify the cost of manual processes. You get a clear automation ROI estimate before we write a single line.',
    duration: '3–5 days',
  },
  {
    num: '02',
    title: 'Solution Architecture',
    desc: 'Our engineers design the exact automation stack — which AI models, which integrations, which workflows — tailored to your tools and team.',
    duration: '1 week',
  },
  {
    num: '03',
    title: 'Build & Integrate',
    desc: 'We build, connect, and test every automation against real business scenarios. No surprise edge cases, no "it works in staging" failures.',
    duration: '2–4 weeks',
  },
  {
    num: '04',
    title: 'Go Live + Optimize',
    desc: 'We monitor performance post-launch, retrain models on your data, and iterate until KPIs are hit. You\'re not left alone after deployment.',
    duration: 'Ongoing',
  },
];

const SOLUTIONS = [
  { id: 'sales', label: 'AI Sales Agent', icon: <Target size={16} />, color: '#E8631A',
    headline: 'Never Miss a Lead Again',
    desc: 'An AI agent that qualifies inbound leads, scores them by intent, routes to the right rep, and follows up automatically within minutes — not hours.',
    bullets: ['Instant lead response < 2 min', 'Intent-based scoring model', 'CRM auto-update on every touchpoint', '3x conversion rate improvement'],
    stat: '340%', statLabel: 'increase in qualified meetings' },
  { id: 'support', label: 'AI Customer Support', icon: <MessageSquare size={16} />, color: '#6366F1',
    headline: 'Support at Scale, Zero Burnout',
    desc: 'Deploy a 24/7 AI support agent that resolves 80% of tickets instantly, escalates complex ones with full context, and learns from every interaction.',
    bullets: ['80% tickets auto-resolved', 'Seamless human handoff', 'Multilingual: EN, HI, and more', 'Integrates with Zendesk, Freshdesk'],
    stat: '80%', statLabel: 'tickets resolved without human' },
  { id: 'content', label: 'AI Content Engine', icon: <Sparkles size={16} />, color: '#EC4899',
    headline: 'Content Factory on Autopilot',
    desc: 'From keyword brief to published post — fully automated. SEO research, outline, draft, images, and scheduling handled by AI trained on your brand voice.',
    bullets: ['Full blog workflow automation', 'Brand voice fine-tuning', 'Auto-publish to CMS', 'SEO metadata generation'],
    stat: '10x', statLabel: 'content output, same team size' },
  { id: 'analytics', label: 'Business Intelligence', icon: <BarChart3 size={16} />, color: '#0EA5E9',
    headline: 'Real-Time Decisions, Not Gut Feels',
    desc: 'Pull data from every tool you use into one live dashboard. AI surfaces anomalies, forecasts trends, and sends alerts before problems become crises.',
    bullets: ['All sources in one view', 'Anomaly detection alerts', 'Predictive revenue forecasting', 'Custom KPI dashboards'],
    stat: '2.4x', statLabel: 'faster decision making' },
  { id: 'hr', label: 'HR & Ops Automation', icon: <Users size={16} />, color: '#10B981',
    headline: 'Ops That Run Without You',
    desc: 'Automate hiring funnels, onboarding workflows, leave management, and payroll triggers. Your HR team focuses on people, not paperwork.',
    bullets: ['Resume screening automation', 'Automated onboarding flows', 'Leave approval workflows', 'Payroll trigger integrations'],
    stat: '60%', statLabel: 'reduction in HR admin time' },
  { id: 'ecom', label: 'E-commerce Automation', icon: <ShoppingCart size={16} />, color: '#F59E0B',
    headline: 'Scale Orders, Not Overheads',
    desc: 'Automate inventory updates, order processing, abandoned cart recovery, and customer win-back campaigns across Shopify, WooCommerce, and more.',
    bullets: ['Real-time inventory sync', 'Abandoned cart recovery flows', 'Auto order status updates', 'Review request sequences'],
    stat: '28%', statLabel: 'increase in repeat purchases' },
  { id: 'voice', label: 'Voice AI Agents', icon: <Phone size={16} />, color: '#0EA5E9',
    headline: 'Calls Answered. Leads Captured. 24/7.',
    desc: 'AI voice agents that handle inbound calls, book appointments, qualify leads, and answer FAQs — in Hindi, English, and 12+ regional languages. No human needed.',
    bullets: ['Natural-sounding voice conversations', 'Appointment booking & confirmation', 'Lead capture to CRM in real-time', 'Works on IVR, WhatsApp & web'],
    stat: '3x', statLabel: 'more calls handled per day' },
  { id: 'finance', label: 'Finance & GST Automation', icon: <BarChart3 size={16} />, color: '#10B981',
    headline: 'Finance Ops Without the Errors',
    desc: 'Automate invoice generation, GST filing, bank reconciliation, and MIS reports. Integrated with Tally, Zoho Books, and Razorpay for seamless Indian accounting.',
    bullets: ['Auto invoice dispatch & tracking', 'GST return preparation & filing', 'Bank reconciliation automation', 'Real-time P&L dashboards'],
    stat: '85%', statLabel: 'reduction in manual finance tasks' },
  { id: 'whatsapp', label: 'WhatsApp Marketing', icon: <MessageSquare size={16} />, color: '#25D366',
    headline: 'Your Best Salesperson Runs on WhatsApp',
    desc: 'Build automated WhatsApp sequences for lead nurturing, re-engagement, and post-sale follow-up. Personalised, compliant with WABA policies, and measurable.',
    bullets: ['Drip campaigns with smart branching', 'Broadcast to segmented contact lists', 'Opt-in/opt-out compliance built-in', 'Analytics: open, click & reply rates'],
    stat: '62%', statLabel: 'higher conversion than email' },
];

const INDUSTRIES = [
  { label: 'Real Estate',    to: '/industries/real-estate',     icon: <Building2 size={22} />, color: '#E8631A', stat: '4.2x ROI' },
  { label: 'Healthcare',     to: '/industries/healthcare',       icon: <Heart size={22} />, color: '#EC4899', stat: '70% less admin' },
  { label: 'Education',      to: '/industries/education',        icon: <GraduationCap size={22} />, color: '#6366F1', stat: '3x enrollments' },
  { label: 'Retail & E-com', to: '/industries/retail-ecommerce', icon: <ShoppingCart size={22} />, color: '#F59E0B', stat: '28% more orders' },
  { label: 'Logistics',      to: '/industries/logistics',        icon: <Truck size={22} />, color: '#0EA5E9', stat: '50% faster ops' },
  { label: 'Hospitality',    to: '/industries/hospitality',      icon: <Hotel size={22} />, color: '#10B981', stat: '92% satisfaction' },
  { label: 'Manufacturing',  to: '/industries/manufacturing',    icon: <Factory size={22} />, color: '#8B5CF6', stat: '35% cost cut' },
];

const RESULTS = [
  {
    company: 'PropTech Startup, Mumbai',
    industry: 'Real Estate',
    color: '#E8631A',
    challenge: 'Sales team spending 4 hrs/day manually qualifying leads from 6 different portals.',
    solution: 'AI lead qualification agent + CRM auto-routing + WhatsApp follow-up sequences.',
    stat1: { num: '340%', label: 'More qualified meetings booked' },
    stat2: { num: '< 90s', label: 'Average first response time' },
    stat3: { num: '₹22L', label: 'Additional monthly revenue' },
  },
  {
    company: 'D2C Brand, Bengaluru',
    industry: 'E-commerce',
    color: '#6366F1',
    challenge: 'Customer support team overwhelmed. 500+ daily tickets, 6-hour average resolution time.',
    solution: 'AI support agent trained on product catalog + escalation logic + Shopify integration.',
    stat1: { num: '82%', label: 'Tickets auto-resolved' },
    stat2: { num: '4 min', label: 'Avg. resolution time (was 6 hrs)' },
    stat3: { num: '₹8L/mo', label: 'Support cost saved' },
  },
];

const TESTIMONIALS_ROW1 = [
  {
    quote: 'We went from losing 60% of inbound leads to responding within 90 seconds. The AI agent handles qualification, WhatsApp follow-ups, CRM updates — everything. Our sales team now only talks to hot leads.',
    author: 'Rajiv Mehta',
    role: 'Founder, RealEdge Properties',
    industry: 'Real Estate',
    result: '340% more meetings',
    color: '#E8631A',
  },
  {
    quote: 'Their automation cut our content production time by 80%. We now publish 5x more content without hiring a single person.',
    author: 'Priya Sharma',
    role: 'Marketing Head, LearnNow',
    industry: 'EdTech',
    result: '5x content output',
    color: '#6366F1',
  },
  {
    quote: 'The AI support agent handles 82% of customer tickets automatically. Our team went from firefighting to strategic work overnight.',
    author: 'Sneha Kapoor',
    role: 'Customer Success Lead, ShopEasy',
    industry: 'E-commerce',
    result: '82% tickets auto-resolved',
    color: '#10B981',
  },
  {
    quote: 'We automated our entire onboarding flow — document collection, verification, welcome sequences. What took 3 days now takes 20 minutes.',
    author: 'Vikram Patel',
    role: 'COO, FinServe India',
    industry: 'Finance',
    result: '3 days → 20 minutes',
    color: '#F59E0B',
  },
  {
    quote: 'Agentix built our WhatsApp lead nurturing sequence. 90-second response time on every inquiry, 24/7. Our conversion rate tripled.',
    author: 'Mehul Desai',
    role: 'Founder, PropNext Realty',
    industry: 'Real Estate',
    result: '3x lead conversion',
    color: '#EC4899',
  },
];

const TESTIMONIALS_ROW2 = [
  {
    quote: 'ROI hit 8x in 4 months. The BI dashboard alone transformed how our leadership makes decisions — finally, real-time data instead of gut feelings.',
    author: 'Aditya Nair',
    role: 'CEO, SupplyLink Logistics',
    industry: 'Logistics',
    result: '8x ROI in 4 months',
    color: '#0EA5E9',
  },
  {
    quote: 'Our HR team used to spend 15 hours a week on resume screening. Now AI does it in minutes and only sends us the top 10 candidates. Game changer.',
    author: 'Riya Joshi',
    role: 'HR Director, TechHire Solutions',
    industry: 'Recruitment',
    result: '15 hrs/week saved',
    color: '#8B5CF6',
  },
  {
    quote: 'We set up automated inventory alerts, purchase order triggers, and supplier communications. Zero manual effort, zero missed reorders.',
    author: 'Suresh Kumar',
    role: 'Operations Manager, ManuCore Ltd.',
    industry: 'Manufacturing',
    result: '0 missed reorders',
    color: '#E8631A',
  },
  {
    quote: 'The voice AI agent books appointments for our clinic 24/7. Patients love it, and our front desk team finally has breathing room.',
    author: 'Dr. Anjali Singh',
    role: 'Clinic Director, HealthFirst',
    industry: 'Healthcare',
    result: '40% more bookings',
    color: '#10B981',
  },
  {
    quote: 'We scaled from 500 to 5,000 students without adding admin staff. The automation handles admissions, fee reminders, and attendance — all of it.',
    author: 'Prakash Iyer',
    role: 'Principal, Vidya Academy',
    industry: 'Education',
    result: '10x student scale',
    color: '#6366F1',
  },
];

const ROI_ITEMS = [
  { num: 8, suffix: 'x', label: 'Average ROI', sub: 'Measured at 6 months' },
  { num: 12, suffix: 'x', label: 'Faster Operations', sub: 'Task completion speed' },
  { num: 60, suffix: '%', label: 'Cost Reduction', sub: 'On automated workflows' },
  { num: 200, suffix: '+', label: 'Deployments', sub: 'Across industries' },
  { num: 97, suffix: '%', label: 'Satisfaction', sub: 'Post-deployment score' },
];

const WHY_ROWS = [
  { label: 'Response Time',   icon: <Timer size={18} />,       bad: 'Hours or days delay',         badStat: '4+ hrs avg.',   good: 'Responds in seconds, always',    goodStat: '< 90 sec',    gain: '160x faster'   },
  { label: 'Scalability',     icon: <TrendingUp size={18} />,  bad: 'Hire more staff to grow',     badStat: '+₹5L per hire', good: 'AI scales with zero extra cost', goodStat: '10x capacity', gain: 'Zero extra cost' },
  { label: 'Accuracy',        icon: <CheckCircle size={18} />, bad: 'Human errors every day',      badStat: '23% error rate',good: 'Consistent, auditable output',   goodStat: '< 0.1% errors',gain: '99.9% accuracy' },
  { label: 'Data Visibility', icon: <BarChart3 size={18} />,   bad: 'Monthly spreadsheet reports', badStat: '30-day lag',    good: 'Live dashboards, instant alerts',goodStat: '< 5 sec data', gain: 'Real-time'      },
  { label: 'Operating Cost',  icon: <DollarSign size={18} />,  bad: 'Manual overhead + errors',    badStat: '₹8L+/mo waste', good: 'Automated, lean operations',    goodStat: '60% cut',      gain: 'Save ₹8L/mo'   },
];

/* ── Dashboard data ──────────────────────────────── */
const DASH_RANGES = {
  today: {
    label: 'Today',
    metrics: [
      { id: 'leads',   label: 'Leads Qualified',  value: '2,847',  change: '+34%',     spark: [40,55,45,70,60,80,75], color: '#E8631A' },
      { id: 'tickets', label: 'Tickets Resolved',  value: '98.2%',  change: '↑ Auto',   spark: [60,70,65,80,75,90,95], color: '#06B6D4' },
      { id: 'revenue', label: 'Revenue Impact',    value: '₹4.2Cr', change: '+18% MoM', spark: [30,45,40,60,55,70,85], color: '#8B5CF6' },
    ],
    bars: [65, 80, 55, 90, 72, 88, 95],
    days: ['M','T','W','T','F','S','S'],
    trend: '+24% WoW',
    agents: [
      { name: 'Lead Qualifier', color: '#E8631A', count: '1,247', status: 'on'   },
      { name: 'Support AI',     color: '#06B6D4', count: '482',   status: 'on'   },
      { name: 'WhatsApp Bot',   color: '#10B981', count: '847',   status: 'on'   },
      { name: 'Invoice Auto',   color: '#F59E0B', count: '—',     status: 'idle' },
    ],
  },
  '7d': {
    label: '7 Days',
    metrics: [
      { id: 'leads',   label: 'Leads Qualified',  value: '18.4k',   change: '+22%',     spark: [30,55,48,72,65,80,75], color: '#E8631A' },
      { id: 'tickets', label: 'Tickets Resolved',  value: '96.8%',   change: '↑ Auto',   spark: [55,65,62,75,78,82,90], color: '#06B6D4' },
      { id: 'revenue', label: 'Revenue Impact',    value: '₹28.6Cr', change: '+12% WoW', spark: [25,40,38,55,50,65,80], color: '#8B5CF6' },
    ],
    bars: [72, 58, 85, 64, 78, 92, 88],
    days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    trend: '+19% vs prev',
    agents: [
      { name: 'Lead Qualifier', color: '#E8631A', count: '8,412',  status: 'on' },
      { name: 'Support AI',     color: '#06B6D4', count: '3,204',  status: 'on' },
      { name: 'WhatsApp Bot',   color: '#10B981', count: '5,918',  status: 'on' },
      { name: 'Invoice Auto',   color: '#F59E0B', count: '312',    status: 'on' },
    ],
  },
  '30d': {
    label: '30 Days',
    metrics: [
      { id: 'leads',   label: 'Leads Qualified',  value: '74.2k',   change: '+41%',     spark: [20,35,30,55,48,70,85], color: '#E8631A' },
      { id: 'tickets', label: 'Tickets Resolved',  value: '97.4%',   change: '↑ Auto',   spark: [50,60,58,72,70,85,92], color: '#06B6D4' },
      { id: 'revenue', label: 'Revenue Impact',    value: '₹1.8Cr',  change: '+28% MoM', spark: [15,30,25,48,42,60,78], color: '#8B5CF6' },
    ],
    bars: [58, 72, 65, 88, 76, 92, 84],
    days: ['W1','W2','W3','W4','W5','W6','W7'],
    trend: '+31% MoM',
    agents: [
      { name: 'Lead Qualifier', color: '#E8631A', count: '32.1k',  status: 'on' },
      { name: 'Support AI',     color: '#06B6D4', count: '14.2k',  status: 'on' },
      { name: 'WhatsApp Bot',   color: '#10B981', count: '24.8k',  status: 'on' },
      { name: 'Invoice Auto',   color: '#F59E0B', count: '1,847',  status: 'on' },
    ],
  },
};

const DASH_EVENTS = [
  { msg: 'Lead from IndiaMart qualified → Raj Kumar',   tag: 'Sales AI',   color: '#E8631A', ago: 'just now' },
  { msg: 'Ticket #4821 auto-resolved — 12 sec',         tag: 'Support AI', color: '#06B6D4', ago: '14s ago'  },
  { msg: 'WhatsApp blast sent → 47 warm leads',         tag: 'Outreach',   color: '#10B981', ago: '38s ago'  },
  { msg: 'Invoice INV-2294 generated & emailed',        tag: 'Finance',    color: '#F59E0B', ago: '1m ago'   },
  { msg: 'Onboarding triggered: Priya Sharma',          tag: 'HR AI',      color: '#EC4899', ago: '2m ago'   },
];

/* ── SparkArea: sparkline with filled area ────────── */
function SparkArea({ data, color, w = 56, h = 22 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min + 0.001;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / range) * (h - 5) - 2,
  ]);
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  const [lx, ly] = pts[pts.length - 1];
  const gid = `sg${color.slice(1)}`;
  return (
    <svg width={w} height={h} style={{ overflow: 'visible', flexShrink: 0 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={2.5} fill={color} stroke="#06090F" strokeWidth={1} />
    </svg>
  );
}

/* ── HeroDashboard — fully interactive ───────────── */
function HeroDashboard() {
  const [range, setRange]       = useState('today');
  const [evIdx, setEvIdx]       = useState(0);
  const [hovBar, setHovBar]     = useState(null);
  const [taskTick, setTaskTick] = useState(12847);

  const d = DASH_RANGES[range];

  useEffect(() => {
    const t = setInterval(() => setEvIdx(p => (p + 1) % DASH_EVENTS.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTaskTick(p => p + Math.floor(Math.random() * 3 + 1)), 2800);
    return () => clearInterval(t);
  }, []);

  const ev     = DASH_EVENTS[evIdx];
  const maxIdx = d.bars.indexOf(Math.max(...d.bars));

  return (
    <div style={{
      background: '#06090F',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)',
    }}>
      {/* ── Browser chrome ── */}
      <div style={{ background: '#0B0F18', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '9px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57','#FFBD2E','#28C840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 5, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6, margin: '0 8px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace', letterSpacing: 0.2 }}>app.agentix.ai/dashboard</span>
        </div>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 100, padding: '3px 9px' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: 9, color: '#10B981', fontWeight: 700, letterSpacing: 0.8, fontFamily: 'var(--font-body)' }}>LIVE</span>
        </motion.div>
      </div>

      {/* ── Dashboard header ── */}
      <div style={{ padding: '10px 16px 9px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>Operations Dashboard</div>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-body)', marginTop: 1 }}>
            {taskTick.toLocaleString()} tasks completed · 5 agents active
          </div>
        </div>
        {/* Functional time-range buttons */}
        <div style={{ display: 'flex', gap: 3 }}>
          {Object.entries(DASH_RANGES).map(([key, val]) => (
            <button key={key} onClick={(e) => { e.stopPropagation(); setRange(key); }}
              style={{
                background: range === key ? 'rgba(232,99,26,0.18)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${range === key ? 'rgba(232,99,26,0.38)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 5, padding: '3px 8px',
                fontSize: 9, color: range === key ? '#E8631A' : 'rgba(255,255,255,0.3)',
                fontFamily: 'var(--font-body)', fontWeight: range === key ? 700 : 400,
                cursor: 'pointer', transition: 'all 0.18s', outline: 'none',
              }}>
              {val.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* ── KPI cards — animate when range changes ── */}
        <AnimatePresence mode="wait">
          <motion.div key={range + '-metrics'}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}>
            {d.metrics.map((m) => (
              <div key={m.id} style={{ padding: '10px 10px 9px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${m.color}28`, borderRadius: 10, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: m.color, opacity: 0.7 }} />
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: 0.7, fontFamily: 'var(--font-body)', marginBottom: 5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{m.value}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 9, color: '#10B981', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{m.change}</span>
                  <SparkArea data={m.spark} color={m.color} />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bar chart — re-animates on range switch ── */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 11, padding: '10px 11px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>Automation Activity</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-body)', marginLeft: 5 }}>tasks/day</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(232,99,26,0.08)', border: '1px solid rgba(232,99,26,0.2)', borderRadius: 100, padding: '2px 7px' }}>
              <TrendingUp size={8} color="#E8631A" />
              <span style={{ fontSize: 9, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{d.trend}</span>
            </div>
          </div>
          <div style={{ position: 'relative', height: 52 }}>
            {[0.33, 0.66, 1.0].map(f => (
              <div key={f} style={{ position: 'absolute', left: 0, right: 0, bottom: `${f * 52}px`, borderBottom: '1px dashed rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            ))}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: '100%', position: 'relative' }}>
              {d.bars.map((bh, i) => (
                <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', position: 'relative', cursor: 'pointer' }}
                  onMouseEnter={() => setHovBar(i)}
                  onMouseLeave={() => setHovBar(null)}>
                  {hovBar === i && (
                    <div style={{ position: 'absolute', bottom: `calc(${bh}% + 6px)`, left: '50%', transform: 'translateX(-50%)', background: '#0B0F18', border: '1px solid rgba(232,99,26,0.45)', borderRadius: 4, padding: '2px 6px', fontSize: 9, color: '#E8631A', fontWeight: 700, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', zIndex: 10, pointerEvents: 'none' }}>
                      {bh}%
                    </div>
                  )}
                  <motion.div
                    key={`${range}-bar-${i}`}
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ delay: i * 0.07, duration: 0.42, ease: 'easeOut' }}
                    style={{
                      width: '100%', height: `${bh}%`, borderRadius: '3px 3px 0 0', transformOrigin: 'bottom',
                      background: i === maxIdx
                        ? 'linear-gradient(to top, #C95F10, #E8631A, #F59E0B)'
                        : `rgba(232,99,26,${0.2 + (bh / 100) * 0.38})`,
                      boxShadow: i === maxIdx ? '0 0 14px rgba(232,99,26,0.45)' : 'none',
                      opacity: hovBar !== null && hovBar !== i ? 0.48 : 1,
                      transition: 'opacity 0.15s',
                    }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 5 }}>
            {d.days.map((day, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 7.5, color: i === maxIdx ? '#E8631A' : 'rgba(255,255,255,0.18)', fontWeight: i === maxIdx ? 700 : 400, fontFamily: 'var(--font-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{day}</div>
            ))}
          </div>
        </div>

        {/* ── Agents + Events ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.45fr', gap: 7 }}>
          {/* Agents — update on range change */}
          <AnimatePresence mode="wait">
            <motion.div key={range + '-agents'}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 11px' }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: 'var(--font-body)', marginBottom: 8 }}>Active Agents</div>
              {d.agents.map(a => (
                <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
                  <motion.div
                    animate={a.status === 'on' ? { opacity: [1, 0.25, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: a.status === 'on' ? '#10B981' : '#F59E0B', flexShrink: 0 }} />
                  <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</span>
                  <span style={{ fontSize: 8.5, color: a.color, fontFamily: 'var(--font-body)', fontWeight: 700, flexShrink: 0 }}>{a.count}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Live events — auto-cycle */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 11px', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: 'var(--font-body)' }}>Live Events</div>
              <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.4 }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981' }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={evIdx}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 7 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: ev.color, flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.68)', fontFamily: 'var(--font-body)', lineHeight: 1.45 }}>{ev.msg}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 12 }}>
                  <span style={{ fontSize: 8.5, color: ev.color, background: `${ev.color}18`, border: `1px solid ${ev.color}30`, borderRadius: 100, padding: '1px 7px', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{ev.tag}</span>
                  <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-body)' }}>{ev.ago}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CountUpStat ──────────────────────────────────── */
function CountUpStat({ num, suffix, label, sub, dark }) {
  const [count, ref] = useCountUp(num, 1800);
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '0 20px' }}>
      <div style={{ fontFamily: 'var(--font-number)', fontSize: 'clamp(40px,4vw,64px)', fontWeight: 700, color: '#E8631A', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: dark ? '#fff' : '#0D1B2E', marginTop: 10 }}>{label}</div>
      <div style={{ fontSize: 13, color: dark ? 'rgba(255,255,255,0.5)' : '#6B7280', marginTop: 4, fontFamily: 'var(--font-body)' }}>{sub}</div>
    </div>
  );
}

/* ── Responsive CSS — breakpoints for every grid in this page ── */
const RESPONSIVE_CSS = `
/* Hero 2-col grid */
.ax-hero-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 60px; align-items: center; width: 100%;
}
@media (max-width: 900px) {
  .ax-hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .ax-hero-right { display: none; }
}

/* Stats 4-col */
.ax-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); }
@media (max-width: 768px) {
  .ax-stats-grid { grid-template-columns: repeat(2,1fr); }
  .ax-stats-grid > div:nth-child(2) { border-right: none !important; }
  .ax-stats-grid > div:nth-child(3),
  .ax-stats-grid > div:nth-child(4) {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding-top: 40px;
    margin-top: 40px;
  }
  .ax-stats-grid > div:nth-child(4) { border-right: none !important; }
}

/* Side-panel tabs (Build + Solutions) */
.ax-side-panel-grid { display: grid; grid-template-columns: 280px 1fr; gap: 48px; align-items: start; }
@media (max-width: 960px) {
  .ax-side-panel-grid { grid-template-columns: 1fr; gap: 20px; }
}
.ax-side-tab-list { display: flex; flex-direction: column; gap: 6px; }
@media (max-width: 960px) {
  .ax-side-tab-list {
    flex-direction: row; overflow-x: auto; gap: 8px;
    padding-bottom: 8px; scrollbar-width: none; -ms-overflow-style: none;
  }
  .ax-side-tab-list::-webkit-scrollbar { display: none; }
  .ax-side-tab-list button { flex-shrink: 0; border-left: none !important; border-bottom: 3px solid transparent !important; }
}

/* How It Works 2-col */
.ax-how-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
@media (max-width: 900px) {
  .ax-how-grid { grid-template-columns: 1fr; gap: 40px; }
  .ax-how-sticky { position: static !important; top: auto !important; }
}

/* Pain cards 4-col grid */
.ax-pain-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
@media (max-width: 960px) {
  .ax-pain-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 560px) {
  .ax-pain-grid { grid-template-columns: 1fr; }
}

/* Industries header */
.ax-ind-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }

/* Results / Case Studies */
.ax-result-card { display: grid; grid-template-columns: 170px 1fr; gap: 32px; align-items: start; }
.ax-result-body { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 20px; }
.ax-result-stats-row { display: flex; gap: 0; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; }
.ax-result-stats-row > div { flex: 1; text-align: center; padding: 0 12px; border-right: 1px solid rgba(255,255,255,0.08); }
.ax-result-stats-row > div:first-child { padding-left: 0; }
.ax-result-stats-row > div:last-child { border-right: none; }
@media (max-width: 900px) {
  /* !important overrides the inline gridTemplateColumns style on this element */
  .ax-result-card { grid-template-columns: 1fr !important; gap: 20px; }
  .ax-result-body { grid-template-columns: 1fr; gap: 16px; }
}
@media (max-width: 600px) {
  .ax-result-stats-row { flex-wrap: wrap; }
  .ax-result-stats-row > div { min-width: 90px; margin-bottom: 12px; border-right: none; padding: 0 8px; }
}
@media (max-width: 480px) {
  .ax-result-stats-row { flex-direction: column; gap: 12px; }
  .ax-result-stats-row > div { border-right: none; padding: 0; text-align: left; }
  .ax-result-stats-row--light { border-top: 1px solid #E5E7EB !important; }
}

/* Why Us comparison v2 */
.ax-why-v2-cols { display: grid; grid-template-columns: 1fr 88px 1fr; gap: 12px; align-items: center; }
.ax-result-stats-row--light { border-top: 1px solid #E5E7EB !important; }
.ax-result-stats-row--light > div { border-right: 1px solid #E5E7EB !important; }
@media (max-width: 640px) {
  .ax-why-v2-cols { grid-template-columns: 1fr; }
  .ax-why-v2-cols > .ax-why-gain { display: none; }
}

/* ROI strip 5-col */
.ax-roi-grid { display: grid; grid-template-columns: repeat(5,1fr); }
@media (max-width: 900px) {
  .ax-roi-grid { grid-template-columns: repeat(3,1fr); row-gap: 32px; }
  .ax-roi-grid > div:nth-child(3) { border-right: none !important; }
  .ax-roi-grid > div:nth-child(n+4) { border-top: 1px solid #E5E7EB; padding-top: 24px; margin-top: 8px; }
}
@media (max-width: 600px) {
  .ax-roi-grid { grid-template-columns: repeat(2,1fr); }
  .ax-roi-grid > div:nth-child(2n) { border-right: none !important; }
  .ax-roi-grid > div:nth-child(n+3) { border-top: 1px solid #E5E7EB; padding-top: 24px; margin-top: 8px; }
}

/* ── Hero section: height/padding via class ── */
.ax-hero-sec {
  height: 100vh; min-height: 640px;
  display: flex; align-items: center;
  padding-top: 80px; padding-bottom: 0;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .ax-hero-sec { height: auto; min-height: 100svh; padding-top: 96px; padding-bottom: 56px; }
}
@media (max-width: 480px) {
  .ax-hero-sec { min-height: 0; padding-top: 88px; padding-bottom: 48px; }
}

/* ── Tab panels (Build + Solutions) ── */
.ax-tab-panel { padding: 40px; }
@media (max-width: 960px) { .ax-tab-panel { padding: 28px 24px; } }
@media (max-width: 480px)  { .ax-tab-panel { padding: 20px 16px; } }

/* ── Features 2-col grid inside tab panel ── */
.ax-feat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
@media (max-width: 560px) { .ax-feat-grid { grid-template-columns: 1fr; } }

/* ── How It Works: timeline right panel ── */
.ax-how-right { position: relative; padding-left: 48px; }
@media (max-width: 900px) { .ax-how-right { padding-left: 40px; } }
@media (max-width: 480px) { .ax-how-right { padding-left: 28px; } }

/* ── Result card outer padding ── */
.ax-result-card-outer { padding: 36px 40px; }
@media (max-width: 768px) { .ax-result-card-outer { padding: 24px 20px; } }
@media (max-width: 480px) { .ax-result-card-outer { padding: 18px 16px; } }

/* ── CountUpStat: padding on mobile ── */
@media (max-width: 480px) {
  .ax-stats-grid > div { padding: 0 8px; }
}

/* ── Pain section bottom banner ── */
@media (max-width: 600px) {
  .ax-pain-bottom { flex-direction: column !important; align-items: flex-start !important; }
  .ax-pain-bottom a { width: 100%; justify-content: center; }
}

/* ── Hero CTA buttons: full-width on mobile ── */
@media (max-width: 480px) {
  .ax-hero-ctas { flex-direction: column; gap: 12px; }
  .ax-hero-cta-btn {
    width: 100% !important;
    justify-content: center !important;
    font-size: 15px !important;
    padding: 14px 20px !important;
  }
}

/* ── Hero mini stats row: 2-col on very small screens ── */
@media (max-width: 360px) {
  .ax-hero-grid > div > div[style*="gap: 28px"] {
    gap: 16px !important;
  }
}

/* ── Scroll hint: hide on very small screens ── */
@media (max-width: 480px) {
  .ax-hero-sec [style*="position: absolute"][style*="bottom: 24"] {
    display: none;
  }
}
`;

/* Testimonial marquee CSS only (ax-mq-* now in ax-brand.css) */
const MARQUEE_CSS = `
/* ── Testimonial card marquee ── */
@keyframes ax-tm-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.ax-tm-track {
  display: flex; width: max-content; align-items: stretch;
  animation: ax-tm-scroll 70s linear infinite;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.ax-tm-wrap:hover .ax-tm-track { animation-play-state: paused; }
/* iOS Safari: mask-image blocks CSS animations — remove on mobile */
@media (max-width: 768px) {
  .ax-tm-wrap {
    -webkit-mask-image: none !important;
    mask-image: none !important;
  }
}
.ax-tm-card {
  width: 340px; flex-shrink: 0; margin: 0 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 18px; padding: 28px 28px 24px;
  display: flex; flex-direction: column; gap: 0;
  transition: border-color 0.2s, background 0.2s;
}
.ax-tm-card:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.16);
}
`;

const ALL_PLATFORMS = [
  { name: 'OpenAI',          Icon: SiOpenai,      color: '#10A37F' },
  { name: 'Anthropic',       Icon: SiAnthropic,   color: '#C96442' },
  { name: 'Google Cloud',    Icon: SiGooglecloud, color: '#4285F4' },
  { name: 'AWS',             abbr: 'AWS',         color: '#FF9900' },
  { name: 'Meta AI',         Icon: SiMeta,        color: '#0866FF' },
  { name: 'Azure',           abbr: 'AZ',          color: '#0078D4' },
  { name: 'HubSpot',         Icon: SiHubspot,     color: '#FF7A59' },
  { name: 'Make',            Icon: SiMake,        color: '#6D00CC' },
  { name: 'WhatsApp',        Icon: SiWhatsapp,    color: '#25D366' },
  { name: 'Twilio',          Icon: SiTwilio,      color: '#F22F46' },
  { name: 'Razorpay',        Icon: SiRazorpay,    color: '#3395FF' },
  { name: 'LangChain',       Icon: SiLangchain,   color: '#F0A500' },
  { name: 'n8n',             abbr: 'N8',          color: '#EA4B71' },
  { name: 'Groq',            abbr: 'GQ',          color: '#F55036' },
  { name: 'Zapier',          Icon: SiZapier,      color: '#FF4A00' },
  { name: 'Slack',           Icon: SiSlack,       color: '#4A154B' },
];

/* ── RotatingWord — animated headline switcher ─────── */
const HERO_WORDS = ['Automated.', 'Transformed.', 'Supercharged.', 'Unstoppable.'];

function RotatingWord() {
  const [idx, setIdx] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setOut(true);
      setTimeout(() => {
        setIdx(p => (p + 1) % HERO_WORDS.length);
        setOut(false);
      }, 320);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        background: 'linear-gradient(90deg, #E8631A, #F59E0B)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        transition: 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        opacity: out ? 0 : 1,
        transform: out ? 'translateY(-12px)' : 'translateY(0)',
        willChange: 'transform',
      }}
    >
      {HERO_WORDS[idx]}
    </span>
  );
}

/* ══════════════════════════════════════════════════ */
export default function HomePage() {
  const [buildTab, setBuildTab] = useState(0);
  const [activeSolution, setActiveSolution] = useState('sales');
  const [preloaderDone, setPreloaderDone] = useState(false);

  const activeSol = SOLUTIONS.find(s => s.id === activeSolution);

  return (
    <>
      {!preloaderDone && <PreloaderGate onEnter={() => setPreloaderDone(true)} />}
      <VoiceAgentWidget />
      <ScrollProgress />
      <Helmet>
        <title>AI Agentix — AI Automation Experts for Indian Businesses</title>
        <meta name="description" content="Deploy agentic AI and automation that cuts costs, generates leads, and scales operations. Trusted by 200+ businesses across India." />
      </Helmet>
      <SiteNav />

      {/* ═══════════════════════════════════════════════
          1. HERO — Dark #0D1B2E, 2-col split
      ═══════════════════════════════════════════════ */}
      <section className="ax-hero-sec" style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #0F2240 60%, #0D1B2E 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle grid overlay */}
        <div className="ax-hero-grid-bg" />
        {/* Ambient glows */}
        <div className="ax-orb ax-orb-orange" style={{ width: 640, height: 640, top: '5%', right: '-4%' }} />
        <div className="ax-orb ax-orb-indigo" style={{ width: 480, height: 480, bottom: '5%', left: '-4%' }} />

        <div className="ax-container ax-hero-grid">
          {/* Left: copy */}
          <div>
            <motion.div {...up(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.3)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <Zap size={14} color="#E8631A" />
              <span style={{ fontSize: 13, color: '#E8631A', fontFamily: 'var(--font-body)', fontWeight: 500 }}>India's #1 AI Automation Agency</span>
            </motion.div>

            <motion.h1 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,4.5vw,64px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 24 }}>
              Your Business,<br />
              <span style={{ display: 'inline-block', minHeight: '1.15em', verticalAlign: 'top' }}>
                <RotatingWord />
              </span>
            </motion.h1>

            <motion.p {...up(0.16)} style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 500, fontFamily: 'var(--font-body)' }}>
              We build AI agents and automation systems that qualify leads in seconds, resolve support tickets automatically, and run your operations 24/7 — without adding headcount.
            </motion.p>

            <motion.div {...up(0.22)} className="ax-hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
              <Link to="/contact" className="ax-hero-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg, #E8631A, #F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 8px 28px rgba(232,99,26,0.38)' }}>
                Book Free Strategy Call <ArrowRight size={18} />
              </Link>
              <Link to="/case-studies" className="ax-hero-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '14px 28px', borderRadius: 12, textDecoration: 'none' }}>
                <Play size={16} fill="currentColor" /> Watch Results
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div {...up(0.26)} style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 36, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', width: 'fit-content' }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, k) => <Star key={k} size={13} color="#F59E0B" fill="#F59E0B" />)}
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
                <strong style={{ color: '#fff' }}>4.9/5</strong> from 200+ Indian businesses
              </span>
              <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>Avg. ROI 8x in 6 months</span>
            </motion.div>

            <motion.div {...up(0.32)} style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {[['200+', 'Businesses automated'], ['₹50Cr+', 'Client revenue'], ['97%', 'Satisfaction rate']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-number)', fontSize: 26, fontWeight: 700, color: '#E8631A' }}>{v}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: dashboard mock */}
          <motion.div {...right(0.3)} className="ax-hero-right">
            <div style={{ transform: 'translateY(-36px) translateX(18px)' }}>
              <HeroDashboard />
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>scroll</span>
          <ChevronDown size={18} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. PLATFORM MARQUEE — Dark strip
      ═══════════════════════════════════════════════ */}
      <style>{MARQUEE_CSS}</style>
      <style>{RESPONSIVE_CSS}</style>
      <section style={{
        background: 'linear-gradient(180deg, #0A1628 0%, #0D1B2E 100%)',
        padding: '52px 0 56px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 200, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,99,26,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Label */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700, letterSpacing: 3.5,
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
          }}>
            Powered By World's Most Powerful AI Platforms
          </span>
          <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg, #E8631A, #F59E0B)', borderRadius: 2, margin: '10px auto 0' }} />
        </div>

        {/* Single row — scrolls left, infinite */}
        <div
          className="ax-mq-wrap"
          style={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="ax-mq-track">
            {[...ALL_PLATFORMS, ...ALL_PLATFORMS].map((p, i) => (
              <div key={i} className="ax-mq-pill">
                <div className="ax-mq-logo" style={{ background: p.color + '22', border: `1px solid ${p.color}44` }}>
                  {p.Icon
                    ? <p.Icon style={{ color: p.color, fontSize: 15 }} />
                    : <span style={{ color: p.color, fontSize: 10, fontWeight: 800 }}>{p.abbr}</span>
                  }
                </div>
                <span className="ax-mq-label">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          3. PAIN SECTION — Light, centered header + 4 problem cards
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F9FAFB', padding: '100px 0' }}>
        <div className="ax-container">
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 64, maxWidth: 640, margin: '0 auto 64px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
              <AlertCircle size={12} color="#DC2626" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#DC2626', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The Problem</span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,3.5vw,46px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, marginBottom: 16 }}>
              Manual Work Is Quietly<br />Killing Your Growth
            </h2>
            <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              While you're chasing spreadsheets and follow-ups, automated competitors respond in seconds. Here's exactly what it's costing you.
            </p>
          </motion.div>

          <div className="ax-pain-grid">
            {PAIN_ITEMS.map((item, i) => (
              <motion.div key={item.title} {...up(0.08 + i * 0.07)} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
                style={{ background: '#fff', borderRadius: 18, padding: '28px 24px 24px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', borderTop: '4px solid #DC2626', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FEF2F2', border: '1px solid #FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626', marginBottom: 18 }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: '#111827', lineHeight: 1.4, marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, fontFamily: 'var(--font-body)', marginBottom: 'auto', paddingBottom: 20 }}>{item.desc}</div>
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#DC2626', lineHeight: 1 }}>{item.stat}</span>
                  <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', lineHeight: 1.3 }}>{item.statSub}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...up(0.38)} className="ax-pain-bottom" style={{ marginTop: 32, background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: 16, padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <AlertCircle size={20} color="#DC2626" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#111827' }}>
                Combined, these four problems cost a 20-person business over <span style={{ color: '#DC2626' }}>₹1.2 Cr per year</span> in lost revenue and wasted time.
              </span>
            </div>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#DC2626', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, padding: '11px 22px', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              Fix This Now <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. STATS — Deep dark, orange count-up numbers
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#060E1A', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 300, background: 'radial-gradient(ellipse, rgba(232,99,26,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="ax-container" style={{ position: 'relative' }}>
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Our Track Record</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, color: '#fff', marginTop: 12 }}>Numbers That Speak for Themselves</div>
            <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: 8 }}>From real deployments. Verified by clients across India.</div>
          </motion.div>
          <motion.div {...up(0.1)} className="ax-stats-grid">
            {STAT_DATA.map((s, i) => (
              <div key={s.label} style={{ position: 'relative', padding: '0 8px', borderRight: i < STAT_DATA.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <CountUpStat num={s.num} suffix={s.suffix} label={s.label} sub={s.sub} dark={true} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. WHAT WE BUILD — Light, TABBED layout
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F9FAFB', padding: '100px 0' }}>
        <div className="ax-container">
          <motion.div {...up(0)} style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>What We Build</span>
          </motion.div>
          <motion.h2 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginBottom: 56 }}>
            Six Core Capabilities.<br />One Integrated System.
          </motion.h2>

          <div className="ax-side-panel-grid">
            {/* Tab list */}
            <div className="ax-side-tab-list">
              {BUILD_TABS.map((tab, i) => (
                <button key={tab.label} onClick={() => setBuildTab(i)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left', background: buildTab === i ? `${tab.color}12` : 'rgba(0,0,0,0.02)', borderLeft: `3px solid ${buildTab === i ? tab.color : 'transparent'}`, transition: 'all 0.25s', boxShadow: buildTab === i ? `0 2px 12px ${tab.color}20` : 'none' }}>
                  <span style={{ color: buildTab === i ? tab.color : '#9CA3AF' }}>{tab.icon}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: buildTab === i ? '#0D1B2E' : '#6B7280' }}>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab panel */}
            <AnimatePresence mode="wait">
              <motion.div key={buildTab}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="ax-tab-panel"
                style={{ background: '#fff', border: `1px solid ${BUILD_TABS[buildTab].color}25`, borderRadius: 20, boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'inline-block', background: `${BUILD_TABS[buildTab].color}12`, border: `1px solid ${BUILD_TABS[buildTab].color}35`, borderRadius: 8, padding: '4px 12px', marginBottom: 20 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: BUILD_TABS[buildTab].color, fontFamily: 'var(--font-body)' }}>{BUILD_TABS[buildTab].label}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#0D1B2E', marginBottom: 14 }}>{BUILD_TABS[buildTab].headline}</h3>
                <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.7, marginBottom: 28, fontFamily: 'var(--font-body)' }}>{BUILD_TABS[buildTab].desc}</p>
                <div className="ax-feat-grid">
                  {BUILD_TABS[buildTab].features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle size={15} color={BUILD_TABS[buildTab].color} />
                      <span style={{ fontSize: 14, color: '#374151', fontFamily: 'var(--font-body)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${BUILD_TABS[buildTab].color}08`, border: `1px solid ${BUILD_TABS[buildTab].color}20`, borderRadius: 12, padding: '16px 20px', display: 'inline-block' }}>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 32, fontWeight: 700, color: BUILD_TABS[buildTab].color }}>{BUILD_TABS[buildTab].metric}</span>
                  <span style={{ fontSize: 14, color: '#6B7280', marginLeft: 10, fontFamily: 'var(--font-body)' }}>{BUILD_TABS[buildTab].metricLabel}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. HOW IT WORKS — Dark, timeline layout
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#0D1B2E', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ax-container ax-how-grid" style={{ position: 'relative', zIndex: 1 }}>
          {/* Left: intro */}
          <div className="ax-how-sticky" style={{ position: 'sticky', top: 120 }}>
            <motion.div {...left(0)} style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Our Process</span>
            </motion.div>
            <motion.h2 {...left(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
              From First Call to<br />Full Automation
            </motion.h2>
            <motion.p {...left(0.12)} style={{ fontSize: 16, color: 'rgba(255,255,255,0.58)', lineHeight: 1.75, marginBottom: 32, fontFamily: 'var(--font-body)' }}>
              We don't sell software. We build custom automation systems for your specific workflows. Here's exactly how it works — no surprises, no scope creep.
            </motion.p>
            <motion.div {...left(0.18)}>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E8631A', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, padding: '13px 24px', borderRadius: 10, textDecoration: 'none' }}>
                Start Your Project <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Trust signals below CTA */}
            <motion.div {...left(0.24)} style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: <Clock size={15} />, label: '14-day avg. delivery', sub: 'First automation live in 2 weeks' },
                { icon: <Shield size={15} />, label: 'No lock-in contract', sub: 'Month-to-month, cancel anytime' },
                { icon: <CheckCircle size={15} />, label: '24/7 post-launch support', sub: 'We stay with you after go-live' },
                { icon: <Award size={15} />, label: 'Results-backed pricing', sub: 'Milestones tied to your KPIs' },
              ].map(({ icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(232,99,26,0.1)', border: '1px solid rgba(232,99,26,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8631A', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)', marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Mini testimonial */}
            <motion.div {...left(0.3)} style={{ marginTop: 32, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
                {[...Array(5)].map((_, k) => <Star key={k} size={12} color="#F59E0B" fill="#F59E0B" />)}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, fontFamily: 'var(--font-body)', margin: '0 0 12px', fontStyle: 'italic' }}>
                "From first call to live automation in 11 days. The process was seamless — exactly as described."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #E8631A, #F59E0B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>R</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>Rajiv Mehta</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Founder, RealEdge Properties</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="ax-how-right">
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 16, top: 24, bottom: 24, width: 2, background: 'linear-gradient(to bottom, #E8631A, #6366F1)' }} />

            {HOW_STEPS.map((step, i) => (
              <motion.div key={step.num} {...up(i * 0.1)} style={{ position: 'relative', marginBottom: 48 }}>
                {/* Dot */}
                <div style={{ position: 'absolute', left: -40, top: 6, width: 16, height: 16, borderRadius: '50%', background: '#E8631A', border: '3px solid #0D1B2E', boxShadow: '0 0 0 3px rgba(232,99,26,0.3)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-number)', fontSize: 13, fontWeight: 700, color: '#E8631A', letterSpacing: 1 }}>STEP {step.num}</span>
                  <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '3px 10px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{step.duration}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          7. SOLUTIONS PREVIEW — Light, left-list + right-panel
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F0F4F8', padding: '100px 0' }}>
        <div className="ax-container">
          <motion.div {...up(0)} style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Solutions</span>
          </motion.div>
          <motion.h2 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginBottom: 56 }}>
            Built for Every Business Function
          </motion.h2>

          <div className="ax-side-panel-grid" style={{ gap: 32 }}>
            {/* Left: clickable list */}
            <div className="ax-side-tab-list">
              {SOLUTIONS.map(sol => (
                <button key={sol.id} onClick={() => setActiveSolution(sol.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', background: activeSolution === sol.id ? `${sol.color}12` : 'rgba(0,0,0,0.02)', borderLeft: `3px solid ${activeSolution === sol.id ? sol.color : 'transparent'}`, transition: 'all 0.2s', boxShadow: activeSolution === sol.id ? `0 2px 10px ${sol.color}18` : 'none' }}>
                  <span style={{ color: activeSolution === sol.id ? sol.color : '#9CA3AF' }}>{sol.icon}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, color: activeSolution === sol.id ? '#0D1B2E' : '#6B7280' }}>{sol.label}</span>
                  {activeSolution === sol.id && <ChevronRight size={14} color={sol.color} style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>

            {/* Right: animated panel */}
            <AnimatePresence mode="wait">
              <motion.div key={activeSolution}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="ax-tab-panel"
                style={{ background: '#fff', border: `1px solid ${activeSol?.color || '#E8631A'}25`, borderRadius: 20, boxShadow: '0 4px 32px rgba(0,0,0,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${activeSol?.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: activeSol?.color }}>
                    {activeSol?.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 2 }}>{activeSol?.label}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#0D1B2E', margin: 0 }}>{activeSol?.headline}</h3>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, marginBottom: 28, fontFamily: 'var(--font-body)' }}>{activeSol?.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                  {activeSol?.bullets.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: activeSol?.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: '#374151', fontFamily: 'var(--font-body)' }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ background: `${activeSol?.color}08`, border: `1px solid ${activeSol?.color}22`, borderRadius: 10, padding: '12px 20px' }}>
                    <span style={{ fontFamily: 'var(--font-number)', fontSize: 28, fontWeight: 700, color: activeSol?.color }}>{activeSol?.stat}</span>
                    <span style={{ fontSize: 13, color: '#6B7280', marginLeft: 10, fontFamily: 'var(--font-body)' }}>{activeSol?.statLabel}</span>
                  </div>
                  <Link to="/solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: activeSol?.color, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    See full case study <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          8. INDUSTRIES STRIP — Dark, horizontal scroll
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#0A1628', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle dot grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.055) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        <div className="ax-container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...up(0)} className="ax-ind-header">
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 8 }}>Industries</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,2.8vw,38px)', fontWeight: 800, color: '#fff', margin: 0 }}>
                We Speak Your Industry's Language
              </h2>
            </div>
            <Link to="/industries" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#E8631A', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, textDecoration: 'none', flexShrink: 0, paddingBottom: 4 }}>
              All Industries <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Infinite marquee */}
          <div className="ax-mq-wrap" style={{ padding: '8px 0 24px' }}>
            <div className="ax-mq-track" style={{ animation: 'ax-scroll-left 34s linear infinite', alignItems: 'stretch' }}>
              {[...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
                <Link key={i} to={ind.to} style={{ textDecoration: 'none', flexShrink: 0, margin: '0 10px' }}>
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
                    style={{ width: 184, background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`, borderRadius: 16, padding: '28px 20px', borderTop: `4px solid ${ind.color}`, cursor: 'pointer' }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ind.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: ind.color, marginBottom: 14 }}>
                      {ind.icon}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 8 }}>{ind.label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: ind.color }}>{ind.stat}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          9. RESULTS — Light, full-width horizontal strips
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F9FAFB', padding: '100px 0' }}>
        <div className="ax-container">
          <motion.div {...up(0)} style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Case Studies</span>
          </motion.div>
          <motion.h2 {...up(0.06)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', marginBottom: 56 }}>
            Real Results. Real Businesses.
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {RESULTS.map((r, i) => {
              const flipped = i % 2 !== 0;
              const company = (
                <div>
                  <div style={{ display: 'inline-block', fontSize: 11, color: r.color, fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8, background: r.color + '12', border: `1px solid ${r.color}28`, borderRadius: 100, padding: '3px 10px' }}>{r.industry}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#0D1B2E', lineHeight: 1.3 }}>{r.company}</div>
                </div>
              );
              const detail = (
                <div>
                  <div className="ax-result-body">
                    <div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>Challenge</div>
                      <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{r.challenge}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'var(--font-body)', marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>Solution</div>
                      <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{r.solution}</div>
                    </div>
                  </div>
                  <div className="ax-result-stats-row--light ax-result-stats-row">
                    {[r.stat1, r.stat2, r.stat3].map(st => (
                      <div key={st.label}>
                        <div style={{ fontFamily: 'var(--font-number)', fontSize: 26, fontWeight: 700, color: r.color, lineHeight: 1 }}>{st.num}</div>
                        <div style={{ fontSize: 11, color: '#6B7280', marginTop: 6, fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
              return (
                <motion.div key={r.company} {...up(i * 0.1)}
                  className="ax-result-card-outer"
                  style={{ background: '#fff', border: `1px solid #E5E7EB`, borderRadius: 16,
                    borderLeft: flipped ? 'none' : `4px solid ${r.color}`,
                    borderRight: flipped ? `4px solid ${r.color}` : 'none',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                  }}>
                  <div className="ax-result-card" style={{ gridTemplateColumns: flipped ? '1fr 170px' : '170px 1fr' }}>
                    {flipped ? <>{detail}{company}</> : <>{company}{detail}</>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          10. WHY US — Dark, visual battle-card layout
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#050E1A', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Dot-grid background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(232,99,26,0.045) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,99,26,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="ax-container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Why AI Agentix</span>
          </motion.div>
          <motion.h2 {...up(0.06)} style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Old Way vs. The AI Way
          </motion.h2>
          <motion.p {...up(0.1)} style={{ textAlign: 'center', fontSize: 16, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', maxWidth: 500, margin: '0 auto 52px' }}>
            Every manual process is a liability. See exactly what changes when you automate with us.
          </motion.p>

          {/* Column header labels */}
          <motion.div {...up(0.12)} className="ax-why-v2-cols" style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 10 }}>
              <X size={14} color="#ef4444" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#ef4444', letterSpacing: 0.5 }}>WITHOUT AUTOMATION</span>
            </div>
            <div />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(232,99,26,0.08)', border: '1px solid rgba(232,99,26,0.25)', borderRadius: 10 }}>
              <Zap size={14} color="#E8631A" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#E8631A', letterSpacing: 0.5 }}>WITH AI AGENTIX</span>
            </div>
          </motion.div>

          {/* Comparison rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {WHY_ROWS.map((row, i) => (
              <motion.div key={row.label} {...up(0.14 + i * 0.07)} className="ax-why-v2-cols">
                {/* Bad card — stat + description only, no repeated label */}
                <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.14)', borderRadius: 14, padding: '20px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#ef4444', lineHeight: 1, marginBottom: 8 }}>{row.badStat}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{row.bad}</div>
                </div>

                {/* Center: icon + category label + gain badge */}
                <div className="ax-why-gain" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>{row.icon}</div>
                  <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)', fontWeight: 700, letterSpacing: 0.7, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}>{row.label}</div>
                  <div style={{ background: 'rgba(232,99,26,0.12)', border: '1px solid rgba(232,99,26,0.28)', borderRadius: 100, padding: '3px 9px' }}>
                    <div style={{ fontSize: 8, color: '#E8631A', fontWeight: 700, letterSpacing: 0.5, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>{row.gain}</div>
                  </div>
                </div>

                {/* Good card — stat + description only, no repeated label */}
                <div style={{ background: 'rgba(232,99,26,0.05)', border: '1px solid rgba(232,99,26,0.18)', borderRadius: 14, padding: '20px 24px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#E8631A', lineHeight: 1, marginBottom: 8 }}>{row.goodStat}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.62)', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>{row.good}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div {...up(0.5)} style={{ textAlign: 'center', marginTop: 52 }}>
            <Link to="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(90deg, #E8631A, #F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, padding: '15px 32px', borderRadius: 12, textDecoration: 'none', boxShadow: '0 8px 32px rgba(232,99,26,0.35)' }}>
              See AI Agentix in Action <ArrowRight size={18} />
            </Link>
            <div style={{ marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)' }}>Free strategy call · No commitment · Results guaranteed</div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          11. TESTIMONIALS — Light, infinite scroll marquee
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F8F6F2', padding: '100px 0', overflow: 'hidden', position: 'relative' }}>
        {/* Header */}
        <div className="ax-container" style={{ marginBottom: 52, position: 'relative', zIndex: 1 }}>
          <motion.div {...up(0)} style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Client Stories</span>
          </motion.div>
          <motion.div {...up(0.06)} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: '#0D1B2E', lineHeight: 1.15, margin: 0 }}>
              Businesses That<br />
              <span style={{ background: 'linear-gradient(90deg, #E8631A, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Transformed With Us
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Single infinite-scroll row */}
        <motion.div {...up(0.1)} className="ax-tm-wrap" style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}>
          <div className="ax-tm-track">
            {[...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW2].map((t, i) => (
              <div key={i} className="ax-tm-card" style={{ background: '#fff', borderColor: '#E5E7EB', borderTopColor: t.color + '66', borderTopWidth: 3 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[...Array(5)].map((_, k) => <Star key={k} size={13} color="#F59E0B" fill="#F59E0B" />)}
                </div>
                <p style={{ flex: 1, fontSize: 14, color: '#374151', lineHeight: 1.68, fontFamily: 'var(--font-body)', marginBottom: 22 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color + '15', border: `2px solid ${t.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: t.color, fontFamily: 'var(--font-display)', flexShrink: 0 }}>
                    {t.author[0]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2E', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.author}</div>
                    <div style={{ fontSize: 11, color: '#6B7280', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.role}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.color, background: t.color + '12', border: `1px solid ${t.color}28`, borderRadius: 100, padding: '3px 10px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {t.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          12. ROI STRIP — Light background, orange numbers
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#ffffff', padding: '80px 0', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}>
        <div className="ax-container">
          <motion.div {...up(0)} style={{ textAlign: 'center', marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#E8631A', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>The ROI Case</span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px,2.5vw,34px)', fontWeight: 800, color: '#0D1B2E', marginTop: 10 }}>The Business Case for AI Agentix</div>
            <div style={{ fontSize: 15, color: '#9CA3AF', marginTop: 6, fontFamily: 'var(--font-body)' }}>Measured across 200+ client deployments</div>
          </motion.div>
          <motion.div {...up(0.1)} className="ax-roi-grid">
            {ROI_ITEMS.map((item, i) => (
              <div key={item.label} style={{ textAlign: 'center', padding: '0 16px', borderRight: i < ROI_ITEMS.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                <CountUpStat num={item.num} suffix={item.suffix} label={item.label} sub={item.sub} dark={false} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          13. FINAL CTA — Dark, concentric rings
      ═══════════════════════════════════════════════ */}
      <section style={{ background: '#060E1A', padding: '120px 0', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        {/* Concentric rings */}
        {[320, 520, 720, 920].map((size, i) => (
          <motion.div key={size} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '50%', left: '50%', width: size, height: size, borderRadius: '50%', border: `1px solid rgba(232,99,26,${0.12 - i * 0.02})`, transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
        ))}
        {/* Center glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,99,26,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="ax-container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div {...up(0)} style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#E8631A', letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Get Started</span>
          </motion.div>
          <motion.h2 {...up(0.08)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px,4vw,60px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
            Ready to Automate<br />Your Business?
          </motion.h2>
          <motion.p {...up(0.14)} style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 540, margin: '0 auto 48px', fontFamily: 'var(--font-body)' }}>
            Book a free 30-minute strategy call. We'll map your biggest automation opportunity and show you exactly what we'd build — no commitment required.
          </motion.p>
          <motion.div {...up(0.2)} style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'linear-gradient(90deg, #E8631A, #F59E0B)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, padding: '16px 36px', borderRadius: 14, textDecoration: 'none', boxShadow: '0 8px 32px rgba(232,99,26,0.4)' }}>
              Book Free Strategy Call <ArrowRight size={18} />
            </Link>
            <Link to="/solutions" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, padding: '16px 28px', borderRadius: 14, textDecoration: 'none' }}>
              Explore Solutions
            </Link>
          </motion.div>
          <motion.div {...up(0.26)} style={{ marginTop: 40, display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['No credit card required', '30-min free call', 'Results in 2–4 weeks'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={14} color="#10B981" />
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
