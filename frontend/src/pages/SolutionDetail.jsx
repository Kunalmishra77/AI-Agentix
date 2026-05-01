import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SOLUTIONS = {
  'document-processing': {
    title: 'AI Document Processing',
    tagline: 'Transform unstructured documents into structured intelligence',
    description:
      'Extract, classify, and act on data from any document — PDFs, contracts, invoices, forms — with AI accuracy that surpasses manual review.',
    features: [
      'Intelligent OCR & layout analysis',
      'Named entity extraction',
      'Contract clause detection',
      'Multi-language support',
      'Audit trail & compliance logging',
      'API-first integration',
    ],
    useCases: [
      'Legal contract review',
      'Invoice processing automation',
      'Medical records digitisation',
      'Compliance document analysis',
    ],
  },
  'knowledge-base': {
    title: 'AI-Powered Knowledge Base',
    tagline: "Make your organisation's knowledge instantly searchable and actionable",
    description:
      'Build an intelligent knowledge layer over your existing docs, wikis, and data sources — powered by RAG and semantic search for precise, cited answers.',
    features: [
      'Semantic vector search',
      'Multi-source ingestion (Confluence, Notion, SharePoint)',
      'Citation-grounded answers',
      'Role-based access control',
      'Continuous sync & indexing',
      'Slack / Teams integration',
    ],
    useCases: [
      'Employee self-service portals',
      'Customer support deflection',
      'Engineering knowledge management',
      'Onboarding acceleration',
    ],
  },
  'enterprise-genai': {
    title: 'Enterprise GenAI Platform',
    tagline: 'A governed, scalable generative AI platform for your entire organisation',
    description:
      'Deploy a secure, cost-controlled GenAI platform that gives every team access to LLM capabilities — with centralised governance, usage analytics, and enterprise SSO.',
    features: [
      'Multi-model routing (GPT-4, Claude, Gemini)',
      'Prompt library & version control',
      'Usage quotas & cost dashboards',
      'SSO & RBAC',
      'On-premise or private cloud deployment',
      'Audit logs & PII redaction',
    ],
    useCases: [
      'Enterprise-wide AI assistant',
      'Content generation at scale',
      'Code review & generation',
      'Data analysis automation',
    ],
  },
  'llm-solutions': {
    title: 'LLM-Based Solutions',
    tagline: 'Custom LLM applications built for your specific domain',
    description:
      'We design and deploy domain-specific LLM solutions — from fine-tuned models to RAG systems — that outperform generic AI on your business tasks.',
    features: [
      'Domain-specific fine-tuning',
      'RAG pipeline architecture',
      'Prompt engineering & optimisation',
      'Model evaluation frameworks',
      'Latency & cost optimisation',
      'Multi-turn conversation design',
    ],
    useCases: [
      'Legal research assistant',
      'Medical coding automation',
      'Financial report generation',
      'Technical documentation writer',
    ],
  },
  'computer-vision': {
    title: 'Computer Vision Solutions',
    tagline: 'Give your systems the ability to see, understand, and act',
    description:
      'We build computer vision systems that interpret visual data with human-like accuracy — for manufacturing quality control, retail compliance, and predictive maintenance.',
    features: [
      'Object detection & classification',
      'Defect detection & quality control',
      'Face & ID verification',
      'Video analytics & anomaly detection',
      'Edge deployment (NVIDIA, Raspberry Pi)',
      'Real-time inference pipelines',
    ],
    useCases: [
      'Manufacturing QC automation',
      'Retail shelf compliance',
      'Security & access control',
      'Medical imaging analysis',
    ],
  },
};

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = SOLUTIONS[slug];

  if (!solution) {
    return <Navigate to="/solutions/computer-vision" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{solution.title} — AI Agentix</title>
        <meta name="description" content={solution.description} />
        <link rel="canonical" href={`https://ai-agentix.com/solutions/${slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="pt-[120px] pb-20 px-12 bg-white border-b border-[#e5e5e5]">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4">
            Solution
          </p>
          <h1 className="text-[52px] font-display font-black text-[#0D1E3A] leading-[1.08] mb-4 max-w-3xl">
            {solution.title}
          </h1>
          <div className="w-14 h-[3px] bg-[#F26522] mb-6" />
          <p className="text-[20px] text-[#555] leading-relaxed max-w-2xl">
            {solution.tagline}
          </p>
        </div>
      </section>

      {/* Description */}
      <section className="py-20 px-12 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[18px] text-[#555] leading-relaxed max-w-2xl">
            {solution.description}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="pb-20 px-12 bg-white">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-8">
            What's included
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#e5e5e5]">
            {solution.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-6 border-b border-r border-[#e5e5e5]"
              >
                <span className="text-[#F26522] text-[18px] font-bold shrink-0 mt-0.5">→</span>
                <span className="text-[15px] text-[#0D1E3A] leading-snug">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-12 bg-[#f7f7f5]">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
            Use Cases
          </p>
          <h2 className="text-[32px] font-display font-black text-[#0D1E3A] mb-10">
            Where we apply this
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solution.useCases.map((uc, i) => (
              <div
                key={i}
                className="bg-white border-l-4 border-[#F26522] px-6 py-5 shadow-sm"
              >
                <p className="text-[16px] font-semibold text-[#0D1E3A]">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-12 bg-[#0D1E3A] text-center">
        <div className="max-w-[700px] mx-auto">
          <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4">
            Get started
          </p>
          <h2 className="text-[34px] font-display font-black text-white mb-6">
            Ready to implement {solution.title}?
          </h2>
          <p className="text-[16px] text-[#888] mb-10 leading-relaxed">
            Book a free discovery call with our AI engineers and get a tailored solution roadmap.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-[#F26522] text-white font-semibold hover:bg-[#FF7A3D] transition-colors"
          >
            Book a Free Consultation →
          </Link>
        </div>
      </section>
    </div>
  );
}
