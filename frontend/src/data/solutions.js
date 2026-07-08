// Solutions page content — verbatim from content-archive/pages/solutions.md.

export const meta = {
  title: 'AI Solutions — AI Agentix',
  description: 'AI agents and automation for sales, support, marketing, HR, and operations. Built for Indian businesses.',
}

export const hero = {
  eyebrow: '8 Production-Ready Solutions',
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
