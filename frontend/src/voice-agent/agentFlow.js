// ─── AGENTiX Voice Experience — State Machine + Helpers ─────────────────────

export const PHASES = {
  GATE:            'gate',           // waiting for first click
  GREETING:        'greeting',       // agent speaks welcome
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
  "Hey, I'm the Agentix advisor. What's the biggest time sink your team is dealing with right now?";

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
    clean: text.replace(/\[NAVIGATE:[^\]]+\]/g, '').trim(),
    route: m ? m[1] : null,
  };
}

// ── Keyword-based route fallback (used when LLM omits the NAVIGATE tag) ───────
const KEYWORD_ROUTES = [
  [/content|blog|video|creative|copywriting|social media|voiceover|script|write/i, '/category/content'],
  [/sales|outreach|lead generation|prospect|cold email|crm|pipeline|deal|revenue/i, '/category/sales'],
  [/marketing|campaign|seo|ad |ads |funnel|landing page|growth hacking|paid media/i, '/category/marketing'],
  [/customer support|helpdesk|ticket|onboarding|churn|retention|review response/i, '/category/cx'],
  [/research|competitor|market analysis|persona|trend|pricing intelligence|strategy/i, '/category/research'],
  [/operations|workflow automation|approval|process mapping|task routing|document extract/i, '/category/ops'],
  [/knowledge base|internal wiki|erp|client portal|website builder|api integration|data sync/i, '/category/systems'],
  [/product|roadmap|sprint|delivery|requirements|prd|feature spec/i, '/category/product'],
  [/finance|invoice|expense|contract|compliance|accounting|receipt/i, '/category/finance'],
];

export function routeFromKeywords(transcript) {
  for (const [regex, route] of KEYWORD_ROUTES) {
    if (regex.test(transcript)) return route;
  }
  return null;
}

// ── Empty lead shape ──────────────────────────────────────────────────────────
export function createEmptyLead() {
  return { name: '', email: '', company: '', solutionNeed: '', preferredDate: '', preferredTime: '' };
}
