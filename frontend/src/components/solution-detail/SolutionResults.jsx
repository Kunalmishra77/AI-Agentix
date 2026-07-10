import { motion } from 'framer-motion'
import { ArrowUpRight, Quote } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

export default function SolutionResults({ results }) {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={results.eyebrow} heading={results.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {results.items.map((r, i) => (
          <motion.article
            key={r.stat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_24px_60px_-20px_rgba(242,101,34,0.35)]"
          >
            {/* orange top bar grows on hover */}
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-hover transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
            {/* soft corner glow on hover */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between">
                <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{r.tag}</span>
                <Quote className="h-6 w-6 text-accent/30 transition-colors duration-300 group-hover:text-accent/60" />
              </div>
              <p className="mt-6 bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-2xl font-extrabold leading-tight text-transparent">
                {r.stat}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{r.text}</p>
              <div className="mt-6 flex items-center gap-2 border-t border-line pt-4">
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="text-xs font-semibold text-heading">{r.meta}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
