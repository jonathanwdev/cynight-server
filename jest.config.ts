import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

export default {
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  bail: true,
  clearMocks: true,
  coverageProvider: 'v8',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/modules/**/*.ts'],
  coverageDirectory: './coverage',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
