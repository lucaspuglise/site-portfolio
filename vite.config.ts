import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Adiciona a linha base aqui:
  // 1. Usa '/' se o repositório se chamar 'lucaspuglise.github.io'
  // 2. Usa '/nome-do-repositorio/' se tiver outro nome (ex: '/portfolio/')
  base: '/site-portfolio/', 

  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})