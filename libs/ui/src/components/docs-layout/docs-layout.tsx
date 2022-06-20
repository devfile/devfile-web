import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';

export interface DocsProps {
  children: React.ReactNode;
}

export interface DocsNavBarProps {
  page: Page | PageContainer;
}

interface Page {
  name: string;
  type: 'Page';
  current: boolean;
  href: string;
}

interface PageContainer {
  name: string;
  type: 'PageContainer';
  current: boolean;
  children: (Page | PageContainer)[];
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const navigation: (Page | PageContainer)[] = [
  { name: 'Introduction', type: 'Page', current: true, href: '/docs/introduction' },
  {
    name: 'Getting Started',
    type: 'PageContainer',
    current: false,
    children: [
      { name: 'Features', type: 'Page', current: false, href: '/docs/getting-started/features' },
      { name: 'Basics', type: 'Page', current: false, href: '/docs/getting-started/basics' },
      {
        name: 'Installation',
        type: 'Page',
        current: false,
        href: '/docs/getting-started/installation',
      },
      {
        name: 'Cluster Setup',
        type: 'PageContainer',
        current: false,
        children: [
          {
            name: 'Kubernetes',
            type: 'Page',
            current: false,
            href: '/docs/getting-started/cluster-setup/kubernetes',
          },
          {
            name: 'OpenShift',
            type: 'Page',
            current: false,
            href: '/docs/getting-started/cluster-setup/openshift',
          },
        ],
      },
      {
        name: 'Quickstart Guide',
        type: 'Page',
        current: false,
        href: '/docs/getting-started/quickstart-guide',
      },
      {
        name: 'Configuration',
        type: 'Page',
        current: false,
        href: '/docs/getting-started/configuration',
      },
    ],
  },
];

export function DocsLayout(props: DocsProps): JSX.Element {
  const { children } = props;

  return (
    <div className="flex h-full flex-row items-stretch">
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
              alt="Workflow"
            />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
              {navigation.map((item) =>
                item.type === 'Page' ? (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex w-full items-center rounded-md py-2 pl-7 pr-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </a>
                  </div>
                ) : (
                  <Disclosure as="div" key={item.name} className="space-y-1">
                    {({ open }: { open: boolean }): JSX.Element => (
                      <>
                        <Disclosure.Button
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex w-full items-center rounded-md py-2 pr-2 text-left text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500',
                          )}
                        >
                          <svg
                            className={classNames(
                              open ? 'rotate-90 text-gray-400' : 'text-gray-300',
                              'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
                            )}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                          {item.name}
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {item.children.map(
                            (subItem) =>
                              subItem.type === 'Page' && (
                                <Disclosure.Button
                                  key={subItem.name}
                                  as="a"
                                  href={subItem.href}
                                  className="group flex w-full items-center rounded-md py-2 pl-10 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              ),
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ),
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="prose lg:prose-xl max-w-none grow">{children}</div>
    </div>
  );
}

export function DocsNavBar(props: DocsNavBarProps): JSX.Element {
  const { page } = props;

  if (page.type === 'Page') {
    return (
      <div className="align-center my-2 pt-1">
        <Link href={page.href}>
          <a className="text-base font-medium text-gray-500 hover:text-gray-900">{page.name}</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="my-2 pt-1">
      <Disclosure defaultOpen>
        {({ open }: { open: boolean }): JSX.Element => (
          <>
            <Disclosure.Button className="align-center flex items-center text-base font-medium text-gray-500 hover:text-gray-900">
              <p className="pr-1">{page.name}</p>
              {open ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </Disclosure.Button>
            <Disclosure.Panel className="divide-y divide-dashed pl-4">
              {page.children.map((item) => (
                <DocsNavBar key={item.name} page={item} />
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default DocsLayout;
