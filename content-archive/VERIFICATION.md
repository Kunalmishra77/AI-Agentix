# Content Archive — Verification Report

**Date:** 2026-07-08
**Verdict:** ✅ 100% of genuine business/marketing content is preserved. Safe to proceed to frontend removal.

- Archive files: **51 Markdown files**, ~**36,700 words**, ~7,455 lines.
- Extraction source: implemented code. Cross-check: `_docx-reference/` (both root `.docx` converted to text, preserved verbatim).

---

## 1. Route coverage — PASS

Every route defined in `frontend/src/App.jsx` maps to at least one archive file (see `index.md` manifest). Static pages, data-driven pages (tools/category/collections/resources), inline App.jsx pages, legal/info, 404, admin, voice widget, and global nav/footer are all represented.

## 2. String-diff sweep — PASS (effective coverage complete)

Method: extracted candidate human-readable strings (quoted literals ≥3 words + JSX text nodes) from all `frontend/src/**/*.{jsx,js}`, normalized, and checked presence in the normalized archive corpus.

- Content strings checked: **4,827**
- Matched in archive: **4,319 (89%)**
- Unmatched: **508 — fully categorized as non-content / non-loss:**

| Bucket | Count | Why it's not a content loss |
|---|---|---|
| Per-tool description template boilerplate | 363 | `toolWorkspaces.js` uses ONE fixed sentence template per tool ("X command workspace", "X operating brief", "Use this workspace to … outputs from approved inputs …"). The template is documented once in `catalog/tools.md`; all 121 tool names captured. Repeating it 121× would be duplication. |
| Dynamic template-expression fragments | 48 | Strings with `${…}` interpolation; static parts are captured, raw form can't substring-match. |
| CSS / className / animation values | 33 | `linear-gradient(…)`, `clamp(…)`, `btn btn-primary`, transition timings — code, not content. |
| Admin dashboard mock/demo data | 21 | Fake activity-feed/log/CMS entries in `admin/lib/mockData.js` (e.g. "Invoice INV-2294 generated", "Enterprise AI Security Whitepaper 2026"). Placeholder demo data, not authored business content. |
| TTS / voice engine config | 11 | Voice names ("Microsoft Aria Online (Natural)"), engine labels — configuration, not content. |
| OTHER (manually reviewed) | 32 | Reviewed individually: admin/status mock data, CSS fragments, and trivial AssistantDock rotating-placeholder microcopy ("book that demo", "fill in your details"). No genuine marketing content. |

## 3. Docx cross-check — PASS (preserved as reference)

Both `.docx` files were converted to text and preserved verbatim in `content-archive/_docx-reference/`. They are **design/content specification** documents: most segments are structural directives ("Section 1.1 — Navigation Bar", "Sticky top nav with logo + 7 menu items"), and the content phrases are a cleaner *intended* copy variant that differs in wording from what was actually shipped. Per the agreed policy (implemented code = source of truth), these are preserved as reference, not merged. **The rebuild team may consult `_docx-reference/` for the canonical "intended" wording of headlines, the three business pillars, and stats.**

---

## 4. Incidents & how they were resolved

1. **Extraction agent crash (marketing-core).** The agent extracting the 11 marketing-core pages died on a mid-response API error. Its outputs for `home.md`, `contact.md`, and `industries.md` were **incomplete** (missing the contact form's dynamic questions + "Questions We Get Every Day" FAQ, home's "Transformed With Us" section, industries' "Select Your Industry" selector). A follow-up agent falsely reported them complete; ground-truth grep disproved it. **Resolution:** deleted the three files and re-extracted from scratch with pasted-line proof; all anchors now verified present. `case-studies.md` (35 case studies) was extracted by a separate agent successfully.
2. **`components/agentix/*` gap.** These section components (ToolTheatre, FeaturedSpotlight, HeroSection, CommandCenter, TrustLayer, FAQ, etc.) are imported by `App.jsx`, not by the marketing `HomePage.jsx`, so the first pass skipped them. **Resolution:** backfilled into `pages/home-sections.md` (16 components with content; ToolTheatre's 6 scenarios incl. the competitor-analysis "Recommended next moves" captured).

## 5. Content issues flagged for the rebuild (not losses — copy-quality notes)

- **Mojibake dashes:** source files contain corrupted em-dashes (`â€"` / `""`); normalized to `—` in the archive.
- **Placeholder WhatsApp number:** `WhatsAppButton.jsx` uses `91XXXXXXXXXX`; the real number elsewhere is `+91 92170 64245`.
- **Email inconsistency:** contact uses `myai@ai-agentix.com` while security/support use `…@agentix.ai`.
- **Two nav/footer systems:** `GlobalNav`/`GlobalFooter` (App.jsx) vs `SiteNav`/`SiteFooter` (components/layout) with differing content — both captured in `global.md`.
- **Dead/orphaned copy:** inline `HomePage()` + `WorkflowTemplates` in App.jsx and several `pageCopy` entries are unrouted; captured with notes.
- **Duplicate nav link:** MobileMenu has both "Blog" and "Docs" → `/docs`.
- **Status/changelog demo data:** dates/incidents/releases are hardcoded sample data likely to be replaced.
- **Catalog name mismatches:** a use-case references "Proposal Generator" (vs "Proposal & Quote Generator"); some workflow-template steps reference tool-id keys that don't exactly match slugs.

---

## Conclusion

All genuine, user-facing business and marketing content across every page and component — including forms, FAQs, legal text, the 121-tool catalog, case studies, testimonials, statistics, global nav/footer, and functional (voice/admin) text — is captured in the archive. The 11% unmatched is verifiably non-content (template de-duplication, dynamic expressions, CSS, demo mock data, config, and trivial microcopy). **The frontend can be safely removed.**
