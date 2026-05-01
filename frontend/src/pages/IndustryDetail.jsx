import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const INDUSTRIES = {
  aviation: {
    title: 'AI for Aviation & Aerospace',
    icon: '✈',
    tagline: 'Intelligent systems for safer, more efficient flight operations',
    description:
      'Aviation organisations trust AI Agentix to build intelligent systems for luggage tracking, stand assignment optimisation, passenger experience bots, and real-time operational analytics.',
    capabilities: [
      'Computer vision for baggage & security',
      'Predictive maintenance for aircraft',
      'Real-time operational dashboards',
      'AI passenger experience bots',
      'Digital twin simulations',
      'Stand & gate optimisation',
    ],
    stats: [
      { value: '34%', label: 'Reduction in gate turnaround time' },
      { value: '99.1%', label: 'Baggage tracking accuracy' },
      { value: '2.4×', label: 'Faster incident response with AI' },
    ],
  },
  manufacturing: {
    title: 'AI-Driven Manufacturing Intelligence',
    icon: '🏭',
    tagline: 'From factory floor data to intelligent decisions',
    description:
      'Manufacturers use our AI solutions for quality control, predictive maintenance, CAD standardisation, traceability, and supply chain optimisation.',
    capabilities: [
      'Visual quality control (CV)',
      'Predictive maintenance ML',
      'CAD file standardisation',
      'Supply chain AI',
      'OEE optimisation',
      'Defect classification',
    ],
    stats: [
      { value: '91%', label: 'Defect detection accuracy' },
      { value: '28%', label: 'Reduction in unplanned downtime' },
      { value: '3.1×', label: 'Improvement in OEE scores' },
    ],
  },
  automotive: {
    title: 'Connected Vehicle & Automotive AI',
    icon: '🚗',
    tagline: 'AI for OEMs, Tier-1 suppliers, and connected fleets',
    description:
      'From connected vehicle data platforms to agentic RAG for enterprise knowledge bases, we build AI systems that transform automotive operations and R&D workflows.',
    capabilities: [
      'Real-time telemetry platforms',
      'Fleet intelligence & analytics',
      'Agentic RAG for engineering docs',
      'Warranty claims ML',
      'ADAS data pipelines',
      'Digital twin for vehicle design',
    ],
    stats: [
      { value: '67%', label: 'Faster warranty claim resolution' },
      { value: '12M+', label: 'Vehicle telemetry events processed daily' },
      { value: '40%', label: 'Engineering doc search time saved' },
    ],
  },
  finance: {
    title: 'AI for Finance & Insurance',
    icon: '💰',
    tagline: 'Real-time fraud detection, compliance, and intelligent automation',
    description:
      'We build real-time fraud detection platforms, intelligent document verification systems, and compliance monitoring solutions for financial institutions.',
    capabilities: [
      'Real-time fraud detection (sub-second)',
      'REC validation automation',
      'Contract analysis AI (99.2% accuracy)',
      'AML transaction monitoring',
      'Intelligent document verification',
      'Regulatory reporting automation',
    ],
    stats: [
      { value: '99.2%', label: 'Contract analysis accuracy' },
      { value: '<300ms', label: 'Fraud detection latency' },
      { value: '78%', label: 'Reduction in false positives' },
    ],
  },
  healthcare: {
    title: 'Healthcare AI & Life Sciences',
    icon: '🏥',
    tagline: 'AI that accelerates clinical delivery and cuts operational cost',
    description:
      'We help healthcare organisations scale clinical trial delivery, modernise QA testing, automate clinical payment systems, and build data infrastructure for BI.',
    capabilities: [
      'Clinical trial data platforms',
      'AI-driven QA test automation',
      'Clinical payment automation',
      'BI & reporting infrastructure',
      'Medical record digitisation',
      'Regulatory compliance AI',
    ],
    stats: [
      { value: '55%', label: 'Faster clinical data processing' },
      { value: '4×', label: 'QA test coverage with AI automation' },
      { value: '99.7%', label: 'Payment processing accuracy' },
    ],
  },
  retail: {
    title: 'Retail AI & E-Commerce Automation',
    icon: '🛒',
    tagline: 'From shelf compliance to demand forecasting — AI that moves product',
    description:
      'Retailers use AI Agentix for AI-powered image quality detection, store compliance analysis, demand forecasting, and intelligent customer experience automation.',
    capabilities: [
      'Product image quality detection (CV)',
      'Store shelf compliance AI',
      'Demand forecasting ML',
      'Personalisation engines',
      'Inventory optimisation',
      'Customer experience automation',
    ],
    stats: [
      { value: '23%', label: 'Increase in shelf compliance scores' },
      { value: '18%', label: 'Reduction in overstock via AI forecasting' },
      { value: '2.8×', label: 'Uplift in personalised conversion rate' },
    ],
  },
  logistics: {
    title: 'Intelligent Logistics & Supply Chain',
    icon: '🚚',
    tagline: 'AI that unifies data and optimises every shipment',
    description:
      'Logistics operators leverage our AI for intermodal transportation data platforms, demand forecasting, and unified supply chain management.',
    capabilities: [
      'Intermodal data unification',
      'AI demand forecasting',
      'Route optimisation ML',
      'Real-time disruption management',
      'Inventory prediction',
      'Last-mile delivery AI',
    ],
    stats: [
      { value: '31%', label: 'Reduction in transportation costs' },
      { value: '94%', label: 'On-time delivery rate with AI routing' },
      { value: '5 data sources', label: 'Unified into a single platform' },
    ],
  },
  legal: {
    title: 'Legal AI & Document Intelligence',
    icon: '⚖',
    tagline: 'Cut review time by 68% with AI that reads contracts like a lawyer',
    description:
      'We build AI-driven document analysis, contract review, and compliance monitoring systems for law firms and legal departments.',
    capabilities: [
      'Contract clause extraction',
      'Risk indicator flagging',
      'Document classification',
      'Legal research AI',
      'Compliance monitoring',
      'eDiscovery automation',
    ],
    stats: [
      { value: '68%', label: 'Reduction in contract review time' },
      { value: '99.4%', label: 'Clause extraction accuracy' },
      { value: '10×', label: 'More documents reviewed per day' },
    ],
  },
};

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = INDUSTRIES[slug];

  if (!industry) {
    return <Navigate to="/industries/aviation" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{industry.title} — AI Agentix</title>
        <meta name="description" content={industry.description} />
        <link rel="canonical" href={`https://ai-agentix.com/industries/${slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="pt-[120px] pb-20 px-12 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1240px] mx-auto">
          <span className="text-[64px] leading-none block mb-6">{industry.icon}</span>
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4">
            Industry
          </p>
          <h1 className="text-[52px] font-display font-black text-[#0D1E3A] leading-[1.08] mb-4 max-w-3xl">
            {industry.title}
          </h1>
          <div className="w-14 h-[3px] bg-[#F26522] mb-6" />
          <p className="text-[20px] text-[#555] leading-relaxed max-w-2xl">
            {industry.tagline}
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 px-12 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[18px] text-[#555] leading-relaxed max-w-2xl">
            {industry.description}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-20 px-12 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-8">
            Capabilities
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#e5e5e5]">
            {industry.capabilities.map((cap, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 border-b border-r border-[#e5e5e5]"
              >
                <span className="text-[#F26522] text-[18px] font-bold shrink-0 mt-0.5">→</span>
                <span className="text-[15px] text-[#0D1E3A] leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-12 bg-[#0D1E3A]">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-10 text-center">
            Results we deliver
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {industry.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[48px] font-display font-black text-[#F26522] leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-[15px] text-[#888]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-12 bg-white text-center border-t border-[#e5e5e5]">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4">
            Work with us
          </p>
          <h2 className="text-[34px] font-display font-black text-[#0D1E3A] mb-6">
            Start your AI journey in {industry.title.split(' ').slice(-1)[0]}
          </h2>
          <p className="text-[16px] text-[#555] mb-10 leading-relaxed">
            Talk to our industry specialists and get a free assessment of your AI readiness.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-[#F26522] text-white font-semibold hover:bg-[#FF7A3D] transition-colors"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </div>
  );
}
