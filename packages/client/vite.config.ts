/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { resolve } from 'path'

export default defineConfig({
  server: {
    proxy: { '/api': 'http://localhost:3001' },
    https: false,
    port: 3000
  },
  plugins: [react(), tsconfigPaths(), basicSsl()],
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
