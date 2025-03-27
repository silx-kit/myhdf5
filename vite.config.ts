import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

export default defineConfig({
  server: { open: true },
  plugins: [
    react(),
    { ...checker({ typescript: true }), apply: 'serve' }, // dev only to reduce build time
  ],

  // Import HDF5 compression plugins as static assets
  assetsInclude: ['**/*.so'],

  // `es2020` required by @h5web/h5wasm for BigInt `123n` notation support
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
  build: {
    target: 'es2020',
    sourcemap: true,
  },
});
