import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  } : undefined,
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean,
  ),
  define: {
    "process.env": {},
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "firebase/app": "@firebase/app",
      "firebase/auth": "@firebase/auth",
    },
  },
}));
