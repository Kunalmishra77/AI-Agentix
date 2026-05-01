import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaBrain,
  FaRobot,
  FaDatabase,
  FaGear,
  FaCode,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaShieldHalved,
  FaRocket,
  FaCheck,
  FaBolt,
  FaArrowRight,
} from 'react-icons/fa6';

/* ─── Reusable fade-up hook ─────────────────────────────────────────────── */
function useFadeUp(threshold = 0.15) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold });
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  };
  return { ref, inView, variants };
}

/* ─── Stagger children wrapper ──────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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
        <title>About AI Agentix — AI Engineers &amp; Strategists</title>
        <meta
          name="description"
          content="AI Agentix is a team of engineers, product builders, and AI strategists making agentic AI systems accessible and production-ready for every business."
        />
        <link rel="canonical" href="https://ai-agentix.com/about" />
      </Helmet>

      {/* 1 ── HERO ──────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* 2 ── MISSION ───────────────────────────────────────────────────── */}
      <MissionSection />

      {/* 3 ── WHAT WE BUILD ─────────────────────────────────────────────── */}
      <WhatWeBuildSection />

      {/* 4 ── OUR TEAM ──────────────────────────────────────────────────── */}
      <TeamSection />

      {/* 5 ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <WhyChooseUsSection />

      {/* 6 ── TECH STACK ────────────────────────────────────────────────── */}
      <TechStackSection />

      {/* 7 ── CTA BANNER ────────────────────────────────────────────────── */}
      <CtaBanner />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   1. HERO SECTION
═══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const { ref, inView, variants } = useFadeUp(0.1);

  const stats = [
    { value: '50+', label: 'AI Systems Shipped' },
    { value: '30+', label: 'Enterprise Clients' },
    { value: '3.9×', label: 'Avg ROI Delivered' },
  ];

  return (
    <section
      className="relative bg-[#0A1628] overflow-hidden pt-32 pb-24"
      aria-label="Hero"
    >
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, #38BDF8 0%, transparent 70%)',
        }}
      />

      <div className="content-wrap relative z-10">
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="eyebrow text-[#F26522] mb-5 tracking-[0.2em] uppercase text-sm font-semibold">
            Who We Are
          </p>

          <h1 className="font-display font-black text-white leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
            We Build AI That{' '}
            <span className="text-[#38BDF8]">Actually Works</span>
          </h1>

          {/* Orange accent line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#1A3050]" />
            <div className="h-1 w-20 rounded-full bg-[#F26522]" />
            <div className="h-px w-16 bg-[#1A3050]" />
          </div>

          <p className="text-[#8BA3C0] text-lg leading-relaxed max-w-2xl mx-auto mb-16">
            We are a global team of engineers, architects, and AI specialists obsessed
            with shipping production-grade AI systems that create real business value —
            not demos, not decks, not hype.
          </p>

          {/* Stat cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#1A3050] rounded-2xl overflow-hidden"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUpChild}
                className={`bg-[#0D1E3A] px-8 py-10 text-center
                  ${i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-[#1A3050]' : ''}`}
              >
                <p
                  className="font-display font-black text-[#F26522] leading-none mb-2"
                  style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
                >
                  {stat.value}
                </p>
                <p className="text-[#8BA3C0] text-sm uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   2. MISSION SECTION
═══════════════════════════════════════════════════════════════════════════ */
const pillars = [
  {
    title: 'Engineers, not consultants',
    desc: 'We write the code. We own the deployment. We fix the bugs.',
  },
  {
    title: 'Production-first mindset',
    desc: 'Every solution is built to run reliably at scale from day one.',
  },
  {
    title: 'No AI hype — only outcomes',
    desc: 'We measure success in ROI, automation hours, and cost saved.',
  },
  {
    title: 'Global remote team',
    desc: 'Top-tier AI talent across 12 time zones, always available.',
  },
];

function MissionSection() {
  const { ref, inView, variants } = useFadeUp();

  return (
    <section className="bg-white section-pad" aria-label="Our Mission">
      <div className="content-wrap">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left — text */}
          <motion.div variants={fadeUpChild}>
            <p className="eyebrow text-[#F26522] mb-4 uppercase tracking-widest text-xs font-semibold">
              Our Purpose
            </p>
            <h2 className="font-display font-black text-[#0A1628] leading-tight mb-6"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
              Our Mission
            </h2>
            <div className="w-12 h-1 bg-[#F26522] rounded-full mb-8" />
            <p className="text-[#4A5568] text-[17px] leading-relaxed mb-5">
              AI Agentix exists to close the gap between AI potential and business
              reality. We partner with forward-thinking companies to design, build, and
              operate AI systems that actually move the needle — automating workflows,
              augmenting teams, and unlocking revenue.
            </p>
            <p className="text-[#4A5568] text-[17px] leading-relaxed">
              We believe the best AI work happens when deep engineering craft meets
              genuine business understanding. That is why every engagement is led by
              senior engineers who have shipped AI in the real world — not junior
              consultants reading playbooks.
            </p>
          </motion.div>

          {/* Right — value pillars */}
          <motion.div variants={fadeUpChild} className="space-y-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-5 p-6 rounded-xl border border-[#E8EFF6] bg-[#F8FBFF] hover:border-[#F26522] transition-colors duration-300"
              >
                <span className="mt-1 flex-shrink-0 w-3 h-3 rounded-full bg-[#F26522]" />
                <div>
                  <p className="font-display font-black text-[#0A1628] text-[17px] mb-1">
                    {p.title}
                  </p>
                  <p className="text-[#6B7280] text-[15px] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   3. WHAT WE BUILD
═══════════════════════════════════════════════════════════════════════════ */
const capabilities = [
  {
    Icon: FaBrain,
    title: 'Agentic AI Systems',
    desc: 'Autonomous agents that reason, plan, and act across complex multi-step workflows without human hand-holding.',
  },
  {
    Icon: FaRobot,
    title: 'LLM Integrations',
    desc: 'GPT-4, Claude, Gemini, and open-source models wired into your product with streaming, tool-use, and memory.',
  },
  {
    Icon: FaDatabase,
    title: 'RAG & Knowledge Bases',
    desc: 'Retrieval-augmented generation pipelines that let AI query your private data accurately and at speed.',
  },
  {
    Icon: FaGear,
    title: 'Workflow Automation',
    desc: 'n8n, Zapier, and custom orchestration layers that eliminate repetitive work across your entire stack.',
  },
  {
    Icon: FaCode,
    title: 'Custom AI APIs',
    desc: 'Production-hardened REST and GraphQL APIs exposing AI capabilities to your internal and external apps.',
  },
  {
    Icon: FaChartLine,
    title: 'AI Analytics & Insight',
    desc: 'Dashboards and anomaly-detection systems powered by ML that surface the signals buried in your data.',
  },
];

function WhatWeBuildSection() {
  const { ref, inView, variants } = useFadeUp();

  return (
    <section className="bg-[#F0F7FF] section-pad" aria-label="What We Build">
      <div className="content-wrap">
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <p className="eyebrow text-[#F26522] mb-4 uppercase tracking-widest text-xs font-semibold">
            Capabilities
          </p>
          <h2 className="font-display font-black text-[#0A1628] leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
            What We Build
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mt-5" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUpChild}
              className="group bg-white rounded-2xl p-8 border border-[#D8E8F4] hover:border-[#38BDF8] hover:shadow-[0_8px_40px_rgba(56,189,248,0.12)] transition-all duration-350"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EBF8FF] flex items-center justify-center mb-5 group-hover:bg-[#38BDF8] transition-colors duration-300">
                <Icon className="text-[#38BDF8] group-hover:text-white text-xl transition-colors duration-300" />
              </div>
              <h3 className="font-display font-black text-[#0A1628] text-[18px] mb-3">
                {title}
              </h3>
              <p className="text-[#6B7280] text-[15px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   4. TEAM SECTION
═══════════════════════════════════════════════════════════════════════════ */
const team = [
  { initials: 'AK', name: 'Arjun Kapoor', role: 'Founder & AI Architect', color: '#F26522' },
  { initials: 'SM', name: 'Sofia Martinez', role: 'Lead ML Engineer', color: '#38BDF8' },
  { initials: 'JL', name: 'James Liu', role: 'Head of Automation', color: '#A78BFA' },
  { initials: 'NB', name: 'Nadia Becker', role: 'Senior LLM Engineer', color: '#34D399' },
  { initials: 'RP', name: 'Rohan Patel', role: 'AI Infrastructure Lead', color: '#F472B6' },
  { initials: 'EO', name: 'Elena Osei', role: 'Product & AI Strategy', color: '#FBBF24' },
];

function TeamSection() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-[#0D1E3A] section-pad" aria-label="Our Team">
      <div className="content-wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="eyebrow text-[#F26522] mb-4 uppercase tracking-widest text-xs font-semibold">
            The People
          </p>
          <h2 className="font-display font-black text-white leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
            Our Team
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mt-5" />
          <p className="text-[#8BA3C0] mt-6 max-w-xl mx-auto text-[16px] leading-relaxed">
            Senior engineers and AI specialists spread across the globe, united by a
            shared obsession with building things that work.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {team.map(({ initials, name, role, color }) => (
            <motion.div
              key={name}
              variants={fadeUpChild}
              className="bg-[#0A1628] rounded-2xl p-8 border border-[#1A3050] hover:border-[#F26522] transition-colors duration-300 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5 font-display font-black text-white text-xl"
                style={{ background: `${color}22`, border: `2px solid ${color}` }}
              >
                <span style={{ color }}>{initials}</span>
              </div>
              <p className="font-display font-black text-white text-[17px] mb-1">{name}</p>
              <p className="text-[#8BA3C0] text-[14px]">{role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   5. WHY CHOOSE US
═══════════════════════════════════════════════════════════════════════════ */
const differentiators = [
  {
    number: '01',
    Icon: FaRocket,
    title: 'Ship in Weeks, Not Months',
    desc: 'Our battle-tested component library and deployment infrastructure cuts delivery time by 60%.',
  },
  {
    number: '02',
    Icon: FaShieldHalved,
    title: 'Enterprise-Grade Security',
    desc: 'SOC-2-ready architecture, data isolation, and zero-trust principles baked in from the start.',
  },
  {
    number: '03',
    Icon: FaBolt,
    title: 'Obsessively Iterative',
    desc: 'Weekly demos, live dashboards, and async-friendly collaboration — no black-box delivery.',
  },
  {
    number: '04',
    Icon: FaGlobe,
    title: 'Built for Scale',
    desc: 'Cloud-native, horizontally scalable architectures that grow with your ambitions.',
  },
];

function WhyChooseUsSection() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-white section-pad" aria-label="Why Choose Us">
      <div className="content-wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="eyebrow text-[#F26522] mb-4 uppercase tracking-widest text-xs font-semibold">
            The Difference
          </p>
          <h2 className="font-display font-black text-[#0A1628] leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
            Why Choose Us
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mt-5" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {differentiators.map(({ number, Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUpChild}
              className="group relative rounded-2xl p-8 border border-[#E8EFF6] bg-[#F8FBFF] hover:border-[#F26522] hover:shadow-[0_8px_40px_rgba(242,101,34,0.10)] transition-all duration-350 overflow-hidden"
            >
              {/* Big watermark number */}
              <p
                className="absolute top-4 right-5 font-display font-black text-[4rem] leading-none select-none pointer-events-none opacity-[0.06] text-[#0A1628]"
              >
                {number}
              </p>

              <div className="w-11 h-11 rounded-xl bg-[#FFF3EC] flex items-center justify-center mb-5 group-hover:bg-[#F26522] transition-colors duration-300">
                <Icon className="text-[#F26522] group-hover:text-white text-lg transition-colors duration-300" />
              </div>
              <h3 className="font-display font-black text-[#0A1628] text-[17px] mb-3">
                {title}
              </h3>
              <p className="text-[#6B7280] text-[14px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   6. TECH STACK
═══════════════════════════════════════════════════════════════════════════ */
const techStack = [
  'OpenAI GPT-4o', 'Anthropic Claude', 'Google Gemini', 'LangChain',
  'LlamaIndex', 'Pinecone', 'Weaviate', 'n8n', 'FastAPI', 'Node.js',
  'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Vercel',
];

function TechStackSection() {
  const { ref, inView } = useFadeUp();

  return (
    <section className="bg-[#0A1628] section-pad" aria-label="Tech Stack">
      <div className="content-wrap">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p className="eyebrow text-[#F26522] mb-4 uppercase tracking-widest text-xs font-semibold">
            Tools &amp; Platforms
          </p>
          <h2 className="font-display font-black text-white leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
            Our Tech Stack
          </h2>
          <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mt-5" />
          <p className="text-[#8BA3C0] mt-6 max-w-lg mx-auto text-[16px]">
            Best-in-class tools, chosen for reliability and performance in production.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {techStack.map((tech) => (
            <motion.span
              key={tech}
              variants={fadeUpChild}
              className="px-5 py-2.5 rounded-full border border-[#1A3050] bg-[#0D1E3A] text-[#8BA3C0] text-sm font-medium hover:border-[#38BDF8] hover:text-[#38BDF8] hover:bg-[#0D1E3A] transition-all duration-250 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
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
    <section
      aria-label="Call to Action"
      style={{
        background: 'linear-gradient(135deg, #F26522 0%, #E04F0C 50%, #C93D00 100%)',
      }}
    >
      <div className="content-wrap py-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-white/70 uppercase tracking-widest text-xs font-semibold mb-4">
            Let's Build Together
          </p>
          <h2
            className="font-display font-black text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)' }}
          >
            Ready to Build Something Exceptional?
          </h2>
          <p className="text-white/80 text-[17px] max-w-xl mx-auto mb-10 leading-relaxed">
            Tell us what you need. We will come back within 24 hours with a clear plan,
            no fluff.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#F26522] font-display font-black px-9 py-4 rounded-full hover:bg-[#0A1628] hover:text-white transition-all duration-300 text-[16px] shadow-lg hover:shadow-xl"
          >
            Start a Conversation
            <FaArrowRight className="text-sm" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
