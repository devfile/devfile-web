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
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Popover } from '@headlessui/react';
import { useSearchDevfiles } from '../../hooks';
import { createDevfileLink } from '../../functions';
import { DevfileFilters } from '../devfile-filters/devfile-filters';

export function DevfileSearch(): JSX.Element {
  const { devfiles, page, query, dispatch } = useSearchDevfiles();
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const prevPage = page.number > 1 ? page.number - 1 : 1;
  const nextPage = page.number < page.total ? page.number + 1 : page.total;

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
          <input
            ref={searchRef}
            type="search"
            placeholder="Search devfiles"
            className="container h-10 rounded-lg border border-slate-200 py-2.5 pl-10 pr-3.5 text-sm text-slate-400 shadow ring-1 ring-slate-200 group-hover:ring-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:ring-inset dark:ring-white/5 dark:group-hover:bg-slate-700/40 dark:group-hover:ring-slate-500"
            value={query.search}
            onChange={(event): void => {
              dispatch({
                type: 'FILTER_ON',
                property: 'search',
                payload: event.target.value,
                resetPage: true,
              });
            }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:justify-start">
          {query.filtersApplied > 0 && (
            <button
              type="button"
              className="text-devfile whitespace-nowrap pr-8 text-sm font-semibold uppercase tracking-wider sm:hidden"
              onClick={(): void => {
                dispatch({ type: 'CLEAR_FILTERS' });
              }}
            >
              Clear filter(s)
            </button>
          )}
          <div className="pr-8">
            <p className="whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium">{(page.number - 1) * devfiles.limit + 1}</span> -{' '}
              <span className="font-medium">
                {page.number * devfiles.limit < devfiles.searched.length
                  ? page.number * devfiles.limit
                  : devfiles.searched.length}
              </span>{' '}
              of <span className="font-medium">{devfiles.searched.length}</span>
            </p>
          </div>
          <div className="flex w-16 items-center">
            <Link
              scroll={false}
              href={createDevfileLink({ ...page, number: prevPage }, query)}
              onClick={(): void => {
                dispatch({
                  type: 'SET_PAGE_NUMBER',
                  payload: prevPage,
                });
              }}
              className="pr-4"
            >
              <ChevronLeftIcon className="h-6 w-auto text-slate-500 dark:text-slate-400" />
            </Link>
            <Link
              scroll={false}
              href={createDevfileLink({ ...page, number: nextPage }, query)}
              onClick={(): void => {
                dispatch({
                  type: 'SET_PAGE_NUMBER',
                  payload: nextPage,
                });
              }}
            >
              <ChevronRightIcon className="h-6 w-auto text-slate-500 dark:text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
      <Popover className="relative mt-4 lg:hidden">
        <div className="flex justify-between">
          <Popover.Button className="flex items-center">
            <FunnelIcon className="h-5 w-auto pr-1 text-slate-500 dark:text-slate-400" />
            <span className="text-devfile text-sm font-semibold uppercase tracking-wider">
              {query.filtersApplied !== 0
                ? `${query.filtersApplied} filter(s) applied`
                : 'Filter results'}
            </span>
          </Popover.Button>
          {query.filtersApplied > 0 && (
            <button
              type="button"
              className="text-devfile text-sm font-semibold uppercase tracking-wider"
              onClick={(): void => {
                dispatch({ type: 'CLEAR_FILTERS' });
              }}
            >
              Clear filter(s)
            </button>
          )}
        </div>
        <Popover.Overlay className="fixed inset-0 backdrop-blur-sm" />
        <Popover.Panel className="container absolute z-10 mt-2 rounded-lg border border-slate-700 bg-white p-6 shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
          <DevfileFilters className="grid grid-cols-3 gap-6" />
        </Popover.Panel>
      </Popover>
    </>
  );
}

export default DevfileSearch;
