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
            <article className="group h-full overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              {/* photo area — swap to <img> when a headshot is provided */}
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-alt">
                {m.image ? (
                  <img
                    src={m.image}
                    alt={m.pending ? '' : m.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-alt to-white">
                    {/* subtle brand glow */}
                    <div
                      className="absolute inset-0 opacity-70"
                      aria-hidden
                      style={{ backgroundImage: 'radial-gradient(55% 55% at 50% 30%, rgba(242,101,34,0.10) 0%, transparent 65%)' }}
                    />
                    {m.pending ? (
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-accent shadow-card ring-1 ring-line">
                        <User className="h-9 w-9" strokeWidth={1.6} />
                      </span>
                    ) : (
                      <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover text-2xl font-extrabold text-white shadow-float">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                )}
                {m.pending && (
                  <span className="absolute left-3 top-3 rounded-pill bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-body-soft backdrop-blur">
                    Coming soon
                  </span>
                )}
              </div>

              {/* identity */}
              <div className="p-5">
                <h3 className={m.pending ? 'text-lg font-bold text-body-soft' : 'text-lg font-bold text-heading'}>
                  {m.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-accent">{m.role}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
