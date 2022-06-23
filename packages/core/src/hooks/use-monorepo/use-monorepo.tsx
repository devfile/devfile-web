import React, { createContext, useContext, useMemo } from 'react';
import NextLink from 'next/link';
import DocuLink from '@docusaurus/Link';

export type Repositories = 'landing-page' | 'registry-viewer';

export type Link = typeof NextLink | typeof DocuLink;

export interface MonorepoProviderProps {
  children: JSX.Element;
  repo: Repositories;
  Link: Link;
}

export interface UseMonorepo {
  repo: Repositories;
  Link: Link;
}

const MonorepoContext = createContext<UseMonorepo | undefined>(undefined);

export function MonorepoProvider(props: MonorepoProviderProps): JSX.Element {
  const { children, repo, Link } = props;

  const value: UseMonorepo = useMemo(
    () => ({
      repo,
      Link,
    }),
    [Link, repo],
  );

  return <MonorepoContext.Provider value={value}>{children}</MonorepoContext.Provider>;
}

export function useMonorepo(): UseMonorepo {
  const value = useContext(MonorepoContext);

  if (!value) {
    throw new Error('Context used outside of its Provider!');
  }

  return value;
}

export default useMonorepo;
