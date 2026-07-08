import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { cn } from '../../lib/cn'

/**
 * Zig-zag storytelling layout — the signature Industries treatment.
 * Alternating image / text rows, one per AI solution.
 */
export default function IndustrySolutions({ solutions, tone = 'white' }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={solutions.eyebrow} heading={solutions.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-14 space-y-16 md:space-y-24">
        {solutions.items.map((s, i) => {
          const flip = i % 2 === 1
          return (
            <div key={s.name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              {/* image */}
              <motion.div
                initial={{ opacity: 0, x: flip ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className={cn('group relative overflow-hidden rounded-3xl border border-line shadow-float', flip && 'lg:order-2')}
              >
                <div className="relative aspect-[4/3]">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-extrabold text-white shadow-orange">
                    0{i + 1}
                  </span>
                </div>
              </motion.div>

              {/* text */}
              <motion.div
                initial={{ opacity: 0, x: flip ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(flip && 'lg:order-1')}
              >
                <h3 className="text-2xl font-bold text-heading md:text-3xl">{s.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-body">{s.desc}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm font-medium text-heading">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Check className="h-3 w-3" strokeWidth={3} />
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
