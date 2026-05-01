import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const RESOURCES = [
  {
    id: 1,
    category: 'Artificial Intelligence',
    title: 'Strategic AI Consulting: From Proof of Concept to Production Value',
    excerpt: 'Why Most AI PoCs Never Reach Production? A practical, production-first framework based on 100+ AI projects — showing the path from PoC to real business value.',
    bg: 'linear-gradient(135deg, #c084fc 0%, #818cf8 50%, #67e8f9 100%)',
  },
  {
    id: 2,
    category: 'Artificial Intelligence',
    title: 'The 2026 Enterprise AI Readiness Guide',
    excerpt: 'Everything you need to assess and accelerate your AI maturity across the enterprise — from strategy to deployment.',
    bg: 'linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #818cf8 100%)',
  },
  {
    id: 3,
    category: 'Machine Learning',
    title: 'Agentic AI: From Hype to Production Playbook',
    excerpt: 'A technical deep-dive into building reliable AI agent systems that actually work in production environments.',
    bg: 'linear-gradient(135deg, #F26522 0%, #0D1E3A 50%, #38BDF8 100%)',
  },
];

const ARTICLES = [
  {
    id: 1,
    category: 'Agentic AI',
    title: 'Why Agentic AI Is the Next Platform Shift for Enterprise',
    excerpt: 'The move from prompt-response AI to goal-directed autonomous agents represents a fundamental shift in how software is built and deployed.',
    bg: 'linear-gradient(135deg, #0D1E3A 0%, #1A3050 100%)',
  },
  {
    id: 2,
    category: 'Automation',
    title: 'n8n vs Zapier vs Make: Which Is Right for Enterprise in 2026?',
    excerpt: 'A deep-dive comparison of the three leading workflow automation platforms — and which one wins for complex enterprise use cases.',
    bg: 'linear-gradient(135deg, #1A3050 0%, #0D1E3A 50%, #F26522 100%)',
  },
  {
    id: 3,
    category: 'LLM Integration',
    title: 'RAG in Production: Why 80% Fail and How to Be in the 20%',
    excerpt: "Retrieval Augmented Generation sounds simple. In production it's anything but — here's what separates success from failure.",
    bg: 'linear-gradient(135deg, #0A1628 0%, #1A3050 50%, #38BDF8 100%)',
  },
];

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

function SliderCard({ item, isResource }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full">
      {/* Square image */}
      <div className="relative flex-shrink-0 overflow-hidden rounded-sm mx-auto sm:mx-0" style={{ width: 200, height: 200 }}>
        <div className="absolute inset-0" style={{ background: item.bg }} />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full px-4 py-1.5 whitespace-nowrap shadow-sm">
          <span className="text-[12px] font-medium text-[#333]">{item.category}</span>
        </div>
      </div>
      {/* Text */}
      <div className="flex flex-col justify-center text-center sm:text-left">
        <h3 className="font-display font-bold text-[#0D1E3A] leading-snug mb-3" style={{ fontSize: '1.15rem' }}>
          {item.title}
        </h3>
        <p className="text-[14px] text-[#666] leading-relaxed mb-5">{item.excerpt}</p>
        <button className="flex items-center gap-2 text-[#F26522] font-semibold text-[14px] mx-auto sm:mx-0 w-fit hover:text-[#E05A1A] transition-colors">
          {isResource ? 'Download' : 'Read more'}
          <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px]">
            {isResource ? '↓' : '→'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default function CompanyInsights() {
  const [tab, setTab] = useState('resources');
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const items = tab === 'resources' ? RESOURCES : ARTICLES;
  const isResource = tab === 'resources';

  const goTo = useCallback((idx, dir) => {
    setDirection(dir);
    setCurrent((idx + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    setCurrent(0);
    setDirection(1);
  }, [tab]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="flex flex-col lg:flex-row border-t border-[#e5e5e5]" style={{ minHeight: '480px' }}>

      {/* LEFT — dark panel */}
      <div
        className="flex-shrink-0 flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-16 w-full lg:w-[30%]"
        style={{ backgroundColor: '#232323' }}
      >
        <h2
          className="font-display font-black text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.6rem)', letterSpacing: '-0.025em' }}
        >
          Company<br className="hidden lg:block" /> insights
        </h2>
        <p className="text-[#aaa] text-[14px] leading-relaxed mb-10 max-w-md">
          Learn more about how AI Agentix is revolutionising operational productivity
        </p>

        {/* Tabs */}
        <div className="flex gap-8 mb-10">
          {[['resources', 'Resources'], ['articles', 'Articles']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="relative pb-2 text-[15px] font-semibold transition-colors"
              style={{ color: tab === key ? '#fff' : '#888' }}
            >
              {label}
              {tab === key && (
                <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F26522]" />
              )}
            </button>
          ))}
        </div>

        {/* Nav arrows + dots */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-[#555] flex items-center justify-center text-white hover:border-[#F26522] hover:text-[#F26522] transition-colors"
          >
            <FaArrowLeft size={13} />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-[#555] flex items-center justify-center text-white hover:border-[#F26522] hover:text-[#F26522] transition-colors"
          >
            <FaArrowRight size={13} />
          </button>
          <div className="flex gap-2 ml-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ backgroundColor: i === current ? '#F26522' : '#555' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — one-by-one slide */}
      <div className="flex-1 overflow-hidden bg-[#f5f5f3] flex items-center py-12 sm:py-16 px-8 sm:px-12">
        <div className="w-full relative" style={{ minHeight: 200 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${tab}-${current}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full"
            >
              <SliderCard item={items[current]} isResource={isResource} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </section>
  );
}
