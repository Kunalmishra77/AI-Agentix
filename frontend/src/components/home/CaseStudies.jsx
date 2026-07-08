import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import Placeholder from '../common/Placeholder'
import { caseStudies } from '../../data/home'

export default function CaseStudies() {
  return (
    <Section tone="dark">
      <SectionHeading eyebrow={caseStudies.eyebrow} heading={caseStudies.heading} tone="dark" max="max-w-2xl" />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {caseStudies.items.map((c, i) => (
          <Reveal key={c.client} delay={i * 0.1}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="p-4">
                <Placeholder label={`case-study-image: ${c.client}`} kind="image" dark ratio="16/9" />
              </div>
              <div className="flex flex-1 flex-col p-6 pt-2">
                <span className="w-fit rounded-pill bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">{c.industry}</span>
                <h3 className="mt-3 text-xl font-bold text-white">{c.client}</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <p className="text-ink-muted">
                    <span className="font-semibold text-white/90">Challenge: </span>{c.challenge}
                  </p>
                  <p className="text-ink-muted">
                    <span className="font-semibold text-white/90">Solution: </span>{c.solution}
                  </p>
                </div>

                <div className="mt-auto grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                  {c.stats.map((s) => (
                    <div key={s.k}>
                      <div className="text-2xl font-extrabold text-accent">{s.v}</div>
                      <div className="mt-1 text-[11px] leading-tight text-ink-muted">{s.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
