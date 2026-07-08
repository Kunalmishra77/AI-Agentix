import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/**
 * Full-width orange band CTA — distinct from the Solutions dark glowing card.
 */
export default function IndustryCta({ cta }) {
  return (
    <section className="bg-white py-section">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent to-accent-hover px-8 py-14 text-center text-white md:px-12 md:py-16"
        >
          {/* subtle texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl">{cta.heading}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">{cta.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {cta.ctas.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  className={c.primary
                    ? 'btn bg-white text-accent hover:bg-white/90'
                    : 'btn border border-white/40 text-white hover:bg-white/10'}
                >
                  {c.primary && <ArrowRight className="h-4 w-4" />}
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
