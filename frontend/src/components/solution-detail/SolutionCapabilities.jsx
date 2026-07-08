import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Placeholder from '../common/Placeholder'
import { CAP_ICONS } from './icons'
import { cn } from '../../lib/cn'

export default function SolutionCapabilities({ capabilities }) {
  const [active, setActive] = useState(0)
  const c = capabilities.items[active]
  const ActiveIcon = CAP_ICONS[c.icon]

  return (
    <Section tone="alt">
      <SectionHeading eyebrow={capabilities.eyebrow} heading={capabilities.heading} align="center" max="max-w-2xl" className="mx-auto" />

      {/* pill tabs — single row, scrollable on small screens */}
      <div className="mt-9 flex justify-start gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:justify-center lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {capabilities.items.map((it, i) => {
          const Icon = CAP_ICONS[it.icon]
          return (
            <button
              key={it.name}
              onClick={() => setActive(i)}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-pill px-3.5 py-2 text-[13px] font-semibold transition-all',
                i === active ? 'bg-accent text-white shadow-orange' : 'border border-line bg-white text-body hover:border-accent/50 hover:text-heading',
              )}
            >
              {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} />}
              {it.name}
            </button>
          )
        })}
      </div>

      {/* detail: content + image */}
      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={`c-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              {ActiveIcon && <ActiveIcon className="h-7 w-7" strokeWidth={1.7} />}
            </span>
            <h3 className="mt-5 text-2xl font-bold text-heading md:text-3xl">{c.title || c.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-body">{c.desc}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium text-heading">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`i-${active}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden rounded-3xl border border-line shadow-float"
          >
            {c.image ? (
              <div className="relative aspect-[4/3]">
                <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-pill bg-white/95 px-3.5 py-1.5 text-xs font-bold text-heading shadow">
                  {c.name}
                </span>
              </div>
            ) : (
              <Placeholder label={`capability-visual: ${c.name}`} ratio="4/3" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
