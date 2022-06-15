import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    include: [
      './tests/**/*.{test,spec}.{ts,mts,cts,tsx}'
    ],
    reporters: 'verbose'
  }
})
