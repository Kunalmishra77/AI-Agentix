import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SolutionsPage from './pages/SolutionsPage.jsx'
import SolutionDetailPage from './pages/SolutionDetailPage.jsx'
import IndustriesPage from './pages/IndustriesPage.jsx'
import IndustryDetailPage from './pages/IndustryDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import TechnologyPage from './pages/TechnologyPage.jsx'
import CaseStudiesPage from './pages/CaseStudiesPage.jsx'
import AIStudioPage from './pages/AIStudioPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/industries/:slug" element={<IndustryDetailPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/technology" element={<TechnologyPage />} />
      <Route path="/case-studies" element={<CaseStudiesPage />} />
      <Route path="/ai-studio" element={<AIStudioPage />} />
      {/* Other pages come in later phases. */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
