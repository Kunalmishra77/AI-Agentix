import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { process } from '../../data/home'

export default function HowItWorks() {
  return (
    <Section tone="white">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow={process.eyebrow} heading={process.heading} sub={process.body} max="max-w-2xl" />
        <Reveal>
          <Link to={process.cta.to} className="btn-primary shrink-0">
            {process.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((s, i) => (
          <Reveal key={s.no} delay={i * 0.08}>
            <article className="relative h-full rounded-card border border-line bg-white p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-card">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-extrabold text-line">{s.no}</span>
                <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{s.time}</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-heading">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* trust signals + mini testimonial */}
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.trustSignals.map((t) => (
            <div key={t.title} className="bg-surface-alt p-5">
              <p className="text-sm font-bold text-heading">{t.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-body">{t.text}</p>
            </div>
          ))}
        </div>
        <Reveal>
          <figure className="flex h-full flex-col justify-center rounded-card bg-ink p-6">
            <Quote className="h-6 w-6 text-accent" />
            <blockquote className="mt-3 text-sm leading-relaxed text-white">"{process.miniTestimonial.quote}"</blockquote>
            <figcaption className="mt-4 text-xs text-ink-muted">
              <span className="font-semibold text-white">{process.miniTestimonial.name}</span> — {process.miniTestimonial.role}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
