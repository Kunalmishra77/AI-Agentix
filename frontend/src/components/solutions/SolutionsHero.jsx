import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { hero, items } from '../../data/solutions'
import { SOLUTION_ICONS } from './icons'

export default function SolutionsHero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink pt-28 pb-16 text-white">
      {/* background */}
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(50% 50% at 80% 30%, rgba(242,101,34,0.20) 0%, transparent 60%)' }} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[1.04] text-white">{hero.heading}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {hero.ctas.map((c) => (
              <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}>
                {c.primary ? <ArrowRight className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {c.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* floating solution-icon grid */}
        <div className="relative mx-auto hidden w-full max-w-md grid-cols-4 gap-3 lg:grid">
          {items.map((s, i) => {
            const Icon = SOLUTION_ICONS[s.icon]
            const col = i % 4
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, y: [0, col % 2 ? 8 : -8, 0] }}
                transition={{ opacity: { delay: 0.2 + i * 0.05 }, scale: { delay: 0.2 + i * 0.05 }, y: { duration: 4 + col, repeat: Infinity, ease: 'easeInOut' } }}
                className="group flex aspect-square flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-center backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-accent/10"
                title={s.name}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
