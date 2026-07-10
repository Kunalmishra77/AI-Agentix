// Marketing Automation detail page — content verbatim from
// content-archive/pages/solutions/marketing-automation.md

export default {
  slug: 'marketing-automation',
  meta: {
    title: 'Marketing Automation | AI Agentix',
    description: 'Content, campaigns, lead nurturing, and analytics — all running on autopilot. 6x your marketing output with AI-powered automation.',
  },
  hero: {
    eyebrow: 'Marketing Automation',
    heading: '6x Your Marketing Output With AI-Powered Automation',
    body: 'Content, campaigns, lead nurturing, and analytics — all running on autopilot. Your marketing machine works 24/7 while your team focuses on strategy and growth.',
    ctas: [
      { label: 'Get Marketing Audit', to: '/contact', primary: true },
      { label: 'See AI Studio', to: '/ai-studio', primary: false },
    ],
  },
  stats: [
    { value: '6x', label: 'More Content Output', sub: 'same team size' },
    { value: '280%', label: 'Increase in Organic Traffic', sub: 'within 90 days' },
    { value: '90%', label: 'Email Open Rate Lift', sub: 'vs. generic sequences' },
    { value: '4x', label: 'Faster Campaign Launch', sub: 'from brief to live' },
  ],
  capabilities: {
    eyebrow: 'Full-Stack Marketing AI',
    heading: 'Every marketing function — automated',
    items: [
      { name: 'Content Engine', icon: 'content',
        title: 'AI Content Factory — Zero Effort',
        desc: 'Blog posts, social content, email sequences, ad copy — all generated, brand-checked, and scheduled automatically. Your content pipeline runs while you sleep.',
        points: ['SEO-optimized blog automation', 'Brand voice enforcement', 'Multi-format repurposing', 'Auto-publish to CMS + social'] },
      { name: 'Campaign Manager', icon: 'campaign',
        title: 'Campaigns That Run Themselves',
        desc: 'Plan, execute, and optimize campaigns across all channels from one AI-powered command center. A/B testing, budget optimization, and creative refresh — automated.',
        points: ['Multi-channel campaign orchestration', 'Automatic A/B test selection', 'Budget reallocation engine', 'Creative performance scoring'] },
      { name: 'Lead Nurturing', icon: 'nurture',
        title: 'Nurture Sequences That Convert',
        desc: 'Behavioral triggers, lead scoring, and personalized nurture paths. Every lead gets the right message at the right time based on their actions and intent signals.',
        points: ['Behavioral email triggers', 'Dynamic lead scoring', 'Personalized nurture journeys', 'CRM sync on every action'] },
      { name: 'Analytics & ROI', icon: 'analytics',
        title: 'Attribution That Actually Works',
        desc: 'First-touch, last-touch, and multi-touch attribution across all channels. Know exactly which campaigns drive revenue — not just traffic.',
        points: ['Multi-touch attribution', 'Channel ROI comparison', 'Revenue attribution reports', 'Real-time campaign dashboards'] },
      { name: 'SEO Intelligence', icon: 'seo',
        title: 'Dominate Search — Automatically',
        desc: 'Topic cluster strategy, keyword gap analysis, and content briefs generated weekly. SEO recommendations applied to all content in real time.',
        points: ['Topic cluster automation', 'Keyword opportunity alerts', 'Content brief generation', 'On-page SEO enforcement'] },
    ],
  },
  signature: {
    type: 'calculator',
    eyebrow: 'Content Output Calculator',
    heading: 'See how much more your team could ship',
    body: 'Set your current output — watch what a 6x AI content engine unlocks, live.',
    note: 'Estimates based on a 6x output multiplier and ~₹40 AI cost per piece across deployed clients. Your results will vary.',
    inputs: [
      { key: 'pieces', label: 'Content pieces / month (today)', min: 2, max: 40, step: 1, default: 4 },
      { key: 'team', label: 'Marketers on the team', min: 1, max: 20, step: 1, default: 3 },
      { key: 'cost', label: 'Avg cost per piece', min: 500, max: 12000, step: 500, default: 3000, prefix: '₹' },
    ],
    outputs: [
      { key: 'output', label: 'Content pieces / month with AI', compute: (v) => v.pieces * 6 },
      { key: 'hours', label: 'Team hours freed / month', unit: 'hrs', compute: (v) => v.team * 60 },
      { key: 'saved', label: 'Production cost saved / month', prefix: '₹', compute: (v) => v.pieces * v.cost * 5 },
    ],
  },
  process: {
    eyebrow: 'The Marketing Engine',
    heading: 'Strategy to revenue — fully connected',
    steps: [
      { no: '01', title: 'Strategy Defined', text: 'AI maps goals to channel mix and content plan' },
      { no: '02', title: 'Content Generated', text: 'Blogs, ads, emails, and social posts created' },
      { no: '03', title: 'Campaigns Launched', text: 'Multi-channel execution with A/B testing' },
      { no: '04', title: 'Leads Captured', text: 'Form fills, clicks, and intent tracked' },
      { no: '05', title: 'Leads Nurtured', text: 'Automated sequences convert prospects' },
      { no: '06', title: 'ROI Reported', text: 'Revenue attribution, channel comparison' },
    ],
  },
  integrations: {
    eyebrow: 'Channel Coverage',
    heading: 'Every channel. One AI command center.',
    body: 'Publish, advertise, and measure across every platform your audience lives on — no rip-and-replace required.',
    tools: ['WordPress', 'Webflow', 'Shopify', 'HubSpot', 'Mailchimp', 'Google Ads', 'Meta Ads', 'LinkedIn', 'Instagram', 'Google Analytics', 'Semrush', 'Zapier'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered Marketing vs. Traditional',
    cols: ['Capability', 'AI Agentix', 'Traditional Team'],
    rows: [
      { cap: 'Content Output', ai: '6x, brand-checked', traditional: '2–3 pieces/week' },
      { cap: 'Campaign Launch', ai: 'Hours, automated', traditional: '1–2 weeks, manual' },
      { cap: 'A/B Testing', ai: 'Continuous, auto-selected', traditional: 'Occasional, manual' },
      { cap: 'Lead Nurturing', ai: 'Behavioral, real-time', traditional: 'Generic drip' },
      { cap: 'Attribution', ai: 'Multi-touch, real-time', traditional: 'Last-click guesswork' },
      { cap: 'Cost per Content Piece', ai: '~₹40', traditional: '~₹2,000–5,000' },
    ],
  },
  results: {
    eyebrow: 'Marketing Results',
    heading: 'Marketing results that move the needle',
    items: [
      { tag: 'D2C Fashion Brand', stat: '6x content output, 40% traffic growth', text: 'Went from 2 blogs/month to 14 with the same team, driving 280% organic traffic increase in 4 months.', meta: 'Achieved in 4 months' },
      { tag: 'B2B HR Tech SaaS', stat: '380 MQLs in 60 days from content alone', text: 'AI topic cluster strategy and content automation filled the top of funnel without ad spend increase.', meta: 'Achieved in 60 days' },
      { tag: 'Real Estate Agency', stat: '12x WhatsApp campaign ROI', text: 'Automated lead nurturing via WhatsApp converted 34% of cold leads to site visits.', meta: 'Achieved in 3 months' },
    ],
  },
  faq: {
    heading: 'Marketing Automation — Questions Answered',
    items: [
      { q: 'How does the AI maintain brand voice?', a: 'You upload brand guidelines, tone samples, and approved copy. The AI learns your voice and enforces it on every output before scheduling.' },
      { q: 'Which platforms does it publish to?', a: 'WordPress, Webflow, Shopify, LinkedIn, Instagram, Facebook, and any CMS with an API. More integrations added regularly.' },
      { q: 'Can I still review content before it goes live?', a: 'Absolutely. Every workflow includes approval checkpoints. You decide which content is auto-published vs. human-reviewed.' },
      { q: 'How long until I see results?', a: 'Most clients see a measurable lift in organic traffic within 60 days and lead volume improvement within 90 days.' },
      { q: 'Does it replace my marketing team?', a: 'No — it removes 80% of production work so your team can focus on strategy, brand decisions, and creativity.' },
    ],
  },
  cta: {
    heading: 'Ready to Automate Your Marketing?',
    body: 'Get a free marketing audit and discover exactly which parts of your marketing can be automated this month.',
    ctas: [
      { label: 'Get Free Marketing Audit', to: '/contact', primary: true },
      { label: 'Explore AI Studio', to: '/ai-studio', primary: false },
    ],
  },
}
