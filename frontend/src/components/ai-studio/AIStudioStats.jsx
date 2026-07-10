import { motion } from 'framer-motion'
import { stats } from '../../data/aiStudio'

export default function AIStudioStats() {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 rounded-2xl border border-line bg-surface-alt/40 px-4 py-8 md:grid-cols-4">
        {stats.items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="px-3 text-center md:border-l md:border-line md:first:border-l-0"
          >
            <div className="font-display text-3xl font-extrabold tracking-tight text-accent md:text-4xl">{s.value}</div>
            <div className="mt-1.5 text-[13px] font-semibold leading-snug text-heading">{s.label}</div>
            <div className="mt-0.5 text-[11px] text-body-soft">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
