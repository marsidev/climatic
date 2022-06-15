/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  server: {
    proxy: { '/api': 'http://localhost:3001' },
    https: false
  },
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: '../../dist',
    emptyOutDir: false
  },
  test: {
    globals: false,
    environment: 'jsdom',
    include: [
      './tests/integration/**/*.{test,spec}.{ts,mts,cts,tsx}'
    ],
    reporters: 'verbose',
    setupFiles: [resolve(__dirname, 'tests/integration/helpers/vitest-setup.ts')]
  }
})
