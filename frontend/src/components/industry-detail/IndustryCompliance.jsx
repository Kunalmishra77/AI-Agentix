import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { CAP_ICONS } from '../solution-detail/icons'

export default function IndustryCompliance({ compliance, tone = 'white' }) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={compliance.eyebrow} heading={compliance.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {compliance.items.map((c, i) => {
          const Icon = CAP_ICONS[c.icon] || ShieldCheck
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              className="group rounded-2xl border border-line bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon className="h-7 w-7" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-base font-bold text-heading">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{c.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
