import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { journey } from '../../data/about'
import { cn } from '../../lib/cn'

export default function AboutJourney() {
  const items = journey.milestones
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const m = items[active]

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % items.length), 3200)
    return () => clearInterval(id)
  }, [paused, items.length])

  return (
    <Section tone="dark" id="journey" className="relative flex min-h-screen scroll-mt-20 flex-col justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[130px]"
        aria-hidden
      />
      <div className="relative">
        <SectionHeading eyebrow={journey.eyebrow} heading={journey.heading} tone="dark" align="center" max="max-w-2xl" className="mx-auto" />

        <div
          className="mx-auto mt-14 max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* horizontal node track */}
          <div className="relative px-2">
            <div className="absolute inset-x-2 top-[13px] h-[3px] rounded-full bg-white/10" />
            <div
              className="absolute left-2 top-[13px] h-[3px] rounded-full bg-gradient-to-r from-accent to-accent-hover transition-[width] duration-500 ease-in-out"
              style={{ width: `calc(${(active / (items.length - 1)) * 100}% - 8px)` }}
            />
            <div className="relative flex justify-between">
              {items.map((it, i) => (
                <button
                  key={it.date}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-center gap-3"
                  aria-label={`${it.date} — ${it.title}`}
                >
                  <span
                    className={cn(
                      'h-7 w-7 rounded-full border-2 transition-all duration-300',
                      i <= active ? 'border-accent bg-accent' : 'border-white/25 bg-ink group-hover:border-accent/60',
                      i === active && 'scale-125 shadow-orange ring-4 ring-accent/25',
                    )}
                  />
                  <span className={cn('whitespace-nowrap text-[11px] font-semibold transition-colors sm:text-xs', i === active ? 'text-accent' : 'text-ink-muted')}>
                    {it.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* active milestone card */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.21, 0.5, 0.25, 1] }}
                className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
              >
                <span className="pointer-events-none absolute -right-6 -top-10 text-[9rem] font-extrabold leading-none text-white/[0.04]">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <div className="relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-pill bg-accent/15 px-3.5 py-1.5 text-sm font-bold text-accent">{m.date}</span>
                    <span className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                      Step {active + 1} of {items.length}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">{m.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">{m.text}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  )
}
