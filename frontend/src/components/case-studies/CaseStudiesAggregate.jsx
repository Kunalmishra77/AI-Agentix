import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { aggregate } from '../../data/caseStudies'

export default function CaseStudiesAggregate() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={aggregate.eyebrow} heading={aggregate.heading} align="center" max="max-w-2xl" className="mx-auto" />
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
        {aggregate.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-line bg-surface-alt/40 p-6 text-center"
          >
            <div className="font-display text-3xl font-extrabold tracking-tight text-accent md:text-4xl">{s.value}</div>
            <div className="mt-1.5 text-sm font-semibold text-heading">{s.label}</div>
            <div className="mt-0.5 text-xs text-body-soft">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
