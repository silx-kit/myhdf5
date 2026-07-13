import react from '@vitejs/plugin-react';
import sonda from 'sonda/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

export default defineConfig({
  server: { open: true },
  build: { sourcemap: true },

  plugins: [
    react(),
    { ...checker({ typescript: true }), apply: 'serve' }, // dev only to reduce build time
    sonda({ enabled: !process.env.CI }), // disable bundle analysis on build in CI
  ],

  // Import HDF5 compression plugins as static assets
  assetsInclude: ['**/*.so'],
});
