# AI Agentix Website Audit Report

**Site:** https://ai-agentix.com · **Audit date:** 27 October 2026 · **Type:** read-only audit of the live site
**Status update (27 Oct 2026):** fixes implemented on branch `fix/website-audit-2026-10`, **not yet deployed**.
Per-item status, test evidence and open decisions: [`WEBSITE_FIXES_COMPLETION_REPORT.md`](WEBSITE_FIXES_COMPLETION_REPORT.md).

## Corrections after reviewing the source code

The audit was done from the minified production bundle. With the source available:

- **Stack confirmed:** React 18 + Vite SPA (`frontend/`), Express API (`server/`) behind nginx (apparently with
  Caddy in front). No WordPress; obsolete **Vercel** files existed and were removed.
- **AGX-005:** the source had no client 404 page — unknown URLs rendered the home page. A real 404 page was added.
- **AGX-010:** a per-IP rate limit existed, but it read the first `X-Forwarded-For` value, which a client can
  spoof. Fixed. The assistant also failed on **every** message because the server's OpenAI key is invalid.
- **AGX-018:** the confirmed CEO name is **Anant Sanadhya**; the visible card said "Anand". An unused team data
  block also listed three people not shown on the site and fed them to the chatbot — removed.
- **AGX-027:** carousel images are rendered once per slide in source; the repeated requests seen in the audit
  were not reproduced.

## Findings and current status

| ID | Finding | Severity | Status |
|---|---|---|---|
| AGX-001 | Contact form never submits; fake success | Critical | Fixed & tested |
| AGX-002 | Newsletter fake "subscribed" | Critical | Fixed & tested |
| AGX-003 | No analytics / conversion tracking | High | Event hook ready; tool & consent need decision |
| AGX-004 | robots/sitemap point to aiagentix.in; incomplete | High | Fixed (redirects need server access) |
| AGX-005 | Same HTML for every URL; title typo; no OG/canonical; soft 404 | High | Fixed (real 404 status needs nginx) |
| AGX-006 | Missing security headers; version disclosure | High | Express fixed; nginx config prepared, not applied |
| AGX-007 | Unverified SOC 2 / ISO 27001 / HIPAA claims | High | Needs business confirmation |
| AGX-008 | 13 MB hero video, no poster | High | Fixed & measured |
| AGX-009 | JS/CSS uncompressed | High | Precompressed build; nginx `gzip_static` not applied |
| AGX-010 | /api/chat abuse protections | High | Fixed & tested |
| AGX-011 | Assistant looks like WhatsApp | Medium | Fixed |
| AGX-012 | Comparison block left-weighted | Medium | Fixed |
| AGX-013 | Comparison table clipped ≤375 px | Medium | Fixed |
| AGX-014 | Hero strip lopsided | Low | Fixed (mobile full-bleed) |
| AGX-015 | Contradictory delivery timelines | Medium | Needs approved wording |
| AGX-016 | Generic / wrong link destinations | Medium | Fixed |
| AGX-017 | Careers / Partner anchors broken | Medium | Fixed |
| AGX-018 | Placeholder leadership cards; names | Medium | Fixed (name confirmed) |
| AGX-019 | Superlatives; duplicated stats; 67% label | Medium | Label fixed; claims need decision |
| AGX-020 | Orange fails WCAG contrast | Medium | Fixed |
| AGX-021 | Form a11y and validation gaps | Medium | Fixed & tested |
| AGX-022 | Auto-moving carousel/marquee without pause | Medium | Fixed |
| AGX-023 | Mobile menu a11y and overlap | Medium | Fixed & tested |
| AGX-024 | Team modal focus/name | Low | Fixed |
| AGX-025 | Tabs without semantics | Low | Fixed & tested |
| AGX-026 | Preloader delays first content | Medium | Fixed |
| AGX-027 | Oversized images | Medium | Not done |
| AGX-028 | No code splitting | Low | Fixed (509 → 105 kB) |
| AGX-029 | Title separators; favicon.ico | Low | Fixed |
| AGX-030 | Health endpoint details | Low | Fixed |
| AGX-031 | Privacy policy out of date | Medium | Rewritten for DPDP; grievance details + legal review pending |
| AGX-032 | Reduced motion partly respected | Low | Fixed |
| AGX-033 | Hero text readability | Medium | Fixed |
| AGX-034 | Decorative "+" icons | Low | Fixed |
| AGX-035 | Back doesn't restore scroll | Low | Fixed & tested |
| AGX-036 | No skip link | Low | Fixed |

## Added after the audit (requested by the company)

- DPDP Act consent on every form + rewritten Privacy Policy and Terms.
- Leads stored on the server and delivered to email **and** a Google Sheet.
- Same-tab thank-you page for every form.
- Floating lead form bottom-right; WhatsApp bottom-left with the new number +91 92171 67347.
- Chatbot works without a paid AI key; AI use capped per day when a key is set.

The original detailed findings (evidence, root causes, recommended fixes) are in the audit document
supplied on 27 October 2026; this file tracks their resolution.
