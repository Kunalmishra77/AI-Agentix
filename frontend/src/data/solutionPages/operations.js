// Operations Automation detail page — content verbatim from
// content-archive/pages/solutions/operations.md

export default {
  slug: 'operations',
  meta: {
    title: 'Operations Automation | AI Agentix',
    description: 'Workflow automation, document processing, approvals, and real-time ops visibility — all connected. Eliminate 70% of manual operations work with AI.',
  },
  hero: {
    eyebrow: 'Operations Automation',
    heading: 'Eliminate 70% of Manual Operations Work With AI',
    body: 'Workflow automation, document processing, approvals, and real-time ops visibility — all connected. Your operations team focuses on decisions, not manual tasks.',
    ctas: [
      { label: 'Map My Operations', to: '/contact', primary: true },
      { label: 'View Technology', to: '/technology', primary: false },
    ],
  },
  stats: [
    { value: '70%', label: 'Manual Tasks Eliminated', sub: 'on average after 90 days' },
    { value: '90%', label: 'Faster Document Processing', sub: 'vs. manual handling' },
    { value: '48hr', label: 'Process Launch Time', sub: 'from workflow to live' },
    { value: '35%', label: 'Reduction in Operational Errors', sub: 'through automation rules' },
  ],
  capabilities: {
    eyebrow: 'Operations Platform',
    heading: 'Every operational bottleneck — solved',
    items: [
      { name: 'Workflow Orchestration', icon: 'workflow',
        desc: 'Map, automate, and monitor every business process from one command center. No-code workflow builder with 200+ pre-built templates across departments.',
        points: ['No-code workflow builder', '200+ workflow templates', 'Cross-department automation', 'Real-time process monitoring'] },
      { name: 'Document Intelligence', icon: 'document',
        desc: 'AI reads, classifies, and extracts data from any document — invoices, contracts, forms, emails. Data flows directly into your systems without manual entry.',
        points: ['Invoice data extraction', 'Contract clause detection', 'Form digitization', 'Auto-routing by content type'] },
      { name: 'Approval Engine', icon: 'approval',
        desc: 'Multi-level approval workflows with SLA enforcement, escalation rules, and audit trails. No more approvals stuck in someone’s inbox.',
        points: ['Multi-level approval chains', 'SLA countdown & alerts', 'Escalation on breach', 'Complete audit trail'] },
      { name: 'Ops Analytics', icon: 'analytics',
        desc: 'Real-time visibility into every process: completion rates, bottlenecks, cycle times, and team performance. Weekly ops digest generated automatically.',
        points: ['Process completion dashboards', 'Bottleneck detection AI', 'Cycle time benchmarking', 'Automated ops reports'] },
      { name: 'Exception Management', icon: 'alert',
        desc: 'AI detects process anomalies, flags exceptions, and routes them to the right person with full context. Problems surface before they become crises.',
        points: ['Anomaly detection engine', 'Smart exception routing', 'Context-rich alerts', 'Resolution tracking'] },
      { name: 'Integration Fabric', icon: 'integration',
        desc: 'Connect 300+ tools — ERP, CRM, HRMS, communication tools — into unified automated workflows. No more data silos or manual handoffs.',
        points: ['300+ tool connectors', 'Bidirectional data sync', 'Webhook & API support', 'No-code integration builder'] },
    ],
  },
  signature: {
    type: 'calculator',
    eyebrow: 'Automation Savings Calculator',
    heading: 'See how many hours automation could reclaim',
    body: 'Set your ops numbers — watch the monthly savings update live.',
    note: 'Estimates based on 70% of manual tasks eliminated across deployed clients. Your results will vary.',
    inputs: [
      { key: 'staff', label: 'Ops staff on manual work', min: 1, max: 200, step: 1, default: 20 },
      { key: 'hrs', label: 'Manual hours / person / week', min: 5, max: 40, step: 1, default: 20, unit: 'hrs' },
      { key: 'cost', label: 'Avg hourly cost', min: 100, max: 2000, step: 50, default: 400, prefix: '₹' },
    ],
    outputs: [
      { key: 'hours', label: 'Hours reclaimed / month', unit: 'hrs', compute: (v) => v.staff * v.hrs * 4 * 0.7 },
      { key: 'saved', label: 'Cost saved / month', prefix: '₹', compute: (v) => v.staff * v.hrs * 4 * 0.7 * v.cost },
      { key: 'annual', label: 'Cost saved / year', prefix: '₹', compute: (v) => v.staff * v.hrs * 4 * 0.7 * v.cost * 12 },
    ],
  },
  process: {
    eyebrow: 'How We Deploy',
    heading: 'From process mapping to fully automated ops',
    steps: [
      { no: '01', title: 'Process Discovery', text: 'Workshop to map all manual workflows and identify automation opportunities' },
      { no: '02', title: 'Priority Assessment', text: 'Rank workflows by time saved, error rate, and business impact' },
      { no: '03', title: 'Workflow Design', text: 'No-code builder creates automated flows with approval logic' },
      { no: '04', title: 'Integration Setup', text: 'Connect to ERP, CRM, email, and existing tools' },
      { no: '05', title: 'Pilot & Refine', text: '2-week pilot with 2–3 workflows, measure and adjust' },
      { no: '06', title: 'Full Rollout', text: 'All approved workflows go live with ongoing monitoring' },
    ],
  },
  integrations: {
    eyebrow: 'Integration Fabric',
    heading: 'Connects your entire ops stack',
    body: 'ERP, CRM, finance, and communication tools — unified into automated workflows with no data silos.',
    tools: ['SAP', 'Oracle', 'Zoho', 'Tally', 'Salesforce', 'Slack', 'Microsoft Teams', 'Google Workspace', 'QuickBooks', 'DocuSign', 'Zapier', 'Power BI'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered Ops vs. Manual',
    cols: ['Capability', 'AI Agentix', 'Traditional Team'],
    rows: [
      { cap: 'Manual Task Volume', ai: '70% eliminated', traditional: '100% manual' },
      { cap: 'Document Processing', ai: 'Seconds, auto-extracted', traditional: 'Minutes–hours, manual entry' },
      { cap: 'Approvals', ai: 'SLA-tracked, auto-escalated', traditional: 'Stuck in inboxes' },
      { cap: 'Process Visibility', ai: 'Real-time dashboards', traditional: 'Spreadsheets, guesswork' },
      { cap: 'Error Rate', ai: '35% lower', traditional: 'Human error-prone' },
      { cap: 'New Process Launch', ai: '48 hours', traditional: 'Weeks of setup' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'Operations transformed, team hours reclaimed',
    items: [
      { tag: 'Logistics Co. — 500 employees', stat: '2,400 hours/month saved', text: '70% of manual data entry and approvals eliminated across finance, HR, and operations.', meta: 'Achieved in 4 months' },
      { tag: 'FMCG Distributor', stat: '90% faster invoice processing', text: 'AI extracts invoice data and routes for approval — from 2 days to 4 hours per invoice.', meta: 'Achieved in 6 weeks' },
      { tag: 'Professional Services', stat: '35% operational error reduction', text: 'Automated compliance checks and approval gates catch errors before they reach clients.', meta: 'Achieved in 3 months' },
    ],
  },
  faq: {
    heading: 'Operations Automation — Questions Answered',
    items: [
      { q: 'How quickly can we deploy first workflows?', a: 'First workflows live in 48–72 hours using our pre-built templates. Full operational suite deployment takes 3–4 weeks.' },
      { q: 'Do we need to map existing processes first?', a: 'Our team does a process discovery session in week 1. For complex operations, we provide a detailed mapping before automation.' },
      { q: 'Can it handle approval chains with 5+ levels?', a: 'Yes. Multi-level approvals with conditional logic, delegation rules, and auto-escalation at any level are fully supported.' },
      { q: 'What happens when an automation fails?', a: 'Immediate alert to the process owner with full context. The workflow pauses at the failure point, not lost — resumes after resolution.' },
      { q: 'How does it integrate with our existing ERP?', a: 'Direct connectors for SAP, Oracle, Zoho, and Tally. For custom ERPs, we use API/webhook integration with your IT team.' },
    ],
  },
  cta: {
    heading: 'Ready to Automate Your Operations?',
    body: 'Get a free process audit. We’ll map your top 5 automation opportunities and estimate time saved within 30 minutes.',
    ctas: [
      { label: 'Get Process Audit', to: '/contact', primary: true },
      { label: 'Explore Technology', to: '/technology', primary: false },
    ],
  },
}
