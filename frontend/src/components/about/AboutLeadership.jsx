import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { User, X, ArrowRight } from 'lucide-react'
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

// Circular avatar — real photo when provided, else initials (confirmed) or icon (pending).
function Avatar({ m, size = 'md' }) {
  const dim = size === 'lg' ? 'h-24 w-24 text-2xl' : 'h-16 w-16 text-lg'
  const icon = size === 'lg' ? 'h-10 w-10' : 'h-7 w-7'
  if (m.image) {
    return <img src={m.image} alt={m.pending ? '' : m.name} className={`${dim} rounded-full object-cover ring-2 ring-accent-soft`} />
  }
  if (m.pending) {
    return (
      <span className={`${dim} flex items-center justify-center rounded-full bg-surface-alt text-accent ring-1 ring-line`}>
        <User className={icon} strokeWidth={1.6} />
      </span>
    )
  }
  return (
    <span className={`${dim} flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover font-extrabold text-white shadow-orange`}>
      {initials(m.name)}
    </span>
  )
}

export default function AboutLeadership() {
  // Full bios live in a modal, so the card grid stays perfectly uniform no
  // matter how long any single bio is.
  const [active, setActive] = useState(null)
  const member = active != null ? leadership.members[active] : null

  useEffect(() => {
    if (member == null) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [member])

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

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {leadership.members.map((m, i) => {
          const openable = !!m.bio
          const Wrapper = openable ? 'button' : 'div'
          return (
            <Reveal key={`${m.role}-${i}`} delay={(i % 4) * 0.08}>
              <Wrapper
                type={openable ? 'button' : undefined}
                onClick={openable ? () => setActive(i) : undefined}
                className={`group flex h-full w-full flex-col items-center rounded-card border border-line bg-white p-6 text-center transition-all duration-300 ${openable ? 'cursor-pointer hover:-translate-y-1 hover:shadow-card-hover' : ''}`}
              >
                <Avatar m={m} />
                <h3 className={`mt-4 text-base font-bold ${m.pending ? 'text-body-soft' : 'text-heading'}`}>{m.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">{m.role}</p>

                {openable ? (
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-body-soft transition-colors group-hover:text-accent">
                    View profile
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                ) : m.pending ? (
                  <span className="mt-4 text-xs font-medium text-body-soft">Coming soon</span>
                ) : null}
              </Wrapper>
            </Reveal>
          )
        })}
      </div>

      {/* Full-profile modal — decoupled from the grid, so bio length is irrelevant */}
      <AnimatePresence>
        {member && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setActive(null)} aria-hidden />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-float"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.21, 0.5, 0.25, 1] }}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-body-soft transition-colors hover:bg-surface-alt hover:text-heading"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <Avatar m={member} size="lg" />
                <h3 className="mt-5 text-xl font-bold text-heading">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-accent">{member.role}</p>
                <div className="mt-5 h-px w-12 bg-line" aria-hidden />
                <p className="mt-5 text-left text-sm leading-relaxed text-body">{member.bio}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
