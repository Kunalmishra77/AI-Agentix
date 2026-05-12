// ─── useVoiceLoop — Main Voice Conversation State Machine ────────────────────
import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSTT } from './useSTT';
import { useTTS } from './useTTS';
import { useGroqChat } from './useGroqChat';
import {
  PHASES, ORB_STATES,
  MSG_WELCOME,
  shouldShowLeadForm, parseNavHint, createEmptyLead,
} from './agentFlow';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SESSION_NAME_KEY = 'va_visitor_name';
const SESSION_SEEN_KEY = 'va_gate_seen';

export function useVoiceLoop() {
  const navigate = useNavigate();

  // ── Core state ────────────────────────────────────────────────────────────
  // Skip gate on returning session visits so the orb just floats without
  // blocking the entire screen every time the user refreshes.
  const [phase, setPhase] = useState(() =>
    sessionStorage.getItem(SESSION_SEEN_KEY) ? PHASES.BROWSING : PHASES.GATE
  );
  const [orbState, setOrbState]   = useState(ORB_STATES.IDLE);
  const [subtitle, setSubtitle]   = useState(null); // { text, speaker:'agent'|'user'|'system' }
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead]           = useState(createEmptyLead());
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const phaseRef = useRef(phase);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const orbStateRef = useRef(orbState);
  useEffect(() => { orbStateRef.current = orbState; }, [orbState]);

  // Form idle timers
  const formIdleTimerRef = useRef(null);

  // ── Hooks ─────────────────────────────────────────────────────────────────
  const { speak, stop: stopTTS } = useTTS();
  const { sendMessage, resetHistory } = useGroqChat();

  // ── STT setup (defined after agentSay, so we forward-ref it) ─────────────
  const startSTTRef = useRef(null);
  const stopSTTRef = useRef(null);

  // ── Core: agent speaks, then optionally auto-activates mic ───────────────
  const agentSay = useCallback((text, nextPhase, autoListen = false) => {
    setOrbState(ORB_STATES.SPEAKING);
    setSubtitle({ text, speaker: 'agent' });
    if (nextPhase) setPhase(nextPhase);

    speak(text, {
      onEnd: () => {
        setSubtitle(null);
        if (autoListen && startSTTRef.current) {
          setTimeout(() => {
            setOrbState(ORB_STATES.LISTENING);
            setSubtitle({ text: 'Listening…', speaker: 'system' });
            startSTTRef.current();
          }, 450);
        } else {
          // If we are collecting a lead, keep orb idle, wait for typing
          if (nextPhase === PHASES.COLLECTING || nextPhase === PHASES.BROWSING) {
            setOrbState(nextPhase === PHASES.BROWSING ? ORB_STATES.MINIMIZED : ORB_STATES.IDLE);
          } else {
            setOrbState(ORB_STATES.IDLE);
          }
        }
      },
      onError: () => {
        setSubtitle(null);
        setOrbState(ORB_STATES.IDLE);
      },
    });
  }, [speak]);

  // ── Form idle tracking ────────────────────────────────────────────────────
  const resetFormTimer = useCallback(() => {
    clearTimeout(formIdleTimerRef.current);
    if (phaseRef.current === PHASES.COLLECTING && showLeadForm) {
      formIdleTimerRef.current = setTimeout(() => {
        // 15 seconds of no typing
        agentSay("Just checking in — let me know if you need any help filling out those details.", PHASES.COLLECTING, false);
        
        // Second timer for abandonment
        formIdleTimerRef.current = setTimeout(() => {
          setShowLeadForm(false);
          agentSay("Looks like you stepped away. I'm right here when you're ready to continue.", PHASES.BROWSING, false);
          setTimeout(() => setOrbState(ORB_STATES.MINIMIZED), 2000);
        }, 15000);
      }, 15000);
    }
  }, [agentSay, showLeadForm]);

  useEffect(() => {
    if (showLeadForm && phase === PHASES.COLLECTING) {
      resetFormTimer();
    } else {
      clearTimeout(formIdleTimerRef.current);
    }
    return () => clearTimeout(formIdleTimerRef.current);
  }, [showLeadForm, phase, resetFormTimer]);


  // ── STT callbacks ─────────────────────────────────────────────────────────
  const onSTTInterim = useCallback((text) => {
    setSubtitle({ text, speaker: 'user' });
  }, []);

  const onSTTResult = useCallback(async (transcript) => {
    setSubtitle({ text: transcript, speaker: 'user' });
    setOrbState(ORB_STATES.THINKING);
    setTimeout(() => setSubtitle(null), 1200);

    const currentPhase = phaseRef.current;

    // ── Guided LLM conversation ─────────────────────────────────────────
    if (currentPhase === PHASES.GUIDED || currentPhase === PHASES.AWAITING_REPLY) {
      try {
        const reply = await sendMessage(transcript);
        const { clean, route } = parseNavHint(reply);
        if (route) {
          navigate(route);
          window.dispatchEvent(new CustomEvent('agent-navigate', { detail: { route } }));
        }
        
        if (shouldShowLeadForm(clean)) {
          setShowLeadForm(true);
          agentSay(clean, PHASES.COLLECTING, false); // Don't auto listen, let them type
        } else {
          agentSay(clean, PHASES.GUIDED, true);
        }
      } catch {
        agentSay("I'm having a quick issue — give me just a moment.", PHASES.GUIDED, true);
      }
    }
    
    // ── Interacting during form collection ──────────────────────────────
    if (currentPhase === PHASES.COLLECTING) {
      clearTimeout(formIdleTimerRef.current); // Stop idle timers if they talk
      try {
        const reply = await sendMessage(transcript);
        const { clean } = parseNavHint(reply);
        agentSay(clean, PHASES.COLLECTING, false);
      } catch {
        agentSay("I'm having a quick issue.", PHASES.COLLECTING, false);
      }
    }
  }, [agentSay, sendMessage, navigate]);

  const onSTTStart = useCallback(() => {
    setOrbState(ORB_STATES.LISTENING);
    setSubtitle({ text: 'Listening…', speaker: 'system' });
  }, []);

  const onSTTEnd = useCallback(() => {
    if (phaseRef.current !== PHASES.BROWSING) setSubtitle(null);
    setOrbState((prev) => prev === ORB_STATES.LISTENING ? ORB_STATES.IDLE : prev);
  }, []);

  const onSTTError = useCallback((err) => {
    setOrbState(ORB_STATES.IDLE);
    setSubtitle(null);
    if (err && err !== 'no-speech' && phaseRef.current !== PHASES.COLLECTING) {
      agentSay("I didn't catch that — could you say that again?", phaseRef.current, true);
    }
  }, [agentSay]);

  const { start: startSTT, stop: stopSTT, isSupported: sttSupported } = useSTT({
    onResult: onSTTResult,
    onInterim: onSTTInterim,
    onStart:  onSTTStart,
    onEnd:    onSTTEnd,
    onError:  onSTTError,
  });

  // Wire STT methods into refs so agentSay/orbClick can call them
  useEffect(() => {
    startSTTRef.current = startSTT;
    stopSTTRef.current = stopSTT;

    // DEBUG HOOK FOR AUTOMATED TESTING
    window.__simulateSTTResult = onSTTResult;
  }, [startSTT, stopSTT, onSTTResult]);

  // ── Gate click — starts the whole experience ──────────────────────────────
  const onGateClick = useCallback(() => {
    sessionStorage.setItem(SESSION_SEEN_KEY, '1');
    setPhase(PHASES.GREETING);
    // Small delay so the gate fade-out animation plays first
    setTimeout(() => {
      agentSay(MSG_WELCOME, PHASES.GUIDED, true);
    }, 600);
  }, [agentSay]);

  // ── Orb click — robust resume ─────────────────────────────────────────────
  const onOrbClick = useCallback(() => {
    // If it's already active (listening/speaking/thinking), tap = STOP
    if (
      orbStateRef.current === ORB_STATES.LISTENING || 
      orbStateRef.current === ORB_STATES.SPEAKING || 
      orbStateRef.current === ORB_STATES.THINKING
    ) {
      stopTTS();
      if (stopSTTRef.current) stopSTTRef.current();
      setOrbState(ORB_STATES.IDLE);
      setSubtitle(null);
      return;
    }

    stopTTS();
    if (stopSTTRef.current) stopSTTRef.current();

    if (phaseRef.current === PHASES.BROWSING || phaseRef.current === PHASES.GATE || phaseRef.current === PHASES.COLLECTING) {
      setOrbState(ORB_STATES.SPEAKING);
      const msg = "Hi there! How can I help you today?";
      agentSay(msg, PHASES.GUIDED, true);
    } else {
      // Toggle mic if already in guided mode
      if (
        phaseRef.current === PHASES.GUIDED || 
        phaseRef.current === PHASES.AWAITING_REPLY
      ) {
        setOrbState(ORB_STATES.LISTENING);
        setSubtitle({ text: 'Listening…', speaker: 'system' });
        if (startSTTRef.current) startSTTRef.current();
      }
    }
  }, [agentSay, stopTTS]);

  // Listen for external "open voice agent" signal (nav Talk button, etc.)
  // Always bypass the gate — go straight to the orb conversation.
  useEffect(() => {
    const handler = () => {
      const cur = phaseRef.current;
      if (cur === PHASES.GATE) {
        // Skip full-screen gate; mark as seen and start orb directly
        sessionStorage.setItem(SESSION_SEEN_KEY, '1');
        phaseRef.current = PHASES.BROWSING;
        setPhase(PHASES.BROWSING);
      }
      // onOrbClick handles BROWSING (and GUIDED/COLLECTING etc.)
      setTimeout(() => onOrbClick(), 80);
    };
    window.addEventListener('open-voice-agent', handler);
    return () => window.removeEventListener('open-voice-agent', handler);
  }, [onOrbClick]);

  // ── Lead form handlers ────────────────────────────────────────────────────
  const updateLead = useCallback((field, value) => {
    resetFormTimer(); // reset idle timer when they type
    setLead((prev) => ({ ...prev, [field]: value }));
  }, [resetFormTimer]);

  const submitBooking = useCallback(async () => {
    if (!lead.name || !lead.email) {
      setBookingError('Please enter your name and email.');
      return;
    }

    // ── Date validation (Layer 2 — frontend) ─────────────────────────────────
    if (lead.preferredDate) {
      const slotStr = `${lead.preferredDate}T${lead.preferredTime || '09:00'}`;
      const slot    = new Date(slotStr);
      const now     = new Date();

      if (!isNaN(slot.getTime())) {
        if (slot < now) {
          setBookingError("That date and time has already passed — please pick a future slot.");
          return;
        }
        // Nudge if booking is more than 3 days out
        const threeDaysOut = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        if (slot > threeDaysOut) {
          agentSay(
            "We can hold that slot for you — just a heads-up that we also have openings tomorrow and the day after if you'd like to get started sooner.",
            PHASES.COLLECTING, false
          );
        }
      }
    }

    clearTimeout(formIdleTimerRef.current);
    setBookingError('');
    setPhase(PHASES.BOOKING);
    try {
      const res = await fetch(`${API_BASE}/api/v1/demo/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, source: 'voice' }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Backend rejected it (e.g. past date slipped through)
        setBookingError(data?.error?.message || 'Booking failed. Please try again.');
        setPhase(PHASES.GUIDED);
        return;
      }
      setBookingDone(true);
      setTimeout(() => setShowLeadForm(false), 5000);
      setPhase(PHASES.DONE);
      const firstName = lead.name.split(' ')[0] || 'there';
      agentSay(
        `You're all set, ${firstName}! A calendar invite is on its way to ${lead.email}. The AGENTiX team will confirm your slot. It was great speaking with you today.`,
        PHASES.DONE, false
      );
      setTimeout(() => setOrbState(ORB_STATES.MINIMIZED), 3000);
    } catch {
      setBookingError('Booking failed. Please try again.');
      setPhase(PHASES.GUIDED);
    }
  }, [lead, agentSay]);

  // ── Whether gate should show ──────────────────────────────────────────────
  const showGate = phase === PHASES.GATE;

  return {
    phase, orbState, subtitle,
    showGate, showLeadForm, lead, bookingDone, bookingError,
    sttSupported,
    onGateClick, onOrbClick,
    updateLead, submitBooking,
  };
}

