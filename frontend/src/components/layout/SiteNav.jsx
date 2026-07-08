import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks, solutionsMega, industriesMega, aboutMega, technologyMega, brand } from '../../data/site'
import { cn } from '../../lib/cn'
import Logo from './Logo'

const MEGAS = {
  about: { data: aboutMega, image: '/AGENTIX-MEDIAS/img.webp' },
  solutions: { data: solutionsMega, image: '/AGENTIX-MEDIAS/aiagent.webp' },
  industries: { data: industriesMega, image: '/AGENTIX-MEDIAS/growthamplified.webp' },
  technology: { data: technologyMega, image: '/AGENTIX-MEDIAS/brain-illustration.webp' },
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [openMega, setOpenMega] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const light = scrolled || !!openMega

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        light ? 'border-b border-line bg-white shadow-md' : 'bg-transparent',
      )}
      onMouseLeave={() => setOpenMega(null)}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Logo
          dark={!light}
          imgClassName="h-11 transition-transform duration-300 hover:scale-105 md:h-12"
        />

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) =>
            l.mega ? (
              <div key={l.label} onMouseEnter={() => setOpenMega(l.mega)} className="relative">
                <Link
                  to={l.to}
                  className={cn(
                    'flex items-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                    openMega === l.mega ? 'text-accent' : light ? 'text-heading hover:text-accent' : 'text-white/85 hover:text-white',
                  )}
                >
                  {l.label}
                </Link>
                {openMega === l.mega && (
                  <span className="absolute -bottom-0.5 left-1/2 h-3 w-[3px] -translate-x-1/2 rounded-full bg-accent" />
                )}
              </div>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className={cn(
                  'rounded-md px-3.5 py-2 text-sm font-medium transition-colors',
                  light ? 'text-heading hover:text-accent' : 'text-white/85 hover:text-white',
                )}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to={brand.audit.to} className="btn-primary">
            {brand.audit.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          className={cn('inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden', light ? 'text-heading' : 'text-white')}
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* mega dropdown */}
      <AnimatePresence>
        {openMega && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-[72px] hidden lg:block"
          >
            <MegaPanel {...MEGAS[openMega]} onClose={() => setOpenMega(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </header>
  )
}

/** ADDEPTO-style mega: full-width light panel, links become elevated white
 *  cards on hover, plus a featured image card. Contained height (not full page). */
function MegaPanel({ data, image, onClose }) {
  return (
    <div className="border-t border-line bg-surface-alt shadow-2xl">
      <div className="container-x grid gap-8 py-8 lg:grid-cols-[1fr_300px]">
        {/* links */}
        <div>
          <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-body-soft">{data.title}</span>
            <span className="text-sm text-body">{data.tagline}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {data.items.map((it) => (
              <Link
                key={it.label}
                to={it.to}
                onClick={onClose}
                className="group rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
              >
                <div className="text-sm font-bold text-heading transition-colors group-hover:text-accent">{it.label}</div>
                <p className="mt-0.5 text-xs leading-snug text-body-soft">{it.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* featured image card */}
        <Link
          to={data.cta.to}
          onClick={onClose}
          className="group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl"
        >
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
          <div className="relative z-10 p-6">
            <div className="text-3xl font-extrabold text-accent">{data.stat.value}</div>
            <p className="text-sm text-white/85">{data.stat.label}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              {data.cta.label}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

function MobileDrawer({ onClose }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        className="fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col bg-ink lg:hidden"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.28, ease: [0.21, 0.5, 0.25, 1] }}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <Logo dark />
          <button aria-label="Close menu" onClick={onClose} className="text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={onClose}
              className="block border-b border-white/5 py-3.5 text-lg font-medium text-white/90"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-5">
          <Link to={brand.audit.to} onClick={onClose} className="btn-primary w-full">
            {brand.audit.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.aside>
    </>
  )
}
