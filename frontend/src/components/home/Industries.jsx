import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Placeholder from '../common/Placeholder'
import { industries } from '../../data/home'
import { cn } from '../../lib/cn'

export default function Industries() {
  const [active, setActive] = useState(0)
  const it = industries.items[active]

  return (
    <Section tone="alt">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow={industries.eyebrow} heading={industries.heading} max="max-w-xl" />
        <Link to={industries.link.to} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-heading hover:text-accent">
          {industries.link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white">
        {/* panel: image left, content right */}
        <div className="grid md:grid-cols-2">
          <div className="p-4 md:p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="group h-full overflow-hidden rounded-xl"
              >
                <Placeholder
                  label={`industry-visual: ${it.name}`}
                  className="h-full min-h-[240px] transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col justify-center p-8 md:p-12"
            >
              <h3 className="text-3xl font-bold text-heading">AI for {it.name}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-body">{it.desc}</p>
              <div className="mt-6 flex items-center gap-3">
                <span className="text-4xl font-extrabold tracking-tight text-accent">{it.stat.split(' ')[0]}</span>
                <span className="text-sm font-medium text-body">{it.stat.split(' ').slice(1).join(' ')}</span>
              </div>
              <Link to={it.to} className="group mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-accent">
                Explore {it.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* tab row */}
        <div className="grid grid-cols-2 border-t border-line sm:grid-cols-4 lg:grid-cols-7">
          {industries.items.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setActive(i)}
              className={cn(
                'border-line px-3 py-4 text-xs font-semibold transition-colors sm:text-sm [&:not(:last-child)]:border-r [&:nth-child(-n+5)]:border-b sm:[&:nth-child(-n+4)]:border-b lg:[&]:border-b-0',
                i === active ? 'bg-ink text-accent' : 'bg-white text-body hover:bg-surface-alt hover:text-heading',
              )}
            >
              {x.name}
            </button>
          ))}
        </div>
      </div>
    </Section>
  )
}
