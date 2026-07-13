import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { TECH_ICONS } from '../technology/icons'

// Distinct agent-page hero: dark, engineering "console" identity. The right-hand
// card is a static spec sheet (deploy window, model, channels) — configuration
// facts, NOT fabricated live telemetry.
export default function AgentHero({ agent, index, total }) {
  const Icon = TECH_ICONS[agent.icon]
  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-16 text-white md:pt-32 md:pb-20">
      {/* backdrop: agent image (right-weighted), darkened for legibility, + grid + orange glow */}
      <div className="absolute inset-0" aria-hidden>
        {agent.image && (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${agent.image})` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '54px 54px' }} />
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(45% 45% at 88% 12%, rgba(242,101,34,0.22) 0%, transparent 62%)' }} />
      </div>

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* left: identity */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3">
            <Link to="/technology" className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-accent">
              ← The Agent Fleet
            </Link>
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent">
              <Icon className="h-7 w-7" strokeWidth={1.7} />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{agent.name}</p>
              <p className="text-sm text-white/60">{agent.role}</p>
            </div>
          </div>

          <h1 className="mt-7 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1.08] text-white">{agent.headline}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">{agent.desc}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {agent.chips.map((c) => (
              <span key={c} className="rounded-pill border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/80">{c}</span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Deploy this agent <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn border border-white/25 text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> Talk to an engineer
            </Link>
          </div>
        </motion.div>

        {/* right: console spec card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative rounded-2xl border border-white/10 bg-ink-800/80 shadow-float backdrop-blur"
        >
          {/* terminal bar */}
          <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-2 font-mono text-[11px] tracking-wide text-white/45">{agent.slug}.agent</span>
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" /> ready to deploy
            </span>
          </div>
          {/* spec rows */}
          <dl className="divide-y divide-white/6 px-5">
            {agent.spec.map((s) => (
              <div key={s.label} className="flex items-center justify-between py-3.5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{s.label}</dt>
                <dd className="text-sm font-semibold text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
          <div className="px-5 pb-5 pt-1">
            <p className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-white/55">
              Custom-engineered on our stack, hosted in India (AWS Mumbai). Configured to your workflows — not a one-size template.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
