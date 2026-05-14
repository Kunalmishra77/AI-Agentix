# Preloader + VoiceGate Redesign — "AWAKENING"
**Date:** 2026-05-13  
**Project:** AI Agentix  
**Scope:** Preloader.jsx + VoiceGate.jsx + voice-agent.css (partial)  
**Stack:** React 18, Framer Motion v11 (already installed)

---

## 1. STRATEGIC DECISION

**Merge Preloader and VoiceGate into one unified cinematic entry sequence.**

The current architecture has two separate experiences with a hard cut between them:
- Preloader: light warm background (#FAF7F4) — jarring contrast to the dark app
- VoiceGate: dark but teal/green (#00c8a0) — misaligned with brand orange (#E87520)

The new design eliminates both problems. The experience is:
- Dark from frame 0 (matches the app)
- Orange brand throughout (not teal)
- One uninterrupted 4.5s cinematic sequence that ends at the "click anywhere" state
- Click triggers an iris portal expansion that reveals the main site

---

## 2. EXPERIENCE FLOW — "THE AWAKENING"

Six beats, total ~4.5s to ready state, then ambient "breathing" until click.

```
[0ms]       VOID          — Pure dark. Absolute stillness.
[400ms]     EMBER BIRTH   — Single orange light point appears at center.
[1200ms]    MATERIALIZATION — Logo assembles from ember via particle coalesce.
[2000ms]    SYSTEM BOOT   — Mono-spaced AI boot text types below logo.
[3400ms]    GATE FORM     — Boot completes. Orb expands from ember beneath logo.
[4500ms]    INVITATION    — Full VoiceGate state. Breathing. Magnetic. Alive.
[CLICK]     IRIS OPEN     — Orb expands to fill screen → reveals main site beneath.
```

---

## 3. PHASE-BY-PHASE DESIGN SPEC

### Phase 1 — VOID (0–400ms)
- Background: `#07080A` (brand `--bg-0`), no elements visible
- Purpose: reset the user's visual system, create tension
- Duration: 400ms pure black
- Micro detail: a *barely perceptible* radial gradient center glow at 2% opacity (orange) so the eye is drawn to center even before anything appears

### Phase 2 — EMBER BIRTH (400–1200ms)
- A single pixel-scale point of light at viewport center
- Framer Motion: `scale` from 0 → 1, opacity 0 → 1, over 600ms
- Easing: `[0.16, 1, 0.3, 1]` (spring-like, premium)
- The point expands to a soft 8px glowing orb: `#E87520` core, with `radial-gradient` bloom
- Simultaneously: a very faint (3% opacity) grid pattern fades in over 800ms — the same grid used in app-bg
- The ember breathes once (scale 1 → 1.15 → 1) before the next phase triggers

### Phase 3 — MATERIALIZATION (1200–2400ms)
- The logo (`/assets/clients/logo.png`) materializes at center
- Implementation: logo starts at `opacity: 0, scale: 0.85, filter: blur(12px)`
- Animates to `opacity: 1, scale: 1, filter: blur(0px)` over 800ms
- Simultaneously: 20–30 tiny orange particles scatter FROM the logo's bounding box edges, then reverse-coalesce inward (suggests the logo is "assembled" by intelligence)
- Particles: 2–5px dots, `#E87520` with 60% opacity, `border-radius: 50%`
- Particle motion: Framer Motion `staggerChildren` 0.04s per particle, each with randomized radial start positions that move TO logo center
- Logo arrives with a soft `drop-shadow(0 0 24px rgba(232,117,32,0.35))` — alive, glowing
- The ember point below the logo remains, begins very slow breathing

### Phase 4 — SYSTEM BOOT (2400–3800ms)
- Three lines of monospaced text appear below the logo, each typing character by character
- Font: Geist Mono, 11px, letter-spacing 0.12em, uppercase
- Color: `#5BE3E3` (brand cyan — first and only cyan accent, adds depth to the orange-dominant palette)
- Lines:
  1. `> AGENTIX OS v4 · INITIALIZING` — appears at 2400ms
  2. `> NEURAL PATHWAYS · LOADING` — appears at 2900ms  
  3. `> VOICE SYSTEMS · READY` — appears at 3400ms, text color shifts to `#E87520` on "READY"
- Typing: Framer Motion `staggerChildren` (0.05s per character) on individual `<motion.span>` elements — consistent with the rest of the animation system, no rAF timers
- Below the three lines: a **razor-thin** (1px) progress line, full-width of the text column (~280px)
  - Color: `linear-gradient(90deg, #E87520 0%, #5BE3E3 100%)`
  - Grows from 0% to 100% width over 1400ms, perfectly timed to "READY" completing
  - Has a soft leading glow (2px box-shadow at the moving tip)
- Cursor: a blinking `_` at end of current line, disappears when line is complete
- Logo remains, ember remains, everything is additive

### Phase 5 — GATE FORM (3800–4500ms)
- Boot text fades out: `opacity: 1 → 0, translateY: 0 → -8px` over 400ms
- Progress line fades: `opacity: 1 → 0` over 300ms
- The ember beneath the logo rapidly expands into the VoiceGate orb:
  - Scale: 1 → 6 → settles at the orb's final size (120px diameter)
  - This expansion pushes the logo upward by 80px via `translateY` on the logo
  - Duration: 500ms, easing `[0.16, 1, 0.3, 1]`
- Three concentric rings expand outward from the orb (pulse sequence)
  - Ring colors: `rgba(232,117,32, 0.5)`, `rgba(232,117,32, 0.3)`, `rgba(232,117,32, 0.15)`
  - Each ring: scale 1 → 2.5, opacity 1 → 0 over 1.2s, staggered 0.35s apart
  - This repeats on loop during the INVITATION phase
- Title and sub-copy fade in via `opacity: 0 → 1, translateY: 12px → 0`

### Phase 6 — INVITATION (4500ms → click)
The settled VoiceGate state. Every element is alive.

**Layout (vertical center stack):**
```
[logo — small, 80px, dimmer than during boot]
[gap 48px]
[orb — 120px, breathing, glowing]
[gap 32px]
[title — "AGENTiX"]
[sub — "Your AI Operating System is ready"]
[gap 24px]
[no explicit CTA text — see below]
[bottom brand — "Powered by AGENTiX AI · Voice-First"]
```

**Orb design:**
- `background: radial-gradient(circle at 38% 35%, rgba(255,180,80,0.95), #E87520 45%, #C95F10 80%)`
- `box-shadow: 0 0 0 1px rgba(232,117,32,0.3), 0 0 40px rgba(232,117,32,0.5), 0 0 80px rgba(232,117,32,0.2)`
- Inner highlight: a subtle white arc `::before` element, `rgba(255,255,255,0.15)`, positioned at top-left 35%
- Breathing: scale oscillates `1 → 1.06 → 1`, glow oscillates in sync, period 3.5s, easing `easeInOut`
- Mic icon: white, 28px, centered — NOT the standard mic icon, instead a custom waveform icon (3 vertical bars of varying height, like a mini EQ meter) that subtly animates

**"No CTA" interaction design — the screen IS the cue:**
- The ENTIRE background very subtly pulses opacity `1 → 0.97 → 1` in a slow 4s breathing cycle (in sync with orb)
- The orb glows more intensely on a 0.3s cycle when hovering near (not just on hover — within 200px radius of orb)
- A `12px` soft label appears BELOW the orb: `"TOUCH ANYWHERE"` in Geist Mono, `#E87520` at 60% opacity, letter-spacing 0.2em — understated, not bold
- This label has a slow opacity pulse `0.6 → 0.4 → 0.6`, period 2s

**Magnetic cursor:**
- Custom cursor: a soft glowing dot `12px`, `#E87520`, blurred slightly
- When within 160px of orb center: cursor is gently pulled toward the orb (lerp-based `mousemove` handler, factor 0.12)
- The pull is subtle — enough to feel magnetic, not annoying

**Background ambient field:**
- `radial-gradient(ellipse 800px 600px at 50% 50%, rgba(232,117,32,0.06) 0%, transparent 70%)`
- Slowly drifts: center moves in a 20s Lissajous path (±60px on each axis)
- Very faint — not visible consciously, felt subconsciously

---

## 4. ON-CLICK: IRIS PORTAL ACTIVATION

This is the centrepiece moment. Do not simplify it.

### What happens (600ms total):

**0ms — contact:** Orb receives click  
**0–80ms:** Orb scale `1 → 0.92` (compress, like pressing a button)  
**80–120ms:** Orb scale `0.92 → 1.4` (release, spring back and beyond — anticipation)  
**120–600ms:** Orb scale `1.4 → 60` (explodes outward filling viewport)  
- The color remains `#E87520` as it expands  
- At 80% expansion, opacity begins fading: `1 → 0`  
- Simultaneously the logo fades: `opacity 1 → 0` over 200ms  
- The title/sub fades: `opacity 1 → 0` over 150ms  

**Result:** The screen goes from VoiceGate → pure dark for 80ms → the main site is already mounted beneath and fades in via `opacity: 0 → 1` over 300ms

**Easing for expansion:** `cubic-bezier(0.4, 0, 1, 1)` — aggressive ease-in (feels explosive, not floaty)

**The corner orb:**  
- After the expansion, the VoiceOrb component in the bottom-right corner appears via scale `0 → 1` with spring easing `[0.34, 1.56, 0.64, 1]` — a little bounce that says "I'm alive"

---

## 5. COMPONENT ARCHITECTURE

### New components created:
```
src/voice-agent/
  PreloaderGate.jsx        ← NEW: unified entry sequence (replaces both Preloader + VoiceGate)
  PreloaderGate.css        ← NEW: scoped styles for the entry sequence
  BootText.jsx             ← NEW: typing animation component
  ParticleField.jsx        ← NEW: logo materialization particles
  IrisOverlay.jsx          ← NEW: the portal expansion click effect
  useMagneticCursor.js     ← NEW: cursor magnetic pull hook
```

### Modified:
```
src/components/agentix/Preloader.jsx   ← becomes a thin wrapper or is removed
src/voice-agent/VoiceGate.jsx          ← REMOVED (PreloaderGate fully replaces it)
src/voice-agent/VoiceExperience.jsx    ← showGate renders PreloaderGate instead of VoiceGate
src/App.jsx                            ← Preloader removed (PreloaderGate handles loading state)
```

### Key architectural decision:
`PreloaderGate` manages its own internal phase state machine via a single `useEffect` sequence driven by Framer Motion's `useAnimate` hook (or `AnimatePresence` + variants). It accepts `onEnter` from `VoiceExperience` and calls it on click after the iris animation completes. The main site is mounted (hidden) during the gate — so there's zero delay between click and site appearing.

---

## 6. MOTION SYSTEM

### Easing tokens (to be used consistently):
```js
const EASE_SPRING   = [0.16, 1, 0.3, 1]      // entries — premium spring
const EASE_BOUNCY   = [0.34, 1.56, 0.64, 1]  // orb corner appear
const EASE_SHARP_IN = [0.4, 0, 1, 1]          // iris explosion
const EASE_OUT      = [0.2, 0.7, 0.2, 1]      // general exits
```

### Framer Motion strategy:
- Use `useAnimate()` for the orchestrated phase sequence (imperative control)
- Use `motion.div` with `variants` for self-contained repeating animations (orb breathe, ring pulses)
- Use `AnimatePresence` for mounting/unmounting the entire PreloaderGate
- Avoid `useEffect` timers where Framer can handle timing (reduces drift)

---

## 7. TYPOGRAPHY

| Use | Font | Weight | Size | Tracking |
|-----|------|--------|------|----------|
| Logo (not text, image) | — | — | 140px width during materialization/boot, 80px width at settled gate state | — |
| Boot lines | Geist Mono | 400 | 11px | 0.12em |
| Gate title "AGENTiX" | Geist | 600 | clamp(32px, 5vw, 56px) | -0.03em |
| Gate sub | Geist | 400 | clamp(14px, 2vw, 18px) | -0.01em |
| Touch label | Geist Mono | 500 | 10px | 0.22em uppercase |
| Bottom brand | Geist Mono | 400 | 10px | 0.08em |

---

## 8. COLOR USAGE

| Element | Color | Note |
|---------|-------|-------|
| Background | `#07080A` | Matches app exactly — no jarring cut |
| Ember / Orb | `#E87520` | Brand primary throughout |
| Orb highlight | `rgba(255,180,80,0.9)` | Inner glow warmth |
| Boot line text | `#5BE3E3` | Brand cyan — used sparingly, one moment only |
| "READY" text | `#E87520` | Cyan lines resolve to orange on completion |
| Gate title | `#F4F5F7` | Brand `--ink-0` |
| Gate sub | `#8B919C` | Brand `--ink-2` |
| Touch label | `rgba(232,117,32,0.6)` | Understated |
| Particle dots | `rgba(232,117,32,0.7)` | Coalesce effect |
| Ring pulses | `rgba(232,117,32, 0.5/0.3/0.15)` | 3 rings, diminishing |
| Progress line | `#E87520 → #5BE3E3` gradient | Left to right |

No green. No teal as primary. No neon. No white glows.

---

## 9. MICROINTERACTION CATALOG

| Trigger | Effect | Duration |
|---------|--------|----------|
| Page load | Void → ember | 400ms delay, then 600ms grow |
| Ember present | Single breathe | 800ms before logo appears |
| Logo arrives | Particle reverse-coalesce | 800ms stagger |
| Boot completes | Cyan→orange color shift on "READY" | 200ms |
| Gate settled | Orb breathing | 3.5s period, infinite |
| Gate settled | Background glow drift | 20s Lissajous path, infinite |
| Cursor near orb | Magnetic pull (lerp 0.12) | Real-time, continuous |
| Cursor on orb | Scale 1.04, glow intensity +30% | 200ms |
| Anywhere click | Compress → spring → iris expand | 600ms total |
| Iris completes | Corner orb bounces in | 400ms after gate removed |
| Touch label | Opacity pulse 0.6→0.4→0.6 | 2s period, infinite |

---

## 10. ACCESSIBILITY

- `prefers-reduced-motion`: if true, skip all transitions — show gate immediately at settled state, click triggers instant fade (no iris)
- ARIA: `role="button" aria-label="Activate voice experience"` on the gate overlay
- No autoplay audio on arrival
- Color contrast: all text meets WCAG AA on the dark background
- Focus ring: gate has a visible focus outline for keyboard navigation
- Touch: works identically to click on mobile — `onPointerDown` not `onClick` to eliminate 300ms delay on iOS

---

## 11. MOBILE CONSIDERATIONS

- Orb size: `100px` on mobile (was 120px on desktop)
- Logo: `64px` at gate on mobile (56px on desktop — reversed because mobile needs more visual weight)
- Boot text: hidden on mobile (replaced by a single `LOADING...` with character animation)
- Magnetic cursor: disabled on touch devices (no pointer events)
- Iris expansion: slightly faster (500ms vs 600ms) — mobile users expect snappier response
- Touch hint: `"TAP ANYWHERE"` instead of `"TOUCH ANYWHERE"` — detected via `navigator.maxTouchPoints`

---

## 12. PERFORMANCE

- ParticleField: max 24 particles (DOM nodes), not canvas — simplifies code, sufficient for the effect
- If device is low-power (battery saver mode or `navigator.hardwareConcurrency <= 2`): reduce particles to 8, disable background drift
- Framer Motion tree-shakes cleanly — only `motion`, `AnimatePresence`, `useAnimate` needed
- No GSAP dependency added — Framer Motion v11 handles all required animation (already installed)
- Logo image is already served at `/assets/clients/logo.png` — no new network requests for the gate
- Main site components mount (hidden) immediately on first render — click shows them instantly, no loading delay

---

## 13. SOUND DESIGN (Optional Layer — Not Blocking)

Subtle, opt-in, respects `prefers-reduced-motion` as a proxy:
- **Ember appear:** single 40ms sine tone, 220Hz, volume 0.03 — barely perceptible, felt more than heard
- **Logo materialize:** soft 200ms white noise burst at 0.02 volume — suggests "assembly"
- **Boot lines:** each line triggers a 20ms tick (like a terminal key) at 0.05 volume
- **READY:** a single clean tone, 440Hz, 150ms fade-out — musical, not mechanical
- **Click/iris:** low 80Hz "thud" + high sine sweep — IMAX-adjacent, premium

All sounds via Web Audio API. No audio files needed. Disabled if `prefers-reduced-motion` is set.

---

## 14. WHAT DOES NOT CHANGE

- `onEnter` / `onGateClick` callback chain in `useVoiceLoop` — untouched
- `VoiceOrb`, `SubtitleBand`, `VoiceLeadForm` — untouched
- All voice logic: `useVoiceLoop`, `useGroqChat`, `useSTT`, `useTTS`, `agentFlow` — untouched
- `PHASES`, `orbState`, the entire state machine — untouched
- All routing, pages, site content — untouched

---

## 15. FILES CHANGED SUMMARY

| File | Action | Notes |
|------|--------|-------|
| `src/voice-agent/PreloaderGate.jsx` | CREATE | Main unified entry component |
| `src/voice-agent/PreloaderGate.css` | CREATE | Scoped styles |
| `src/voice-agent/BootText.jsx` | CREATE | Typing animation sub-component |
| `src/voice-agent/ParticleField.jsx` | CREATE | Particle coalesce sub-component |
| `src/voice-agent/IrisOverlay.jsx` | CREATE | Portal expansion overlay |
| `src/voice-agent/useMagneticCursor.js` | CREATE | Cursor magnetic hook |
| `src/voice-agent/VoiceExperience.jsx` | MODIFY | Import PreloaderGate, remove VoiceGate |
| `src/voice-agent/VoiceGate.jsx` | REMOVE | Logic moved into PreloaderGate |
| `src/voice-agent/voice-agent.css` | MODIFY | Remove va-gate-* styles |
| `src/components/agentix/Preloader.jsx` | REMOVE | PreloaderGate handles loading state |
| `src/App.jsx` | MODIFY | Remove Preloader import/render |

---

## 16. IMPLEMENTATION SEQUENCE

Build in this order to avoid regressions:

1. `PreloaderGate.css` — styles first, no JS risk
2. `BootText.jsx` — isolated, testable alone
3. `ParticleField.jsx` — isolated, testable alone
4. `useMagneticCursor.js` — isolated hook
5. `IrisOverlay.jsx` — the click effect (can mock the trigger)
6. `PreloaderGate.jsx` — assembles all sub-components, implements phase state machine
7. `VoiceExperience.jsx` — wire in PreloaderGate, remove VoiceGate
8. `App.jsx` — remove old Preloader
9. Delete `VoiceGate.jsx`, old `Preloader.jsx`
10. Remove `va-gate-*` from `voice-agent.css`
