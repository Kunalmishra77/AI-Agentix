# Global · Navigation, Footer, Contact, Social · source: frontend/src/App.jsx, frontend/src/components/layout/SiteNav.jsx, SiteFooter.jsx, WhatsAppButton.jsx, BrandLogo.jsx

NOTE: There are TWO parallel nav/footer systems in this codebase, used by different route groups:
- **GlobalNav / GlobalFooter** (inline components in App.jsx) — wrap the "platform" routes (/tools, /category/*, /platform/solutions, /use-cases, /integrations, /docs, /help, /search, /pricing, /demo, /faq, /security, /status, /changelog, legal InfoPage routes) via the `<Layout>` wrapper.
- **SiteNav / SiteFooter** (frontend/src/components/layout/SiteNav.jsx, SiteFooter.jsx) — used by the marketing pages (Home, About, Solutions, Industries, Technology, Case Studies, Contact, Privacy, Terms, Refund) which render with their own nav/footer and skip the Layout wrapper.

These two systems have different brand voice, different link sets, and different contact details. Both are captured below.

---

## Brand / company name strings

- Wordmark rendered as "AGENTiX" (styled: A + i in orange, GENT + X in white) — BrandLogo.jsx
- Logo image alt text used elsewhere: "Agentix" (GlobalNav / GlobalFooter, App.jsx)
- Logo aria-label: "AGENTiX Home" (BrandLogo.jsx)
- Legal/registered entity: "SANTURE AI PRIVATE LIMITED" — "A product of SANTURE AI PRIVATE LIMITED" (SiteFooter.jsx)
- Tagline (GlobalFooter, App.jsx): "The AI operating system for ambitious teams. Replace the stack. Run the business."
- Tagline (SiteFooter.jsx, Col 1): "India's #1 end-to-end AI automation partner. Powering intelligent businesses across 15+ industries."
- HomePage `<title>` (inline HomePage in App.jsx, not the marketing HomePage): "Agentix.ai / The AI Operating System for Modern Business"

---

## Navigation — GlobalNav (App.jsx, platform routes)

Logo: links to `/`, image alt "Agentix".

Top nav links:
- Categories (opens MegaMenu, hover + click toggle) → dropdown, no direct destination
- Solutions → /solutions
- Tools → /tools
- Use cases → /use-cases
- Pricing → /pricing
- About → /about
- Contact → /contact

Nav actions:
- Search → /search (icon + label "Search")
- "Talk" button → opens voice agent (dispatches `open-voice-agent` event), not a route
- "Book Demo" button (primary) → /demo
- Mobile menu toggle button (icon only, aria-label "Menu")

### MegaMenu (App.jsx)
- Eyebrow: "All categories / {count}" (count = number of categories, data-derived)
- Per category list item: category name + "{n} workflows / {n} tools" (data-derived, catalog-owned — not reproduced here)
- Detail panel eyebrow: category short name (data-derived)
- Detail panel heading: category name (data-derived)
- Subcategory cards: subcategory name + up to 3 tool chips (data-derived)
- CTA: "View {category.short} Domain" → /category/{id}

### MobileMenu (App.jsx)
- Primary CTA button: "Talk to Agentix" (icon mic) → opens voice agent
- Secondary CTA button: "Book a Demo" → /demo
- Section label: "Categories"
- Category rows: category name (data-derived, not reproduced)
- Section label: "Platform"
- Platform link chips:
  - Tools → /tools
  - Solutions → /solutions
  - Use cases → /use-cases
  - Pricing → /pricing
  - About → /about
  - Blog → /docs
  - Docs → /docs
  - Help → /help
  - Security → /security
  - Contact → /contact

  (Note: "Blog" and "Docs" both point to `/docs` — likely a copy/paste artifact worth flagging.)

### AssistantDock (floating widget, App.jsx — global across platform routes)
- Header title: "Agentix Assistant"
- Initial assistant message: "Hi. I can help you find a tool, build a workflow, or choose a demo route. What's your goal today?"
- Input placeholder: "Type a message..."
- Error fallback message: "Sorry, I'm having trouble connecting right now."
- Suggestion chips (shown when only the initial message is present):
  - "Find a sales tool" → /category/sales
  - "Build a content stack" → /solutions/content-studio
  - "Compare plans" → /pricing
  - "Talk to a human" → /contact
- Trigger button aria-label: "Open assistant"
- Close button (dialog aria-label): "Agentix assistant"

### Agent page-scan effect (App.jsx, global overlay)
- Badge text while active: "AI navigating"

---

## Footer — GlobalFooter (App.jsx, platform routes)

- Logo image alt "Agentix"
- Body copy: "The AI operating system for ambitious teams. Replace the stack. Run the business."
- FooterCol "Categories" — first 5 categories (data-derived, catalog-owned)
- FooterCol "More" — remaining categories (data-derived, catalog-owned)
- FooterCol "Platform":
  - Tools → /tools
  - Solutions → /solutions
  - Use cases → /use-cases
  - Pricing → /pricing
  - Demo → /demo
- FooterCol "Resources":
  - Docs → /docs
  - Help → /help
  - FAQ → /faq
  - Security → /security
  - Changelog → /changelog
  - Contact → /contact
- Copyright: "© 2026 Agentix.ai / All rights reserved" (mono style)
- Footer meta / legal links:
  - Privacy → /privacy
  - Terms → /terms
  - Cookies → /cookie-preferences
  - Status → /status (with a live-status dot indicator, no text label besides "Status")

---

## Navigation — SiteNav.jsx (marketing routes)

Nav links:
- Home → /
- About → /about
- Solutions → /solutions (has mega dropdown)
- Industries → /industries (has mega dropdown)
- Technology → /technology
- Case Studies → /case-studies
- Contact → /contact

CTA (desktop + mobile, both identical): "Get a Free AI Audit" → /contact

### Solutions mega dropdown
- Header title: "AI Solutions"
- Header tagline: "End-to-end automation for every business function"
- Header CTA: "All Solutions" → /solutions
- Header stat: "200+" / "automations deployed"
- Items (label — destination — description):
  - Sales Automation → /solutions/sales-automation — "AI-powered lead scoring, follow-ups & CRM sync"
  - Marketing Automation → /solutions/marketing-automation — "Multi-channel campaigns on autopilot"
  - HRMS & Hiring → /solutions/hrms-hiring — "Screen, schedule & onboard candidates with AI"
  - Operations → /solutions/operations — "Eliminate bottlenecks across every workflow"
  - Supply Chain → /solutions/supply-chain — "Real-time tracking, alerts & procurement AI"
  - Finance & Accounts → /solutions/finance-accounts — "Auto-reconciliation, invoicing & GST filing"
  - AI Voice & Chat → /solutions/ai-voice-chat — "24/7 voice agents & WhatsApp bots"
  - Manufacturing → /solutions/manufacturing — "Predictive maintenance & quality inspection"
  - Hospital Management → /solutions/hospital-management — "End-to-end HMS automation for modern hospitals"
  - AI Studio → /ai-studio — "AI content, videos, social & email on autopilot"

### Industries mega dropdown
- Header title: "Industries We Serve"
- Header tagline: "Deep domain expertise across 15+ sectors"
- Header CTA: "All Industries" → /industries
- Header stat: "15+" / "industries covered"
- Items (label — destination — description):
  - Healthcare → /industries/healthcare — "Appointment bots, patient follow-up & billing AI"
  - Education → /industries/education — "Admissions automation & student engagement"
  - Hospitality → /industries/hospitality — "Booking management & guest experience AI"
  - Real Estate → /industries/real-estate — "Lead nurturing & property recommendation AI"
  - Retail & E-commerce → /industries/retail-ecommerce — "Personalisation, returns & inventory automation"
  - Manufacturing → /industries/manufacturing — "Shop-floor AI, defect detection & OEE tracking"
  - Logistics → /industries/logistics — "Route optimisation & delivery status automation"

Mobile menu: same NAV_LINKS list rendered as full-width rows, plus the same "Get a Free AI Audit" CTA at the bottom.

---

## Footer — SiteFooter.jsx (marketing routes)

### Partner marquee
- Caption: "Powered by the world's most powerful AI platforms"
- Partner name pills (brand names, scrolling marquee, not descriptive copy): OpenAI, Google Cloud, AWS, Meta AI, Twilio, Razorpay, n8n, Make, Anthropic, WhatsApp, HubSpot, LangChain

### Col 1 — Brand
- Body copy: "India's #1 end-to-end AI automation partner. Powering intelligent businesses across 15+ industries."
- Social links (icon + destination + label):
  - LinkedIn → https://www.linkedin.com/company/ai-agentix/about/
  - Instagram → https://www.instagram.com/ai_agentix
  - Facebook → https://www.facebook.com/aiagentix
  - Twitter / X → https://x.com/ai_agentix
  - WhatsApp → https://wa.me/919217064245

### Col 2 — "Solutions" (title)
Links (all point to /solutions):
- Sales Automation
- Marketing Automation
- HRMS & Hiring
- Operations
- Supply Chain
- Finance & Accounts
- Voice & Chat Agents
- Manufacturing

### Col 3 — "Industries" (title)
Links (all point to /industries):
- Healthcare
- Education
- Hospitality
- Real Estate
- Retail & E-commerce
- Manufacturing
- Logistics

### Col 4 — "Company" (title)
- About Us → /about
- Technology → /technology
- AI Studio → /ai-studio
- Case Studies → /case-studies
- Contact → /contact
- Careers → /contact#careers
- Partner With Us → /contact#partnerships

### Col 5 — "Stay Updated" (title)
- Body copy: "Weekly insights on AI automation for Indian businesses."
- Newsletter form: email input placeholder "Your email"; submit label "Subscribe" (loading state: "Subscribing…"); success message: "You're subscribed!"
- Sub-block title: "Contact"
- Contact details:
  - Email: myai@ai-agentix.com
  - Phone: +91 92170 64245
  - Address: New Delhi, India

### Bottom bar
- Copyright: "© {year} AGENTiX. All rights reserved. Powering India's Automation Revolution." (year computed dynamically)
- Legal entity line: "A product of SANTURE AI PRIVATE LIMITED"
- Legal links:
  - Privacy Policy → /privacy
  - Terms of Service → /terms
  - Refund Policy → /refund

---

## WhatsApp button (WhatsAppButton.jsx — floating widget, appears sitewide independent of the two nav systems)

- Link destination: `https://wa.me/91XXXXXXXXXX?text=Hi%20AI%20Agentix%2C%20I%27d%20like%20a%20free%20AI%20audit`
  - **AMBIGUOUS/LIKELY BUG**: the phone number is a literal placeholder `91XXXXXXXXXX`, not a real number — the real WhatsApp number used elsewhere (SiteFooter, contact block) is `+91 92170 64245` / `919217064245`. Flag for reconciliation before launch.
  - Pre-filled message text (decoded): "Hi AI Agentix, I'd like a free AI audit"
- aria-label: "Chat on WhatsApp"

## Contact info (consolidated)

- Email: myai@ai-agentix.com
- Phone / WhatsApp: +91 92170 64245 (WhatsApp deep link uses 919217064245)
- Address: New Delhi, India
- Social: LinkedIn, Instagram, Facebook, Twitter/X, WhatsApp (URLs above)

## Cookie / consent text

No cookie-consent banner text found inline in App.jsx, SiteNav.jsx, or SiteFooter.jsx. A "Cookie Preferences" page exists at /cookie-preferences (see content-archive/pages/legal-info.md) but there is no separate banner/toast copy in the reviewed files.
