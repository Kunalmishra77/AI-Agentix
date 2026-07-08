import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { problem } from '../../data/home'

export default function ProblemSection() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={problem.eyebrow} heading={problem.heading} sub={problem.sub} max="max-w-2xl" />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {problem.cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <article className="card h-full p-6 hover:-translate-y-1 hover:shadow-card-hover">
              <div className="text-4xl font-extrabold text-accent">{c.stat}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-body-soft">{c.statLabel}</div>
              <h3 className="mt-5 text-base font-bold leading-snug text-heading">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{c.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl bg-ink p-7 md:flex-row md:items-center md:p-9">
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-white">{problem.banner}</p>
          <Link to={problem.bannerCta.to} className="btn-primary shrink-0">
            {problem.bannerCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </Section>
  )
}
