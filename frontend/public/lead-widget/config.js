// Settings for the floating lead form (lead-widget.js). Loaded before it; kept out of
// index.html so the Content-Security-Policy can forbid inline scripts.
window.LeadWidgetConfig = {
  endpoint: '/api/leads',
  thankYouUrl: '/thank-you?type=popup',
  openThankYouInNewTab: false,
  brandColor: '#CC4A12',
  position: 'right',
  bottomOffset: 20,
  sideOffset: 20,
  zIndex: 60,
  eyebrow: 'Free consultation',
  title: 'Talk to an AI expert',
  text: 'Share your details and our team will call or WhatsApp you within 4 business hours.',
  submitText: 'Request a Call Back',
  iconLabel: 'Book a free consultation',
  namePlaceholder: 'Full Name',
  phonePlaceholder: 'Mobile number',
  emailPlaceholder: 'Email (optional)',
  messagePlaceholder: 'What would you like to automate? (optional)',
  phonePattern: '^(?:[6-9][0-9]{9}|[0-9]{11,15})$',
  phoneMaxLength: 15,
  phoneError: 'Please enter a 10-digit mobile number, or your full number with country code.',
  consentHtml: 'I agree that AI Agentix may contact me about this enquiry by call, WhatsApp, SMS or email — once or more than once, even if my number is on DND. I can withdraw anytime. <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>',
  consentError: 'Please tick the box to agree, so we can contact you about your enquiry.',
  autoShowPages: ['/'],
  gtagEvent: 'generate_lead',
  dataLayerEvent: 'generate_lead'
};
