import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Smooth-scrolls to the `#section` in the URL after navigation (retries until
 * the target has rendered). Sections set scroll-mt to clear the fixed nav.
 */
export default function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return // ScrollReset handles top-of-page and back/forward restore
    const id = hash.slice(1)
    let tries = 0
    const go = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
      if (tries++ < 12) setTimeout(go, 80)
    }
    const t = setTimeout(go, 60)
    return () => clearTimeout(t)
  }, [hash, pathname])

  return null
}
