# Talk to Agentix · route: /talk-to-agentix · source: frontend/src/pages/site/TalkPage.jsx

## Meta
- Title: Talk to Agentix / The AI Assistant

## Section: Hero
- Eyebrow: Assistant
- Heading: Start talking. The system routes the rest.
- Body: Describe a goal, a problem, or a question. The Agentix assistant recommends the right category, tool, workflow, or human — in seconds.
- Input placeholder: Tell Agentix what you're trying to accomplish...
- Submit: Ask
- Prompt chips: "Build a content workflow", "Find a sales tool", "Compare plans", "How does handoff work?"

## Section: In action (live conversation examples)
- Eyebrow: In action
- Heading: Real conversations. Real routing.
- Tabs: Content team, Sales team, Operations

### Example conversation — Content team
- User: I need to produce 20 pieces of content a week but my team is at capacity.
- AI: Got it. That's a Content & Creative Production workflow. I'm seeing three tools that fit: Content Brief Generator, SEO Brief Builder, and Article Writer. Want me to build the stack?
- User: Yes, and I need human review before anything publishes.
- AI: Configured. Every output goes to your designated reviewer before routing to the CMS. I've attached the handoff rule to the workflow. Here's your first draft path.

### Example conversation — Sales team
- User: We're losing deals because follow-up is inconsistent. Can Agentix fix that?
- AI: Yes — this is a Sales workflow. I'll connect Outreach Sequencer, CRM Updater, and Deal Risk Scorer. Inconsistent follow-up usually means you need a trigger rule. Should I add one?
- User: Yes. Trigger follow-up 24 hours after no reply.
- AI: Done. The sequence now auto-triggers at 24h and 72h with no reply. Human handoff fires if a deal shows high-risk signals. Your pipeline visibility just improved significantly.

### Example conversation — Operations
- User: I spend 3 hours a week on status reports. There has to be a better way.
- AI: Absolutely. Operations & Automation — specifically Reporting & Analytics. I'll pull the inputs from your connected systems, generate the report, and route it for your review. You only touch the exceptions.
- User: What systems does it pull from?
- AI: Any connected integration: CRM, Airtable, Google Sheets, or a custom API. You specify the data sources and the report format once. After that it runs automatically on your schedule.

## Section: Use cases
- Eyebrow: Use cases
- Heading: Six things the assistant handles best.

### Use cases (from data)
- Find the right tool for a goal — example: "What tool handles social media scheduling?"
- Build a workflow stack — example: "Build me a full content production stack."
- Compare plans — example: "Which plan do I need for 3 teams and 20 workflows?"
- Get implementation guidance — example: "How do I migrate from HubSpot to Agentix sales workflows?"
- Diagnose a workflow problem — example: "Why is my review step creating a bottleneck?"
- Book a demo or talk to a human — example: "I want to talk to someone about enterprise pricing."

## Section: Routing logic
- Eyebrow: Routing logic
- Heading: Intent → Category → Tool → Workflow → Human.
- Body: The assistant doesn't guess. It maps your stated intent to the 9-domain taxonomy, identifies the best tool or workflow match, and — when needed — routes to a person with full context attached.
- CTA: Read the routing docs → /docs

### Routing steps
- Input — Goal or question
- Intent — Intent classification
- Domain — Category mapping
- Tool — Tool recommendation
- Action — Workflow or handoff

## Section: Input modes
- Eyebrow: Input modes
- Heading: Voice or text. Your preference.

### Modes
- Voice entry: Speak your goal naturally. The assistant transcribes, classifies intent, and routes — no special commands needed. Chip: Works on all devices
- Text / search entry: Type your question or goal. Same routing, same results — works in any environment where mic access isn't available. Chip: Full keyboard support
- Assistant dock: The floating assistant is available on every page. One click opens the routing interface wherever you are in the system. Chip: Persistent on all pages

## Section: Privacy
- Eyebrow: Privacy
- Heading: Your conversations are private by design.
- Body: The assistant is a routing layer — not a data collection system. What you tell it stays within your account, not a training dataset.
- CTA: Security and privacy → /security

### Privacy points
- No conversation logging by default: Sessions are not stored unless you enable conversation history.
- Data stays in your region: Agentix runs regional endpoints — your data doesn't cross jurisdiction boundaries.
- No training on your conversations: Your inputs are never used to train Agentix models.
- Enterprise DPA available: Full data processing agreement for enterprise accounts on request.

## Section: Enterprise
- Eyebrow: Enterprise
- Heading: For teams that need a custom assistant layer.

### Enterprise features
- Custom routing rules: Configure exactly how the assistant routes goals within your taxonomy — by team, role, or workflow type.
- Knowledge base integration: Connect your internal documentation, SOPs, and FAQs so the assistant cites your content, not general knowledge.
- Branded assistant: Run the assistant under your own brand and domain with custom prompts and response tone.
- Audit logging: Full log of every routing decision, tool recommendation, and human handoff event for compliance review.

- CTA: Talk to sales about enterprise → /contact

## Section: CTA — try it now (voice section)
- Heading: Start with a question. End with a working workflow.
- Body: No setup. No configuration. Just describe what you're trying to accomplish.
- Input placeholder: What are you trying to build or solve today?
- Submit: Go
- Prompt chips: "Find tools for my content team", "Build a sales workflow", "What's the right plan?"

## Final CTA (shared component, appears on this page)
- Eyebrow: 13 / Start here
- Heading: Start with one workflow.
- Subheading: Scale into an AI operating system.
- CTAs: Talk to Agentix → /talk-to-agentix; Book a Demo → /demo
- Badges: 14-day pilot, No credit card, Cancel anytime
