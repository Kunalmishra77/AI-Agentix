import { motion } from 'framer-motion'

export default function SolutionStats({ stats }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="border-line px-6 py-8 text-center [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0 md:border-l md:first:border-l-0 [&:nth-child(2)]:border-l md:[&:nth-child(2)]:border-l"
          >
            <div className="text-3xl font-extrabold tracking-tight text-accent md:text-4xl">{s.value}</div>
            <div className="mt-1.5 text-sm font-semibold text-heading">{s.label}</div>
            {s.sub && <div className="mt-0.5 text-xs text-body-soft">{s.sub}</div>}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
