/**
 * Copyright 2023 Red Hat, Inc.
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

import {
  DevfileGrid,
  Pagination,
  fetchDevfiles,
  DevfileSearch,
  DevfileFilters,
  type Devfile,
  type PageParams,
  type DevfileParams,
  type SearchParams,
  type FilterParams,
  type FilterElement,
  type Entries,
  type QueryDefault,
} from '@devfile-web/core';
import { NextAdapter } from 'next-query-params';
import {
  QueryParamProvider,
  NumberParam,
  ArrayParam,
  useQueryParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';
import type { GetServerSideProps } from 'next';
import queryString from 'query-string';
import Fuse from 'fuse.js';
import { getDevfileRegistries } from '../config';

export interface IndexProps {
  devfileParams: DevfileParams;
  pageParams: PageParams;
  searchParams: SearchParams;
  filterParams: FilterParams;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QueryParamAdapter(props: any): JSX.Element {
  return <NextAdapter {...props} shallow={false} />;
}

export function IndexWrapper(props: IndexProps): JSX.Element {
  return (
    <QueryParamProvider
      adapter={QueryParamAdapter}
      options={{
        searchStringToObject: (searchString) => queryString.parse(searchString),
        objectToSearchString: (object) =>
          queryString.stringify(object, { skipEmptyString: true, skipNull: true }),
      }}
    >
      <Index {...props} />
    </QueryParamProvider>
  );
}

export function Index(props: IndexProps): JSX.Element {
  const { devfileParams, pageParams, searchParams, filterParams } = props;

  const [, setPage] = useQueryParam('page', withDefault(NumberParam, pageParams.pageNumber));
  const useFilters = useQueryParams(
    // map through the filterParams and create a query array param for each filter
    (Object.entries(filterParams) as Entries<FilterParams>).reduce((prev, [key, value]) => {
      const updated = prev;
      updated[key] = withDefault(
        ArrayParam,
        value.reduce((curr, filterElement) => {
          if (filterElement.checked) {
            curr.push(filterElement.name);
          }
          return curr;
        }, [] as string[]),
      ) as QueryDefault;
      return updated;
    }, {} as Record<keyof FilterParams, QueryDefault>),
  );

  const [, setFilters] = useFilters;

  return (
    <div className="flex grow justify-center  bg-slate-50 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="flex max-w-screen-2xl grow justify-center">
        <div className="grow">
          <DevfileSearch
            pageParams={pageParams}
            searchParams={searchParams}
            devfileParams={devfileParams}
            filterParams={filterParams}
            setPage={setPage}
            useFilters={useFilters}
          />
          <div className="flex">
            <div className="my-6 hidden pr-16 lg:block">
              <h1 className="ml-2 text-xl font-semibold text-slate-700 dark:text-sky-100">
                Filter by
              </h1>
              <DevfileFilters filterParams={filterParams} setFilters={setFilters} />
            </div>
            <DevfileGrid devfiles={devfileParams.devfiles} />
          </div>
          <Pagination pageParams={pageParams} devfileParams={devfileParams} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

const devfilesPerPage = 15;

function getArrayParam(query: string | string[] | undefined): string[] {
  return query ? (Array.isArray(query) ? query : [query]) : [];
}

function sortFilterElements(filterElements: FilterElement[]): FilterElement[] {
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

function getFilterElements(
  devfiles: Devfile[],
  property: keyof Pick<Devfile, 'tags' | 'type' | 'provider' | 'language' | '_registry'>,
  queryParam: string[],
): FilterElement[] {
  let elements: string[] = [];

  elements = devfiles.reduce((prev, devfile) => {
    const value = devfile[property];
    if (value) {
      if (Array.isArray(value)) {
        prev.push(...value);
      } else if (typeof value === 'string') {
        prev.push(value);
      } else {
        // _registry
        prev.push(value.name);
      }
    }
    return prev;
  }, [] as string[]);

  const uniqueElements = [...new Set(elements)];

  const sortedFilterElements = sortFilterElements(
    uniqueElements.map((element) => ({ name: element, checked: queryParam.includes(element) })),
  );

  return sortedFilterElements;
}

export function isSearchIn(value: string | string[] | undefined, queryParam: string[]): boolean {
  // We want to display the devfile if nothing is searched
  if (queryParam.length === 0) {
    return true;
  }

  // We do not want to display devfile if the value is undefined
  // e.g. the description is undefined
  if (!value) {
    return false;
  }

  return queryParam.every((qP) => value.includes(qP));
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async (context) => {
  // get the query params
  const pageParam = context.query.page ? Number(context.query.page) : 1;
  const searchParam = context.query.search ? String(context.query.search) : '';
  const registryParam = getArrayParam(context.query.registries);
  const tagParam = getArrayParam(context.query.tags);
  const typeParam = getArrayParam(context.query.types);
  const providerParam = getArrayParam(context.query.providers);
  const languageParam = getArrayParam(context.query.languages);

  // get the devfiles
  const devfileRegistries = getDevfileRegistries();
  const allDevfiles = await fetchDevfiles(devfileRegistries);

  // create the fuse search
  const fuse = new Fuse(allDevfiles, { threshold: 0.25, keys: ['displayName', 'description'] });

  // filter the devfiles on search
  let devfiles =
    searchParam === '' ? allDevfiles : fuse.search(searchParam).map((result) => result.item);

  // filter the devfiles on query params
  devfiles = devfiles.filter(
    (devfile) =>
      isSearchIn(devfile._registry.name, registryParam) &&
      isSearchIn(devfile.tags, tagParam) &&
      isSearchIn(devfile.type, typeParam) &&
      isSearchIn(devfile.provider, providerParam) &&
      isSearchIn(devfile.language, languageParam),
  );

  // get the filter elements
  const registries = getFilterElements(devfiles, '_registry', registryParam);
  const tags = getFilterElements(devfiles, 'tags', tagParam);
  const types = getFilterElements(devfiles, 'type', typeParam);
  const providers = getFilterElements(devfiles, 'provider', providerParam);
  const languages = getFilterElements(devfiles, 'language', languageParam);

  return {
    props: {
      devfileParams: {
        devfiles: devfiles.slice((pageParam - 1) * devfilesPerPage, pageParam * devfilesPerPage),
        total: devfiles.length,
      },
      pageParams: {
        pageNumber: pageParam,
        totalPages: Math.ceil(devfiles.length / devfilesPerPage),
      },
      searchParams: {
        search: searchParam,
      },
      filterParams: {
        registries,
        tags,
        types,
        providers,
        languages,
      },
    },
  };
};

export default IndexWrapper;
