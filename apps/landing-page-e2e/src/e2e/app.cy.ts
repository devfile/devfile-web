import type { DocsNavigation } from '@devfile-web/docs';
import docsNavigation from '../../../../libs/docs/src/scripts/build-navigation/dist/docs-navigation.json';

const generatedLinkQuery = '[data-testid="generated-link"]';

describe('Landing Page', () => {
  beforeEach(() => cy.visit('/'));

  it('has valid links', () => {
    cy.get('a').each(($a) => {
      const href = $a.attr('href');
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
                    const href = $a.attr('href');
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
