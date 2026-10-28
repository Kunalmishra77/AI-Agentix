import { useEffect } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Dialog focus management: moves focus into `ref` when `active`, keeps Tab inside it,
 * closes on Escape, and returns focus to whatever opened it when it closes.
 * `initialRef` (optional) receives the first focus, e.g. the close button.
 */
export default function useFocusTrap(ref, active, onClose, initialRef) {
  useEffect(() => {
    if (!active || !ref.current) return
    const opener = document.activeElement
    const node = ref.current
    const items = () => [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement)
    const t = setTimeout(() => (initialRef?.current || items()[0] || node).focus({ preventScroll: true }), 30)

    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); onClose?.(); return }
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey, true)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey, true)
      if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus({ preventScroll: true })
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps
}
