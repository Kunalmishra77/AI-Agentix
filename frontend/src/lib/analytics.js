// Consent-aware Google Analytics 4 (AGX-003). Nothing loads until the visitor accepts
// analytics cookies; the choice is remembered in this browser and can be changed from the
// footer ("Cookie settings"). Uses Google Consent Mode v2: everything denied by default.
// Events never include personal data.
import { analytics } from '../data/site'

const STORE = 'agx_consent'
export const CONSENT_EVENT = 'agx:consent-open'
export const analyticsEnabled = () => !!(analytics.ga4Id || analytics.googleAdsId)
export const adsEnabled = () => !!(analytics.googleAdsId && analytics.googleAdsLeadLabel)

export function getConsent() {
  try { return JSON.parse(localStorage.getItem(STORE) || 'null') } catch { return null }
}

// One gtag.js for both GA4 and Google Ads. Consent Mode v2: everything denied by default;
// accepting cookies grants analytics + ad measurement (never ad personalisation).
let base = false
function ensureGtag(id) {
  if (base) return
  base = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) } // eslint-disable-line prefer-rest-params
  window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' })
  if (getConsent()?.analytics) grant()
  window.gtag('js', new Date())
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
  document.head.appendChild(s)
}
const grant = () => window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: analytics.googleAdsId ? 'granted' : 'denied', ad_user_data: analytics.googleAdsId ? 'granted' : 'denied' })

let gaLoaded = false
function loadGa() {
  if (gaLoaded || !analytics.ga4Id) return
  gaLoaded = true
  ensureGtag(analytics.ga4Id)
  grant()
  window.gtag('config', analytics.ga4Id, { anonymize_ip: true })
}

// Google Ads tag for the ads landing page. Loads in denied mode (cookieless pings only)
// so a conversion is still counted for visitors who never answer the cookie banner.
let adsLoaded = false
export function loadAds() {
  if (adsLoaded || !adsEnabled()) return
  adsLoaded = true
  ensureGtag(analytics.googleAdsId)
  window.gtag('config', analytics.googleAdsId)
}

/** Fires the Google Ads "lead" conversion once per lead id (refresh / Back never double-counts). */
export function reportAdsConversion(leadId) {
  if (!adsEnabled() || !leadId) return
  const key = `agx_conv_${leadId}`
  try { if (localStorage.getItem(key)) return; localStorage.setItem(key, '1') } catch { /* fire anyway */ }
  loadAds()
  window.gtag('event', 'conversion', { send_to: `${analytics.googleAdsId}/${analytics.googleAdsLeadLabel}`, transaction_id: leadId })
}

export function setConsent(accepted) {
  try { localStorage.setItem(STORE, JSON.stringify({ analytics: accepted, at: new Date().toISOString() })) } catch { /* private mode */ }
  if (accepted) { if (window.gtag) grant(); loadGa() }
  else if (window.gtag) {
    // withdrawing: stop collection now and remove Google cookies for this site
    window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied' })
    document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => n.startsWith('_ga') || n.startsWith('_gcl'))
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
