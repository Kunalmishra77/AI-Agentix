import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Preloader controller — a JS-driven progress bar that eases toward ~90% while the
// app loads, then completes to 100% once it's genuinely ready (fonts loaded), and
// fades out. Deterministic, always finishes, hard-capped so it can never hang.
function dismissPreloader() {
  const el = document.getElementById('agx-preloader')
  if (!el) return
  const fill = el.querySelector('.agx-bar-fill')
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const FLOOR = 700 // ms — floor so the intro animation lands before we can finish
  const MAX_WAIT = 3000 // hard cap so a slow font never traps the loader

  let ready = false
  let done = false
  const finish = () => {
    if (done) return
    done = true
    el.classList.add('agx-hide')
    el.addEventListener('transitionend', () => el.remove(), { once: true })
    setTimeout(() => el.remove(), 700) // fallback if transitionend doesn't fire
  }

  const setFill = (p) => { if (fill) fill.style.transform = 'scaleX(' + p / 100 + ')' }

  // Signal "ready" after fonts are loaded (or the hard cap), respecting the floor.
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, MAX_WAIT))]).then(() => {
    setTimeout(() => { ready = true }, Math.max(0, FLOOR - performance.now()))
  })

  if (reduce) {
    // No easing animation — just fill and finish once ready.
    setFill(100)
    const poll = setInterval(() => { if (ready) { clearInterval(poll); finish() } }, 60)
    return
  }

  // Ease the bar toward 90% while loading; snap to 100% and fade when ready.
  let progress = 0
  const tick = () => {
    const target = ready ? 100 : 90
    const speed = ready ? 0.26 : 0.045
    progress += (target - progress) * speed + (ready ? 0 : 0.25)
    if (progress > target) progress = target
    setFill(progress)
    if (ready && progress >= 99.4) { setTimeout(finish, 180); return }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
requestAnimationFrame(() => requestAnimationFrame(dismissPreloader))
