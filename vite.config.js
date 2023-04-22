import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  manifest: true,
  base: '/rylero.github.io/',
  plugins: [react()],
})