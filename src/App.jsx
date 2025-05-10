import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"

import Register from "./pages/Register/Register"

const App = () => {
  return (
    <div className="bg-[#1e1e2f] min-h-screen text-white">

      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<h2>Home</h2>} />
            <Route path="/about" element={<h2>About</h2>} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/login" element={<h2>Login</h2>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <div className="footer">
            <p>Lit Space &copy; 2025</p>
            <p>All rights reserved</p>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App