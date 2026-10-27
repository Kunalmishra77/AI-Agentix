import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { captureUtm } from './lib/leads'
import './index.css'

captureUtm()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* honour the OS "reduce motion" setting in every framer-motion animation (AGX-032) */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// The preloader only covers the time the bundle takes to download; remove it as
// soon as the app has painted — no artificial minimum, no waiting on fonts (AGX-026).
requestAnimationFrame(() => {
  const el = document.getElementById('agx-preloader')
  if (!el) return
  el.classList.add('agx-hide')
  setTimeout(() => el.remove(), 300)
})
