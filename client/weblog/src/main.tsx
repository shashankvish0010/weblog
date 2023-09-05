import ReactDOM from 'react-dom'
import App from './App.tsx'
import './index.css'
import {RegisterContextProvider} from './Context/UserReg.tsx'
import {UserContextProvider} from './Context/UserData.tsx'
import {AdminContextProvider} from './Context/AdminData.tsx'
import {PostContextProvider} from './Context/PostData.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
 <UserContextProvider>
  <AdminContextProvider>
  <RegisterContextProvider>
  <PostContextProvider>
  <App/>
  </PostContextProvider>
  </RegisterContextProvider>
  </AdminContextProvider>
 </UserContextProvider>
)
