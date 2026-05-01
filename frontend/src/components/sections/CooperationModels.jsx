import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MODELS = [
  {
    title: 'Solution providing',
    desc: 'We deliver partially-ready or tailor-made data solutions that comprehensively handle our clients\' specific business with given time and budget.',
    hoverDesc: 'The solution-based collaboration allows our clients to reduce the risk implied by implementing large-scale projects.',
  },
  {
    title: 'Collaborative model',
    desc: 'Our team joins forces with the client\'s team to build solution fully aligned with the business goals and in-house needs of the company.',
    hoverDesc: 'We embed our experts directly into your team, sharing knowledge and aligning every step with your core business objectives.',
  },
  {
    title: 'Managed & Delivery Services',
    desc: 'As the next level after solution providing, managed & delivery services entail entrusting the whole AI or data management system to AI Agentix.',
    hoverDesc: 'Hand over full operational ownership — we run, monitor, and continuously improve your AI systems so you can focus on what matters.',
  },
  {
    title: 'We are flexible!',
    desc: 'You need a more unique approach?',
    hoverDesc: 'Every business is different. Tell us your constraints and goals — we will design an engagement model that fits you perfectly.',
  },
];

function ModelCard({ model, index, inView }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="relative overflow-hidden cursor-default"
      style={{
        minHeight: '280px',
        borderTop: '1px solid #e5e5e5',
        borderRight: index % 2 === 0 ? '1px solid #e5e5e5' : 'none',
        backgroundColor: hovered ? '#0D1E3A' : '#ffffff',
        transition: 'background-color 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* DEFAULT state — title + desc + "+" */}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 p-10 flex flex-col"
          >
            <h3
              className="font-display font-bold text-[#0D1E3A] leading-snug mb-5"
              style={{ fontSize: '1.15rem' }}
            >
              {model.title}
            </h3>
            <p className="text-[#555] leading-relaxed" style={{ fontSize: '0.9375rem' }}>
              {model.desc}
            </p>
            {/* + icon */}
            <div
              className="absolute bottom-6 right-6 text-[28px] font-light leading-none"
              style={{ color: '#F26522' }}
            >
              +
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HOVER state — green bg, different text, no title */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 p-10 flex items-center justify-center"
          >
            <p
              className="font-semibold text-white leading-relaxed text-center"
              style={{ fontSize: '1rem' }}
            >
              {model.hoverDesc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CooperationModels() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section ref={ref} className="bg-white py-20 border-t border-[#e5e5e5]">
      <div className="max-w-[1240px] mx-auto px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <h2
            className="font-display font-black text-[#0D1E3A] leading-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Cooperation models
          </h2>
          <Link
            to="/contact"
            className="px-6 py-3 bg-[#F26522] text-white font-semibold text-[14px] rounded-full hover:bg-[#E05A1A] transition-colors whitespace-nowrap"
          >
            Let's work together
          </Link>
        </motion.div>

        {/* 2×2 grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ borderLeft: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}
        >
          {MODELS.map((model, i) => (
            <ModelCard key={model.title} model={model} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  );
}
