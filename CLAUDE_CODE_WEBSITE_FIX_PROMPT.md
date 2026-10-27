# Website Fix Brief — Execution Record

This records how the fix brief (supplied 27 October 2026, based on `WEBSITE_AUDIT_REPORT.md`) was carried out
and what is still open. Full detail: [`WEBSITE_FIXES_COMPLETION_REPORT.md`](WEBSITE_FIXES_COMPLETION_REPORT.md).

## Answers to the brief's questions

| Question | Answer used |
|---|---|
| Where should leads go? | Stored on the VPS first, then emailed (Gmail SMTP) and appended to a Google Sheet. Credentials pending. |
| Newsletter provider? | None yet — emails are collected with consent; choose a sending tool later. |
| Canonical domain | `ai-agentix.com` (the live site and company email domain) — please confirm. |
| Certifications held | Not yet confirmed — claims unchanged, listed for review. |
| Analytics | Not chosen — `generate_lead` hook in place. |
| WhatsApp number | +91 92171 67347 (WhatsApp bot line); calls stay on +91 92170 64245. |
| CEO name | Anant Sanadhya. |
| Thank-you approach | Dedicated `/thank-you` route, same tab, `noindex`, `replace` navigation. |

## Phase status

| Phase | Status |
|---|---|
| A0 / A — real lead capture, validation, honeypot, rate limit, thank-you | Done & tested (production credentials pending) |
| B — title, meta, OG, canonical, JSON-LD, prerendered routes, sitemap, robots, 404, API hardening | Done; nginx part prepared in `deploy/`, not applied |
| C — video, compression, preloader, code splitting | Done; responsive image variants (AGX-027) not done |
| D — layout & responsive | Done |
| E — links & content | Done except claims/timelines/stats awaiting approval |
| F — accessibility | Done |
| G — privacy | Privacy Policy and Terms rewritten for DPDP (beyond the brief, at the company's request) |
| Deployment | Not started — needs VPS access details |

## Ground rules followed

- No redesign, no framework change; brand kept (deeper orange only where contrast required it).
- No secrets in frontend code; server secrets only in `server/.env` (git-ignored); `.env.example` has placeholders.
- No production changes, no real customer data in tests (mock SMTP and mock Google Sheet).
- Compliance claims and legal facts not invented; items needing approval are listed in the completion report.
