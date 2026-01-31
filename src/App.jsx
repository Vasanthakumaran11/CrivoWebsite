import { Link, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './components/home'
import BookMeet from './components/BookMeet'

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-meet" element={<BookMeet />} />
      </Routes>
    </>
  )
}

export default App
