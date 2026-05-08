import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSTT } from './useSTT';
import { useTTS } from './useTTS';
import { useGroqChat } from './useGroqChat';
import {
  AGENT_STATES,
  GREETING_MESSAGE,
  createEmptyLead,
  shouldCollectLead,
} from './agentFlow';
import './voice-agent.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ── Icons (inline SVG so no extra deps) ──────────────────────────────────────
const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8"  y1="23" x2="16" y2="23"/>
  </svg>
);

const MicOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23"/>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8"  y1="23" x2="16" y2="23"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

const AgentAvatarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);

const CalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);

// ── Parse nav hint from LLM response ─────────────────────────────────────────
function parseNavHint(text) {
  const match = text.match(/\[NAVIGATE:([^\]]+)\]/);
  if (!match) return { clean: text, route: null };
  return {
    clean: text.replace(/\[NAVIGATE:[^\]]+\]/, '').trim(),
    route: match[1],
  };
}

// ── Status label ──────────────────────────────────────────────────────────────
function statusLabel(state) {
  switch (state) {
    case AGENT_STATES.GREETING:  return 'Greeting you…';
    case AGENT_STATES.LISTENING: return 'Listening…';
    case AGENT_STATES.THINKING:  return 'Thinking…';
    case AGENT_STATES.SPEAKING:  return 'Speaking…';
    case AGENT_STATES.COLLECTING:return 'Collecting details';
    case AGENT_STATES.BOOKING:   return 'Booking demo…';
    case AGENT_STATES.DONE:      return 'Done ✓';
    default:                     return 'Ready';
  }
}

// ── Main Widget Component ─────────────────────────────────────────────────────
export default function VoiceAgentWidget() {
  const navigate = useNavigate();

  // Panel open/close
  const [open, setOpen]         = useState(false);
  const [greeted, setGreeted]   = useState(false);

  // Conversation
  const [messages, setMessages] = useState([]);
  const [agentState, setAgentState] = useState(AGENT_STATES.IDLE);
  const [textInput, setTextInput]   = useState('');

  // Navigation suggestion
  const [navSuggestion, setNavSuggestion] = useState(null); // { route, label }

  // Lead collection
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead]                 = useState(createEmptyLead());
  const [bookingDone, setBookingDone]   = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Refs
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  // Hooks
  const { speak, stop: stopTTS } = useTTS();
  const { sendMessage, resetHistory } = useGroqChat();

  // ── Helpers ──────────────────────────────────────────────────────────────
  const addMessage = useCallback((role, text) => {
    setMessages((prev) => [...prev, { role, text, id: Date.now() + Math.random() }]);
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  // ── Speak + state helper ──────────────────────────────────────────────────
  const agentSay = useCallback((text, nextState = AGENT_STATES.IDLE) => {
    setAgentState(AGENT_STATES.SPEAKING);
    addMessage('agent', text);
    speak(text, {
      onEnd: () => setAgentState(nextState),
      onError: () => setAgentState(nextState),
    });
  }, [speak, addMessage]);

  // ── STT callbacks ──────────────────────────────────────────────────────────
  const onSTTResult = useCallback(async (transcript) => {
    if (!transcript.trim()) return;
    stopTTS();
    addMessage('user', transcript);
    setAgentState(AGENT_STATES.THINKING);

    try {
      const reply = await sendMessage(transcript);
      const { clean, route } = parseNavHint(reply);

      if (route) {
        setNavSuggestion({ route, label: route });
      }

      if (shouldCollectLead(clean)) {
        setShowLeadForm(true);
      }

      agentSay(clean, AGENT_STATES.IDLE);
    } catch (err) {
      agentSay("I'm having trouble connecting right now. Please try again in a moment.", AGENT_STATES.IDLE);
    }
  }, [stopTTS, addMessage, sendMessage, agentSay]);

  const onSTTStart = useCallback(() => setAgentState(AGENT_STATES.LISTENING), []);
  const onSTTEnd   = useCallback(() => {
    if (agentState === AGENT_STATES.LISTENING) setAgentState(AGENT_STATES.IDLE);
  }, [agentState]);
  const onSTTError = useCallback((err) => {
    setAgentState(AGENT_STATES.IDLE);
    if (err !== 'no-speech') addMessage('agent', `Mic issue: ${err}. You can type instead.`);
  }, [addMessage]);

  const { start: startSTT, stop: stopSTT, isSupported: sttSupported } = useSTT({
    onResult: onSTTResult,
    onStart:  onSTTStart,
    onEnd:    onSTTEnd,
    onError:  onSTTError,
  });

  // ── Open panel → greet ────────────────────────────────────────────────────
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setAgentState(AGENT_STATES.GREETING);
      addMessage('agent', GREETING_MESSAGE);
      speak(GREETING_MESSAGE, {
        onEnd:  () => setAgentState(AGENT_STATES.IDLE),
        onError:() => setAgentState(AGENT_STATES.IDLE),
      });
    }
  }, [open, greeted, speak, addMessage]);

  // ── Close panel ───────────────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    stopTTS();
    stopSTT();
    setOpen(false);
    setAgentState(AGENT_STATES.IDLE);
  }, [stopTTS, stopSTT]);

  // ── Mic toggle ────────────────────────────────────────────────────────────
  const handleMicToggle = useCallback(() => {
    if (agentState === AGENT_STATES.LISTENING) {
      stopSTT();
      setAgentState(AGENT_STATES.IDLE);
    } else {
      stopTTS();
      startSTT();
    }
  }, [agentState, startSTT, stopSTT, stopTTS]);

  // ── Text send ─────────────────────────────────────────────────────────────
  const handleTextSend = useCallback(async () => {
    const text = textInput.trim();
    if (!text) return;
    setTextInput('');
    stopTTS();
    addMessage('user', text);
    setAgentState(AGENT_STATES.THINKING);

    try {
      const reply = await sendMessage(text);
      const { clean, route } = parseNavHint(reply);
      if (route) setNavSuggestion({ route, label: route });
      if (shouldCollectLead(clean)) setShowLeadForm(true);
      agentSay(clean, AGENT_STATES.IDLE);
    } catch {
      agentSay("I'm having trouble connecting. Please try again in a moment.", AGENT_STATES.IDLE);
    }
  }, [textInput, stopTTS, addMessage, sendMessage, agentSay]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSend();
    }
  }, [handleTextSend]);

  // ── Navigate ──────────────────────────────────────────────────────────────
  const handleNavigate = useCallback(() => {
    if (!navSuggestion) return;
    navigate(navSuggestion.route);
    setNavSuggestion(null);
    handleClose();
  }, [navSuggestion, navigate, handleClose]);

  // ── Lead form ─────────────────────────────────────────────────────────────
  const handleLeadChange = useCallback((field, value) => {
    setLead((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleBook = useCallback(async () => {
    if (!lead.name || !lead.email) {
      setBookingError('Please enter your name and email to book.');
      return;
    }
    setBookingError('');
    setAgentState(AGENT_STATES.BOOKING);

    try {
      const res = await fetch(`${API_BASE}/api/v1/voice-agent/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error('Booking failed');
      setBookingDone(true);
      setShowLeadForm(false);
      setAgentState(AGENT_STATES.DONE);
      const confirmText = `You're all set, ${lead.name.split(' ')[0]}! I've notified the Agentix team and a calendar invite is on its way to ${lead.email}. Looking forward to speaking with you.`;
      addMessage('agent', confirmText);
      speak(confirmText);
    } catch {
      setBookingError('Something went wrong. Please try again or visit agentix.ai/demo directly.');
      setAgentState(AGENT_STATES.IDLE);
    }
  }, [lead, addMessage, speak]);

  // ── Render ────────────────────────────────────────────────────────────────
  const isBusy   = [AGENT_STATES.THINKING, AGENT_STATES.BOOKING].includes(agentState);
  const isListening = agentState === AGENT_STATES.LISTENING;
  const isSpeaking  = agentState === AGENT_STATES.SPEAKING || agentState === AGENT_STATES.GREETING;

  return (
    <>
      {/* ── FAB (closed state) ─────────────────────────────────────── */}
      {!open && (
        <button
          className="va-fab"
          onClick={() => setOpen(true)}
          aria-label="Open Agentix Voice Advisor"
          id="va-open-btn"
        >
          <div className="va-fab-orb">
            <AgentAvatarIcon />
          </div>
          <span className="va-fab-label">Talk to Agentix</span>
          <span className="va-fab-badge">AI</span>
        </button>
      )}

      {/* ── Panel (open state) ─────────────────────────────────────── */}
      {open && (
        <div className="va-panel" role="dialog" aria-label="Agentix Voice Advisor">

          {/* Header */}
          <div className="va-header">
            <div className={`va-header-orb ${isSpeaking ? 'speaking' : ''}`}>
              <AgentAvatarIcon />
            </div>
            <div className="va-header-info">
              <div className="va-header-name">Agentix Voice Advisor</div>
              <div className="va-header-status">
                <span className={`va-status-dot ${isListening ? 'listening' : isBusy ? 'thinking' : ''}`} />
                {statusLabel(agentState)}
              </div>
            </div>
            <button className="va-close-btn" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="va-messages" id="va-messages-area">
            {messages.map((msg) => (
              <div key={msg.id} className={`va-msg ${msg.role}`}>
                <div className="va-msg-avatar">
                  {msg.role === 'agent' ? <AgentAvatarIcon /> : '👤'}
                </div>
                <div className="va-msg-bubble">{msg.text}</div>
              </div>
            ))}

            {/* Thinking dots */}
            {isBusy && (
              <div className="va-msg agent">
                <div className="va-msg-avatar"><AgentAvatarIcon /></div>
                <div className="va-thinking-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice visualizer (listening state) */}
          <div className={`va-visualizer ${isListening ? 'listening' : ''}`}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} style={{ height: isListening ? undefined : '4px' }} />
            ))}
          </div>

          {/* Navigation suggestion strip */}
          {navSuggestion && (
            <div className="va-nav-strip">
              <span className="va-nav-label">Jump to relevant section →</span>
              <button className="va-nav-btn" onClick={handleNavigate}>
                Go there ↗
              </button>
            </div>
          )}

          {/* Lead collection form */}
          {showLeadForm && !bookingDone && (
            <div className="va-lead-form">
              <div className="va-lead-form-title"><CalIcon /> Book a Demo</div>
              <div className="va-lead-row">
                <input
                  className="va-lead-input"
                  placeholder="Your name *"
                  value={lead.name}
                  onChange={(e) => handleLeadChange('name', e.target.value)}
                  id="va-lead-name"
                />
                <input
                  className="va-lead-input"
                  placeholder="Company"
                  value={lead.company}
                  onChange={(e) => handleLeadChange('company', e.target.value)}
                  id="va-lead-company"
                />
              </div>
              <input
                className="va-lead-input full"
                placeholder="Email address *"
                type="email"
                value={lead.email}
                onChange={(e) => handleLeadChange('email', e.target.value)}
                id="va-lead-email"
              />
              <div className="va-lead-row">
                <input
                  className="va-lead-input"
                  placeholder="Preferred date (e.g. May 20)"
                  value={lead.preferredDate}
                  onChange={(e) => handleLeadChange('preferredDate', e.target.value)}
                  id="va-lead-date"
                />
                <input
                  className="va-lead-input"
                  placeholder="Preferred time (e.g. 2 PM IST)"
                  value={lead.preferredTime}
                  onChange={(e) => handleLeadChange('preferredTime', e.target.value)}
                  id="va-lead-time"
                />
              </div>
              {bookingError && (
                <div style={{ fontSize: 11, color: '#ff6b6b', textAlign: 'center' }}>
                  {bookingError}
                </div>
              )}
              <button
                className="va-book-btn"
                onClick={handleBook}
                disabled={agentState === AGENT_STATES.BOOKING}
                id="va-book-submit"
              >
                <CalIcon />
                {agentState === AGENT_STATES.BOOKING ? 'Booking…' : 'Book Demo on Calendar'}
              </button>
            </div>
          )}

          {/* Booking success */}
          {bookingDone && (
            <div className="va-success">
              <div className="va-success-icon">✅</div>
              <div className="va-success-title">You're booked!</div>
              <div className="va-success-text">
                A calendar invite has been sent to <strong>{lead.email}</strong>.<br />
                The Agentix team will confirm your slot shortly.
              </div>
            </div>
          )}

          {/* STT not supported notice */}
          {!sttSupported && (
            <div className="va-no-mic-notice">
              ⚠️ Voice input needs Chrome or Edge. You can type below.
            </div>
          )}

          {/* Controls: mic + text input + send */}
          <div className="va-controls">
            {sttSupported && (
              <button
                className={`va-mic-btn ${isListening ? 'active' : ''}`}
                onClick={handleMicToggle}
                disabled={isBusy}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                id="va-mic-btn"
              >
                {isListening ? <MicOffIcon /> : <MicIcon />}
              </button>
            )}
            <input
              ref={inputRef}
              className="va-text-input"
              placeholder={isListening ? 'Listening…' : 'Or type your message…'}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isBusy || isListening}
              id="va-text-input"
              aria-label="Type a message"
            />
            <button
              className="va-send-btn"
              onClick={handleTextSend}
              disabled={!textInput.trim() || isBusy}
              aria-label="Send message"
              id="va-send-btn"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
