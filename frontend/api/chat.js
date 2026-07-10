// Vercel serverless function — the website AI assistant (RAG over the site's own
// content). Same behaviour as the standalone server/ (used on the VPS), packaged
// as a single Vercel function so the assistant works on the Vercel deployment too.
// The OpenAI key is read from the OPENAI_API_KEY env var (Vercel project settings).

import { createRequire } from 'node:module'
import OpenAI from 'openai'

const require = createRequire(import.meta.url)
const chunks = require('./_data/knowledge.json')
let vectors = null
try { vectors = require('./_data/knowledge.embeddings.json').vectors || null } catch { vectors = null }

const CHAT_MODEL = process.env.CHAT_MODEL || 'gpt-4o-mini'
const EMBED_MODEL = process.env.EMBED_MODEL || 'text-embedding-3-small'
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

/* ---------- retrieval ---------- */
const STOP = new Set('the a an and or of to for in on with your you our we is are be do how what where can i me my this that get show take'.split(' '))
const tokenize = (s) => (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w))

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i] }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1)
}
function lexicalScore(qt, text) {
  const t = text.toLowerCase()
  let score = 0
  for (const q of qt) { const m = t.split(q).length - 1; if (m) score += 1 + Math.min(m, 3) * 0.25 }
  return score / (qt.length || 1)
}
function retrieve(query, queryEmbedding, k = 6) {
  if (!chunks.length) return []
  let scored
  if (queryEmbedding && vectors) {
    scored = chunks.map((c) => { const v = vectors[c.id]; return { ...c, score: v ? cosine(queryEmbedding, v) : 0 } })
  } else {
    const qt = tokenize(query)
    scored = chunks.map((c) => ({ ...c, score: lexicalScore(qt, c.text + ' ' + (c.title || '')) }))
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, k)
}

/* ---------- prompt ---------- */
const NAV_HINTS = `
Top-level routes: / (home), /about, /solutions, /industries, /technology, /ai-studio, /case-studies, /contact, /privacy, /terms, /refund
Solution pages: /solutions/{sales-automation, marketing-automation, hrms-hiring, operations, supply-chain, finance-accounts, ai-voice-chat, manufacturing, hospital-management}
Industry pages: /industries/{healthcare, education, hospitality, real-estate, retail-ecommerce, manufacturing, logistics}
Agent pages: /technology/{sales-agent, support-agent, analytics-agent, content-agent, voice-agent, hr-agent, finance-agent, document-agent}
Useful anchors: /about#mission, /about#journey, /about#values, /about#different, /solutions#catalog, /ai-studio#packages, /case-studies#cases
Booking / consultation / demo / audit / contact -> /contact`.trim()

function buildMessages({ message, history = [], context = {}, retrieved = [] }) {
  const contextBlock = retrieved.map((r, i) => `[${i + 1}] (page: ${r.route}${r.title ? `, section: ${r.title}` : ''})\n${r.text}`).join('\n\n')
  const here = context.route ? `The visitor is currently on: ${context.route}${context.section ? ` (section: ${context.section})` : ''}.` : ''
  const system = `You are Agentix Assistant, the AI assistant for the AI Agentix website (an Indian end-to-end AI automation company).

RULES:
- Answer ONLY using the CONTEXT below (the website's own content). Do not invent facts, prices, names, or numbers.
- If the answer is not in the context, say you don't have that detail on the site yet and offer to connect them (Contact page / WhatsApp). Never guess.
- Be concise, warm and professional. 1-4 short sentences. No markdown headings.
- When the visitor wants to see/go/find something, set an "action" to navigate them there.
- LANGUAGE: Reply in the SAME language and script the visitor used.
  - English message -> reply in English.
  - Hindi in Devanagari -> reply in simple, everyday, conversational Hindi (Devanagari) - NOT pure/formal "shuddh" Hindi; keep common English tech words as-is (AI, automation, agent, dashboard).
  - Hinglish / romanized Hindi -> reply in the SAME casual Hinglish (Roman script).
  Match how the user writes so it feels natural and easy to understand. Product/brand names stay in English.

${here}

NAVIGATION TARGETS:
${NAV_HINTS}

Respond with ONLY a JSON object, no prose:
{ "reply": "your answer text", "action": { "navigate": "/route", "anchor": "#optional", "highlight": true } | null }
Use "action": null when no navigation is needed.

CONTEXT:
${contextBlock || '(no relevant content found)'}`
  const msgs = [{ role: 'system', content: system }]
  for (const h of history.slice(-6)) if (h && h.role && h.content) msgs.push({ role: h.role === 'assistant' ? 'assistant' : 'user', content: String(h.content).slice(0, 1500) })
  msgs.push({ role: 'user', content: String(message).slice(0, 1500) })
  return msgs
}

function fallbackReply(retrieved) {
  const top = retrieved[0]
  if (top) return { reply: `Here's the most relevant info I found: ${top.text.slice(0, 240)}${top.text.length > 240 ? '…' : ''}`, action: top.route && top.route !== '/' ? { navigate: top.route, anchor: null, highlight: true } : null }
  return { reply: "I'm not fully set up yet — please reach out via the Contact page and our team will help right away.", action: { navigate: '/contact', anchor: null, highlight: false } }
}

const ALLOWED = ['/', '/about', '/solutions', '/industries', '/technology', '/ai-studio', '/case-studies', '/contact', '/privacy', '/terms', '/refund']
function safeAction(action) {
  if (!action || typeof action !== 'object' || typeof action.navigate !== 'string') return null
  const nav = action.navigate.split('#')[0]
  if (!ALLOWED.some((p) => nav === p || nav.startsWith(p + '/'))) return null
  return { navigate: nav, anchor: typeof action.anchor === 'string' ? action.anchor : null, highlight: action.highlight !== false }
}

async function toSearchQuery(message, history = []) {
  if (!openai) return message
  try {
    const r = await openai.chat.completions.create({
      model: CHAT_MODEL, temperature: 0, max_tokens: 32,
      messages: [
        { role: 'system', content: 'Rewrite the user\'s latest message into a short English keyword search query for a company website (translate Hindi/Hinglish to English; resolve pronouns using the prior turns). Output ONLY the query text.' },
        ...history.slice(-2).map((h) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: String(h.content).slice(0, 300) })),
        { role: 'user', content: String(message).slice(0, 500) },
      ],
    })
    return (r.choices[0].message.content || message).trim() || message
  } catch { return message }
}

/* ---------- handler ---------- */
export default async function handler(req, res) {
  if (req.method === 'GET') { res.status(200).json({ ok: true, chunks: chunks.length, hasEmbeddings: !!vectors, configured: !!openai }); return }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})
    const { message, history = [], context = {} } = body
    if (!message || typeof message !== 'string' || message.length > 1500) { res.status(400).json({ error: 'Invalid message.' }); return }

    const searchText = await toSearchQuery(message, history)
    let queryEmbedding = null
    if (openai && vectors) {
      try { const e = await openai.embeddings.create({ model: EMBED_MODEL, input: searchText }); queryEmbedding = e.data[0].embedding } catch {}
    }
    const retrieved = retrieve(searchText, queryEmbedding, 6)

    if (!openai) { res.status(200).json({ ...fallbackReply(retrieved), configured: false, sources: retrieved.slice(0, 3).map((r) => r.route) }); return }

    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL, temperature: 0.2, max_tokens: 400,
      messages: buildMessages({ message, history, context, retrieved }),
      response_format: { type: 'json_object' },
    })
    let parsed
    try { parsed = JSON.parse(completion.choices[0].message.content) } catch { parsed = { reply: completion.choices[0].message.content, action: null } }
    res.status(200).json({
      reply: (parsed.reply || '').toString().slice(0, 1200) || "Sorry, I couldn't find that on our site.",
      action: safeAction(parsed.action), configured: true,
      sources: retrieved.slice(0, 3).map((r) => r.route),
    })
  } catch (err) {
    res.status(500).json({ error: 'Assistant is temporarily unavailable. Please try again.' })
  }
}
