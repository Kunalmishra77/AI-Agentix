import { Link } from 'react-router-dom'
import { X, Check, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { whyUs } from '../../data/home'

// Full content width like every other left-aligned section (AGX-012). From `sm` up it
// is a 3-column table; on phones each row becomes a stacked card so nothing clips (AGX-013).
export default function WhyUs() {
  return (
    <Section tone="white">
      <SectionHeading variant="stacked" eyebrow={whyUs.eyebrow} heading={whyUs.heading} sub={whyUs.sub} max="max-w-2xl" />

      <Reveal className="mt-12">
        {/* table — sm and up */}
        <div role="table" aria-label={whyUs.heading} className="hidden overflow-hidden rounded-2xl border border-line sm:block">
          <div role="row" className="grid grid-cols-[1.1fr_1.4fr_1.4fr] bg-surface-alt text-xs font-bold uppercase tracking-wide sm:text-sm">
            <div role="columnheader" className="p-4 text-body-soft"><span className="sr-only">Area</span></div>
            <div role="columnheader" className="flex items-center gap-2 p-4 text-body-soft">
              <X className="h-4 w-4 text-red-600" aria-hidden /> {whyUs.cols[0]}
            </div>
            <div role="columnheader" className="flex items-center gap-2 bg-accent p-4 text-white">
              <Check className="h-4 w-4" aria-hidden /> {whyUs.cols[1]}
            </div>
          </div>

          {whyUs.rows.map((r, i) => (
            <div
              key={r.label}
              role="row"
              className={`grid grid-cols-[1.1fr_1.4fr_1.4fr] border-t border-line ${i % 2 ? 'bg-white' : 'bg-surface-alt/40'}`}
            >
              <div role="rowheader" className="flex items-center p-4 text-sm font-semibold text-heading lg:px-6">{r.label}</div>
              <div role="cell" className="p-4 lg:px-6">
                <p className="text-sm text-body">{r.bad}</p>
                <p className="mt-0.5 text-xs text-danger">{r.badMeta}</p>
              </div>
              <div role="cell" className="bg-accent-soft/60 p-4 lg:px-6">
                <p className="text-sm font-medium text-heading">{r.good}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-accent">{r.goodMeta}</span>
                  <span className="rounded-pill bg-accent px-2 py-0.5 text-xs font-bold text-white">{r.gain}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* stacked cards — phones */}
        <ul className="space-y-3 sm:hidden">
          {whyUs.rows.map((r) => (
            <li key={r.label} className="overflow-hidden rounded-2xl border border-line">
              <p className="bg-surface-alt px-4 py-3 text-sm font-bold text-heading">{r.label}</p>
              <div className="flex gap-2.5 px-4 py-3">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-body-soft">{whyUs.cols[0]}</p>
                  <p className="mt-0.5 text-sm text-body">{r.bad}</p>
                  <p className="mt-0.5 text-xs text-danger">{r.badMeta}</p>
                </div>
              </div>
              <div className="flex gap-2.5 border-t border-line bg-accent-soft/60 px-4 py-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-accent">{whyUs.cols[1]}</p>
                  <p className="mt-0.5 text-sm font-medium text-heading">{r.good}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-accent">{r.goodMeta}</span>
                    <span className="rounded-pill bg-accent px-2 py-0.5 text-xs font-bold text-white">{r.gain}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Link to={whyUs.cta.to} className="btn-primary">
            {whyUs.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <p className="text-sm text-body-soft">{whyUs.bottomNote}</p>
        </div>
      </Reveal>
    </Section>
  )
}
