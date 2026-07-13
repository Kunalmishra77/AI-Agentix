import { motion } from 'framer-motion'
import { hero } from '../../data/caseStudies'

export default function CaseStudiesHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-14 text-white md:pt-36 md:pb-16">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-case-studies.webp)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(45% 55% at 82% 15%, rgba(242,101,34,0.2) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div className="container-x relative z-10">
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.07] text-white">{hero.heading}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{hero.body}</p>
        </motion.div>
      </div>
    </section>
  )
}
