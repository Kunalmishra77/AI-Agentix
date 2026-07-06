# AI Agentix — Full Website Revamp Plan (ADDEPTO-Inspired, Light Theme)

**Date:** 2026-07-07
**Reference:** https://addepto.com
**Type:** Complete visual/UX revamp — **presentation only**, 100% of content/branding/functionality preserved.
**Approval gate:** This plan must be approved before any implementation continues.

---

## Phase 0 — Preparation (DONE, verified)

- Local `master` == `origin/master` (`d37f97d`); `git diff HEAD` empty — repo at latest git.
- `vite build` passes clean (~38s).
- `frontend/public/AGENTIX-MEDIAS/` preserved (never deleted).
- Working branch: `revamp/homepage-addepto` (will rename/extend to `revamp/site-addepto`).
- Partial homepage light edits (sections 2–6) exist uncommitted on the branch — they fold into Sprint 2 and will be finished/normalized there.

---

## Guiding Rules (from brief)

1. **Content is sacred** — no removal, shortening, rewriting, or new marketing copy. Every existing section stays. Only presentation changes.
2. **Light theme primary** — white + soft light gray. Dark used only for occasional highlight bands (hero option, final CTA).
3. **Brand** — Orange `#E8631A` accent (from logo) + white. **Black headings**, **dark-gray paragraphs**. No ADDEPTO colors.
4. **One design system** — every component redesigned to a single consistent language.
5. **Testimonials** — placed near the bottom (1–2 sections above footer) as a continuous **infinite auto-scroll slider**.
6. **Every page gets a premium ADDEPTO-style hero** reusing existing copy.
7. **Missing sections** — where ADDEPTO has no equivalent, design a new section that feels native to ADDEPTO's language.
8. **Pixel-perfect responsive** — desktop / laptop / tablet / mobile.
9. **Page-by-page, section-by-section** execution with review checkpoints.

---

## Current Site Inventory (revamp surface = 29 marketing pages)

**Top-level (11):**
`/` Home · `/about` About · `/solutions` Solutions hub · `/industries` Industries hub · `/ai-studio` AI Studio · `/technology` Technology · `/case-studies` Case Studies · `/contact` Contact · `/privacy` · `/terms` · `/refund`

**Solution detail (9):** sales-automation, marketing-automation, hrms-hiring, operations, supply-chain, finance-accounts, ai-voice-chat, manufacturing, hospital-management

**Industry detail (7):** healthcare, education, hospitality, real-estate, retail-ecommerce, manufacturing, logistics

**Out of scope (not marketing):** `/admin/*` (AdminApp), the platform/app area (`/tools`, `/category`, `/docs`, `/pricing`, etc. under `pages/site/*`). *Flag: confirm whether the platform/app pages are in or out of scope — assumed OUT unless you say otherwise.*

**Shared components (redesigned once, used everywhere):**
`layout/SiteNav`, `layout/SiteFooter`, `layout/BrandLogo`, `layout/MarketingPreloader`, `layout/WhatsAppButton`, `layout/PageHero`, `ui/ScrollProgress`, `ui/MouseGlow`, `ui/ActivityToast`, plus `components/agentix/*` section components where used.

**Design system files:** `styles/ax-brand.css`, `styles/ax-tokens.css` (+ inline styles across pages).

---

## ADDEPTO Design Language (what we adopt)

- **Structure:** dark hero (top) + dark footer (bottom); **everything between is light and airy**.
- **Whitespace:** generous vertical rhythm (96–120px section padding), comfortable card gaps.
- **Cards:** flat, hairline borders, minimal shadow, clean hover (lift + border tint), no glassy glow.
- **Typography:** large bold headings, clear hierarchy (eyebrow → H2 → body), modern sans-serif.
- **Rhythm:** service cards → client logos → capabilities grid → case studies → industry expertise → product → cooperation models → resources; repeated CTA moments.
- **CTAs:** recurring conversion prompts (ADDEPTO "Let's talk" → our "Book Free Strategy Call").

---

## Design System (single source of truth)

New/updated semantic tokens in `ax-brand.css` (light theme):

| Token | Value | Use |
|---|---|---|
| `--l-page` | `#FFFFFF` | Primary section bg |
| `--l-alt` | `#F7F8FA` | Soft light-gray alt bg |
| `--l-card` | `#FFFFFF` | Cards |
| `--l-border` | `#EAECEF` | Hairline borders |
| `--l-ink` | `#0B0F1A` | **Black headings** |
| `--l-body` | `#374151` | **Dark-gray paragraphs** |
| `--l-muted` | `#6B7280` | Captions/eyebrow-muted |
| `--accent` / `--or` | `#E8631A` | Orange accent (unchanged) |
| dark bookend | `#0D1B2E` | Hero option + final CTA + footer |

**Reusable primitives (new, light-first) — built once, applied site-wide:**
- `Section` (bg=white|alt, padding scale) · `Container` · `Eyebrow` · `SectionHeader` (eyebrow+H2+lead)
- `Card` (flat/hairline) · `IconChip` · `StatBand` · `Button` (primary/outline/ghost) · `LinkArrow`
- `PageHero` (premium hero: eyebrow, H1, lead, CTAs, optional right media; light default with optional dark variant)
- `CTABand` (dark closing) · `LogoMarquee` · `TestimonialSlider` (infinite auto-scroll)
- `FAQAccordion` · `ContactForm` (light) · redesigned `SiteNav` (white) + `SiteFooter` (dark)

**Effects (Flat Design, per ui-ux-pro-max):** no heavy shadows/gradients; hover = color/opacity/lift; transitions 150–250ms ease; respect `prefers-reduced-motion`.

**Animations (premium, subtle):** scroll-reveal (fade+rise, staggered), card lift on hover, button press feedback, hero entrance, section entrance. Reuse existing Framer Motion + `.ax-reveal`. Never distracting.

---

## Homepage — Section-by-Section (Sprint 2)

Order preserved; content unchanged. Alternation = white / `#F7F8FA`. Hero + Final CTA stay dark.

| # | Section | Now | Target (ADDEPTO analogue) |
|---|---|---|---|
| 1 | Hero (rotating word, dashboard mock, trust, stats) | dark | **Keep dark** premium hero (refined, softer glows) |
| 2 | Platform marquee | dark | **Light** client-logos band |
| 3 | Pain/Problem (4 cards) | light | Light alt, flat cards (problem framing) |
| 4 | Stats / track record | dark | **Light**, stat band |
| 5 | What We Build (tabs) | light | Light alt, clean tabbed capabilities |
| 6 | How It Works (timeline) | dark | **Light**, process/cooperation rhythm |
| 7 | Solutions (interactive) | light | Light alt, service cards |
| 8 | Industries strip | dark | **Light**, industry-expertise cards |
| 9 | Results / case studies | light | Light alt, case-study cards |
| 10 | Why Us (comparison) | dark | **Light**, comparison (capabilities) |
| 11 | Testimonials | light | **Infinite auto-scroll slider** (kept near bottom) ✓ |
| 12 | ROI strip | light | Light band |
| 13 | Final CTA | dark | **Keep dark** closing band |

New sections to add on homepage where valuable (ADDEPTO-native): **client-logos band** (from marquee), optional **cooperation-models** block if content supports it (no new copy invented — only if existing content maps).

---

## Inner-Page Pattern (repeatable template)

Every inner page (about, solutions hub + 9 details, industries hub + 7 details, ai-studio, technology, case-studies, contact, legal) gets:

1. **Premium hero** — light by default (eyebrow + black H1 + dark-gray lead + CTA), optional right media; compact dark variant available. Reuses existing page copy.
2. **Light content sections** — existing sections restyled to flat cards, generous whitespace, alternating white/`#F7F8FA`.
3. **Consistent CTA band** (dark) before footer.
4. **Redesigned nav (white) + footer (dark)** shared.

Legal pages (privacy/terms/refund): light readable long-form layout with the shared hero + typography scale.

Contact page: light form (visible labels, inline validation, clear errors), ADDEPTO-style split layout.

---

## Development Order (sprints, with checkpoints)

- **Sprint 1 — Foundation:** design-system tokens + primitives in `ax-brand.css`; redesign `SiteNav` (white) + `SiteFooter` (dark) + `PageHero`/`Button`/`Card`/`Section`/`TestimonialSlider`. ✅ checkpoint: nav/footer look right on an existing page.
- **Sprint 2 — Homepage:** all 13 sections per table above. ✅ checkpoint: full homepage review (desktop/tablet/mobile).
- **Sprint 3 — Core pages:** About, Solutions hub, Industries hub, Technology, AI Studio, Case Studies, Contact. ✅ checkpoint after each.
- **Sprint 4 — Solution detail (9).** ✅ checkpoint (they share a template).
- **Sprint 5 — Industry detail (7).** ✅ checkpoint (shared template).
- **Sprint 6 — Legal (3) + global polish:** responsive pass at 375/768/1024/1440, reduced-motion, accessibility (contrast 4.5:1, focus states, alt text), performance (lazy media). ✅ final review.

Each sprint: build passes + visual verification before moving on. Review checkpoint after every major milestone.

---

## Responsive Strategy

Mobile-first; breakpoints 375 / 768 / 1024 / 1440. Reuse/extend existing global responsive CSS in `ax-brand.css`. No horizontal scroll; touch targets ≥44px; readable ≥16px body on mobile; grids collapse predictably.

## Component / Code Strategy

Introduce light-theme primitives incrementally; refactor pages to use them where practical without risking content. Keep changes modular; prefer semantic tokens over scattered hex. Preserve all routes, data, and business logic.

## Timeline (indicative, adjustable)

S1 foundation → S2 homepage → S3 core (7 pages) → S4 solutions (9) → S5 industries (7) → S6 legal + polish. Sized to your review pace; each sprint is independently reviewable.

---

## Non-Goals

- No content changes. No new copy. No route/business-logic changes.
- No admin or platform/app redesign (unless you confirm otherwise).
- No backend changes.

## Open Questions (need your call)

1. **Platform/app pages** (`/tools`, `/docs`, `/pricing`, etc.) and `/admin` — **out of scope**? (assumed yes)
2. **Homepage hero** — keep **dark** premium hero, or make it **light** with a dark highlight elsewhere? (brief says light-primary but allows occasional dark; hero is the one strong dark candidate)
3. Approve the **sprint order** above, or reprioritize any page earlier?
