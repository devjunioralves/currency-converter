module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  coverageProvider: "babel",
  roots: [
    "<rootDir>/src",
  ],
  transform: {
    "\\.ts$": "ts-jest",
  }
};
