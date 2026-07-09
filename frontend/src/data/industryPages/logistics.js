// Logistics industry page — content verbatim from
// content-archive/pages/industries/logistics.md

export default {
  slug: 'logistics',
  meta: {
    title: 'AI for Logistics | AI Agentix',
    description: 'Route optimization, automated customer updates, and warehouse intelligence that cut costs, improve delivery performance, and delight customers.',
  },
  heroImage: '/AGENTIX-MEDIAS/leadcaptured.webp',
  hero: {
    eyebrow: 'AI for Logistics',
    heading: 'Move Smarter with Logistics AI',
    subheading: 'Route optimization, automated customer updates, and warehouse intelligence that cut costs, improve delivery performance, and delight customers.',
    ctas: [
      { label: 'Book a Demo', to: '/contact', primary: true },
      { label: 'Supply Chain Solutions', to: '/solutions/supply-chain', primary: false },
    ],
    tags: ['Route Optimization', 'Shipment Tracking', 'Warehouse Intelligence', 'Demand Forecasting', 'Freight Rates', 'Customer Updates'],
  },
  stats: [
    { value: '18%', label: 'Fuel Cost Reduction', sub: 'via route optimization' },
    { value: '65%', label: 'WISMO Calls Reduced', sub: '“where is my order” volume' },
    { value: '99.8%', label: 'Order Accuracy', sub: 'warehouse pick accuracy' },
    { value: '22%', label: 'Warehouse Cost Savings', sub: 'operating cost reduction' },
  ],
  solutions: {
    eyebrow: 'Complete Logistics AI Platform',
    heading: 'Six modules across every dimension of logistics',
    items: [
      { name: 'Route Optimization AI', image: '/AGENTIX-MEDIAS/progress-tracked.webp',
        desc: 'Dynamic routing engine processes real-time traffic, delivery windows, vehicle capacity, and driver schedules to generate optimal routes — reducing fuel costs by 18% and delivery time by 24%.',
        points: ['Real-time traffic routing', 'Delivery-window planning', 'Vehicle capacity balancing', '18% lower fuel cost'] },
      { name: 'Shipment Tracking Automation', image: '/AGENTIX-MEDIAS/calling.webp',
        desc: 'Proactive customer notifications at every milestone — dispatch, in-transit, out-for-delivery, delivered. Reduces "where is my order" calls by 65% with zero manual effort.',
        points: ['Milestone notifications', 'Dispatch to delivery updates', '65% fewer WISMO calls', 'Zero manual effort'] },
      { name: 'Warehouse Intelligence', image: '/AGENTIX-MEDIAS/CRM.webp',
        desc: 'AI-driven pick path optimization, slotting recommendations, and labor scheduling cut warehouse operating costs by 22% while improving order accuracy to 99.8%.',
        points: ['Pick path optimization', 'Slotting recommendations', 'Labor scheduling', '99.8% order accuracy'] },
      { name: 'Demand Forecasting', image: '/AGENTIX-MEDIAS/data analyst.webp',
        desc: 'Machine learning analyzes historical shipment data, seasonal patterns, and market signals to forecast demand with 94% accuracy — enabling optimal fleet and inventory positioning.',
        points: ['Historical shipment analysis', 'Seasonal pattern detection', '94% forecast accuracy', 'Optimal fleet positioning'] },
      { name: 'Freight Rate Automation', image: '/AGENTIX-MEDIAS/Amit-Renewal Agent.webp',
        desc: 'AI compares carrier rates in real-time, negotiates spot rates, and auto-selects the optimal carrier per shipment based on cost, transit time, and reliability scores.',
        points: ['Real-time rate comparison', 'Spot-rate negotiation', 'Optimal carrier selection', 'Reliability scoring'] },
      { name: 'Customer Communication Hub', image: '/AGENTIX-MEDIAS/MAILING.webp',
        desc: 'Automated updates across WhatsApp, SMS, and email. Handles delivery exceptions, rescheduling requests, and POD confirmations without dispatcher involvement.',
        points: ['WhatsApp, SMS & email', 'Delivery exception handling', 'Rescheduling requests', 'POD confirmations'] },
    ],
  },
  segments: {
    eyebrow: 'Built for Every Logistics Model',
    heading: 'From last-mile to cross-border freight',
    items: [
      { name: 'Last-Mile Delivery', desc: 'Route optimization and customer communication for B2C home delivery operations.' },
      { name: '3PL Operators', desc: 'Multi-client warehouse and distribution management with client-specific dashboards.' },
      { name: 'Express Freight', desc: 'Time-critical shipment management with real-time visibility and exception handling.' },
      { name: 'In-Plant Logistics', desc: 'Material movement, internal transfer, and dock scheduling automation.' },
      { name: 'Cross-Border', desc: 'Customs documentation automation and international freight coordination.' },
    ],
  },
  process: {
    eyebrow: 'AI-Driven Delivery Lifecycle',
    heading: 'Automation from order intake to proof of delivery',
    steps: [
      { no: '01', title: 'Order Intake', text: 'AI ingests orders from ERP, portal, or EDI — validates, classifies, and priorities automatically' },
      { no: '02', title: 'Load Planning', text: 'Optimal vehicle loading sequences generated considering weight, volume, and delivery sequence' },
      { no: '03', title: 'Route Generation', text: 'Dynamic routes calculated with real-time traffic, delivery windows, and fuel cost optimization' },
      { no: '04', title: 'In-Transit Updates', text: 'Customer notifications triggered at dispatch, transit, and pre-delivery milestones automatically' },
      { no: '05', title: 'Exception Handling', text: 'Failed deliveries, traffic delays, and customer changes handled automatically with rerouting' },
      { no: '06', title: 'POD & Settlement', text: 'Digital proof of delivery captured, invoices generated, and carrier payments processed automatically' },
    ],
  },
  proof: {
    eyebrow: 'Logistics Success Stories',
    heading: 'Fleets that cut costs with AI',
    items: [
      { tag: 'Swiftway Express', stat: '18% fuel cost reduction', text: 'Route optimization AI cut average delivery distance by 24% for a fleet of 380 vehicles — saving ₹6.2Cr annually in fuel alone.', meta: '₹6.2Cr/year saved' },
      { tag: 'StoreMart 3PL', stat: '65% fewer WISMO calls', text: 'Proactive WhatsApp notifications reduced inbound customer tracking calls from 800/day to under 280, saving 12 support FTEs.', meta: '12 FTEs saved' },
      { tag: 'FastFreight India', stat: '99.8% order accuracy', text: 'AI-guided pick paths and real-time barcode verification eliminated ₹1.8Cr in annual mis-ship costs and customer returns.', meta: '₹1.8Cr saved' },
    ],
  },
  faq: {
    heading: 'Logistics AI — Questions Answered',
    items: [
      { q: 'How does route optimization AI handle last-minute changes?', a: 'The AI recalculates routes in real-time when new orders arrive, deliveries fail, or traffic conditions change — dispatchers see updated routes on their dashboard instantly.' },
      { q: 'Which TMS and fleet management systems do you integrate with?', a: 'We integrate with SAP TM, Oracle TMS, Manhattan Associates, BluJay, Trimble, and most telematics platforms via APIs. Custom integrations available for proprietary systems.' },
      { q: 'Can it handle both B2B and B2C delivery models?', a: 'Yes. The platform handles express B2C last-mile, bulk B2B freight, and mixed fleets with different SLA rules, documentation requirements, and notification flows.' },
      { q: 'How does the freight rate AI avoid choosing unreliable carriers?', a: 'Carrier reliability scoring uses historical on-time performance, damage rates, and customer feedback alongside rate comparisons. Reliability weights are configurable per lane.' },
      { q: 'What visibility do customers and shippers get?', a: 'A branded tracking portal provides real-time GPS visibility, ETA updates, and proof of delivery photos. Embeddable on your website or accessible via direct link.' },
    ],
  },
  cta: {
    heading: 'Optimize Your Logistics Operations',
    body: 'Join 250+ logistics companies using AI Agentix to cut costs and improve delivery performance.',
    ctas: [
      { label: 'Get Started Today', to: '/contact', primary: true },
      { label: 'Talk to Sales', to: '/contact', primary: false },
    ],
  },
}
