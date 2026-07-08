import salesAutomation from './sales-automation'
import marketingAutomation from './marketing-automation'

// Registry of solution detail pages, keyed by slug. Add a data file + entry
// here to publish another solution page — the generic SolutionDetailPage renders it.
export const SOLUTION_PAGES = {
  'sales-automation': salesAutomation,
  'marketing-automation': marketingAutomation,
}

export function getSolutionPage(slug) {
  return SOLUTION_PAGES[slug] || null
}
