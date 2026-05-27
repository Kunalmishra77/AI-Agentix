/**
 * MarketingPreloader — cinematic page-load intro for the marketing site.
 *
 * Phases (auto-advancing, no user input required):
 *   INIT → logo materialises + brand name fades in
 *   LOAD → progress bar fills with live % counter + status text cycles
 *   EXIT → iris portal expands from centre, revealing the page beneath
 *
 * Only shown once per browser session (sessionStorage flag).
 * Calls props.onDone() after the exit animation fully completes.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MarketingPreloader.css';

const SESSION_KEY = 'ax-mkt-preloader-v1';

const STATUS_MSGS = [
  'LOADING AI SYSTEMS',
  'CONNECTING NEURAL CORE',
  'CALIBRATING AGENTS',
  'READY',
];

const EASE_SPRING = [0.16, 1, 0.3, 1];

export default function MarketingPreloader({ onDone }) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [irisScale, setIrisScale] = useState(1);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  // Only show once per session
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      onDone();
      return;
    }
    sessionStorage.setItem(SESSION_KEY, '1');
    setMounted(true);
  }, [onDone]);

  // Progress animation — ease-out curve over ~1.5s
  useEffect(() => {
    if (!mounted) return;

    const TOTAL_MS = 1500;

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const raw = Math.min(elapsed / TOTAL_MS, 1);
      // Custom ease: fast start 0→80%, then slow 80→100%
      const eased = raw < 0.8
        ? raw * 1.05           // fast phase
        : 0.84 + (raw - 0.8) * (1 - 0.84) / 0.2; // slow finish
      const pct = Math.min(Math.round(eased * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Trigger exit after a brief pause at 100%
        setTimeout(triggerExit, 220);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted]);

  // Status text cycles
  useEffect(() => {
    if (!mounted) return;
    const intervals = [0, 500, 1000, 1380].map((delay, i) =>
      setTimeout(() => setStatusIdx(i), delay)
    );
    return () => intervals.forEach(clearTimeout);
  }, [mounted]);

  const triggerExit = useCallback(() => {
    setExiting(true);
  }, []);

  const handleIrisComplete = useCallback(() => {
    onDone();
  }, [onDone]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="mp-root"
          key="mp-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {/* Ambient glow */}
          <div className="mp-ambient" />

          {/* Dot grid */}
          <div className="mp-grid" />

          {/* Corner brackets */}
          <div className="mp-corner mp-corner-tl" />
          <div className="mp-corner mp-corner-tr" />
          <div className="mp-corner mp-corner-bl" />
          <div className="mp-corner mp-corner-br" />

          {/* Stage */}
          <div className="mp-stage">
            {/* Logo */}
            <div className="mp-logo-wrap">
              <img
                src="/assets/clients/logo.png"
                alt="AI Agentix"
                className="mp-logo"
                fetchpriority="high"
              />
            </div>

            {/* Brand name */}
            <div className="mp-wordmark">
              AI <span>AGENTIX</span>
            </div>

            {/* Progress + status */}
            <div className="mp-progress-outer">
              {/* Status text */}
              <div className="mp-status">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={statusIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: 'block' }}
                  >
                    {STATUS_MSGS[statusIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Bar */}
              <div className="mp-progress-track">
                <motion.div
                  className="mp-progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percentage */}
              <div className="mp-pct">{progress}%</div>
            </div>
          </div>

          {/* Bottom watermark */}
          <div className="mp-brand">Powered by AI Agentix · India's #1 AI Automation</div>
        </motion.div>
      )}

      {/* Iris exit portal */}
      {exiting && (
        <motion.div
          key="mp-iris"
          className="mp-iris"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: [1, 0.9, 1.2, 90], opacity: [1, 1, 1, 0] }}
          transition={{
            duration: 0.6,
            times: [0, 0.1, 0.2, 1],
            ease: [0.4, 0, 1, 1],
          }}
          onAnimationComplete={handleIrisComplete}
        />
      )}
    </AnimatePresence>
  );
}
