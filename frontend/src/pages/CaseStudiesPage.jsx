import Seo from '../components/common/Seo'
import { meta } from '../data/caseStudies'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import CaseStudiesHero from '../components/case-studies/CaseStudiesHero'
import CaseStudiesGrid from '../components/case-studies/CaseStudiesGrid'
import CaseStudiesAggregate from '../components/case-studies/CaseStudiesAggregate'
import CaseStudiesCta from '../components/case-studies/CaseStudiesCta'

export default function CaseStudiesPage() {
  return (
    <>
      <Seo title={meta.title} description={meta.description} />
      <ScrollProgress />
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <CaseStudiesHero />
        <CaseStudiesGrid />
        <CaseStudiesAggregate />
        <CaseStudiesCta />
      </main>
      <SiteFooter />
    </>
  )
}
