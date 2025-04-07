// jest.config.js
module.exports = {
    preset: "@testing-library/react",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
