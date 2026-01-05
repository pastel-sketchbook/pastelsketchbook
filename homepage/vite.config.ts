import path from 'node:path'
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
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate chunks for better code splitting
            'recharts-chunk': ['recharts'],
            'genai-chunk': ['@google/genai'],
            'react-router-chunk': ['@tanstack/react-router'],
            'framer-motion-chunk': ['framer-motion'],
          },
        },
      },
      // Show chunk info during build
      reportCompressedSize: true,
      chunkSizeWarningLimit: 600,
    },
  }
})
