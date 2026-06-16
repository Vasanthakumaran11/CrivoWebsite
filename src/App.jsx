import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './navbar'
import ScrollToTop from './components/ScrollToTop'
import Major from './components/Home/major'
import BookMeet from './components/BookMeet'
import Product from './pages/Product'
import CSMS from './components/Product/CSMS'
import Planner from './components/Product/Planner'
import Blogs from './pages/Blogs'
import ReachUs from './pages/ReachUs'
import AboutUs from './pages/AboutUs'
import Blog from './components/Blog/blog'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [showContent, setShowContent] = useState(false)

  const handleTimeUpdate = (event) => {
    if (event.target.currentTime > 3.5) {
      setShowContent(true)
    }
  }

  const handleVideoLoop = (event) => {
    const video = event.target
    if (video.duration > 5) {
      video.currentTime = 4.5
    } else {
      video.currentTime = 0
    }
    video.play()
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* Global Background Video (Globe) */}
      <div className={`fixed inset-0 -z-10 bg-black transition-opacity duration-1000 ${isHome ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoLoop}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/Digital%20globe.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
      </div>

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
      </Routes>
    </>
  )
}

export default App
