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
      <SectionHeading eyebrow={team.eyebrow} heading={team.heading} max="max-w-2xl" />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.members.map((m, i) => (
          <Reveal key={m.name} delay={(i % 4) * 0.08}>
            <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
              {/* gradient banner + overlapping ring avatar */}
              <div className="relative h-20 bg-gradient-to-br from-ink to-ink-700 transition-colors group-hover:from-accent group-hover:to-accent-hover">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  aria-hidden
                  style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)', backgroundSize: '22px 22px' }}
                />
                <div
                  className="absolute left-1/2 top-full flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-[3px]"
                  style={{ background: 'conic-gradient(from 180deg, #F26522, #FCE0D0, #F26522)' }}
                  data-asset={`team-photo: ${m.name}`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-ink text-lg font-bold text-white">
                    {initials(m.name)}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
                <h3 className="text-base font-bold text-heading">{m.name}</h3>
                <p className="text-sm font-semibold text-accent">{m.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-body">{m.bio}</p>
                <span className="mx-auto mt-5 flex h-8 w-8 items-center justify-center rounded-full border border-line text-body-soft transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
