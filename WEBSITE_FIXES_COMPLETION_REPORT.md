# AI Agentix Website — Fixes Completion Report

**Branch:** `fix/website-audit-2026-10` (from `master` @ `80ba5d3`) · **Date:** 27 October 2026
**Deployment status:** **NOT DEPLOYED.** Everything below is implemented and tested locally. The live site
(ai-agentix.com) is unchanged. Deployment needs VPS access — see §9.

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
| AGX-003 | Analytics / conversion | 🟡 / ⏳ | `generate_lead` hook + thank-you URL ready; GA4/GTM ID and consent banner not chosen |
| AGX-004 | robots/sitemap wrong domain | ✅ | robots.txt → ai-agentix.com; sitemap generated at build: 35 URLs with lastmod. www/aiagentix.in redirects need server access |
| AGX-005 | Same HTML for every URL, title, OG, soft 404 | ✅ / 🟡 | Per-route HTML with title/description/canonical/OG/Twitter (+ Organization JSON-LD on home), 404 page `noindex`, bad slugs → 404. Real HTTP 404 status needs the nginx change |
| AGX-006 | Security headers, version disclosure | 🟡 | Express: x-powered-by off, nosniff/frame/referrer (tested). nginx headers + CSP (Report-Only) in `deploy/` — not applied |
| AGX-007 | Compliance claims (SOC 2, ISO, HIPAA) | ⏳ | Not changed — list in §7, needs your confirmation |
| AGX-008 | 13 MB hero video | ✅ | Poster 75 kB paints first; 480p 1.4 MB / 720p 3.1 MB / 1080p 7.1 MB chosen by width after load; none with reduced motion / Save-Data |
| AGX-009 | Uncompressed JS/CSS | 🟡 | Build writes .br/.gz (1177 kB → 316 kB). nginx `gzip_static` not applied |
| AGX-010 | /api/chat abuse | ✅ | Rate limit on real client IP (was spoofable via X-Forwarded-For), message 1000 chars, history 6, 20 s timeout, daily AI cap, origin check, no stack traces; prompt-injection test refused |
| AGX-011 | Assistant looks like WhatsApp | ✅ | "Ask AI" button, AI + privacy notice, real WhatsApp separate (bottom-left) |
| AGX-012 | Comparison block left-weighted | ✅ | Full content width (screenshot 1280) |
| AGX-013 | Table clipped ≤375 px | ✅ | Stacked cards below `sm`; no overflow at 320–1920 |
| AGX-014 | Hero strip lopsided | ✅ | Full-bleed on mobile; desktop bleed-left kept (looked intentional) |
| AGX-015 | Contradictory timelines | ⏳ | Needs one approved wording (list in §7) |
| AGX-016 | Wrong/generic links | ✅ | Footer → detail pages; home Solutions tabs + /solutions cards → detail pages; "See Results"; "video coming soon" hidden |
| AGX-017 | Careers / Partner anchors | ✅ | Careers link removed; `/contact#partnerships`, `#demo`, `#audit` open the right form |
| AGX-018 | TBA cards, names | ✅ | TBA cards removed; CEO name corrected to **Anant Sanadhya** (confirmed by you); grid aligned with heading. Anant has no bio → no "View profile" yet |
| AGX-019 | Superlatives, duplicate stats | 🟡 / ⏳ | 67% label fixed. Claims and duplicate stat blocks need your decision (§7) |
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
| AGX-031 | Privacy policy | ✅ / ⏳ | Rewritten for DPDP (§5); Grievance Officer name + registered address still needed; counsel review recommended |
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

**Still needed from you:** Grievance Officer name (or designation) and registered office address;
confirm the 24-month retention period; legal review.

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

## 7. Needs your decision (not changed)

**Compliance / superlative claims** (AGX-007/019) — please confirm which are true; I'll replace the rest
with accurate wording (e.g. "hosted on infrastructure from SOC 2-audited cloud providers"):

| Claim | Where |
|---|---|
| "SOC 2 — Compliant" badge | data/contact.js:14 |
| "SOC 2 compliant, ISO 27001 aligned … TLS 1.3 … AES-256 … Hosted on AWS Mumbai" | data/contact.js:112 |
| "SOC 2 Type II certified" | data/solutionPages/finance-accounts.js:100 |
| "SOC 2 Type II compliant infrastructure" | data/solutionPages/hrms-hiring.js:113 |
| "Compliant with ISO 27001" | data/solutionPages/manufacturing.js:113 |
| "ISO 27001 aligned", "0 data breaches since founding", "99.6% uptime", "DPDP Act 2023 compliant" | data/about.js:77–78 |
| "SOC 2 Compliant", "AWS Mumbai", "99.97% uptime SLA", TLS 1.3 / AES-256 | data/technology.js:7, 15, 69, 96, 98; AgentHero.jsx:91; AgentStack.jsx:24; agents.js:200 |
| HIPAA compliance answers | industryPages/healthcare.js:83; solutionPages/hospital-management.js:112 |
| "India's Fastest Growing AI Consulting Company" | data/home.js:11 |
| "India's #1 end-to-end AI automation partner" | data/site.js:102 |
| "India's most advanced AI-powered content studio" | data/aiStudio.js:13 |
| "Results guaranteed" | data/home.js:258 |
| "Verified by clients across India", 200+ businesses, ₹50 Cr+, 97%, 8x, 4.9/5 | home.js:7, 16, 84–88, 282–288; caseStudies.js:21–22; site.js:68; contact.js:17 |
| Named testimonial "Anand Krishnan — CEO, MedPlus Neighbourhood" (real brand) | data/caseStudies.js:90 — confirm you have permission |

Duplicate "Our Track Record" / "The ROI Case" stats (8x, 200+, 97%): tell me which numbers to keep.

**Delivery timeline** (AGX-015) — currently: "14-day avg. delivery" (home.js:137), "11 days" testimonial
(home.js:143), "2–4 weeks" (home.js:133, 296; solutions.js; agents.js; supply-chain.js), "6–10 weeks"
(contact.js:107), "two weeks" (about.js:88). Suggested single wording: *"First automation live in about
2 weeks; full rollout typically 4–10 weeks."*

**Other:** canonical domain (I used **ai-agentix.com**); analytics tool + cookie banner; newsletter —
there is no sending tool yet (emails are collected only); careers page (link removed).

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

## 10. Deployment and what's needed from you

Nothing has been pushed or deployed. To deploy:

1. **Give me / confirm:** SSH access (or run commands yourself), the repo folder on the VPS, the branch the
   VPS uses, and the pm2 process name (`pm2 ls`). The old configs pointed to `/var/www/ai-agentix` + pm2,
   but the current server layout is unverified. The site appears to run behind Caddy → nginx.
2. **On the VPS `server/.env`** add: `LEADS_DIR`, `SMTP_*` + `LEAD_NOTIFY_TO` (Gmail App Password),
   `GOOGLE_SHEET_WEBHOOK_URL` + `GOOGLE_SHEET_WEBHOOK_TOKEN`, `NODE_ENV=production`,
   `ALLOWED_ORIGINS=https://ai-agentix.com`, and either the new `OPENAI_API_KEY` + `LLM_DAILY_LIMIT` or leave
   the key empty for the free assistant. Node must be ≥ 20.
3. Merge `fix/website-audit-2026-10` into the branch the VPS deploys, then on the VPS:
   `APP_DIR=<repo folder> BRANCH=<branch> PM2_APP=<name> bash deploy/deploy.sh`
   (builds next to the live site and swaps — no downtime; previous build kept in `dist-prev/`).
4. Apply `deploy/nginx-recommended.conf` + the headers snippet after comparing with `nginx -T`, then
   `nginx -t && systemctl reload nginx`. Add `www` → apex and `aiagentix.in` → `ai-agentix.com` 301s.
5. After deploy: submit one test lead per form ("AUDIT TEST", test@example.invalid) and check inbox, Sheet,
   thank-you page; check WhatsApp button; ask the assistant a question.

**Security notes:** the OpenAI key previously stored on the server is invalid — remove it. The key you
pasted in chat was used only in the local, git-ignored `server/.env`; because it was shared in chat,
consider rotating it and setting a monthly spend limit. The local `.vercel/` folder (git-ignored, never
committed) contains production secrets (database URL, admin password, JWT secret, Supabase key) from the
old Vercel project — delete it and rotate those secrets if that project is still in use.

## 11. Remaining limitations

- Responsive image variants / `srcset` for card images (AGX-027) not done.
- nginx headers, gzip_static, real 404 status, www/aiagentix.in redirects — need server access.
- Analytics + consent banner, newsletter sending tool — need decisions.
- Claims, timelines, stats, Grievance Officer details — need your approval/input.
- Vite 8 / React Router 7 upgrades — recommended, not done (major versions).
- Not tested on real iOS/Android devices; browser tests used Chromium.
