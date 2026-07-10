import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { faq } from '../../data/contact'
import { cn } from '../../lib/cn'

export default function ContactFaq() {
  const [open, setOpen] = useState(0)
  return (
    <Section tone="alt">
      <SectionHeading eyebrow="FAQ" heading={faq.heading} align="center" max="max-w-2xl" className="mx-auto" />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faq.items.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={item.q} className={cn('overflow-hidden rounded-2xl border bg-white transition-colors', isOpen ? 'border-accent/50 shadow-card' : 'border-line hover:border-accent/30')}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center gap-4 px-6 py-5 text-left" aria-expanded={isOpen}>
                <span className={cn('font-display text-lg font-extrabold transition-colors', isOpen ? 'text-accent' : 'text-line')}>0{i + 1}</span>
                <span className="flex-1 text-base font-semibold text-heading">{item.q}</span>
                <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300', isOpen ? 'rotate-45 bg-accent text-white' : 'bg-surface-alt text-accent')}>
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <p className="px-6 pb-5 pl-[3.75rem] text-sm leading-relaxed text-body">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
