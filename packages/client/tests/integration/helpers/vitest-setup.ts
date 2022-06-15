import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

import { afterAll, afterEach, beforeAll, expect, vi } from 'vitest'
import { server } from '../mocks/server'

/* tweak to avoid errors between vitest and @testing-library/jest-dom
  @ref: https://github.com/testing-library/jest-dom/issues/439#issuecomment-1087504347
  @ref: https://github.com/testing-library/jest-dom/issues/427#issuecomment-1110985202
*/
import matchers from '@testing-library/jest-dom/matchers'
declare global {
  namespace Vi {
    interface JestAssertion<T = any>
      // eslint-disable-next-line no-undef
      extends jest.Matchers<void, T>,
        TestingLibraryMatchers<T, void> {}
  }
}
expect.extend(matchers)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// setup msw
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
