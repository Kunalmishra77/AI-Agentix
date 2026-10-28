// Consent wording shown next to every lead form (Digital Personal Data Protection
// Act, 2023 + DPDP Rules, 2025: free, specific, informed, unambiguous consent given
// by a clear affirmative action; separate purposes are not bundled; withdrawal is easy).
// The server stores CONSENT_VERSION with each lead — bump it when this text changes,
// and keep server/src/leads.mjs CONSENT_VERSION in sync.

export const CONSENT_VERSION = '2026-10-27'

export const consent = {
  // Required for enquiry forms: purpose = responding to this enquiry.
  enquiry:
    'I agree that AI Agentix (Santure AI Private Limited) may use the details I have shared to respond to this enquiry and contact me about it by phone call, WhatsApp, SMS or email — once or more than once — even if my number is registered on the DND/NCPR list.',
  // Optional and separate: purpose = marketing.
  marketing: 'Also send me occasional updates and offers about AI automation. (Optional)',
  // Newsletter: the purpose itself is marketing email.
  newsletter: 'I agree to receive AI automation updates by email from AI Agentix. I can unsubscribe any time.',
  withdraw: 'You can withdraw consent any time by emailing myai@ai-agentix.com or replying STOP on WhatsApp.',
  required: 'Please tick the box to agree, so we can contact you about your enquiry.',
}
