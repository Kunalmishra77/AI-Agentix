import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plug, ArrowUpRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'

// Tools this specific agent plugs into. Chip grid, alt tone.
export default function AgentIntegrations({ agent }) {
  return (
    <Section tone="alt">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Integrations"
          heading={`Plugs into your ${agent.role.split(' & ')[0].toLowerCase()} stack`}
          sub="Works with the tools you already run — no rip-and-replace."
          max="max-w-xl"
        />
        <Link to="/technology" className="btn-ghost shrink-0 whitespace-nowrap">
          See all 300+ integrations <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {agent.integrations.map((tool, i) => (
          <motion.span
            key={tool}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Plug className="h-3.5 w-3.5 text-accent" strokeWidth={2} />
            {tool}
          </motion.span>
        ))}
        <span className="inline-flex items-center rounded-pill border border-dashed border-body-soft/40 bg-transparent px-4 py-2.5 text-sm font-medium text-body-soft">
          + more on request
        </span>
      </div>
    </Section>
  )
}
