import { useLayoutEffect, useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// New navigation (link click) → jump to the top. Back/forward → restore where the
// visitor was on that page (AGX-035). A #hash is left to ScrollToHash.
// Positions are kept per history entry in sessionStorage.
const KEY = 'agx_scroll'
const read = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || '{}') } catch { return {} } }

function jump(y) {
  // The root has `scroll-behavior: smooth`; force an instant jump.
  const html = document.documentElement
  const prev = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo(0, y)
  html.style.scrollBehavior = prev
}

export default function ScrollReset() {
  const { pathname, hash, key } = useLocation()
  const navType = useNavigationType()

  // remember this entry's scroll position as the visitor scrolls
  useEffect(() => {
    let t
    const save = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        try {
          const all = read()
          all[key] = window.scrollY
          const keys = Object.keys(all)
          if (keys.length > 50) delete all[keys[0]]
          sessionStorage.setItem(KEY, JSON.stringify(all))
        } catch { /* storage blocked */ }
      }, 120)
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', save) }
  }, [key])

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (navType === 'POP') {
      const y = read()[key]
      if (y == null) { if (!hash) jump(0); return }
      // lazy pages render a moment later; retry until the page is tall enough
      let tries = 0
      const restore = () => {
        if (document.documentElement.scrollHeight - window.innerHeight >= y || tries++ > 25) { jump(y); return }
        setTimeout(restore, 60)
      }
      restore()
      return
    }
    if (!hash) jump(0)
  }, [pathname, hash, key, navType])

  return null
}
