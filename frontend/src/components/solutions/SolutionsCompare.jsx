import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import { compare } from '../../data/solutions'

export default function SolutionsCompare() {
  return (
    <Section tone="dark">
      <SectionHeading eyebrow={compare.eyebrow} heading={compare.heading} tone="dark" align="center" max="max-w-2xl" className="mx-auto" />

      <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/10">
        {/* header */}
        <div className="grid grid-cols-[1fr_1.2fr_1.2fr] bg-white/[0.03] text-xs font-bold uppercase tracking-wide sm:text-sm">
          <div className="p-4 text-ink-muted md:p-5">{compare.cols[0]}</div>
          <div className="flex items-center gap-2 p-4 text-ink-muted md:p-5">
            <X className="h-4 w-4 text-red-400" /> {compare.cols[1]}
          </div>
          <div className="flex items-center gap-2 bg-accent p-4 text-white md:p-5">
            <Check className="h-4 w-4" /> {compare.cols[2]}
          </div>
        </div>

        {/* rows */}
        {compare.rows.map((r, i) => (
          <motion.div
            key={r.metric}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="grid grid-cols-[1fr_1.2fr_1.2fr] border-t border-white/10"
          >
            <div className="flex items-center p-4 text-sm font-semibold text-white md:p-5">{r.metric}</div>
            <div className="flex items-center p-4 text-sm text-ink-muted md:p-5">{r.manual}</div>
            <div className="flex items-center gap-2 bg-accent/[0.08] p-4 text-sm font-medium text-white md:p-5">
              <Check className="h-4 w-4 shrink-0 text-accent" />
              {r.ai}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
