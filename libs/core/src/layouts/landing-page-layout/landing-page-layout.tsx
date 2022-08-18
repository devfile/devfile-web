import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { PencilIcon } from '@heroicons/react/solid';
import { githubDocsUrl } from '@devfile-web/docs';
import {
  Navigation,
  Prose,
  LandingPageSearch,
  Hero,
  Fence,
  LandingPageMeta,
} from '../../components';
import { useTableOfContents, useNavigation, useCodeblock, CodeblockProvider } from '../../hooks';
import type { TableOfContents, TableOfContentsChild } from '../../hooks';

export interface LandingPageLayoutProps {
  children: JSX.Element;
  title: string;
  tableOfContents: TableOfContents[];
  pageTitle: string;
  pageDescription: string;
}

export function LandingPageLayout(props: LandingPageLayoutProps): JSX.Element {
  const { children, title, tableOfContents, pageTitle, pageDescription } = props;

  const { selectedVersion, currentSection, previousPage, currentPage, nextPage } = useNavigation();
  const { currentPageSection } = useTableOfContents(tableOfContents);
  const router = useRouter();

  const is404Page = router.pathname === '/404';
  const isDocsPage = router.pathname.includes('docs');
  const isDevfileSchema = router.pathname.includes('/devfile-schema');

  function isActive(TableOfContents: TableOfContents | TableOfContentsChild): boolean {
    if (TableOfContents.id === currentPageSection) {
      return true;
    }
    if (!TableOfContents.children) {
      return false;
    }
    return (
      TableOfContents?.children.findIndex((TableOfContents_) => isActive(TableOfContents_)) > -1
    );
  }

  if (!isDocsPage || is404Page) {
    return children;
  }

  return (
    <CodeblockProvider>
      <LandingPageMeta title={pageTitle} description={pageDescription}>
        <meta name="docsearch:language" content="en" />
        <meta name="docsearch:version" content={selectedVersion} />
      </LandingPageMeta>

      {router.asPath === '/docs' && <Hero />}

      <div className="block sm:flex sm:px-6 lg:px-8">
        <div className="relative mx-auto block max-w-screen-2xl grow justify-center sm:flex">
          <div className="hidden lg:relative lg:block lg:flex-none">
            <div className="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden" />
            <div className="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-16 pl-0.5">
              <div className="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block" />
              <div className="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block" />
              <div className="mb-4 mr-4">
                <LandingPageSearch />
              </div>
              <Navigation className="w-64 pr-8 xl:w-72 xl:pr-16" />
            </div>
          </div>
          <div className="max-w-2xl flex-auto px-4 py-16 lg:pr-0 lg:pl-8 xl:px-16 2xl:max-w-none">
            {isDevfileSchema ? (
              children
            ) : (
              <article>
                {(title || currentSection) && (
                  <header className="mb-9 space-y-1">
                    {currentSection && (
                      <p className="font-display text-devfile text-sm font-medium">
                        {currentSection.title}
                      </p>
                    )}
                    {title && (
                      <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
                        {title}
                      </h1>
                    )}
                  </header>
                )}
                <Prose>{children}</Prose>
              </article>
            )}
            {!isDevfileSchema && (
              <Prose className="my-8">
                <Link
                  data-testid="edit-link"
                  href={currentPage?.githubHref ?? githubDocsUrl}
                  passHref
                >
                  <PencilIcon className="mb-1 inline h-4 w-auto" /> Edit this page
                </Link>
              </Prose>
            )}
            <dl className="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
              {previousPage && (
                <div>
                  <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                    Previous
                  </dt>
                  <dd className="mt-1">
                    <Link
                      data-testid="generated-link"
                      href={previousPage.href}
                      className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                      passHref
                    >
                      <span aria-hidden="true">&larr;</span> {previousPage.title}
                    </Link>
                  </dd>
                </div>
              )}
              {nextPage && (
                <div className="ml-auto text-right">
                  <dt className="font-display text-sm font-medium text-slate-900 dark:text-white">
                    Next
                  </dt>
                  <dd className="mt-1">
                    <Link
                      data-testid="generated-link"
                      href={nextPage.href}
                      className="text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                      passHref
                    >
                      {nextPage.title} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div
            className={clsx(
              isDevfileSchema
                ? 'xl:top-60 xl:h-[calc(100vh-15rem)] 2xl:h-[calc(100vh-15rem)]'
                : 'xl:top-[4.5rem] xl:-mr-6 xl:h-[calc(100vh-4.5rem)] xl:py-16 xl:pr-6 2xl:h-[calc(100vh-4.5rem)]',
              'hidden xl:sticky xl:block xl:flex-none xl:overflow-y-auto',
            )}
          >
            {isDevfileSchema ? (
              <ApiReferenceCodeblock className="prose w-[20rem]" />
            ) : (
              <nav aria-labelledby="on-this-page-title" className="w-56">
                {tableOfContents.length > 0 && (
                  <>
                    <h2
                      id="on-this-page-title"
                      className="font-display text-sm font-medium text-slate-900 dark:text-white"
                    >
                      On this page
                    </h2>
                    <ol className="mt-4 space-y-3 text-sm">
                      {tableOfContents.map((section_) => (
                        <li key={section_.id}>
                          <h3>
                            <Link
                              data-testid="generated-link"
                              href={`#${section_.id}`}
                              className={clsx(
                                isActive(section_)
                                  ? 'text-devfile'
                                  : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300',
                              )}
                            >
                              {section_.title}
                            </Link>
                          </h3>
                          {section_.children.length > 0 && (
                            <ol className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                              {section_.children.map((subSection) => (
                                <li key={subSection.id}>
                                  <Link
                                    data-testid="generated-link"
                                    href={`#${subSection.id}`}
                                    className={
                                      isActive(subSection)
                                        ? 'text-devfile'
                                        : 'hover:text-slate-600 dark:hover:text-slate-300'
                                    }
                                  >
                                    {subSection.title}
                                  </Link>
                                </li>
                              ))}
                            </ol>
                          )}
                        </li>
                      ))}
                    </ol>
                  </>
                )}
              </nav>
            )}
          </div>
        </div>
      </div>
    </CodeblockProvider>
  );
}

interface ApiReferenceCodeblockProps {
  className?: string;
}

function ApiReferenceCodeblock(props: ApiReferenceCodeblockProps): JSX.Element | null {
  const { className } = props;

  const { yaml } = useCodeblock();

  if (!yaml) {
    return <div className={className} />;
  }

  return (
    <div className={className}>
      <Fence language="yaml">{yaml ?? ''}</Fence>
    </div>
  );
}

export default LandingPageLayout;
