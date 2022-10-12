/**
 * Copyright 2022 Red Hat, Inc.
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

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { useFetchDevfiles } from '../use-fetch-devfiles/use-fetch-devfiles';
import {
  parseDevfileLink,
  createDevfileLink,
  getFiltersApplied,
  mergeObjectsOnDefinedProperties,
} from '../../functions';
import type { Devfile, DevfileRegistry } from '../../functions';

export interface FilterElement {
  name: string;
  checked: boolean;
}

type ActionProperties = keyof Omit<QueryState, 'filtersApplied'>;

interface ActionBase {
  resetPage: boolean;
}

interface SetQueryAction extends Partial<ActionBase> {
  type: 'SET_QUERY';
  property?: never;
  payload: {
    page?: Partial<Omit<PageState, 'total'>>;
    query?: Partial<Omit<QueryState, 'filtersApplied'>>;
  };
}

interface SetDevfilesAction extends Partial<ActionBase> {
  type: 'SET_DEVFILES';
  property?: never;
  payload: Devfile[];
}

interface FilterOnFilterElement<T extends Exclude<ActionProperties, 'search'>>
  extends Partial<ActionBase> {
  type: 'FILTER_ON';
  property: T;
  payload: FilterElement[];
}

interface FilterOnSearchAction<T extends Extract<ActionProperties, 'search'>>
  extends Partial<ActionBase> {
  type: 'FILTER_ON';
  property: T;
  payload: string;
}

type FilterOnAction =
  | FilterOnFilterElement<Exclude<ActionProperties, 'search'>>
  | FilterOnSearchAction<Extract<ActionProperties, 'search'>>;

interface ClearFiltersAction extends Partial<ActionBase> {
  type: 'CLEAR_FILTERS';
  property?: never;
  payload?: never;
}

interface SetPageNumberAction extends Partial<ActionBase> {
  type: 'SET_PAGE_NUMBER';
  property?: never;
  payload: number;
}

export type SearchDevfilesAction =
  | SetQueryAction
  | SetDevfilesAction
  | FilterOnAction
  | ClearFiltersAction
  | SetPageNumberAction;

export interface PageState {
  number: number;
  total: number;
}

export interface DevfilesState {
  searched: Devfile[];
  totalSearched: number;
  searchedLimited: Devfile[];
  limit: number;
  all: Devfile[];
  total: number;
}

export interface QueryState {
  search: string;
  registries: FilterElement[];
  tags: FilterElement[];
  types: FilterElement[];
  providers: FilterElement[];
  languages: FilterElement[];
  filtersApplied: number;
}

export interface SearchDevfilesState {
  devfiles: DevfilesState;
  page: PageState;
  query: QueryState;
}

export interface SearchDevfilesProviderProps {
  children: React.ReactNode;
  devfiles: Devfile[];
  devfileRegistries: DevfileRegistry[];
  query: QueryState;
  devfilesPerPage?: number;
  startingPageNumber?: number;
}

export interface UseSearchDevfiles {
  devfiles: DevfilesState;
  page: PageState;
  query: QueryState;
  dispatch: React.Dispatch<SearchDevfilesAction>;
}

export function isSearchIn(
  value: string | string[] | undefined,
  filterElements: FilterElement[],
): boolean {
  const elements = filterElements.filter((s) => s.checked);

  // We want to display the devfile if nothing is searched
  if (elements.length === 0) {
    return true;
  }

  // We do not want to display devfile if the value is undefined
  // e.g. the description is undefined
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some((v) => elements.some((e) => v.toLowerCase().includes(e.name.toLowerCase())));
  }

  return elements.some((e) => value.toLowerCase().includes(e.name.toLowerCase()));
}

export function sortFilterElements(filterElements: FilterElement[]): FilterElement[] {
  return filterElements.sort((a, b) => {
    if (a.checked && !b.checked) {
      return -1;
    }
    if (!a.checked && b.checked) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });
}

export function limitDevfiles(devfiles: Devfile[], limit: number, page: number): Devfile[] {
  return devfiles.slice(limit * (page - 1), limit + limit * (page - 1));
}

export function createFuse(devfiles: Devfile[]): Fuse<Devfile> {
  return new Fuse(devfiles, { threshold: 0.25, keys: ['displayName', 'description'] });
}

export function getFilterElements(
  devfiles: Devfile[],
  property: keyof Pick<Devfile, 'tags' | 'type' | 'provider' | 'language'>,
): FilterElement[] {
  const elements = devfiles.flatMap((devfile) => devfile[property]).filter(Boolean) as string[];

  const uniqueElements = [...new Set(elements)];

  return sortFilterElements(uniqueElements.map((element) => ({ name: element, checked: false })));
}

export const SearchDevfilesContext = createContext<UseSearchDevfiles | undefined>(undefined);

export function SearchDevfilesProvider(props: SearchDevfilesProviderProps): JSX.Element {
  const {
    children,
    devfiles: initialDevfiles,
    devfileRegistries,
    query,
    devfilesPerPage = 15,
    startingPageNumber = 1,
  } = props;
  const [devfiles, setDevfiles] = useLocalStorage('devfiles', initialDevfiles);
  const fuse = useMemo(() => createFuse(devfiles), [devfiles]);
  const { devfiles: fetchedDevfiles, error } = useFetchDevfiles(devfileRegistries);
  const router = useRouter();

  const searchDevfilesReducer = useCallback(
    (state: SearchDevfilesState, action: SearchDevfilesAction): SearchDevfilesState => {
      const { type, property, payload, resetPage } = action;

      const newState: SearchDevfilesState = { ...state };

      switch (type) {
        case 'SET_QUERY':
          const { page: newPage, query: newQuery } = payload;
          newState.page = { ...newState.page, ...newPage };
          newState.query = mergeObjectsOnDefinedProperties(newState.query, newQuery);
          break;
        case 'SET_DEVFILES':
          newState.devfiles.all = payload;
          newState.devfiles.total = payload.length;
          break;
        case 'FILTER_ON':
          // React.dispatch cannot be a generic function so typescript cannot correctly narrow the type
          if (property === 'search') {
            newState.query[property] = payload;
          } else {
            newState.query[property] = sortFilterElements(payload);
          }
          break;
        case 'CLEAR_FILTERS':
          newState.query = {
            ...newState.query,
            registries: newState.query.registries.map((registry) => ({
              ...registry,
              checked: false,
            })),
            tags: newState.query.tags.map((tag) => ({ ...tag, checked: false })),
            types: newState.query.types.map((_type) => ({ ..._type, checked: false })),
            providers: newState.query.providers.map((provider) => ({
              ...provider,
              checked: false,
            })),
            languages: newState.query.languages.map((language) => ({
              ...language,
              checked: false,
            })),
            filtersApplied: 0,
          };
          break;
        case 'SET_PAGE_NUMBER':
          newState.page.number = payload;
          break;
        default:
          // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const _exhaustiveCheck: never = action;
          return _exhaustiveCheck;
      }

      newState.query.filtersApplied = getFiltersApplied([
        newState.query.registries,
        newState.query.tags,
        newState.query.types,
        newState.query.providers,
        newState.query.languages,
      ]);

      if (resetPage) {
        newState.page.number = 1;
      }

      // Filter on search
      newState.devfiles.searched =
        newState.query.search !== ''
          ? fuse.search(newState.query.search).map((result) => result.item)
          : newState.devfiles.all;

      newState.devfiles.searched = newState.devfiles.searched.filter(
        (devfile) =>
          // Filter on registries
          isSearchIn(devfile.devfileRegistry.name, newState.query.registries) &&
          // Filter on types
          isSearchIn(devfile.type, newState.query.types) &&
          // Filter on tags
          isSearchIn(devfile.tags, newState.query.tags) &&
          // Filter on providers
          isSearchIn(devfile.provider, newState.query.providers) &&
          // Filter on languages
          isSearchIn(devfile.language, newState.query.languages),
      );

      newState.devfiles.searchedLimited = limitDevfiles(
        newState.devfiles.searched,
        state.devfiles.limit,
        state.page.number,
      );

      newState.devfiles = {
        ...newState.devfiles,
        totalSearched: newState.devfiles.searched.length,
      };

      newState.page.total = Math.ceil(newState.devfiles.searched.length / state.devfiles.limit);

      router
        .push(createDevfileLink(newState.page, newState.query), undefined, {
          scroll: false,
          shallow: true,
        })
        .catch(() => {});

      return newState;
    },
    [fuse, router],
  );

  const [state, dispatch] = useReducer(searchDevfilesReducer, {
    devfiles: {
      searched: initialDevfiles,
      totalSearched: initialDevfiles.length,
      searchedLimited: limitDevfiles(initialDevfiles, devfilesPerPage, startingPageNumber),
      limit: devfilesPerPage,
      all: initialDevfiles,
      total: initialDevfiles.length,
    },
    page: {
      number: startingPageNumber,
      total: Math.ceil(initialDevfiles.length / devfilesPerPage),
    },
    query,
  });

  useEffect(() => {
    const {
      pageNumber: newPageNumber,
      search,
      registries,
      tags,
      types,
      providers,
      languages,
    } = parseDevfileLink(router.asPath);

    let newRegistries: FilterElement[] | undefined;
    let newTags: FilterElement[] | undefined;
    let newTypes: FilterElement[] | undefined;
    let newProviders: FilterElement[] | undefined;
    let newLanguages: FilterElement[] | undefined;

    if (registries.length > 0) {
      newRegistries = query.registries.map((registry) => {
        if (registries.includes(registry.name)) {
          return { ...registry, checked: true };
        }

        return registry;
      });
    }

    if (tags.length > 0) {
      newTags = query.tags.map((tag) => {
        if (tags.includes(tag.name)) {
          return { ...tag, checked: true };
        }

        return tag;
      });
    }

    if (types.length > 0) {
      newTypes = query.types.map((type) => {
        if (types.includes(type.name)) {
          return { ...type, checked: true };
        }

        return type;
      });
    }

    if (providers.length > 0) {
      newProviders = query.providers.map((provider) => {
        if (providers.includes(provider.name)) {
          return { ...provider, checked: true };
        }

        return provider;
      });
    }

    if (languages.length > 0) {
      newLanguages = query.languages.map((language) => {
        if (languages.includes(language.name)) {
          return { ...language, checked: true };
        }

        return language;
      });
    }

    dispatch({
      type: 'SET_QUERY',
      payload: {
        page: { number: newPageNumber },
        query: {
          search,
          registries: newRegistries,
          tags: newTags,
          types: newTypes,
          providers: newProviders,
          languages: newLanguages,
        },
      },
    });

    // Run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      return;
    }

    if (fetchedDevfiles) {
      setDevfiles(() => fetchedDevfiles);
      dispatch({ type: 'SET_DEVFILES', payload: fetchedDevfiles });
    }
  }, [error, fetchedDevfiles, setDevfiles]);

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state],
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
