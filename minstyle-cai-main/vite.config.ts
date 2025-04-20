import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  return {
    // Critical Vercel-specific base path
    base: mode === 'production' ? '/' : '/',
    
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api": {
          target: "http://localhost:5002",
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        },
      },
    },
    
    plugins: [
      react(),
      mode === "development" && componentTagger()
    ].filter(Boolean),
    
    build: {
      outDir: "../dist", // Changed to output to root/dist
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          entryFileNames: `[name].[hash].js`,
          chunkFileNames: `[name].[hash].js`,
          assetFileNames: `[name].[hash].[ext]`,
          manualChunks: {
            react: ['react', 'react-dom'],
            firebase: ['firebase/app', 'firebase/auth'],
            vendor: ['react-router-dom', 'axios']
          }
        }
      }
    },
    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Keep this simple - let Vite handle modules
      },
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@firebase/app',
        '@firebase/auth',
        'react-router-dom'
      ],
      exclude: ['js-big-decimal']
    },
    
    // Add this for better error tracking
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    }
  }
});