import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { pricing } from '../../data/aiStudio'
import { cn } from '../../lib/cn'

export default function AIStudioPricing() {
  return (
    <Section tone="alt" id="packages" className="scroll-mt-20">
      <SectionHeading eyebrow={pricing.eyebrow} heading={pricing.heading} sub={pricing.body} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {pricing.packages.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className={cn(
              'relative flex flex-col rounded-3xl border p-7 md:p-8',
              p.popular ? 'border-accent bg-ink text-white shadow-float lg:-mt-4 lg:mb-4' : 'border-line bg-white',
            )}
          >
            {p.popular && (
              <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-pill bg-accent px-4 py-1.5 text-xs font-bold text-white shadow-orange">
                <Star className="h-3.5 w-3.5 fill-current" /> Most Popular
              </span>
            )}

            <h3 className={cn('text-lg font-bold', p.popular ? 'text-white' : 'text-heading')}>{p.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className={cn('font-display text-4xl font-extrabold', p.popular ? 'text-white' : 'text-heading')}>{p.price}</span>
              <span className={cn('text-sm', p.popular ? 'text-ink-muted' : 'text-body-soft')}>{p.period}</span>
            </div>

            <ul className="mt-7 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className={cn('flex items-start gap-2.5 text-sm', p.popular ? 'text-white/90' : 'text-body')}>
                  <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', p.popular ? 'bg-accent text-white' : 'bg-accent-soft text-accent')}>
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to={pricing.cta.to}
              className={cn('mt-8 justify-center', p.popular ? 'btn-primary' : 'btn-outline')}
            >
              {pricing.cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
