# Status · route: /status · source: frontend/src/pages/site/StatusPage.jsx

## Meta
- Title: System Status / Agentix

## Section: Hero (status summary)
- Current state (hasActive=true in current data): "Partial system degradation" — otherwise "All systems operational"
- Body (active): One or more services are experiencing issues. See below for details and live updates.
- Body (all clear): Agentix platform, assistant, workflow engine, integrations, and docs are all running normally.
- Timestamp: Last updated: May 6, 2026 at 14:45 UTC

## Section: Active incident banner
- Badge: Minor incident (or Major incident)
- Title: Webhook delivery degradation — APAC region
- Date: May 6, 2026

## Section: Services (from data)
- Table headers: Service, Status, Uptime (30d), Region
- Assistant routing — Operational — 99.98% — All regions
- Workflow engine — Operational — 99.97% — All regions
- Tool API gateway — Operational — 99.99% — All regions
- Integrations layer — Operational — 99.95% — All regions
- RAG knowledge base — Operational — 99.92% — US, EU
- Human handoff routing — Operational — 99.99% — All regions
- Audit logging — Operational — 100% — All regions
- Webhook delivery — Degraded — 98.40% — APAC — note: Elevated latency — investigating
- Dashboard app — Operational — 99.96% — All regions
- Docs and Help — Operational — 100% — CDN

## Section: History (30-day uptime)
- Heading: 30-day platform uptime.
- Legend: Operational, Incident, Maintenance
- Date range label: Apr 7 → May 6, 2026
- Notable days: Apr 11 (Maintenance), Apr 28 (Minor incident), May 6 (Active — APAC webhooks)

### Uptime summary stats
- 99.97% — Platform uptime (30d)
- 99.9% — SLA commitment
- 2 — Minor incidents
- 0 — Major incidents

## Section: Active incidents (Live updates)
- Heading: Live updates.
- Incident: Webhook delivery degradation — APAC region (minor severity, started May 6, 2026)
  - 14:32 UTC — Elevated latency detected in webhook delivery for APAC region. Investigation underway.
  - 14:18 UTC — Alert triggered by automated monitoring. Engineering team notified.

## Section: Past incidents
- Heading: Recent history.
- Apr 28, 2026 — Integrations layer — brief elevated error rate — 12 minutes — resolved
- Apr 11, 2026 — Scheduled maintenance — workflow engine upgrade — 18 minutes — resolved
- Mar 30, 2026 — Dashboard slowness — CDN misconfiguration — 6 minutes — resolved
- Mar 14, 2026 — Assistant routing — elevated latency — 9 minutes — resolved

## Section: Maintenance
- Eyebrow: Maintenance
- Heading: Scheduled maintenance is announced 7 days in advance.
- Body: Planned maintenance windows are posted here and sent via email to all accounts 7 days before the event. Maintenance never runs during peak business hours.
- Status: No scheduled maintenance in the next 30 days.

## Section: Subscribe
- Eyebrow: Status updates
- Heading: Get notified when something changes.
- Body: Subscribe to status updates by email. You'll receive incident alerts, maintenance notices, and all-clear confirmations — nothing else.
- Note: Status updates only. No marketing. Unsubscribe anytime.

## Forms
- Email (placeholder: your@email.com) — submit: Subscribe

## Final CTA (shared component, appears on this page)
- Eyebrow: 13 / Start here
- Heading: Start with one workflow.
- Subheading: Scale into an AI operating system.
- CTAs: Talk to Agentix → /talk-to-agentix; Book a Demo → /demo
- Badges: 14-day pilot, No credit card, Cancel anytime
