import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { agents } from '../../data/technology'
import { TECH_ICONS } from './icons'
import { cn } from '../../lib/cn'

export default function TechAgents() {
  const [active, setActive] = useState(0)
  const a = agents.items[active]
  const Icon = TECH_ICONS[a.icon]

  return (
    <Section tone="white">
      <SectionHeading eyebrow={agents.eyebrow} heading={agents.heading} align="center" max="max-w-2xl" className="mx-auto" />

      {/* agent tabs */}
      <div className="mt-9 flex flex-wrap justify-center gap-2">
        {agents.items.map((it, i) => {
          const It = TECH_ICONS[it.icon]
          return (
            <button
              key={it.key}
              onClick={() => setActive(i)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-[13px] font-semibold transition-all',
                i === active ? 'bg-accent text-white shadow-orange' : 'border border-line bg-white text-body hover:border-accent/50 hover:text-heading',
              )}
            >
              <It className="h-3.5 w-3.5" strokeWidth={2} /> {it.name}
            </button>
          )
        })}
      </div>

      {/* detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* left: identity + tech */}
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Icon className="h-7 w-7" strokeWidth={1.7} />
            </span>
            <h3 className="mt-5 text-2xl font-bold text-heading md:text-3xl">{a.name}</h3>
            <p className="mt-1 text-base font-semibold text-accent">{a.role}</p>
            <p className="mt-4 text-base leading-relaxed text-body">{a.desc}</p>

            <div className="mt-7">
              <div className="eyebrow mb-3"><span className="h-px w-6 bg-accent" aria-hidden /> Technology used</div>
              <div className="flex flex-wrap gap-2">
                {a.tech.map((t) => (
                  <span key={t} className="rounded-pill border border-line bg-surface-alt px-3 py-1.5 text-xs font-medium text-heading">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* right: process flow */}
          <div className="rounded-3xl border border-line bg-surface-alt/50 p-6 md:p-8">
            <div className="eyebrow mb-5"><span className="h-px w-6 bg-accent" aria-hidden /> How it works</div>
            <ol className="relative space-y-5 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line">
              {a.flow.map((step, i) => (
                <li key={step} className="relative flex items-start gap-4">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
                  <span className="pt-1.5 text-sm leading-relaxed text-heading">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
