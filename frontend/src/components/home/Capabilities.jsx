import { Bot, Workflow, PenTool, Mic, Calculator, BarChart3 } from 'lucide-react'
import Section from '../common/Section'
import Reveal from '../common/Reveal'
import { capabilities } from '../../data/home'
import { cn } from '../../lib/cn'

const ICONS = [Bot, Workflow, PenTool, Mic, Calculator, BarChart3]

// ADDEPTO staggered bento (lg): heading top-left; cards in a staircase, 2 empty cells.
const CELL = [
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-2 lg:row-start-2',
  'lg:col-start-3 lg:row-start-2',
  'lg:col-start-1 lg:row-start-3',
  'lg:col-start-2 lg:row-start-3',
  'lg:col-start-3 lg:row-start-3',
]

function Card({ c, Icon }) {
  return (
    <article className="group relative h-full min-h-[220px] w-full overflow-hidden rounded-card border border-line bg-white transition-colors duration-300 hover:border-accent">
      {/* background image + light legibility overlay (default state; hidden under orange fill on hover) */}
      {c.image && (
        <div className="absolute inset-0 transition-opacity duration-300 lg:group-hover:opacity-0" aria-hidden>
          <img src={c.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          {/* dark left-to-right scrim: white title (left) stays crisp, image shows on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/25" />
        </div>
      )}

      {/* default: title + icon (fades out on hover, lg). Full detail inline on mobile. */}
      <div className="relative flex h-full flex-col p-7 transition-opacity duration-300 lg:group-hover:opacity-0">
        <h3 className={cn('text-lg font-bold', c.image ? 'text-white' : 'text-heading')}>{c.title}</h3>
        <p className="mt-1 text-sm font-semibold text-accent lg:hidden">{c.tagline}</p>
        <p className={cn('mt-3 text-sm leading-relaxed lg:hidden', c.image ? 'text-white/85' : 'text-body')}>{c.text}</p>
        <div className="mt-auto flex items-end justify-between pt-6">
          <span className="rounded-pill bg-ink px-3 py-1.5 text-xs font-semibold text-white lg:hidden">{c.metric}</span>
          <Icon className="ml-auto h-9 w-9 text-accent" strokeWidth={1.5} />
        </div>
      </div>

      {/* hover (lg): orange fill + description, same card bounds — no size change */}
      <div className="absolute inset-0 hidden flex-col bg-accent p-7 opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex">
        <p className="text-sm font-bold text-white">{c.tagline}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/90">{c.text}</p>
        <span className="mt-auto w-fit rounded-pill bg-white px-3 py-1.5 text-xs font-semibold text-accent">{c.metric}</span>
      </div>
    </article>
  )
}

export default function Capabilities() {
  return (
    <Section tone="white">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
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
            <Card c={c} Icon={ICONS[i]} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
