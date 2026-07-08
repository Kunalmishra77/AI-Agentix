import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

function mono(name) {
  const parts = name.split(/[\s&]+/).filter(Boolean)
  return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

export default function SolutionIntegrations({ integrations }) {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={integrations.eyebrow} heading={integrations.heading} sub={integrations.body} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {integrations.tools.map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
            data-asset={`integration-logo: ${t}`}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:bg-accent-soft hover:shadow-[0_18px_40px_-16px_rgba(242,101,34,0.4)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-hover text-xs font-extrabold text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {mono(t)}
            </span>
            <span className="truncate text-sm font-semibold text-heading transition-colors duration-300 group-hover:text-accent-hover">{t}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
