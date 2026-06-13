import { Routes, Route } from 'react-router-dom'
import Navbar from './navbar'
import Major from './components/Home/major'
import BookMeet from './components/BookMeet'
import Product from './pages/Product'
import Blogs from './pages/Blogs'
import ReachUs from './pages/ReachUs'
import AboutUs from './pages/AboutUs'
import Blog from './components/Blog/blog'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Major />} />
        <Route path="/book-meet" element={<BookMeet />} />
        <Route path="/product" element={<Product />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/ev-charging-control-systems" element={<Blog />} />
        <Route path="/reach-us" element={<ReachUs />} />
      </Routes>
    </>
  )
}

export default App
