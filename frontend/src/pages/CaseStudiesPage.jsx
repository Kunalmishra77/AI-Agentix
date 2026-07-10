import { Helmet } from 'react-helmet-async'
import { meta } from '../data/caseStudies'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import CaseStudiesHero from '../components/case-studies/CaseStudiesHero'
import CaseStudiesGrid from '../components/case-studies/CaseStudiesGrid'
import CaseStudiesAggregate from '../components/case-studies/CaseStudiesAggregate'
import CaseStudiesCta from '../components/case-studies/CaseStudiesCta'

export default function CaseStudiesPage() {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <ScrollProgress />
      <SiteNav />
      <main>
        <CaseStudiesHero />
        <CaseStudiesGrid />
        <CaseStudiesAggregate />
        <CaseStudiesCta />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
