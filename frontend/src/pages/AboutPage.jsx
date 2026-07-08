import { Helmet } from 'react-helmet-async'
import { meta } from '../data/about'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import ScrollToHash from '../components/common/ScrollToHash'
import AboutHero from '../components/about/AboutHero'
import AboutMission from '../components/about/AboutMission'
import AboutJourney from '../components/about/AboutJourney'
import AboutValues from '../components/about/AboutValues'
import AboutDifferent from '../components/about/AboutDifferent'
import AboutCompare from '../components/about/AboutCompare'
import AboutTeam from '../components/about/AboutTeam'
import AboutFinalCta from '../components/about/AboutFinalCta'

export default function AboutPage() {
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
        <AboutHero />
        <AboutMission />
        <AboutJourney />
        <AboutValues />
        <AboutDifferent />
        <AboutCompare />
        <AboutTeam />
        <AboutFinalCta />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
