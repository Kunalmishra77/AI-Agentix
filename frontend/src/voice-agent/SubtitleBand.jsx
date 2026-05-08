// ─── SubtitleBand — Full-Width Caption Strip ──────────────────────────────────
import { useEffect, useRef } from 'react';

export default function SubtitleBand({ subtitle }) {
  const prevRef = useRef(null);

  // Keep showing last subtitle briefly when new one comes in
  const display = subtitle || prevRef.current;
  useEffect(() => {
    if (subtitle) prevRef.current = subtitle;
  }, [subtitle]);

  if (!display) return null;

  return (
    <div
      className={`va-subtitle ${subtitle ? 'va-subtitle--visible' : 'va-subtitle--fade'}`}
      aria-live="polite"
      aria-label="Voice agent caption"
      id="va-subtitle-band"
    >
      <div className={`va-subtitle-text va-subtitle--${display.speaker}`}>
        {display.speaker === 'user' && <span className="va-subtitle-user-dot" />}
        {display.text}
      </div>
    </div>
  );
}
