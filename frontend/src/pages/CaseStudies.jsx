import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { fetchCaseStudies } from '../lib/api.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaChartLine, FaBriefcase } from 'react-icons/fa6';

const STATIC_STUDIES = [
  {
    _id: 'cs1', slug: '#', industry: 'Healthcare', featured: true,
    title: 'Clinical Documentation AI Eliminated 90% of Post-Visit Note Writing',
    result: 'An outpatient clinic deployed ambient NLP to auto-populate structured SOAP notes from patient conversations in real time, saving 2.5 hours per physician per day.',
    metrics: [{ value: '90%', label: 'Documentation time saved' }, { value: '2.5h', label: 'Saved per doctor/day' }],
    service: 'AI Document Processing',
    gradient: 'linear-gradient(135deg, #0D4A3A 0%, #0A2A20 100%)',
  },
  {
    _id: 'cs2', slug: '#', industry: 'Financial Services',
    title: 'Real-Time Fraud Detection Cut Losses by 61% for European Tier-1 Bank',
    result: 'We replaced a legacy rule engine with a graph neural network model processing 4M transactions daily at under 80ms latency — fraud losses dropped 61% in 6 months.',
    metrics: [{ value: '61%', label: 'Fraud loss reduction' }, { value: '<80ms', label: 'Inference latency' }],
    service: 'ML Engineering',
    gradient: 'linear-gradient(135deg, #0A1F4A 0%, #0A1628 100%)',
  },
  {
    _id: 'cs3', slug: '#', industry: 'Retail',
    title: 'Personalization Engine Drove 41% Conversion Lift for Global Apparel Brand',
    result: 'Session-based transformer recommendations served to 15M monthly visitors, personalizing homepage and email in under 30ms per request.',
    metrics: [{ value: '41%', label: 'Conversion rate lift' }, { value: '$47M', label: 'Incremental revenue' }],
    service: 'AI Personalization',
    gradient: 'linear-gradient(135deg, #3A1A0A 0%, #2A1005 100%)',
  },
  {
    _id: 'cs4', slug: '#', industry: 'Manufacturing',
    title: 'Computer Vision Weld Inspection Achieved 0 Customer Escapes in 18 Months',
    result: 'CV models on edge GPUs replaced 12 manual inspection stations at a Tier-1 automotive supplier, detecting micro-cracks at production line speed.',
    metrics: [{ value: '99.2%', label: 'Defect detection rate' }, { value: '96%', label: 'Warranty reduction' }],
    service: 'Computer Vision',
    gradient: 'linear-gradient(135deg, #2A1A0A 0%, #1A0F05 100%)',
  },
  {
    _id: 'cs5', slug: '#', industry: 'Legal',
    title: 'Contract Review AI Processes 10× More Documents with 99.4% Clause Accuracy',
    result: 'NLP extraction and risk flagging on enterprise contract portfolios cut review time by 68% while improving accuracy — deployed for a global law firm in 8 weeks.',
    metrics: [{ value: '68%', label: 'Faster review' }, { value: '10×', label: 'More docs per day' }],
    service: 'NLP & Document AI',
    gradient: 'linear-gradient(135deg, #1A0A3A 0%, #100520 100%)',
  },
  {
    _id: 'cs6', slug: '#', industry: 'Education',
    title: 'Dropout Prediction System Reduced First-Year Attrition by 44% at Online University',
    result: 'ML model on LMS, grade, and financial data triggered advisor alerts within 24 hours of risk flags — recovering $12M in retained tuition in two academic years.',
    metrics: [{ value: '44%', label: 'Dropout reduction' }, { value: '$12M', label: 'Tuition recovered' }],
    service: 'Predictive Analytics',
    gradient: 'linear-gradient(135deg, #0A1F3A 0%, #051020 100%)',
  },
];

const INDUSTRIES = ['All', 'Healthcare', 'Financial Services', 'Retail', 'Manufacturing', 'Legal', 'Education'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function FeaturedStudy({ cs }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] overflow-hidden rounded-2xl border border-[#1A3050] group hover:border-[#F26522]/40 transition-all duration-300">
        {/* Left — visual panel */}
        <div
          className="relative min-h-[320px] flex flex-col justify-between p-10 overflow-hidden"
          style={{ background: cs.gradient }}
        >
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          <div className="relative z-10">
            <span className="inline-block text-[10px] uppercase tracking-widest bg-white/15 text-white font-bold px-3 py-1.5 rounded-full mb-3">
              Featured Case Study
            </span>
            <p className="text-white/60 text-[12px] uppercase tracking-wider">{cs.industry}</p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-4 mt-auto">
            {cs.metrics?.map((m, i) => (
              <div key={i} className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
                <p className="text-[26px] font-display font-black text-[#F26522] leading-none">{m.value}</p>
                <p className="text-[10px] text-white/60 mt-0.5 uppercase tracking-wide">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — content */}
        <div className="bg-[#0D1E3A] p-10 flex flex-col justify-between">
          <div>
            <span className="inline-block text-[10px] uppercase tracking-widest bg-[#F26522]/15 text-[#F26522] font-bold px-3 py-1.5 rounded-full mb-5">
              {cs.service}
            </span>
            <h2 className="font-display font-black text-white text-[1.5rem] leading-snug mb-4 group-hover:text-[#F26522] transition-colors">
              {cs.title}
            </h2>
            <p className="text-[#5A7090] text-[14px] leading-relaxed">
              {cs.result?.slice(0, 180)}{cs.result?.length > 180 ? '…' : ''}
            </p>
          </div>
          <div className="mt-8 flex items-center gap-2 text-[#F26522] font-semibold text-[14px] group-hover:gap-4 transition-all">
            Read full case study <FaArrowRight size={13} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StudyCard({ cs, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <div className="flex flex-col h-full rounded-xl border border-[#1A3050] bg-[#0D1E3A] overflow-hidden group hover:border-[#F26522]/40 hover:-translate-y-1 transition-all duration-300">
        {/* Top gradient accent */}
        <div className="h-1.5 w-full" style={{ background: cs.gradient || 'linear-gradient(90deg, #F26522, #38BDF8)' }} />

        <div className="p-8 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <span className="inline-block text-[10px] uppercase tracking-widest text-[#F26522] font-semibold bg-[#F26522]/10 px-2.5 py-1 rounded">
              {cs.industry}
            </span>
            {cs.service && (
              <span className="flex items-center gap-1.5 text-[11px] text-[#3D5470]">
                <FaBriefcase size={9} /> {cs.service}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-display font-bold text-white leading-snug mb-3 group-hover:text-[#F26522] transition-colors flex-1">
            {cs.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[13px] text-[#4A6080] leading-relaxed mb-6">
            {(cs.result || '').slice(0, 120)}{(cs.result || '').length > 120 ? '…' : ''}
          </p>

          {/* Metrics */}
          {cs.metrics?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-[#1A3050]">
              {cs.metrics.slice(0, 2).map((m, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <FaChartLine size={10} className="text-[#F26522]" />
                  <span className="text-[13px] font-display font-black text-[#F26522]">{m.value}</span>
                  <span className="text-[11px] text-[#3D5470]">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudies() {
  const [activeIndustry, setActiveIndustry] = useState('All');
  const { data: apiStudies = [], isLoading } = useQuery({
    queryKey: ['allCaseStudies'],
    queryFn: fetchCaseStudies,
  });
  const allStudies = apiStudies.length > 0 ? apiStudies : STATIC_STUDIES;

  const featuredStudy = allStudies.find(s => s.featured) || allStudies[0];
  const filtered = activeIndustry === 'All'
    ? allStudies.filter(s => s._id !== featuredStudy?._id)
    : allStudies.filter(s => s.industry === activeIndustry && s._id !== featuredStudy?._id);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>Case Studies — AI Agentix Results</title>
        <meta name="description" content="Real results from AI Agentix projects: autonomous agents, n8n automation, LLM integrations. See how we deliver 3.9× ROI for enterprise clients." />
        <link rel="canonical" href="https://ai-agentix.com/case-studies" />
      </Helmet>

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative border-b border-[#1A3050] overflow-hidden" style={{ paddingTop: '140px', paddingBottom: '60px' }}>
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, #F26522 0%, transparent 70%)' }}
        />

        <div className="max-w-[1240px] mx-auto px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[11px] uppercase tracking-widest text-[#F26522] font-bold mb-4 inline-block">
              Client Results
            </span>
            <h1 className="font-display font-black text-white leading-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}>
              Proof in the <span style={{ color: '#F26522' }}>Numbers</span>
            </h1>
            <div className="w-12 h-1 bg-[#F26522] rounded-full mb-5" />
            <p className="text-[#7A8FA6] text-lg max-w-xl leading-relaxed">
              Real AI systems. Real production deployments. Measurable outcomes across healthcare, finance, manufacturing, retail, and beyond.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-12 border border-[#1A3050] rounded-xl overflow-hidden"
          >
            {[
              { value: '50+', label: 'Projects delivered' },
              { value: '3.9×', label: 'Average ROI' },
              { value: '30+', label: 'Industries served' },
              { value: '92%', label: 'Client retention' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-[#0D1E3A] py-6 px-8 text-center border-r border-[#1A3050] last:border-r-0"
              >
                <p className="text-[28px] font-display font-black text-[#F26522]">{stat.value}</p>
                <p className="text-[11px] text-[#3D5470] mt-1 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRY FILTER ──────────────────── */}
      <div className="sticky top-[72px] z-10 bg-[#0A1628] border-b border-[#1A3050]">
        <div className="max-w-[1240px] mx-auto px-12 py-4 flex gap-2 overflow-x-auto">
          {INDUSTRIES.map(ind => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wide transition-all duration-200"
              style={{
                background: activeIndustry === ind ? '#F26522' : 'transparent',
                color: activeIndustry === ind ? '#fff' : '#4A6080',
                border: activeIndustry === ind ? '1px solid #F26522' : '1px solid #1A3050',
              }}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED STUDY ───────────────────── */}
      {featuredStudy && activeIndustry === 'All' && (
        <section className="max-w-[1240px] mx-auto px-12 pt-14 pb-10">
          <p className="text-[11px] uppercase tracking-widest text-[#3D5470] font-semibold mb-6">Featured</p>
          <FeaturedStudy cs={featuredStudy} />
        </section>
      )}

      {/* ── GRID ─────────────────────────────── */}
      <section className="max-w-[1240px] mx-auto px-12 pb-20" style={{ paddingTop: activeIndustry === 'All' ? '0' : '48px' }}>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border border-[#1A3050] bg-[#0D1E3A] h-64 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#4A6080] text-[16px]">No case studies in this industry yet.</p>
            <button onClick={() => setActiveIndustry('All')} className="mt-4 text-[#F26522] font-semibold text-[14px] hover:underline">
              View all case studies →
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((cs, i) => (
                <StudyCard key={cs._id} cs={cs} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="border-t border-[#1A3050] py-20" style={{ background: 'linear-gradient(135deg, #F26522 0%, #C93D00 100%)' }}>
        <div className="max-w-[1240px] mx-auto px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-black text-white text-3xl mb-3">Want to be our next success story?</h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">Let's talk about what AI can do for your business.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-white text-[#F26522] font-bold px-8 py-4 rounded-lg hover:bg-[#0D1E3A] hover:text-white transition-all text-[15px]"
            >
              Start a conversation <FaArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
