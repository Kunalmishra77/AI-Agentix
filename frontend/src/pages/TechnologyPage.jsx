import { Helmet } from 'react-helmet-async'
import { meta } from '../data/technology'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import TechHero from '../components/technology/TechHero'
import TechAgents from '../components/technology/TechAgents'
import TechStack from '../components/technology/TechStack'
import TechIntegrations from '../components/technology/TechIntegrations'
import TechSecurity from '../components/technology/TechSecurity'
import TechCta from '../components/technology/TechCta'

export default function TechnologyPage() {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <ScrollProgress />
      <SiteNav />
      <main>
        <TechHero />
        <TechAgents />
        <TechStack />
        <TechIntegrations />
        <TechSecurity />
        <TechCta />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
