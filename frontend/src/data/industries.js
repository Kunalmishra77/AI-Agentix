// Industries index page content.

export const meta = {
  title: 'AI by Industry | AI Agentix',
  description: 'Purpose-built AI automation for healthcare, education, hospitality, real estate, retail, manufacturing, and logistics — tuned to each industry’s workflows.',
}

export const hero = {
  eyebrow: 'Industries',
  heading: 'AI automation, tuned to your industry',
  sub: 'We don’t retrofit a generic bot. Each industry gets workflows, integrations, and compliance built for how it actually operates.',
  stat: { value: '15+', label: 'industries served' },
}

export const items = [
  { slug: 'healthcare', name: 'Healthcare', icon: 'health', desc: 'Appointment bots, patient follow-up & billing AI' },
  { slug: 'education', name: 'Education', icon: 'education', desc: 'Admissions automation & student engagement' },
  { slug: 'hospitality', name: 'Hospitality', icon: 'hospitality', desc: 'Booking management & guest experience AI' },
  { slug: 'real-estate', name: 'Real Estate', icon: 'realestate', desc: 'Lead nurturing & property recommendation AI' },
  { slug: 'retail-ecommerce', name: 'Retail & E-commerce', icon: 'retail', desc: 'Personalisation, returns & inventory automation' },
  { slug: 'manufacturing', name: 'Manufacturing', icon: 'factory', desc: 'Shop-floor AI, defect detection & OEE tracking' },
  { slug: 'logistics', name: 'Logistics', icon: 'truck', desc: 'Route optimisation & delivery status automation' },
]

export const cta = {
  heading: 'Don’t see your industry?',
  body: 'If your business runs on repeatable workflows, we can automate them. Book a free audit and we’ll map your biggest wins.',
  ctas: [
    { label: 'Book a Free Audit', to: '/contact', primary: true },
    { label: 'Explore Solutions', to: '/solutions', primary: false },
  ],
}
