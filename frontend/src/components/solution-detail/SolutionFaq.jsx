import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { cn } from '../../lib/cn'

export default function SolutionFaq({ faq }) {
  const [open, setOpen] = useState(0)
  return (
    <Section tone="alt">
      <SectionHeading eyebrow="FAQ" heading={faq.heading} align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faq.items.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-line bg-white">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-base font-semibold text-heading">{f.q}</span>
                <ChevronDown className={cn('h-5 w-5 shrink-0 text-accent transition-transform duration-300', isOpen && 'rotate-180')} />
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-body">{f.a}</p>
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
