import { Link } from 'react-router-dom'
import { ArrowRight, Plus, Quote } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { process } from '../../data/home'

export default function HowItWorks() {
  return (
    <Section tone="white">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <SectionHeading eyebrow={process.eyebrow} heading={process.heading} sub={process.body} max="max-w-2xl" />
        <Reveal>
          <Link to={process.cta.to} className="btn-primary shrink-0">
            {process.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>

      {/* ADDEPTO 2x2 bordered grid */}
      <Reveal className="mt-12">
        <div className="grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
          {process.steps.map((s, i) => (
            <div
              key={s.no}
              className={`group relative p-8 transition-colors duration-300 hover:bg-surface-alt sm:p-10 ${
                i % 2 === 0 ? 'sm:border-r' : ''
              } ${i < 2 ? 'border-b' : ''} border-line`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-accent">{s.no}</span>
                <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{s.time}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-heading">{s.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-body">{s.text}</p>
              <span className="absolute bottom-8 right-8 flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-accent transition-all duration-300 group-hover:rotate-90 group-hover:bg-accent group-hover:text-white sm:bottom-10 sm:right-10">
                <Plus className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* trust signals + mini testimonial */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.trustSignals.map((t) => (
            <div key={t.title} className="bg-white p-5 transition-colors hover:bg-surface-alt">
              <p className="text-sm font-bold text-heading">{t.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-body">{t.text}</p>
            </div>
          ))}
        </div>
        <Reveal>
          <figure className="flex h-full flex-col justify-center rounded-2xl bg-ink p-6">
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
