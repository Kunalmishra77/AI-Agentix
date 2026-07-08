# Catalog: Workflow Templates & Connections · source: frontend/src/data/workflowConnections.js

Note: WORKFLOW_PATHS (next/prev/sequence tool-ID lists) contains no independent human-readable text — it is pure routing data between tool IDs (already named in tools.md), so it is omitted here per the "no keys/IDs" rule except where noted below.

## Popular Workflow Templates (POPULAR_TEMPLATES)

### Strategy to Social
- Description: "Turn a high-level marketing strategy into campaign-ready social content."
- Steps (tool sequence): Campaign Strategy Builder → AI Content Generator → Social Media Scheduler *(source step 3 key is `social-media-content-workflow-and-scheduler`, which maps to the "Social Media Scheduler" tool)*

### Discovery to Meeting
- Description: "Automate the full sales funnel from lead discovery to booked qualification calls."
- Steps (tool sequence): Lead Discovery → Multichannel Sequence Builder → Meeting Booking Assistant

### Research to Roadmap
- Description: "Synthesize customer interviews into a prioritized product roadmap."
- Steps (tool sequence): Interview Synthesizer → PRD Generator → Roadmap Prioritization *(source step 1 key is `customer-interview-synthesizer`, which maps to the "Interview Synthesizer" tool; step 2 key `product-requirements-generator` maps to "PRD Generator")*

## Ecosystem Connections (ECOSYSTEM_CONNECTIONS)
Cross-domain relationship labels (category → category):
- Content → Marketing: "Campaign Fuel"
- Marketing → Sales: "Pipeline Flow"
- Sales → CX (Customer Experience & Support): "Customer Handoff"
- Research → Product: "Insight to Build"
- Ops → Finance: "Execution to Record"

## getRelatedWorkflow function
This is a code helper (falls back to empty next/prev/sequence arrays); it contains no additional human-readable text beyond WORKFLOW_PATHS already noted above.

---
Entry count: 3 popular workflow templates (name + description each), 5 ecosystem connection labels.
