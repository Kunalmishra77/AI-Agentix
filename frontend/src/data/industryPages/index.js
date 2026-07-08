import healthcare from './healthcare'

// Registry of industry detail pages, keyed by slug. Add a data file + entry
// here to publish another industry page.
export const INDUSTRY_PAGES = {
  healthcare,
}

export function getIndustryPage(slug) {
  return INDUSTRY_PAGES[slug] || null
}
