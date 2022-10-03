/**
 * Copyright 2022 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
