import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserContextProvider} from './Context/UserData.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
 <UserContextProvider>
  <App/>
 </UserContextProvider>
  </React.StrictMode>,
)
