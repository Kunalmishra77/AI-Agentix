import { motion } from 'framer-motion'
import { Activity, AlertTriangle, Wrench } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import { cn } from '../../lib/cn'

/**
 * Live "control room" monitor — the signature block for the Manufacturing page.
 * Renders production-line status cards with animated OEE bars. Data-driven via
 * `signature.lines` (each: name, oee, status, detail).
 */
const STATUS = {
  Running: { dot: 'bg-green-500', text: 'text-green-400', bar: 'from-green-500 to-emerald-400', Icon: Activity },
  'Maintenance Due': { dot: 'bg-amber-500', text: 'text-amber-400', bar: 'from-amber-500 to-orange-400', Icon: Wrench },
  Alert: { dot: 'bg-red-500', text: 'text-red-400', bar: 'from-red-500 to-rose-400', Icon: AlertTriangle },
}

export default function SignatureMonitor({ signature }) {
  return (
    <section className="relative overflow-hidden bg-accent-soft py-section">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <SectionHeading eyebrow={signature.eyebrow} heading={signature.heading} sub={signature.body} align="center" max="max-w-2xl" className="mx-auto" />

        {/* dark control-room panel */}
        <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-float md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-[90px]" aria-hidden />
          <div className="relative">
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5 text-sm font-bold">
                <Activity className="h-4 w-4 text-accent" />
                {signature.label}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                {signature.status}
              </span>
            </div>

            {/* line cards */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {signature.lines.map((l, i) => {
                const s = STATUS[l.status] || STATUS.Running
                return (
                  <motion.div
                    key={l.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-white">{l.name}</div>
                      <span className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-pill bg-white/5 px-2.5 py-1 text-[11px] font-semibold', s.text)}>
                        <span className={cn('h-1.5 w-1.5 rounded-full', s.dot, l.status === 'Running' && 'animate-pulse')} />
                        {l.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      <span className="text-xs uppercase tracking-wide text-ink-muted">OEE</span>
                      <span className="text-2xl font-extrabold text-white">{l.oee}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${l.oee}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                        className={cn('h-full rounded-full bg-gradient-to-r', s.bar)}
                      />
                    </div>
                    {l.detail && <div className="mt-3 text-xs text-ink-muted">{l.detail}</div>}
                  </motion.div>
                )
              })}
            </div>

            {signature.footer && (
              <div className="mt-5 border-t border-white/10 pt-4 text-xs text-ink-muted">{signature.footer}</div>
            )}
          </div>
        </div>

        {signature.note && <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-body-soft">{signature.note}</p>}
      </div>
    </section>
  )
}
