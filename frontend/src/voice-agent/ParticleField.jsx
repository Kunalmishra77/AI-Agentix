// 24 orange particles that start scattered in a ring and coalesce inward —
// creating the "assembled by intelligence" effect during logo materialisation.
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const COUNT = 24;
const EASE_SPRING = [0.16, 1, 0.3, 1];

export default function ParticleField({ active }) {
  const particles = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => {
      const angle  = (i / COUNT) * Math.PI * 2;
      const radius = 70 + (i % 3) * 22;
      return {
        id:     i,
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        size:   2 + (i % 3),
        delay:  i * 0.038,
      };
    }),
  []);

  if (!active) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            width:  p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#E87520',
            boxShadow: '0 0 4px rgba(232,117,32,0.6)',
            x: '-50%',
            y: '-50%',
          }}
          initial={{
            x:       p.startX,
            y:       p.startY,
            opacity: 0,
            scale:   0.4,
          }}
          animate={{
            x:       0,
            y:       0,
            opacity: [0, 0.85, 0],
            scale:   [0.4, 1.1, 0.2],
          }}
          transition={{
            duration: 1.1,
            delay:    p.delay,
            ease:     EASE_SPRING,
          }}
        />
      ))}
    </div>
  );
}
