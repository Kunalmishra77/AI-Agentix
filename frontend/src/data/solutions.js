// Solutions page content — verbatim from content-archive/pages/solutions.md.

export const meta = {
  title: 'AI Solutions — AI Agentix',
  description: 'AI agents and automation for sales, support, marketing, HR, and operations. Built for Indian businesses.',
}

export const hero = {
  eyebrow: '10 Production-Ready Solutions',
  heading: 'AI Built for Every Business Function',
  body: 'From lead generation to HR automation — every solution is custom-built for your workflows and deployed in 2–4 weeks.',
  ctas: [
    { label: 'Book Free Discovery Call', to: '/contact', primary: true },
    { label: 'See Results', to: '/case-studies', primary: false },
  ],
}

export const categories = ['All', 'Sales & Revenue', 'Customer Support', 'Marketing', 'Operations', 'Analytics']

// icon keys map to lucide icons in the component
export const items = [
  { name: 'Multi-Channel Outreach', category: 'Marketing', icon: 'outreach', tagline: 'One Campaign. Every Channel.',
    desc: 'Reach customers on WhatsApp, voice, email, website chat, Instagram, and Facebook Messenger from a single campaign — every reply flows into one centralized CRM automatically, so no conversation is ever missed.',
    features: ['WhatsApp, Voice, Email, Chat & Social in one flow', 'Automated responses across every channel', 'Unified conversation history in your CRM', 'Segmented broadcasts with smart follow-up'],
    stat: '6 channels, one dashboard', time: '2–3 weeks', roi: '6–10x' },
  { name: 'AI Lead Qualification', category: 'Sales & Revenue', icon: 'qualify', tagline: 'Only Talk to Ready-to-Buy Leads',
    desc: 'AI scores and qualifies every incoming lead by purchase intent in real time, routes hot leads to the right rep, and syncs status to your CRM — so your team spends time only on leads that actually convert.',
    features: ['Real-time intent scoring', 'Automatic lead routing & assignment', 'Instant CRM sync & status updates', 'Auto follow-up on unqualified leads'],
    stat: '3x higher lead-to-meeting rate', time: '2–3 weeks', roi: '8–12x' },
  { name: 'AI Sales Agent', category: 'Sales & Revenue', icon: 'sales', tagline: 'Never Miss a Lead Again',
    desc: 'Deploy an AI agent that qualifies every inbound lead within 90 seconds, scores them by purchase intent, routes to the right rep, and follows up automatically across WhatsApp, email, and phone.',
    features: ['Lead qualification in < 90 seconds', 'Intent scoring & CRM auto-update', 'Multi-channel follow-up sequences', 'Real-time sales pipeline visibility'],
    stat: '340% more qualified meetings', time: '2–3 weeks', roi: '8–12x' },
  { name: 'AI Support Agent', category: 'Customer Support', icon: 'support', tagline: 'Support at Scale, Zero Burnout',
    desc: '24/7 AI support that resolves 80% of tickets instantly, understands context from previous conversations, escalates complex cases with full history, and learns from every interaction.',
    features: ['80% auto-resolution rate', 'Seamless human escalation', 'Multi-language (EN, HI, and more)', 'Integrates with Zendesk, Freshdesk'],
    stat: '80% tickets resolved without human', time: '2–3 weeks', roi: '6–10x' },
  { name: 'AI Content Engine', category: 'Marketing', icon: 'content', tagline: 'Content Factory on Autopilot',
    desc: 'From keyword brief to published post — fully automated. AI researches topics, writes SEO-optimized content, generates images, and schedules across your CMS and social channels.',
    features: ['Full blog automation pipeline', 'Brand voice training', 'Auto-publish to CMS & social', 'SEO metadata + internal linking'],
    stat: '10x content output, same team', time: '1–2 weeks', roi: '5–8x' },
  { name: 'Business Intelligence', category: 'Analytics', icon: 'analytics', tagline: 'Real-Time Decisions, Not Gut Feels',
    desc: 'Pull data from every tool into one live dashboard. AI detects anomalies, forecasts revenue, surfaces insights, and sends WhatsApp alerts before small problems become big ones.',
    features: ['All data sources unified', 'Anomaly detection & alerts', 'Revenue & churn forecasting', 'Custom KPI dashboards'],
    stat: '2.4x faster business decisions', time: '3–4 weeks', roi: '4–7x' },
  { name: 'HR & Ops Automation', category: 'Operations', icon: 'hr', tagline: 'Ops That Run Without You',
    desc: 'Automate your entire HR workflow — resume screening, interview scheduling, offer letters, onboarding, leave approvals, and payroll triggers. HR focuses on people, not paperwork.',
    features: ['Resume screening automation', 'Interview scheduling flows', 'Automated onboarding checklists', 'Leave & payroll integrations'],
    stat: '60% reduction in HR admin time', time: '3–4 weeks', roi: '5–9x' },
  { name: 'E-commerce Automation', category: 'Sales & Revenue', icon: 'ecom', tagline: 'Scale Orders, Not Overheads',
    desc: 'Real-time inventory sync, automated order processing, abandoned cart recovery, and personalised customer win-back campaigns. Works with Shopify, WooCommerce, and custom stores.',
    features: ['Real-time inventory sync', 'Abandoned cart recovery', 'Order status automation', 'Review request sequences'],
    stat: '28% increase in repeat purchases', time: '2–3 weeks', roi: '6–10x' },
  { name: 'Workflow Automation', category: 'Operations', icon: 'workflow', tagline: 'Connect Every Tool. Eliminate Every Bottleneck.',
    desc: 'Map and automate your entire business workflow — data entry, approvals, reporting, invoice generation, and cross-platform sync. Zero manual work, zero errors.',
    features: ['200+ tool integrations', 'Auto-generated reports', 'Approval & escalation flows', 'Error-free billing automation'],
    stat: '12x faster task completion', time: '3–5 weeks', roi: '7–12x' },
  { name: 'AI Voice Agent', category: 'Customer Support', icon: 'voice', tagline: 'Your 24/7 Phone Receptionist',
    desc: 'Handle inbound calls, book appointments, answer FAQs, and qualify leads — all via a natural-sounding AI voice agent that works in English and Hindi, 24 hours a day.',
    features: ['Natural voice in EN & HI', 'Appointment booking & reminders', 'FAQ handling & escalation', 'Call recordings & transcripts'],
    stat: '65% reduction in missed calls', time: '2–3 weeks', roi: '5–8x' },
]

export const process = {
  eyebrow: 'How It Works',
  heading: 'From Discovery to Deployment',
  body: 'Four clear steps. No surprises. You know exactly what happens at every stage.',
  steps: [
    { no: '01', time: '30 min', title: 'Discovery Call', text: 'We audit your workflows, identify the highest-ROI automation, and give you a precise timeline and cost estimate.' },
    { no: '02', time: '3–5 days', title: 'Architecture Design', text: 'Our engineers map the exact automation stack, integrations, and AI models for your specific use case.' },
    { no: '03', time: '2–4 weeks', title: 'Build & Test', text: 'We build, integrate, and stress-test every automation against real business scenarios before you see it.' },
    { no: '04', time: 'Ongoing', title: 'Go Live & Optimize', text: 'Launch with confidence. We monitor performance and iterate until every KPI is hit.' },
  ],
}

// Product demonstration showcase. The video itself is not final yet — the UI is
// built and ready; the <video> simply drops into the 16:9 placeholder later with
// no layout change. `flows` document the customer journeys the demo will show.
export const demo = {
  eyebrow: 'See It In Action',
  heading: 'Watch AI Agentix Run a Real Business',
  body: 'A complete customer journey — from first touch to closed deal — automated end to end across every channel and synced into one CRM. Full walkthrough video arriving soon.',
  videoBadge: 'Product Demo',
  videoNote: 'Full walkthrough video coming soon',
  flows: [
    { key: 'whatsapp', name: 'WhatsApp Automation',
      summary: 'Bulk campaigns that reply, qualify, and route on their own.',
      steps: ['Bulk WhatsApp campaign starts', 'Messages delivered automatically', 'Customers reply', 'AI responds instantly', 'Qualified leads identified', 'Conversations sync into the CRM', 'Leads assigned automatically', 'Sales pipeline updates in real time'] },
    { key: 'voice', name: 'AI Voice Agent',
      summary: 'Inbound and outbound calls handled with natural conversation.',
      steps: ['Incoming & outgoing calls', 'AI answers automatically', 'Natural conversation', 'Lead qualification', 'Appointment booking', 'CRM synchronization', 'Ticket creation (if applicable)', 'Call summaries & analytics'] },
    { key: 'crm', name: 'CRM Flow',
      summary: 'Every lead tracked from creation to close, automatically.',
      steps: ['New lead creation', 'Lead assignment', 'Status updates', 'Follow-ups', 'Sales stages', 'Activity timeline', 'Notifications', 'Dashboard updates'] },
    { key: 'omnichannel', name: 'Multi-Channel Automation',
      summary: 'Six channels, one centralized CRM dashboard.',
      steps: ['WhatsApp', 'Voice Calls', 'Email', 'Website Chat', 'Instagram', 'Facebook Messenger', 'All flowing into one CRM dashboard'] },
    { key: 'analytics', name: 'Analytics',
      summary: 'Live results — campaigns, conversion, ROI, and productivity.',
      steps: ['Live dashboards', 'Campaign performance', 'Lead conversion', 'AI insights', 'Team productivity', 'ROI improvements'] },
  ],
}

export const compare = {
  eyebrow: 'The Difference',
  heading: 'Manual vs Automated Business',
  cols: ['Metric', 'Manual Operations', 'With AI Agentix'],
  rows: [
    { metric: 'Lead Response Time', manual: '4–8 hours average', ai: '< 90 seconds' },
    { metric: 'Support Resolution', manual: '24–48 hours', ai: '< 4 minutes (80% auto)' },
    { metric: 'Report Generation', manual: 'Weekly, manual', ai: 'Real-time, automated' },
    { metric: 'Content Output', manual: '4 posts/month per person', ai: '40+ pieces/month, same team' },
    { metric: 'Error Rate', manual: '3–8% in data entry', ai: 'Near zero with validation' },
    { metric: 'Operating Cost', manual: 'Grows linearly with volume', ai: 'Fixed cost, unlimited scale' },
  ],
}

export const finalCta = {
  eyebrow: 'Start Today',
  heading: 'Which Solution Does Your Business Need?',
  body: "Book a free discovery call. We'll identify the highest-ROI automation for your workflows and show you exactly what we'd build.",
  ctas: [
    { label: 'Book Free Discovery Call', to: '/contact', primary: true },
    { label: 'See Results', to: '/case-studies', primary: false },
  ],
}
