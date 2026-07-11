// Supply Chain Automation detail page — content verbatim from
// content-archive/pages/solutions/supply-chain.md

export default {
  slug: 'supply-chain',
  heroImage: '/images/hero-supply-chain.webp',
  meta: {
    title: 'Supply Chain Automation | AI Agentix',
    description: 'AI-powered demand forecasting, inventory management, vendor automation, and logistics optimization. Stop firefighting and start anticipating.',
  },
  hero: {
    eyebrow: 'Supply Chain',
    heading: 'Predict Demand. Eliminate Stockouts. Supply Chain AI.',
    body: 'AI-powered demand forecasting, inventory management, vendor automation, and logistics optimization. Stop firefighting and start anticipating.',
    ctas: [
      { label: 'Audit My Supply Chain', to: '/contact', primary: true },
      { label: 'See Results', to: '/case-studies', primary: false },
    ],
  },
  stats: [
    { value: '60%', label: 'Reduction in Stockouts', sub: 'vs. manual forecasting' },
    { value: '25%', label: 'Lower Logistics Costs', sub: 'through route optimization' },
    { value: '40%', label: 'Less Dead Inventory', sub: 'via demand intelligence' },
    { value: '98%', label: 'On-Time Delivery Rate', sub: 'across all shipments' },
  ],
  capabilities: {
    eyebrow: 'AI Supply Chain Platform',
    heading: 'Every supply chain challenge — solved',
    items: [
      { name: 'Demand Forecasting AI', icon: 'forecast',
        desc: 'Predict demand 4–12 weeks ahead using historical data, market signals, and seasonality patterns. Reduce stockouts by 60% and overstock by 40%.',
        points: ['ML-driven demand prediction', 'Seasonal pattern recognition', 'Supplier lead time integration', 'Auto reorder point calculation'] },
      { name: 'Inventory Intelligence', icon: 'inventory',
        desc: 'Real-time inventory tracking across all warehouses with automated reorder triggers and vendor notifications. Know exactly what you have, where, and when to replenish.',
        points: ['Multi-warehouse tracking', 'Automated reorder triggers', 'FIFO/LIFO management', 'Expiry & shelf-life alerts'] },
      { name: 'Vendor Management', icon: 'users',
        desc: 'Automate PO creation, vendor communication, and performance tracking. Compare vendor quotes, track delivery SLAs, and trigger escalations automatically.',
        points: ['PO automation & approval', 'Vendor performance scoring', 'Delivery SLA tracking', 'Multi-vendor quote comparison'] },
      { name: 'Logistics Optimization', icon: 'truck',
        desc: 'Route optimization, carrier selection, and shipment tracking — all automated. Reduce last-mile costs by 25% through AI-powered delivery planning.',
        points: ['Route optimization engine', 'Carrier rate comparison', 'Real-time shipment tracking', 'Delivery exception management'] },
      { name: 'Supply Chain Analytics', icon: 'analytics',
        desc: 'End-to-end supply chain visibility with cost analytics, OTIF rates, and bottleneck identification. Weekly supply chain health digest delivered automatically.',
        points: ['OTIF performance tracking', 'Cost per unit analytics', 'Bottleneck detection', 'Automated health reports'] },
      { name: 'Risk & Disruption Alerts', icon: 'alert',
        desc: 'AI monitors supplier news, weather, geopolitical events, and port conditions to flag supply chain risks 2–4 weeks before they impact your operations.',
        points: ['Supplier risk monitoring', 'Weather & logistics alerts', 'Alternative supplier routing', 'Disruption impact scoring'] },
    ],
  },
  signature: {
    type: 'calculator',
    eyebrow: 'Supply Chain Savings Calculator',
    heading: 'See what better forecasting could save you',
    body: 'Set your numbers — watch stockout recovery and logistics savings update live.',
    note: 'Estimates based on 60% fewer stockouts and 25% lower logistics costs across deployed clients. Your results will vary.',
    inputs: [
      { key: 'revenue', label: 'Monthly revenue', min: 500000, max: 200000000, step: 500000, default: 20000000, prefix: '₹' },
      { key: 'stockout', label: 'Revenue lost to stockouts', min: 1, max: 20, step: 1, default: 8, unit: '%' },
      { key: 'logistics', label: 'Monthly logistics spend', min: 50000, max: 10000000, step: 50000, default: 800000, prefix: '₹' },
    ],
    outputs: [
      { key: 'recovered', label: 'Stockout revenue recovered / month', prefix: '₹', compute: (v) => v.revenue * v.stockout / 100 * 0.6 },
      { key: 'logisave', label: 'Logistics cost saved / month', prefix: '₹', compute: (v) => v.logistics * 0.25 },
      { key: 'annual', label: 'Total saved / year', prefix: '₹', compute: (v) => (v.revenue * v.stockout / 100 * 0.6 + v.logistics * 0.25) * 12 },
    ],
  },
  process: {
    eyebrow: 'The Supply Chain Engine',
    heading: 'End-to-end supply chain intelligence',
    steps: [
      { no: '01', title: 'Demand Signal Capture', text: 'Sales data, market trends, and seasonality ingested automatically' },
      { no: '02', title: 'Inventory Optimization', text: 'AI calculates optimal stock levels for every SKU and location' },
      { no: '03', title: 'Vendor Coordination', text: 'Purchase orders raised and tracked without manual intervention' },
      { no: '04', title: 'Logistics Planning', text: 'Routes and carriers selected for lowest cost and fastest delivery' },
      { no: '05', title: 'Delivery Monitoring', text: 'Real-time tracking with automatic exception handling' },
      { no: '06', title: 'Analytics & Insights', text: 'OTIF, cost per unit, and fill rate reported weekly' },
    ],
  },
  integrations: {
    eyebrow: 'Integrations',
    heading: 'Connects to your ERP & logistics stack',
    body: 'Inventory, ERP, and carrier systems unified — data flows in without manual imports or new portals.',
    tools: ['SAP', 'Oracle', 'Tally', 'Zoho Inventory', 'QuickBooks', 'Shopify', 'Unicommerce', 'Delhivery', 'Shiprocket', 'Blue Dart', 'Power BI', 'Excel'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI-Powered Supply Chain vs. Manual',
    cols: ['Capability', 'AI Agentix', 'Traditional Team'],
    rows: [
      { cap: 'Demand Forecasting', ai: '12–18% MAPE', traditional: '35–45% MAPE' },
      { cap: 'Stockouts', ai: '60% fewer', traditional: 'Frequent, reactive' },
      { cap: 'Reorder Decisions', ai: 'Auto, per-SKU', traditional: 'Manual, gut-feel' },
      { cap: 'Dead Inventory', ai: '40% less', traditional: 'Piles up unnoticed' },
      { cap: 'Logistics Cost', ai: '25% lower', traditional: 'Fixed carrier, no optimization' },
      { cap: 'Risk Alerts', ai: '2–4 weeks early', traditional: 'Discovered at disruption' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'Supply chain results you can measure',
    items: [
      { tag: 'FMCG Manufacturer', stat: '60% fewer stockouts in 90 days', text: 'Demand forecasting accuracy improved from 58% to 87%; eliminated emergency purchase premiums.', meta: 'Achieved in 90 days' },
      { tag: 'E-commerce Retailer', stat: '₹1.4Cr saved in dead inventory', text: 'AI identified 240 slow-moving SKUs and automated clearance pricing strategy.', meta: 'Achieved in 4 months' },
      { tag: 'Auto Parts Distributor', stat: '25% reduction in logistics costs', text: 'Route optimization and carrier consolidation cut last-mile costs significantly.', meta: 'Achieved in 6 months' },
    ],
  },
  faq: {
    heading: 'Supply Chain Automation — Questions Answered',
    items: [
      { q: 'Which ERPs does it integrate with?', a: 'SAP, Oracle, Tally, Zoho Inventory, QuickBooks, and any system with API access. Custom integrations are available.' },
      { q: 'How accurate is the demand forecasting?', a: 'Average MAPE (Mean Absolute Percentage Error) of 12–18% across industries, compared to 35–45% for manual forecasting methods.' },
      { q: 'Can it handle multi-warehouse operations?', a: 'Yes. Multi-location inventory management with transfer recommendations and zone-specific reorder rules is fully supported.' },
      { q: 'How does it handle seasonal businesses?', a: 'Seasonal decomposition models built-in. The AI learns your historical seasonal patterns and adjusts forecasts automatically for peak periods.' },
      { q: 'What about supplier communication?', a: 'Automated PO emails, delivery reminders, and escalations are all sent by the AI. Suppliers respond via their usual channels — no new portal required.' },
    ],
  },
  cta: {
    heading: 'Ready to Optimise Your Supply Chain?',
    body: 'Get a free supply chain audit with a custom AI roadmap for your industry and business size.',
    ctas: [
      { label: 'Get Free Audit', to: '/contact', primary: true },
      { label: 'See Case Studies', to: '/case-studies', primary: false },
    ],
  },
}
