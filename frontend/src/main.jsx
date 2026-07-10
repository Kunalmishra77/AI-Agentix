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

// Dismiss the inline preloader once the app is genuinely ready — gated on real
// readiness (fonts loaded) rather than an arbitrary delay, with a small floor so
// the progress bar completes gracefully and a hard cap so it never hangs.
function dismissPreloader() {
  const el = document.getElementById('agx-preloader')
  if (!el) return
  const fill = el.querySelector('.agx-bar-fill')
  const FLOOR = 650 // ms since navigation start — lets the intro animation land
  const MAX_WAIT = 3000 // hard cap so a slow font never traps the loader

  const complete = () => {
    // drive the progress bar to 100%, then fade the overlay out
    if (fill) {
      fill.style.animation = 'none'
      fill.style.transition = 'transform .4s cubic-bezier(.25,.8,.25,1)'
      fill.style.transform = 'scaleX(1)'
    }
    setTimeout(() => {
      el.classList.add('agx-hide')
      el.addEventListener('transitionend', () => el.remove(), { once: true })
      setTimeout(() => el.remove(), 700) // fallback if transitionend doesn't fire
    }, 420)
  }

  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, MAX_WAIT))]).then(() => {
    setTimeout(complete, Math.max(0, FLOOR - performance.now()))
  })
}
requestAnimationFrame(() => requestAnimationFrame(dismissPreloader))
