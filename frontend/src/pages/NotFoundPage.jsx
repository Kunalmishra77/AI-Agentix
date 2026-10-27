import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Home } from 'lucide-react'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'

// Unknown URLs and invalid slugs (AGX-005): a real "not found" page instead of a
// silent redirect, marked noindex so search engines don't index soft-404s.
export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — AI Agentix</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden bg-ink pt-36 pb-24 text-white md:pt-44 md:pb-32">
          <div className="container-x relative z-10 text-center">
            <p className="font-display text-[clamp(4rem,12vw,8rem)] font-extrabold leading-none text-accent">404</p>
            <h1 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-bold text-white">This page doesn't exist</h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/75">The link may be old or mistyped. These will get you back on track:</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/" className="btn-primary"><Home className="h-4 w-4" aria-hidden /> Home</Link>
              {[['Solutions', '/solutions'], ['Industries', '/industries'], ['Contact', '/contact']].map(([label, to]) => (
                <Link key={to} to={to} className="btn border border-white/20 text-white hover:border-white/50">{label} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
