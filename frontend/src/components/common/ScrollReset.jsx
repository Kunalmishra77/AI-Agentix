import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Resets scroll to the top on every route change (SPA navigations don't do this
// by default, so a new page would otherwise inherit the previous scroll position).
// useLayoutEffect runs before paint, so there's no flash of the previous scroll.
// Skips when a #hash is present — ScrollToHash handles anchor targets.
export default function ScrollReset() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (hash) return
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    // The root has `scroll-behavior: smooth`, which would animate this jump (the page
    // appears to scroll up from the bottom). Force an instant jump, then restore.
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    html.style.scrollBehavior = prev
  }, [pathname, hash])
  return null
}
