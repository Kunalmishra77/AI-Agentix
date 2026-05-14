# Awakening Preloader + VoiceGate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static CSS preloader and teal VoiceGate with a unified cinematic "Awakening" entry sequence — dark, brand-orange, emotionally engaging.

**Architecture:** A single `PreloaderGate.jsx` component manages a 6-phase internal state machine (VOID → EMBER → MATERIALIZE → BOOT → GATE_FORM → INVITATION) using React state + timeouts, with Framer Motion for all animations. It replaces both `Preloader.jsx` and `VoiceGate.jsx`. The existing voice logic (`useVoiceLoop`, `onGateClick`, etc.) is untouched.

**Tech Stack:** React 18, Framer Motion v11 (already installed), CSS custom properties from `ax-tokens.css`.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| CREATE | `src/voice-agent/PreloaderGate.css` | All scoped styles for the entry sequence |
| CREATE | `src/voice-agent/BootText.jsx` | Staggered character-by-character text reveal |
| CREATE | `src/voice-agent/ParticleField.jsx` | 24 orange particles that coalesce into the logo |
| CREATE | `src/voice-agent/useMagneticCursor.js` | Custom cursor that pulls toward the orb |
| CREATE | `src/voice-agent/PreloaderGate.jsx` | Main unified entry component |
| MODIFY | `src/voice-agent/VoiceExperience.jsx` | Swap VoiceGate → PreloaderGate |
| MODIFY | `src/main.jsx` | Remove old Preloader entirely |
| DELETE | `src/voice-agent/VoiceGate.jsx` | Replaced by PreloaderGate |
| DELETE | `src/components/agentix/Preloader.jsx` | Replaced by PreloaderGate |
| MODIFY | `src/voice-agent/voice-agent.css` | Remove all `va-gate-*` rules |

---

## Task 1: PreloaderGate.css — All Visual Styles

**Files:**
- Create: `src/voice-agent/PreloaderGate.css`

- [ ] **Step 1: Create the stylesheet**

```css
/* ── PreloaderGate — "The Awakening" Entry Sequence ─────────────────────── */
/* Scoped to pg- prefix. Zero collisions with site styles. */

.pg-root {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #07080A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: none;
  user-select: none;
  overflow: hidden;
  outline: none;
}

/* Slowly drifting ambient glow behind everything */
.pg-ambient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 800px 600px at 50% 50%,
    rgba(232, 117, 32, 0.06) 0%,
    transparent 70%
  );
  pointer-events: none;
  animation: pg-drift 20s ease-in-out infinite;
}

@keyframes pg-drift {
  0%,  100% { transform: translate(0,    0);    }
  25%        { transform: translate(40px, -30px); }
  50%        { transform: translate(-20px, 40px); }
  75%        { transform: translate(-50px, -20px);}
}

/* Subtle grid — same micro-grid as the app background */
.pg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 30%, #000 20%, transparent 75%);
  pointer-events: none;
}

/* The ember — single glowing orange point at viewport center */
.pg-ember {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 210, 120, 1) 0%,
    #E87520 55%,
    transparent 100%
  );
  box-shadow:
    0 0 14px 5px rgba(232, 117, 32, 0.7),
    0 0 50px 14px rgba(232, 117, 32, 0.25);
  pointer-events: none;
  z-index: 3;
}

/* Flex column — logo above, content below */
.pg-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
}

/* Logo container */
.pg-logo-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pg-logo {
  height: auto;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 0 28px rgba(232, 117, 32, 0.4));
}

/* Boot text block */
.pg-boot {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  width: 290px;
}

.pg-boot-line {
  font-family: var(--font-mono, 'Geist Mono', ui-monospace, monospace);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.6;
}

/* Razor-thin laser progress line */
.pg-progress-track {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 14px;
}

.pg-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #E87520 0%, #5BE3E3 100%);
  border-radius: 999px;
  box-shadow: 0 0 6px 1px rgba(232, 117, 32, 0.9);
}

/* Gate content — orb + title stack */
.pg-gate-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 2;
}

/* Orb wrapper — holds rings + core */
.pg-orb-wrap {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Pulse rings — animated by Framer Motion */
.pg-orb-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(232, 117, 32, 0.45);
  pointer-events: none;
}

/* Orb core — the glowing orange sphere */
.pg-orb-core {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 38% 35%,
    rgba(255, 185, 90, 0.96) 0%,
    #E87520 42%,
    #C95F10 78%
  );
  box-shadow:
    0 0 0 1px rgba(232, 117, 32, 0.35),
    0 0 40px rgba(232, 117, 32, 0.55),
    0 0 80px rgba(232, 117, 32, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  cursor: none;
}

/* Waveform icon inside orb */
.pg-waveform {
  display: flex;
  align-items: center;
  gap: 3px;
}

.pg-wave-bar {
  display: inline-block;
  width: 3px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 2px;
  transform-origin: center;
}

/* Gate title */
.pg-title {
  font-family: var(--font-display, 'Geist', 'Inter', sans-serif);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 600;
  color: #F4F5F7;
  letter-spacing: -0.03em;
  text-align: center;
  margin: 0;
  line-height: 1;
}

/* Gate sub-copy */
.pg-sub {
  font-family: var(--font-body, 'Geist', 'Inter', sans-serif);
  font-size: clamp(14px, 2vw, 17px);
  color: #8B919C;
  text-align: center;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.5;
}

/* Subtle touch hint — no blinking dot, just pulsed opacity */
.pg-touch {
  font-family: var(--font-mono, 'Geist Mono', ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(232, 117, 32, 0.65);
  margin-top: 4px;
}

/* Bottom brand watermark */
.pg-brand {
  position: absolute;
  bottom: 24px;
  font-family: var(--font-mono, 'Geist Mono', ui-monospace, monospace);
  font-size: 10px;
  letter-spacing: 0.07em;
  color: rgba(255, 255, 255, 0.14);
  z-index: 5;
  pointer-events: none;
}

/* Iris portal — expands on click from orb position */
.pg-iris {
  position: fixed;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 38% 35%,
    rgba(255, 185, 90, 0.96) 0%,
    #E87520 42%,
    #C95F10 78%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 99999;
}

/* ── Mobile ─────────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .pg-orb-wrap { width: 100px; height: 100px; }
  .pg-orb-core { width: 76px; height: 76px; }
  .pg-boot { width: 240px; font-size: 10px; }
  .pg-brand { font-size: 9px; bottom: 16px; }
}

/* ── Reduced motion ─────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .pg-ambient { animation: none !important; }
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls "frontend/src/voice-agent/PreloaderGate.css"
```
Expected: file listed with non-zero size.

---

## Task 2: BootText.jsx — Character-by-Character Typing

**Files:**
- Create: `src/voice-agent/BootText.jsx`

- [ ] **Step 1: Create the component**

```jsx
// Renders a string character-by-character using Framer Motion stagger.
// Each character is a <motion.span> that fades from opacity 0 → 1.
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
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
```

- [ ] **Step 2: Verify file**

```bash
ls "frontend/src/voice-agent/BootText.jsx"
```

---

## Task 3: ParticleField.jsx — Logo Coalesce Effect

**Files:**
- Create: `src/voice-agent/ParticleField.jsx`

- [ ] **Step 1: Create the component**

24 orange dots start scattered in a ring around the logo centre and animate inward, creating the "assembled by intelligence" effect.

```jsx
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const COUNT = 24;
const EASE_SPRING = [0.16, 1, 0.3, 1];

export default function ParticleField({ active }) {
  const particles = useMemo(() =>
    Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 2;
      const radius = 70 + (i % 3) * 22;
      return {
        id: i,
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        size: 2 + (i % 3),
        delay: i * 0.038,
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
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: '#E87520',
            boxShadow: '0 0 4px rgba(232,117,32,0.6)',
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{
            x: p.startX,
            y: p.startY,
            opacity: 0,
            scale: 0.4,
          }}
          animate={{
            x: 0,
            y: 0,
            opacity: [0, 0.85, 0],
            scale: [0.4, 1.1, 0.2],
          }}
          transition={{
            duration: 1.1,
            delay: p.delay,
            ease: EASE_SPRING,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify file**

```bash
ls "frontend/src/voice-agent/ParticleField.jsx"
```

---

## Task 4: useMagneticCursor.js — Magnetic Pointer Hook

**Files:**
- Create: `src/voice-agent/useMagneticCursor.js`

- [ ] **Step 1: Create the hook**

Injects a custom glowing dot cursor into `document.body`. On mouse move within 200px of the orb, the dot is gently pulled toward the orb center. Uses `requestAnimationFrame` for smooth lerp. Cleans up on unmount. Disabled on touch devices.

```js
import { useEffect, useRef } from 'react';

export function useMagneticCursor(orbRef, strength = 0.13) {
  const posRef    = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);
  const elRef     = useRef(null);

  useEffect(() => {
    // Skip on touch-primary devices
    if (navigator.maxTouchPoints > 0) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = [
      'position:fixed',
      'width:13px',
      'height:13px',
      'border-radius:50%',
      'background:#E87520',
      'filter:blur(2.5px)',
      'pointer-events:none',
      'z-index:999999',
      'opacity:0',
      'transform:translate(-50%,-50%)',
      'transition:opacity 0.3s',
      'mix-blend-mode:screen',
      'will-change:left,top',
    ].join(';');
    document.body.appendChild(cursor);
    elRef.current = cursor;

    const onMove = (e) => {
      cursor.style.opacity = '1';

      const orb = orbRef.current;
      if (orb) {
        const r   = orb.getBoundingClientRect();
        const cx  = r.left + r.width  / 2;
        const cy  = r.top  + r.height / 2;
        const dx  = e.clientX - cx;
        const dy  = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < 200) {
          targetRef.current = {
            x: e.clientX - dx * strength,
            y: e.clientY - dy * strength,
          };
        } else {
          targetRef.current = { x: e.clientX, y: e.clientY };
        }
      } else {
        targetRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onLeave = () => { cursor.style.opacity = '0'; };

    const tick = () => {
      const p = posRef.current;
      const t = targetRef.current;
      p.x += (t.x - p.x) * 0.16;
      p.y += (t.y - p.y) * 0.16;
      cursor.style.left = p.x + 'px';
      cursor.style.top  = p.y + 'px';
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
      if (elRef.current && document.body.contains(elRef.current)) {
        document.body.removeChild(elRef.current);
      }
    };
  }, [orbRef, strength]);
}
```

- [ ] **Step 2: Verify file**

```bash
ls "frontend/src/voice-agent/useMagneticCursor.js"
```

---

## Task 5: PreloaderGate.jsx — Main Unified Component

**Files:**
- Create: `src/voice-agent/PreloaderGate.jsx`

- [ ] **Step 1: Create the component**

This is the orchestrating component. It owns the phase state machine, wires all sub-components together, and fires `onEnter()` after the iris animation completes.

```jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootText from './BootText';
import ParticleField from './ParticleField';
import { useMagneticCursor } from './useMagneticCursor';
import './PreloaderGate.css';

// ── Phase names ─────────────────────────────────────────────────────────────
const PH = {
  VOID:        'void',
  EMBER:       'ember',
  MATERIALIZE: 'materialize',
  BOOT:        'boot',
  GATE_FORM:   'gate-form',
  INVITATION:  'invitation',
  EXITING:     'exiting',
};

// How long each phase lasts (ms) before the NEXT phase starts
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

const EASE_SPRING = [0.16, 1, 0.3, 1];
const AT_GATE = [PH.GATE_FORM, PH.INVITATION, PH.EXITING];

export default function PreloaderGate({ onEnter }) {
  const [phase, setPhase]           = useState(PH.VOID);
  const [visibleLines, setVisibleLines] = useState(0);
  const [irisActive, setIrisActive] = useState(false);
  const [irisPos, setIrisPos]       = useState({ x: '50%', y: '50%' });
  const orbRef = useRef(null);

  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Wire magnetic cursor to the orb element
  useMagneticCursor(orbRef);

  // ── Phase sequencer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReduced.current) {
      setPhase(PH.INVITATION);
      return;
    }
    const order = [PH.EMBER, PH.MATERIALIZE, PH.BOOT, PH.GATE_FORM, PH.INVITATION];
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

  // ── Click handler ─────────────────────────────────────────────────────────
  const handleClick = useCallback(() => {
    if (phase !== PH.INVITATION) return;

    // Capture orb centre so the iris expands from exactly the right spot
    let x = '50%';
    let y = '50%';
    if (orbRef.current) {
      const r = orbRef.current.getBoundingClientRect();
      x = r.left + r.width  / 2 + 'px';
      y = r.top  + r.height / 2 + 'px';
    }
    setIrisPos({ x, y });
    setPhase(PH.EXITING);
    setIrisActive(true);
  }, [phase]);

  const handleIrisComplete = useCallback(() => {
    onEnter();
  }, [onEnter]);

  // ── Derived flags ─────────────────────────────────────────────────────────
  const isAtGate  = AT_GATE.includes(phase);
  const showEmber = phase !== PH.VOID;
  const showLogo  = phase !== PH.VOID && phase !== PH.EMBER;
  const showBoot  = phase === PH.BOOT;
  const showGate  = isAtGate;

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
      {/* Drifting ambient glow */}
      <div className="pg-ambient" />

      {/* Grid — fades in after VOID */}
      <AnimatePresence>
        {showEmber && (
          <motion.div
            key="grid"
            className="pg-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Ember — the seed point of light */}
      <AnimatePresence>
        {showEmber && (
          <motion.div
            key="ember"
            className="pg-ember"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: phase === PH.EMBER ? 1 : 0,
            }}
            transition={{ duration: 0.55, ease: EASE_SPRING }}
          />
        )}
      </AnimatePresence>

      {/* ── Central stage — flex column, logo above content ── */}
      <div className="pg-stage">

        {/* Logo — materialises from ember, shrinks to 80px at gate */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              key="logo"
              className="pg-logo-wrap"
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(14px)' }}
              animate={{
                opacity: isAtGate ? 0.52 : 1,
                scale: 1,
                filter: 'blur(0px)',
                marginBottom: isAtGate ? '48px' : '28px',
              }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.85, ease: EASE_SPRING }}
            >
              <motion.img
                src="/assets/clients/logo.png"
                alt="Agentix"
                className="pg-logo"
                animate={{ width: isAtGate ? '80px' : '140px' }}
                transition={{ duration: 0.5, ease: EASE_SPRING }}
              />
              {/* Orange particles coalesce into logo */}
              <ParticleField active={phase === PH.MATERIALIZE} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boot text — types in during BOOT phase */}
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
                    animate={{ scale: [1, 2.9], opacity: [0.48 - i * 0.14, 0] }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.42,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                ))}

                {/* Core — breathes slowly */}
                <motion.div
                  className="pg-orb-core"
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Animated waveform icon — 5 bars */}
                  <div className="pg-waveform">
                    {[6, 14, 22, 14, 6].map((h, i) => (
                      <motion.span
                        key={i}
                        className="pg-wave-bar"
                        style={{ height: h }}
                        animate={{ scaleY: [0.3, 1.35, 0.3] }}
                        transition={{
                          duration: 0.78,
                          delay: i * 0.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
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

              {/* Touch hint — pulsed opacity, invitation phase only */}
              {phase === PH.INVITATION && (
                <motion.div
                  className="pg-touch"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.65, 0.32, 0.65] }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
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
```

- [ ] **Step 2: Verify file exists**

```bash
ls "frontend/src/voice-agent/PreloaderGate.jsx"
```

---

## Task 6: Wire PreloaderGate into VoiceExperience.jsx

**Files:**
- Modify: `src/voice-agent/VoiceExperience.jsx` (lines 6, 28)

Current line 6: `import VoiceGate from './VoiceGate';`  
Current line 28: `{showGate && <VoiceGate onEnter={onGateClick} />}`

- [ ] **Step 1: Replace VoiceGate import with PreloaderGate**

Open `src/voice-agent/VoiceExperience.jsx` and make exactly two edits:

**Edit 1** — line 6, change:
```js
import VoiceGate      from './VoiceGate';
```
to:
```js
import PreloaderGate  from './PreloaderGate';
```

**Edit 2** — line 28, change:
```jsx
{showGate && <VoiceGate onEnter={onGateClick} />}
```
to:
```jsx
{showGate && <PreloaderGate onEnter={onGateClick} />}
```

- [ ] **Step 2: Verify the file looks correct after edits**

```bash
grep -n "VoiceGate\|PreloaderGate" "frontend/src/voice-agent/VoiceExperience.jsx"
```
Expected output — should show PreloaderGate, NOT VoiceGate:
```
6:import PreloaderGate  from './PreloaderGate';
28:      {showGate && <PreloaderGate onEnter={onGateClick} />}
```

---

## Task 7: Simplify main.jsx — Remove Old Preloader

**Files:**
- Modify: `src/main.jsx`

Current `main.jsx` has a `Root` wrapper component that shows `<Preloader>` for 1800ms on first visit. `PreloaderGate` now handles the entire entry experience, so this wrapper is removed entirely.

- [ ] **Step 1: Rewrite main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
```

- [ ] **Step 2: Verify no Preloader reference remains in main.jsx**

```bash
grep "Preloader\|Root\|SHOW_MS\|SESSION_KEY" "frontend/src/main.jsx"
```
Expected: no output (grep finds nothing).

---

## Task 8: Remove va-gate-* Styles from voice-agent.css

**Files:**
- Modify: `src/voice-agent/voice-agent.css`

The VoiceGate styles (`.va-gate`, `.va-gate--exit`, `.va-gate-grid`, `.va-gate-glow`, `.va-gate-content`, `.va-gate-orb`, `.va-gate-orb-ring`, `.va-gate-orb-core`, `.va-gate-title`, `.va-gate-sub`, `.va-gate-cta`, `.va-gate-brand`, plus their `@keyframes`) are now dead code.

- [ ] **Step 1: Remove dead va-gate-* rules**

In `src/voice-agent/voice-agent.css`, delete the entire block from:
```css
/* ── 1. VOICE GATE ──────────────────────────────────────────────────────── */
.va-gate {
```
down to and including the closing `}` of `.va-gate-brand { ... }` (lines 7–178 in the current file).

Keep everything from `/* ── 2. VOICE ORB ───── */` onward untouched.

- [ ] **Step 2: Verify no va-gate- rules remain**

```bash
grep -c "va-gate" "frontend/src/voice-agent/voice-agent.css"
```
Expected: `0`

---

## Task 9: Delete Dead Files

**Files:**
- Delete: `src/voice-agent/VoiceGate.jsx`
- Delete: `src/components/agentix/Preloader.jsx`

- [ ] **Step 1: Delete both files**

```bash
rm "frontend/src/voice-agent/VoiceGate.jsx"
rm "frontend/src/components/agentix/Preloader.jsx"
```

- [ ] **Step 2: Confirm deletion and no remaining imports**

```bash
grep -rn "VoiceGate\|from.*Preloader" frontend/src/ --include="*.jsx" --include="*.js"
```
Expected: no output.

---

## Task 10: Dev Server Smoke Test

- [ ] **Step 1: Start the dev server**

```bash
cd frontend && npm run dev
```

- [ ] **Step 2: Open the app and verify each phase**

Open browser to `http://localhost:5173`. On first load (or after clearing sessionStorage):

| Phase | What to see | Timing |
|-------|-------------|--------|
| VOID | Pure `#07080A`, nothing | 0–400ms |
| EMBER | Tiny glowing orange dot at center | 400–1200ms |
| MATERIALIZE | Logo fades/deblurs in, orange particles coalesce | 1200–2400ms |
| BOOT | Logo + 3 lines of cyan→orange mono text typing below, thin laser progress line growing | 2400–3800ms |
| GATE_FORM | Boot text exits, orb expands from center, logo moves up + shrinks | 3800–4500ms |
| INVITATION | Orb breathing, pulse rings, "TOUCH ANYWHERE" pulsing, custom cursor dot visible | 4500ms+ |
| Click | Compress → spring → orange iris fills screen → main site revealed | 600ms |

- [ ] **Step 3: Verify console is clean**

Open DevTools console. Expected: zero errors, zero 404s.

- [ ] **Step 4: Test reduced-motion**

In DevTools → Rendering → Emulate: `prefers-reduced-motion: reduce`.  
Reload. Expected: gate appears immediately in INVITATION state, no animation phases.

- [ ] **Step 5: Test mobile viewport**

DevTools → Responsive, set to 375px wide. Expected: orb is 100px, logo is appropriately sized, no layout overflow.

---

## Task 11: Commit

- [ ] **Step 1: Stage all new and modified files**

```bash
git add \
  frontend/src/voice-agent/PreloaderGate.css \
  frontend/src/voice-agent/PreloaderGate.jsx \
  frontend/src/voice-agent/BootText.jsx \
  frontend/src/voice-agent/ParticleField.jsx \
  frontend/src/voice-agent/useMagneticCursor.js \
  frontend/src/voice-agent/VoiceExperience.jsx \
  frontend/src/main.jsx \
  frontend/src/voice-agent/voice-agent.css
```

- [ ] **Step 2: Confirm deleted files are staged**

```bash
git rm frontend/src/voice-agent/VoiceGate.jsx \
        frontend/src/components/agentix/Preloader.jsx
```

- [ ] **Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
feat: replace preloader + VoiceGate with unified cinematic Awakening entry

Six-phase entry sequence (void → ember → materialize → boot → gate-form →
invitation) replaces the jarring light-background preloader and off-brand
teal VoiceGate. Brand-orange throughout, iris portal on click, magnetic
cursor, Framer Motion orchestration. Voice logic untouched.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review Checklist

| Spec requirement | Covered by task |
|-----------------|-----------------|
| Dark background from frame 0 | Task 1 (pg-root background: #07080A) |
| Ember birth at center | Task 5 (pg-ember, VOID→EMBER phase) |
| Logo particle coalesce | Task 3 (ParticleField), Task 5 (MATERIALIZE phase) |
| Boot text typing — 3 lines, cyan→orange | Task 2 (BootText), Task 5 (BOOT phase) |
| Laser progress line | Task 1 (pg-progress-bar), Task 5 |
| Orb breathing animation | Task 5 (animate scale oscillation) |
| 3 pulse rings | Task 5 (Framer Motion repeat animations) |
| Magnetic cursor | Task 4 (useMagneticCursor), Task 5 (orbRef) |
| "TOUCH ANYWHERE" pulsed hint | Task 5 (INVITATION phase only) |
| Iris portal on click | Task 5 (pg-iris, handleClick) |
| Iris origin = orb centre | Task 5 (irisPos from getBoundingClientRect) |
| onEnter() called after iris | Task 5 (handleIrisComplete) |
| Voice logic untouched | Task 6 (only import/JSX swapped) |
| Old Preloader removed | Task 7 (main.jsx rewrite) |
| Dead styles removed | Task 8 (va-gate-* deleted) |
| Dead files deleted | Task 9 |
| prefers-reduced-motion | Task 1 (CSS), Task 5 (skip to INVITATION) |
| Mobile responsive | Task 1 (media query, smaller orb/logo) |
| Brand orange throughout, no teal except boot text accent | Task 1, Task 5 |
