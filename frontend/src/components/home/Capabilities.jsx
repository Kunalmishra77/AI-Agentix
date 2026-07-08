import { Bot, Workflow, PenTool, Mic, Calculator, BarChart3, ArrowUpRight } from 'lucide-react'
import Section from '../common/Section'
import Reveal from '../common/Reveal'
import { capabilities } from '../../data/home'
import { cn } from '../../lib/cn'

const ICONS = [Bot, Workflow, PenTool, Mic, Calculator, BarChart3]

// ADDEPTO staggered bento placement (lg): heading top-left; cards fill a staircase
// leaving two empty cells (top-middle, mid-left).
const CELL = [
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-3 lg:row-start-2',
  'lg:col-start-1 lg:row-start-3',
  'lg:col-start-2 lg:row-start-3',
  'lg:col-start-3 lg:row-start-3',
]

function Bullets({ items }) {
  return (
    <ul className="mt-3 grid gap-1.5">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-2 text-[13px] text-body">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
          {b}
        </li>
      ))}
    </ul>
  )
}

function Card({ c, Icon, tint }) {
  return (
    <article
      className={cn(
        'group relative h-full min-h-[330px] w-full overflow-hidden rounded-card border border-line transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover',
        tint ? 'bg-surface' : 'bg-white',
      )}
    >
      {/* base layer */}
      <div className="flex h-full flex-col p-7">
        <h3 className="text-xl font-bold text-heading">{c.title}</h3>
        <p className="mt-1 text-sm font-semibold text-accent">{c.tagline}</p>
        {/* full detail inline on mobile/tablet (no hover there) */}
        <div className="lg:hidden">
          <p className="mt-3 text-sm leading-relaxed text-body">{c.text}</p>
          <Bullets items={c.bullets} />
        </div>
        <div className="mt-auto flex items-end justify-between pt-6">
          <span className="rounded-pill bg-ink px-3 py-1.5 text-xs font-semibold text-white">{c.metric}</span>
          <span className="text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            <Icon className="h-8 w-8" strokeWidth={1.5} />
          </span>
        </div>
      </div>

      {/* hover overlay (lg+) — absolute, no layout shift */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 hidden flex-col p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex',
          tint ? 'bg-surface' : 'bg-white',
        )}
      >
        <h3 className="text-xl font-bold text-heading">{c.title}</h3>
        <p className="mt-1 text-sm font-semibold text-accent">{c.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-body">{c.text}</p>
        <Bullets items={c.bullets} />
        <span className="mt-auto w-fit rounded-pill bg-ink px-3 py-1.5 text-xs font-semibold text-white">{c.metric}</span>
      </div>
    </article>
  )
}

export default function Capabilities() {
  return (
    <Section tone="white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
        {/* heading in the top-left cell */}
        <Reveal className="flex flex-col justify-start md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1">
          <span className="eyebrow mb-4">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {capabilities.eyebrow}
          </span>
          <h2 className="text-h2 text-heading">{capabilities.heading}</h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-body">{capabilities.sub}</p>
        </Reveal>

        {capabilities.items.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.06} className={cn('flex', CELL[i])}>
            <Card c={c} Icon={ICONS[i]} tint={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
