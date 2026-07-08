import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function SolutionProcess({ process }) {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={process.eyebrow} heading={process.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {process.steps.map((s, i) => (
          <motion.div
            key={s.no}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface-alt p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white hover:shadow-card"
          >
            <span className="pointer-events-none absolute -right-3 -top-4 text-7xl font-extrabold text-line transition-colors group-hover:text-accent/20">{s.no}</span>
            <div className="relative z-10">
              <span className="inline-flex h-9 items-center rounded-pill bg-accent px-3 text-sm font-bold text-white">{s.no}</span>
              <h3 className="mt-4 text-lg font-bold text-heading">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
