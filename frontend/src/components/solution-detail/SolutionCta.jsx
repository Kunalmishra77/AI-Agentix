import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import Reveal from '../common/Reveal'

export default function SolutionCta({ cta }) {
  return (
    <Section tone="white">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 text-center md:px-12 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            aria-hidden
            style={{ backgroundImage: 'radial-gradient(50% 60% at 50% 0%, rgba(242,101,34,0.28) 0%, transparent 60%)' }}
          />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-h2 text-white">{cta.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 md:text-lg">{cta.body}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {cta.ctas.map((c) => (
                <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}>
                  {c.label}
                  {c.primary && <ArrowRight className="h-4 w-4" />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
