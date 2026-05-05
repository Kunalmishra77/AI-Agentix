import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaChevronDown,
  FaArrowRight,
  FaBolt,
  FaRobot,
  FaUser,
  FaCheck,
  FaPuzzlePiece,
  FaCircleCheck,
  FaArrowTrendUp,
} from 'react-icons/fa6';
import TOOLS from '../data/tools';

/* ─── Animation variants ─────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const slideDown = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Scroll-triggered section wrapper ───────────── */
function Section({ children, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.07 });
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

/* ─── Hex-to-rgba helper ─────────────────────────── */
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ─── Dot-grid pattern style ─────────────────────── */
const dotGrid = {
  backgroundImage:
    'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
  backgroundSize: '28px 28px',
};

/* ─── Feature icon map (rotated per index) ───────── */
const FEATURE_ICONS = [FaBolt, FaRobot, FaCircleCheck, FaPuzzlePiece];

/* ─── Section heading component ─────────────────── */
function SectionHeading({ eyebrow, title, subtitle, color, align = 'left', className = '' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  return (
    <div className={`${alignClass} ${className}`}>
      <motion.p
        variants={fadeUp}
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className="font-black text-[#0D1E3A] leading-tight"
        style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`text-[#4B5563] text-lg leading-relaxed mt-4 ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export default function ToolPage() {
  const { slug } = useParams();
  const tool = TOOLS.find((t) => t.slug === slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!tool) return <Navigate to="/404" replace />;

  const tint12 = hexToRgba(tool.color, 0.12);
  const tint20 = hexToRgba(tool.color, 0.20);
  const tint08 = hexToRgba(tool.color, 0.08);
  const tintBorder = hexToRgba(tool.color, 0.22);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet>
        <title>{tool.name} — AI Agentix Tools</title>
        <meta name="description" content={tool.description} />
        <link rel="canonical" href={`https://ai-agentix.com/tools/${tool.slug}`} />
      </Helmet>

      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative w-full py-32 overflow-hidden"
        style={{ background: tool.gradient }}
      >
        {/* Dot-grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={dotGrid} />

        {/* Glow orb — top right */}
        <div
          className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.13) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Glow orb — bottom left */}
        <div
          className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-[1240px] mx-auto px-6 sm:px-12">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-16 items-center">

            {/* ── Left column (60%) ── */}
            <div className="flex-1 min-w-0 lg:max-w-[58%]">
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-white/50 text-sm mb-7 flex-wrap"
              >
                <Link to="/" className="hover:text-white/90 transition-colors">Home</Link>
                <span className="text-white/25">/</span>
                <Link to="/tools" className="hover:text-white/90 transition-colors">
                  {tool.categoryLabel}
                </Link>
                <span className="text-white/25">/</span>
                <span className="text-white/80">{tool.name}</span>
              </motion.nav>

              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.06 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/20 backdrop-blur-sm text-white mb-6">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.8)' }}
                  />
                  {tool.categoryLabel}
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-black text-white leading-[1.04] mb-4"
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                  letterSpacing: '-0.035em',
                }}
              >
                {tool.name}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl font-light text-white mt-3 mb-4 leading-snug opacity-90"
              >
                {tool.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-base text-white mt-4 opacity-75 max-w-lg leading-relaxed mb-10"
              >
                {tool.description}
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#F26522] text-white font-bold text-[15px] hover:bg-[#FF7A3D] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
                >
                  Get Early Access
                  <FaArrowRight size={13} />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/35 text-white font-bold text-[15px] hover:bg-white/10 hover:border-white/60 transition-all duration-200 backdrop-blur-sm"
                >
                  See How It Works
                </a>
              </motion.div>
            </div>

            {/* ── Right column: Stats glass card (40%) ── */}
            <motion.div
              initial={{ opacity: 0, x: 44, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-[380px] flex-shrink-0"
            >
              <div
                className="rounded-3xl border border-white/20 p-8 shadow-2xl"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                }}
              >
                {/* Stats — vertical layout */}
                <div className="flex flex-col divide-y divide-white/15">
                  {tool.stats.map((stat, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${i === 0 ? 'pb-7' : i === tool.stats.length - 1 ? 'pt-7' : 'py-7'}`}
                    >
                      <span
                        className="font-black text-white leading-none"
                        style={{ fontSize: 'clamp(2.6rem, 5vw, 3.2rem)', letterSpacing: '-0.04em' }}
                      >
                        {stat.value}
                      </span>
                      <span className="text-sm text-white/60 mt-2 leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Trust tag */}
                <div className="mt-7 pt-5 border-t border-white/15">
                  <p className="text-xs text-white/45 font-medium tracking-wide text-center">
                    Trusted by forward-thinking teams
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. FEATURES
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <Section className="mb-14">
            <SectionHeading
              eyebrow="Capabilities"
              title={
                <>
                  Powerful features,{' '}
                  <span style={{ color: tool.color }}>zero complexity</span>
                </>
              }
              subtitle="Four core capabilities engineered to eliminate manual effort and maximise output quality."
              color={tool.color}
            />
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.features.map((feature, i) => {
              const FeatureIcon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group bg-white border border-[#E8EDF3] rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  style={{ borderLeft: `4px solid ${tool.color}` }}
                >
                  {/* Subtle inner glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at top left, ${hexToRgba(tool.color, 0.05)} 0%, transparent 70%)` }}
                  />

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 relative z-10"
                    style={{ background: tint12 }}
                  >
                    <FeatureIcon size={20} style={{ color: tool.color }} />
                  </div>
                  <h3 className="font-bold text-[#0D1E3A] text-lg mb-3 leading-snug relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed relative z-10">
                    {feature.desc}
                  </p>
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
            <SectionHeading
              eyebrow="Process"
              title="Three steps to results"
              color={tool.color}
              align="center"
            />
          </Section>

          <Section className="relative">
            {/* Dashed connector line — desktop only */}
            <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] pointer-events-none">
              <div
                style={{
                  height: '2px',
                  backgroundImage: `repeating-linear-gradient(90deg, ${hexToRgba(tool.color, 0.35)} 0, ${hexToRgba(tool.color, 0.35)} 8px, transparent 8px, transparent 18px)`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {tool.howItWorks.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-[#E8EDF3] p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
                >
                  {/* Large watermark step number */}
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 font-black leading-none select-none pointer-events-none"
                    style={{
                      fontSize: '120px',
                      color: '#0D1E3A',
                      opacity: 0.035,
                      lineHeight: 1,
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Colored step circle */}
                  <div className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-full mx-auto mb-6"
                    style={{ background: tint12, border: `2px solid ${tintBorder}` }}
                  >
                    <span className="font-black text-base" style={{ color: tool.color }}>
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#0D1E3A] text-lg mb-3 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. AI vs HUMAN ROLES
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <Section className="mb-14 text-center">
            <SectionHeading
              eyebrow="Division of labour"
              title="The perfect partnership"
              color={tool.color}
              align="center"
            />
          </Section>

          <Section>
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* AI card — dark */}
              <div className="bg-[#0D1E3A] rounded-2xl p-8 lg:p-10 relative overflow-hidden">
                {/* Subtle dot-grid on dark card */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: hexToRgba(tool.color, 0.25) }}
                    >
                      <FaRobot size={18} style={{ color: tool.color }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold" style={{ color: tool.color }}>
                        AI handles
                      </p>
                      <p className="text-white font-bold text-[17px] leading-tight">What AI does</p>
                    </div>
                  </div>

                  <p className="text-white/70 text-[15px] leading-relaxed mb-7">
                    {tool.aiRole}
                  </p>

                  <div className="space-y-3">
                    {tool.aiRole
                      .split(/\.\s+|,\s+/)
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: hexToRgba(tool.color, 0.2) }}
                          >
                            <FaCheck size={9} style={{ color: tool.color }} />
                          </span>
                          <span className="text-white/60 text-sm leading-relaxed">{item.trim()}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Human card — light */}
              <div className="bg-white rounded-2xl border border-[#E8EDF3] p-8 lg:p-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-50 border border-blue-100">
                    <FaUser size={16} className="text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-[#3B82F6]">
                      You do
                    </p>
                    <p className="text-[#0D1E3A] font-bold text-[17px] leading-tight">What you do</p>
                  </div>
                </div>

                <p className="text-[#4B5563] text-[15px] leading-relaxed mb-7">
                  {tool.humanRole}
                </p>

                <div className="space-y-3">
                  {tool.humanRole
                    .split(/\.\s+|,\s+/)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-blue-50 border border-blue-100">
                          <FaCheck size={9} className="text-[#3B82F6]" />
                        </span>
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
            <SectionHeading
              eyebrow="Real Results"
              title="Real results from real users"
              color={tool.color}
            />
          </Section>

          <Section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tool.useCases.map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#E8EDF3] p-6 flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Company type badge */}
                <span
                  className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4"
                  style={{
                    background: tint08,
                    color: tool.color,
                    border: `1px solid ${tintBorder}`,
                  }}
                >
                  {uc.title}
                </span>

                <p className="text-sm text-[#6B7280] leading-relaxed flex-1 mb-5">{uc.desc}</p>

                {/* Result banner */}
                <div
                  className="flex items-center gap-3 w-full rounded-xl px-4 py-3"
                  style={{
                    background: tint08,
                    border: `1px solid ${tintBorder}`,
                  }}
                >
                  <FaArrowTrendUp size={14} style={{ color: tool.color, flexShrink: 0 }} />
                  <span className="text-sm font-semibold leading-snug" style={{ color: tool.color }}>
                    {uc.result}
                  </span>
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
            <SectionHeading
              eyebrow="Connects with"
              title="Connects with tools you already use"
              subtitle="Native integrations with the most popular platforms — no complex setup required."
              color={tool.color}
              align="center"
            />
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
                  className="inline-flex items-center gap-2.5 bg-white border border-[#E8EDF3] rounded-full px-6 py-3 font-medium text-[#0D1E3A] text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
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
          7. FAQ ACCORDION
      ══════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <div className="max-w-[780px] mx-auto">
            <Section className="mb-12 text-center">
              <SectionHeading
                eyebrow="FAQ"
                title="Common questions"
                color={tool.color}
                align="center"
              />
            </Section>

            <Section className="space-y-3">
              {tool.faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <motion.div
                    key={i}
                    variants={fadeIn}
                    className="bg-white rounded-2xl border border-[#E8EDF3] overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#F8FAFC] transition-colors focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-[#0D1E3A] text-[15px] leading-snug pr-2">
                        {faq.q}
                      </span>
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isOpen ? tint12 : '#F1F5F9',
                          color: isOpen ? tool.color : '#6B7280',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        <FaChevronDown size={11} />
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
                          <p
                            className="px-5 pb-5 text-sm text-[#6B7280] leading-relaxed pt-3 border-t border-[#F1F5F9] mt-0"
                          >
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
      <section
        className="relative overflow-hidden py-24"
        style={{ background: tool.gradient }}
      >
        {/* Dot-grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={dotGrid} />

        {/* Glow orbs */}
        <div
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-20 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-[1240px] mx-auto px-6 sm:px-12 text-center">
          <Section>
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-widest text-white/50 mb-5"
            >
              Get started today
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="font-black text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.2rem)', letterSpacing: '-0.03em' }}
            >
              Ready to supercharge your workflow{' '}
              <br className="hidden sm:block" />
              with <span className="text-white/80">{tool.name}</span>?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg text-white/65 mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Join thousands of forward-thinking teams already saving hours every week.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-white text-[#0D1E3A] font-bold text-[15px] hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200"
              >
                Get Early Access
                <FaArrowRight size={13} />
              </Link>
              <Link
                to={`/category/${tool.category}`}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-xl border-2 border-white/35 text-white font-bold text-[15px] hover:bg-white/10 hover:border-white/60 transition-all duration-200"
              >
                View All {tool.categoryLabel} Tools
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="text-white/50 text-sm">
              14-day free trial · No credit card · Cancel anytime
            </motion.p>
          </Section>
        </div>
      </section>
    </div>
  );
}
