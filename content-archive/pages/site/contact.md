# Contact (site) · route: /contact · source: frontend/src/pages/site/ContactPage.jsx

## Meta
- Title: Contact / Agentix

## Section: Hero
- Eyebrow: Contact
- Heading: Talk to the right person, right away.
- Body: Choose your route below. Every enquiry goes to the team that can actually help — not a shared inbox with a 5-day SLA.

## Section: Route selector (from data)
- Sales — "New plan or upgrade": Explore plans, scope enterprise, or get a custom quote. Response time: < 4 hours. CTA: Start with a demo → /demo
  - Before you reach out: Your current team size; Main workflow goal; Timeline and budget
- Support — "Product help": Troubleshoot tools, workflows, integrations, or account issues. Response time: < 2 hours. CTA: Open a ticket → /help
  - Before you reach out: The tool or workflow in question; Steps to reproduce the issue; Your account email
- Demo — "Book a walkthrough": See the full system in 30 minutes with a product specialist. Response time: Same day. CTA: Book your demo → /demo
  - Before you reach out: Your primary use case; Team role and size; Any tools you're replacing
- Partnership — "Integrate or co-build": Agency, reseller, technology, or strategic partnership enquiries. Response time: < 24 hours. CTA: Submit enquiry → #form
  - Before you reach out: Partnership type; Your audience or client base; What you want to build together
- Implementation — "Build it with us": Scoped implementation, taxonomy build, and workflow migration. Response time: < 24 hours. CTA: Scope a project → #form
  - Before you reach out: Number of workflows to migrate; Current tool stack; Implementation timeline
- Press — "Media and research": Journalist, analyst, or research enquiries about Agentix. Response time: < 48 hours. CTA: Send a brief → #form
  - Before you reach out: Publication or institution; Topic or angle; Deadline if applicable

## Section: Send a message
- Eyebrow: Send a message
- Heading: We read every message. Actually.
- Body: No bots. No auto-close. A real Agentix team member will review your message and route it to the right person.
- Success state: Message received. We'll get back to you at the email you provided. Expected response: (route-specific time, default "< 24 hours").

## Forms
- Your name (placeholder: Alex Johnson) — required
- Work email (placeholder: alex@company.com) — required, type email
- Route (select, options = route labels/titles above)
- Message (placeholder: Describe what you're trying to accomplish...) — required, textarea
- Submit: Send message

## Section: Direct channels
- Eyebrow: Direct channels
- Heading: Prefer email? Here's where to send it.

### Channels (from data)
- Email — hello@agentix.ai — General and sales enquiries
- Support — support@agentix.ai — Product help and troubleshooting
- Security — security@agentix.ai — Vulnerability or data disclosures
- Press — press@agentix.ai — Media and analyst enquiries

## Section: Response commitments
- Eyebrow: Response commitments
- Heading: We're accountable to a timeline, not an auto-responder.
- SLA rows: Sales < 4 hours, Support < 2 hours, Demo Same day, Partnership < 24 hours, Implementation < 24 hours, Press < 48 hours (descriptions same as route selector above)

## Section: Escalation path
- Eyebrow: Escalation path
- Heading: Critical issue? Here's how it's handled.
- Body: Security incidents, data concerns, and platform-down events have a dedicated on-call path that bypasses the standard support queue.

### Escalation steps
- 01 Critical incident: Email security@agentix.ai immediately
- 02 Platform down: Check status.agentix.ai then email support
- 03 Data concern: Use the privacy contact form with subject: DATA
- 04 Billing dispute: Email myai@ai-agentix.com with your invoice number

## CTAs
- Security page → /security
- Status page → /status

## Section: Self-serve first
- Eyebrow: Self-serve first
- Heading: Most answers are already documented.

### Resources
- Docs: Setup, workflow builder, integrations, API → /docs
- Help center: Account, billing, tools, troubleshooting → /help
- FAQ: Common platform and pricing questions → /faq
- Status: Current system status and incidents → /status

## Section: Assistant quick-start
- Heading: Not sure which route to take?
- Body: Ask the Agentix assistant. It will recommend the right channel based on what you're trying to accomplish.
- CTA: Ask Agentix → /talk-to-agentix

## Final CTA (shared component, appears on this page)
- Eyebrow: 13 / Start here
- Heading: Start with one workflow.
- Subheading: Scale into an AI operating system.
- CTAs: Talk to Agentix → /talk-to-agentix; Book a Demo → /demo
- Badges: 14-day pilot, No credit card, Cancel anytime
