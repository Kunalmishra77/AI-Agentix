import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getIndustryPage } from '../data/industryPages'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import ScrollToHash from '../components/common/ScrollToHash'
import IndustryHero from '../components/industry-detail/IndustryHero'
import IndustryStats from '../components/industry-detail/IndustryStats'
import IndustryChallenges from '../components/industry-detail/IndustryChallenges'
import IndustrySolutions from '../components/industry-detail/IndustrySolutions'
import IndustrySegments from '../components/industry-detail/IndustrySegments'
import IndustryCompliance from '../components/industry-detail/IndustryCompliance'
import SolutionIntegrations from '../components/solution-detail/SolutionIntegrations'
import SolutionProcess from '../components/solution-detail/SolutionProcess'
import IndustryProof from '../components/industry-detail/IndustryProof'
import IndustryFaq from '../components/industry-detail/IndustryFaq'
import IndustryCta from '../components/industry-detail/IndustryCta'

export default function IndustryDetailPage() {
  const { slug } = useParams()
  const data = getIndustryPage(slug)

  // Industries not yet built fall back to the Industries index.
  if (!data) return <Navigate to="/industries" replace />

  // Flexible light sections alternate alt/white after the white stats band,
  // so the tone rhythm holds regardless of which optional sections a page has.
  const flexible = []
  if (data.challenges) flexible.push((tone) => <IndustryChallenges key="challenges" challenges={data.challenges} tone={tone} />)
  if (data.solutions) flexible.push((tone) => <IndustrySolutions key="solutions" solutions={data.solutions} tone={tone} />)
  if (data.segments) flexible.push((tone) => <IndustrySegments key="segments" segments={data.segments} tone={tone} />)
  if (data.process) flexible.push((tone) => <SolutionProcess key="process" process={data.process} tone={tone} />)
  if (data.compliance) flexible.push((tone) => <IndustryCompliance key="compliance" compliance={data.compliance} tone={tone} />)
  if (data.integrations) flexible.push((tone) => <SolutionIntegrations key="integrations" integrations={data.integrations} tone={tone} />)
  if (data.proof) flexible.push((tone) => <IndustryProof key="proof" proof={data.proof} tone={tone} />)
  if (data.faq) flexible.push((tone) => <IndustryFaq key="faq" faq={data.faq} tone={tone} />)

  let t = 'alt'
  const rendered = flexible.map((fn) => {
    const el = fn(t)
    t = t === 'alt' ? 'white' : 'alt'
    return el
  })

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
        <IndustryHero hero={data.hero} image={data.heroImage} />
        {data.stats && <IndustryStats stats={data.stats} />}
        {rendered}
        {data.cta && <IndustryCta cta={data.cta} />}
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
