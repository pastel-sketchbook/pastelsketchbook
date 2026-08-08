import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/recharts')) return 'recharts-chunk'
            if (id.includes('node_modules/@google/genai')) return 'genai-chunk'
            if (id.includes('node_modules/@tanstack/react-router')) return 'react-router-chunk'
            if (id.includes('node_modules/framer-motion')) return 'framer-motion-chunk'
          },
        },
      },
      // Show chunk info during build
      reportCompressedSize: true,
      chunkSizeWarningLimit: 600,
    },
  }
})
