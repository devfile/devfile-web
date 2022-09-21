import { createContext, useState, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import { docVersions, defaultVersion } from '@devfile-web/docs';

import type {
  DocVersions,
  VersionedDocsNavigation,
  DocsNavigation,
  Page,
  Section,
} from '@devfile-web/docs';

export interface NavigationElement {
  name: string;
  href: string;
  image?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export type HeaderNavigation = NavigationElement[];

export interface FooterNavigation {
  contributors: NavigationElement[];
  links: NavigationElement[];
  social: NavigationElement[];
}

export interface NavigationProviderProps {
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
  docsNavigation: DocsNavigation;
  children: React.ReactNode;
}

export interface UseNavigation {
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
  versionedDocsNavigation: VersionedDocsNavigation;
  selectedVersion: DocVersions;
  setSelectedVersion: React.Dispatch<React.SetStateAction<DocVersions>>;
  docVersions: typeof docVersions;
  docVersionLinks: Record<DocVersions, string>;
  currentSection?: Section;
  previousPage?: Page;
  currentPage?: Page;
  nextPage?: Page;
}

const NavigationContext = createContext<UseNavigation | undefined>(undefined);

export function NavigationProvider(props: NavigationProviderProps): JSX.Element {
  const { children, headerNavigation, footerNavigation, docsNavigation } = props;

  const router = useRouter();
  const [selectedVersion, setSelectedVersion] = useState<DocVersions>(
    docVersions.find((version) => router.asPath.includes(version)) ?? defaultVersion,
  );

  const allLinks = useMemo(
    () =>
      Object.entries(docsNavigation).reduce(
        (prev, [version, versionedDocsNavigation]) => ({
          ...prev,
          [version]: versionedDocsNavigation.flatMap((section) => section.links),
        }),
        {} as Record<DocVersions, Page[]>,
      ),

    [docsNavigation],
  );
  const linkIndex = useMemo(
    () => allLinks[selectedVersion].findIndex((link) => link.href === router.pathname),
    [allLinks, router.pathname, selectedVersion],
  );

  const docVersionLinks = useMemo(
    () =>
      docVersions.reduce((prev, version) => {
        const href =
          allLinks[version].find(
            (page) => page.href.replace(version, selectedVersion) === router.pathname,
          )?.href ?? `/docs/${version}/what-is-a-devfile`;
        return { ...prev, [version]: href };
      }, {} as Record<DocVersions, string>),
    [allLinks, router.pathname, selectedVersion],
  );

  const value = useMemo(
    () => ({
      headerNavigation,
      footerNavigation,
      versionedDocsNavigation: docsNavigation[selectedVersion],
      selectedVersion,
      setSelectedVersion,
      docVersions,
      docVersionLinks,
      currentSection: docsNavigation[selectedVersion].find((section_) =>
        section_.links.find((link) => link.href === router.pathname),
      ),
      previousPage: allLinks[selectedVersion][linkIndex - 1],
      currentPage: allLinks[selectedVersion][linkIndex],
      nextPage: allLinks[selectedVersion][linkIndex + 1],
    }),
    [
      headerNavigation,
      footerNavigation,
      docsNavigation,
      selectedVersion,
      docVersionLinks,
      allLinks,
      linkIndex,
      router.pathname,
    ],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigation(): UseNavigation {
  const value = useContext(NavigationContext);
  if (!value) {
    throw new Error('Context used outside of its Provider!');
  }

  return value;
}

export default useNavigation;
