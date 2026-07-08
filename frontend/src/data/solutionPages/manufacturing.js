// Manufacturing AI Automation detail page — content verbatim from
// content-archive/pages/solutions/manufacturing.md
// (Signature is a live factory-floor monitor, not a calculator.)

export default {
  slug: 'manufacturing',
  meta: {
    title: 'Manufacturing AI Automation | AI Agentix',
    description: 'AI-powered production planning, predictive maintenance, quality control, and OEE optimization. Transform your factory floor with intelligent automation.',
  },
  heroImage: '/AGENTIX-MEDIAS/renewalsecured.webp',
  hero: {
    eyebrow: 'Manufacturing AI',
    heading: 'Smart Factory. Zero Unplanned Downtime. Industry 4.0 AI.',
    body: 'AI-powered production planning, predictive maintenance, quality control, and OEE optimization. Transform your factory floor with intelligent automation.',
    ctas: [
      { label: 'Audit My Factory', to: '/contact', primary: true },
      { label: 'View Technology', to: '/technology', primary: false },
    ],
  },
  stats: [
    { value: '35%', label: 'Reduction in Unplanned Downtime', sub: 'via predictive maintenance' },
    { value: '60%', label: 'Faster Defect Detection', sub: 'vs. manual inspection' },
    { value: '28%', label: 'Improvement in OEE', sub: 'within 6 months' },
    { value: '92%', label: 'On-Time Production Rate', sub: 'with AI scheduling' },
  ],
  capabilities: {
    eyebrow: 'Industry 4.0 Platform',
    heading: 'Smart manufacturing — every layer covered',
    items: [
      { name: 'Production Planning AI', icon: 'calendar', image: '/AGENTIX-MEDIAS/Customer RESEARCH agent.webp',
        desc: 'AI-driven production schedules that balance orders, capacity, and material availability. Automatically adjust plans when conditions change — no manual replanning.',
        points: ['Demand-driven scheduling', 'Capacity constraint optimization', 'Material availability checks', 'Auto-replanning on changes'] },
      { name: 'Quality Control Automation', icon: 'approval', image: '/AGENTIX-MEDIAS/Amit-Renewal Agent.webp',
        desc: 'AI vision systems and statistical process control identify defects before they reach customers. Automated inspection reports and root cause analysis.',
        points: ['Defect detection & classification', 'Statistical process control', 'Root cause analysis engine', 'Automated inspection reports'] },
      { name: 'Predictive Maintenance', icon: 'maintenance', image: '/AGENTIX-MEDIAS/progress-tracked.webp',
        desc: 'Monitor machine health with IoT sensors and AI analytics. Predict failures 7–14 days ahead, schedule maintenance proactively, and eliminate unplanned downtime.',
        points: ['IoT sensor integration', 'Failure prediction models', 'Proactive maintenance scheduling', 'Equipment health dashboards'] },
      { name: 'Inventory & BOM Management', icon: 'inventory', image: '/AGENTIX-MEDIAS/CRM.webp',
        desc: 'Real-time raw material tracking, automated BOM explosions, and reorder point management. Never halt production due to missing materials.',
        points: ['BOM explosion automation', 'Real-time material tracking', 'Automated reorder triggers', 'Waste tracking & reduction'] },
      { name: 'OEE & Efficiency Analytics', icon: 'analytics', image: '/AGENTIX-MEDIAS/data analyst.webp',
        desc: 'Real-time Overall Equipment Effectiveness tracking across all production lines. Identify availability, performance, and quality losses before they impact output.',
        points: ['Real-time OEE dashboard', 'Line efficiency benchmarking', 'Shift performance comparison', 'Improvement recommendations'] },
      { name: 'ERP & MES Integration', icon: 'integration', image: '/AGENTIX-MEDIAS/leadcaptured.webp',
        desc: 'Connect AI capabilities to your existing manufacturing systems. Works with SAP, Oracle, Microsoft Dynamics, and any MES with API access.',
        points: ['SAP/Oracle integration', 'MES data synchronization', 'Shopfloor data collection', 'Custom API connectors'] },
    ],
  },
  signature: {
    type: 'monitor',
    eyebrow: 'Factory Floor — Live',
    heading: 'See every line, machine, and alert in real time',
    body: 'AI watches OEE, machine health, and quality across the floor — flagging issues before they cost you output.',
    note: 'Illustrative floor view. Your monitor reflects your actual lines, machines, and sensor data.',
    label: 'Factory Floor Monitor',
    status: 'Live',
    lines: [
      { name: 'Line A — Assembly', oee: 89, status: 'Running' },
      { name: 'Line B — Packaging', oee: 74, status: 'Maintenance Due', detail: 'Scheduled service in 3 days' },
      { name: 'Line C — Finishing', oee: 91, status: 'Running' },
      { name: 'CNC Machine #7', oee: 45, status: 'Alert', detail: 'Vibration anomaly · predicted failure in 6 days' },
    ],
    footer: '1 maintenance alert · 2 quality flags resolved today',
  },
  process: {
    eyebrow: 'End-to-End',
    heading: 'From raw material to finished product — AI everywhere',
    steps: [
      { no: '01', title: 'Demand Planning', text: 'AI forecasts production requirements from sales and market data' },
      { no: '02', title: 'Material Procurement', text: 'Automated POs triggered by inventory levels and lead times' },
      { no: '03', title: 'Production Scheduling', text: 'Optimal schedules balancing capacity, priority, and efficiency' },
      { no: '04', title: 'Quality Monitoring', text: 'Continuous inspection with AI-powered defect detection' },
      { no: '05', title: 'Equipment Management', text: 'Predictive maintenance prevents failures before they occur' },
      { no: '06', title: 'Dispatch & Reporting', text: 'Automated dispatch planning and OEE reports generated daily' },
    ],
  },
  integrations: {
    eyebrow: 'ERP & MES Integration',
    heading: 'Connects to your factory systems',
    body: 'ERP, MES, and shopfloor protocols — AI plugs into your existing machinery and systems, no rip-and-replace.',
    tools: ['SAP S/4HANA', 'SAP Business One', 'Oracle', 'Microsoft Dynamics', 'MES', 'MQTT', 'OPC-UA', 'Siemens', 'Rockwell', 'Power BI', 'Tally', 'REST API'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered Factory vs. Traditional',
    cols: ['Capability', 'AI Agentix', 'Traditional Plant'],
    rows: [
      { cap: 'Unplanned Downtime', ai: '35% lower', traditional: 'Reactive breakdowns' },
      { cap: 'Defect Detection', ai: '60% faster, AI vision', traditional: 'Manual, sampling' },
      { cap: 'Maintenance', ai: 'Predictive, 7–14 days ahead', traditional: 'Scheduled or run-to-failure' },
      { cap: 'OEE Visibility', ai: 'Real-time, per line', traditional: 'End-of-shift, manual' },
      { cap: 'Production Scheduling', ai: 'Auto-optimized', traditional: 'Spreadsheet-based' },
      { cap: 'Quality Consistency', ai: 'SPC-monitored', traditional: 'Batch-variable' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'Manufacturing results that move the bottom line',
    items: [
      { tag: 'Auto Components Manufacturer', stat: '35% reduction in unplanned downtime', text: 'Predictive maintenance on 12 CNC machines eliminated ₹42L in emergency repair costs in Year 1.', meta: 'Achieved in 6 months' },
      { tag: 'FMCG Packaging Plant', stat: '28% improvement in OEE', text: 'AI scheduling and real-time line monitoring increased output by 28% with the same equipment and headcount.', meta: 'Achieved in 8 months' },
      { tag: 'Pharmaceutical Manufacturer', stat: 'Zero batch failures in 9 months', text: 'AI quality control and process parameter monitoring eliminated out-of-spec batches completely.', meta: 'Achieved in 9 months' },
    ],
  },
  faq: {
    heading: 'Manufacturing AI — Questions Answered',
    items: [
      { q: 'Does it work with our existing machines and sensors?', a: 'Yes. We integrate with any IoT-enabled machinery through MQTT, OPC-UA, or standard APIs. Older machines can be retrofitted with our IoT gateway.' },
      { q: 'How long before we see predictive maintenance results?', a: 'The ML models need 4–8 weeks of sensor data to establish baselines. First predictions typically surface after 6–8 weeks of operation.' },
      { q: 'Can it handle multi-shift and multi-plant operations?', a: 'Yes. Consolidated dashboards across plants and shifts, with granular drill-down to individual lines, machines, and operators.' },
      { q: 'What about data security on the factory floor?', a: 'Edge computing options available for air-gapped environments. All data encrypted at rest and in transit. Compliant with ISO 27001.' },
      { q: 'How does it integrate with our ERP?', a: 'Direct connectors for SAP S/4HANA, SAP Business One, Oracle, and Microsoft Dynamics. Setup takes 2–3 weeks including testing.' },
    ],
  },
  cta: {
    heading: 'Ready to Build Your Smart Factory?',
    body: 'Get a free manufacturing AI audit with a custom roadmap for your plant and production challenges.',
    ctas: [
      { label: 'Get Factory AI Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
