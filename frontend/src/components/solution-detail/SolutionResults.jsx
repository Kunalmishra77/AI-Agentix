import { TrendingUp } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'

export default function SolutionResults({ results }) {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={results.eyebrow} heading={results.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {results.items.map((r, i) => (
          <Reveal key={r.stat} delay={i * 0.1}>
            <article className="flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
              <span className="w-fit rounded-pill bg-surface-alt px-3 py-1 text-[11px] font-semibold text-body-soft">{r.tag}</span>
              <div className="mt-5 flex items-start gap-2">
                <TrendingUp className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <p className="text-xl font-extrabold leading-tight text-heading">{r.stat}</p>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-body">{r.text}</p>
              <p className="mt-5 border-t border-line pt-4 text-xs font-semibold text-accent">{r.meta}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
