import { User } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { leadership } from '../../data/about'

// Derive initials for confirmed members (elegant placeholder until photos arrive).
function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

// Small circular avatar — real photo when provided, else initials (confirmed)
// or a neutral icon (pending). Kept intentionally compact so the bio leads.
function Avatar({ m }) {
  if (m.image) {
    return (
      <img
        src={m.image}
        alt={m.pending ? '' : m.name}
        className="h-20 w-20 rounded-full object-cover ring-2 ring-accent-soft"
      />
    )
  }
  if (m.pending) {
    return (
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-alt text-accent ring-1 ring-line">
        <User className="h-8 w-8" strokeWidth={1.6} />
      </span>
    )
  }
  return (
    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover text-xl font-extrabold text-white shadow-orange">
      {initials(m.name)}
    </span>
  )
}

export default function AboutLeadership() {
  return (
    <Section tone="white" id="leadership" className="scroll-mt-20">
      <SectionHeading
        eyebrow={leadership.eyebrow}
        heading={leadership.heading}
        sub={leadership.sub}
        align="center"
        max="max-w-2xl"
        className="mx-auto"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {leadership.members.map((m, i) => (
          <Reveal key={`${m.role}-${i}`} delay={(i % 4) * 0.08}>
            <article className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <Avatar m={m} />

              <h3 className={`mt-4 text-lg font-bold ${m.pending ? 'text-body-soft' : 'text-heading'}`}>
                {m.name}
              </h3>
              <p className="mt-1 text-sm font-semibold leading-snug text-accent">{m.role}</p>

              {m.bio ? (
                <p className="mt-4 text-sm leading-relaxed text-body">{m.bio}</p>
              ) : m.pending ? (
                <p className="mt-4 text-sm leading-relaxed text-body-soft">Profile details coming soon.</p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
