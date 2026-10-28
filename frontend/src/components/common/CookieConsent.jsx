import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { analyticsEnabled, getConsent, setConsent, CONSENT_EVENT } from '../../lib/analytics'

/**
 * Analytics cookie choice (DPDP Act: consent before non-essential tracking).
 * Shown only when a GA4 ID is configured and the visitor hasn't chosen yet, or when
 * they reopen it from the footer. "Reject" is as easy as "Accept".
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(() => analyticsEnabled() && getConsent() == null)

  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_EVENT, reopen)
  }, [])

  if (!analyticsEnabled() || !open) return null
  const choose = (v) => { setConsent(v); setOpen(false) }

  return (
    <div role="region" aria-label="Cookie choice" className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-xl rounded-2xl border border-line bg-white p-4 shadow-float sm:bottom-5 sm:p-5">
      <p className="text-sm leading-relaxed text-body">
        We'd like to use Google Analytics cookies to understand how visitors use this site, so we can improve it.
        They're off unless you agree. See our{' '}
        <Link to="/privacy" className="font-semibold text-accent-strong underline underline-offset-2">Privacy Policy</Link>.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose(true)} className="btn-primary px-4 py-2">Accept analytics</button>
        <button type="button" onClick={() => choose(false)} className="btn-outline px-4 py-2">Reject</button>
      </div>
    </div>
  )
}
