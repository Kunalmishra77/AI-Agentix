# FAQ · route: /faq · source: frontend/src/pages/site/FAQPage.jsx

## Meta
- Title: FAQ / Agentix

## Section: Hero
- Heading: Questions answered. No boilerplate.
- Body: Real answers about the platform, tools, workflows, pricing, security, and human handoff — organized by topic.
- Search placeholder: Search all FAQ topics...

## Section: Category tabs
- Categories: Platform, Tools, Workflows, Pricing, Security, Human handoff

## FAQs — Platform
- Q: What is Agentix? / A: Agentix is an AI operating system for business — a single connected layer that replaces scattered manual workflows with goal-to-output automation across 9 domains, 38 subcategories, and 130+ tools.
- Q: How is Agentix different from ChatGPT or other AI tools? / A: ChatGPT generates content. Agentix runs a business workflow — from goal statement to reviewed output to human handoff. It organizes AI tools into a structured taxonomy and routes work through the right sequence.
- Q: What does "one operating layer" mean? / A: Instead of using 15 separate tools that don't talk to each other, Agentix connects the goal, the tools, the review step, and the human handoff into a single governed flow.
- Q: Is Agentix a no-code platform? / A: Yes, for most workflows. The assistant lets you describe your goal and Agentix builds the workflow path. Technical teams can also use the API and webhook layer for custom integrations.
- Q: Can I use Agentix for one specific workflow before expanding? / A: That's the recommended starting point. Start with one workflow — content production, sales pipeline, or ops reporting — and expand once you see results.

## FAQs — Tools
- Q: What is a "tool" in Agentix? / A: A tool is a discrete AI-powered function within a category — for example, "Cold Email Writer" inside Sales → Outbound. Each tool has defined inputs, outputs, review rules, and handoff logic.
- Q: How many tools are there? / A: The current platform includes 130+ tools across 9 categories and 38 subcategories. New tools are added regularly and announced in the changelog.
- Q: Can I use a tool without setting up a full workflow? / A: Yes. Tools can be accessed directly via the tool explorer or assistant routing. You don't need a full workflow to run a single tool.
- Q: Can I build custom tools? / A: On Pro and Enterprise plans, you can configure custom tool parameters, input schemas, and output templates. Full custom tool builds are part of the Enterprise implementation package.

## FAQs — Workflows
- Q: What is a workflow in Agentix? / A: A workflow is a sequence of goals, inputs, tool executions, review checkpoints, and handoff actions — from initial intent to a reviewed, routed output.
- Q: How do I start a workflow? / A: State your goal to the assistant. It will recommend a workflow path. You can also browse templates in the Solutions section or build from scratch in the workflow builder.
- Q: Can workflows run automatically? / A: Yes. Trigger-based workflows run on a schedule, on a system event (new lead in CRM, new ticket in support), or on webhook payload. Human review steps pause the flow until approved.
- Q: What happens when a workflow needs human input? / A: The workflow pauses and routes to the designated reviewer with full context — the goal, the tool output, the review question, and the required action. No context is lost between steps.

## FAQs — Pricing
- Q: Is there a free trial? / A: Every paid plan includes a 14-day free trial with full access and no credit card required.
- Q: What's included in the Starter plan? / A: Starter includes 1 active workflow, 5 tools, basic assistant routing, and access to Docs and Help. It's designed for a single team proving out one workflow before expanding.
- Q: How does the annual discount work? / A: Annual plans are billed once per year at a 20% discount compared to the monthly rate. The discount applies to all paid plans.
- Q: Can I change my plan later? / A: Yes. Upgrades take effect immediately with prorated billing. Downgrades take effect at the next billing cycle.
- Q: What does Enterprise pricing look like? / A: Enterprise is scoped based on team size, workflow count, integration requirements, and implementation needs. Contact sales to receive a custom quote within 24 hours.

## FAQs — Security
- Q: Where is my data stored? / A: Agentix runs regional endpoints. Your data is stored in the region you select during account setup and never transferred to other regions without your explicit permission.
- Q: Is my data used to train Agentix? / A: No. Your workflow data, assistant conversations, and outputs are never used to train Agentix models.
- Q: What access controls are available? / A: Pro and Enterprise plans include role-based access control (RBAC), workflow-level permissions, and audit logging. Enterprise adds SSO and custom permission schemas.
- Q: Is Agentix SOC 2 compliant? / A: Agentix is currently pursuing SOC 2 Type II. The compliance roadmap is published on the security page. Enterprise accounts receive the current report and audit timeline on request.

## FAQs — Human handoff
- Q: What triggers human handoff? / A: Handoff triggers are configured per workflow — examples include: content that makes financial claims, legal-adjacent recommendations, customer escalation signals, and manual review checkpoints.
- Q: Who receives the handoff? / A: You designate reviewers per workflow step. The reviewer receives a structured summary: goal, tool output, risk flags, and the required action. They approve, reject, or reroute.
- Q: Can handoff go to an external person? / A: Yes. Handoff can route to internal users, external email addresses, Slack channels, or a webhook endpoint for integration with your existing review process.
- Q: What happens if no one reviews the handoff? / A: The workflow pauses and sends an escalation reminder at configured intervals (e.g., 4h, 24h). After the escalation period, it routes to a fallback reviewer or closes with a logged reason.

## Statistics
- 6 — topic categories
- 25 — total questions (computed from data: sum of items across 6 categories)
- < 30s — average read time
- Updated — monthly

## Section: Go deeper (documentation)
- Eyebrow: Go deeper
- Heading: Documentation for specific topics.

### Docs links
- Getting started: First workflow setup and assistant intro → /docs/getting-started
- Workflow builder: Full guide to building and automating workflows → /docs/workflows
- Integrations: Connect CRM, email, docs, and more → /integrations
- Security model: Data handling, access controls, and compliance → /security
- API and webhooks: Technical reference for custom integrations → /docs/api-webhooks
- Pricing guide: Plan comparison, limits, and add-ons → /pricing

## Section: Didn't find your answer?
- Eyebrow: Didn't find your answer?
- Heading: A real person can help.
- Body: Agentix support responds within 2 hours on business days. No bots, no auto-close, no generic answers.

## CTAs
- Contact support → /contact
- Browse help center → /help

## Section: Assistant
- Eyebrow: Assistant
- Heading: Ask Agentix directly.
- Body: The assistant can answer any question about the platform, route you to the right tool, and build a workflow from your goal — all in one conversation.
- CTA: Talk to Agentix → /talk-to-agentix
- Assistant panel message: Ask me any question about the platform. I can also route you to the right tool, workflow, or human contact.
- Suggested chips: Pricing, How handoff works, Tool discovery, Getting started

## Section: Feedback
- Heading: Was this page helpful?
- Buttons: "Yes, this answered my question" / "No, I need more help" → /contact
- Note: This page is updated monthly. Last updated: May 2026.

## Final CTA (shared component, appears on this page)
- Eyebrow: 13 / Start here
- Heading: Start with one workflow.
- Subheading: Scale into an AI operating system.
- CTAs: Talk to Agentix → /talk-to-agentix; Book a Demo → /demo
- Badges: 14-day pilot, No credit card, Cancel anytime
