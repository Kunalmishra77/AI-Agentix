import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, ChevronDown, Phone, ShieldCheck, FileLock2, Unlock, Languages, Wrench, LifeBuoy, Quote, CalendarCheck } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import Seo from '../components/common/Seo'
import BookingCard from '../components/landing/BookingCard'
import LiveDemo from '../components/landing/LiveDemo'
import { MOCKS } from '../components/landing/Mockups'
import { meta, hero, tools, problem, features, results, quote, industries, steps, trust, faqs, finalCta } from '../data/landing'
import { leadership } from '../data/about'
import { contactInfo, whatsappLink } from '../data/site'
import { loadAds, track } from '../lib/analytics'
import { cn } from '../lib/cn'

const WA_TEXT = 'Hi AI Agentix, I saw your ad and want to know how AI can automate my business.'
const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }

function useLpBody() {
  useEffect(() => {
    document.body.classList.add('agx-lp')
    loadAds()
    // in-page links (#book, #faq …) scroll smoothly without adding history entries
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a || a.getAttribute('href').length < 2 || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const el = document.getElementById(a.getAttribute('href').slice(1))
      if (!el) return
      e.preventDefault()
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      if (a.getAttribute('href') === '#book') track('lp_cta_click', { cta: (a.textContent || '').trim().slice(0, 40) })
    }
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('click', onClick); document.body.classList.remove('agx-lp') }
  }, [])
}

function Heading({ eyebrow, title, sub, center = false, dark = false }) {
  return (
    <motion.div {...reveal} className={cn('max-w-3xl', center && 'mx-auto text-center')}>
      {eyebrow && <p className={cn('text-[13px] font-semibold uppercase tracking-[0.16em]', dark ? 'text-accent' : 'text-accent-strong')}>{eyebrow}</p>}
      <h2 className={cn('mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.025em]', dark ? 'text-white' : 'text-heading')}>{title}</h2>
      {sub && <p className={cn('mt-4 text-[17px] leading-relaxed md:text-lg', dark ? 'text-white/70' : 'text-body', center && 'mx-auto max-w-2xl')}>{sub}</p>}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ header */
function LpHeader() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const links = [['#product', 'Product'], ['#demo', 'Try the AI'], ['#results', 'Results'], ['#faq', 'FAQ']]
  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled ? 'border-b border-line bg-white/90 shadow-sm backdrop-blur-lg' : 'bg-transparent')}>
      <div className="container-x flex h-[68px] items-center justify-between gap-4">
        <Link to="/" aria-label="AI Agentix home" className="shrink-0"><img src="/agentix-logo-dark.png" alt="AGENTiX" className="h-10 w-auto md:h-11" /></Link>
        <nav aria-label="On this page" className="hidden items-center gap-1 rounded-full border border-line bg-white/70 p-1 backdrop-blur lg:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="rounded-full px-4 py-2 text-sm font-medium text-body transition hover:bg-surface-2 hover:text-heading">{l}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <a href={contactInfo.phoneHref} className="hidden items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-heading transition hover:border-heading md:inline-flex">
            <Phone className="h-4 w-4" aria-hidden /> {contactInfo.phone}
          </a>
          <a href="#book" className="btn-primary rounded-full px-4 py-2.5 sm:px-5">Book free call</a>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ hero */
function RotatingWord({ words }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [words.length])
  return (
    <span className="relative block h-[1.08em] overflow-hidden" aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={words[i]} className="block bg-gradient-to-r from-accent-cta via-accent to-[#F7A162] bg-clip-text pb-[0.08em] text-transparent"
          initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FBFAF8] pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="lp-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_30%_30%,#000_30%,transparent_80%)]" aria-hidden />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-accent/15 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[420px] w-[420px] rounded-full bg-[#FFD9C2]/60 blur-[110px]" aria-hidden />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-accent-strong shadow-sm">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" aria-hidden /> {hero.eyebrow}
          </motion.p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,5.3vw,5.1rem)] font-bold leading-[1.02] tracking-[-0.04em] text-heading">
            <span className="block">{hero.line1}</span>
            <RotatingWord words={hero.rotating} />
            <span className="sr-only">{hero.rotating.join(' ')}</span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-6 max-w-xl text-[17px] leading-relaxed text-body md:text-[19px]">
            {hero.body}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#book" className="btn-primary rounded-full px-7 py-4 text-base shadow-orange">Book a free AI call <ArrowRight className="h-4 w-4" aria-hidden /></a>
            <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noopener noreferrer" className="btn rounded-full border border-line bg-white px-7 py-4 text-base text-heading hover:border-heading">
              <SiWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden /> Chat on WhatsApp
            </a>
          </motion.div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {hero.ticks.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm text-body">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><Check className="h-3 w-3" strokeWidth={3} aria-hidden /></span>{t}
              </li>
            ))}
          </ul>
          <dl className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-white/80 shadow-card backdrop-blur">
            {hero.stats.map((s) => (
              <div key={s.k} className="px-3 py-4 sm:px-5">
                <dt className="sr-only">{s.k}</dt>
                <dd className="font-display text-xl font-bold text-heading sm:text-2xl">{s.v}</dd>
                <dd className="mt-0.5 text-[12px] leading-snug text-body-soft sm:text-[13px]">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="lg:pl-4">
          <BookingCard id="book" />
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ tools */
function Tools() {
  const row = [...tools, ...tools]
  return (
    <section aria-label="Works with your tools" className="border-y border-line bg-white py-8">
      <p className="text-center text-[13px] font-semibold uppercase tracking-[0.16em] text-body-soft">Works with the tools your team already uses</p>
      <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee-slow gap-3 motion-reduce:animate-none">
          {row.map((t, i) => (
            <li key={i} aria-hidden={i >= tools.length} className="whitespace-nowrap rounded-full border border-line bg-surface-2/60 px-5 py-2.5 text-sm font-semibold text-heading">{t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ problem */
function Problem() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="container-x">
        <motion.p {...reveal} className="max-w-5xl font-display text-[clamp(2.2rem,5.6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.035em] text-heading">
          {problem.a}{' '}
          <span className="bg-gradient-to-r from-accent-cta to-accent bg-clip-text text-transparent">{problem.b}</span>
        </motion.p>
        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-body md:text-xl">{problem.body}</motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ features */
function Features() {
  return (
    <section id="product" className="scroll-mt-20 bg-[#FBFAF8] py-20 md:py-28">
      <div className="container-x">
        <Heading eyebrow="What we build" title={<>From first message<br className="hidden sm:block" /> to money in the bank.</>} sub="Four AI agents, built and connected for your business — use one or all of them." />
        <div className="mt-16 space-y-20 md:mt-24 md:space-y-32">
          {features.map((f, i) => {
            const Mock = MOCKS[f.mock]
            const flip = i % 2 === 1
            return (
              <article key={f.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <motion.div {...reveal} className={cn(flip && 'lg:order-2')}>
                  <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent-strong">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold">{i + 1}</span>{f.tag}
                  </p>
                  <h3 className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-[1.08] tracking-[-0.025em] text-heading">{f.title}</h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-body">{f.body}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[15px] text-heading">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-cta text-white"><Check className="h-3 w-3" strokeWidth={3} aria-hidden /></span>{b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 rounded-2xl border border-line bg-white p-4 shadow-card">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">Result · {f.result.k}</p>
                    <p className="mt-1 text-[15px] font-semibold text-heading">{f.result.v}</p>
                  </div>
                  <a href="#book" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-strong hover:gap-2.5 transition-all">See it on a free call <ArrowRight className="h-4 w-4" aria-hidden /></a>
                </motion.div>
                <motion.div {...reveal} className={cn('relative', flip && 'lg:order-1')}>
                  <div className="pointer-events-none absolute inset-6 rounded-[40px] bg-gradient-to-br from-accent/15 via-[#FFE6D6] to-transparent blur-2xl" aria-hidden />
                  <div className="relative">{Mock && <Mock />}</div>
                </motion.div>
              </article>
            )
          })}
        </div>
        <p className="mt-16 text-center text-xs text-body-soft">Screens show sample data for illustration.</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ demo */
function Demo() {
  return (
    <section id="demo" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="container-x">
        <Heading center eyebrow="Try it yourself" title="Watch an enquiry become a booked meeting." sub="Pick your business. See the AI answer a late-night WhatsApp message, book the next step — and fill in your CRM while it talks." />
        <div className="mt-12"><LiveDemo /></div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ results */
function Results() {
  return (
    <section id="results" className="relative scroll-mt-20 overflow-hidden bg-ink py-20 text-white md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" aria-hidden />
      <div className="container-x relative">
        <Heading dark eyebrow="Real results" title="What changes when AI takes the busywork." sub="Numbers from our client deployments across India." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <motion.div key={r.k} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }}
              className={cn('flex flex-col rounded-3xl border p-6', r.tone === 'orange' ? 'border-accent/40 bg-gradient-to-br from-accent-cta to-[#E0591A]' : 'border-line-dark bg-ink-800')}>
              <p className="whitespace-nowrap font-display text-[clamp(1.7rem,2.3vw,2.2rem)] font-bold leading-none tracking-tight">{r.v}</p>
              <p className="mt-3 text-[15px] font-semibold">{r.k}</p>
              <p className={cn('mt-auto pt-6 text-[13px]', r.tone === 'orange' ? 'text-white/85' : 'text-ink-muted')}>{r.who}</p>
            </motion.div>
          ))}
        </div>
        <motion.figure {...reveal} className="mt-6 grid gap-6 rounded-3xl border border-line-dark bg-ink-800 p-6 md:grid-cols-[auto_1fr] md:items-center md:p-8">
          <Quote className="h-10 w-10 text-accent" aria-hidden />
          <div>
            <blockquote className="text-lg font-medium leading-relaxed text-white md:text-xl">“{quote.text}”</blockquote>
            <figcaption className="mt-3 text-sm text-ink-muted"><b className="text-white">{quote.name}</b> · {quote.role}</figcaption>
          </div>
        </motion.figure>
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-semibold text-white/70">Built for:</span>
          {industries.map((n) => <span key={n} className="rounded-full border border-line-dark bg-ink-700 px-3.5 py-1.5 text-[13px] font-medium text-white/85">{n}</span>)}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ founders */
function Founders() {
  const people = leadership.members.filter((m) => m.image)
  return (
    <section className="bg-[#FBFAF8] py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Heading eyebrow="Who you’ll work with" title="Founder-led. Engineering-first." sub="AI Agentix is led by founders with an MBA from IIM Calcutta and a B.Tech & M.Tech from IIT Kharagpur — strategy and engineering at the same table." />
        <div className="grid gap-4 sm:grid-cols-3">
          {people.map((p, i) => (
            <motion.div key={p.name} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
              <img src={p.image} alt={p.name} width="480" height="480" loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
              <div className="p-4">
                <p className="font-semibold text-heading">{p.name}</p>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-accent-strong">{p.role}</p>
                {p.qualification && <p className="mt-1 text-[13px] text-body">{p.qualification}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ process + trust */
const TRUST_ICONS = [ShieldCheck, FileLock2, Unlock, Languages, Wrench, LifeBuoy]

function Process() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <Heading center eyebrow="How it works" title="Live in weeks, not months." sub="A clear path from first call to working AI agents — no surprises." />
        <ol className="relative mt-14 grid gap-4 md:grid-cols-4">
          <li aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block" />
          {steps.map((s, i) => (
            <motion.li key={s.t} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="relative">
              <span className={cn('relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-bold shadow-card', i === 0 ? 'bg-accent-cta text-white' : 'border border-line bg-white text-heading')}>
                {i === 0 ? <CalendarCheck className="h-6 w-6" aria-hidden /> : `0${i + 1}`}
              </span>
              <h3 className="mt-5 text-lg font-bold text-heading">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-body">{s.d}</p>
              <p className="mt-3 inline-block rounded-full bg-surface-2 px-3 py-1 text-[12px] font-semibold text-heading">{s.time}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map((t, i) => {
            const Icon = TRUST_ICONS[i]
            return (
              <motion.div key={t.t} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }} className="flex gap-4 rounded-3xl border border-line bg-[#FBFAF8] p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-accent-strong shadow-sm"><Icon className="h-5 w-5" aria-hidden /></span>
                <div>
                  <h3 className="font-semibold text-heading">{t.t}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-body">{t.d}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ FAQ */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="scroll-mt-20 bg-[#FBFAF8] py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <Heading eyebrow="FAQ" title="Questions? Answers." sub="Anything else? Message us on WhatsApp or call — we reply fast." />
          <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noopener noreferrer" className="btn mt-7 rounded-full border border-line bg-white px-6 py-3.5 text-heading hover:border-heading">
            <SiWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden /> {contactInfo.whatsappDisplay}
          </a>
        </div>
        <div className="divide-y divide-line rounded-3xl border border-line bg-white px-5 sm:px-7">
          {faqs.map((f, i) => {
            const on = open === i
            return (
              <div key={f.q}>
                <h3>
                  <button type="button" aria-expanded={on} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(on ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[16px] font-semibold text-heading">
                    {f.q}
                    <ChevronDown className={cn('h-5 w-5 shrink-0 text-body-soft transition-transform duration-300', on && 'rotate-180 text-accent-strong')} aria-hidden />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="pb-5 text-[15px] leading-relaxed text-body">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ final CTA */
function FinalCta() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[36px] bg-ink px-6 py-14 text-white sm:px-12 md:py-20">
          <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-accent/35 blur-[120px]" aria-hidden />
          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div>
              <h2 className="font-display text-[clamp(2.1rem,4.8vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">{finalCta.heading}</h2>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/70">{finalCta.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noopener noreferrer" className="btn rounded-full bg-[#25D366] px-6 py-3.5 text-[15px] text-white hover:brightness-95">
                  <SiWhatsapp className="h-5 w-5" aria-hidden /> Chat on WhatsApp
                </a>
                <a href={contactInfo.phoneHref} className="btn rounded-full border border-white/25 px-6 py-3.5 text-[15px] text-white hover:border-white/60">
                  <Phone className="h-4 w-4" aria-hidden /> Call {contactInfo.phone}
                </a>
              </div>
            </div>
            <div className="text-heading"><BookingCard id="book-2" compact /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ footer + mobile bar */
function LpFooter() {
  return (
    <footer className="border-t border-line bg-white pb-28 pt-10 md:pb-10">
      <div className="container-x flex flex-col gap-6 text-sm text-body md:flex-row md:items-center md:justify-between">
        <div>
          <img src="/agentix-logo-dark.png" alt="AGENTiX" className="h-9 w-auto" loading="lazy" />
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-body-soft">{contactInfo.address} · <a href={`mailto:${contactInfo.email}`} className="hover:text-heading">{contactInfo.email}</a></p>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
          <Link to="/privacy" className="hover:text-heading">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-heading">Terms</Link>
          <Link to="/" className="hover:text-heading">Main website</Link>
          <span className="text-body-soft">© {new Date().getFullYear()} AI Agentix</span>
        </nav>
      </div>
    </footer>
  )
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-white/95 px-3 pt-2 backdrop-blur-lg md:hidden" style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom))' }}>
      <div className="grid grid-cols-[auto_auto_1fr] gap-2">
        <a href={contactInfo.phoneHref} aria-label={`Call ${contactInfo.phone}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-heading"><Phone className="h-5 w-5" aria-hidden /></a>
        <a href={whatsappLink(WA_TEXT)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white"><SiWhatsapp className="h-6 w-6" aria-hidden /></a>
        <a href="#book" className="btn-primary h-12 rounded-full text-[15px]">Book free AI call <ArrowRight className="h-4 w-4" aria-hidden /></a>
      </div>
    </div>
  )
}

export default function LandingPage() {
  useLpBody()
  return (
    <>
      <Seo title={meta.title} description={meta.description} noindex />
      <LpHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Tools />
        <Problem />
        <Features />
        <Demo />
        <Results />
        <Founders />
        <Process />
        <Faq />
        <FinalCta />
      </main>
      <LpFooter />
      <MobileBar />
    </>
  )
}
