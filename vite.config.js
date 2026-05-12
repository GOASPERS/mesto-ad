import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://mesto.nomoreparties.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  base: './',
});
