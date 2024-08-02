import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { compression } from 'vite-plugin-compression2'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [react(), compression()],
  define: {
    'process.env': {},
  },
  build: {
    sourcemap: true,
  },
})
