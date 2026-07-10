import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

// "Under the hood" — the models / APIs powering this agent, rendered as a numbered
// spec table with a mono index. Engineering aesthetic, distinct from other pages.
export default function AgentStack({ agent }) {
  return (
    <Section tone="white">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Under the Hood"
            heading="The technology powering it"
            sub="No off-the-shelf wrapper. Every agent is built on a battle-tested, best-in-class stack."
            max="max-w-md"
          />
          <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-line bg-surface-alt px-5 py-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-accent">
              <Cpu className="h-5 w-5" />
            </span>
            <p className="text-sm text-body">
              <span className="font-semibold text-heading">Hosted in India</span> · AWS Mumbai (ap-south-1)
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line">
          {agent.tech.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.35, delay: i * 0.07 }}
              className="flex items-center gap-5 border-b border-line bg-white px-5 py-5 last:border-b-0 transition-colors hover:bg-surface-alt/60 md:px-7"
            >
              <span className="font-mono text-xs font-semibold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-base font-semibold text-heading">{t}</span>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
