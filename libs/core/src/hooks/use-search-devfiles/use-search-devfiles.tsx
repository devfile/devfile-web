import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';

export interface DevfileJson {
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

export interface Devfile extends DevfileJson {
  devfileRegistry: {
    name: string;
    link: string;
  };
}

export interface DevfileRegistry {
  name: string;
  link: string;
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

export interface SetPageNumberAction {
  type: 'SET_PAGE_NUMBER';
  payload: number;
}

export type SearchDevfilesAction =
  | SearchAction
  | FilterOnTypesAction
  | FilterOnTagsAction
  | SetPageNumberAction;

export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalDevfiles: number;
}

export interface SearchDevfilesState {
  devfiles: Devfile[];
  searchedDevfiles?: Devfile[];
  limitedSearchedDevfiles?: Devfile[];
  pageInfo: PageInfo;
  search?: string;
  selectedTypes?: string[];
  selectedTags?: string[];
}

export interface SearchDevfilesProviderProps {
  children: React.ReactNode;
  devfiles: Devfile[];
}

export interface UseSearchDevfiles {
  searchedDevfiles: Devfile[];
  limitedSearchedDevfiles: Devfile[];
  pageInfo: PageInfo;
  dispatch: React.Dispatch<SearchDevfilesAction>;
}

export const isSearchIn = (
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

export const SearchDevfilesContext = createContext<UseSearchDevfiles | undefined>(undefined);

export function SearchDevfilesProvider(props: SearchDevfilesProviderProps): JSX.Element {
  const { children, devfiles } = props;

  const fuse = useMemo(
    () => new Fuse(devfiles, { keys: ['displayName', 'description'] }),
    [devfiles],
  );

  const searchDevfilesReducer = useCallback(
    (state: SearchDevfilesState, action: SearchDevfilesAction): SearchDevfilesState => {
      const { type, payload } = action;

      const newState: SearchDevfilesState = { ...state, searchedDevfiles: undefined };

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
        case 'SET_PAGE_NUMBER':
          newState.pageInfo.pageNumber = payload;
          break;
        default:
          // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const _exhaustiveCheck: never = action;
          return _exhaustiveCheck;
      }

      // Filter on search
      if (newState.search && newState.search !== '') {
        newState.searchedDevfiles = fuse.search(newState.search).map((result) => result.item);
      }

      newState.searchedDevfiles = (newState.searchedDevfiles ?? devfiles).filter(
        (devfile) =>
          isSearchIn(devfile.type, newState.selectedTypes) &&
          // Filter on tags
          isSearchIn(devfile.tags, newState.selectedTags),
      );

      newState.pageInfo = {
        ...newState.pageInfo,
        pageSize: newState.searchedDevfiles.length < 15 ? newState.searchedDevfiles.length : 15,
        totalPages: Math.ceil(newState.searchedDevfiles.length / 15),
        totalDevfiles: newState.searchedDevfiles.length,
      };

      newState.limitedSearchedDevfiles = newState.searchedDevfiles.slice(
        newState.pageInfo.pageSize * (newState.pageInfo.pageNumber - 1),
        newState.pageInfo.pageSize +
          newState.pageInfo.pageSize * (newState.pageInfo.pageNumber - 1),
      );

      return newState;
    },
    [devfiles, fuse],
  );

  const [state, dispatch] = useReducer<React.Reducer<SearchDevfilesState, SearchDevfilesAction>>(
    searchDevfilesReducer,
    {
      devfiles,
      pageInfo: {
        pageNumber: 1,
        pageSize: 15,
        totalPages: Math.ceil(devfiles.length / 15),
        totalDevfiles: devfiles.length,
      },
    },
  );

  const value = useMemo(
    () => ({
      searchedDevfiles: state.searchedDevfiles ?? devfiles,
      limitedSearchedDevfiles:
        state.limitedSearchedDevfiles ?? state.devfiles.slice(0, state.pageInfo.pageSize),
      pageInfo: state.pageInfo,
      dispatch,
    }),
    [
      state.searchedDevfiles,
      state.limitedSearchedDevfiles,
      state.devfiles,
      state.pageInfo,
      devfiles,
    ],
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
