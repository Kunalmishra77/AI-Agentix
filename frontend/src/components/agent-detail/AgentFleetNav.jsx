import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { agentIndex } from '../../data/agents'
import { TECH_ICONS } from '../technology/icons'

// Cross-links to the other agents in the fleet — discoverability + the "spec sheet"
// feel of browsing a catalogue. Excludes the current agent.
export default function AgentFleetNav({ currentSlug }) {
  const others = agentIndex.filter((a) => a.slug !== currentSlug)
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="The Agent Fleet"
        heading="Explore the rest of the fleet"
        sub="Eight specialised agents, one unified platform. Mix and match to automate end to end."
        max="max-w-2xl"
      />
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((a) => {
          const Icon = TECH_ICONS[a.icon]
          return (
            <Link
              key={a.slug}
              to={`/technology/${a.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-bold text-heading transition-colors group-hover:text-accent">{a.name}</div>
                <div className="truncate text-xs text-body-soft">{a.role}</div>
              </div>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-body-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          )
        })}
      </div>
    </Section>
  )
}
