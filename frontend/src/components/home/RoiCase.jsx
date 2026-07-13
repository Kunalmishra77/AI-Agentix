import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { roi } from '../../data/home'

export default function RoiCase() {
  return (
    <Section tone="white">
      <SectionHeading variant="stacked" eyebrow={roi.eyebrow} heading={roi.heading} sub={roi.sub} max="max-w-2xl" />

      <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
        {roi.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="flex min-w-0 flex-col items-center bg-white p-4 text-center sm:p-6 md:p-7"
          >
            <div className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl md:text-5xl">{s.value}</div>
            <div className="mt-2 text-sm font-semibold text-heading">{s.label}</div>
            <div className="mt-1 text-xs text-body-soft">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
