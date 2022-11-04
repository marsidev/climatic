/// <reference types="vite/client" />
/// <reference types="vitest" />

import type { UserConfig as VitestUserConfigInterface } from 'vitest/config'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const vitestConfig: VitestUserConfigInterface = {
	test: {
		globals: false,
		environment: 'jsdom',
		include: ['./tests/integration/**/*.{test,spec}.{ts,mts,cts,tsx}'],
		reporters: 'verbose',
		setupFiles: [resolve(__dirname, 'tests/integration/helpers/vitest-setup.ts')]
	}
}

export default defineConfig({
	server: {
		proxy: { '/api': 'http://localhost:3001' },
		https: false
	},
	plugins: [react(), tsconfigPaths()],
	build: {
		outDir: './dist',
		emptyOutDir: false
	},
	test: vitestConfig.test
})
