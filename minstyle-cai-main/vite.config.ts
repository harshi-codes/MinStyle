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
      outDir: "dist", // Changed to output to root/dist
      emptyOutDir: true,
      sourcemap: mode === 'development',
      rollupOptions: {
        external: [
          // Explicitly list Firebase modules to externalize
          'firebase',
          'firebase/app',
          'firebase/auth',
          'firebase/firestore' // Add if using Firestore
        ]
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
        // Add these aliases for Firebase
        "firebase/app": "firebase/app/dist/index.esm.js",
        "firebase/auth": "firebase/auth/dist/index.esm.js",
        "firebase/firestore": "firebase/firestore/dist/index.esm.js" // Add if using Firestore
      }
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'axios',
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