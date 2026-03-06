import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/

console.log("This is my env", process.env.VITE_LOCAL)
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_LOCAL,
          changeOrigin: true,
          // secure: false,
        },
        "/uploads": {
          target: env.VITE_LOCAL,
          changeOrigin: true,
        }
      },
    },
  });
}