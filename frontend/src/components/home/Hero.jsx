import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { hero } from '../../data/home'

// Hero video (AGX-008): the poster paints first (LCP); after the page has loaded we
// attach the smallest encode that fits the screen. No video at all for visitors who
// prefer reduced motion or have Data Saver on — they keep the poster.
const POSTER = '/home/hero-poster.webp'
function pickVideo() {
  const w = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2)
  if (w <= 900) return '/home/hero-480.mp4'
  if (w <= 1600) return '/home/hero-720.mp4'
  return '/home/hero-1080.mp4'
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [videoSrc, setVideoSrc] = useState(null)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setWordIdx((i) => (i + 1) % hero.rotatingWords.length), 2200)
    return () => clearInterval(id)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion || navigator.connection?.saveData) return
    const start = () => setVideoSrc(pickVideo())
    if (document.readyState === 'complete') { const t = setTimeout(start, 300); return () => clearTimeout(t) }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [reduceMotion])

  useEffect(() => {
    if (videoSrc) videoRef.current?.play?.().catch(() => {})
  }, [videoSrc])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-ink text-white">
      {/* HERO BACKGROUND — branded video, with dark overlays for text legibility. */}
      <div className="absolute inset-0" aria-hidden>
        {/* poster — the first thing painted */}
        <img
          src={POSTER}
          srcSet={`/home/hero-poster-800.webp 800w, ${POSTER} 1600w`}
          sizes="100vw"
          alt=""
          width="1600"
          height="900"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* background video, faded in once it is actually playing */}
        {videoSrc && (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}
            src={videoSrc}
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onPlaying={() => setPlaying(true)}
          />
        )}
        {/* overall tint — stronger on small screens where text covers most of the frame */}
        <div className="absolute inset-0 bg-ink/45 sm:bg-ink/20" />
        {/* left-weighted gradient behind the text column (AGX-033: subtitle and
            rotating word stay readable over the brightest frames) */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/0 sm:via-ink/45" />
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

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">{hero.body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {hero.ctas.map((c) => (
              <Link
                key={c.label}
                to={c.to}
                className={c.primary ? 'btn-primary' : 'btn border border-white/25 text-white hover:bg-white/10'}
              >
                {c.primary ? <ArrowRight className="h-4 w-4" aria-hidden /> : <BarChart3 className="h-4 w-4" aria-hidden />}
                {c.label}
              </Link>
            ))}
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
          className="relative grid max-w-full sm:max-w-[850px] sm:grid-cols-3"
        >
          {/* grey panel background, extended past the left viewport edge for a full-bleed look */}
          <div className="absolute inset-y-0 left-[-100vw] right-[-100vw] bg-[#262A31]/95 backdrop-blur-sm sm:right-0" aria-hidden />
          {hero.serviceBand.map((s) => (
            <div key={s.title} className="relative px-6 py-4 md:px-6 md:py-7">
              {/* short, vertically-centred leading divider before every column (incl. the first) */}
              <span aria-hidden className="absolute left-0 top-1/2 hidden h-[58%] w-px -translate-y-1/2 bg-white/15 sm:block" />
              <h2 className="text-xl font-semibold leading-tight text-white md:text-2xl">
                {s.title.replaceAll('-', '‑')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
