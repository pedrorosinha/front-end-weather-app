const { defineConfig } = require('cypress');
const webpackConfig = require('./webpack.config.js');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
    },
    supportFile: 'cypress/support/index.js',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: webpackConfig,
    },
    supportFile: 'cypress/support/component.js',
  },
});
