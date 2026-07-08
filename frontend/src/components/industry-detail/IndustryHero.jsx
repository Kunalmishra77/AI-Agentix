import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function IndustryHero({ hero, image }) {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-ink pt-28 pb-16 text-white lg:h-screen">
      {/* full-bleed background image + dark overlays */}
      <div className="absolute inset-0" aria-hidden data-asset="industry-hero-image">
        {image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/94 to-ink/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(45% 45% at 85% 25%, rgba(242,101,34,0.18) 0%, transparent 60%)' }} />
      </div>

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* content */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.8rem)] font-bold leading-[1.06] text-white">{hero.heading}</h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{hero.subheading}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {hero.ctas.map((c) => (
                <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}>
                  {c.primary ? <ArrowRight className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* live snapshot card */}
          {hero.live && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-3xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-md md:p-7"
              data-asset="industry-live-card"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-semibold text-white/90">{hero.live.label}</span>
                <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  {hero.live.status}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {hero.live.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-2xl font-extrabold text-transparent">{m.value}</div>
                    <div className="mt-1 text-xs font-semibold text-white">{m.label}</div>
                    {m.sub && <div className="mt-0.5 text-[11px] text-ink-muted">{m.sub}</div>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
