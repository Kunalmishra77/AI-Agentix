// Sends a lead to our own backend (POST /api/leads). The server stores it, then
// emails the team and appends it to the leads Google Sheet.
// Resolves { ok: true, id } only when the server confirms it was saved.

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']
const UTM_STORE = 'agx_utm'

// Remember campaign parameters from the landing URL for the rest of the visit.
export function captureUtm() {
  try {
    const params = new URLSearchParams(window.location.search)
    const found = {}
    for (const k of UTM_KEYS) if (params.get(k)) found[k] = params.get(k).slice(0, 120)
    if (Object.keys(found).length) sessionStorage.setItem(UTM_STORE, JSON.stringify(found))
  } catch { /* storage blocked: attribution is optional */ }
}

function readUtm() {
  try { return JSON.parse(sessionStorage.getItem(UTM_STORE) || '{}') } catch { return {} }
}

export class LeadError extends Error {
  constructor(message, { fieldErrors = null, status = 0 } = {}) {
    super(message)
    this.fieldErrors = fieldErrors
    this.status = status
  }
}

/**
 * @param {'audit'|'demo'|'partner'|'newsletter'} type
 * @param {object} fields  form values
 * @param {{ consent: boolean, marketing?: boolean, startedAt: number, hp?: string }} meta
 */
export async function submitLead(type, fields, { consent, marketing = false, startedAt, hp = '' }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15_000)
  let res
  try {
    res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        fields,
        consent: consent === true,
        marketingConsent: marketing === true,
        hp,
        elapsed: Math.round((Date.now() - startedAt) / 1000),
        pageUrl: window.location.href,
        utm: readUtm(),
      }),
      signal: controller.signal,
    })
  } catch (err) {
    throw new LeadError(
      err.name === 'AbortError'
        ? 'The request timed out. Please check your connection and try again.'
        : 'We could not reach our server. Please check your connection and try again.',
    )
  } finally {
    clearTimeout(timer)
  }

  let json = null
  try { json = await res.json() } catch { /* non-JSON error page from the proxy */ }
  if (res.ok && json?.ok) return json
  throw new LeadError(
    json?.message || (res.status === 429 ? 'Too many attempts. Please wait a minute and try again.' : 'Something went wrong on our side. Please try again.'),
    { fieldErrors: json?.errors || null, status: res.status },
  )
}

// Analytics hook: fires only after the server confirmed the lead. No personal data.
export function trackLead(formType) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_type: formType })
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'generate_lead', form_type: formType })
  } catch { /* analytics must never break the form */ }
}

// Client-side phone rule — the same one the server enforces.
export const isPhone = (v) => /^\+?[0-9]{7,15}$/.test(String(v).replace(/[\s\-().]/g, ''))
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
