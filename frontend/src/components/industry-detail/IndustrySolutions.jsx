import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Placeholder from '../common/Placeholder'
import { cn } from '../../lib/cn'

/**
 * Zig-zag storytelling layout — the signature Industries treatment.
 * Alternating image / text rows, one per AI solution.
 */
export default function IndustrySolutions({ solutions, tone = 'white' }) {
  return (
    <Section tone={tone} className="overflow-hidden">
      <SectionHeading eyebrow={solutions.eyebrow} heading={solutions.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-14 space-y-14 md:space-y-20">
        {solutions.items.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <div key={s.name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              {/* image */}
              <motion.div
                initial={{ opacity: 0, x: flip ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease: [0.21, 0.5, 0.25, 1] }}
                className={cn('group relative overflow-hidden rounded-3xl border border-line shadow-float', flip && 'lg:order-2')}
              >
                <div className="relative aspect-[16/11]">
                  {s.image ? (
                    <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <Placeholder label={`industry-solution-visual: ${s.name}`} dark className="h-full w-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
                  <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-extrabold text-white shadow-orange">
                    0{i + 1}
                  </span>
                  <span className="absolute bottom-5 left-5 rounded-pill bg-white/95 px-3.5 py-1.5 text-xs font-bold text-heading shadow">
                    {s.name}
                  </span>
                </div>
              </motion.div>

              {/* text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className={cn(flip && 'lg:order-1')}
              >
                <span className="eyebrow mb-3">
                  <span className="h-px w-6 bg-accent" aria-hidden />
                  Solution 0{i + 1}
                </span>
                <h3 className="text-2xl font-bold text-heading md:text-[1.7rem]">{s.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-body">{s.desc}</p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-heading transition-colors hover:border-accent/40">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
