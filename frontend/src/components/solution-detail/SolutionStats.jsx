import { motion } from 'framer-motion'
import Section from '../common/Section'

export default function SolutionStats({ stats }) {
  return (
    <Section tone="white" className="py-12 md:py-14">
      <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="border-l border-line px-6 first:border-l-0 lg:px-8"
          >
            <div className="text-4xl font-extrabold tracking-tight text-accent md:text-5xl">{s.value}</div>
            <div className="mt-2 text-sm font-semibold text-heading">{s.label}</div>
            {s.sub && <div className="mt-0.5 text-xs text-body-soft">{s.sub}</div>}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
