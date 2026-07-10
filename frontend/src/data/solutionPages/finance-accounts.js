// Finance & Accounts Automation detail page — content verbatim from
// content-archive/pages/solutions/finance-accounts.md
// (Archive has no process section for Finance, so it is intentionally omitted.)

export default {
  slug: 'finance-accounts',
  meta: {
    title: 'Finance & Accounts Automation | AI Agentix',
    description: 'Automate invoicing, expense management, GST compliance, and financial reporting. Eliminate 85% of manual finance work while staying audit-ready.',
  },
  hero: {
    eyebrow: 'Finance & Accounts',
    heading: 'Close Books Faster. Stay Compliant. Finance AI.',
    body: 'Automate invoicing, expense management, GST compliance, and financial reporting. Eliminate 85% of manual finance work while staying audit-ready.',
    ctas: [
      { label: 'Get Finance Audit', to: '/contact', primary: true },
      { label: 'See Results', to: '/case-studies', primary: false },
    ],
  },
  stats: [
    { value: '85%', label: 'Reduction in Manual Finance Work', sub: 'within 60 days' },
    { value: '60%', label: 'Faster Month-End Close', sub: 'vs. manual process' },
    { value: '99%', label: 'Invoice Processing Accuracy', sub: '3-way matching AI' },
    { value: '40hr', label: 'Saved Per Month Per Finance FTE', sub: 'on average' },
  ],
  capabilities: {
    eyebrow: 'Finance AI Platform',
    heading: 'Every finance function — AI-powered',
    items: [
      { name: 'Invoice Automation', icon: 'invoice',
        desc: 'AI extracts data from any invoice format — PDF, email, scan — matches to POs, flags discrepancies, and routes for approval automatically. Zero manual data entry.',
        points: ['3-way PO matching', 'Discrepancy detection', 'Auto-approval for under-threshold', 'ERP sync on approval'] },
      { name: 'Expense Management', icon: 'expense',
        desc: 'Employees submit receipts via WhatsApp or mobile. AI categorizes, checks policy compliance, and routes for approval. Month-end close in hours, not days.',
        points: ['WhatsApp receipt capture', 'Policy compliance check', 'Auto-categorization', 'Real-time expense dashboards'] },
      { name: 'Accounts Receivable AI', icon: 'receivable',
        desc: 'Automated invoicing, payment reminders, and collections workflows. AI predicts late payments and triggers escalation before they become bad debts.',
        points: ['Auto invoice generation', 'Smart payment reminders', 'Late payment prediction', 'Collections workflow engine'] },
      { name: 'Statutory Compliance', icon: 'approval',
        desc: 'Automated GST filing, TDS calculations, PF/ESI contributions, and statutory reports. Always up to date with regulatory changes — zero compliance anxiety.',
        points: ['GST return automation', 'TDS deduction & filing', 'PF/ESI computation', 'Audit-ready reports'] },
      { name: 'Cash Flow Intelligence', icon: 'forecast',
        desc: 'Real-time cash flow forecasting with 30/60/90-day projections. AI identifies cash gaps before they happen and recommends treasury actions.',
        points: ['Cash flow forecasting', 'Payment timing optimization', 'Bank reconciliation AI', 'Treasury action alerts'] },
      { name: 'Financial Reporting', icon: 'analytics',
        desc: 'P&L, balance sheet, and MIS reports generated automatically with variance analysis and trend commentary. Board-ready reports in one click.',
        points: ['Automated P&L generation', 'Variance analysis narratives', 'MIS report builder', 'One-click board reports'] },
    ],
  },
  signature: {
    type: 'calculator',
    eyebrow: 'Finance Automation Savings Calculator',
    heading: 'See what automating finance ops could save',
    body: 'Set your finance team numbers — watch the monthly savings update live.',
    note: 'Estimates based on an 85% reduction in manual finance work across deployed clients. Your results will vary.',
    inputs: [
      { key: 'ftes', label: 'Finance team members (FTEs)', min: 1, max: 100, step: 1, default: 8 },
      { key: 'hrs', label: 'Manual finance hours / FTE / month', min: 20, max: 160, step: 4, default: 48, unit: 'hrs' },
      { key: 'cost', label: 'Avg hourly cost', min: 200, max: 3000, step: 50, default: 600, prefix: '₹' },
    ],
    outputs: [
      { key: 'hours', label: 'Hours reclaimed / month', unit: 'hrs', compute: (v) => v.ftes * v.hrs * 0.85 },
      { key: 'saved', label: 'Cost saved / month', prefix: '₹', compute: (v) => v.ftes * v.hrs * 0.85 * v.cost },
      { key: 'annual', label: 'Cost saved / year', prefix: '₹', compute: (v) => v.ftes * v.hrs * 0.85 * v.cost * 12 },
    ],
  },
  integrations: {
    eyebrow: 'Integrations',
    heading: 'Connects to your accounting stack',
    body: 'Accounting software, banks, and statutory portals — live sync with no manual data import.',
    tools: ['Tally', 'QuickBooks', 'Zoho Books', 'SAP', 'Oracle', 'GSTN', 'ClearTax', 'RazorpayX', 'HDFC Bank', 'ICICI Bank', 'Excel', 'Power BI'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered Finance vs. Manual',
    cols: ['Capability', 'AI Agentix', 'Traditional Team'],
    rows: [
      { cap: 'Invoice Processing', ai: '99% accurate, seconds', traditional: 'Manual entry, errors' },
      { cap: 'Month-End Close', ai: '2–3 days', traditional: '7+ days' },
      { cap: 'GST & Compliance', ai: 'Auto-filed, always current', traditional: 'Manual, penalty risk' },
      { cap: 'Expense Reports', ai: 'WhatsApp capture, auto', traditional: 'Spreadsheets, delays' },
      { cap: 'Cash Flow Visibility', ai: '30/60/90-day forecast', traditional: 'Reactive, month-end only' },
      { cap: 'Audit Readiness', ai: 'Always audit-ready', traditional: 'Scramble at audit time' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'Finance teams love the numbers',
    items: [
      { tag: 'Mid-size IT Company', stat: '₹24L saved in Year 1 finance ops', text: '85% of invoice processing automated, month-end close reduced from 7 days to 2.5 days.', meta: 'Result in 1 year' },
      { tag: 'FMCG Distributor', stat: 'Zero GST penalty in 18 months', text: 'Automated GST filing and reconciliation eliminated all late filings and associated penalties.', meta: 'Result in 18 months' },
      { tag: 'Healthcare Chain — 8 units', stat: '40 hours/month reclaimed per accountant', text: 'Invoice automation and automated expense reports freed finance team for higher-value analysis.', meta: 'Result in 90 days' },
    ],
  },
  faq: {
    heading: 'Finance Automation — Questions Answered',
    items: [
      { q: 'Which accounting software does it connect to?', a: 'Tally, QuickBooks, Zoho Books, SAP, and Oracle. Direct integration maintains a live sync without manual data import.' },
      { q: 'Is financial data secure?', a: 'Bank-grade encryption, role-based access, and full audit logs. SOC 2 Type II certified with Indian data residency. Only authorized users see financial data.' },
      { q: 'How does GST automation work?', a: 'AI matches invoices, calculates liability, and prepares GSTR-1, GSTR-3B, and annual returns. You review and file — no manual preparation required.' },
      { q: 'Can it handle multi-entity companies?', a: 'Yes. Consolidated reporting across multiple entities, intercompany elimination, and entity-level drill-down all supported.' },
      { q: 'How long until we see time savings?', a: 'Finance teams typically save 40–60 hours per month in the first 30 days through invoice automation and expense management alone.' },
    ],
  },
  cta: {
    heading: 'Ready to Transform Your Finance Function?',
    body: 'Get a free finance audit with a custom automation roadmap for your team.',
    ctas: [
      { label: 'Get Free Finance Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
