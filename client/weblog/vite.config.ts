import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/api' : 'http://localhost:8080/',
      '/user/register' : { target : 'http://localhost:8080/', },
      '/user/login' :  { target : 'http://localhost:8080/', }
  }
}})
