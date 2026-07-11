// Healthcare industry page — content verbatim from
// content-archive/pages/industries/healthcare.md

export default {
  slug: 'healthcare',
  heroImage: '/images/hero-ind-healthcare.webp',
  meta: {
    title: 'AI for Healthcare | AI Agentix',
    description: 'AI-powered appointment management, patient communication, clinical documentation, and revenue cycle automation — built for hospitals, clinics, and healthcare networks.',
  },
  hero: {
    eyebrow: 'Healthcare AI',
    heading: 'Better Patient Care. Less Administrative Work.',
    subheading: 'AI-powered appointment management, patient communication, clinical documentation, and revenue cycle automation — built specifically for hospitals, clinics, and healthcare networks.',
    ctas: [
      { label: 'Get Healthcare AI Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
    tags: ['Appointments', 'Patient Communication', 'Clinical Documentation', 'Billing & Claims', 'Pharmacy', 'Staff Scheduling'],
  },
  stats: [
    { value: '60%', label: 'Reduction in No-Shows', sub: 'with AI reminders' },
    { value: '35%', label: 'Less Admin Work', sub: 'per doctor per day' },
    { value: '20%', label: 'Revenue Increase', sub: 'from better billing' },
    { value: '40%', label: 'Patient Satisfaction Improvement', sub: 'post-implementation' },
  ],
  challenges: {
    eyebrow: 'Industry Challenges',
    heading: 'The problems every healthcare provider faces',
    items: [
      { title: 'Appointment No-Shows', desc: 'Average no-show rate of 20-30% costs hospitals crores in lost revenue and idle staff time annually.' },
      { title: 'Administrative Overload', desc: 'Doctors spend 35-40% of their time on documentation instead of patient care — burning out staff and reducing capacity.' },
      { title: 'Patient Engagement Gaps', desc: 'Poor follow-up, missed medication reminders, and delayed test results lead to poor outcomes and patient dissatisfaction.' },
      { title: 'Revenue Leakage', desc: 'Missed billing codes, delayed insurance claims, and uncollected payments drain 15-20% of potential revenue.' },
    ],
  },
  solutions: {
    eyebrow: 'AI Solutions for Healthcare',
    heading: 'Built for every layer of your healthcare operation',
    items: [
      { name: 'AI Appointment Management',
        desc: 'Automated booking, reminders, and rescheduling via WhatsApp, SMS, and voice. Reduce no-shows by 60% with intelligent reminder sequences.',
        points: ['Multi-channel appointment reminders', 'Smart rescheduling on cancellation', 'Waitlist management automation', 'Doctor availability optimization'] },
      { name: 'Patient Communication AI',
        desc: 'Post-visit follow-ups, medication reminders, test result notifications, and health tips — all automated and personalized to each patient.',
        points: ['Post-discharge follow-up sequences', 'Medication adherence reminders', 'Lab result notifications', 'Preventive care reminders'] },
      { name: 'Medical Documentation AI',
        desc: 'Voice-to-EMR transcription, clinical note generation, and discharge summary automation. Doctors speak, AI writes.',
        points: ['Voice transcription to EMR', 'Clinical note generation', 'Discharge summary automation', 'ICD code suggestion'] },
      { name: 'Revenue Cycle Automation',
        desc: 'Insurance pre-authorization, claims submission, follow-up, and denial management — all automated. Faster reimbursements, fewer write-offs.',
        points: ['Pre-authorization automation', 'Claims batch submission', 'Denial management workflow', 'Patient payment collection'] },
      { name: 'Inventory & Pharmacy AI',
        desc: 'Automated drug inventory management, expiry tracking, reorder automation, and pharmacy dispensing workflows.',
        points: ['Drug inventory optimization', 'Expiry date tracking', 'Automated reorder triggers', 'Dispensing workflow automation'] },
      { name: 'Staff & Scheduling',
        desc: 'AI-optimized staff scheduling based on patient load, speciality demand, and leave calendar. No more overstaffing or understaffing shifts.',
        points: ['Demand-based staff scheduling', 'Leave management integration', 'Shift handover automation', 'Overtime prevention rules'] },
    ],
  },
  compliance: {
    eyebrow: 'Compliance',
    heading: 'Designed for Indian healthcare compliance',
    items: [
      { icon: 'approval', title: 'NABH Alignment', desc: 'Workflows aligned with NABH accreditation requirements' },
      { icon: 'invoice', title: 'Insurance Integration', desc: 'CGHS, Ayushman Bharat, and TPA claim support' },
      { icon: 'enrich', title: 'EMR Compatible', desc: 'Integrates with all major Indian HMS platforms' },
      { icon: 'language', title: 'Multi-Language', desc: 'Patient communication in 10+ Indian languages' },
    ],
  },
  proof: {
    eyebrow: 'Outcomes',
    heading: 'Healthcare outcomes that speak for themselves',
    items: [
      { tag: 'Multispeciality Hospital — 200 beds', stat: '60% fewer no-shows in 60 days', text: 'WhatsApp reminder sequences reduced no-show rate from 28% to 11%, recovering ₹18L monthly in lost appointments.', meta: 'Achieved in 60 days' },
      { tag: 'Diagnostic Chain — 12 centres', stat: '₹42L additional revenue per year', text: 'Better billing code capture and automated insurance claim follow-up recovered previously lost revenue.', meta: 'Achieved in Year 1' },
      { tag: 'Oncology Centre', stat: '40% improvement in patient satisfaction', text: 'Automated post-treatment follow-up, medication reminders, and care instructions improved patient experience scores significantly.', meta: 'Achieved in 4 months' },
    ],
  },
  faq: {
    heading: 'Healthcare AI — Questions Answered',
    items: [
      { q: 'Is patient data HIPAA / data privacy compliant?', a: 'Yes. All patient data is encrypted, access-controlled, and stored with full audit trails. We sign Business Associate Agreements with all healthcare clients.' },
      { q: 'Does it integrate with our HMS/EMR system?', a: 'We integrate with major Indian HMS systems including Practo, Doctify, eSanjeevani, and any system with API access. Custom integrations available.' },
      { q: 'How does the appointment AI handle different specialities?', a: 'Appointment slots, durations, and routing rules are configured per speciality. Each department can have its own booking workflows and reminder sequences.' },
      { q: 'Can it handle multi-location hospital networks?', a: 'Yes. Centralized dashboards across all locations with location-specific workflows, staff assignments, and reporting.' },
      { q: 'How quickly can we deploy?', a: 'Core appointment and patient communication modules: 2-3 weeks. Full HMS integration with revenue cycle: 6-8 weeks.' },
    ],
  },
  cta: {
    heading: 'Ready to Transform Patient Care?',
    body: 'Get a free healthcare AI audit with a custom implementation plan for your facility type and patient volume.',
    ctas: [
      { label: 'Get Healthcare AI Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
