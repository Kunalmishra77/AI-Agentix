import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaRocket,
  FaGlobe,
  FaBrain,
  FaHandshake,
  FaSackDollar,
  FaClock,
  FaBookOpen,
  FaRobot,
  FaInfinity,
  FaEarthAmericas,
  FaChevronDown,
  FaArrowRight,
  FaCircleCheck,
} from 'react-icons/fa6';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const CULTURE = [
  {
    icon: FaRocket,
    title: 'Ship Real Products',
    desc: 'We build AI systems that go into production and create measurable business impact — not demos.',
  },
  {
    icon: FaGlobe,
    title: 'Remote First',
    desc: 'Work from anywhere. Our async culture is built for distributed teams across time zones.',
  },
  {
    icon: FaBrain,
    title: 'Continuous Learning',
    desc: 'Dedicated learning budget, weekly AI research sessions, and access to the latest tools.',
  },
  {
    icon: FaHandshake,
    title: 'Ownership Culture',
    desc: 'Every team member owns their domain end-to-end. No micro-management, full accountability.',
  },
];

const BENEFITS = [
  { icon: FaSackDollar,    title: 'Competitive Pay',    desc: 'Top-of-market salaries benchmarked against leading AI companies worldwide.' },
  { icon: FaClock,         title: 'Flexible Hours',     desc: 'Results-oriented culture. Work when you are most productive, no fixed 9-to-5.' },
  { icon: FaBookOpen,      title: 'Learning Budget',    desc: '$2 000 / year for courses, conferences, books, and certifications.' },
  { icon: FaRobot,         title: 'Latest AI Tools',   desc: 'Full access to GPT-4o, Claude, Gemini, and every frontier model on day one.' },
  { icon: FaInfinity,      title: 'Async Culture',      desc: 'Deep-work blocks are protected. Meetings only when async won\'t cut it.' },
  { icon: FaEarthAmericas, title: 'Global Team',        desc: 'Colleagues in 15+ countries. Diverse perspectives built into every project.' },
];

const OPENINGS = [
  {
    title: 'Senior AI Engineer',
    type: 'Full-time',
    department: 'Engineering',
    description:
      'Build production-grade agentic AI systems using LangChain, AutoGen, and custom agent frameworks. You will architect multi-agent pipelines and deploy them for enterprise clients.',
    requirements: [
      '3+ years Python',
      'LangChain / AutoGen experience',
      'Production LLM deployment',
      'Strong system design',
    ],
  },
  {
    title: 'n8n Automation Specialist',
    type: 'Full-time',
    department: 'Engineering',
    description:
      'Design, build, and optimize complex n8n workflows for enterprise clients. You will connect AI capabilities with business systems and ensure reliability at scale.',
    requirements: [
      '2+ years n8n experience',
      'API integration expertise',
      'JavaScript proficiency',
      'REST / Webhook knowledge',
    ],
  },
  {
    title: 'AI Solutions Architect',
    type: 'Full-time',
    department: 'Sales & Solutions',
    description:
      'Work with enterprise prospects to understand their AI needs, design technical solutions, and guide them from discovery through successful deployment.',
    requirements: [
      '5+ years enterprise tech',
      'AI / ML familiarity',
      'Excellent communication',
      'Solution selling experience',
    ],
  },
  {
    title: 'Prompt Engineer',
    type: 'Contract',
    department: 'Engineering',
    description:
      'Craft, test, and optimise prompts for production AI systems. You will work across LLM providers to build reliable, consistent outputs for diverse business applications.',
    requirements: [
      'Deep LLM understanding',
      'Evaluation frameworks',
      'Python scripting',
      'Analytical mindset',
    ],
  },
];

/* ─── Animated counter ──────────────────────────────────────────────────────── */
function Counter({ target, suffix = '', duration = 1.8 }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
      >
        <CountUp inView={inView} target={target} suffix={suffix} duration={duration} />
      </motion.span>
    </motion.span>
  );
}

function CountUp({ inView, target, suffix, duration }) {
  const [display, setDisplay] = useState(0);

  if (inView && display === 0 && target > 0) {
    const steps = 40;
    const step = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setDisplay(target);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current));
      }
    }, (duration * 1000) / steps);
  }

  return <>{inView ? `${display === 0 && target > 0 ? '' : display}${suffix}` : '0'}</>;
}

/* ─── Accordion item ─────────────────────────────────────────────────────────── */
function JobCard({ job, index }) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-[#1A3050] bg-[#0D1E3A] overflow-hidden"
      style={{ borderLeft: open ? '3px solid #F26522' : '3px solid transparent', transition: 'border-color 0.25s' }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-8 py-6 text-left group"
      >
        <div className="flex flex-col gap-1">
          <h3
            className="text-[18px] font-display font-bold text-white group-hover:text-[#F26522] transition-colors duration-200"
          >
            {job.title}
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full ${
                job.type === 'Contract'
                  ? 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30'
                  : 'bg-[#F26522]/10 text-[#F26522] border border-[#F26522]/30'
              }`}
            >
              {job.type}
            </span>
            <span className="text-[12px] text-[#555]">Remote · {job.department}</span>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#F26522] flex-shrink-0 ml-4"
        >
          <FaChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 space-y-5 border-t border-[#1A3050] pt-6">
              <p className="text-[15px] text-[#888] leading-relaxed">{job.description}</p>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#555] mb-3 font-semibold">
                  Requirements
                </p>
                <ul className="space-y-2">
                  {job.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[14px] text-[#aaa]">
                      <FaCircleCheck className="text-[#F26522] flex-shrink-0 mt-0.5" size={14} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#F26522] text-white text-[13px] font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#FF7A3D] transition-colors duration-200 mt-2"
              >
                Apply Now <FaArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function Career() {
  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: cultureRef, inView: cultureInView }   = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: ctaRef,     inView: ctaInView }        = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>Careers — Join AI Agentix</title>
        <meta
          name="description"
          content="Join AI Agentix, a remote-first team building the next generation of agentic AI. Open roles in AI engineering, n8n automation, and AI solutions."
        />
        <link rel="canonical" href="https://ai-agentix.com/careers" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] flex items-center bg-[#0A1628] pt-[120px] pb-20 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(242,101,34,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,101,34,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      >
        {/* Glow blobs */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F26522 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4"
            >
              Join Our Team
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}
            >
              Build the{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #F26522 0%, #FF9A5C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Future of AI
              </span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3, transformOrigin: 'left' }}
              className="w-12 h-1 bg-[#F26522] rounded-full mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[17px] text-[#888] leading-relaxed max-w-xl"
            >
              We are a remote-first team of engineers, researchers, and AI strategists building
              the next generation of agentic AI systems. If you are obsessed with making AI
              actually work in the real world, we want to hear from you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href="#open-positions"
                className="inline-flex items-center gap-2 bg-[#F26522] text-white font-bold text-[14px] uppercase tracking-wider px-7 py-3.5 rounded-lg hover:bg-[#FF7A3D] transition-colors duration-200"
              >
                View Open Roles <FaArrowRight size={13} />
              </a>
              <a
                href="#culture"
                className="inline-flex items-center gap-2 border border-[#1A3050] text-[#aaa] font-semibold text-[14px] px-7 py-3.5 rounded-lg hover:border-[#F26522] hover:text-white transition-colors duration-200"
              >
                Our Culture
              </a>
            </motion.div>
          </div>

          {/* Right — stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div
              className="rounded-2xl p-8 border border-[#1A3050] relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0D1E3A 0%, #112240 60%, #0D1E3A 100%)',
              }}
            >
              {/* Decorative corner accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 opacity-30 rounded-bl-full"
                style={{ background: 'linear-gradient(225deg, #F26522, transparent)' }}
              />

              <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-8">
                Our Team at a Glance
              </p>

              <div className="grid grid-cols-3 gap-0 border border-[#1A3050] rounded-xl overflow-hidden mb-8">
                {[
                  { label: '100%', sub: 'Remote', raw: 100 },
                  { label: '20+',  sub: 'Engineers', raw: 20 },
                  { label: '15+',  sub: 'Countries',  raw: 15 },
                ].map((s, i) => (
                  <div
                    key={s.sub}
                    className={`p-5 text-center ${i < 2 ? 'border-r border-[#1A3050]' : ''} bg-[#0A1628]/60`}
                  >
                    <p className="text-[28px] font-display font-black text-[#F26522] leading-none">
                      {s.label}
                    </p>
                    <p className="text-[11px] text-[#555] mt-1.5 uppercase tracking-wider">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { icon: FaGlobe,  text: 'Fully distributed, async-first culture' },
                  { icon: FaRobot,  text: 'Working on frontier AI every single day' },
                  { icon: FaRocket, text: 'Shipping to enterprise clients in 30+ countries' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-[14px] text-[#aaa]">
                    <Icon size={14} className="text-[#F26522] flex-shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Culture strip ─────────────────────────────────────────────────────── */}
      <section id="culture" className="bg-white py-20">
        <div ref={cultureRef} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-3">
              How We Work
            </p>
            <h2
              className="font-display font-black text-[#0A1628] leading-tight"
              style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
            >
              Culture That Enables Great Work
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-[#e8edf4] rounded-xl p-7 hover:border-[#F26522] hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F26522]/10 flex items-center justify-center mb-5 group-hover:bg-[#F26522]/20 transition-colors duration-200">
                  <item.icon className="text-[#F26522]" size={20} />
                </div>
                <h3 className="text-[15px] font-display font-bold text-[#0A1628] mb-2">{item.title}</h3>
                <p className="text-[13px] text-[#777] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits grid ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0A1628] py-24">
        <div ref={benefitsRef} className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4">
              Perks &amp; Benefits
            </p>
            <h2
              className="font-display font-black text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
            >
              Why Work With Us
            </h2>
            <div className="w-12 h-1 bg-[#F26522] rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-[#1A3050] bg-[#0D1E3A] rounded-xl p-7 hover:border-[#F26522] transition-colors duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F26522]/10 flex items-center justify-center mb-5 group-hover:bg-[#F26522]/20 transition-colors duration-200">
                  <b.icon className="text-[#F26522]" size={18} />
                </div>
                <h3 className="text-[15px] font-display font-bold text-white mb-2">{b.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ─────────────────────────────────────────────────────── */}
      <section id="open-positions" className="bg-[#0A1628] pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12 border-t border-[#1A3050] pt-16">
            <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4">
              Open Positions
            </p>
            <h2
              className="font-display font-black text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
            >
              Current Openings
            </h2>
            <div className="w-12 h-1 bg-[#F26522] rounded-full" />
          </div>

          <div className="space-y-3">
            {OPENINGS.map((job, i) => (
              <JobCard key={job.title} job={job} index={i} />
            ))}
          </div>

          {/* No match CTA */}
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mt-10 p-8 bg-[#0D1E3A] border border-[#1A3050] rounded-xl"
            style={{ borderLeft: '4px solid #F26522' }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-[18px] font-display font-bold text-white mb-2">
                  Don&rsquo;t see your role?
                </h3>
                <p className="text-[14px] text-[#888] leading-relaxed max-w-lg">
                  We hire exceptional people year-round. Send us your CV and tell us how
                  you&rsquo;d contribute — we&rsquo;re always looking.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 flex-shrink-0 bg-[#F26522] text-white font-bold text-[13px] uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-[#FF7A3D] transition-colors duration-200 whitespace-nowrap"
              >
                Get In Touch <FaArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
