const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    
  },

  e2e: {
    baseUrl: "http://192.168.0.149:5173/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
