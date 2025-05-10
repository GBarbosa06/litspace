import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { onAuthStateChanged } from "firebase/auth"
import { useAuthentication } from "./hooks/useAuthentication"
import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"

import Register from "./pages/Register/Register"

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
              <Route path="/" element={<h2>Home</h2>} />
              <Route path="/about" element={<h2>About</h2>} />
              <Route path="/cadastro" element={!user ? <Register /> : <Navigate to="/" /> } />
              <Route path="/login" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/shelf" element={ <h2>Minha estante</h2>} />
              <Route path="/profile" element={ <h2>Meu perfil</h2>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <div className="footer">
              <p>Lit Space &copy; 2025</p>
              <p>All rights reserved</p>
            </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App