import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Phase 2 = Homepage only. Other routes come in later phases. */}
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
