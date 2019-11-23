module.exports = {
  rootDir: 'tests',
  testMatch: ['**/*.js'],
  moduleDirectories: ['node_modules', '.'],
  coverageDirectory: '../coverage',
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
}
