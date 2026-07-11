import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { hero, agents } from '../../data/technology'
import { TECH_ICONS } from './icons'

export default function TechHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-16 text-white md:pt-36 md:pb-20">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/analytics-bi.webp)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(45% 55% at 85% 15%, rgba(242,101,34,0.2) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* content */}
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.07] text-white">{hero.heading}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{hero.body}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {hero.trust.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> {t}
                </span>
              ))}
            </div>
            <Link to={hero.cta.to} className="btn-primary mt-8">{hero.cta.label} <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>

          {/* agent fleet roster (honest — no fabricated live counts) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl border border-white/12 bg-white/[0.05] p-5 backdrop-blur-md md:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-sm font-bold text-white">{hero.fleetTitle}</div>
                <div className="mt-0.5 text-xs text-ink-muted">{hero.fleetNote}</div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/90">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" /> Operational
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {agents.items.map((a) => {
                const Icon = TECH_ICONS[a.icon]
                return (
                  <div key={a.key} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-hover text-white">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-xs font-semibold text-white">{a.name}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
