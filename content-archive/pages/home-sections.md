# Home / Landing Section Components · source: frontend/src/components/agentix/*
These are shared homepage/landing section components imported by App.jsx (not a single routed page — each is a section stitched into the homepage flow).

## Component: HeroSection.jsx

### Section
- Heading: An AI Operating System. / Not another stack of disconnected tools.
- Subheading (body): Content, growth, sales, research, support, operations, and business systems — connected in one intelligent platform.

### CTAs
- Talk to Agentix → (opens voice agent overlay)
- Explore Ecosystem → #ecosystem (scrolls to ecosystem section)

### Trust line
- Label: Built for
- Text: B2B startups · SMEs · agencies · founder-led teams

### Statistics (hero meta counters)
- 9 — categories
- 40 — subcategories
- 121 — tools
- 1 — assistant

### Hero preview card (per-category popover, shown on hover/click of a category node)
- Category name and "promise" tagline (pulled from AGENTIX_DATA.categories — not inline here)
- Featured tools list (first 4 tools per category, pulled from AGENTIX_DATA)
- CTA: "Open {category short name} workspace →"

### System map label
- "9 CATEGORIES · 121 TOOLS" (mono caption under the orbit diagram)

Note: category names, short labels, and "promise" copy are sourced from `data/agentixData.js` (external data module), not hardcoded inline in this component.

---

## Component: FeaturedSpotlight.jsx
("OS Command Console Spotlight" — shows 4-5 featured tools as a console/dashboard mock)

### Section
- Eyebrow/label: OS_CORE_INFRASTRUCTURE_V2.0
- Heading: The neural core of your business.
- Subheading: High-latency operations replaced by integrated AI nodes. Deploy, monitor, and scale in real-time.

### Core Node (large featured tool panel)
- Label: PRIMARY_PROCESSING_UNIT // {CATEGORY NAME} (category name uppercased, dynamic)
- Body: The central nervous system for your {category} stack. Automates high-complexity sequences with native OS governance. (category name is interpolated, lowercase)
- Readouts:
  - CPU_UTILIZATION — 88.2%
  - NEURAL_LOAD — OPTIMAL
- CTA: Initialize Master Node →

### Peripheral Module (small tool cards)
- Label: EXT_MODULE_0{index}
- Status label: ACTIVE
- Shows tool name (dynamic, from AGENTIX_DATA featured tools)

### Long Module (auxiliary tool row)
- Label: AUX_SYSTEM_LOADER
- Shows tool name (dynamic)

Note: the actual featured tool names shown (e.g. which 5 tools appear) are selected dynamically from AGENTIX_DATA.categories by priority category (ops, content, sales, marketing, research) — no additional inline scenario copy beyond what's captured above.

---

## Component: ToolTheatre.jsx
("Real outputs. Not just a feature list." — interactive tool preview theatre with 6 tool mocks)

### Section
- Eyebrow: 04 / Tool theatre
- Heading: Real outputs. Not just a feature list.
- Body: Every Agentix tool ships with a live preview. Switch tools — the input pane morphs into a real output.

### Featured tools rail (label: "Featured tools")
1. AI Content Generator — Content & Creative
2. Lead Enrichment & Scoring — Sales & Revenue
3. AI Support Chat — Customer Experience
4. Competitor Analyzer — Market Research
5. Workflow Orchestrator — Operations
6. Operations Dashboard — Operations

### Theatre stage controls
- Action buttons: Run, Open

### Tool mock: AI Content Generator ("writer")
- Pane label: Brief
- Chip: blog · 1200 words
- Field — Topic: How AI workflow automation reduces SaaS support load
- Field — Audience: SaaS founders · Customer success leads
- Field — Tone: Confident · technical · evidence-led
- Field — Sources: brand-voice.md, support-data.csv, 3 customer interviews
- Output pane label: Generated · streaming
- Generated doc heading (H1): The hidden cost of human-only support
- Generated body: For SaaS teams under 50, support burden grows faster than headcount. By month 18, founders are answering tickets at 11pm.
- Generated subhead (H2): Where AI actually helps
- Generated body: The wins compound where context already exists — onboarding, billing, troubleshooting. Three patterns we see in production…
- Callout: SOURCE — support-data.csv · 412 conversations · last 30 days

### Tool mock: Lead Enrichment & Scoring ("leads")
- Stats: Enriched — 1,284 · ICP match — 312 · Routed — 128 · Pipeline — $1.2M
- Table headers: Account, Profile, Score, Stage
- Rows:
  - Northwind SaaS — Series B · 240 emp — 92 — ICP
  - Linder Studios — Agency · 18 emp — 78 — Hot
  - Voltic Health — SMB · 60 emp — 61 — Warm
  - Forge Labs — Series A · 45 emp — 57 — Warm
  - Pinemark — SMB · 22 emp — 34 — Cold
  - Bayline — Agency · 8 emp — 28 — Cold

### Tool mock: AI Support Chat ("chat")
- Status chip: Online · 1.2s avg response
- Session label: session #4012
- User message: My team can't sync Salesforce contacts after the latest update. We're seeing duplicates in HubSpot too.
- AI response: I see your workspace had a sync conflict at 9:42am. Three things look related:
  - Field mapping for "Lead Source" changed in v4.2
  - Duplicate detection rule paused since Tuesday
  - Two queued jobs need rerun
  - (closing line) Want me to walk through the fix or open a ticket?
- Citation: Cited: integration-docs/v4.2.md · account #N-2240
- Input placeholder: Type a message…
- Hint chip: ↳ enter

### Tool mock: Competitor Analyzer ("report")
- Card — Position: Mid-market challenger; body: Above 4 of 7 competitors on workflow depth.
- Card — Pricing gap: $12k, −18% vs avg; body: Room to package a Pro tier at $18k.
- Card — Top messaging themes · last 30 days:
  - AI workflow — 92
  - Time saved — 74
  - Integration depth — 68
  - Human handoff — 51
  - Compliance — 39
- Card — Recommended next moves:
  1. Reframe homepage around "AI operating system" — competitors avoid the OS framing.
  2. Launch comparison page targeting the two priced-up alternatives.
  3. Add SOC 2 badge above the fold; 4 of 7 lead with it.

### Tool mock: Workflow Orchestrator ("flow" — animated flow diagram)
- Nodes: Form submitted, Enrich, Score, Route by ICP, Notify owner, CRM update, Send sequence, Log activity
- Footer: Last run — 2 minutes ago · 14 records · 0 errors
- Status chip: healthy

### Tool mock: Operations Dashboard ("dashboard")
- Stats: Open tickets — 47 (−12%) · Pipeline — $1.4M (+8%) · Approvals waiting — 9 (+2) · Active workflows — 32 (+4)
- Card: Workflow health · 24h (sparkline, no text values)
- Card — Top blockers:
  - Invoice approval — 3 stalled
  - Demo follow-up — 5 overdue
  - Content review — 2 pending

---

## Component: ArcCarousel.jsx
(9-category arc/carousel, id="ecosystem")

### Section
- Eyebrow (dynamic): "{NN} of 9 — {Category Name}"
- Heading: One platform. / Nine connected domains. (second line highlighted, colored per active category)
- Subheading (dynamic): first sentence of the active category's "promise" text (from AGENTIX_DATA), falling back to the category's short name

### Card content (per category, dynamic from AGENTIX_DATA)
- Category number badge (01–09)
- "{N} tools" badge
- Ghost label: category short name
- Category full name
- Meta: "{N} workflows · {N} AI tools"
- CTA (center card only): Explore category →

Note: all category names, "promise" strings, tool counts, and workflow counts are sourced dynamically from `data/agentixData.js` — no additional inline copy beyond the static headline/subhead above.

---

## Component: CategoryConstellation.jsx
(id="categories" — interactive category explorer with orbit diagram)

### Section
- Eyebrow: 02 / Category map
- Heading: Nine connected domains. One operating layer.

### Category stage (per selected category, dynamic)
- Category short label chip
- Category full name (h3)
- Category "promise" body text
- CTA: View category →
- Sub-list label: "Subcategories · {N}" — lists subcategory names + tool counts
- Featured list label: "Featured tools" — numbered list of featured tool names

Note: category names, promises, subcategories, and featured tools are all sourced from `data/agentixData.js` (external), not inline arrays in this file.

---

## Component: CategoryEcosystem.jsx
(id="ecosystem" — grid version of the 9-category ecosystem)

### Section
- Eyebrow: 01 / The ecosystem
- Heading: One platform. Nine connected domains.
- Body: Agentix replaces the patchwork of point tools with a single operating layer — purpose-built for the moves a modern business actually needs to make.

### Card content (per category, dynamic)
- Category number (01–09)
- Category name
- Description: category "promise" (or short name as fallback)
- Stats: "{N} workflows · {N} tools"

Note: category data sourced from `data/agentixData.js`, not inline.

---

## Component: SystemMap.jsx
(SVG orbit visualization used inside HeroSection — no standalone copy)

### Labels
- Caption: 9 CATEGORIES · 121 TOOLS
- Category short-name labels floating around the orbit (dynamic, from passed-in `cats` prop / AGENTIX_DATA)

No other human-readable text — purely a visual/interactive SVG diagram component.

---

## Component: CommandCenter.jsx
(id="command" — simulated product/app screenshot mock: "Not disconnected tools. An operating layer.")

### Section
- Eyebrow: 08 / Command center
- Heading: Not disconnected tools. An operating layer.
- Body: One canvas to design, run, and observe every workflow your business depends on.

### Mock browser chrome
- URL bar text: app.agentix.ai · workspace · acme
- Meta: v4.2 · live

### Sidebar (mock app UI)
- Workspace name: Acme
- Section label: Workspaces — items: Content (12), Sales (8), Support (32, active), Ops (18), Finance (6)
- Section label: Recent — items: Ticket triage, Lead enrichment, Onboarding flow

### Main panel
- Eyebrow: Workspace · Support
- Heading: Ticket Triage & Routing
- Action buttons: Run, Edit, Deploy
- Flow diagram nodes: Inbox trigger, Classify topic, Detect urgency, Score sentiment, Route to billing, Route to product, Escalate to human
- Footer stats: Last run — 2m ago · Volume — 12,840 / day · Resolved — 68% no-touch · Status — Healthy

### Assistant panel
- Label: Assistant
- Message: Tickets about "billing v2 migration" spiked 3× this morning. Recommend opening a status update and routing those to the finance squad.
- Buttons: Apply, Review
- Citation: Cited: support-data · 28 tickets

---

## Component: WorkflowStrip.jsx
(auto-advancing 6-step process strip, no heading — just steps)

### Steps
1. 01 — Discover — Goals, audience, signals
2. 02 — Configure — Pick or build a workflow
3. 03 — Generate — AI creates the work
4. 04 — Review — Human-in-the-loop checks
5. 05 — Deploy — Publish, send, route
6. 06 — Measure — Insights drive iteration

---

## Component: HowItWorks.jsx
(id="how")

### Section
- Eyebrow: 05 / How it works
- Heading: From a goal to a working system in five steps.

### Steps
1. 01 — Tell Agentix your goal — Voice, chat, or text. Plain language — no setup.
2. 02 — Choose a workflow — Pick a stack template, or let the assistant build one.
3. 03 — Connect knowledge — RAG-grounded answers from your approved sources.
4. 04 — Generate & route — AI does the work; humans review where it matters.
5. 05 — Measure & improve — Outcomes flow back into the operating system.

---

## Component: Solutions.jsx
(id="solutions" — outcome-shaped solution stacks grid)

### Section
- Eyebrow: 06 / Solutions
- Heading: Outcome-shaped stacks. / Not feature buckets.

### Card content (per solution, dynamic from AGENTIX_DATA.solutions)
- Category short-label chip
- Solution name
- Outcome description
- Tool stack tags (list of tool names)
- CTA: Build this stack →

Note: solution names, outcomes, and tool stacks are sourced from `data/agentixData.js` (AGENTIX_DATA.solutions) — no solution data is inlined in this component file itself.

---

## Component: UseCases.jsx
(id="use-cases" — tabbed use-case explorer with mock dashboard)

### Section
- Eyebrow: 07 / Use cases
- Heading: Built for the team you actually have.

### Use case stage (per selected use case, dynamic from AGENTIX_DATA.useCases)
- Chip label: Use case
- Use case name (h3)
- Problem statement body text
- Label: Recommended stack — numbered list of recommended tools
- CTAs: Build my stack →, Talk to a human →

### Mock dashboard (UseCaseDashboard, static demo content shown for any selected use case)
- Header: "Today · {use case name}"
- Stats: Active workflows — 12 · Time saved — 38h · Pipeline impact — +24%
- Workflow list (status: running for first 3, queued for rest):
  - Lead routing
  - Onboarding emails
  - Weekly summary
  - Renewal alerts
  - Invoice review

Note: use case names/problems/stacks are sourced from `data/agentixData.js` (external), not inline in this file.

---

## Component: ValueProof.jsx
("Before / After" fragmented-stack vs. one-OS comparison)

### Section
- Eyebrow: 09 / Why Agentix
- Heading: Replaces a stack. Connects the rest.

### Before panel
- Label: Before
- Subheading: The fragmented stack
- Tool pills: Notion, Slack, Sheets, HubSpot, Intercom, Calendly, Loom, Figma, Linear, Zapier, Asana, Sales Nav
- Stats: Tools — 12+ · Manual handoffs — Daily · Time saved — —

### After panel
- Label: After
- Subheading: One operating system
- Category pills (dynamic, from AGENTIX_DATA.categories — short names)
- Stats: Tools — 1 platform · Manual handoffs — Routed · Time saved — ~22h/wk

### Center graphic label
- AGNTX (mono wordmark on connecting arrow)

---

## Component: TrustLayer.jsx
(customer quotes + trust/compliance stats)

### Section
- Eyebrow: 10 / Trust
- Heading: Built for teams who can't afford to break.

### Testimonials
- "We collapsed seven tools into one workflow surface and gave our founders four hours back every day." — VP Operations · B2B SaaS · 80 employees
- "Our agency runs client work like a product team now. The OS is the difference." — Founder · Digital agency · 40 clients
- "Pipeline coverage went from spreadsheet hope to a live signal we trust." — Head of Revenue · Series B SaaS

### Statistics
- 120+ — tools shipped
- 99.99% — platform uptime
- SOC 2 — type II ready
- EU/US — data residency

### Compliance & security
- Label: Compliance & security
- Badges: SOC 2 II, GDPR, HIPAA-ready, ISO 27001, SSO/SAML, Audit logs

---

## Component: VoiceCTA.jsx
(voice-orb CTA section — "Talk to Agentix")

### Section
- Eyebrow: 11 / Talk to Agentix
- Heading: Tell Agentix / what you want to build.

### Prompt chips
- Build my sales stack
- Create a content workflow
- Automate support
- Research my market

### Input
- Placeholder: Or type your goal — Agentix will route you to the right stack.
- CTA button: Send →

---

## Component: FAQ.jsx
(id="faq")

### Section
- Eyebrow: 12 / FAQ
- Heading: Questions, answered.
- Body: The short version. For the long version — talk to Agentix and ask anything.
- CTA: Ask the assistant →

### FAQs
- Q: What is Agentix? / A: An AI operating system that connects content, marketing, sales, support, research, ops, knowledge, delivery, and finance into one workflow surface — with grounded RAG, voice/chat, and human handoff built in.
- Q: Who is it for? / A: B2B SaaS startups, SMEs, agencies, and founder-led businesses. Teams that need predictable systems but can't justify enterprise software.
- Q: Does it replace existing tools? / A: It can replace several. Or sit on top — Agentix integrates with CRMs, calendars, docs, support, messaging, spreadsheets, CMS, and analytics.
- Q: How does human handoff work? / A: Every workflow defines review rules. Compliance, finance, and high-risk decisions route to a human by default. You decide where AI ends and humans take over.
- Q: Is the assistant grounded in approved content? / A: Yes. RAG over your docs, SOPs, knowledge base, support history, and product data — with citations on every answer.
- Q: Can it connect to our CRM and support tools? / A: HubSpot, Salesforce, Pipedrive, Intercom, Zendesk, Help Scout, Notion, Linear, Slack, GMail, Outlook, and more — plus an open API and webhooks.

---

## Component: FinalCTA.jsx

### Section
- Eyebrow: 13 / Start here
- Heading: Start with one workflow.
- Subheading: Scale into an AI operating system.

### CTAs
- Talk to Agentix → /talk-to-agentix
- Book a Demo → /demo

### Trust chips
- 14-day pilot
- No credit card
- Cancel anytime

---

## Component: ToolHeroMedia.jsx
Media-rendering component (video/Lottie switcher for tool detail pages) — no human-readable business copy. Contains only:
- Internal mapping tables of tool names to media file paths (e.g. "Ad Creative Generator", "Lead Discovery", "AI Support Chat", "Invoice Processing", "PRD Generator", "Internal Knowledge Assistant", "Workflow Orchestrator", "Competitor Analyzer", etc. — these are tool names used as data keys, not new marketing copy; the same tool names appear elsewhere in the data model).
No headings, body copy, or CTAs to extract.

---

## Component: AgentixIcon.jsx
Pure icon-rendering component (SVG path switch by `name`). No human-readable text at all — icon name strings (e.g. "content", "growth", "sales", "mic", "arrow") are internal identifiers, not display copy.

---

## Component: LottieAnimation.jsx
Pure animation-loading wrapper (fetches and renders Lottie JSON, with a fallback animation URL). No human-readable text content.
