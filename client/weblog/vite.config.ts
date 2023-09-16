import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8080' },
      '/search/post': { target: 'http://localhost:8080' },
      '/send/updates': { target: 'http://localhost:8080'},
      '/user/register': { target: 'http://localhost:8080'},
      '/user/login': { target: 'http://localhost:8080' },
      '/admin/register': { target: 'http://localhost:8080' },
      '/admin/login': { target: 'http://localhost:8080' },
      '/user/logout': { target: 'http://localhost:8080' },
      '/admin/logout': { target: 'http://localhost:8080' },
      '/add/subscriber': { target: 'http://localhost:8080' },
      '/edit/profile': { target: 'http://localhost:8080' },
      '/edit/blogpost': { target: 'http://localhost:8080' },
      '/unsubscribe': { target: 'http://localhost:8080' },
      '/publish/blogpost': { target: 'http://localhost:8080' },
      '/api/posts': { target: 'http://localhost:8080' },
      '/view/post': { target: 'http://localhost:8080' },
      '/fetch/user/posts': { target: 'http://localhost:8080' },
      '/delete/post': { target: 'http://localhost:8080' },
      '/flag/post': { target: 'http://localhost:8080' },
      '/verify/account/': { target: 'http://localhost:8080' },
      '/verify/account/re': { target: 'http://localhost:8080' },
    }
  }
})
