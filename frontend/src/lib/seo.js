// Site identity + the list of indexable routes. Used at runtime by <Seo> and at
// build time by scripts/prerender-meta.mjs (per-route HTML + sitemap.xml).
import { meta as homeMeta } from '../data/home'
import { meta as aboutMeta } from '../data/about'
import { meta as solutionsMeta } from '../data/solutions'
import { meta as industriesMeta } from '../data/industries'
import { meta as technologyMeta } from '../data/technology'
import { meta as caseStudiesMeta } from '../data/caseStudies'
import { meta as aiStudioMeta } from '../data/aiStudio'
import { meta as contactMeta } from '../data/contact'
import { privacy, terms, refund } from '../data/legal'
import { SOLUTION_PAGES } from '../data/solutionPages'
import { INDUSTRY_PAGES } from '../data/industryPages'
import { agentIndex, getAgentPage } from '../data/agents'
import { contactInfo, footer } from '../data/site'

export const SITE_URL = 'https://ai-agentix.com'
export const SITE_NAME = 'AI Agentix'
export const DEFAULT_OG_IMAGE = '/og-default.jpg'

export const canonicalUrl = (path) => SITE_URL + (path === '/' ? '/' : path.replace(/\/+$/, ''))

export function indexableRoutes() {
  const page = (path, m, priority = '0.7') => ({ path, title: m.title, description: m.description, priority })
  return [
    page('/', homeMeta, '1.0'),
    page('/about', aboutMeta, '0.8'),
    page('/solutions', solutionsMeta, '0.9'),
    ...Object.entries(SOLUTION_PAGES).map(([slug, d]) => page(`/solutions/${slug}`, d.meta, '0.8')),
    page('/industries', industriesMeta, '0.9'),
    ...Object.entries(INDUSTRY_PAGES).map(([slug, d]) => page(`/industries/${slug}`, d.meta, '0.8')),
    page('/technology', technologyMeta, '0.8'),
    ...agentIndex.map((a) => page(`/technology/${a.slug}`, getAgentPage(a.slug).meta, '0.6')),
    page('/case-studies', caseStudiesMeta, '0.8'),
    page('/ai-studio', aiStudioMeta, '0.7'),
    page('/contact', contactMeta, '0.9'),
    page('/privacy', privacy.meta, '0.3'),
    page('/terms', terms.meta, '0.3'),
    page('/refund', refund.meta, '0.3'),
  ]
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    legalName: 'Santure AI Private Limited',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-512.png`,
    email: contactInfo.email,
    telephone: contactInfo.phone.replace(/\s/g, ''),
    address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
    sameAs: footer.socials.filter((s) => s.label !== 'WhatsApp').map((s) => s.href),
  }
}
