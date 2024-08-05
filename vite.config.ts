import path from "path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.safecast.org/en-US/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/nominatim": {
        target: "https://nominatim.openstreetmap.org/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nominatim/, ""),
      },
    },
  },
});
