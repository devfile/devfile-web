import type { DocsNavigation } from '@devfile-web/docs';
import docsNavigation from '../../../../libs/docs/src/scripts/build-navigation/dist/docs-navigation.json';

const generatedLinkQuery = '[data-testid="generated-link"]';

describe('Docs', () => {
  Object.entries(docsNavigation as DocsNavigation).forEach(([version, versionedDocsNavigation]) => {
    describe(`Version: ${version}`, () => {
      versionedDocsNavigation.forEach((section) =>
        describe(`Section: ${section.title}`, () => {
          section.links.forEach((page) => {
            describe(`Page: ${page.title}`, () => {
              beforeEach(() => cy.visit(`/docs/${version}/${page.href.slice(1)}`));

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
