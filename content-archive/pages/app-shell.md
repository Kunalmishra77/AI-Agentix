# App shell — inline platform pages & shared section defaults · source: frontend/src/App.jsx

Covers the components mounted under the `<Layout>` wrapper in App.jsx (GlobalNav/GlobalFooter world), plus shared helper components whose default text props are real content. Catalog-derived lists (category names, tool names, subcategory names, solutions/use-case names, integrations/docs/help topic names) are intentionally NOT reproduced here — another agent owns those from `data/agentixData.js`. Only the static template copy, headings, and default prop strings are captured.

---

# Inline HomePage variant · source: App.jsx `HomePage()`

Note: this is a *different* component from the actual routed `/` marketing HomePage (`pages/marketing/HomePage.jsx`, lazy-loaded as `MktHomePage`). This inline `HomePage()` function exists in App.jsx but is not wired to any route in the current `<Routes>` table — appears to be dead/legacy code. Captured for completeness.

## Meta
- Title: Agentix.ai / The AI Operating System for Modern Business

Body is composed entirely of imported section components (HeroSection, ArcCarousel, FeaturedSpotlight, WorkflowTemplates, CategoryConstellation, WorkflowStrip, ToolTheatre, HowItWorks, Solutions, UseCases, CommandCenter, ValueProof, TrustLayer, VoiceCTA, FAQ, FinalCTA) — those are separate component files outside this task's scope, except `WorkflowTemplates` which is defined inline (below).

---

# WorkflowTemplates (inline section, used on the legacy inline HomePage) · source: App.jsx

## Section: Workflow Orchestration
- Eyebrow: Workflow Orchestration
- Heading: Pre-built high-impact templates.
- Body: Deploy complete end-to-end sequences that bridge multiple domains and tools instantly.

Template cards are populated from `POPULAR_TEMPLATES` (data file — not reproduced here). Each card badge reads "TEMPLATE".

## CTAs
- Deploy template → opens voice agent (per template card, button)

---

# PageHero (shared component, default props) · source: App.jsx

`PageHero({ eyebrow, title, text, accent, children, rightSlot })` — no hardcoded default strings; all text comes from callers. No content of its own beyond structural placement. (Included per instructions since it's named as a target, but it has no default copy — every call site supplies its own eyebrow/title/text, captured under each page below.)

---

# SectionHead (shared component, default props) · source: App.jsx

`SectionHead({ eyebrow, title, text, center })` — no hardcoded default strings; all text supplied by callers per section (captured under each page below).

---

# StepCards (shared component) · source: App.jsx

No default `items` prop (always supplied by caller). However it has a shared description generator (`stepDesc` / `stepDescMap`) used whenever the item text matches a known label:

## stepDescMap (default descriptions keyed by label)
- Inputs required: Data, context, and constraints the AI needs before generation begins.
- Outputs produced: Reviewed, formatted output ready for the next stage or human handoff.
- Constraints: Brand rules, tone guardrails, and approval gates applied throughout.
- Review path: Human or automated check before output moves downstream.
- Owner: The person or role accountable for this stage in the workflow.
- Reviewer: Who approves or rejects output before it progresses.
- Status: Live state of the workflow — running, queued, blocked, or complete.
- Next action: The routed next step after this stage resolves.
- Talk to Agentix: Use the AI assistant to build your stack, define goals, and get recommendations.
- Book Demo: See Agentix run a live workflow mapped to your business context.
- Search: Explore 120+ tools, categories, and workflows across every domain.
- Contact: Route your question to the right human — sales, support, or implementation.
- Tools: Browse the full tool catalogue across 9 categories and 40+ subcategories.
- Categories: Explore every business domain with subcategory and tool depth.
- Solutions: Pre-built stacks mapped to business outcomes — deploy in hours.
- Resources: Docs, help topics, integrations, and workflow guides for builders.
- Find tools: Search 120+ AI tools across every business category.
- Build stack: Get a recommended stack for your business type and goal.
- Read docs: Access builder documentation and workflow guides.
- Book demo: See Agentix run a workflow matched to your context.
- CRM: Sync contacts, pipeline data, and activities between your CRM and Agentix workflows automatically.
- Email: Send, receive, and process email using AI-governed templates and delivery routing rules.
- Calendar: Schedule meetings, tasks, and deadlines directly from workflow and assistant outputs.
- Messaging: Post workflow updates and alerts to Slack, Teams, or Discord when states change.
- Support: Route tickets, draft first responses, and escalate issues through your support platform.
- Docs Storage: Read from and write to Google Drive, SharePoint, or Notion as part of any workflow.
- Spreadsheets: Pull structured data in and push formatted results out — no manual exporting needed.
- CMS: Publish approved content directly from the Agentix review layer to your CMS.
- Analytics: Surface campaign, workflow, and tool performance data inside your analytics stack.
- Payments: Trigger billing, invoicing, and payment workflows from approved Agentix outputs.
- Databases: Query and update records in your database as workflow stages execute and complete.
- APIs Webhooks: Connect any external system with webhooks and REST APIs — full two-way event routing.

## Fallback description rules (when label isn't in the map above)
- If label contains "Generator" or "Builder": "AI-powered {label, lowercase} — from goal to reviewed output in one workflow."
- If label contains "Assistant": "{label} routes your intent and surfaces the right next action automatically."
- If label contains "Dashboard" or "Analytics": "Live visibility into performance, status, and pipeline impact across your stack."
- If label contains "Sync" or "Integration": "Connect {label, lowercase, minus 'sync'} to Agentix so data flows without manual transfer."
- Otherwise: "{label} runs inside Agentix — connected to your stack and routed for review."

---

# WorkflowBand (shared section component, default props) · source: App.jsx

Default title prop: "From goal to reviewed output."

## Section: Workflow sequence
- Eyebrow: Workflow sequence
- Heading: (title prop, varies per caller — see each page)
- Body: Every route has a clear path from goal to reviewed output — with AI generation, human checks, and iteration built in.

## Workflow steps (fixed list, always the same 6 steps regardless of caller)
- Goal: Define the business outcome this workflow is targeting.
- Inputs: Gather the data, context, and constraints the AI needs.
- Generate: AI produces first-pass output — copy, analysis, or plan.
- Review: Human or automated check before output moves forward.
- Handoff: Pass to the next person or system with full context.
- Measure: Track outcomes against the goal set at the start.

---

# AssistantPanelSection (shared component, default props) · source: App.jsx

Default title: "Assistant-guided next step."
Default text: "The assistant routes intent to the right category, tool, docs page, support path, or human handoff."

## Section: Assistant layer
- Eyebrow: Assistant layer
- Heading: (title prop — varies per caller, see each page)
- Body: (text prop — varies per caller)

## CTAs
- Talk to Agentix → opens voice agent
- Human handoff → /contact

## Assistant panel mock chat
- Header: Agentix Assistant
- Message body: mirrors the `text` prop
- Suggestion chips (fixed, always the same 4, all → /search): Find tools / Build stack / Read docs / Book demo

---

# FAQSection (shared component, default props + DEFAULT_FAQS) · source: App.jsx

Default title: "Questions answered."

## Section: FAQ
- Eyebrow: FAQ
- Heading: (title prop — varies per caller)

## FAQs (DEFAULT_FAQS — used whenever a caller doesn't pass custom `faqs`)
- Q: What does this page help me decide? / A: It shows you the exact tools, workflow path, and recommended stack for this context — so you can choose and move, not just browse.
- Q: How does Agentix route the workflow? / A: Agentix maps your goal to the right tools, sequences the stages, and assigns human review points where judgment is required.
- Q: When does human handoff happen? / A: Handoff triggers when AI confidence is low, a decision needs sign-off, or output is ready for the next person in your process.
- Q: What should I open next? / A: Use the Talk to Agentix assistant to build your stack, or book a demo to see the workflow run live against your business context.

---

# CategoryPage · routes: /category/:categoryId, /category/:categoryId/:subId · source: App.jsx

## Hero
- Chip label: category name (if viewing a subcategory) or "Operating Domain" (if viewing the top-level category)
- Heading: subcategory name or category name (data-derived)
- Body: subcategory description or category "promise" (data-derived)
- Stats labels: "workflows", "intelligent tools", "unified layer" (values are counts / "01")

## CTAs
- Build this workflow → opens voice agent
- See it in action → /demo

## Section: Workflows list panel
- Panel header label: Workflows

## Section: Tool explorer
- Eyebrow: subcategory name, or "Ecosystem" (top-level view)
- Heading (subcategory view): "{n} specialized tools for this workflow."
- Heading (category view): "{n} connected tools across {category name}."
- Body: Each tool maps to a specific stage in the operating layer, ensuring goals are met with precise, reviewed outputs.

## Section: Subcategory breakdown (top-level category view only)
- Eyebrow: Workflow clusters
- Heading: "{n} operating zones within {category.short}."
- Body: Categorized by business outcome, each zone provides a complete path from raw intent to production-ready output.
- Card badge: "{n} TOOLS"
- Card CTA: Explore workflow

## Section: WorkflowBand
- Heading: "{subcategory or category name} — intent to output sequence."

## Section: Featured tools spotlight
- Eyebrow: Spotlight
- Heading: "Core tools for {category.short}."
- Body: These featured tools represent the highest-frequency entry points for teams building in this domain.
- Button: Ask the assistant → opens voice agent

## Section: Team alignment
- Eyebrow: Team alignment
- Heading: Who manages this domain.

### CAT_ROLES (role name + description, per category id — shown as cards)

**content**
- Creative Directors: Manage brand output across formats with AI-generated drafts and built-in compliance gates.
- Copywriters: Scale creative output without sacrificing voice — AI writes first, you approve and ship.
- Brand Managers: Enforce guidelines automatically. Every output passes your brand rules before publishing.
- Agencies: Run client content production at scale with trackable, repeatable AI workflows.

**marketing**
- Growth Leads: Run demand gen and pipeline operations from one connected campaign layer.
- Campaign Managers: Plan, execute, and analyze campaigns without switching between tools.
- SEO Specialists: Build content clusters, track rankings, and brief writers — all from one system.
- Performance Marketers: Optimize ads, landing pages, and funnels with AI-powered recommendations.

**sales**
- Sales Leaders: Forecast accurately, enforce process, and see exactly where pipeline stalls.
- Account Executives: Spend time selling — not on CRM updates, research, and manual follow-up.
- SDRs / BDRs: Personalize outreach at scale with enriched data and AI-generated sequences.
- RevOps: Automate pipeline hygiene, routing, and reporting across the full funnel.

**cx**
- Support Leads: Manage ticket volume, quality, and SLAs — AI handles first response, humans handle escalations.
- Customer Success: Spot churn risk early and automate renewals, QBRs, and health scoring.
- Onboarding Teams: Build repeatable onboarding journeys with AI-generated guides and automated check-ins.
- Community Managers: Scale engagement, reviews, and testimonials with AI-powered response workflows.

**research**
- Strategy Leads: Turn competitor signals and market data into positioning briefs in hours.
- Research Analysts: Synthesize interviews, reviews, and signals into structured reports automatically.
- Product Marketers: Build battlecards, persona docs, and pricing strategy from live data.
- Founders: Get the market intelligence you need without a full research team.

**ops**
- Operations Leads: Formalize tribal knowledge into documented, automated workflows with clear owners.
- Process Managers: Map every workflow, assign owners, and track completion from one layer.
- Executives: Get weekly visibility into operations — approvals, blockers, and performance trends.
- Finance & Admin: Automate document processing, approvals, and compliance workflows end to end.

**systems**
- IT Leads: Build and maintain a connected AI infrastructure without custom engineering.
- Knowledge Managers: Centralise documentation, SOPs, and institutional knowledge into searchable AI.
- System Admins: Manage access controls, integrations, and CRM/ERP data from one governed layer.
- Developers: Extend Agentix with APIs, webhooks, and embedded widgets — no rebuild required.

**product**
- Product Managers: Write PRDs, plan sprints, and ship features with AI-generated specs and checklists.
- Project Leads: Track delivery, manage blockers, and generate status reports automatically.
- Client-Facing Teams: Onboard clients, manage scope, and review deliverables from one project layer.
- Engineering Leads: Generate release notes, QA scenarios, and launch checklists with zero manual writing.

**finance**
- Finance Leads: Automate invoice processing, reconciliation, and month-end close workflows.
- Legal / Compliance: Review contracts, build compliance checklists, and prepare for audits systematically.
- HR Managers: Automate onboarding, offboarding, policy updates, and vendor management tasks.
- Founders / Admins: Replace manual finance and admin tasks with governed, trackable AI workflows.

(Fallback if a category id isn't in this map: uses the `ops` role set.)

## Section: AssistantPanelSection
- Heading: "Build your {category.short} workspace."
- Body: "The assistant maps your goal to the right {category.short} tools, workflows, and human handoff rules — then guides you from setup to first output."

## Section: FAQSection
- Heading: "Frequently asked — {category.short}."

### CAT_FAQS (per-category FAQ overrides — otherwise DEFAULT_FAQS is used)

**content**
- Q: How does Agentix handle brand voice? / A: You upload brand guidelines, tone examples, and approved content as knowledge sources. The AI generates drafts matching your defined voice — and every output passes a brand compliance check.
- Q: Can I review content before it publishes? / A: Yes. Every workflow includes mandatory human review checkpoints. Nothing moves forward or publishes without your sign-off.
- Q: Does it work for multiple content formats? / A: Yes — blog, social, scripts, video, audio, and ads all live in one operating layer. Each format has its own tool with shared brand context.
- Q: How does content repurposing work? / A: Upload any approved piece. Agentix generates format-specific variants using your brand voice and original context — captions, email copy, video script.

**marketing**
- Q: Can Agentix run my entire campaign? / A: Agentix handles strategy, brief creation, ad copy, landing pages, and performance analysis. You own the channel spend and final approval — Agentix handles everything else.
- Q: How does it connect to my ad platforms? / A: Through integrations with Google, Meta, and LinkedIn. Agentix reads performance data, generates copy variants, and routes approvals — you control deployment.
- Q: Does it work for early-stage teams? / A: Yes. Growth starts on Starter with a single workflow. As you add channels, you scale tools — not headcount.
- Q: How does SEO content connect to campaigns? / A: Your SEO topic cluster and campaign calendar share the same knowledge base. SEO content can be repurposed as campaign assets automatically.

**sales**
- Q: How does Agentix score leads? / A: Lead scoring uses firmographic data, intent signals, and ICP criteria you define. Scores update automatically as data enriches across the workflow.
- Q: Does it replace my CRM? / A: No — it connects to your existing CRM and keeps it clean. Agentix writes notes, updates fields, and routes follow-ups automatically.
- Q: How does AI outreach personalization work? / A: Each sequence is generated using account research, persona context, and your approved tone. Every message is unique — no mail-merge placeholders.
- Q: What triggers human review in the sales workflow? / A: Large deals, enterprise accounts, legal-adjacent questions, and sensitive pricing discussions route to a human with full conversation context attached.

**cx**
- Q: How does AI handle support without wrong answers? / A: Agentix grounds all responses in your approved knowledge base. Questions outside your defined context escalate to a human — never fabricated answers.
- Q: What does human handoff look like in support? / A: When AI confidence drops below threshold, the ticket routes to a human with full conversation history, account context, and recommended next action.
- Q: Can customers tell they are talking to AI? / A: You control the framing. Most teams use AI for instant first response with clear escalation paths. Both transparent and human-first setups are supported.
- Q: Does it integrate with Zendesk or Intercom? / A: Yes. Agentix enriches your existing helpdesk — not replaces it. Tickets flow in, are triaged by AI, and routed back as structured responses.

**research**
- Q: How often is competitor data refreshed? / A: The Monitor tool checks competitor signals on your defined schedule — weekly by default, daily on Pro and Enterprise. You receive a structured change digest each run.
- Q: Can I use my own interview data as input? / A: Yes. Upload call recordings, transcripts, or survey responses. Agentix synthesizes themes, quotes, and recommendations into structured research output.
- Q: How does pricing intelligence work? / A: The tool tracks public pricing pages, packaging changes, and customer reviews from competitors. It flags changes and recommends response options.
- Q: Is research output ready for stakeholders? / A: Yes. Every report is generated in a structured format — executive summary, findings, evidence, and recommended next steps included.

**ops**
- Q: How do we migrate existing workflows into Agentix? / A: The Automation Blueprint tool maps your current processes, identifies manual steps, and generates a recommended workflow structure. Migration support is included on Pro.
- Q: What happens when a workflow gets blocked? / A: Agentix detects stalled steps, escalates to the assigned owner, and logs the blocker. You get visibility without chasing people in Slack.
- Q: Can we set up approval gates? / A: Yes. The Approval Engine lets you define who approves what, at which stage, and with what SLA. Unapproved items escalate automatically.
- Q: How does Agentix handle document processing? / A: The Document Extraction tool ingests PDFs and forms, extracts structured data, and routes it into the right workflow — no manual data entry required.

**systems**
- Q: What does the RAG knowledge base support? / A: It supports PDFs, Word docs, Markdown files, URLs, and Notion pages. Content is chunked, embedded, and cited in AI responses with source attribution.
- Q: How does access control work? / A: You define roles (admin, editor, viewer) at the workspace, category, and tool level. SSO is available on Enterprise. All access is logged.
- Q: Can we build on top of Agentix with APIs? / A: Yes. The API & Webhook Workflows tool lets you trigger Agentix workflows from external systems, receive output via webhooks, and embed AI widgets in your own interfaces.
- Q: What systems does Agentix integrate with natively? / A: CRM, Email, Docs, Support, Analytics, and 40+ more. Custom integrations are available on Enterprise.

**product**
- Q: How does Agentix help with product planning? / A: The PRD Generator turns feature requests into structured requirements. The Roadmap tool prioritizes by impact and effort. All decisions are logged with rationale.
- Q: Can it manage client projects? / A: Yes. Client Onboarding and Brief & Scope Builder handle the full project lifecycle with client-facing summaries generated automatically.
- Q: How does it integrate with existing project tools? / A: Agentix connects to Jira, Linear, Asana, and Notion. Tasks sync to your tool of choice — no need to change how your team works.
- Q: What gets automated in product delivery? / A: Sprint planning, status reports, release notes, QA checklists, and launch coordination are all automated. Your team focuses on building.

**finance**
- Q: How does Agentix handle sensitive financial data? / A: All data is encrypted at rest and in transit. Finance workflows run with role-based access and full audit logs for compliance review.
- Q: Can it process invoices automatically? / A: Yes. Invoice Processing extracts line items, matches them to POs, flags discrepancies, and routes approvals — no manual data entry.
- Q: Does it replace our accounting software? / A: No — it connects to QuickBooks, Xero, and similar platforms. Agentix automates the upstream process: capture, categorization, approval, and sync.
- Q: How does contract review work? / A: Upload any contract. Agentix extracts key terms, flags risk clauses, generates a risk summary, and routes for legal review with highlighted sections pre-marked.

---

# ToolsPage · route: /tools · source: App.jsx

## Meta
- Title: Tools / Agentix

## Hero
- Eyebrow: Tools
- Heading: "{n}+ tools across 9 domains."
- Body: Browse every tool in the Agentix ecosystem. Each tool belongs to a category, subcategory, and workflow path with clear input, output, and handoff rules.
- Search input placeholder: Search tools...

## Filter tabs
- "All tools" tab label (plus per-category short labels, data-derived)

## Pagination / grid controls
- Label: GRID_CAPACITY_CONTROL (mono, all-caps)
- Button: Reduce Load
- Counter: "{visibleCount} / {total}"
- Button: Load More tools

## Empty state
- "No tools match your search." + button "Clear filters"

## Section: Category routes
- Eyebrow: Category routes
- Heading: Browse by operating domain.
- Body: Each category is a governed workflow zone with its own subcategories, tools, and assistant paths.

## Section: AssistantPanelSection
- Heading: Ask Agentix to find the exact tool for your workflow.

## Section: FAQSection
- Heading: Tool discovery questions.

---

# ToolCard (shared card, App.jsx)

- CTA label (every card): Configure workflow

---

# ToolPage · route: /tools/:toolId · source: App.jsx

## Hero
- Eyebrow: tool's category name (data-derived)
- Heading: tool name (data-derived)
- Body: tool description (data-derived, catalog-owned)

## CTAs
- Try this tool → opens voice agent
- Save tool / Saved to workspace (toggle button — label flips based on saved state)

## Section: Related tools
- Label: "Related tools in {category name}"

## Section: What it does
- Eyebrow: What it does
- Heading: "{tool name} turns intent into reviewed output."
- Body: tool description (repeated)
- StepCards items: Inputs required / Outputs produced / Constraints / Review path (see stepDescMap above)

## Section: EcosystemConnectivity
- Eyebrow: Ecosystem Context
- Heading: Intelligent workflow connectivity.
- Body: "{tool name} is not an island. It functions as a high-performance node within a connected business operating system, consuming upstream signals and delivering downstream value."
- Column label: Upstream Logic
- Column label: Downstream Execution
(only rendered if the tool has related workflow connections in `workflowConnections.js` data)

## Section: WorkflowBand
- Heading: "{tool name} workflow placement."

## Section: Integrations
- Eyebrow: Integrations
- Heading: Connect the systems this tool touches.
- StepCards items: first 4 integration names (data-derived; descriptions from stepDescMap above)

## Section: Human handoff
- Eyebrow: Human handoff
- Heading: Review stays attached to the tool.
- Body: Risk, compliance, legal-adjacent claims, customer escalation, and finance/admin actions route to a person.

## Section: AssistantPanelSection
- Heading: "Ask Agentix how to use {tool name}."

## Section: FAQSection
- Heading: "{tool name} questions."

---

# ToolWorkspaceVisual (mock workspace UI inside ToolPage) · source: App.jsx

Used when no per-tool workspace data exists in `data/toolWorkspaces.js` (fallback mock content):

## variant "split"
- Pane 1 label: Input brief
- Status chip: approved
- Field labels: Business goal, Audience, Knowledge sources, Review rules
- Field values (templated):
  - Business goal: "Scale {category, lowercase} output with AI-reviewed workflows"
  - Audience: subcategory or category name (data-derived)
  - Knowledge sources: "Brand docs, {category, lowercase} guidelines, approved content"
  - Review rules: "Tone, accuracy, compliance — edge cases route to human"
- Pane 2 label: Generated output
- Doc heading: "{tool name} workspace"
- Doc body: "This page is tuned for {category name}: fast inputs, structured output, review, and publishing."
- Callout: Ready for human review and workflow routing.

## variant "desk"
- Chrome bar URL: "app.agentix.ai / {tool.id}"
- Chrome bar meta: live
- Chat header: {category name} chip + "assistant" label
- Mock chat transcript:
  - AI: "I found the right workflow for {tool name}. I can cite approved sources and route edge cases."
  - User: "Show the output and constraints."
  - AI: "Output is ready. Human handoff triggers are attached."
- Report card labels + values (templated):
  - Signals: "Live {category, lowercase} signals from connected sources"
  - Recommendations: "Next actions surfaced by {tool name}"
  - Risks: "Edge cases and compliance flags routed for review"
  - Next action: "Route output or escalate to {subcategory name} owner"

## variant "ledger" (default/fallback)
- Chrome bar URL: "workflow.agentix.ai / controls / {tool.id}"
- Chrome bar meta: governed
- Ledger steps (label: description, templated):
  - Trigger: "{tool name} activates on request, schedule, or upstream workflow output."
  - Validate: "Input is checked against {category name} rules before processing starts."
  - Approve: "Human or auto-approval gate confirms the brief before execution."
  - Execute: "{tool name} runs the workflow and produces structured, reviewed output."
  - Log: "Every action is logged for audit trail, compliance, and performance review."
  - Report: "Output and decisions surface in your {category name} dashboard automatically."

---

# CollectionPage · routes: /platform/solutions, /use-cases · source: App.jsx `CollectionPage({ type })`

## Meta
- Title: "{Solutions|Use cases} / Agentix"

## Hero (type = solutions)
- Eyebrow: Solutions
- Heading: Outcome-shaped AI stacks.
- Body: Pre-built stacks that combine categories, tools, workflows, and handoff rules into one operating system for a specific business outcome.

## Hero (type = use-cases)
- Eyebrow: Use cases
- Heading: Built for the team you actually have.
- Body: Agentix adapts to your team structure and role. Each use case is a starting point — not a template.

## Collection cards
- Card CTA: Explore stack

## Section: WorkflowBand
- Heading: "{Solutions|Use cases} become runnable Agentix workflows."

## Section: How it works
- Eyebrow: How it works
- Heading: From outcome to operating system.
- Body: Pick the stack closest to your goal. The assistant maps it to categories, tools, and handoff rules in your environment.
- Steps:
  - "1. Choose outcome" — Find the stack that matches your business goal or team type.
  - "2. Preview the tools" — See which Agentix tools are connected and how they route together.
  - "3. Start the assistant" — Talk to Agentix to tailor the stack to your inputs and constraints.
  - "4. Run the workflow" — Execute, review, and iterate from one connected operating layer.

## Section: AssistantPanelSection
- Heading: "Choose the right {solutions|use cases} with Agentix."

## Section: FAQSection
- Heading: "{Solutions|Use cases} questions."

---

# CollectionDetail · routes: /platform/solutions/:id, /use-cases/:id · source: App.jsx `CollectionDetail({ type })`

## Meta
- Title: "{item name} / Agentix"

## Hero
- Eyebrow: type ("solutions" or "use-cases")
- Heading: item name (data-derived)
- Body: item outcome/problem (data-derived)

## Section: Recommended stack
- Eyebrow: Recommended stack
- Heading: "Tools that power {item name}."
- Body: "These tools connect inside Agentix — each one handles a specific stage of the {item name, lowercase} workflow, from input to reviewed output."

## Section: WorkflowBand
- Heading: "{item name} execution path."

## Section: Command center
- Eyebrow: Command center
- Heading: "{item name} runs in one layer."
- Body: Every tool, workflow, and handoff point is visible and controllable from the Agentix command center.

## Section: AssistantPanelSection
- Heading: "Build {item name} with the assistant."

## Section: FAQSection
- Heading: "{item name} questions."

---

# ResourceIndex · routes: /integrations, /docs, /help · source: App.jsx `ResourceIndex({ type })`, `resourceConfig()`

## resourceConfig per type

**integrations**
- Title: Integrations
- Singular: integration
- Eyebrow: Connected systems
- Body: Connect Agentix to the systems your team already uses: CRM, email, docs, support, analytics, databases, and APIs.

**docs**
- Title: Docs
- Singular: collection
- Eyebrow: Builder docs
- Body: Documentation for builders, admins, and technical buyers using Agentix tools and workflow infrastructure.

**help**
- Title: Help Center
- Singular: topic
- Eyebrow: Support paths
- Body: Troubleshooting and support topics for teams building workflows with Agentix.

## Meta
- Title: "{config.title} / Agentix"

## Resource cards
- Card CTA: "Open {config.singular}"

## Section: WorkflowBand
- Heading: "{config.title} connect into Agentix workflows."

## Section: Featured paths
- Eyebrow: Featured paths
- Heading: "Choose a path." (default `indexTitle`, none of the 3 configs override it)

## Section: Governance
- Eyebrow: Governance
- Heading: Every resource has permissions, handoff, and next-action context.
- StepCards items: Owner / Reviewer / Status / Next action (descriptions from stepDescMap above)

## Section: AssistantPanelSection
- Heading: "Ask Agentix about {config.title, lowercase}."

## Section: FAQSection
- Heading: "{config.title} questions."

---

# ResourceDetail · routes: /integrations/:id, /docs/:id, /help/:id · source: App.jsx `ResourceDetail({ type })`

## Meta
- Title: "{item name} / Agentix {config.title}"

## Hero
- Eyebrow: config.eyebrow
- Heading: item name (data-derived)
- Body: item text (data-derived — see note below on template text)

## Detail card
- Label: "{config.singular} path"
- Heading: "{item name} inside Agentix."
- Body: item text (repeated)

## Section: Related routes
- Eyebrow: Related routes
- Heading: Continue through nearby Agentix pages.

## Section: AssistantPanelSection
- Heading: "Get help with {item name}."

## Section: FAQSection
- Heading: "{item name} questions."

NOTE: the `integrations`/`docs`/`help` item lists themselves (names, per-item template body text, per-item bullet lists) are generated in App.jsx from a fixed name array combined with a template string (e.g. `Connect Agentix to your ${name} systems to automate data flow...`). These are technically inline template literals in App.jsx rather than an external data file, so flagging here in case the catalog-owning agent doesn't cover them — but per this task's instructions they were treated as "data-derived catalog entries" and excluded from full reproduction. The three template patterns are:
- Integrations: "Connect Agentix to your {name, lowercase} systems to automate data flow, trigger workflows from external signals, and keep core records synchronized across the operating layer." + bullets: Bi-directional sync / Workflow triggers / Data mapping rules / Security & permissions
- Docs: "Step-by-step implementation guides and technical references for {name, lowercase}, designed to help your team move from setup to first automated output." + bullets: Implementation guide / Core concepts / Configuration rules / Handoff patterns
- Help: "Resolve {name, lowercase} issues and find troubleshooting paths to keep your business workflows running without delays or manual bottlenecks." + bullets: Common fixes / SLA support / Resolution paths / System status

---

# SearchPage · route: /search · source: App.jsx

## Meta
- Title: Search / Agentix

## Hero
- Eyebrow: Search
- Heading: Search the Agentix ecosystem.
- Body: Find tools, categories, solutions, and use cases across every Agentix domain.
- Search input placeholder: Search tools, categories, and workflows...

## Section: WorkflowBand
- Heading: Search routes into the same operating system.

## Section: Grouped results
- Eyebrow: Grouped results
- Heading: Search covers tools, categories, solutions, docs, help, and integrations.
- StepCards items: Tools / Categories / Solutions / Resources

## Section: AssistantPanelSection
- Heading: Ask Agentix when search is not enough.

## Section: FAQSection
- Heading: Search questions.

---

# NotFoundPage · routes: /404, * (catch-all) · source: App.jsx

## Meta
- Title: Page not found / Agentix

## Hero
- Eyebrow: 404
- Heading: Page not found.
- Body: This page does not exist or has moved. Use the links below to find what you need.

## Quick link cards
- "Browse tools" → /tools — "Explore 120+ AI tools across every business category and workflow."
- "View categories" → /category/content — "Browse all 9 business domains with subcategory and tool depth."
- "Search" → /search — "Find tools, categories, solutions, and use cases instantly."
- "Contact us" → /contact — "Get help from the Agentix team — sales, support, or implementation."
- Card link label: "Go" (icon-only arrow CTA on each card)

## Section: AssistantPanelSection
- Heading: Can't find it? Ask Agentix.
- Body: The assistant can find any tool, workflow, or page in the Agentix ecosystem.

(No FAQSection on this page — goes straight from AssistantPanelSection to FinalCTA.)

---

# Ambiguous / worth flagging

- The inline `HomePage()` function in App.jsx is dead code (not routed) but contains real content (document title) — see top of this file.
- `WorkflowTemplates` (inline section) is also only reachable via the dead inline HomePage, so it too may be unused in the live app.
- ToolsPage empty-state text ("No tools match your search.") and grid-control labels ("GRID_CAPACITY_CONTROL", "Reduce Load", "Load More tools") read as internal/engineering-flavored copy rather than customer-facing marketing voice — flagged in case tone needs to be revised during the reset.
- MobileMenu (GlobalNav world) has both "Blog" and "Docs" linking to `/docs` — likely unintentional duplication (see global.md).
