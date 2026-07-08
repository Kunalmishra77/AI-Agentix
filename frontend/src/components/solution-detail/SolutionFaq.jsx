import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, MessagesSquare, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import { cn } from '../../lib/cn'

export default function SolutionFaq({ faq }) {
  const [open, setOpen] = useState(0)
  return (
    <Section tone="white" id="faq" className="scroll-mt-20">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* left: heading + help card */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow mb-4">
            <span className="h-px w-6 bg-accent" aria-hidden />
            FAQ
          </span>
          <h2 className="text-h2 text-heading">{faq.heading}</h2>
          <div className="mt-7 overflow-hidden rounded-2xl bg-ink p-6">
            <div className="pointer-events-none absolute" aria-hidden />
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <MessagesSquare className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold text-white">Still have questions?</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">Talk to our team — we'll map the highest-ROI automation for your workflows.</p>
            <Link to="/contact" className="btn-primary mt-5">
              Talk to Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* right: accordion */}
        <div className="space-y-3">
          {faq.items.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-white transition-colors',
                  isOpen ? 'border-accent/40 shadow-card' : 'border-line',
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 p-5 text-left"
                >
                  <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors', isOpen ? 'bg-accent text-white' : 'bg-accent-soft text-accent')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 text-base font-semibold text-heading">{f.q}</span>
                  <Plus className={cn('h-5 w-5 shrink-0 text-accent transition-transform duration-300', isOpen && 'rotate-45')} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-16 text-sm leading-relaxed text-body">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
