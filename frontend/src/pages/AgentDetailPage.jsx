import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getAgentPage, agentIndex } from '../data/agents'
import SiteNav from '../components/layout/SiteNav'
import SiteFooter from '../components/layout/SiteFooter'
import ScrollProgress from '../components/common/ScrollProgress'
import ScrollToTop from '../components/common/ScrollToTop'
import ScrollToHash from '../components/common/ScrollToHash'
import AgentHero from '../components/agent-detail/AgentHero'
import AgentPipeline from '../components/agent-detail/AgentPipeline'
import AgentCapabilities from '../components/agent-detail/AgentCapabilities'
import AgentStack from '../components/agent-detail/AgentStack'
import AgentIntegrations from '../components/agent-detail/AgentIntegrations'
import AgentFaq from '../components/agent-detail/AgentFaq'
import AgentFleetNav from '../components/agent-detail/AgentFleetNav'
import AgentCta from '../components/agent-detail/AgentCta'

export default function AgentDetailPage() {
  const { slug } = useParams()
  const agent = getAgentPage(slug)

  // Unknown agents fall back to the Technology page.
  if (!agent) return <Navigate to="/technology" replace />

  const index = agentIndex.findIndex((a) => a.slug === slug)

  return (
    <>
      <Helmet>
        <title>{agent.meta.title}</title>
        {agent.meta.description && <meta name="description" content={agent.meta.description} />}
      </Helmet>
      <ScrollProgress />
      <ScrollToHash />
      <SiteNav />
      <main>
        {/* Tone rhythm: only the hero is dark, everything else alternates white/alt. */}
        <AgentHero agent={agent} index={index} total={agentIndex.length} />
        <AgentPipeline agent={agent} />
        <AgentCapabilities agent={agent} />
        <AgentStack agent={agent} />
        <AgentIntegrations agent={agent} />
        <AgentFaq agent={agent} />
        <AgentFleetNav currentSlug={slug} />
        <AgentCta agent={agent} />
      </main>
      <SiteFooter />
      <ScrollToTop />
    </>
  )
}
