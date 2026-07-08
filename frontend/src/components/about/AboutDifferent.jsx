import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { different } from '../../data/about'

export default function AboutDifferent() {
  return (
    <Section tone="dark" id="different" className="scroll-mt-20">
      <SectionHeading eyebrow={different.eyebrow} heading={different.heading} sub={different.body} tone="dark" align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {different.items.map((d, i) => (
          <motion.article
            key={d.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-accent/50"
          >
            {/* hover glow */}
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <span className="text-5xl font-extrabold text-white/10 transition-colors group-hover:text-accent/40">0{i + 1}</span>
                <ArrowUpRight className="h-6 w-6 text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
              </div>
              <h3 className="mt-3 text-xl font-bold text-white">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.text}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-pill bg-accent/15 px-3.5 py-1.5 text-xs font-semibold text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {d.metric}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
