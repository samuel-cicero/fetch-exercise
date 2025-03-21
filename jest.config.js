/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
   testEnvironment: 'node',
   transform: {
      '^.+.tsx?$': ['ts-jest', {}],
   },
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
   collectCoverage: true,
   coverageReporters: ['json', 'html'],
   testMatch: ['**/?(*.)test.ts'],
};
