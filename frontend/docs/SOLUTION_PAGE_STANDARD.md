# Solution Page Design Standard

The locked design logic every `/solutions/:slug` page MUST follow.
This exists so pages are consistent and correct BEFORE the user reviews them.
I self-check against this in the browser on every page — the user is not my QA.

---

## 1. Section rhythm (tone) — the #1 rule

- **Only ONE dark block per page: the hero.** (Footer is separate.)
- Everything below the hero is **light**, alternating `white` and `alt` (surface-alt).
- **Never** place two same-tone sections adjacent (no white→white, no alt→alt).
- **Never** stack 2+ dark sections. Dark is a rare accent, not a default.

Canonical order + tone:
| # | Section | Tone |
|---|---------|------|
| 1 | Hero (bg image, 100vh) | dark |
| 2 | Stats band (full-width) | white |
| 3 | Capabilities (tabbed + image) | alt |
| 4 | Process (numbered) | white |
| 5 | Integrations (logo grid) | alt |
| 6 | Compare (table) | white |
| 7 | Results (cards) | alt |
| 8 | FAQ (accordion) | white |
| 9 | CTA (dark card *inside* light section) | white |

## 2. Content placement logic

- **Hero:** eyebrow pill → H1 (clamp 2.2–4rem) → body → 2 CTAs. Left-aligned over a
  full-bleed **background image** with dark gradient overlay. 100vh (`h-screen min-h-[600px]`).
  **No dummy widgets / fake chips / mock UI.** Ever.
- **Stats:** full viewport width band directly under hero, 4 metrics, dividers.
- **Capabilities:** pill tabs (single row) + 2-col detail; each tab has a **real image**.
- **Process:** numbered step cards, orange fill-on-hover.
- **Integrations:** light monogram-tile grid (real logos when available).
- **Compare:** light table, AI column highlighted (orange-tint + RECOMMENDED badge).
- **Results:** light cards, big gradient stat, tag, meta.
- **FAQ:** 2-col — sticky heading + help card left, accordion right.
- **CTA:** one dark glowing card centered in a light section.

## 3. Images

- Hero = **background** image (never a framed right-side image).
- Capabilities = one real product/relevant image per tab.
- Use real assets from `public/AGENTIX-MEDIAS/`. Mark intended-but-missing assets with
  `data-asset="..."` so they're easy to find. **No placeholder-looking mock widgets.**

## 4. Hover effects — must be OBVIOUS, never subtle

Every interactive card/tile/button gets ALL of:
- lift `hover:-translate-y-1.5` (cards `-2`)
- border → `hover:border-accent`
- orange-tinted shadow e.g. `hover:shadow-[0_18px_40px_-16px_rgba(242,101,34,0.4)]`
- an internal motion: icon/monogram `group-hover:scale-110`, color shift to accent,
  or a wiping accent bar
- transition `duration-300`

If a reviewer can't instantly see the hover, it's wrong.

## 5. Animation

- Scroll reveal: fade-up, stagger 50–100ms, `viewport={{ once: true }}`.
- `transform`/`opacity` only. Respect `prefers-reduced-motion` (already in index.css).

## 6. Accessibility baseline

- Contrast ≥ 4.5:1, alt text on images, focus states, touch targets ≥ 44px.

---

## Self-QA checklist (run in browser BEFORE showing the user)

1. [ ] Tones: only hero dark; no adjacent same-tone; no 2 darks.
2. [ ] Hero is 100vh, background image, no dummy widget.
3. [ ] Stats band spans full width directly under hero.
4. [ ] Every card/tile has a clearly visible hover (verified by hovering in-browser).
5. [ ] Real images present where specified; no mock/placeholder UI.
6. [ ] Scroll each section into view — confirm it renders (not blank).
7. [ ] Contrast/alt/focus OK.
8. [ ] `vite build` clean.

Only after all 8 pass do I present the page.
