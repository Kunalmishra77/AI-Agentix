// Generate embeddings for knowledge.json -> knowledge.embeddings.json.
// Run once after adding OPENAI_API_KEY to .env (and again whenever content changes):
//   npm run embed
// Without embeddings the server still works via a lexical fallback (lower quality).

import 'dotenv/config'
import OpenAI from 'openai'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const KB = resolve(__dirname, '../src/knowledge.json')
const OUT = resolve(__dirname, '../src/knowledge.embeddings.json')
const MODEL = process.env.EMBED_MODEL || 'text-embedding-3-small'

if (!process.env.OPENAI_API_KEY) {
  console.error('✗ OPENAI_API_KEY missing. Add it to server/.env, then run `npm run embed`.')
  process.exit(1)
}
if (!existsSync(KB)) {
  console.error('✗ knowledge.json not found. Run `npm run build:kb` first.')
  process.exit(1)
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const chunks = JSON.parse(readFileSync(KB, 'utf8'))

const BATCH = 96
const vectors = {}

async function main() {
  console.log(`Embedding ${chunks.length} chunks with ${MODEL}…`)
  for (let i = 0; i < chunks.length; i += BATCH) {
    const slice = chunks.slice(i, i + BATCH)
    const res = await openai.embeddings.create({ model: MODEL, input: slice.map((c) => c.text) })
    res.data.forEach((d, j) => { vectors[slice[j].id] = d.embedding })
    process.stdout.write(`  ${Math.min(i + BATCH, chunks.length)}/${chunks.length}\r`)
  }
  writeFileSync(OUT, JSON.stringify({ model: MODEL, dim: Object.values(vectors)[0]?.length || 0, vectors }))
  console.log(`\n✓ knowledge.embeddings.json — ${Object.keys(vectors).length} vectors`)
}

main().catch((e) => { console.error('\n', e?.message || e); process.exit(1) })
