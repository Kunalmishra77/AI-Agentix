import Seo from '../components/common/Seo'
import { meta } from '../data/technology'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import TechHero from '../components/technology/TechHero'
import TechAgents from '../components/technology/TechAgents'
import TechStack from '../components/technology/TechStack'
import TechIntegrations from '../components/technology/TechIntegrations'
import TechSecurity from '../components/technology/TechSecurity'
import TechCta from '../components/technology/TechCta'

export default function TechnologyPage() {
  return (
    <>
      <Seo title={meta.title} description={meta.description} />
      <ScrollProgress />
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <TechHero />
        <TechAgents />
        <TechStack />
        <TechIntegrations />
        <TechSecurity />
        <TechCta />
      </main>
      <SiteFooter />
    </>
  )
}
