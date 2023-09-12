import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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
    fs: {
      // Allowing serving files from outside root
      allow: ["..", "../concepts", "../../concepts"],
    },
    proxy: {
      "/concepts/*": {
        target: "http://localhost:4000",
        rewrite: (path) => path.replace(/^\/concepts/, ""),
      },
    },
  },
});
