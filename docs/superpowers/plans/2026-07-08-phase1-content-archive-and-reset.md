# Phase 1 — Content Archive & Frontend Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Archive 100% of the existing website content into a UI-free `content-archive/`, verify it, then remove the entire frontend implementation and clean throwaway artifacts — leaving a clean, runnable foundation. No rebuild.

**Architecture:** Read-only parallel extraction agents pull text from implemented JSX/data into per-page Markdown. A verification pass (route coverage + string-diff grep + docx cross-check) gates a git-committed safety point. Only after an explicit go-ahead do we delete `frontend/src/` UI trees and reduce entry files (`main.jsx`, `index.css`) to minimal runnable stubs, keeping all toolchain config and `frontend/public/` media.

**Tech Stack:** Vite + React 18 + Tailwind (config kept, UI deleted). Extraction via subagents. Verification via ripgrep/Grep.

## Global Constraints

- Content source = **implemented code** (`frontend/src/pages/**`, content components, `data/*.js`, `App.jsx`, `voice-agent/*`, `admin/*`); `.docx` files are cross-check only.
- Archive contains **content only** — no JSX, class names, styling, layout, or animation code.
- **Nothing is deleted before** the archive is written, verified, git-committed, AND the user has given an explicit go-ahead.
- Delete scope = **everything frontend** (incl. `src/admin`, `src/voice-agent`) but preserve essential config so `npm run dev`/`build` still boot.
- Asset policy = **conservative**: keep `frontend/public/` media; delete only dev artifacts (root screenshots, `dist/`, vite temp files, logs, `.playwright-mcp/`).
- No new pages/components/designs in this phase. Stop after cleanup.
- Repo-relative paths from `d:\AI AGENTIX`. Non-frontend trees (`backend/`, `api/`, `database/`, `files/`, `docs/`) are untouched.

---

### Task 1: Scaffold the archive skeleton

**Files:**
- Create: `content-archive/index.md`, `content-archive/global.md`, `content-archive/assets-kept.md`
- Create dirs: `content-archive/pages/`, `content-archive/pages/industries/`, `content-archive/pages/solutions/`, `content-archive/pages/site/`, `content-archive/pages/app/`

**Interfaces:**
- Produces: the folder layout and an `index.md` manifest table that later tasks fill in (columns: Page | Route | Source file(s) | Archive file | Status).

- [ ] **Step 1:** Create the directory tree and empty `index.md` with a manifest table header, `global.md` with section stubs (Navigation / Footer / Contact / Social / Legal / Global meta / Brand strings), and `assets-kept.md` with a header.
- [ ] **Step 2:** Build the route→page map by reading `frontend/src/App.jsx` (routes) and listing `frontend/src/pages/**/*.jsx`. Populate `index.md` with one row per route/page, `Status = pending`.
- [ ] **Step 3: Verify** every file under `frontend/src/pages/` appears as a row in `index.md`. Run: `Grep` count of `pages/**/*.jsx` vs. rows in `index.md`. Expected: equal counts.
- [ ] **Step 4: Commit.** `git add content-archive && git commit -m "chore(archive): scaffold content-archive skeleton + page manifest"`

---

### Task 2: Extract page content (parallel)

**Files:**
- Create: one `.md` per page under `content-archive/pages/**` (per manifest)
- Read-only sources: `frontend/src/pages/**`, `frontend/src/data/*.js`

**Interfaces:**
- Consumes: manifest rows from Task 1.
- Produces: filled per-page `.md` files in the format defined in the spec (Meta, Sections, CTAs, Features/Services/Industries, Statistics, FAQs, Testimonials, Forms).

- [ ] **Step 1:** Dispatch parallel read-only extraction agents, grouped: (a) marketing core — Home, About, Solutions, Industries, Technology, AIStudio, CaseStudies, Contact, Privacy, Terms, Refund; (b) `industries/*` (7 pages); (c) `solutions/*` (9 pages); (d) `site/*` (8–9 pages); (e) data files (`agentixData.js`, `toolWorkspaces.js`, `workflowConnections.js`, `lottieMappings.js`) resolving which pages consume them. Each agent returns structured content only (no code).
- [ ] **Step 2:** Write each agent's output to its `.md` file in the spec format. Set that manifest row `Status = archived`.
- [ ] **Step 3: Verify** no manifest row is still `pending` and every `.md` file is non-empty. Run: `Grep -c "pending" content-archive/index.md` → Expected: 0 (or only rows intentionally N/A). List any empty `.md`.
- [ ] **Step 4: Commit.** `git add content-archive && git commit -m "feat(archive): extract page content to markdown"`

---

### Task 3: Extract global, functional, and asset content

**Files:**
- Modify: `content-archive/global.md`, `content-archive/assets-kept.md`
- Create: `content-archive/pages/app/voice-agent.md`, `content-archive/pages/app/admin.md`
- Read-only sources: `frontend/src/components/layout/*` (SiteNav, SiteFooter, WhatsAppButton, BrandLogo), `frontend/src/voice-agent/*`, `frontend/src/admin/*`, `frontend/public/**`

- [ ] **Step 1:** Extract nav labels, footer content, contact info, WhatsApp/social links, legal links, and any global/brand strings into `global.md`.
- [ ] **Step 2:** Extract user-facing text from `voice-agent/*` (BootText, SubtitleBand, VoiceLeadForm, agentFlow) → `pages/app/voice-agent.md`; and labels/copy from `admin/*` → `pages/app/admin.md`.
- [ ] **Step 3:** Inventory `frontend/public/**` (list every media file path + folder) into `assets-kept.md`, so retained assets are documented.
- [ ] **Step 4: Verify** `global.md` has non-empty Navigation + Footer + Contact sections and `assets-kept.md` lists files. Run a `Grep` for known footer/nav strings (e.g. a copyright or WhatsApp number found in source) to confirm they landed in `global.md`.
- [ ] **Step 5: Commit.** `git add content-archive && git commit -m "feat(archive): global, functional, and asset content"`

---

### Task 4: Verify 100% content coverage + docx cross-check

**Files:**
- Create: `content-archive/VERIFICATION.md` (report)
- Read-only: entire `frontend/src/`, both root `.docx` files

- [ ] **Step 1 — Route coverage:** Confirm every route in `App.jsx` maps to exactly one archive file. Record matched/total in `VERIFICATION.md`.
- [ ] **Step 2 — String-diff sweep:** Extract human-readable string literals from `frontend/src/pages/**` and content components (headings, paragraphs, button/CTA labels, FAQ text — quoted strings ≥ ~3 words). For each, confirm presence in the archive. List any **unmatched** strings in `VERIFICATION.md` under "Needs review".
- [ ] **Step 3 — Docx cross-check:** Convert `AI_Agentex_Complete_Website_Content.docx` (and design doc) to text (e.g. `python-docx` or unzip `word/document.xml`); flag content present there but absent from the archive. Record under "In docx, not in code".
- [ ] **Step 4 — Resolve:** For each unmatched item, either add it to the correct `.md` (if genuine content) or annotate why it's excluded (pure UI string). Re-run Step 2 until "Needs review" is empty or fully annotated.
- [ ] **Step 5: Verify** `VERIFICATION.md` shows route coverage = 100% and no unresolved unmatched strings.
- [ ] **Step 6: Commit (SAFETY POINT).** `git add -A && git commit -m "feat(archive): verified 100% content coverage + verification report"`

---

### Task 5: Verification report + go-ahead checkpoint

- [ ] **Step 1:** Present a summary to the user: pages archived (count), route coverage %, unmatched strings resolved, docx cross-check result, assets inventoried.
- [ ] **Step 2:** **STOP.** Await explicit user go-ahead before any deletion. (Archive is already git-committed → recoverable regardless.) Do not proceed to Task 6 without it.

---

### Task 6: Delete the frontend UI trees

**Files (delete):**
- `frontend/src/pages/` (all)
- `frontend/src/components/` (all)
- `frontend/src/admin/` (all)
- `frontend/src/voice-agent/` (all)
- `frontend/src/shared/`, `frontend/src/core/`
- `frontend/src/data/` (archived)
- `frontend/src/styles/` (all ax-*.css)
- `frontend/src/App.jsx`

- [ ] **Step 1:** `git rm -r` the trees/files above.
- [ ] **Step 2: Verify** deletion: `ls frontend/src` shows only `main.jsx`, `index.css` remaining. Expected: those two files only.
- [ ] **Step 3: Commit.** `git commit -m "chore(reset): remove frontend UI implementation (content archived)"`

---

### Task 7: Reduce entry files to a minimal runnable foundation

**Files:**
- Modify: `frontend/src/main.jsx` (stub), `frontend/src/index.css` (tailwind directives only)
- Keep untouched: `index.html`, `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json`, `.env*`

- [ ] **Step 1:** Rewrite `main.jsx` to a minimal React mount of an empty root:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div />
  </React.StrictMode>
)
```
- [ ] **Step 2:** Rewrite `index.css` to only:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- [ ] **Step 3:** Confirm `frontend/index.html` still references `/src/main.jsx` and has `<div id="root">`. Adjust the mount id in Step 1 if `index.html` uses a different root id.
- [ ] **Step 4: Verify boot:** run `npm run build` in `frontend/` (and optionally `npm run dev`). Expected: build succeeds, no missing-import errors.
- [ ] **Step 5: Commit.** `git commit -am "chore(reset): minimal runnable foundation (stub main.jsx + tailwind index.css)"`

---

### Task 8: Clean throwaway artifacts (conservative)

**Files (delete):**
- Root review screenshots: all `*.png` and `*.jpeg` at repo root (addepto-*, hero-*, home-*, sales-*, industries-*, scroll-*, insights-*, nav-*, logo-*, etc.)
- `frontend/vite.config.js.timestamp-*.mjs`
- `frontend/dev-server.log`
- `.playwright-mcp/` (repo root)
- `frontend/dist/`

**Keep:** `frontend/public/` media, both `.docx` files, `ai_agentex_sitemap.svg`, everything under `docs/`.

- [ ] **Step 1:** Delete the artifact files/dirs above (`git rm` for tracked, plain `rm` for untracked). Do NOT touch `frontend/public/`, `.docx`, `docs/`, or non-frontend trees.
- [ ] **Step 2: Verify** repo root has no `*.png`/`*.jpeg` review screenshots left (`ls *.png *.jpeg`) and `frontend/dist` is gone. Confirm `frontend/public/` still present.
- [ ] **Step 3: Commit.** `git commit -m "chore(cleanup): remove dev artifacts and review screenshots"`

---

### Task 9: Final confirmation summary

- [ ] **Step 1:** Produce the Phase 1 confirmation summary: (a) content archived (page count, verification result), (b) frontend removed (deleted trees list), (c) artifacts cleaned (list), (d) clean runnable foundation confirmed (build passes). 
- [ ] **Step 2:** **STOP** and wait for next instructions. Do not begin any rebuild, design, or new UI.

---

## Self-Review

**Spec coverage:** Sub-phase A → Tasks 1–3; Sub-phase B (verification) → Tasks 4–5; Sub-phase C (removal + foundation) → Tasks 6–7; Sub-phase D (cleanup) → Task 8; Confirmation deliverable → Task 9. All spec sections covered.

**Placeholder scan:** No TBD/TODO; stub code shown in full (main.jsx, index.css); verification steps use concrete grep/build checks.

**Consistency:** `content-archive/` layout, delete scope, keep-list, and asset policy match the spec's Global Constraints throughout. Safety point (git commit) precedes every destructive task; go-ahead gate (Task 5) precedes deletion (Task 6).
