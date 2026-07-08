import { Quote } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { testimonialsSection } from '../../data/home'
import { cn } from '../../lib/cn'

function Card({ t }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-line bg-white p-6 shadow-card sm:w-[380px]">
      <div className="flex items-center justify-between">
        <Quote className="h-6 w-6 text-accent" />
        <span className="rounded-pill bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">{t.result}</span>
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
        <span className="ml-auto shrink-0 text-[11px] font-medium uppercase tracking-wide text-body-soft">{t.tag}</span>
      </figcaption>
    </figure>
  )
}

function Row({ items, direction = 'left', speed = 'animate-marquee-slow' }) {
  const doubled = [...items, ...items]
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className={cn('flex w-max gap-5 py-1', speed, 'group-hover:[animation-play-state:paused]')}
        style={direction === 'right' ? { animationDirection: 'reverse' } : undefined}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { items } = testimonialsSection
  const half = Math.ceil(items.length / 2)
  const row1 = items.slice(0, half)
  const row2 = items.slice(half)

  return (
    <Section tone="alt" full className="overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow={testimonialsSection.eyebrow}
          heading={testimonialsSection.heading}
          align="center"
          max="max-w-2xl"
          className="mx-auto"
        />
      </div>
      <div className="mt-12 flex flex-col gap-5">
        <Row items={row1} direction="left" speed="animate-marquee-slow" />
        <Row items={row2} direction="right" speed="animate-marquee-fast" />
      </div>
    </Section>
  )
}
