const path = require("path")

module.exports = {
    setupFiles: ['./tests/jest.setup.js'],
    "roots": ["./tests"],
    moduleNameMapper: {
        "ConfigData": path.resolve(__dirname, 'config.js'),
        "^Components(.*)$": "<rootDir>/src/components$1",
        "^Store(.*)$": "<rootDir>/src/redux$1",
        "^Pages(.*)$": "<rootDir>/src/pages$1",
        "^Util(.*)$": "<rootDir>/src/util$1",
    }
  };