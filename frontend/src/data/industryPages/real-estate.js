// Real Estate industry page — content verbatim from
// content-archive/pages/industries/real-estate.md

export default {
  slug: 'real-estate',
  heroImage: '/images/hero-ind-real-estate.webp',
  meta: {
    title: 'AI for Real Estate | AI Agentix',
    description: 'From first inquiry to final handover, AI Agentix automates the entire real estate sales cycle — so your agents focus on closing, not chasing leads.',
  },
  hero: {
    eyebrow: 'AI for Real Estate',
    heading: 'Close More Deals with AI-Powered Real Estate',
    subheading: 'From first inquiry to final handover, AI Agentix automates the entire real estate sales cycle — so your agents focus on closing, not chasing leads.',
    ctas: [
      { label: 'Book a Demo', to: '/contact', primary: true },
      { label: 'View Case Studies', to: '/case-studies', primary: false },
    ],
    tags: ['Lead Qualification', 'Property Matching', 'Site Visits', 'Document Processing', 'Post-Sale', 'Market Intelligence'],
  },
  stats: [
    { value: '73%', label: 'More Qualified Leads', sub: 'higher lead quality score' },
    { value: '41%', label: 'Sales Conversion Lift', sub: 'inquiry to booking rate' },
    { value: '45%', label: 'Fewer No-shows', sub: 'site visit no-show reduction' },
    { value: '85%', label: 'Faster Documentation', sub: 'reduction in doc processing time' },
  ],
  solutions: {
    eyebrow: 'Everything Your Real Estate Team Needs',
    heading: 'Six AI modules that automate your sales process',
    items: [
      { name: 'Lead Qualification Engine', image: '/images/lead-scoring.webp',
        desc: 'AI scores and qualifies every incoming lead based on budget, timeline, location preference, and engagement signals. Only high-intent prospects reach your agents, saving 60% of prospecting time.',
        points: ['Budget & timeline scoring', 'Location preference matching', 'Engagement signal analysis', '60% less prospecting time'] },
      { name: 'Property Matching AI', image: '/images/business-intelligence.webp',
        desc: 'Natural language property search lets buyers describe their dream home conversationally. AI matches requirements to inventory and delivers personalized shortlists instantly.',
        points: ['Natural language search', 'Requirement-to-inventory match', 'Personalized shortlists', 'Instant recommendations'] },
      { name: 'Site Visit Automation', image: '/images/business-intelligence.webp',
        desc: 'Automated scheduling, reminders, and follow-ups for property viewings. Reduce no-shows by 45% with intelligent nudges and WhatsApp confirmations.',
        points: ['Automated scheduling', 'Smart reminder nudges', 'WhatsApp confirmations', '45% fewer no-shows'] },
      { name: 'Document Processing', image: '/images/document-ocr.webp',
        desc: 'AI extracts, verifies, and organizes documents for KYC, loan applications, and legal agreements. Cut document processing time from days to minutes.',
        points: ['KYC document extraction', 'Loan application processing', 'Legal agreement organization', 'Days to minutes'] },
      { name: 'Post-Sale Relationship', image: '/images/business-intelligence.webp',
        desc: 'Automated handover workflows, maintenance request routing, and owner community management. Keep buyers engaged through possession and beyond.',
        points: ['Handover workflows', 'Maintenance request routing', 'Owner community management', 'Engagement beyond possession'] },
      { name: 'Market Intelligence', image: '/images/analytics-bi.webp',
        desc: 'Real-time market data, competitor pricing, and demand forecasting help developers and agents price accurately and time launches strategically.',
        points: ['Real-time market data', 'Competitor pricing', 'Demand forecasting', 'Strategic launch timing'] },
    ],
  },
  segments: {
    eyebrow: 'Built for Every Real Estate Segment',
    heading: 'Developers, brokers, commercial, and property managers',
    items: [
      { name: 'Developers', desc: 'Project launch automation, bulk lead management, and buyer communication at scale.' },
      { name: 'Residential Brokers', desc: 'AI assistant for agents — lead qualification, property matching, and follow-up automation.' },
      { name: 'Commercial RE', desc: 'Tenant acquisition, lease management automation, and investor communication workflows.' },
      { name: 'Property Managers', desc: 'Maintenance request routing, tenant portals, and rent collection automation.' },
    ],
  },
  process: {
    eyebrow: 'Automated Buyer Journey',
    heading: 'From inquiry to final handover — automated',
    steps: [
      { no: '01', title: 'Inquiry Captured', text: 'Lead arrives from portal, website, or social media — AI captures and responds within 30 seconds' },
      { no: '02', title: 'Smart Qualification', text: 'AI scores lead based on budget, timeline, and property preference through conversational questions' },
      { no: '03', title: 'Property Matching', text: 'Personalized shortlist generated and shared with virtual tour links and availability' },
      { no: '04', title: 'Visit Coordination', text: 'Automated scheduling, reminders, and agent briefing before each site visit' },
      { no: '05', title: 'Negotiation Support', text: 'AI surfaces comparable pricing data, buyer history, and deal terms for agents' },
      { no: '06', title: 'Closing & Documentation', text: 'Document collection, processing, and registration workflow automation to final handover' },
    ],
  },
  proof: {
    eyebrow: 'Real Estate Success Stories',
    heading: 'Developers and brokers that scaled with AI',
    items: [
      { tag: 'Prestige Developers', stat: '73% more qualified leads', text: 'AI lead scoring eliminated 60% of unqualified inquiries, letting agents focus on serious buyers for a 400-unit launch.', meta: '73% more qualified' },
      { tag: 'HomeFinder Agency', stat: '41% conversion increase', text: 'Automated follow-up sequences kept buyers engaged through a 90-day sales cycle, dramatically improving close rates.', meta: '+41% conversion' },
      { tag: 'Nexus Realty Group', stat: '₹12M saved in sales costs', text: 'AI reduced the sales team needed to handle 5x the lead volume, cutting cost per acquisition by 58%.', meta: '₹12M saved' },
    ],
  },
  faq: {
    heading: 'Real Estate AI — Questions Answered',
    items: [
      { q: 'How does the AI handle property inquiries at 2 AM?', a: 'The AI answers all inquiries 24/7 via website chat, WhatsApp, and email — qualifying leads, sharing property details, and scheduling visits automatically. No lead is ever missed.' },
      { q: 'Can it manage multiple project launches simultaneously?', a: 'Yes. AI Agentix can run parallel campaigns for multiple projects with separate workflows, pricing logic, and follow-up sequences — all managed from one dashboard.' },
      { q: 'Does it work for both residential and commercial real estate?', a: 'Absolutely. We serve residential developers, commercial brokers, property management companies, and individual agents with tailored workflows for each.' },
      { q: 'How does document AI help with RERA compliance?', a: 'AI extracts key terms from agreements, flags non-standard clauses, organizes compliance documents, and maintains audit trails — reducing legal review time significantly.' },
      { q: 'What CRM platforms do you integrate with?', a: 'We integrate with Salesforce, HubSpot, Zoho CRM, LeadSquared, and all major real estate CRMs. Custom integrations available for proprietary systems.' },
    ],
  },
  cta: {
    heading: 'Close More Deals, Faster',
    body: 'Join 500+ real estate developers and brokers using AI Agentix to automate their sales pipeline.',
    ctas: [
      { label: 'Get Started Today', to: '/contact', primary: true },
      { label: 'Talk to Sales', to: '/contact', primary: false },
    ],
  },
}
