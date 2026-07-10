// Homepage content — verbatim from content-archive/pages/home.md and global.md.
// Do not rewrite/shorten/expand copy. Presentation lives in components.

export const meta = {
  title: 'AI Agentix — AI Automation Experts for Indian Businesses',
  description:
    'Deploy agentic AI and automation that cuts costs, generates leads, and scales operations. Trusted by 200+ businesses across India.',
}

export const hero = {
  eyebrow: "India's #1 AI Automation Agency",
  headingPrefix: 'Your Business,',
  rotatingWords: ['Automated.', 'Transformed.', 'Supercharged.', 'Unstoppable.'],
  body:
    'We build AI agents and automation systems that qualify leads in seconds, resolve support tickets automatically, and run your operations 24/7 — without adding headcount.',
  rating: '4.9/5 from 200+ Indian businesses · Avg. ROI 8x in 6 months',
  ctas: [
    { label: 'Book Free Strategy Call', to: '/contact', primary: true },
    { label: 'Watch Results', to: '/case-studies', primary: false },
  ],
  serviceBand: [
    { title: 'Agentic AI Solutions', text: 'AI Agents That Work While You Sleep' },
    { title: 'End-to-End Automation', text: 'Connect Every Tool. Eliminate Every Bottleneck.' },
    { title: 'AI Content Studio', text: 'Scale Content Without Scaling Headcount' },
  ],
}

export const dashboard = {
  panelTitle: 'Operations Dashboard',
  statusText: 'tasks completed · 5 agents active',
  counterStart: 12847,
  url: 'app.agentix.ai/dashboard',
  liveLabel: 'LIVE',
  ranges: ['Today', '7 Days', '30 Days'],
  chartLabel: 'Automation Activity (tasks/day)',
  kpis: {
    Today:    [{ k: 'Leads Qualified', v: '2,847' }, { k: 'Tickets Resolved', v: '98.2%' }, { k: 'Revenue Impact', v: '₹4.2Cr' }],
    '7 Days': [{ k: 'Leads Qualified', v: '18.4k' }, { k: 'Tickets Resolved', v: '96.8%' }, { k: 'Revenue Impact', v: '₹28.6Cr' }],
    '30 Days':[{ k: 'Leads Qualified', v: '74.2k' }, { k: 'Tickets Resolved', v: '97.4%' }, { k: 'Revenue Impact', v: '₹1.8Cr' }],
  },
  trends: ['+24% WoW', '+19% vs prev', '+31% MoM'],
  agents: [
    { name: 'Lead Qualifier', status: 'on' },
    { name: 'Support AI', status: 'on' },
    { name: 'WhatsApp Bot', status: 'on' },
    { name: 'Invoice Auto', status: 'idle' },
  ],
  events: [
    { text: 'Lead from IndiaMart qualified → Raj Kumar', tag: 'Sales AI' },
    { text: 'Ticket #4821 auto-resolved — 12 sec', tag: 'Support AI' },
    { text: 'WhatsApp blast sent → 47 warm leads', tag: 'Outreach' },
    { text: 'Invoice INV-2294 generated & emailed', tag: 'Finance' },
    { text: 'Onboarding triggered: Priya Sharma', tag: 'HR AI' },
  ],
}

export const platforms = {
  label: "Powered By World's Most Powerful AI Platforms",
  names: ['OpenAI', 'Anthropic', 'Google Cloud', 'AWS', 'Meta AI', 'Azure', 'HubSpot', 'Make',
    'WhatsApp', 'Twilio', 'Razorpay', 'LangChain', 'n8n', 'Groq', 'Zapier', 'Slack'],
}

export const problem = {
  eyebrow: 'The Problem',
  heading: 'Manual Work Is Quietly Killing Your Growth',
  sub: "While you're chasing spreadsheets and follow-ups, automated competitors respond in seconds. Here's exactly what it's costing you.",
  cards: [
    { stat: '67%', statLabel: 'leads never followed up', title: '67% of Leads Go Cold Within 1 Hour',
      text: 'Your sales team is busy. Manual follow-ups get delayed. Competitors who automate respond in seconds — and win.' },
    { stat: '₹8L+', statLabel: 'avg. monthly loss', title: '₹8 Lakh+ Per Month Lost to Admin Errors',
      text: 'Data entry mistakes, missed invoices, delayed reports — the hidden cost of manual processes drains your margins silently.' },
    { stat: '3.5 hrs', statLabel: 'daily per employee', title: '3.5 Hours / Day Per Employee on Repetitive Tasks',
      text: "Your best people are doing work a machine should handle. That's over 40% of their day gone to zero-value activity." },
    { stat: '83%', statLabel: 'businesses lack real-time data', title: 'No Real-Time Visibility — Just Gut Feelings',
      text: "Decisions made on last month's data, in spreadsheets nobody trusts. The business runs blind while competitors run dashboards." },
  ],
  banner: 'Combined, these four problems cost a 20-person business over ₹1.2 Cr per year in lost revenue and wasted time.',
  bannerCta: { label: 'Fix This Now', to: '/contact' },
}

export const trackRecord = {
  eyebrow: 'Our Track Record',
  heading: 'Numbers That Speak for Themselves',
  sub: 'From real deployments. Verified by clients across India.',
  stats: [
    { value: '200+', label: 'Businesses Automated', sub: 'Across 15+ industries' },
    { value: '97%', label: 'Client Satisfaction', sub: 'Measured post-deployment' },
    { value: '50Cr+', label: 'Revenue Generated', sub: 'For our clients combined' },
    { value: '8x', label: 'Average ROI', sub: 'Within first 6 months' },
  ],
}

export const capabilities = {
  eyebrow: 'What We Build',
  heading: 'Our core capabilities',
  sub: 'Six core capabilities. One integrated system — deployed end-to-end for your business.',
  items: [
    { title: 'Agentic AI Solutions', image: '/home/cap-agentic.webp', tagline: 'AI Agents That Work While You Sleep',
      text: 'Deploy intelligent agents that autonomously handle lead qualification, customer follow-ups, and business processes 24/7 — no human intervention needed.',
      bullets: ['Autonomous lead scoring & routing', 'Multi-step workflow execution', 'Self-learning from outcomes', 'Integrates with your CRM & tools'],
      metric: '98% task automation rate' },
    { title: 'End-to-End Automation', image: '/home/cap-automation.webp', tagline: 'Connect Every Tool. Eliminate Every Bottleneck.',
      text: 'We map your entire business flow and automate every repetitive touchpoint — from data entry to reporting — using no-code and AI orchestration.',
      bullets: ['Cross-platform data sync', 'Auto-generated reports & alerts', 'Error-free invoice & billing flows', 'Slack/Email/WhatsApp integrations'],
      metric: '12x faster task completion' },
    { title: 'AI Content Studio', image: '/home/cap-content.webp', tagline: 'Scale Content Without Scaling Headcount',
      text: 'Generate brand-aligned blog posts, social media content, product descriptions, and ad copy at scale — personalized for your audience segments.',
      bullets: ['Brand voice training', '50+ content formats', 'SEO-optimized output', 'Multi-language support'],
      metric: '10x content output increase' },
    { title: 'Voice AI Agents', image: '/home/voice-ai.webp', tagline: '24/7 Voice Agents That Sound Human',
      text: 'Deploy AI-powered voice agents for inbound calls, appointment booking, and customer queries. Works on phone, WhatsApp voice, and web — in Hindi and English.',
      bullets: ['Natural language call handling', 'Appointment scheduling & reminders', 'Hindi + English + 12 regional langs', 'CRM sync after every call'],
      metric: '3x more calls handled daily' },
    { title: 'Finance Automation', image: '/home/finance-gst.webp', tagline: 'Zero-Error Finance Ops on Autopilot',
      text: 'Automate invoicing, GST filing, bank reconciliation, and expense management. Integrated with Tally, Zoho Books, and all major Indian accounting platforms.',
      bullets: ['Auto invoice generation & dispatch', 'GST return preparation', 'Bank reconciliation automation', 'Real-time expense dashboards'],
      metric: '85% reduction in manual finance work' },
    { title: 'Data Intelligence', image: '/home/cap-data.webp', tagline: 'From Raw Data to Revenue Decisions',
      text: 'Pull data from every tool you use into unified dashboards. AI surfaces trends, predicts churn, forecasts demand, and delivers insights before problems escalate.',
      bullets: ['Multi-source data unification', 'Predictive churn & demand models', 'Anomaly detection & auto-alerts', 'Custom executive KPI dashboards'],
      metric: '2.4x faster strategic decisions' },
  ],
}

export const process = {
  eyebrow: 'Our Process',
  heading: 'From First Call to Full Automation',
  body: "We don't sell software. We build custom automation systems for your specific workflows. Here's exactly how it works — no surprises, no scope creep.",
  cta: { label: 'Start Your Project', to: '/contact' },
  steps: [
    { no: '01', title: 'Discovery & Audit', time: '3–5 days', text: 'We map your current workflows, identify bottlenecks, and quantify the cost of manual processes. You get a clear automation ROI estimate before we write a single line.' },
    { no: '02', title: 'Solution Architecture', time: '1 week', text: 'Our engineers design the exact automation stack — which AI models, which integrations, which workflows — tailored to your tools and team.' },
    { no: '03', title: 'Build & Integrate', time: '2–4 weeks', text: 'We build, connect, and test every automation against real business scenarios. No surprise edge cases, no "it works in staging" failures.' },
    { no: '04', title: 'Go Live + Optimize', time: 'Ongoing', text: "We monitor performance post-launch, retrain models on your data, and iterate until KPIs are hit. You're not left alone after deployment." },
  ],
  trustSignals: [
    { title: '14-day avg. delivery', text: 'First automation live in 2 weeks' },
    { title: 'No lock-in contract', text: 'Month-to-month, cancel anytime' },
    { title: '24/7 post-launch support', text: 'We stay with you after go-live' },
    { title: 'Results-backed pricing', text: 'Milestones tied to your KPIs' },
  ],
  miniTestimonial: {
    quote: 'From first call to live automation in 11 days. The process was seamless — exactly as described.',
    name: 'Rajiv Mehta', role: 'Founder, RealEdge Properties',
  },
}

export const solutions = {
  eyebrow: 'Solutions',
  heading: 'Built for Every Business Function',
  link: { label: 'See full case study', to: '/solutions' },
  items: [
    { name: 'AI Sales Agent', image: '/home/sales-agent.webp', tagline: 'Never Miss a Lead Again',
      text: 'An AI agent that qualifies inbound leads, scores them by intent, routes to the right rep, and follows up automatically within minutes — not hours.',
      bullets: ['Instant lead response < 2 min', 'Intent-based scoring model', 'CRM auto-update on every touchpoint', '3x conversion rate improvement'],
      stat: '340% increase in qualified meetings' },
    { name: 'AI Customer Support', image: '/home/customer-support.webp', tagline: 'Support at Scale, Zero Burnout',
      text: 'Deploy a 24/7 AI support agent that resolves 80% of tickets instantly, escalates complex ones with full context, and learns from every interaction.',
      bullets: ['80% tickets auto-resolved', 'Seamless human handoff', 'Multilingual: EN, HI, and more', 'Integrates with Zendesk, Freshdesk'],
      stat: '80% tickets resolved without human' },
    { name: 'AI Content Engine', image: '/home/content-engine.webp', tagline: 'Content Factory on Autopilot',
      text: 'From keyword brief to published post — fully automated. SEO research, outline, draft, images, and scheduling handled by AI trained on your brand voice.',
      bullets: ['Full blog workflow automation', 'Brand voice fine-tuning', 'Auto-publish to CMS', 'SEO metadata generation'],
      stat: '10x content output, same team size' },
    { name: 'Business Intelligence', image: '/home/business-intelligence.webp', tagline: 'Real-Time Decisions, Not Gut Feels',
      text: 'Pull data from every tool you use into one live dashboard. AI surfaces anomalies, forecasts trends, and sends alerts before problems become crises.',
      bullets: ['All sources in one view', 'Anomaly detection alerts', 'Predictive revenue forecasting', 'Custom KPI dashboards'],
      stat: '2.4x faster decision making' },
    { name: 'HR & Ops Automation', image: '/home/hr-ops.webp', tagline: 'Ops That Run Without You',
      text: 'Automate hiring funnels, onboarding workflows, leave management, and payroll triggers. Your HR team focuses on people, not paperwork.',
      bullets: ['Resume screening automation', 'Automated onboarding flows', 'Leave approval workflows', 'Payroll trigger integrations'],
      stat: '60% reduction in HR admin time' },
    { name: 'E-commerce Automation', image: '/home/ecommerce.webp', tagline: 'Scale Orders, Not Overheads',
      text: 'Automate inventory updates, order processing, abandoned cart recovery, and customer win-back campaigns across Shopify, WooCommerce, and more.',
      bullets: ['Real-time inventory sync', 'Abandoned cart recovery flows', 'Auto order status updates', 'Review request sequences'],
      stat: '28% increase in repeat purchases' },
    { name: 'Voice AI Agents', image: '/home/voice-ai.webp', tagline: 'Calls Answered. Leads Captured. 24/7.',
      text: 'AI voice agents that handle inbound calls, book appointments, qualify leads, and answer FAQs — in Hindi, English, and 12+ regional languages. No human needed.',
      bullets: ['Natural-sounding voice conversations', 'Appointment booking & confirmation', 'Lead capture to CRM in real-time', 'Works on IVR, WhatsApp & web'],
      stat: '3x more calls handled per day' },
    { name: 'Finance & GST Automation', image: '/home/finance-gst.webp', tagline: 'Finance Ops Without the Errors',
      text: 'Automate invoice generation, GST filing, bank reconciliation, and MIS reports. Integrated with Tally, Zoho Books, and Razorpay for seamless Indian accounting.',
      bullets: ['Auto invoice dispatch & tracking', 'GST return preparation & filing', 'Bank reconciliation automation', 'Real-time P&L dashboards'],
      stat: '85% reduction in manual finance tasks' },
    { name: 'WhatsApp Marketing', image: '/home/whatsapp-marketing.webp', tagline: 'Your Best Salesperson Runs on WhatsApp',
      text: 'Build automated WhatsApp sequences for lead nurturing, re-engagement, and post-sale follow-up. Personalised, compliant with WABA policies, and measurable.',
      bullets: ['Drip campaigns with smart branching', 'Broadcast to segmented contact lists', 'Opt-in/opt-out compliance built-in', 'Analytics: open, click & reply rates'],
      stat: '62% higher conversion than email' },
  ],
}

export const industries = {
  eyebrow: 'Industries',
  heading: "We Speak Your Industry's Language",
  link: { label: 'All Industries', to: '/industries' },
  // desc fields are verbatim from the archived Industries mega-menu (global.md).
  items: [
    { name: 'Real Estate', image: '/home/ind-real-estate.webp', stat: '4.2x ROI', to: '/industries/real-estate', desc: 'Lead nurturing & property recommendation AI' },
    { name: 'Healthcare', image: '/home/ind-healthcare.webp', stat: '70% less admin', to: '/industries/healthcare', desc: 'Appointment bots, patient follow-up & billing AI' },
    { name: 'Education', image: '/home/ind-education.webp', stat: '3x enrollments', to: '/industries/education', desc: 'Admissions automation & student engagement' },
    { name: 'Retail & E-com', image: '/home/ind-retail.webp', stat: '28% more orders', to: '/industries/retail-ecommerce', desc: 'Personalisation, returns & inventory automation' },
    { name: 'Logistics', image: '/home/ind-logistics.webp', stat: '50% faster ops', to: '/industries/logistics', desc: 'Route optimisation & delivery status automation' },
    { name: 'Hospitality', image: '/home/ind-hospitality.webp', stat: '92% satisfaction', to: '/industries/hospitality', desc: 'Booking management & guest experience AI' },
    { name: 'Manufacturing', image: '/home/ind-manufacturing.webp', stat: '35% cost cut', to: '/industries/manufacturing', desc: 'Shop-floor AI, defect detection & OEE tracking' },
  ],
}

export const caseStudies = {
  eyebrow: 'Case Studies',
  heading: 'Real Results. Real Businesses.',
  // Homepage-featured stories. First two from home.md; the rest are additional
  // documented case studies pulled verbatim from content-archive/pages/case-studies.md.
  items: [
    { client: 'PropTech Startup, Mumbai', industry: 'Real Estate',
      challenge: 'Sales team spending 4 hrs/day manually qualifying leads from 6 different portals.',
      solution: 'AI lead qualification agent + CRM auto-routing + WhatsApp follow-up sequences.',
      stats: [{ v: '340%', k: 'More qualified meetings booked' }, { v: '< 90s', k: 'Average first response time' }, { v: '₹22L', k: 'Additional monthly revenue' }] },
    { client: 'D2C Brand, Bengaluru', industry: 'E-commerce',
      challenge: 'Customer support team overwhelmed. 500+ daily tickets, 6-hour average resolution time.',
      solution: 'AI support agent trained on product catalog + escalation logic + Shopify integration.',
      stats: [{ v: '82%', k: 'Tickets auto-resolved' }, { v: '4 min', k: 'Avg. resolution time (was 6 hrs)' }, { v: '₹8L/mo', k: 'Support cost saved' }] },
    { client: 'Multi-Specialty Clinic Chain, New Delhi', industry: 'Healthcare',
      challenge: 'A 12-doctor clinic losing ₹8L/month to no-shows. Front desk of 4 overwhelmed with 300+ daily calls — reminders and rescheduling consumed 80% of working hours.',
      solution: 'AI voice agent handling all inbound calls 24/7 with natural Hindi/English conversations; automated 3-touch reminder sequence (48h, 24h, 2h before appointment).',
      stats: [{ v: '65%', k: 'Reduction in no-shows' }, { v: '₹8L', k: 'Monthly revenue recovered' }, { v: '4.2★', k: 'Google rating increase' }] },
    { client: 'CBSE Day School (2,400 Students), Pune', industry: 'Education',
      challenge: '600+ admission enquiries in a 6-week window. Office staff of 5 handling calls, form processing, and interviews — 30% of hot leads lost to faster-responding competitor schools.',
      solution: 'AI WhatsApp agent answering all admission queries 24/7 — fees, curriculum, facilities, transport; automated application form dispatch with step-by-step completion guidance.',
      stats: [{ v: '100%', k: 'Enquiries responded (within 90s)' }, { v: '5→2', k: 'Admissions staff needed' }, { v: '92%', k: 'Seats filled by week 4' }] },
    { client: 'Last-Mile Delivery Company, Delhi NCR', industry: 'Logistics',
      challenge: 'Ops managers spending 4 hours every morning on manual dispatch coordination, client update calls, and invoice reconciliation. No visibility on delays until customers complained.',
      solution: 'AI-driven dispatch with route optimization using real-time traffic data; automated client shipment status updates via WhatsApp at key milestones.',
      stats: [{ v: '50%', k: 'Faster operations' }, { v: '₹6L', k: 'Monthly ops overhead saved' }, { v: '99.2%', k: 'On-time delivery rate' }] },
    { client: 'Boutique Hotel Chain (12 Properties), Rajasthan', industry: 'Hospitality',
      challenge: 'Over 60% of bookings via OTAs costing 18–22% commission. Pre-arrival guest communication was inconsistent. Review management across 12 properties was manual and slow.',
      solution: 'WhatsApp AI concierge activated on every booking confirmation; pre-arrival personalization for dining preferences, room customisation, and local experiences.',
      stats: [{ v: '41%', k: 'Direct booking revenue up' }, { v: '₹3.2L', k: 'Monthly upsell revenue' }, { v: '2.4x', k: 'Review volume increase' }] },
    { client: 'Auto Components Manufacturer, Pune', industry: 'Manufacturing',
      challenge: 'Purchase team of 6 spending 60% of time on vendor follow-ups, PO generation, and invoice reconciliation. No real-time inventory visibility led to frequent stockouts and over-ordering.',
      solution: 'AI procurement agent auto-generating POs based on inventory triggers and reorder points; automated vendor follow-up via WhatsApp and email with escalation logic.',
      stats: [{ v: '₹18L', k: 'Monthly savings' }, { v: '0', k: 'Stockouts in 3 months' }, { v: '75%', k: 'Team time saved' }] },
  ],
}

export const whyUs = {
  eyebrow: 'Why AI Agentix',
  heading: 'Old Way vs. The AI Way',
  sub: 'Every manual process is a liability. See exactly what changes when you automate with us.',
  cols: ['WITHOUT AUTOMATION', 'WITH AI AGENTIX'],
  rows: [
    { label: 'Response Time', bad: 'Hours or days delay', badMeta: '4+ hrs avg.', good: 'Responds in seconds, always', goodMeta: '< 90 sec', gain: '160x faster' },
    { label: 'Scalability', bad: 'Hire more staff to grow', badMeta: '+₹5L per hire', good: 'AI scales with zero extra cost', goodMeta: '10x capacity', gain: 'Zero extra cost' },
    { label: 'Accuracy', bad: 'Human errors every day', badMeta: '23% error rate', good: 'Consistent, auditable output', goodMeta: '< 0.1% errors', gain: '99.9% accuracy' },
    { label: 'Data Visibility', bad: 'Monthly spreadsheet reports', badMeta: '30-day lag', good: 'Live dashboards, instant alerts', goodMeta: '< 5 sec data', gain: 'Real-time' },
    { label: 'Operating Cost', bad: 'Manual overhead + errors', badMeta: '₹8L+/mo waste', good: 'Automated, lean operations', goodMeta: '60% cut', gain: 'Save ₹8L/mo' },
  ],
  bottomNote: 'Free strategy call · No commitment · Results guaranteed',
  cta: { label: 'See AI Agentix in Action', to: '/contact' },
}

export const testimonialsSection = {
  eyebrow: 'Client Stories',
  heading: 'Businesses That Transformed With Us',
  items: [
    { quote: 'We went from losing 60% of inbound leads to responding within 90 seconds. The AI agent handles qualification, WhatsApp follow-ups, CRM updates — everything. Our sales team now only talks to hot leads.', name: 'Rajiv Mehta', role: 'Founder, RealEdge Properties', tag: 'Real Estate', result: '340% more meetings' },
    { quote: 'Their automation cut our content production time by 80%. We now publish 5x more content without hiring a single person.', name: 'Priya Sharma', role: 'Marketing Head, LearnNow', tag: 'EdTech', result: '5x content output' },
    { quote: 'The AI support agent handles 82% of customer tickets automatically. Our team went from firefighting to strategic work overnight.', name: 'Sneha Kapoor', role: 'Customer Success Lead, ShopEasy', tag: 'E-commerce', result: '82% tickets auto-resolved' },
    { quote: 'We automated our entire onboarding flow — document collection, verification, welcome sequences. What took 3 days now takes 20 minutes.', name: 'Vikram Patel', role: 'COO, FinServe India', tag: 'Finance', result: '3 days → 20 minutes' },
    { quote: 'Agentix built our WhatsApp lead nurturing sequence. 90-second response time on every inquiry, 24/7. Our conversion rate tripled.', name: 'Mehul Desai', role: 'Founder, PropNext Realty', tag: 'Real Estate', result: '3x lead conversion' },
    { quote: 'ROI hit 8x in 4 months. The BI dashboard alone transformed how our leadership makes decisions — finally, real-time data instead of gut feelings.', name: 'Aditya Nair', role: 'CEO, SupplyLink Logistics', tag: 'Logistics', result: '8x ROI in 4 months' },
    { quote: 'Our HR team used to spend 15 hours a week on resume screening. Now AI does it in minutes and only sends us the top 10 candidates. Game changer.', name: 'Riya Joshi', role: 'HR Director, TechHire Solutions', tag: 'Recruitment', result: '15 hrs/week saved' },
    { quote: 'We set up automated inventory alerts, purchase order triggers, and supplier communications. Zero manual effort, zero missed reorders.', name: 'Suresh Kumar', role: 'Operations Manager, ManuCore Ltd.', tag: 'Manufacturing', result: '0 missed reorders' },
    { quote: 'The voice AI agent books appointments for our clinic 24/7. Patients love it, and our front desk team finally has breathing room.', name: 'Dr. Anjali Singh', role: 'Clinic Director, HealthFirst', tag: 'Healthcare', result: '40% more bookings' },
    { quote: 'We scaled from 500 to 5,000 students without adding admin staff. The automation handles admissions, fee reminders, and attendance — all of it.', name: 'Prakash Iyer', role: 'Principal, Vidya Academy', tag: 'Education', result: '10x student scale' },
  ],
}

export const roi = {
  eyebrow: 'The ROI Case',
  heading: 'The Business Case for AI Agentix',
  sub: 'Measured across 200+ client deployments',
  stats: [
    { value: '8x', label: 'Average ROI', sub: 'Measured at 6 months' },
    { value: '12x', label: 'Faster Operations', sub: 'Task completion speed' },
    { value: '60%', label: 'Cost Reduction', sub: 'On automated workflows' },
    { value: '200+', label: 'Deployments', sub: 'Across industries' },
    { value: '97%', label: 'Satisfaction', sub: 'Post-deployment score' },
  ],
}

export const finalCta = {
  eyebrow: 'Get Started',
  heading: 'Ready to Automate Your Business?',
  body: "Book a free 30-minute strategy call. We'll map your biggest automation opportunity and show you exactly what we'd build — no commitment required.",
  checklist: ['No credit card required', '30-min free call', 'Results in 2–4 weeks'],
  ctas: [
    { label: 'Book Free Strategy Call', to: '/contact', primary: true },
    { label: 'Explore Solutions', to: '/solutions', primary: false },
  ],
}
