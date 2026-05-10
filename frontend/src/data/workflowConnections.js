/**
 * Intelligent Workflow Connectivity for AI AGENTIX.
 * Defines logical sequences, upstream/downstream relationships,
 * and smart recommendations between the 121 tools.
 */

export const WORKFLOW_PATHS = {
  // Content & Creative
  'ai-content-generator': {
    next: ['brand-compliance', 'social-media-scheduler', 'content-repurposing'],
    prev: ['campaign-strategy-builder', 'content-brief-tool'],
    sequence: ['campaign-strategy-builder', 'ai-content-generator', 'brand-compliance', 'social-media-scheduler']
  },
  'ai-video-generator': {
    next: ['video-clipper-and-repurposing-tool', 'subtitle-caption-and-localization-studio'],
    prev: ['script-and-storyboard-writer'],
    sequence: ['script-and-storyboard-writer', 'ai-video-generator', 'video-clipper-and-repurposing-tool', 'subtitle-caption-and-localization-studio']
  },
  'ai-product-photography-and-scene-builder': {
    next: ['image-enhancement-and-cleanup-studio', 'brand-asset-generator'],
    prev: ['product-and-sales-copy-builder'],
  },

  // Sales & Revenue
  'lead-discovery-and-list-builder': {
    next: ['lead-enrichment-and-scoring-tool', 'multichannel-outreach-sequence-builder'],
    prev: ['audience-persona-builder', 'campaign-strategy-builder'],
    sequence: ['lead-discovery-and-list-builder', 'lead-enrichment-and-scoring-tool', 'multichannel-outreach-sequence-builder', 'ai-sales-chat-agent']
  },
  'ai-sales-chat-agent': {
    next: ['meeting-booking-and-qualification-assistant', 'crm-sync-and-data-hygiene-tool'],
    prev: ['lead-discovery-and-list-builder', 'multichannel-outreach-sequence-builder'],
  },
  'proposal-and-quote-generator': {
    next: ['contract-review-and-risk-summary-tool', 'crm-sync-and-data-hygiene-tool'],
    prev: ['deal-assistant'],
  },

  // Marketing & Growth
  'campaign-strategy-builder': {
    next: ['go-to-market-launch-planner', 'marketing-calendar-and-execution-planner', 'ai-content-generator'],
    prev: ['competitor-analyzer', 'audience-persona-builder'],
    sequence: ['campaign-strategy-builder', 'go-to-market-launch-planner', 'marketing-calendar-and-execution-planner', 'ad-creative-and-copy-generator']
  },
  'landing-page-optimizer': {
    next: ['form-and-lead-capture-optimizer', 'growth-analytics-assistant'],
    prev: ['campaign-strategy-builder', 'ad-creative-and-copy-generator'],
  },
  'seo-strategy-and-topic-cluster-builder': {
    next: ['content-brief-and-optimization-tool', 'blog-and-seo-article-writer'],
    prev: ['competitive-seo-intelligence-tool'],
  },

  // Product & Delivery
  'product-requirements-generator': {
    next: ['feature-validation-planner', 'roadmap-prioritization-assistant'],
    prev: ['customer-interview-synthesizer', 'market-gap-finder'],
    sequence: ['product-requirements-generator', 'feature-validation-planner', 'project-plan-and-task-breakdown-tool', 'sprint-planning-assistant']
  },
  'project-plan-and-task-breakdown-tool': {
    next: ['sprint-planning-assistant', 'project-risk-and-status-reporter'],
    prev: ['product-requirements-generator', 'scope-and-change-request-assistant'],
  },

  // Customer Experience
  'ai-support-chat-agent': {
    next: ['ticket-triage-and-routing-tool', 'support-response-assistant'],
    prev: ['internal-knowledge-assistant', 'knowledge-base-builder'],
  },
  'onboarding-journey-builder': {
    next: ['customer-training-content-generator', 'product-walkthrough-assistant'],
    prev: ['client-onboarding-workflow', 'deal-assistant'],
  },

  // Operations
  'workflow-orchestrator': {
    next: ['approval-engine', 'task-routing-and-assignment-tool', 'operations-dashboard-generator'],
    prev: ['automation-blueprint-builder', 'process-mapping-assistant'],
  },
  'document-intake-and-extraction-tool': {
    next: ['data-cleanup-and-standardization-tool', 'invoice-processing-and-reconciliation-tool'],
    prev: ['form-to-workflow-builder'],
  },

  // Research
  'competitor-analyzer': {
    next: ['competitive-battlecard-builder', 'market-movement-monitor'],
    prev: ['market-gap-finder'],
  },
  'audience-persona-builder': {
    next: ['campaign-strategy-builder', 'multichannel-outreach-sequence-builder'],
    prev: ['customer-interview-synthesizer', 'review-and-community-insight-miner'],
  },
};

/**
 * Pre-defined high-impact workflow templates
 */
export const POPULAR_TEMPLATES = [
  {
    id: 'campaign-to-content',
    name: 'Strategy to Social',
    description: 'Turn a high-level marketing strategy into campaign-ready social content.',
    steps: ['campaign-strategy-builder', 'ai-content-generator', 'social-media-content-workflow-and-scheduler'],
    accent: '#5B9BFF'
  },
  {
    id: 'lead-to-booking',
    name: 'Discovery to Meeting',
    description: 'Automate the full sales funnel from lead discovery to booked qualification calls.',
    steps: ['lead-discovery-and-list-builder', 'multichannel-outreach-sequence-builder', 'meeting-booking-and-qualification-assistant'],
    accent: '#E87520'
  },
  {
    id: 'insight-to-roadmap',
    name: 'Research to Roadmap',
    description: 'Synthesize customer interviews into a prioritized product roadmap.',
    steps: ['customer-interview-synthesizer', 'product-requirements-generator', 'roadmap-prioritization-assistant'],
    accent: '#8B5CF6'
  }
];

/**
 * Intelligent recommendation logic based on tool context.
 */
export const getRelatedWorkflow = (toolId) => {
  return WORKFLOW_PATHS[toolId] || {
    next: [],
    prev: [],
    sequence: []
  };
};

/**
 * Common cross-domain connection patterns.
 */
export const ECOSYSTEM_CONNECTIONS = [
  { from: 'content', to: 'marketing', label: 'Campaign Fuel' },
  { from: 'marketing', to: 'sales', label: 'Pipeline Flow' },
  { from: 'sales', to: 'cx', label: 'Customer Handoff' },
  { from: 'research', to: 'product', label: 'Insight to Build' },
  { from: 'ops', to: 'finance', label: 'Execution to Record' },
];
