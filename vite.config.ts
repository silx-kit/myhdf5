import react from '@vitejs/plugin-react';
// import type { CSSModulesOptions } from 'vite';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  server: { open: true },
  preview: { open: true },
  plugins: [react(), eslintPlugin()],

  // `es2020` required by @h5web/h5wasm for BigInt `123n` notation support
  optimizeDeps: { esbuildOptions: { target: 'es2020' } },
  build: {
    target: 'es2020',
    // Out of memory! https://github.com/vitejs/vite/issues/2433
    // sourcemap: true,
  },
});
