import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, MessagesSquare, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import { cn } from '../../lib/cn'

export default function IndustryFaq({ faq, tone = 'alt' }) {
  const [open, setOpen] = useState(0)
  return (
    <Section tone={tone} id="faq" className="scroll-mt-20">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* left: heading + help card */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow mb-4">
            <span className="h-px w-6 bg-accent" aria-hidden />
            FAQ
          </span>
          <h2 className="text-h2 max-w-sm text-heading">{faq.heading}</h2>
          <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-accent-hover p-6 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <MessagesSquare className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">Still have questions?</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-white/90">Talk to our team — we’ll map the highest-ROI automation for your workflows.</p>
            <Link to="/contact" className="btn mt-5 bg-white text-accent hover:bg-white/90">
              Talk to Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* right: numbered accordion */}
        <div className="space-y-3">
          {faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-white transition-colors',
                  isOpen ? 'border-accent/50 shadow-card' : 'border-line hover:border-accent/30',
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={cn('font-display text-lg font-extrabold transition-colors', isOpen ? 'text-accent' : 'text-line')}>
                    0{i + 1}
                  </span>
                  <span className="flex-1 text-base font-semibold text-heading">{item.q}</span>
                  <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300', isOpen ? 'rotate-45 bg-accent text-white' : 'bg-surface-alt text-accent')}>
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-5 pl-[3.75rem] text-sm leading-relaxed text-body">{item.a}</p>
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
