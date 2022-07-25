import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

export interface Navigation {
  name: string;
  href: string;
  image?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export type HeaderNavigation = Navigation[];

export interface FooterNavigation {
  contributors: Navigation[];
  links: Navigation[];
  social: Navigation[];
}

export interface Section {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
}

export type DocsNavigation = Section[];

export type DocVersions = '2.0.0' | '2.1.0' | '2.2.0-alpha';

export interface OverallDocsNavigation {
  versionNonspecific: DocsNavigation;
  versionSpecific: Record<DocVersions, DocsNavigation>;
  defaultVersion: DocVersions;
}

export interface NavigationProviderProps {
  children: JSX.Element;
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
  overallDocsNavigation: OverallDocsNavigation;
}

export interface UseNavigation {
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
  docsNavigation: DocsNavigation;
  selectedVersion: DocVersions;
  setSelectedVersion: React.Dispatch<React.SetStateAction<DocVersions>>;
  possibleVersions: DocVersions[];
}

const NavigationContext = createContext<UseNavigation | undefined>(undefined);

export function NavigationProvider(props: NavigationProviderProps): JSX.Element {
  const { children, headerNavigation, footerNavigation, overallDocsNavigation } = props;

  const router = useRouter();
  const possibleVersions = useMemo(
    () =>
      Object.keys(
        overallDocsNavigation.versionSpecific,
      ) as (keyof typeof overallDocsNavigation.versionSpecific)[],
    [overallDocsNavigation],
  );
  const [selectedVersion, setSelectedVersion] = useState<DocVersions>(
    possibleVersions.find((version) => router.asPath.includes(version)) ??
      overallDocsNavigation.defaultVersion,
  );

  const [docsNavigation, setDocsNavigation] = useState<DocsNavigation>([
    ...overallDocsNavigation.versionNonspecific,
    ...overallDocsNavigation.versionSpecific[selectedVersion],
  ]);

  useEffect(() => {
    setDocsNavigation(() => [
      ...overallDocsNavigation.versionNonspecific,
      ...overallDocsNavigation.versionSpecific[selectedVersion],
    ]);
  }, [
    overallDocsNavigation.versionNonspecific,
    overallDocsNavigation.versionSpecific,
    selectedVersion,
  ]);

  const value = useMemo(
    () => ({
      headerNavigation,
      footerNavigation,
      docsNavigation,
      selectedVersion,
      setSelectedVersion,
      possibleVersions,
    }),
    [docsNavigation, footerNavigation, headerNavigation, possibleVersions, selectedVersion],
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
