# 🧠 WORLD-CLASS MASTER PROMPT
## AI Agentix Website Revamp — Pixel-Perfect Mirror of addepto.com
### Full-Stack React + Node.js + MongoDB Edition
### Anthropic Engineering-Grade Brief · April 2026

---

> **INSTRUCTIONS FOR USE:**
> Copy this entire document and pass it to Claude, GPT-4o, Cursor AI, or any
> senior AI coding agent. This is a self-contained, zero-ambiguity engineering
> brief. The agent should produce production-ready code on the first pass.

---

## 🎯 MISSION STATEMENT

You are a Principal Full-Stack Engineer and Senior UI/UX Designer with 15+ years
building world-class AI company websites. Your task is to perform a COMPLETE,
pixel-perfect revamp of the **ai-agentix.com** website.

**Design Reference (copy everything visual):** https://addepto.com/
**Content Source (preserve all text/data):** https://ai-agentix.com/
**Stack:** React 18 + Vite + Tailwind CSS + Framer Motion + Node.js + Express + MongoDB

The final result must be **indistinguishable in layout and visual design from
addepto.com**, while using AI Agentix's brand identity, services, content, and
business context.

---

## 📐 SECTION 1 — EXACT PAGE STRUCTURE (Mirror addepto.com 1:1)

Replicate every section in this **exact order**, with **exact visual treatment**:

```
PAGE ORDER (top → bottom):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1.  Announcement Banner (sticky top strip)
 2.  Navigation Bar (sticky, mega-menu, dual logo)
 3.  Hero Section (fullscreen video/bg, H1, 2 CTAs)
 4.  Three Service Highlight Boxes (below hero, dark bg)
 5.  "Our Clients" Logo Grid (30+ logos, 5-col grid)
 6.  "Our Core Capabilities" (6 capability cards)
 7.  "Customer Stories" Slider (case study carousel)
 8.  "Industry Expertise" (tabbed, 6 industries)
 9.  Product Spotlight ("ContextClue" equivalent = AI Agentix product)
10.  "Cooperation Models" (4 model cards)
11.  "Company Insights" (dual-tab: Resources + Blog Articles)
12.  "We Are Recognized" (awards & badges)
13.  "Outrun Competition" (4-tab tech deep-dive section)
14.  "Contact Us" CTA Section
15.  Footer (multi-column: sitemap, services, solutions, HQ, blog, legal)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎨 SECTION 2 — COMPLETE DESIGN SYSTEM (Extracted from addepto.com)

### 2.1 COLOR PALETTE

```css
/* === EXACT ADDEPTO.COM COLOR TOKENS === */
:root {
  /* Backgrounds */
  --color-bg-primary:      #000000;   /* Pure black - hero, dark sections    */
  --color-bg-secondary:    #0d0d0d;   /* Near-black - card bg, nav           */
  --color-bg-tertiary:     #141414;   /* Slightly lighter dark               */
  --color-bg-light:        #f7f7f5;   /* Off-white/cream - light sections    */
  --color-bg-white:        #ffffff;   /* Pure white - cards in light sections*/

  /* Brand Accent — Addepto's signature orange-red */
  --color-accent:          #e84d1c;   /* Primary CTA, highlights, links      */
  --color-accent-hover:    #ff5a28;   /* Hover state                         */
  --color-accent-light:    rgba(232,77,28,0.1);  /* Subtle bg tint          */
  --color-accent-border:   rgba(232,77,28,0.3);  /* Subtle border tint      */

  /* Text */
  --color-text-primary:    #ffffff;   /* Primary on dark sections            */
  --color-text-secondary:  #999999;   /* Muted/subtext on dark               */
  --color-text-tertiary:   #666666;   /* Very muted                          */
  --color-text-dark:       #0d0d0d;   /* Primary on light sections           */
  --color-text-dark-muted: #555555;   /* Muted on light sections             */

  /* Borders */
  --color-border-dark:     #1e1e1e;   /* Borders on dark bg                  */
  --color-border-light:    #e5e5e5;   /* Borders on light bg                 */
  --color-border-accent:   rgba(232,77,28,0.4);

  /* Navigation specific */
  --color-nav-bg:          rgba(0,0,0,0.95);
  --color-nav-blur:        blur(20px);
}
```

### 2.2 TYPOGRAPHY

```
FONT STACK (exact addepto.com fonts):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Display/Headings:  "Manrope" (weights: 600, 700, 800, ExtraBold)
                   OR "Plus Jakarta Sans" (weights: 600, 700, 800)
Body Text:         "Inter" (weights: 300, 400, 500)
Monospace:         "JetBrains Mono" (code blocks only)

GOOGLE FONTS IMPORT:
<link href="https://fonts.googleapis.com/css2?
  family=Manrope:wght@600;700;800&
  family=Inter:wght@300;400;500&
  display=swap" rel="stylesheet">

SIZING SCALE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hero H1:          clamp(3rem, 6.5vw, 5.5rem)  | weight 800 | line-height 1.05 | letter-spacing -0.03em
Section H2:       clamp(2rem, 4vw, 3.2rem)    | weight 800 | line-height 1.1  | letter-spacing -0.025em
Card H3:          1.25rem – 1.5rem             | weight 700 | line-height 1.3
Body Large:       1.05rem                      | weight 400 | line-height 1.75
Body Default:     0.9375rem (15px)             | weight 400 | line-height 1.7
Body Small:       0.875rem (14px)              | weight 400 | line-height 1.65
Caption/Eyebrow:  0.75rem (12px)               | weight 600 | letter-spacing 0.12em | UPPERCASE
Nav Links:        0.875rem                     | weight 500
CTA Buttons:      0.9rem                       | weight 700 | letter-spacing 0.02em
```

### 2.3 SPACING & LAYOUT

```
MAX CONTENT WIDTH:  1240px  (centered, margin: 0 auto)
SECTION PADDING:    120px top/bottom (desktop), 80px (tablet), 56px (mobile)
HORIZONTAL PADDING: 48px (desktop), 28px (tablet), 20px (mobile)
CARD PADDING:       40px–48px internal (desktop), 28px (mobile)
GRID GAP (dark):    1px–2px (borderless "touching" cards aesthetic)
GRID GAP (light):   24px–32px (airy cards with space between)
BORDER RADIUS:      0px or 4px max (addepto is almost completely square/sharp)
```

### 2.4 SHADOWS & EFFECTS

```css
/* Addepto uses minimal shadows — mostly border-based separation */
--shadow-card:      0 1px 3px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08);
--shadow-card-dark: 0 4px 24px rgba(0,0,0,0.4);
--shadow-nav:       0 4px 32px rgba(0,0,0,0.5);
--shadow-cta-btn:   0 8px 32px rgba(232,77,28,0.35);

/* Backdrop blur for sticky nav */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```

### 2.5 ANIMATION SYSTEM

```
ALL animations use: cubic-bezier(0.4, 0, 0.2, 1)

Scroll Reveal:    opacity: 0→1  +  translateY: 32px→0  |  duration: 0.7s
Stagger Delay:    0.08s per item in a group
Hover Transitions: 0.25s all
Hover Cards:      translateY(-4px)  +  border-color change
Nav Dropdown:     0.2s opacity + translateY(8px→0)
Hero Parallax:    0.3x scroll multiplier
Button Hover:     translateY(-2px) + shadow intensify
Marquee Speed:    30s linear infinite (logos ticker)
Tab Switch:       0.35s fadeIn + slideUp
Slider:           0.5s transform cubic-bezier
```

---

## 🧩 SECTION 3 — COMPONENT SPECIFICATIONS (Pixel-Level Detail)

### 3.1 ANNOUNCEMENT BANNER

```
VISUAL SPEC:
- Background: var(--color-accent)  [orange-red]
- Height: 44px
- Full viewport width
- Text: 13px, weight 500, white
- Bold keyword inline
- Underlined link (white)
- "×" dismiss button: position absolute right 20px, opacity 0.7
- Stays at very top, above everything including sticky nav
- JS: document.getElementById('banner').style.display='none' on click
- localStorage: remember dismissal so it doesn't reappear

CONTENT TEMPLATE:
"[BOLD: Company News] — [Short announcement text] — [linked: Read more →]"

AI AGENTIX VERSION:
"🚀 AI Agentix is now building enterprise Agentic AI Systems — 
 Discover how we can transform your business →"
```

### 3.2 NAVIGATION BAR

```
VISUAL SPEC:
- Height: 72px (desktop), 60px (mobile)
- Position: sticky, top: 44px (below banner), z-index: 1000
- Background: rgba(0,0,0,0.95) + blur(20px) always (NOT transparent)
- When scrolled past 20px: add box-shadow var(--shadow-nav)
- Border-bottom: 1px solid var(--color-border-dark)

LOGO:
- White version logo (for dark nav background)
- Swap to BLACK version when scrolled onto a LIGHT section (use IntersectionObserver)
- Height: 36px, left-aligned

NAV ITEMS (desktop - flex row, right-aligned):
  Services       → Mega-dropdown (4 columns)
  Solutions      → Mega-dropdown (2 columns: Technologies, Industries)
  Products       → Dropdown (featured cards with image + description)
  About          → Dropdown (About us + Press/Awards)
  Resources      → Dropdown (Blog, Whitepapers, Use Cases)
  Case Studies   → Direct link
  Career         → Direct link
  [CTA] Let's talk → Accent button

NAV LINK STYLES:
- Default: color #999999, font-size 14px, weight 500
- Hover/Active: color #ffffff
- Chevron icon rotates 180deg on hover (CSS transition)
- Active page: underline accent color

MEGA-DROPDOWN SPEC:
- Appears on hover with 0.2s transition
- Background: #0d0d0d
- Border: 1px solid #1e1e1e
- Border-radius: 8px
- Padding: 32px
- Box-shadow: 0 20px 60px rgba(0,0,0,0.7)
- Position: absolute, centered below nav item
- Category labels: 11px, UPPERCASE, letter-spacing 0.1em, color accent
- Links: 13px, color #999, hover → white + indent-left animation (padding-left: 8px→14px)
- Appears/disappears with opacity + translateY(8px→0)

SERVICES MEGA-MENU COLUMNS:
  Col 1 "Discover":       AI Consulting | AI PoC | Automation Audit | AI Strategy
  Col 2 "Organize Data":  Data Engineering | n8n Workflows | Data Governance | Data Platform
  Col 3 "Develop":        AI Agents | LLM Development | Gen AI Development | ML Consulting
  Col 4 "Deploy":         AI Advisory | Chatbot Dev | AI Integration | MLOps | AI Testing

MOBILE NAV:
- Hamburger: 3 lines → X morph animation
- Full-screen overlay slides in from right (translateX 100%→0)
- Background: #000000
- Items stacked vertically, 18px, weight 600
- Sub-items indented, 14px, muted
- "Let's talk" button full-width at bottom, accent bg
```

### 3.3 HERO SECTION

```
VISUAL SPEC:
- Height: 100vh (min-height)
- Background: #000000
- VIDEO BACKGROUND: autoplay, muted, loop, playsinline
  * File: /assets/hero-video.mp4
  * Poster: /assets/hero-poster.webp
  * object-fit: cover, position absolute inset 0
  * Overlay: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75))
  * IF NO VIDEO: animated gradient mesh (radial gradients, slow motion)
- Content: position relative, z-index 10, centered vertically

LAYOUT (centered vertically, left-aligned content):
  [small eyebrow text]  ←  12px, uppercase, letter-spacing, accent color
  [H1 headline]
  [horizontal rule]     ←  1px line, accent color, 60px width
  [subtitle text]       ←  16px, muted white, max-width 480px
  [horizontal rule]
  [CTA buttons row]     ←  Primary + Ghost side by side

H1 SPEC:
- addepto.com H1: "AI Solution provider & Big Data Experts Company"
- Size: clamp(3rem, 6.5vw, 5.5rem)
- Weight: 800
- Color: #ffffff
- Line breaks at: "AI Solution provider &" / "Big Data Experts Company"
- NO accent colored words in H1 (addepto keeps it all white)
- Max-width: 780px

SUBTITLE:
- "Driving changes through AI & Data solutions"
- Size: 18px, color: rgba(255,255,255,0.7)
- Two line breaks (as on addepto — poetic spacing)

CTA BUTTONS:
Primary "Read case studies":
  - bg: transparent, border: 1px solid rgba(255,255,255,0.3)
  - color: white
  - padding: 14px 28px
  - Hover: bg rgba(255,255,255,0.08), border rgba(255,255,255,0.6)
  - Arrow icon →

Secondary "Let's talk":
  - bg: var(--color-accent)
  - color: #ffffff
  - padding: 14px 28px
  - hover: var(--color-accent-hover), translateY(-2px), shadow
  - Arrow icon →

NOTE: Addepto's primary CTA is the GHOST button — Let's talk is ACCENT.
Order: Ghost first, Accent second.
```

### 3.4 THREE SERVICE HIGHLIGHT BOXES

```
VISUAL SPEC:
- Background: #000000 (same dark as hero, seamless continuation)
- 3 columns, NO gap between them (just 1px borders)
- Each box: border: 1px solid #1e1e1e
- Padding: 48px 40px
- Hover: border-color changes to rgba(232,77,28,0.3), translateY(-3px)

CONTENT PER BOX:
H2: 22px, weight 700, white
Divider line: 1px, accent color, 40px width, margin 16px 0
P: 15px, color #888, line-height 1.7

BOX 1: AI Consulting     — "Discover AI's practical advantages with custom solutions"
BOX 2: Generative AI     — "Adapt cutting-edge Generative AI to your business needs"
BOX 3: Big Data Consulting — "Transform your data into actionable business insights"

ADDEPTO PATTERN: These H2s are NOT linked. They are pure content blocks.
Each box is a standalone statement. No arrows, no "Learn more".
```

### 3.5 "OUR CLIENTS" LOGO SECTION

```
VISUAL SPEC:
- Background: #000000
- Border-top: 1px solid #1e1e1e
- Padding: 64px 0
- Section label: "Our clients" — 12px, uppercase, letter-spacing 0.1em, centered, #999
- Horizontal rule below label: 1px, #1e1e1e, full width

LOGO GRID:
- 6 logos per row (approx), 5 rows = 30 logos
- Logos: filter: grayscale(100%) brightness(0.4)  [very dark, barely visible]
- On hover: filter: grayscale(0%) brightness(1)   [full color]
- Each logo: height 40px, object-fit contain, padding 0 24px
- Grid: flex-wrap, justify-content center, align-items center, gap 32px 48px

ADDEPTO'S 30 CLIENTS (replace with AI Agentix clients):
Continental, Porsche, Volvo, Nexteer, MSG Entertainment, BMW,
WGU, Hertz, Nissan, SITA, LighterLife, GetResponse,
EAG Aero, Super AI, PaperPlanes, SimpleCater, Inpost, Recyclever,
Pernod Ricard, Property Finder, PurpleLotus, ClevAir, Teezily,
Spirit, ABB, Jabil, Woodward, Ziff Davis, Spencer's, ClevAir
```

### 3.6 "OUR CORE CAPABILITIES" (6 Cards)

```
VISUAL SPEC:
- Background: #000000
- Section header (top):
  * H2: 48px, weight 800, white
  * No eyebrow label (addepto jumps straight to H2)

CARD GRID: 3 columns × 2 rows = 6 cards
- Gap: 1px between cards
- Each card: background #000, border 1px solid #1e1e1e
- Padding: 48px 40px
- Hover: translateY(-4px), border-color rgba(232,77,28,0.3), 0.25s
- Cursor: pointer (entire card is a link)

CARD CONTENT STRUCTURE:
  1. Card title H3 — 20px, weight 700, white
  2. Horizontal rule — 1px, #1e1e1e, margin 16px 0
  3. Description P — 14px, #888, line-height 1.7, margin-bottom 24px
  4. "check" icon + arrow row — accent color, small
  5. Service image — right-bottom, subtle (grayscale or illustration)

ADDEPTO'S 6 CAPABILITIES → MAP TO AI AGENTIX:
  1. AI Consulting          → AI Consulting & Strategy
  2. Generative AI Dev      → Agentic AI Development
  3. ContextClue (product)  → AI Agentix Platform
  4. Computer Vision        → LLM Integration Services
  5. Data Engineering       → n8n Workflow Automation
  6. MLOps                  → AI Deployment & Integration

IMPORTANT: Each card is wrapped in an <a> tag linking to the service page.
The entire card is clickable. No separate "Learn more" button.
```

### 3.7 "CUSTOMER STORIES" SLIDER

```
VISUAL SPEC:
- Background: #0d0d0d (very slightly lighter than black)
- Border-top/bottom: 1px solid #1e1e1e
- Padding: 120px 0

SECTION HEADER:
  - "Customer stories" H2 — 48px, weight 800, white
  - Divider line below

SLIDER ARCHITECTURE:
- Shows ONE case study at a time (NOT 2-up like previous version)
- Large format, magazine-style layout
- Case study card: 2-column layout
  LEFT (40%): Large number counter (01, 02, 03...) + metadata
  RIGHT (60%): Content

CARD LEFT COLUMN:
- Large number: "01" — 96px, weight 800, color #1e1e1e (very dark, ghost-like)
- Category tag: 12px, uppercase, accent color
- Company thumbnail image: 200px wide

CARD RIGHT COLUMN:
- H3: 28px, weight 700, white
- Excerpt P: 15px, #888, line-height 1.8
- Block quote: left border 2px accent, padding-left 20px, italic, #aaa
- Author row: name (weight 700, white) + role/company (#888)

NAVIGATION:
- Bottom: dot indicators + prev/next arrow buttons
- Arrows: circle 44px, border 1px solid #333, white icon
- Hover arrows: border-color accent, bg accent, icon white

AUTO-PLAY: 5s interval, pause on hover
```

### 3.8 "INDUSTRY EXPERTISE" TABS

```
VISUAL SPEC:
- Background: #f7f7f5 (LIGHT section — cream/off-white)
- Text: dark (#0d0d0d)
- Padding: 120px 48px

SECTION HEADER:
  - H2: 48px, weight 800, #0d0d0d
  - Subtitle: "Your industry isn't here? That's not a problem!"
  - CTA link: "Let's talk →" in accent color

TAB BAR:
- Horizontal row of 6 tabs
- Layout: tabs left-aligned or full-width spread
- Default tab: 14px, weight 500, color #555
- Active tab: weight 700, color #0d0d0d, UNDERLINE with accent color 2px
- Tab separator: none (just spacing)
- Tabs: Aviation | Private Investments | Finance & Insurance |
         Manufacturing | Retail | Logistics

TAB CONTENT (each industry):
- Layout: left content (60%) + right floating image (40%)
- Content: H3 + two paragraphs of description
- "read more" link at bottom: accent color, arrow
- Image: rounded-none, full-height of content area
- Image changes on tab switch with crossfade animation

IMPORTANT: The images on the right side are REAL photos/illustrations
representing each industry. Use placeholder divs with bg gradients for now.
```

### 3.9 PRODUCT SPOTLIGHT ("ContextClue" equivalent)

```
VISUAL SPEC:
- Background: #000000
- Padding: 100px 48px
- Two-column layout: 50/50

LEFT COLUMN:
  - "ContextClue" label (or AI Agentix product name)
  - H2: product name, 40px, weight 800, white
  - Horizontal rule
  - Description: 16px, #888, line-height 1.8
  - "Learn more →" CTA in accent color

RIGHT COLUMN:
  - Product screenshot/illustration
  - Dark card with border, subtle glow effect
  - Or: animated feature list

AI AGENTIX VERSION:
Replace ContextClue with AI Agentix's own product/platform offering.
If no product exists yet, use "AI Agentix Automation Platform" as showcase.
```

### 3.10 "COOPERATION MODELS" (4 Cards)

```
VISUAL SPEC:
- Background: #f7f7f5 (LIGHT section)
- Padding: 120px 48px

SECTION HEADER:
  - H2: "Cooperation models" — 48px, weight 800, dark
  - Subtext + "Let's work together →" link

4-COLUMN CARD GRID:
- Each card: white bg, border 1px solid #e5e5e5, padding 40px
- Border-radius: 0 (sharp corners)
- NO hover transform (addepto keeps these static — subtle contrast to interactive sections)

CARD STRUCTURE:
  - H3: 20px, weight 700, #0d0d0d
  - Divider: 1px accent color, 40px wide
  - P: 14px, #555, line-height 1.7

FOUR MODELS:
  1. "Solution providing" — We deliver tailor-made solutions within time/budget
  2. "Collaborative model" — Our team embeds with yours
  3. "Managed & Delivery Services" — Full ownership, end-to-end
  4. "We are flexible!" — Custom approach, contact us

CARD 4 SPECIAL:
  - Background: #0d0d0d (dark) instead of white
  - Text: white/light
  - Acts as visual anchor/CTA
```

### 3.11 "COMPANY INSIGHTS" (Dual-Tab: Resources + Articles)

```
VISUAL SPEC:
- Background: #000000
- Padding: 120px 48px

SECTION HEADER:
  - H2: "Company insights" — 48px, weight 800, white
  - Subtitle text

TAB SWITCHER (top of section):
  [Resources]  [Articles]
  - Pill-style tabs OR underline style
  - Both tabs visible, switch content below

─── RESOURCES TAB CONTENT ───
Horizontal scrollable row (or 4-column grid) of WHITEPAPER CARDS
Each whitepaper card:
  - Small thumbnail image (top)
  - Category tag (accent color, uppercase)
  - H3: 16px, weight 700, white
  - Short excerpt
  - "Download" button: outline style, accent hover

─── ARTICLES TAB CONTENT ───
Grid of BLOG POST CARDS (3 columns):
  - Category tag (colored by category)
  - Date: 13px, #666
  - H3: 18px, weight 700, white
  - Excerpt: 14px, #888
  - Author name
  - Hover: card lifts, border accent

DATA SOURCE:
Both tabs pull from backend API:
  GET /api/resources  → whitepapers
  GET /api/posts      → blog posts
```

### 3.12 "WE ARE RECOGNIZED" AWARDS

```
VISUAL SPEC:
- Background: #000000
- Padding: 80px 48px

SECTION HEADER:
  - H2: "We are recognized as one of the best AI, BI, and Big Data consultants"
  - Subtext: "We helped multiple companies achieve their goals..."

BADGE GRID:
- Flex-wrap, centered, gap: 0
- Each badge: border 1px solid #1e1e1e, padding 24px 32px
- Badge image: height 48px, filter grayscale(100%) brightness(0.6)
- Hover: filter grayscale(0%) brightness(1), border-color #333

ADDEPTO'S BADGES:
Truefirms Top AI 2024 | Deloitte Fast500 2023 | Truefirms Top AI 2024 |
FT1000-2024 | MAD2023 | Deloitte Fast50 | MAD2024 |
Clutch Champion Fall 2023 | Clutch Global 2023 | Forbes | Clutch Top BI 2023

REPLACE WITH AI AGENTIX'S ACTUAL AWARDS/BADGES.
```

### 3.13 "OUTRUN COMPETITION" (4-Tab Technology Section)

```
VISUAL SPEC:
- Background: #000000
- Padding: 120px 48px

SECTION HEADER:
  - H2: "Outrun the competition with Artificial Intelligence solutions
          and Machine Learning services oiled with Big Data"
  - Long title, max-width 700px

TAB BAR (horizontal, top):
  [Machine Learning Services] [Deep Learning] [Data Platform building] [Generative AI]
  - Active tab: bold text, 2px underline accent

TAB CONTENT (each tab = full-width content block):
  - H3: 24px, weight 700, white
  - Two paragraphs of description: 15px, #888, line-height 1.8
  - "Let's talk →" link: accent color at bottom

AI AGENTIX EQUIVALENT TABS:
  [Agentic AI] [n8n Automation] [LLM Integration] [AI Chatbots]
```

### 3.14 "CONTACT US" CTA SECTION

```
VISUAL SPEC:
- Background: #000000
- Padding: 100px 48px
- Large centered hero-style block

LAYOUT:
  - H2: "Contact us" — large, white
  - Subtitle: "Schedule an intro call to get to know each other better
                and understand the way we work"
  - Single CTA button: "Let's talk →" — accent bg, large (padding 16px 40px)

SIMPLE AND CLEAN — no complex layout, just centered text + button.
```

### 3.15 FOOTER

```
VISUAL SPEC:
- Background: #000000
- Border-top: 1px solid #1e1e1e
- Padding: 80px 48px 48px

TOP SECTION (4-column grid):
  Col 1 (wider — 30%): Sitemap
    - Title: "Sitemap"
    - Links: About, Blog, Whitepapers, Case studies, Career
    - Divider
    - "Let's talk" link (accent color)

  Col 2: Services
    - Title: "Services"
    - Sub-sections: Discover, Organize data, Develop, Deploy
    - Each with 4-5 links

  Col 3: Solutions
    - Title: "Solutions"
    - Sub-sections: Technologies, Industries

  Col 4: Company Info
    - HQ address block:
      "addepto Warsaw - HQ" label (small, muted)
      Company name + address
      Email link
      "more offices →" link

MIDDLE SECTION:
  - GoodFirms badge (image)
  - Recent Blogposts (3 linked post titles)
  - Products (ContextClue, ContextCheck → replace with AI Agentix products)

BOTTOM BAR:
  - "© 2026 AI Agentix. All rights reserved."
  - Links: Terms | Privacy Policy | Cookies | Whistleblowing
  - Social icons: Twitter/X | LinkedIn | Facebook (right-aligned or centered)
  - Small text, #555

FOOTER TYPOGRAPHY:
  - Section titles: 13px, uppercase, letter-spacing 0.1em, #ffffff
  - Links: 13px, color #777, hover → #ffffff
  - Legal text: 12px, #555
```

---

## ⚛️ SECTION 4 — REACT PROJECT ARCHITECTURE

### 4.1 File & Folder Structure

```
ai-agentix/
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── og-image.jpg
│   │   └── robots.txt
│   ├── src/
│   │   ├── main.jsx                    # React entry point
│   │   ├── App.jsx                     # Root component + routing
│   │   ├── index.css                   # Global styles + Tailwind base
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AnnouncementBanner.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── MegaMenu.jsx
│   │   │   │   ├── MobileNav.jsx
│   │   │   │   └── Footer.jsx
│   │   │   │
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── ServiceHighlights.jsx
│   │   │   │   ├── ClientLogos.jsx
│   │   │   │   ├── CoreCapabilities.jsx
│   │   │   │   ├── CustomerStories.jsx
│   │   │   │   ├── IndustryExpertise.jsx
│   │   │   │   ├── ProductSpotlight.jsx
│   │   │   │   ├── CooperationModels.jsx
│   │   │   │   ├── CompanyInsights.jsx
│   │   │   │   ├── AwardsSection.jsx
│   │   │   │   ├── TechDeepDive.jsx
│   │   │   │   └── ContactCTA.jsx
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Tag.jsx
│   │   │       ├── SectionHeader.jsx
│   │   │       ├── AnimatedDivider.jsx
│   │   │       ├── RevealWrapper.jsx
│   │   │       ├── TabSwitcher.jsx
│   │   │       ├── Slider.jsx
│   │   │       └── LoadingSpinner.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── CaseStudies.jsx
│   │   │   ├── CaseStudyDetail.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogPost.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useScrollReveal.js
│   │   │   ├── useActiveSection.js
│   │   │   ├── useNavbarScroll.js
│   │   │   ├── useApi.js
│   │   │   └── useIntersectionObserver.js
│   │   │
│   │   ├── context/
│   │   │   ├── BannerContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── api.js              # Axios instance + API calls
│   │   │   ├── motion.js           # Framer Motion variants
│   │   │   └── utils.js            # Helper functions
│   │   │
│   │   └── styles/
│   │       ├── globals.css
│   │       ├── tokens.css
│   │       └── animations.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.local
│
├── backend/
│   ├── server.js                   # Express entry point
│   ├── package.json
│   ├── .env
│   │
│   ├── config/
│   │   ├── database.js             # MongoDB connection
│   │   └── cloudinary.js           # Image upload config
│   │
│   ├── models/
│   │   ├── Post.js                 # Blog posts
│   │   ├── CaseStudy.js            # Case studies
│   │   ├── Service.js              # Services
│   │   ├── Client.js               # Client logos
│   │   ├── Testimonial.js          # Testimonials
│   │   ├── TeamMember.js           # Team
│   │   ├── Resource.js             # Whitepapers/resources
│   │   ├── ContactSubmission.js    # Contact form submissions
│   │   └── Award.js                # Awards/badges
│   │
│   ├── routes/
│   │   ├── posts.js
│   │   ├── caseStudies.js
│   │   ├── services.js
│   │   ├── clients.js
│   │   ├── resources.js
│   │   ├── contact.js
│   │   ├── team.js
│   │   └── admin.js
│   │
│   ├── controllers/
│   │   ├── postController.js
│   │   ├── caseStudyController.js
│   │   ├── serviceController.js
│   │   ├── contactController.js
│   │   └── adminController.js
│   │
│   └── middleware/
│       ├── auth.js                 # JWT authentication
│       ├── validate.js             # Request validation
│       ├── rateLimit.js            # Rate limiting
│       ├── cors.js                 # CORS config
│       └── errorHandler.js        # Global error handler
│
└── docker-compose.yml              # Dev environment
```

---

## 🗄️ SECTION 5 — COMPLETE DATABASE SCHEMA (MongoDB)

### 5.1 All Mongoose Models

```javascript
// ════════════════════════════════════════════════
// models/Post.js — Blog Posts
// ════════════════════════════════════════════════
const PostSchema = new mongoose.Schema({
  title:        { type: String, required: true, trim: true },
  slug:         { type: String, required: true, unique: true },
  excerpt:      { type: String, required: true, maxlength: 300 },
  content:      { type: String, required: true },  // Rich HTML or Markdown
  coverImage:   { type: String },                  // Cloudinary URL
  categories:   [{ type: String }],                // ['Generative AI', 'MLOps']
  tags:         [{ type: String }],
  author: {
    name:       { type: String, required: true },
    role:       { type: String },
    avatar:     { type: String },
  },
  status:       { type: String, enum: ['draft','published'], default: 'draft' },
  featured:     { type: Boolean, default: false },
  views:        { type: Number, default: 0 },
  readTime:     { type: Number },                  // minutes
  publishedAt:  { type: Date },
}, { timestamps: true });
PostSchema.index({ slug: 1, status: 1, publishedAt: -1 });

// ════════════════════════════════════════════════
// models/CaseStudy.js
// ════════════════════════════════════════════════
const CaseStudySchema = new mongoose.Schema({
  title:        { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  client:       { type: String, required: true },
  clientLogo:   { type: String },
  industry:     { type: String, required: true },  // 'E-Commerce', 'SaaS', etc.
  service:      { type: String },                  // Primary service used
  tags:         [{ type: String }],
  challenge:    { type: String, required: true },
  solution:     { type: String, required: true },
  result:       { type: String, required: true },
  quote: {
    text:       { type: String },
    author:     { type: String },
    role:       { type: String },
  },
  metrics: [{
    value:      { type: String },                  // e.g. "74%"
    label:      { type: String },                  // e.g. "Ticket deflection"
  }],
  coverImage:   { type: String },
  status:       { type: String, enum: ['draft','published'], default: 'draft' },
  featured:     { type: Boolean, default: false },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

// ════════════════════════════════════════════════
// models/Service.js
// ════════════════════════════════════════════════
const ServiceSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  category:     { type: String, required: true }, // 'Discover','Develop','Deploy','Data'
  shortDesc:    { type: String, required: true, maxlength: 200 },
  fullDesc:     { type: String },
  icon:         { type: String },                 // SVG string or icon name
  image:        { type: String },
  features:     [{ type: String }],
  active:       { type: Boolean, default: true },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

// ════════════════════════════════════════════════
// models/Client.js — Client logos marquee
// ════════════════════════════════════════════════
const ClientSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  logo:         { type: String, required: true }, // Cloudinary URL
  website:      { type: String },
  industry:     { type: String },
  active:       { type: Boolean, default: true },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

// ════════════════════════════════════════════════
// models/Resource.js — Whitepapers, eBooks, Webinars
// ════════════════════════════════════════════════
const ResourceSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  type:         { type: String, enum: ['whitepaper','ebook','webinar','guide'], required: true },
  category:     { type: String },
  description:  { type: String },
  coverImage:   { type: String },
  downloadUrl:  { type: String },                 // Gated or direct PDF link
  gated:        { type: Boolean, default: true }, // Requires email submission?
  downloads:    { type: Number, default: 0 },
  active:       { type: Boolean, default: true },
}, { timestamps: true });

// ════════════════════════════════════════════════
// models/TeamMember.js
// ════════════════════════════════════════════════
const TeamMemberSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  role:         { type: String, required: true },
  bio:          { type: String },
  avatar:       { type: String },
  linkedin:     { type: String },
  twitter:      { type: String },
  department:   { type: String },                 // 'Engineering', 'Leadership', etc.
  active:       { type: Boolean, default: true },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

// ════════════════════════════════════════════════
// models/ContactSubmission.js
// ════════════════════════════════════════════════
const ContactSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  email:        { type: String, required: true },
  company:      { type: String },
  phone:        { type: String },
  service:      { type: String },                 // Which service interested in
  message:      { type: String, required: true },
  budget:       { type: String },                 // Budget range
  source:       { type: String },                 // How they found us
  status:       { type: String, enum: ['new','contacted','qualified','closed'], default: 'new' },
  notes:        { type: String },                 // Internal notes
  ip:           { type: String },
}, { timestamps: true });

// ════════════════════════════════════════════════
// models/Award.js
// ════════════════════════════════════════════════
const AwardSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  issuer:       { type: String },
  year:         { type: Number },
  badge:        { type: String },                 // Image URL
  url:          { type: String },
  active:       { type: Boolean, default: true },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

// ════════════════════════════════════════════════
// models/NewsletterSubscriber.js
// ════════════════════════════════════════════════
const SubscriberSchema = new mongoose.Schema({
  email:        { type: String, required: true, unique: true },
  confirmed:    { type: Boolean, default: false },
  source:       { type: String },
  token:        { type: String },
}, { timestamps: true });
```

---

## 🔌 SECTION 6 — COMPLETE API SPECIFICATION

### 6.1 All REST Endpoints

```
BASE URL: /api/v1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BLOG POSTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /posts               → All published posts (paginated)
                              Query: ?page=1&limit=9&category=&tag=&search=
GET    /posts/featured      → Featured posts for homepage (limit 5)
GET    /posts/:slug         → Single post by slug
GET    /posts/categories    → All unique categories
POST   /posts               → Create post (Admin only)
PUT    /posts/:id           → Update post (Admin only)
DELETE /posts/:id           → Delete post (Admin only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CASE STUDIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /case-studies             → All published (filter by industry/service)
GET    /case-studies/featured    → Featured for homepage slider (limit 5)
GET    /case-studies/:slug       → Single case study
POST   /case-studies             → Create (Admin)
PUT    /case-studies/:id         → Update (Admin)
DELETE /case-studies/:id         → Delete (Admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /services             → All active services (grouped by category)
GET    /services/:slug       → Single service detail
POST   /services             → Create (Admin)
PUT    /services/:id         → Update (Admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLIENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /clients              → All active clients (ordered)
POST   /clients              → Add client (Admin)
PUT    /clients/:id          → Update (Admin)
DELETE /clients/:id          → Remove (Admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESOURCES (Whitepapers)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /resources            → All active resources
GET    /resources/:slug      → Single resource
POST   /resources/download   → Record download + return URL (for gated)
POST   /resources            → Create (Admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST   /contact              → Submit contact form
                              Body: { name, email, company, phone, service, message, budget }
                              Actions: Save to DB + Send email notification (Nodemailer)
                              Rate limit: 3 per IP per hour
GET    /contact/submissions  → All submissions (Admin only)
PUT    /contact/:id/status   → Update submission status (Admin only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TEAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /team                 → All active team members (ordered)
POST   /team                 → Add member (Admin)
PUT    /team/:id             → Update (Admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AWARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET    /awards               → All active awards (ordered)
POST   /awards               → Add award (Admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEWSLETTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST   /newsletter/subscribe → Subscribe email
GET    /newsletter/confirm/:token → Confirm subscription

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN AUTH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST   /auth/login           → Admin login → returns JWT
POST   /auth/logout          → Invalidate session
GET    /auth/me              → Current admin user
POST   /auth/refresh         → Refresh JWT token

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MEDIA UPLOAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
POST   /upload/image         → Upload image → Cloudinary → return URL
DELETE /upload/:publicId     → Delete from Cloudinary (Admin)
```

### 6.2 Standard Response Format

```javascript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 9,
    "total": 47,
    "pages": 6
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [ ... ]
  }
}
```

---

## 📦 SECTION 7 — PACKAGE.JSON DEPENDENCIES

### 7.1 Frontend (frontend/package.json)

```json
{
  "name": "ai-agentix-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.0",
    "framer-motion": "^11.3.8",
    "axios": "^1.7.2",
    "@tanstack/react-query": "^5.51.1",
    "react-intersection-observer": "^9.13.0",
    "swiper": "^11.1.4",
    "react-helmet-async": "^2.0.5",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "lucide-react": "^0.408.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-dialog": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.1",
    "react-hook-form": "^7.52.1",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.3.4",
    "tailwindcss": "^3.4.6",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.39",
    "eslint": "^8.57.0"
  }
}
```

### 7.2 Backend (backend/package.json)

```json
{
  "name": "ai-agentix-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "seed": "node scripts/seed.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "mongoose": "^8.5.1",
    "dotenv": "^16.4.5",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-rate-limit": "^7.3.1",
    "express-validator": "^7.1.0",
    "multer": "^1.4.5-lts.1",
    "cloudinary": "^2.4.0",
    "nodemailer": "^6.9.14",
    "slugify": "^1.6.6",
    "compression": "^1.7.4",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.4",
    "hpp": "^0.2.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

---

## 🔧 SECTION 8 — BACKEND CORE FILES

### 8.1 server.js (Entry Point)

```javascript
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

// Routes
import postRoutes from './routes/posts.js';
import caseStudyRoutes from './routes/caseStudies.js';
import serviceRoutes from './routes/services.js';
import clientRoutes from './routes/clients.js';
import resourceRoutes from './routes/resources.js';
import contactRoutes from './routes/contact.js';
import teamRoutes from './routes/team.js';
import awardRoutes from './routes/awards.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import newsletterRoutes from './routes/newsletter.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

// ── Security Middleware ──────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(mongoSanitize());
app.use(compression());

// ── CORS ─────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// ── Rate Limiting ─────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, error: { message: 'Too many requests' } }
});
app.use('/api/', apiLimiter);

// ── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Logging ───────────────────────────────────────────
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ── Routes ────────────────────────────────────────────
app.use('/api/v1/posts',          postRoutes);
app.use('/api/v1/case-studies',   caseStudyRoutes);
app.use('/api/v1/services',       serviceRoutes);
app.use('/api/v1/clients',        clientRoutes);
app.use('/api/v1/resources',      resourceRoutes);
app.use('/api/v1/contact',        contactRoutes);
app.use('/api/v1/team',           teamRoutes);
app.use('/api/v1/awards',         awardRoutes);
app.use('/api/v1/auth',           authRoutes);
app.use('/api/v1/upload',         uploadRoutes);
app.use('/api/v1/newsletter',     newsletterRoutes);

// ── Health Check ──────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));

// ── Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ── Database + Start ──────────────────────────────────
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => { console.error('❌ DB error:', err); process.exit(1); });

export default app;
```

### 8.2 .env Template

```bash
# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/ai-agentix?retryWrites=true&w=majority

# Auth
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@email.com
EMAIL_PASS=your-app-password
EMAIL_FROM="AI Agentix <hello@ai-agentix.com>"
EMAIL_TO=hello@ai-agentix.com

# Cloudinary (Image hosting)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin
ADMIN_EMAIL=admin@ai-agentix.com
ADMIN_PASSWORD=change-this-immediately
```

---

## ⚛️ SECTION 9 — REACT COMPONENT CODE

### 9.1 Framer Motion Variants (lib/motion.js)

```javascript
// Shared animation variants — used across all components

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4,0,0.2,1] } }
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

export const slideRight = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4,0,0.2,1] } }
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export const hoverCard = {
  rest:  { y: 0,   borderColor: '#1e1e1e', transition: { duration: 0.25 } },
  hover: { y: -4,  borderColor: 'rgba(232,77,28,0.3)', transition: { duration: 0.25 } }
};
```

### 9.2 Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent:   '#e84d1c',
        'bg-dark':  '#000000',
        'bg-card':  '#0d0d0d',
        'bg-light': '#f7f7f5',
        'text-muted': '#999999',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(3rem,6.5vw,5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'section': ['clamp(2rem,4vw,3.2rem)',   { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        content: '1240px',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        fadeUp:  { from: { opacity: 0, transform: 'translateY(32px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
      },
    },
  },
  plugins: [],
};
```

---

## 📋 SECTION 10 — COMPLETE IMPLEMENTATION CHECKLIST

### Phase 1: Foundation Setup (Day 1)
```
[ ] Initialize Vite + React project: npm create vite@latest frontend -- --template react
[ ] Install all frontend dependencies
[ ] Configure Tailwind CSS + PostCSS
[ ] Set up React Router with all page routes
[ ] Import Google Fonts (Manrope + Inter)
[ ] Create CSS tokens file with all design variables
[ ] Create Framer Motion variants file
[ ] Set up Axios instance with base URL + interceptors
[ ] Set up React Query for data fetching
[ ] Create useScrollReveal hook with IntersectionObserver
```

### Phase 2: Backend Foundation (Day 1-2)
```
[ ] Initialize Node.js project: npm init -y
[ ] Install all backend dependencies
[ ] Create server.js with all middleware
[ ] Set up MongoDB Atlas cluster + connection
[ ] Create all 8 Mongoose models
[ ] Create all route files (empty handlers first)
[ ] Create errorHandler middleware
[ ] Create auth middleware (JWT)
[ ] Set up Cloudinary for image uploads
[ ] Set up Nodemailer for email notifications
[ ] Test all endpoints return 200 (even empty)
```

### Phase 3: Layout Components (Day 2-3)
```
[ ] AnnouncementBanner — dismiss + localStorage persistence
[ ] Navbar — sticky, blur, dual logo, scroll detection
[ ] MegaMenu — all 4 service columns, hover states
[ ] MobileNav — hamburger → overlay, all items
[ ] Footer — all 4 columns, links, social, legal
[ ] RevealWrapper — IntersectionObserver HOC
[ ] Button component — primary, ghost, outline variants
[ ] SectionHeader component — eyebrow + H2 + sub
```

### Phase 4: Homepage Sections (Day 3-6)
```
[ ] HeroSection — video bg (or animated mesh), parallax, CTAs
[ ] ServiceHighlights — 3 dark boxes, exact addepto layout
[ ] ClientLogos — grayscale logos, hover color, marquee scroll
[ ] CoreCapabilities — 6 cards, exact addepto style, API data
[ ] CustomerStories — slider carousel, API data, auto-advance
[ ] IndustryExpertise — tabs, 6 industries, content panels
[ ] ProductSpotlight — 2-col layout, product showcase
[ ] CooperationModels — 4 cards, light section
[ ] CompanyInsights — dual tab (Resources + Articles), API data
[ ] AwardsSection — badge grid, grayscale hover
[ ] TechDeepDive — 4 tabs, full-width content
[ ] ContactCTA — centered, single button
```

### Phase 5: Inner Pages (Day 6-9)
```
[ ] /case-studies — grid listing, filter by industry
[ ] /case-studies/:slug — full case study detail page
[ ] /blog — grid listing, category filter, pagination
[ ] /blog/:slug — full blog post with rich content
[ ] /about — team grid, company story, values
[ ] /contact — form with React Hook Form + Zod validation
[ ] /services/:slug — individual service pages
[ ] 404 Not Found page
```

### Phase 6: Backend Completion (Day 7-9)
```
[ ] All CRUD controllers for every model
[ ] Contact form: save to DB + send email notification
[ ] Admin auth: login endpoint + JWT
[ ] Pagination on all list endpoints
[ ] Search and filter on posts + case studies
[ ] Image upload to Cloudinary
[ ] Database seed script with sample data
[ ] Input validation middleware on all POST/PUT routes
[ ] Rate limiting on contact form
[ ] Admin panel routes (protected)
```

### Phase 7: Polish & QA (Day 9-10)
```
[ ] All scroll-reveal animations working at 0.12 threshold
[ ] Hero parallax: 0.3x multiplier, fades at 600px scroll
[ ] Navbar: dual logo swap on light/dark sections
[ ] Slider: auto-advance 5s, pause on hover, dot indicators
[ ] Industry tabs: crossfade on switch, URL hash sync
[ ] Client logos: perfect seamless marquee loop
[ ] All CTAs link to correct destinations
[ ] Mobile: all sections responsive at 375px
[ ] All images have alt text
[ ] All forms validate client-side + server-side
[ ] No console errors anywhere
[ ] Lighthouse score: Performance ≥90, A11y ≥95
[ ] SEO: meta tags, og:image, canonical on all pages
[ ] Smooth scroll behavior globally
```

---

## 🚀 SECTION 11 — DEPLOYMENT GUIDE

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy via Vercel CLI or connect GitHub repo
vercel --prod

# Environment variables to set in Vercel:
VITE_API_URL=https://api.ai-agentix.com/api/v1
VITE_SITE_URL=https://ai-agentix.com
```

### Backend (Railway or Render)
```bash
cd backend
# Set all .env variables in Railway/Render dashboard
# Connect to MongoDB Atlas
# Deploy from GitHub

# Railway: railway up
# Render: auto-deploys from GitHub
```

### Docker (Self-hosted)
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["5000:5000"]
    env_file: ./backend/.env
    depends_on: [mongo]
  mongo:
    image: mongo:7
    volumes: [mongo_data:/data/db]
    ports: ["27017:27017"]
volumes:
  mongo_data:
```

---

## ✅ SECTION 12 — QUALITY GATES (Never Ship Without Passing)

```
VISUAL QA:
  [ ] Side-by-side comparison with addepto.com — sections match 1:1
  [ ] Dark section backgrounds match: #000000 or very close
  [ ] Accent color orange-red matches throughout
  [ ] Typography hierarchy visible: large H2s dominate
  [ ] Cards have sharp 0px or 4px max border-radius
  [ ] Logo grid uses proper grayscale filter
  [ ] Testimonial section uses exact quote + author format
  [ ] Footer has all 4 columns with proper spacing

FUNCTIONAL QA:
  [ ] All API endpoints return correct data
  [ ] Contact form submits and triggers email
  [ ] Blog pagination works (page=2, page=3...)
  [ ] Case study filter by industry works
  [ ] Slider auto-advances and stops on hover
  [ ] Tab switching works in all tab sections
  [ ] Mobile hamburger opens/closes correctly
  [ ] Banner dismisses and stays dismissed (localStorage)
  [ ] Admin login returns JWT
  [ ] Image upload to Cloudinary works

PERFORMANCE QA:
  [ ] Lighthouse Performance ≥ 90 (mobile)
  [ ] Lighthouse Performance ≥ 95 (desktop)
  [ ] First Contentful Paint < 1.2s
  [ ] Largest Contentful Paint < 2.5s
  [ ] No layout shift (CLS < 0.1)
  [ ] All images lazy-loaded below fold
  [ ] Fonts use display=swap

ACCESSIBILITY QA:
  [ ] All images have descriptive alt text
  [ ] All buttons have aria-label
  [ ] Tab navigation works through all interactive elements
  [ ] Color contrast ratio ≥ 4.5:1
  [ ] Focus styles visible on all interactive elements
  [ ] Screen reader: section landmarks present
```

---

*Document version: 2.0 — April 2026*
*Reference: https://addepto.com/ (design) + https://ai-agentix.com/ (content)*
*Stack: React 18 + Vite + Tailwind + Framer Motion + Node.js + Express + Supabase*
