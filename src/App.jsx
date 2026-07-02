import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import Navbar from './navbar'
import ScrollToTop from './components/ScrollToTop'
import Major from './components/Home/major'
import BookMeet from './pages/BookMeet'
import Product from './components/Product/Product'
import CSMS from './components/Product/CSMS'
import Planner from './components/Product/Planner'
import Blogs from './components/Blog/Blogs'
import ReachUs from './components/ReachUs/ReachUs'
import AboutUs from './components/AboutUs/AboutUs'
import Blog from './components/Blog/blog'
import ApplyToJoin from './pages/ApplyToJoin'
import Preloader from './components/Preloader'
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const AccessibilityStatement = lazy(() => import('./pages/AccessibilityStatement'))
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'))

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const [showContent, setShowContent] = useState(false)
  const [preloaderActive, setPreloaderActive] = useState(true)
  const loopStartRef = useRef(null) // null = first play, number = loop start time (seconds)

  // Redirect to landing page and scroll to top on page refresh
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType('navigation')
    const isReload =
      (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') ||
      performance.navigation?.type === 1

    if (isReload) {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual'
      }
      window.scrollTo(0, 0)
      if (location.pathname !== '/') {
        navigate('/', { replace: true })
      }
    }
  }, [])

  // Fallback: show hero content after 5s even if video doesn't autoplay
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll-reveal: animate sections below the fold as they enter the viewport
  useEffect(() => {
    let observer
    let fallbackTimer

    const reveal = (section) => {
      section.style.opacity = '1'
      section.style.transform = 'translateY(0)'
    }

    const timer = setTimeout(() => {
      const sections = Array.from(document.querySelectorAll('section'))

      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top >= window.innerHeight) {
          section.style.opacity = '0'
          section.style.transform = 'translateY(24px)'
          section.style.transition = 'opacity 0.65s ease-out, transform 0.65s ease-out'
        }
      })

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              reveal(entry.target)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      )

      sections.forEach(section => observer.observe(section))

      // Hard failsafe: make everything visible after 1.5s no matter what
      fallbackTimer = setTimeout(() => {
        sections.forEach(reveal)
      }, 1500)
    }, 300)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
      if (observer) observer.disconnect()
    }
  }, [location.pathname])

  const handleTimeUpdate = (event) => {
    const video = event.target
    if (video.currentTime > 3.5) {
      setShowContent(true)
    }
    // Seamless loop: when near the end (in loop mode), jump back before onEnded fires
    if (loopStartRef.current !== null && video.duration > 0 && video.currentTime >= video.duration - 0.2) {
      video.currentTime = loopStartRef.current
    }
  }

  const handleVideoEnded = (event) => {
    const video = event.target
    // First completion: lock the loop to the last ~6 seconds (globe steady rotation)
    if (loopStartRef.current === null) {
      loopStartRef.current = Math.max(0, video.duration - 6)
    }
    video.currentTime = loopStartRef.current
    video.play()
  }

  return (
    <>
      {preloaderActive && (
        <Preloader
          onComplete={() => {
            setPreloaderActive(false)
            setShowContent(true)
          }}
        />
      )}
      <ScrollToTop />
      <Navbar />

      {/* Global Background Video (Globe) */}
      <div className={`fixed inset-0 z-0 bg-black transition-opacity duration-1000 ${isHome ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/Digital%20globe.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

      <div key={location.pathname} className="page-transition relative z-10">
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Major showContent={showContent} />} />
          <Route path="/book-meet" element={<BookMeet />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/csms" element={<CSMS />} />
          <Route path="/product/planner" element={<Planner />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/ev-charging-control-systems" element={<Blog />} />
          <Route path="/reach-us" element={<ReachUs />} />
          <Route path="/apply" element={<ApplyToJoin />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
