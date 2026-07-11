// Sales Automation detail page — verbatim from
// content-archive/pages/solutions/sales-automation.md

export default {
  slug: 'sales-automation',
  heroImage: '/images/hero-sales-automation.webp',
  meta: {
    title: 'Sales Automation | AI Agentix',
    description: 'Qualify every lead in 90 seconds, automate multi-channel outreach, and close 3x more deals with AI-powered sales automation.',
  },
  hero: {
    eyebrow: 'Sales Automation',
    heading: 'Close 3x More Deals With AI-Powered Sales Automation',
    body: 'Qualify every lead in 90 seconds, automate multi-channel outreach, and give your reps the intelligence to close faster. From first touch to signed deal — fully automated.',
    ctas: [
      { label: 'Get Free Sales Audit', to: '/contact', primary: true },
      { label: 'View Case Studies', to: '/case-studies', primary: false },
    ],
    widget: {
      label: 'Live Pipeline Activity',
      leads: [
        { name: 'Alex M.', company: 'TechCorp', stage: 'Qualified', score: 94 },
        { name: 'Sarah K.', company: 'RetailX', stage: 'Meeting Set', score: 87 },
        { name: 'Raj P.', company: 'FinanceHub', stage: 'Proposal Sent', score: 76 },
        { name: 'Priya S.', company: 'HealthTech', stage: 'Follow-Up', score: 62 },
      ],
      footer: '4 leads scored · 2 meetings booked today',
    },
  },
  stats: [
    { value: '340%', label: 'More Qualified Meetings', sub: 'vs. manual process' },
    { value: '80%', label: 'Lead Response Rate', sub: 'within 5 minutes' },
    { value: '12x', label: 'ROI in Year One', sub: 'average across clients' },
    { value: '90s', label: 'Lead Score Time', sub: 'from capture to score' },
  ],
  capabilities: {
    eyebrow: 'Core Capabilities',
    heading: 'Every stage of your sales process — automated',
    items: [
      { name: 'Lead Qualification AI', icon: 'target',
        desc: 'Every inbound lead scored within 90 seconds using intent signals, firmographics, and behavioral data. High-intent leads instantly routed to top reps.',
        points: ['ICP matching & scoring', 'Behavioral intent analysis', 'Instant CRM sync', 'Priority routing rules'] },
      { name: 'Multi-Channel Outreach', icon: 'send',
        desc: 'Automated sequences across WhatsApp, email, and phone. Personalized messaging based on lead data, industry, and previous interactions.',
        points: ['WhatsApp + email + phone', 'Hyper-personalized templates', 'Follow-up cadence engine', 'Reply detection & routing'] },
      { name: 'Pipeline Intelligence', icon: 'pipeline',
        desc: 'Real-time deal tracking, forecasting, and bottleneck detection. Know exactly where deals stall and why, before it costs you the quarter.',
        points: ['Deal stage automation', 'Bottleneck alerts', 'Win probability scoring', 'Forecast accuracy +40%'] },
      { name: 'CRM Auto-Enrichment', icon: 'enrich',
        desc: 'Contacts auto-enriched with LinkedIn data, company info, and interaction history. Your reps always enter calls with full context and talking points.',
        points: ['LinkedIn enrichment', 'Company intelligence', 'Interaction timeline', 'Auto-note writing'] },
      { name: 'Meeting Booking', icon: 'calendar',
        desc: 'AI books meetings autonomously — qualifying, scheduling, and sending confirmation plus prep materials automatically without rep involvement.',
        points: ['Calendar sync & availability', 'Pre-meeting prep packs', 'No-show follow-up', 'Video link generation'] },
      { name: 'Revenue Analytics', icon: 'analytics',
        desc: 'Live dashboards showing pipeline health, rep performance, conversion rates, and revenue forecasts. Board-ready reports in one click.',
        points: ['Rep performance tracking', 'Conversion funnel views', 'Revenue forecasting', 'Custom report builder'] },
    ],
  },
  signature: {
    type: 'calculator',
    eyebrow: 'Sales ROI Calculator',
    heading: 'See what automation could add to your pipeline',
    body: 'Move the sliders to your numbers — watch the impact update live.',
    note: 'Estimates based on a 3.4x qualified-meeting uplift and 25% meeting-to-close rate across deployed clients. Your results will vary.',
    inputs: [
      { key: 'leads', label: 'Inbound leads / month', min: 50, max: 5000, step: 50, default: 600 },
      { key: 'deal', label: 'Average deal value', min: 5000, max: 500000, step: 5000, default: 60000, prefix: '₹' },
      { key: 'conv', label: 'Current lead → meeting rate', min: 1, max: 25, step: 1, default: 6, unit: '%' },
    ],
    outputs: [
      { key: 'meetings', label: 'Qualified meetings / month', compute: (v) => (v.leads * v.conv / 100) * 3.4 },
      { key: 'revenue', label: 'Added revenue / month', prefix: '₹',
        compute: (v) => (v.leads * v.conv / 100) * 2.4 * 0.25 * v.deal },
      { key: 'annual', label: 'Added revenue / year', prefix: '₹',
        compute: (v) => (v.leads * v.conv / 100) * 2.4 * 0.25 * v.deal * 12 },
    ],
  },
  process: {
    eyebrow: 'The Process',
    heading: 'From first touch to closed deal — end to end',
    steps: [
      { no: '01', title: 'Lead Captured', text: 'Inbound lead arrives via form, ad, or referral' },
      { no: '02', title: 'AI Scores & Routes', text: 'Scored in 90 seconds, routed to best rep' },
      { no: '03', title: 'Outreach Triggered', text: 'Personalized multi-channel sequence starts' },
      { no: '04', title: 'Meeting Booked', text: 'AI schedules and prepares both sides' },
      { no: '05', title: 'Deal Progresses', text: 'Pipeline tracked and updated automatically' },
      { no: '06', title: 'Revenue Closes', text: 'Won deal logged, playbook refined by AI' },
    ],
  },
  integrations: {
    eyebrow: 'Integrations',
    heading: 'Connects to your existing stack',
    body: 'Works with every major CRM, email, and communication tool. No rip-and-replace required.',
    tools: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive', 'Gmail', 'Outlook', 'LinkedIn', 'WhatsApp', 'Slack', 'Zapier', 'Calendly', 'Zoom'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered Sales vs. Traditional',
    cols: ['Capability', 'AI Agentix', 'Traditional Team'],
    rows: [
      { cap: 'Lead Response Time', ai: '< 90 seconds', traditional: '2–4 hours' },
      { cap: 'Lead Scoring', ai: 'AI-powered, real-time', traditional: 'Manual, subjective' },
      { cap: 'Outreach Personalization', ai: 'Dynamic, data-driven', traditional: 'Template-based' },
      { cap: 'Working Hours', ai: '24/7/365', traditional: 'Business hours only' },
      { cap: 'Cost per Lead Touched', ai: '~₹6', traditional: '~₹900–1400' },
      { cap: 'Meeting Booking', ai: 'Fully automated', traditional: 'Back-and-forth emails' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'Numbers that change the conversation',
    items: [
      { tag: 'B2B SaaS — 45 employees', stat: '340% more qualified meetings', text: 'Closed 12 enterprise deals in Q1 post-deployment.', meta: 'Result in 3 months' },
      { tag: 'E-commerce — 120 SKUs', stat: '₹2.8Cr recovered in abandoned carts', text: 'AI reactivated 38% of abandoned leads via WhatsApp.', meta: 'Result in 6 weeks' },
      { tag: 'Financial Services', stat: '12x ROI on sales AI investment', text: 'Outreach cost dropped from ₹900 to ₹65 per lead.', meta: 'Result in 4 months' },
    ],
  },
  faq: {
    heading: 'Sales Automation — Questions Answered',
    items: [
      { q: 'How long does deployment take?', a: 'Most clients are live within 2–3 weeks. Setup includes CRM integration, workflow configuration, and team onboarding.' },
      { q: 'Which CRMs does it connect to?', a: 'Salesforce, HubSpot, Zoho CRM, Pipedrive, and any CRM with API access. Custom integrations available on enterprise plans.' },
      { q: 'How is lead scoring configured?', a: 'You define your ICP criteria, deal size thresholds, and qualification rules. The AI learns and improves scoring accuracy over time.' },
      { q: 'Can reps still control their pipeline?', a: 'Yes. Reps see everything AI does, can override any decision, and receive priority alerts for high-value actions.' },
      { q: 'What about GDPR / data privacy?', a: 'All data is encrypted, stored in your region, and fully compliant. We sign DPA agreements for all enterprise clients.' },
    ],
  },
  cta: {
    heading: 'Ready to 3x Your Sales Pipeline?',
    body: 'Join 200+ companies using AI Agentix to automate their sales process. Start with a free AI audit.',
    ctas: [
      { label: 'Get Free Sales Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
