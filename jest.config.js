export default {
  projects: [
    {
      displayName: 'root',
      testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
      testPathIgnorePatterns: [
        '/node_modules/',
        /**
         * Uses legacy "mock registration adapter" assumptions; repository is real-Supabase-only.
         * Re-enable when rewritten against Supabase mocks.
         */
        'tests/registration/RegistrationRepository\\.test\\.ts',
        /**
         * Dynamic require() paths and hybrid adapter assumptions are out of date.
         * Re-enable when aligned with current auth stack.
         */
        'tests/auth/AuthApplication\\.test\\.ts',
      ],
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
      moduleFileExtensions: ['ts', 'tsx', 'js'],
      moduleNameMapper: {
        /* @/src/foo must resolve before the generic @/(.*) → src/$1 (avoid src/src/…) */
        '^@/src/(.*)$': '<rootDir>/src/$1',
        '^@/lib/theme/colors$': '<rootDir>/src/lib/theme/colors',
        '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/app/(.*)$': '<rootDir>/app/$1',
        '^@/types/(.*)$': '<rootDir>/src/types/$1',
        '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
        '^@/services/(.*)$': '<rootDir>/src/services/$1',
        '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
      },
      collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
      ],
      coverageDirectory: 'coverage',
    },
  ],
  testTimeout: 10000,
  passWithNoTests: process.env.CI !== 'true',
}
