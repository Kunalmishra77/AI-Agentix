import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaArrowRight,
  FaMagnifyingGlass,
  FaCompassDrafting,
  FaHammer,
  FaRocket,
  FaChevronRight,
} from 'react-icons/fa6';

const USE_CASES = [
  {
    industry: 'Legal',
    title: 'Contract Review AI',
    desc: 'Automatically extract clauses, flag risk indicators, and compare contract terms against company standards — cutting review time by 68% while improving accuracy.',
    outcomes: ['68% faster review', '99.4% clause extraction accuracy', '10× more docs per day'],
  },
  {
    industry: 'Manufacturing',
    title: 'Predictive Maintenance',
    desc: 'ML models trained on sensor telemetry predict equipment failures days in advance, enabling scheduled maintenance that eliminates costly unplanned downtime.',
    outcomes: ['28% less downtime', '91% failure prediction accuracy', '3.1× OEE improvement'],
  },
  {
    industry: 'Finance',
    title: 'Real-Time Fraud Detection',
    desc: 'Sub-second graph-based fraud scoring on every transaction — combining transaction patterns, device fingerprinting, and behavioural signals to catch fraud before it lands.',
    outcomes: ['<300ms latency', '78% fewer false positives', '99.2% detection rate'],
  },
  {
    industry: 'Retail',
    title: 'AI Demand Forecasting',
    desc: 'ML demand models trained on sales history, promotions, seasonality, and external signals produce store-level SKU forecasts that reduce overstock and eliminate stockouts.',
    outcomes: ['18% overstock reduction', '23% fewer stockouts', '2.8× conversion uplift'],
  },
  {
    industry: 'Healthcare',
    title: 'Clinical Document Processing',
    desc: 'Automatically classify, extract, and route clinical documents — medical records, pathology reports, discharge summaries — with the accuracy required for regulated environments.',
    outcomes: ['55% faster processing', '99.7% accuracy', '4× QA test coverage'],
  },
  {
    industry: 'Enterprise',
    title: 'AI Customer Support Bot',
    desc: 'RAG-powered conversational AI trained on your knowledge base resolves 60%+ of support tickets without human intervention — escalating only when confidence is low.',
    outcomes: ['60% ticket deflection', '<2s average response', '4.8/5 CSAT score'],
  },
  {
    industry: 'Manufacturing',
    title: 'Visual Quality Control',
    desc: 'Computer vision models deployed at the production line inspect components in real time — detecting surface defects, dimensional errors, and assembly mistakes at line speed.',
    outcomes: ['91% defect detection', '0.3s inspection cycle', '40% QC cost reduction'],
  },
  {
    industry: 'Engineering',
    title: 'Knowledge Base RAG',
    desc: 'Semantic search and retrieval-augmented generation over engineering documentation — CAD files, ERP records, SOPs — gives engineers instant cited answers without hunting through systems.',
    outcomes: ['85% query accuracy', '60% less time searching', '3× faster onboarding'],
  },
];

const FILTERS = ['All', 'Legal', 'Manufacturing', 'Finance', 'Retail', 'Healthcare', 'Enterprise', 'Engineering'];

const PROCESS_STEPS = [
  {
    number: '01',
    icon: FaMagnifyingGlass,
    title: 'Discovery',
    desc: 'Deep-dive into your workflows, data assets, and success criteria.',
  },
  {
    number: '02',
    icon: FaCompassDrafting,
    title: 'Architecture',
    desc: 'Design the system: models, pipelines, integrations, and infra.',
  },
  {
    number: '03',
    icon: FaHammer,
    title: 'Build',
    desc: 'Iterative development with continuous validation against real data.',
  },
  {
    number: '04',
    icon: FaRocket,
    title: 'Deploy',
    desc: 'Production launch with monitoring, alerting, and handover.',
  },
];

export default function UseCases() {
  const [activeFilter, setActiveFilter] = useState('All');

  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.05, triggerOnce: true });
  const { ref: processRef, inView: processInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered =
    activeFilter === 'All'
      ? USE_CASES
      : USE_CASES.filter((uc) => uc.industry === activeFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      <Helmet>
        <title>AI Use Cases — AI Agentix</title>
        <meta
          name="description"
          content="Real-world AI use cases across legal, finance, manufacturing, healthcare and retail — built and deployed by AI Agentix."
        />
      </Helmet>

      {/* ── HERO ── */}
      <section className="pt-[140px] pb-20 px-6 md:px-12" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-5">
                Use Cases
              </p>
              <h1
                className="font-display font-black text-white leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', letterSpacing: '-0.03em' }}
              >
                AI That Works in{' '}
                <span className="text-[#F26522]">the Real World</span>
              </h1>
              <div className="w-12 h-1 bg-[#F26522] rounded-full mb-6" />
              <p className="text-[17px] text-[#94A3B8] leading-relaxed max-w-lg">
                Concrete examples of AI systems we've designed, built, and deployed for enterprise clients — with real, measurable outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {[
                { value: '8', label: 'Industries Served' },
                { value: '50+', label: 'Live Deployments' },
                { value: 'Real', label: 'Measurable Results' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-5 rounded-xl p-5 border"
                  style={{ backgroundColor: '#0D1E3A', borderColor: '#1A3050' }}
                >
                  <span
                    className="font-display font-black text-[#F26522] leading-none"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[15px] font-semibold text-white">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <div className="bg-white border-b border-[#e5e5e5] py-4 px-6 md:px-12 sticky top-[72px] z-10">
        <div className="max-w-[1240px] mx-auto overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap ${
                  activeFilter === f
                    ? 'bg-[#F26522] text-white shadow-sm'
                    : 'border border-[#e5e5e5] text-[#555] hover:border-[#F26522] hover:text-[#F26522]'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-4 text-[12px] text-[#aaa]">
              {filtered.length} use case{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── USE CASES GRID ── */}
      <section ref={gridRef} className="bg-[#f7f7f5] py-20 px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white border border-[#e5e5e5] rounded-xl p-8 hover:border-[#F26522] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                >
                  <div className="mb-5">
                    <span className="inline-block px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#F26522] text-white">
                      {uc.industry}
                    </span>
                  </div>

                  <h3
                    className="font-display font-bold text-[#0D1E3A] mb-3 group-hover:text-[#F26522] transition-colors leading-snug"
                    style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)' }}
                  >
                    {uc.title}
                  </h3>
                  <p className="text-[14px] text-[#666] leading-relaxed mb-6 flex-1">{uc.desc}</p>

                  <div className="flex flex-col gap-2 mb-6">
                    {uc.outcomes.map((o, j) => (
                      <span
                        key={j}
                        className="border-l-2 border-[#F26522] pl-3 bg-white text-[#0D1E3A] text-[12px] font-bold py-1"
                      >
                        {o}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#f0f0f0]">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#F26522] group-hover:gap-3 transition-all"
                    >
                      Explore this use case
                      <FaArrowRight className="text-[11px]" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section ref={processRef} className="py-20 px-6 md:px-12" style={{ backgroundColor: '#0D1E3A' }}>
        <div className="max-w-[1240px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
              Our Methodology
            </p>
            <h2
              className="font-display font-black text-white leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.025em' }}
            >
              How We Approach Every Use Case
            </h2>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* dashed connector line on desktop */}
            <div
              className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] border-t-2 border-dashed pointer-events-none"
              style={{ borderColor: '#1A3050', zIndex: 0 }}
            />

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 border-2 border-[#1A3050]"
                  style={{ backgroundColor: '#0A1628' }}
                >
                  <step.icon className="text-[#F26522] text-[24px]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F26522] mb-1">
                  {step.number}
                </span>
                <h3 className="text-[17px] font-display font-bold text-white mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed">{step.desc}</p>

                {i < PROCESS_STEPS.length - 1 && (
                  <FaChevronRight className="md:hidden text-[#1A3050] text-[20px] mt-4" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        ref={ctaRef}
        className="py-16 px-6 md:px-12 bg-gradient-to-r from-[#F26522] to-[#C93D00]"
      >
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="font-display font-black text-white leading-tight mb-3"
              style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', letterSpacing: '-0.02em' }}
            >
              Have a use case in mind?
            </h2>
            <p className="text-white/80 text-[15px] max-w-md leading-relaxed">
              Tell us your challenge — we'll design the solution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#F26522] font-display font-bold rounded-lg hover:bg-[#fff8f5] transition-colors text-[15px]"
            >
              Start the Conversation
              <FaArrowRight className="text-[13px]" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
