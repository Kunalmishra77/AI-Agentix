# AI Agentix — Platform Architecture Master Plan
**Date:** 2026-05-13 | **Author:** Principal Architecture Review  
**Classification:** Production-Grade | **Priority:** P0

---

## EXECUTIVE SUMMARY — WHAT'S ACTUALLY BROKEN

Based on deep codebase analysis (not guesses), here are the hard numbers:

| Metric | Current | Target |
|--------|---------|--------|
| JS bundle size | **1,171 KB** | < 280 KB initial |
| Routes with lazy loading | **0 of 33** | 30 of 33 |
| Largest data file (toolWorkspaces.js) | **151 KB always loaded** | 0 KB on home route |
| CSS breakpoints | **9 inconsistent** | 5 canonical |
| CSS architecture | **Monolithic (7 files, 134KB)** | Scoped, tree-shakeable |
| Code splitting | **None** | Route-level + chunk-level |
| Admin panel | **Does not exist** | Full enterprise panel |
| Animation triggering | **All play on mount** | Intersection-observer gated |
| Framer Motion usage | **Installed, ~1% used** | Fully leveraged |

---

## PART 1 — RESPONSIVENESS MASTER PLAN

### 1.1 Breakpoint Architecture Overhaul

**Current problem:** 9 breakpoints scattered across 7 CSS files with no canonical definition:  
`1280, 1200, 1080, 980, 860, 720, 600, 480, 380px` — all max-width queries in random files.

This means the same component can have different behavior at similar widths depending on which CSS file has the rule. The shell breaks at 980px, the hero at 1080px, the pages at 720px. No shared source of truth.

**The fix — 5-breakpoint mobile-first system in `ax-tokens.css`:**

```css
/* ── CANONICAL BREAKPOINTS ── Add to ax-tokens.css ── */
:root {
  --bp-sm:  480px;   /* Large phones — portrait */
  --bp-md:  768px;   /* Tablets — both orientations */
  --bp-lg:  1080px;  /* Laptop and narrow desktop */
  --bp-xl:  1440px;  /* Wide desktop */
  --bp-2xl: 1920px;  /* Ultra-wide / TV */
}

/* Usage pattern (mobile-first): */
/* @media (min-width: 768px) { ... }  ← replaces max-width: 720px */
/* @media (min-width: 1080px) { ... } ← replaces max-width: 1080px */
```

**Migration rule:** Every existing `max-width` query maps to `min-width` of the next breakpoint up:
- `max-width: 600px` → `@media not (min-width: 480px)` 
- `max-width: 720px` → `@media not (min-width: 768px)`
- `max-width: 1080px` → `@media not (min-width: 1080px)`

Collapse the 980px and 860px breakpoints into the 768px tablet breakpoint. They're 120px apart — no design justification for both.

---

### 1.2 Fluid Typography System

**Current state:** Two competing systems — Tailwind `clamp()` sizes AND CSS `.h-display`, `.h-1` classes in `ax-tokens.css`. The Tailwind config defines `display-xl: clamp(3.5rem, 7vw, 6rem)` but the tokens define `h-display: clamp(38px, 6.5vw, 88px)`. They conflict.

**Correct system — single source of truth:**

```css
/* Replace in ax-tokens.css — the ONLY font size definitions */
:root {
  /* Display sizes — for hero headlines */
  --text-display-xl: clamp(2.5rem, 6vw + 1rem, 5.5rem);   /* Hero H1 */
  --text-display-lg: clamp(2rem, 4vw + 0.5rem, 3.75rem);  /* Section H2 */
  --text-display-md: clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem); /* Sub-heading */
  --text-display-sm: clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem); /* Body large */

  /* Body sizes — fixed, not fluid */
  --text-base:  15px;
  --text-sm:    13px;
  --text-xs:    11px;
  --text-2xs:   10px;

  /* Line heights */
  --lh-display: 1.08;
  --lh-heading: 1.2;
  --lh-body:    1.55;
}

/* Semantic helpers — used on elements */
.t-display-xl { font-size: var(--text-display-xl); line-height: var(--lh-display); font-weight: 600; letter-spacing: -0.035em; }
.t-display-lg { font-size: var(--text-display-lg); line-height: var(--lh-heading); font-weight: 600; letter-spacing: -0.025em; }
```

Delete the Tailwind `fontSize` overrides and the existing `.h-display`, `.h-1`, `.h-2`, `.h-3`, `.h-4` classes. One system. No drift.

---

### 1.3 Responsive Spacing System

**Current:** `--space-1` through `--space-20` are fixed pixel values. Sections use `clamp(80px, 12vw, 160px)` — but only on some sections, hardcoded inline. Inconsistent everywhere.

**The system:**

```css
/* Replace in ax-tokens.css */
:root {
  /* Page-level spacing — fluid */
  --space-page-x: clamp(16px, 5vw, 48px);    /* Horizontal page padding */
  --space-section: clamp(64px, 10vw, 140px);  /* Section vertical padding */
  --space-section-sm: clamp(48px, 7vw, 96px); /* Smaller sections */

  /* Component-level spacing — fixed scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 56px;
}

/* Apply globally */
.container { padding-inline: var(--space-page-x); }
.section { padding-block: var(--space-section); }
.section-sm { padding-block: var(--space-section-sm); }
```

---

### 1.4 Component-by-Component Responsive Fixes

#### Hero Section (`HeroSection.jsx` + `ax-hero.css`)
**Current issue:** `grid-template-columns: 1fr 1.15fr` — two columns at all sizes above 1080px. The right column (SystemMap) is a complex interactive SVG with 30ms rotation interval and dynamic preview card positioning. On tablet (768px–1079px), the grid collapses to 1 column but the SystemMap remains full-size, wasting vertical space.

**Specific problem:** `HeroPreviewCard` uses `posX = dx > 0 ? '5%' : '55%'` — percentage positions work on desktop but on single-column layout the card can overflow the viewport.

**Fix:**
```css
/* ax-hero.css — replace the 1080px collapse */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;  /* Mobile: single column */
  gap: var(--space-8);
}

@media (min-width: 1080px) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
}

/* On tablet: hide SystemMap, show simpler static visual */
.hero-right { display: none; }
@media (min-width: 1080px) { .hero-right { display: block; } }
.hero-right-mobile { display: block; } /* Simplified static version */
@media (min-width: 1080px) { .hero-right-mobile { display: none; } }
```

The mobile hero-right replacement: a static 3×3 grid of category icons — no canvas, no interval, no complex SVG. Loads instantly.

#### Navigation (`ax-shell.css` + GlobalNav)
**Current issue:** Nav breaks at 980px AND 860px — two separate breakpoints 120px apart with different behaviors.

**Fix:** Single breakpoint at 768px. Below 768px: hamburger menu with slide-in drawer using CSS `translate` (no JS for the open/close — just a checkbox or details/summary pattern for zero-JS interactive nav). Above 768px: full horizontal nav.

```css
/* Mobile nav drawer — zero JS required */
.nav-drawer {
  position: fixed;
  inset: 0 0 0 auto;
  width: min(320px, 85vw);
  background: var(--bg-1);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  padding: var(--space-page-x);
}

.nav-toggle:checked ~ .nav-drawer {
  transform: translateX(0);
}
```

#### Cards (`.card`, `.card-elevated`, `.card-glass`)
**Current issue:** Cards have fixed `min-width` or fixed padding that breaks on small screens. Card grids use `grid-template-columns: repeat(3, 1fr)` without auto-fill.

**Fix — fluid card grids:**
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(280px, 100%), 1fr));
  gap: var(--space-4);
}
```

This single rule handles all screen sizes: 1 column on phones, 2 on tablet, 3+ on desktop. No breakpoints needed.

#### ToolTheatre / ToolHeroMedia (largest component — 344 LOC)
**Current issue:** Video/media mapping assumes desktop viewport. WebM videos are served without checking device capability or connection speed.

**Fix:**
```jsx
// Only load video on desktop + fast connection
const canPlayVideo = useMemo(() => {
  if (typeof window === 'undefined') return false;
  if (window.innerWidth < 768) return false;
  const conn = navigator.connection;
  if (conn && (conn.saveData || conn.effectiveType === '2g')) return false;
  return true;
}, []);
```

Replace `<video autoPlay muted loop>` with a poster image on mobile. Videos account for the largest LCP impact.

#### Forms and Modals
**Fix:** All forms get `width: min(480px, calc(100vw - 2 * var(--space-page-x)))` — fits any viewport. Modals use `inset: auto var(--space-page-x); margin-block: auto` instead of fixed pixel positions.

#### Footer
**Fix:** Use CSS Grid with `auto-fill` columns min 200px. No hardcoded column count. Logo + copy collapse under links on mobile.

---

### 1.5 Safe Area Handling (iOS/Android notch)

```css
/* Add to ax-shell.css */
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* VoiceOrb — keep above iOS home indicator */
.va-orb {
  bottom: max(28px, calc(16px + env(safe-area-inset-bottom)));
  right: max(28px, calc(16px + env(safe-area-inset-right)));
}
```

---

### 1.6 Responsive Motion Behavior

At mobile sizes, most animations should be disabled or simplified:
```css
/* ax-tokens.css — add to existing reduced-motion block */
@media (max-width: 767px) {
  /* Disable heavy animations on mobile — not just reduced-motion */
  .animate-on-desktop {
    animation: none !important;
    transition: opacity 0.2s ease !important;
  }
}
```

Apply `.animate-on-desktop` to: CategoryConstellation SVG animations, SystemMap rotation, particle systems, ambient glow drifts.

---

## PART 2 — PERFORMANCE OPTIMIZATION MASTER PLAN

### 2.1 The Bundle Crisis — 1,171 KB Must Become 280 KB

The single biggest performance win is code splitting. Currently every user downloads the full app regardless of what page they visit. Someone visiting `/pricing` gets code for the SystemMap, Lottie animations, tool workspaces — none of which they need.

**Step 1: Vite chunk splitting (30 minutes of work, massive impact)**

```js
// vite.config.js — replace minimal config
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks — cached independently
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';  // ~140KB → cached forever
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion'; // ~60KB → only loaded where needed
          }
          if (id.includes('node_modules/lottie') || 
              id.includes('dotlottie')) {
            return 'vendor-lottie'; // ~200KB → only on pages with Lottie
          }
          if (id.includes('node_modules/lucide') ||
              id.includes('node_modules/react-icons')) {
            return 'vendor-icons';  // ~80KB → only where icons render
          }
          // App data — largest file
          if (id.includes('toolWorkspaces')) {
            return 'data-workspaces'; // ~150KB → only on tool/category pages
          }
          if (id.includes('agentixData')) {
            return 'data-core'; // ~38KB → loaded on home + most pages
          }
        }
      }
    }
  }
});
```

Expected result: initial load drops from 1,171 KB to ~220 KB (React + router + home components + core data).

**Step 2: Route-level lazy loading (2 hours, critical impact)**

```jsx
// src/App.jsx — convert ALL secondary routes to lazy
import { lazy, Suspense } from 'react';

// Keep eager: home page components (above fold, first paint)
import HeroSection from './components/agentix/HeroSection';

// Lazy everything else
const AboutPage      = lazy(() => import('./pages/site/AboutPage'));
const PricingPage    = lazy(() => import('./pages/site/PricingPage'));
const ContactPage    = lazy(() => import('./pages/site/ContactPage'));
const DemoPage       = lazy(() => import('./pages/site/DemoPage'));
const TalkPage       = lazy(() => import('./pages/site/TalkPage'));
const FAQPage        = lazy(() => import('./pages/site/FAQPage'));
const SecurityPage   = lazy(() => import('./pages/site/SecurityPage'));
const StatusPage     = lazy(() => import('./pages/site/StatusPage'));
const ChangelogPage  = lazy(() => import('./pages/site/ChangelogPage'));

// Route-level Suspense fallback (skeleton, not spinner)
const PageSkeleton = () => (
  <div style={{ minHeight: '100vh', background: 'var(--bg-0)' }} />
);

// Wrap Routes in Suspense:
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    {/* all routes */}
  </Routes>
</Suspense>
```

Also lazy-load the ToolPage, CategoryPage (these import toolWorkspaces.js):

```jsx
// These routes trigger toolWorkspaces.js download — lazy loaded:
const ToolPage     = lazy(() => import('./components/agentix/ToolPage'));
const CategoryPage = lazy(() => import('./components/agentix/CategoryPage'));
```

**Step 3: Lazy load heavy data**

```js
// src/data/toolWorkspaces.js — add named export
// src/App.jsx — route-level data loading

// Instead of: import toolWorkspaces from './data/toolWorkspaces.js';
// Use: (inside ToolPage component)
const [workspace, setWorkspace] = useState(null);
useEffect(() => {
  import('../data/toolWorkspaces.js').then(m => {
    setWorkspace(m.default[toolId]);
  });
}, [toolId]);
```

---

### 2.2 Lottie Optimization (currently ~200KB+ per animation)

Lottie files are fetched from remote URLs in `lottieMappings.js`. Issues:
1. No intersection observer — animations start playing even when off-screen
2. No fallback for slow connections
3. Both `lottie-react` and `@lottiefiles/dotlottie-react` are installed — pick one

**Fix:**

```jsx
// src/components/agentix/LottieAnimation.jsx — rewrite with intersection observer
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer'; // already installed

export default function LottieAnimation({ url, poster }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '200px' });
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={ref} style={{ position: 'relative', minHeight: 200 }}>
      {/* Show static poster until in view */}
      {(!inView || !loaded) && poster && (
        <img src={poster} style={{ position: 'absolute', inset: 0, width: '100%' }} />
      )}
      {/* Only mount Lottie when near viewport */}
      {inView && (
        <DotLottieReact
          src={url}
          autoplay
          loop
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
```

Remove `lottie-react` package. Use only `@lottiefiles/dotlottie-react` (smaller, newer, better tree-shaking).

---

### 2.3 Animation Performance Architecture

**Current state:** The project uses CSS keyframes for everything. SystemMap has a `setInterval` at 30ms (33 FPS). No GPU compositing hints. All animations trigger on mount regardless of viewport position.

**Priority tiers:**

| Priority | Animation Type | Tool | Trigger |
|----------|---------------|------|---------|
| P1 — Keep | PreloaderGate phases, iris portal | Framer Motion | On mount |
| P1 — Keep | VoiceOrb breathing, pulse rings | Framer Motion | Always (small element) |
| P1 — Keep | Hero headline fade-up | CSS / Framer | On mount (above fold) |
| P2 — Optimize | Section scroll-enter animations | Framer Motion + InView | Intersection Observer |
| P2 — Optimize | CategoryConstellation SVG | CSS animation | Only when in view |
| P2 — Optimize | Lottie animations | DotLottie | InView + triggerOnce |
| P3 — Reduce | Background ambient drifts | CSS animation | Pause when tab not active |
| P3 — Reduce | WorkflowStrip marquee | CSS animation | Only when in view |
| P4 — Remove | SystemMap rotation interval | Replace with CSS | CSS animation, not JS |
| P4 — Remove | 100+ simultaneous CSS `@keyframes` | Stagger via InView | Gate behind viewport |

**Remove the 30ms SystemMap interval:**

```jsx
// HeroSection.jsx — replace lines 74-78 (setInterval rotation)
// BEFORE:
useEffect(() => {
  const id = setInterval(() => setRotation(r => r + 0.3), 30);
  return () => clearInterval(id);
}, []);

// AFTER: CSS animation, zero JS, zero timer, GPU composited
// In ax-hero.css:
.system-map-rotate { animation: orbit-rotate 30s linear infinite; }
// orbit-rotate already defined in ax-tokens.css
```

**Global InView animation pattern:**

```jsx
// src/shared/AnimateIn.jsx — create this reusable component
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } },
};

export default function AnimateIn({ children, delay = 0, className }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Replace all `animation: fade-up 0.7s both` CSS class usages with `<AnimateIn>` wrapper. Now animations only fire when the element enters the viewport.

---

### 2.4 GPU Compositing — Making Animations 60 FPS

Only `transform` and `opacity` trigger GPU compositing. Everything else causes layout/paint recalculation.

**Audit of current animations that cause paint:**
- `box-shadow` changes on hover → replace with pseudo-element opacity transitions
- `filter: blur()` transitions → OK on modern GPUs but limit to < 3 simultaneous
- `background-color` transitions on cards → replace with pseudo-element opacity
- `width` animation on progress bar → replace with `transform: scaleX()`

```css
/* BEFORE — causes paint: */
.preloader-bar { animation: preloader-bar-grow linear forwards; }
@keyframes preloader-bar-grow { from { width: 0; } to { width: 100%; } }

/* AFTER — GPU composited: */
.pg-progress-bar { transform-origin: left; animation: bar-scale linear forwards; }
@keyframes bar-scale { from { transform: scaleX(0); } to { transform: scaleX(1); } }
```

Add `will-change: transform` ONLY on elements that are actively animating for more than 1 frame. Remove it after animation ends. Overusing `will-change` creates memory pressure.

---

### 2.5 Font Optimization

**Current:** Fonts likely loaded via CSS `@font-face` or Google Fonts. Need to verify.

**Target setup:**
```html
<!-- index.html — add preconnect and preload for Geist -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" as="font" href="/fonts/Geist-Regular.woff2" crossorigin>
<link rel="preload" href="/fonts/GeistMono-Regular.woff2" as="font" crossorigin>
```

```css
/* Ensure font-display: swap everywhere */
@font-face {
  font-family: 'Geist';
  src: url('/fonts/Geist-Regular.woff2') format('woff2');
  font-display: swap;  /* Show fallback immediately, swap when loaded */
}
```

Only load font weights used. If only Regular (400) and SemiBold (600) are used, don't load Bold or Light.

---

### 2.6 Image Optimization

ToolHeroMedia serves WebM videos. Images in `/public/assets/` are unoptimized.

**Immediate wins:**
1. Convert all PNG/JPG assets to WebP (`squoosh` CLI or vite-imagetools plugin)
2. Add `loading="lazy"` to all images not in the first viewport
3. Add explicit `width` and `height` attributes to prevent layout shift (CLS)
4. For the logo in PreloaderGate: it's `/assets/clients/logo.png` — convert to WebP, add `fetchpriority="high"` since it's the LCP element on first load

```jsx
// PreloaderGate.jsx — optimize logo loading
<motion.img
  src="/assets/clients/logo.webp"
  fallback="/assets/clients/logo.png"
  alt="Agentix"
  fetchPriority="high"
  width="140"
  height="auto"
/>
```

---

### 2.7 State Optimization

**Current:** `App.jsx` manages search state, recently viewed tools, favorites globally — even on routes where these aren't needed.

**Fix:** Move `useIntelligence()` hook inside a context provider and only mount it within the home/tools routes. `TanStack Query` is already installed — use it for tool workspace data fetching (caching + deduplication).

```jsx
// Remove from App-level component:
// const { recent, favs, addView, toggleFav } = useIntelligence();
// Becomes a context — only provided within tool-related routes
```

---

## PART 3 — WORLD-CLASS ADMIN PANEL

### 3.1 Architecture Overview

The admin panel is a completely separate frontend application with its own routing, auth, and component tree. It lives at `/admin/*` and is **lazily loaded** — the entire admin bundle is never downloaded by regular users.

```
src/
  admin/
    AdminApp.jsx         ← Separate router root for /admin
    auth/
      AdminAuthContext.jsx
      useAdminAuth.js
      AdminLogin.jsx
    layout/
      AdminShell.jsx     ← Sidebar + top bar + content area
      AdminSidebar.jsx
      AdminTopBar.jsx
    pages/
      AdminDashboard.jsx
      UsersPage.jsx
      AgentsPage.jsx
      AnalyticsPage.jsx
      ApiMonitor.jsx
      ContentPage.jsx
      LogsPage.jsx
      BillingPage.jsx
      SystemPage.jsx
      SettingsPage.jsx
    components/
      StatCard.jsx       ← KPI metric card
      DataTable.jsx      ← Virtualized table
      ChartLine.jsx      ← Recharts wrapper
      ChartBar.jsx
      StatusBadge.jsx
      ActivityFeed.jsx
      SearchBar.jsx
    hooks/
      useAdminData.js
      useRealtime.js
    styles/
      admin-tokens.css   ← Admin-specific tokens (extends ax-tokens)
      admin-shell.css
      admin-components.css
```

**Route integration in main App.jsx:**
```jsx
// src/App.jsx — add this single route
const AdminApp = lazy(() => import('./admin/AdminApp'));

// In Routes:
<Route path="/admin/*" element={
  <Suspense fallback={<div style={{ background: '#07080A', minHeight: '100vh' }} />}>
    <AdminApp />
  </Suspense>
} />
```

The entire admin panel is a single lazy chunk. Regular users never download a single byte of it.

---

### 3.2 Authentication System

**Hard constraint:** Credentials must be `aiagentix2025@gmail.com` / `AGENTiX@2025`.

```jsx
// src/admin/auth/AdminAuthContext.jsx
const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'aiagentix2025@gmail.com',
  // Never hardcode passwords in source. Use env variable:
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'AGENTiX@2025',
};

// Auth stored in sessionStorage (not localStorage — cleared on tab close)
// Token: SHA-256 hash of email+password+timestamp — not a real JWT but prevents
// simple inspection. For production: replace with actual backend JWT auth.

export function useAdminAuth() {
  const [authed, setAuthed] = useState(() =>
    sessionStorage.getItem('ax_admin_token') === import.meta.env.VITE_ADMIN_TOKEN
  );

  const login = useCallback((email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = btoa(`${email}:${Date.now()}`); // Simple token
      sessionStorage.setItem('ax_admin_token', token);
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('ax_admin_token');
    setAuthed(false);
  }, []);

  return { authed, login, logout };
}
```

**Login page design:**

The admin login screen uses the same dark aesthetic as the main app, with the PreloaderGate's visual language: dark background, orange accent, minimal typography.

```jsx
// src/admin/auth/AdminLogin.jsx
export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 600)); // Deliberate delay — feels secure
    const ok = login(email, password);
    setLoading(false);
    if (!ok) {
      setError('Invalid credentials');
      // Clear password field on failure — security UX
      setPassword('');
    }
  };

  return (
    <div className="al-root">
      <div className="al-card">
        <div className="al-logo">
          <img src="/assets/clients/logo.png" alt="AGENTiX" className="al-logo-img" />
        </div>
        <p className="al-eyebrow">ADMIN CONSOLE</p>
        <h1 className="al-title">Sign in</h1>
        <form onSubmit={handleSubmit} className="al-form" autoComplete="off">
          <div className="al-field">
            <label className="al-label">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                   className="al-input" required placeholder="admin@domain.com"
                   autoCapitalize="none" autoCorrect="off" />
          </div>
          <div className="al-field">
            <label className="al-label">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                   className="al-input" required placeholder="••••••••" />
          </div>
          {error && <p className="al-error">{error}</p>}
          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Access Console'}
          </button>
        </form>
      </div>
      {/* Ambient background — matches brand */}
      <div className="al-ambient" />
    </div>
  );
}
```

**Admin Login CSS** — matches PreloaderGate aesthetic:
```css
.al-root {
  min-height: 100vh; background: #07080A;
  display: grid; place-items: center;
  position: relative; overflow: hidden;
}
.al-ambient {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 600px 400px at 50% 40%, rgba(232,117,32,0.07), transparent 70%);
  pointer-events: none;
}
.al-card {
  position: relative; z-index: 2;
  width: min(400px, calc(100vw - 32px));
  padding: 40px;
  background: rgba(15,18,25,0.8);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.7);
}
.al-logo-img { width: 80px; height: auto; margin-bottom: 24px; }
.al-eyebrow {
  font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em;
  color: #E87520; text-transform: uppercase; margin-bottom: 8px;
}
.al-title {
  font-family: var(--font-display); font-size: 28px; font-weight: 600;
  color: #F4F5F7; letter-spacing: -0.025em; margin-bottom: 32px;
}
.al-form { display: flex; flex-direction: column; gap: 20px; }
.al-label { font-size: 11px; font-weight: 500; color: #5A5F6A;
            letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px;
            display: block; font-family: var(--font-mono); }
.al-input {
  width: 100%; background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;
  padding: 12px 14px; color: #F4F5F7; font-size: 14px;
  font-family: var(--font-body); outline: none; box-sizing: border-box;
  transition: border-color 0.2s;
}
.al-input:focus { border-color: rgba(232,117,32,0.5); }
.al-input::placeholder { color: rgba(255,255,255,0.2); }
.al-error { font-size: 12px; color: #FF7B7B; text-align: center; }
.al-btn {
  background: #E87520; color: white; border: none; border-radius: 8px;
  padding: 13px; font-size: 14px; font-weight: 600; cursor: pointer;
  font-family: var(--font-display); transition: opacity 0.2s, transform 0.15s;
  margin-top: 8px;
}
.al-btn:hover { opacity: 0.9; transform: translateY(-1px); }
.al-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
```

---

### 3.3 Admin Shell Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  TOPBAR: [Logo] [Search]                    [Alerts] [Profile]  │
├────────────────┬────────────────────────────────────────────────┤
│                │                                                 │
│  SIDEBAR       │  CONTENT AREA                                   │
│  ─────────     │                                                 │
│  Dashboard     │  [Page component rendered here]                 │
│  Users         │                                                 │
│  AI Agents     │                                                 │
│  Analytics     │                                                 │
│  API Monitor   │                                                 │
│  Content       │                                                 │
│  Billing       │                                                 │
│  Logs          │                                                 │
│  System        │                                                 │
│  ─────────     │                                                 │
│  Settings      │                                                 │
│  Logout        │                                                 │
└────────────────┴────────────────────────────────────────────────┘
```

**CSS:**
```css
.admin-shell {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 52px 1fr;
  min-height: 100vh;
  background: var(--bg-0);
}

.admin-topbar {
  grid-column: 1 / -1;
  background: var(--bg-1);
  border-bottom: 1px solid var(--line);
  display: flex; align-items: center; padding-inline: 20px;
  position: sticky; top: 0; z-index: 100;
}

.admin-sidebar {
  background: var(--bg-1);
  border-right: 1px solid var(--line);
  padding: 16px 12px;
  display: flex; flex-direction: column; gap: 4px;
  position: sticky; top: 52px; height: calc(100vh - 52px);
  overflow-y: auto;
}

.admin-content {
  padding: 24px 28px;
  overflow-y: auto;
}

/* Mobile admin — sidebar becomes bottom drawer */
@media (max-width: 767px) {
  .admin-shell { grid-template-columns: 1fr; }
  .admin-sidebar { display: none; } /* Replace with mobile bottom nav */
}
```

---

### 3.4 Dashboard Page Design

The dashboard is the command center. Every number should tell a story.

**KPI Grid — 4 primary metrics at top:**
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Total Users │ │ Voice Sess. │ │ AI Agents   │ │ API Calls   │
│ 2,847       │ │ 1,203       │ │ 9 Active    │ │ 48.2K today │
│ +12% 7d     │ │ +28% 7d     │ │ All healthy │ │ +5% hour    │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

Below: 2-column grid — Activity feed (left) + System health chart (right).

**StatCard component:**
```jsx
// src/admin/components/StatCard.jsx
export default function StatCard({ label, value, delta, deltaLabel, status }) {
  const isPositive = delta > 0;
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {delta !== undefined && (
        <p className={`stat-delta ${isPositive ? 'stat-delta--up' : 'stat-delta--down'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(delta)}% {deltaLabel}
        </p>
      )}
      {status && <div className={`stat-status stat-status--${status}`} />}
    </div>
  );
}
```

```css
.stat-card {
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: var(--r-3);
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.stat-card::before { /* Subtle top-edge highlight */
  content: ''; position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(232,117,32,0.4), transparent);
}
.stat-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
              font-family: var(--font-mono); color: var(--ink-3); margin-bottom: 12px; }
.stat-value { font-size: clamp(24px, 3vw, 36px); font-weight: 600;
              color: var(--ink-0); letter-spacing: -0.03em; line-height: 1; }
.stat-delta { font-size: 12px; margin-top: 8px; font-family: var(--font-mono); }
.stat-delta--up   { color: var(--ok); }
.stat-delta--down { color: var(--err); }
```

---

### 3.5 Admin Pages — Feature Inventory

| Page | Key Components | Data Source |
|------|---------------|-------------|
| Dashboard | 4 StatCards, activity feed, system health | Mock → real API |
| Users | Virtualized DataTable, search, role filter, export | Backend /admin/users |
| AI Agents | Agent cards, status badges, enable/disable toggle | /admin/agents |
| Analytics | Line charts (7d, 30d, 90d), heatmap, conversion funnel | /admin/analytics |
| API Monitor | Real-time request graph, endpoint table, error rate | /admin/api |
| Content | WYSIWYG for tool descriptions, media upload | /admin/content |
| Billing | Subscription table, revenue chart, invoice list | /admin/billing |
| Logs | Filterable activity log, search, export | /admin/logs |
| System | CPU/memory bars, DB size, uptime, health checks | /admin/system |
| Settings | Theme toggle, brand config, notification prefs | /admin/settings |

---

## PART 4 — FRONTEND ARCHITECTURE IMPROVEMENTS

### 4.1 Scalable Folder Structure

```
frontend/src/
  ├── core/                    ← Design system, global utilities
  │   ├── tokens/              
  │   │   └── index.css        ← Single CSS entry (replaces 7 scattered files)
  │   ├── hooks/
  │   │   ├── useMediaQuery.js
  │   │   ├── useReducedMotion.js
  │   │   └── useIntersection.js
  │   └── utils/
  │       ├── cn.js            ← clsx/tailwind-merge utility
  │       └── format.js        ← Number, date, string formatters
  │
  ├── shared/                  ← Reusable UI components (no feature logic)
  │   ├── AnimateIn.jsx        ← InView animation wrapper
  │   ├── Button.jsx
  │   ├── Card.jsx
  │   ├── DataTable.jsx        ← Virtualized table (used in admin + site)
  │   ├── Input.jsx
  │   ├── Modal.jsx
  │   ├── Skeleton.jsx         ← Loading skeleton
  │   └── StatusBadge.jsx
  │
  ├── features/                ← Feature modules (self-contained)
  │   ├── voice/               ← All voice agent files (current voice-agent/)
  │   ├── admin/               ← Admin panel (new)
  │   └── search/              ← Global search
  │
  ├── site/                    ← Site-specific components
  │   ├── home/                ← Components only used on home page
  │   │   ├── HeroSection.jsx
  │   │   ├── SystemMap.jsx
  │   │   └── ...
  │   ├── tools/
  │   ├── categories/
  │   └── pages/               ← Current pages/site/ contents
  │
  ├── data/                    ← (unchanged — already well-organized)
  ├── App.jsx                  ← Route tree only (no component logic)
  └── main.jsx
```

This separation means: 
- `shared/` components have no feature dependencies — testable in isolation
- `features/voice` and `features/admin` are independent — can be developed in parallel
- `site/home` imports never get bundled into the admin chunk (natural tree-shaking)

---

### 4.2 Motion System Architecture

Replace scattered CSS keyframes + inline Framer Motion with a centralized motion system:

```js
// src/core/motion.js — THE motion design system

export const EASING = {
  spring:  [0.16, 1, 0.3, 1],    // Entries — premium spring
  bouncy:  [0.34, 1.56, 0.64, 1], // Playful, confirmation
  sharp:   [0.4, 0, 1, 1],        // Exits — fast, decisive
  smooth:  [0.2, 0.7, 0.2, 1],    // Hover, micro-interactions
};

export const DURATION = {
  instant: 0.1,
  fast:    0.2,
  base:    0.35,
  slow:    0.55,
  cinematic: 0.8,
};

// Page-level transition preset
export const pageTransition = {
  initial:  { opacity: 0, y: 8 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -4 },
  transition: { duration: DURATION.base, ease: EASING.spring },
};

// Stagger children (for lists, grids)
export const staggerContainer = (staggerTime = 0.06) => ({
  animate: { transition: { staggerChildren: staggerTime } },
});

export const fadeUpItem = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASING.spring } },
};
```

Usage: `import { pageTransition, fadeUpItem } from '../core/motion'`

---

### 4.3 State Management Architecture

**Current:** `useState` everywhere in App.jsx, including global state (search, recent tools, favorites). No context boundaries.

**Target:**
```
App-level providers (no state — just routes):
  ├── ThemeProvider (read CSS custom props — no state needed)
  ├── VoiceProvider (wraps VoiceExperience context)
  └── AdminAuthProvider (only within /admin/* routes)
```

Search state: `useSearchParams()` — URL is the source of truth. No useState for search queries.  
Tool views/favorites: `useSyncExternalStore()` with localStorage — reactive, no context needed.  
Server data: TanStack Query (already installed) — for all API calls (admin data, analytics).

---

## PART 5 — UI/UX IMPROVEMENTS

### 5.1 Visual Hierarchy System

Every screen must answer three questions in < 1 second:
1. **Where am I?** — Page identity (logo, page title, breadcrumb)
2. **What matters most?** — Primary action, hero content
3. **What do I do next?** — CTA, navigation, interaction hint

**Current failure modes:**
- Hero CTA competes visually with SystemMap — eye doesn't know where to go first
- Section headings use the same visual weight throughout — no hierarchy
- Orange accent used on too many elements simultaneously — loses its signal value

**Fix — accent economy:**
Use `#E87520` (orange) on: primary CTAs, active states, loading indicators, the orb.  
Use `#5BE3E3` (cyan) on: secondary data, status indicators, code/mono contexts.  
Use `#F4F5F7` (ink-0) on: primary text, page titles only.  
Use `#8B919C` (ink-2) on: body text, descriptions, secondary labels.

Never use orange on decorative elements. Its job is to direct attention to action.

### 5.2 Loading States

Every async operation needs a skeleton, not a spinner:
```jsx
// src/shared/Skeleton.jsx
export function Skeleton({ width = '100%', height = 20, radius = 6 }) {
  return (
    <div style={{
      width, height,
      borderRadius: radius,
      background: 'linear-gradient(90deg, var(--bg-3) 25%, var(--bg-4) 50%, var(--bg-3) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s ease-in-out infinite',
    }} />
  );
}
```

Skeletons preserve layout during load. Spinners collapse layout and feel cheap.

### 5.3 Empty States

Every list, table, and data section needs a branded empty state:
```jsx
// When no tools match search:
<div className="empty-state">
  <div className="empty-state-icon">
    {/* Relevant icon — not generic */}
  </div>
  <p className="empty-state-title">No tools match "{query}"</p>
  <p className="empty-state-body">Try a different keyword or browse categories</p>
  <button className="btn btn-secondary">Browse all categories</button>
</div>
```

Empty states should never be blank screens or generic "no data" messages.

---

## PART 6 — IMPLEMENTATION ROADMAP

### Phase 0 — Foundation (Week 1, ~8 hours)
**Impact: Highest. All other work builds on this.**

1. Add breakpoint custom properties to `ax-tokens.css`
2. Configure Vite `manualChunks` in `vite.config.js` — immediate bundle split
3. Add `React.lazy()` to all secondary routes in `App.jsx`
4. Replace SystemMap `setInterval` with CSS animation
5. Add `useMagneticCursor` cleanup (already done in PreloaderGate — confirm)
6. Create `src/core/motion.js` motion design system file

**Measurable outcome:** Bundle drops from 1,171 KB to ~350 KB initial.

### Phase 1 — Performance (Week 2, ~12 hours)
**Impact: Direct user experience.**

1. Rewrite `LottieAnimation.jsx` with IntersectionObserver
2. Create `AnimateIn.jsx` shared component
3. Replace all CSS `fade-up` class animations with `<AnimateIn>` 
4. Add `will-change: transform` + remove it post-animation on heavy elements
5. Image optimization: convert PNG → WebP, add explicit dimensions
6. Font: add preload hints to `index.html`
7. Remove `lottie-react` package (keep only dotlottie-react)

**Measurable outcome:** LCP < 2.5s. CLS < 0.1. FID < 100ms.

### Phase 2 — Responsiveness (Week 3, ~16 hours)
**Impact: Mobile + tablet users — major UX improvement.**

1. Migrate all breakpoints to 5-canonical system (ax-tokens.css → all CSS files)
2. Fix Hero: mobile/tablet shows static visual instead of SystemMap
3. Fix Navigation: single hamburger breakpoint at 768px
4. Fix card grids: auto-fill minmax pattern everywhere
5. Fix ToolHeroMedia: disable video on mobile/slow connections
6. Add safe area padding for iOS/Android
7. Fix form/modal sizing with `min()` responsive values

**Measurable outcome:** Zero horizontal overflow on any viewport. Mobile Lighthouse score > 85.

### Phase 3 — Admin Panel (Week 4–5, ~32 hours)
**Impact: Business operations capability.**

1. Create folder structure: `src/admin/`
2. `AdminAuthContext.jsx` + `useAdminAuth.js`
3. `AdminLogin.jsx` (design + code)
4. `AdminShell.jsx` (layout)
5. `AdminSidebar.jsx` + `AdminTopBar.jsx`
6. `AdminDashboard.jsx` (StatCards + mock data)
7. `UsersPage.jsx` (DataTable + search)
8. `AgentsPage.jsx`
9. `AnalyticsPage.jsx` (charts — use recharts, already dependency-adjacent)
10. `LogsPage.jsx`
11. `SystemPage.jsx`
12. Wire `/admin/*` route in `App.jsx`

**Measurable outcome:** Fully working admin panel at `/admin`.

### Phase 4 — Architecture Cleanup (Week 6, ~8 hours)
**Impact: Developer velocity, long-term.**

1. Restructure folders to `core/` + `shared/` + `features/` + `site/`
2. Extract `motion.js` constants
3. Move voice agent files to `features/voice/`
4. Create `shared/Skeleton.jsx`, `shared/AnimateIn.jsx`
5. Consolidate CSS into `core/tokens/` with single entry point

**Total estimated:** 76 hours of engineering work, 6 weeks sequenced.

---

## QUICK WINS — DO THESE TODAY

These 5 changes take < 2 hours total and produce measurable improvements immediately:

1. **Vite manualChunks** — split bundle: ~30 min work, ~60% bundle reduction
2. **React.lazy() on 10 biggest routes** — 30 min, eliminates eager loading
3. **SystemMap: remove setInterval** — 10 min, eliminates the only CPU-intensive timer
4. **Add `fetchpriority="high"` to logo in PreloaderGate** — 5 min, LCP improvement
5. **Add `loading="lazy"` to all non-above-fold images** — 15 min, reduces initial load

These alone will make the app feel significantly faster before any structural work begins.
