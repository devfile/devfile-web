/**
 * Copyright Red Hat
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
