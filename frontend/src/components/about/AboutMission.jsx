import Placeholder from '../common/Placeholder'
import { Check, Target } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { mission } from '../../data/about'

export default function AboutMission() {
  return (
    <Section tone="alt" id="mission" className="scroll-mt-20">
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

        {/* right: image by default, hover reveals the 2026 targets */}
        <Reveal>
          <div className="group relative h-[420px] overflow-hidden rounded-3xl md:h-[460px]" data-asset="about-mission-image">
            {/* image (pending designer asset) */}
            <Placeholder label="about-mission-image" dark className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
            {/* default state (lg): bottom gradient + badge + hint */}
            <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/85 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-0 lg:block" />
            <div className="absolute inset-x-6 bottom-6 hidden items-center justify-between transition-opacity duration-300 group-hover:opacity-0 lg:flex">
              <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Target className="h-4 w-4 text-accent" /> {mission.targets.title}
              </span>
              <span className="text-xs font-medium text-white/70">Hover to view →</span>
            </div>

            {/* hover overlay: targets (always shown on mobile, reveal on hover ≥lg) */}
            <div className="absolute inset-0 flex flex-col justify-center bg-ink/95 p-8 opacity-100 transition-opacity duration-300 lg:p-10 lg:opacity-0 lg:group-hover:opacity-100">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                aria-hidden
                style={{ backgroundImage: 'radial-gradient(50% 50% at 100% 0%, rgba(242,101,34,0.25) 0%, transparent 60%)' }}
              />
              <div className="relative z-10">
                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white">
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
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
