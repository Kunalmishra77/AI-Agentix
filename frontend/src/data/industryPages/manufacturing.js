// Manufacturing industry page — content verbatim from
// content-archive/pages/industries/manufacturing.md
// (Distinct from the Manufacturing *solution* page; this is the industry vertical.)

export default {
  slug: 'manufacturing',
  heroImage: '/images/hero-ind-manufacturing.webp',
  meta: {
    title: 'AI for Manufacturing | AI Agentix',
    description: 'Predictive maintenance, quality vision systems, and production AI that reduce downtime, improve quality, and cut operational costs across your factory floor.',
  },
  hero: {
    eyebrow: 'AI for Manufacturing',
    heading: 'Intelligent Manufacturing with Industrial AI',
    subheading: 'Predictive maintenance, quality vision systems, and production AI that reduce downtime, improve quality, and cut operational costs across your factory floor.',
    ctas: [
      { label: 'Book a Demo', to: '/contact', primary: true },
      { label: 'Manufacturing Solutions', to: '/solutions/manufacturing', primary: false },
    ],
    tags: ['Predictive Maintenance', 'Quality Vision', 'Production Scheduling', 'Supply Chain', 'Energy Optimization', 'Worker Safety'],
  },
  stats: [
    { value: '67%', label: 'Downtime Reduction', sub: 'unplanned downtime eliminated' },
    { value: '99.4%', label: 'Defect Detection', sub: 'accuracy rate, computer vision' },
    { value: '20%', label: 'Energy Cost Savings', sub: 'average reduction' },
    { value: '31%', label: 'OEE Improvement', sub: 'overall equipment effectiveness' },
  ],
  solutions: {
    eyebrow: 'Industrial AI Solutions Suite',
    heading: 'Six AI modules built for the factory floor',
    items: [
      { name: 'Predictive Maintenance', image: '/images/predictive-maintenance.webp',
        desc: 'IoT sensor data analyzed by AI detects equipment anomalies before failure. Reduces unplanned downtime by 67% and extends asset life — maintenance scheduled when actually needed, not on fixed intervals.',
        points: ['IoT anomaly detection', 'Failure prediction', 'Condition-based scheduling', 'Extended asset life'] },
      { name: 'Quality Defect Detection', image: '/images/quality-vision.webp',
        desc: 'Computer vision AI inspects products at line speed — detecting surface defects, dimensional errors, and assembly faults with 99.4% accuracy, far exceeding human inspection rates.',
        points: ['Surface defect detection', 'Dimensional error checks', 'Assembly fault detection', '99.4% accuracy at line speed'] },
      { name: 'Production Scheduling AI', image: '/images/scheduling.webp',
        desc: 'Dynamic scheduling AI balances orders, machine capacity, workforce availability, and material supply in real-time — maximizing OEE while meeting delivery commitments.',
        points: ['Order & capacity balancing', 'Workforce availability', 'Material supply sync', 'OEE maximization'] },
      { name: 'Supply Chain Automation', image: '/images/business-intelligence.webp',
        desc: 'AI-driven procurement automation handles vendor communication, purchase orders, goods receipt verification, and supplier performance scoring without manual intervention.',
        points: ['Vendor communication', 'PO automation', 'Goods receipt verification', 'Supplier performance scoring'] },
      { name: 'Energy Optimization', image: '/images/business-intelligence.webp',
        desc: 'AI monitors energy consumption patterns and automatically adjusts HVAC, lighting, compressor, and machine scheduling to reduce energy costs by up to 20%.',
        points: ['Consumption pattern monitoring', 'HVAC & lighting control', 'Compressor scheduling', 'Up to 20% cost cut'] },
      { name: 'Worker Safety Monitoring', image: '/images/business-intelligence.webp',
        desc: 'Computer vision monitors PPE compliance, proximity to hazardous zones, and ergonomic risks in real-time — alerting supervisors before incidents occur.',
        points: ['PPE compliance checks', 'Hazard-zone proximity', 'Ergonomic risk alerts', 'Real-time supervisor alerts'] },
    ],
  },
  segments: {
    eyebrow: 'Manufacturing Sectors We Serve',
    heading: 'Purpose-built for every manufacturing sector',
    items: [
      { name: 'Automotive' },
      { name: 'Pharma & Life Sciences' },
      { name: 'Food & Beverage' },
      { name: 'Electronics' },
      { name: 'Textiles & Apparel' },
      { name: 'Heavy Industry' },
      { name: 'Chemicals' },
      { name: 'Consumer Goods' },
    ],
  },
  process: {
    eyebrow: 'How We Deploy Industrial AI',
    heading: 'A phased rollout that delivers value from week one',
    steps: [
      { no: '01', title: 'Assessment', text: 'Plant walk-through, data audit, and AI opportunity mapping across your lines' },
      { no: '02', title: 'Connectivity', text: 'IoT gateways installed, PLC/SCADA integrated, historical data ingested' },
      { no: '03', title: 'Model Training', text: 'AI trained on your specific equipment, defect types, and production patterns' },
      { no: '04', title: 'Pilot Line', text: 'Deploy on one line, validate accuracy and ROI before full rollout' },
      { no: '05', title: 'Plant Rollout', text: 'Scale to all lines with tuned models and trained operators' },
      { no: '06', title: 'Continuous Learning', text: 'AI improves with every cycle — accuracy and recommendations compound over time' },
    ],
  },
  proof: {
    eyebrow: 'Manufacturing Success Stories',
    heading: 'Factories that modernized with AI',
    items: [
      { tag: 'Bharat Auto Components', stat: '67% downtime reduction', text: 'Predictive maintenance AI monitored 340 assets and prevented 23 major breakdowns in year one, saving ₹8.4Cr in emergency repairs.', meta: '₹8.4Cr saved' },
      { tag: 'PharmaLine Industries', stat: '99.4% defect detection', text: 'Vision AI at 3 inspection stations reduced customer returns by 94% and eliminated a manual QC team of 12 inspectors.', meta: '94% fewer returns' },
      { tag: 'GreenTex Mills', stat: '20% energy cost reduction', text: 'AI optimized compressor scheduling and HVAC based on production load, saving ₹1.2Cr annually in energy costs.', meta: '₹1.2Cr/year saved' },
    ],
  },
  faq: {
    heading: 'Manufacturing AI — Questions Answered',
    items: [
      { q: 'Does this require replacing our existing equipment?', a: 'No. AI Agentix connects to your existing PLCs, SCADA systems, and ERP via IoT gateways and APIs. Most manufacturers go live without any capital equipment replacement.' },
      { q: 'How quickly can we see ROI from predictive maintenance?', a: 'Most manufacturers see positive ROI within 3-4 months. The first prevented breakdown event often pays for an entire year of the platform.' },
      { q: 'What ERPs and manufacturing systems do you support?', a: 'We integrate with SAP, Oracle Manufacturing, Microsoft Dynamics, Epicor, Infor, and all major ERP platforms via standard APIs and custom connectors.' },
      { q: 'Is the AI reliable enough for safety-critical applications?', a: 'Yes. Our safety monitoring AI has 99.2% detection accuracy and operates in real-time with under 200ms latency. All safety alerts are logged, audited, and never suppressed.' },
      { q: 'Can this work in multi-plant or multi-country environments?', a: 'Absolutely. AI Agentix supports multi-plant deployments with centralized dashboards, plant-specific configurations, and aggregated reporting across locations.' },
    ],
  },
  cta: {
    heading: 'Modernize Your Factory Floor',
    body: 'Join 150+ manufacturers using AI Agentix to reduce downtime, improve quality, and cut costs.',
    ctas: [
      { label: 'Schedule Assessment', to: '/contact', primary: true },
      { label: 'View All Features', to: '/solutions/manufacturing', primary: false },
    ],
  },
}
