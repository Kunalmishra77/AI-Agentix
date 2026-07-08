import { Link } from 'react-router-dom'
import { X, Check, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { compare } from '../../data/about'

export default function AboutCompare() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow={compare.eyebrow} heading={compare.heading} sub={compare.sub} align="center" max="max-w-2xl" className="mx-auto" />

      <Reveal className="mx-auto mt-12 max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          <div className="grid grid-cols-[0.9fr_1.3fr_1.3fr] bg-white text-xs font-bold uppercase tracking-wide sm:text-sm">
            <div className="p-4" />
            <div className="flex items-center gap-2 p-4 text-body-soft">
              <X className="h-4 w-4 text-red-400" /> {compare.cols[0]}
            </div>
            <div className="flex items-center gap-2 bg-accent p-4 text-white">
              <Check className="h-4 w-4" /> {compare.cols[1]}
            </div>
          </div>
          {compare.rows.map((r, i) => (
            <div key={r.label} className={`grid grid-cols-[0.9fr_1.3fr_1.3fr] border-t border-line ${i % 2 ? 'bg-white' : 'bg-surface-alt/40'}`}>
              <div className="flex items-center p-4 text-sm font-semibold text-heading">{r.label}</div>
              <div className="p-4 text-sm text-body">{r.bad}</div>
              <div className="bg-accent-soft/60 p-4 text-sm font-medium text-heading">{r.good}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <Link to={compare.cta.to} className="btn-primary">
            {compare.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-sm text-body-soft">{compare.bottom}</p>
        </div>
      </Reveal>
    </Section>
  )
}
