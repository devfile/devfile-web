import { AppProps } from 'next/app';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import 'focus-visible';
import {
  AnalyticsProvider,
  NavigationProvider,
  LandingPageMeta,
  Header,
  Footer,
  LandingPageLayout as Layout,
  githubDocsUrl,
} from '@devfile-web/core';
import '../styles/tailwind.css';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';
import type { RenderableTreeNodes, Tag } from '@markdoc/markdoc';
import type { TableOfContents, DocsNavigation } from '@devfile-web/core';
import { useRouter } from 'next/router';
import { docsNavigation, headerNavigation, footerNavigation } from '../navigation';

const analyticsConfig = {
  writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
  client: 'landing-page',
};

function getNodeText(node: Tag): string {
  let text = '';
  for (const child of node.children ?? []) {
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
    if (typeof node !== 'string') {
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

  const router = useRouter();

  const title = (markdoc?.frontmatter.title as string) ?? '';

  let pageTitle: string;
  let description: string;

  if (router.asPath.includes('/docs')) {
    pageTitle =
      (markdoc?.frontmatter.pageTitle as string) ||
      `${(markdoc?.frontmatter.title as string) ?? ''} - Docs`;

    description = (markdoc?.frontmatter.description as string) ?? '';
  }

  const tableOfContents = markdoc?.content ? collectHeadings(markdoc.content) : [];

  return (
    <AnalyticsProvider writeKey={analyticsConfig.writeKey} client={analyticsConfig.client}>
      <NavigationProvider
        headerNavigation={headerNavigation}
        footerNavigation={footerNavigation}
        docsNavigation={docsNavigation as DocsNavigation}
      >
        <div className="flex h-screen flex-col justify-between">
          <LandingPageMeta title={pageTitle} description={description} />
          <div className="grow">
            <Header />
            <Layout title={title} tableOfContents={tableOfContents} githubDocsUrl={githubDocsUrl}>
              <Component {...pageProps} />
            </Layout>
          </div>
          <Footer />
        </div>
      </NavigationProvider>
    </AnalyticsProvider>
  );
}

export default LandingPage;
