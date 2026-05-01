// Shared Framer Motion animation variants — import everywhere

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
  }
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const stagger = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

export const slideRight = {
  hidden:  { opacity: 0, x: -24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

export const cardHover = {
  rest:  { y: 0, borderColor: '#1e1e1e',                   transition: { duration: 0.25 } },
  hover: { y: -4, borderColor: 'rgba(232,77,28,0.3)',       transition: { duration: 0.25 } },
};

export const cardHoverLight = {
  rest:  { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',   transition: { duration: 0.25 } },
  hover: { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transition: { duration: 0.25 } },
};

export const dropdownVariant = {
  hidden:  { opacity: 0, y: 8, pointerEvents: 'none' },
  visible: { opacity: 1, y: 0, pointerEvents: 'auto',
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }
};
