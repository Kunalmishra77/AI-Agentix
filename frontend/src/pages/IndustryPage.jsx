import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaChevronDown, FaChevronUp, FaArrowTrendUp } from 'react-icons/fa6';
import INDUSTRIES from '../data/industries.js';
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

export default function IndustryPage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const industry = Array.isArray(INDUSTRIES)
    ? INDUSTRIES.find((ind) => ind.slug === slug)
    : null;

  if (!industry) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center text-center px-6">
        <div>
          <p className="text-[80px] font-display font-black text-[#1A3050] leading-none select-none">404</p>
          <h1 className="text-2xl font-display font-bold text-white mt-4 mb-2">Industry not found</h1>
          <p className="text-[#999] mb-6">The page you're looking for doesn't exist or has moved.</p>
          <Link to="/" className="btn-accent">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{industry.title} — AI Agentix</title>
        <meta name="description" content={industry.metaDesc} />
        <link rel="canonical" href={`https://ai-agentix.com/industries/${industry.slug}`} />
      </Helmet>

      {/* ── 1. HERO ──────────────────────────────── */}
      <section
        className="pt-[140px] pb-20 relative overflow-hidden"
        style={{ background: industry.gradient || 'linear-gradient(135deg, #0D1E3A 0%, #0A1628 100%)' }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="content-wrap relative z-10" style={{ padding: '0 48px' }}>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left */}
            <div className="flex-1 max-w-2xl">
              <motion.span
                className="eyebrow mb-4 inline-block text-white/80"
                style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                Industry
              </motion.span>
              <motion.h1
                className="section-title text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {industry.title}
              </motion.h1>
              <motion.div
                className="w-12 h-px bg-white/60 mb-5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
              <motion.p
                className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {industry.tagline}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <Link to="/contact" className="btn-accent">
                  Talk to us <FaArrowRight size={16} />
                </Link>
                <Link
                  to="/case-studies"
                  className="btn-ghost"
                  style={{ borderColor: 'rgba(255,255,255,0.4)' }}
                >
                  See case studies
                </Link>
              </motion.div>
            </div>

            {/* Right — stats */}
            <div className="flex flex-col gap-4 lg:min-w-[260px]">
              {(industry.heroStats || []).slice(0, 3).map((stat, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl px-6 py-5 border border-white/20"
                  style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(10px)' }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                >
                  <div className="text-3xl font-black font-display text-white leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OVERVIEW + CHALLENGES ─────────────── */}
      <section className="bg-white section-pad">
        <Section className="content-wrap">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left — overview */}
            <div className="flex-1 max-w-md">
              <motion.span variants={fadeUp} className="eyebrow mb-3 inline-block">
                The Challenge
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-[#0D1E3A] font-display font-black text-3xl mb-5">
                What {industry.title} Faces Today
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#555] leading-relaxed">
                {industry.overview}
              </motion.p>
            </div>

            {/* Right — challenge cards */}
            <div className="flex-1 space-y-4">
              {(industry.challenges || []).slice(0, 4).map((ch, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-4 p-5 border border-[#E5E5E5] rounded-xl border-l-4"
                  style={{ borderLeftColor: '#F26522' }}
                >
                  {ch.icon && (
                    <span className="flex-shrink-0 mt-0.5 text-[#F26522]">
                      <Icon name={ch.icon} size={22} />
                    </span>
                  )}
                  <div>
                    <h3 className="text-[#0D1E3A] font-display font-bold text-base mb-1">{ch.title}</h3>
                    <p className="text-[#555] text-sm leading-relaxed">{ch.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── 3. SOLUTIONS ──────────────────────────── */}
      <section className="bg-[#F0F7FF] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="eyebrow mb-3 inline-block">How We Help</span>
            <h2 className="section-title text-[#0D1E3A]">AI-Powered Solutions</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(industry.solutions || []).slice(0, 6).map((sol, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {sol.icon && (
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'rgba(242,101,34,0.08)' }}
                  >
                    <Icon name={sol.icon} size={20} style={{ color: '#F26522' }} />
                  </div>
                )}
                <h3 className="text-[#0D1E3A] font-display font-bold text-base mb-2">{sol.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{sol.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 4. USE CASES ──────────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow mb-3 inline-block">Use Cases</span>
            <h2 className="section-title text-white">Real Impact, Real Results</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(industry.useCases || []).slice(0, 4).map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="text-[#0D1E3A] font-display font-bold text-lg mb-2">{uc.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed mb-4">{uc.desc}</p>
                {uc.result && (
                  <div className="flex items-center gap-2 text-[#F26522] font-bold text-sm">
                    <FaArrowTrendUp size={15} />
                    {uc.result}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 5. TECH STACK ─────────────────────────── */}
      <section className="bg-white section-pad-sm">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="eyebrow mb-3 inline-block">Technology</span>
            <h2 className="section-title text-[#0D1E3A]">The Stack Behind It</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {(industry.technologies || []).map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-[#F0F7FF] border border-[#E5E5E5] rounded-full px-5 py-2 text-[#0D1E3A] font-medium text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#F26522] flex-shrink-0" />
                {tech}
              </span>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* ── 6. CASE STUDY ─────────────────────────── */}
      {industry.caseStudy && (
        <section className="bg-[#F0F7FF] section-pad">
          <Section className="content-wrap">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E5E5]">
              <div className="flex flex-col lg:flex-row">
                {/* Left */}
                <div className="flex-1 p-10 lg:p-14">
                  <motion.span variants={fadeUp} className="eyebrow mb-3 inline-block">
                    Client Story
                  </motion.span>
                  <motion.h2
                    variants={fadeUp}
                    className="text-[#0D1E3A] font-display font-black text-2xl mb-6"
                  >
                    {industry.caseStudy.client}
                  </motion.h2>

                  <div className="space-y-5">
                    <motion.div variants={fadeUp}>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F26522] mb-1">
                        Challenge
                      </h4>
                      <p className="text-[#555] text-sm leading-relaxed">
                        {industry.caseStudy.challenge}
                      </p>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F26522] mb-1">
                        Solution
                      </h4>
                      <p className="text-[#555] text-sm leading-relaxed">
                        {industry.caseStudy.solution}
                      </p>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F26522] mb-1">
                        Result
                      </h4>
                      <p className="text-[#555] text-sm leading-relaxed">
                        {industry.caseStudy.result}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Right — metrics */}
                {industry.caseStudy.metrics && (
                  <div
                    className="lg:w-80 p-10 lg:p-14 flex flex-col justify-center gap-6"
                    style={{ background: 'linear-gradient(135deg, #0D1E3A 0%, #0A1628 100%)' }}
                  >
                    {industry.caseStudy.metrics.map((m, i) => (
                      <motion.div key={i} variants={fadeUp} className="text-center">
                        <div className="text-4xl font-black font-display text-[#F26522] leading-none mb-1">
                          {m.value}
                        </div>
                        <div className="text-white/70 text-sm">{m.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Section>
        </section>
      )}

      {/* ── 7. RESULTS ────────────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="eyebrow mb-3 inline-block">By the Numbers</span>
            <h2 className="section-title text-white">Measurable Outcomes</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1A3050] rounded-xl overflow-hidden">
            {(industry.results || []).slice(0, 4).map((result, i) => (
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
        </Section>
      </section>

      {/* ── 8. FAQ + CTA ──────────────────────────── */}
      <section className="bg-white section-pad-sm">
        <Section className="content-wrap">
          {/* FAQ */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="eyebrow mb-3 inline-block">FAQ</span>
            <h2 className="section-title text-[#0D1E3A]">Common Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto divide-y divide-[#E5E5E5] mb-16">
            {(industry.faq || []).slice(0, 4).map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="py-5">
                <button
                  className="w-full flex items-center justify-between text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-[#0D1E3A] font-display font-bold text-base">{item.q}</span>
                  {openFaq === i ? (
                    <FaChevronUp size={18} className="text-[#F26522] flex-shrink-0" />
                  ) : (
                    <FaChevronDown size={18} className="text-[#999] flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[#555] text-sm leading-relaxed pt-3">{item.a}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Strip */}
          <motion.div
            variants={fadeUp}
            className="rounded-xl overflow-hidden"
            style={{ background: industry.gradient || 'linear-gradient(135deg, #0D1E3A 0%, #0A1628 100%)' }}
          >
            <div className="bg-black/30 px-10 py-12 text-center">
              <h3 className="text-white font-display font-black text-3xl mb-3">
                Ready to modernize {industry.title}?
              </h3>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Our AI specialists have deep domain knowledge in {industry.title}. Let's build your competitive advantage.
              </p>
              <Link to="/contact" className="btn-accent">
                Start the conversation <FaArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </Section>
      </section>
    </div>
  );
}
