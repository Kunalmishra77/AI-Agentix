import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaBolt,
  FaRobot,
  FaUser,
  FaCheck,
  FaPuzzlePiece,
  FaCircleCheck,
} from 'react-icons/fa6';
import TOOLS from '../data/tools';

/* ─── Animation variants ─────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideDown = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
};

/* ─── Scroll-triggered section wrapper ───────────── */
function Section({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hex-to-rgba helper ─────────────────────────── */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ─── Feature icon map (rotated per index) ───────── */
const FEATURE_ICONS = [FaBolt, FaRobot, FaCircleCheck, FaPuzzlePiece];

export default function ToolPage() {
  const { slug } = useParams();
  const tool = TOOLS.find((t) => t.slug === slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!tool) return <Navigate to="/404" replace />;

  const tintColor = hexToRgba(tool.color, 0.08);
  const tintBorder = hexToRgba(tool.color, 0.2);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet>
        <title>{tool.name} — AI Agentix Tools</title>
        <meta name="description" content={tool.description} />
        <link rel="canonical" href={`https://ai-agentix.com/tools/${tool.slug}`} />
      </Helmet>

      {/* ══════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full py-28 overflow-hidden"
        style={{ background: tool.gradient }}
      >
        {/* Subtle noise / shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-[1240px] mx-auto px-6 sm:px-12">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">

            {/* ── Left column ── */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-white/60 text-sm mb-6 flex-wrap"
              >
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-white/30">/</span>
                <Link to="/tools" className="hover:text-white transition-colors">{tool.categoryLabel}</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/90">{tool.name}</span>
              </motion.nav>

              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-white/15 text-white border border-white/25 backdrop-blur-sm mb-5">
                  {tool.categoryLabel}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-white leading-[1.05] mb-4"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', letterSpacing: '-0.03em' }}
              >
                {tool.name}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-xl font-display font-semibold text-white/80 mb-5 leading-snug"
              >
                {tool.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base text-white/70 leading-relaxed mb-10 max-w-xl"
              >
                {tool.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F26522] text-white font-display font-bold text-[15px] hover:bg-[#FF7A3D] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
                >
                  Get Early Access
                  <FaArrowRight size={13} />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-white/40 text-white font-display font-bold text-[15px] hover:bg-white/10 hover:border-white/70 transition-all duration-200 backdrop-blur-sm"
                >
                  See How It Works
                </a>
              </motion.div>
            </div>

            {/* ── Right column: Stats card ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="w-full lg:w-[380px] flex-shrink-0"
            >
              <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md p-8 shadow-2xl">
                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">
                  By the numbers
                </p>
                <div className="grid grid-cols-1 divide-y divide-white/15">
                  {tool.stats.map((stat, i) => (
                    <div key={i} className={`py-5 ${i === 0 ? 'pt-0' : ''} ${i === tool.stats.length - 1 ? 'pb-0' : ''}`}>
                      <p
                        className="font-display font-black text-white leading-none mb-1.5"
                        style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', letterSpacing: '-0.04em' }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-sm text-white/60 leading-snug">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade-out to white */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06))' }}
        />
      </section>

      {/* ══════════════════════════════════════════
          2. FEATURES SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <Section className="mb-14">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: tool.color }}
            >
              Capabilities
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-[#0D1E3A] leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              Everything You Need — <span className="font-display" style={{ color: tool.color }}>{tool.name}</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4B5563] text-lg max-w-2xl leading-relaxed">
              Four core capabilities engineered to eliminate manual effort and maximise output quality.
            </motion.p>
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.features.map((feature, i) => {
              const FeatureIcon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group bg-white border border-[#E8EDF3] rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: tintColor, border: `1.5px solid ${tintBorder}` }}
                  >
                    <FeatureIcon size={20} style={{ color: tool.color }} />
                  </div>
                  <h3
                    className="font-display font-bold text-[#0D1E3A] text-[17px] mb-3 leading-snug"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7280] text-[15px] leading-relaxed">{feature.desc}</p>
                </motion.div>
              );
            })}
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <Section className="mb-14 text-center">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: tool.color }}
            >
              Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-[#0D1E3A] leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              How It Works
            </motion.h2>
          </Section>

          <Section className="relative">
            {/* Connecting dashed line — desktop only */}
            <div
              className="hidden lg:block absolute top-10 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, ${tool.color}40 0, ${tool.color}40 8px, transparent 8px, transparent 16px)`,
              }}
            />

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
            >
              {tool.howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-[#E8EDF3] p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-5"
                    style={{ background: tintColor }}
                  >
                    <span
                      className="font-display font-black text-xl leading-none"
                      style={{ color: tool.color }}
                    >
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-[#0D1E3A] text-[17px] mb-3">{step.title}</h3>
                  <p className="text-[#6B7280] text-[15px] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. AI vs HUMAN ROLES
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <Section className="mb-14 text-center">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: tool.color }}
            >
              Division of labour
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-[#0D1E3A] leading-tight max-w-2xl mx-auto"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              AI handles the heavy lifting.{' '}
              <span style={{ color: tool.color }}>You make the decisions.</span>
            </motion.h2>
          </Section>

          <Section>
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-[#E8EDF3] shadow-sm"
            >
              {/* AI Side */}
              <div className="bg-[#0D1E3A] p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: hexToRgba(tool.color, 0.2) }}
                  >
                    <FaRobot size={18} style={{ color: tool.color }} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold" style={{ color: tool.color }}>
                      AI Role
                    </p>
                    <p className="text-white font-display font-bold text-[17px] leading-tight">
                      What the AI does
                    </p>
                  </div>
                </div>
                <p className="text-white/75 text-[15px] leading-relaxed">{tool.aiRole}</p>

                {/* Decorative bullet-points from aiRole sentences */}
                <div className="mt-8 space-y-3">
                  {tool.aiRole
                    .split(/,\s*|\.\s+/)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FaCheck size={12} className="mt-1 flex-shrink-0" style={{ color: tool.color }} />
                        <span className="text-white/60 text-sm leading-relaxed">{item.trim()}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Human Side */}
              <div className="bg-white p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-[#E8EDF3]">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#F8FAFC] border border-[#E8EDF3]"
                  >
                    <FaUser size={16} className="text-[#4B5563]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-[#6B7280]">
                      Your Role
                    </p>
                    <p className="text-[#0D1E3A] font-display font-bold text-[17px] leading-tight">
                      What you do
                    </p>
                  </div>
                </div>
                <p className="text-[#4B5563] text-[15px] leading-relaxed">{tool.humanRole}</p>

                <div className="mt-8 space-y-3">
                  {tool.humanRole
                    .split(/,\s*|\.\s+/)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FaCheck size={12} className="mt-1 flex-shrink-0 text-[#4B5563]" />
                        <span className="text-[#6B7280] text-sm leading-relaxed">{item.trim()}</span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. USE CASES
      ══════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <Section className="mb-14">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: tool.color }}
            >
              Real Results
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-[#0D1E3A] leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              Who uses {tool.name}
            </motion.h2>
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.useCases.map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#E8EDF3] p-6 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-display font-bold text-[#0D1E3A] text-[17px] mb-3">{uc.title}</h3>
                <p className="text-[#4B5563] text-[15px] leading-relaxed mb-5 flex-1">{uc.desc}</p>

                {/* Result chip */}
                <div
                  className="inline-flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-semibold leading-snug"
                  style={{
                    background: tintColor,
                    border: `1px solid ${tintBorder}`,
                    color: tool.color,
                  }}
                >
                  <FaArrowRight size={13} className="mt-0.5 flex-shrink-0" />
                  <span>{uc.result}</span>
                </div>
              </motion.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. INTEGRATIONS
      ══════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12 text-center">
          <Section className="mb-12">
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: tool.color }}
            >
              Connects with
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-[#0D1E3A] leading-tight mb-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              Works with the tools you already use
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4B5563] text-lg max-w-xl mx-auto leading-relaxed">
              Native integrations with the most popular platforms — no complex setup required.
            </motion.p>
          </Section>

          <Section>
            <motion.div
              variants={stagger}
              className="flex flex-wrap justify-center gap-3"
            >
              {tool.integrations.map((platform, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 bg-white border border-[#E8EDF3] rounded-full px-5 py-2.5 font-display font-medium text-[#0D1E3A] text-[14px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: tool.color }}
                  />
                  {platform}
                </motion.span>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FAQ SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <div className="max-w-[780px] mx-auto">
            <Section className="mb-14 text-center">
              <motion.p
                variants={fadeUp}
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: tool.color }}
              >
                FAQ
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="font-display font-black text-[#0D1E3A] leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
              >
                Frequently Asked Questions
              </motion.h2>
            </Section>

            <Section className="divide-y divide-[#E8EDF3] border-y border-[#E8EDF3] rounded-2xl overflow-hidden bg-white shadow-sm">
              {tool.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div key={i} variants={fadeIn}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left transition-colors hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                      style={{ '--tw-ring-color': tool.color }}
                      aria-expanded={isOpen}
                    >
                      <span
                        className="font-display font-semibold text-[#0D1E3A] text-[15px] leading-snug pr-4"
                      >
                        {faq.q}
                      </span>
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200"
                        style={{
                          background: isOpen ? tintColor : '#F1F5F9',
                          color: isOpen ? tool.color : '#6B7280',
                        }}
                      >
                        {isOpen ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={slideDown}
                          className="overflow-hidden"
                        >
                          <p className="px-7 pb-6 text-[#4B5563] text-[15px] leading-relaxed">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </Section>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24" style={{ background: tool.gradient }}>
        {/* Decorative glow orbs */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: 'white' }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10"
          style={{ background: 'white' }}
        />

        <div className="relative max-w-[1240px] mx-auto px-6 sm:px-12 text-center">
          <Section>
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest text-white/60 mb-4"
            >
              Get started today
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.03em' }}
            >
              Ready to supercharge your{' '}
              <br className="hidden sm:block" />
              <span className="text-white/80">{tool.categoryLabel.replace(' AI', '').toLowerCase()}</span> workflow?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Start with {tool.name} today and join thousands of teams already saving hours every week.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-white text-[#0D1E3A] font-display font-bold text-[15px] hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200"
              >
                Get Early Access
                <FaArrowRight size={13} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-xl border-2 border-white/40 text-white font-display font-bold text-[15px] hover:bg-white/10 hover:border-white/70 transition-all duration-200"
              >
                Talk to Sales
              </Link>
            </motion.div>
          </Section>
        </div>
      </section>
    </div>
  );
}
