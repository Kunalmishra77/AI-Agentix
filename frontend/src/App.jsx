import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SolutionsPage from './pages/SolutionsPage.jsx'
import SolutionDetailPage from './pages/SolutionDetailPage.jsx'
import IndustriesPage from './pages/IndustriesPage.jsx'
import IndustryDetailPage from './pages/IndustryDetailPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/industries/:slug" element={<IndustryDetailPage />} />
      {/* Other pages come in later phases. */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
