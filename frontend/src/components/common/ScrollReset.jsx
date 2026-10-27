import { useLayoutEffect, useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// New navigation (link click) → jump to the top. Back/forward → restore where the
// visitor was on that page (AGX-035). A #hash is left to ScrollToHash.
// Positions are kept per history entry in sessionStorage. The very first entry of a
// visit has React Router's shared key 'default', so it is stored per pathname.
const KEY = 'agx_scroll'
const read = () => { try { return JSON.parse(sessionStorage.getItem(KEY) || '{}') } catch { return {} } }
const entryId = (key, pathname) => (key === 'default' ? `default:${pathname}` : key)

// 'instant' overrides the root's `scroll-behavior: smooth`
const jump = (y) => window.scrollTo({ top: y, left: 0, behavior: 'instant' })

export default function ScrollReset() {
  const { pathname, hash, key } = useLocation()
  const navType = useNavigationType()
  const firstRender = useRef(true)
  const id = entryId(key, pathname)

  // remember this entry's scroll position as the visitor scrolls
  useEffect(() => {
    let t
    const save = () => {
      clearTimeout(t)
      t = setTimeout(() => {
        try {
          const all = read()
          all[id] = window.scrollY
          const keys = Object.keys(all)
          if (keys.length > 50) delete all[keys[0]]
          sessionStorage.setItem(KEY, JSON.stringify(all))
        } catch { /* storage blocked */ }
      }, 120)
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', save) }
  }, [id])

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    const isFirst = firstRender.current
    firstRender.current = false
    // a fresh page load is also a 'POP' — never restore on the first render
    if (navType === 'POP' && !isFirst) {
      const y = read()[id]
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
  }, [pathname, hash, key, navType]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
