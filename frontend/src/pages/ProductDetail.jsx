import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PRODUCTS = {
  contextclue: {
    title: 'ContextClue',
    tagline: 'AI-Driven Knowledge Management for Engineering & Industrial Teams',
    description: 'ContextClue transforms how engineering organisations manage knowledge — connecting CAD files, ERP data, planning exports, and technical documents into a single intelligent knowledge graph that answers questions with precision and citations.',
    badge: 'Knowledge Management',
    features: [
      'Semantic search across all engineering formats (CAD, PDF, XLSX)',
      'CAD & ERP data ingestion and parsing',
      'Knowledge graph construction & visualisation',
      'Role-based access & governance policies',
      'Real-time sync & automatic versioning',
      'REST API and webhook integration',
    ],
    steps: [
      { n: '01', title: 'Connect your data sources', desc: 'Plug in SharePoint, Confluence, ERP systems, file servers, or any API in minutes.' },
      { n: '02', title: 'Build the knowledge graph', desc: 'ContextClue ingests, classifies, and links every document, drawing, and record into a semantic graph.' },
      { n: '03', title: 'Query with confidence', desc: 'Engineers ask in plain language and get precise, cited answers — not links to search through.' },
    ],
    metrics: [
      { value: '85%', label: 'Query accuracy' },
      { value: '60%', label: 'Less time searching' },
      { value: '3×', label: 'Faster onboarding' },
    ],
  },
  contextcheck: {
    title: 'ContextCheck',
    tagline: 'Automated AI Quality Assurance for Software Teams',
    description: 'ContextCheck brings AI to your QA pipeline — automatically generating test cases, detecting regressions, and providing intelligent coverage analysis so your engineering team ships with confidence every time.',
    badge: 'QA Automation',
    features: [
      'AI-generated test case suggestions from requirements',
      'Regression detection with ML baseline comparison',
      'Coverage gap analysis and risk scoring',
      'CI/CD integration (GitHub Actions, GitLab CI, Jenkins)',
      'Natural language test authoring interface',
      'Real-time dashboard & executive reporting',
    ],
    steps: [
      { n: '01', title: 'Connect your CI/CD pipeline', desc: 'ContextCheck integrates with any Git provider and CI system in under 30 minutes.' },
      { n: '02', title: 'Analyse your codebase', desc: 'The AI maps your code, existing tests, and requirements to identify risk and coverage gaps.' },
      { n: '03', title: 'Ship with confidence', desc: 'Every PR gets an AI risk score, suggested tests, and regression alerts before it merges.' },
    ],
    metrics: [
      { value: '<1%', label: 'Defect leakage' },
      { value: '4×', label: 'More test coverage' },
      { value: '70%', label: 'Less QA time' },
    ],
  },
};

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS[slug];

  if (!product) return <Navigate to="/products/contextclue" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{product.title} — AI Agentix Products</title>
        <meta name="description" content={product.description} />
      </Helmet>

      {/* Hero */}
      <div className="pt-[140px] pb-20 px-12 border-b border-[#e5e5e5]">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold uppercase tracking-widest border border-[#F26522] text-[#F26522] mb-6">
              {product.badge}
            </span>
            <h1 className="font-display font-black text-[#0D1E3A] mb-4 leading-tight"
                style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '-0.03em' }}>
              {product.title}
            </h1>
            <div className="w-16 h-1 bg-[#F26522] mb-6" />
            <p className="text-[20px] text-[#555] leading-relaxed mb-10 max-w-2xl">{product.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center px-8 py-3.5 bg-[#F26522] text-white font-display font-bold hover:bg-[#FF7A3D] transition-colors">
                Request a Demo →
              </Link>
              <Link to="/contact" className="inline-flex items-center px-8 py-3.5 border border-[#0D1E3A] text-[#0D1E3A] font-display font-bold hover:border-[#F26522] hover:text-[#F26522] transition-colors">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="bg-[#0D1E3A] px-12 py-12">
        <div className="max-w-[1240px] mx-auto grid grid-cols-3 divide-x divide-[#1A3050]">
          {product.metrics.map((m) => (
            <div key={m.label} className="px-10 py-8">
              <p className="text-[40px] font-display font-black text-[#F26522] leading-none mb-2">{m.value}</p>
              <p className="text-[13px] text-[#666] uppercase tracking-wider">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="px-12 py-20 border-b border-[#e5e5e5]">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[18px] text-[#444] leading-[1.8] max-w-2xl">{product.description}</p>
        </div>
      </div>

      {/* Features + How it works */}
      <div className="px-12 py-20 border-b border-[#e5e5e5]">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-8">Features</p>
            <div className="divide-y divide-[#e5e5e5]">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 py-4">
                  <span className="text-[#F26522] font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-[15px] text-[#333]">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-8">How it works</p>
            <div className="space-y-8">
              {product.steps.map((s) => (
                <div key={s.n} className="flex gap-6">
                  <span className="text-[32px] font-display font-black text-[#f0f0f0] leading-none w-12 flex-shrink-0">{s.n}</span>
                  <div>
                    <h3 className="text-[16px] font-display font-bold text-[#0D1E3A] mb-2">{s.title}</h3>
                    <p className="text-[14px] text-[#666] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-12 py-20 bg-[#f7f7f5]">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-[28px] font-display font-black text-[#0D1E3A] mb-2">Ready to try {product.title}?</h2>
            <p className="text-[#777] text-[15px]">Schedule a 30-minute demo with our product team.</p>
          </div>
          <Link to="/contact" className="flex-shrink-0 inline-flex items-center px-10 py-4 bg-[#F26522] text-white font-display font-bold hover:bg-[#FF7A3D] transition-colors text-[15px]">
            Request a Demo →
          </Link>
        </div>
      </div>
    </div>
  );
}
