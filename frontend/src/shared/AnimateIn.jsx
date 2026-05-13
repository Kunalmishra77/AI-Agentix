import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, staggerContainer } from '../core/motion';

/**
 * AnimateIn — drop-in InView reveal wrapper.
 *
 * Usage:
 *   <AnimateIn>           — default fadeUp on first scroll into view
 *   <AnimateIn variant={scaleIn} delay={0.1}>
 *   <AnimateIn stagger>   — wraps children with stagger container
 */
export default function AnimateIn({
  children,
  variant = fadeUp,
  delay = 0,
  stagger = false,
  staggerDelay = 0.07,
  margin = '-60px',
  once = true,
  className,
  style,
  as: Tag = 'div',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });

  const resolvedVariant = stagger
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }
    : variant;

  const transition = delay > 0
    ? { ...resolvedVariant?.visible?.transition, delay }
    : resolvedVariant?.visible?.transition;

  const patchedVariant = delay > 0
    ? {
        ...resolvedVariant,
        visible: { ...resolvedVariant.visible, transition },
      }
    : resolvedVariant;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={patchedVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}
