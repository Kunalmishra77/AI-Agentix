import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import Section from '../common/Section'
import { CAP_ICONS } from '../solution-detail/icons'

export default function IndustryCompliance({ compliance, tone = 'white' }) {
  return (
    <Section tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* left: heading + shield motif */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow mb-4">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {compliance.eyebrow}
          </span>
          <h2 className="text-h2 max-w-md text-heading">{compliance.heading}</h2>
          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-line bg-surface-alt/50 p-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-hover text-white shadow-orange">
              <ShieldCheck className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <p className="text-sm leading-relaxed text-body">
              Enterprise-grade security and India-first compliance, built into every workflow — not bolted on.
            </p>
          </div>
        </div>

        {/* right: badge grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {compliance.items.map((c, i) => {
            const Icon = CAP_ICONS[c.icon] || ShieldCheck
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_20px_50px_-20px_rgba(242,101,34,0.35)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-base font-bold text-heading">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-body">{c.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
