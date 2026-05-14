import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import AGENTIX_DATA from '../../data/agentixData.js';
import './ArcCarousel.css';

const CATS = AGENTIX_DATA.categories; // 9 categories
const N = CATS.length;

const CAT_ICON_MAP = {
  content:   'content-and-creative-production',
  marketing: 'marketing-and-growth',
  sales:     'sales-and-revenue',
  cx:        'customer-experience-and-support',
  research:  'market-research-and-strategy',
  ops:       'operations-and-workflow-automation',
  systems:   'business-systems-and-knowledge',
  product:   'product-project-and-delivery',
  finance:   'finance-admin-and-compliance',
};

// Desktop arc positions — offsets -2 to +2
const DESK = {
  '-2': { x: -430, y: 114, rz: -23, scale: 0.63, opacity: 0.48, zi: 1 },
  '-1': { x: -242, y: 44,  rz: -13, scale: 0.82, opacity: 0.80, zi: 3 },
   '0': { x: 0,    y: 0,   rz: 0,   scale: 1.00, opacity: 1.00, zi: 5 },
   '1': { x: 242,  y: 44,  rz: 13,  scale: 0.82, opacity: 0.80, zi: 3 },
   '2': { x: 430,  y: 114, rz: 23,  scale: 0.63, opacity: 0.48, zi: 1 },
};

// Mobile arc positions — tighter, ±2 hidden
const MOBILE = {
  '-2': { x: 0,    y: 0,   rz: 0,   scale: 0.3, opacity: 0, zi: 0 },
  '-1': { x: -162, y: 28,  rz: -12, scale: 0.80, opacity: 0.75, zi: 3 },
   '0': { x: 0,    y: 0,   rz: 0,   scale: 1.00, opacity: 1.00, zi: 5 },
   '1': { x: 162,  y: 28,  rz: 12,  scale: 0.80, opacity: 0.75, zi: 3 },
   '2': { x: 0,    y: 0,   rz: 0,   scale: 0.3, opacity: 0, zi: 0 },
};

const SPRING = { type: 'spring', stiffness: 72, damping: 22, mass: 1.05 };
const FADE   = { duration: 0.5, ease: 'easeInOut' };

// Compute shortest circular offset
function shortOffset(catIdx, active) {
  let d = catIdx - active;
  if (d >  N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

function toolCount(cat) {
  return cat.subcategories.reduce((s, sub) => s + sub.tools.length, 0);
}

export default function ArcCarousel() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const touchX   = useRef(null);
  const pauseTimer = useRef(null);

  // Track mobile breakpoint
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const advance = useCallback(() => setActive(i => (i + 1) % N), []);
  const retreat = useCallback(() => setActive(i => (i - 1 + N) % N), []);

  // Auto-advance with pause
  useEffect(() => {
    if (paused) return;
    const t = setInterval(advance, 3200);
    return () => clearInterval(t);
  }, [paused, advance]);

  // Temporarily pause auto-advance when user interacts
  const tempPause = useCallback(() => {
    setPaused(true);
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setPaused(false), 5000);
  }, []);

  const goTo = useCallback((i) => { setActive(i); tempPause(); }, [tempPause]);

  const handleTouchStart = useCallback(e => { touchX.current = e.touches[0].clientX; }, []);
  const handleTouchEnd   = useCallback(e => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 44) { dx < 0 ? advance() : retreat(); tempPause(); }
    touchX.current = null;
  }, [advance, retreat, tempPause]);

  const activeCat = CATS[active];
  const POS = isMobile ? MOBILE : DESK;

  return (
    <section className="arc-section" id="ecosystem">
      {/* ── Ambient glow — cross-fades between category colors ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`ambient-${active}`}
          className="arc-ambient"
          style={{
            background: `radial-gradient(ellipse 880px 560px at 50% 78%,
              rgba(${activeCat.accentRgb}, 0.11) 0%,
              transparent 68%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={FADE}
        />
      </AnimatePresence>

      {/* ── Dot-grid background ── */}
      <div className="arc-dots-bg" />

      <div className="arc-inner">

        {/* ── Section heading ── */}
        <div className="arc-head">
          <motion.div
            className="arc-eyebrow"
            key={`ey-${active}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38 }}
          >
            <span className="arc-eyebrow-pip" style={{ background: activeCat.accent }} />
            {String(active + 1).padStart(2, '0')} of {N} — {activeCat.name}
          </motion.div>

          <h2 className="arc-title">
            One platform.
            <span className="arc-title-line">
              <motion.span
                key={`th-${active}`}
                className="arc-title-hl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.48, delay: 0.08 }}
                style={{ color: activeCat.accent }}
              >
                Nine connected domains.
              </motion.span>
            </span>
          </h2>

          <motion.p
            className="arc-sub"
            key={`sub-${active}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.44, delay: 0.14 }}
          >
            {activeCat.promise?.split('.')[0] ?? activeCat.short}
          </motion.p>
        </div>

        {/* ── Carousel stage ── */}
        <div
          className="arc-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { setPaused(false); clearTimeout(pauseTimer.current); }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {CATS.map((cat, i) => {
            const offset  = shortOffset(i, active);
            const visible = Math.abs(offset) <= 2;
            const isCenter = offset === 0;
            const pos = POS[String(offset)] ?? { x: offset > 0 ? 700 : -700, y: 140, rz: offset > 0 ? 32 : -32, scale: 0.2, opacity: 0, zi: 0 };
            const tools = toolCount(cat);
            const iconPath = `/agentix-generated-media/icons/categories/${CAT_ICON_MAP[cat.id] ?? cat.id}.svg`;

            return (
              <motion.div
                key={cat.id}
                className={`arc-card${isCenter ? ' arc-card--center' : ''}${visible ? '' : ' arc-card--hidden'}`}
                style={{
                  '--cat':  cat.accent,
                  '--crgb': cat.accentRgb,
                  zIndex:   pos.zi,
                  pointerEvents: visible && !isCenter ? 'auto' : isCenter ? 'auto' : 'none',
                }}
                animate={{
                  x:       pos.x,
                  y:       pos.y,
                  rotateZ: pos.rz,
                  scale:   pos.scale,
                  opacity: pos.opacity,
                  filter:  Math.abs(offset) >= 2 ? 'blur(1.5px)' : 'blur(0px)',
                }}
                transition={SPRING}
                onClick={() => !isCenter && visible && goTo(i)}
              >
                {/* ── Visual zone ── */}
                <div className="arc-card-vis">
                  {/* Accent gradient */}
                  <div className="arc-card-grad" />

                  {/* Geometric pattern layer */}
                  <div className="arc-card-pattern" />

                  {/* Category icon */}
                  <img
                    src={iconPath}
                    alt=""
                    className="arc-card-icon"
                    style={{ filter: `brightness(0) invert(1) sepia(1) saturate(1.4) hue-rotate(0deg)` }}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                  />

                  {/* Ghost category label */}
                  <div className="arc-card-ghost">{cat.short}</div>

                  {/* Top badges */}
                  <div className="arc-card-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="arc-card-badge">{tools} tools</div>
                </div>

                {/* ── Info zone ── */}
                <div className="arc-card-info">
                  <div className="arc-card-name">{cat.name}</div>
                  <div className="arc-card-meta">
                    <span>{cat.subcategories.length} workflows</span>
                    <span className="arc-card-meta-sep">·</span>
                    <span>{tools} AI tools</span>
                  </div>

                  {isCenter && (
                    <Link
                      to={`/category/${cat.id}`}
                      className="arc-card-cta"
                      style={{
                        color:       cat.accent,
                        borderColor: `rgba(${cat.accentRgb}, 0.32)`,
                        background:  `rgba(${cat.accentRgb}, 0.07)`,
                      }}
                    >
                      Explore category <ArrowRight size={11} />
                    </Link>
                  )}
                </div>

                {/* Glow ring — center card only */}
                {isCenter && (
                  <motion.div
                    className="arc-card-ring"
                    style={{ borderColor: `rgba(${cat.accentRgb}, 0.55)` }}
                    animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.005, 1] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Non-center click hint */}
                {!isCenter && visible && (
                  <div className="arc-card-click-hint" />
                )}
              </motion.div>
            );
          })}

          {/* Center stage glow pool */}
          <AnimatePresence mode="sync">
            <motion.div
              key={`pool-${active}`}
              className="arc-pool"
              style={{ background: `radial-gradient(circle 200px at 50% 90%, rgba(${activeCat.accentRgb}, 0.18), transparent 80%)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>

        {/* ── Controls ── */}
        <div className="arc-controls">
          <button
            className="arc-arrow"
            onClick={() => { retreat(); tempPause(); }}
            aria-label="Previous category"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="arc-pips">
            {CATS.map((cat, i) => (
              <button
                key={i}
                className={`arc-pip${i === active ? ' arc-pip--on' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`${cat.name}`}
                style={i === active
                  ? { background: activeCat.accent, width: 22 }
                  : {}
                }
              />
            ))}
          </div>

          <button
            className="arc-arrow"
            onClick={() => { advance(); tempPause(); }}
            aria-label="Next category"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* ── Category quick-nav ── */}
        <div className="arc-quicknav">
          {CATS.map((cat, i) => (
            <button
              key={cat.id}
              className={`arc-qn-item${i === active ? ' arc-qn-item--on' : ''}`}
              onClick={() => goTo(i)}
              style={i === active ? { color: cat.accent, borderColor: `rgba(${cat.accentRgb}, 0.35)` } : {}}
            >
              {cat.short}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
