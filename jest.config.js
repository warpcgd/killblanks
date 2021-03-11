module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ["dist", "/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "node",
  ],
  testRegex: '(/tests/.*|(\\.|/)(test))\\.(ts)x?$',
  coverageDirectory: 'coverage',
  testPathIgnorePatterns:["node_modules", "dist"],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
}
