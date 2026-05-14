// Renders a string character-by-character using Framer Motion stagger.
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const charVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

export default function BootText({ text, color }) {
  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ color, display: 'inline' }}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
