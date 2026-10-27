// WAI-ARIA tabs keyboard support: ←/→ (and ↑/↓), Home and End move between tabs
// and select them; focus follows the selection.
export function tabKeyHandler(count, active, setActive, idPrefix) {
  return (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next = null
    if (e.key in keys) next = (active + keys[e.key] + count) % count
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = count - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    document.getElementById(`${idPrefix}-tab-${next}`)?.focus()
  }
}
