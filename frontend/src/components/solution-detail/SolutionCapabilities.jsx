import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { CAP_ICONS } from './icons'
import { cn } from '../../lib/cn'

export default function SolutionCapabilities({ capabilities }) {
  const [active, setActive] = useState(0)
  const c = capabilities.items[active]
  const ActiveIcon = CAP_ICONS[c.icon]

  return (
    <Section tone="alt">
      <SectionHeading eyebrow={capabilities.eyebrow} heading={capabilities.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
        {/* tab list */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {capabilities.items.map((it, i) => {
            const Icon = CAP_ICONS[it.icon]
            return (
              <button
                key={it.name}
                onClick={() => setActive(i)}
                className={cn(
                  'flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all lg:shrink',
                  i === active ? 'border-accent bg-white text-heading shadow-card' : 'border-line bg-white/60 text-body hover:border-accent/40',
                )}
              >
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors', i === active ? 'bg-accent text-white' : 'bg-accent-soft text-accent')}>
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.8} />}
                </span>
                <span className="whitespace-nowrap lg:whitespace-normal">{it.name}</span>
              </button>
            )
          })}
        </div>

        {/* detail */}
        <div className="rounded-2xl border border-line bg-white p-7 md:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                {ActiveIcon && <ActiveIcon className="h-7 w-7" strokeWidth={1.7} />}
              </span>
              <h3 className="mt-5 text-2xl font-bold text-heading">{c.name}</h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-body">{c.desc}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 rounded-xl bg-surface-alt px-4 py-3 text-sm font-medium text-heading">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
