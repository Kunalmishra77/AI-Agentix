import { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ArrowRight, Clock, TrendingUp } from 'lucide-react'
import Section from '../common/Section'
import { categories, items } from '../../data/solutions'
import { SOLUTION_ICONS } from './icons'
import { cn } from '../../lib/cn'

const SolutionCard = forwardRef(function SolutionCard({ s }, ref) {
  const Icon = SOLUTION_ICONS[s.icon]
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3, ease: [0.21, 0.5, 0.25, 1] }}
      className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover md:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <span className="rounded-pill border border-line px-3 py-1 text-[11px] font-semibold text-body-soft">{s.category}</span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-heading">{s.name}</h3>
      <p className="mt-1 text-sm font-semibold text-accent">{s.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-body">{s.desc}</p>

      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {s.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] text-body">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-pill bg-ink px-3 py-1.5 text-xs font-semibold text-white">{s.stat}</span>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-alt px-3 py-1.5 text-xs font-semibold text-body">
            <Clock className="h-3.5 w-3.5 text-accent" /> {s.time}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-surface-alt px-3 py-1.5 text-xs font-semibold text-body">
            <TrendingUp className="h-3.5 w-3.5 text-accent" /> {s.roi} ROI
          </span>
        </div>
        <Link to="/contact" className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-heading transition-colors hover:text-accent">
          Get Started
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  )
})

export default function SolutionsCatalog() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? items : items.filter((s) => s.category === cat)

  return (
    <Section tone="alt" id="catalog" className="scroll-mt-20">
      {/* filter pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'rounded-pill px-4 py-2 text-sm font-semibold transition-all',
              cat === c ? 'bg-accent text-white shadow-orange' : 'border border-line bg-white text-body hover:border-accent/50 hover:text-heading',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((s) => (
            <SolutionCard key={s.name} s={s} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
