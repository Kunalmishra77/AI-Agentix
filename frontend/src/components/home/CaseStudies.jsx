import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import Placeholder from '../common/Placeholder'
import Reveal from '../common/Reveal'
import { caseStudies } from '../../data/home'
import { cn } from '../../lib/cn'

function Story({ c, flip }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* image */}
      <div className={cn('group relative overflow-hidden rounded-2xl', flip && 'lg:order-2')}>
        <Placeholder
          label={`case-study-image: ${c.client}`}
          dark
          ratio="4/3"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-4 right-4 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-heading shadow">
          {c.industry}
        </span>
      </div>

      {/* content */}
      <div className={cn(flip && 'lg:order-1')}>
        <h3 className="text-3xl font-bold text-white">{c.client}</h3>
        <div className="mt-5 space-y-3">
          <p className="text-sm leading-relaxed text-ink-muted">
            <span className="font-semibold text-white/90">Challenge: </span>{c.challenge}
          </p>
          <p className="text-sm leading-relaxed text-ink-muted">
            <span className="font-semibold text-white/90">Solution: </span>{c.solution}
          </p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
          {c.stats.map((s) => (
            <div key={s.k}>
              <div className="text-3xl font-extrabold text-accent">{s.v}</div>
              <div className="mt-1 text-[11px] leading-tight text-ink-muted">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies() {
  return (
    <Section tone="dark">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <span className="eyebrow mb-4">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {caseStudies.eyebrow}
          </span>
          <h2 className="text-h2 max-w-2xl text-white">{caseStudies.heading}</h2>
        </Reveal>
        <Link to="/case-studies" className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-white hover:text-accent">
          View all case studies
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-12 space-y-14">
        {caseStudies.items.map((c, i) => (
          <Reveal key={c.client} delay={i * 0.05}>
            <Story c={c} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
