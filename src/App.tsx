import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { AppModalsProvider, useAppModals } from './context/AppModalsContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { DeveloperCatalogueModal } from './components/DeveloperCatalogueModal'
import { AlijayEmpireAI } from './components/AlijayEmpireAI'
import { AnimatedPage } from './components/AnimatedPage'
import { Home } from './pages/Home'
import { Integrations } from './pages/Integrations'
import { Diagnostics } from './pages/Diagnostics'
import { About } from './pages/About'
import './App.css'

function CatalogueRedirect() {
  const { openCatalogue } = useAppModals()
  useEffect(() => {
    openCatalogue()
  }, [openCatalogue])
  return <Navigate to="/" replace />
}

function HomeWithQuery() {
  const [params] = useSearchParams()
  const { openCatalogue, openAI } = useAppModals()

  useEffect(() => {
    if (params.get('catalogue') === '1') openCatalogue()
    if (params.get('ai') === '1') openAI()
  }, [params, openCatalogue, openAI])

  return <Home />
}

function AppRoutes() {
  return (
    <>
      <Header />
      <AnimatedPage>
        <Routes>
          <Route path="/" element={<HomeWithQuery />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/about" element={<About />} />
          <Route path="/developers" element={<CatalogueRedirect />} />
        </Routes>
      </AnimatedPage>
      <Footer />
      <DeveloperCatalogueModal />
      <AlijayEmpireAI />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppModalsProvider>
        <AppRoutes />
      </AppModalsProvider>
    </BrowserRouter>
  )
}

export default App
