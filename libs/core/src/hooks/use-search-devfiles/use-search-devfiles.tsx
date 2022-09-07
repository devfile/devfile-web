import React, { createContext, useContext, useReducer, useMemo } from 'react';

export interface Devfile {
  name: string;
  version?: string;
  displayName: string;
  description?: string;
  type: string;
  tags?: string[];
  icon?: string;
  projectType: string;
  provider?: string;
  language: string;
  links?: {
    self: string;
  };
  resources?: string[];
  starterProjects?: string[];
  git?: {
    remotes: {
      [key: string]: string;
    };
  };
}

export interface DevfileRegistry {
  name: string;
  link: string;
  devfiles: Devfile[];
}

export interface SearchAction {
  type: 'SEARCH';
  payload: string;
}

export interface FilterOnTypesAction {
  type: 'FILTER_ON_TYPES';
  payload: string[];
}

export interface FilterOnTagsAction {
  type: 'FILTER_ON_TAGS';
  payload: string[];
}

export type SearchDevfilesAction = SearchAction | FilterOnTypesAction | FilterOnTagsAction;

export interface SearchDevfilesState {
  devfileRegistries: DevfileRegistry[];
  searchedDevfileRegistries?: DevfileRegistry[];
  search?: string;
  selectedTypes?: string[];
  selectedTags?: string[];
}

export interface SearchDevfilesProviderProps {
  children: React.ReactNode;
  devfileRegistries: DevfileRegistry[];
}

export interface UseSearchDevfiles {
  searchedDevfileRegistries: DevfileRegistry[];
  dispatch: React.Dispatch<SearchDevfilesAction>;
}

const isSearchIn = (
  value: string | string[] | undefined,
  search: string | string[] | undefined,
): boolean => {
  // We want to display the devfile if nothing is searched
  if (!search || search === '' || search.length === 0) {
    return true;
  }

  // We do not want to display devfile if the value is undefined
  // e.g. the description is undefined
  if (!value) {
    return false;
  }

  if (Array.isArray(value) && Array.isArray(search)) {
    return value.some((v) => search.some((s) => v.toLowerCase().includes(s.toLowerCase())));
  }
  if (Array.isArray(value) && !Array.isArray(search)) {
    return value.some((v) => v.toLowerCase().includes(search.toLowerCase()));
  }
  if (!Array.isArray(value) && Array.isArray(search)) {
    return search.some((s) => value.toLowerCase().includes(s.toLowerCase()));
  }
  if (!Array.isArray(value) && !Array.isArray(search)) {
    return value.toLowerCase().includes(search.toLowerCase());
  }

  return false;
};

export function searchDevfilesReducer(
  state: SearchDevfilesState,
  action: SearchDevfilesAction,
): SearchDevfilesState {
  const { type, payload } = action;
  const { devfileRegistries } = state;

  const newState: SearchDevfilesState = { ...state };

  switch (type) {
    case 'SEARCH':
      newState.search = payload;
      break;
    case 'FILTER_ON_TYPES':
      newState.selectedTypes = payload;
      break;
    case 'FILTER_ON_TAGS':
      newState.selectedTags = payload;
      break;
    default:
      // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
  }

  newState.searchedDevfileRegistries = devfileRegistries.map((devfileRegistry) => ({
    ...devfileRegistry,
    devfiles: devfileRegistry.devfiles.filter(
      (devfile) =>
        // Search on display name and description
        (isSearchIn(devfile.displayName, newState.search) ||
          isSearchIn(devfile.description, newState.search)) &&
        // Filter on types
        isSearchIn(devfile.type, newState.selectedTypes) &&
        // Filter on tags
        isSearchIn(devfile.tags, newState.selectedTags),
    ),
  }));

  return newState;
}

const SearchDevfilesContext = createContext<UseSearchDevfiles | undefined>(undefined);

export function SearchDevfilesProvider(props: SearchDevfilesProviderProps): JSX.Element {
  const { children, devfileRegistries } = props;

  const [state, dispatch] = useReducer<React.Reducer<SearchDevfilesState, SearchDevfilesAction>>(
    searchDevfilesReducer,
    { devfileRegistries },
  );

  const value = useMemo(
    () => ({
      searchedDevfileRegistries: state.searchedDevfileRegistries ?? state.devfileRegistries,
      dispatch,
    }),
    [state, dispatch],
  );

  return <SearchDevfilesContext.Provider value={value}>{children}</SearchDevfilesContext.Provider>;
}

export function useSearchDevfiles(): UseSearchDevfiles {
  const value = useContext(SearchDevfilesContext);
  if (!value) {
    throw new Error('Context used outside of its Provider!');
  }

  return value;
}

export default useSearchDevfiles;
