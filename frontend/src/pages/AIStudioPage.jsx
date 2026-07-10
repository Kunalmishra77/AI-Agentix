import { Helmet } from 'react-helmet-async'
import { meta } from '../data/aiStudio'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
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
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>
      <ScrollProgress />
      <ScrollToHash />
      <SiteNav />
      <main>
        <AIStudioHero />
        <AIStudioStats />
        <AIStudioCreate />
        <AIStudioChannels />
        <AIStudioPricing />
        <AIStudioCta />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
