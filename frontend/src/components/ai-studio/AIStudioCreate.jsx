import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { create } from '../../data/aiStudio'
import { STUDIO_ICONS } from './icons'

export default function AIStudioCreate() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={create.eyebrow} heading={create.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {create.items.map((c, i) => {
          const Icon = STUDIO_ICONS[c.icon]
          return (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                {Icon && <Icon className="h-5 w-5" strokeWidth={1.9} />}
              </span>
              <h3 className="mt-4 text-base font-bold text-heading">{c.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{c.desc}</p>
              <p className="mt-4 rounded-lg bg-surface-alt px-3 py-2 text-xs italic leading-relaxed text-body-soft">
                <span className="font-semibold not-italic text-accent">e.g.</span> {c.eg}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
