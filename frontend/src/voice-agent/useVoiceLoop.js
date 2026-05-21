// ─── useVoiceLoop — Main Voice Conversation State Machine ────────────────────
import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSTT } from './useSTT';
import { useTTS } from './useTTS';
import { useGroqChat } from './useGroqChat';
import {
  PHASES, ORB_STATES,
  MSG_WELCOME,
  shouldShowLeadForm, isAgreeingToDemo,
  parseNavHint, routeFromKeywords, toolHintFromKeywords,
  createEmptyLead,
} from './agentFlow';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SESSION_SEEN_KEY = 'va_gate_seen';

export function useVoiceLoop() {
  const navigate = useNavigate();

  // ── Core state ────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState(() =>
    sessionStorage.getItem(SESSION_SEEN_KEY) ? PHASES.BROWSING : PHASES.GATE
  );
  const [orbState, setOrbState]   = useState(ORB_STATES.IDLE);
  const [subtitle, setSubtitle]   = useState(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead]           = useState(createEmptyLead());
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const phaseRef = useRef(phase);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const orbStateRef = useRef(orbState);
  useEffect(() => { orbStateRef.current = orbState; }, [orbState]);

  // True once the first real conversation exchange starts — prevents
  // replaying the welcome message when user pauses and re-taps mid-session.
  const conversationStartedRef = useRef(false);

  // Set by onOrbClick "stop" path so onSTTEnd doesn't fire the no-response nudge.
  const intentionalStopRef = useRef(false);

  // Form idle timers
  const formIdleTimerRef = useRef(null);

  // ── Hooks ─────────────────────────────────────────────────────────────────
  const { speak, stop: stopTTS } = useTTS();
  const { sendMessage } = useGroqChat();

  // ── STT setup (forward-ref so agentSay can call it) ───────────────────────
  const startSTTRef = useRef(null);
  const stopSTTRef  = useRef(null);

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
            intentionalStopRef.current = false;
            setOrbState(ORB_STATES.LISTENING);
            setSubtitle({ text: 'Listening…', speaker: 'system' });
            startSTTRef.current();
          }, 450);
        } else {
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
        agentSay("Just checking in — let me know if you need help filling that out.", PHASES.COLLECTING, false);
        formIdleTimerRef.current = setTimeout(() => {
          setShowLeadForm(false);
          agentSay("Looks like you stepped away. I'm right here when you're ready.", PHASES.BROWSING, false);
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
      // User agreed to book — open form directly, no verbal form-filling
      if (isAgreeingToDemo(transcript)) {
        setShowLeadForm(true);
        agentSay(
          "Perfect! Fill in the form — name, email, and a date within the next three days. I'll be right here.",
          PHASES.COLLECTING, false
        );
        return;
      }

      try {
        const reply = await sendMessage(transcript);
        const { clean, route: llmRoute, toolId: llmToolId } = parseNavHint(reply);
        const route  = llmRoute  || routeFromKeywords(transcript);
        const toolId = llmToolId || toolHintFromKeywords(transcript);
        if (route) {
          navigate(route);
          window.dispatchEvent(new CustomEvent('agent-navigate', { detail: { route, toolId } }));
        }

        if (shouldShowLeadForm(clean)) {
          setShowLeadForm(true);
          agentSay(clean, PHASES.COLLECTING, false);
        } else {
          agentSay(clean, PHASES.GUIDED, true);
        }
      } catch {
        agentSay("I'm having a quick issue — give me just a moment.", PHASES.GUIDED, true);
      }
    }

    // ── Interacting during form collection ──────────────────────────────
    if (currentPhase === PHASES.COLLECTING) {
      clearTimeout(formIdleTimerRef.current);
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
    intentionalStopRef.current = false;
    setOrbState(ORB_STATES.LISTENING);
    setSubtitle({ text: 'Listening…', speaker: 'system' });
  }, []);

  // Called when STT stops with NO speech detected (no-speech or watchdog timeout).
  // If user intentionally stopped, skip the nudge.
  const onSTTEnd = useCallback(() => {
    setSubtitle(null);
    setOrbState((prev) => prev === ORB_STATES.LISTENING ? ORB_STATES.IDLE : prev);

    if (
      !intentionalStopRef.current &&
      (phaseRef.current === PHASES.GUIDED || phaseRef.current === PHASES.AWAITING_REPLY)
    ) {
      agentSay(
        "I didn't catch that — I'm right here. Just tap me when you're ready.",
        PHASES.BROWSING, false
      );
      setTimeout(() => setOrbState(ORB_STATES.MINIMIZED), 2500);
    }
  }, [agentSay]);

  const onSTTError = useCallback((err) => {
    setOrbState(ORB_STATES.IDLE);
    setSubtitle(null);
    if (err && err !== 'no-speech' && phaseRef.current !== PHASES.COLLECTING) {
      agentSay("I didn't catch that — could you say that again?", phaseRef.current, true);
    }
  }, [agentSay]);

  const { start: startSTT, stop: stopSTT, isSupported: sttSupported } = useSTT({
    onResult:  onSTTResult,
    onInterim: onSTTInterim,
    onStart:   onSTTStart,
    onEnd:     onSTTEnd,
    onError:   onSTTError,
  });

  useEffect(() => {
    startSTTRef.current = startSTT;
    stopSTTRef.current  = stopSTT;
    window.__simulateSTTResult = onSTTResult;
  }, [startSTT, stopSTT, onSTTResult]);

  // ── Gate click — first-time entry ─────────────────────────────────────────
  const onGateClick = useCallback(() => {
    sessionStorage.setItem(SESSION_SEEN_KEY, '1');
    // Silently transition to browsing phase on entry
    setPhase(PHASES.BROWSING);
  }, []);

  // ── Orb click — pause / resume ────────────────────────────────────────────
  const onOrbClick = useCallback(() => {
    // Tap while active → STOP
    if (
      orbStateRef.current === ORB_STATES.LISTENING ||
      orbStateRef.current === ORB_STATES.SPEAKING  ||
      orbStateRef.current === ORB_STATES.THINKING
    ) {
      intentionalStopRef.current = true;
      stopTTS();
      if (stopSTTRef.current) stopSTTRef.current();
      setOrbState(ORB_STATES.IDLE);
      setSubtitle(null);
      return;
    }

    stopTTS();
    if (stopSTTRef.current) stopSTTRef.current();

    if (phaseRef.current === PHASES.BROWSING || phaseRef.current === PHASES.GATE || phaseRef.current === PHASES.COLLECTING) {
      if (conversationStartedRef.current) {
        // Mid-session resume — skip the intro, just restart mic directly
        phaseRef.current = PHASES.GUIDED;
        setPhase(PHASES.GUIDED);
        intentionalStopRef.current = false;
        setTimeout(() => {
          setOrbState(ORB_STATES.LISTENING);
          if (startSTTRef.current) startSTTRef.current();
        }, 120);
      } else {
        // First ever click — play welcome
        conversationStartedRef.current = true;
        agentSay(MSG_WELCOME, PHASES.GUIDED, true);
      }
    } else if (phaseRef.current === PHASES.GUIDED || phaseRef.current === PHASES.AWAITING_REPLY) {
      // Already in guided — toggle mic
      intentionalStopRef.current = false;
      setOrbState(ORB_STATES.LISTENING);
      setSubtitle({ text: 'Listening…', speaker: 'system' });
      if (startSTTRef.current) startSTTRef.current();
    }
  }, [agentSay, stopTTS]);

  // External "open voice agent" signal (nav Talk button, etc.)
  useEffect(() => {
    const handler = () => {
      const cur = phaseRef.current;
      if (cur === PHASES.GATE) {
        sessionStorage.setItem(SESSION_SEEN_KEY, '1');
        phaseRef.current = PHASES.BROWSING;
        setPhase(PHASES.BROWSING);
      }
      setTimeout(() => onOrbClick(), 80);
    };
    window.addEventListener('open-voice-agent', handler);
    return () => window.removeEventListener('open-voice-agent', handler);
  }, [onOrbClick]);

  // ── Lead form handlers ────────────────────────────────────────────────────
  const updateLead = useCallback((field, value) => {
    resetFormTimer();
    setLead((prev) => ({ ...prev, [field]: value }));
  }, [resetFormTimer]);

  const submitBooking = useCallback(async () => {
    if (!lead.name || !lead.email) {
      setBookingError('Please enter your name and email.');
      return;
    }

    // ── Date validation (Layer 2 — frontend) ──────────────────────────────
    if (lead.preferredDate) {
      const slotStr = `${lead.preferredDate}T${lead.preferredTime || '09:00'}`;
      const slot    = new Date(slotStr);
      const now     = new Date();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const sevenDaysOut = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      if (!isNaN(slot.getTime())) {
        if (slot < tomorrow) {
          setBookingError("Demos must be booked from tomorrow onwards — please pick a future date.");
          return;
        }
        if (slot > sevenDaysOut) {
          setBookingError("Please pick a date within the next 7 days so we can confirm your slot quickly.");
          return;
        }
        const threeDaysOut = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        if (slot > threeDaysOut) {
          agentSay(
            "Noted — we also have slots tomorrow and the day after if you'd like to get started sooner.",
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
        setBookingError(data?.error?.message || 'Booking failed. Please try again.');
        setPhase(PHASES.GUIDED);
        return;
      }
      setBookingDone(true);
      setTimeout(() => setShowLeadForm(false), 5000);
      setPhase(PHASES.DONE);
      const firstName = lead.name.split(' ')[0] || 'there';
      agentSay(
        `You're all set, ${firstName}! A calendar invite is on its way to ${lead.email}. The AGENTiX team will confirm your slot shortly.`,
        PHASES.DONE, false
      );
      setTimeout(() => setOrbState(ORB_STATES.MINIMIZED), 3000);
    } catch {
      setBookingError('Booking failed. Please try again.');
      setPhase(PHASES.GUIDED);
    }
  }, [lead, agentSay]);

  const showGate = phase === PHASES.GATE;

  return {
    phase, orbState, subtitle,
    showGate, showLeadForm, lead, bookingDone, bookingError,
    sttSupported,
    onGateClick, onOrbClick,
    updateLead, submitBooking,
  };
}
