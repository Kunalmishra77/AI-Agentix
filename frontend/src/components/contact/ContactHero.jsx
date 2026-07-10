import { motion } from 'framer-motion'
import { hero } from '../../data/contact'

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-16 text-white md:pt-36 md:pb-20">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(45% 55% at 82% 15%, rgba(242,101,34,0.22) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="container-x relative z-10">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[1.08] text-white">{hero.heading}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{hero.body}</p>
        </motion.div>

        <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {hero.trust.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="text-xl font-extrabold text-accent md:text-2xl">{t.value}</div>
              <div className="mt-0.5 text-xs text-ink-muted">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
