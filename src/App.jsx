import { Link, Routes, Route } from 'react-router-dom'
import Navbar from './navbar'
import Major from './components/Home/major'
import BookMeet from './components/BookMeet'

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Major />} />
        <Route path="/book-meet" element={<BookMeet />} />
      </Routes>
    </>
  )
}

export default App
