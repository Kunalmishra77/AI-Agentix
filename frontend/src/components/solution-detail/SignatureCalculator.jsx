import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'

/**
 * Interactive impact calculator — the per-page "signature" block.
 * Fully data-driven: each solution supplies its own inputs (sliders) and
 * outputs (live formulas) in its data file, so every page's calculator is unique
 * while the component/logic stays shared.
 *
 * signature = {
 *   type: 'calculator', eyebrow, heading, body, note,
 *   inputs:  [{ key, label, min, max, step, default, unit, prefix, format? }],
 *   outputs: [{ key, label, unit, prefix, compute: (vals) => number, format? }],
 * }
 */
export default function SignatureCalculator({ signature }) {
  const [vals, setVals] = useState(() =>
    Object.fromEntries(signature.inputs.map((i) => [i.key, i.default])),
  )

  // Resolve every input against its default so a stale key (e.g. after
  // client-side navigation to another calculator page) can never read undefined.
  const resolved = useMemo(
    () => Object.fromEntries(signature.inputs.map((i) => [i.key, vals[i.key] ?? i.default])),
    [vals, signature.inputs],
  )

  const outputs = useMemo(
    () => signature.outputs.map((o) => ({ ...o, value: o.compute(resolved) })),
    [resolved, signature.outputs],
  )

  const fmt = (n, o) => {
    if (o.format) return o.format(n)
    const rounded = Math.round(n)
    return rounded.toLocaleString('en-IN')
  }

  return (
    <section className="relative overflow-hidden bg-accent-soft py-section">
      {/* soft branded glow */}
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <SectionHeading eyebrow={signature.eyebrow} heading={signature.heading} sub={signature.body} max="max-w-2xl" />

        <div className="mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-[1fr_1fr]">
          {/* inputs */}
          <div className="rounded-3xl border border-line bg-white p-7 shadow-card md:p-9">
            <div className="space-y-7">
              {signature.inputs.map((i) => (
                <div key={i.key}>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor={`calc-${i.key}`} className="text-sm font-semibold text-heading">{i.label}</label>
                    <span className="text-sm font-bold text-accent">
                      {i.prefix || ''}{(i.format ? i.format(resolved[i.key]) : resolved[i.key].toLocaleString('en-IN'))}{i.unit ? ` ${i.unit}` : ''}
                    </span>
                  </div>
                  <input
                    id={`calc-${i.key}`}
                    type="range"
                    min={i.min}
                    max={i.max}
                    step={i.step || 1}
                    value={resolved[i.key]}
                    onChange={(e) => setVals((v) => ({ ...v, [i.key]: Number(e.target.value) }))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent"
                    aria-label={i.label}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* outputs */}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-float md:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-[90px]" aria-hidden />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90">
                <Sparkles className="h-3.5 w-3.5 text-accent" /> With AI Agentix
              </span>
              <div className="mt-6 space-y-6">
                {outputs.map((o) => (
                  <div key={o.key} className="border-b border-white/10 pb-5 last:border-0 last:pb-0">
                    <motion.div
                      key={o.value}
                      initial={{ opacity: 0.4, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-3xl font-extrabold leading-none text-transparent md:text-4xl"
                    >
                      {o.prefix || ''}{fmt(o.value, o)}{o.unit ? ` ${o.unit}` : ''}
                    </motion.div>
                    <div className="mt-2 text-sm text-ink-muted">{o.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {signature.note && <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-body-soft">{signature.note}</p>}
      </div>
    </section>
  )
}
