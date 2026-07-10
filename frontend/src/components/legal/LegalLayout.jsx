import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ShieldCheck, CalendarDays, Building2, Mail, ArrowUpRight } from 'lucide-react'
import SiteNav from '../layout/SiteNav'
import SiteFooter from '../layout/SiteFooter'
import ScrollProgress from '../common/ScrollProgress'
import ScrollToTop from '../common/ScrollToTop'
import Section from '../common/Section'

const jump = (i) => (e) => {
  e.preventDefault()
  document.getElementById(`sec-${i}`)?.scrollIntoView({ behavior: 'smooth' })
}

export default function LegalLayout({ data }) {
  return (
    <>
      <Helmet>
        <title>{data.meta.title}</title>
        <meta name="description" content={data.meta.description} />
      </Helmet>
      <ScrollProgress />
      <SiteNav />
      <main>
        {/* hero */}
        <section className="relative overflow-hidden bg-ink pt-32 pb-14 text-white md:pt-36 md:pb-16">
          <div className="absolute inset-0" aria-hidden>
            <div className="absolute inset-0 opacity-70" style={{ backgroundImage: 'radial-gradient(45% 55% at 82% 15%, rgba(242,101,34,0.2) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>
          <div className="container-x relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-accent" /> {data.badge}
              </span>
              <h1 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.6rem)] font-bold leading-[1.06] text-white">{data.heading}</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{data.body}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-accent" /> Last updated: {data.updated}</span>
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-accent" /> Applies to: {data.appliesTo}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* body */}
        <Section tone="white">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
            {/* TOC */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="eyebrow mb-4"><span className="h-px w-6 bg-accent" aria-hidden /> On this page</div>
              <ol className="space-y-1">
                {data.sections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#sec-${i}`} onClick={jump(i)} className="flex items-start gap-2.5 rounded-lg px-3 py-2 text-sm text-body transition-colors hover:bg-surface-alt hover:text-accent">
                      <span className="font-display text-xs font-extrabold text-line">{String(i + 1).padStart(2, '0')}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            {/* sections */}
            <div className="max-w-2xl space-y-10">
              {data.sections.map((s, i) => (
                <section key={s.title} id={`sec-${i}`} className="scroll-mt-28">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft font-display text-sm font-extrabold text-accent">{i + 1}</span>
                    <h2 className="text-xl font-bold text-heading md:text-2xl">{s.title}</h2>
                  </div>
                  <div className="mt-4 space-y-3.5 border-l-2 border-line pl-5">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-sm leading-relaxed text-body md:text-[15px]">{p}</p>
                    ))}
                  </div>
                </section>
              ))}

              {/* final CTA */}
              <div className="rounded-3xl bg-ink p-7 text-white md:p-8">
                <h3 className="text-lg font-bold">{data.finalCta.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{data.finalCta.body}</p>
                <a href={`mailto:${data.finalCta.email}`} className="btn-primary mt-5">
                  <Mail className="h-4 w-4" /> {data.finalCta.email} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
