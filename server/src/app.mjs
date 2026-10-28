import express from 'express'
import cors from 'cors'
import multer from 'multer'
import OpenAI from 'openai'
import { loadKnowledge, retrieve, getStats } from './rag.mjs'
import { buildMessages } from './prompt.mjs'
import { ruleBasedReply } from './intents.mjs'
import { leadHandler } from './leads.mjs'

const CHAT_MODEL = process.env.CHAT_MODEL || 'gpt-4o-mini'
const EMBED_MODEL = process.env.EMBED_MODEL || 'text-embedding-3-small'
export const ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map((s) => s.trim()).filter(Boolean)
const IS_PROD = process.env.NODE_ENV === 'production'

const MAX_MESSAGE = 1000
const MAX_HISTORY = 6

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 20_000, maxRetries: 1 })
  : null

// Hard ceiling on paid AI replies per day (IST) across ALL visitors, so traffic can
// never run up the bill. Past the ceiling the assistant answers in free rule-based mode.
const LLM_DAILY_LIMIT = Number(process.env.LLM_DAILY_LIMIT ?? 300)
const llmUsage = { day: '', count: 0 }
let aiPausedUntil = 0
function takeLlmBudget() {
  const day = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10)
  if (llmUsage.day !== day) { llmUsage.day = day; llmUsage.count = 0 }
  if (llmUsage.count >= LLM_DAILY_LIMIT) return false
  llmUsage.count++
  return true
}

// --- tiny in-memory rate limiter for the assistant (per client IP) ---
const WINDOW = 60_000
const MAX = 20
const hits = new Map()
setInterval(() => {
  const now = Date.now()
  for (const [ip, arr] of hits) {
    const kept = arr.filter((t) => now - t < WINDOW)
    if (kept.length) hits.set(ip, kept); else hits.delete(ip)
  }
}, 5 * 60_000).unref()
function rateLimit(req, res, next) {
  const ip = req.ip || 'unknown'
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW)
  if (arr.length >= MAX) return res.status(429).json({ error: 'Too many requests. Please slow down.' })
  arr.push(now)
  hits.set(ip, arr)
  next()
}

// Browsers always send Origin on POST. Reject other sites posting to our API; in
// production also reject requests with no Origin (scripts calling the API directly).
function sameOrigin(req, res, next) {
  const origin = req.get('origin')
  if (origin ? ORIGINS.includes(origin) : !IS_PROD) return next()
  return res.status(403).json({ ok: false, error: 'Forbidden.', message: 'Forbidden.' })
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

// Legal pages describe services in contract language; only use them when the visitor
// is actually asking about policies, data, refunds or terms.
const LEGAL = new Set(['/privacy', '/terms', '/refund'])
const ASKS_LEGAL = /privacy|policy|terms|refund|cancel|data|consent|dpdp|delete|legal|gdpr|शर्त|नीति|रिफंड|डेटा/i
function siteRetrieve(query, message, { queryEmbedding = null } = {}) {
  const all = retrieve(query, { queryEmbedding, k: 14 })
  const keepLegal = ASKS_LEGAL.test(message) || ASKS_LEGAL.test(query)
  return all.filter((r) => keepLegal || !LEGAL.has(r.route)).slice(0, 6)
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return []
  return history
    .slice(-MAX_HISTORY)
    .filter((h) => h && typeof h.content === 'string')
    .map((h) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content.slice(0, MAX_MESSAGE) }))
}

function cleanContext(context) {
  if (!context || typeof context !== 'object') return {}
  return {
    route: typeof context.route === 'string' ? context.route.slice(0, 120) : undefined,
    section: typeof context.section === 'string' ? context.section.slice(0, 80) : undefined,
  }
}

// Rewrite the latest message (any language + short pronoun follow-ups) into a
// concise English search query for retrieval. Falls back to the raw message.
async function toSearchQuery(message, history = []) {
  if (!openai) return message
  try {
    const r = await openai.chat.completions.create({
      model: CHAT_MODEL,
      temperature: 0,
      max_tokens: 32,
      messages: [
        { role: 'system', content: 'Rewrite the user\'s latest message into a short English keyword search query for a company website (translate Hindi/Hinglish to English; resolve pronouns using the prior turns). Output ONLY the query text.' },
        ...history.slice(-2).map((h) => ({ role: h.role, content: h.content.slice(0, 300) })),
        { role: 'user', content: String(message).slice(0, 500) },
      ],
    })
    return (r.choices[0].message.content || message).trim() || message
  } catch {
    return message
  }
}

export function createApp() {
  loadKnowledge()
  const app = express()
  app.disable('x-powered-by')
  // nginx sits in front: trust exactly one proxy hop so req.ip is the real client
  // and a spoofed X-Forwarded-For from the client can't dodge the rate limits.
  app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1))

  app.use((_req, res, next) => {
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'DENY',
      'Cache-Control': 'no-store',
    })
    next()
  })
  app.use('/api', cors({ origin: ORIGINS, methods: ['GET', 'POST'] }))

  app.get('/api/health', (_req, res) => res.json({ ok: true }))

  app.post('/api/chat', sameOrigin, rateLimit, express.json({ limit: '32kb' }), async (req, res) => {
    try {
      const { message } = req.body || {}
      if (!message || typeof message !== 'string' || !message.trim() || message.length > MAX_MESSAGE) {
        return res.status(400).json({ error: 'Invalid message.' })
      }
      const history = cleanHistory(req.body.history)
      const context = cleanContext(req.body.context)

      // Free rule-based mode: no key, AI paused after an auth/quota error, or daily budget used up.
      const useAi = openai && Date.now() >= aiPausedUntil && takeLlmBudget()
      if (!useAi) {
        const retrieved = siteRetrieve(message, message)
        return res.json({ ...ruleBasedReply(message, retrieved), configured: false, sources: retrieved.slice(0, 3).map((r) => r.route) })
      }

      // 1) normalise the query to English keywords so Hindi / Hinglish / pronoun
      //    follow-ups still retrieve the right English content
      const searchText = await toSearchQuery(message, history)

      // 2) retrieve — vector if we have embeddings, else lexical
      let queryEmbedding = null
      if (getStats().hasEmbeddings) {
        try {
          const e = await openai.embeddings.create({ model: EMBED_MODEL, input: searchText })
          queryEmbedding = e.data[0].embedding
        } catch { /* fall back to lexical */ }
      }
      const retrieved = siteRetrieve(searchText, message, { queryEmbedding })

      const fallback = () => res.json({ ...ruleBasedReply(message, retrieved), configured: false, sources: retrieved.slice(0, 3).map((r) => r.route) })

      // 3) grounded generation with structured navigation action
      const messages = buildMessages({ message, history, context, retrieved })
      let completion
      try {
        completion = await openai.chat.completions.create({
          model: CHAT_MODEL,
          messages,
          temperature: 0.2,
          max_tokens: 400,
          response_format: { type: 'json_object' },
        })
      } catch (err) {
        // invalid/expired key, quota, timeout, outage: still answer from the site's own content
        console.error('[chat] LLM unavailable, using site-content fallback:', err?.status || '', err?.code || err?.message || err)
        // bad key / no quota won't fix itself in seconds: stop calling the API for a while
        if ([401, 403, 429].includes(err?.status)) aiPausedUntil = Date.now() + 10 * 60_000
        return fallback()
      }

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

  // Leads: JSON from the site's own forms, multipart from the floating lead widget.
  const upload = multer({ limits: { fields: 30, fieldSize: 4 * 1024, files: 0, parts: 30 } })
  app.post(
    '/api/leads',
    sameOrigin,
    (req, res, next) => {
      if (req.is('application/json')) return express.json({ limit: '20kb', strict: true })(req, res, next)
      if (req.is('multipart/form-data')) return upload.none()(req, res, next)
      return res.status(415).json({ ok: false, message: 'Unsupported request.' })
    },
    leadHandler({ origins: ORIGINS }),
  )

  app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'Not found.' }))

  // Never leak stack traces (malformed JSON, oversized bodies, multer limits, …)
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || (err.name === 'MulterError' ? 400 : 500)
    if (status >= 500) console.error('[api] error', err?.message || err)
    res.status(status).json({ ok: false, error: 'Request could not be processed.', message: 'Request could not be processed. Please try again.' })
  })

  return app
}
