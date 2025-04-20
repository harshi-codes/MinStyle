import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  return {
    // Base path for production (empty string for root)
    base: mode === 'production' ? '' : '/',
    
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
    },
    
    plugins: [
      react(), 
      mode === "development" && componentTagger()
    ].filter(Boolean),
    
    // Remove envDir and process.env overrides - Vite handles this automatically
    
    build: {
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          // Better chunking for production
          manualChunks: {
            react: ['react', 'react-dom'],
            firebase: ['firebase/app', 'firebase/auth'],
          },
        },
      },
    },
    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Remove Firebase aliases - let Vite handle node_modules
      },
    },
    
    // Optional: Improve development experience
    optimizeDeps: {
      include: ['react', 'react-dom', '@firebase/app', '@firebase/auth'],
    },
  }
});