import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from '../../utils/icons.jsx';

const CAPABILITIES = [
  {
    title: 'AI Consulting',
    desc: 'Create the AI strategy with expert guidance, identify the most impactful AI opportunities for your business, and chart a clear path to AI implementation.',
    href: '/services/ai-consulting',
    icon: 'brain',
  },
  {
    title: 'Generative AI Development',
    desc: 'Leverage cutting-edge generative AI to power products and workflows — from LLM-based solutions to RAG pipelines, content engines, and custom model deployments.',
    href: '/services/generative-ai',
    icon: 'sparkle',
  },
  {
    title: 'AI Business Buddy',
    desc: 'AI-Driven Knowledge Management for your team — answering questions from your company knowledge base, automating workflows, and making every employee more productive.',
    href: '/products/ai-business-buddy',
    icon: 'layers',
    highlight: true,
  },
  {
    title: 'Computer Vision Solutions',
    desc: 'Empower your systems to interpret and act on visual data with human-like accuracy — for quality control, compliance, object detection, and predictive maintenance.',
    href: '/solutions/computer-vision',
    icon: 'eye',
  },
  {
    title: 'Data Engineering Services',
    desc: 'Transform raw data into actionable insights with robust pipelines, warehouses, and infrastructure designed for AI-readiness and real-time decision-making.',
    href: '/services/data-engineering',
    icon: 'database',
    highlight: true,
  },
  {
    title: 'MLOps',
    desc: 'Streamline your ML lifecycle from development to production with CI/CD, model monitoring, drift detection, and scalable inference infrastructure.',
    href: '/services/mlops',
    icon: 'cog',
  },
];

/*
 Ladder layout (3 cols × 3 rows):
 Row 0: [empty]  [empty]              [AI Consulting]
 Row 1: [empty]  [Generative AI Dev]  [ContextClue]
 Row 2: [CV Sol] [Data Engineering]   [MLOps]
*/
const GRID = [
  { col: 2, row: 0, capIdx: 0 },
  { col: 1, row: 1, capIdx: 1 },
  { col: 2, row: 1, capIdx: 2 },
  { col: 0, row: 2, capIdx: 3 },
  { col: 1, row: 2, capIdx: 4 },
  { col: 2, row: 2, capIdx: 5 },
];

function CapCard({ cap, active, onEnter, onLeave }) {
  return (
    <Link
      to={cap.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`relative flex flex-col justify-between p-8 min-h-[200px] border border-[#e8e8e8] transition-all duration-300 group
        ${active ? 'bg-[#f4f4f1] border-[#F26522]' : cap.highlight ? 'bg-[#f7f7f5]' : 'bg-white hover:bg-[#f7f7f5]'}`}
    >
      {/* Title */}
      <h3
        className={`font-display font-bold leading-snug text-[16px] transition-colors duration-200
          ${active ? 'text-[#F26522]' : 'text-[#0D1E3A]'}`}
      >
        {cap.title}
      </h3>

      {/* Hover content */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="mt-4"
          >
            <p className="text-[13px] text-[#555] leading-relaxed mb-4">{cap.desc}</p>
            <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">
              Explore →
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon — bottom right, shows when NOT hovered */}
      {!active && (
        <div className="absolute bottom-6 right-6 text-[#F26522] opacity-50 group-hover:opacity-100 transition-opacity">
          <Icon name={cap.icon} size={22} />
        </div>
      )}
    </Link>
  );
}

export default function CoreCapabilities() {
  const [hovered, setHovered] = useState(null);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section className="bg-white py-12 sm:py-24 border-t border-[#e5e5e5]">
      <div ref={ref} className="max-w-[1240px] mx-auto px-6 sm:px-12">
          {/* Grid — standard on mobile, complex staggered ladder on desktop */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          >
            {/* Heading cell */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-start p-6 sm:p-8 md:col-span-2 lg:col-span-1 lg:row-start-2 lg:col-start-1"
            >
              <h2
                className="font-display font-black text-[#0D1E3A] leading-[1.08]"
                style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.6rem)', letterSpacing: '-0.025em' }}
              >
                Our core<br />capabilities
              </h2>
            </motion.div>

            {GRID.map(({ col, row, capIdx }, i) => {
              const cap = CAPABILITIES[capIdx];
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`
                    lg:col-start-${col + 1} lg:row-start-${row + 1}
                  `}
                >
                  <CapCard
                    cap={cap}
                    active={hovered === capIdx}
                    onEnter={() => setHovered(capIdx)}
                    onLeave={() => setHovered(null)}
                  />
                </motion.div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
