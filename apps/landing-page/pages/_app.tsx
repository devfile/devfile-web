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

import Script from 'next/script';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import 'focus-visible';
import env from '@beam-australia/react-env';
import {
  AnalyticsProvider,
  NavigationProvider,
  LinksProvider,
  LandingPageMeta,
  Header,
  Footer,
  LandingPageLayout,
} from '@devfile-web/core';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';
import { RenderableTreeNodes, Tag } from '@markdoc/markdoc';
import type { TableOfContents } from '@devfile-web/core';
import type { DocsNavigation } from '@devfile-web/docs';
import { docsNavigation, headerNavigation, footerNavigation } from '../navigation';

const analyticsConfig = {
  writeKey: env('ANALYTICS_WRITE_KEY'),
  client: 'landing-page',
};

function getNodeText(node: Tag): string {
  let text = '';
  for (const child of node?.children ?? []) {
    text += Tag.isTag(child) ? getNodeText(child) : child;
  }
  return text;
}

function collectHeadings(
  nodes: RenderableTreeNodes,
  slugify = slugifyWithCounter(),
): TableOfContents[] {
  const sections: TableOfContents[] = [];

  if (!Array.isArray(nodes)) return sections;

  for (const node of nodes) {
    if (Tag.isTag(node) && (node.name === 'h2' || node.name === 'h3')) {
      const title = getNodeText(node);
      if (title) {
        const id = slugify(title);
        node.attributes.id = id;
        if (node.name === 'h3') {
          if (!sections[sections.length - 1]) {
            throw new Error('Cannot add `h3` to table of contents without a preceding `h2`');
          }
          sections[sections.length - 1].children.push({
            ...node.attributes,
            title,
          });
        } else {
          sections.push({ ...node.attributes, title, children: [] });
        }
      }

      sections.push(...collectHeadings(node.children ?? [], slugify));
    }
  }

  return sections;
}

const websiteName = 'Devfile.io';
const websiteDescription = 'An open standard defining containerized development environments.';

function LandingPage({ Component, pageProps }: AppProps): JSX.Element {
  const { markdoc } = pageProps as MarkdocNextJsPageProps;

  const title = (markdoc?.frontmatter.title as string) ?? '';

  const pageTitle =
    (markdoc?.frontmatter.pageTitle as string) ||
    `${(markdoc?.frontmatter.title as string) ?? ''} - Docs`;

  const pageDescription = (markdoc?.frontmatter.description as string) ?? '';

  const tableOfContents = markdoc?.content ? collectHeadings(markdoc.content) : [];

  return (
    <>
      <Script src="/__ENV.js" strategy="beforeInteractive" />
      <AnalyticsProvider {...analyticsConfig}>
        <LinksProvider headerNavigation={headerNavigation} footerNavigation={footerNavigation}>
          <NavigationProvider docsNavigation={docsNavigation as DocsNavigation}>
            <div className="flex h-screen min-w-[300px] flex-col justify-between">
              <div className="grow">
                <LandingPageMeta />
                <Header websiteName={websiteName} isLandingPage />
                <LandingPageLayout
                  title={title}
                  tableOfContents={tableOfContents}
                  pageTitle={pageTitle}
                  pageDescription={pageDescription}
                >
                  <Component {...pageProps} />
                </LandingPageLayout>
              </div>
              <Footer websiteName={websiteName} websiteDescription={websiteDescription} />
            </div>
          </NavigationProvider>
        </LinksProvider>
      </AnalyticsProvider>
    </>
  );
}

export default LandingPage;
