import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
// https://github.com/gxmari007/vite-plugin-eslint/pull/90
// import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: { open: true },
  plugins: [
    react(),
    // { ...eslint(), apply: 'serve' }, // dev only to reduce build time
    { ...checker({ typescript: true }), apply: 'serve' }, // dev only to reduce build time
  ],

  // Import HDF5 compression plugins as static assets
  assetsInclude: ['**/*.so'],

  // `es2020` required by @h5web/h5wasm for BigInt `123n` notation support
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
  build: {
    target: 'es2020',
    // Out of memory! https://github.com/vitejs/vite/issues/2433
    // sourcemap: true,
  },
});
