import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaChevronDown, FaChevronUp, FaMessage, FaBookOpen } from 'react-icons/fa6';
import SERVICES from '../data/services.js';
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

export default function ServicePage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const service = Array.isArray(SERVICES)
    ? SERVICES.find((s) => s.slug === slug)
    : (SERVICES[slug] || null);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center text-center px-6">
        <div>
          <p className="text-[80px] font-display font-black text-[#1A3050] leading-none select-none">404</p>
          <h1 className="text-2xl font-display font-bold text-white mt-4 mb-2">Service not found</h1>
          <p className="text-[#999] mb-6">The service you're looking for doesn't exist or has moved.</p>
          <Link to="/" className="btn-accent">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{service.title} — AI Agentix</title>
        <meta name="description" content={service.metaDesc} />
        <link rel="canonical" href={`https://ai-agentix.com/services/${service.slug}`} />
      </Helmet>

      {/* ── 1. HERO ──────────────────────────────── */}
      <section className="bg-[#0D1E3A] pt-[140px] pb-20 relative overflow-hidden">
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="content-wrap section-pad relative z-10" style={{ padding: '0 48px' }}>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span
                  className="eyebrow mb-4 inline-block"
                  style={{ color: service.categoryColor || '#F26522' }}
                >
                  {service.category}
                </span>
              </motion.div>
              <motion.h1
                className="section-title text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {service.title}
              </motion.h1>
              <motion.div
                className="w-12 h-px bg-[#F26522] mb-5"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
              <motion.p
                className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {service.tagline}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <Link to="/contact" className="btn-accent">
                  Let's talk <FaArrowRight size={16} />
                </Link>
                <Link to="/case-studies" className="btn-ghost">
                  View case studies <FaBookOpen size={15} />
                </Link>
              </motion.div>
            </div>

            {/* Right — stat cards */}
            <div className="flex flex-col gap-4 lg:min-w-[260px]">
              {(service.heroStats || []).slice(0, 3).map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-[#0A1628] border border-[#1A3050] rounded-xl px-6 py-5"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                >
                  <div className="text-3xl font-black font-display text-[#F26522] leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OVERVIEW ──────────────────────────── */}
      <section className="bg-white section-pad">
        <Section className="content-wrap">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left */}
            <div className="flex-1">
              <motion.h2
                variants={fadeUp}
                className="text-[#0D1E3A] font-display font-black text-3xl mb-5"
              >
                What is {service.title}?
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-[#555] leading-relaxed text-base"
              >
                {service.overview}
              </motion.p>
            </div>

            {/* Right — 2×2 benefit cards */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              {(service.benefits || []).slice(0, 4).map((b, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: 'rgba(242,101,34,0.1)' }}>
                    <Icon name={b.icon} size={20} style={{ color: '#F26522' }} />
                  </div>
                  <h3 className="text-[#0D1E3A] font-display font-bold text-base mb-1">{b.title}</h3>
                  <p className="text-[#999] text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── 3. CAPABILITIES ───────────────────────── */}
      <section className="bg-[#F0F7FF] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="eyebrow mb-3 inline-block">Core Capabilities</span>
            <h2 className="section-title text-[#0D1E3A]">What We Deliver</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(service.features || []).slice(0, 6).map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-xl shadow-sm p-6 border border-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-4"
                  style={{ background: 'rgba(13,30,58,0.08)' }}
                >
                  <Icon name={feat.icon} size={20} style={{ color: '#F26522' }} />
                </div>
                <h3 className="text-[#0D1E3A] font-display font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 4. PROCESS ────────────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="eyebrow mb-3 inline-block">Our Approach</span>
            <h2 className="section-title text-white">How We Do It</h2>
          </motion.div>

          {/* Steps row */}
          <div className="relative">
            {/* Horizontal dashed connector */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-px border-t border-dashed border-[#F26522]/30 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {(service.process || []).slice(0, 5).map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-start"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#F26522] font-black font-display text-2xl leading-none">
                      {String(step.step || i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-px h-8 bg-[#F26522]" />
                  </div>
                  <h3 className="text-white font-display font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── 5. USE CASES ──────────────────────────── */}
      <section className="bg-white section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow mb-3 inline-block">Who We Help</span>
            <h2 className="section-title text-[#0D1E3A]">Real-World Applications</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(service.useCases || []).slice(0, 4).map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="border border-[#E5E5E5] rounded-xl p-6 hover:border-[#F26522]/30 transition-colors"
              >
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4"
                  style={{
                    background: 'rgba(242,101,34,0.08)',
                    color: '#F26522',
                  }}
                >
                  {uc.industry}
                </span>
                <h3 className="text-[#0D1E3A] font-display font-bold text-lg mb-2">{uc.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed mb-4">{uc.desc}</p>
                {uc.result && (
                  <p className="text-[#F26522] font-bold text-sm">→ {uc.result}</p>
                )}
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 6. TECH STACK ─────────────────────────── */}
      <section className="bg-[#F0F7FF] section-pad-sm">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="eyebrow mb-3 inline-block">Technology</span>
            <h2 className="section-title text-[#0D1E3A]">Built With the Best</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {(service.technologies || []).map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-full px-5 py-2 text-[#0D1E3A] font-medium text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#F26522] flex-shrink-0" />
                {tech}
              </span>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* ── 7. RESULTS ────────────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="eyebrow mb-3 inline-block">Proven Impact</span>
            <h2 className="section-title text-white">Results That Matter</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1A3050] rounded-xl overflow-hidden">
            {(service.results || []).slice(0, 4).map((result, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-8 text-center border-r border-b border-[#1A3050] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
              >
                <div className="text-5xl font-black font-display text-[#F26522] leading-none mb-2">
                  {result.value}
                </div>
                <div className="text-white font-semibold text-sm mb-2">{result.label}</div>
                {result.desc && (
                  <div className="text-white/50 text-xs leading-relaxed">{result.desc}</div>
                )}
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 8. FAQ ────────────────────────────────── */}
      <section className="bg-white section-pad-sm">
        <Section className="content-wrap max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="eyebrow mb-3 inline-block">FAQ</span>
            <h2 className="section-title text-[#0D1E3A]">Common Questions</h2>
          </motion.div>
          <div className="divide-y divide-[#E5E5E5]">
            {(service.faq || []).slice(0, 4).map((item, i) => (
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

          {/* CTA strip */}
          <motion.div
            variants={fadeUp}
            className="mt-12 bg-[#0D1E3A] rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-white font-display font-bold text-xl mb-1">Ready to get started?</h3>
              <p className="text-white/60 text-sm">Let's build something exceptional together.</p>
            </div>
            <Link to="/contact" className="btn-accent flex-shrink-0">
              Talk to an expert <FaMessage size={15} />
            </Link>
          </motion.div>
        </Section>
      </section>
    </div>
  );
}
