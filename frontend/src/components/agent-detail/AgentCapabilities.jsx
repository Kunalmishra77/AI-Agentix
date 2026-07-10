import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

// "What it handles" — outcome-led checklist. Two-column on desktop, distinct from
// the solution pages' icon-card grid.
export default function AgentCapabilities({ agent }) {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="Capabilities"
        heading={`What the ${agent.name} handles for you`}
        sub="The work it takes off your team's plate — running quietly in the background, every day."
        max="max-w-2xl"
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-5">
        {agent.capabilities.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
            className="group flex gap-4 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card"
          >
            <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
            <div>
              <h3 className="text-base font-bold text-heading">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
