import { motion } from 'framer-motion'
import { stats } from '../../data/about'

export default function AboutStats() {
  return (
    <section className="relative z-20 bg-surface-alt pb-14 md:pb-16">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="-mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-white shadow-float md:-mt-16 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="border-line px-5 py-5 text-center [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0 md:border-l md:first:border-l-0 md:px-6">
              <div className="text-2xl font-extrabold tracking-tight text-accent md:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-body md:text-[13px]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
