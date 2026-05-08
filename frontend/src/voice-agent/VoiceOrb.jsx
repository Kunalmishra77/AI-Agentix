// ─── VoiceOrb — Floating Orb with State Animations ───────────────────────────
import { ORB_STATES } from './agentFlow';

const LABELS = {
  [ORB_STATES.IDLE]:      'Talk to AI',
  [ORB_STATES.SPEAKING]:  'Speaking…',
  [ORB_STATES.LISTENING]: 'Listening…',
  [ORB_STATES.THINKING]:  'Thinking…',
  [ORB_STATES.MINIMIZED]: 'AI Guide',
};

export default function VoiceOrb({ orbState, onClick }) {
  const isMinimized = orbState === ORB_STATES.MINIMIZED;

  return (
    <button
      className={`va-orb va-orb--${orbState}`}
      onClick={onClick}
      aria-label={LABELS[orbState] || 'Voice Agent'}
      id="va-orb-btn"
    >
      {/* Rings — visible when speaking */}
      {orbState === ORB_STATES.SPEAKING && (
        <>
          <span className="va-orb-ring va-orb-ring--1" />
          <span className="va-orb-ring va-orb-ring--2" />
          <span className="va-orb-ring va-orb-ring--3" />
        </>
      )}

      {/* Core */}
      <span className="va-orb-core">
        {orbState === ORB_STATES.LISTENING ? (
          /* Waveform bars when listening */
          <span className="va-orb-wave">
            {[1,2,3,4,5].map((i) => (
              <span key={i} className={`va-orb-bar va-orb-bar--${i}`} />
            ))}
          </span>
        ) : orbState === ORB_STATES.THINKING ? (
          /* Spinner dots when thinking */
          <span className="va-orb-dots">
            <span /><span /><span />
          </span>
        ) : (
          /* Mic icon default */
          <svg width={isMinimized ? 14 : 20} height={isMinimized ? 14 : 20}
            viewBox="0 0 24 24" fill="none" stroke="white"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        )}
      </span>

      {/* Label pill — hidden when minimized */}
      {!isMinimized && (
        <span className="va-orb-label">{LABELS[orbState]}</span>
      )}
    </button>
  );
}
