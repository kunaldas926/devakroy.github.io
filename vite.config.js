/* eslint-disable no-undef */
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/devakroy.github.io/' : '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    target: ['es2022'], // Supports top-level await
    minify: 'terser',
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
      output: {
        comments: false,
      },
    },
    cssCodeSplit: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    open: true,
    port: 5173,
  },
});
