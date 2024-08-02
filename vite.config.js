import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { compression } from 'vite-plugin-compression2'
// import analyze from 'rollup-plugin-analyzer'
// import { visualizer } from 'rollup-plugin-visualizer'
import terser from '@rollup/plugin-terser'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
  plugins: [
    react(),
    compression(),
    terser(),
    // analyze(),
    // visualizer({
    //   gzipSize: true,
    //   brotliSize: true,
    //   emitFile: false,
    //   filename: 'stats.html', //分析图生成的文件名
    //   open: true, //如果存在本地服务端口，将在打包后自动展示
    // }),
  ],
  define: {
    'process.env': {},
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === 'SOURCEMAP_ERROR') {
          return
        }
        defaultHandler(warning)
      },
      output: {
        manualChunks: {
          lodash: ['lodash'],
          react: ['react', 'react-dom', 'react-router-dom'],
          d3: ['d3'],
          material: ['@mui/material', '@mui/icons-material'],
          highlight: ['highlight.js'],
          dayjs: ['dayjs'],
        },
      },
    },
    cssCodeSplit: true, // Enable CSS code splitting
    minify: 'terser', // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true, // Remove debugger statements in production
      },
    },
  },
  cacheDir: 'node_modules/.vite', // Specify cache directory
})
