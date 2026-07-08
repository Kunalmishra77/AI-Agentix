import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function IndustryChallenges({ challenges, tone = 'alt' }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={challenges.eyebrow} heading={challenges.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {challenges.items.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
          >
            {/* pain-point accent hairline */}
            <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-red-400/70 to-accent" aria-hidden />
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <AlertCircle className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-3xl font-extrabold text-line">0{i + 1}</span>
            </div>
            <h3 className="mt-4 text-base font-bold text-heading">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
