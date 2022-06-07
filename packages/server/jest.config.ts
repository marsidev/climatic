/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const jestConfig = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@app': '<rootDir>/src/app',
    '@server': '<rootDir>/src/server',
    '@lib(.*)': '<rootDir>/src/lib$1',
    '@plugins(.*)': '<rootDir>/src/plugins$1',
    '@routes(.*)': '<rootDir>/src/routes$1',
    '@types(.*)': '<rootDir>/src/types$1'
  },
  testEnvironment: 'node'
}

export default jestConfig
