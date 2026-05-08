module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.(test|spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!uuid|@faker-js/faker)'
  ],
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@DocumentProcessing/(.*)$': '<rootDir>/src/DocumentProcessing/$1',
    '^@Shared/(.*)$': '<rootDir>/src/Shared/$1',
    '^test/(.*)$': '<rootDir>/test/$1'
  }
};
