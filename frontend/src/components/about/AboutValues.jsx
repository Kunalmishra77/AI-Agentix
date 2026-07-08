import { Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { values } from '../../data/about'

export default function AboutValues() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={values.eyebrow} heading={values.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {values.items.map((v, i) => (
          <Reveal key={v.title} delay={(i % 3) * 0.08}>
            <article className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover">
              <h3 className="text-lg font-bold text-heading">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{v.text}</p>
              <ul className="mt-4 grid gap-2">
                {v.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13px] text-body">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-5">
                <span className="inline-block rounded-pill bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">{v.stat}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
