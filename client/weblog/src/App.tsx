import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'

const App: React.FC = () => {
  return (
     <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
     </Router>
  )
}

export default App