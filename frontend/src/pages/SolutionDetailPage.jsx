import { useParams } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'
import Seo from '../components/common/Seo'
import { getSolutionPage } from '../data/solutionPages'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToHash from '../components/common/ScrollToHash'
import SolutionHero from '../components/solution-detail/SolutionHero'
import SolutionStats from '../components/solution-detail/SolutionStats'
import SolutionCapabilities from '../components/solution-detail/SolutionCapabilities'
import SolutionSignature from '../components/solution-detail/SolutionSignature'
import SolutionProcess from '../components/solution-detail/SolutionProcess'
import SolutionIntegrations from '../components/solution-detail/SolutionIntegrations'
import SolutionCompare from '../components/solution-detail/SolutionCompare'
import SolutionResults from '../components/solution-detail/SolutionResults'
import SolutionFaq from '../components/solution-detail/SolutionFaq'
import SolutionCta from '../components/solution-detail/SolutionCta'

export default function SolutionDetailPage() {
  const { slug } = useParams()
  const data = getSolutionPage(slug)

  // Unknown slugs show the 404 page (AGX-005).
  if (!data) return <NotFoundPage />

  return (
    <>
      <Seo title={data.meta.title} description={data.meta.description} />
      <ScrollProgress />
      <ScrollToHash />
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <SolutionHero hero={data.hero} image={data.heroImage} />
        {data.stats && <SolutionStats stats={data.stats} />}
        {data.capabilities && <SolutionCapabilities capabilities={data.capabilities} />}
        {data.signature && <SolutionSignature signature={data.signature} />}
        {data.process && <SolutionProcess process={data.process} />}
        {data.integrations && <SolutionIntegrations integrations={data.integrations} />}
        {data.compare && <SolutionCompare compare={data.compare} />}
        {data.results && <SolutionResults results={data.results} />}
        {data.faq && <SolutionFaq faq={data.faq} />}
        {data.cta && <SolutionCta cta={data.cta} />}
      </main>
      <SiteFooter />
    </>
  )
}
