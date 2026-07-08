# Homepage — Required Assets Checklist

Every visual below is currently a **labeled placeholder** at the correct dimensions and aspect ratio. Drop the real asset in and no layout changes are needed. Placeholders are marked in the DOM with a `data-asset="…"` attribute for easy find/replace.

## 1. Hero
| Asset | Spec | Where |
|---|---|---|
| **Hero background** | 1920×1080 (or larger), dark tech / office / industrial mood; text sits on the left, so keep the left side calm | `components/home/Hero.jsx` — `data-asset="hero-background-image"` |

## 2. Brand logo (optional upgrade)
Currently the wordmark **AGENTiX** is rendered in CSS (Poppins, A+i in orange). Provide if you want the exact brand mark:
| Asset | Spec |
|---|---|
| Logo — light version (for dark nav/footer) | SVG, transparent |
| Logo — dark version (for light backgrounds) | SVG, transparent |
| Favicon | already present at `public/favicon.svg` |

## 3. Partner / platform logos — 16
Marquee currently shows the **names as text**. Provide monochrome SVG logos (they'll be shown grayscale, colored on hover):
`OpenAI, Anthropic, Google Cloud, AWS, Meta AI, Azure, HubSpot, Make, WhatsApp, Twilio, Razorpay, LangChain, n8n, Groq, Zapier, Slack`
(Footer reuses a subset of 12.) — `components/home/PlatformMarquee.jsx`, `components/layout/SiteFooter.jsx`

## 4. Core Capabilities
| Asset | Spec | Where |
|---|---|---|
| **Capability featured visual** | 16:9, product/dashboard shot for the "Agentic AI Solutions" featured card | `components/home/Capabilities.jsx` |

## 5. Solutions (tabbed explorer) — 9
One **4:3** visual per solution tab — `components/home/Solutions.jsx`:
`AI Sales Agent, AI Customer Support, AI Content Engine, Business Intelligence, HR & Ops Automation, E-commerce Automation, Voice AI Agents, Finance & GST Automation, WhatsApp Marketing`

## 6. Industries (tabbed panel) — 7
One visual per industry — `components/home/Industries.jsx`:
`Real Estate, Healthcare, Education, Retail & E-com, Logistics, Hospitality, Manufacturing`

## 7. Case Studies — 2
16:9 image per case study — `components/home/CaseStudies.jsx`:
`PropTech Startup, Mumbai` · `D2C Brand, Bengaluru`

## 8. Testimonials (optional)
Avatars currently render as initials on an orange/ink chip. Optionally provide **client headshots or company logos** (1:1) for the 10 testimonials — `components/home/Testimonials.jsx`.

---

### Summary counts
- 1 hero background
- 2 logo variants (optional) + favicon (done)
- 16 partner logos
- 1 capability featured visual
- 9 solution visuals
- 7 industry visuals
- 2 case-study images
- 10 testimonial avatars (optional)

**Total core assets to supply: ~36** (excluding optional avatars). Dimensions and layout are already locked in — assets can be integrated in the next iteration without redesign.
