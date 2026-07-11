// AI Voice & Chat Agents detail page — content verbatim from
// content-archive/pages/solutions/ai-voice-chat.md
// (Archive has no process section; signature is a live-chat demo, not a calculator.)

export default {
  slug: 'ai-voice-chat',
  heroImage: '/images/voice-chat.webp',
  meta: {
    title: 'AI Voice & Chat Agents | AI Agentix',
    description: 'Human-like voice and chat agents that qualify leads, resolve support queries, and book meetings 24/7 — across WhatsApp, phone, website, and social channels.',
  },
  hero: {
    eyebrow: 'AI Voice & Chat',
    heading: 'Your AI Sales & Support Agent. Always On.',
    body: 'Human-like voice and chat agents that qualify leads, resolve support queries, and book meetings 24/7 — across WhatsApp, phone, website, and social channels.',
    ctas: [
      { label: 'Deploy AI Agent', to: '/contact', primary: true },
      { label: 'Visit AI Studio', to: '/ai-studio', primary: false },
    ],
  },
  stats: [
    { value: '80%', label: 'Support Queries Resolved', sub: 'without human agent' },
    { value: '24/7', label: 'Availability', sub: '365 days a year' },
    { value: '68%', label: 'Lead Qualification Rate', sub: 'from inbound conversations' },
    { value: '3x', label: 'Faster Lead Response', sub: 'vs. human team average' },
  ],
  capabilities: {
    eyebrow: 'AI Capabilities',
    heading: 'Intelligence that sounds human',
    items: [
      { name: 'Natural Language Understanding', image: '/images/business-intelligence.webp', icon: 'bot',
        desc: 'Understands intent, context, and sentiment — not just keywords. Handles complex queries, follow-up questions, and multi-turn conversations naturally.',
        points: ['Intent classification', 'Contextual memory (30+ turns)', 'Sentiment detection', 'Ambiguity resolution'] },
      { name: 'Multi-Language Support', image: '/images/chat-support.webp', icon: 'language',
        desc: 'Deploy in English, Hindi, and 12+ Indian languages. The same AI agent switches language based on customer preference automatically.',
        points: ['Hindi, Tamil, Telugu, Marathi', 'Code-switching support', 'Regional dialect handling', 'Language auto-detection'] },
      { name: 'Lead Qualification Engine', image: '/images/lead-scoring.webp', icon: 'target',
        desc: 'Every conversation scored and classified. Hot leads instantly routed to sales reps with full conversation transcript and qualification notes.',
        points: ['BANT qualification built-in', 'Intent scoring per message', 'Instant rep handoff', 'Full conversation context'] },
      { name: 'Human Escalation', image: '/images/business-intelligence.webp', icon: 'escalate',
        desc: 'Seamless handoff to human agents when AI detects complex queries, high-value prospects, or emotional escalation. Nothing falls through the cracks.',
        points: ['Smart escalation triggers', 'Full context transfer', 'Agent notification & briefing', 'Post-handoff follow-up'] },
      { name: 'CRM Integration', image: '/images/crm-sync.webp', icon: 'enrich',
        desc: 'Every conversation logged, every lead captured, every follow-up scheduled — automatically in your CRM. Zero manual data entry for your sales team.',
        points: ['Auto lead creation', 'Conversation transcript log', 'Follow-up task scheduling', 'Deal stage updates'] },
      { name: 'Analytics & Optimization', image: '/images/analytics-bi.webp', icon: 'analytics',
        desc: 'Conversation analytics showing resolution rate, escalation reasons, response quality, and conversion rates. AI improves with every interaction.',
        points: ['Resolution rate tracking', 'Conversation quality scores', 'A/B test bot scripts', 'Conversion funnel analytics'] },
    ],
  },
  signature: {
    type: 'chat',
    eyebrow: 'See It In Action',
    heading: 'Watch the AI qualify a lead — live',
    body: 'A real conversation flow: the agent qualifies, handles the objection, and books the meeting — autonomously.',
    note: 'Illustrative conversation. Your AI agent is trained on your product, tone, and qualification rules.',
    agentName: 'AI Agent',
    status: 'Live Conversation',
    messages: [
      { from: 'user', text: "Hi, I'm looking for a sales automation solution for my team of 15 reps" },
      { from: 'ai', text: 'Great! We work with teams your size all the time. Quick question — are you currently using a CRM, or looking for one?' },
      { from: 'user', text: "We use HubSpot but it's very manual" },
      { from: 'ai', text: 'Perfect — we integrate directly with HubSpot. Can I schedule a 20-min demo for this week?' },
    ],
    outcomes: ['Lead qualified', 'Meeting link sent', 'HubSpot updated'],
  },
  integrations: {
    eyebrow: 'Channel Coverage',
    heading: 'One AI agent. Every channel.',
    body: 'Deploy the same agent across every channel your customers use — with conversations and leads synced to your CRM.',
    tools: ['WhatsApp', 'Voice / Phone', 'Website Chat', 'Instagram', 'SMS', 'Email', 'Messenger', 'Telegram', 'HubSpot', 'Salesforce', 'Zoho CRM', 'Slack'],
  },
  compare: {
    eyebrow: 'Why AI Agentix',
    heading: 'AI Agents vs. Human-Only Teams',
    cols: ['Capability', 'AI Agentix', 'Traditional Team'],
    rows: [
      { cap: 'Availability', ai: '24/7/365', traditional: 'Business hours only' },
      { cap: 'Response Time', ai: 'Instant, every time', traditional: 'Minutes to hours' },
      { cap: 'Concurrent Conversations', ai: 'Unlimited', traditional: 'One at a time' },
      { cap: 'Languages', ai: 'English, Hindi + 12 more', traditional: 'Limited by staff' },
      { cap: 'Lead Qualification', ai: 'Every lead, scored', traditional: 'Best-effort, inconsistent' },
      { cap: 'Cost to Scale', ai: 'Flat, no new hires', traditional: 'Linear headcount cost' },
    ],
  },
  results: {
    eyebrow: 'Real Results',
    heading: 'AI agents that close and support',
    items: [
      { tag: 'EdTech Platform — 50K users', stat: '80% support tickets resolved by AI', text: 'Course queries, fee questions, and technical support handled by AI bot — human team focuses on complex issues only.', meta: 'Result in 45 days' },
      { tag: 'Real Estate Agency', stat: '4.2x more leads qualified per day', text: 'AI voice agent called every inbound inquiry within 60 seconds, qualifying and booking site visits automatically.', meta: 'Result in 30 days' },
      { tag: 'Healthcare Network', stat: '₹3.2L/month saved in call center costs', text: 'Appointment booking, reminder calls, and post-visit follow-ups handled by AI voice agent completely.', meta: 'Result in 3 months' },
    ],
  },
  faq: {
    heading: 'AI Voice & Chat — Questions Answered',
    items: [
      { q: 'How human-like is the voice agent?', a: 'Our voice AI uses advanced TTS with natural prosody, pausing, and emotional range. 90% of callers cannot distinguish it from a human agent in blind tests.' },
      { q: "How does it handle questions it doesn't know?", a: 'It says "I\'ll connect you with a specialist" and escalates with full context. It never fabricates answers — only responds within its defined knowledge base.' },
      { q: 'Can it handle high call/message volume?', a: 'Yes. The AI handles unlimited concurrent conversations without performance degradation. Scales instantly during campaigns or peak seasons.' },
      { q: 'How long to deploy?', a: 'WhatsApp chatbot: 5–7 business days. Full voice + chat + CRM integration: 2–3 weeks.' },
      { q: 'What languages does the voice agent support?', a: "English, Hindi, and regional Indian languages. Language is auto-detected from the caller's first words." },
    ],
  },
  cta: {
    heading: 'Deploy Your AI Agent in 7 Days',
    body: 'Start with WhatsApp or voice. Add channels as you grow. Your AI agent is live in days, not months.',
    ctas: [
      { label: 'Deploy AI Agent Now', to: '/contact', primary: true },
      { label: 'Explore AI Studio', to: '/ai-studio', primary: false },
    ],
  },
}
