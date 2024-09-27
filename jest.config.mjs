const config = {
  displayName: "Food Autentication",
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  preset: "ts-jest",
  clearMocks: true,
  verbose: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;
