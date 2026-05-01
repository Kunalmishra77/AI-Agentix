import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion.js';

export default function RevealWrapper({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
