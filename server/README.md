# AI Agentix — API server

Small Node/Express service behind nginx at `/api` (same origin as the website). It does two jobs:

1. **Lead capture** — every website form posts here; leads are stored, emailed and added to a Google Sheet.
2. **Website assistant** — answers visitor questions from the site's own content (RAG), optionally with an LLM.

All credentials live in `server/.env` on the server only — never in the website code or in git.

## Setup

```bash
cd server
npm ci
cp .env.example .env          # then fill it in (see below)
npm run prepare:kb            # knowledge.json (+ embeddings if OPENAI_API_KEY is set)
npm test                      # 18 tests: lead validation, consent, spam, rate limit, chat limits
npm run start                 # http://localhost:5000 — Vite dev server proxies /api here
```

Node 20 or newer is required.

## Where leads go

```
form on the website ──POST /api/leads──▶ validate + consent check + spam/rate-limit
                                              │
                                              ▼
                              1. append to  LEADS_DIR/leads.jsonl   (always, first)
                                              │   success → visitor sees /thank-you
                                              ▼
                    2. email to LEAD_NOTIFY_TO      3. row in the Google Sheet
                       (SMTP / Gmail)                  (Apps Script web app)
                                              │
                      failed deliveries are retried every 5 minutes (and on restart)
```

- The visitor only sees the thank-you page after step 1 succeeded, so a lead is never lost because
  Gmail or Google is down. Steps 2–3 are recorded in `LEADS_DIR/notifications.jsonl`.
- Forms: Free AI Audit, Book a Demo, Partnership (`/contact`), the floating consultation form
  (bottom-right, `public/lead-widget/`), and the footer newsletter.
- Each lead stores the DPDP consent record (time, notice version, optional marketing opt-in), page,
  campaign parameters (utm / gclid), IP and browser — see the Privacy Policy.

### Viewing leads on the server

```bash
npm run leads                    # last 20 leads
npm run leads -- --pending       # leads not yet delivered by email / Sheet
npm run leads -- --csv > leads.csv
```

### Email (Gmail)

Use a Gmail / Google Workspace account and an **App Password** (not the normal password):
Google Account → Security → 2-Step Verification (must be on) → App passwords → create one for "Mail".

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<sending account>
SMTP_PASS=<16-character app password>
LEAD_FROM=<sending account>
LEAD_NOTIFY_TO=<inbox(es) that receive leads, comma-separated>
```

### Google Sheet

1. Create the sheet → Extensions → Apps Script → paste `docs/google-sheet-apps-script.gs` → Save.
2. Project Settings → Script properties → `LEADS_TOKEN` = a long random value.
3. Deploy → New deployment → Web app · Execute as **Me** · Who has access **Anyone** → copy the `/exec` URL.
4. In `.env`: `GOOGLE_SHEET_WEBHOOK_URL=<the /exec URL>` and `GOOGLE_SHEET_WEBHOOK_TOKEN=<same value>`.

The script rejects requests without the token and skips duplicate lead IDs.

## Assistant modes

| `OPENAI_API_KEY` | Behaviour | Cost |
|---|---|---|
| empty | Free rule-based mode: answers common questions (services, pricing, demo, industries, timeline, contact) from site content and links to the right page | none |
| set | LLM answers grounded in site content, any language; falls back to the free mode on errors | capped by `LLM_DAILY_LIMIT` replies/day + set a monthly limit in the OpenAI dashboard |

Re-run `npm run prepare:kb` whenever site content changes (the deploy script does this).

## Endpoints

- `GET /api/health` → `{ ok: true }`
- `POST /api/leads` → JSON `{ type, fields, consent, marketingConsent, hp, elapsed, pageUrl, utm }` or the
  widget's multipart form → `{ ok: true, id }` / `{ ok: false, message, errors }`
- `POST /api/chat` → `{ message, history?, context? }` → `{ reply, action, sources }`

Protections: origin check, per-IP rate limits (leads 5/min & 30/day, chat 20/min), body size limits,
honeypot + minimum fill time, server-side validation, message/history caps, 20 s LLM timeout,
no stack traces in responses, `trust proxy` set so limits use the real client IP.
