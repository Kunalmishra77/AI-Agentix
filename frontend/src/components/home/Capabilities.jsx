import { Bot, Workflow, PenTool, Mic, Calculator, BarChart3, Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import Placeholder from '../common/Placeholder'
import { capabilities } from '../../data/home'
import { cn } from '../../lib/cn'

const ICONS = [Bot, Workflow, PenTool, Mic, Calculator, BarChart3]

export default function Capabilities() {
  return (
    <Section tone="alt">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow={capabilities.eyebrow} heading={capabilities.heading} max="max-w-xl" />
        <p className="max-w-md text-base leading-relaxed text-body md:text-right">{capabilities.sub}</p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.items.map((c, i) => {
          const Icon = ICONS[i]
          const featured = i === 0
          return (
            <Reveal key={c.title} delay={(i % 3) * 0.08} className={cn(featured && 'md:col-span-2 lg:col-span-1')}>
              <article
                className={cn(
                  'group flex h-full flex-col rounded-card border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
                  featured ? 'border-accent/30 bg-white ring-1 ring-accent/20' : 'border-line bg-white',
                )}
              >
                {featured && (
                  <Placeholder label="capability-featured-visual (16:9)" ratio="16/9" className="mb-5" />
                )}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-heading">{c.title}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{c.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-body">{c.text}</p>
                <ul className="mt-4 grid gap-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] text-body">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <span className="inline-block rounded-pill bg-ink px-3 py-1.5 text-xs font-semibold text-white">
                    {c.metric}
                  </span>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
