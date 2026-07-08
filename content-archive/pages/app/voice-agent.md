# Voice Agent Widget · route: (floating overlay, all pages) · source: frontend/src/voice-agent/*

## Meta
- Feature: Full-screen voice conversation experience ("PreloaderGate" entry gate + floating orb) plus a
  legacy chat-panel widget (VoiceAgentWidget.jsx). Both talk to the same backend voice/text agent APIs.

## Section: PreloaderGate — Boot Sequence (BootText.jsx renders these char-by-char)
- Boot line 1: "> AI AGENTIX · INITIALIZING AUTOMATION ENGINE"
- Boot line 2: "> CONNECTING AI AGENTS ACROSS YOUR WORKFLOWS"
- Boot line 3 (ready/highlighted): "> VOICE ASSISTANT · READY TO AUTOMATE"

## Section: PreloaderGate — Gate/Invitation screen
- Heading: AI AGENTiX
- Subheading: India's #1 AI Automation Partner — Ask us anything
- Status line: AI agents active · automating 15+ industries
- Footer watermark: AI Agentix · Powering India's Automation Revolution · New Delhi
- Accessibility label (root clickable area): Activate voice experience

## Section: VoiceOrb (floating orb button — state labels)
- Idle: Talk to AI
- Speaking: Speaking…
- Listening: Listening…
- Thinking: Thinking…
- Minimized: AI Guide
- Fallback aria-label: Voice Agent

## Section: SubtitleBand (glass caption card)
- aria-label: Voice agent caption
- System line show while mic is starting: Listening…

## Section: Conversational scripted lines (useVoiceLoop.js / agentFlow.js)
- Welcome / greeting (first click): "Hey, I'm the Agentix advisor. What's the biggest time sink your team is dealing with right now?"
- Alternate greeting constant (agentFlow.js, used by widget-style flow): "Hi! I'm Agentix, your AI business advisor. What's the biggest challenge your team is facing right now — leads, operations, or something else?"
- User agreed to book (opens form): "Perfect! Fill in the form — name, email, and a date within the next three days. I'll be right here."
- LLM/network hiccup (guided mode): "I'm having a quick issue — give me just a moment."
- LLM/network hiccup (collecting mode): "I'm having a quick issue."
- No speech detected / idle nudge: "I didn't catch that — I'm right here. Just tap me when you're ready."
- STT error retry prompt: "I didn't catch that — could you say that again?"
- Form idle check-in (15s no input): "Just checking in — let me know if you need help filling that out."
- Form abandoned (30s no input): "Looks like you stepped away. I'm right here when you're ready."
- Date pushed out but still available sooner: "Noted — we also have slots tomorrow and the day after if you'd like to get started sooner."
- Booking confirmed (voice flow, templated): "You're all set, {firstName}! A calendar invite is on its way to {email}. The AGENTiX team will confirm your slot shortly."

## Section: VoiceExperience — STT unsupported notice
- Body: "⚠️ Voice input requires Chrome or Edge. The AI guide will still speak to you."

## Forms
### VoiceLeadForm (floating booking card, id="va-lead-form")
- Title: Book a Demo
- Field: Your name * (placeholder)
- Field: Company (placeholder)
- Field: Email address * (placeholder, type email)
- Field: date picker (no visible label; min = tomorrow, max = +7 days)
- Field: time picker (no visible label)
- Submit button: "Book Demo on Calendar" (loading state: "Booking…")
- Close button aria-label: Close form
- Success state:
  - Success icon: ✅
  - Success title: "You're booked!"
  - Success text: "Calendar invite sent to **{email}**.<br/>The AGENTiX team will confirm shortly."

### VoiceAgentWidget (legacy chat-panel widget)
- FAB button label: "Talk to Agentix"
- FAB badge: AI
- FAB aria-label: Open Agentix Voice Advisor
- Panel aria-label: Agentix Voice Advisor
- Panel header name: Agentix Voice Advisor
- Status labels (statusLabel()):
  - Greeting: "Greeting you…"
  - Listening: "Listening…"
  - Thinking: "Thinking…"
  - Speaking: "Speaking…"
  - Collecting: "Collecting details"
  - Booking: "Booking demo…"
  - Done: "Done ✓"
  - Default: "Ready"
- Greeting message shown/spoken on open: GREETING_MESSAGE — "Hi! I'm Agentix, your AI business advisor. What's the biggest challenge your team is facing right now — leads, operations, or something else?"
- Mic issue toast (spoken/appended as agent message): "Mic issue: {err}. You can type instead."
- Voice/text send error: "I'm having trouble connecting right now. Please try again in a moment." (voice) / "I'm having trouble connecting. Please try again in a moment." (text)
- Navigation suggestion strip: "Jump to relevant section →" — button: "Go there ↗"
- Lead form title: "Book a Demo"
- Lead form fields: Your name * (placeholder) · Company (placeholder) · Email address * (placeholder) ·
  Preferred date (e.g. May 20) (placeholder) · Preferred time (e.g. 2 PM IST) (placeholder)
- Lead form submit: "Book Demo on Calendar" (loading: "Booking…")
- Lead form validation error: "Please enter your name and email to book."
- Booking success confirmation (templated, spoken + shown): "You're all set, {firstName}! I've notified the Agentix team and a calendar invite is on its way to {email}. Looking forward to speaking with you."
- Booking success card: icon ✅, title "You're booked!", text "A calendar invite has been sent to **{email}**.<br />The Agentix team will confirm your slot shortly."
- Booking failure error: "Something went wrong. Please try again or visit agentix.ai/demo directly."
- STT unsupported notice: "⚠️ Voice input needs Chrome or Edge. You can type below."
- Text input placeholder: "Or type your message…" (changes to "Listening…" while mic active)
- Mic button aria-labels: "Stop listening" / "Start voice input"
- Send button aria-label: "Send message"
- Close button aria-label: "Close"

## Section: Booking validation error copy (useVoiceLoop.js submitBooking)
- Missing fields: "Please enter your name and email."
- Date in the past: "Demos must be booked from tomorrow onwards — please pick a future date."
- Date too far out: "Please pick a date within the next 7 days so we can confirm your slot quickly."
- Generic booking failure (server rejected): "Booking failed. Please try again." (used as fallback for both API-reported and network-catch failures)

## Section: STT/TTS hook error copy
- useSTT unsupported: "Speech recognition is not supported. Please use Chrome or Edge."
- useTTS unsupported (not surfaced to UI, error callback only): "TTS not supported"
- useGroqChat network error fallback: "Voice agent unavailable."
- useGroqTextChat network error fallback: "Assistant unavailable."

## Section: Non-user-facing / logic-only files (no UI copy to preserve)
- ParticleField.jsx — pure animation, no text.
- useMagneticCursor.js — pure cursor/animation logic, no text.
- agentFlow.js — otherwise contains only state constants, regex trigger phrases (used to detect intent,
  not shown to users) and category/tool routing tables (internal keys, not copy).
