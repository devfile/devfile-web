import { createContext, useContext, useMemo } from 'react';

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

export interface LinksProviderProps {
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
  children: React.ReactNode;
}

export interface UseLinks {
  headerNavigation: HeaderNavigation;
  footerNavigation: FooterNavigation;
}

const LinksContext = createContext<UseLinks | undefined>(undefined);

export function LinksProvider(props: LinksProviderProps): JSX.Element {
  const { children, headerNavigation, footerNavigation } = props;

  const value = useMemo(
    () => ({
      headerNavigation,
      footerNavigation,
    }),
    [headerNavigation, footerNavigation],
  );

  return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}

export function useLinks(): UseLinks {
  const value = useContext(LinksContext);
  if (!value) {
    throw new Error('Context used outside of its Provider!');
  }

  return value;
}

export default useLinks;
