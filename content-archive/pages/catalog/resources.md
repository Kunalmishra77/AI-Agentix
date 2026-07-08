# Catalog: Resources (Integrations, Docs, Help) · source: agentixData.js, toolWorkspaces.js, workflowConnections.js, lottieMappings.js

## Finding
None of the four assigned source files (frontend/src/data/agentixData.js, frontend/src/data/toolWorkspaces.js, frontend/src/data/workflowConnections.js, frontend/src/data/lottieMappings.js) contain an integrations directory, documentation/help-center entries, or any dedicated "resources" data collection.

The closest related human-readable content is:
- The "Business Systems & Knowledge" category's "Integration & Data" subcategory (Integration Layer, API & Webhook Workflows, Data Sync Monitor) in agentixData.js — this describes integration-type *tools*, not a resources/integrations directory of third-party apps. Already fully captured in categories.md and tools.md.
- Per-tool "Required inputs" and "Workflow outcome" text in toolWorkspaces.js functions as informal tool documentation, but is tool-workspace copy, not a docs/help-center page. Already fully captured in tools.md.

No integrations catalog (e.g. "Connects with Slack, HubSpot, Salesforce...") and no help-center/FAQ/docs article content exists in these sources.

## Recommendation
If the site has a dedicated Integrations, Docs, or Help Center page, its content must live in a different data file (not among the four assigned here) — search for files such as `integrations.js`, `docs.js`, `helpArticles.js`, or CMS/MDX content directories elsewhere in the repo.

---
Entry count: 0 integrations/docs/help entries found in the assigned sources (explicitly empty per task rules).
