import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function IndustryChallenges({ challenges, tone = 'alt' }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={challenges.eyebrow} heading={challenges.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {challenges.items.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_24px_55px_-22px_rgba(242,101,34,0.4)]"
          >
            {/* accent hairline wipes in on hover */}
            <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-red-400 to-accent transition-transform duration-300 group-hover:scale-x-100" aria-hidden />

            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <AlertCircle className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-display text-4xl font-extrabold text-line transition-colors duration-300 group-hover:text-accent/30">0{i + 1}</span>
            </div>

            <h3 className="mt-5 text-base font-bold text-heading">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
