const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/domains/**/services/*.ts"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageReporters: ["text-summary", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(
    {
      "@domains/*": ["domains/*"],
      "@config/*": ["config/*"],
      "@shared/*": ["shared/*"],
    },
    { prefix: "<rootDir>/src/" },
  ),
  preset: "ts-jest",
  setupFiles: ["./src/config/test.ts"],
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
};
