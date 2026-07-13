import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function IndustrySegments({ segments, tone = 'alt' }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={segments.eyebrow} heading={segments.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {segments.items.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
            className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
          >
            <div>
              <h3 className="text-base font-bold text-heading">{s.name}</h3>
              {s.desc && <p className="mt-1.5 text-sm leading-relaxed text-body">{s.desc}</p>}
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-line transition-colors duration-300 group-hover:text-accent" />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
