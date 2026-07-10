// Contact page content — verbatim from content-archive/pages/contact.md

export const meta = {
  title: 'Contact — AI Agentix',
  description: 'Book a free AI audit, demo, or strategy call. Talk to our team about automating your business.',
}

export const hero = {
  eyebrow: 'Free 30-Min Strategy Call',
  heading: "Let's Talk About Your Biggest Workflow Problem",
  body: "No pitch decks. No pressure. Just an honest conversation about what you're dealing with — and whether we can automate it.",
  trust: [
    { value: 'SOC 2', label: 'Compliant' },
    { value: '4-hour', label: 'Response SLA' },
    { value: '97%', label: 'Satisfaction' },
    { value: '200+', label: 'Clients' },
  ],
}

export const types = [
  { key: 'audit', icon: 'audit', label: 'Free AI Audit', desc: 'Get a free analysis of your top 3 automation opportunities' },
  { key: 'demo', icon: 'demo', label: 'Book a Demo', desc: 'See a live demo of our AI agents in action' },
  { key: 'partner', icon: 'partner', label: 'Partnership', desc: 'Agencies, consultants, and tech partners' },
]

export const forms = {
  audit: {
    note: "We'll analyse your top 3 automation opportunities and send you a custom AI Audit Report — free, no pitch, no pressure.",
    submit: 'Request My Free Audit',
    loading: 'Sending...',
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Rajesh Kumar', required: true, half: true },
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+91 92170 64245', required: true, half: true },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'rajesh@company.com', required: true, half: true },
      { key: 'company', label: 'Company Name', type: 'text', placeholder: 'Acme Solutions Pvt Ltd', half: true },
      { key: 'industry', label: 'Industry', type: 'select', placeholder: 'Select industry', half: true,
        options: ['Real Estate', 'Healthcare', 'Education', 'Retail & E-commerce', 'Logistics', 'Hospitality', 'Manufacturing', 'Other'] },
      { key: 'teamSize', label: 'Team Size', type: 'select', placeholder: 'Select team size', half: true,
        options: ['1–10 people', '11–50 people', '51–200 people', '200+ people'] },
      { key: 'automate', label: 'Which areas do you want to automate?', hint: 'Select all that apply', type: 'chips',
        options: ['Lead Follow-up', 'Appointment Booking', 'Customer Support Bot', 'Invoice Processing', 'HR Onboarding', 'WhatsApp Campaigns'] },
    ],
  },
  demo: {
    note: "Pick a date and we'll set up a live 45-minute demo tailored to your industry — you'll see real agents running real workflows.",
    submit: 'Book My Demo Slot',
    loading: 'Booking...',
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Rajesh Kumar', required: true, half: true },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'rajesh@company.com', required: true, half: true },
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+91 92170 64245', half: true },
      { key: 'company', label: 'Company Name', type: 'text', placeholder: 'Acme Solutions Pvt Ltd', half: true },
      { key: 'date', label: 'Preferred Date', type: 'date', required: true, half: true },
      { key: 'timeSlot', label: 'Preferred Time Slot', type: 'select', placeholder: 'Select time', required: true, half: true,
        options: ['Morning (10 AM – 12 PM)', 'Afternoon (12 PM – 3 PM)', 'Evening (3 PM – 6 PM)'] },
      { key: 'focus', label: 'Demo Focus', type: 'select', placeholder: 'What should we show?', half: true,
        options: ['Sales & Lead Automation', 'HR & Hiring Workflows', 'Customer Support Bot', 'Finance & Invoicing', 'Full Platform Overview', 'Industry-Specific Workflows'] },
      { key: 'attendees', label: 'Number of Attendees', type: 'select', placeholder: 'How many joining?', half: true,
        options: ['Just me', '2–3 people', '4–6 people', '7+ people'] },
    ],
  },
  partner: {
    note: 'Join our partner network — offer AI automation to your clients under your brand, earn recurring commissions, and get dedicated partner support.',
    submit: 'Apply for Partnership',
    loading: 'Applying...',
    fields: [
      { key: 'name', label: 'Your Name', type: 'text', placeholder: 'Rajesh Kumar', required: true, half: true },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'rajesh@agency.com', required: true, half: true },
      { key: 'agency', label: 'Company / Agency Name', type: 'text', placeholder: 'Growth Digital Agency', required: true, half: true },
      { key: 'website', label: 'Website URL', type: 'url', placeholder: 'https://youragency.in', half: true },
      { key: 'partnershipType', label: 'Partnership Type', type: 'chips',
        options: ['Digital Agency', 'Business Consultant', 'Tech / SaaS Partner', 'White-label Reseller'] },
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+91 92170 64245', half: true },
      { key: 'clientBase', label: 'Current Client Base', type: 'select', placeholder: 'How many clients?', half: true,
        options: ['1–5 clients', '6–20 clients', '21–50 clients', '50+ clients'] },
      { key: 'lookingFor', label: 'What are you looking for in this partnership?', type: 'textarea',
        placeholder: 'E.g. We want to offer AI automation to our SME clients but lack the tech capability. Looking for white-label solutions with revenue sharing...' },
    ],
  },
}

export const success = {
  heading: "We've Got It!",
  body: 'Our team will reach out within 4 business hours. WhatsApp us for a faster response.',
}

export const details = {
  phone: '+91 92170 64245',
  email: 'myai@ai-agentix.com',
  office: 'New Delhi, India',
  whatsapp: 'https://wa.me/919217064245',
}

export const nextSteps = [
  'We review your message within 4 business hours',
  'A senior consultant calls to understand your workflow',
  'You get a custom automation proposal in 48 hours',
  'Free — no commitment required',
]

export const faq = {
  heading: 'Questions We Get Every Day',
  items: [
    { q: 'How long does implementation take?', a: 'Most clients are live within 6–10 weeks from signing. A single AI voice agent is 2–3 weeks; a full multi-system integration is 8–10 weeks. We give you a precise timeline after the discovery audit — no surprises.' },
    { q: 'Do we need to change our existing tools?', a: 'No. We integrate with your existing stack. AI Agentix connects with 200+ tools including Zoho, HubSpot, Salesforce, Tally, Google Workspace, and WhatsApp Business. We work around your systems.' },
    { q: 'What if the automation breaks or has errors?', a: 'Every automation has fallback logic that routes to a human when needed. You get real-time monitoring dashboards, instant alerts, and our support team responds within 4 business hours. Most issues are caught proactively.' },
    { q: 'Do we need technical staff to manage this?', a: 'No. Dashboards are built for business owners and managers, not developers. We train your team in 2 hours. Most clients manage their automations with no coding knowledge at all.' },
    { q: 'How is pricing structured?', a: 'Starter (₹25,000/mo), Growth (₹49,000/mo), and Enterprise (₹89,000/mo+). Each includes automation workflows plus ongoing support. Custom pricing for large-scale deployments. No setup fees in most cases.' },
    { q: 'Is our data safe?', a: 'Yes. SOC 2 compliant, ISO 27001 aligned. Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). Hosted on AWS Mumbai — data never leaves India without written consent. We sign NDAs for sensitive industries.' },
    { q: 'Can we start with one automation and scale later?', a: 'Absolutely. We recommend starting with your highest-impact workflow — usually lead follow-up or appointment management. Once you see ROI, expanding is fast because the infrastructure is already in place.' },
  ],
}

export const finalCta = {
  heading: 'Still Have Questions?',
  body: 'WhatsApp us directly. Our team responds within 30 minutes during business hours.',
  whatsapp: 'https://wa.me/919217064245',
}
