import { motion } from 'framer-motion'
import { X, Check, Star } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function SolutionCompare({ compare }) {
  return (
    <Section tone="white" className="relative overflow-hidden">
      <SectionHeading eyebrow={compare.eyebrow} heading={compare.heading} align="center" max="max-w-2xl" className="mx-auto" />

      {/* DESKTOP (md+): highlighted 3-column table */}
      <div className="relative mx-auto mt-16 hidden max-w-4xl md:block">
        {/* elevated highlight behind the AI column */}
        <div className="absolute -top-5 bottom-0 left-1/3 w-1/3 rounded-3xl bg-gradient-to-b from-accent-soft to-white ring-1 ring-accent/30 shadow-[0_20px_50px_-24px_rgba(242,101,34,0.45)]" aria-hidden />
        {/* recommended badge */}
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-accent px-4 py-1.5 text-xs font-bold text-white shadow-orange">
            <Star className="h-3.5 w-3.5 fill-current" /> RECOMMENDED
          </span>
        </div>

        <div className="relative z-10 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {/* header */}
          <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-wide sm:text-sm">
            <div className="flex items-center p-4 text-ink-muted md:p-5">{compare.cols[0]}</div>
            <div className="flex items-center justify-center gap-2 p-4 text-center text-accent md:p-5">{compare.cols[1]}</div>
            <div className="flex items-center justify-center p-4 text-center text-ink-muted md:p-5">{compare.cols[2]}</div>
          </div>

          {compare.rows.map((r, i) => (
            <motion.div
              key={r.cap}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="grid grid-cols-3 border-t border-line transition-colors hover:bg-surface-alt/60"
            >
              <div className="flex items-center p-4 text-sm font-semibold text-heading md:p-5">{r.cap}</div>
              <div className="flex items-center justify-center gap-2 p-4 text-center text-sm font-bold text-heading md:p-5">
                <Check className="h-4 w-4 shrink-0 text-accent" /> {r.ai}
              </div>
              <div className="flex items-center justify-center gap-2 p-4 text-center text-sm text-body-soft md:p-5">
                <X className="h-4 w-4 shrink-0 text-red-400" /> {r.traditional}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MOBILE (<md): one stacked card per row */}
      <div className="mt-10 space-y-3 md:hidden">
        {compare.rows.map((r) => (
          <div key={r.cap} className="rounded-2xl border border-line bg-white p-4 shadow-card">
            <h4 className="text-sm font-bold text-heading">{r.cap}</h4>
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2.5 rounded-lg bg-accent-soft px-3 py-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wide text-accent">{compare.cols[1]}</div>
                  <div className="mt-0.5 text-sm font-semibold text-heading">{r.ai}</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 px-3 py-1">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wide text-ink-muted">{compare.cols[2]}</div>
                  <div className="mt-0.5 text-sm text-body-soft">{r.traditional}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
