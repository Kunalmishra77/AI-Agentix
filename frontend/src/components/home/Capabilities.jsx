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

function Card({ c, Icon, cell, tint }) {
  return (
    <article
      className={cn(
        'group relative flex min-h-[240px] w-full flex-col overflow-hidden rounded-card border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover',
        tint ? 'bg-surface' : 'bg-white',
      )}
    >
      <h3 className="max-w-[80%] text-xl font-bold text-heading">{c.title}</h3>
      <p className="mt-1 text-sm font-semibold text-accent">{c.tagline}</p>

      {/* detail revealed on hover (present in DOM; expanded on lg hover, always shown below lg) */}
      <div className="mt-3 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-[320px] lg:group-hover:opacity-100">
        <p className="text-sm leading-relaxed text-body">{c.text}</p>
        <ul className="mt-3 grid gap-1.5">
          {c.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[13px] text-body">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-end justify-between pt-6">
        <span className="rounded-pill bg-ink px-3 py-1.5 text-xs font-semibold text-white">{c.metric}</span>
        <span className="text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
          <Icon className="h-8 w-8" strokeWidth={1.5} />
        </span>
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
