import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Placeholder from '../common/Placeholder'
import { solutions } from '../../data/home'
import { cn } from '../../lib/cn'

export default function Solutions() {
  const [active, setActive] = useState(0)
  const s = solutions.items[active]

  return (
    <Section tone="white">
      <SectionHeading variant="stacked" eyebrow={solutions.eyebrow} heading={solutions.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* tab list */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {solutions.items.map((it, i) => (
            <button
              key={it.name}
              onClick={() => setActive(i)}
              className={cn(
                'whitespace-nowrap rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all lg:whitespace-normal',
                i === active
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-line bg-white text-heading hover:border-accent/40',
              )}
            >
              {it.name}
            </button>
          ))}
        </div>

        {/* detail panel */}
        <div className="rounded-2xl border border-line bg-surface-alt p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 md:grid-cols-2"
            >
              <div>
                <h3 className="text-2xl font-bold text-heading">{s.name}</h3>
                <p className="mt-1 text-base font-semibold text-accent">{s.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-body">{s.text}</p>
                <ul className="mt-5 grid gap-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-body">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link to={solutions.link.to} className="btn-ghost mt-6">
                  {solutions.link.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {s.image ? (
                  <div className="group/img overflow-hidden rounded-xl border border-line">
                    <img
                      src={s.image}
                      alt={`${s.name} — ${s.tagline}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                  </div>
                ) : (
                  <Placeholder label={`solution-visual: ${s.name} (4:3)`} ratio="4/3" />
                )}
                <div className="rounded-xl bg-ink p-5">
                  <div className="text-3xl font-extrabold text-accent">{s.stat.split(' ')[0]}</div>
                  <p className="mt-1 text-sm text-white">{s.stat}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
