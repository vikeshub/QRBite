import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        menuEditor: 'http://localhost:5001/assets/remoteEntry.js',
        menuViewer: 'http://localhost:5002/assets/remoteEntry.js',
        orderBoard: 'http://localhost:5003/assets/remoteEntry.js',
        adminDashboard: 'http://localhost:5004/assets/remoteEntry.js',
        landingPage: 'http://localhost:5005/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5000
  }
})