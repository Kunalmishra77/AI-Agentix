import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaRocket,
  FaPlay,
  FaBolt,
  FaLayerGroup,
  FaChartLine,
  FaArrowRight,
  FaCircleCheck,
  FaCubes,
  FaGauge,
  FaStar,
  FaShieldHalved,
  FaChevronRight,
} from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
import CATEGORIES from '../data/categories';
import TOOLS from '../data/tools';

/* ─── Variants ───────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Reusable animated section wrapper ─────────────────────────── */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated stagger container ────────────────────────────────── */
function StaggerContainer({ children, className = '' }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ornament ─────────────────────────────────────── */
function SectionLabel({ text }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-5">
      <span className="flex-1 h-px bg-[#E8EDF3] max-w-[80px]" />
      <span className="text-[#F26522] font-bold text-xs uppercase tracking-[0.18em]">
        {text}
      </span>
      <span className="flex-1 h-px bg-[#E8EDF3] max-w-[80px]" />
    </div>
  );
}

/* ─── Category icon mapping ──────────────────────────────────────── */
function CategoryIcon({ icon }) {
  const icons = {
    content: <FaLayerGroup size={22} color="#fff" />,
    sales: <FaChartLine size={22} color="#fff" />,
    research: <FaBolt size={22} color="#fff" />,
    business: <FaCubes size={22} color="#fff" />,
  };
  return icons[icon] || <FaBolt size={22} color="#fff" />;
}

/* ─── Featured tool slugs ────────────────────────────────────────── */
const FEATURED_SLUGS = [
  'ai-content-generator',
  'lead-scraper',
  'competitor-analyzer',
  'crm-system',
];

/* ─── Steps ──────────────────────────────────────────────────────── */
const HOW_STEPS = [
  {
    num: '01',
    icon: <FaBolt size={18} className="text-white" />,
    title: 'Pick your category',
    desc: 'Choose from Content, Sales, Market Research, or Business AI — each purpose-built for a core area of your operations.',
    color: '#F26522',
  },
  {
    num: '02',
    icon: <FaRocket size={18} className="text-white" />,
    title: 'Choose your AI tools',
    desc: 'Browse 16 specialised tools within your category. Each tool ships with clear use-cases, integrations, and a live demo.',
    color: '#F26522',
  },
  {
    num: '03',
    icon: <FaCircleCheck size={18} className="text-white" />,
    title: 'Go live in minutes',
    desc: 'Connect your data, configure in plain English, and deploy. No code. No lengthy onboarding. Just results.',
    color: '#F26522',
  },
];

/* ─── Trust stats ────────────────────────────────────────────────── */
const TRUST_STATS = [
  { value: '16', label: 'AI Tools', sub: 'Production-ready' },
  { value: '4', label: 'Categories', sub: 'End-to-end coverage' },
  { value: '99.9%', label: 'Uptime SLA', sub: 'Enterprise grade' },
  { value: '24/7', label: 'Support', sub: 'Always available' },
];

/* ═══════════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const featuredTools = TOOLS.filter((t) => FEATURED_SLUGS.includes(t.slug));

  return (
    <>
      <Helmet>
        <title>Agentix — AI Tools Marketplace for Modern Business</title>
        <meta
          name="description"
          content="Agentix gives you 16 AI tools across Content, Sales, Market Research, and Business — one platform to automate, scale, and win."
        />
        <meta property="og:title" content="Agentix — AI Tools Marketplace" />
        <meta
          property="og:description"
          content="Content. Sales. Research. Operations. One platform — infinite scale."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://ai-agentix.com" />
      </Helmet>

      {/* ══════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative flex items-center justify-center min-h-screen bg-[#0A1628] overflow-hidden">

        {/* Dot-grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Glow orb — orange top-left */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(242,101,34,0.18) 0%, transparent 70%)',
            filter: 'blur(1px)',
          }}
        />

        {/* Glow orb — blue bottom-right */}
        <div
          className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)',
            filter: 'blur(1px)',
          }}
        />

        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
          src="/assets/hero-bg.mp4"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-32">

          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 bg-white/[0.07] border border-white/[0.14] text-white/80 text-sm font-medium rounded-full px-5 py-2 mb-10 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]" />
            </span>
            New: 16 AI Tools Now Live
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-[82px] font-black text-white leading-[1.06] tracking-tight mb-6"
          >
            The AI Stack for
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #F26522 0%, #FF8C42 100%)' }}
            >
              Modern Business
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-11 leading-relaxed"
          >
            One marketplace. Four AI-powered categories. Sixteen production-ready tools —
            built to replace manual work and unlock exponential growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link
              to="/category/content"
              className="group inline-flex items-center gap-2.5 bg-[#F26522] hover:bg-[#E05A1A] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-[#F26522]/30 hover:shadow-[#F26522]/45 transition-all duration-200"
            >
              Explore the Marketplace
              <FaArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <button className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-base px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-200">
              <FaPlay size={12} />
              Watch Demo
            </button>
          </motion.div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {[
              { icon: <FaLayerGroup size={15} className="text-[#F26522]" />, value: '16 AI Tools', sub: 'Across 4 categories' },
              { icon: <FaShieldHalved size={15} className="text-[#F26522]" />, value: '99.9% Uptime', sub: 'Enterprise SLA' },
              { icon: <FaGauge size={15} className="text-[#F26522]" />, value: '10× Faster', sub: 'Than manual workflows' },
            ].map((pill) => (
              <div
                key={pill.value}
                className="flex items-center gap-3 bg-white/[0.07] border border-white/[0.12] backdrop-blur-md rounded-2xl px-5 py-3.5"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-white/[0.09] rounded-lg flex items-center justify-center">
                  {pill.icon}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-sm leading-snug">{pill.value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{pill.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. CATEGORIES
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">

          <AnimatedSection className="text-center mb-16">
            <SectionLabel text="Four Pillars" />
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1E3A] leading-[1.1] tracking-tight">
              One platform.{' '}
              <span className="text-[#0D1E3A]">Four powerful categories.</span>
            </h2>
            <p className="text-[#6B7280] text-lg mt-5 max-w-xl mx-auto leading-relaxed">
              Every critical area of your business — covered by purpose-built AI that ships results from day one.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.slug} variants={cardVariant}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="group flex flex-col h-full bg-white border border-[#EEF1F6] rounded-3xl p-8 min-h-[260px] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative"
                  style={{ borderTop: `2px solid ${cat.color}` }}
                >
                  {/* Hover background tint */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                    style={{
                      background: `linear-gradient(145deg, #ffffff 0%, ${cat.lightColor} 100%)`,
                    }}
                  />

                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shadow-md"
                        style={{ background: cat.gradient }}
                      >
                        <CategoryIcon icon={cat.icon} />
                      </div>
                    </div>

                    {/* Label */}
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.2em] mb-2"
                      style={{ color: cat.color }}
                    >
                      {cat.label}
                    </span>

                    {/* Tagline */}
                    <h3 className="font-black text-xl text-[#0D1E3A] leading-snug mb-3">
                      {cat.tagline}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#6B7280] line-clamp-3 flex-1 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Stat row */}
                    <div
                      className="mt-6 pt-5 border-t flex items-center gap-2"
                      style={{ borderColor: cat.lightColor }}
                    >
                      <span className="font-black text-xl" style={{ color: cat.color }}>
                        {cat.stat.value}
                      </span>
                      <span className="text-xs text-[#9CA3AF] leading-tight">
                        {cat.stat.label}
                      </span>
                    </div>

                    {/* CTA */}
                    <div
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold transition-colors"
                      style={{ color: cat.color }}
                    >
                      Explore {cat.name} AI
                      <FaArrowRight
                        size={11}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. TOOLS SPOTLIGHT
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-28">
        <div className="max-w-7xl mx-auto px-6">

          <AnimatedSection className="text-center mb-16">
            <SectionLabel text="Spotlight" />
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1E3A] leading-[1.1] tracking-tight">
              Start with our most powerful tools
            </h2>
            <p className="text-[#6B7280] text-lg mt-5 max-w-xl mx-auto leading-relaxed">
              Handpicked from our marketplace — each built for immediate, measurable business impact.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTools.map((tool) => (
              <motion.div key={tool.slug} variants={cardVariant}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col min-h-[280px] border border-[#EEF1F6]">

                  {/* Gradient strip */}
                  <div className="h-[3px] w-full flex-shrink-0" style={{ background: tool.gradient }} />

                  <div className="p-8 flex flex-col flex-1">

                    {/* Category label */}
                    <span
                      className="text-[11px] font-black uppercase tracking-[0.2em] mb-4"
                      style={{ color: tool.color }}
                    >
                      {tool.categoryLabel}
                    </span>

                    {/* Tool name */}
                    <h3 className="font-black text-2xl text-[#0D1E3A] mb-1 leading-tight">
                      {tool.name}
                    </h3>

                    {/* Tagline */}
                    <p
                      className="font-medium text-sm mb-4"
                      style={{ color: tool.color }}
                    >
                      {tool.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[#6B7280] line-clamp-2 leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    {/* Stat box */}
                    {tool.stats?.[0] && (
                      <div
                        className="flex items-center gap-3 w-full rounded-xl px-4 py-3 mb-5 border-l-4"
                        style={{
                          backgroundColor: `${tool.color}0D`,
                          borderColor: tool.color,
                        }}
                      >
                        <FaCircleCheck size={14} style={{ color: tool.color }} className="flex-shrink-0" />
                        <span
                          className="font-black text-lg"
                          style={{ color: tool.color }}
                        >
                          {tool.stats[0].value}
                        </span>
                        <span className="text-xs text-[#6B7280]">{tool.stats[0].label}</span>
                      </div>
                    )}

                    {/* Feature pills */}
                    {tool.features?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {tool.features.slice(0, 3).map((f) => (
                          <span
                            key={f.title}
                            className="text-xs font-semibold px-3 py-1 rounded-full border"
                            style={{
                              color: tool.color,
                              borderColor: `${tool.color}30`,
                              backgroundColor: `${tool.color}0A`,
                            }}
                          >
                            {f.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        to={`/tools/${tool.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold transition-all"
                        style={{ color: tool.color }}
                      >
                        Explore Tool
                        <FaArrowRight
                          size={11}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          {/* View all link */}
          <AnimatedSection delay={0.2} className="text-center mt-12">
            <Link
              to="/category/content"
              className="inline-flex items-center gap-2 text-[#0D1E3A] font-bold text-sm border border-[#DDE3ED] hover:border-[#F26522] hover:text-[#F26522] px-7 py-3.5 rounded-xl transition-all duration-200"
            >
              View All 16 Tools
              <FaChevronRight size={11} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6">

          <AnimatedSection className="text-center mb-16">
            <SectionLabel text="Simple by Design" />
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1E3A] leading-[1.1] tracking-tight">
              How Agentix works
            </h2>
            <p className="text-[#6B7280] text-lg mt-5 max-w-xl mx-auto leading-relaxed">
              From discovery to deployment — three steps, zero complexity.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Desktop dashed connector */}
            <div className="hidden md:flex absolute top-[52px] left-0 right-0 items-center justify-center pointer-events-none px-[18%]">
              <div className="flex-1 border-t-2 border-dashed border-[#F26522]/25" />
              <FaArrowRight size={14} className="text-[#F26522]/40 mx-2 flex-shrink-0" />
              <div className="flex-1 border-t-2 border-dashed border-[#F26522]/25" />
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOW_STEPS.map((step) => (
                <motion.div key={step.num} variants={cardVariant}>
                  <div className="relative bg-white border border-[#EEF1F6] rounded-2xl p-8 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                    {/* Step number — gradient text */}
                    <div
                      className="font-black text-6xl leading-none mb-6 bg-clip-text text-transparent select-none"
                      style={{ backgroundImage: 'linear-gradient(135deg, #F26522 0%, #FFB380 100%)' }}
                    >
                      {step.num}
                    </div>

                    {/* Icon circle */}
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#F26522] shadow-md shadow-[#F26522]/30 mb-5">
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-xl text-[#0D1E3A] mb-3 leading-snug">
                      {step.title}
                    </h3>

                    {/* Desc */}
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. SOCIAL PROOF
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0D2545 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6">

          <AnimatedSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
              <span className="text-white/40 font-bold text-xs uppercase tracking-[0.18em]">
                Built for Scale
              </span>
              <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Trusted by forward-thinking teams worldwide
            </h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TRUST_STATS.map((stat) => (
              <motion.div key={stat.label} variants={cardVariant}>
                <div className="border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300">
                  <div
                    className="font-black text-4xl sm:text-5xl mb-2 bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(90deg, #F26522 0%, #FF8C42 100%)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white font-bold text-sm mb-1">{stat.label}</div>
                  <div className="text-white/40 text-xs">{stat.sub}</div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>

          <AnimatedSection delay={0.3} className="text-center mt-12">
            <div className="inline-flex items-center gap-2.5 bg-white/[0.05] border border-white/10 text-white/60 text-sm font-medium rounded-full px-6 py-3 backdrop-blur-sm">
              <FaStar size={12} className="text-[#F26522]" />
              Join 500+ businesses automating with Agentix
              <FaStar size={12} className="text-[#F26522]" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. FINAL CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-28">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div
              className="relative rounded-3xl p-14 sm:p-16 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #F26522 0%, #D4541A 100%)',
              }}
            >
              {/* Mesh/dot pattern inside CTA box */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                  backgroundSize: '22px 22px',
                }}
              />

              {/* Inner glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white/90 text-xs font-bold uppercase tracking-widest rounded-full px-5 py-2 mb-7">
                  <FaRocket size={11} />
                  Ready to Start?
                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-white leading-[1.08] tracking-tight mb-5">
                  Start your AI transformation today
                </h2>

                <p className="text-white/80 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                  16 tools. 4 categories. One platform built for teams who want to move faster without adding headcount.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/category/content"
                    className="group inline-flex items-center gap-2.5 bg-white text-[#D4541A] font-black text-base px-8 py-4 rounded-xl shadow-xl shadow-black/20 hover:shadow-black/30 hover:scale-[1.02] transition-all duration-200"
                  >
                    <FaRocket size={14} />
                    Get Started Free
                    <FaArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2.5 border-2 border-white/40 hover:border-white text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/10"
                  >
                    Talk to Agentix
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
