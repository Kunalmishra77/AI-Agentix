import { Check, Target } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { mission } from '../../data/about'

export default function AboutMission() {
  return (
    <Section tone="alt">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left: mission */}
        <div>
          <SectionHeading eyebrow={mission.eyebrow} heading={mission.heading} />
          <div className="mt-6 space-y-4">
            {mission.bodies.map((b) => (
              <p key={b} className="text-base leading-relaxed text-body">{b}</p>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {mission.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm font-medium text-heading">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* right: 2026 targets */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-8 md:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              aria-hidden
              style={{ backgroundImage: 'radial-gradient(50% 50% at 100% 0%, rgba(242,101,34,0.25) 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white">
                <Target className="h-4 w-4 text-accent" /> {mission.targets.title}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {mission.targets.items.map((t) => (
                  <div key={t.label} className="border-t border-white/10 pt-4">
                    <div className="text-3xl font-extrabold text-accent">{t.value}</div>
                    <p className="mt-2 text-sm leading-snug text-ink-muted">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
