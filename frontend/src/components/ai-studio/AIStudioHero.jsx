import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { hero, channels } from '../../data/aiStudio'
import { STUDIO_ICONS } from './icons'

function Cta({ c, children }) {
  const cls = c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'
  if (c.to.startsWith('#')) {
    const onClick = (e) => {
      e.preventDefault()
      document.querySelector(c.to)?.scrollIntoView({ behavior: 'smooth' })
    }
    return <a href={c.to} onClick={onClick} className={cls}>{children}</a>
  }
  return <Link to={c.to} className={cls}>{children}</Link>
}

export default function AIStudioHero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-32 pb-16 text-white md:pt-36 md:pb-20">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(45% 55% at 85% 15%, rgba(242,101,34,0.2) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-bold leading-[1.07] text-white">{hero.heading}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{hero.body}</p>

            <div className="mt-7 flex flex-wrap gap-6">
              {hero.quickStats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold text-accent md:text-3xl">{s.value}</div>
                  <div className="text-xs text-ink-muted">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {hero.ctas.map((c) => (
                <Cta key={c.label} c={c}>{c.primary && <ArrowRight className="h-4 w-4" />}{c.label}</Cta>
              ))}
            </div>
          </motion.div>

          {/* honest channels showcase (no fabricated live feed) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-3xl border border-white/12 bg-white/[0.05] p-5 backdrop-blur-md md:p-6">
            <div className="border-b border-white/10 pb-4 text-sm font-bold text-white">{hero.panelTitle}</div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {channels.platforms.map((p) => {
                const Icon = STUDIO_ICONS[p.icon]
                return (
                  <div key={p.name} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-hover text-white">
                      {Icon && <Icon className="h-4 w-4" strokeWidth={2} />}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-white">{p.name}</div>
                      <div className="truncate text-[10px] text-ink-muted">{p.role}</div>
                    </div>
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
