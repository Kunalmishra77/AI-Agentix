import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getSolutionPage } from '../data/solutionPages'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import ScrollToHash from '../components/common/ScrollToHash'
import SolutionHero from '../components/solution-detail/SolutionHero'
import SolutionStats from '../components/solution-detail/SolutionStats'
import SolutionCapabilities from '../components/solution-detail/SolutionCapabilities'
import SolutionProcess from '../components/solution-detail/SolutionProcess'
import SolutionIntegrations from '../components/solution-detail/SolutionIntegrations'
import SolutionCompare from '../components/solution-detail/SolutionCompare'
import SolutionResults from '../components/solution-detail/SolutionResults'
import SolutionFaq from '../components/solution-detail/SolutionFaq'
import SolutionCta from '../components/solution-detail/SolutionCta'

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const data = getSolutionPage(slug)

  // Solutions not yet built fall back to the Solutions index.
  if (!data) return <Navigate to="/solutions" replace />

  return (
    <>
      <Helmet>
        <title>{data.meta.title}</title>
        {data.meta.description && <meta name="description" content={data.meta.description} />}
      </Helmet>
      <ScrollProgress />
      <ScrollToHash />
      <SiteNav />
      <main>
        <SolutionHero hero={data.hero} image={data.heroImage} />
        {data.stats && <SolutionStats stats={data.stats} />}
        {data.capabilities && <SolutionCapabilities capabilities={data.capabilities} />}
        {data.process && <SolutionProcess process={data.process} />}
        {data.integrations && <SolutionIntegrations integrations={data.integrations} />}
        {data.compare && <SolutionCompare compare={data.compare} />}
        {data.results && <SolutionResults results={data.results} />}
        {data.faq && <SolutionFaq faq={data.faq} />}
        {data.cta && <SolutionCta cta={data.cta} />}
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
