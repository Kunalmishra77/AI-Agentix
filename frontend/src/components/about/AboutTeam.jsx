import { Linkedin } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { team } from '../../data/about'

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('')
}

export default function AboutTeam() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={team.eyebrow} heading={team.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.members.map((m, i) => (
          <Reveal key={m.name} delay={(i % 4) * 0.08}>
            <article className="group flex h-full flex-col items-center rounded-card border border-line bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
              {/* ring avatar (photo placeholder) */}
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full p-[3px]"
                style={{ background: 'conic-gradient(from 180deg, #F26522, #FCE0D0, #F26522)' }}
                data-asset={`team-photo: ${m.name}`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-ink text-xl font-bold text-white">
                  {initials(m.name)}
                </div>
              </div>
              <h3 className="mt-5 text-base font-bold text-heading">{m.name}</h3>
              <p className="text-sm font-semibold text-accent">{m.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-body">{m.bio}</p>
              <span className="mt-4 flex h-8 w-8 items-center justify-center rounded-full border border-line text-body-soft transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <Linkedin className="h-4 w-4" />
              </span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
