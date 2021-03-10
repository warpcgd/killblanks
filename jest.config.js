module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ["/test/", "/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "node",
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(ts)x?$',
  coverageDirectory: 'coverage',
  testPathIgnorePatterns:["node_modules", "/dist/.*/__tests__"],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
}
