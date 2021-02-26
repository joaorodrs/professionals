/*
 * For a detailed explanation regarding each configuration property, visit:
 * https:
 */

export default {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  "transform": {
    "\\.m?jsx?$": "jest-esm-transformer"
  },
}
