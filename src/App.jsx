import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthentication } from "./hooks/useAuthentication"
import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Book from "./pages/Book/Book"
import CreateReview from "./pages/CreateReview/CreateReview"
import Shelf from "./pages/Shelf/Shelf"

const App = () => {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (loadingUser) {
        setUser(false);
      }
    });
  }, [auth, loadingUser]);
  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-white">Carregando...</h1>
      </div>
    );
  }
  
  return (
    <div className="bg-[#1e1e2f] min-h-screen text-white">

      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cadastro" element={!user ? <Register /> : <Navigate to="/" /> } />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/review/:id" element={user ? <CreateReview /> : <Navigate to="/login" />} />
              <Route path="/book/:id" element={<Book />} />
              <Route path="/shelf" element={ user ? <Shelf /> : <Navigate to="/login" />} />
              <Route path="/profile" element={ <h2>Meu perfil</h2>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App