// ─── useVoiceLoop — Main Voice Conversation State Machine ────────────────────
import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSTT } from './useSTT';
import { useTTS } from './useTTS';
import { useGroqChat } from './useGroqChat';
import {
  PHASES, ORB_STATES,
  MSG_WELCOME, MSG_CHOICE, MSG_GUIDE_START, MSG_BROWSE_START, MSG_UNCLEAR,
  extractName, detectGuideIntent, shouldShowLeadForm, parseNavHint, createEmptyLead,
} from './agentFlow';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SESSION_NAME_KEY = 'va_visitor_name';
const SESSION_SEEN_KEY = 'va_gate_seen';

export function useVoiceLoop() {
  const navigate = useNavigate();

  // ── Core state ────────────────────────────────────────────────────────────
  const [phase, setPhase]         = useState(PHASES.GATE);
  const [orbState, setOrbState]   = useState(ORB_STATES.IDLE);
  const [subtitle, setSubtitle]   = useState(null); // { text, speaker:'agent'|'user'|'system' }
  const [visitorName, setVisitorName] = useState(
    () => sessionStorage.getItem(SESSION_NAME_KEY) || ''
  );
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead]           = useState(createEmptyLead());
  const [bookingDone, setBookingDone] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const phaseRef = useRef(phase);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  const visitorNameRef = useRef(visitorName);
  useEffect(() => { visitorNameRef.current = visitorName; }, [visitorName]);

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

    // ── Name capture ────────────────────────────────────────────────────
    if (currentPhase === PHASES.AWAITING_NAME) {
      const name = extractName(transcript);
      setVisitorName(name);
      visitorNameRef.current = name;
      sessionStorage.setItem(SESSION_NAME_KEY, name);
      setTimeout(() => {
        agentSay(MSG_CHOICE(name), PHASES.AWAITING_CHOICE, true);
      }, 400);
      return;
    }

    // ── Guide-or-browse choice ──────────────────────────────────────────
    if (currentPhase === PHASES.AWAITING_CHOICE) {
      const wants = detectGuideIntent(transcript);
      if (wants === null) {
        agentSay(MSG_UNCLEAR, PHASES.AWAITING_CHOICE, true);
        return;
      }
      const name = visitorNameRef.current;
      if (wants) {
        setTimeout(() => {
          agentSay(MSG_GUIDE_START(name), PHASES.GUIDED, true);
        }, 300);
      } else {
        agentSay(MSG_BROWSE_START(name), PHASES.BROWSING, false);
        setTimeout(() => setOrbState(ORB_STATES.MINIMIZED), 2000);
      }
      return;
    }

    // ── Guided LLM conversation ─────────────────────────────────────────
    if (currentPhase === PHASES.GUIDED || currentPhase === PHASES.AWAITING_REPLY) {
      try {
        const nameCtx = visitorNameRef.current
          ? ` [Visitor's name: ${visitorNameRef.current}]` : '';
        const reply = await sendMessage(transcript + nameCtx);
        const { clean, route } = parseNavHint(reply);
        if (route) navigate(route);
        
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
        const nameCtx = visitorNameRef.current
          ? ` [Visitor's name: ${visitorNameRef.current}]` : '';
        const reply = await sendMessage(transcript + nameCtx);
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
      agentSay(MSG_WELCOME, PHASES.AWAITING_NAME, true);
    }, 600);
  }, [agentSay]);

  // ── Orb click — robust resume ─────────────────────────────────────────────
  const onOrbClick = useCallback(() => {
    stopTTS();
    if (stopSTTRef.current) stopSTTRef.current();

    if (phaseRef.current === PHASES.BROWSING || phaseRef.current === PHASES.GATE || phaseRef.current === PHASES.COLLECTING) {
      const name = visitorNameRef.current;
      setOrbState(ORB_STATES.SPEAKING);
      const msg = name
        ? `Welcome back, ${name}! How can I help you?`
        : "Hi there! How can I help you?";
      agentSay(msg, PHASES.GUIDED, true);
    } else {
      // Toggle mic if already in guided mode
      if (phaseRef.current === PHASES.GUIDED || phaseRef.current === PHASES.AWAITING_REPLY) {
        setOrbState(ORB_STATES.LISTENING);
        setSubtitle({ text: 'Listening…', speaker: 'system' });
        if (startSTTRef.current) startSTTRef.current();
      }
    }
  }, [agentSay, stopTTS]);

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
    clearTimeout(formIdleTimerRef.current);
    setBookingError('');
    setPhase(PHASES.BOOKING);
    try {
      const res = await fetch(`${API_BASE}/api/v1/voice-agent/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, solutionNeed: lead.solutionNeed || visitorNameRef.current }),
      });
      if (!res.ok) throw new Error();
      setBookingDone(true);
      setTimeout(() => setShowLeadForm(false), 5000); // hide success card after 5s
      setPhase(PHASES.DONE);
      const firstName = lead.name.split(' ')[0];
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
    phase, orbState, subtitle, visitorName,
    showGate, showLeadForm, lead, bookingDone, bookingError,
    sttSupported,
    onGateClick, onOrbClick,
    updateLead, submitBooking,
  };
}

