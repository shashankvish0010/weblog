import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RegisterContextProvider} from './Context/UserReg.tsx'
import {UserContextProvider} from './Context/UserData.tsx'
import {AdminContextProvider} from './Context/AdminData.tsx'
import {PostContextProvider} from './Context/PostData.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
 <UserContextProvider>
  <AdminContextProvider>
  <RegisterContextProvider>
  <PostContextProvider>
  <App/>
  </PostContextProvider>
  </RegisterContextProvider>
  </AdminContextProvider>
 </UserContextProvider>
  </React.StrictMode>,
)
