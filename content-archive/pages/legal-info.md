# InfoPage (generic legal/info renderer) · routes: /privacy-policy, /cookies, /cookie-preferences, /accessibility, /500 · source: frontend/src/App.jsx (InfoPage, pageCopy)

InfoPage is a single generic component driven by a `pageCopy` lookup table keyed by page id: `pageCopy[id] = [title, description, [sectionLabel1, sectionLabel2, sectionLabel3, sectionLabel4]]`. It renders the same structural template (hero, 4 "section" cards, page-role band, workflow band, routing cards, platform band, assistant panel, FAQ, final CTA) for every id, substituting only the title/text/section-label strings below.

## Actually-rendered InfoPage routes

App.jsx wires only 5 paths through InfoPage, with an id remap:
- `/privacy-policy` → InfoPage id="privacy"
- `/cookies` → InfoPage id="cookie-preferences"
- `/cookie-preferences` → InfoPage id="cookie-preferences"
- `/accessibility` → InfoPage id="accessibility"
- `/500` → InfoPage id="500"

(`/404` is handled by the separate `NotFoundPage` component, not InfoPage — see app-shell.md.)

**AMBIGUITY**: The `pageCopy` object (below) also defines entries for `pricing`, `demo`, `talk-to-agentix`, `about`, `contact`, `security`, `status`, `changelog`, `terms`, `faq`, and `404` — but none of these ids are ever passed to InfoPage in the current route table (those routes instead render dedicated lazy-loaded page components from `pages/site/*.jsx`, or `NotFoundPage`). These entries appear to be orphaned/dead copy, possibly left over from an earlier routing scheme, OR intended as a content fallback. Captured in full below since it's real inline text in source — flag for the team to confirm whether it's still needed.

---

## Section: privacy (id="privacy", route /privacy-policy)
- Heading: Privacy
- Body: How Agentix handles contact data, workflow data, assistant conversations, and user rights.
- Bullets (section card labels): Key points / Data rights / Contact privacy / Last updated

## Section: cookie-preferences (id="cookie-preferences", routes /cookies and /cookie-preferences)
- Heading: Cookie Preferences
- Body: Manage preference, analytics, and product improvement cookies.
- Bullets: Necessary / Analytics / Preferences / Product improvement

## Section: accessibility (id="accessibility", route /accessibility)
- Heading: Accessibility Statement
- Body: Agentix aims to support keyboard navigation, contrast, reduced motion, and readable layouts.
- Bullets: Commitment / Supported features / Known limits / Contact

## Section: 500 (id="500", route /500)
- Heading: 500
- Body: Something failed while loading this route. Retry, check status, or contact support.
- Bullets: Retry / Status / Support / Search

---

## Orphaned / unused pageCopy entries (not currently reachable via InfoPage routing — see ambiguity note above)

### pricing
- Heading: Pricing
- Body: Start with one workflow. Scale into an AI operating system.
- Bullets: Starter / Growth / Pro / Enterprise / Custom Build

### demo
- Heading: Book a Demo
- Body: See Agentix translate your business goal into categories, tools, workflows, and human handoff rules.
- Bullets: Goal selector / Qualification form / Recommended demo path / Calendar handoff

### talk-to-agentix
- Heading: Talk to Agentix
- Body: Use the assistant as the primary product discovery and conversion interface.
- Bullets: Voice entry / Chat entry / Recommended tools / Stack builder

### about
- Heading: About Agentix
- Body: Agentix exists to replace scattered manual work with one connected operating layer.
- Bullets: Mission / Product philosophy / Who it serves / Platform principles

### contact
- Heading: Contact
- Body: Route sales, support, demo, partnership, and implementation questions to the right human path.
- Bullets: Sales route / Support route / Partnership route / Implementation route

### security
- Heading: Security
- Body: Trust, RAG alignment, access control, integration permissions, and handoff rules are core to Agentix.
- Bullets: Data handling / Access controls / RAG policy / Compliance roadmap

### status
- Heading: Status
- Body: Current system status and incident communication for the Agentix public platform.
- Bullets: Assistant / Workflow engine / Integrations / Docs

### changelog
- Heading: Changelog
- Body: Product releases, tool updates, workflow improvements, and documentation changes.
- Bullets: Assistant routes / New tools / Workflow templates / Security updates

### terms
- Heading: Terms
- Body: Commercial and acceptable-use terms for Agentix tools, workflows, assistant features, and integrations.
- Bullets: Key terms / Acceptable use / Admin contact / Last updated

### faq
- Heading: FAQ
- Body: Answers about Agentix, tools, workflows, integrations, security, pricing, and human handoff.
- Bullets: Platform / Tools / Workflows / Security

### 404
- Heading: Page not found
- Body: This page does not exist or has moved. Use the links below to find what you need.
- Bullets: Browse tools / View categories / Search / Contact

---

## Shared InfoPage template copy (same for every id, with `{title}` substituted)

## Meta
- Title (document `<title>`): "{title} / Agentix"

## Section: Fallback (used only if an id has no pageCopy entry at all)
- Heading: Title-cased version of the id (e.g. "some-id" → "Some Id")
- Body: "{Title} is part of the Agentix operating system — connecting tools, workflows, and human review in one layer."
- Bullets: Overview / Workflow / Tools / Next steps

## Section: Section cards (one card per bullet label from pageCopy)
- Card eyebrow: "Section"
- Card body (per card, `{item}` = the bullet label): "Automate the {item, lowercase} stage of your business operations with specific Agentix tools and governed workflow paths."

## Section: Page role
- Eyebrow: Page role
- Heading: "{title} has a dedicated conversion role."
- Body: The page does not share a thin generic body. It separates route choice, forms or content, trust notes, and next action.
- Card label (repeated per section item): "Role"

## Section: Workflow band
- Heading: "{title} decision path."
(See WorkflowBand shared component default copy in app-shell.md for the step labels/descriptions.)

## Section: Routing
- Eyebrow: Routing
- Heading: Clear routes replace inert buttons.
- StepCards items: Talk to Agentix / Book Demo / Search / Contact
  (descriptions for these come from the shared `stepDescMap` — see app-shell.md)

## Section: Platform
- Eyebrow: Platform
- Heading: Every page connects to one operating layer.
- Body: Tools, workflows, assistant routing, and human handoff all run inside the same Agentix system — no switching between products.

## Section: Assistant panel
- Heading: "Ask Agentix about {title}."
(body text = shared AssistantPanelSection default — see app-shell.md)

## Section: FAQ
- Heading: "{title} questions."
(FAQ items = shared DEFAULT_FAQS — see app-shell.md; InfoPage does not pass custom FAQs)

## CTAs
- Final CTA section is the shared `<FinalCTA />` component (not part of App.jsx inline content — owned elsewhere).
