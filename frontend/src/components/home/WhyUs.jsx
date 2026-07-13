import { Link } from 'react-router-dom'
import { X, Check, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { whyUs } from '../../data/home'

export default function WhyUs() {
  return (
    <Section tone="white">
      <SectionHeading variant="stacked" eyebrow={whyUs.eyebrow} heading={whyUs.heading} sub={whyUs.sub} max="max-w-2xl" />

      <Reveal className="mt-12 max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-line">
          {/* header */}
          <div className="grid grid-cols-[1.1fr_1.4fr_1.4fr] bg-surface-alt text-xs font-bold uppercase tracking-wide sm:text-sm">
            <div className="p-4 text-body-soft" />
            <div className="flex items-center gap-2 p-4 text-body-soft">
              <X className="h-4 w-4 text-red-400" /> {whyUs.cols[0]}
            </div>
            <div className="flex items-center gap-2 bg-accent p-4 text-white">
              <Check className="h-4 w-4" /> {whyUs.cols[1]}
            </div>
          </div>

          {/* rows */}
          {whyUs.rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1.1fr_1.4fr_1.4fr] border-t border-line ${i % 2 ? 'bg-white' : 'bg-surface-alt/40'}`}
            >
              <div className="flex items-center p-4 text-sm font-semibold text-heading">{r.label}</div>
              <div className="p-4">
                <p className="text-sm text-body">{r.bad}</p>
                <p className="mt-0.5 text-xs text-red-400">{r.badMeta}</p>
              </div>
              <div className="bg-accent-soft/60 p-4">
                <p className="text-sm font-medium text-heading">{r.good}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-accent">{r.goodMeta}</span>
                  <span className="rounded-pill bg-accent px-2 py-0.5 text-xs font-bold text-white">{r.gain}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Link to={whyUs.cta.to} className="btn-primary">
            {whyUs.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-sm text-body-soft">{whyUs.bottomNote}</p>
        </div>
      </Reveal>
    </Section>
  )
}
