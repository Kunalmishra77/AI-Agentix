import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Check } from 'lucide-react'

export default function IndustryHero({ hero, image }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-28 pb-14 text-white">
      {/* full-bleed background image + dark overlays */}
      <div className="absolute inset-0" aria-hidden data-asset="industry-hero-image">
        {image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/92 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/60" />
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(50% 50% at 82% 30%, rgba(242,101,34,0.20) 0%, transparent 60%)' }} />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      <div className="container-x relative z-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold leading-[1.05] text-white">{hero.heading}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{hero.subheading}</p>

          {hero.tags && (
            <div className="mt-7 flex flex-wrap gap-2">
              {hero.tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {hero.ctas.map((c) => (
              <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}>
                {c.primary ? <ArrowRight className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {c.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
