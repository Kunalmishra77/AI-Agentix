import Seo from '../components/common/Seo'
import { meta } from '../data/solutions'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
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
      <Seo title={meta.title} description={meta.description} />
      <ScrollProgress />
      <ScrollToHash />
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <SolutionsHero />
        <SolutionsCatalog />
        <SolutionsDemo />
        <SolutionsProcess />
        <SolutionsCompare />
        <SolutionsFinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
