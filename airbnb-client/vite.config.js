import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_LOCAL,
        changeOrigin: true,
        // secure: false,
      },
      "/uploads": {
        target: [process.env.VITE_REMOTE],
        changeOrigin: true,
      }
    },
    allowedHosts: []
  },
});
