import { Helmet } from 'react-helmet-async'
import { meta } from '../data/solutions'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import ScrollToHash from '../components/common/ScrollToHash'
import SolutionsHero from '../components/solutions/SolutionsHero'
import SolutionsCatalog from '../components/solutions/SolutionsCatalog'
import SolutionsDemo from '../components/solutions/SolutionsDemo'
import SolutionsProcess from '../components/solutions/SolutionsProcess'
import SolutionsCompare from '../components/solutions/SolutionsCompare'
import SolutionsFinalCta from '../components/solutions/SolutionsFinalCta'

export default function SolutionsPage() {
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
        <SolutionsHero />
        <SolutionsCatalog />
        <SolutionsDemo />
        <SolutionsProcess />
        <SolutionsCompare />
        <SolutionsFinalCta />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
