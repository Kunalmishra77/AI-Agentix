import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { journey } from '../../data/about'
import { cn } from '../../lib/cn'

export default function AboutJourney() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.4', 'end 0.65'] })
  const fill = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.4 })

  return (
    <Section tone="dark" className="relative overflow-hidden">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />
      <div className="relative">
        <SectionHeading eyebrow={journey.eyebrow} heading={journey.heading} tone="dark" align="center" max="max-w-2xl" className="mx-auto" />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* track + scroll-driven fill */}
          <div className="absolute bottom-6 left-[22px] top-3 w-[3px] -translate-x-1/2 rounded-full bg-white/10 md:left-7" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute bottom-6 left-[22px] top-3 w-[3px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-accent to-accent-hover md:left-7"
          />

          <div className="space-y-6">
            {journey.milestones.map((m, i) => {
              const last = i === journey.milestones.length - 1
              return (
                <div key={m.date} className="relative pl-16 md:pl-24">
                  {/* node */}
                  <div
                    className={cn(
                      'absolute left-[22px] top-1 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 text-sm font-extrabold shadow-lg md:left-7',
                      last ? 'border-accent bg-accent text-white' : 'border-accent/60 bg-ink text-accent',
                    )}
                  >
                    {last ? <ArrowUpRight className="h-5 w-5" /> : String(i + 1).padStart(2, '0')}
                    {last && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.06] md:p-7"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-pill bg-accent/15 px-3 py-1 text-xs font-bold text-accent">{m.date}</span>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-white">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.text}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
