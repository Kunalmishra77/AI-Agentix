// ─── VoiceExperience — Root Composer ─────────────────────────────────────────
// Assembles: PreloaderGate + VoiceOrb + SubtitleBand + VoiceLeadForm
// No chat panel. The website IS the display.

import { PHASES } from './agentFlow';
import { useVoiceLoop } from './useVoiceLoop';
import PreloaderGate  from './PreloaderGate';
import VoiceOrb       from './VoiceOrb';
import SubtitleBand   from './SubtitleBand';
import VoiceLeadForm  from './VoiceLeadForm';
import './voice-agent.css';

export default function VoiceExperience() {
  const {
    phase, orbState, subtitle, showGate,
    showLeadForm, lead, bookingDone, bookingError,
    sttSupported,
    onGateClick, onOrbClick,
    updateLead, submitBooking,
  } = useVoiceLoop();

  // Don't show orb during gate or after done (no longer needed once done)
  const showOrb = !showGate && phase !== PHASES.GATE;

  return (
    <>
      {/* 1 — Entry gate (full-screen, first visit only) */}
      {showGate && <PreloaderGate onEnter={onGateClick} />}

      {/* 2 — Floating orb */}
      {showOrb && (
        <VoiceOrb orbState={orbState} onClick={onOrbClick} />
      )}

      {/* 3 — Subtitle caption band (bottom of screen) */}
      <SubtitleBand subtitle={subtitle} />

      {/* 4 — Floating booking form (appears mid-conversation) */}
      {showLeadForm && (
        <VoiceLeadForm
          lead={lead}
          phase={phase}
          error={bookingError}
          bookingDone={bookingDone}
          onChange={updateLead}
          onSubmit={submitBooking}
          onClose={() => {/* user dismissed — keep orb active */}}
        />
      )}

      {/* 5 — STT not supported notice (Safari users) */}
      {!sttSupported && !showGate && (
        <div className="va-no-stt">
          ⚠️ Voice input requires Chrome or Edge. The AI guide will still speak to you.
        </div>
      )}
    </>
  );
}
