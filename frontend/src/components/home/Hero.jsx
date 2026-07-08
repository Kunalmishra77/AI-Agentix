import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ArrowRight, Play, Zap, Workflow, PenTool } from 'lucide-react'
import { hero } from '../../data/home'

const BAND_ICONS = [Zap, Workflow, PenTool]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % hero.rotatingWords.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* HERO BACKGROUND — replace with real asset */}
      <div className="absolute inset-0" aria-hidden data-asset="hero-background-image (1920x1080, dark tech/office)">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink to-ink" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'radial-gradient(60% 60% at 78% 15%, rgba(242,101,34,0.28) 0%, transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(242,101,34,0.10) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="container-x relative z-10 pt-40 pb-40 md:pt-48 md:pb-52">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.5, 0.25, 1] }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {hero.eyebrow}
          </span>

          <h1 className="mt-6 text-hero font-display font-bold text-white">
            {hero.headingPrefix}
            <br className="hidden sm:block" />{' '}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0, y: '0.4em' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '-0.4em' }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="inline-block text-accent"
                >
                  {hero.rotatingWords[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{hero.body}</p>

          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-4">
              {hero.ctas.map((c) => (
                <Link key={c.label} to={c.to} className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}>
                  {c.primary ? <ArrowRight className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-2 text-sm text-white/70">
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span>{hero.rating}</span>
          </div>
        </motion.div>
      </div>

      {/* overlapping 3-column service band */}
      <div className="container-x relative z-20">
        <div className="grid -mb-14 gap-4 sm:-mb-16 md:grid-cols-3 md:-mb-20">
          {hero.serviceBand.map((s, i) => {
            const Icon = BAND_ICONS[i]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="group rounded-2xl border border-white/10 bg-ink-800/90 p-6 backdrop-blur-md transition-colors hover:border-accent/40"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{s.text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
