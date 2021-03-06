module.exports = {
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/modules/**/infra/database/**',
    '!<rootDir>/src/shared/infra/database/index.ts',
    '!**/importHandler.ts'
  ],
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    "**/*.spec.ts",
    "**/*.test.ts",
  ],
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  coveragePathIgnorePatterns: [
    '/migrations/',
    '/protocols/'
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
}
