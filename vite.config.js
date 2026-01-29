import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  
  server: {
    port: 3000,
    open: true,
    // Proxy WebSocket connections to the LAN server for multiplayer
    proxy: {
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
  
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        config: resolve(__dirname, 'config.html'),
      },
    },
  },
  
  resolve: {
    alias: {
      three: 'three',
    },
  },
  
  // Treat THREE as external when using the legacy global script approach
  // This allows gradual migration
  optimizeDeps: {
    include: ['three', 'cannon-es'],
  },
});
