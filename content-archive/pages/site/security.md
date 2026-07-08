# Security · route: /security · source: frontend/src/pages/site/SecurityPage.jsx

## Meta
- Title: Security / Agentix

## Section: Hero
- Eyebrow: Security
- Heading: Built for teams that handle sensitive work.
- Body: Agentix is infrastructure for real business operations — which means security, data governance, and access control are not afterthoughts. They're part of the platform architecture.
- Status bar: All systems operational — View status → /status

## Section: Security pillars
- Eyebrow: Security pillars
- Heading: Six areas that govern how your data is handled.

### Pillars (from data)
- Data handling: Your workflow data, inputs, outputs, and conversations are stored in your selected region and never transferred across jurisdiction boundaries without explicit consent.
  - Regional data residency; No cross-border transfer; At-rest AES-256 encryption; In-transit TLS 1.3
- Access controls: Role-based access control (RBAC) governs who can view, edit, run, and approve workflows. Every action is tied to an authenticated identity.
  - RBAC across all workflows; Granular tool-level permissions; SSO (Enterprise); MFA enforced on all accounts
- RAG and knowledge base: When Agentix references your internal knowledge base, retrieval is scoped strictly to documents you've granted permission for. No cross-account bleed.
  - Per-document permission scopes; No cross-account RAG bleed; Citation tracking on all outputs; Source attribution in every response
- Audit logging: Every workflow action, routing decision, human handoff event, and permission change is logged with timestamp, actor, and outcome — immutably.
  - Immutable event log; Per-workflow audit trail; Handoff event tracking; Exportable for compliance review
- AI model governance: Agentix does not use your data to train or fine-tune any AI model. Model outputs are deterministic within a session and never fed back into training pipelines.
  - No training on your data; Deterministic session context; Model version pinning on request; Enterprise model selection
- Incident response: Security incidents trigger a defined response playbook — isolation, investigation, notification, and remediation — with SLA commitments at each stage.
  - < 1h detection SLA; < 4h notification SLA; Named incident commander; Post-incident report within 7 days

## Section: Technical specifications
- Eyebrow: Technical specifications
- Heading: The implementation details, for those who need them.
- Body: Security teams reviewing Agentix for enterprise deployment can request our full security questionnaire and third-party audit reports via security@agentix.ai.

### Tech specs table (from data)
- Encryption at rest: AES-256-GCM
- Encryption in transit: TLS 1.3 minimum
- Authentication: OAuth 2.0 + MFA
- Session management: JWTs with short expiry + rotation
- Data residency: US, EU, APAC (region-selectable)
- Backup retention: 30-day encrypted snapshots
- Uptime SLA (Pro): 99.9%
- Uptime SLA (Enterprise): Custom, up to 99.99%

## Section: Compliance
- Eyebrow: Compliance
- Heading: Current status and roadmap.

### Compliance items (from data)
- GDPR — Compliant — Full data subject rights, DPA available
- SOC 2 Type II — In progress — Expected Q3 2026 — current report on request
- CCPA — Compliant — Consumer rights and data deletion honored
- ISO 27001 — Roadmap — Planned Q1 2027
- HIPAA — Enterprise — BAA available for qualifying enterprise accounts
- DORA — In progress — EU digital operations readiness by Q4 2026
- Note: Last updated: May 2026 · Compliance status is reviewed and updated quarterly

## Section: Data flow
- Eyebrow: Data flow
- Heading: Where your data goes. And where it doesn't.

### Data flow stages
- Your input: Goal, brief, or workflow trigger
- Agentix routing: Intent classification and tool selection
- Tool execution: AI model processes your specific input
- Output generation: Result stored in your regional endpoint
- Human review: Reviewer sees output with context
- Final action: Approved, rejected, or rerouted
- Note: Your data never exits your region. No cross-account context. No training pipeline. Every stage is logged and auditable.

## Section: Vulnerability disclosure
- Eyebrow: Vulnerability disclosure
- Heading: Found something? Tell us first.
- Body: Agentix operates a responsible disclosure program. Security researchers who identify and responsibly report vulnerabilities receive acknowledgment, updates on remediation, and recognition in our security changelog.
- CTA: Report a vulnerability → mailto:security@agentix.ai

### Disclosure process
- 01 Submit: Email security@agentix.ai with a detailed report and reproduction steps.
- 02 Acknowledge: We confirm receipt and assign a severity level within 24 hours.
- 03 Investigate: Our security team investigates and keeps you updated throughout.
- 04 Remediate: We fix the issue, notify affected accounts if applicable, and publish a changelog entry.

## FAQs
- Q: Is my data used to train AI models? / A: No. Your workflow data, inputs, outputs, and conversations are never used to train or fine-tune any AI model.
- Q: Where is my data stored? / A: Agentix stores data in the region you select during account setup — US (AWS us-east-1), EU (AWS eu-west-1), or APAC (AWS ap-southeast-1). Data does not cross regions.
- Q: Who can access my workflows and outputs? / A: Only authenticated users you've granted access to on your account. Agentix staff can access your data only in response to a documented support request, with your knowledge.
- Q: How do I request a security review or DPA? / A: Email security@agentix.ai with your account details and requirement. We respond within 24 hours with the relevant documents and a security review schedule.

## Section: Contact security team
- Chip: Security team
- Heading: Enterprise security review, DPA, or incident escalation?
- Body: The security team reviews all enterprise accounts directly. DPA, SOC 2 report, and security questionnaire responses are available within 24 hours.
- CTA: security@agentix.ai (mailto)
- Note: Response SLA: < 24 hours

## Final CTA (shared component, appears on this page)
- Eyebrow: 13 / Start here
- Heading: Start with one workflow.
- Subheading: Scale into an AI operating system.
- CTAs: Talk to Agentix → /talk-to-agentix; Book a Demo → /demo
- Badges: 14-day pilot, No credit card, Cancel anytime
