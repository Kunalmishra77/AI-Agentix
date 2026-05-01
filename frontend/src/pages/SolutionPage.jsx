import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaCircleCheck, FaChevronDown, FaChevronUp, FaBolt } from 'react-icons/fa6';
import SOLUTIONS from '../data/solutions.js';
import Icon from '../utils/icons.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function SolutionPage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const solution = Array.isArray(SOLUTIONS)
    ? SOLUTIONS.find((s) => s.slug === slug)
    : null;

  if (!solution) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center text-center px-6">
        <div>
          <p className="text-[80px] font-display font-black text-[#1A3050] leading-none select-none">404</p>
          <h1 className="text-2xl font-display font-bold text-white mt-4 mb-2">Solution not found</h1>
          <p className="text-[#999] mb-6">The solution you're looking for doesn't exist or has moved.</p>
          <Link to="/" className="btn-accent">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{solution.title} — AI Agentix Solutions</title>
        <meta name="description" content={solution.metaDesc} />
        <link rel="canonical" href={`https://ai-agentix.com/solutions/${solution.slug}`} />
      </Helmet>

      {/* ── 1. HERO ──────────────────────────────── */}
      <section className="bg-[#0D1E3A] pt-[140px] pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }} />

        <div className="content-wrap relative z-10" style={{ padding: '0 48px' }}>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left */}
            <div className="flex-1 max-w-2xl">
              <motion.span
                className="eyebrow mb-4 inline-block"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Solution
              </motion.span>
              <motion.h1
                className="section-title text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {solution.title}
              </motion.h1>
              <motion.div
                className="w-12 h-px bg-[#F26522] mb-5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
              <motion.p
                className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {solution.tagline}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <Link to="/contact" className="btn-accent">
                  Get started <FaArrowRight size={16} />
                </Link>
                <Link to="/case-studies" className="btn-ghost">
                  View results
                </Link>
              </motion.div>
            </div>

            {/* Right — stats */}
            <div className="flex flex-col gap-4 lg:min-w-[260px]">
              {(solution.heroStats || []).slice(0, 3).map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-[#0A1628] border border-[#1A3050] rounded-xl px-6 py-5"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                >
                  <div className="text-3xl font-black font-display text-[#F26522] leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OVERVIEW ──────────────────────────── */}
      <section className="bg-white section-pad">
        <Section className="content-wrap">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left — overview text */}
            <div className="flex-1">
              <motion.span variants={fadeUp} className="eyebrow mb-3 inline-block" style={{ color: '#F26522' }}>
                Overview
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-[#0D1E3A] font-display font-black text-3xl mb-5">
                The Complete Picture
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#555] leading-relaxed">
                {solution.overview}
              </motion.p>
            </div>

            {/* Right — feature highlights with checkmarks */}
            <div className="flex-1">
              <motion.h3 variants={fadeUp} className="text-[#0D1E3A] font-display font-bold text-lg mb-5">
                Key Highlights
              </motion.h3>
              <div className="space-y-4">
                {(solution.features || []).slice(0, 6).map((feat, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <FaCircleCheck
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: '#F26522' }}
                    />
                    <div>
                      <span className="text-[#0D1E3A] font-semibold text-sm">{feat.title}</span>
                      {feat.desc && (
                        <p className="text-[#555] text-sm mt-0.5">{feat.desc}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* ── 3. FEATURES ───────────────────────────── */}
      <section className="bg-[#F0F7FF] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="eyebrow mb-3 inline-block">Capabilities</span>
            <h2 className="section-title text-[#0D1E3A]">Everything You Need</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(solution.features || []).slice(0, 6).map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-4"
                  style={{ background: 'rgba(13,30,58,0.08)' }}
                >
                  <Icon name={feat.icon} size={20} style={{ color: '#F26522' }} />
                </div>
                <h3 className="text-[#0D1E3A] font-display font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 4. PROCESS ────────────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="eyebrow mb-3 inline-block">Our Process</span>
            <h2 className="section-title text-white">How We Deploy It</h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-px border-t border-dashed border-[#F26522]/30 z-0" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {(solution.process || []).slice(0, 5).map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#F26522] font-black font-display text-2xl leading-none">
                      {String(step.step || i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-px h-8 bg-[#F26522]" />
                  </div>
                  <h3 className="text-white font-display font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── 5. INDUSTRIES ─────────────────────────── */}
      <section className="bg-white section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow mb-3 inline-block">Built For</span>
            <h2 className="section-title text-[#0D1E3A]">Industries We Serve</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(solution.industries || []).slice(0, 4).map((ind, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border border-[#E5E5E5] rounded-xl p-6 hover:border-[#F26522]/30 hover:shadow-sm transition-all"
              >
                <h3 className="text-[#0D1E3A] font-display font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                  {ind.name}
                </h3>
                <p className="text-[#555] text-sm leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 6. TECH STACK ─────────────────────────── */}
      <section className="bg-[#F0F7FF] section-pad-sm">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="eyebrow mb-3 inline-block">Technology</span>
            <h2 className="section-title text-[#0D1E3A]">Powered By</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {(solution.technologies || []).map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-full px-5 py-2 text-[#0D1E3A] font-medium text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#F26522] flex-shrink-0" />
                {tech}
              </span>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* ── 7. RESULTS + CTA ──────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="eyebrow mb-3 inline-block">Proven Results</span>
            <h2 className="section-title text-white">Impact at Scale</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1A3050] rounded-xl overflow-hidden mb-14">
            {(solution.results || []).slice(0, 4).map((result, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 text-center border-r border-b border-[#1A3050] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <div className="text-5xl font-black font-display text-[#F26522] leading-none mb-2">
                  {result.value}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{result.label}</div>
                {result.desc && (
                  <div className="text-white/50 text-xs leading-relaxed">{result.desc}</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="text-center bg-[#0A1628] rounded-xl p-12 border border-[#1A3050]"
          >
            <h3 className="text-white font-display font-black text-3xl mb-3">
              Ready to transform your operations?
            </h3>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Talk to our team and discover how {solution.title} can work for your business.
            </p>
            <Link to="/contact" className="btn-accent">
              Schedule a demo <FaArrowRight size={16} />
            </Link>
          </motion.div>
        </Section>
      </section>
    </div>
  );
}
