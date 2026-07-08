import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { Plug } from 'lucide-react'

export default function SolutionIntegrations({ integrations }) {
  return (
    <Section tone="alt">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow={integrations.eyebrow} heading={integrations.heading} sub={integrations.body} />
        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {integrations.tools.map((t) => (
              <div
                key={t}
                className="group flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-heading transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-card"
                data-asset={`integration-logo: ${t}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Plug className="h-4 w-4" />
                </span>
                <span className="truncate">{t}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
