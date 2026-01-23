/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  testMatch: [
    "**/__tests__/**/*.?([mc])[jt]s?(x)",
    "**/?(*.)+(spec|test).?([mc])[jt]s?(x)",
  ],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
