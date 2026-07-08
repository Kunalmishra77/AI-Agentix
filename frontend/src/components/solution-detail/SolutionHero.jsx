import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { cn } from '../../lib/cn'

const STAGE_COLOR = {
  Qualified: 'text-[#28C840] bg-[#28C840]/15',
  'Meeting Set': 'text-accent bg-accent/15',
  'Proposal Sent': 'text-[#3B82F6] bg-[#3B82F6]/15',
  'Follow-Up': 'text-[#EAB308] bg-[#EAB308]/15',
}

function scoreColor(s) {
  if (s >= 90) return 'text-[#28C840]'
  if (s >= 80) return 'text-accent'
  if (s >= 70) return 'text-[#3B82F6]'
  return 'text-[#EAB308]'
}

export default function SolutionHero({ hero, image }) {
  const w = hero.widget
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink pt-28 pb-16 text-white">
      <div className="absolute inset-0" aria-hidden>
        {image && <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${image})` }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(50% 50% at 82% 30%, rgba(242,101,34,0.20) 0%, transparent 60%)' }} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.75rem)] font-bold leading-[1.05] text-white">{hero.heading}</h1>
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

        {/* live widget */}
        {w && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-ink-800/70 p-5 shadow-float backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" /> {w.label}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wide text-accent">LIVE</span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {w.leads.map((l, i) => (
                <motion.li
                  key={l.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {l.name.split(' ').map((x) => x[0]).join('')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white">{l.name}</span>
                    <span className="block truncate text-xs text-ink-muted">{l.company}</span>
                  </span>
                  <span className={cn('shrink-0 rounded-pill px-2.5 py-1 text-[10px] font-semibold', STAGE_COLOR[l.stage] || 'bg-white/10 text-white')}>
                    {l.stage}
                  </span>
                  <span className={cn('w-8 shrink-0 text-right text-lg font-extrabold', scoreColor(l.score))}>{l.score}</span>
                </motion.li>
              ))}
            </ul>
            <p className="mt-3 border-t border-white/10 pt-3 text-center text-xs text-ink-muted">{w.footer}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
