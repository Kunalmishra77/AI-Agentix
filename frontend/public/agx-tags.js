/*
 * Google Tag Manager for ai-agentix.com: two containers, both shared by the marketing team.
 * Loaded synchronously as the FIRST script in <head> on every page (index.html and every
 * prerendered route copy it). It lives in its own file, not inline, so the
 * Content-Security-Policy can keep forbidding inline scripts.
 *
 * Order matters (DPDP Act and Google Consent Mode v2):
 *   1. consent defaults: everything denied, unless this visitor has already accepted
 *      cookies (choice saved by the cookie banner in localStorage 'agx_consent')
 *   2. one 'gtm.js' start event (one only, so the "All Pages" trigger fires once per container)
 *   3. both containers, sharing the same dataLayer
 * Google tags inside GTM follow these consent signals by themselves. Any non-Google tag added
 * in GTM (Meta pixel, LinkedIn, Hotjar, ...) must be given a consent check in GTM before publishing.
 *
 * Events the site pushes for GTM triggers:
 *   generate_lead {form_type}      a site form was accepted by the server (contact, audit, demo, lp, newsletter)
 *   lead_form_submit {form_name}   the floating "Book an appointment" widget was submitted
 *   agx_page_view {page_path, page_title}   in-app navigation (the site is a single-page app)
 */
(function (w, d) {
  var CONTAINERS = ['GTM-WD65DKC2', 'GTM-52VWQFQV'];
  w.agxTags = { gtm: CONTAINERS };
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== 'function') w.gtag = function () { w.dataLayer.push(arguments); };

  var saved = null;
  try { saved = JSON.parse(localStorage.getItem('agx_consent') || 'null'); } catch (e) { /* private mode */ }
  var analytics = !!(saved && saved.analytics);
  var ads = !!(saved && saved.analytics && saved.ads);
  w.gtag('consent', 'default', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: ads ? 'granted' : 'denied',
    ad_user_data: ads ? 'granted' : 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
  w.agxConsentDefaultSet = true;

  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  for (var i = 0; i < CONTAINERS.length; i++) {
    var s = d.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + CONTAINERS[i];
    d.head.appendChild(s);
  }
})(window, document);
