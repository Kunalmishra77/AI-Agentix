import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import { CAP_ICONS } from './icons'

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

function useCountUp(target, run) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (prefersReduced()) {
      setN(target)
      return
    }
    const steps = 32
    let i = 0
    setN(0)
    const id = setInterval(() => {
      i += 1
      if (i >= steps) {
        setN(target)
        clearInterval(id)
      } else {
        setN(Math.round((target * i) / steps))
      }
    }, 28)
    return () => clearInterval(id)
  }, [run, target])
  return n
}

function Kpi({ m, run }) {
  const n = useCountUp(m.value, run)
  const Icon = CAP_ICONS[m.icon]
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-ink-muted">{m.label}</span>
        {Icon && <Icon className="h-4 w-4 text-accent" strokeWidth={2} />}
      </div>
      <div className="mt-3 bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-3xl font-extrabold leading-none text-transparent md:text-4xl">
        {m.prefix || ''}{n.toLocaleString('en-IN')}{m.suffix || ''}
      </div>
      {m.sub && <div className="mt-2 text-xs text-ink-muted">{m.sub}</div>}
    </div>
  )
}

/**
 * Animated KPI dashboard — the signature block for the Hospital Management page.
 * Count-up metric tiles in a dark "control room" panel. Data-driven via
 * `signature.metrics` (each: value, prefix?, suffix?, label, sub, icon).
 */
export default function SignatureDashboard({ signature }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-accent-soft py-section">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <SectionHeading eyebrow={signature.eyebrow} heading={signature.heading} sub={signature.body} align="center" max="max-w-2xl" className="mx-auto" />

        <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-float md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-[90px]" aria-hidden />
          <div className="relative">
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

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {signature.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Kpi m={m} run={inView} />
                </motion.div>
              ))}
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
