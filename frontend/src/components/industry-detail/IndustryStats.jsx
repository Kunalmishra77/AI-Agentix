import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

// Splits "60%" / "3x" / "₹42L" into numeric target + prefix/suffix for count-up.
function parse(value) {
  const m = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!m) return { prefix: '', target: null, suffix: String(value) }
  return { prefix: m[1], target: parseFloat(m[2]), suffix: m[3] }
}

function StatValue({ value, run }) {
  const { prefix, target, suffix } = parse(value)
  const [n, setN] = useState(target === null ? null : 0)
  useEffect(() => {
    if (target === null || !run) return
    if (prefersReduced()) { setN(target); return }
    const steps = 30
    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i >= steps) { setN(target); clearInterval(id) }
      else setN(Math.round((target * i) / steps * 10) / 10)
    }, 26)
    return () => clearInterval(id)
  }, [run, target])
  if (target === null) return <>{value}</>
  const display = Number.isInteger(target) ? Math.round(n) : n
  return <>{prefix}{display}{suffix}</>
}

export default function IndustryStats({ stats }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <section ref={ref} className="border-y border-line bg-white">
      <div className="container-x grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4 md:py-14">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="px-4 text-center md:border-l md:border-line md:first:border-l-0"
          >
            <div className="font-display text-4xl font-extrabold tracking-tight text-accent md:text-5xl">
              <StatValue value={s.value} run={inView} />
            </div>
            <div className="mt-2 text-sm font-semibold text-heading">{s.label}</div>
            {s.sub && <div className="mt-0.5 text-xs text-body-soft">{s.sub}</div>}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
