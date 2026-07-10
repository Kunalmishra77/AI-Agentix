// HRMS & Hiring detail page — content verbatim from
// content-archive/pages/solutions/hrms-hiring.md

export default {
  slug: 'hrms-hiring',
  meta: {
    title: 'HRMS & Hiring Automation | AI Agentix',
    description: 'AI-powered recruitment, onboarding, payroll, and performance management. Reduce time-to-hire by 60% and handle 80% of HR queries automatically.',
  },
  hero: {
    eyebrow: 'HRMS & Hiring',
    heading: 'Hire Faster. Manage Better. HR on Autopilot.',
    body: 'AI-powered recruitment, onboarding, payroll, and performance management. Reduce time-to-hire by 60% and handle 80% of HR queries automatically.',
    ctas: [
      { label: 'Get HR Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
  stats: [
    { value: '85%', label: 'Recruiter Time Saved', sub: 'on screening & scheduling' },
    { value: '60%', label: 'Faster Time-to-Hire', sub: 'vs. manual process' },
    { value: '3x', label: 'More Candidate Pipeline', sub: 'same team size' },
    { value: '40%', label: 'Lower Attrition', sub: 'within 12 months' },
  ],
  capabilities: {
    eyebrow: 'Full HRMS Suite',
    heading: 'Every HR function — AI-powered',
    items: [
      { name: 'AI Candidate Screening', icon: 'screen',
        desc: 'Resume parsing, JD matching, and intelligent shortlisting in minutes. AI screens hundreds of applications and ranks candidates by fit score, saving 85% of recruiter time.',
        points: ['JD-to-resume matching AI', 'Skills gap analysis', 'Automated ranking & scoring', 'Bias-reduced screening'] },
      { name: 'Interview Automation', icon: 'interview',
        desc: 'Automated scheduling, pre-screening video interviews, and question generation tailored to each role. Candidates complete async interviews on their own schedule.',
        points: ['Async video interviews', 'AI question generation', 'Calendar auto-scheduling', 'Evaluation rubric builder'] },
      { name: 'Onboarding Workflows', icon: 'onboard',
        desc: 'Digital onboarding from offer acceptance to first day. Document collection, policy acknowledgements, access provisioning — all automated with zero HR overhead.',
        points: ['Digital document collection', 'Policy acknowledgement tracking', 'Access & tool provisioning', 'First-30-day checklist engine'] },
      { name: 'Performance Management', icon: 'analytics',
        desc: 'Continuous feedback loops, goal tracking, and 360° reviews managed by AI. Quarterly reviews auto-generated from actual performance data, not vague impressions.',
        points: ['OKR & goal tracking', '360° feedback automation', 'Performance trend analytics', 'Review document generation'] },
      { name: 'Payroll & Compliance', icon: 'finance',
        desc: 'Automated payroll processing with tax calculations, compliance checks, and audit trails. Statutory compliance for PF, ESI, TDS, and more — always up to date.',
        points: ['Auto payroll calculation', 'Statutory compliance (PF/ESI)', 'Salary slip generation', 'Audit trail & reporting'] },
      { name: 'Employee Engagement', icon: 'engage',
        desc: 'Pulse surveys, recognition programs, and sentiment analysis. Know how your team feels before it shows up in attrition data.',
        points: ['Automated pulse surveys', 'AI sentiment analysis', 'Recognition & rewards engine', 'Attrition risk prediction'] },
    ],
  },
  signature: {
    type: 'calculator',
    eyebrow: 'Time-to-Hire Calculator',
    heading: 'See how much faster you could hire',
    body: 'Set your current hiring numbers — watch the AI impact update live.',
    note: 'Estimates based on a 60% faster time-to-hire and 85% screening-time reduction across deployed clients. Your results will vary.',
    inputs: [
      { key: 'roles', label: 'Roles to fill / month', min: 1, max: 100, step: 1, default: 10 },
      { key: 'days', label: 'Current time-to-hire', min: 10, max: 90, step: 1, default: 45, unit: 'days' },
      { key: 'screen', label: 'Screening hours / role', min: 2, max: 40, step: 1, default: 12, unit: 'hrs' },
    ],
    outputs: [
      { key: 'newdays', label: 'AI time-to-hire', unit: 'days', compute: (v) => v.days * 0.4 },
      { key: 'saved', label: 'Days saved per hire', unit: 'days', compute: (v) => v.days * 0.6 },
      { key: 'hours', label: 'Recruiter hours saved / month', unit: 'hrs', compute: (v) => v.roles * v.screen * 0.85 },
    ],
  },
  process: {
    eyebrow: 'Employee Lifecycle',
    heading: 'From job post to offboarding — fully managed',
    steps: [
      { no: '01', title: 'Job Post & Sourcing', text: 'AI writes JDs, posts to job boards, and sources passive candidates' },
      { no: '02', title: 'Screen & Shortlist', text: 'Hundreds of CVs screened and ranked in minutes' },
      { no: '03', title: 'Interview & Select', text: 'Automated scheduling, async video, AI evaluation' },
      { no: '04', title: 'Offer & Onboard', text: 'Digital offer, document collection, tool access provisioned' },
      { no: '05', title: 'Grow & Retain', text: 'Continuous feedback, goals, training, and recognition' },
      { no: '06', title: 'Payroll & Compliance', text: 'Automated salary, taxes, statutory filings, and reports' },
    ],
  },
  integrations: {
    eyebrow: 'Integrations',
    heading: 'Plugs into your hiring & HR stack',
    body: 'Job boards, HRMS, payroll, and communication tools — applications and data flow in automatically.',
    tools: ['LinkedIn', 'Naukri', 'Indeed', 'Shine', 'Zoho People', 'Keka', 'GreytHR', 'Darwinbox', 'RazorpayX', 'Slack', 'Google Workspace', 'DocuSign'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered HR vs. Traditional',
    cols: ['Capability', 'AI Agentix', 'Traditional Team'],
    rows: [
      { cap: 'Time-to-Hire', ai: '14–18 days', traditional: '40–45 days' },
      { cap: 'Resume Screening', ai: 'Minutes, ranked', traditional: 'Hours, manual' },
      { cap: 'Interview Scheduling', ai: 'Automated, async', traditional: 'Email back-and-forth' },
      { cap: 'HR Query Handling', ai: '80% self-service', traditional: 'Manual, ticket-based' },
      { cap: 'Payroll & Compliance', ai: 'Auto, always current', traditional: 'Manual, error-prone' },
      { cap: 'Attrition Risk', ai: 'Predicted 30–60 days early', traditional: 'Discovered at exit' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'HR results that change how you operate',
    items: [
      { tag: 'Fintech Startup — 200 employees', stat: '60% faster time-to-hire', text: 'Reduced average hiring cycle from 45 days to 18 days across all roles using AI screening.', meta: 'Achieved in 2 months' },
      { tag: 'Manufacturing Co. — 800 staff', stat: '40% drop in attrition rate', text: 'AI pulse surveys and early warning system flagged at-risk employees; targeted interventions retained 340 employees.', meta: 'Achieved in 6 months' },
      { tag: 'IT Services — 350 employees', stat: '₹18L saved in HR ops costs', text: 'Self-service bot handles 80% of HR queries, freeing the team for strategic work.', meta: 'Achieved in Year 1' },
    ],
  },
  faq: {
    heading: 'HRMS & Hiring — Questions Answered',
    items: [
      { q: 'How does AI screening reduce bias?', a: 'The AI evaluates skills and experience against job requirements, not photos, names, or other personal attributes. You can configure blind screening modes for complete anonymity.' },
      { q: 'Does it integrate with job boards?', a: 'Yes — LinkedIn, Naukri, Indeed, and Shine. Applications flow directly into the ATS and get scored automatically without manual import.' },
      { q: 'Can employees self-serve on HR queries?', a: 'The HR AI bot handles leave requests, payslip queries, policy questions, and more. 80% of HR queries resolved without HR team involvement.' },
      { q: 'Is payroll data secure?', a: 'All payroll data is encrypted, role-gated, and audit-logged. SOC 2 Type II compliant infrastructure with Indian data residency options.' },
      { q: 'How long to implement?', a: '4–6 weeks for full HRMS setup including payroll, compliance, and ATS. Core recruitment module live in 2 weeks.' },
    ],
  },
  cta: {
    heading: 'Ready to Modernise Your HR?',
    body: 'Get a free HR audit and a custom implementation roadmap for your team size and industry.',
    ctas: [
      { label: 'Get Free HR Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
