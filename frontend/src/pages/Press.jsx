import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaTrophy,
  FaNewspaper,
  FaDownload,
  FaEnvelope,
  FaStar,
  FaAward,
} from 'react-icons/fa6';

const AWARDS = [
  { year: '2025', title: 'AI Innovation Award', body: 'European AI Excellence Awards', category: 'Best Enterprise AI Solution' },
  { year: '2025', title: 'Top AI Consultancy', body: 'Clutch.co Global Awards', category: 'UK & Europe' },
  { year: '2024', title: 'Fastest Growing AI Company', body: 'Deloitte Technology Fast 50', category: 'UK' },
  { year: '2024', title: 'Best AI Deployment', body: 'AI Summit London', category: 'Manufacturing Sector' },
  { year: '2024', title: 'Partner of the Year', body: 'Microsoft AI Partner Network', category: 'SME Category' },
  { year: '2023', title: 'Top MLOps Provider', body: 'Analytics Insight Magazine', category: 'Global 50 List' },
];

const PRESS = [
  {
    outlet: 'Forbes',
    date: 'March 2025',
    headline: 'How AI Agentix is Redefining Enterprise Automation with Agentic AI',
    excerpt: 'The London-based consultancy has built a reputation for delivering production-grade AI systems where others stall at proof-of-concept.',
  },
  {
    outlet: 'VentureBeat',
    date: 'January 2025',
    headline: 'Inside the RAG Revolution: AI Agentix Shares What Actually Works',
    excerpt: 'A frank conversation with the team that has shipped more than 40 RAG deployments in the past 18 months.',
  },
  {
    outlet: 'The Times',
    date: 'November 2024',
    headline: 'British AI Firms Lead the Charge in Industrial Automation',
    excerpt: 'AI Agentix features among the UK startups transforming manufacturing and logistics with practical machine learning.',
  },
  {
    outlet: 'TechCrunch',
    date: 'September 2024',
    headline: 'ContextClue: The Knowledge Management Tool Engineering Teams Actually Use',
    excerpt: 'AI Agentix launches its second product, bringing semantic search to the CAD-heavy world of industrial engineering.',
  },
];

const PUBLICATIONS = ['Forbes', 'VentureBeat', 'The Times', 'TechCrunch', 'Analytics Insight'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Press() {
  const { ref: logosRef, inView: logosInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: awardsRef, inView: awardsInView } = useInView({ threshold: 0.05, triggerOnce: true });
  const { ref: pressRef, inView: pressInView } = useInView({ threshold: 0.05, triggerOnce: true });
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A1628' }}>
      <Helmet>
        <title>Press & Recognition — AI Agentix</title>
        <meta name="description" content="AI Agentix press coverage, industry awards, and recognition for enterprise AI innovation." />
      </Helmet>

      {/* ── HERO ── */}
      <section className="pt-[140px] pb-20 px-6 md:px-12" style={{ backgroundColor: '#0A1628' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0)}>
              <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-5">
                In The News
              </p>
              <h1
                className="font-display font-black text-white leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.03em' }}
              >
                Press &amp;{' '}
                <span className="text-[#F26522]">Recognition</span>
              </h1>
              <div className="w-12 h-1 bg-[#F26522] rounded-full mb-6" />
              <p className="text-[17px] text-[#94A3B8] leading-relaxed max-w-lg">
                Industry awards, editorial features, and analyst recognition for AI Agentix's work building enterprise-grade artificial intelligence that ships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              {[
                { value: '6', label: 'Awards Won' },
                { value: '4+', label: 'Press Features' },
                { value: '3 Yrs', label: 'Track Record' },
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

      {/* ── PRESS LOGOS STRIP ── */}
      <section ref={logosRef} className="bg-white border-b border-[#e5e5e5] py-8 px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <p className="text-center text-[11px] uppercase tracking-widest text-[#999] font-semibold mb-7">
            As Featured In
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PUBLICATIONS.map((name, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={logosInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="inline-block border border-[#e5e5e5] px-6 py-3 font-bold text-[#0D1E3A] text-lg rounded-full hover:border-[#F26522] hover:text-[#F26522] transition-colors cursor-default"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS GRID ── */}
      <section ref={awardsRef} className="bg-[#f7f7f5] py-20 px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={awardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
              Awards &amp; Recognition
            </p>
            <h2
              className="font-display font-black text-[#0D1E3A] leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.025em' }}
            >
              Built to Win. Recognised for It.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AWARDS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={awardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border border-[#e5e5e5] rounded-xl p-8 hover:border-[#F26522] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0D1E3A] text-white">
                    {a.year}
                  </span>
                  <FaTrophy className="text-[#F26522] text-[22px] group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-[18px] font-display font-bold text-[#0D1E3A] mb-2 group-hover:text-[#F26522] transition-colors leading-snug">
                  {a.title}
                </h3>
                <p className="text-[13px] font-semibold text-[#F26522] mb-1">{a.body}</p>
                <p className="text-[12px] text-[#888] uppercase tracking-wide">{a.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRESS ARTICLES ── */}
      <section ref={pressRef} className="bg-white py-20 px-6 md:px-12">
        <div className="max-w-[1240px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={pressInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
              Media Coverage
            </p>
            <h2
              className="font-display font-black text-[#0D1E3A] leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.025em' }}
            >
              What the Press Is Saying
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0 divide-y divide-[#e5e5e5]">
            {PRESS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={pressInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group py-8 pl-0 hover:pl-4 border-l-4 border-l-transparent hover:border-l-[#F26522] transition-all duration-300"
              >
                <div className="flex items-start gap-8">
                  <div className="w-[120px] flex-shrink-0 pt-1">
                    <span className="block text-[15px] font-display font-black text-[#0D1E3A] group-hover:text-[#F26522] transition-colors">
                      {p.outlet}
                    </span>
                    <span className="block text-[11px] text-[#aaa] mt-1 uppercase tracking-wide">
                      {p.date}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[17px] font-display font-bold text-[#0D1E3A] mb-2 leading-snug group-hover:text-[#F26522] transition-colors">
                      {p.headline}
                    </h3>
                    <p className="text-[14px] text-[#666] leading-relaxed mb-3">{p.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F26522] group-hover:gap-3 transition-all">
                      Read article →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDIA KIT CTA ── */}
      <section ref={ctaRef} className="py-16 px-6 md:px-12" style={{ backgroundColor: '#0D1E3A' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
                For Journalists &amp; Analysts
              </p>
              <h2
                className="font-display font-black text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', letterSpacing: '-0.02em' }}
              >
                Media Enquiries
              </h2>
              <p className="text-[15px] text-[#94A3B8] max-w-md leading-relaxed">
                For press requests, interviews, speaking opportunities, or to download our brand and media assets, reach out to our communications team.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
            >
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0D1E3A] font-display font-bold rounded-lg hover:bg-[#f0f0f0] transition-colors text-[15px]">
                <FaDownload className="text-[14px]" />
                Download Media Kit
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#F26522] text-white font-display font-bold rounded-lg hover:bg-[#FF7A3D] transition-colors text-[15px]"
              >
                <FaEnvelope className="text-[14px]" />
                Contact PR Team
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
