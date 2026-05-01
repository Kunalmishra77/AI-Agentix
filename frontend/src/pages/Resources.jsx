import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaBookOpen,
  FaFileLines,
  FaBook,
  FaArrowRight,
  FaLock,
  FaRotate,
  FaInfinity,
  FaDatabase,
} from 'react-icons/fa6';

const RESOURCES = [
  {
    type: 'Guide',
    category: 'AI Strategy',
    title: 'The 2026 Enterprise AI Readiness Guide',
    desc: 'Everything you need to assess and accelerate your AI maturity — from data infrastructure to organisational change.',
    pages: '48 pages',
  },
  {
    type: 'Whitepaper',
    category: 'Agentic AI',
    title: 'Agentic AI: From Hype to Production',
    desc: 'A technical deep-dive into building reliable AI agent systems that operate autonomously in enterprise environments.',
    pages: '32 pages',
  },
  {
    type: 'Ebook',
    category: 'n8n Automation',
    title: 'n8n Automation Playbook for Agencies',
    desc: 'The definitive guide to building agency-grade n8n workflows — architecture, error handling, and scaling to 200+ nodes.',
    pages: '60 pages',
  },
  {
    type: 'Guide',
    category: 'RAG & LLM',
    title: 'RAG in Production: What Actually Works',
    desc: 'The failure patterns behind 80% of RAG deployments — and the engineering practices that put you in the successful 20%.',
    pages: '36 pages',
  },
  {
    type: 'Whitepaper',
    category: 'MLOps',
    title: 'MLOps Maturity Model for Enterprises',
    desc: 'A framework for assessing and advancing your ML engineering practices from experimentation to reliable production.',
    pages: '28 pages',
  },
  {
    type: 'Ebook',
    category: 'Data Engineering',
    title: 'Building AI-Ready Data Platforms',
    desc: 'Lakehouse architectures, real-time pipelines, and data governance patterns that support production AI at scale.',
    pages: '52 pages',
  },
];

const FILTERS = ['All', 'Guide', 'Whitepaper', 'Ebook'];

const TYPE_BAR = {
  Guide: 'bg-[#38BDF8]',
  Whitepaper: 'bg-purple-400',
  Ebook: 'bg-emerald-400',
};

const TYPE_BADGE = {
  Guide: 'bg-blue-50 text-blue-700 border border-blue-200',
  Whitepaper: 'bg-purple-50 text-purple-700 border border-purple-200',
  Ebook: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

const TYPE_ICON = {
  Guide: FaBookOpen,
  Whitepaper: FaFileLines,
  Ebook: FaBook,
};

const STATS = [
  { icon: FaBookOpen, value: '6', label: 'Free Resources' },
  { icon: FaDatabase, value: '250+', label: 'Pages of Content' },
  { icon: FaRotate, value: 'Monthly', label: 'Updates' },
  { icon: FaLock, value: 'Zero', label: 'Gating' },
];

export default function Resources() {
  const [activeFilter, setActiveFilter] = useState('All');

  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.05, triggerOnce: true });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered =
    activeFilter === 'All'
      ? RESOURCES
      : RESOURCES.filter((r) => r.type === activeFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      <Helmet>
        <title>Resources & Knowledge Hub — AI Agentix</title>
        <meta
          name="description"
          content="Free AI guides, whitepapers, and ebooks from the AI Agentix team — practical knowledge for enterprise AI teams."
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
                Free Resources
              </p>
              <h1
                className="font-display font-black text-white leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em' }}
              >
                Knowledge{' '}
                <span className="text-[#38BDF8]">Hub</span>
              </h1>
              <div className="w-12 h-1 bg-[#F26522] rounded-full mb-6" />
              <p className="text-[17px] text-[#94A3B8] leading-relaxed max-w-lg">
                Practical guides, whitepapers, and ebooks from our engineering and strategy teams — always free, never gated.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {[
                { value: '6', label: 'Free Resources' },
                { value: '250+', label: 'Pages of Content' },
                { value: 'Always Free', label: 'Zero Gating' },
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
                    className="font-display font-black text-[#38BDF8] leading-none"
                    style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}
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

      {/* ── FILTER BAR ── */}
      <div className="bg-white border-b border-[#e5e5e5] py-4 px-6 md:px-12 sticky top-[72px] z-10">
        <div className="max-w-[1240px] mx-auto flex items-center gap-3 flex-wrap">
          <span className="text-[12px] text-[#999] font-semibold uppercase tracking-widest mr-2">Filter:</span>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-[#F26522] text-white shadow-sm'
                  : 'border border-[#e5e5e5] text-[#555] hover:border-[#F26522] hover:text-[#F26522]'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[12px] text-[#aaa]">
            {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── RESOURCES GRID ── */}
      <section ref={gridRef} className="py-20 px-6 md:px-12 bg-[#f7f7f5]">
        <div className="max-w-[1240px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((r, i) => {
                const Icon = TYPE_ICON[r.type];
                return (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:border-[#F26522] hover:shadow-xl hover:scale-[1.015] transition-all duration-300 group flex flex-col"
                  >
                    <div className={`h-1.5 w-full ${TYPE_BAR[r.type]}`} />
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${TYPE_BADGE[r.type]}`}>
                          <Icon className="text-[10px]" />
                          {r.type}
                        </span>
                        <span className="text-[12px] text-[#aaa] font-medium">{r.pages}</span>
                      </div>
                      <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
                        {r.category}
                      </p>
                      <h3 className="text-[17px] font-display font-bold text-[#0D1E3A] leading-snug mb-3 group-hover:text-[#F26522] transition-colors flex-1">
                        {r.title}
                      </h3>
                      <p className="text-[13px] text-[#666] leading-relaxed mb-6">{r.desc}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#F26522] group-hover:gap-3 transition-all"
                        >
                          Download Free
                          <FaArrowRight className="text-[11px]" />
                        </Link>
                        <span className="text-[11px] text-[#bbb] font-medium px-2 py-1 bg-[#f7f7f5] rounded">
                          {r.pages}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section ref={statsRef} className="py-12 px-6 md:px-12" style={{ backgroundColor: '#0D1E3A' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(242,101,34,0.15)' }}
                >
                  <s.icon className="text-[#F26522] text-[20px]" />
                </div>
                <span
                  className="font-display font-black text-white leading-none"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
                >
                  {s.value}
                </span>
                <span className="text-[13px] text-[#94A3B8] font-medium">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="bg-[#F26522] py-16 px-6 md:px-12">
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
              Want a custom briefing?
            </h2>
            <p className="text-white/80 text-[15px] max-w-md leading-relaxed">
              Our team will walk you through the content most relevant to your use case.
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
              Schedule a Briefing
              <FaArrowRight className="text-[13px]" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
