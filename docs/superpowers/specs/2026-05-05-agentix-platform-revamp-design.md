# Agentix Platform Full Revamp — Design Spec
**Date:** 2026-05-05  
**Status:** Approved (user-directed full build)

---

## 1. Scope

Full rebuild of the Agentix website from the current ~25-page light-themed React app into the 238-page premium dark AI-operating-system platform defined by:

- `Agentix_Platform_Content_Architecture.md` — content taxonomy (9 categories, 40 subcategories, 121 tools)
- `Agentix_Website_Structure_UI_Blueprint.md` — page inventory, section blueprints, URL structure, design direction, component system, animation rules

Nothing is skipped. All 238 pages are built.

---

## 2. Tech Stack (Unchanged)

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router 6 |
| Styling | TailwindCSS 3 (theme overhauled) |
| Animation | Framer Motion (existing) + CSS keyframes |
| System Map | Canvas API / SVG + Framer Motion (no external 3D lib added unless needed) |
| Data | Static JS data files rebuilt to match taxonomy |
| SEO | react-helmet-async (existing) |
| Icons | lucide-react + react-icons (existing) |

---

## 3. Design System Changes

### Color System (Tailwind config overhaul)

**Old:** Light navy + orange accent  
**New:** Deep dark graphite base + 9 category accent palettes

```
Base:
  bg-base:       #0A0A0F  (near-black graphite)
  bg-surface:    #111118  (dark panels)
  bg-glass:      rgba(255,255,255,0.04) (smoked glass)
  text-primary:  #F0F0F5  (warm white)
  text-muted:    #8A8A9A  (muted silver)
  border-ui:     rgba(255,255,255,0.08)
  accent-cyan:   #00D4FF  (primary action / electric cyan)

Category accents (9):
  cat-content:   #FF6B6B  (coral/rose)
  cat-marketing: #84CC16  (lime/teal)
  cat-sales:     #3B82F6  (electric blue)
  cat-cx:        #38BDF8  (sky blue)
  cat-research:  #A855F7  (violet)
  cat-ops:       #06B6D4  (steel cyan)
  cat-systems:   #6366F1  (indigo)
  cat-product:   #2563EB  (cobalt)
  cat-finance:   #10B981  (emerald)
```

### Typography

- Display: `Syne` (geometric editorial sans) — loaded via Google Fonts
- Body: `Inter` (highly readable professional sans)
- Mono: `JetBrains Mono` (system labels, node IDs)

### Layout Philosophy

- Full-width dark product sections
- Cards only for repeated entities (tools, solutions, use-cases)
- Wide cinematic bands for system maps and workflow visuals
- Dense functional layouts for docs/help/pricing/tool pages
- Strong section rhythm, constrained reading width (max 760px prose)

---

## 4. Architecture

### Data Layer (`src/data/`)

Rebuilt files:
- `taxonomy.js` — 9 categories, 40 subcategories, full tool list (121 tools)
- `tools.js` — All 121 tools with: slug, name, tagline, category, subcategory, description, useCases, inputs, outputs, howItWorks, integrations, relatedTools, toolType, faqs
- `categories.js` — 9 categories with: slug, name, description, businessRelevance, targetUsers, accentColor, heroMedia, featuredTools
- `subcategories.js` — 40 subcategories with: slug, categorySlug, name, description, problemSolved, tools
- `solutions.js` — 8 solution packages with tool stacks
- `useCases.js` — 10 use-case records by role/industry
- `integrations.js` — 12 integration category records
- `navigation.js` — mega-menu structure derived from taxonomy

### Routing (`src/App.jsx`)

Full URL structure per blueprint:
```
/                              → Home
/tools                         → Tools Index
/category/:slug                → Category Page (9)
/category/:slug/:subSlug       → Subcategory Page (40)
/tools/:slug                   → Tool Detail (121)
/solutions                     → Solutions Index
/solutions/:slug               → Solution Detail (8)
/use-cases                     → Use Cases Index
/use-cases/:slug               → Use Case Detail (10)
/integrations                  → Integrations Index
/integrations/:slug            → Integration Detail (12)
/docs                          → Docs Index
/docs/:slug                    → Docs Collection (9)
/help                          → Help Center
/help/:slug                    → Help Topic (9)
/faq                           → FAQ
/pricing                       → Pricing
/demo                          → Demo
/talk-to-agentix               → Talk to Agentix
/about                         → About
/contact                       → Contact
/security                      → Security
/status                        → Status
/changelog                     → Changelog
/privacy                       → Privacy
/terms                         → Terms
/search                        → Search
/404 / *                       → 404
```

### Component System (`src/components/`)

**Global shell:**
- `layout/Navbar.jsx` — sticky glass nav, mega-menu, mobile drawer
- `layout/Footer.jsx` — dark footer with animated system line
- `layout/AssistantDock.jsx` — persistent bottom-right voice/chat pill
- `layout/CommandPalette.jsx` — search overlay

**UI primitives:**
- `ui/Button.jsx` — primary/secondary/ghost variants
- `ui/Card.jsx` — tool card, category card, solution card, use-case card
- `ui/Badge.jsx` — category chip, subcategory chip
- `ui/Accordion.jsx` — FAQ
- `ui/Tabs.jsx` — subcategory explorer, use-case tabs
- `ui/FilterBar.jsx` — tool index filters
- `ui/WorkflowMap.jsx` — animated node-edge diagram
- `ui/SystemMap.jsx` — homepage interactive canvas system map
- `ui/OutputPreview.jsx` — tool sample output panel
- `ui/BeforeAfter.jsx` — before/after slider
- `ui/VoiceWaveform.jsx` — animated waveform orb
- `ui/PricingCard.jsx` — pricing plan card
- `ui/ComparisonTable.jsx` — feature comparison
- `ui/StatusIndicator.jsx` — green/amber/red status dots
- `ui/RevealWrapper.jsx` — scroll-triggered Framer Motion wrapper (keep existing)

**Section components (reusable across templates):**
- `sections/Hero.jsx` — hero with left/right split
- `sections/CategoryGrid.jsx` — 9-category preview grid
- `sections/ToolGrid.jsx` — filterable tool card grid
- `sections/WorkflowStrip.jsx` — horizontal workflow ribbon
- `sections/SolutionCards.jsx` — solution outcome cards
- `sections/UseCaseTabs.jsx` — segmented use-case section
- `sections/TrustLayer.jsx` — testimonials + metrics + badges
- `sections/FAQSection.jsx` — two-column FAQ accordion
- `sections/CTABand.jsx` — closing CTA band
- `sections/IntegrationGrid.jsx` — integration pill grid

---

## 5. Page Templates

### Template: Category Page (9 pages)
12 sections — driven by `taxonomy.js` data. Dynamic via `/category/:slug`.

### Template: Subcategory Page (40 pages)
9 sections — driven by subcategory + tool data. Dynamic via `/category/:slug/:subSlug`.

### Template: Tool Page (121 pages)
13 sections — driven by `tools.js`. Dynamic via `/tools/:slug`. Tool type determines hero media and preview variant.

### Template: Solution Page (8 pages)
10 sections. Dynamic via `/solutions/:slug`.

### Template: Use Case Page (10 pages)
9 sections. Dynamic via `/use-cases/:slug`.

### Template: Integration Page (12 pages)
7 sections. Dynamic via `/integrations/:slug`.

### Template: Docs Collection Page (9 pages)
5 sections. Dynamic via `/docs/:slug`.

### Template: Help Topic Page (9 pages)
5 sections. Dynamic via `/help/:slug`.

---

## 6. Media Strategy

User has provided a `/public/agentix-generated-media/` folder. All images and videos from that folder will be placed per the blueprint's image/video placement rules.

Where media files aren't yet available: use dark gradient placeholder panels with the category accent color, consistent with the design system. No stock photography.

---

## 7. Animation Principles

- Scroll-triggered reveals: `Framer Motion` + `react-intersection-observer` (existing setup)
- System map: SVG/Canvas animated nodes with CSS transitions
- Workflow paths: SVG `stroke-dashoffset` animation on scroll
- Voice waveform: CSS keyframe bars
- Mega menu: staggered Framer Motion children
- Mobile drawer: slide-up Framer Motion animation
- Reduced-motion: all animations respect `prefers-reduced-motion`

---

## 8. Build Phases (Build Order from Blueprint §30)

### Phase 1 — Foundation
- Tailwind config overhaul (dark tokens, category colors, new fonts)
- Rebuild `src/data/` — full taxonomy, all 121 tools, 9 cats, 40 subcats, solutions, use-cases, integrations
- Update `src/index.css` — Google Fonts, CSS variables, dark base
- Rebuild global shell: Navbar (mega-menu), Footer, AssistantDock, CommandPalette
- Build UI primitive components

### Phase 2 — Homepage
- All 14 sections per blueprint §5
- Interactive System Map (canvas/SVG)
- Featured Workflow Strip
- Tool Preview Theatre
- Voice Assistant CTA band

### Phase 3 — Tools Index (`/tools`)
- 8 sections with search, filters, category directory, tool grid

### Phase 4 — Category Template + 9 Category Pages
- 12-section template
- All 9 category pages with correct data, accents, and media

### Phase 5 — Subcategory Template + 40 Subcategory Pages
- 9-section template
- All 40 subcategory pages populated

### Phase 6 — Tool Template + 121 Tool Pages
- 13-section template with tool-type media variants
- All 121 tool detail pages

### Phase 7 — Solutions + Use Cases
- Solutions index + 8 solution pages
- Use cases index + 10 use-case pages

### Phase 8 — Pricing, Demo, Talk to Agentix

### Phase 9 — Integrations (index + 12 detail pages)

### Phase 10 — Docs, Help, FAQ

### Phase 11 — Company + Trust + Legal + Utility
- About, Contact, Security, Status, Changelog, Privacy, Terms
- Search, 404, 500, Cookie Preferences, Accessibility Statement

### Phase 12 — Final Passes
- SEO metadata (react-helmet-async) on every page
- Analytics event hooks
- Accessibility audit (keyboard nav, focus states, ARIA labels, alt text)
- Performance audit (lazy loading, video posters, animation optimization)
- Visual polish and motion tuning

---

## 9. Quality Gates

Each phase is complete only when:
- All pages render without errors
- All data-driven routes resolve correctly
- Responsive layout holds at 375px, 768px, 1280px, 1440px
- No orphaned pages (every page linked from nav or parent)
- Dark theme consistent throughout (no light theme leakage)
- Media placed per blueprint rules or graceful placeholder shown

---

## 10. What This Replaces

All existing pages are rebuilt or replaced:
- `Home.jsx` → full 14-section dark homepage
- `CategoryPage.jsx` → 12-section dark category template
- `ToolPage.jsx` → 13-section dark tool template
- `About.jsx`, `Blog.jsx`, `Press.jsx` → rebuilt per blueprint
- `Navbar.jsx`, `Footer.jsx` → full dark redesign with mega-menu + assistant dock
- All existing section components → replaced with new dark design system
- Tailwind config → fully overhauled

Blog, CaseStudies, Career, Resources, IndustryPage, ProductPage, ServicePage — these old routes are replaced by the new taxonomy pages (Docs, Help, Solutions, Use Cases). Blog is retained as a separate route only if content exists; otherwise redirected to /changelog or /resources.
