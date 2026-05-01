import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { stagger, fadeUp } from '../../lib/motion.js';

const HIGHLIGHTS = [
  {
    title: 'AI Consulting',
    desc: "Discover AI's practical advantages with custom solutions tailored to your business model, workflows, and growth ambitions.",
  },
  {
    title: 'Generative AI',
    desc: 'Adapt cutting-edge Generative AI to your business needs — from LLM-powered products to RAG pipelines and content engines.',
  },
  {
    title: 'Agentic Automation',
    desc: 'Transform your operations with autonomous AI agents that think, decide, and execute complex multi-step tasks independently.',
  },
];

export default function ServiceHighlights() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="bg-[#0A1628] border-t border-[#1A3050]">
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-3"
      >
        {HIGHLIGHTS.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            className="group p-12 border border-[#1A3050] hover:border-[rgba(232,77,28,0.3)]
                       transition-all duration-300 hover:-translate-y-1 cursor-default"
          >
            <h2 className="text-[22px] font-display font-bold text-white mb-4">{item.title}</h2>
            <div className="w-10 h-px bg-[#F26522] mb-4" />
            <p className="text-[15px] text-[#888] leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
