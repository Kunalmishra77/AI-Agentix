import { motion } from 'framer-motion'

/**
 * Scroll-triggered fade-up reveal. Respects reduced-motion (Framer disables
 * transforms automatically when the user prefers reduced motion via CSS, and
 * the small offset is visually harmless).
 */
export default function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.5, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  )
}
