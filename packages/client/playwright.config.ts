// ref: https://playwright.dev/docs/test-configuration

import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'on-first-retry',
    baseURL: 'https://localhost:3000',
    timezoneId: 'Europe/Berlin'
  },
  testDir: './tests/e2e',
  timeout: 60_000
}
export default config
