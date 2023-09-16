import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': { target: 'https://weblog-backend-247o.onrender.com' },
      '/search/post': { target: 'https://weblog-backend-247o.onrender.com' },
      '/send/updates': { target: 'https://weblog-backend-247o.onrender.com'},
      '/user/register':  'https://weblog-backend-247o.onrender.com' ,
      '/user/login': { target: 'https://weblog-backend-247o.onrender.com' },
      '/admin/register': { target: 'https://weblog-backend-247o.onrender.com' + '/admin/register' },
      '/admin/login': { target: 'https://weblog-backend-247o.onrender.com' },
      '/user/logout': { target: 'https://weblog-backend-247o.onrender.com' },
      '/admin/logout': { target: 'https://weblog-backend-247o.onrender.com' },
      '/add/subscriber': { target: 'https://weblog-backend-247o.onrender.com' },
      '/edit/profile': { target: 'https://weblog-backend-247o.onrender.com' },
      '/edit/blogpost': { target: 'https://weblog-backend-247o.onrender.com' },
      '/unsubscribe': { target: 'https://weblog-backend-247o.onrender.com' },
      '/publish/blogpost': { target: 'https://weblog-backend-247o.onrender.com' },
      '/api/posts': { target: 'https://weblog-backend-247o.onrender.com' },
      '/view/post': { target: 'https://weblog-backend-247o.onrender.com' },
      '/fetch/user/posts': { target: 'https://weblog-backend-247o.onrender.com' },
      '/delete/post': { target: 'https://weblog-backend-247o.onrender.com' },
      '/flag/post': { target: 'https://weblog-backend-247o.onrender.com' },
      '/verify/account/': { target: 'https://weblog-backend-247o.onrender.com' },
      '/verify/account/re': { target: 'https://weblog-backend-247o.onrender.com' },
    }
  }
})
