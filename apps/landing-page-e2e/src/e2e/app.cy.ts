/**
 * Copyright 2023 Red Hat, Inc.
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

import type { DocsNavigation } from '@devfile-web/docs';
import docsNavigation from '../../../../dist/libs/scripts/navigation/navigation.json';

const generatedLinkQuery = '[data-testid="generated-link"]';

describe('Landing Page', () => {
  beforeEach(() => cy.visit('/'));

  it('has valid links', () => {
    cy.get('a').each(($a) => {
      const href = $a.attr('href') ?? 'undefined';
      cy.request(href).its('status').should('eq', 200);
    });
  });
});

describe('Docs', () => {
  Object.entries(docsNavigation as DocsNavigation).forEach(([version, versionedDocsNavigation]) => {
    describe(`Version: ${version}`, () => {
      versionedDocsNavigation.forEach((section) =>
        describe(`Section: ${section.title}`, () => {
          section.links.forEach((page) => {
            describe(`Page: ${page.title}`, () => {
              beforeEach(() => cy.visit(page.href));

              it('has valid links', () => {
                if (Cypress.$(generatedLinkQuery).length > 0) {
                  cy.get(`a${generatedLinkQuery}`).each(($a) => {
                    const href = $a.attr('href') ?? 'undefined';
                    cy.request(href).its('status').should('eq', 200);
                  });
                }
              });
            });
          });
        }),
      );
    });
  });
});
