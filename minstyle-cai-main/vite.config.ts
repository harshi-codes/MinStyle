import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    commonjsOptions: {
      include: [/firebase/, /node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: [],
    }
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/auth"],
    exclude: ["firebase"]
  }
});