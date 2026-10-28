import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Linkedin, Instagram, Facebook, Twitter, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import {
  SiOpenai, SiAnthropic, SiClaude, SiGooglegemini, SiMeta, SiPerplexity, SiHuggingface,
  SiMistralai, SiNvidia, SiLangchain, SiN8N, SiZapier, SiMake, SiSlack, SiHubspot,
  SiWhatsapp, SiTwilio, SiRazorpay, SiGooglecloud,
} from 'react-icons/si'
import { footer } from '../../data/site'
import { consent as consentText } from '../../data/consent'
import { submitLead, trackLead, isEmail } from '../../lib/leads'
import ConsentCheckbox from '../common/ConsentCheckbox'
import { analyticsEnabled, CONSENT_EVENT } from '../../lib/analytics'
import Logo from './Logo'

const SOCIAL_ICONS = { LinkedIn: Linkedin, Instagram, Facebook, Twitter, WhatsApp: MessageCircle }

// Footer "Powered by" marquee — logo + name, shown in monochrome (B&W).
const FOOTER_PLATFORMS = [
  { name: 'OpenAI', Icon: SiOpenai }, { name: 'Anthropic', Icon: SiAnthropic }, { name: 'Claude', Icon: SiClaude },
  { name: 'Google Gemini', Icon: SiGooglegemini }, { name: 'Meta AI', Icon: SiMeta }, { name: 'Perplexity', Icon: SiPerplexity },
  { name: 'Hugging Face', Icon: SiHuggingface }, { name: 'Mistral AI', Icon: SiMistralai }, { name: 'NVIDIA', Icon: SiNvidia },
  { name: 'LangChain', Icon: SiLangchain }, { name: 'n8n', Icon: SiN8N }, { name: 'Zapier', Icon: SiZapier },
  { name: 'Make', Icon: SiMake }, { name: 'Slack', Icon: SiSlack }, { name: 'HubSpot', Icon: SiHubspot },
  { name: 'WhatsApp', Icon: SiWhatsapp }, { name: 'Twilio', Icon: SiTwilio }, { name: 'Razorpay', Icon: SiRazorpay },
  { name: 'Google Cloud', Icon: SiGooglecloud },
]

export default function SiteFooter() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const startedAt = useRef(Date.now())
  const inFlight = useRef(false)

  // AGX-002: only claim a subscription after the server stored it; then the thank-you page.
  const subscribe = async (e) => {
    e.preventDefault()
    if (inFlight.current) return
    const value = email.trim()
    if (!isEmail(value)) { setError('Please enter a valid email address.'); return }
    if (!agree) { setError('Please tick the box to agree to receive updates.'); return }
    inFlight.current = true
    setBusy(true)
    setError('')
    try {
      await submitLead('newsletter', { email: value }, { consent: true, marketing: true, startedAt: startedAt.current })
      trackLead('newsletter')
      navigate('/thank-you?type=newsletter', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      inFlight.current = false
      setBusy(false)
    }
  }
  // Two identical halves, each repeated wide enough for a seamless -50% loop on ultra-wide.
  const half = [...FOOTER_PLATFORMS, ...FOOTER_PLATFORMS]
  const marqueeRow = [...half, ...half]

  return (
    <footer className="border-t border-line bg-surface-alt text-body">
      {/* partner marquee — logo + name, brand white & orange (orange mark, dark name) */}
      <div className="border-b border-line py-10">
        <p className="container-x mb-6 text-center text-eyebrow uppercase text-body-soft">{footer.partnersCaption}</p>
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center gap-10 pr-10 will-change-transform animate-marquee-slow group-hover:[animation-play-state:paused]">
            {marqueeRow.map(({ name, Icon }, i) => (
              <span key={`${name}-${i}`} className="flex shrink-0 items-center gap-2.5">
                <Icon className="h-5 w-5 text-accent" aria-hidden />
                <span className="whitespace-nowrap text-base font-semibold text-heading/80">{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* main */}
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
        {/* brand */}
        <div className="min-w-0">
          <Logo dark={false} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-body">{footer.brandBlurb}</p>
          <div className="mt-6 flex gap-3">
            {footer.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] || MessageCircle
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-body transition-colors hover:border-accent hover:bg-accent hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* link cols */}
        {footer.cols.map((col) => (
          <div key={col.title} className="min-w-0">
            <h4 className="text-sm font-bold text-heading">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-body transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* newsletter + contact */}
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-heading">{footer.newsletter.title}</h4>
          <p className="mt-4 text-sm text-body">{footer.newsletter.blurb}</p>
          <form className="mt-4" onSubmit={subscribe} noValidate aria-busy={busy}>
            <div className="flex gap-2">
              <label className="sr-only" htmlFor="footer-email">Email address</label>
              <input
                id="footer-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder={footer.newsletter.placeholder}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'footer-email-error' : undefined}
                className="min-w-0 flex-1 rounded-lg border border-line bg-white px-3 py-2.5 text-base text-heading placeholder:text-body-soft focus:border-accent focus:outline-none sm:text-sm"
              />
              <button type="submit" disabled={busy} className="btn-primary shrink-0 px-4 py-2.5 disabled:opacity-80">
                {busy ? footer.newsletter.submitting : footer.newsletter.submit}
              </button>
            </div>
            <div className="mt-3">
              <ConsentCheckbox id="footer-consent" checked={agree} onChange={(v) => { setAgree(v); setError('') }} label={consentText.newsletter} small />
            </div>
            <p id="footer-email-error" role="alert" className="mt-2 text-xs font-medium text-danger empty:hidden">{error}</p>
          </form>

          <h4 className="mt-8 text-sm font-bold text-heading">{footer.contact.title}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-body">
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-accent" /><a href={`mailto:${footer.contact.email}`} className="hover:text-accent">{footer.contact.email}</a></li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-accent" /><a href={footer.contact.phoneHref} className="hover:text-accent">{footer.contact.phone}</a></li>
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden /><span>{footer.contact.address}</span></li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 pt-6 pb-24 text-xs md:pb-6 text-body-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p>© {new Date().getFullYear()} {footer.copyright}</p>
            <p className="mt-1 text-body-soft/70">{footer.entity}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((l) => (
              <Link key={l.label} to={l.to} className="transition-colors hover:text-accent">{l.label}</Link>
            ))}
            {analyticsEnabled() && (
              <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))} className="transition-colors hover:text-accent">
                Cookie settings
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
