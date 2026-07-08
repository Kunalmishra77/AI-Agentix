import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { navLinks, solutionsMega, industriesMega, brand } from '../../data/site'
import { cn } from '../../lib/cn'
import Logo from './Logo'

const MEGAS = { solutions: solutionsMega, industries: industriesMega }

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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'bg-ink/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent',
      )}
      onMouseLeave={() => setOpenMega(null)}
    >
      <div className="container-x flex h-[72px] items-center justify-between">
        <Logo
          imgClassName="h-11 transition-transform duration-300 hover:scale-105 md:h-12 [filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.35))]"
        />

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) =>
            l.mega ? (
              <div key={l.label} onMouseEnter={() => setOpenMega(l.mega)} className="relative">
                <Link
                  to={l.to}
                  className="flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
                >
                  {l.label}
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', openMega === l.mega && 'rotate-180')} />
                </Link>
              </div>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-md px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
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
            <MegaPanel data={MEGAS[openMega]} />
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

function MegaPanel({ data }) {
  return (
    <div className="mx-auto max-w-container px-5 sm:px-8 lg:px-10">
      <div className="overflow-hidden rounded-b-2xl border border-t-0 border-white/10 bg-ink shadow-2xl">
        <div className="grid grid-cols-[1fr_2.4fr]">
          <div className="flex flex-col justify-between gap-6 bg-white/[0.03] p-7">
            <div>
              <h3 className="text-lg font-bold text-white">{data.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{data.tagline}</p>
            </div>
            <div>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-accent">{data.stat.value}</span>
                <span className="text-xs text-ink-muted">{data.stat.label}</span>
              </div>
              <Link to={data.cta.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-accent">
                {data.cta.label} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 p-4">
            {data.items.map((it) => (
              <Link
                key={it.label}
                to={it.to}
                className="group rounded-xl p-3.5 transition-colors hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:text-accent">
                  {it.label}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">{it.desc}</p>
              </Link>
            ))}
          </div>
        </div>
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
