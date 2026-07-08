import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, ArrowRight, Play } from 'lucide-react'
import { hero } from '../../data/home'

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % hero.rotatingWords.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex min-h-[760px] flex-col overflow-hidden bg-ink text-white md:min-h-[880px]">
      {/* HERO BACKGROUND — full-bleed image (swap for a final branded shot later) */}
      <div className="absolute inset-0" aria-hidden data-asset="hero-background-image (1920x1080, AI/business scene)">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/AGENTIX-MEDIAS/aiagent.webp)' }}
        />
        {/* dark overlays keep the left-aligned copy + bottom band legible over the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        {/* subtle orange ambient */}
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: 'radial-gradient(50% 50% at 85% 15%, rgba(242,101,34,0.18) 0%, transparent 60%)' }}
        />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-32 pb-8 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.5, 0.25, 1] }}
          className="max-w-4xl"
        >
          <p className="flex items-center gap-2.5 text-lg font-medium text-white/85 md:text-xl">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 text-hero font-display font-bold leading-[1.05] text-white">
            {hero.headingPrefix}
            <br className="hidden sm:block" />{' '}
            <span className="relative inline-block align-baseline">
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

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{hero.body}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hero.ctas.map((c) => (
              <Link
                key={c.label}
                to={c.to}
                className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}
              >
                {c.primary ? <ArrowRight className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {c.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-white/65">
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span>{hero.rating}</span>
          </div>
        </motion.div>
      </div>

      {/* ADDEPTO-style service band — dark gradient panel over the hero image,
          left-aligned ~2/3 width, flush, vertical dividers with a tick per column */}
      <div className="container-x relative z-10 pb-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid max-w-full divide-y divide-white/15 border-t border-white/20 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/10 backdrop-blur-[2px] sm:max-w-[880px] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {hero.serviceBand.map((s) => (
            <div key={s.title} className="relative p-6 md:p-7">
              <span className="absolute left-0 top-0 h-5 w-[3px] bg-accent" />
              <h3 className="text-base font-bold text-white md:text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
