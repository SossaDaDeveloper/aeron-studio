import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: false, // User wants vanilla feel, no HMR noise in logs
    watch: null
  }
});
