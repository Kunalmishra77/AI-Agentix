import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Section from '../common/Section'
import Reveal from '../common/Reveal'
import { finalCta } from '../../data/home'

export default function FinalCta() {
  return (
    <Section tone="alt">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <span className="mb-5 block h-1 w-10 rounded-full bg-accent" aria-hidden />
          <h2 className="text-display text-heading">{finalCta.eyebrow}</h2>
          <p className="mt-3 text-lg font-semibold text-body md:text-xl">{finalCta.heading}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-base leading-relaxed text-body md:text-lg">{finalCta.body}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            {finalCta.ctas.map((c) => (
              <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn-outline'}>
                {c.label}
                {c.primary && <ArrowRight className="h-4 w-4" />}
              </Link>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {finalCta.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-body">
                <Check className="h-4 w-4 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
