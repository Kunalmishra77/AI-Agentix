import salesAutomation from './sales-automation'
import marketingAutomation from './marketing-automation'
import hrmsHiring from './hrms-hiring'
import operations from './operations'
import supplyChain from './supply-chain'
import financeAccounts from './finance-accounts'
import aiVoiceChat from './ai-voice-chat'
import manufacturing from './manufacturing'
import hospitalManagement from './hospital-management'

// Registry of solution detail pages, keyed by slug. Add a data file + entry
// here to publish another solution page — the generic SolutionDetailPage renders it.
export const SOLUTION_PAGES = {
  'sales-automation': salesAutomation,
  'marketing-automation': marketingAutomation,
  'hrms-hiring': hrmsHiring,
  'operations': operations,
  'supply-chain': supplyChain,
  'finance-accounts': financeAccounts,
  'ai-voice-chat': aiVoiceChat,
  'manufacturing': manufacturing,
  'hospital-management': hospitalManagement,
}

export function getSolutionPage(slug) {
  return SOLUTION_PAGES[slug] || null
}
