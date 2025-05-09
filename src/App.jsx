import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

const App = () => {
  return (
    <div>
      <h1>Lit <span>Space</span></h1>

      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<h2>Home</h2>} />
            <Route path="/about" element={<h2>About</h2>} />
            <Route path="/contact" element={<h2>Contact</h2>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <div className="footer">
            <p>Lit Space &copy; 2023</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App