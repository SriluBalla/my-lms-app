import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/my-lms-app/", // replace with your repo name
  plugins: [react()],
})
