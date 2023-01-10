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

import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
} from '@heroicons/react/20/solid';
import { useEffect, useRef } from 'react';
import { Popover } from '@headlessui/react';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { DebounceInput } from 'react-debounce-input';
import { DevfileFilters } from '../devfile-filters/devfile-filters';
import type { PageParams } from '../pagination/pagination';
import type { DevfileParams } from '../../functions';
import type { FilterParams, UseFilters } from '../devfile-filters/devfile-filters';

export interface SearchParams {
  search: string;
}

export interface DevfileSearchProps {
  searchParams: SearchParams;
  pageParams: PageParams;
  devfileParams: DevfileParams;
  filterParams: FilterParams;
  setPage: (page: number) => void;
  useFilters: UseFilters;
}

export function DevfileSearch(props: DevfileSearchProps): JSX.Element {
  const { searchParams, pageParams, devfileParams, filterParams, setPage, useFilters } = props;
  const { search } = searchParams;
  const { pageNumber, totalPages } = pageParams;

  const [, setSearch] = useQueryParam('search', withDefault(StringParam, search));
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [filters, setFilters] = useFilters;

  useEffect(() => {
    if (searchRef.current && search) {
      searchRef.current.value = search;
    }
    searchRef.current?.focus();
    // run on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevPage = pageNumber > 1 ? pageNumber - 1 : 1;
  const nextPage = pageNumber < totalPages ? pageNumber + 1 : totalPages;

  const devfilesPerPage = devfileParams.devfiles.length;
  const totalDevfiles = devfileParams.total;

  const filtersApplied = getFiltersApplied(filters);

  return (
    <>
      <div className="my-4 justify-between sm:my-6 sm:flex lg:mx-2">
        <div className="group relative grow sm:max-w-[75%] sm:pr-4 lg:sm:max-w-[50%]">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="h-5 w-auto flex-none fill-slate-400 group-hover:fill-slate-500 dark:fill-slate-500 dark:group-hover:fill-slate-400"
            />
          </div>
          <div className="sr-only">Devfile search</div>
          <DebounceInput
            inputRef={searchRef}
            type="search"
            placeholder="Search devfiles"
            className="container h-10 rounded-lg border border-slate-200 py-2.5 pl-10 pr-3.5 text-sm text-slate-400 shadow ring-1 ring-slate-200 group-hover:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:ring-inset dark:ring-white/5 dark:group-hover:bg-slate-700/40 dark:group-hover:ring-slate-500"
            onChange={(event): void => {
              setSearch(event.target.value);
            }}
            debounceTimeout={250}
          />
        </div>
        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:justify-start">
          {filtersApplied > 0 && (
            <button
              type="button"
              className="text-devfile whitespace-nowrap pr-8 text-sm font-semibold uppercase tracking-wider sm:hidden"
              onClick={(): void =>
                setFilters(
                  (Object.keys(filters) as (keyof FilterParams)[]).reduce((acc, key) => {
                    acc[key] = [];
                    return acc;
                  }, {} as UseFilters[0]),
                )
              }
            >
              Clear filter(s)
            </button>
          )}
          <div className="pr-8">
            <p className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium">
                {totalDevfiles > 0 ? (pageNumber - 1) * devfilesPerPage + 1 : 0}
              </span>{' '}
              -{' '}
              <span className="font-medium">
                {pageNumber * devfilesPerPage < totalDevfiles
                  ? pageNumber * devfilesPerPage
                  : totalDevfiles}
              </span>{' '}
              of <span className="font-medium">{totalDevfiles}</span>
            </p>
          </div>
          <div className="flex w-16 items-center">
            <button
              type="button"
              onClick={(): void => {
                setPage(prevPage);
              }}
              className="pr-4"
            >
              <ChevronLeftIcon className="h-6 w-auto text-slate-500 dark:text-slate-400" />
            </button>
            <button
              type="button"
              onClick={(): void => {
                setPage(nextPage);
              }}
            >
              <ChevronRightIcon className="h-6 w-auto text-slate-500 dark:text-slate-400" />
            </button>
          </div>
        </div>
      </div>
      <Popover className="relative mt-4 lg:hidden">
        <div className="flex justify-between">
          <Popover.Button className="flex items-center">
            <FunnelIcon className="h-5 w-auto pr-1 text-slate-500 dark:text-slate-400" />
            <span className="text-devfile text-sm font-semibold uppercase tracking-wider">
              {filtersApplied > 0 ? `${filtersApplied} filter(s) applied` : 'Filter results'}
            </span>
          </Popover.Button>
          {filtersApplied > 0 && (
            <button
              type="button"
              className="text-devfile text-sm font-semibold uppercase tracking-wider"
              onClick={(): void =>
                setFilters(
                  (Object.keys(filters) as (keyof FilterParams)[]).reduce((acc, key) => {
                    acc[key] = [];
                    return acc;
                  }, {} as UseFilters[0]),
                )
              }
            >
              Clear filter(s)
            </button>
          )}
        </div>
        <Popover.Overlay className="fixed inset-0 backdrop-blur-sm" />
        <Popover.Panel className="container absolute z-10 mt-2 rounded-lg border border-slate-700 bg-white p-6 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
          <DevfileFilters
            filterParams={filterParams}
            setFilters={setFilters}
            className="grid grid-cols-3 gap-6"
          />
        </Popover.Panel>
      </Popover>
    </>
  );
}

function getFiltersApplied(filter: UseFilters[0]): number {
  return (Object.values(filter) as string[][]).reduce((acc, curr) => acc + curr.length, 0);
}

export default DevfileSearch;
