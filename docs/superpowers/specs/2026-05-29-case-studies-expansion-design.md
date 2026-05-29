# Case Studies Page — Expansion & UX Design
**Date:** 2026-05-29  
**Status:** Approved  
**Approach:** Flat grid with global expand/collapse (Approach A)

---

## Problem Statement

The current `CaseStudiesPage.jsx` has:
- 7 case studies total — exactly one per industry
- Industry filter pills are decorative (clicking "Healthcare" shows 1 card)
- No pagination or expand/collapse — all cards always render
- "We've Automated Across" section maps directly from `CASES`, so it shows 7 tiles that will balloon to 35 after expansion

## Target State

- **35 case studies** — 5 per industry × 7 industries
- **Read More / Read Less button pair** visible together in the "All" view; default shows first 9 cards
- **Industry filters** show all 5 cards for that industry (no expand needed)
- **"We've Automated Across"** shows 7 deduplicated industry tiles with case count badges

---

## Architecture

### File Changed
`frontend/src/pages/marketing/CaseStudiesPage.jsx` — single file, no new files needed.

### Data Layer

**Expand `CASES` from 7 → 35 entries.** Same schema per entry:
```js
{
  id, industry, icon, color, client, location,
  tagline, readTime, excerpt, challenge, background,
  solution: [],   // 5 items
  process: [],    // 4 phases
  stats: [],      // 4 metrics
  timeline, quote, quoteBy, tags: []
}
```

**Industry → 5 cases each:**

| Industry | Existing | 4 New Clients |
|---|---|---|
| Healthcare | Multi-Specialty Clinic | Dental Chain, Diagnostic Lab, Pharmacy Chain, Ayurveda Wellness Clinic |
| Education | CA & CMA Coaching | K-12 Admissions, Engineering College Placements, Online EdTech Platform, Language Institute |
| Real Estate | 500-unit Developer | Commercial Office Leasing, Plotted Villa Project, Real Estate Broker Agency, Co-working Space |
| E-commerce | D2C Fashion | B2B Wholesale Marketplace, Electronics Accessories D2C, Grocery Delivery, Artisan Products |
| Logistics | Last-Mile Delivery | 3PL Warehouse, Courier Aggregator, Cold Chain Pharma, International Freight Forwarder |
| Hospitality | Boutique Hotel Chain | Restaurant Chain, Resort & Spa, Homestay/Vacation Rental, Event Venue |
| Manufacturing | Auto Components | Textile Mill, Food Processing Plant, Chemical Manufacturer, Furniture Maker |

### State

```js
const [filter, setFilter] = useState('All');
const [openCase, setOpenCase] = useState(null);
const [expanded, setExpanded] = useState(false);   // NEW

const VISIBLE_COUNT = 9;  // NEW constant

const filtered = filter === 'All' ? CASES : CASES.filter(c => c.industry === filter);
const displayed = (filter === 'All' && !expanded)
  ? filtered.slice(0, VISIBLE_COUNT)
  : filtered;
const showToggle = filter === 'All' && filtered.length > VISIBLE_COUNT;  // only in All view
```

Reset `expanded` to `false` when filter changes.

### Read More / Read Less Button Pair

Rendered below the cards grid, visible only when `showToggle` is true. Both buttons always present side by side:

```
[ Read Less ]   [ Read More → ]
```

- **Read Less**: collapses back to 9 cards. Styled secondary (outline) when already collapsed.
- **Read More**: expands to all 35. Styled primary (orange filled) when collapsed.
- When expanded: Read Less becomes primary (orange), Read More becomes secondary.
- Smooth scroll to top of grid on collapse.

### "We've Automated Across" Section Fix

Currently renders `{CASES.map(...)}` — will show 35 tiles after expansion.

**Replace** with a derived `INDUSTRY_SUMMARY` that deduplicates to 7:

```js
const INDUSTRY_SUMMARY = INDUSTRIES.filter(i => i !== 'All').map(ind => {
  const cases = CASES.filter(c => c.industry === ind);
  const first = cases[0];
  return {
    industry: ind,
    icon: first.icon,
    color: first.color,
    count: cases.length,
    headline: first.stats[0],   // best metric from first (anchor) case
    id: first.id,
  };
});
```

Each tile shows: industry icon, industry name, "5 case studies" count badge, and anchor metric.

---

## Component Changes

| Component | Change |
|---|---|
| `CASES` constant | Expand from 7 → 35 entries |
| `CaseStudiesPage` state | Add `expanded` + reset on filter change |
| Grid section | Render `displayed` not `filtered`; add Read More/Less button pair |
| Hero badge | Update "7 Case Studies" → "35 Case Studies" |
| "We've Automated Across" | Render `INDUSTRY_SUMMARY` (7 tiles) instead of `CASES` (35 tiles) |
| `CaseCard` | No change |
| `ArticleModal` | No change |

---

## Spec Self-Review

- ✅ No placeholders or TBDs
- ✅ `expanded` state reset on filter change prevents stale state
- ✅ `showToggle` condition prevents Read More/Less appearing on filtered industry views
- ✅ "We've Automated Across" uses derived summary — won't break when more cases added later
- ✅ All new cases use the exact same schema as existing ones — no modal changes needed
- ✅ Scope is one file only — low blast radius
