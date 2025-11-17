import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BOOK',
        short_name: 'BOOK',
        start_url: '/adminDashboard',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d47a1',
        icons: [
          {
            src: '/icons/logo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/logo512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',  
    port: 5173,       
    strictPort: true, 
  },
})