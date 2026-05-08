// ─── VoiceGate — Full-Screen Entry Overlay ───────────────────────────────────
import { useState } from 'react';

export default function VoiceGate({ onEnter }) {
  const [exiting, setExiting] = useState(false);

  const handleClick = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onEnter, 550); // let exit animation play
  };

  return (
    <div
      className={`va-gate ${exiting ? 'va-gate--exit' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label="Click to begin voice experience"
      id="va-gate"
    >
      {/* Grid overlay */}
      <div className="va-gate-grid" />

      {/* Ambient corner glows */}
      <div className="va-gate-glow va-gate-glow--tl" />
      <div className="va-gate-glow va-gate-glow--br" />

      {/* Central content */}
      <div className="va-gate-content">
        {/* Orb */}
        <div className="va-gate-orb">
          <div className="va-gate-orb-ring va-gate-orb-ring--1" />
          <div className="va-gate-orb-ring va-gate-orb-ring--2" />
          <div className="va-gate-orb-ring va-gate-orb-ring--3" />
          <div className="va-gate-orb-core">
            {/* Mic SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="va-gate-title">Welcome to AGENTiX</h1>
        <p className="va-gate-sub">Your personal AI business guide is ready</p>
        <div className="va-gate-cta">
          <span className="va-gate-cta-dot" />
          Click anywhere or tap to begin
        </div>
      </div>

      {/* Bottom brand */}
      <div className="va-gate-brand">Powered by AGENTiX AI · Voice-First Experience</div>
    </div>
  );
}
