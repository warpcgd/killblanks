module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['dist', '/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  preset: 'jest-puppeteer',
  moduleFileExtensions: ['ts', 'js', 'node'],
  testRegex: '(/tests/.*|(\\.|/)(test))\\.(ts)x?$',
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['node_modules', 'dist'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts']
}
