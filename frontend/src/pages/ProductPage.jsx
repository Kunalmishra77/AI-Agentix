import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaArrowRight, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import PRODUCTS from '../data/products.js';
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

export default function ProductPage() {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const product = Array.isArray(PRODUCTS)
    ? PRODUCTS.find((p) => p.slug === slug)
    : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center text-center px-6">
        <div>
          <p className="text-[80px] font-display font-black text-[#1A3050] leading-none select-none">404</p>
          <h1 className="text-2xl font-display font-bold text-white mt-4 mb-2">Product not found</h1>
          <p className="text-[#999] mb-6">The product you're looking for doesn't exist or has moved.</p>
          <Link to="/" className="btn-accent">Go Home</Link>
        </div>
      </div>
    );
  }

  const accent = product.accentColor || '#F26522';

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{product.name} — AI Agentix Products</title>
        <meta name="description" content={product.metaDesc} />
        <link rel="canonical" href={`https://ai-agentix.com/products/${product.slug}`} />
      </Helmet>

      {/* ── 1. HERO ──────────────────────────────── */}
      <section
        className="pt-[140px] pb-20 relative overflow-hidden"
        style={{ background: product.gradient || '#F0F7FF' }}
      >
        <div className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#0D1E3A 1px, transparent 1px), linear-gradient(90deg, #0D1E3A 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="content-wrap relative z-10" style={{ padding: '0 48px' }}>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left */}
            <div className="flex-1 max-w-2xl">
              {product.badge && (
                <motion.span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5"
                  style={{
                    background: product.iconBg || 'rgba(13,30,58,0.08)',
                    color: accent,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {product.badge}
                </motion.span>
              )}
              <motion.h1
                className="section-title mb-4"
                style={{ color: '#0D1E3A' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {product.name}
              </motion.h1>
              <motion.div
                className="w-12 h-px mb-5"
                style={{ background: accent, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <motion.p
                className="text-[#0D1E3A]/70 text-lg leading-relaxed mb-8 max-w-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {product.tagline}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <Link to="/contact" className="btn-accent">
                  Get started <FaArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 font-display font-bold text-sm border rounded-none transition-all duration-200 hover:bg-[#0D1E3A]/5"
                  style={{ borderColor: '#0D1E3A', color: '#0D1E3A' }}
                >
                  Book a demo
                </Link>
              </motion.div>
            </div>

            {/* Right — stat cards */}
            <div className="flex flex-col gap-4 lg:min-w-[260px]">
              {(product.heroStats || []).slice(0, 3).map((stat, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl px-6 py-5 border"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(8px)',
                    borderColor: 'rgba(13,30,58,0.12)',
                  }}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                >
                  <div
                    className="text-3xl font-black font-display leading-none mb-1"
                    style={{ color: accent }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[#0D1E3A]/60 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OVERVIEW ──────────────────────────── */}
      <section className="bg-white section-pad">
        <Section className="content-wrap text-center">
          <motion.span variants={fadeUp} className="eyebrow mb-3 inline-block">
            Product Overview
          </motion.span>
          <motion.p
            variants={fadeUp}
            className="text-[#555] text-lg leading-relaxed max-w-3xl mx-auto mb-14"
          >
            {product.overview}
          </motion.p>

          {/* 3 value props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(product.features || []).slice(0, 3).map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center p-6"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{ background: product.iconBg || 'rgba(242,101,34,0.08)' }}
                >
                  <Icon name={feat.icon} size={24} style={{ color: accent }} />
                </div>
                <h3 className="text-[#0D1E3A] font-display font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 3. FEATURES (dark) ────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="eyebrow mb-3 inline-block">Full Feature Set</span>
            <h2 className="section-title text-white">Everything Included</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(product.features || []).slice(0, 6).map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl p-6 border border-[#1A3050] hover:border-[#F26522]/30 transition-colors duration-300"
                style={{ background: '#1A3050' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
                  style={{ background: product.iconBg || 'rgba(242,101,34,0.12)' }}
                >
                  <Icon name={feat.icon} size={18} style={{ color: accent }} />
                </div>
                <h3 className="text-white font-display font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-[#999] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 4. HOW IT WORKS (vertical timeline) ───── */}
      <section className="bg-white section-pad">
        <Section className="content-wrap max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="eyebrow mb-3 inline-block">Workflow</span>
            <h2 className="section-title text-[#0D1E3A]">How It Works</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, #F26522, transparent)' }}
            />

            <div className="space-y-10">
              {(product.howItWorks || []).slice(0, 5).map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-8 relative"
                >
                  {/* Number circle */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black font-display text-white text-sm flex-shrink-0 relative z-10"
                    style={{ background: '#F26522', minWidth: '40px' }}
                  >
                    {step.step || i + 1}
                  </div>
                  <div className="pb-2">
                    <h3 className="text-[#0D1E3A] font-display font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-[#555] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── 5. INTEGRATIONS ───────────────────────── */}
      <section className="bg-[#F0F7FF] section-pad-sm">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="text-center mb-10">
            <span className="eyebrow mb-3 inline-block">Integrations</span>
            <h2 className="section-title text-[#0D1E3A]">Connects With Your Stack</h2>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            {(product.integrations || []).slice(0, 10).map((integration, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 bg-white border border-[#E5E5E5] rounded-full px-5 py-2 text-[#0D1E3A] font-medium text-sm hover:border-[#F26522]/40 hover:shadow-sm transition-all"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: accent }} />
                {integration}
              </span>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* ── 6. USE CASES ──────────────────────────── */}
      <section className="bg-[#0D1E3A] section-pad">
        <Section className="content-wrap">
          <motion.div variants={fadeUp} className="mb-12">
            <span className="eyebrow mb-3 inline-block">Applications</span>
            <h2 className="section-title text-white">Proven Use Cases</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(product.useCases || []).slice(0, 4).map((uc, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-xl p-6"
              >
                <h3 className="text-[#0D1E3A] font-display font-bold text-lg mb-2">{uc.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </section>

      {/* ── 7. PRICING ────────────────────────────── */}
      {product.pricing && product.pricing.length > 0 && (
        <section className="bg-white section-pad">
          <Section className="content-wrap">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="eyebrow mb-3 inline-block">Pricing</span>
              <h2 className="section-title text-[#0D1E3A]">Simple, Transparent Pricing</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {product.pricing.map((plan, i) => {
                const highlighted = plan.highlighted;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`rounded-2xl p-8 flex flex-col border transition-all ${
                      highlighted
                        ? 'scale-105 shadow-2xl'
                        : 'border-[#E5E5E5] shadow-sm'
                    }`}
                    style={
                      highlighted
                        ? { borderColor: accent, borderWidth: '2px' }
                        : {}
                    }
                  >
                    {highlighted && (
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full self-start mb-4"
                        style={{ background: `${accent}18`, color: accent }}
                      >
                        Most Popular
                      </span>
                    )}
                    <div className="mb-1">
                      <h3 className="text-[#0D1E3A] font-display font-black text-xl">{plan.plan}</h3>
                    </div>
                    <div className="my-4">
                      <span
                        className="font-black font-display text-4xl"
                        style={{ color: highlighted ? accent : '#0D1E3A' }}
                      >
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-[#555] text-sm mb-6">{plan.desc}</p>

                    <ul className="space-y-3 mb-8 flex-1">
                      {(plan.features || []).map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#555]">
                          <FaCheck
                            size={15}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: accent }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className={highlighted ? 'btn-accent text-center' : 'inline-flex items-center justify-center gap-2 px-6 py-3 font-display font-bold text-sm border transition-all hover:bg-[#0D1E3A] hover:text-white'}
                      style={!highlighted ? { borderColor: '#0D1E3A', color: '#0D1E3A' } : {}}
                    >
                      Get started
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Section>
        </section>
      )}

      {/* ── 8. CTA ────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: product.gradient || 'linear-gradient(135deg, #0D1E3A 0%, #0A1628 100%)' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <Section className="content-wrap relative z-10 section-pad text-center">
          <motion.span
            variants={fadeUp}
            className="eyebrow mb-4 inline-block"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Get Started Today
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="section-title text-white mb-4"
          >
            Ready to experience {product.name}?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/70 text-lg max-w-xl mx-auto mb-8"
          >
            Join hundreds of forward-thinking teams already using {product.name} to
            accelerate their operations with AI.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-accent">
              Start free trial <FaArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-ghost">
              Talk to sales
            </Link>
          </motion.div>
        </Section>
      </section>
    </div>
  );
}
