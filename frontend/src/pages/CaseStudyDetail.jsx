import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaCircleXmark,
  FaArrowLeft,
  FaQuoteLeft,
  FaArrowRight,
} from 'react-icons/fa6';
import { fetchCaseStudyBySlug } from '../lib/api.js';

/* ─── Fade-in animation wrapper ─── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Loading skeleton — 3-panel pulse ─── */
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col items-center justify-center gap-6 px-8">
      <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#0D1E3A] rounded-xl p-8 space-y-4 animate-pulse"
          >
            <div className="h-3 w-16 rounded bg-[#1A3050]" />
            <div className="h-8 w-full rounded-lg bg-[#1A3050]" />
            <div className="h-3 w-3/4 rounded bg-[#1A3050]" />
            <div className="h-3 w-5/6 rounded bg-[#1A3050]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Error / not-found state ─── */
function CaseStudyNotFound() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-[#0D1E3A] border border-[#1A3050] rounded-2xl px-12 py-16 max-w-[480px] w-full text-center"
      >
        <FaCircleXmark className="text-[#F26522] text-[52px] mx-auto mb-6" />
        <h1 className="font-display font-black text-white text-[26px] mb-3">
          Case Study Not Found
        </h1>
        <p className="text-[#888] text-[15px] leading-relaxed mb-8">
          This case study may have been moved or removed. Explore our other success stories below.
        </p>
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#d9561b] text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <FaArrowLeft className="text-[13px]" />
          Back to Case Studies
        </Link>
      </motion.div>
    </div>
  );
}

/* ─── Section number badge ─── */
function SectionBadge({ number }) {
  return (
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F26522] text-white text-[12px] font-black mb-5 shrink-0">
      {number}
    </span>
  );
}

/* ─── Default metrics when none are provided ─── */
const DEFAULT_METRICS = [
  { value: '3×', label: 'Efficiency Gain' },
  { value: '60%', label: 'Cost Reduction' },
  { value: '24/7', label: 'AI Coverage' },
];

/* ─── Default technologies when none are provided ─── */
const DEFAULT_TECHNOLOGIES = [
  'Python',
  'LangChain',
  'OpenAI GPT-4',
  'React',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'AWS',
];

/* ─── Main page component ─── */
export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { data: cs, isLoading, isError } = useQuery({
    queryKey: ['caseStudy', slug],
    queryFn: () => fetchCaseStudyBySlug(slug),
  });

  if (isLoading) return <LoadingSkeleton />;
  if (isError || !cs) return <CaseStudyNotFound />;

  const metrics = cs.metrics?.length ? cs.metrics : DEFAULT_METRICS;
  const technologies =
    cs.technologies?.length ? cs.technologies : DEFAULT_TECHNOLOGIES;
  const displayMetrics = metrics.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>{cs.title} — AI Agentix Case Study</title>
        <meta
          name="description"
          content={
            cs.result?.slice(0, 155) ||
            'AI Agentix case study on enterprise AI deployment.'
          }
        />
        <link
          rel="canonical"
          href={`https://ai-agentix.com/case-studies/${cs.slug}`}
        />
      </Helmet>

      {/* ── HERO ── */}
      <section className="bg-[#0A1628] pt-[120px] pb-16">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="grid gap-10 lg:grid-cols-[60%_1fr] items-start">

            {/* LEFT: title area */}
            <FadeIn>
              {cs.industry && (
                <span className="inline-block bg-[#F26522] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                  {cs.industry}
                </span>
              )}
              <h1
                className="font-display font-black text-white leading-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
              >
                {cs.title}
              </h1>
              {cs.client && (
                <p className="text-[#888] text-[16px] mb-3">
                  Client:{' '}
                  <span className="text-white font-medium">{cs.client}</span>
                </p>
              )}
              {cs.service && (
                <span className="inline-block border border-[#1A3050] text-[#888] text-[12px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                  {cs.service}
                </span>
              )}
            </FadeIn>

            {/* RIGHT: Results at a Glance card */}
            <FadeIn delay={0.12}>
              <div className="bg-[#0D1E3A] rounded-xl p-8 border border-[#1A3050]">
                <p className="text-[11px] uppercase tracking-widest text-[#888] font-semibold mb-6">
                  Results at a Glance
                </p>
                <div className="space-y-5">
                  {metrics.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex items-baseline gap-4">
                      <span className="font-display font-black text-[#F26522] text-[32px] leading-none">
                        {m.value}
                      </span>
                      <span className="text-[#888] text-[13px] uppercase tracking-wide">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── METRICS BAND ── */}
      <section className="bg-[#F26522] py-12">
        <div className="max-w-[1100px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {displayMetrics.map((m, i) => (
              <div key={i} className="px-8 py-4 text-center">
                <p className="font-display font-black text-white text-[38px] leading-none mb-2">
                  {m.value}
                </p>
                <p className="text-white/80 text-[11px] uppercase tracking-widest font-semibold">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT SECTIONS ── */}
      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-8 space-y-16">

          {/* Challenge */}
          {cs.challenge && (
            <FadeIn>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="shrink-0">
                  <SectionBadge number="01" />
                </div>
                <div>
                  <h2 className="font-display font-black text-[#0A1628] text-[24px] mb-4">
                    The Challenge
                  </h2>
                  <p className="text-[17px] text-[#444] leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Solution */}
          {cs.solution && (
            <FadeIn delay={0.08}>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="shrink-0">
                  <SectionBadge number="02" />
                </div>
                <div>
                  <h2 className="font-display font-black text-[#0A1628] text-[24px] mb-4">
                    Our Solution
                  </h2>
                  <p className="text-[17px] text-[#444] leading-relaxed">
                    {cs.solution}
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Results */}
          {cs.result && (
            <FadeIn delay={0.14}>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="shrink-0">
                  <SectionBadge number="03" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-black text-[#0A1628] text-[24px] mb-4">
                    The Outcome
                  </h2>
                  <div className="bg-[#0A1628] rounded-xl p-10 border-l-4 border-[#F26522]">
                    <p className="text-[17px] text-white leading-relaxed">
                      {cs.result}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="bg-[#f7f7f5] py-16">
        <div className="max-w-[900px] mx-auto px-8">
          <FadeIn>
            <p className="text-[11px] uppercase tracking-widest text-[#888] font-semibold mb-2">
              Stack
            </p>
            <h2 className="font-display font-black text-[#0A1628] text-[26px] mb-8">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-white border border-[#e5e5e5] text-[#444] px-4 py-2 rounded-full text-[13px] font-medium shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIAL / QUOTE ── */}
      <section className="bg-[#0D1E3A] py-16">
        <div className="max-w-[780px] mx-auto px-8 text-center">
          <FadeIn>
            <FaQuoteLeft className="text-[#F26522] text-[42px] mx-auto mb-8" />
            {cs.quote ? (
              <>
                <blockquote className="text-white text-[20px] italic leading-relaxed font-light mb-8">
                  "{cs.quote.text || cs.quote}"
                </blockquote>
                {cs.quote.author && (
                  <div>
                    <p className="text-white font-semibold text-[15px]">
                      {cs.quote.author}
                    </p>
                    {cs.quote.role && (
                      <p className="text-[#888] text-[13px] mt-1">
                        {cs.quote.role}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <blockquote className="text-white text-[20px] italic leading-relaxed font-light mb-8">
                  "Working with AI Agentix transformed our operations. The results exceeded every benchmark we set, and the team's expertise in enterprise AI was evident at every step."
                </blockquote>
                <div>
                  <p className="text-white font-semibold text-[15px]">
                    {cs.client || 'Enterprise Client'}
                  </p>
                  <p className="text-[#888] text-[13px] mt-1">
                    {cs.industry || 'Technology'} · AI Transformation Project
                  </p>
                </div>
              </>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-[#F26522] to-[#C93D00] py-20">
        <div className="max-w-[720px] mx-auto px-8 text-center">
          <FadeIn>
            <p className="text-white/80 text-[12px] uppercase tracking-widest font-semibold mb-4">
              Your transformation starts here
            </p>
            <h2 className="font-display font-black text-white text-[32px] md:text-[40px] mb-5 leading-tight">
              Ready for Results Like These?
            </h2>
            <p className="text-white/80 text-[16px] mb-10 leading-relaxed">
              Let's design an AI strategy built specifically for your business,
              your goals, and your timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#F26522] font-bold px-8 py-4 rounded-full text-[15px] hover:bg-white/90 transition-colors"
              >
                Start Your Project
                <FaArrowRight className="text-[13px]" />
              </Link>
              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-semibold px-8 py-4 rounded-full text-[15px] hover:bg-white/10 transition-colors"
              >
                View All Case Studies
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BACK NAVIGATION ── */}
      {/* Desktop: inline link below CTA */}
      <div className="hidden md:flex bg-[#0A1628] px-8 py-8 max-w-[1100px] mx-auto">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-[#888] hover:text-[#F26522] text-[14px] transition-colors group"
        >
          <FaArrowLeft className="text-[12px] group-hover:-translate-x-1 transition-transform" />
          Back to Case Studies
        </Link>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0D1E3A] border-t border-[#1A3050] px-6 py-4">
        <Link
          to="/case-studies"
          className="flex items-center gap-2 text-white text-[14px] font-medium"
        >
          <FaArrowLeft className="text-[13px]" />
          Back to Case Studies
        </Link>
      </div>
    </div>
  );
}
