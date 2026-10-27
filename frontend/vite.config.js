import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React runtime — cached forever after first visit
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/react-router/') ||
            id.includes('node_modules/@remix-run/') ||
            id.includes('node_modules/scheduler/')
          ) return 'vendor-react';

          // Framer Motion
          if (id.includes('node_modules/framer-motion/')) return 'vendor-motion';

          // Icon libraries — tree-shakeable but still sizable
          if (
            id.includes('node_modules/lucide-react/') ||
            id.includes('node_modules/react-icons/')
          ) return 'vendor-icons';

          // Utilities
          if (
            id.includes('node_modules/clsx/') ||
            id.includes('node_modules/tailwind-merge/')
          ) return 'vendor-utils';
        },
      },
    },
    chunkSizeWarningLimit: 400,
  },
});
