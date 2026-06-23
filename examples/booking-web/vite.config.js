import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages 子路徑 https://cowrider2018.github.io/verdant-web-ui/booking-web/
  base: '/verdant-web-ui/booking-web/',
  plugins: [react()],
  server: {
    port: 5174,
    open: true,
  },
})
