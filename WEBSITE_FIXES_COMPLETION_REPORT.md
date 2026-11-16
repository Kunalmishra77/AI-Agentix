# AI Agentix Website — Fixes Completion Report

**Branch:** `fix/website-audit-2026-10` (from `master` @ `80ba5d3`) · **Date:** 27–28 October 2026
**Deployment status:** **DEPLOYED to the VPS on 28 October 2026** (commit `29bd759`, merged PR #1) and verified on
https://ai-agentix.com — see §12.

Status legend: **✅ Tested** = implemented and verified (automated test and/or real browser) ·
**🟡 Implemented** = done, not fully verifiable locally · **⏳ Needs decision/credential** · **❌ Not done**

---

## 1. Summary

- **Leads were being lost — fixed.** All five website forms now submit to a real endpoint (`POST /api/leads`).
  Each lead is saved on the server first, then emailed and added to a Google Sheet, with automatic retry.
  Visitors see the thank-you page (same tab) **only** after the server confirms the lead was saved.
- **DPDP consent** (unticked checkbox, call/WhatsApp/SMS/email "once or more than once", incl. DND) is
  required on every form and stored with each lead; marketing opt-in is a separate, optional box.
  **Privacy Policy and Terms rewritten** for the DPDP Act 2023 / Rules 2025.
- **Floating UI:** lead form (the `lead-widget` skill kit) bottom-right; WhatsApp bottom-left with the new
  number **+91 92171 67347**; AI assistant restyled as "Ask AI" (no longer looks like WhatsApp).
- **Chatbot fixed:** it returned an error for every message because the OpenAI key on the server was
  invalid. It now works without any key (free rule-based mode) and uses AI only when a valid key is set,
  with a hard daily cap.
- **SEO, performance, accessibility, layout** fixes from the audit; Vercel leftovers and 10 unused packages
  removed. There were **no WordPress dependencies** in the codebase (only marketing copy that names
  WordPress as an integration, which is correct and kept).

## 2. Lead-capture architecture (where future leads go)

```
Website form ──POST /api/leads──▶ Express (server/)
  • origin check, honeypot + min fill time, rate limit 5/min & 30/day per IP
  • server-side validation per form, consent required
        │
        ▼ 1. saved to LEADS_DIR/leads.jsonl on the VPS  ← always first; only then "success"
        ├─▶ 2. email to LEAD_NOTIFY_TO (Gmail SMTP with an App Password)
        └─▶ 3. row in Google Sheet (Apps Script web app + secret token)
             failed 2/3 are retried every 5 min and on restart (notifications.jsonl)
```

| Form | Page | Endpoint | Thank-you |
|---|---|---|---|
| Free AI Audit | /contact | /api/leads (`audit`) | /thank-you?type=audit |
| Book a Demo | /contact | /api/leads (`demo`) | /thank-you?type=demo |
| Partnership | /contact | /api/leads (`partner`) | /thank-you?type=partner |
| Floating consultation form | every page (auto-opens on home) | /api/leads (`popup`, multipart) | /thank-you?type=popup |
| Newsletter | footer, every page | /api/leads (`newsletter`) | /thank-you?type=newsletter |

Why this design: email alone can silently lose leads (spam folder, SMTP outage, wrong password). A file on
the server is the source of truth; email and the Sheet are notifications. No database or paid service is
needed. `npm run leads` lists/exports leads and shows anything not yet delivered. Details: `server/README.md`.

**Verified locally (mock SMTP inbox + mock Google Apps Script, no real email sent):** lead stored → email
received with correct fields and escaped HTML → Sheet row appended; with both mocks failing the visitor
still got success (lead saved), and after the mocks recovered the background retry delivered both (0 pending).

**Not yet active in production:** needs the Gmail App Password and the Sheet URL in `server/.env` (§10).

## 3. Thank-you page

- Route `/thank-you` (prerendered, `noindex`), form-specific message, "What happens next", WhatsApp and
  Home buttons, links to Solutions / Case Studies / Industries / AI Studio.
- Navigation is in the **same tab** (`navigate(..., { replace: true })` for site forms; the lead widget is
  configured with `openThankYouInNewTab: false`).
- Tested: double-click submit → 1 request; refresh of thank-you → no new request; Back → no resubmit;
  500 / network error / 15 s timeout → error panel with Retry + WhatsApp + Email, input kept, no redirect.
- `generate_lead` (GA4 `gtag` and GTM `dataLayer`) fires only after server success, without personal data.
  No analytics is installed yet (AGX-003, needs decision).

## 4. Status of every audit item

| ID | Item | Status | How verified / notes |
|---|---|---|---|
| AGX-001 | Contact form fake success | ✅ | Playwright: validation, consent, 1 request on double-click, same-tab thank-you, 500/offline/timeout paths; 18 server tests |
| AGX-002 | Newsletter fake success | ✅ | Playwright: invalid email, consent required, thank-you after save |
| AGX-003 | Analytics / conversion | ✅ / ⏳ | GA4 with consent banner (Consent Mode v2), `generate_lead`, WhatsApp/phone/email/assistant events — tested with a dummy ID; needs your real `G-…` ID |
| AGX-004 | robots/sitemap wrong domain | ✅ | robots.txt → ai-agentix.com; sitemap generated at build: 35 URLs with lastmod. www/aiagentix.in redirects need server access |
| AGX-005 | Same HTML for every URL, title, OG, soft 404 | ✅ / 🟡 | Per-route HTML with title/description/canonical/OG/Twitter (+ Organization JSON-LD on home), 404 page `noindex`, bad slugs → 404. Real HTTP 404 status needs the nginx change |
| AGX-006 | Security headers, version disclosure | 🟡 | Express: x-powered-by off, nosniff/frame/referrer (tested). nginx headers + CSP (Report-Only) in `deploy/` — not applied |
| AGX-007 | Compliance claims (SOC 2, ISO, HIPAA) | ✅ | Rewritten to accurate wording (§7) — no certification is claimed |
| AGX-008 | 13 MB hero video | ✅ | Poster 75 kB paints first; 480p 1.4 MB / 720p 3.1 MB / 1080p 7.1 MB chosen by width after load; none with reduced motion / Save-Data |
| AGX-009 | Uncompressed JS/CSS | 🟡 | Build writes .br/.gz (1177 kB → 316 kB). nginx `gzip_static` not applied |
| AGX-010 | /api/chat abuse | ✅ | Rate limit on real client IP (was spoofable via X-Forwarded-For), message 1000 chars, history 6, 20 s timeout, daily AI cap, origin check, no stack traces; prompt-injection test refused |
| AGX-011 | Assistant looks like WhatsApp | ✅ | "Ask AI" button, AI + privacy notice, real WhatsApp separate (bottom-left) |
| AGX-012 | Comparison block left-weighted | ✅ | Full content width (screenshot 1280) |
| AGX-013 | Table clipped ≤375 px | ✅ | Stacked cards below `sm`; no overflow at 320–1920 |
| AGX-014 | Hero strip lopsided | ✅ | Full-bleed on mobile; desktop bleed-left kept (looked intentional) |
| AGX-015 | Contradictory timelines | ✅ | Approved wording applied: first automation ~2 weeks, full rollout 4–10 weeks |
| AGX-016 | Wrong/generic links | ✅ | Footer → detail pages; home Solutions tabs + /solutions cards → detail pages; "See Results"; "video coming soon" hidden |
| AGX-017 | Careers / Partner anchors | ✅ | Careers link removed; `/contact#partnerships`, `#demo`, `#audit` open the right form |
| AGX-018 | TBA cards, names | ✅ | TBA cards removed; CEO name corrected to **Anant Sanadhya** (confirmed by you); grid aligned with heading. Anant has no bio → no "View profile" yet |
| AGX-019 | Superlatives, duplicate stats | ✅ | Superlatives replaced; ROI block no longer repeats Track Record numbers; 67% label fixed |
| AGX-020 | Orange contrast | ✅ | Orange text on light backgrounds #C2410C (5.18:1), buttons #CC4A12 (4.61:1), dark sections keep #F26522 (5.84:1), red metrics #B91C1C |
| AGX-021 | Form a11y + validation | ✅ | name/autocomplete, aria-invalid/describedby, alert summary, phone rule = server rule, neutral placeholder |
| AGX-022 | Carousel/marquee no pause | ✅ | Pause/play buttons, pause on hover + focus, no autoplay with reduced motion, 24 px dots |
| AGX-023 | Mobile menu a11y + overlap | ✅ | aria-expanded/controls, focus to Close, focus trap, Escape, focus returns; floating buttons hidden while open |
| AGX-024 | Team modal | ✅ | aria-labelledby, focus trap, Escape, focus return |
| AGX-025 | Tabs semantics | ✅ | WAI-ARIA tabs + arrow/Home/End keys (tested) |
| AGX-026 | Preloader | ✅ | Removed on first render, no font wait |
| AGX-027 | Oversized images | ❌ | Not done: responsive image variants (400/800/1200) not generated. Hero, carousel lazy-load/size attributes improved only |
| AGX-028 | No code splitting | ✅ | Main bundle 509 kB → 105 kB |
| AGX-029 | Titles, favicon.ico | ✅ | "Page — AI Agentix" everywhere; favicon.ico added |
| AGX-030 | /api/health details | ✅ | Returns `{ ok: true }` |
| AGX-031 | Privacy policy | ✅ | Rewritten for DPDP (§5) incl. Grievance Officer and registered address; legal review still recommended |
| AGX-032 | Reduced motion | ✅ | MotionConfig `reducedMotion="user"`, video + carousel + rotating word respect it |
| AGX-033 | Hero readability | ✅ | Stronger left/overall overlay; subtitle opacity raised (visual check on bright frames) |
| AGX-034 | Decorative "+" | ✅ | Removed |
| AGX-035 | Back doesn't restore scroll | ✅ | New page → top; Back → previous position (tested) |
| AGX-036 | Skip link | ✅ | "Skip to content" → `main#main` |

## 5. DPDP Act — what was done

**The law in short.** The Digital Personal Data Protection Act, 2023 applies to personal data collected
digitally in India. The DPDP Rules, 2025 were notified on 13–14 November 2025 with staggered dates; most
Data Fiduciary duties (notice — Rule 3, consent, security, breach, retention) apply **18 months after
notification (≈ May 2027)**. Doing it now avoids a rush later and matches what enterprise buyers ask for.
Key duties: a clear, itemised notice; consent that is free, specific, informed, unambiguous and given by a
clear affirmative action (an unticked box); separate purposes not bundled; withdrawal as easy as giving
consent; respond to grievances within 90 days; publish how people can exercise their rights; reasonable
security and breach notification; delete data when no longer needed. *This is not legal advice.*

**Implemented**
- Every form: an **unticked** consent box (required) — contact about this enquiry by call / WhatsApp /
  SMS / email, once or more than once, even on DND — plus withdrawal text and Privacy Policy link.
- Separate **optional** marketing opt-in; newsletter has its own email-marketing consent.
- The server refuses submissions without consent and stores the consent record (time, notice version
  `2026-10-27`, marketing yes/no) with each lead; it is shown in the email and the Sheet.
- Privacy Policy rewritten to match what the site really does: data collected, purposes, DND calls,
  processors (hosting, Google Gmail/Sheets, OpenAI only in AI mode, WhatsApp), cross-border transfer,
  retention (enquiries up to 24 months after last contact), rights, how to make a request, 30-day target /
  90-day limit, grievance contact, complaint to the Data Protection Board, children, notice in other
  languages. Removed statements that weren't true of this site (Google Analytics/Hotjar, AWS Mumbai,
  AES-256, TLS 1.3, "never share your data").
- Terms: website use, communications consent, AI assistant disclaimer, client-data processor clause.

**Added 28 Oct:** Grievance Officer **Vital Sai (CMO)**, registered address **T-1, Pankaj Arcade, Plot No. 16,
Sector 5, Dwarka, New Delhi 110075** (Privacy Policy, Terms, footer, contact page, Organization JSON-LD,
assistant). Analytics section describes GA4 with opt-in cookies. Still recommended: legal review and
confirming the 24-month retention period.

## 6. Floating lead form and WhatsApp

- **Lead form (bottom-right):** the installed `lead-widget` skill's own JS/CSS kit (`public/lead-widget/`),
  configured in `public/lead-widget/config.js`. Changes to the kit: a required consent checkbox; it posts to
  our Express `/api/leads` (the skill's PHP mailer can't run here — this site has no PHP); thank-you in the
  same tab. Auto-opens on the home page for 3 s (skill default), Esc/X minimises, `data-lead-open` works.
- **WhatsApp (bottom-left):** `wa.me/919217167347`, new tab, from one setting (`contactInfo` in
  `frontend/src/data/site.js`). All "WhatsApp us" links now use this number. The **call** number
  (+91 92170 64245) is unchanged.
- **AI assistant:** "Ask AI" pill stacked above the lead-form icon; back-to-top above WhatsApp.
- Verified: positions at 375 px and 1280 px, no overlap, all hidden while the mobile menu is open.

## 7. Claims, stats and timelines — what was changed (28 Oct, as instructed)

No certification is claimed any more; wording describes what the company actually does.

| Before | After |
|---|---|
| "SOC 2 — Compliant" badge (contact hero) | "Free — AI Audit" |
| "SOC 2 compliant, ISO 27001 aligned … TLS 1.3 … AES-256 … AWS Mumbai" (contact FAQ) | encrypted in transit and at rest, access limited to the project team, DPDP Act, India hosting on request, NDA + DPA |
| "SOC 2 Type II certified / compliant infrastructure" (finance, HRMS) | encryption, role-based access, audit logs, Indian data residency available |
| "Compliant with ISO 27001" (manufacturing) | encryption, role-based access and audit logs |
| HIPAA answers (healthcare, hospital management) | DPDP Act; HIPAA or other frameworks designed in and agreed in contract when required |
| "ISO 27001 aligned", "0 data breaches since founding", "99.6% uptime" (About) | security-by-design bullets; "NDA & data processing agreement on request"; "Proactive monitoring after go-live" |
| "SOC 2 Compliant", "99.97% uptime SLA", "Hosted in India (AWS Mumbai)", "breach notification within 72 hours" (Technology) | "Encrypted in transit & at rest", "Built for DPDP Act 2023", "India hosting available", "Audit logs on every action" |
| "India's Fastest Growing AI Consulting Company" | "End-to-End AI Automation Partner" |
| "India's #1 end-to-end AI automation partner" | "End-to-end AI automation partner for growing businesses …" |
| "India's most advanced AI-powered content studio" | "an AI-powered content studio" |
| "Results guaranteed" | "Milestones tied to your KPIs" |
| "Verified by clients across India" | "From real client deployments across India" |
| ROI block repeated 8x / 200+ / 97% | 12x faster, 60% cost cut, < 90 s lead response, 24/7, ~2 weeks to first automation |
| "CEO, MedPlus Neighbourhood" (real national brand, didn't match a 15-outlet client) | "Founder, Pharmacy Chain (15 Outlets)" |
| Timelines: 14-day / 2–4 weeks / 6–10 weeks / two weeks | "First automation in ~2 weeks; full rollout typically 4–10 weeks" (per-agent "2–4 weeks" build times kept) |

Kept as the company's own figures: 200+ businesses, 97% satisfaction, ₹50 Cr+, 8x ROI, 4.9/5, named
testimonials on the case-studies page — keep evidence for these on file (ASCI).

## 8. Files changed (main)

- **Server:** `server/src/app.mjs` (new, Express app), `leads.mjs` (new), `intents.mjs` (new, free mode),
  `server.mjs`, `prompt.mjs`, `scripts/leads.mjs`, `test/*.test.mjs`, `docs/google-sheet-apps-script.gs`,
  `.env.example`, `README.md`, `package.json` (+multer, +nodemailer, tests, Node ≥ 20).
- **Frontend:** `ContactForms.jsx`, `SiteFooter.jsx`, `AssistantWidget.jsx`, `SiteNav.jsx`, `Hero.jsx`,
  `WhyUs.jsx`, `CaseStudies.jsx`, `Testimonials.jsx`, `Solutions.jsx`, `Industries.jsx`,
  `SolutionsCatalog.jsx`, `SolutionsDemo.jsx`, `AboutLeadership.jsx`, `HowItWorks.jsx`, `LegalLayout.jsx`,
  new `ThankYouPage`, `NotFoundPage`, `Seo`, `ConsentCheckbox`, `WhatsAppFloat`, `lib/leads.js`,
  `lib/seo.js`, `lib/useFocusTrap.js`, `lib/tabKeys.js`, `data/consent.js`, `data/legal.js`, `data/site.js`,
  `data/contact.js`, `data/home.js`, `App.jsx`, `main.jsx`, `index.html`, `index.css`, `tailwind.config.js`,
  `vite.config.js`, `scripts/prerender-meta.mjs`, `scripts/compress-dist.mjs`, `public/lead-widget/*`,
  `public/home/hero-*`, `public/og-default.jpg`, `public/favicon.ico`, `public/robots.txt`.
- **Removed:** `frontend/vercel.json`, `frontend/api/` (Vercel copy of the chat function + duplicate
  knowledge files), `.vercelignore`, `frontend/.env.production` (unused `VITE_API_URL`), `public/sitemap.xml`
  (now generated), the 28 MB hero video, unused `AboutTeam` + its data (listed people not shown on the site);
  npm packages `openai, axios, @tanstack/react-query, react-hook-form, @hookform/resolvers, zod, date-fns,
  lottie-react, @lottiefiles/dotlottie-react, react-intersection-observer`.
- **Deploy:** `deploy/deploy.sh`, `deploy/nginx-recommended.conf`, `deploy/nginx-agx-security-headers.conf`.

## 9. Tests and results

| Check | Result |
|---|---|
| `server: npm test` | **18/18 pass** (validation, consent, honeypot, origin, multipart widget, rate limit, past date, malformed JSON, health, chat cap, formula-safe Sheet cells, intents) |
| `frontend: npm run build` | pass; 35 routes prerendered + 404 + thank-you; sitemap; brotli 1177 → 316 kB |
| Lint | the project has no lint script/config — not run |
| `npm audit` server | 0 vulnerabilities |
| `npm audit` frontend | Remaining: vite/esbuild (dev server only — not in the production build) and react-router 6 open-redirect advisories; both need major upgrades (Vite 8, React Router 7) — recommended follow-up. Assistant navigation is restricted to internal paths. |
| Responsive sweep | 13 pages × 9 widths (320–1920) = 117 loads: **0 horizontal overflow, 0 console errors** |
| Forms (Playwright) | empty, invalid email/phone, missing consent, valid, double-click, 500, offline, timeout, refresh, Back — all as expected |
| Delivery | mock SMTP + mock Apps Script: delivered; outage → stored + retried → delivered |
| Keyboard | mobile menu (focus/Escape/return), tabs (arrows), modal, carousel buttons |
| Chatbot | live site: **500 on every message** (invalid OpenAI key). Locally with the key you provided: correct answers incl. Hindi/Hinglish, prompt-injection refused; without key: free mode answers |

**Performance (home, before = live site, after = new build on local preview; different networks, so treat
as directional; video bytes on the live site were still streaming):**

| | Before mobile | After mobile | Before desktop | After desktop |
|---|---|---|---|---|
| JS transferred | 865 kB | 170 kB | 865 kB | 170 kB |
| FCP | 3.7 s | 0.6 s | 2.1 s | 1.2 s |
| LCP | 4.9 s | 2.3 s | 5.8 s | 4.0 s |
| CLS | 0.001 | 0 | 0.001 | 0.001 |
| Hero video file | 28 MB (13.3 MB as served) | 1.4 MB | same | 3.1–7.1 MB |

Lighthouse was not run (not installed); re-measure on the live site after deployment.

## 10. Deployment status and steps

**Not deployed yet.** Step-by-step instructions (GitHub → VPS, Gmail, Google Sheet, Google Analytics, nginx) are in
[`deploy/DEPLOY_STEPS.md`](deploy/DEPLOY_STEPS.md).

- **Gmail verified (28 Oct):** SMTP login with the App Password for myai@ai-agentix.com succeeded and one test lead
  ("AUDIT TEST") was delivered to that inbox through the real pipeline. The password is only in the local, git-ignored
  `server/.env` and must also be put in the VPS `server/.env`.
- Google Sheet URL and GA4 Measurement ID are still to be created by you (steps in the guide).

**Security notes:** the OpenAI key on the server is invalid — replace or remove it. Keys and passwords shared in chat
(OpenAI key, Gmail App Password) should be rotated after go-live if the chat is accessible to others. The local
`.vercel/` folder (git-ignored, never committed) holds old Vercel production secrets — delete it and rotate them if
that project is still used.

## 11. Remaining limitations

- Responsive image variants / `srcset` for card images (AGX-027) not done.
- nginx headers, gzip_static, real 404 status, www/aiagentix.in redirects — need server access.
- GA4 Measurement ID (banner and tracking switch on when it is added); newsletter sending tool not chosen.
- Vite 8 / React Router 7 upgrades — recommended, not done (major versions).
- Not tested on real iOS/Android devices; browser tests used Chromium.

## 12. Live deployment record (28 October 2026)

- VPS 76.13.250.173: Traefik (Coolify) → nginx :8090 → pm2 `ai-agentix-backend` (Node 20, port 3001), repo
  `/var/www/ai-agentix` on `master`. Backups: `/root/ai-agentix-env-backup-2026-10-28`,
  `/root/ai-agentix-dist-backup-2026-10-28.tgz`; previous build in `frontend/dist-prev`.
- `server/.env`: production mode, `TRUST_PROXY_HOPS=2`, leads in `/var/lib/ai-agentix/leads`, Gmail SMTP,
  Google Sheet webhook, new OpenAI key with `LLM_DAILY_LIMIT=300` (the old key was invalid — it had been pasted as
  `sk-sk-…`).
- `deploy.sh` run: 18/18 tests, knowledge base 362 chunks + embeddings, build, swap, pm2 reload.
- **Issue found and fixed during deploy:** the old nginx rule `try_files $uri $uri/ /index.html` answered the new
  per-route folders with `301 → http://ai-agentix.com:8090/page/`. Changed on the VPS to
  `try_files $uri $uri/index.html /index.html;` + `absolute_redirect off;` (`nginx -t` OK, reloaded).
- **Verified live (read-only, from outside):** 20 URLs return 200 with correct titles/canonicals; sitemap/robots/OG
  image served; API headers `nosniff`/`DENY`; requests without Origin → 403; desktop 1366 px and mobile 390 px:
  WhatsApp bottom-left (`wa.me/919217167347`), lead form bottom-right with consent, "Ask AI" above it, no overlap,
  no horizontal scroll, no console errors or failed requests; hero video 480p (mobile) / 720p (desktop);
  assistant answers in AI mode (CEO Anant Sanadhya); Privacy Policy shows Grievance Officer and address.
- **Verified live lead:** `L20261028-ff3ca20b` from the floating form → stored → email delivered → Sheet row;
  `npm run leads -- --pending` → 0 undelivered.
- Still to do: GA4 Measurement ID; optional nginx security headers / gzip_static / real 404 status
  (`deploy/nginx-recommended.conf`); merge the small deploy-script fix (commit `9bfcd8d` on the branch);
  rotate the Gmail App Password and OpenAI key that were shared in chat; set an OpenAI monthly limit.

