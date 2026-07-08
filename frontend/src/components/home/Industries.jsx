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
        <Link to={industries.link.to} className="btn-ghost shrink-0">
          {industries.link.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="grid md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center p-8 md:p-12"
            >
              <span className="eyebrow mb-3">{it.name}</span>
              <div className="text-5xl font-extrabold tracking-tight text-heading">{it.stat}</div>
              <Link to={it.to} className="btn-primary mt-6 w-fit">
                Explore {it.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </AnimatePresence>
          <div className="min-h-[260px] p-4 md:p-6">
            <Placeholder label={`industry-visual: ${it.name}`} className="h-full min-h-[220px]" />
          </div>
        </div>

        {/* tab row */}
        <div className="flex flex-wrap gap-1 border-t border-line bg-surface-alt p-2">
          {industries.items.map((x, i) => (
            <button
              key={x.name}
              onClick={() => setActive(i)}
              className={cn(
                'flex-1 whitespace-nowrap rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors sm:text-sm',
                i === active ? 'bg-accent text-white' : 'text-body hover:bg-white hover:text-heading',
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
