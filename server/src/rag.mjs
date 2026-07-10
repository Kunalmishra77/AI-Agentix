// Retrieval over the site knowledge base.
// Uses vector (cosine) search when embeddings are present; otherwise falls back to
// a lexical keyword score so the pipeline still works before `npm run embed`.

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const KB_PATH = resolve(__dirname, 'knowledge.json')
const EMB_PATH = resolve(__dirname, 'knowledge.embeddings.json')

let chunks = []
let embeddings = null // array aligned to chunks (or null)

export function loadKnowledge() {
  chunks = existsSync(KB_PATH) ? JSON.parse(readFileSync(KB_PATH, 'utf8')) : []
  if (existsSync(EMB_PATH)) {
    const raw = JSON.parse(readFileSync(EMB_PATH, 'utf8'))
    // { model, vectors: { [chunkId]: number[] } }
    embeddings = raw.vectors || raw
  } else {
    embeddings = null
  }
  return { count: chunks.length, hasEmbeddings: !!embeddings }
}

const STOP = new Set('the a an and or of to for in on with your you our we is are be do how what where can i me my this that get show take'.split(' '))
const tokenize = (s) => (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w))

export function cosine(a, b) {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i] }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1)
}

function lexicalScore(queryTokens, text) {
  const t = text.toLowerCase()
  let score = 0
  for (const q of queryTokens) {
    const matches = t.split(q).length - 1
    if (matches) score += 1 + Math.min(matches, 3) * 0.25
  }
  return score / (queryTokens.length || 1)
}

/**
 * retrieve(query, { queryEmbedding, k })
 * If queryEmbedding + stored embeddings exist → cosine ranking; else lexical.
 * Returns [{ ...chunk, score }] sorted desc.
 */
export function retrieve(query, { queryEmbedding = null, k = 6 } = {}) {
  if (!chunks.length) return []

  let scored
  if (queryEmbedding && embeddings) {
    scored = chunks.map((c) => {
      const v = embeddings[c.id]
      return { ...c, score: v ? cosine(queryEmbedding, v) : 0 }
    })
  } else {
    const qt = tokenize(query)
    scored = chunks.map((c) => ({ ...c, score: lexicalScore(qt, c.text + ' ' + (c.title || '')) }))
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, k)
}

export const getStats = () => ({ chunks: chunks.length, hasEmbeddings: !!embeddings })
export const allChunks = () => chunks
