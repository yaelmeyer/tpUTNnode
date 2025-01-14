import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "../pages/Home"
import Series from '../pages/Series'
import Favoritos from "../pages/Favoritos"
import Login from '../pages/Login'
import { useState } from "react"

const AppRouter = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log('holi')
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={isAuthenticated ?<Home /> : <Navigate to="login"/>} />
        <Route path="/series" element={isAuthenticated ?<Series /> : <Navigate to="login"/>} />
        <Route path="/favoritos" element={isAuthenticated ?<Favoritos /> : <Navigate to="login"/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter