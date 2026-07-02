import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import WebflowPage from './components/WebflowPage.jsx'
import LanguageToggle from './components/LanguageToggle.jsx'
import { useI18n } from './i18n/index.jsx'
import HomePage from './pages/HomePage.jsx'
import WorkPage from './pages/WorkPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LandingDemo from './pages/legacy/LandingDemo.jsx'
import LandingDemoV2 from './pages/legacy/LandingDemoV2.jsx'
import HomeV3 from './pages/v3/Home.jsx'
import CaseStudyV3 from './pages/v3/CaseStudy.jsx'
import ContactV3 from './pages/v3/Contact.jsx'
import ProjectsV3 from './pages/v3/Projects.jsx'

import error404Html from './pages/raw/404.html?raw'

// Cada cambio de ruta arranca arriba (React Router conserva el scroll).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Redirect del detalle Webflow viejo al caso nuevo (misma slug).
function RedirectProject() {
  const { slug } = useParams()
  return <Navigate to={`/proyecto/${slug}`} replace />
}

// El toggle de idioma (widget global de Webflow) no aplica al preview v3.
function GlobalLanguageToggle() {
  const { pathname } = useLocation()
  const v3 = pathname === '/' || pathname === '/contact' || pathname === '/work' ||
    pathname.startsWith('/ejemplo') || pathname.startsWith('/proyecto')
  if (v3) return null
  return <LanguageToggle />
}

export default function App() {
  const { locale } = useI18n()
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalLanguageToggle />
      <Routes>
        <Route path="/" element={<HomeV3 />} />
        <Route path="/home-old" element={<HomePage />} />
        <Route path="/work" element={<ProjectsV3 />} />
        <Route path="/proyectos" element={<ProjectsV3 />} />
        <Route path="/work-old" element={<WorkPage />} />
        <Route path="/project/:slug" element={<RedirectProject />} />
        <Route path="/project-old/:slug" element={<ProjectDetailPage />} />

        <Route path="/contact" element={<ContactV3 />} />
        <Route path="/contact-old" element={<ContactPage />} />
        <Route path="/ejemplo" element={<LandingDemo />} />
        <Route path="/ejemplo-v2" element={<LandingDemoV2 />} />
        <Route path="/ejemplo-v3" element={<HomeV3 />} />
        <Route path="/proyecto/:slug" element={<CaseStudyV3 />} />
        <Route path="/proyecto-v3/:slug" element={<CaseStudyV3 />} />
        <Route path="/404" element={<WebflowPage html={error404Html} refreshKey={locale} />} />
        <Route path="*" element={<WebflowPage html={error404Html} refreshKey={locale} />} />
      </Routes>
    </BrowserRouter>
  )
}
