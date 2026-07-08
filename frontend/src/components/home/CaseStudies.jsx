import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import Placeholder from '../common/Placeholder'
import Reveal from '../common/Reveal'
import { caseStudies } from '../../data/home'
import { cn } from '../../lib/cn'

export default function CaseStudies() {
  const [active, setActive] = useState(0)
  const c = caseStudies.items[active]

  return (
    <Section tone="dark">
      <Reveal>
        <span className="eyebrow mb-4">
          <span className="h-px w-6 bg-accent" aria-hidden />
          {caseStudies.eyebrow}
        </span>
        <h2 className="text-h2 max-w-2xl text-white">{caseStudies.heading}</h2>
      </Reveal>

      <div className="mt-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* image (left) */}
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

        {/* content (right) */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-3xl font-bold text-white">{c.client}</h3>
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
                    <div className="text-3xl font-extrabold text-accent">{s.v}</div>
                    <div className="mt-1 text-[11px] leading-tight text-ink-muted">{s.k}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* switcher */}
          <div className="mt-8 flex items-center gap-3">
            {caseStudies.items.map((x, i) => (
              <button
                key={x.client}
                onClick={() => setActive(i)}
                aria-label={x.client}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === active ? 'w-8 bg-accent' : 'w-2 bg-white/30 hover:bg-white/50',
                )}
              />
            ))}
            <Link to="/case-studies" className="group ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-accent">
              View all case studies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
