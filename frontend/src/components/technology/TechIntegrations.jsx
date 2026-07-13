import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { integrations } from '../../data/technology'

export default function TechIntegrations() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={integrations.eyebrow} heading={integrations.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {integrations.categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
            className="rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-card"
          >
            <h3 className="text-sm font-bold uppercase tracking-wide text-accent">{c.name}</h3>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {c.tools.map((t) => (
                <span key={t} className="rounded-pill border border-line bg-surface-alt px-3 py-1.5 text-xs font-medium text-heading">{t}</span>
              ))}
              <span className="inline-flex items-center gap-1 rounded-pill border border-dashed border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent">
                <Plus className="h-3 w-3" strokeWidth={2.5} /> More on request
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
