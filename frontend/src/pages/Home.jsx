import { useEffect, useRef } from 'react';
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
} from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
import CATEGORIES from '../data/categories';
import TOOLS from '../data/tools';

/* ─── Reusable animated section wrapper ─────────────────────────── */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Category icon mapping ──────────────────────────────────────── */
function CategoryIcon({ icon, color }) {
  const icons = {
    content: <FaLayerGroup size={22} color={color} />,
    sales: <FaChartLine size={22} color={color} />,
    research: <FaBolt size={22} color={color} />,
    business: <FaCubes size={22} color={color} />,
  };
  return icons[icon] || <FaBolt size={22} color={color} />;
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
    title: 'Pick your category',
    desc: 'Choose from Content, Sales, Market Research, or Business AI — each purpose-built for a core area of your operations.',
  },
  {
    num: '02',
    title: 'Choose your AI tools',
    desc: 'Browse 16 specialised tools within your category. Each tool ships with clear use-cases, integrations, and a live demo.',
  },
  {
    num: '03',
    title: 'Go live in minutes',
    desc: 'Connect your data, configure in plain English, and deploy. No code. No lengthy onboarding. Just results.',
  },
];

/* ─── Trust stats ────────────────────────────────────────────────── */
const TRUST_STATS = [
  { value: '16', label: 'AI Tools' },
  { value: '4', label: 'Categories' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
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

      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center h-screen bg-[#0A1628] overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/assets/hero-bg.mp4"
        />

        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,101,34,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm font-medium rounded-full px-4 py-1.5 mb-8"
          >
            <FaRocket size={12} className="text-[#F26522]" />
            AI Tools Marketplace &bull; 16 Tools &bull; 4 Categories
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6"
          >
            The AI Stack for{' '}
            <span className="text-[#F26522]">Modern Business</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto mb-10"
          >
            Content. Sales. Research. Operations. One platform — infinite scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/category/content"
              className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#D4541A] text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-colors duration-200"
            >
              <FaRocket size={15} />
              Explore Tools
            </Link>
            <button className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold text-base px-7 py-3.5 rounded-xl transition-colors duration-200 backdrop-blur-sm">
              <FaPlay size={13} />
              Watch Demo
            </button>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {[
              { icon: <FaLayerGroup size={16} className="text-[#F26522]" />, value: '16 AI Tools', sub: 'Across 4 categories' },
              { icon: <FaCubes size={16} className="text-[#F26522]" />, value: '4 Business Categories', sub: 'Content · Sales · Research · Ops' },
              { icon: <FaGauge size={16} className="text-[#F26522]" />, value: '10× Faster', sub: 'Than manual workflows' },
            ].map((card) => (
              <div
                key={card.value}
                className="flex items-center gap-3 bg-white/8 border border-white/15 backdrop-blur-md rounded-2xl px-5 py-3.5 min-w-[200px]"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  {card.icon}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-sm leading-tight">{card.value}</div>
                  <div className="text-white/50 text-xs mt-0.5">{card.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. CATEGORIES ────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[#F26522] font-semibold text-sm uppercase tracking-widest mb-3">
              Four Pillars
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1E3A] leading-tight">
              Everything your business needs
            </h2>
            <p className="text-[#6B7280] text-lg mt-4 max-w-xl mx-auto">
              Four specialised AI categories, 16 production-ready tools — all under one roof.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <AnimatedSection key={cat.slug} delay={i * 0.08}>
                <div className="group border border-[#E5E7EB] rounded-2xl p-6 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 bg-white">
                  {/* Icon */}
                  <div className="mb-5">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                      style={{ background: cat.gradient }}
                    >
                      <CategoryIcon icon={cat.icon} color="#fff" />
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>

                  {/* Tagline */}
                  <h3 className="font-bold text-lg text-[#0D1E3A] leading-snug mb-2">
                    {cat.tagline}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#6B7280] line-clamp-3 flex-1">
                    {cat.description}
                  </p>

                  {/* Stat row */}
                  <div
                    className="mt-5 pt-4 border-t flex items-center gap-2"
                    style={{ borderColor: cat.lightColor }}
                  >
                    <span className="font-black text-lg" style={{ color: cat.color }}>
                      {cat.stat.value}
                    </span>
                    <span className="text-xs text-[#9CA3AF] leading-tight">
                      {cat.stat.label}
                    </span>
                  </div>

                  {/* CTA link */}
                  <Link
                    to={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold transition-colors"
                    style={{ color: cat.color }}
                  >
                    Explore {cat.name} AI
                    <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TOOLS SPOTLIGHT ───────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-14">
            <p className="text-[#F26522] font-semibold text-sm uppercase tracking-widest mb-3">
              Spotlight
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1E3A] leading-tight">
              Featured Tools
            </h2>
            <p className="text-[#6B7280] text-lg mt-4 max-w-xl mx-auto">
              Handpicked from our marketplace — built for immediate business impact.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredTools.map((tool, i) => (
              <AnimatedSection key={tool.slug} delay={i * 0.09}>
                <div className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Gradient strip */}
                  <div className="h-1 w-full" style={{ background: tool.gradient }} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category badge */}
                    <span
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: tool.color }}
                    >
                      {tool.categoryLabel}
                    </span>

                    {/* Tool name */}
                    <h3 className="font-bold text-xl text-[#0D1E3A] mb-1">{tool.name}</h3>

                    {/* Tagline */}
                    <p className="text-sm text-[#6B7280] mb-5">{tool.tagline}</p>

                    {/* Highlight stat */}
                    {tool.stats?.[0] && (
                      <div
                        className="inline-flex items-center gap-3 rounded-xl px-4 py-3 mb-6 self-start"
                        style={{ backgroundColor: `${tool.color}14` }}
                      >
                        <FaCircleCheck size={14} style={{ color: tool.color }} />
                        <span className="font-black text-xl" style={{ color: tool.color }}>
                          {tool.stats[0].value}
                        </span>
                        <span className="text-xs text-[#6B7280]">{tool.stats[0].label}</span>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        to={`/tools/${tool.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: tool.color }}
                      >
                        View Tool
                        <FaArrowRight
                          size={11}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ──────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#F26522] font-semibold text-sm uppercase tracking-widest mb-3">
              Simple by design
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1E3A] leading-tight">
              How Agentix works
            </h2>
            <p className="text-[#6B7280] text-lg mt-4 max-w-xl mx-auto">
              From discovery to deployment — three steps, zero complexity.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-8 left-[17%] right-[17%] h-px bg-gradient-to-r from-[#F26522]/30 via-[#F26522]/60 to-[#F26522]/30" />

            {HOW_STEPS.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 0.12} className="relative text-center">
                {/* Numbered circle */}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F26522] text-white font-black text-xl mb-6 shadow-lg shadow-[#F26522]/25">
                  {step.num}
                </div>
                <h3 className="font-bold text-xl text-[#0D1E3A] mb-3">{step.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TRUST / SOCIAL PROOF ──────────────────────────────── */}
      <section className="bg-[#0A1628] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-3">
              Built for scale
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-14">
              Trusted by forward-thinking teams worldwide
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {TRUST_STATS.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-black text-white mb-2">
                    {stat.value}
                  </span>
                  <span className="text-sm text-white/40 font-medium">{stat.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ─────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-[#F26522] font-semibold text-sm uppercase tracking-widest mb-4">
              Ready to start?
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0D1E3A] leading-tight mb-6">
              Start your AI transformation today
            </h2>
            <p className="text-[#6B7280] text-lg mb-10">
              16 tools. 4 categories. One platform built for teams who want to move faster without adding headcount.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/category/content"
                className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#D4541A] text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-colors duration-200"
              >
                <FaRocket size={15} />
                Get Started
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-[#0D1E3A] hover:bg-[#0D1E3A] hover:text-white text-[#0D1E3A] font-semibold text-base px-8 py-3.5 rounded-xl transition-colors duration-200"
              >
                Talk to Agentix
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
