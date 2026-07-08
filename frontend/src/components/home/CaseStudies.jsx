import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import Section from '../common/Section'
import Placeholder from '../common/Placeholder'
import Reveal from '../common/Reveal'
import { caseStudies } from '../../data/home'
import { cn } from '../../lib/cn'

export default function CaseStudies() {
  const items = caseStudies.items
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const c = items[active]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(id)
  }, [paused, items.length])

  const go = (dir) => setActive((i) => (i + dir + items.length) % items.length)

  return (
    <Section tone="dark">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <span className="eyebrow mb-4">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {caseStudies.eyebrow}
          </span>
          <h2 className="text-h2 max-w-2xl text-white">{caseStudies.heading}</h2>
        </Reveal>
        <Link to="/case-studies" className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white hover:text-accent">
          View all case studies
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div
        className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="group relative overflow-hidden rounded-2xl"
          >
            <Placeholder
              label={`case-study-image: ${c.client}`}
              dark
              ratio="4/3"
              className="transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-4 right-4 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-heading shadow">
              {c.industry}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* content */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-white md:text-3xl">{c.client}</h3>
              <div className="mt-5 space-y-3">
                <p className="text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-white/90">Challenge: </span>{c.challenge}
                </p>
                <p className="text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-white/90">Solution: </span>{c.solution}
                </p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {c.stats.map((s) => (
                  <div key={s.k}>
                    <div className="text-2xl font-extrabold text-accent md:text-3xl">{s.v}</div>
                    <div className="mt-1 text-[11px] leading-tight text-ink-muted">{s.k}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* controls */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous case study" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:bg-accent">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button onClick={() => go(1)} aria-label="Next case study" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:bg-accent">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((x, i) => (
                <button
                  key={x.client}
                  onClick={() => setActive(i)}
                  aria-label={x.client}
                  className={cn('h-2 rounded-full transition-all', i === active ? 'w-7 bg-accent' : 'w-2 bg-white/25 hover:bg-white/45')}
                />
              ))}
            </div>
            <span className="ml-auto text-xs font-medium text-ink-muted">
              {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </Section>
  )
}
