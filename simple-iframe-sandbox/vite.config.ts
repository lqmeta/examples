import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      /**
       * 配置 Vite alias 别名导入
       */
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
})
