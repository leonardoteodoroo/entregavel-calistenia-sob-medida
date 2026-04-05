import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import BottomNav from './components/BottomNav/BottomNav'
import BreatheModal from './components/BreatheModal/BreatheModal'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const BibliotecaPage = lazy(() => import('./pages/BibliotecaPage/BibliotecaPage'))
const RituaisPage = lazy(() => import('./pages/RituaisPage/RituaisPage'))
const MindsetPage = lazy(() => import('./pages/MindsetPage/MindsetPage'))
const GuiasPage = lazy(() => import('./pages/GuiasPage/GuiasPage'))

function App() {
  return (
    <BrowserRouter>
      <a className="sr-only" href="#main-content">
        Pular para o conteúdo principal
      </a>

      <Suspense
        fallback={
          <main id="main-content" className="page-content">
            <section className="section">
              <p className="label-md">Carregando</p>
              <p className="body-md text-variant mt-4">
                Montando o santuário botânico.
              </p>
            </section>
          </main>
        }
      >
        <main id="main-content" className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/biblioteca" element={<BibliotecaPage />} />
            <Route path="/biblioteca/:oilId" element={<BibliotecaPage />} />
            <Route path="/rituais" element={<RituaisPage />} />
            <Route path="/mindset" element={<MindsetPage />} />
            <Route path="/guias" element={<GuiasPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Suspense>

      <BottomNav />
      <BreatheModal />
    </BrowserRouter>
  )
}

export default App
