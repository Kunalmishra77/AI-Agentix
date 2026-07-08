import { motion } from 'framer-motion'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { different } from '../../data/about'

export default function AboutDifferent() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={different.eyebrow} heading={different.heading} sub={different.body} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {different.items.map((d, i) => (
          <motion.article
            key={d.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface-alt p-8 transition-colors hover:border-accent/40"
          >
            <span className="text-5xl font-extrabold text-line transition-colors group-hover:text-accent/30">0{i + 1}</span>
            <h3 className="mt-3 text-xl font-bold text-heading">{d.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{d.text}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-pill bg-ink px-3.5 py-1.5 text-xs font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {d.metric}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
