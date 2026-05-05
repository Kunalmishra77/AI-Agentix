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
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Animated section wrapper ───────────────────────────────────── */
function AnimSection({ children, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
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

/* ─── Workflow step data per category ────────────────────────────── */
const workflowSteps = {
  content: [
    {
      title: 'Create Brief',
      desc: 'Define your topic, audience, tone, and keywords in 30 seconds.',
    },
    {
      title: 'AI Generates Content',
      desc: 'Drafts, edits, optimises for SEO, and formats for every channel.',
    },
    {
      title: 'Publish Everywhere',
      desc: 'Push live to your CMS, social platforms, and email — automatically.',
    },
  ],
  sales: [
    {
      title: 'Define ICP',
      desc: 'Set your ideal customer profile, industry filters, and intent signals.',
    },
    {
      title: 'AI Finds & Qualifies Leads',
      desc: 'Scrapes, enriches, calls, and scores prospects without manual effort.',
    },
    {
      title: 'Close More Deals',
      desc: 'Warm, qualified pipeline delivered directly to your CRM daily.',
    },
  ],
  'market-research': [
    {
      title: 'Define Market',
      desc: 'Specify your product, geography, competitors, and research goals.',
    },
    {
      title: 'AI Researches All Sources',
      desc: 'Scans live web data, pricing trends, and competitive intelligence.',
    },
    {
      title: 'Get Full Strategy',
      desc: 'Receive a complete GTM roadmap and market analysis in 20 minutes.',
    },
  ],
  business: [
    {
      title: 'Connect Business Units',
      desc: 'Integrate your ops, finance, HR, and sales data into one AI layer.',
    },
    {
      title: 'AI Centralises Data',
      desc: 'Automates workflows, surfaces insights, and eliminates busywork.',
    },
    {
      title: 'Operate on Autopilot',
      desc: 'Revenue up, overhead down — your business runs smarter at scale.',
    },
  ],
};

/* ─── Global stats ───────────────────────────────────────────────── */
const GLOBAL_STATS = [
  { value: '16', label: 'AI Tools' },
  { value: '4', label: 'Business Categories' },
  { value: 'Fortune 500', label: 'Clients Served' },
  { value: '99.9%', label: 'Uptime SLA' },
];

/* ─── Hero bullet points per category ───────────────────────────── */
const heroBullets = {
  content: [
    'Brand voice AI trained on your own content',
    'Publishes to 12+ platforms automatically',
    'Zero long-term contract required',
  ],
  sales: [
    'Scrapes & qualifies leads 24/7 without a team',
    'AI cold-calling bot converts at 3× human rate',
    'Full CRM sync — no manual data entry ever',
  ],
  'market-research': [
    'Real-time competitor intelligence at your fingertips',
    'Dynamic pricing analysis updated daily',
    'Full GTM strategy generated in under 48 hours',
  ],
  business: [
    'Enterprise CRM, ERP & LMS in one platform',
    'AI embedded at every operational layer',
    '60% average reduction in operational costs',
  ],
};

/* ═══════════════════════════════════════════════════════════════════
   CATEGORY PAGE
═══════════════════════════════════════════════════════════════════ */
export default function CategoryPage() {
  const { slug } = useParams();
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) return <Navigate to="/404" replace />;

  const categoryTools = TOOLS.filter((t) => t.category === category.slug);
  const steps = workflowSteps[category.slug] || workflowSteps['content'];
  const bullets = heroBullets[category.slug] || heroBullets['content'];

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
        className="relative overflow-hidden py-32 pt-[148px]"
        style={{ background: category.gradient }}
      >
        {/* Dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Large blurred glow — bottom-right */}
        <div
          className="pointer-events-none absolute bottom-[-120px] right-[-120px] w-[560px] h-[560px] rounded-full"
          style={{
            background: 'rgba(255,255,255,0.10)',
            filter: 'blur(80px)',
          }}
        />

        {/* Top-left accent glow */}
        <div
          className="pointer-events-none absolute top-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'rgba(255,255,255,0.06)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12">
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-white/50 text-sm mb-12"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            >
              <FaHouse size={12} />
              Home
            </Link>
            <FaChevronRight size={10} className="opacity-40" />
            <span className="text-white/80 font-medium">{category.label}</span>
          </motion.nav>

          <div className="flex flex-col lg:flex-row items-start gap-16 xl:gap-20">
            {/* ── Left column ── */}
            <div className="flex-1 max-w-2xl">
              {/* Animated badge */}
              <motion.div
                className="mb-7"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white border"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    borderColor: 'rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-white"
                    style={{ boxShadow: '0 0 6px 2px rgba(255,255,255,0.6)' }}
                  />
                  {category.label}
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                className="font-black text-white leading-tight mb-5"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.05,
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
              >
                {category.name} AI
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-white font-light leading-snug mb-5"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                  opacity: 0.9,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
              >
                {category.tagline}
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-base leading-relaxed mb-10 max-w-2xl"
                style={{ color: 'rgba(255,255,255,0.75)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.26 }}
              >
                {category.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.34 }}
              >
                <a
                  href="#tools"
                  className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  style={{
                    background: 'rgba(255,255,255,0.22)',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
                  }}
                >
                  Explore Tools
                  <FaArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-sm border transition-all duration-200 hover:bg-white/10"
                  style={{
                    borderColor: 'rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Book a Demo
                </Link>
              </motion.div>
            </div>

            {/* ── Right — premium glass stat card ── */}
            <motion.div
              className="hidden lg:block w-[320px] xl:w-[360px] flex-shrink-0"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
            >
              <div
                className="rounded-3xl p-8 border relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  borderColor: 'rgba(255,255,255,0.20)',
                  backdropFilter: 'blur(20px)',
                  boxShadow:
                    '0 24px 64px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.20)',
                }}
              >
                {/* Inner shimmer strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  }}
                />

                {/* Giant stat */}
                <div
                  className="font-black text-white leading-none mb-1"
                  style={{
                    fontSize: 'clamp(4rem, 7vw, 5.5rem)',
                    letterSpacing: '-0.05em',
                    textShadow: '0 2px 20px rgba(255,255,255,0.2)',
                  }}
                >
                  {category.stat.value}
                </div>
                <p className="text-white/70 text-base font-medium mb-8 leading-tight">
                  {category.stat.label}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-6"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                />

                {/* Bullet points */}
                <ul className="space-y-3.5">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCircleCheck
                        size={15}
                        className="text-white flex-shrink-0 mt-0.5"
                        style={{ opacity: 0.9 }}
                      />
                      <span className="text-white/80 text-sm leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom glow */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. TOOLS GRID
      ══════════════════════════════════════════════════════════════ */}
      <section id="tools" className="bg-white py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            {/* Section header */}
            <motion.div variants={fadeUp} className="mb-16">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
                style={{ background: category.lightColor, color: category.color }}
              >
                {category.label}
              </span>
              <h2
                className="font-black text-[#0D1E3A] leading-tight mb-4"
                style={{
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                All {category.name} Tools
              </h2>
              <p className="text-[#6B7280] text-base max-w-xl leading-relaxed">
                Every tool is engineered to run standalone or as part of a fully automated{' '}
                {category.name.toLowerCase()} pipeline — zero complexity, enterprise results.
              </p>
            </motion.div>

            {/* Premium 2-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {categoryTools.map((tool, index) => (
                <ToolCard key={tool.slug} tool={tool} category={category} index={index} />
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. WORKFLOW SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full"
                style={{ background: category.lightColor, color: category.color }}
              >
                How It Works
              </span>
              <h2
                className="font-black text-[#0D1E3A] leading-tight mb-4"
                style={{
                  fontSize: 'clamp(1.9rem, 3.5vw, 2.9rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                How {category.name} AI works together
              </h2>
              <p className="text-[#6B7280] text-base max-w-lg mx-auto leading-relaxed">
                Three connected stages that turn manual work into a fully automated,
                measurable pipeline.
              </p>
            </motion.div>

            {/* Workflow boxes */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col md:flex-row items-stretch justify-center gap-0"
            >
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-center md:items-stretch flex-1"
                >
                  {/* Step box */}
                  <div className="relative flex flex-col items-center text-center rounded-2xl p-6 border border-[#E8EDF3] bg-white w-full md:max-w-none hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    {/* Step number circle */}
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-sm mb-5 flex-shrink-0"
                      style={{ background: category.gradient }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <h3 className="font-bold text-[#0D1E3A] text-base mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{step.desc}</p>

                    {/* AI badge on middle step */}
                    {i === 1 && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"
                        style={{ background: category.color }}
                      >
                        <FaBolt size={8} /> AI
                      </div>
                    )}
                  </div>

                  {/* Arrow connector — between steps only */}
                  {i < steps.length - 1 && (
                    <div className="flex items-center justify-center px-2 md:px-3 py-3 md:py-0 flex-shrink-0">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E8EDF3] bg-white shadow-sm flex-shrink-0"
                      >
                        <FaArrowRight
                          size={13}
                          style={{ color: category.color }}
                          className="rotate-90 md:rotate-0"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Workflow CTA */}
            <motion.div variants={fadeUp} className="text-center mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 font-bold text-sm transition-all duration-200 hover:gap-4"
                style={{ color: category.color }}
              >
                See how {category.name} AI works together{' '}
                <FaArrowRightLong size={15} />
              </Link>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. STATS ROW
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {GLOBAL_STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="border border-[#E8EDF3] rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div
                    className="font-black leading-none mb-2"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                      color: category.color,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-[#6B7280] text-sm font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. CTA SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: category.gradient }}
      >
        {/* Dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Bottom glow */}
        <div
          className="pointer-events-none absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full"
          style={{
            background: 'rgba(255,255,255,0.10)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12">
          <AnimSection>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
              {/* Eyebrow badge */}
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full border text-white/80"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  borderColor: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Get Started Today
              </span>

              <h2
                className="font-black text-white leading-tight mb-5"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  letterSpacing: '-0.035em',
                }}
              >
                Ready to transform your{' '}
                <span
                  style={{
                    textDecoration: 'underline',
                    textDecorationStyle: 'wavy',
                    textDecorationColor: 'rgba(255,255,255,0.4)',
                    textUnderlineOffset: '6px',
                  }}
                >
                  {category.name.toLowerCase()}
                </span>{' '}
                workflow?
              </h2>

              <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Join forward-thinking teams already using Agentix {category.label} to automate
                the repetitive, amplify the creative, and scale what works — without scaling
                headcount.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[#0D1E3A] text-sm bg-white shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0"
                >
                  Get Started Free
                  <FaArrowRight
                    size={13}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white text-sm border-2 transition-all duration-200 hover:bg-white/10"
                  style={{
                    borderColor: 'rgba(255,255,255,0.40)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  Book a Demo
                </Link>
              </div>

              {/* Fine print */}
              <p className="text-white/50 text-xs tracking-wide">
                14-day free trial · No credit card required · Cancel anytime
              </p>
            </motion.div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TOOL CARD
═══════════════════════════════════════════════════════════════════ */
function ToolCard({ tool, category, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });

  // Derive feature chips — up to 2 from tool.features or tool.integrations
  const chips =
    tool.features && tool.features.length >= 2
      ? [tool.features[0].title, tool.features[1].title]
      : tool.integrations
      ? tool.integrations.slice(0, 2)
      : [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
      style={{ border: '1px solid #E8EDF3' }}
    >
      {/* ── TOP — gradient section ── */}
      <div
        className="p-6 relative overflow-hidden flex-shrink-0"
        style={{ background: tool.gradient || category.gradient }}
      >
        {/* Subtle dot grid inside card top */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-white text-xl leading-tight mb-1.5 tracking-tight">
              {tool.name}
            </h3>
            <p className="text-sm text-white/80 leading-snug">{tool.tagline}</p>
          </div>

          {/* Stat pill */}
          {tool.stats && tool.stats[0] && (
            <div
              className="flex-shrink-0 flex flex-col items-center px-4 py-1.5 rounded-full text-white"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="text-sm font-bold leading-tight whitespace-nowrap">
                {tool.stats[0].value}
              </span>
              <span className="text-[10px] text-white/70 whitespace-nowrap leading-none mt-0.5">
                {tool.stats[0].label}
              </span>
            </div>
          )}
        </div>

        {/* Inner shimmer strip at bottom of card top */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />
      </div>

      {/* ── BOTTOM — white section ── */}
      <div className="p-6 flex flex-col flex-1">
        {/* Description */}
        <p className="text-sm text-[#4B5563] leading-relaxed line-clamp-3 mb-5 flex-1">
          {tool.description}
        </p>

        {/* Feature chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {chips.map((chip, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-medium text-[#374151]"
                style={{ background: '#F8FAFC', border: '1px solid #E8EDF3' }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F0F4F8]">
          <Link
            to={`/tools/${tool.slug}`}
            className="group/link inline-flex items-center gap-1.5 font-semibold text-sm transition-all duration-200"
            style={{ color: tool.color || category.color }}
          >
            Explore Tool
            <FaArrowRight
              size={12}
              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            />
          </Link>

          {/* Category label chip */}
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: category.lightColor, color: category.color }}
          >
            {tool.categoryLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
