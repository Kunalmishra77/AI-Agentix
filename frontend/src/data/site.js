// Global nav + footer content — verbatim from content-archive/global.md (SiteNav.jsx / SiteFooter.jsx).

export const brand = {
  name: 'AGENTiX',
  audit: { label: 'Get a Free AI Audit', to: '/contact' },
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Solutions', to: '/solutions', mega: 'solutions' },
  { label: 'Industries', to: '/industries', mega: 'industries' },
  { label: 'Technology', to: '/technology' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Contact', to: '/contact' },
]

export const solutionsMega = {
  title: 'AI Solutions',
  tagline: 'End-to-end automation for every business function',
  cta: { label: 'All Solutions', to: '/solutions' },
  stat: { value: '200+', label: 'automations deployed' },
  items: [
    { label: 'Sales Automation', to: '/solutions/sales-automation', desc: 'AI-powered lead scoring, follow-ups & CRM sync' },
    { label: 'Marketing Automation', to: '/solutions/marketing-automation', desc: 'Multi-channel campaigns on autopilot' },
    { label: 'HRMS & Hiring', to: '/solutions/hrms-hiring', desc: 'Screen, schedule & onboard candidates with AI' },
    { label: 'Operations', to: '/solutions/operations', desc: 'Eliminate bottlenecks across every workflow' },
    { label: 'Supply Chain', to: '/solutions/supply-chain', desc: 'Real-time tracking, alerts & procurement AI' },
    { label: 'Finance & Accounts', to: '/solutions/finance-accounts', desc: 'Auto-reconciliation, invoicing & GST filing' },
    { label: 'AI Voice & Chat', to: '/solutions/ai-voice-chat', desc: '24/7 voice agents & WhatsApp bots' },
    { label: 'Manufacturing', to: '/solutions/manufacturing', desc: 'Predictive maintenance & quality inspection' },
    { label: 'Hospital Management', to: '/solutions/hospital-management', desc: 'End-to-end HMS automation for modern hospitals' },
    { label: 'AI Studio', to: '/ai-studio', desc: 'AI content, videos, social & email on autopilot' },
  ],
}

export const industriesMega = {
  title: 'Industries We Serve',
  tagline: 'Deep domain expertise across 15+ sectors',
  cta: { label: 'All Industries', to: '/industries' },
  stat: { value: '15+', label: 'industries covered' },
  items: [
    { label: 'Healthcare', to: '/industries/healthcare', desc: 'Appointment bots, patient follow-up & billing AI' },
    { label: 'Education', to: '/industries/education', desc: 'Admissions automation & student engagement' },
    { label: 'Hospitality', to: '/industries/hospitality', desc: 'Booking management & guest experience AI' },
    { label: 'Real Estate', to: '/industries/real-estate', desc: 'Lead nurturing & property recommendation AI' },
    { label: 'Retail & E-commerce', to: '/industries/retail-ecommerce', desc: 'Personalisation, returns & inventory automation' },
    { label: 'Manufacturing', to: '/industries/manufacturing', desc: 'Shop-floor AI, defect detection & OEE tracking' },
    { label: 'Logistics', to: '/industries/logistics', desc: 'Route optimisation & delivery status automation' },
  ],
}

export const footer = {
  partnersCaption: 'Powered by the world’s most powerful AI platforms',
  partners: ['OpenAI', 'Google Cloud', 'AWS', 'Meta AI', 'Twilio', 'Razorpay', 'n8n', 'Make', 'Anthropic', 'WhatsApp', 'HubSpot', 'LangChain'],
  brandBlurb: "India's #1 end-to-end AI automation partner. Powering intelligent businesses across 15+ industries.",
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ai-agentix/about/' },
    { label: 'Instagram', href: 'https://www.instagram.com/ai_agentix' },
    { label: 'Facebook', href: 'https://www.facebook.com/aiagentix' },
    { label: 'Twitter', href: 'https://x.com/ai_agentix' },
    { label: 'WhatsApp', href: 'https://wa.me/919217064245' },
  ],
  cols: [
    { title: 'Solutions', links: [
      { label: 'Sales Automation', to: '/solutions' }, { label: 'Marketing Automation', to: '/solutions' },
      { label: 'HRMS & Hiring', to: '/solutions' }, { label: 'Operations', to: '/solutions' },
      { label: 'Supply Chain', to: '/solutions' }, { label: 'Finance & Accounts', to: '/solutions' },
      { label: 'Voice & Chat Agents', to: '/solutions' }, { label: 'Manufacturing', to: '/solutions' },
    ]},
    { title: 'Industries', links: [
      { label: 'Healthcare', to: '/industries' }, { label: 'Education', to: '/industries' },
      { label: 'Hospitality', to: '/industries' }, { label: 'Real Estate', to: '/industries' },
      { label: 'Retail & E-commerce', to: '/industries' }, { label: 'Manufacturing', to: '/industries' },
      { label: 'Logistics', to: '/industries' },
    ]},
    { title: 'Company', links: [
      { label: 'About Us', to: '/about' }, { label: 'Technology', to: '/technology' },
      { label: 'AI Studio', to: '/ai-studio' }, { label: 'Case Studies', to: '/case-studies' },
      { label: 'Contact', to: '/contact' }, { label: 'Careers', to: '/contact#careers' },
      { label: 'Partner With Us', to: '/contact#partnerships' },
    ]},
  ],
  newsletter: {
    title: 'Stay Updated',
    blurb: 'Weekly insights on AI automation for Indian businesses.',
    placeholder: 'Your email', submit: 'Subscribe', submitting: 'Subscribing…', success: "You're subscribed!",
  },
  contact: { title: 'Contact', email: 'myai@ai-agentix.com', phone: '+91 92170 64245', address: 'New Delhi, India' },
  copyright: 'AGENTiX. All rights reserved. Powering India’s Automation Revolution.',
  entity: 'A product of SANTURE AI PRIVATE LIMITED',
  legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Refund Policy', to: '/refund' },
  ],
}
