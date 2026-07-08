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
      {/* HERO BACKGROUND — replace with real asset */}
      <div className="absolute inset-0" aria-hidden data-asset="hero-background-image (1920x1080, dark tech/city, AI-detection overlay)">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-800 via-ink to-ink" />
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              'radial-gradient(55% 55% at 80% 12%, rgba(242,101,34,0.26) 0%, transparent 60%), radial-gradient(45% 45% at 8% 88%, rgba(242,101,34,0.10) 0%, transparent 60%)',
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
        {/* bottom scrim so the band panel reads clearly */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink to-transparent" />
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

      {/* ADDEPTO-style translucent service band — one panel, 3 columns, hairline dividers */}
      <div className="container-x relative z-10 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md sm:grid-cols-3"
        >
          {hero.serviceBand.map((s, i) => (
            <div
              key={s.title}
              className={`relative p-6 md:p-8 ${i > 0 ? 'sm:border-l sm:border-white/10' : ''} ${i > 0 ? 'border-t border-white/10 sm:border-t-0' : ''}`}
            >
              <span className="absolute left-0 top-6 hidden h-6 w-0.5 bg-accent sm:block md:top-8" />
              <h3 className="text-lg font-bold text-white md:text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
