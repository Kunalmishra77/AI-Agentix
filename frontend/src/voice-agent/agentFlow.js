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

// ── Detect when LLM reply signals form should open ───────────────────────────
export function shouldShowLeadForm(text) {
  const triggers = [
    'fill in your details', 'just fill in', 'details below',
    'fill in the form', 'fill out the form', 'book that demo',
    'capture your details', 'collect a few details',
  ];
  return triggers.some((t) => text.toLowerCase().includes(t));
}

// ── Detect user agreeing to book a demo (from their speech) ──────────────────
export function isAgreeingToDemo(transcript) {
  const t = transcript.toLowerCase().trim();
  const positives = [
    /^(yes|yeah|yep|yup|sure|okay|ok|alright|absolutely|definitely|of course)[\s.,!]*$/,
    /\b(yes please|go ahead|let's do it|let's go|book it|schedule it|set it up|sounds good|that works|i'm in|i'm interested)\b/,
    /\b(book|schedule|set up|arrange).*(demo|call|meeting|appointment)\b/,
    /\b(demo|call|meeting).*(book|schedule|yes|please|now|today|sure)\b/,
    /\bhelp me.*(book|schedule|demo)\b/,
    /\bi (want|would like|need|d like).*(demo|call|book|schedule)\b/,
  ];
  return positives.some((r) => r.test(t));
}

// ── Parse [NAVIGATE:/path] and optional [TOOL:slug] hints from LLM reply ─────
export function parseNavHint(text) {
  const navMatch  = text.match(/\[NAVIGATE:([^\]]+)\]/);
  const toolMatch = text.match(/\[TOOL:([^\]]+)\]/);
  return {
    clean:  text.replace(/\[NAVIGATE:[^\]]+\]/g, '').replace(/\[TOOL:[^\]]+\]/g, '').trim(),
    route:  navMatch  ? navMatch[1].trim()  : null,
    toolId: toolMatch ? toolMatch[1].trim() : null,
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

// ── Specific tool hint — scroll-to and highlight on category page ─────────────
// Returns the tool's slug ID (same as slugify(toolName) in App.jsx).
const KEYWORD_TOOL_HINTS = [
  [/blog|seo article|blog post|write.*blog|content.*writ/i,       'blog-and-seo-article-writer'],
  [/ai.*video|make.*video|video.*generat/i,                        'ai-video-generator'],
  [/social media|instagram|twitter|facebook.*post|social.*sched/i, 'social-media-scheduler'],
  [/ad copy|product.*copy|sales.*copy|copywriting/i,               'product-and-sales-copy-builder'],
  [/voiceover|narrat|audio.*content/i,                             'ai-voiceover-studio'],
  [/cold email|outreach.*email|email.*sequence|follow.up.*email/i, 'cold-email-personalization'],
  [/find.*lead|lead.*generat|lead.*discov/i,                       'lead-discovery'],
  [/crm|pipeline.*hygiene|sales.*pipeline.*data/i,                 'crm-sync-and-hygiene'],
  [/customer.*support|helpdesk|support.*chat|ai.*support/i,        'ai-support-chat'],
  [/ticket.*rout|ticket.*triage|triage/i,                          'ticket-triage-and-routing'],
  [/onboard/i,                                                      'onboarding-journey-builder'],
  [/competitor|battlecard/i,                                        'competitor-analyzer'],
  [/market.*research|research.*report/i,                           'research-report-generator'],
  [/automate.*workflow|workflow.*automat|process.*automat/i,       'workflow-orchestrator'],
  [/invoice|billing.*process/i,                                    'invoice-processing'],
  [/contract.*review|legal.*review/i,                              'contract-review'],
  [/knowledge.*base|internal.*wiki|rag.*knowl/i,                   'knowledge-base-builder'],
  [/landing.*page|opt.in.*page|conversion.*page/i,                 'landing-page-optimizer'],
  [/seo.*strateg|keyword.*research|topic.*cluster/i,               'seo-topic-cluster-builder'],
  [/book.*meeting|meeting.*book|schedule.*call|appointment/i,      'meeting-booking-assistant'],
  [/roadmap|feature.*priorit/i,                                    'roadmap-prioritization'],
  [/prospect.*outreach|sales.*sequence|multichannel.*outreach/i,   'multichannel-sequence-builder'],
  [/lead.*enrich|account.*research|lead.*scor/i,                   'lead-enrichment-and-scoring'],
  [/campaign.*strateg/i,                                           'campaign-strategy-builder'],
  [/seo.*article|content.*brief/i,                                 'content-brief-tool'],
  [/churn|customer.*health|retention.*risk/i,                      'churn-risk-assistant'],
];

export function toolHintFromKeywords(transcript) {
  for (const [regex, toolId] of KEYWORD_TOOL_HINTS) {
    if (regex.test(transcript)) return toolId;
  }
  return null;
}

// ── Empty lead shape ──────────────────────────────────────────────────────────
export function createEmptyLead() {
  return { name: '', email: '', company: '', solutionNeed: '', preferredDate: '', preferredTime: '' };
}
