import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, BrainCircuit } from 'lucide-react'
import { hero, stats } from '../../data/about'

const POS = [
  'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
  'right-0 top-1/2 -translate-y-1/2 translate-x-2',
  'left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2',
  'left-0 top-1/2 -translate-y-1/2 -translate-x-2',
]

export default function AboutHero() {
  return (
    <section className="relative flex h-screen min-h-[620px] flex-col overflow-hidden bg-ink pt-20 pb-6 text-white">
      {/* background — full-bleed image with dark overlays */}
      <div className="absolute inset-0" aria-hidden data-asset="about-hero-image (1920x1080, team/AI)">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/AGENTIX-MEDIAS/img.webp)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(50% 50% at 75% 35%, rgba(242,101,34,0.22) 0%, transparent 60%)' }} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      {/* main content (fills, centered) */}
      <div className="container-x relative z-10 flex flex-1 items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* copy */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow mb-4">
              <span className="h-px w-6 bg-accent" aria-hidden />
              {hero.eyebrow}
            </span>
            <h1 className="font-display text-[clamp(2.1rem,4.2vw,3.75rem)] font-bold leading-[1.03] text-white">{hero.heading}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">{hero.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {hero.ctas.map((c) => (
                <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}>
                  {c.primary ? <ArrowRight className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* orbital stat nodes */}
          <div className="relative mx-auto hidden aspect-square w-full max-w-[400px] lg:block">
            {[100, 74, 48].map((s, i) => (
              <div
                key={s}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                style={{ width: `${s}%`, height: `${s}%` }}
              >
                <motion.span
                  className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14 + i * 6, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '50% 220%' }}
                />
              </div>
            ))}
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover shadow-orange">
              <BrainCircuit className="h-11 w-11 text-white" strokeWidth={1.5} />
            </div>
            {hero.nodes.map((n, i) => (
              <motion.div
                key={n.label}
                className={`absolute ${POS[i]} w-28 rounded-2xl border border-white/10 bg-ink-800/80 p-3.5 text-center backdrop-blur-md`}
                animate={{ y: [0, i % 2 ? 8 : -8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-xl font-extrabold text-accent">{n.value}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{n.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* stats band pinned inside the hero (fits within 100vh) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="container-x relative z-10 shrink-0"
      >
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-white/10 px-5 py-4 text-center [&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:border-b-0 sm:border-l sm:first:border-l-0">
              <div className="text-xl font-extrabold tracking-tight text-accent md:text-2xl">{s.value}</div>
              <div className="mt-0.5 text-[11px] font-medium text-white/60 md:text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
