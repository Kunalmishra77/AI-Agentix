# Homepage Revamp — ADDEPTO-Style Light Restyle

**Date:** 2026-07-07
**Reference:** ADDEPTO.com
**Scope:** Homepage only (`frontend/src/pages/marketing/HomePage.jsx`)
**Fidelity:** Close adaptation — follow ADDEPTO's layout/rhythm, keep Agentix branding

## Starting Point (verified)

- Local `master` = `origin/master` (`d37f97d`), `git diff HEAD` empty — code already at latest git.
- `vite build` passes clean (built in ~38s).
- `frontend/public/AGENTIX-MEDIAS/` preserved (not deleted, per user).
- Stale spec `2026-06-14-site-revamp-light-mode.md` is **superseded** (wrong reference `expedify.ai`, wrong teal palette). This doc replaces it.

## Direction

Current homepage is **dark-dominant**: a dark navy hero followed by *alternating* heavy dark/light sections. ADDEPTO's pattern is **dark bookends, light airy middle** — dark nav + dark hero at top, dark footer/close at bottom, and everything between is light, generously spaced, clean card-based with hairline borders and minimal shadow.

**Move:** Keep the dark navy hero and the dark final-CTA band. Convert every middle section to light/airy ADDEPTO style. Keep all existing content, copy, sections, and routes. Keep Agentix orange (`#E8631A`) + cyan (`#5BE3E3`) + Poppins.

## Decisions (confirmed with user)

- Scope: **Homepage first**, restyle current sections (no IA reorder).
- Hero: **keep dark navy**.
- Final CTA: **keep dark navy** (dark bookend, like ADDEPTO's close).
- Alternation: **subtle** — alternate pure white and `#F7F8FA` between middle sections.

## Visual System

Add light-mode semantic tokens to `frontend/src/styles/ax-brand.css` so sections reference shared values instead of scattered inline hex.

| Token | Value | Use |
|---|---|---|
| `--l-page` | `#FFFFFF` | Primary light section bg |
| `--l-alt` | `#F7F8FA` | Alternating section bg |
| `--l-card` | `#FFFFFF` | Cards |
| `--l-border` | `#EAECEF` | Hairline card/section borders |
| `--l-ink` | `#0D1B2E` | Headlines (navy) |
| `--l-body` | `#4A5568` | Body text |
| `--l-muted` | `#8A93A2` | Eyebrows / captions |
| `--accent` | `#E8631A` | Orange — CTAs, eyebrows, links (unchanged) |
| `--accent-cyan` | `#5BE3E3` | Secondary accent (unchanged) |

**Aesthetic rules (apply to all restyled sections):**
- Section vertical padding `120px 0` (desktop) for generous whitespace; scale down on mobile.
- Cards: `background: var(--l-card)`, `1px solid var(--l-border)`, radius ~16px, **no heavy shadow** — soft shadow on hover only.
- Type hierarchy per section: orange uppercase eyebrow (letter-spacing) → large navy H2 (Poppins 700/800) → grey body (`--l-body`).
- Recurring accent CTA "Book Free Strategy Call" (Agentix equivalent of ADDEPTO's repeated "Let's talk").
- Flat/clean over glassy — remove dark-section glass/glow treatments in the middle.

## Per-Section Restyle (order preserved)

| # | Section | Current bg | Target |
|---|---|---|---|
| 1 | Hero (rotating word, dashboard mock, trust bar, stats) | dark navy | **Keep dark**; optionally soften orb glows |
| 2 | Platform marquee ("Powered by…") | dark strip | → **light** client-logos band, greyscale logos, muted label |
| 3 | Trust / stats band | light | Light `--l-alt`, 3 metric cards, hairline borders |
| 4 | "What We Build" tabs | dark→light | **All light**; tabs as clean pills, white content card |
| 5 | Solutions (interactive) | dark `#0D1B2E` | → **light** cards; category color as accent |
| 6 | Industries | light | Light, refined card grid, orange "read more" links |
| 7 | Secondary dark band | dark | → **light** (remove dark interruption) |
| 8 | Why Agentix / Results | light→dark `#050E1A` | → **light**; stat cards on white, orange numbers |
| 9 | Client Stories (testimonials) | cream | Light, ADDEPTO-style large quote cards |
| 10 | Logos / integration band | white | Keep light, tidy grid |
| 11 | Final CTA | dark | **Keep dark navy** close |

**Alternation sequence (middle sections 2–10):** white → `#F7F8FA` → white → `#F7F8FA` … subtle, separated by hairline borders.

## Implementation Notes

- `HomePage.jsx` uses heavy inline styles. Restyle by editing inline background/border/text values to the new tokens; introduce tokens in `ax-brand.css`. Prefer replacing hardcoded dark hex (`#0D1B2E`, `#050E1A`, `#060E1A`, `#0A1628`) in middle sections with light tokens.
- Use `/ui-ux-pro-max` skill during implementation for card/typography/spacing polish.
- Keep responsive behavior intact (existing `RESPONSIVE_CSS`); verify mobile after restyle.

## Non-Goals

- No copy/content changes.
- No new or removed sections; no IA reorder.
- No routing changes.
- No inner-page changes (Solutions, Industries, About, Contact, Case Studies) — later phase.
- No backend changes.

## Verification

- `npm run build` passes clean.
- Visual check of homepage at desktop (1440), tablet (768), mobile (390) via screenshots.
- Confirm dark hero + dark final CTA retained; all middle sections light with subtle alternation.
- Confirm `AGENTIX-MEDIAS/` and other assets untouched.
