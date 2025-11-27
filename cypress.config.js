const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev-core-api-v2.blusalt.net",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
