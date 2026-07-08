# Content Archive — Manifest & Single Source of Truth

This archive holds **100% of the existing website's textual content**, UI-free (no JSX, CSS, layout, or animation code). It is the source of truth for the ADDEPTO-referenced rebuild.

- **Extraction source:** implemented code (`frontend/src/pages/**`, content components, `App.jsx`, `data/*.js`, `voice-agent/*`, `admin/*`).
- **Cross-check reference:** `_docx-reference/` (converted from the two root `.docx` files).
- **Format:** see `FORMAT.md`.
- **Retained assets:** see `assets-kept.md` (720 files under `frontend/public/` kept).

## Page manifest

| Route(s) | Page | Archive file | Content type | Status |
|---|---|---|---|---|
| `/` | Home | `pages/home.md` | static + components | archived |
| `/about` | About (marketing) | `pages/about.md` | static | archived |
| `/solutions` | Solutions index | `pages/solutions.md` | static | archived |
| `/solutions/sales-automation` | Sales Automation | `pages/solutions/sales-automation.md` | static | archived |
| `/solutions/marketing-automation` | Marketing Automation | `pages/solutions/marketing-automation.md` | static | archived |
| `/solutions/hrms-hiring` | HRMS & Hiring | `pages/solutions/hrms-hiring.md` | static | archived |
| `/solutions/operations` | Operations | `pages/solutions/operations.md` | static | archived |
| `/solutions/supply-chain` | Supply Chain | `pages/solutions/supply-chain.md` | static | archived |
| `/solutions/finance-accounts` | Finance & Accounts | `pages/solutions/finance-accounts.md` | static | archived |
| `/solutions/ai-voice-chat` | AI Voice & Chat | `pages/solutions/ai-voice-chat.md` | static | archived |
| `/solutions/manufacturing` | Manufacturing (solution) | `pages/solutions/manufacturing.md` | static | archived |
| `/solutions/hospital-management` | Hospital Management | `pages/solutions/hospital-management.md` | static | archived |
| `/industries` | Industries index | `pages/industries.md` | static | archived |
| `/industries/healthcare` | Healthcare | `pages/industries/healthcare.md` | static | archived |
| `/industries/education` | Education | `pages/industries/education.md` | static | archived |
| `/industries/hospitality` | Hospitality | `pages/industries/hospitality.md` | static | archived |
| `/industries/real-estate` | Real Estate | `pages/industries/real-estate.md` | static | archived |
| `/industries/retail-ecommerce` | Retail & E-commerce | `pages/industries/retail-ecommerce.md` | static | archived |
| `/industries/manufacturing` | Manufacturing (industry) | `pages/industries/manufacturing.md` | static | archived |
| `/industries/logistics` | Logistics | `pages/industries/logistics.md` | static | archived |
| `/ai-studio` | AI Studio | `pages/ai-studio.md` | static | archived |
| `/technology` | Technology | `pages/technology.md` | static | archived |
| `/case-studies` | Case Studies | `pages/case-studies.md` | static | archived |
| `/contact` | Contact (marketing) | `pages/contact.md` | static | archived |
| `/privacy` | Privacy | `pages/privacy.md` | legal | archived |
| `/terms` | Terms | `pages/terms.md` | legal | archived |
| `/refund` | Refund | `pages/refund.md` | legal | archived |
| `/tools`, `/tools/:toolId` | Tools index + detail | `pages/app-shell.md` + `pages/catalog/tools.md` | shell + data | archived |
| `/category/:categoryId(/:subId)` | Category | `pages/app-shell.md` + `pages/catalog/categories.md` | shell + data | archived |
| `/platform/solutions(/:id)` | Platform Solutions collection | `pages/app-shell.md` + `pages/catalog/solutions-platform.md` | shell + data | archived |
| `/use-cases(/:id)` | Use Cases collection | `pages/app-shell.md` + `pages/catalog/use-cases.md` | shell + data | archived |
| `/use-cases/{agencies,founder-led-businesses,operations-teams,saas}` | Use-case redirects | `pages/catalog/use-cases.md` | redirect | archived |
| `/integrations(/:id)` | Integrations | `pages/app-shell.md` + `pages/catalog/resources.md` | shell + data | archived |
| `/docs(/:id)` | Docs | `pages/app-shell.md` + `pages/catalog/resources.md` | shell + data | archived |
| `/help(/:id)` | Help | `pages/app-shell.md` + `pages/catalog/resources.md` | shell + data | archived |
| `/search` | Search | `pages/app-shell.md` | shell | archived |
| `/pricing` | Pricing | `pages/site/pricing.md` | static | archived |
| `/demo` | Demo | `pages/site/demo.md` | static | archived |
| `/talk-to-agentix` | Talk to Agentix (currently redirects → `/`) | `pages/site/talk.md` | static | archived |
| `/faq` | FAQ | `pages/site/faq.md` | static | archived |
| `/security` | Security | `pages/site/security.md` | static | archived |
| `/status` | Status | `pages/site/status.md` | static | archived |
| `/changelog` | Changelog | `pages/site/changelog.md` | static | archived |
| legal/info ids (privacy-policy, cookies, cookie-preferences, …) | Info/Legal pages | `pages/legal-info.md` | legal/info | archived |
| `/404`, `*` | Not Found | `pages/app-shell.md` | shell | archived |
| `/admin/*` | Admin app (to be deleted) | `pages/app/admin.md` | functional text | archived |
| (global widget) | Voice agent (to be deleted) | `pages/app/voice-agent.md` | functional text | archived |
| (all pages) | Global nav / footer / contact / meta | `global.md` | global | archived |
| — | `pages/site/about.md`, `pages/site/contact.md` | possibly-unused site variants (archived for safety) | static | archived |

## Verification
See `VERIFICATION.md` (written by the verification pass).
