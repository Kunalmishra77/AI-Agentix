import Seo from '../components/common/Seo'
import { meta } from '../data/aiStudio'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToHash from '../components/common/ScrollToHash'
import AIStudioHero from '../components/ai-studio/AIStudioHero'
import AIStudioStats from '../components/ai-studio/AIStudioStats'
import AIStudioCreate from '../components/ai-studio/AIStudioCreate'
import AIStudioChannels from '../components/ai-studio/AIStudioChannels'
import AIStudioPricing from '../components/ai-studio/AIStudioPricing'
import AIStudioCta from '../components/ai-studio/AIStudioCta'

export default function AIStudioPage() {
  return (
    <>
      <Seo title={meta.title} description={meta.description} />
      <ScrollProgress />
      <ScrollToHash />
      <SiteNav />
      <main id="main" tabIndex={-1} className="outline-none">
        <AIStudioHero />
        <AIStudioStats />
        <AIStudioCreate />
        <AIStudioChannels />
        <AIStudioPricing />
        <AIStudioCta />
      </main>
      <SiteFooter />
    </>
  )
}
