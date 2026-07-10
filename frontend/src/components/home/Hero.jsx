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
    <section className="relative flex h-screen min-h-[600px] flex-col overflow-hidden bg-ink text-white">
      {/* HERO BACKGROUND — branded video, with dark overlays for text legibility. */}
      <div className="absolute inset-0" aria-hidden>
        {/* background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/home/home_hero_video-1080p.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* very light overall tint — barely lifts text off the video */}
        <div className="absolute inset-0 bg-ink/10" />
        {/* soft left-weighted gradient for the heading/body legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-ink/10 to-transparent" />
        {/* top fade — keeps the nav legible over the video */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/55 to-transparent" />
        {/* bottom fade — keeps the stats band legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-20 pb-2 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.5, 0.25, 1] }}
          className="max-w-4xl"
        >
          <p className="flex items-center gap-2.5 text-base font-medium text-white/85 md:text-lg">
            <span className="h-2 w-2 rounded-full bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-4 text-hero font-display font-bold leading-[1.03] text-white">
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

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">{hero.body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
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

          <div className="mt-5 flex items-center gap-2 text-sm text-white/65">
            <span className="flex text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span>{hero.rating}</span>
          </div>
        </motion.div>
      </div>

      {/* ADDEPTO-style service band — solid grey panel that bleeds off the left
          screen edge, flush with the hero's bottom, ~2/3 width, plain vertical dividers */}
      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative grid max-w-full sm:max-w-[920px] sm:grid-cols-3"
        >
          {/* grey panel background, extended past the left viewport edge for a full-bleed look */}
          <div className="absolute inset-y-0 right-0 left-[-100vw]  bg-[#262A31]/95 backdrop-blur-sm" aria-hidden />
          {hero.serviceBand.map((s) => (
            <div key={s.title} className="relative px-6 py-4 md:px-10 md:py-7">
              {/* short, vertically-centred leading divider before every column (incl. the first) */}
              <span aria-hidden className="absolute left-0 top-1/2 hidden h-[58%] w-px -translate-y-1/2 bg-white/15 sm:block" />
              <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl">
                {s.title.replaceAll('-', '‑')}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
