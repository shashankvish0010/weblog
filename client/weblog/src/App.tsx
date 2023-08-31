import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import AdminReg from './pages/AdminReg'
import AdminLog from './pages/AdminLog'
import UserProfile from './pages/UserProfile'
import WriteBlog from './pages/WriteBlog'
import Contact from './pages/Contact'
import About from './pages/About'
import Post from './pages/Post'
import Cpanel from './pages/Cpanel'
import OTPverification from './pages/OTPverification'
import EditPost from './pages/EditPost'
import Email from '../src/pages/Email'


const App: React.FC = () => {
  return (
     <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/panel' element={<Cpanel/>} />
        <Route path='/sendmail' element={<Email/>}/>
        <Route path='/about' element={<About/>} />
        <Route path='/getview/post/:id' element={<Post/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/admin/reg' element={<AdminReg/>} />
        <Route path='/admin/log' element={<AdminLog/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/verify' element={<OTPverification/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<UserProfile/>} />
        <Route path='/write' element={<WriteBlog/>} />
        <Route path='/edit/post/:id' element={<EditPost/>} />
      </Routes>
     </Router>
  )
}

export default App