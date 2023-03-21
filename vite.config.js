import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
  },
  build: {
    target: "es2015",
    minify: true,
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
  test: {
    globals: true, // Use globals so we don't need to use imports
    environment: "jsdom", // We are developing for web
  },
  babel: {
    presets: ["@babel/preset-env"],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-runtime",
    ],
  },
});
