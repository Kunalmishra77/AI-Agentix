import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'
import { loadKnowledge, retrieve, getStats } from './rag.mjs'
import { buildMessages, fallbackReply } from './prompt.mjs'

const PORT = process.env.PORT || 5000
const CHAT_MODEL = process.env.CHAT_MODEL || 'gpt-4o-mini'
const EMBED_MODEL = process.env.EMBED_MODEL || 'text-embedding-3-small'
const ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map((s) => s.trim())

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

const kb = loadKnowledge()
console.log(`[assistant] knowledge: ${kb.count} chunks · embeddings: ${kb.hasEmbeddings ? 'yes' : 'no (lexical fallback)'} · LLM: ${openai ? CHAT_MODEL : 'not configured'}`)

const app = express()
app.use(cors({ origin: ORIGINS }))
app.use(express.json({ limit: '32kb' }))

// --- tiny in-memory rate limiter (per IP) ---
const WINDOW = 60_000
const MAX = 30
const hits = new Map()
function rateLimit(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW)
  if (arr.length >= MAX) return res.status(429).json({ error: 'Too many requests. Please slow down.' })
  arr.push(now)
  hits.set(ip, arr)
  next()
}

// route allow-list guard for AI-produced navigation
const ALLOWED_PREFIXES = ['/', '/about', '/solutions', '/industries', '/technology', '/ai-studio', '/case-studies', '/contact', '/privacy', '/terms', '/refund']
function safeAction(action) {
  if (!action || typeof action !== 'object' || typeof action.navigate !== 'string') return null
  const nav = action.navigate.split('#')[0]
  const ok = ALLOWED_PREFIXES.some((p) => nav === p || nav.startsWith(p + '/'))
  if (!ok) return null
  return { navigate: nav, anchor: typeof action.anchor === 'string' ? action.anchor : null, highlight: action.highlight !== false }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ...getStats(), configured: !!openai })
})

app.post('/api/chat', rateLimit, async (req, res) => {
  try {
    const { message, history = [], context = {} } = req.body || {}
    if (!message || typeof message !== 'string' || message.length > 1500) {
      return res.status(400).json({ error: 'Invalid message.' })
    }

    // 1) retrieve — vector if we have a key + embeddings, else lexical
    let queryEmbedding = null
    if (openai && getStats().hasEmbeddings) {
      try {
        const e = await openai.embeddings.create({ model: EMBED_MODEL, input: message })
        queryEmbedding = e.data[0].embedding
      } catch { /* fall back to lexical */ }
    }
    const retrieved = retrieve(message, { queryEmbedding, k: 6 })

    // 2) no key → graceful, but retrieval-grounded, reply
    if (!openai) {
      return res.json({ ...fallbackReply(retrieved), configured: false, sources: retrieved.slice(0, 3).map((r) => r.route) })
    }

    // 3) grounded generation with structured navigation action
    const messages = buildMessages({ message, history, context, retrieved })
    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages,
      temperature: 0.2,
      max_tokens: 400,
      response_format: { type: 'json_object' },
    })

    let parsed
    try { parsed = JSON.parse(completion.choices[0].message.content) } catch { parsed = { reply: completion.choices[0].message.content, action: null } }

    res.json({
      reply: (parsed.reply || '').toString().slice(0, 1200) || "Sorry, I couldn't find that on our site.",
      action: safeAction(parsed.action),
      configured: true,
      sources: retrieved.slice(0, 3).map((r) => r.route),
    })
  } catch (err) {
    console.error('[chat] error', err?.message || err)
    res.status(500).json({ error: 'Assistant is temporarily unavailable. Please try again.' })
  }
})

app.listen(PORT, () => console.log(`[assistant] listening on http://localhost:${PORT}`))
