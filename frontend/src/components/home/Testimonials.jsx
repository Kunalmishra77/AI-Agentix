import { useState } from 'react'
import { Quote, Pause, Play } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { testimonialsSection } from '../../data/home'
import { cn } from '../../lib/cn'

function Card({ t, hidden }) {
  return (
    <figure aria-hidden={hidden || undefined} className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:w-[380px]">
      <div className="flex items-center justify-between">
        <Quote className="h-6 w-6 text-accent" />
        <span className="rounded-pill bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">{t.result}</span>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-body">"{t.quote}"</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
          {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold text-heading">{t.name}</span>
          <span className="block truncate text-xs text-body-soft">{t.role}</span>
        </span>
        <span className="ml-auto shrink-0 text-xs font-medium uppercase tracking-wide text-body-soft">{t.tag}</span>
      </figcaption>
    </figure>
  )
}

// AGX-022: the scrolling row pauses on hover and keyboard focus and has a visible
// pause button; the global reduced-motion CSS rule stops it entirely.
function Row({ items, direction = 'left', speed = 'animate-marquee-slow', paused }) {
  const doubled = [...items, ...items]
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className={cn('flex w-max gap-5 py-1', speed, 'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]')}
        style={{ ...(direction === 'right' ? { animationDirection: 'reverse' } : {}), ...(paused ? { animationPlayState: 'paused' } : {}) }}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { items } = testimonialsSection
  const [paused, setPaused] = useState(false)

  return (
    <Section tone="alt" full className="overflow-hidden">
      <div className="container-x">
        <SectionHeading
          variant="stacked"
          eyebrow={testimonialsSection.eyebrow}
          heading={testimonialsSection.heading}
          max="max-w-2xl"
        />
      </div>
      <div className="container-x mt-8 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-3.5 py-2 text-xs font-semibold text-heading transition-colors hover:border-heading motion-reduce:hidden"
        >
          {paused ? <Play className="h-3.5 w-3.5" aria-hidden /> : <Pause className="h-3.5 w-3.5" aria-hidden />}
          {paused ? 'Play testimonials' : 'Pause testimonials'}
        </button>
      </div>
      <div className="mt-4">
        <Row items={items} direction="left" speed="animate-marquee-slow" paused={paused} />
      </div>
    </Section>
  )
}
