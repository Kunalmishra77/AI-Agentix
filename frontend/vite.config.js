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
            id.includes('node_modules/scheduler/')
          ) return 'vendor-react';

          // Framer Motion — only loaded on pages that animate
          if (id.includes('node_modules/framer-motion/')) return 'vendor-motion';

          // Lottie — heavy, lazy-gated by IntersectionObserver
          if (
            id.includes('node_modules/lottie-react/') ||
            id.includes('node_modules/@lottiefiles/') ||
            id.includes('node_modules/lottie-web/')
          ) return 'vendor-lottie';

          // Icon libraries — tree-shakeable but still sizable
          if (
            id.includes('node_modules/lucide-react/') ||
            id.includes('node_modules/react-icons/')
          ) return 'vendor-icons';

          // Form + validation stack
          if (
            id.includes('node_modules/react-hook-form/') ||
            id.includes('node_modules/@hookform/') ||
            id.includes('node_modules/zod/')
          ) return 'vendor-forms';

          // TanStack Query
          if (id.includes('node_modules/@tanstack/')) return 'vendor-query';

          // Utilities
          if (
            id.includes('node_modules/axios/') ||
            id.includes('node_modules/date-fns/') ||
            id.includes('node_modules/clsx/') ||
            id.includes('node_modules/tailwind-merge/')
          ) return 'vendor-utils';

          // 151 KB data file — only needed on tool/category pages
          if (id.includes('toolWorkspaces')) return 'data-workspaces';

          // Core agentix data — needed across many pages
          if (id.includes('agentixData') || id.includes('workflowConnections')) return 'data-core';
        },
      },
    },
    // Raise chunk warning threshold — we're intentionally splitting
    chunkSizeWarningLimit: 400,
  },
});
