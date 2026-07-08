import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { journey } from '../../data/about'
import { cn } from '../../lib/cn'

export default function AboutJourney() {
  return (
    <Section tone="dark">
      <SectionHeading eyebrow={journey.eyebrow} heading={journey.heading} tone="dark" align="center" max="max-w-2xl" className="mx-auto" />

      <div className="relative mx-auto mt-16 max-w-4xl">
        {/* center line */}
        <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-accent/60 via-white/15 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-8 md:space-y-4">
          {journey.milestones.map((m, i) => {
            const right = i % 2 === 1
            return (
              <div key={m.date} className="relative md:grid md:grid-cols-2 md:gap-12">
                {/* dot */}
                <span className="absolute left-5 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-accent ring-4 ring-accent/20 md:left-1/2" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    'ml-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-accent/40 md:ml-0',
                    right ? 'md:col-start-2 md:text-left' : 'md:col-start-1 md:text-right',
                  )}
                >
                  <span className="inline-block rounded-pill bg-accent/15 px-3 py-1 text-xs font-bold text-accent">{m.date}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.text}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
