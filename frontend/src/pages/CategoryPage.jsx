import { Navigate, Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaArrowRight,
  FaArrowRightLong,
  FaChevronRight,
  FaHouse,
  FaStar,
  FaCircleCheck,
  FaBolt,
  FaChartLine,
  FaServer,
  FaUsers,
} from 'react-icons/fa6';
import CATEGORIES from '../data/categories';
import TOOLS from '../data/tools';

/* ─── Animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.4, 0, 0.2, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Animated section wrapper ───────────────────────────────────── */
function AnimSection({ children, className = '', delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </motion.div>
  );
}

/* ─── Workflow step labels per category ──────────────────────────── */
const workflowSteps = {
  content: {
    steps: [
      { label: 'Creative Brief', sub: 'Topics, tone & audience' },
      { label: 'AI Processes', sub: 'Writes, edits & schedules' },
      { label: 'Published Content', sub: 'Live across every channel' },
    ],
    cta: 'See how Content AI works together',
  },
  sales: {
    steps: [
      { label: 'Target Defined', sub: 'ICP, industry & intent' },
      { label: 'AI Processes', sub: 'Scrapes, calls & qualifies' },
      { label: 'Deals Closed', sub: 'Pipeline filled automatically' },
    ],
    cta: 'See how Sales AI works together',
  },
  'market-research': {
    steps: [
      { label: 'Market Brief', sub: 'Product, goals & competitors' },
      { label: 'AI Processes', sub: 'Analyses & benchmarks live data' },
      { label: 'Strategy Ready', sub: 'GTM roadmap in 20 minutes' },
    ],
    cta: 'See how Research AI works together',
  },
  business: {
    steps: [
      { label: 'Business Input', sub: 'Operations, data & goals' },
      { label: 'AI Processes', sub: 'Automates & optimises every layer' },
      { label: 'Scaled Results', sub: 'Revenue up, overhead down' },
    ],
    cta: 'See how Business AI works together',
  },
};

/* ─── Global stats (section 4) ───────────────────────────────────── */
const GLOBAL_STATS = [
  { icon: FaBolt, value: '16', label: 'AI Tools' },
  { icon: FaChartLine, value: '4', label: 'Business Categories' },
  { icon: FaStar, value: 'Fortune 500', label: 'Clients Served' },
  { icon: FaServer, value: '99.9%', label: 'Uptime SLA' },
];

/* ═══════════════════════════════════════════════════════════════════
   CATEGORY PAGE
═══════════════════════════════════════════════════════════════════ */
export default function CategoryPage() {
  const { slug } = useParams();

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) return <Navigate to="/404" replace />;

  const categoryTools = TOOLS.filter((t) => t.category === category.slug);
  const workflow = workflowSteps[category.slug] || workflowSteps['content'];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{category.name} AI Tools — Agentix</title>
        <meta
          name="description"
          content={`${category.tagline} Explore ${categoryTools.length} ${category.name} AI tools by Agentix — built for teams that want results, not complexity.`}
        />
        <link rel="canonical" href={`https://ai-agentix.com/category/${category.slug}`} />
      </Helmet>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden pt-[130px] pb-24"
        style={{ background: category.gradient }}
      >
        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        {/* Glow orb */}
        <div
          className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'rgba(255,255,255,0.35)' }}
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-white/60 text-sm mb-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FaHouse size={12} />
              Home
            </Link>
            <FaChevronRight size={10} className="opacity-50" />
            <span className="text-white font-medium">{category.name}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row items-start gap-14">
            {/* ── Left ── */}
            <div className="flex-1 max-w-2xl">
              {/* Category badge */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/30 text-white"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                >
                  {category.label}
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="font-display font-black text-white leading-[1.05] mb-5"
                style={{
                  fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
                  letterSpacing: '-0.03em',
                }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {category.name} AI Tools
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-white font-light leading-snug mb-5"
                style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)' }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
              >
                {category.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-white/80 text-base leading-relaxed mb-10 max-w-xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.26 }}
              >
                {category.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
              >
                <a
                  href="#tools"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-sm shadow-lg transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
                  style={{ background: '#F26522', boxShadow: '0 4px 20px rgba(242,101,34,0.45)' }}
                >
                  Explore All Tools <FaArrowRight size={14} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-sm border border-white/40 transition-all duration-200 hover:bg-white/10"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  Book a Demo
                </Link>
              </motion.div>
            </div>

            {/* ── Right — stat card ── */}
            <motion.div
              className="lg:w-72 w-full"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <div
                className="rounded-2xl p-8 border border-white/20 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.96)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.22)',
                }}
              >
                {/* Accent strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ background: category.gradient }}
                />

                <div className="flex items-center gap-2 mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: category.lightColor }}
                  >
                    <FaCircleCheck size={16} style={{ color: category.color }} />
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: category.color }}
                  >
                    {category.label}
                  </span>
                </div>

                <div
                  className="font-display font-black leading-none mb-2"
                  style={{
                    fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                    color: category.color,
                    letterSpacing: '-0.04em',
                  }}
                >
                  {category.stat.value}
                </div>
                <p className="text-[#4B5563] font-medium text-base leading-tight mb-6">
                  {category.stat.label}
                </p>

                <div className="border-t border-[#E8EDF3] pt-5 space-y-3">
                  <div className="flex items-center gap-2.5 text-sm text-[#6B7280]">
                    <FaUsers size={13} style={{ color: category.color }} />
                    <span>{categoryTools.length} tools in this category</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#6B7280]">
                    <FaBolt size={13} style={{ color: category.color }} />
                    <span>Enterprise-ready infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#6B7280]">
                    <FaCircleCheck size={13} style={{ color: category.color }} />
                    <span>No long-term contract required</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. TOOLS GRID
      ══════════════════════════════════════════════════════════════ */}
      <section id="tools" className="bg-white py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            {/* Section header */}
            <motion.div variants={fadeUp} className="mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ background: category.lightColor, color: category.color }}
              >
                {category.label}
              </span>
              <h2
                className="font-display font-black text-[#0D1E3A] leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em' }}
              >
                All {category.name} Tools
              </h2>
              <p className="text-[#6B7280] mt-3 text-base max-w-xl">
                Every tool is designed to work standalone or as part of a fully automated{' '}
                {category.name.toLowerCase()} pipeline.
              </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryTools.map((tool, index) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  category={category}
                  index={index}
                />
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. HOW IT ALL CONNECTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            {/* Header */}
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full"
                style={{ background: category.lightColor, color: category.color }}
              >
                How It Works
              </span>
              <h2
                className="font-display font-black text-[#0D1E3A] leading-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em' }}
              >
                How it all connects
              </h2>
              <p className="text-[#6B7280] text-base max-w-lg mx-auto">
                {category.description}
              </p>
            </motion.div>

            {/* Workflow boxes */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-0"
            >
              {workflow.steps.map((step, i) => (
                <div key={i} className="flex items-center">
                  {/* Step box */}
                  <div
                    className="relative flex flex-col items-center text-center rounded-2xl px-8 py-8 min-w-[180px] max-w-[220px] border border-[#E8EDF3] bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Number badge */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-white text-sm mb-4"
                      style={{ background: category.gradient }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3
                      className="font-display font-bold text-[#0D1E3A] text-base mb-1.5 leading-tight"
                    >
                      {step.label}
                    </h3>
                    <p className="text-[#6B7280] text-xs leading-relaxed">{step.sub}</p>

                    {/* Active indicator dot */}
                    {i === 1 && (
                      <div
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                        style={{ background: category.color }}
                      >
                        <FaBolt size={9} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Arrow connector (not after last step) */}
                  {i < workflow.steps.length - 1 && (
                    <div className="flex items-center px-2 sm:px-4 my-4 sm:my-0">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-[#E8EDF3] bg-white shadow-sm"
                      >
                        <FaArrowRight size={12} style={{ color: category.color }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* CTA link */}
            <motion.div variants={fadeUp} className="text-center mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 font-bold text-sm transition-all duration-200 hover:gap-4"
                style={{ color: category.color }}
              >
                {workflow.cta} <FaArrowRightLong size={15} />
              </Link>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SOCIAL PROOF / STATS ROW
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-[#E8EDF3] overflow-hidden"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#E8EDF3]">
                {GLOBAL_STATS.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex flex-col items-center text-center px-8 py-10 hover:bg-[#F8FAFC] transition-colors duration-200"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: category.lightColor }}
                      >
                        <Icon size={20} style={{ color: category.color }} />
                      </div>
                      <div
                        className="font-display font-black leading-none mb-2"
                        style={{
                          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                          color: category.color,
                          letterSpacing: '-0.03em',
                        }}
                      >
                        {stat.value}
                      </div>
                      <p className="text-[#6B7280] text-sm font-medium">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. CTA SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: category.gradient }}
      >
        {/* Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        {/* Glow orb */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 blur-[100px]"
          style={{ background: 'rgba(255,255,255,0.4)' }}
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full border border-white/30 text-white/80"
                style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(6px)' }}
              >
                Get Started
              </span>

              <h2
                className="font-display font-black text-white leading-tight mb-5"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Ready to transform your{' '}
                <span style={{ textDecoration: 'underline', textDecorationStyle: 'wavy', textDecorationColor: 'rgba(255,255,255,0.4)' }}>
                  {category.name.toLowerCase()}
                </span>{' '}
                workflow?
              </h2>

              <p className="text-white/75 text-base leading-relaxed mb-10">
                Join teams already using Agentix {category.label} to automate the repetitive,
                amplify the creative, and scale what works — without scaling headcount.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[#0D1E3A] text-sm bg-white shadow-lg transition-all duration-200 hover:brightness-95 hover:-translate-y-0.5"
                >
                  Get Started Free <FaArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white text-sm border-2 border-white/40 transition-all duration-200 hover:bg-white/10"
                  style={{ backdropFilter: 'blur(8px)' }}
                >
                  Book a Demo
                </Link>
              </div>
            </motion.div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TOOL CARD — extracted for cleanliness
═══════════════════════════════════════════════════════════════════ */
function ToolCard({ tool, category, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group bg-white border border-[#E8EDF3] rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Top gradient strip */}
      <div
        className="h-1.5 w-full flex-shrink-0"
        style={{ background: tool.gradient || category.gradient }}
      />

      {/* Card body */}
      <div className="p-8 flex flex-col flex-1">
        {/* Category pill */}
        <div className="mb-4">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: category.lightColor, color: category.color }}
          >
            {tool.categoryLabel}
          </span>
        </div>

        {/* Tool name */}
        <h3
          className="font-display font-bold text-[#0D1E3A] text-xl leading-tight mb-2 group-hover:text-opacity-90 transition-colors"
        >
          {tool.name}
        </h3>

        {/* Tagline */}
        <p className="text-[#6B7280] text-sm font-medium mb-3 leading-snug">
          {tool.tagline}
        </p>

        {/* Description — 2-line clamp */}
        <p className="text-[#4B5563] text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
          {tool.description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-4 pt-5 border-t border-[#E8EDF3]">
          {/* Stat pill */}
          {tool.stats && tool.stats[0] && (
            <div
              className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-lg"
              style={{ background: category.lightColor }}
            >
              <span
                className="font-display font-black text-base leading-none"
                style={{ color: category.color }}
              >
                {tool.stats[0].value}
              </span>
              <span className="text-[#6B7280] text-[11px] font-medium leading-none">
                {tool.stats[0].label}
              </span>
            </div>
          )}

          {/* Explore link */}
          <Link
            to={`/tools/${tool.slug}`}
            className="inline-flex items-center gap-1.5 font-bold text-sm transition-all duration-200 hover:gap-3 flex-shrink-0"
            style={{ color: category.color }}
          >
            Explore Tool <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
