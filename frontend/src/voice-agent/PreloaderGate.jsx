// ── PreloaderGate — "The Awakening" ──────────────────────────────────────────
// Unified cinematic entry: replaces both Preloader.jsx and VoiceGate.jsx.
// Phase machine: VOID → EMBER → MATERIALIZE → BOOT → GATE_FORM → INVITATION
// On click → iris portal expansion → calls onEnter() → voice experience begins.
// Voice logic in useVoiceLoop is completely untouched.
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootText      from './BootText';
import ParticleField from './ParticleField';
import { useMagneticCursor } from './useMagneticCursor';
import './PreloaderGate.css';

// ── Phase identifiers ────────────────────────────────────────────────────────
const PH = {
  VOID:        'void',
  EMBER:       'ember',
  MATERIALIZE: 'materialize',
  BOOT:        'boot',
  GATE_FORM:   'gate-form',
  INVITATION:  'invitation',
  EXITING:     'exiting',
};

// How long each phase persists (ms) before the NEXT phase begins
const DURATIONS = {
  [PH.VOID]:        400,
  [PH.EMBER]:       800,
  [PH.MATERIALIZE]: 1200,
  [PH.BOOT]:        1400,
  [PH.GATE_FORM]:   700,
};

const BOOT_LINES = [
  { text: '> AGENTIX OS v4 · INITIALIZING', ready: false },
  { text: '> NEURAL PATHWAYS · LOADING',    ready: false },
  { text: '> VOICE SYSTEMS · READY',        ready: true  },
];

const EASE_SPRING   = [0.16, 1, 0.3, 1];
const AT_GATE_PHASES = [PH.GATE_FORM, PH.INVITATION, PH.EXITING];

export default function PreloaderGate({ onEnter }) {
  const [phase, setPhase]               = useState(PH.VOID);
  const [visibleLines, setVisibleLines] = useState(0);
  const [irisActive, setIrisActive]     = useState(false);
  const [irisPos, setIrisPos]           = useState({ x: '50%', y: '50%' });
  const orbRef = useRef(null);

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Attach magnetic cursor to orb element
  useMagneticCursor(orbRef);

  // ── Phase sequencer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReduced.current) {
      // Skip all animation phases — jump straight to the interactive gate
      setPhase(PH.INVITATION);
      return;
    }
    const order = [
      PH.EMBER,
      PH.MATERIALIZE,
      PH.BOOT,
      PH.GATE_FORM,
      PH.INVITATION,
    ];
    const timers = [];
    let elapsed = 0;
    order.forEach((ph, i) => {
      const prev = i === 0 ? PH.VOID : order[i - 1];
      elapsed += DURATIONS[prev] ?? 0;
      timers.push(setTimeout(() => setPhase(ph), elapsed));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Boot line stagger ─────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== PH.BOOT) return;
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 480)
    );
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  // ── Click / tap handler ───────────────────────────────────────────────────
  const handleClick = useCallback(() => {
    if (phase !== PH.INVITATION) return;

    // Capture the orb's exact screen centre so the iris expands from it
    let x = '50%';
    let y = '50%';
    if (orbRef.current) {
      const r = orbRef.current.getBoundingClientRect();
      x = (r.left + r.width  / 2) + 'px';
      y = (r.top  + r.height / 2) + 'px';
    }
    setIrisPos({ x, y });
    setPhase(PH.EXITING);
    setIrisActive(true);
  }, [phase]);

  // Called by Framer Motion after the iris animation fully completes
  const handleIrisComplete = useCallback(() => {
    onEnter(); // → useVoiceLoop sets phase to LISTENING, showGate → false
  }, [onEnter]);

  // ── Derived render flags ──────────────────────────────────────────────────
  const isAtGate  = AT_GATE_PHASES.includes(phase);
  const showEmber = phase !== PH.VOID;
  const showLogo  = phase !== PH.VOID && phase !== PH.EMBER;
  const showBoot  = phase === PH.BOOT;
  const showGate  = isAtGate;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="pg-root"
      onClick={handleClick}
      role="button"
      aria-label="Activate voice experience"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      {/* Slowly drifting ambient orange glow */}
      <div className="pg-ambient" />

      {/* Micro-grid — fades in out of VOID */}
      <AnimatePresence>
        {showEmber && (
          <motion.div
            key="grid"
            className="pg-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      {/* Ember — seed point of light; visible only during EMBER phase */}
      <AnimatePresence>
        {showEmber && (
          <motion.div
            key="ember"
            className="pg-ember"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale:   1,
              opacity: phase === PH.EMBER ? 1 : 0,
            }}
            transition={{ duration: 0.55, ease: EASE_SPRING }}
          />
        )}
      </AnimatePresence>

      {/* ── Central stage: flex column, logo → content ── */}
      <div className="pg-stage">

        {/* Logo — materialises from the ember, shrinks at gate state */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              key="logo"
              className="pg-logo-wrap"
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(14px)' }}
              animate={{
                opacity:      isAtGate ? 0.52 : 1,
                scale:        1,
                filter:       'blur(0px)',
                marginBottom: isAtGate ? '48px' : '28px',
              }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.85, ease: EASE_SPRING }}
            >
              <motion.img
                src="/assets/clients/logo.png"
                alt="Agentix"
                className="pg-logo"
                fetchpriority="high"
                animate={{ width: isAtGate ? '80px' : '140px' }}
                transition={{ duration: 0.5, ease: EASE_SPRING }}
              />
              {/* Particles coalesce during MATERIALIZE */}
              <ParticleField active={phase === PH.MATERIALIZE} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boot text — types in during BOOT */}
        <AnimatePresence>
          {showBoot && (
            <motion.div
              key="boot"
              className="pg-boot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="pg-boot-line">
                  <BootText
                    text={line.text}
                    color={line.ready ? '#E87520' : '#5BE3E3'}
                  />
                </div>
              ))}
              {/* Laser-thin progress line */}
              <div className="pg-progress-track">
                <motion.div
                  className="pg-progress-bar"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.35, ease: 'linear', delay: 0.08 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gate: orb + title + sub + hint */}
        <AnimatePresence>
          {showGate && (
            <motion.div
              key="gate"
              className="pg-gate-content"
              initial={{ opacity: 0, scale: 0.35 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.52, ease: EASE_SPRING }}
            >
              {/* Orb */}
              <div className="pg-orb-wrap" ref={orbRef}>
                {/* Three expanding pulse rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="pg-orb-ring"
                    animate={{
                      scale:   [1, 2.9],
                      opacity: [0.48 - i * 0.14, 0],
                    }}
                    transition={{
                      duration: 1.4,
                      delay:    i * 0.42,
                      repeat:   Infinity,
                      ease:     'easeOut',
                    }}
                  />
                ))}

                {/* Core — breathes at 3.5 s cycle */}
                <motion.div
                  className="pg-orb-core"
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{
                    duration: 3.5,
                    repeat:   Infinity,
                    ease:     'easeInOut',
                  }}
                >
                  {/* Animated EQ waveform — 5 bars */}
                  <div className="pg-waveform">
                    {[6, 14, 22, 14, 6].map((h, i) => (
                      <motion.span
                        key={i}
                        className="pg-wave-bar"
                        style={{ height: h }}
                        animate={{ scaleY: [0.3, 1.35, 0.3] }}
                        transition={{
                          duration: 0.78,
                          delay:    i * 0.1,
                          repeat:   Infinity,
                          ease:     'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Title */}
              <motion.h1
                className="pg-title"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22, ease: EASE_SPRING }}
              >
                AGENTiX
              </motion.h1>

              {/* Sub-copy */}
              <motion.p
                className="pg-sub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.38, ease: EASE_SPRING }}
              >
                Your AI Operating System is ready
              </motion.p>

              {/* Touch hint — invitation phase only, slow opacity pulse */}
              {phase === PH.INVITATION && (
                <motion.div
                  className="pg-touch"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.65, 0.3, 0.65] }}
                  transition={{
                    duration: 2.3,
                    repeat:   Infinity,
                    ease:     'easeInOut',
                    delay:    0.5,
                  }}
                >
                  {typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0
                    ? 'TAP ANYWHERE'
                    : 'TOUCH ANYWHERE'}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom brand watermark */}
      <div className="pg-brand">
        Powered by AGENTiX AI · Voice-First Experience
      </div>

      {/* Iris portal — expands from orb centre on click */}
      {irisActive && (
        <motion.div
          className="pg-iris"
          style={{ left: irisPos.x, top: irisPos.y }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale:   [1, 0.88, 1.35, 55],
            opacity: [1, 1,    1,    0 ],
          }}
          transition={{
            duration: 0.65,
            times:    [0, 0.12, 0.18, 1],
            ease:     [0.4, 0, 1, 1],
          }}
          onAnimationComplete={handleIrisComplete}
        />
      )}
    </div>
  );
}
