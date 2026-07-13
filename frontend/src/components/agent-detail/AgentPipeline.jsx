import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

// Signature section for agent pages — the agent's data flow rendered as a connected
// pipeline. Horizontal connected nodes on desktop, vertical timeline on mobile.
// This is the visual hallmark that sets agent pages apart from solution/industry pages.
export default function AgentPipeline({ agent }) {
  const steps = agent.flow
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="The Pipeline"
        heading={`How the ${agent.name} works`}
        sub="Every step runs autonomously, end to end — no human in the loop until one is genuinely needed."
        max="max-w-2xl"
      />

      {/* desktop: horizontal connected pipeline */}
      <div className="mt-14 hidden lg:block">
        <div className="flex items-stretch">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-1 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="group relative flex flex-1 flex-col rounded-2xl border border-line bg-surface-alt/60 p-5 transition-colors hover:border-accent/40 hover:bg-white hover:shadow-card"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-orange">
                  {i + 1}
                </span>
                <p className="mt-4 text-sm font-medium leading-relaxed text-heading">{step}</p>
                <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-body-soft">
                  step {String(i + 1).padStart(2, '0')}
                </span>
              </motion.div>

              {/* connector */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.09 + 0.2 }}
                  className="flex w-10 shrink-0 items-center justify-center"
                >
                  <ArrowRight className="h-5 w-5 text-accent/60" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* mobile: vertical timeline */}
      <div className="mt-12 lg:hidden">
        <ol className="relative space-y-4 before:absolute before:left-[19px] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-line">
          {steps.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative flex items-start gap-4"
            >
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-orange">
                {i + 1}
              </span>
              <span className="rounded-xl border border-line bg-surface-alt/60 px-4 py-3 text-sm font-medium leading-relaxed text-heading">{step}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
