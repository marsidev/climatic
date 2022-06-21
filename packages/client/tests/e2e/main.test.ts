import type { Browser, Page } from '@playwright/test'

import { chromium, expect, test as it, test, devices } from '@playwright/test'
import { checkAppIsRunning, deleteScreenshots, waitFor } from './helpers'

const testsPath = './tests/e2e'
const ssPath = `${testsPath}/screenshots`

let browser: Browser
let page: Page

// https://playwright.dev/docs/test-auth#reuse-the-signed-in-page-in-multiple-tests
test.describe.configure({ mode: 'serial' })

// override default config
test.use({
  ...devices['iPhone 13 Pro'],
  locale: 'es-ES',
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ['geolocation']
})

test.beforeAll(async () => {
  await checkAppIsRunning()
  deleteScreenshots(ssPath)

  browser = await chromium.launch()

  page = await browser.newPage()
  await page.goto('/es')

  // screenshot the first view
  await page.screenshot({ path: `${ssPath}/0-beforeAll.png` })

  // wait until the page is loaded
  const skeleton = page.locator('.app-skeleton')
  await skeleton.waitFor({ state: 'detached' })

  // screenshot after skeleton disappears
  await page.screenshot({ path: `${ssPath}/1-beforeAll_no_skeleton.png` })

  // scroll down
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

  // screenshot the first view
  await page.screenshot({ path: `${ssPath}/2-beforeAll_scrolled_down.png` })
})

test.afterAll(async () => {
  // await page?.close()
  await browser?.close()
})

it('has valid title', async () => {
  await page.screenshot({ path: `${ssPath}/3-title_test.png` })
  expect(await page.title()).toContain('Climatic')
})

it('has expected sections', async () => {
  const selector = '#root > div > main'
  const main = await page.innerText(selector)
  const footer = await page.innerText(`${selector} > footer`)

  expect(main).toContain('Astrología')
  expect(main).toContain('Predicción')
  expect(footer).toContain('Luis Marsiglia')
})

it('can retrieve geolocation data', async () => {
  await page.locator('[aria-label="geolocation icon"]').click()
  await page.screenshot({ path: `${ssPath}/4-geo_clicked.png` })

  const spinner = page.locator('main > nav >> .chakra-spinner')
  await spinner.waitFor({ state: 'detached' })
  await page.screenshot({ path: `${ssPath}/5-no_spinner.png` })

  // it has italy emoji
  expect(await page.innerText('#root > div > main')).toContain('🇮🇹')
})

test('open search modal', async () => {
  const portalsBefore = await page.locator('.chakra-portal').count()

  await page.locator('[aria-label="search icon"]').click()

  const portalsAfter = await page.locator('.chakra-portal').count()

  expect(portalsAfter).toBe(portalsBefore + 1)
  await page.screenshot({ path: `${ssPath}/7-search-open.png` })
})

it('can search', async () => {
  await page.fill('input', 'Chicago')
  await page.screenshot({ path: `${ssPath}/7-search-input.png` })

  await waitFor(1500)

  const spinner = page.locator('.chakra-portal > .chakra-input__right-element > .chakra-spinner')
  await spinner.waitFor({ state: 'detached' })
  await page.screenshot({ path: `${ssPath}/8-search-results.png` })

  const resultsTitle = await page.innerText('.search-results > p')
  expect(resultsTitle).toContain('resultados')

  const results = await page.$$('.search-results > a')
  expect(results.length).toBeGreaterThan(0)
})

it('can select a city', async () => {
  await page.click('.search-results > a')

  const modal = page.locator('#chakra-modal-search')
  await modal.waitFor({ state: 'detached' })
  await page.screenshot({ path: `${ssPath}/9-result-selected.png` })

  const inner = await page.innerText('#root > div > main')
  expect(inner).toContain('Chicago')
})
