import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useQuery } from '@tanstack/react-query';
import { fetchCaseStudies } from '../../lib/api.js';

const FALLBACK = [
  {
    _id: '1',
    title: 'Intelligent Agentic RAG for Enterprise Knowledge Management',
    client: 'Global Automotive OEM',
    industry: 'Automotive',
    slug: 'intelligent-agentic-rag',
    image: '/assets/images/Customer%20stories1.webp',
    imageBg: 'linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 60%, #38bdf8 100%)',
    quote: {
      text: "The hardest part wasn't building the AI — it was making it right. Anyone can wire up a language model and demo it on clean data. The real work is in the edge cases.",
      author: 'Bartłomiej Grasza',
      role: 'Principal AI Engineer',
    },
    metrics: [
      { value: '85%', label: 'Query accuracy improvement' },
      { value: '60%', label: 'Reduction in search time' },
    ],
    service: 'AI Agents Development',
  },
  {
    _id: '2',
    title: 'Scalable AI Data Platform for Connected Vehicles',
    client: 'Tier-1 Automotive Supplier',
    industry: 'Automotive',
    slug: 'scalable-ai-data-platform-for-connected-vehicles',
    image: '/assets/images/Customer%20stories2.webp',
    imageBg: 'linear-gradient(135deg, #064e3b 0%, #10b981 60%, #6ee7b7 100%)',
    quote: {
      text: "Before this platform, our teams were working with fragmented vehicle telemetry from four different systems. Now we have a unified, real-time view that actually drives decisions.",
      author: 'Maciej Trzaskalski',
      role: 'Project Manager',
    },
    metrics: [
      { value: '4×', label: 'Faster data processing' },
      { value: '99.9%', label: 'Platform uptime' },
    ],
    service: 'Data Engineering',
  },
  {
    _id: '3',
    title: 'Modernising Testing Infrastructure — Saving $1M+ Annually',
    client: 'Global Healthcare Organisation',
    industry: 'Healthcare',
    slug: 'modernizing-testing',
    image: '/assets/images/Customer%20stories3.webp',
    imageBg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a78bfa 100%)',
    quote: {
      text: "We were spending enormous resources on manual QA that wasn't catching defects at the rate we needed. The AI-driven test automation fundamentally changed how our team thinks about quality.",
      author: 'Sarah Okonkwo',
      role: 'Head of Engineering',
    },
    metrics: [
      { value: '$1M+', label: 'Annual savings' },
      { value: '<1%', label: 'Defect leakage' },
    ],
    service: 'AI Test Automation',
  },
  {
    _id: '4',
    title: 'Real-Time Fraud Detection Platform Slashing REC Validation to 15 Seconds',
    client: 'Renewable Energy Certifier',
    industry: 'Finance & Insurance',
    slug: 'real-time-fraud-detection-ai-platform',
    image: '/assets/images/Customer%20stories4.webp',
    imageBg: 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 60%, #fca5a5 100%)',
    quote: {
      text: "Validation that used to take hours now takes 15 seconds. Our analysts went from doing repetitive rule checks to focusing on genuinely complex cases that require human judgment.",
      author: 'Piotr Danielczyk',
      role: 'Senior Data Engineer',
    },
    metrics: [
      { value: '15s', label: 'Validation time (was hours)' },
      { value: '99.2%', label: 'Detection accuracy' },
    ],
    service: 'MLOps & AI Integration',
  },
];

export default function CustomerStories() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { data: stories = FALLBACK } = useQuery({
    queryKey: ['caseStudies'],
    queryFn: fetchCaseStudies,
    placeholderData: FALLBACK,
  });

  const next = useCallback(() => setIdx((i) => (i + 1) % stories.length), [stories.length]);
  const prev = () => setIdx((i) => (i - 1 + stories.length) % stories.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const story = stories[idx];
  // Use fallback gradient if no real image
  const fallback = FALLBACK.find((f) => f._id === story._id);
  const imageBg = story.image ? undefined : (fallback?.imageBg || 'linear-gradient(135deg,#1A3050,#333)');

  return (
    <section className="bg-[#0D1E3A] border-y border-[#1A3050] section-pad">
      <div ref={ref} className="content-wrap">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-title text-white mb-2"
        >
          Customer stories
        </motion.h2>
        <div className="w-12 h-px bg-[#F26522] mb-12" />

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={story._id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-0"
              style={{ minHeight: '380px' }}
            >
              {/* LEFT — image panel */}
              <div
                className="lg:col-span-2 relative overflow-hidden"
                style={{
                  background: imageBg,
                  backgroundImage: (story.coverImage || story.image) ? `url("${encodeURI(story.coverImage || story.image)}")` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '320px',
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Industry badge + slide number */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <span className="text-[11px] uppercase tracking-widest text-white/80 font-semibold bg-white/10 px-3 py-1.5 rounded-full w-fit">
                    {story.service || story.industry}
                  </span>
                  <p className="text-[80px] font-display font-black text-white/10 leading-none select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                </div>
              </div>

              {/* RIGHT — content */}
              <div className="lg:col-span-3 flex flex-col justify-between pl-10 py-2">
                <div>
                  <p className="text-[13px] text-[#666] mb-3">{story.client}</p>
                  <h3 className="text-[22px] font-display font-bold text-white leading-tight mb-6">
                    {story.title}
                  </h3>
                  {story.quote?.text && (
                    <blockquote className="border-l-2 border-[#F26522] pl-5 italic text-[#aaa] text-[15px] leading-relaxed mb-6">
                      "{story.quote.text}"
                    </blockquote>
                  )}
                  {story.quote?.author && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-[#1A3050] rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-[14px] font-bold text-white">{story.quote.author}</p>
                        <p className="text-[13px] text-[#666]">
                          {story.quote.role} · {story.client}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {/* Metrics */}
                  {story.metrics?.length > 0 && (
                    <div className="flex gap-3 mb-6">
                      {story.metrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="border border-[#1A3050] px-5 py-4 flex-1">
                          <p className="text-[26px] font-display font-black text-[#F26522]">{m.value}</p>
                          <p className="text-[11px] text-[#666] mt-1">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {story.slug && (
                    <Link
                      to={`/case-studies/${story.slug}`}
                      className="text-[13px] text-[#F26522] font-semibold hover:underline"
                    >
                      Read full case study →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-11 h-11 border border-[#333] flex items-center justify-center text-white hover:border-[#F26522] hover:bg-[#F26522] transition-all"
            >
              ←
            </button>
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === idx ? 'bg-[#F26522] w-6' : 'bg-[#333] w-2'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 border border-[#333] flex items-center justify-center text-white hover:border-[#F26522] hover:bg-[#F26522] transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
