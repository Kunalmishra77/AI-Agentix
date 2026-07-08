import { Check, Target, Users, Sparkles, ShieldCheck, RefreshCw, Languages } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { values } from '../../data/about'

const ICONS = [Target, Users, Sparkles, ShieldCheck, RefreshCw, Languages]

export default function AboutValues() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={values.eyebrow} heading={values.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {values.items.map((v, i) => {
          const Icon = ICONS[i]
          return (
            <Reveal key={v.title} delay={(i % 3) * 0.08}>
              <article className="group relative h-full min-h-[280px] overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                {/* base */}
                <div className="flex h-full flex-col p-6 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-bold text-heading">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{v.text}</p>
                  <div className="mt-auto pt-5">
                    <span className="inline-block rounded-pill bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent">{v.stat}</span>
                  </div>
                </div>

                {/* hover fill: orange gradient reveals the bullets */}
                <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-accent to-accent-hover p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-bold text-white">{v.title}</h3>
                  <ul className="mt-3 grid gap-1.5">
                    {v.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[13px] text-white/95">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto w-fit rounded-pill bg-white px-3 py-1.5 text-xs font-bold text-accent">{v.stat}</span>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
