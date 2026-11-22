import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle, PhoneCall, ClipboardList, Sparkles } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import Seo from '../components/common/Seo'
import { contactInfo, whatsappLink } from '../data/site'
import { reportAdsConversion } from '../lib/analytics'

// Reached only after the server confirmed the booking (BookingCard navigates here with
// replace, so Back/refresh never resubmits). The Google Ads conversion fires once per lead id.
const NEXT = [
  { icon: MessageCircle, t: 'Confirmation on WhatsApp', d: 'We confirm your slot by WhatsApp or call within 4 business hours.' },
  { icon: ClipboardList, t: 'A few quick questions', d: 'So the call is about your business, not a generic pitch.' },
  { icon: PhoneCall, t: 'Your free 30-minute call', d: 'We show what to automate first and what it would save you.' },
]

const clean = (v, max, re) => { const s = (v || '').slice(0, max); return re.test(s) ? s : '' }

export default function LandingThankYouPage() {
  const [params] = useSearchParams()
  const name = clean(params.get('n'), 30, /^[\p{L}\p{M}.'-]+$/u)
  const day = clean(params.get('d'), 40, /^[\p{L}\d ,-]+$/u)
  const slot = clean(params.get('s'), 10, /^\d{1,2}:\d{2} (AM|PM)$/)
  const [booked] = useState(() => { try { return JSON.parse(sessionStorage.getItem('agx_lp_lead') || 'null') } catch { return null } })

  useEffect(() => {
    document.body.classList.add('agx-lp')
    if (booked?.id) reportAdsConversion(booked.id)
    return () => document.body.classList.remove('agx-lp')
  }, [booked])

  const waText = `Hi AI Agentix, I just booked a free AI call${day && slot ? ` for ${day}, ${slot}` : ''}.`

  return (
    <>
      <Seo title="Your call is booked — AI Agentix" description="Thank you for booking a free AI automation call." noindex />
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-[68px] items-center">
          <Link to="/" aria-label="AI Agentix home"><img src="/agentix-logo-dark.png" alt="AGENTiX" className="h-10 w-auto md:h-11" /></Link>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden bg-[#FBFAF8] py-16 md:py-24">
          <div className="lp-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_20%,#000_30%,transparent_80%)]" aria-hidden />
          <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[680px] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" aria-hidden />
          <div className="container-x relative">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
              <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-cta text-white shadow-orange">
                <CalendarCheck className="h-10 w-10" strokeWidth={1.8} aria-hidden />
              </motion.span>
              <p className="mt-7 text-sm font-semibold uppercase tracking-[0.16em] text-accent-strong">Thank you{name ? `, ${name}` : ''}</p>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-heading">Your free AI call is booked.</h1>
              {day && slot && (
                <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-[15px] font-semibold text-heading shadow-card">
                  <Sparkles className="h-4 w-4 text-accent-strong" aria-hidden /> {day} · {slot} IST
                </p>
              )}
              <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-body">
                We’ll confirm your slot on WhatsApp or by phone. Need a different time? Just message us.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn rounded-full bg-[#25D366] px-6 py-3.5 text-[15px] text-white hover:brightness-95">
                  <SiWhatsapp className="h-5 w-5" aria-hidden /> Message us on WhatsApp
                </a>
                <a href={contactInfo.phoneHref} className="btn rounded-full border border-line bg-white px-6 py-3.5 text-[15px] text-heading hover:border-heading">
                  <PhoneCall className="h-4 w-4" aria-hidden /> {contactInfo.phone}
                </a>
              </div>
            </motion.div>

            <ol className="mx-auto mt-14 grid max-w-4xl gap-4 md:grid-cols-3">
              {NEXT.map((s, i) => (
                <motion.li key={s.t} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.1 }} className="rounded-3xl border border-line bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong"><s.icon className="h-5 w-5" aria-hidden /></span>
                  <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.14em] text-body-soft">Step {i + 1}</p>
                  <h2 className="mt-1 text-lg font-bold text-heading">{s.t}</h2>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-body">{s.d}</p>
                </motion.li>
              ))}
            </ol>

            <p className="mt-12 text-center text-sm text-body">
              While you wait, see <Link to="/case-studies" className="font-semibold text-accent-strong underline underline-offset-2">how other businesses use AI Agentix</Link>.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
