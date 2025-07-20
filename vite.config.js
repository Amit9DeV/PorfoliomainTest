import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    host: '0.0.0.0', // Exposes the server to the local network
    port: 5173,      // (Optional) Specify the port
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion', 'gsap', '@gsap/react'],
          icons: ['react-icons', 'iconoir-react', 'lucide-react'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          ui: ['@headlessui/react', '@radix-ui/react-dialog', '@radix-ui/react-slot', '@radix-ui/react-tooltip']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@react-three/fiber', '@react-three/drei', 'three']
  }
})
