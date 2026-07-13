import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowUpRight, Stethoscope, GraduationCap, Hotel, Building2, ShoppingBag, Factory, Truck } from 'lucide-react'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import ScrollToHash from '../components/common/ScrollToHash'
import Section from '../components/common/Section'
import IndustryCta from '../components/industry-detail/IndustryCta'
import { meta, hero, items, cta } from '../data/industries'

const ICONS = {
  health: Stethoscope,
  education: GraduationCap,
  hospitality: Hotel,
  realestate: Building2,
  retail: ShoppingBag,
  factory: Factory,
  truck: Truck,
}

export default function IndustriesPage() {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <ScrollProgress />
      <ScrollToHash />
      <SiteNav />
      <main>
        {/* hero */}
        <section className="relative flex min-h-[560px] items-center overflow-hidden bg-ink pt-28 pb-16 text-white">
          <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-industries.webp)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/35" />
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(45% 50% at 80% 20%, rgba(242,101,34,0.22) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <div className="container-x relative z-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {hero.eyebrow}
              </span>
              <h1 className="mt-6 font-display text-[clamp(2.3rem,5vw,4.2rem)] font-bold leading-[1.05] text-white">{hero.heading}</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{hero.sub}</p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] px-5 py-3 backdrop-blur-sm">
                <span className="font-display text-3xl font-extrabold text-accent">{hero.stat.value}</span>
                <span className="text-sm text-white/80">{hero.stat.label}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* industry grid */}
        <Section tone="alt">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => {
              const Icon = ICONS[it.icon] || Building2
              return (
                <motion.div
                  key={it.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
                >
                  <Link
                    to={`/industries/${it.slug}`}
                    className="group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-card-hover"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-line transition-colors duration-300 group-hover:text-accent" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-heading">{it.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{it.desc}</p>
                    <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-heading transition-colors group-hover:text-accent">
                      Explore {it.name}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Section>

        <IndustryCta cta={cta} />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
