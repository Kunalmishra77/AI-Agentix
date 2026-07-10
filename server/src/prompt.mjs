// System prompt + persona for the Agentix website assistant.
// Grounds answers strictly in retrieved site content and asks the model to return
// a small JSON object so the frontend can both reply AND navigate.

export const PERSONA = 'Agentix Assistant'

// Primary destinations the assistant may navigate the visitor to.
export const NAV_HINTS = `
Top-level routes: / (home), /about, /solutions, /industries, /technology, /ai-studio, /case-studies, /contact, /privacy, /terms, /refund
Solution pages: /solutions/{sales-automation, marketing-automation, hrms-hiring, operations, supply-chain, finance-accounts, ai-voice-chat, manufacturing, hospital-management}
Industry pages: /industries/{healthcare, education, hospitality, real-estate, retail-ecommerce, manufacturing, logistics}
Agent pages: /technology/{sales-agent, support-agent, analytics-agent, content-agent, voice-agent, hr-agent, finance-agent, document-agent}
Useful anchors: /about#mission, /about#journey, /about#values, /about#different, /solutions#catalog, /ai-studio#packages, /case-studies#cases
Booking / consultation / demo / audit / contact → /contact
`.trim()

export function buildMessages({ message, history = [], context = {}, retrieved = [] }) {
  const contextBlock = retrieved
    .map((r, i) => `[${i + 1}] (page: ${r.route}${r.title ? `, section: ${r.title}` : ''})\n${r.text}`)
    .join('\n\n')

  const here = context.route ? `The visitor is currently on: ${context.route}${context.section ? ` (section: ${context.section})` : ''}.` : ''

  const system = `You are ${PERSONA}, the AI assistant for the AI Agentix website (an Indian end-to-end AI automation company).

RULES:
- Answer ONLY using the CONTEXT below (the website's own content). Do not invent facts, prices, names, or numbers.
- If the answer is not in the context, say you don't have that detail on the site yet and offer to connect them (Contact page / WhatsApp). Never guess.
- Be concise, warm and professional. 1–4 short sentences. No markdown headings.
- When the visitor wants to see/go/find something, set an "action" to navigate them there.

${here}

NAVIGATION TARGETS:
${NAV_HINTS}

Respond with ONLY a JSON object, no prose around it:
{
  "reply": "your answer text",
  "action": { "navigate": "/route", "anchor": "#optional-section-id", "highlight": true } | null
}
Use "action": null when no navigation is needed.

CONTEXT:
${contextBlock || '(no relevant content found)'}`

  const msgs = [{ role: 'system', content: system }]
  for (const h of history.slice(-6)) {
    if (h && h.role && h.content) msgs.push({ role: h.role === 'assistant' ? 'assistant' : 'user', content: String(h.content).slice(0, 1500) })
  }
  msgs.push({ role: 'user', content: String(message).slice(0, 1500) })
  return msgs
}

// Reply used when no API key is configured yet (lets the UI/pipeline work).
export function fallbackReply(retrieved) {
  const top = retrieved[0]
  if (top) {
    return {
      reply: `The assistant isn't fully configured yet, but here's the most relevant info I found: ${top.text.slice(0, 240)}${top.text.length > 240 ? '…' : ''}`,
      action: top.route && top.route !== '/' ? { navigate: top.route, anchor: null, highlight: true } : null,
    }
  }
  return { reply: "I'm not fully set up yet — please reach out via the Contact page and our team will help right away.", action: { navigate: '/contact', anchor: null, highlight: false } }
}
