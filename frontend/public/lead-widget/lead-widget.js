/*!
 * Lead Widget: floating appointment form for Google Ads landing traffic.
 *
 * Behaviour (same as drshwetadiwan.com):
 *  - On the chosen pages the form pops open by itself, stays a few seconds, then minimises to an icon.
 *  - Clicking the icon (or any element with data-lead-open) opens the form again.
 *  - Submit sends in the background to send-lead.php, then opens the thank-you page in a NEW TAB.
 *  - Validation and server errors show inside the form; no captcha (spam is blocked by a honeypot
 *    and a minimum fill time instead).
 *  - Page forms marked <form data-lead-form> get the same submit behaviour.
 *
 * Set window.LeadWidgetConfig before this script loads (see README.md). Every key is optional.
 *
 * AI Agentix changes to the skill's kit: an unticked consent checkbox (DPDP Act 2023)
 * that must be ticked before submit (consentHtml / consentError). Everything else
 * is unchanged.
 */
(function () {
  'use strict';

  var defaults = {
    endpoint: '/lead-widget/send-lead.php',  // send-lead.php URL
    thankYouUrl: '/thank-you',               // page opened after a successful submit (?n=FirstName is added)
    openThankYouInNewTab: true,

    brandColor: '#ff9152',                   // client's main button colour
    brandTextColor: '#ffffff',               // text on that colour
    position: 'right',                       // 'right' (default) or 'left'
    bottomOffset: 25,                        // px from the bottom; raise it if a WhatsApp/scroll-top button sits there
    sideOffset: 25,                          // px from the left/right edge
    zIndex: 9990,

    eyebrow: 'Connect with us',
    title: 'Book An Appointment',
    text: 'We’d love to guide you on your wellness journey. Share your details and our expert will get in touch soon!',
    submitText: 'Submit Now',
    iconLabel: 'Book An Appointment',
    namePlaceholder: 'Full Name',
    phonePlaceholder: 'Phone',
    emailPlaceholder: 'Email (optional)',
    messagePlaceholder: 'Message (optional)',

    showEmail: true,
    showMessage: true,

    autoShow: true,
    autoShowPages: ['/', '/index.php', '/index.html'], // [] = every page
    autoShowDelay: 1200,                     // ms after page load before the form opens
    autoShowStay: 3000,                      // ms it stays open before minimising (unless the visitor is using it)

    phonePattern: '^[6-9][0-9]{9}$',         // India 10-digit mobile; change for other countries
    phoneMaxLength: 10,
    phoneError: 'Please enter a valid 10-digit mobile number.',

    consentHtml: '',                         // when set, an unticked checkbox with this label is required before submit
    consentError: 'Please tick the consent box to continue.',

    gtagEvent: 'generate_lead',              // sent with gtag() if present
    dataLayerEvent: 'lead_form_submit'       // pushed to dataLayer for Google Tag Manager
  };

  var cfg = {};
  var user = window.LeadWidgetConfig || {};
  for (var k in defaults) cfg[k] = Object.prototype.hasOwnProperty.call(user, k) ? user[k] : defaults[k];

  var ICON_CALENDAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9Zm-4.3 2.3a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 1 1 1.4-1.4l1.3 1.3 3.3-3.3a1 1 0 0 1 1.4 0Z"/></svg>';
  var ICON_CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h17M14 6l6 6-6 6"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  function softColor(hex) {
    var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(String(hex).trim());
    return m ? 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',0.15)' : 'rgba(0,0,0,0.08)';
  }

  // ---------------------------------------------------------------- shared submit logic

  function openWaitingTab() {
    var tab = window.open('', '_blank');
    if (!tab) return null; // popup blocked: we fall back to this tab
    try {
      tab.document.write('<!doctype html><title>Sending...</title><meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<body style="margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;font-family:Arial,sans-serif;color:#333">' +
        '<div style="width:44px;height:44px;border:4px solid ' + softColor(cfg.brandColor) + ';border-top-color:' + esc(cfg.brandColor) + ';border-radius:50%;animation:s .8s linear infinite"></div>' +
        '<p style="margin:0">Sending your request...</p><style>@keyframes s{to{transform:rotate(360deg)}}</style></body>');
      tab.document.close();
    } catch (err) {}
    return tab;
  }

  function wireForm(form, opts) {
    var errorBox = opts.errorBox;
    var submitBtn = form.querySelector('button[type=submit], input[type=submit]');
    var btnLabel = submitBtn ? submitBtn.innerHTML : '';
    var shownAt = Date.now();
    var phoneRe = new RegExp(cfg.phonePattern);
    function f(name) { return form.elements[name]; }

    if (!f('website')) form.insertAdjacentHTML('beforeend', '<input type="text" name="website" class="lw-hp" tabindex="-1" autocomplete="off" aria-hidden="true">');

    function showError(msg) { errorBox.textContent = msg; errorBox.hidden = false; }
    function clearError() { errorBox.textContent = ''; if (opts.hideErrorBox) errorBox.hidden = true; }

    function validate() {
      var name = f('name') ? f('name').value.trim() : '';
      var phone = f('phone') ? f('phone').value.trim() : '';
      var email = f('email') ? f('email').value.trim() : '';
      var message = f('message') ? f('message').value.trim() : '';
      if (!/^[a-zA-Z\s.]{3,}$/.test(name)) return 'Please enter your full name (letters only, at least 3 characters).';
      if (!phoneRe.test(phone)) return cfg.phoneError;
      if (f('email') && f('email').required && !email) return 'Please enter your email address.';
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
      if (f('message') && f('message').required && !message) return 'Please enter your message.';
      if (message && message.split(/\s+/).length > 50) return 'Message must not exceed 50 words.';
      if (/(https?:\/\/|www\.)\S+/i.test(message)) return 'Message must not contain any links.';
      if (f('consent') && !f('consent').checked) return cfg.consentError;
      return '';
    }

    if (f('phone')) {
      f('phone').addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, cfg.phoneMaxLength); });
    }
    form.addEventListener('input', clearError);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation(); // keep theme form scripts off this form
      var problem = validate();
      if (problem) { showError(problem); return; }

      var tab = cfg.openThankYouInNewTab ? openWaitingTab() : null;
      clearError();
      if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = 'Sending...'; }

      var data = new FormData(form);
      data.append('ajax', '1');
      data.append('form_elapsed', String(Math.round((Date.now() - shownAt) / 1000)));
      data.append('page_url', location.href);
      if (!data.get('form_source')) data.append('form_source', opts.source);

      fetch(cfg.endpoint, { method: 'POST', body: data, headers: { 'X-Requested-With': 'XMLHttpRequest' } })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (!(json && json.ok)) throw new Error((json && json.message) || 'Something went wrong. Please try again.');

          var source = data.get('form_source');
          if (typeof window.gtag === 'function' && cfg.gtagEvent) window.gtag('event', cfg.gtagEvent, { form_name: source });
          if (cfg.dataLayerEvent) { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: cfg.dataLayerEvent, form_name: source }); }

          var first = f('name') ? f('name').value.trim().split(/\s+/)[0] : '';
          var url = cfg.thankYouUrl + (cfg.thankYouUrl.indexOf('?') === -1 ? '?' : '&') + 'n=' + encodeURIComponent(first);
          form.reset();
          shownAt = Date.now();
          if (opts.onSuccess) opts.onSuccess();
          if (tab && !tab.closed) { tab.location.replace(url); tab.focus(); }
          else window.location.href = url;
        })
        .catch(function (err) {
          if (tab && !tab.closed) tab.close();
          showError(err && err.message && !/fetch|network|JSON|Unexpected token/i.test(err.message) ? err.message
            : 'Could not send your request. Please check your connection and try again, or call us directly.');
        })
        .then(function () { if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = btnLabel; } });
    }, true);
  }

  // ---------------------------------------------------------------- floating widget

  function buildWidget() {
    var w = document.createElement('div');
    w.className = 'lw-widget' + (cfg.position === 'right' ? ' lw-right' : '');
    w.id = 'lwWidget';
    w.style.setProperty('--lw-brand', cfg.brandColor);
    w.style.setProperty('--lw-brand-text', cfg.brandTextColor);
    w.style.setProperty('--lw-brand-soft', softColor(cfg.brandColor));
    w.style.zIndex = cfg.zIndex;
    w.style.setProperty('--lw-bottom', cfg.bottomOffset + 'px');
    w.style.setProperty('--lw-side', cfg.sideOffset + 'px');
    w.innerHTML =
      '<div class="lw-panel" id="lwPanel" role="dialog" aria-labelledby="lwTitle" aria-hidden="true">' +
        '<button type="button" class="lw-close" aria-label="Minimise form">' + ICON_CLOSE + '</button>' +
        '<span class="lw-eyebrow">' + esc(cfg.eyebrow) + '</span>' +
        '<h3 class="lw-title" id="lwTitle">' + esc(cfg.title) + '</h3>' +
        '<p class="lw-text">' + esc(cfg.text) + '</p>' +
        '<form class="lw-form" action="' + esc(cfg.endpoint) + '" method="POST" novalidate>' +
          '<input type="hidden" name="form_source" value="popup">' +
          '<div class="lw-row">' +
            '<input type="text" name="name" class="lw-input" placeholder="' + esc(cfg.namePlaceholder) + '" autocomplete="name" required>' +
            '<input type="tel" name="phone" class="lw-input" maxlength="' + cfg.phoneMaxLength + '" inputmode="numeric" placeholder="' + esc(cfg.phonePlaceholder) + '" autocomplete="tel-national" required>' +
          '</div>' +
          (cfg.showEmail ? '<input type="email" name="email" class="lw-input" placeholder="' + esc(cfg.emailPlaceholder) + '" autocomplete="email">' : '') +
          (cfg.showMessage ? '<textarea name="message" class="lw-input" rows="2" placeholder="' + esc(cfg.messagePlaceholder) + '"></textarea>' : '') +
          (cfg.consentHtml ? '<label class="lw-consent"><input type="checkbox" name="consent" value="yes"><span>' + cfg.consentHtml + '</span></label>' : '') +
          '<p class="lw-error" role="alert" hidden></p>' +
          '<button type="submit" class="lw-submit">' + esc(cfg.submitText) + ICON_ARROW + '</button>' +
        '</form>' +
      '</div>' +
      '<button type="button" class="lw-toggle" aria-controls="lwPanel" aria-expanded="false" aria-label="' + esc(cfg.iconLabel) + '" title="' + esc(cfg.iconLabel) + '">' + ICON_CALENDAR + '</button>';
    document.body.appendChild(w);

    var panel = w.querySelector('.lw-panel');
    var toggle = w.querySelector('.lw-toggle');
    var autoTimer = null;
    var engaged = false; // visitor is hovering or typing: never auto-minimise under them

    function open() {
      clearTimeout(autoTimer);
      w.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function minimise() {
      clearTimeout(autoTimer);
      w.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function autoShow(showAfterMs, stayOpenMs) {
      setTimeout(function () {
        if (w.classList.contains('is-open')) return;
        open();
        autoTimer = setTimeout(function () { if (!engaged) minimise(); }, stayOpenMs);
      }, showAfterMs);
    }

    toggle.addEventListener('click', function () { w.classList.contains('is-open') ? minimise() : open(); });
    w.querySelector('.lw-close').addEventListener('click', minimise);
    ['mouseenter', 'pointerdown', 'focusin', 'input', 'keydown'].forEach(function (evt) {
      panel.addEventListener(evt, function () { engaged = true; clearTimeout(autoTimer); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && w.classList.contains('is-open')) minimise(); });
    document.addEventListener('click', function (e) {
      var opener = e.target.closest && e.target.closest('[data-lead-open]');
      if (opener) { e.preventDefault(); open(); }
    });

    wireForm(w.querySelector('.lw-form'), { errorBox: w.querySelector('.lw-error'), hideErrorBox: true, source: 'popup', onSuccess: minimise });

    var path = location.pathname.replace(/\/+$/, '') || '/';
    var pages = cfg.autoShowPages || [];
    var onAutoPage = !pages.length || pages.some(function (p) { return (p.replace(/\/+$/, '') || '/') === path; });
    if (cfg.autoShow && onAutoPage) autoShow(cfg.autoShowDelay, cfg.autoShowStay);

    window.LeadWidget = { open: open, minimise: minimise, autoShow: autoShow };
  }

  // ---------------------------------------------------------------- page forms

  function wirePageForms() {
    var forms = document.querySelectorAll('form[data-lead-form]');
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      form.setAttribute('novalidate', '');
      var box = form.querySelector('.lw-page-error');
      if (!box) { box = document.createElement('p'); box.className = 'lw-page-error'; box.setAttribute('role', 'alert'); form.appendChild(box); }
      wireForm(form, { errorBox: box, hideErrorBox: false, source: form.getAttribute('data-lead-form') || 'page_form' });
    }
  }

  function init() { buildWidget(); wirePageForms(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
