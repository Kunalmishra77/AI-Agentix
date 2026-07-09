// Hospitality industry page — content verbatim from
// content-archive/pages/industries/hospitality.md

export default {
  slug: 'hospitality',
  meta: {
    title: 'AI for Hospitality | AI Agentix',
    description: 'Automate reservations, personalize guest experiences, and optimize revenue — so your team can focus on delivering exceptional service.',
  },
  heroImage: '/AGENTIX-MEDIAS/customerconverted.webp',
  hero: {
    eyebrow: 'AI for Hospitality',
    heading: 'Delight Every Guest with AI-Powered Hospitality',
    subheading: 'Automate reservations, personalize guest experiences, and optimize revenue — so your team can focus on delivering exceptional service.',
    ctas: [
      { label: 'Book a Demo', to: '/contact', primary: true },
      { label: 'View Results', to: '/case-studies', primary: false },
    ],
    tags: ['Reservations', 'Guest Personalization', 'Concierge AI', 'Housekeeping', 'Revenue Management', 'Reputation'],
  },
  stats: [
    { value: '96%', label: 'Guest Satisfaction', sub: 'average CSAT score' },
    { value: '32%', label: 'RevPAR Improvement', sub: 'year-over-year increase' },
    { value: '70%', label: 'Call Volume Reduction', sub: 'via AI automation' },
    { value: '88%', label: 'Average Occupancy', sub: 'peak season rate' },
  ],
  solutions: {
    eyebrow: 'Complete Hospitality AI Suite',
    heading: 'Six modules across every part of hotel operations',
    items: [
      { name: 'Reservation Automation', image: '/AGENTIX-MEDIAS/calling.webp',
        desc: 'AI handles booking inquiries, modifications, and cancellations 24/7 via web, WhatsApp, and phone. Reduces front-desk call volume by 70% while improving response time to seconds.',
        points: ['24/7 booking inquiries', 'Modifications & cancellations', 'Web, WhatsApp & phone', 'Seconds-fast responses'] },
      { name: 'Guest Experience Personalization', image: '/AGENTIX-MEDIAS/Customer RESEARCH agent.webp',
        desc: 'Analyze guest history, preferences, and feedback to create personalized room setups, dining recommendations, and activity suggestions automatically on each visit.',
        points: ['Guest history analysis', 'Personalized room setups', 'Dining recommendations', 'Activity suggestions'] },
      { name: 'Concierge AI Assistant', image: '/AGENTIX-MEDIAS/Customer Support.webp',
        desc: 'Virtual concierge answers questions about amenities, local attractions, dining, and transportation. Available in 40+ languages for international guests.',
        points: ['Amenities & attractions', 'Dining & transportation', '40+ languages', 'Instant guest answers'] },
      { name: 'Housekeeping Optimization', image: '/AGENTIX-MEDIAS/CRM.webp',
        desc: 'AI-driven scheduling optimizes room turnover, predicts demand patterns, and routes housekeeping staff efficiently — reducing labor costs by 22%.',
        points: ['Room turnover scheduling', 'Demand prediction', 'Efficient staff routing', '22% lower labor cost'] },
      { name: 'Revenue Management', image: '/AGENTIX-MEDIAS/data analyst.webp',
        desc: 'Dynamic pricing engine adjusts room rates in real-time based on demand, competitor pricing, events, and seasonality to maximize RevPAR automatically.',
        points: ['Real-time dynamic pricing', 'Competitor rate tracking', 'Event & seasonality signals', 'RevPAR maximization'] },
      { name: 'Review & Reputation Management', image: '/AGENTIX-MEDIAS/MAILING.webp',
        desc: 'Monitor and respond to reviews across TripAdvisor, Google, and Booking.com with AI-crafted personalized responses. Alert management to negative trends instantly.',
        points: ['Multi-platform monitoring', 'AI-crafted responses', 'Negative-trend alerts', 'Reputation dashboards'] },
    ],
  },
  segments: {
    eyebrow: 'Designed for Every Property Type',
    heading: 'From luxury hotels to boutique properties',
    items: [
      { name: 'Luxury Hotels', desc: 'White-glove AI that matches the premium experience guests expect.' },
      { name: 'Beach Resorts', desc: 'Activity booking, spa scheduling, and F&B automation for resort guests.' },
      { name: 'Business Hotels', desc: 'Corporate booking tools, conference room automation, and billing workflows.' },
      { name: 'Boutique Properties', desc: 'Personalized automation that preserves the intimate boutique feel.' },
      { name: 'Hotel Chains', desc: 'Centralized AI management across all properties with local customization.' },
    ],
  },
  process: {
    eyebrow: 'Guest Journey Automation',
    heading: 'AI touches every stage of the guest lifecycle',
    steps: [
      { no: '01', title: 'Discovery', text: 'AI responds to inquiries across website, OTAs, and social 24/7' },
      { no: '02', title: 'Booking', text: 'Seamless reservation automation with instant confirmation' },
      { no: '03', title: 'Pre-Arrival', text: 'Personalized welcome messages, upsells, and preference capture' },
      { no: '04', title: 'In-Stay', text: 'Concierge AI handles requests, recommendations, and issues' },
      { no: '05', title: 'Checkout', text: 'Smooth check-out, invoice delivery, and feedback collection' },
      { no: '06', title: 'Post-Stay', text: 'Review requests, loyalty offers, and re-booking automation' },
    ],
  },
  proof: {
    eyebrow: 'Hotel Success Stories',
    heading: 'Hotels that transformed with AI Agentix',
    items: [
      { tag: 'Grand Palace Resort', stat: '32% RevPAR increase', text: 'Dynamic pricing AI optimized 640 room rates in real-time, capturing peak demand events automatically.', meta: '+32% RevPAR' },
      { tag: 'Coastline Boutique Hotel', stat: '96% guest satisfaction', text: 'AI concierge resolved 89% of guest requests without human intervention while maintaining personal touch.', meta: '96% satisfaction' },
      { tag: 'CitiStay Hotel Chain', stat: '₹2.4M saved annually', text: 'Automated housekeeping scheduling and reservation management across 12 properties reduced labor costs by 22%.', meta: '₹2.4M/year saved' },
    ],
  },
  faq: {
    heading: 'Hospitality AI — Questions Answered',
    items: [
      { q: 'Does the AI work with our existing PMS (Property Management System)?', a: 'Yes. We integrate with Opera, Cloudbeds, Mews, RMS, and 30+ other PMS platforms via API. No replacement needed.' },
      { q: 'Can the concierge AI handle special requests and complaints?', a: 'Yes. The AI handles routine requests autonomously and escalates complex issues to human staff with full context, guest history, and suggested resolutions.' },
      { q: 'How does revenue management AI compare to manual pricing?', a: 'Hotels using our dynamic pricing see 18-35% RevPAR improvement vs. manual rate setting, based on competitor analysis and demand forecasting across 200+ signals.' },
      { q: 'Is guest data handled securely and GDPR-compliant?', a: 'Absolutely. All guest data is encrypted, access-controlled, and compliant with GDPR, CCPA, and PCI-DSS. Guests can request data deletion at any time.' },
      { q: 'What languages does the guest-facing AI support?', a: 'The guest AI supports 40+ languages including Arabic, Mandarin, Hindi, French, German, Spanish, Japanese, and all major European languages.' },
    ],
  },
  cta: {
    heading: 'Elevate Your Guest Experience',
    body: 'Join 300+ hotels and resorts already using AI Agentix to deliver exceptional hospitality at scale.',
    ctas: [
      { label: 'Start Free Trial', to: '/contact', primary: true },
      { label: 'Talk to Sales', to: '/contact', primary: false },
    ],
  },
}
