import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RegisterContextProvider} from './Context/UserReg.tsx'
import {UserContextProvider} from './Context/UserData.tsx'
import {AdminContextProvider} from './Context/AdminData.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
 <UserContextProvider>
  <AdminContextProvider>
  <RegisterContextProvider>
  <App/>
  </RegisterContextProvider>
  </AdminContextProvider>
 </UserContextProvider>
  </React.StrictMode>,
)
