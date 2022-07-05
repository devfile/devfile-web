import { createContext, useContext, useMemo } from 'react';

export type Repositories = 'landing-page' | 'registry-viewer';

export interface MonorepoProviderProps {
  children: JSX.Element;
  repo: Repositories;
}

export interface UseMonorepo {
  repo: Repositories;
}

const MonorepoContext = createContext<UseMonorepo | undefined>(undefined);

export function MonorepoProvider(props: MonorepoProviderProps): JSX.Element {
  const { children, repo } = props;

  const value: UseMonorepo = useMemo(
    () => ({
      repo,
    }),
    [repo],
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
