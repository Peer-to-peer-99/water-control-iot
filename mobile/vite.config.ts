import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  root: './src',
  envDir:  '../',
  plugins: [tailwindcss(), vue()],
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
});
