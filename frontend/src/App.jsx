import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/Footer';
import { useLocation } from "react-router-dom";
import ScrollToTop from './components/ScrollTotTop';



function App() {
    const hideLayoutRoutes = ["/login", "/register"];

    const location = useLocation();
    const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col" >
      {!hideLayout && <Navbar />}
     
       <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/recipe/:recipeId' element={<RecipePage/>} />
        <Route path ='/login' element={<LoginPage/>} />
        <Route path ='/register' element={<RegisterPage/>} />
       <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />



        
      </Routes>
      {!hideLayout && <Footer />}
     
    </div>
  )
}

export default App
