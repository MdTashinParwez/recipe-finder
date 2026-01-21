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



function App() {

  return (
    <div className="min-h-screen flex flex-col" >
      <Navbar/>
     
      
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
      <Footer />
     
    </div>
  )
}

export default App
