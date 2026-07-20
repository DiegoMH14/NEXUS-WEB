import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ============================================================
// NEXUS Landing — configuración de Vite
// Misma base que el proyecto principal de NEXUS (React + TS + Vite)
// ============================================================
export default defineConfig({
  plugins: [react()],
  base: './',
})
