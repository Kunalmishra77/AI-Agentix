import { Plus } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { process } from '../../data/solutions'

export default function SolutionsProcess() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow={process.eyebrow} heading={process.heading} sub={process.body} align="center" max="max-w-2xl" className="mx-auto" />

      <Reveal className="mt-12">
        <div className="grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
          {process.steps.map((s, i) => (
            <div
              key={s.no}
              className={`group relative p-8 transition-colors duration-300 hover:bg-accent sm:p-10 ${i % 2 === 0 ? 'sm:border-r' : ''} ${i < 2 ? 'border-b' : ''} border-line`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-accent transition-colors group-hover:text-white">{s.no}</span>
                <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-semibold text-accent transition-colors group-hover:bg-white/20 group-hover:text-white">{s.time}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-heading transition-colors group-hover:text-white">{s.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-body transition-colors group-hover:text-white/90">{s.text}</p>
              <span className="absolute bottom-8 right-8 flex h-9 w-9 items-center justify-center rounded-full bg-surface-alt text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-accent sm:bottom-10 sm:right-10">
                <Plus className="h-4 w-4" />
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
