import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Check, MapPin, Clock, ArrowRight, Quote } from 'lucide-react'

export default function CaseStudyModal({ study, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  if (!study) return null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/70 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-4 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-float"
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white/95 px-6 py-4 backdrop-blur md:px-8">
          <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-bold text-accent">{study.industry}</span>
          <button onClick={onClose} aria-label="Close" className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-body transition-colors hover:border-accent hover:text-accent">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-7 md:px-10 md:py-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body-soft">
            <span className="font-semibold text-heading">{study.client}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {study.location}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {study.readTime}</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-heading md:text-3xl">{study.tagline}</h2>

          {/* stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-surface-alt/50 p-4 sm:grid-cols-4">
            {study.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-xl font-extrabold text-accent md:text-2xl">{s.value}</div>
                <div className="mt-1 text-xs font-semibold leading-tight text-heading">{s.label}</div>
                <div className="mt-0.5 text-xs leading-tight text-body-soft">{s.sub}</div>
              </div>
            ))}
          </div>

          <Block title="The Context" body={study.context} />
          <Block title="The Challenge" body={study.challenge} />

          <div className="mt-7">
            <SectionLabel>The Solution</SectionLabel>
            <ul className="mt-3 grid gap-2.5">
              {study.solution.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-body">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7">
            <SectionLabel>Implementation Timeline</SectionLabel>
            <ol className="relative mt-4 space-y-4 before:absolute before:left-[13px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line">
              {study.timeline.map((p) => (
                <li key={p.no} className="relative flex items-start gap-4">
                  <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{p.no}</span>
                  <div className="pt-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-accent">Phase {p.no}</span>
                      <span className="text-sm font-bold text-heading">{p.title}</span>
                      <span className="rounded-pill bg-surface-alt px-2 py-0.5 text-xs font-semibold text-body">{p.time}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-body">{p.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs font-semibold text-body-soft">Total deployment: <span className="text-accent">{study.deploy}</span></p>
          </div>

          {/* quote */}
          <div className="relative mt-7 overflow-hidden rounded-2xl bg-ink p-6 text-white md:p-7">
            <Quote className="h-7 w-7 text-accent/40" />
            <p className="mt-3 text-base font-medium leading-relaxed text-white/95 md:text-lg">"{study.quote.text}"</p>
            <div className="mt-4 text-sm">
              <span className="font-bold text-white">{study.quote.name}</span>
              <span className="text-ink-muted"> — {study.quote.role}</span>
            </div>
          </div>

          {/* cta */}
          <div className="mt-7 flex flex-col items-start gap-3 rounded-2xl border border-line bg-accent-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-bold text-heading">Want results like this for your business?</p>
            <Link to="/contact" onClick={onClose} className="btn-primary shrink-0">Book a Free Strategy Call <ArrowRight className="h-4 w-4" /></Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <span key={t} className="rounded-pill border border-line px-3 py-1 text-xs font-medium text-body-soft">{t}</span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

function SectionLabel({ children }) {
  return (
    <span className="eyebrow">
      <span className="h-px w-6 bg-accent" aria-hidden />
      {children}
    </span>
  )
}

function Block({ title, body }) {
  return (
    <div className="mt-7">
      <SectionLabel>{title}</SectionLabel>
      <p className="mt-3 text-sm leading-relaxed text-body">{body}</p>
    </div>
  )
}
