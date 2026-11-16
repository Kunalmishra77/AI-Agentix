import { Link } from 'react-router-dom'
import { X, Check, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { compare } from '../../data/about'

// Full content width like the other left-aligned sections; a 3-column table from `sm`
// up and stacked cards on phones so nothing is squeezed.
export default function AboutCompare() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={compare.eyebrow} heading={compare.heading} sub={compare.sub} max="max-w-2xl" />

      <Reveal className="mt-12">
        <div role="table" aria-label={compare.heading} className="hidden overflow-hidden rounded-2xl border border-line bg-white sm:block">
          <div role="row" className="grid grid-cols-[0.9fr_1.3fr_1.3fr] bg-white text-xs font-bold uppercase tracking-wide sm:text-sm">
            <div role="columnheader" className="p-4"><span className="sr-only">Area</span></div>
            <div role="columnheader" className="flex items-center gap-2 p-4 text-body-soft">
              <X className="h-4 w-4 text-red-600" aria-hidden /> {compare.cols[0]}
            </div>
            <div role="columnheader" className="flex items-center gap-2 bg-accent p-4 text-white">
              <Check className="h-4 w-4" aria-hidden /> {compare.cols[1]}
            </div>
          </div>
          {compare.rows.map((r, i) => (
            <div key={r.label} role="row" className={`grid grid-cols-[0.9fr_1.3fr_1.3fr] border-t border-line ${i % 2 ? 'bg-white' : 'bg-surface-alt/40'}`}>
              <div role="rowheader" className="flex items-center p-4 text-sm font-semibold text-heading lg:px-6">{r.label}</div>
              <div role="cell" className="p-4 text-sm text-body lg:px-6">{r.bad}</div>
              <div role="cell" className="bg-accent-soft/60 p-4 text-sm font-medium text-heading lg:px-6">{r.good}</div>
            </div>
          ))}
        </div>

        <ul className="space-y-3 sm:hidden">
          {compare.rows.map((r) => (
            <li key={r.label} className="overflow-hidden rounded-2xl border border-line bg-white">
              <p className="bg-surface-alt px-4 py-3 text-sm font-bold text-heading">{r.label}</p>
              <div className="flex gap-2.5 px-4 py-3">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-body-soft">{compare.cols[0]}</p>
                  <p className="mt-0.5 text-sm text-body">{r.bad}</p>
                </div>
              </div>
              <div className="flex gap-2.5 border-t border-line bg-accent-soft/60 px-4 py-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-accent">{compare.cols[1]}</p>
                  <p className="mt-0.5 text-sm font-medium text-heading">{r.good}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Link to={compare.cta.to} className="btn-primary">
            {compare.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <p className="text-sm text-body-soft">{compare.bottom}</p>
        </div>
      </Reveal>
    </Section>
  )
}
