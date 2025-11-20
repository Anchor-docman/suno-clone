import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for production
    target: 'esnext', // Modern browsers
    chunkSizeWarningLimit: 1000, // Increase chunk warning limit
  },
  server: {
    // Setup proxy for local development to handle API requests smoothly if running backend locally
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8788', // Standard wrangler dev port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});