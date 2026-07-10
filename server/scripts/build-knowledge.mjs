// Build the assistant's knowledge base from the website's own content.
// The frontend data modules (src/data/**) are the single source of truth. We
// esbuild-bundle them (to resolve the extensionless internal imports the way Vite
// does), then walk the exported objects into plain-text chunks tagged with the
// route/section they came from. Output: src/knowledge.json (no API key needed).

import { build } from 'esbuild'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { writeFileSync, mkdirSync } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '../../frontend/src/data')
const BUNDLE = resolve(__dirname, '_kb-bundle.mjs')
const OUT = resolve(__dirname, '../src/knowledge.json')

const ENTRY = `
export * as home from './home.js'
export * as about from './about.js'
export * as solutions from './solutions.js'
export * as industries from './industries.js'
export * as technology from './technology.js'
export * as agents from './agents.js'
export * as aiStudio from './aiStudio.js'
export * as caseStudies from './caseStudies.js'
export * as contact from './contact.js'
export * as legal from './legal.js'
export * as site from './site.js'
export * as solutionPages from './solutionPages/index.js'
export * as industryPages from './industryPages/index.js'
`

// keys whose string values are not human content (routes, styling, ids, …)
const SKIP_KEYS = new Set([
  'to', 'href', 'icon', 'color', 'image', 'heroImage', 'src', 'primary', 'key', 'id',
  'slug', 'delay', 'tone', 'variant', 'align', 'position', 'pos', 'className',
])

const isContentString = (s) =>
  typeof s === 'string' &&
  s.trim().length > 1 &&
  !s.startsWith('/') &&
  !s.startsWith('http') &&
  !s.startsWith('data:') &&
  !s.startsWith('#') &&
  !/^[0-9a-fA-F]{3,8}$/.test(s) &&        // hex colours
  !/^[a-z0-9-]+$/.test(s.trim())           // lone slugs / icon keys (kept text has spaces/caps)

function collectText(value, out = []) {
  if (value == null) return out
  if (typeof value === 'string') {
    if (isContentString(value)) out.push(value.trim())
    return out
  }
  if (typeof value === 'number') return out
  if (Array.isArray(value)) {
    for (const v of value) collectText(v, out)
    return out
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k)) continue
      if (typeof v === 'string' && !isContentString(v)) continue
      collectText(v, out)
    }
  }
  return out
}

const humanize = (k) =>
  k.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/\s+/g, ' ').trim()
    .replace(/^\w/, (c) => c.toUpperCase())

// split a long text into ~900-char chunks on sentence boundaries
function splitChunks(text, max = 900) {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks = []
  let cur = ''
  for (const s of sentences) {
    if ((cur + ' ' + s).length > max && cur) {
      chunks.push(cur.trim())
      cur = s
    } else {
      cur = cur ? cur + ' ' + s : s
    }
  }
  if (cur.trim()) chunks.push(cur.trim())
  return chunks
}

const all = []
let seq = 0
function addChunks(value, { route, title, source }) {
  const text = [...new Set(collectText(value))].join(' — ')
  if (!text || text.length < 20) return
  for (const chunk of splitChunks(text)) {
    all.push({ id: `c${seq++}`, route, title, source, text: chunk })
  }
}

// derive a human title from a value object
const titleOf = (v, fallback) =>
  (v && typeof v === 'object' && (v.heading || v.title || v.name || v.label || v.metaTitle)) || fallback

async function main() {
  mkdirSync(resolve(__dirname, '../src'), { recursive: true })
  await build({
    stdin: { contents: ENTRY, resolveDir: DATA_DIR, loader: 'js', sourcefile: 'kb-entry.js' },
    bundle: true, format: 'esm', platform: 'node', outfile: BUNDLE, logLevel: 'silent',
  })
  const mod = await import(pathToFileURL(BUNDLE).href + `?t=${Date.now()}`)

  const SIMPLE = {
    home: '/', about: '/about', solutions: '/solutions', industries: '/industries',
    technology: '/technology', aiStudio: '/ai-studio', caseStudies: '/case-studies', contact: '/contact',
  }
  for (const [ns, route] of Object.entries(SIMPLE)) {
    const mns = mod[ns]
    if (!mns) continue
    for (const [name, value] of Object.entries(mns)) {
      addChunks(value, { route, title: titleOf(value, humanize(name)), source: `${ns}.${name}` })
    }
  }

  // global nav / footer / company info
  if (mod.site) {
    for (const [name, value] of Object.entries(mod.site)) {
      addChunks(value, { route: '/contact', title: `Company · ${humanize(name)}`, source: `site.${name}` })
    }
  }

  // legal pages
  if (mod.legal) {
    const legalRoutes = { privacy: '/privacy', terms: '/terms', refund: '/refund' }
    for (const [name, value] of Object.entries(mod.legal)) {
      addChunks(value, { route: legalRoutes[name] || '/privacy', title: titleOf(value, humanize(name)), source: `legal.${name}` })
    }
  }

  // agent detail pages (/technology/:slug)
  if (mod.agents?.agentIndex && mod.agents?.getAgentPage) {
    for (const a of mod.agents.agentIndex) {
      const page = mod.agents.getAgentPage(a.slug)
      addChunks(page, { route: `/technology/${a.slug}`, title: `${a.name} (Agent)`, source: `agent.${a.slug}` })
    }
  }

  // solution detail pages (/solutions/:slug)
  if (mod.solutionPages?.SOLUTION_PAGES) {
    for (const [slug, page] of Object.entries(mod.solutionPages.SOLUTION_PAGES)) {
      addChunks(page, { route: `/solutions/${slug}`, title: titleOf(page?.hero, `Solution: ${slug}`), source: `solution.${slug}` })
    }
  }

  // industry detail pages (/industries/:slug)
  if (mod.industryPages?.INDUSTRY_PAGES) {
    for (const [slug, page] of Object.entries(mod.industryPages.INDUSTRY_PAGES)) {
      addChunks(page, { route: `/industries/${slug}`, title: titleOf(page?.hero, `Industry: ${slug}`), source: `industry.${slug}` })
    }
  }

  writeFileSync(OUT, JSON.stringify(all, null, 2))
  const routes = new Set(all.map((c) => c.route))
  console.log(`✓ knowledge.json — ${all.length} chunks across ${routes.size} routes`)
}

main().catch((e) => { console.error(e); process.exit(1) })
