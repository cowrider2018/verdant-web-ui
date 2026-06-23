import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages 部署在子路徑 https://cowrider2018.github.io/verdant-sales-web/
  base: '/verdant-sales-web/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})
