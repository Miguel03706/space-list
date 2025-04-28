import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@honkhonk/vite-plugin-svgr";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: 'src/content.tsx',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  plugins: [react(), svgr()],
})
