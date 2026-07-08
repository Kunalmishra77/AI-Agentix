# Changelog · route: /changelog · source: frontend/src/pages/site/ChangelogPage.jsx

## Meta
- Title: Changelog / Agentix

## Section: Hero
- Heading: Every release. Every change. No surprises.
- Body: Platform updates, tool improvements, workflow engine changes, security patches, and API changelog — all in one place.
- Version badge: Current: v2.4.1 — Released May 2, 2026

## Section: Filter categories
- Categories: All, Platform, Tools, Workflows, Assistant, Integrations, Security, API

## Section: Release change-type legend
- New, Improved, Fixed, Security, Deprecation

## Releases (changelog entries, from data)

### v2.4.1 — May 2, 2026 — Tools — Patch
Title: Video Script Writer and Social Calendar tool improvements
- Fix: Video Script Writer: resolved issue where multi-scene outputs were being truncated at 2,000 words.
- Improve: Social Calendar: improved recurrence rule handling for weekly and bi-weekly publishing schedules.
- Fix: Campaign Planner: fixed a display bug affecting subcategory tool counts in the theatre view.

### v2.4.0 — April 28, 2026 — Platform — Minor (Feature)
Title: Workflow trigger system and audit log export
- New: Trigger rules can now fire on CRM field changes, new Airtable rows, and Slack message keywords — in addition to the existing schedule and webhook triggers.
- New: Audit log is now exportable as CSV or JSON from the admin dashboard. Covers the last 90 days per export batch.
- Improve: Workflow builder: added a visual step-dependency view that shows what blocks what in multi-step sequences.
- Fix: Human handoff: resolved edge case where escalation reminders sent duplicate notifications on workflows with multiple reviewers.

### v2.3.2 — April 14, 2026 — Security — Patch
Title: Security hardening and GDPR data subject rights improvements
- Security: Session token rotation interval reduced from 7 days to 24 hours across all plans.
- New: Data subject rights portal: account holders can now submit data export and deletion requests directly from account settings.
- Improve: GDPR consent records are now stored with full timestamp and IP metadata for audit purposes.

### v2.3.0 — April 7, 2026 — Assistant — Minor (Feature)
Title: Assistant routing improvements and knowledge base RAG upgrade
- New: Multi-intent detection: the assistant can now identify and split goals with multiple sub-intents into parallel workflow paths.
- Improve: RAG knowledge base: retrieval accuracy improved by 22% on structured documents (SOPs, style guides, policy docs) via reranking upgrade.
- New: Assistant dock now supports keyboard shortcut (Cmd/Ctrl + K) to open from any page.
- Fix: Fixed assistant state persistence issue that caused the dock to reset after navigating between category pages.

### v2.2.1 — March 30, 2026 — Integrations — Patch
Title: Salesforce and HubSpot integration stability fix
- Fix: Salesforce: resolved OAuth token refresh failure for accounts using custom domains.
- Fix: HubSpot: fixed contact property sync delay that occurred after workflow step 4+ in long sequences.
- Improve: Integration health monitor now surfaces connection errors in the dashboard with a one-click reconnect prompt.

### v2.2.0 — March 14, 2026 — Workflows — Minor (Feature)
Title: Workflow templates library and branching conditions
- New: 18 new workflow templates added to the Solutions library — covering content production, sales pipeline, CX response, and operations reporting.
- New: Conditional branching: workflows can now route to different tool paths based on output content, score, or flag.
- Improve: Workflow copy/duplicate now includes all trigger rules and handoff configurations — not just the tool sequence.

### v2.1.0 — February 28, 2026 — API — Minor (Feature)
Title: Workflow API v2 and webhook retry logic
- New: Workflow API v2 released with improved pagination, filtering, and run-status endpoints. V1 remains available until Q3 2026.
- New: Webhook delivery now includes automatic retry with exponential backoff — up to 3 retries over 12 hours.
- Deprecation: Workflow API v1 endpoints /runs/list and /runs/detail are deprecated. Migration guide in Docs → API & Webhooks.

## Section: Deprecation notices
- Eyebrow: Deprecation notices
- Heading: What's being retired and when.
- Workflow API v1 — /runs/list, /runs/detail — End of life: Q3 2026 (Sep 30) — Replacement: Workflow API v2 → /docs/api-webhooks
- Legacy integration format (pre-2.0 webhook schema) — End of life: Q4 2026 (Dec 31) — Replacement: Unified webhook v2 format → /integrations

## Section: Coming soon (Roadmap)
- Eyebrow: Coming soon
- Heading: What's shipping next.
- Q2 2026 — Multi-model tool selection — Choose the underlying model per tool — GPT-4o, Claude 3.5, Gemini 1.5 — from within the workflow builder. Status: In development
- Q3 2026 — SOC 2 Type II certification — Independent audit completion and public report publication. Status: In progress
- Q3 2026 — Workflow collaboration — Multiple team members can co-own, review, and iterate on workflows with comments and version history. Status: Planned
- Q4 2026 — Custom tool builder — Define custom tools with your own prompt templates, input schemas, and output structures — no code required. Status: Planned

## Section: API changelog
- Eyebrow: API changelog
- Heading: Building on the Agentix API?
- Body: The full API changelog is maintained in the developer documentation — including schema diffs, version migration guides, and breaking change notices.

### API versions
- v2 (current) — Stable — Full support — all new endpoints here
- v1 (legacy) — Deprecated — End of life Q3 2026 — migrate now

## CTAs
- API docs → /docs/api-webhooks
- Integrations → /integrations

## Section: Subscribe
- Eyebrow: Stay updated
- Heading: Get the changelog by email.
- Body: Receive a digest of all platform changes once per release cycle. No marketing — just what shipped.

## Forms
- Email (placeholder: your@email.com) — submit: Subscribe to changelog

## Final CTA (shared component, appears on this page)
- Eyebrow: 13 / Start here
- Heading: Start with one workflow.
- Subheading: Scale into an AI operating system.
- CTAs: Talk to Agentix → /talk-to-agentix; Book a Demo → /demo
- Badges: 14-day pilot, No credit card, Cancel anytime
