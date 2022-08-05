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
  build: { target: 'es2020', sourcemap: true },
  optimizeDeps: { esbuildOptions: { target: 'esnext' } },

  // https://github.com/vitejs/vite/issues/3092#issuecomment-915952727
  // css: { modules: { root: '.' } as CSSModulesOptions },
});
