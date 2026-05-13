// Shared animation constants — import from here, never hard-code in components.
// All values are Framer Motion compatible.

export const EASING = {
  // Standard cinematic — most UI transitions
  standard:  [0.20, 0.70, 0.20, 1.00],
  // Springy entry — cards, modals, orbs sliding in
  spring:    [0.34, 1.56, 0.64, 1.00],
  // Smooth exit — elements leaving screen
  exit:      [0.40, 0.00, 1.00, 1.00],
  // Decelerate — content dropping into view
  decel:     [0.00, 0.00, 0.20, 1.00],
  // Accelerate — content leaving screen upward
  accel:     [0.40, 0.00, 1.00, 1.00],
};

export const DURATION = {
  instant: 0.10,
  fast:    0.20,
  base:    0.35,
  slow:    0.55,
  cinematic: 0.80,
};

// Reusable variants for common patterns

export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASING.decel } },
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASING.standard } },
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASING.spring } },
};

export const slideInLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASING.decel } },
};

export const slideInRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.slow, ease: EASING.decel } },
};

// Stagger container — wrap around lists of children
export function staggerContainer(staggerChildren = 0.07, delayChildren = 0) {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}
