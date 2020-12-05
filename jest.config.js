const path = require("path")

module.exports = {
    setupFiles: ['./tests/jest.setup.js'],
    "roots": ["./tests"],
    moduleNameMapper: {
        "SetupConfig": path.resolve(__dirname, 'config.js')
    }
  };