import type { DocsNavigation } from '@devfile-web/core';
import docsNavigation from '../../../../libs/core/src/scripts/build-navigation/dist/docs-navigation.json';

describe('Docs', () => {
  Object.entries(docsNavigation as DocsNavigation).forEach(([version, versionedDocsNavigation]) => {
    describe(`Version: ${version}`, () => {
      versionedDocsNavigation.forEach((section) =>
        describe(`Section: ${section.title}`, () => {
          section.links.forEach((page) => {
            describe(`Page: ${page.title}`, () => {
              beforeEach(() => cy.visit(page.href));

              it('has valid links', () => {
                cy.get('a[data-testid="generated-link"]').each(($a) => {
                  const href = $a.attr('href');
                  cy.request(href).its('status').should('eq', 200);
                });
              });
            });
          });
        }),
      );
    });
  });
});
