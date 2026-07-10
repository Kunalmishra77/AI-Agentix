import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import { closingCta } from '../../data/caseStudies'

export default function CaseStudiesCta() {
  return (
    <Section tone="alt">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-center text-white md:px-12 md:py-16"
      >
        <div className="pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" aria-hidden />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">{closingCta.heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{closingCta.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {closingCta.ctas.map((c) => (
              <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}>
                {c.primary && <ArrowRight className="h-4 w-4" />}
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
