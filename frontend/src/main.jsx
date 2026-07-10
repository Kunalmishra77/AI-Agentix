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

// Dismiss the inline preloader once the app has mounted — after a short minimum
// display so it never just flashes. First-visit-per-session only (see index.html).
function dismissPreloader() {
  const el = document.getElementById('agx-preloader')
  if (!el) return
  const MIN_DISPLAY = 1100 // ms since navigation start
  const wait = Math.max(0, MIN_DISPLAY - performance.now())
  setTimeout(() => {
    el.classList.add('agx-hide')
    try { sessionStorage.setItem('agentixLoaded', '1') } catch (e) { /* ignore */ }
    el.addEventListener('transitionend', () => el.remove(), { once: true })
    setTimeout(() => el.remove(), 900) // fallback if transitionend doesn't fire
  }, wait)
}
requestAnimationFrame(() => requestAnimationFrame(dismissPreloader))
