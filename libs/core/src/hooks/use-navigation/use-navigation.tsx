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

  const versionedDocsNavigation = useMemo(
    () => docsNavigation[selectedVersion],
    [docsNavigation, selectedVersion],
  );

  const allLinks = useMemo(
    () => versionedDocsNavigation.flatMap((section) => section.links),
    [versionedDocsNavigation],
  );
  const linkIndex = useMemo(
    () => allLinks.findIndex((link) => link.href === router.pathname),
    [allLinks, router.pathname],
  );

  const value = useMemo(
    () => ({
      headerNavigation,
      footerNavigation,
      versionedDocsNavigation,
      selectedVersion,
      setSelectedVersion,
      docVersions,
      currentSection: versionedDocsNavigation.find((section_) =>
        section_.links.find((link) => link.href === router.pathname),
      ),
      previousPage: allLinks[linkIndex - 1],
      currentPage: allLinks[linkIndex],
      nextPage: allLinks[linkIndex + 1],
    }),
    [
      headerNavigation,
      footerNavigation,
      versionedDocsNavigation,
      selectedVersion,
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
