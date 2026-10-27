// Post-build step (npm run build): writes one HTML file per route with that route's
// title, description, canonical, Open Graph / Twitter tags (and Organization JSON-LD
// on the home page), plus dist/404.html and dist/sitemap.xml (AGX-004/005).
// Crawlers and link previews (WhatsApp, LinkedIn, Slack) get the right metadata
// without running JavaScript; the app itself stays a normal SPA.
// Tags carry data-rh="true" so react-helmet-async replaces them at runtime.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

const vite = await createServer({ root, logLevel: 'error', server: { middlewareMode: true, hmr: false }, appType: 'custom' })
let seo
try {
  seo = await vite.ssrLoadModule('/src/lib/seo.js')
} finally {
  await vite.close()
}
const { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, canonicalUrl, indexableRoutes, organizationJsonLd } = seo

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<title>')) throw new Error('dist/index.html has no <title>')

function render({ path: route, title, description, noindex = false, org = false }) {
  const url = canonicalUrl(route)
  const img = SITE_URL + DEFAULT_OG_IMAGE
  const tags = [
    `<meta data-rh="true" name="description" content="${esc(description)}" />`,
    noindex ? '<meta data-rh="true" name="robots" content="noindex" />' : `<link data-rh="true" rel="canonical" href="${esc(url)}" />`,
    `<meta data-rh="true" property="og:site_name" content="${esc(SITE_NAME)}" />`,
    '<meta data-rh="true" property="og:type" content="website" />',
    `<meta data-rh="true" property="og:title" content="${esc(title)}" />`,
    `<meta data-rh="true" property="og:description" content="${esc(description)}" />`,
    `<meta data-rh="true" property="og:url" content="${esc(url)}" />`,
    `<meta data-rh="true" property="og:image" content="${esc(img)}" />`,
    '<meta data-rh="true" property="og:image:width" content="1200" />',
    '<meta data-rh="true" property="og:image:height" content="630" />',
    '<meta data-rh="true" name="twitter:card" content="summary_large_image" />',
    `<meta data-rh="true" name="twitter:title" content="${esc(title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${esc(description)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${esc(img)}" />`,
    org ? `<script data-rh="true" type="application/ld+json">${JSON.stringify(organizationJsonLd()).replace(/</g, '\\u003c')}</script>` : '',
  ].filter(Boolean).join('\n    ')

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/\s*<meta data-rh="true" name="description"[^>]*>/, '')
  html = html.replace('</title>', `</title>\n    ${tags}`)
  return html
}

const routes = indexableRoutes()
for (const r of routes) {
  const file = r.path === '/' ? path.join(dist, 'index.html') : path.join(dist, r.path.slice(1), 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, render({ ...r, org: r.path === '/' }))
}

// Served by nginx for unknown URLs with a real 404 status; the SPA renders its 404 page.
fs.writeFileSync(path.join(dist, '404.html'), render({
  path: '/404', title: 'Page Not Found — AI Agentix', description: 'This page does not exist.', noindex: true,
}))
// /thank-you is reached only after a form submit: noindex, no canonical.
fs.mkdirSync(path.join(dist, 'thank-you'), { recursive: true })
fs.writeFileSync(path.join(dist, 'thank-you', 'index.html'), render({
  path: '/thank-you', title: 'Thank You — AI Agentix', description: 'Thank you for contacting AI Agentix.', noindex: true,
}))

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + routes.map((r) => `  <url><loc>${esc(canonicalUrl(r.path))}</loc><lastmod>${lastmod}</lastmod><priority>${r.priority}</priority></url>`).join('\n')
  + '\n</urlset>\n'
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

console.log(`[prerender-meta] ${routes.length} routes + 404 + thank-you · sitemap.xml (${SITE_URL})`)
