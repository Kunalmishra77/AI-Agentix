import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { stack } from '../../data/technology'
import { TECH_ICONS } from './icons'

export default function TechStack() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={stack.eyebrow} heading={stack.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {stack.layers.map((l, i) => {
          const Icon = TECH_ICONS[l.icon]
          return (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="group rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.9} />}
                </span>
                <h3 className="text-base font-bold text-heading">{l.name}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {l.tools.map((t) => (
                  <span key={t} className="rounded-lg bg-surface-alt px-2.5 py-1 text-[12px] font-medium text-body">{t}</span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
