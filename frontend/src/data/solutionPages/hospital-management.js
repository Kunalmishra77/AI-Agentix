// Hospital Management System detail page — content verbatim from
// content-archive/pages/solutions/hospital-management.md
// (Signature is an animated hospital KPI dashboard.)

export default {
  slug: 'hospital-management',
  heroImage: '/images/hero-hospital-management.webp',
  meta: {
    title: 'Hospital Management System | AI Agentix',
    description: 'From patient booking to discharge — fully automated. Reduce admin overhead by 70%, eliminate billing errors, and give clinical staff more time for patient care.',
  },
  hero: {
    eyebrow: 'Hospital Management System',
    heading: 'Run Your Hospital on AI-Powered Automation',
    body: 'From patient booking to discharge — fully automated. Reduce admin overhead by 70%, eliminate billing errors, and give your clinical staff more time for patient care.',
    ctas: [
      { label: 'Book Free Demo', to: '/contact', primary: true },
      { label: 'View Case Studies', to: '/case-studies', primary: false },
    ],
  },
  stats: [
    { value: '70%', label: 'Admin Work Reduced', sub: 'across billing & scheduling' },
    { value: '45%', label: 'Faster Claim Processing', sub: 'insurance & TPA claims' },
    { value: '90%', label: 'Billing Error Reduction', sub: 'AI-validated invoices' },
    { value: '3x', label: 'Patient Throughput', sub: 'more patients, same staff' },
  ],
  capabilities: {
    eyebrow: 'Core Capabilities',
    heading: 'Every hospital workflow — automated end to end',
    items: [
      { name: 'Patient Scheduling & OPD Automation', icon: 'calendar',
        desc: 'AI-powered appointment booking that eliminates manual scheduling. Patients self-book via WhatsApp, web, or phone. Smart slot allocation reduces no-shows by 40% with automated reminders.',
        points: ['WhatsApp & web self-booking', 'Smart slot optimization', 'Automated reminders & recalls', 'Doctor availability management'] },
      { name: 'EMR / EHR Integration & Auto-Filing', icon: 'enrich',
        desc: 'Automatically sync patient records, test results, and prescriptions across all departments. Eliminate manual data entry and paper files with AI-driven digital record management.',
        points: ['Auto-sync across departments', 'Digital prescription management', 'Lab report auto-attachment', 'Patient history at a glance'] },
      { name: 'Billing & Insurance Claims AI', icon: 'invoice',
        desc: 'Automate invoice generation, insurance pre-authorization, claim submission, and follow-ups. Reduce billing errors by 90% and cut claim rejection rates with AI-validated submissions.',
        points: ['Auto invoice generation', 'Insurance pre-auth automation', 'Claim submission & tracking', 'TPA / cashless processing'] },
      { name: 'Lab & Pharmacy Management', icon: 'health',
        desc: 'Streamline test ordering, result delivery, and pharmacy inventory. Patients receive lab reports via WhatsApp instantly. Auto-reorder pharmacy stock before it runs out.',
        points: ['Digital lab report delivery', 'Test-order to result automation', 'Pharmacy inventory alerts', 'Prescription-to-dispensing flow'] },
      { name: 'Staff Scheduling & HR Automation', icon: 'users',
        desc: 'AI-optimized duty rosters that ensure no department is understaffed. Auto-handle leave requests, shift swaps, and overtime alerts. Payroll triggers run automatically at month end.',
        points: ['AI-generated duty rosters', 'Leave & shift management', 'Overtime & compliance alerts', 'Payroll integration triggers'] },
      { name: 'Patient Communication & Follow-Up', icon: 'chat',
        desc: 'Keep patients engaged post-discharge with automated follow-up messages, medication reminders, and health tips. Build loyalty and improve outcomes with proactive AI communication.',
        points: ['Post-discharge follow-up flows', 'Medication & diet reminders', 'Health camp & scheme alerts', 'Patient satisfaction surveys'] },
    ],
  },
  signature: {
    type: 'dashboard',
    eyebrow: "Today's Hospital Dashboard",
    heading: 'The whole hospital, at a glance',
    body: 'Live operational metrics across OPD, billing, and labs — the numbers your front desk and management see every day.',
    note: 'Illustrative snapshot. Your dashboard reflects your actual departments, volumes, and turnaround times.',
    label: "Today's Hospital Dashboard",
    status: 'Live',
    metrics: [
      { value: 184, label: 'OPD Patients Today', sub: '+12 vs yesterday', icon: 'users' },
      { value: 96, suffix: '%', label: 'Appointments Confirmed', sub: 'Auto-reminded', icon: 'calendar' },
      { value: 47, label: 'Billing Claims Sent', sub: '0 errors today', icon: 'invoice' },
      { value: 2, suffix: ' min', label: 'Avg Lab Report Turnaround', sub: 'Delivered via WhatsApp', icon: 'health' },
    ],
    footer: 'All systems live · 3 departments automated',
  },
  process: {
    eyebrow: 'The Patient Journey',
    heading: 'From arrival to discharge — fully automated',
    steps: [
      { no: '01', title: 'Patient Arrives / Books', text: 'Walk-in or online booking auto-creates patient record' },
      { no: '02', title: 'OPD Queue Managed', text: 'AI assigns tokens, estimates wait times, alerts patients' },
      { no: '03', title: 'Consultation Recorded', text: 'Diagnosis, prescription & tests auto-filed to EMR' },
      { no: '04', title: 'Lab & Pharmacy Triggered', text: 'Orders auto-sent; reports delivered via WhatsApp' },
      { no: '05', title: 'Billing Auto-Generated', text: 'Invoice created, insurance claim submitted instantly' },
      { no: '06', title: 'Discharge & Follow-Up', text: 'Discharge summary sent; post-care automation begins' },
    ],
  },
  integrations: {
    eyebrow: 'Integrations',
    heading: 'Works with your existing hospital stack',
    body: 'Plug into your current HMIS, lab, pharmacy, and billing systems without any disruption.',
    tools: ['Practo', 'eVital HMS', 'Marg ERP', 'Tally', 'WhatsApp', 'Razorpay', 'Zoho CRM', 'Gmail', 'ICICI Pay', 'Cashfree', 'IndiaMART', 'Twilio'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered HMS vs. Traditional System',
    cols: ['Capability', 'AI Agentix HMS', 'Traditional HMS'],
    rows: [
      { cap: 'Appointment Booking', ai: 'WhatsApp / Web / Phone 24/7', traditional: 'Manual phone calls only' },
      { cap: 'Billing Errors', ai: 'Near-zero with AI validation', traditional: '15–20% human error rate' },
      { cap: 'Insurance Claims', ai: 'Auto-submitted in minutes', traditional: 'Manual, 3–5 day turnaround' },
      { cap: 'Lab Report Delivery', ai: 'WhatsApp in 2 minutes', traditional: 'Manual counter / phone call' },
      { cap: 'Patient Communication', ai: 'Automated, personalized', traditional: 'Ad-hoc staff messaging' },
      { cap: 'Operational Insights', ai: 'Live dashboard & alerts', traditional: 'Monthly Excel reports' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'Hospitals that transformed with AI Agentix',
    items: [
      { tag: '80-bed Multi-Speciality, New Delhi', stat: '70% reduction in front-desk staff work', text: 'OPD queue, billing & lab reports fully automated. Staff redirected to patient care.', meta: 'Result in 6 weeks' },
      { tag: 'Diagnostic Centre Chain, Delhi', stat: '₹18L/year saved on billing errors', text: 'AI-validated claims cut rejection rate from 22% to under 2% across 4 branches.', meta: 'Result in 3 months' },
      { tag: 'Super-Speciality Hospital, Hyderabad', stat: '3x patient throughput in OPD', text: 'Smart scheduling and auto-reminders increased confirmed appointments by 85%.', meta: 'Result in 2 months' },
    ],
  },
  faq: {
    heading: 'Hospital Management — Questions Answered',
    items: [
      { q: 'How long does deployment take?', a: 'Most hospitals go live within 3–4 weeks. We handle data migration, staff training, and integration with your existing HMIS/EMR without disrupting ongoing operations.' },
      { q: 'Does it work with existing HMIS software?', a: 'Yes. We integrate with all major Indian HMIS platforms — Practo, eVital, HIS, Marg, and custom systems. API-based integration means no rip-and-replace.' },
      { q: 'Is patient data secure and HIPAA/DPDPA compliant?', a: 'Absolutely. All data is encrypted at rest and in transit, stored in India, and fully compliant with DPDPA 2023 and healthcare data protection standards.' },
      { q: 'Can it handle multi-speciality or multi-location hospitals?', a: 'Yes. The system is built for multi-department and multi-branch environments with centralized dashboards and department-level access controls.' },
      { q: 'What happens if the internet goes down?', a: 'Critical functions have offline fallback modes. Data syncs automatically once connectivity is restored. Zero patient data is lost.' },
    ],
  },
  cta: {
    heading: 'Ready to Modernise Your Hospital Operations?',
    body: "Book a free 30-minute demo. We'll map your biggest workflow bottlenecks and show you exactly how AI can fix them — no commitment required.",
    ctas: [
      { label: 'Book Free Demo', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
