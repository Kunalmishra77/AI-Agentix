import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function SolutionProcess({ process, tone = 'white' }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={process.eyebrow} heading={process.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {process.steps.map((s, i) => (
          <motion.div
            key={s.no}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface-alt p-7 transition-colors duration-300 hover:bg-accent"
          >
            <span className="pointer-events-none absolute -right-3 -top-5 text-8xl font-extrabold text-line transition-colors duration-300 group-hover:text-white/15">
              {s.no}
            </span>
            <div className="relative z-10">
              <span className="inline-flex h-9 items-center rounded-pill bg-accent px-3 text-sm font-bold text-white transition-colors group-hover:bg-white group-hover:text-accent">
                Step {s.no}
              </span>
              <h3 className="mt-4 text-lg font-bold text-heading transition-colors group-hover:text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body transition-colors group-hover:text-white/90">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
