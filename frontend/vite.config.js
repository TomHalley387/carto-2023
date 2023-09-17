import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Determine the API target based on the environment
const isDev = process.env.NODE_ENV === "development";
const apiTarget = isDev ? "http://localhost:4499" : "https://api.dddd.com";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("../backend/vue-dist", import.meta.url)),
  },
  server: {
    proxy: {
      /*
      "/api*": {
        target: apiTarget,
        changeOrigin: true,
      },*/
      "/api/": {
        target: apiTarget,
        changeOrigin: true,
      },
      "/img/concepts/": {
        target: apiTarget,
        //  rewrite: (path) => path.replace(/^\/concepts/, ""),
        changeOrigin: true,
      },
      "/img/articles/": {
        target: apiTarget,
        //  rewrite: (path) => path.replace(/^\/concepts/, ""),
        changeOrigin: true,
      },
      /*
      "/concepts/*": {
        target: apiTarget,
        rewrite: (path) => path.replace(/^\/concepts/, ""),
        changeOrigin: true,
      },*/
    },
  },
});
