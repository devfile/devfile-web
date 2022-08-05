import { createContext, useState, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import { docVersions, defaultVersion } from '../../scripts/build-navigation/build-navigation-misc';

import type {
  DocVersions,
  VersionedDocsNavigation,
  DocsNavigation,
} from '../../scripts/build-navigation/build-navigation-misc';

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
  children: JSX.Element;
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
  docsNavigation: DocsNavigation;
}

export interface UseNavigation {
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
  versionedDocsNavigation: VersionedDocsNavigation;
  selectedVersion: DocVersions;
  setSelectedVersion: React.Dispatch<React.SetStateAction<DocVersions>>;
  docVersions: typeof docVersions;
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

  const value = useMemo(
    () => ({
      headerNavigation,
      footerNavigation,
      versionedDocsNavigation,
      selectedVersion,
      setSelectedVersion,
      docVersions,
    }),
    [versionedDocsNavigation, footerNavigation, headerNavigation, selectedVersion],
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
