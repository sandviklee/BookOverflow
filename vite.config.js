import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2015',
    minify: true,
    rollupOptions: {
      output: {
        format: 'esm'
      }
    }
  },
  babel: {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime'
    ]
  }
});
