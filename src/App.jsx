import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const onHashChange = () => {
      setRoute(window.location.hash || '#/')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

export default function App() {
  const route = useHashRoute()
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash once per session
    return !sessionStorage.getItem('iky-splash-shown')
  })

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('iky-splash-shown', '1')
    setShowSplash(false)
  }, [])

  const renderPage = () => {
    // Parse route: #/tentang -> /tentang
    const path = route.replace(/^#/, '') || '/'

    if (path === '/') return <HomePage />

    // Simple sub-page matching
    if (path === '/tentang' || path === '/proyek' || path === '/kontak') {
      return <HomePage initialSection={path.slice(1)} />
    }

    return <NotFoundPage />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <Navbar />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  )
}
