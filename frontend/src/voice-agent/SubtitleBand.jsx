// ─── SubtitleBand — Glassmorphism Caption Card ────────────────────────────────
import { useEffect, useRef } from 'react';

export default function SubtitleBand({ subtitle }) {
  const prevRef = useRef(null);

  // Keep last subtitle briefly visible while new one fades in
  const display = subtitle || prevRef.current;
  useEffect(() => {
    if (subtitle) prevRef.current = subtitle;
  }, [subtitle]);

  if (!display) return null;

  const speaker = display.speaker || 'agent';
  const showDot = speaker !== 'system';

  return (
    <div
      className={`va-caption ${subtitle ? 'va-caption--visible' : 'va-caption--fade'}`}
      aria-live="polite"
      aria-label="Voice agent caption"
    >
      <div className="va-caption-inner">
        {showDot && (
          <span className={`va-caption-dot va-caption-dot--${speaker}`} />
        )}
        <span className={`va-caption-text va-caption-text--${speaker}`}>
          {display.text}
        </span>
      </div>
    </div>
  );
}
