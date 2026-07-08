# AI-AGENTiX Full Site Revamp — Light Mode
**Date:** 2026-06-14 | **Reference:** expedify.ai

## Direction
Switch entire site from dark-first (#0D1B2E) to light-first (#FAFBFC) following expedify.ai's clean, airy, professional SaaS aesthetic. Keep brand colors (teal #0EA5A4, amber #F59E0B). Content unchanged. Media from `/public/agentix-generated-media/`.

## Palette (light mode)
| Token | Value | Use |
|---|---|---|
| `--page-bg` | `#FAFBFC` | Page background |
| `--section-alt` | `#F4F5F7` | Alternating sections |
| `--card-bg` | `#FFFFFF` | Cards |
| `--card-border` | `#E5E7EB` | Card borders |
| `--text-primary` | `#0B1220` | Headlines |
| `--text-body` | `#374151` | Body text |
| `--text-muted` | `#6B7280` | Captions |
| `--brand` | `#0EA5A4` | Teal accent |
| `--action` | `#F59E0B` | Amber CTA |
| `--action-text` | `#0B1220` | CTA text |

**Two exceptions (remain dark):**
- Problem/pain section: `#0B1220` dark bg + white text
- Final CTA band: `#0EA5A4` teal bg + white text

## Implementation Order (section-by-section, with live preview)

### Sprint 1: Foundation + Nav
1. `ax-brand.css` — add light-mode semantic tokens
2. `SiteNav.jsx` — white bg, dark links, amber CTA button
3. `SiteFooter.jsx` — light bg, dark text

### Sprint 2: Homepage Sections (in order)
1. Hero — cream bg, heavy H1, split layout, video asset right
2. Stats/trust bar — white bg, 3 metric cards
3. Problem section — dark bg (exception), 4 pain cards
4. "What We Do" tabs — white bg, category tabs + webm preview
5. How It Works — light bg, 4 steps with connector
6. Before/After proof — cream bg, SVG asset
7. Integrations — white bg, SVG icons grid
8. Testimonials — light bg, 3 quote cards
9. FAQ — white bg, accordion with schema
10. Final CTA — teal bg (exception), amber button

### Sprint 3: Inner Pages
- Solutions, Industry pages, Technology, About, Contact, Case Studies

## Key Assets to Use
- Hero video: `/agentix-generated-media/videos/homepage/agentix-homepage-hero-system-map.mp4`
- Category tabs: `/public/categories/{category}/*.webm`
- Before/after: `/agentix-generated-media/images/homepage/agentix-home-value-before-after.svg`
- Category icons: `/agentix-generated-media/icons/categories/*.svg`
- Integration flows: `/agentix-generated-media/images/integrations/*.svg`

## Non-Goals
- No content changes
- No SSR migration (separate project)
- No new pages created
