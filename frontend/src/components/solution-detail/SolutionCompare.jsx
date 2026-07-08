import { motion } from 'framer-motion'
import { X, Check, Star } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function SolutionCompare({ compare }) {
  return (
    <Section tone="white" className="relative overflow-hidden">
      <SectionHeading eyebrow={compare.eyebrow} heading={compare.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="relative mx-auto mt-16 max-w-4xl">
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
    </Section>
  )
}
