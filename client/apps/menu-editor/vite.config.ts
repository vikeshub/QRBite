import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/postcss'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'menuEditor',
      filename: 'remoteEntry.js',
      exposes: {
        './MenuEditor': './src/MenuEditor.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss]
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5001
  }
})