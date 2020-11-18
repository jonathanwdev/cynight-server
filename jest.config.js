module.exports = {
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/modules/**/infra/database/**',
    '!<rootDir>/src/shared/database/**',
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
  // preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/protocols/'
  ],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
