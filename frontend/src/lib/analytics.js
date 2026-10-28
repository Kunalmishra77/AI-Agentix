// Consent-aware Google Analytics 4 (AGX-003). Nothing loads until the visitor accepts
// analytics cookies; the choice is remembered in this browser and can be changed from the
// footer ("Cookie settings"). Uses Google Consent Mode v2: everything denied by default.
// Events never include personal data.
import { analytics } from '../data/site'

const STORE = 'agx_consent'
export const CONSENT_EVENT = 'agx:consent-open'
export const analyticsEnabled = () => !!analytics.ga4Id

export function getConsent() {
  try { return JSON.parse(localStorage.getItem(STORE) || 'null') } catch { return null }
}

let loaded = false
function loadGa() {
  if (loaded || !analytics.ga4Id) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) } // eslint-disable-line prefer-rest-params
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' })
  window.gtag('js', new Date())
  window.gtag('config', analytics.ga4Id, { anonymize_ip: true })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analytics.ga4Id)}`
  document.head.appendChild(s)
}

export function setConsent(accepted) {
  try { localStorage.setItem(STORE, JSON.stringify({ analytics: accepted, at: new Date().toISOString() })) } catch { /* private mode */ }
  if (accepted) loadGa()
  else if (window.gtag) {
    // withdrawing: stop collection now and remove GA cookies for this site
    window.gtag('consent', 'update', { analytics_storage: 'denied' })
    document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n.startsWith('_ga'))
      .forEach((n) => { document.cookie = `${n}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, '')}`; document.cookie = `${n}=; Max-Age=0; path=/` })
  }
}

export function track(name, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
}

// Called once at start-up: load GA if already accepted, and record clicks on contact links.
export function initAnalytics() {
  if (!analyticsEnabled()) return
  if (getConsent()?.analytics) loadGa()
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href]')
    if (!a) return
    const href = a.getAttribute('href')
    if (href.includes('wa.me/')) track('whatsapp_click', { link_location: a.getAttribute('aria-label') ? 'floating_button' : 'page' })
    else if (href.startsWith('tel:')) track('phone_click')
    else if (href.startsWith('mailto:')) track('email_click')
  }, { capture: true })
}
