import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function IndustryProof({ proof, tone = 'white' }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={proof.eyebrow} heading={proof.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {proof.items.map((r, i) => (
          <motion.article
            key={r.stat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_24px_60px_-20px_rgba(242,101,34,0.35)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{r.tag}</span>
              <Quote className="h-6 w-6 text-accent/30 transition-colors duration-300 group-hover:text-accent/60" />
            </div>
            <p className="mt-6 font-display text-2xl font-extrabold leading-tight text-heading">{r.stat}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{r.text}</p>
            <div className="mt-6 border-t border-line pt-4 text-xs font-semibold text-accent">{r.meta}</div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
