import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { security } from '../../data/technology'
import { TECH_ICONS } from './icons'

export default function TechSecurity() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={security.eyebrow} heading={security.heading} sub={security.body} max="max-w-2xl" />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {security.items.map((s, i) => {
          const Icon = TECH_ICONS[s.icon]
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="group rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {Icon && <Icon className="h-6 w-6" strokeWidth={1.8} />}
              </span>
              <h3 className="mt-4 text-base font-bold text-heading">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{s.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
