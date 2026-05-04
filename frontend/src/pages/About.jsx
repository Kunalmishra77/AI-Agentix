import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaGlobe,
  FaBolt,
  FaHandshake,
  FaChartLine,
  FaArrowRight,
  FaPenNib,
  FaChartBar,
  FaMagnifyingGlass,
  FaBriefcase,
} from 'react-icons/fa6';

/* ─── Animation helpers ─────────────────────────────────────────────────── */
function useFadeUp(threshold = 0.15) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold });
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  };
  return { ref, inView, variants };
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const fadeUpChild = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ════════════════════════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <>
      <Helmet>
        <title>About Agentix — AI Tools Marketplace</title>
        <meta
          name="description"
          content="Agentix is an AI tools marketplace with 16 ready-to-use tools across Content AI, Sales AI, Research AI, and Business AI — built for the AI-first business era."
        />
        <link rel="canonical" href="https://ai-agentix.com/about" />
      </Helmet>

      <HeroSection />
      <MissionSection />
      <WhatWeOfferSection />
      <HowItWorksSection />
      <ValuesSection />
      <TeamSection />
      <CtaBanner />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   1. HERO
═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="bg-[#0A1628] py-24 overflow-hidden"
      aria-label="Hero"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.span
            variants={fadeUpChild}
            className="inline-block bg-[#F26522]/10 border border-[#F26522]/30 text-[#F26522] text-xs font-semibold uppercase tracking-[0.18em] px-4 py-2 rounded-full mb-8"
          >
            About Agentix
          </motion.span>

          <motion.h1
            variants={fadeUpChild}
            className="text-white font-black leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
          >
            Built for the AI-first business era
          </motion.h1>

          <motion.p
            variants={fadeUpChild}
            className="text-[#8BA3C0] text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            We believe every company — regardless of size — deserves access to
            enterprise-grade AI tools. Agentix makes that possible.
          </motion.p>

          <motion.div
            variants={fadeUpChild}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/category/content"
              className="inline-flex items-center justify-center gap-2 bg-[#F26522] hover:bg-[#d9541a] text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-250 text-[15px]"
            >
              Explore Our Tools
              <FaArrowRight className="text-sm" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-250 text-[15px]"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   2. MISSION
═══════════════════════════════════════════════════════════════════════════ */
const missionStats = [
  { value: '16', label: 'AI Tools' },
  { value: '4', label: 'Categories' },
  { value: '500+', label: 'Businesses' },
  { value: '99.9%', label: 'Uptime' },
];

function MissionSection() {
  const { ref, inView, variants } = useFadeUp();

  return (
    <section className="bg-white py-20" aria-label="Our Mission">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left — copy */}
          <motion.div variants={fadeUpChild}>
            <p className="text-[#F26522] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
              Our Mission
            </p>
            <h2
              className="text-[#0D1E3A] font-black leading-tight mb-5"
              style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
            >
              Democratizing AI — one tool at a time
            </h2>
            <div className="w-12 h-1 bg-[#F26522] rounded-full mb-8" />
            <p className="text-[#4B5563] text-[17px] leading-relaxed mb-5">
              Agentix was founded on a simple belief: powerful AI should not be
              locked behind six-figure custom development budgets. Every growing
              business deserves the same automation edge that Fortune 500 companies
              have — without the wait, cost, or complexity.
            </p>
            <p className="text-[#4B5563] text-[17px] leading-relaxed mb-5">
              Our marketplace puts 16 production-ready AI tools into your hands on
              day one. Subscribe, connect your data, and start automating — whether
              that means generating content at scale, qualifying leads automatically,
              or tracking competitors in real time.
            </p>
            <p className="text-[#4B5563] text-[17px] leading-relaxed">
              We remove the need for expensive custom AI development by shipping
              battle-tested tools that solve the most common business challenges out
              of the box.
            </p>
          </motion.div>

          {/* Right — stats card */}
          <motion.div variants={fadeUpChild}>
            <div className="rounded-2xl border border-[#E8EDF3] bg-white shadow-[0_4px_40px_rgba(13,30,58,0.07)] overflow-hidden">
              <div className="grid grid-cols-2">
                {missionStats.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className={`px-10 py-10 text-center
                      ${i % 2 === 0 ? 'border-r border-[#E8EDF3]' : ''}
                      ${i < 2 ? 'border-b border-[#E8EDF3]' : ''}`}
                  >
                    <p
                      className="font-black leading-none mb-2 text-[#F26522]"
                      style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
                    >
                      {value}
                    </p>
                    <p className="text-[#6B7280] text-sm uppercase tracking-widest">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3. WHAT WE OFFER
═══════════════════════════════════════════════════════════════════════════ */
const categories = [
  {
    color: '#7C3AED',
    Icon: FaPenNib,
    name: 'Content AI',
    tagline: 'Create content at scale',
    slug: 'content',
  },
  {
    color: '#F26522',
    Icon: FaChartBar,
    name: 'Sales AI',
    tagline: 'Automate your entire sales pipeline',
    slug: 'sales',
  },
  {
    color: '#0EA5E9',
    Icon: FaMagnifyingGlass,
    name: 'Research AI',
    tagline: 'Know your market before competitors',
    slug: 'research',
  },
  {
    color: '#059669',
    Icon: FaBriefcase,
    name: 'Business AI',
    tagline: 'Run operations on autopilot',
    slug: 'business',
  },
];

function WhatWeOfferSection() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-[#F8FAFC] py-20" aria-label="What We Offer">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="text-[#F26522] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            The Toolkit
          </p>
          <h2
            className="text-[#0D1E3A] font-black leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
          >
            The complete AI toolkit for modern business.
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mt-5" />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map(({ color, Icon, name, tagline, slug }) => (
            <motion.div
              key={name}
              variants={fadeUpChild}
              className="group rounded-2xl border border-[#E8EDF3] bg-white overflow-hidden hover:shadow-[0_8px_40px_rgba(13,30,58,0.10)] transition-shadow duration-300"
            >
              {/* Colored top border */}
              <div className="h-1.5 w-full" style={{ background: color }} />

              <div className="p-7">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}18` }}
                >
                  <Icon style={{ color }} className="text-xl" />
                </div>

                {/* Name */}
                <p
                  className="font-black text-[17px] mb-1"
                  style={{ color }}
                >
                  {name}
                </p>

                {/* Tagline */}
                <p className="text-[#4B5563] text-[15px] leading-relaxed mb-6">
                  {tagline}
                </p>

                {/* Link */}
                <Link
                  to={`/category/${slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                  style={{ color }}
                >
                  Explore tools
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   4. HOW IT WORKS
═══════════════════════════════════════════════════════════════════════════ */
const steps = [
  {
    number: '1',
    title: 'Choose your tools',
    desc: 'Browse 16 AI tools across 4 categories and pick the ones that match your workflow. Start with one or activate an entire category — no minimums.',
  },
  {
    number: '2',
    title: 'Connect your stack',
    desc: 'Link your existing apps and data sources with our one-click integrations. Agentix fits into your current workflow, not the other way around.',
  },
  {
    number: '3',
    title: 'Go live immediately',
    desc: 'Your selected tools are ready to run the moment you connect. No training runs, no custom development, no waiting — just results from day one.',
  },
];

function HowItWorksSection() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-white py-20" aria-label="How It Works">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="text-[#F26522] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            How It Works
          </p>
          <h2
            className="text-[#0D1E3A] font-black leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
          >
            Getting started takes minutes, not months.
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mt-5" />
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map(({ number, title, desc }) => (
            <motion.div key={number} variants={fadeUpChild} className="flex flex-col items-start">
              {/* Orange circle number */}
              <div className="w-12 h-12 rounded-full bg-[#F26522] flex items-center justify-center mb-5 flex-shrink-0">
                <span className="text-white font-black text-lg leading-none">{number}</span>
              </div>
              <h3 className="text-[#0D1E3A] font-black text-[18px] mb-3">{title}</h3>
              <p className="text-[#4B5563] text-[15px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   5. VALUES
═══════════════════════════════════════════════════════════════════════════ */
const values = [
  {
    Icon: FaGlobe,
    title: 'AI for Everyone',
    desc: 'Enterprise AI should not be a privilege. We price and package our tools so that any business — from seed-stage startups to mid-market teams — can compete at the highest level.',
  },
  {
    Icon: FaBolt,
    title: 'Speed to Value',
    desc: 'Time is the one resource you cannot get back. Every Agentix tool is designed to deliver measurable output within hours of activation, not weeks of setup.',
  },
  {
    Icon: FaHandshake,
    title: 'Human + AI',
    desc: 'We build tools that amplify your team, not replace them. The best outcomes happen when human creativity and judgment are paired with AI-scale execution.',
  },
  {
    Icon: FaChartLine,
    title: 'Relentless Improvement',
    desc: 'Our tools are continuously trained and updated as AI evolves. What you deploy today will be smarter next month — automatically, at no extra cost.',
  },
];

function ValuesSection() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-[#F8FAFC] py-20" aria-label="Our Values">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="text-[#F26522] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Values
          </p>
          <h2
            className="text-[#0D1E3A] font-black leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
          >
            What drives us.
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mt-5" />
        </motion.div>

        {/* Grid 2×2 */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {values.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUpChild}
              className="rounded-2xl border border-[#E8EDF3] bg-white p-8 hover:shadow-[0_6px_32px_rgba(13,30,58,0.08)] transition-shadow duration-300"
            >
              {/* Icon in orange circle */}
              <div className="w-12 h-12 rounded-full bg-[#F26522] flex items-center justify-center mb-5">
                <Icon className="text-white text-lg" />
              </div>
              <h3 className="text-[#0D1E3A] font-black text-[18px] mb-3">{title}</h3>
              <p className="text-[#4B5563] text-[15px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   6. TEAM SECTION
═══════════════════════════════════════════════════════════════════════════ */
const principles = ['Remote-first', 'AI-native', 'Customer-obsessed'];

function TeamSection() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-white py-20" aria-label="Our Team">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-[#F26522] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            The Team
          </p>
          <h2
            className="text-[#0D1E3A] font-black leading-tight mb-5"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)' }}
          >
            A globally distributed team obsessed with AI.
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mb-8" />
          <p className="text-[#4B5563] text-[17px] leading-relaxed mb-10">
            Agentix is built by engineers, product thinkers, and AI researchers
            working across time zones with a single mission: make AI tools that
            businesses actually use every day. No fluff, no demos — just tools that
            run in production and deliver results.
          </p>

          {/* Principle chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {principles.map((chip) => (
              <span
                key={chip}
                className="inline-block bg-[#F8FAFC] border border-[#E8EDF3] text-[#0D1E3A] font-semibold text-sm px-5 py-2.5 rounded-full"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   7. CTA BANNER
═══════════════════════════════════════════════════════════════════════════ */
function CtaBanner() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-white py-20" aria-label="Call to Action">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <div
            className="rounded-2xl text-center px-8 py-16"
            style={{
              background: 'linear-gradient(135deg, #F26522 0%, #d9541a 60%, #c04100 100%)',
            }}
          >
            <h2
              className="text-white font-black leading-tight mb-3"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.8rem)' }}
            >
              Ready to transform your business with AI?
            </h2>
            <p className="text-white/80 text-[17px] mb-8">
              Start with any tool — free.
            </p>
            <Link
              to="/category/content"
              className="inline-flex items-center gap-2 bg-white text-[#F26522] font-black px-9 py-4 rounded-full hover:bg-[#0D1E3A] hover:text-white transition-all duration-300 text-[15px] shadow-lg"
            >
              Explore Tools
              <FaArrowRight className="text-sm" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
