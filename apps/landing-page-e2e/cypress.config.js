const { defineConfig } = require('cypress');

module.exports = defineConfig({
  downloadsFolder: './src/downloads',
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  modifyObstructiveCode: false,
  video: true,
  videosFolder: '../../dist/cypress/apps/landing-page-e2e/videos',
  screenshotsFolder: '../../dist/cypress/apps/landing-page-e2e/screenshots',
  chromeWebSecurity: false,

  e2e: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {},
    specPattern: './src/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './src/support/index.ts',
    baseUrl: 'http://localhost:4200',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    supportFile: './src/support/index.ts',
  },
});
