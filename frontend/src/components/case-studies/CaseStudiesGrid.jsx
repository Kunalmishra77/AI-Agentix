import { useState, useMemo, forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import Section from '../common/Section'
import CaseStudyModal from './CaseStudyModal'
import { filters, items } from '../../data/caseStudies'
import { cn } from '../../lib/cn'

const PAGE = 9

const Card = forwardRef(function Card({ s, onOpen }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-card-hover"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-body-soft">
        <span className="rounded-pill bg-accent-soft px-2.5 py-1 font-bold text-accent">{s.industry}</span>
        <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {s.location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {s.readTime}</span>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-heading">{s.tagline}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{s.excerpt}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-line bg-surface-alt/50 p-3">
        {s.stats.slice(0, 2).map((st) => (
          <div key={st.label}>
            <div className="font-display text-xl font-extrabold text-accent">{st.value}</div>
            <div className="mt-0.5 text-[11px] font-semibold leading-tight text-heading">{st.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {s.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-pill bg-surface-alt px-2.5 py-1 text-[11px] font-medium text-body">{t}</span>
        ))}
      </div>

      <button onClick={() => onOpen(s)} className="group/link mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-heading transition-colors hover:text-accent">
        Read Case Study
        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
      </button>
    </motion.article>
  )
})

export default function CaseStudiesGrid() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => (filter === 'All' ? items : items.filter((s) => s.industry === filter)), [filter])
  const visible = expanded ? filtered : filtered.slice(0, PAGE)
  const heading = filter === 'All'
    ? `All Case Studies (${filtered.length})`
    : `${filter} — ${filtered.length} Case ${filtered.length === 1 ? 'Study' : 'Studies'}`

  const switchFilter = (f) => { setFilter(f); setExpanded(false) }

  return (
    <Section tone="alt" id="cases" className="scroll-mt-20">
      {/* filter pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => switchFilter(f)}
            className={cn(
              'rounded-pill px-4 py-2 text-sm font-semibold transition-all',
              filter === f ? 'bg-accent text-white shadow-orange' : 'border border-line bg-white text-body hover:border-accent/50 hover:text-heading',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 flex items-end justify-between">
        <h2 className="text-h2 text-heading">{heading}</h2>
        <span className="hidden text-sm text-body-soft sm:block">Click any card to read the full article</span>
      </div>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((s) => <Card key={s.id} s={s} onOpen={setSelected} />)}
        </AnimatePresence>
      </motion.div>

      {filtered.length > PAGE && (
        <div className="mt-10 text-center">
          <button onClick={() => setExpanded((v) => !v)} className="btn-outline">
            {expanded ? <>Read Less <ChevronUp className="h-4 w-4" /></> : <>Read More ({filtered.length - PAGE} more) <ChevronDown className="h-4 w-4" /></>}
          </button>
        </div>
      )}

      <AnimatePresence>
        {selected && <CaseStudyModal study={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </Section>
  )
}
