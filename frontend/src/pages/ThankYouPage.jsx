import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, ArrowRight, Home, Clock, PhoneCall, FileText } from 'lucide-react'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import { details } from '../data/contact'

// Copy per form. Visitors land here only after the server confirmed the lead was saved.
const COPY = {
  audit: { title: 'Your AI audit request is in', body: 'Our team will review your details and reach out within 4 business hours to plan your free AI audit.' },
  demo: { title: 'Your demo request is in', body: 'We will confirm your demo slot by phone or email within 4 business hours.' },
  partner: { title: 'Thanks for applying to partner with us', body: 'Our partnerships team will review your application and get back to you within 2 business days.' },
  popup: { title: 'Your consultation request is in', body: 'Our team will call or WhatsApp you within 4 business hours.' },
  newsletter: { title: "You're subscribed", body: 'You will receive occasional AI automation updates by email. You can unsubscribe at any time.' },
}
const STEPS = [
  { icon: Clock, text: 'We review your request within 4 business hours' },
  { icon: PhoneCall, text: 'A consultant contacts you to understand your workflow' },
  { icon: FileText, text: 'You get a clear automation plan — no commitment required' },
]

export default function ThankYouPage() {
  const [params] = useSearchParams()
  const type = COPY[params.get('type')] ? params.get('type') : 'audit'
  const copy = COPY[type]
  const rawName = (params.get('n') || '').slice(0, 30)
  const name = /^[\p{L}\p{M}.'-]+$/u.test(rawName) ? rawName : ''

  return (
    <>
      <Helmet>
        <title>Thank You — AI Agentix</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden bg-ink pt-32 pb-20 text-white md:pt-40 md:pb-28">
          <div className="pointer-events-none absolute inset-0" aria-hidden style={{ backgroundImage: 'radial-gradient(45% 55% at 50% 0%, rgba(242,101,34,0.22) 0%, transparent 65%)' }} />
          <div className="container-x relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                <CheckCircle2 className="h-9 w-9" strokeWidth={1.8} aria-hidden />
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-accent">Thank you{name ? `, ${name}` : ''}</p>
              <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.08] text-white">{copy.title}</h1>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{copy.body}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={details.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle className="h-4 w-4" aria-hidden /> Need it faster? WhatsApp us
                </a>
                <Link to="/" className="btn border border-white/20 text-white hover:border-white/50">
                  <Home className="h-4 w-4" aria-hidden /> Back to home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {type !== 'newsletter' && (
          <section className="bg-surface py-16 md:py-20">
            <div className="container-x">
              <h2 className="text-center text-xl font-bold text-heading md:text-2xl">What happens next</h2>
              <ol className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
                {STEPS.map((s, i) => (
                  <li key={s.text} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-sm leading-relaxed text-body"><span className="sr-only">Step {i + 1}: </span>{s.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section className="bg-surface-alt py-16 md:py-20">
          <div className="container-x text-center">
            <h2 className="text-xl font-bold text-heading md:text-2xl">While you wait, explore</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[['Our Solutions', '/solutions'], ['Case Studies', '/case-studies'], ['Industries', '/industries'], ['AI Studio', '/ai-studio']].map(([label, to]) => (
                <Link key={to} to={to} className="btn-outline">
                  {label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
