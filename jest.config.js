module.exports = {
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src'
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
