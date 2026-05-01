import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/sections/HeroSection.jsx';
import ClientLogos from '../components/sections/ClientLogos.jsx';
import CoreCapabilities from '../components/sections/CoreCapabilities.jsx';
import CustomerStories from '../components/sections/CustomerStories.jsx';
import IndustryExpertise from '../components/sections/IndustryExpertise.jsx';
import ProductSpotlight from '../components/sections/ProductSpotlight.jsx';
import CooperationModels from '../components/sections/CooperationModels.jsx';
import CompanyInsights from '../components/sections/CompanyInsights.jsx';
import AwardsSection from '../components/sections/AwardsSection.jsx';
import TechDeepDive from '../components/sections/TechDeepDive.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AI Agentix — Enterprise AI Agents, n8n Automation & LLM Integration</title>
        <meta name="description" content="AI Agentix builds production-grade AI agents, n8n workflows, and LLM integrations for enterprise. 50+ AI systems shipped, 30+ enterprise clients." />
        <meta property="og:title" content="AI Agentix — Enterprise AI Automation" />
        <meta property="og:description" content="We build AI that works. Autonomous agents, n8n automation, and LLM integration for real operational impact." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://ai-agentix.com" />
      </Helmet>
      <HeroSection />
      <ClientLogos />
      <CoreCapabilities />
      <CustomerStories />
      <IndustryExpertise />
      <ProductSpotlight />
      <CooperationModels />
      <CompanyInsights />
      <AwardsSection />
      <TechDeepDive />
      <ContactCTA />
    </>
  );
}
