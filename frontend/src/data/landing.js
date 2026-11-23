// Google Ads landing page (/book-a-demo). Copy uses only claims already on the site:
// case-study numbers are quoted with the client type they came from (data/caseStudies.js),
// timelines and trust points match the approved home/contact copy (see completion report §7).
// The demo chats are labelled as samples on the page.

// Keep CALL_SLOTS and NEEDS in sync with server/src/leads.mjs OPTIONS.callSlot / OPTIONS.need.
export const CALL_SLOTS = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM',
  '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM']
export const NEEDS = ['Lead follow-up & WhatsApp', 'AI voice calling', 'Customer support', 'Finance & invoicing', 'HR & operations', 'Not sure yet']

export const LP_PATH = '/book-a-demo'
export const LP_THANKS = '/book-a-demo/thank-you'

export const meta = {
  title: 'Book a Free AI Automation Call — AI Agentix',
  description:
    'AI agents that answer every enquiry on WhatsApp, call new leads in Hindi & English and automate follow-ups, invoices and reports. Book a free 30-minute call.',
}

export const hero = {
  eyebrow: 'AI automation for Indian businesses',
  line1: 'Every enquiry,',
  rotating: ['answered.', 'called.', 'followed up.', 'booked.'],
  body:
    'AI Agentix builds AI agents that reply on WhatsApp in seconds, call new leads in Hindi & English, and take over the follow-ups, invoices and reports your team still does by hand — custom-built around how your business works.',
  ticks: ['Free 30-minute call', 'A plan built for your business', 'No obligation'],
  stats: [
    { v: '200+', k: 'businesses automated' },
    { v: '~2 weeks', k: 'to your first automation' },
    { v: '24/7', k: 'AI agents, Hindi & English' },
  ],
}

export const tools = ['WhatsApp Business API', 'Google Sheets', 'Gmail', 'Google Calendar', 'Meta Lead Ads', 'IndiaMART', 'Zoho',
  'HubSpot', 'Tally', 'Razorpay', 'Shopify', 'Slack']

export const problem = {
  a: 'Your team isn’t slow.',
  b: 'The manual work is.',
  body: 'Every hour spent copying data, chasing follow-ups and answering the same five questions is an hour not spent closing. We hand that work to AI agents — and your team gets it back.',
}

// One block per capability; `mock` picks the illustration component.
export const features = [
  {
    id: 'whatsapp', mock: 'chat', tag: 'WhatsApp AI agent',
    title: 'Every enquiry answered. Even at midnight.',
    body: 'Your AI agent replies on WhatsApp, your website and Instagram in seconds — from your own price lists, brochures and FAQs — and saves every person as a qualified lead.',
    bullets: ['Answers from your documents', 'Captures need, budget & timeline', 'Books appointments in the chat', 'Hands over to your team any time'],
    result: { k: 'CA & CMA coaching institute', v: 'Replies in under 90 seconds; enrolment conversion 18% → 55%.' },
  },
  {
    id: 'voice', mock: 'call', tag: 'AI voice calling',
    title: 'Every new lead gets a call. Automatically.',
    body: 'AI voice agents call new leads within minutes, in Hindi, English and regional languages — asking your qualifying questions and booking the visit or meeting.',
    bullets: ['Scripts you approve', 'Transcript & summary on every call', 'Meetings straight into your calendar', 'Inbound calls answered 24/7'],
    result: { k: 'Residential developer, Mumbai', v: 'Lead-to-site-visit time cut from 5 days to 4 hours.' },
  },
  {
    id: 'pipeline', mock: 'pipeline', tag: 'Follow-ups & CRM',
    title: 'Follow-ups that happen on their own.',
    body: 'Leads from ads, portals and WhatsApp land in one pipeline. Automations assign them, send reminders and nudge silent prospects — nothing depends on memory.',
    bullets: ['Every lead source in one place', 'Round-robin assignment', 'WhatsApp & email reminders', 'Drip sequences by stage'],
    result: { k: 'Multi-specialty clinic chain, Delhi', v: 'No-shows down from 35% to 12% with automated reminders.' },
  },
  {
    id: 'backoffice', mock: 'ops', tag: 'Back-office automation',
    title: 'Invoices, GST and reports — on autopilot.',
    body: 'We connect Tally, Zoho, Razorpay and your sheets so invoices go out, payments get chased and the morning report is ready before you open your laptop.',
    bullets: ['Invoice generation & dispatch', 'Payment reminders on WhatsApp', 'Bank reconciliation', 'Daily MIS on one screen'],
    result: { k: 'Last-mile delivery company, Delhi NCR', v: 'A 4-hour morning ops routine now runs automatically by 7 AM.' },
  },
]

// Interactive demo: one scripted chat per industry (illustration, not a customer conversation).
export const demos = [
  {
    id: 'realestate', label: 'Real estate', emoji: '🏠', business: 'Skyline Homes', lead: 'Rohit Verma', source: 'Google Ads · Click-to-WhatsApp',
    chat: [
      ['in', 'Hi, is the 3BHK in Sector 150 still available?'],
      ['out', 'Hi Rohit! Yes 🙂 3BHK homes start at ₹1.45 Cr, possession Dec 2027. Is this for your family or an investment?'],
      ['in', 'Family. Budget around 1.5'],
      ['out', 'That fits well. Would you like a site visit — Saturday 11 AM or Sunday 4 PM?'],
      ['in', 'Saturday 11 works'],
      ['out', 'Booked ✅ Saturday, 11:00 AM. Location pin 📍 below. Our sales manager will meet you at the gate.'],
    ],
    fields: [['Interest', '3BHK · Sector 150'], ['Purpose', 'Family home'], ['Budget', '₹1.5 Cr'], ['Next step', 'Site visit · Sat 11 AM']],
    summary: 'Family buyer, budget fits, site visit booked. Hot lead → assigned to sales.',
  },
  {
    id: 'clinic', label: 'Clinic', emoji: '🩺', business: 'CarePlus Clinic', lead: 'Sunita Sharma', source: 'Google Search · Website chat',
    chat: [
      ['in', 'Namaste, kal dermatologist available hain kya?'],
      ['out', 'Namaste Sunita ji! Dr. Mehra kal 11 AM se 2 PM available hain. Consultation fee ₹600 hai. Kaunsa time theek rahega?'],
      ['in', '12 baje ka slot mil jayega?'],
      ['out', 'Ho gaya ✅ Kal 12:00 PM, Dr. Mehra. Main aapko 2 ghante pehle reminder bhej dungi.'],
    ],
    fields: [['Need', 'Dermatology consult'], ['Language', 'Hindi'], ['Fee', '₹600'], ['Next step', 'Appointment · Tomorrow 12 PM']],
    summary: 'New patient booked; reminder scheduled 2 hours before.',
  },
  {
    id: 'coaching', label: 'Coaching', emoji: '🎓', business: 'BrightPath Academy', lead: 'Sneha Reddy', source: 'Meta Lead Ads',
    chat: [
      ['in', 'What are the fees for the CA Foundation weekend batch?'],
      ['out', 'Hi Sneha! The weekend batch is ₹48,000 for the year, with EMI options. Would you like a free counselling call?'],
      ['in', 'Yes, tomorrow evening'],
      ['out', 'Done ✅ Tomorrow at 6:00 PM. Our counsellor will call you then — I’ve also sent the batch brochure.'],
    ],
    fields: [['Course', 'CA Foundation · Weekend'], ['Fee shared', '₹48,000 · EMI'], ['Source', 'Meta Lead Ads'], ['Next step', 'Counselling · Tomorrow 6 PM']],
    summary: 'Interested student, counselling booked, brochure sent.',
  },
  {
    id: 'd2c', label: 'D2C / Retail', emoji: '🛍️', business: 'UrbanThread', lead: 'Aman Gupta', source: 'Instagram DM',
    chat: [
      ['in', 'Where is my order? It was supposed to come yesterday'],
      ['out', 'Hi Aman, sorry for the wait! Order #48213 is out for delivery today and should reach you by 6 PM. Tracking link 👇'],
      ['in', 'Ok. Can I exchange it for size L?'],
      ['out', 'Of course ✅ Exchange request raised for size L. The pickup will happen at delivery — no extra charge.'],
    ],
    fields: [['Query', 'Order status + exchange'], ['Order', '#48213'], ['Resolution', 'Auto-resolved'], ['Human needed', 'No']],
    summary: 'Resolved without an agent in under a minute.',
  },
]

export const results = [
  { v: '18% → 55%', k: 'Enrolment conversion', who: 'CA & CMA coaching institute, Hyderabad', tone: 'orange' },
  { v: '5 days → 4 hrs', k: 'Lead to site visit', who: 'Residential developer, Mumbai', tone: 'ink' },
  { v: '35% → 12%', k: 'Patient no-shows', who: 'Multi-specialty clinic chain, New Delhi', tone: 'ink' },
  { v: '82%', k: 'Support tickets auto-resolved', who: 'D2C fashion brand, Bengaluru', tone: 'orange' },
]

export const quote = {
  text: 'The AI qualifies leads better than some of our senior salespeople. It asks the right questions and never gets tired.',
  name: 'Vikram Shah', role: 'VP Sales, Residential Developer (Mumbai)',
}

export const industries = ['Real estate', 'Healthcare & clinics', 'Education & coaching', 'Retail & D2C', 'Manufacturing', 'Logistics', 'Hospitality', 'Professional services']

export const steps = [
  { t: 'Book a free call', d: 'Pick a time. We learn how your team handles leads and operations today.', time: '30 min' },
  { t: 'Get your automation plan', d: 'We map the workflows worth automating first and estimate the time and cost saved.', time: '3–5 days' },
  { t: 'We build & connect', d: 'Your AI agents are built on your data and connected to WhatsApp, your CRM and tools.', time: '~2 weeks to first automation' },
  { t: 'Go live & improve', d: 'We monitor every agent after launch and keep tuning until the numbers move.', time: 'Ongoing' },
]

export const trust = [
  { t: 'Built for the DPDP Act', d: 'Consent, access control and audit logs designed in from day one.' },
  { t: 'NDA & DPA on request', d: 'Your customer data stays yours. India hosting available.' },
  { t: 'No lock-in', d: 'Month-to-month after launch, with milestones tied to your KPIs.' },
  { t: 'Hindi, English & more', d: 'Agents that talk to your customers the way they talk.' },
  { t: 'Custom, not off-the-shelf', d: 'Built around your process — not the other way round.' },
  { t: 'Support after go-live', d: 'We stay with you after launch, not just until the invoice.' },
]

export const faqs = [
  { q: 'Is the call really free?', a: 'Yes. The 30-minute call is free and there is no obligation. You leave with a clear view of what can be automated in your business.' },
  { q: 'What happens on the call?', a: 'We ask how your team handles leads, customers and back-office work today, show you relevant automations working, and answer your questions on cost and timelines.' },
  { q: 'How much does it cost?', a: 'It depends on what we automate. After the call you get a fixed, milestone-based quote — no hidden fees, no per-seat charges and no long lock-in.' },
  { q: 'How long until it’s live?', a: 'Your first automation is usually live in about two weeks. A full rollout typically takes 4–10 weeks, depending on scope.' },
  { q: 'Do we need a tech team?', a: 'No. We build, connect and maintain everything. Your team only reviews the scripts and approves what goes live.' },
  { q: 'Can we use our existing WhatsApp number?', a: 'In most cases, yes — through the official WhatsApp Business API. We check your setup on the call.' },
  { q: 'Is our customer data safe?', a: 'Data is encrypted in transit and at rest, access is limited to your project team, and we sign an NDA and a data processing agreement on request. Hosting in India is available.' },
  { q: 'What if I need to change my call time?', a: 'Just message us on WhatsApp and we will move it to a time that suits you.' },
]

export const finalCta = {
  heading: 'Let AI handle the busywork. You handle the growth.',
  body: 'Book a free 30-minute call and see exactly what we would automate first in your business.',
}
