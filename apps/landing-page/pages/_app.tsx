import { slugifyWithCounter } from '@sindresorhus/slugify';
import 'focus-visible';
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
import type { RenderableTreeNodes, Tag } from '@markdoc/markdoc';
import type { TableOfContents } from '@devfile-web/core';
import type { DocsNavigation } from '@devfile-web/docs';
import { docsNavigation, headerNavigation, footerNavigation } from '../navigation';

const analyticsConfig = {
  writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY ?? '',
  client: 'landing-page',
};

function getNodeText(node: Tag | null): string {
  let text = '';
  for (const child of node?.children ?? []) {
    text += typeof child === 'string' ? child : getNodeText(child);
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
    if (node && typeof node !== 'string') {
      if (node.name === 'h2' || node.name === 'h3') {
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
      }

      sections.push(...collectHeadings(node.children ?? [], slugify));
    }
  }

  return sections;
}

function LandingPage({ Component, pageProps }: AppProps): JSX.Element {
  const { markdoc } = pageProps as MarkdocNextJsPageProps;

  const title = (markdoc?.frontmatter.title as string) ?? '';

  const pageTitle =
    (markdoc?.frontmatter.pageTitle as string) ||
    `${(markdoc?.frontmatter.title as string) ?? ''} - Docs`;

  const pageDescription = (markdoc?.frontmatter.description as string) ?? '';

  const tableOfContents = markdoc?.content ? collectHeadings(markdoc.content) : [];

  return (
    <AnalyticsProvider {...analyticsConfig}>
      <LinksProvider headerNavigation={headerNavigation} footerNavigation={footerNavigation}>
        <NavigationProvider docsNavigation={docsNavigation as DocsNavigation}>
          <div className="flex h-screen min-w-[300px] flex-col justify-between">
            <div className="grow">
              <LandingPageMeta />
              <Header websiteName="Devfile.io" isLandingPage />
              <LandingPageLayout
                title={title}
                tableOfContents={tableOfContents}
                pageTitle={pageTitle}
                pageDescription={pageDescription}
              >
                <Component {...pageProps} />
              </LandingPageLayout>
            </div>
            <Footer />
          </div>
        </NavigationProvider>
      </LinksProvider>
    </AnalyticsProvider>
  );
}

export default LandingPage;
