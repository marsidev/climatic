/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const jestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  testTimeout: 60000
}

export default jestConfig
