/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environment: 'node',
		include: ['./tests/**/*.{test,spec}.{ts,mts,cts,tsx}'],
		reporters: 'verbose',
		hookTimeout: 60000,
		testTimeout: 40000
	}
})
