import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        '**/android/**',
        '**/build/**',
        '**/.gradle/**',
        '**/node_modules_broken_20260922/**'
      ]
    }
  }
})
