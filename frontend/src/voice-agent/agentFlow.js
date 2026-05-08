// ─── AGENTiX Voice Experience — State Machine + Helpers ─────────────────────

export const PHASES = {
  GATE:            'gate',           // waiting for first click
  GREETING:        'greeting',       // agent speaks welcome
  AWAITING_NAME:   'awaiting_name',  // mic on, listening for name
  ASKING_CHOICE:   'asking_choice',  // agent speaks guide-or-browse
  AWAITING_CHOICE: 'awaiting_choice',// mic on, listening for choice
  GUIDED:          'guided',         // LLM drives, site navigates
  AWAITING_REPLY:  'awaiting_reply', // mic on in guided mode
  BROWSING:        'browsing',       // user browses, orb minimized
  COLLECTING:      'collecting',     // lead form visible
  BOOKING:         'booking',        // calendar API call in progress
  DONE:            'done',           // booking confirmed
};

export const ORB_STATES = {
  IDLE:       'idle',
  SPEAKING:   'speaking',
  LISTENING:  'listening',
  THINKING:   'thinking',
  MINIMIZED:  'minimized',
};

// ── Greeting messages ────────────────────────────────────────────────────────
export const MSG_WELCOME =
  "Welcome to AGENTiX. I'm your personal AI guide. " +
  "Before we start, may I know your name please?";

export const MSG_CHOICE = (name) =>
  `Great to meet you, ${name}! I can walk you through everything AGENTiX offers, ` +
  `or you can explore on your own and call on me whenever you need. Which would you prefer?`;

export const MSG_GUIDE_START = (name) =>
  `Perfect, ${name}! Let's get started. What kind of business problem are you trying to solve with AI today?`;

export const MSG_BROWSE_START = (name) =>
  `No problem at all, ${name}! I'll stay right here in the corner. Just click the orb anytime you need me.`;

export const MSG_UNCLEAR =
  "I didn't quite catch that. Just say 'guide me' or 'on my own'.";

// ── Extract a clean first name from STT transcript ───────────────────────────
export function extractName(transcript) {
  const clean = transcript
    .replace(/^(my name is|i am|i'm|it's|call me|this is|hi i'm|hello i'm|hey i'm)\s+/i, '')
    .replace(/[^a-zA-Z\s''-]/g, '')
    .trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (!words.length) return transcript.trim() || 'there';
  const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  return words.length >= 2 ? `${cap(words[0])} ${cap(words[1])}` : cap(words[0]);
}

// ── Detect guide vs browse intent ─────────────────────────────────────────────
export function detectGuideIntent(transcript) {
  const t = transcript.toLowerCase();
  const yes = ['guide','yes','please','help','sure','show','walk','take me','go ahead','okay','ok','yeah','yep','do it','let','you decide'];
  const no  = ['own','myself','no','browse','explore','alone','self','independent','skip','not now','free'];
  if (yes.some((w) => t.includes(w))) return true;
  if (no.some((w) => t.includes(w)))  return false;
  return null; // ambiguous
}

// ── Detect booking intent in LLM reply ───────────────────────────────────────
export function shouldShowLeadForm(text) {
  const triggers = [
    'fill in your details', 'just fill in', 'details below',
    'book a demo', 'schedule a call', 'book that demo',
    'capture your details', 'collect a few details',
  ];
  return triggers.some((t) => text.toLowerCase().includes(t));
}

// ── Parse [NAVIGATE:/path] hint from LLM reply ────────────────────────────────
export function parseNavHint(text) {
  const m = text.match(/\[NAVIGATE:([^\]]+)\]/);
  return {
    clean: text.replace(/\[NAVIGATE:[^\]]+\]/, '').trim(),
    route: m ? m[1] : null,
  };
}

// ── Empty lead shape ──────────────────────────────────────────────────────────
export function createEmptyLead() {
  return { name: '', email: '', company: '', solutionNeed: '', preferredDate: '', preferredTime: '' };
}
