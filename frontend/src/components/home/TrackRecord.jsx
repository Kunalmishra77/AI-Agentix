import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { trackRecord } from '../../data/home'

export default function TrackRecord() {
  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow={trackRecord.eyebrow}
        heading={trackRecord.heading}
        sub={trackRecord.sub}
        tone="dark"
        align="center"
        max="max-w-2xl"
        className="mx-auto"
      />

      <div className="mt-14 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {trackRecord.stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="min-w-0 border-l border-white/10 px-3 first:border-l-0 sm:px-6 lg:px-8"
          >
            <div className="text-4xl font-extrabold tracking-tight text-accent sm:text-5xl md:text-6xl">{s.value}</div>
            <div className="mt-3 text-base font-semibold text-white">{s.label}</div>
            <div className="mt-1 text-sm text-ink-muted">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
