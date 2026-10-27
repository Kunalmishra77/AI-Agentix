import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollReset from './components/common/ScrollReset.jsx'
import ScrollToTop from './components/common/ScrollToTop.jsx'
import WhatsAppFloat from './components/common/WhatsAppFloat.jsx'
import AssistantWidget from './components/assistant/AssistantWidget.jsx'
import HomePage from './pages/HomePage.jsx'

// Route-level code splitting (AGX-028): the home page ships in the main bundle,
// every other page loads on first visit.
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage.jsx'))
const SolutionDetailPage = lazy(() => import('./pages/SolutionDetailPage.jsx'))
const IndustriesPage = lazy(() => import('./pages/IndustriesPage.jsx'))
const IndustryDetailPage = lazy(() => import('./pages/IndustryDetailPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'))
const TechnologyPage = lazy(() => import('./pages/TechnologyPage.jsx'))
const AgentDetailPage = lazy(() => import('./pages/AgentDetailPage.jsx'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage.jsx'))
const AIStudioPage = lazy(() => import('./pages/AIStudioPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const RefundPage = lazy(() => import('./pages/RefundPage.jsx'))
const ThankYouPage = lazy(() => import('./pages/ThankYouPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

// Full-height blank placeholder while a page chunk loads: no spinner flash, no layout jump.
const PageFallback = () => <div className="min-h-screen bg-surface" aria-busy="true" />

export default function App() {
  return (
    <>
      <ScrollReset />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/industries/:slug" element={<IndustryDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/technology/:slug" element={<AgentDetailPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/ai-studio" element={<AIStudioPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {/* Floating actions: WhatsApp + back-to-top bottom-left; lead form (index.html) bottom-right with the AI assistant above it. */}
      <WhatsAppFloat />
      <ScrollToTop />
      <AssistantWidget />
    </>
  )
}
