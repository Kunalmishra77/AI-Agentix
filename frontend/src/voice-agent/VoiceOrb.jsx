// ─── VoiceOrb — Animated AI Face ─────────────────────────────────────────────
import { ORB_STATES } from './agentFlow';

// Animated face SVG — expression changes per state
function AgentFace({ orbState, isMinimized }) {
  const sz = isMinimized ? 15 : 20;

  return (
    <svg width={sz} height={sz} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {/* Left eye */}
      <ellipse
        cx="7" cy="8" rx="1.6" ry="1.6"
        fill="white"
        className={`va-face-eye va-face-eye--${orbState}`}
      />
      {/* Right eye */}
      <ellipse
        cx="13" cy="8" rx="1.6" ry="1.6"
        fill="white"
        className={`va-face-eye va-face-eye--${orbState}`}
      />

      {/* Mouth — state-driven */}
      {orbState === ORB_STATES.SPEAKING && (
        // Animated waveform bars centred under the eyes
        <g>
          <rect x="3.5" y="12.5" width="1.6" height="3.5" rx="0.8" fill="white" className="va-face-bar va-face-bar--1" />
          <rect x="6.2" y="11.5" width="1.6" height="5.5" rx="0.8" fill="white" className="va-face-bar va-face-bar--2" />
          <rect x="8.9" y="12"   width="1.6" height="4.5" rx="0.8" fill="white" className="va-face-bar va-face-bar--3" />
          <rect x="11.6" y="11.5" width="1.6" height="5.5" rx="0.8" fill="white" className="va-face-bar va-face-bar--4" />
          <rect x="14.3" y="12.5" width="1.6" height="3.5" rx="0.8" fill="white" className="va-face-bar va-face-bar--5" />
        </g>
      )}

      {orbState === ORB_STATES.LISTENING && (
        // Wide attentive smile
        <path d="M6 13.5 Q10 16.5 14 13.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      )}

      {orbState === ORB_STATES.THINKING && (
        // Ellipsis dots
        <g>
          <circle cx="7"  cy="14.5" r="1.1" fill="white" className="va-face-dot va-face-dot--1" />
          <circle cx="10" cy="14.5" r="1.1" fill="white" className="va-face-dot va-face-dot--2" />
          <circle cx="13" cy="14.5" r="1.1" fill="white" className="va-face-dot va-face-dot--3" />
        </g>
      )}

      {(orbState === ORB_STATES.IDLE || orbState === ORB_STATES.MINIMIZED) && (
        // Gentle neutral smile
        <path d="M7 13 Q10 15.5 13 13" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      )}
    </svg>
  );
}

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
      {/* Rings — speaking state only */}
      {orbState === ORB_STATES.SPEAKING && (
        <>
          <span className="va-orb-ring va-orb-ring--1" />
          <span className="va-orb-ring va-orb-ring--2" />
          <span className="va-orb-ring va-orb-ring--3" />
        </>
      )}

      {/* Persistent glow pulse ring — idle + minimized */}
      {(orbState === ORB_STATES.IDLE || orbState === ORB_STATES.MINIMIZED) && (
        <span className="va-orb-glow-ring" />
      )}

      {/* Face core */}
      <span className="va-orb-core">
        <AgentFace orbState={orbState} isMinimized={isMinimized} />
      </span>

      {/* Label pill — hidden when minimized */}
      {!isMinimized && (
        <span className="va-orb-label">{LABELS[orbState]}</span>
      )}
    </button>
  );
}
