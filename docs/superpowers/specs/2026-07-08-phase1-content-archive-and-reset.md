# Phase 1 — Content Archive & Frontend Reset

**Date:** 2026-07-08
**Status:** Awaiting user review
**Scope:** Archive 100% of existing website content, verify it, then remove the entire frontend implementation and clean throwaway artifacts — leaving a clean, runnable foundation. **No rebuilding, no new UI, no design work in this phase.**

---

## Goal

Reset the frontend to a clean foundation while preserving **100% of existing content, branding, and business information** in a UI-free archive that becomes the single source of truth for the later rebuild.

This phase stops after cleanup. It does **not** create pages, components, or designs.

---

## Sub-phase A — Content Archive (non-destructive)

### Source of truth
Extract from the **implemented code** (what is currently shipped):
- `frontend/src/pages/**/*.jsx` (~35 pages: marketing, marketing/industries, marketing/solutions, site)
- Content-bearing components: `frontend/src/components/agentix/*`, `components/layout/*` (nav, footer), `components/ui/*`
- Data files: `frontend/src/data/agentixData.js`, `toolWorkspaces.js`, `workflowConnections.js`, `lottieMappings.js`
- Inline content in `frontend/src/App.jsx` (routes + any inline text)
- User-facing text in `frontend/src/voice-agent/*` (boot text, subtitles, lead form labels) and `frontend/src/admin/*` (labels), so functional text isn't lost when those are deleted
- Cross-check against `AI_Agentex_Complete_Website_Content.docx` and `AI_Agentex_Design_Specification.docx` (flag content present there but missing from code)

### Output structure
```
content-archive/
  index.md              # manifest: every page → route → source file(s) → status
  global.md             # nav labels, footer, contact info, WhatsApp, social, legal links, global meta, brand strings
  assets-kept.md        # inventory of frontend/public/ media retained (so nothing is "lost")
  pages/
    home.md  about.md  solutions.md  industries.md  technology.md  ai-studio.md
    case-studies.md  contact.md  privacy.md  terms.md  refund.md
    industries/  healthcare.md education.md hospitality.md logistics.md manufacturing.md real-estate.md retail-ecommerce.md
    solutions/   ai-voice-chat.md sales-automation.md marketing-automation.md operations.md hr-hiring.md finance-accounts.md supply-chain.md hospital-management.md manufacturing.md
    site/        pricing.md faq.md demo.md security.md status.md changelog.md talk.md about.md contact.md
    app/         voice-agent.md admin.md    # user-facing functional text only
```

### Per-page file format (content only — no JSX, classes, styling, or animation)
```markdown
# <Page name>  ·  route: /<path>  ·  source: <file(s)>

## Meta
- Title: ...
- Description: ...

## Section: <name / eyebrow>
- Heading: ...
- Subheading: ...
- Body: ...
- Bullets: ...

## CTAs
- <label> → <destination>

## Features / Services / Industries
- <name>: <description>

## Statistics
- <number> — <label>

## FAQs
- Q: ... / A: ...

## Testimonials
- "<quote>" — <name>, <role>

## Forms
- <field label> (placeholder) — submit: <text>
```

### Extraction method
Fan out **read-only extraction agents in parallel**, one per page group (marketing core, industries, solutions, site, components/data, voice+admin). Each returns structured content; I write it to the matching `.md`. Then convert the two `.docx` files to text and cross-check.

---

## Sub-phase B — Verification (the gate before any deletion)

1. **Coverage:** every route in `App.jsx` maps to exactly one archive file (recorded in `index.md`).
2. **Text-diff sweep:** grep the codebase for human-readable strings (headings, paragraphs, button/CTA labels, FAQ text); confirm each appears in the archive. Unmatched strings are listed for review.
3. **Docx cross-check:** flag content in the docx not found in the archive.
4. **Report + checkpoint:** I present a verification summary and **commit the archive to git**. I then pause for an explicit go-ahead before deleting anything. (Git commit = full recoverability regardless.)

---

## Sub-phase C — Frontend Removal (destructive, after go-ahead)

**Delete (per user decision "Everything frontend"):**
- `frontend/src/pages/` (all)
- `frontend/src/components/` (all: agentix, layout, ui)
- `frontend/src/admin/` (all)
- `frontend/src/voice-agent/` (all)
- `frontend/src/shared/`, `frontend/src/core/`
- `frontend/src/data/` (content already archived)
- `frontend/src/styles/` (all ax-*.css)
- `frontend/src/App.jsx`

**Keep / reduce to a minimal runnable foundation:**
- Toolchain config: `package.json`, `package-lock.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json`, `.env.local`, `.env.production`, `.gitignore`
- `frontend/index.html` (kept; entry point)
- `frontend/src/main.jsx` → reduced to a minimal stub that mounts a single empty root (so `npm run dev`/`build` still boot to a blank page)
- `frontend/src/index.css` → reduced to the three `@tailwind` directives only (so Tailwind still compiles)
- `frontend/public/` media (kept — conservative asset policy; inventoried in `assets-kept.md`)
- `node_modules/` (kept)
- **Non-frontend, untouched:** `backend/`, `api/`, `database/`, `files/`, `docs/`, docker/nginx/ecosystem config at repo root

---

## Sub-phase D — Artifact Cleanup (conservative)

**Delete throwaway dev artifacts:**
- Root review screenshots: `*.png` and `*.jpeg` at repo root (addepto-*, hero-*, home-*, sales-*, industries-*, scroll-*, etc.)
- `frontend/vite.config.js.timestamp-*.mjs`
- `frontend/dev-server.log`
- `.playwright-mcp/` (repo root)
- `frontend/dist/` (build output — regenerated on build)

**Keep:** `frontend/public/` media, the two `.docx` source files (historical reference), `ai_agentex_sitemap.svg`, everything under `docs/`.

---

## Confirmation deliverable (end of Phase 1)

A summary confirming:
- All content archived successfully (count of pages archived, verification result).
- Frontend implementation completely removed (list of deleted trees).
- Unused files/assets cleaned (list).
- Project is a clean, runnable foundation, ready for the next instructions.

Then **stop and wait** for further instructions. No rebuild.

---

## Explicitly out of scope for Phase 1
- Any new pages, components, layouts, sections, styles, or animations.
- Any homepage or design work.
- Any ADDEPTO-referenced rebuild (that is a later, separate spec per page/section).
